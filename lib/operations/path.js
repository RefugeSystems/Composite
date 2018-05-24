
/**
 * 
 * @class OperationPath
 * @constructor
 * @static
 * @module Operations
 * @param {Number} source
 * @param {Number} target
 */
module.exports = function(source, target) {
	var storage = this;
	var scanned = [];
	return new Promise(function(done, fail) {
		scan(scanned, storage, source, target, [], [], function(err, path) {
			if(err)
				fail(err);
			else
				done(path);
		});
	});
};

var scan = function(scanned, storage, current, target, path, link, callback) {
	storage.getResourceRelations(current)
	.then(function(relations) {
		if(relations[target]) {
			path.push(target);
			link.push(relations[target].id);
			var result = {};
			result.path = path;
			result.link = link;
			callback(null, result);
		}
	})
	.catch(callback);
};
