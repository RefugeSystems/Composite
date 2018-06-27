
/**
 * 
 * @class Resource
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
	 * Denotes the specific environment for this resource if applicable.
	 * 
	 * Meant for things along the lines of Prod, QA, Dev but should not be
	 * considered limited to.
	 * @property environment
	 * @type String
	 */
	"environment",
	/**
	 * Used to track who this resource's activity effects.
	 * @property audience
	 * @type String
	 */
	"audience",
	/**
	 * Top level type indicator.
	 * @property type
	 * @type String
	 */
	"type",
	/**
	 * Top level customizable type indicator.
	 * 
	 * Should give more detail to the selected type.
	 * 
	 * @property subtype
	 * @type String
	 */
	"subtype",
	/**
	 * When this resource should be considered to start.
	 * 
	 * This does not remove the resource or change its status,
	 * simply a flag to denote a timespan for temporal things
	 * such as projects, licenses, or contracts.
	 * @property commence
	 * @type Number
	 */
	"commence",
	/**
	 * Length of time for this resource. Drives information
	 * around how long "a step" may take.
	 * 
	 * This does not remove the resource or change its status,
	 * simply a flag to denote a timespan for temporal things
	 * such as projects, licenses, or contracts when used in
	 * combination with "commence".
	 * @property duration
	 * @type Number
	 */
	"duration",
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
		for(var x=0; x<topLevelKeys.length; x++)
			if(this[topLevelKeys[x]] !== mutated[topLevelKeys[x]])
				this[topLevelKeys[x]] = mutation[topLevelKeys[x]] = mutated[topLevelKeys[x]];
		return mutation;
	};
};

module.exports.getMutation = function(source, mutated) {
	var mutation = {};
	// TODO: Once solidified, remove for loop for top level assignments
	for(var x=0; x<topLevelKeys.length; x++)
		if(source[topLevelKeys[x]] !== mutated[topLevelKeys[x]])
			mutation[topLevelKeys[x]] = mutated[topLevelKeys[x]];
	return mutation;
};
