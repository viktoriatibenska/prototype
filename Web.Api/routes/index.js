var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/pattern', db.getAllPatterns);
router.get('/api/pattern/:id', db.getSinglePattern);
router.post('/api/pattern', db.createPattern);
router.put('/api/pattern/:id', db.updatePattern);
router.delete('/api/pattern/:id', db.removePattern);

router.get('/api/state/:id', db.getSingleState);
router.get('/api/states/:variationId', db.getAllStatesByVariation);
router.delete('/api/state/:id', db.removeState);
router.put('/api/state/:id', db.updateState);
router.post('/api/state', db.createState);

router.get('/api/transition/:stateId', db.getAllTransitionsOfState);
router.get('/api/transitions/:variationId', db.getAllTransitionsByVariation);
router.delete('/api/transition/:id', db.removeTransition);
router.put('/api/transition/:id', db.updateTransition);
router.post('/api/transition', db.createTransition);

router.put('/api/variation/setStartState/:id', db.setVariationStartState);

module.exports = router;
