
var topLevelKeys = [
	"id",
	"name",
	"url",
	"host",
	"description",
	"environment",
	"type",
	"subtype"
];

/**
 * 
 * @class Resource
 * @constructor
 * @module Synthesis
 * @param {Object} details
 */
module.exports = function(details, fields) {
	for(var x=0; x<topLevelKeys.length; x++)
		this[topLevelKeys[x]] = details[topLevelKeys[x]];
	this.fields = Object.assign({}, details, fields);
};
