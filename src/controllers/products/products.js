import { getAllListings, getListingById } from "../../models/products/listings.js";

const productsPage = async (req, res) => {
    const listings = await getAllListings();

    res.render("products", {
        title: "Products",
        listings: listings
    });
}

const listingDetailPage = async (req, res) => {
    const listingId = req.params.listingId;
    const listingDetails = await getListingById(listingId);
    
    if (!listingDetails) {
        return res.status(404).send("Listing not found");
    }
    
    res.render('products/details', {
        title: `${listingDetails.listing_name} - Details`,
        listing: listingDetails
    });
}

export { productsPage, listingDetailPage };