module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.loadNpmTasks("gruntify-eslint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");
	
	var gruntConfiguration = {
		"pkg": grunt.file.readJSON("package.json"),
		"eslint": {
			"options": {
				"ecmaFeatures": {
					"modules": true
				},
				"globals": [
					"__dirname",
					"__filename",
					"setTimeout",
					"requireSubject",
					"EventEmitter",
					"random",
					"module",
					"require",
					"console",
					"Promise",
					"globals",
					"global",
					"process",
					"btoa",
					"atob",
					
					// Testing
					"generateTestData"
				],
				/* http://eslint.org/docs/rules/ */
				"rules": {
					"eqeqeq": 0,
					"curly": [2, "multi"],
					"no-undef": 2,
					"semi": 2,
					"indent": [2, "tab", {
						"ignoreComments": true,
						"MemberExpression": 0,
						"SwitchCase": 1,
						
					}],
					"comma-dangle": 2,
					"quotes": [2, "double"],
					"no-unused-vars": [2, {
						"varsIgnorePattern": "^ignore"
					}],
					"block-scoped-var": 2,
					"no-undef": 2,
					"semi": 2,
					"camelcase": 2,
					"max-depth": 2,
					"no-unused-vars": 1
				},
				"terminateOnCallback": false,
				"callback": function(response) {
					if(response.errorCount) {
						var result, message;
						for(result=response.results.length-1; result !== -1; --result) {
							if(!response.results[result].errorCount) {
								response.results.splice(result,1);
							} else {
								for(message=response.results[result].messages.length-1; message !== -1; --message) {
									if(response.results[result].messages[message].severity !== 2) {
										response.results[result].messages.splice(message,1);
									}
								}
							}
						}
					}
					return response;
				},
				"envs": ["nodejs", "jasmine"]
			},
			"target": ["lib/**/*.js", "spec/**/*.js"]
		},
		"watch": {
			"spec": {
				"files": ["lib/**/*.js", "spec/**/*.js"],
				"tasks": ["spec"]
			},
			"build": {
				"files": ["lib/**/*.js", "spec/**/*.js"],
				"tasks": ["spec", "docs"]
			},
			"lint": {
				"files": ["lib/**/*.js", "spec/**/*.js"],
				"tasks": ["lint"]
			}
		},
		"yuidoc": {
			"compile": {
				"name": "<%= pkg.name %>",
				"description": "<%= pkg.description %>",
				"version": "<%= pkg.version %>",
				"url": "<%= pkg.homepage %>",
				"options": {
					"paths": "./library",
					"outdir": "./docs"
				}
			}
		}
	};
	
	grunt.initConfig(gruntConfiguration);
	grunt.registerTask("jasmine", function() {
		var done = this.async();
		var Jasmine = require("jasmine");
		var jasmine = new Jasmine();
		
		var Reporter = require("jasmine-console-reporter");
		var reporter = new Reporter({
			colors:2,
			verbosity: 3,
			emoji: false
		});
		
		jasmine.configureDefaultReporter(false);
		jasmine.onComplete(done);
		jasmine.loadConfig({
			"spec_dir": "spec",
			"spec_files": ["**/*-spec.js"],
			"random": false,
			"helpers": [
				"**/_addon-*"
			]
		});
		
		
		jasmine.addReporter(reporter);

		jasmine.execute();
	});
	
	grunt.registerTask("spec", ["lint", "jasmine"]);
	grunt.registerTask("spec:live", ["spec", "watch:spec"]);
	grunt.registerTask("lint", ["eslint"]);
	grunt.registerTask("lint:live", ["lint", "watch:lint"]);
	grunt.registerTask("docs", ["yuidoc"]);
	grunt.registerTask("default", ["spec:live"]);
	grunt.registerTask("test", ["spec"]);
};
