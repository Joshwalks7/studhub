const ordersPage = (req, res) => {
    res.render("orders", {
        title: "Orders"
    });
}

export { ordersPage };