
describe("Synthesis library working events", function() {
	var Synthesis = require("../lib"),
		Construct = Synthesis.Construct,
		Resource = Synthesis.Resource,
		Relation = Synthesis.Relation,
		syn,
		construct,
		resource,
		relation;
	
	beforeEach(function() {
		syn = new Synthesis();
	});
	
	describe("for Resources", function() {
		it("emit when create finishes", function(done) {
			var call;
			expect(Synthesis.events.resource.create).toBeDefined();
			
			syn.on(Synthesis.events.resource.create, function(event) {
				expect(event._callID).toBe(call);
				expect(parseInt(event._time)).toBe(event._time);
				done();
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			resource = new Resource({});
			call = syn.createResource(resource);
			expect(call).toBeDefined();
		});
		
		it("emit when gather finishes", function(done) {
			var call;
			expect(Synthesis.events.resource.gather).toBeDefined();
			
			syn.on(Synthesis.events.resource.gather, function(event) {
				expect(event._callID).toBe(call);
				expect(parseInt(event._time)).toBe(event._time);
				done();
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			call = syn.gatherResources([0]);
			expect(call).toBeDefined();
		});
		
		it("emit when remove finishes", function(done) {
			var call;
			expect(Synthesis.events.resource.remove).toBeDefined();
			
			syn.on(Synthesis.events.resource.remove, function(event) {
				expect(event._callID).toBe(call);
				expect(parseInt(event._time)).toBe(event._time);
				done();
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			call = syn.removeResources([0]);
			expect(call).toBeDefined();
		});
	});

	describe("for Relations", function() {
		it("emit when create finishes", function(done) {
			var call;
			expect(Synthesis.events.relation.create).toBeDefined();
			
			syn.on(Synthesis.events.relation.create, function(event) {
				expect(event._callID).toBe(call);
				expect(parseInt(event._time)).toBe(event._time);
				done();
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			relation = new Relation({});
			call = syn.createRelation(relation);
			expect(call).toBeDefined();
		});
		
		it("emit when request finishes", function(done) {
			var call;
			expect(Synthesis.events.relation.gather).toBeDefined();
			
			syn.on(Synthesis.events.relation.gather, function(event) {
				expect(event._callID).toBe(call);
				expect(parseInt(event._time)).toBe(event._time);
				done();
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			call = syn.gatherRelations([0]);
			expect(call).toBeDefined();
		});
		
		it("emit when remove finishes", function(done) {
			var call;
			expect(Synthesis.events.relation.remove).toBeDefined();
			
			syn.on(Synthesis.events.relation.remove, function(event) {
				expect(event._callID).toBe(call);
				expect(parseInt(event._time)).toBe(event._time);
				done();
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			call = syn.removeRelations([0]);
			expect(call).toBeDefined();
		});
	});

	describe("for Constructs", function() {
		it("emit when create finishes", function(done) {
			var call;
			syn.on(Synthesis.events.construct.create, function(event) {
				expect(event.id).toBe(construct.id);
				expect(event._callID).toBe(call);
				expect(parseInt(event._time)).toBe(event._time);
				done();
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			construct = {};
			construct.id = 0;
			call = syn.compileConstruct(construct);
			expect(call).toBeDefined();
		});
		
		it("emit when gather finishes", function(done) {
			var call;
			syn.on(Synthesis.events.construct.gather, function(event) {
				expect(event._callID).toBe(call);
				expect(parseInt(event._time)).toBe(event._time);
				done();
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			call = syn.requestConstructs([0]);
			expect(call).toBeDefined();
		});
		
		it("emit when remove finishes", function(done) {
			var call;
			syn.on(Synthesis.events.construct.remove, function(event) {
				expect(event._callID).toBe(call);
				expect(parseInt(event._time)).toBe(event._time);
				done();
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			call = syn.dismissConstructs([0]);
			expect(call).toBeDefined();
		});

		it("emit when resources appended", function(done) {
			var call,
				waiting = [
					Synthesis.events.construct.create,
					Synthesis.events.construct.update,
					Construct.events.resource.append
				];
			
			var assemble = function(event) {
				waiting.splice(waiting.indexOf(event), 1);
				if(waiting.length === 0)
					done();
			};
			
			syn.on(Synthesis.events.construct.create, function(event) {
				assemble(Synthesis.events.construct.create);
				expect(syn.appendResources(0, [2,3])).toBeDefined();
			});
			
			syn.on(Synthesis.events.construct.update, function(event) {
				expect(event.id).toBe(construct.id);
				assemble(Synthesis.events.construct.update);
			});
			
			syn.on(Construct.events.resource.append, function(event) {
				assemble(Construct.events.resource.append);
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			construct = {};
			construct.id = 0;
			call = syn.compileConstruct(construct);
			expect(call).toBeDefined();
		});

		it("emit when resources detached", function(done) {
			var call,
				waiting = [
					Synthesis.events.construct.create,
					Synthesis.events.construct.update,
					Construct.events.resource.detach
				];
			
			var assemble = function(event) {
				waiting.splice(waiting.indexOf(event), 1);
				if(waiting.length === 0)
					done();
			};
			
			syn.on(Synthesis.events.construct.create, function(event) {
				assemble(Synthesis.events.construct.create);
				expect(syn.detachResources(0, [2,3])).toBeDefined();
			});
			
			syn.on(Synthesis.events.construct.update, function(event) {
				expect(event.id).toBe(construct.id);
				assemble(Synthesis.events.construct.update);
			});
			
			syn.on(Construct.events.resource.detach, function(event) {
				assemble(Construct.events.resource.detach);
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			construct = {};
			construct.id = 0;
			call = syn.compileConstruct(construct);
			expect(call).toBeDefined();
		});

		it("emit when relations appended", function(done) {
			var call,
				waiting = [
					Synthesis.events.construct.create,
					Synthesis.events.construct.update,
					Construct.events.relation.append
				];
			
			var assemble = function(event) {
				waiting.splice(waiting.indexOf(event), 1);
				if(waiting.length === 0)
					done();
			};
			
			syn.on(Synthesis.events.construct.create, function(event) {
				assemble(Synthesis.events.construct.create);
				expect(syn.appendRelations(0, [2])).toBeDefined();
			});
			
			syn.on(Synthesis.events.construct.update, function(event) {
				assemble(Synthesis.events.construct.update);
				expect(syn.appendRelations(0, [2])).toBeDefined();
			});
			
			syn.on(Construct.events.relation.append, function(event) {
				assemble(Construct.events.relation.append);
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			construct = {};
			construct.id = 0;
			call = syn.compileConstruct(construct);
			expect(call).toBeDefined();
		});

		it("emit when relations detached", function(done) {
			var call,
				waiting = [
					Synthesis.events.construct.create,
					Synthesis.events.construct.update,
					Construct.events.relation.detach
				];
			
			var assemble = function(event) {
				waiting.splice(waiting.indexOf(event), 1);
				if(waiting.length === 0)
					done();
			};
			
			syn.on(Synthesis.events.construct.create, function(event) {
				assemble(Synthesis.events.construct.create);
				expect(syn.detachRelations(0, [2])).toBeDefined();
			});
			
			syn.on(Synthesis.events.construct.update, function(event) {
				expect(event.id).toBe(construct.id);
				assemble(Synthesis.events.construct.update);
			});
			
			syn.on(Construct.events.relation.detach, function(event) {
				assemble(Construct.events.resource.detach);
			});
			
			syn.on(Synthesis.events.error, function(error) {
				expect(error._callID).toBe(call);
				done(error);
			});
			
			construct = {};
			construct.id = 0;
			call = syn.compileConstruct(construct);
			expect(call).toBeDefined();
		});
	});
});
