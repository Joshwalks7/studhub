import db from "../db.js";

const getAllListings = async () => {
    const query = `
        SELECT
            id,
            seller_id,
            listing_name,
            description,
            price,
            condition,
            completion_percent,
            image_url,
            status,
            created_at
        FROM listings
        WHERE status = 'available'
        ORDER BY created_at DESC
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllListings };