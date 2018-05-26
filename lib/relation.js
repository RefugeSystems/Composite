
var topLevelKeys = [
	"id",
	"name",
	"url",
	"host",
	"description",
	/**
	 * Indicates that this relationship belongs to a specific description of
	 * resources.
	 * 
	 * Serves to separate out relationships from the general mapping to allow
	 * different flows to be tracked amoung similar resources.
	 * @property concept
	 * @type String
	 * @default undefined
	 */
	"concept",
	"environment",
	"type",
	"subtype",
	"source",
	"target",
	"created",
	"updated"
];

/**
 * 
 * @class Relation
 * @constructor
 * @module Synthesis
 * @param {Object} details
 * @param {Object} [fields]
 */
module.exports = function(details, fields) {
	for(var x=0; x<topLevelKeys.length; x++)
		this[topLevelKeys[x]] = details[topLevelKeys[x]];
	this.fields = Object.assign({}, details, fields);
	
	/**
	 * 
	 * @method mutate
	 * @param {Object} mutated
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
