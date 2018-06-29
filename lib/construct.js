
var EventEmitter = require("events");
var util = require("util");
var topLevelKeys = [
	"id",
	"name",
	"url",
	"host",
	"description",
	"environment",
	"type",
	"subtype",
	"ordered",
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
	var construct = this;
	for(var x=0; x<topLevelKeys.length; x++)
		this[topLevelKeys[x]] = details[topLevelKeys[x]];
	this.fields = Object.assign({}, details, fields);
	
	var id = this.id;
	var resources = [];
	var relations = [];
	
	/**
	 * When defined, the array contains the IDs of resources in this construct in the order in which they
	 * should be considered.
	 * 
	 * The array is not required to be the complete list of resources inside the meaning of the ordering
	 * is up to the interpretation of the system reading it.
	 * @property ordered
	 * @type Array
	 * @default null
	 */
	
	this.getResources = function(call) {
		var list = {
			"id": id,
			"resources": resources,
			"relations": relations,
			"ordering": construct.ordering,
			"fields": fields
		};
		emit(call, events.list)(list);
	};
	
	
	this.appendResources = function(call, ids) {
		resources.push.apply(resources, ids);
		ids = {
			"construct": id,
			"list": ids
		};
		emit(call, events.resource.append)(ids);
	};
	
	
	this.detachResources = function(call, ids) {
		resources.filter(function(resource) {
			return ids.indexOf(resource) !== -1;
		});
		ids = {
			"construct": id,
			"list": ids
		};
		emit(call, events.resource.detach)(ids);
	};
	
	
	this.appendRelations = function(call, ids) {
		relations.push.apply(resources, ids);
		ids = {
			"construct": id,
			"list": ids
		};
		emit(call, events.resource.append)(ids);
	};
	
	
	this.detachRelations = function(call, ids) {
		relations.filter(function(relation) {
			return ids.indexOf(relation) !== -1;
		});
		ids = {
			"construct": id,
			"list": ids
		};
		emit(call, events.relation.detach)(ids);
	};
	
	
	this.hasResource = function(id) {
		return resources.indexOf(id) !== -1;
	};
};

var events = module.exports.events = {};
events.list = "resource:list";
events.resource = {};
events.resource.append = "resource:append";
events.resource.detach = "resource:detach";
events.relation = {};
events.relation.append = "relation:append";
events.relation.detach = "relation:detach";

util.inherits(module.exports, EventEmitter);
