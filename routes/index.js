const express = require('express');

const router = express.Router();

router.get('/', (req, res) => { 
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.end("<H1 style='background-color:blue;color:white'>Iscchhhh liiieeebbb DIIIRRRR!!!</H1>"); 
});

module.exports = router;