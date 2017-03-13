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
	removePattern: removePattern
};

function getAllPatterns(req, res, next) {
	db.any('select * from pattern')
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

function createPattern(req, res, next) {
  db.none('insert into pattern(name, context)' +
      'values(${name}, ${context})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one pattern'
        });
    })
    .catch(function (err) {
      return next(err);
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
