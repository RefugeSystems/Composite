
var EventEmitter = require("events");
var Resource = require("./resource");
var Relation = require("./relation");
var Construct = require("./construct");
var fs = require("fs");

var Random = require("./utilities/random");

/**
 * All requests return a "callID". 
 * 
 * @class Synthesis
 * @constructor
 * @param {Object} options
 * @param {StorageUnit} [storage]
 */
module.exports = function(options, storage) {
	var loop;
	
	options = Object.assign({}, defaults, options);
	if(!storage) {
		options.Storage = require("./storage");
		storage = new options.Storage();
	}
	options.storage = storage.name || storage.constructor.name;
	
	var emitter = new EventEmitter();
	this.__proto__ = emitter;
	
	var calls = 0;
	var getCallID = function() {
		return calls++;
	};
	
	var emit = function(callID, event) {
		return function(result) {
			setTimeout(function() {
				result = result || {};
				if(result instanceof Array)
					result = {"list": result};
				result._callID = callID;
				result._time = Date.now();
				result._type = event;
				emitter.emit(event, result);
			}, 0);
		};
	};
	
	var failCall = function(callID) {
		return function(error) {
			setTimeout(function() {
				error = error || {"message": "Unknown Error"};
				error._callID = callID;
				error._time = Date.now();
				emitter.emit(events.error, error);
			}, 0);
		};
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
	for(loop=0; loop<ops.length; loop++) {
		ops[loop] = ops[loop].slice(0,-3); 
		this.operations[ops[loop]] = require("./operations/" + ops[loop]).bind(storage);
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
		storage.putResource(details)
		.then(emit(callID, events.resource.create))
		.catch(failCall(callID));
		return callID;
	};

	/**
	 *
	 * @method gatherResources
	 * @param {Array | Number} ids
	 */
	this.gatherResources = function(ids) {
		var callID = getCallID();
		storage.getResources(ids)
		.then(emit(callID, events.resource.gather))
		.catch(failCall(callID));
		return callID;
	};

	/**
	 *
	 * @method removeResources
	 * @param {Array | Number} ids
	 */
	this.removeResources = function(ids) {
		var callID = getCallID();
		storage.outResources(ids)
		.then(emit(callID, events.resource.remove))
		.catch(failCall(callID));
		return callID;
	};
	
	/**
	 * 
	 * @method createRelation
	 * @param {Object} details
	 */
	this.createRelation = function(details) {
		var callID = getCallID();
		storage.putRelation(details)
		.then(emit(callID, events.relation.create))
		.catch(failCall(callID));
		return callID;
	};

	/**
	 *
	 * @method gatherRelations
	 * @param {Array | Number} ids
	 */
	this.gatherRelations = function(ids) {
		var callID = getCallID();
		storage.getRelations(ids)
		.then(emit(callID, events.relation.gather))
		.catch(failCall(callID));
		return callID;
	};

	/**
	 *
	 * @method removeRelations
	 * @param {Array | Number} ids
	 */
	this.removeRelations = function(ids) {
		var callID = getCallID();
		storage.outRelations(ids)
		.then(emit(callID, events.relation.remove))
		.catch(failCall(callID));
		return callID;
	};

	/**
	 *
	 * @method compileConstruct
	 * @param {Object} details
	 */
	this.compileConstruct = function(details) {
		var callID = getCallID();
		var construct = new Construct(emit, details);
		storage.putConstruct(construct)
		.then(emit(callID, events.construct.create))
		.catch(failCall(callID));
		return callID;
	};

	/**
	 *
	 * @method requestConstructs
	 * @param {Number} concept
	 * @param {Array | Number} resources
	 */
	this.requestConstructs = function(ids) {
		var callID = getCallID();
		storage.getConstructs(ids)
		.then(emit(callID, events.construct.gather))
		.catch(failCall(callID));
		return callID;
	};

	/**
	 *
	 * @method dismissConstructs
	 * @param {Number} id
	 */
	this.dismissConstructs = function(ids) {
		var callID = getCallID();
		storage.outConstructs(ids)
		.then(emit(callID, events.construct.remove))
		.catch(failCall(callID));
		return callID;
	};
	
	/**
	 *
	 * @method appendResource
	 * @param {Number} id Target Construct's ID
	 * @param {Array | Number} resources
	 */
	this.appendResources = function(id, resources) {
		var call = getCallID();
		storage.getConstructs([id])
		.then(function(construct) {
			construct = construct[id];
			construct.appendResources(call, resources);
			return {"id":construct.id};
		})
		.then(emit(call, events.construct.update))
		.catch(failCall(call));
		return call;
	};

	/**
	 *
	 * @method detachResources
	 * @param {Number} id Target Construct's ID
	 * @param {Array | Number} resources
	 */
	this.detachResources = function(id, resources) {
		var call = getCallID();
		storage.getConstructs([id])
		.then(function(construct) {
			construct = construct[id];
			construct.detachResources(call, resources);
			return {"id":construct.id};
		})
		.then(emit(call, events.construct.update))
		.catch(failCall(call));
		return call;
	};

	/**
	 *
	 * @method appendRelations
	 * @param {Number} id Target Construct's ID
	 * @param {Array | Number} relations
	 */
	this.appendRelations = function(id, relations) {
		var call = getCallID();
		storage.getConstructs([id])
		.then(function(construct) {
			construct = construct[id];
			construct.appendRelations(call, relations);
			return {"id":construct.id};
		})
		.then(emit(call, events.construct.update))
		.catch(failCall(call));
		return call;
	};

	/**
	 *
	 * @method detachRelations
	 * @param {Number} id Target Construct's ID
	 * @param {Array | Number} relations
	 */
	this.detachRelations = function(id, relations) {
		var call = getCallID();
		storage.getConstructs([id])
		.then(function(construct) {
			construct = construct[id];
			construct.detachRelations(call, relations);
			return {"id":construct.id};
		})
		.then(emit(call, events.construct.update))
		.catch(failCall(call));
		return call;
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

var events = module.exports.events = {};
events.resource = {};
events.resource.create = "resource:create";
events.resource.gather = "resource:gather";
events.resource.update = "resource:update";
events.resource.remove = "resource:remove";

events.relation = {};
events.relation.create = "relation:create";
events.relation.gather = "relation:gather";
events.relation.update = "relation:update";
events.relation.remove = "relation:remove";

events.construct = {};
events.construct.create = "construct:compile";
events.construct.gather = "construct:request";
events.construct.update = "construct:reshape";
events.construct.remove = "construct:dismiss";

events.error = "error";

module.exports.prototype.Construct = module.exports.Construct = Construct;
module.exports.prototype.Resource = module.exports.Resource = Resource;
module.exports.prototype.Relation = module.exports.Relation = Relation;
