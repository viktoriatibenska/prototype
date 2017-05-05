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

function getAllTransitionsOfState(req, res, next) {
  var stateID = parseInt(req.params.id);
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
  db.none('update pattern set name=$1, context=$2 where id=$3',
    [req.body.name, req.body.context, parseInt(req.params.id)])
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
