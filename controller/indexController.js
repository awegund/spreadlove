exports.getIndex = (req, res) => {
    res.status(200);
    res.render('index', {
        navLink1: 'Login',
        name:     req.session.name || ''
    }); 
}