
var EventEmitter = require("events");
var Resource = require("./resource");
var Relation = require("./relation");
var Concept = require("./concept");
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
	
	/* Init
	 * Parse Options
	 * Create Storage
	 * Build Emitters
	 */
	
	options = Object.assign({}, defaults, options);
	storage = storage || require(options.storage);
	
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
		if(count) {
			emitter.setMaxListeners(count);
		} else {
			return emitter.getMAxListeners();
		}
	};
	
	
	var getCallID = function( {
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
	 * @method createResource
	 * @param {Object} details
	 */
	this.createResource = function(details) {
		var callID = getCallID();
		storage.resource(details);
		emit(callID, events.resource.create, details);
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

/**
 * 
 * @pr
 */
var events = {
	
};
