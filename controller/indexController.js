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


exports.getImpressum = (req, res) => {

    //Cross-Site Messages
    let message = req.flash('message')[0];

    //Site Rendern
    res.status(200);
    res.render('impressum', {
        message: message
    }); 
}


exports.getDSGVO = (req, res) => {

    //Cross-Site Messages
    let message = req.flash('message')[0];

    //Site Rendern
    res.status(200);
    res.render('dsgvo', {
        message: message
    }); 
}  


exports.get3rdparty = (req, res) => {

    //Cross-Site Messages
    let message = req.flash('message')[0];

    //Site Rendern
    res.status(200);
    res.render('3rdparty', {
        message: message
    }); 
}