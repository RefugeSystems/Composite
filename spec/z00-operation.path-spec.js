
describe("Synthesis path operation", function() {
	var Synthesis = require("../lib");
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
		relation.id = 1;
		relation.source = 0;
		relation.target = 1;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "BC";
		relation.id = 2;
		relation.source = 1;
		relation.target = 2;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "CD";
		relation.id = 3;
		relation.source = 2;
		relation.target = 3;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "DE";
		relation.id = 4;
		relation.source = 3;
		relation.target = 4;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "EF";
		relation.id = 5;
		relation.source = 4;
		relation.target = 5;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "EF";
		relation.id = 5;
		relation.source = 4;
		relation.target = 5;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "BG";
		relation.id = 6;
		relation.source = 1;
		relation.target = 6;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "DG";
		relation.id = 6;
		relation.source = 3;
		relation.target = 6;
		construct.createRelation(new Relation(relation));
		
		relation = {};
		relation.name = "GH";
		relation.id = 7;
		relation.source = 6;
		relation.target = 7;
		construct.createRelation(new Relation(relation));
	});
	
	it("can find a path when the resources are adjacent", function(done) {
		construct.operations.path(0,1)
		.then(function(path) {
			
			done();
		})
		.catch(done);
	});
	
	it("can find a path when the resources are not adjacent", function() {
		
	});
	
	it("Reports unrelated when no path exists between the resources", function() {
		
	});
});
