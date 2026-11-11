import { Router } from "express";
import { cartPage } from "./cart/cart.js";
import { productsPage } from "./products/products.js";
import { ordersPage } from "./orders/orders.js";
import { homePage } from "./index.js";

const router = Router();

router.get("/", homePage);
router.get("/products", productsPage);
router.get("/cart", cartPage);
router.get("/orders", ordersPage);

export default router;