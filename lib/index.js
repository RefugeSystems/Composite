
var EventEmitter = require("events");
var Resource = require("./resource");
var Relation = require("./relation");
var Concept = require("./concept");
var fs = require("fs");

var Random = require("./utilities/random");

/**
 * All requests return a "callID". 
 * 
 * 
 * @class Synthesis
 * @constructor
 * @param {Object} options
 * @param {StorageUnit} [storage]
 */
module.exports = function(options, storage) {
	var x;
	
	/* Init
	 * Parse Options
	 * Create Storage
	 * Build Emitters
	 */
	
	options = Object.assign({}, defaults, options);
	if(!storage) {
		options.Storage = require("./storage");
		storage = new options.Storage();
	}
	options.storage = storage.name || storage.constructor.name;
	
	var calls = 0;
	
	var emitter = new EventEmitter();
	/**
	 * 
	 * @method on
	 * @param {param} eventName
	 * @param {Function} listener
	 */
	this.on = emitter.on;
	/**
	 * 
	 * @method once
	 * @param {param} eventName
	 * @param {Function} listener
	 */
	this.once = emitter.once;
	/**
	 * 
	 * @method off
	 * @param {param} eventName
	 * @param {Function} listener
	 */
	this.off = emitter.off;
	/**
	 * 
	 * @method eventNames
	 * @return {Array | String}
	 */
	this.eventNames = emitter.eventNames;
	/**
	 * 
	 * @method on
	 * @param {param} eventName
	 * @param {Function} listener
	 */
	this.maxListeners = function(count) {
		if(count)
			emitter.setMaxListeners(count);
		else
			return emitter.getMaxListeners();
	};
	
	
	var getCallID = function() {
		return calls++;
	};
	
	var emit = function(callID, event, result) {
		setTimeout(function() {
			result._callID = callID;
			result._time = Date.now();
			emitter.emit(event, result);
		}, 0);
	};
	
	/**
	 * 
	 * @method options
	 * @return {Object} A copy of the options object for introspection.
	 */
	this.options = function() {
		return JSON.parse(JSON.stringify(options));
	};
	
	this.operations = {};
	var ops = fs.readdirSync(__dirname + "/operations");
	for(x=0; x<ops.length; x++) {
		ops[x] = ops[x].slice(0,-3); 
		this.operations[ops[x]] = require("./operations/" + ops[x]).bind(storage);
	}
	
	
	this.listResources = function() {
		return storage.getResources();
	};
	
	/**
	 * 
	 * @method createResource
	 * @param {Object} details
	 */
	this.createResource = function(details) {
		var callID = getCallID();
		storage.putResource(details);
		emit(callID, events.resource.create, details);
		return callID;
	};
	
	/**
	 * 
	 * @method createRelation
	 * @param {Object} details
	 */
	this.createRelation = function(details) {
		var callID = getCallID();
		storage.putRelation(details);
		emit(callID, events.relation.create, details);
		return callID;
	};

	/**
	 *
	 * @method requestResources
	 * @param {Array | Number} ids
	 */
	this.requestResources = function(ids) {
		var callID = getCallID();
		
		
		return callID;
	};

	/**
	 *
	 * @method removeResource
	 * @param {Number} id
	 */
	this.removeResource = function(id) {
		var callID = getCallID();
		
		
		return callID;
	};

	/**
	 *
	 * @method createConcept
	 * @param {Object} details
	 */
	this.createConcept = function(details) {
		var callID = getCallID();
		
		
		return callID;
	};

	/**
	 *
	 * @method removeConcept
	 * @param {Number} id
	 */
	this.removeConcept = function(id) {
		var callID = getCallID();
		
		
		return callID;
	};

	/**
	 *
	 * @method toConcept
	 * @param {Number} id
	 * @param {Array | Number} resourceIDs
	 * @param {Array | Number} relationIDs
	 */
	this.toConcept = function(conceptID, resourceIDs, relationIDs) {
		var callID = getCallID();
		
		
		return callID;
	};

	/**
	 *
	 * @method fromConcept
	 * @param {Number} id
	 * @param {Array | Number} resourceIDs
	 * @param {Array | Number} relationIDs
	 */
	this.fromConcept = function(conceptID, resourceIDs, relationIDs) {
		var callID = getCallID();
		
		
		return callID;
	};
};

/**
 * 
 * @property defaults
 * @type Object
 * @private
 * @static
 */
var defaults = {
	"storage": "./storage"
};

var events = {};
events.resource = {};
events.resource.create = "resource:create";
events.relation = {};
events.relation.create = "resource:create";

module.exports.prototype.Resource = require("./Resource");
module.exports.Resource = require("./Resource");
module.exports.prototype.Relation = require("./Relation");
module.exports.Relation = require("./Relation");
