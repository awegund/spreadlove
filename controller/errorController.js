const session = require("express-session");

exports.get404Page = (req, res, next) => {
    res.status(404).render('404', {
        navLink1:     'LInk1 der Fehler Seite',
        failureTitle: 'Fehler, Seite nicht gefunden!'});
};