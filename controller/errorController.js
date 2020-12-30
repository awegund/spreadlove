const session = require("express-session");

exports.get404Page = (req, res, next) => {

    //Cross-Site Messages
    let message = req.flash('message')[0];
    if(!message){
        message = 'Bitte um Entschuldigung, es ist ein unbekannter Fehler aufgetreten!';
    }
    //Render Error Page
    res.status(404).render('404', {
        message: message });
};