import { getListingById } from "../products/listings.js";

const addItemToCart = async (session, listingId, quantity) => {
    const listing = await getListingById(listingId);

    if (!listing || listing.status !== "available") {
        return null;
    }

    const existingItem = session.cart?.find(
        item => item.listingId === listingId
    );

    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const requestedQuantity = currentQuantity + quantity;

    if (requestedQuantity > Number(listing.quantity_available)) {
        return null;
    }

    if (!session.cart) {
        session.cart = [];
    }

    if (existingItem) {
        existingItem.quantity = requestedQuantity;
    } else {
        session.cart.push({
            listingId,
            quantity
        });
    }

    return session.cart;
};

const getCartDetails = async (session) => {
    const cartItems = [];
    let subtotal = 0;
    const salesTaxRate = 0.06;
    const shippingCost = 4;

    if (!session.cart || session.cart.length === 0) {
        return {
            cart: cartItems,
            subtotal: 0,
            salesTax: 0,
            shipping: 0,
            total: 0
        };
    }

    for (const item of session.cart) {
        const itemDetails = await getListingById(item.listingId);

        if (itemDetails && itemDetails.status === "available") {
            const itemSubtotal = item.quantity * Number(itemDetails.price);
            subtotal += itemSubtotal;

            cartItems.push({
                listing: itemDetails,
                quantity: item.quantity,
                itemSubtotal: itemSubtotal
            });
        }
    }

    const salesTax = subtotal * salesTaxRate;
    const shipping = cartItems.length > 0 ? shippingCost : 0;
    const total = subtotal + salesTax + shipping;

    return {
        cart: cartItems,
        subtotal,
        salesTax,
        shipping,
        total
    };
    
};

const validateCart = async (cart) => {
    if (!Array.isArray(cart) || cart.length === 0) {
        return {
            valid: false,
            reason: "empty_cart"
        }
    }

    const validatedItems = [];

    for (const item of cart) {
        if (!Number.isInteger(item.listingId) || !Number.isInteger(item.quantity) || item.quantity < 1) {
            return {
                valid: false,
                reason: "invalid_cart_item",
                listingId: item.listingId
            };
        }

        const listing = await getListingById(item.listingId);

        if (!listing) {
            return {
                valid: false,
                reason: "listing_not_found",
                listingId: item.listingId
            };
        }

        if (listing.status !== "available") {
            return {
                valid: false,
                reason: "listing_unavailable",
                listingId: item.listingId
            };
        }

        if (item.quantity > Number(listing.quantity_available)) {
            return {
                valid: false,
                reason: "insufficient_quantity",
                listingId: item.listingId,
                available: listing.quantity_available
            };
        }

        validatedItems.push({
            listing,
            quantity: item.quantity,
            itemSubtotal: item.quantity * Number(listing.price)
        });
    }
    return {
        valid: true,
        items: validatedItems
    }
}

export { addItemToCart, getCartDetails, validateCart };
