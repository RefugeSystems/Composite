
describe("Synthesis library", function() {
	var Synthesis = require("../lib");
	
	var construct, test;
	
	it("can be instantiated", function() {
		construct = new Synthesis();
		expect(construct).toBeDefined();
	});
	
	it("accepts options without error", function() {
		construct = new Synthesis({});
		expect(construct).toBeDefined();
	});
});
