const getIndexPage = (req, res) => {
    res.render("index", { link: "home" })
}

const getAboutPage = (req, res) => {
    res.render("about", { link: "about" })
}

export { getAboutPage, getIndexPage }