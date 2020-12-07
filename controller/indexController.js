exports.getIndex = (req, res) => { 

    console.log('Vor Session!');
    req.session.AndreasIstDerBeste = true;
    console.log(req.session);

    res.status(200);
    res.render('index', {
        navLink1: 'Hier als Übergabe-Parameter ;-)'
    }); 
}