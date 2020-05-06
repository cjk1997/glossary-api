const express = require('express');
const Router = express.Router();
const {
    getTerms,
    getTermByID,
    getTermByValue,
    addTerm,
    updateTerm,
    deleteTerm
} = require('../../data/glossary');

Router.get('/:id', async function(req, res, next) {
    if (!req.params.id) {
        next('route');
    };
    try {
        const data = await getTermByID(req.params.id);
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Issue, check logs");
    };
});

Router.get('/:key/:value', async function(req, res, next) {
    if (!req.params.key && !req.params.value) {
        next('route');
    };
    try {
        const value = req.params.value.replace(/_/g, ' ');
        
        const data = await getTermByValue(req.params.key, value);
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Issues, check logs");
    }
})

Router.get('/', async function(req, res, next) {
    try {
        const data = await getTerms();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Issues, check logs");
    };
});

Router.post('/', async function(req, res, next) {
    try {
        const data = await addTerm(req.body);
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Issues, check logs");
    };
});

Router.put('/:id', async function(req, res, next) {
    try {
        const data = await updateTerm(req.params.id, req.body);
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Issues, check logs");
    };
});

Router.delete('/:id', async function(req, res, next) {
    try {
        const data = await deleteTerm(req.params.id);
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Issues, check log");
    };
});

module.exports = Router;