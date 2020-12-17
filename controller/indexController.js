exports.getIndex = (req, res) => {

    //Cross-Site Messages
    let message = req.flash('message')[0];

    //Site Rendern
    res.status(200);
    res.render('index', {
        name:            req.session.name || '',
        message:         message
    }); 
}