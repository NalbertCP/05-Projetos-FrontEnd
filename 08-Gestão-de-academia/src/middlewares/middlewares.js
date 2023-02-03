module.exports.invalidRoutes = function (req, res) {
    res.status(404).render("./errors.njk", {
        status: "Error 404",
        msg: "We could not find the page you're looking for."
    })
}
