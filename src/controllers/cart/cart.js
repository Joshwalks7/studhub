import { getListingById } from "../../models/products/listings.js";

const cartPage = (req, res) => {
    res.render("cart", {
        title: "Cart",
        cart: req.session.cart || []
    });
}

const addToCart = async (req, res) => {
    const listingId = Number.parseInt(req.body.listingId, 10);
    const quantity = Number.parseInt(req.body.quantity, 10);

    if (!Number.isInteger(listingId) || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).send("Invalid listing or quantity");
    }

    const listing = await getListingById(listingId);

    if (!listing || listing.status !== "available") {
        return res.status(404).send("Listing is not available");
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const existingItem = req.session.cart.find(item => item.listingId === listingId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        req.session.cart.push({
            listingId,
            quantity
        });
    }

    res.redirect("/cart");
}

export { cartPage, addToCart };