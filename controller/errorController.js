const session = require("express-session");

exports.get404Page = (req, res, next) => {
    res.status(404).render('404', {
        failureTitle: 'Fehler, Seite nicht gefunden!'});
};