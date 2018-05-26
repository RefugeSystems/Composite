var Synthesis = require("../lib"),
	Resource = Synthesis.Resource,
	Relation = Synthesis.Relation,
	resource,
	relation;

console.log("test");
global.generateTestData = function(construct) {
	
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
};
