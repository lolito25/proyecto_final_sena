exports.dashboard = (req, res) => {
    res.render("ventas", { username: req.session.username });
};

exports.adminPanel = (req, res) => {
    res.render("agregar-producto", { username: req.session.username });
};
