module.exports = function (grunt) {

	const sass = require('node-sass');

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Concat definitions
		concat: {
			dist: {
				src: ["public/app.js", "public/vendor.js"],
				dest: "dist/harmonized-viewer.js"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/harmonized-viewer.js", "test/**/*"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		jscs: {
			src: "src/**/*.js",
			options: {
				config: ".jscsrc"
			}
		},

		// Minify definitions
		uglify: {
			dist: {
				src: ["dist/harmonized-viewer.js"],
				dest: "dist/harmonized-viewer.min.js"
			},
			options: {
			}
		},

		// SASS definitions
		sass: {
			options: {
				implementation: sass,
				sourceMap: false
			},
			dist: {
				files: {
					'dist/main.css': 'src/scss/main.scss'
				}
			}
		},

		// Browserify definitions
		browserify: {
			vendor: {
				src: [],
				dest: 'public/vendor.js',
				options: {
					require: ['jquery'],
					alias: {
						
					}
				}
			},
			client: {
				src: ['src/**/*.js'],
				dest: 'public/app.js',
				options: {
					external: ['jquery'],
				}
			}
		},

		// karma test runner
		karma: {
			unit: {
				configFile: "karma.conf.js",
				background: false,
				singleRun: false,
				browsers: ["Firefox"]
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: ["src/**/*", "test/**/*"],
			tasks: ["default"]
		}

	});

	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	//grunt.loadNpmTasks( "grunt-contrib-coffee" );
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-karma");
	grunt.loadNpmTasks("grunt-browserify");

	grunt.registerTask("lint", ["jshint", "jscs"]);
	grunt.registerTask("build", ["browserify", "concat", "uglify", "sass"]);
	grunt.registerTask("default", ["jshint", "build"]);
};
