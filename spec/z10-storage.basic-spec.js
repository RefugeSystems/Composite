
describe("Synthesis Basic Storage subsystem", function() {
	var Storage = require("../lib/storage");
	
	var construct, resources, relations;
	
	beforeEach(function() {
		construct = new Storage();
		
		resources = [];
		resources[0] = {
			"name": "R1",
			"id": 4
		};
		resources[1] = {
			"name": "R2",
			"id": 5
		};
		resources[2] = {
			"name": "R-random",
			"id": 7438912
		};
		
		relations = [];
		relations[0] = {
			"id": 0,
			"source": 5,
			"target": 7438912
		};
		relations[1] = {
			"id": 4,
			"source": 4,
			"target": 5
		};
		relations[2] = {
			"id": 22,
			"source": 4,
			"target": 7438912
		};
	});
	
	it("stores a resource and can recall it", function(done) {
		construct.putResource(resources[0])
		.then(function() {
			return construct.putResource(resources[1]);
		})
		.then(function() {
			return construct.putResource(resources[2]);
		})
		.then(function() {
			return construct.getResources([4,5]);
		})
		.then(function(mapped) {
			expect(mapped[7438912]).not.toBeDefined();
			expect(mapped[4]).toBeDefined();
			expect(mapped[5]).toBeDefined();
			done();
		})
		.catch(done);
	});
	
	it("stores a relation and can recall it", function(done) {
		construct.putRelation(resources[0])
		.then(function() {
			return construct.putResource(resources[1]);
		})
		.then(function() {
			return construct.putResource(resources[2]);
		})
		.then(function() {
			return construct.putRelation(relations[0]);
		})
		.then(function() {
			return construct.putRelation(relations[1]);
		})
		.then(function() {
			return construct.putRelation(relations[2]);
		})
		.then(function() {
			return construct.getRelations([4,22]);
		})
		.then(function(mapped) {
			expect(mapped[0]).not.toBeDefined();
			expect(mapped[4]).toBeDefined();
			expect(mapped[22]).toBeDefined();
			return construct.getRelations([]);
		})
		.then(function(mapped) {
			expect(mapped[0]).not.toBeDefined();
			expect(mapped[4]).not.toBeDefined();
			expect(mapped[22]).not.toBeDefined();
			done();
		})
		.catch(done);
	});
	
	it("retrieves relations for given resources", function(done) {
		construct.putRelation(resources[0])
		.then(function() {
			return construct.putResource(resources[1]);
		})
		.then(function() {
			return construct.putResource(resources[2]);
		})
		.then(function() {
			return construct.putRelation(relations[0]);
		})
		.then(function() {
			return construct.putRelation(relations[1]);
		})
		.then(function() {
			return construct.putRelation(relations[2]);
		})
		.then(function() {
			return construct.getResourceRelations([4]);
		})
		.then(function(mapped) {
			expect(mapped[4]).not.toBeDefined();
			expect(mapped[5]).toBeDefined();
			expect(mapped[7438912]).toBeDefined();
			return construct.getResourceRelations([5]);
		})
		.then(function(mapped) {
			expect(mapped[7438912]).toBeDefined();
			expect(mapped[4]).not.toBeDefined();
			expect(mapped[5]).not.toBeDefined();
			return construct.getResourceRelations([7438912]);
		})
		.then(function(mapped) {
			expect(mapped[7438912]).not.toBeDefined();
			expect(mapped[4]).not.toBeDefined();
			expect(mapped[5]).not.toBeDefined();
			done();
		})
		.catch(done);
	});
	
	it("finishes with an object noting undefined resources when requesting a non-existent resources", function(done) {
		construct.getResources([4,22])
		.then(function(mapped) {
			expect(mapped).toBeDefined();
			expect(Object.keys(mapped).length).toBe(2);
			Object.keys(mapped).forEach(function(id) {
				expect(mapped[id]).not.toBeDefined();
			});
			done();
		})
		.catch(done);
	});
	
	it("finishes with an object noting undefined resources when requesting a non-existent relations", function(done) {
		construct.getRelations([4,22])
		.then(function(mapped) {
			expect(mapped).toBeDefined();
			expect(Object.keys(mapped).length).toBe(2);
			Object.keys(mapped).forEach(function(id) {
				expect(mapped[id]).not.toBeDefined();
			});
			done();
		})
		.catch(done);
	});
	
	xit("throws an error when attempting to put an existing resource ID", function(done) {
		
		done();
	});
	
	xit("throws an error when attempting to put an existing relation ID", function(done) {

		done();
	});
	
	xit("throws an error when attempting to put a resource that has no ID", function(done) {

		done();
	});

	xit("throws an error when attempting to put a relation that has no ID", function(done) {

		done();
	});

	xit("throws an error when attempting to put a relation that has no Source", function(done) {

		done();
	});

	xit("throws an error when attempting to put a relation that has no Target", function(done) {

		done();
	});
});
