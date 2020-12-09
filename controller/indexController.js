exports.getIndex = (req, res) => { 

    console.log('Vor Session!');
    req.session.AndreasIstDerBeste = true;
    req.session.JaAberSicher = { antwort: 'selbstverständlich',
                                 ja:       true };
    console.log(req.session);

    res.status(200);
    res.render('index', {
        navLink1: 'Login'
    }); 
}