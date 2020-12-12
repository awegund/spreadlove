exports.getLoginPage = (req, res) => { 

    console.log(req.session);

    res.status(200);
    res.render('authentication/login', {
        navLink1: req.session[0]
    }); 
}

exports.postLogin = (req, res) => {
    res.status(200);
    res.redirect('/');
};