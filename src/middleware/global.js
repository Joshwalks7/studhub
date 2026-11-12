const assets = (req, res, next) => {
    res.locals.styles = [];

    res.addStyle = (style) => {
        res.locals.styles.push(style);
    };

    res.locals.renderStyles = () => {
        return res.locals.styles.join("\n");
    };

    next();
};

export default assets;