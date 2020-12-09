exports.getLoginPage = (req, res) => { 

    console.log(req.session);

    res.status(200);
    res.render('authentication/login', {
        navLink1: 'Login'
    }); 
}

exports.postLogin = (req, res) => {
    res.status(200);
    res.redirect('/');
};