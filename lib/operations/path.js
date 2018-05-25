
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
	var storage = this,
		scanned = [source],
		trace = true,
		active = 1;
	
	return new Promise(function(done, fail) {
		
		var coallate = function() {
			if(--active === 0 && trace)
				fail({
					"message": module.exports.messages.notFound,
					"source": source,
					"target": target,
					"storage": storage.name,
					"error": new Error("No relation")
				});
		};
		
		var scan = function(current, target, path, link, depth) {
			current = parseInt(current);
			path = path.concat(current);
			storage.getResourceTargets([current])
			.then(function(relations) {
				if(trace)
					if(relations[target]) {
						path.push(target);
						link.push(relations[target].id);
						var result = {};
						result.path = path;
						result.link = link;
						done(result);
					} else {
						depth++;
						Object.keys(relations).forEach(function(id) {
							if(scanned.indexOf(id) === -1) {
								scanned.push(id);
								active++;
								setTimeout(function() {
									scan(id, target, path, link.concat(parseInt(relations[id].id)), depth);
								}, 0);
							}
						});
						coallate();
					}
			})
			.catch(function(error) {
				trace = false;
				fail({
					"message": module.exports.messages.storageError,
					"source": source,
					"target": target,
					"storage": storage.name,
					"error": error
				});
			});
		};
		
		scan(source, target, [], [], 0);
	});
};

module.exports.messages = {};
module.exports.messages.storageError = "Encountered an error with the Storage subsystem";
module.exports.messages.notFound = "No path was found";
