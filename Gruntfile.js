module.exports = function (grunt) {

    // globs where our JS files are found - used below in uglify and watch
    var jsFilePaths = [
        'scripts/*.js',
        'scripts/js/*.js'
    ];

    // Project configuration
    grunt.initConfig({
        // you can read in JSON files, which are then set as objects. We use this below with banner
        pkg: grunt.file.readJSON('package.json'),

        // setup some variables that we'll use below
        appDir: 'web',
        builtDir: 'www',

        requirejs: {
            // creates a "main" requirejs sub-task (grunt requirejs:main)
            // we *could* have other sub-tasks for using requirejs with other
            // files or configuration
            main: {
                options: {
                    mainConfigFile: '<%= appDir %>/scripts/config.js',
                    appDir: '<%= appDir %>',
                    baseUrl: './scripts',
                    dir: '<%= builtDir %>',
                    // will be taken care of with compass
                    optimizeCss: "standard",
                    // will be taken care of with an uglify task directly
                    optimize: "none",

                    /**
                     * The list of modules that should have their dependencies packed into them.
                     *
                     * For each module listed here, Require.js will read
                     * that modules dependencies and package them in the
                     * file. It will additionally add in any modules (and
                     * their dependencies) specified in the "include" and
                     * exclude any modules (and their dependencies) specified
                     * in "exclude".
                     */
                    modules: [
                        // First set up the common build layer.
                        {
                            // module names are relative to baseUrl
                            name: 'as24.modules',
                            // List common dependencies here. Only need to list
                            // top level dependencies, "include" will find
                            // nested dependencies inside each of these
                            exclude: ['as24']
                        },


                        // Now set up a build layer for each page, but exclude
                        // the common one. "exclude" will exclude nested
                        // the nested, built dependencies from "common". Any
                        // "exclude" that includes built modules should be
                        // listed before the build layer that wants to exclude it.
                        // "include" the appropriate "app/main*" module since by default
                        // it will not get added to the build since it is loaded by a nested
                        // require in the page*.js files.
                        {
                            // module names are relative to baseUrl/paths config
                            name: 'as24',
                            exclude: ['as24.modules']
                        }
                    ]
                }
            }
        },

        uglify: {
            options: {
                // a cute way to put a banner on each uglified file
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                /*
                 * I'm not sure if finding files recursively is possible. This is
                 * a bit ugly, but it accomplishes the task of finding all files
                 * in the built directory (that we want) and uglifying them.
                 *
                 * Additionally, I created a little self-executing function
                 * here so that I could re-use the jsFilePaths from above
                 *
                 * https://github.com/gruntjs/grunt-contrib-uglify/issues/23
                 */
                files: (function() {

                    var files = [];
                    jsFilePaths.forEach(function(val) {
                        files.push({
                            expand: true,
                            cwd: '<%= builtDir %>',
                            src: val,
                            dest: '<%= builtDir %>'
                        });
                    });

                    return files;
                })()
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= appDir %>/scripts/{,*/}*.js'
            ]
        },
        bump: { //Bump package version, create tag, commit, push ...
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        }

        // use compass to compile everything in the "sass" directory into "css"
//        compass: {
//            // the "production" build subtask (grunt compass:dist)
//            dist: {
//                options: {
//                    sassDir: '<%= builtDir %>/sass',
//                    cssDir: '<%= builtDir %>/css',
//                    environment: 'production',
//                    outputStyle: 'compressed'
//                }
//            },
//            // the "development" build subtask (grunt compass:dev)
//            dev: {
//                options: {
//                    sassDir: '<%= appDir %>/sass',
//                    cssDir: '<%= appDir %>/css',
//                    outputStyle: 'expanded'
//                }
//            }
//        },

        // run "Grunt watch" and have it automatically update things when files change
//        watch: {
//            // watch all JS files and run jshint
//            scripts: {
//                // self executing function to reuse jsFilePaths, but prefix each with appDir
//                files: (function() {
//                    var files = [];
//                    jsFilePaths.forEach(function(val) {
//                        files.push('<%= appDir %>/'+val);
//                    });
//
//                    return files;
//                })(),
//                tasks: ['jshint'],
//                options: {
//                    spawn: false
//                }
//            },
//            // watch all .scss files and run compass
//            compass: {
//                files: '<%= appDir %>/sass/*.scss',
//                tasks: ['compass:dev'],
//                options: {
//                    spawn: false
//                }
//            }
//        }

    });

    // Load tasks from our external plugins. These are what we're configuring above
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-phonegap-build');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-exec');
//    grunt.loadNpmTasks('grunt-contrib-compass');
//    grunt.loadNpmTasks('grunt-contrib-watch');

    // the "default" task (e.g. simply "Grunt") runs tasks for development
//    grunt.registerTask('default', ['jshint', 'compass:dev']);
    grunt.registerTask('default', ['jshint']);

    // register a "production" task that sets everything up before deployment
//    grunt.registerTask('production', ['jshint', 'requirejs', 'uglify', 'compass:dist']);
    grunt.registerTask('prod', ['jshint', 'requirejs', 'uglify']);
};