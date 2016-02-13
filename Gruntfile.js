/*
 * Generated on 2015-02-17
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        config: {
            src: 'src',
            dist: 'dist'
        },
        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },
            scripts: {
                options: {
                    destPrefix: '<%= config.dist %>/assets/js'
                },
                files: {
                    '': '**/dist/**.min.js',
                    '/': '**/dist/js/**.min.js',
                }
            },
            css: {
                options: {
                    destPrefix: '<%= config.dist %>/assets/css'
                },
                files: {
                    '': '**/dist/**.min.css',
                    '/': '**/dist/css/**.min.css',
                }
            }
        },
        php: {
            dist: {
                options: {
                    port: 5000,
                    keepalive: true,
                    open: true,
                    base: 'dist'
                }
            }
        },
        // sass: {                              // Task
        //   dist: {                            // Target
        //     options: {                       // Target options
        //       style: 'compressed'
        //     },
        //     files: {
        //         'style/style.css' : 'sass/style.scss'
        //       }
        //   }
        // },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.dist %>/assets/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    '<%= config.dist %>/assets/js/main.min.js': ['src/scripts/{,*/}*.js']
                }
            }
        },
        watch: {
            assemble: {
                files: ['<%= config.src %>/{content,data,templates,html}/{,*/}*.{md,hbs,yml,html}'],
                tasks: ['assemble']
            },
            html: {
                files: ['<%= config.src %>/templates/{,*/}*.html'],
                tasks: ['copy'],
            },
            css: {
                files: ['src/assets/css/main.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            js: {
                files: ['<%= config.src %>/scripts/{,*/}*.js'],
                tasks: ['uglify']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.dist %>/{,*/}*.html',
                    '<%= config.dist %>/{,*/.php}*.php',
                    '<%= config.dist %>/assets/{,*/}*.css',
                    '<%= config.dist %>/assets/{,*/}*.js',
                    '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.dist %>'
                    ]
                }
            }
        },
        assemble: {
            options: {
                plugins: ['grunt-assemble-permalinks', 'other/plugins/*'],
                permalinks: {
                    structure: ':foo/index.html'
                }
            },
            pages: {
                options: {
                    flatten: true,
                    assets: 'assets',
                    layout: '<%= config.src %>/templates/layouts/default.hbs',
                    data: '<%= config.src %>/data/*.{json,yml}',
                    partials: '<%= config.src %>/templates/partials/*.hbs',
                    plugins: ['assemble-contrib-permalinks', 'assemble-contrib-sitemap', 'assemble-contrib-toc'],
                        permalinks: {
                          structure: ':basename:ext'
                        }
                },
                files: {
                    '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.{hbs,php}'],
                }
            }
        },

        copy: {
            html: {
                expand: true,
                cwd: 'src/templates/html',
                src: '**/*',
                dest: '<%= config.dist %>'
            },
            json: {
                expand: true,
                cwd: 'src/data',
                src: '**/*',
                dest: '<%= config.dist %>/assets/json'
            },
            // bootstrap: {
            //   expand: true,
            //   cwd: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
            //   src: '**/*',
            //   dest: '<%= config.dist %>/assets/css'
            // },
            fontawesome: {
                expand: true,
                cwd: 'bower_components/fontawesome/fonts/',
                src: '**/*',
                dest: '<%= config.dist %>/assets/fonts'
            },
            // theme: {
            //   expand: true,
            //   cwd: 'src/assets/',
            //   src: '**',
            //   dest: '<%= config.dist %>/assets/css/'
            // },
            php: {
                expand: true,
                cwd: 'src/php',
                src: '**',
                dest: '<%= config.dist %>/'
            },
            image: {
                expand: true,
                cwd: 'src/assets/img',
                src: '**',
                dest: '<%= config.dist %>/assets/img/'
            },
            // scripts: {
            //   expand: true,
            //   cwd: '<%= config.src %>/scripts/',
            //   src: '**',
            //   dest: '<%= config.dist %>/assets/js/'
            // }
        },

        // Before generating any new files,
        // remove any previously-created files.
        clean: ['<%= config.dist %>/**/*.{html,xml,php, js, css}']

    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-sass');


    grunt.registerTask('serve', [
        'copy',
        'uglify',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'cssmin',
        'uglify',
        'bowercopy',
        'assemble',
    ]);

    grunt.registerTask('phpRun', ['php']);

    grunt.registerTask('default', [
        'build'
    ]);

};
