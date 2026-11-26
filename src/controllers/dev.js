const setTestBuyer = (req, res) => {
    req.session.userId = 2;
    res.redirect("/cart");
};

export { setTestBuyer };
