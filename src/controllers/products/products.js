const productsPage = (req, res) => {
    res.render("products", {
        title: "Products"
    });
}

export { productsPage };