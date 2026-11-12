import { getAllListings } from "../../models/products/listings.js";

const productsPage = async (req, res) => {
    const listings = await getAllListings();

    res.render("products", {
        title: "Products",
        listings: listings
    });
}

export { productsPage };