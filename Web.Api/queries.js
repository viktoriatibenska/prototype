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
};

function getAllPatterns(req, res, next) {
	db.any('SELECT p.id as pattern_pk_id, v.id as variation_pk_id, p.name as pattern_name, v.name as variation_name, * FROM pattern as p join variation as v ON p.primary_variation_id = v.id')
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
