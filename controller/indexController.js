const Comments = require('../models/commentModel');
const bcrypt   = require('bcryptjs');
/*-------------------------------------------------------------------------*/



exports.getIndex = (req, res) => {

    //Cross-Site Messages
    let message = req.flash('message')[0];

    Comments.findAll({  order: [
                            [ 'createdAt', 'DESC' ] 
                            ],
                            limit: 4 })
            .then(comments => {
                console.log('IN INDEX ===========================================');
                comments.forEach(comment => {
                    console.log('=============================');
                    console.log(comment.get().name);
                });

                //Site Rendern
                res.status(200);
                res.render('index', {
                    name:     req.session.name || '',
                    message:  message,
                    comments: comments      
                }); 

            })
            .catch(err => {
                console.log('Die Kommentare konnte nicht geladen werden!', err);
                // //Cross-Site Message mit Session weiterreichen 
                // req.flash('message', 'Fehler beim Laden der Kommentare!');
                // //Redirect
                // res.status(400);
                // res.redirect('#quotes');      
            })
            

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

exports.postComment = (req, res) => {
    Comments.create({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    })
    .then(result => {
        console.log(result);
        //Redirect
        res.status(200);
        res.redirect('/#quotes');
    })
    .catch(err => {
        console.log('Der Kommentar konnte nicht gespeichert werden!', err);
        //Cross-Site Message mit Session weiterreichen 
        req.flash('message', 'Der Kommentar konnte nicht gespeichert werden!');
        //Redirect
        res.status(400);
        res.redirect('/#quotes');
    })
}