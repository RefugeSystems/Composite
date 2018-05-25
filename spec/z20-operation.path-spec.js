
describe("Synthesis path operation", function() {
	var Synthesis = require("../lib");
	var Operation = require("../lib/operations/path");
	var Resource = Synthesis.Resource;
	var Relation = Synthesis.Relation;
	
	var construct,
		resource,
		relation;
	
	beforeAll(function() {
		construct = new Synthesis();
		
		resource = {};
		resource.name = "A";
		resource.id = 0;
		construct.createResource(new Resource(resource));
		resource = {};
		resource.name = "B";
		resource.id = 1;
		construct.createResource(new Resource(resource));
		resource = {};
		resource.name = "C";
		resource.id = 2;
		construct.createResource(new Resource(resource));
		resource = {};
		resource.name = "D";
		resource.id = 3;
		construct.createResource(new Resource(resource));
		resource = {};
		resource.name = "E";
		resource.id = 4;
		construct.createResource(new Resource(resource));
		resource = {};
		resource.name = "F";
		resource.id = 5;
		construct.createResource(new Resource(resource));
		resource = {};
		resource.name = "G";
		resource.id = 6;
		construct.createResource(new Resource(resource));
		resource = {};
		resource.name = "H";
		resource.id = 7;
		construct.createResource(new Resource(resource));
		
		relation = {};
		relation.name = "AB";
		relation.id = 10;
		relation.source = 0;
		relation.target = 1;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "BC";
		relation.id = 11;
		relation.source = 1;
		relation.target = 2;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "CD";
		relation.id = 12;
		relation.source = 2;
		relation.target = 3;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "DE";
		relation.id = 13;
		relation.source = 3;
		relation.target = 4;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "EF";
		relation.id = 14;
		relation.source = 4;
		relation.target = 5;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "AH";
		relation.id = 15;
		relation.source = 0;
		relation.target = 7;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "BG";
		relation.id = 16;
		relation.source = 1;
		relation.target = 6;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "DG";
		relation.id = 17;
		relation.source = 3;
		relation.target = 6;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "GH";
		relation.id = 18;
		relation.source = 6;
		relation.target = 7;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "EH";
		relation.id = 19;
		relation.source = 4;
		relation.target = 7;
		construct.createRelation(new Relation(relation));
	});
	
	it("can find a path when the resources are adjacent", function(done) {
		construct.operations.path(0,1)
		.then(function(result) {
			expect(result).toBeDefined();
			expect(result.path).toBeDefined();
			expect(result.path.length).toBe(2);
			expect(result.link.length).toBe(1);

			expect(result.path[0]).toBe(0);
			expect(result.path[1]).toBe(1);

			expect(result.link[0]).toBe(10);
			
			done();
		})
		.catch(done);
	});
	
	it("can find a path when the resources are not adjacent", function(done) {
		construct.operations.path(0,5)
		.then(function(result) {
			expect(result).toBeDefined();
			expect(result.path).toBeDefined();
			expect(result.path.length).toBe(6);
			expect(result.link.length).toBe(5);

			expect(result.path[0]).toBe(0);
			expect(result.path[1]).toBe(1);
			expect(result.path[2]).toBe(2);
			expect(result.path[3]).toBe(3);
			expect(result.path[4]).toBe(4);
			expect(result.path[5]).toBe(5);

			expect(result.link[0]).toBe(10);
			expect(result.link[1]).toBe(11);
			expect(result.link[2]).toBe(12);
			expect(result.link[3]).toBe(13);
			expect(result.link[4]).toBe(14);
			
			done();
		})
		.catch(done);
	});
	
	it("Reports unrelated when no path exists between the resources with no immediate relationships to the source", function(done) {
		construct.operations.path(7,5)
		.then(function(result) {
			done(new Error("Call should not succeed"));
		})
		.catch(function(err) {
			expect(err).toBeDefined();
			expect(err.message).toBe(Operation.messages.notFound);
			expect(err.source).toBe(7);
			expect(err.target).toBe(5);
			done();
		});
	});
	
	it("Reports unrelated when no path exists between the resources with some immediate relationships to the source", function(done) {
		construct.operations.path(4, 6)
		.then(function(result) {
			console.log(result);
			done(new Error("Call should not succeed"));
		})
		.catch(function(err) {
			expect(err).toBeDefined();
			expect(err.message).toBe(Operation.messages.notFound);
			expect(err.source).toBe(4);
			expect(err.target).toBe(6);
			done();
		});
	});
});
