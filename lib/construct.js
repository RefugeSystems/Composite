
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
 * 
 * @class Construct
 * @constructor
 * @module Synthesis
 * @param {Function} emit Emit function from Synthesis parent
 * @param {Object} details
 * @param {Object} [fields]
 */
module.exports = function(emit, details, fields) {
	for(var x=0; x<topLevelKeys.length; x++)
		this[topLevelKeys[x]] = details[topLevelKeys[x]];
	this.fields = Object.assign({}, details, fields);
	
	var resources = [];
	var relations = [];
	
	
	this.appendResources = function(call, ids) {
		resources.push.apply(resources, ids);
		emit(call, events.resource.append)(ids);
	};
	
	
	this.detachResources = function(call, ids) {
		resources.filter(function(resource) {
			return ids.indexOf(resource) !== -1;
		});
		emit(call, events.resource.detach)(ids);
	};
	
	
	this.appendRelations = function(call, ids) {
		relations.push.apply(resources, ids);
		emit(call, events.resource.append)(ids);
	};
	
	
	this.detachRelations = function(call, ids) {
		relations.filter(function(relation) {
			return ids.indexOf(relation) !== -1;
		});
		emit(call, events.relation.detach)(ids);
	};
};

var events = module.exports.events = {};
events.resource = {};
events.resource.append = "resource:append";
events.resource.detach = "resource:detach";
events.relation = {};
events.relation.append = "relation:append";
events.relation.detach = "relation:detach";
