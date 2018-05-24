
describe("Synthesis options", function() {
	var Synthesis = require("../lib");
	
	var construct, test;
	
	beforeEach(function() {
		construct = new Synthesis();
	});
	
	it("has valid default options", function() {
		test = construct.options();
		expect(test).toBeDefined();
		expect(test.storage).toBe("BasicStorage");
	});
});
