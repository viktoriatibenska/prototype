var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/pattern', db.getAllPatterns);

router.get('/api/pattern/:id', db.getSinglePattern);
router.post('/api/pattern', db.createPattern);
router.put('/api/pattern/:id', db.updatePattern);
router.delete('/api/pattern/:id', db.removePattern);

router.get('/api/states/:id', db.getSingleState);
router.get('/api/transitions/:id', db.getAllTransitionsOfState);

router.get('/api/state/:variationId', db.getAllStatesByVariation);
router.get('/api/transition/:variationId', db.getAllTransitionsByVariation);

module.exports = router;
