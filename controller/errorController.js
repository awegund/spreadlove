const session = require("express-session");

exports.get404Page = (req, res, next) => {

    console.log('Session auf der FehlerSeite! ----------------------------------------------------');
    console.log(req.session.isLoggedIn);

    res.status(404).render('404', {
        failureTitle: 'Fehler, Seite nicht gefunden!'});
};