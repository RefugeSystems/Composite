
describe("Synthesis path operation", function() {
	var Synthesis = require("../lib");
	var Operation = require("../lib/operations/path");
	var construct;
	
	beforeAll(function() {
		construct = new Synthesis();
		generateTestData(construct);
	});
	
	it("can find a path when the resources are adjacent", function(done) {
		construct.operations.path([0, 1])
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
		construct.operations.path([0, 5])
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
		construct.operations.path([7, 5])
		.then(function(result) {
			done(new Error("Call should not succeed: " + JSON.stringify(result, null, 4)));
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
		construct.operations.path([4, 6])
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
