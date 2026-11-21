import { Router } from "express";
import { cartPage, addToCart } from "./cart/cart.js";
import { productsPage, listingDetailPage } from "./products/products.js";
import { ordersPage } from "./orders/orders.js";
import { homePage } from "./index.js";

const router = Router();

router.use('/products', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/products.css">');
    next();
});
router.use("/cart", (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/cart.css">');
    next();
})

router.get("/", (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/home.css">');
    next();
}, homePage);
router.get("/products", productsPage);
router.get("/products/:listingId", listingDetailPage);
router.get("/cart", cartPage);
router.post("/cart", addToCart);
router.get("/orders", ordersPage);

export default router;