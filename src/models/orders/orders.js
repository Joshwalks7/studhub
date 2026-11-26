import db from "../db.js";

const createOrder = async (buyerId, validatedItems) => {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const orderItems = [];

        for (const item of validatedItems) {
            const listingResult = await client.query(
                `
                SELECT
                    id,
                    seller_id,
                    price,
                    quantity_available,
                    status
                FROM listings
                WHERE id = $1
                FOR UPDATE
                `,
                [item.listing.id]
            );

            const listing = listingResult.rows[0];

            if (!listing || listing.status !== "available") {
                throw new Error(`Listing ${item.listing.id} is no longer available`);
            }

            if (item.quantity > listing.quantity_available) {
                throw new Error(`Listing ${item.listing.id} has insufficient quantity`);
            }

            const unitPrice = Number(listing.price);
            const itemTotal = unitPrice * item.quantity;

            orderItems.push({
                listingId: listing.id,
                sellerId: listing.seller_id,
                quantity: item.quantity,
                unitPrice,
                itemTotal,
                remainingQuantity: listing.quantity_available - item.quantity
            });
        }

        const subtotal = orderItems.reduce(
            (sum, item) => sum + item.itemTotal,
            0
        );

        const salesTax = subtotal * 0.06;
        const shipping = orderItems.length > 0 ? 4 : 0;
        const total = subtotal + salesTax + shipping;

        const orderResult = await client.query(
            `
            INSERT INTO orders
                (buyer_id, subtotal, sales_tax, shipping, total)
            VALUES
                ($1, $2, $3, $4, $5)
            RETURNING id
            `,
            [buyerId, subtotal, salesTax, shipping, total]
        );

        const orderId = orderResult.rows[0].id;

        for (const item of orderItems) {
            await client.query(
                `
                INSERT INTO order_items
                    (order_id, listing_id, seller_id, quantity, unit_price, item_total)
                VALUES
                    ($1, $2, $3, $4, $5, $6)
                `,
                [
                    orderId,
                    item.listingId,
                    item.sellerId,
                    item.quantity,
                    item.unitPrice,
                    item.itemTotal
                ]
            );

            await client.query(
                `
                UPDATE listings
                SET
                    quantity_available = $1,
                    status = CASE
                        WHEN $1 = 0 THEN 'sold'
                        ELSE 'available'
                    END,
                    updated_at = NOW()
                WHERE id = $2
                `,
                [item.remainingQuantity, item.listingId]
            );
        }

        await client.query("COMMIT");

        return {
            orderId,
            subtotal,
            salesTax,
            shipping,
            total
        };
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

const getOrdersByBuyerId = async (buyerId) => {
    const result = await db.query(
        `
        SELECT
            o.id AS order_id,
            o.status AS order_status,
            o.subtotal,
            o.sales_tax,
            o.shipping,
            o.total,
            o.created_at,
            oi.id AS order_item_id,
            oi.quantity,
            oi.unit_price,
            oi.item_total,
            oi.fulfillment_status,
            l.listing_name,
            l.image_url,
            l.seller_id
        FROM orders AS o
        JOIN order_items AS oi
            ON oi.order_id = o.id
        JOIN listings AS l
            ON l.id = oi.listing_id
        WHERE o.buyer_id = $1
        ORDER BY o.created_at DESC, oi.id
        `,
        [buyerId]
    );

    return result.rows;
};

export { createOrder, getOrdersByBuyerId };
