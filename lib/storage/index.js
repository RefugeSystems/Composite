
/**
 * 
 * @class StorageUnit
 * @constructor
 * @module SynthesisStorage
 */

/**
 * 
 * @method putResource
 * @param {Resource} details
 * @return {Number} Call ID
 */

/**
 * 
 * @method putRelation
 * @param {Resource} details
 * @return {Number} Call ID
 */

/**
 * 
 * @method removeResources
 * @param {Array | Number} ids
 * @return {Number} Call ID
 */

/**
 * 
 * @method removeRelations
 * @param {Array | Number} ids
 * @return {Number} Call ID
 */

/**
 * 
 * @method getResources
 * @param {Array | Number} ids
 * @return {Number} Call ID
 */

/**
 * 
 * @method getRelations
 * @param {Array | Number} ids
 * @return {Number} Call ID
 */

/**
 * 
 * @method getResourceRelations
 * @param {Array | Number} ids
 * @return {Number} Call ID
 */

/**
 * 
 * @class BasicStorageUnit
 * @extends StorageUnit
 * @constructor
 * @module SynthesisStorage
 */
module.exports = function() {
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
	 * @property linkage
	 * @type Object
	 * @private
	 */
	var linkage = {};


	this.putResource = function(details) {
		return new Promise(function(done) {
			details.updated = Date.now();
			resources[details.id] = details;
			done(details);
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


	this.removeResources = function(ids) {
		return new Promise(function(done) {
			
			done();
		});
	};


	this.removeRelations = function(ids) {
		return new Promise(function(done) {
			
			done();
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


	this.getRelations = function(ids) {
		return new Promise(function(done) {
			var x, map = {};
			for(x=0; x<ids.length; x++)
				map[ids[x]] = relations[ids[x]];
			done(map);
		});
	};


	this.getResourceRelations = function(ids) {
		return new Promise(function(done) {
			var id, link, map = {};
			for(id=0; id<ids.length; id++)
				for(link in linkage[ids[id]])
					map[linkage[ids[id]][link].target] = relations[linkage[ids[id]][link]];
			done(map);
		});
	};
};
