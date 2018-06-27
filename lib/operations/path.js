
/**
 * 
 * @class OperationPath
 * @constructor
 * @static
 * @module Operations
 * @param {Array} ids The IDs between which to find paths, in their indexed order.
 * @param {Construct} [construct] The space in which to solve for the paths.
 */
module.exports = function(ids, construct) {
	var storage = this,
		scanned = [ids[0]],
		trace = true,
		active = 1;
	
	
	// TODO: Update operation to scan path between all passed IDs, for now only solving from 0 -> 1
	return new Promise(function(done, fail) {
		
		var coallate = function() {
			if(--active === 0 && trace)
				fail({
					"message": module.exports.messages.notFound,
					"source": ids[0],
					"waypoints": ids,
					"target": ids[ids.length-1],
					"storage": storage.name,
					"error": new Error("No relation")
				});
		};
		
		var scan = function(current, target, path, link, depth) {
			if(!construct || construct.hasResource(target)) {
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
						"source": ids[0],
						"waypoints": ids,
						"target": ids[ids.length-1],
						"storage": storage.name,
						"error": error
					});
				});
			} else
				coallate();
		};
		
		scan(ids[0], ids[1], [], [], 0);
	});
};

module.exports.messages = {};
module.exports.messages.storageError = "Encountered an error with the Storage subsystem";
module.exports.messages.notFound = "No path was found";
