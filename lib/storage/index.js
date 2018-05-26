
/**
 * 
 * @class StorageUnit
 * @constructor
 * @module SynthesisStorage
 */

/**
 * 
 * @method getResources
 * @param {Array | Number} ids
 */

/**
 * 
 * @method putResource
 * @param {Resource} details
 */

/**
 * 
 * @method modResource
 * @param {Resource} details
 */

/**
 * 
 * @method outResources
 * @param {Array | Number} ids
 */


/**
 * 
 * @method getRelations
 * @param {Array | Number} ids
 */

/**
 * 
 * @method putRelation
 * @param {Relation} details
 */

/**
 * 
 * @method modRelation
 * @param {Relation} details
 */

/**
 * 
 * @method outRelations
 * @param {Array | Number} ids
 */


/**
 * 
 * @method getConstructs
 * @param {Array | Number} ids
 */

/**
 * 
 * @method putConstruct
 * @param {Construct} details
 */

/**
 * 
 * @method modConstruct
 * @param {Construct} details
 */

/**
 * 
 * @method outConstructs
 * @param {Array | Number} ids
 */


/**
 * 
 * @method getResourceRelations
 * @param {Array | Number} ids
 */

/**
 * 
 * @method getResourceTargets
 * @param {Array | Number} ids
 */

/**
 * 
 * @class BasicStorageUnit
 * @extends StorageUnit
 * @constructor
 * @module SynthesisStorage
 * @param {String} name
 */
module.exports = function(name) {
	this.name = "BasicStorage";

	/**
	 * 
	 * @property resources
	 * @type Object
	 * @private
	 */
	var resources = {};

	/**
	 * 
	 * @property relations
	 * @type Object
	 * @private
	 */
	var relations = {};

	/**
	 * 
	 * @property constructs
	 * @type Object
	 * @private
	 */
	var constructs = {};

	/**
	 * 
	 * @property linkage
	 * @type Object
	 * @private
	 */
	var linkage = {};
	
	
	this.getName = function() {
		return name || this.name;
	};
	
	
	this.getResourceIDs = function() {
		return new Promise(function(done) {
			done(Object.keys(resources));
		});
	};


	this.putResource = function(details) {
		return new Promise(function(done) {
			details.updated = Date.now();
			resources[details.id] = details;
			done(details);
		});
	};


	this.getResources = function(ids) {
		return new Promise(function(done) {
			var x, map = {};
			for(x=0; x<ids.length; x++)
				map[ids[x]] = resources[ids[x]];
			done(map);
		});
	};


	this.outResources = function(ids) {
		return new Promise(function(done) {
			for(var x=0; x<ids.length; x++)
				delete(resources[ids[x]]);
			done();
		});
	};


	this.putRelation = function(details) {
		return new Promise(function(done) {
			details.updated = Date.now();
			relations[details.id] = details;
			linkage[details.source] = linkage[details.source] || [];
			linkage[details.source].push(details.id);
			done(details);
		});
	};


	this.getRelations = function(ids) {
		return new Promise(function(done) {
			var x, map = {};
			for(x=0; x<ids.length; x++)
				map[ids[x]] = relations[ids[x]];
			done(map);
		});
	};


	this.outRelations = function(ids) {
		return new Promise(function(done) {
			for(var x=0; x<ids.length; x++)
				delete(relations[ids[x]]);
			done();
		});
	};


	this.getResourceRelations = function(ids) {
		return new Promise(function(done) {
			var id, link, map = {};
			for(id=0; id<ids.length; id++)
				for(link in linkage[ids[id]])
					map[linkage[ids[id]][link]] = relations[linkage[ids[id]][link]];
			done(map);
		});
	};


	this.getResourceTargets = function(ids) {
		return new Promise(function(done) {
			var id, link, map = {};
			for(id=0; id<ids.length; id++)
				for(link in linkage[ids[id]])
					map[relations[linkage[ids[id]][link]].target] = relations[linkage[ids[id]][link]];
			done(map);
		});
	};
	
	
	this.putConstruct = function(details) {
		return new Promise(function(done) {
			details.updated = Date.now();
			constructs[details.id] = details;
			done(details);
		});
	};
	
	this.getConstructs = function(ids) {
		return new Promise(function(done) {
			var x, map = {};
			for(x=0; x<ids.length; x++)
				map[ids[x]] = constructs[ids[x]];
			done(map);
		});
	};
	
	this.outConstructs = function(ids) {
		return new Promise(function(done) {
			for(var x=0; x<ids.length; x++)
				delete(constructs[ids[x]]);
			done();
		});
	};
	
	this.getChanges = function(start, finish) {
		
	};
};
