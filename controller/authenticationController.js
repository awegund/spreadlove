exports.getLoginPage = (req, res) => { 

    console.log(req.session);

    res.status(200);
    res.render('authentication/login', {
        navLink1: req.session.isLoggedIn
    }); 
}

exports.postLogin = (req, res) => {
    res.status(200);
    res.redirect('/');
};