import { validateCart } from "../../models/cart/cart.js";
import { createOrder, getOrdersByBuyerId } from "../../models/orders/orders.js";

const ordersPage = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).send("You must be signed in to view orders");
        }

        const orders = await getOrdersByBuyerId(req.session.userId);

        return res.render("orders", {
            title: "Orders",
            orders
        });
    } catch (error) {
        return next(error);
    }
};

const checkout = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).send("You must be signed in to checkout");
        }

        const validatedCart = await validateCart(req.session.cart);

        if (!validatedCart.valid) {
            return res.status(400).send(`Unable to checkout: ${validatedCart.reason}`);
        }

        await createOrder(req.session.userId, validatedCart.items);

        req.session.cart = [];

        return res.redirect("/orders");
    } catch (error) {
        return next(error);
    }
};

export { ordersPage, checkout };
