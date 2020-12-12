exports.getIndex = (req, res) => { 
    req.session.SpreadLoveKey = 'Lasst Liebe da!!';

    res.status(200);
    res.render('index', {
        navLink1: 'Login'
    }); 
}