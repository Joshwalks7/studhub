import { getListingById } from "../products/listings.js";

const addItemToCart = async (session, listingId, quantity) => {
    const listing = await getListingById(listingId);

    if (!listing || listing.status !== "available") {
        return null;
    }

    if (!session.cart) {
        session.cart = [];
    }

    const existingItem = session.cart.find(
        item => item.listingId === listingId
    );

    if (existingItem) {
        existingItem.quantity += quantity;
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
    
}

export { addItemToCart, getCartDetails };
