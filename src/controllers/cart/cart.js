import { addItemToCart, getCartDetails } from "../../models/cart/cart.js";

const cartPage = async (req, res, next) => {
    try {
        const cartDetails = await getCartDetails(req.session);

        res.render("cart", {
            title: "Cart",
            cart: cartDetails.cart,
            subtotal: cartDetails.subtotal,
            salesTax: cartDetails.salesTax,
            shipping: cartDetails.shipping,
            total: cartDetails.total
        });
    } catch (error) {
        return next(error);
    }
};

const addToCart = async (req, res, next) => {
    const listingId = Number.parseInt(req.body.listingId, 10);
    const quantity = Number.parseInt(req.body.quantity, 10);

    if (!Number.isInteger(listingId) || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).send("Invalid listing or quantity");
    }

    try {
        const cart = await addItemToCart(req.session, listingId, quantity);

        if (!cart) {
            return res.status(404).send("Listing is not available");
        }

        return res.redirect("/cart");
    } catch (error) {
        return next(error);
    }
};

export { cartPage, addToCart };
