module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              // Task
        dist: {                            // Target
            options: {                       // Target options
                style: 'expanded'
            },
            files: {                         // Dictionary of files
                'public/css/style.max.css': 'public/css/style.scss',       // 'destination': 'source'
            }
        }
    },
    cssnano: {
            dist: {
                files: {
                    'public/css/style.nano.unprefixed.css': 'public/css/style.max.css'
                }
            }
        },
    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
        },
        dist: {
            files: {
                'public/css/style.css': 'public/css/style.nano.unprefixed.css'
            }
        }
    },
    watch: {
        sass: {
            files: ['public/style.scss','public/css/**/*.scss'],
            tasks: ['sass','cssnano','postcss']
        }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false)
            //because of watch as mocha test files require which gets cached and we don't want caching
        },
        src: ['test/**/*.js']
      }
    },
/*    watch: { use for testing
        js: {
                options: {
                  spawn: false,
                },
                files: ['test/**\/getPolls.js','app/\*.js'],
                tasks: ['mochaTest']
            },
        css: {
            files: ['**\/*.scss'],
            tasks: ['sass']
        }
    }
*/
});

  // Load the plugin that provides the "uglify" task.
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-cssnano');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', ['watch']);

};
