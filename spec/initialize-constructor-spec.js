
describe("Synthesis library Construct", function() {
	var Synthesis = require("../lib");
	
	var construct;
	
	it("can be instantiated", function() {
		construct = new Synthesis.Construct({}, {});
		expect(construct).toBeDefined();
	});
	
	it("has unique event identifiers identified on the static 'events' property", function() {
		var scanned = [];
		
		var scan = function(index) {
			for(var key in index)
				if(index[key] instanceof Object)
					scan(index[key]);
				else {
					expect(scanned.indexOf(index[key])).toBe(-1);
					scanned.push(index[key]);
				}
		};
		
		scan(Synthesis.Construct.events);
	});
});
