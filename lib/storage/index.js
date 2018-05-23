
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
		details.updated = Date.now();
		resources[details.id] = details;
	};
	
	
	this.putRelation = function(details) {
		details.updated = Date.now();
		relations[detail.id] = details
		linkage[detail.source] = linkage[detail.source] || [];
		linkage[detail.source].push(detail.target);
	};
	
	
	this.removeResources = function(ids) {
		
	};
	
	
	this.removeRelations = function(ids) {
		
	};
	
	
	this.getResources = function(ids) {
		var x, map = {};
		for(x=0; x<ids.length; x++)
			map[ids[x]] = resources[ids[x]];
		return map;
	};
	
	
	this.getRelations = function(ids) {
		var x, map = {};
		for(x=0; x<ids.length; x++)
			map[ids[x]] = relations[ids[x]];
		return map;
	};
	
	
	this.getResourceRelations = function(ids) {
		var x, map = {};
		for(x=0; x<ids.length; x++)
			map[ids[x]] = linkage[ids[x]] || [];
		return map;
	};
};
