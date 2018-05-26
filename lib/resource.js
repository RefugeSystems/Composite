
var topLevelKeys = [
	"id",
	"name",
	"url",
	"host",
	"description",
	"environment",
	"type",
	"subtype",
	"created",
	"updated"
];

/**
 * 
 * @class Resource
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

module.exports.getMutation = function(source, mutated) {
	var mutation = {};
	for(var x=0; x<topLevelKeys.length; x++)
		if(source[topLevelKeys[x]] !== mutated[topLevelKeys[x]])
			mutation[topLevelKeys[x]] = mutated[topLevelKeys[x]];
	return mutation;
};
