var promise = require('bluebird');

var options = {
	// Initialization Options
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:heslo@localhost:5432/BP';

var db = pgp(connectionString);

// add query functions

module.exports = {
	getAllPatterns: getAllPatterns,
	getSinglePattern: getSinglePattern,
	createPattern: createPattern,
	updatePattern: updatePattern,
	removePattern: removePattern,
  getSingleState: getSingleState,
  getAllTransitionsOfState: getAllTransitionsOfState,
  getAllStatesByVariation: getAllStatesByVariation,
  getAllTransitionsByVariation: getAllTransitionsByVariation,
  removeState: removeState,
  removeTransition: removeTransition,
  updateState: updateState,
  updateTransition: updateTransition,
  createState: createState,
  createTransition: createTransition,
  setVariationStartState: setVariationStartState,
  getVariationStartState: getVariationStartState
};

/** get all patterns with primary variation, order them by rating */
function getAllPatterns(req, res, next) {
	db.any('SELECT p.id as pattern_pk_id, v.id as variation_pk_id, p.name as pattern_name, v.name as variation_name, * FROM pattern as p join variation as v ON p.primary_variation_id = v.id ORDER BY p.rating DESC NULLS LAST')
	.then(function (data) {
		res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Retrieved ALL patterns'
			});
	})
	.catch(function (err) {
		return next(err);
	});
};

/** get one pattern by id */
function getSinglePattern(req, res, next) {
  var patternID = parseInt(req.params.id);
  db.one('select * from pattern where id = $1', patternID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE pattern'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/** get one state by id */
function getSingleState(req, res, next) {
  var stateID = parseInt(req.params.id);
  db.one('select * from state where id = $1', stateID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE state'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/** get all states by variationid from url */
function getAllStatesByVariation(req, res, next) {
  var variationId = parseInt(req.params.variationId);
  db.any('SELECT * FROM state WHERE variation_id = $1 ORDER BY id ASC', variationId)
	.then(function (data) {
		res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Retrieved ALL states by variation'
			});
	})
	.catch(function (err) {
		return next(err);
	});
}
 /** get all transitions by variationid from url */
function getAllTransitionsByVariation(req, res, next) {
  var variationId = parseInt(req.params.variationId);
  db.any('SELECT t.*, s.variation_id FROM transition AS t JOIN state AS s ON s.id = t.state_from_id WHERE s.variation_id = $1', variationId)
	.then(function (data) {
		res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Retrieved ALL transitions by variation'
			});
	})
	.catch(function (err) {
		return next(err);
	});
}

/** get all transitions belonging to stateid */
function getAllTransitionsOfState(req, res, next) {
  var stateID = parseInt(req.params.stateId);
	db.any('select * from transition where state_from_id = $1', stateID)
	.then(function (data) {
		res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Retrieved ALL transitions of state'
			});
	})
	.catch(function (err) {
		return next(err);
	});
};

/** create pattern as well as its primary variation and set it as primary */
function createPattern(req, res, next) {
  db.one('INSERT INTO pattern(name, patlet, is_published) VALUES(${name}, ${patlet}, False) RETURNING id', req.body)
    .then(patternData => {
      db.one('INSERT INTO variation(name, pattern_id) VALUES(\'Initial variation\', $1) RETURNING id AS vid, pattern_id AS pid', patternData.id)
        .then(variationData => {
          console.log(variationData.pid, variationData.vid);
          db.none(`UPDATE pattern SET primary_variation_id = ${variationData.vid} WHERE id = ${variationData.pid}`)
            .then(() => {
              res.status(200)
              .json({
                status: 'success',
                message: 'Inserted one pattern with variation'
              });
            })
            .catch(error => {
              console.log(variationData)
              return next(error);
            });
        })
        .catch(error => {
          return next(error);    
        });
    })
    .catch(error => {
      return next(error);
    });
}

/** create state, return its id */
function createState(req, res, next) {
  console.log("Creating state");
  db.one('INSERT INTO state(name, description, position_x, position_y, width, height, variation_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id', 
          [
            req.body.name,
            req.body.description,
            parseFloat(req.body.position_x),
            parseFloat(req.body.position_y),
            parseFloat(req.body.width),
            parseFloat(req.body.height),
            parseInt(req.body.variation_id)
          ])
    .then((data) => {
      res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Inserted one state'
      });
    })
    .catch(error => {
      return next(error);
    });
}

/** create transition returning its id */
function createTransition(req, res, next) {
  console.log("Creating transition");
  db.one('INSERT INTO transition(name, description, state_from_id, state_to_id) VALUES($1, $2, $3, $4) RETURNING id',
          [
            req.body.name,
            req.body.description,
            parseInt(req.body.state_from_id),
            parseInt(req.body.state_to_id)
          ])
    .then((data) => {
      res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Inserted one transition'
      });
    })
    .catch(error => {
      return next(error);
    });
}

/** update pattern */
function updatePattern(req, res, next) {
  db.none('update pattern set name=$1, patlet=$2 where id=$3',
    [req.body.name, req.body.patlet, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated pattern'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

/** update state */
function updateState(req, res, next) {
  db.none('update state set name=$1, description=$2, position_x=$3, position_y=$4, width=$5, height=$6 where id=$7',
          [
            req.body.name,
            req.body.description,
            parseFloat(req.body.position_x),
            parseFloat(req.body.position_y),
            parseFloat(req.body.width),
            parseFloat(req.body.height),
            parseInt(req.params.id)
          ])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated state'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

/** set start state for variation */
function setVariationStartState(req, res, next) {
  db.none('update variation set start_state_id=$1 where id=$2',
          [
            parseInt(req.body.start_state_id),
            parseInt(req.params.id)
          ])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Start state set'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/** get start state of variation */
function getVariationStartState(req, res, next) {
  db.one('select start_state_id from variation where id=$1', parseInt(req.params.id))
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Start state retrieved'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateTransition(req, res, next) {
  db.none('update transition set name=$1, description=$2, state_from_id=$3, state_to_id=$4 where id=$5',
          [
            req.body.name,
            req.body.description,
            parseInt(req.body.state_from_id),
            parseInt(req.body.state_to_id),
            parseInt(req.params.id)
          ])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated transition'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function removePattern(req, res, next) { 
  var patternID = parseInt(req.params.id);
  db.result('delete from pattern where id = $1', patternID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} pattern`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });

  };

  function removeState(req, res, next) { 
    var stateId = parseInt(req.params.id);
    db.result('delete from state where id = $1', stateId)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} state`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  };

  function removeTransition(req, res, next) { 
    var transitionId = parseInt(req.params.id);
    db.result('delete from transition where id = $1', transitionId)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} transition`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  };
