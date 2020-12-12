exports.getIndex = (req, res) => { 
    //req.session.SpreadLoveKey = 'Lasst Liebe da!! <3';
    req.session.isLoggedIn =  false;
    req.session.userEmail  = 'andreas.wegund@omv.com';

    res.status(200);
    res.render('index', {
        navLink1: 'Login'
    }); 
}