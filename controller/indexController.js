const Comments = require('../models/commentModel');
const News     = require('../models/newsModel');
const { Op }   = require("sequelize");
// const multer   = require('multer');
// const fs       = require('fs');
// const path     = require('path');
/*-------------------------------------------------------------------------*/



exports.getIndex = (req, res) => {
    //Cross-Site Messages
    let message = req.flash('message')[0];
    
    //User-Authentication lesen
    let userName = '';
    if(req.user){ userName = req.user.displayName; }

    News.findAll({  order: [ [ 'createdAt', 'DESC' ] ],
                    limit: 8 })
            .then(newsArticles => {
                return newsArticles;
            })
            .then(newsArticles => {
                Comments.findAll({  order: [ [ 'createdAt', 'DESC' ] ],
                                    limit: 4 })
                        .then(comments => {


                            console.log('============================NEWS ==============================');
                            console.log('Länge: ' , newsArticles.length);
                            newsArticles.forEach(article => {
                                console.log(article.newsHeader + '  //  ' + article.newsText);
                            })
                            console.log('============================NEWS ENDE ==============================');

                            res.status(200);
                            res.render('index', {
                                name:           userName || '',
                                message:        message,
                                newsArticles:   newsArticles,
                                comments:       comments      
                            }); 
            
                        })
                        .catch(err => {
                            console.log('Die Kommentare konnte nicht geladen werden!', err);
                            //Cross-Site Message mit Session weiterreichen 
                            req.flash('message', 'An error occured while loading comment section!');
                            //Redirect
                            res.status(404);
                            res.redirect('/error');      
                        })

            })
            .catch(err => {
                console.log('Die NewsArticles konnten nicht geladen werden!', err);
                //Cross-Site Message mit Session weiterreichen 
                req.flash('message', 'An error occured while loading the news section!');
                //Redirect
                res.status(404);
                res.redirect('/error');    
            })



            

}

exports.postComment = (req, res) => {

    //Erst prüfen, ob diese IP schon einen Eintrag für diesen Tag erfasst hat
    //Es ist nur ein Einrag pro Remote-IP und Tag möglich
    Comments.findOne({
        where: {  
            ipAddress: req.session.remoteIP, 
            updatedAt:  { 
                            [Op.gte]: new Date(new Date().setHours(0,0,0,0)) 
                        }
                } })
                        .then(result => {
                            if(result) {
                                console.log(`${req.session.remoteIP} hat bereits einen Slider-Eintrag angelegt am ${result.get().createdAt}`);
                                //Cross-Site Message mit Session weiterreichen 
                                req.flash('message', 'Es tut mir leid, aber Du kannst nur eine Nachricht pro Tag erfassen!');
                                //Redirect
                                res.status(400);
                                res.redirect('/#quotes');

                            } else {
                                console.log(`${req.session.remoteIP} hat heute noch keine Nachricht hinterlassen: ${result}`);
                                Comments.create({
                                    ipAddress:  req.session.remoteIP,
                                    name:       req.body.name,
                                    email:      req.body.email,
                                    comment:    req.body.comment
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

                        })
                        .catch(err => {
                            console.log('Fehler beim laden der Kommentare');                
                        })
}

exports.addNewsArticle = (req, res) => {

    let newPost = {
        newsHeader: req.body.newsHeader,
        newsText:   req.body.newsText,
        mimetype:   req.file.mimetype || '',
        picture:    req.file.buffer   || ''
    }
    News.create(newPost)
        .then(result => {
            console.log(`News Eintrag wurde erfolgreich angelegt!`);
            //Cross-Site Message mit Session weiterreichen 
            req.flash('message', 'News-Eintrag wurde erfolgreich angelegt!');
            //Redirect
            res.status(200);
            res.redirect('/#news');
        })
        .catch(err => {
            console.log(`News Eintrag konnte nicht angelegt werden!`, err);
            //Cross-Site Message mit Session weiterreichen 
            req.flash('message', 'News Eintrag konnte nicht angelegt werden!');
            //Redirect
            res.status(400);
            res.redirect('/#news');
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

