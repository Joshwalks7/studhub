const cartPage = (req, res) => {
    res.render("cart", {
        title: "Cart"
    });
}

export { cartPage };