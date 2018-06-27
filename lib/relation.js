
/**
 * 
 * @class Relation
 * @constructor
 * @module Synthesis
 * @param {Object} details
 * @param {Object} [fields]
 */

var topLevelKeys = [
	/**
	 * 
	 * @property id
	 * @type Number
	 */
	"id",
	/**
	 * 
	 * @property name
	 * @type String
	 */
	"name",
	/**
	 * 
	 * @property url
	 * @type String
	 */
	"url",
	/**
	 * 
	 * @property description
	 * @type String
	 */
	"description",
	/**
	 * Indicates that this relationship belongs to a specific description of
	 * resources.
	 * 
	 * Serves to separate out relationships from the general mapping to allow
	 * different flows to be tracked among similar resources.
	 * @property concept
	 * @type String
	 * @default undefined
	 */
	"concept",
	/**
	 * When true, this relationship should be ignored from the general relational
	 * set.
	 * @property seperate
	 * @type Boolean
	 * @default false
	 */
	"separate",
	/**
	 * 
	 * @property environment
	 * @type String
	 */
	"environment",
	/**
	 * 
	 * @property type
	 * @type String
	 */
	"type",
	/**
	 * 
	 * @property subtype
	 * @type String
	 */
	"subtype",
	/**
	 * 
	 * @property source
	 * @type Number
	 */
	"source",
	/**
	 * 
	 * @property target
	 * @type Number
	 */
	"target",
	/**
	 * 
	 * @property created
	 * @type Number
	 */
	"created",
	/**
	 * 
	 * @property updated
	 * @type Number
	 */
	"updated"
];

module.exports = function(details, fields) {
	// TODO: Once solidified, remove for loop for top level assignments
	for(var x=0; x<topLevelKeys.length; x++)
		this[topLevelKeys[x]] = details[topLevelKeys[x]];
	this.fields = Object.assign({}, details, fields);
	
	/**
	 * 
	 * @method mutate
	 * @param {Object} mutated Object containing new key:value pairs.
	 * @return {Object} Object where the key:Value pairs represent what has changed in this Resource.
	 */
	this.mutate = function(mutated) {
		var mutation = {};
		// TODO: Once solidified, remove for loop for top level assignments
		for(var x=0; x<topLevelKeys.length; x++)
			if(this[topLevelKeys[x]] !== mutated[topLevelKeys[x]])
				this[topLevelKeys[x]] = mutation[topLevelKeys[x]] = mutated[topLevelKeys[x]];
		return mutation;
	};
};
