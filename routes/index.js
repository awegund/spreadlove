const express = require('express');

const router = express.Router();

router.get('/', (req, res) => { 
    res.status(200);
    res.render('index', {
        navLink1: 'Hier als Übergabe-Parameter ;-)'
    }); 
});

module.exports = router;