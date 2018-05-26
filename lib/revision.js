
/**
 * 
 * @class Revision
 * @constructor
 * @module Synthesis
 * @param {Object} details
 * @param {Object} mutation Discrete key:value pairs indicating what changed
 */
module.exports = function(details, mutation) {
	this.mutated = details.id;
	this.cause = details.cause;
	
	/**
	 * Indicates what type of revision to the Construct this
	 * record indicates;
	 * 
	 * 0: Create
	 * 1: Update
	 * 2: Delete
	 * 
	 * Other numbers should be considered invalid.
	 * 
	 * If a customization is desired here, use "subtype".
	 * @property type
	 * @type Number
	 * @default 0
	 */
	this.type = parseInt(details.type) || 0;
	this.subtype = details.subtype;
	this.time = Date.now();
	this.mutation = mutation;
};
