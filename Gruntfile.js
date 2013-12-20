module.exports = function(grunt) {
	'use strict';
	//All grunt related functions

	grunt.initConfig({
		jshint: {
			files: [
        'gruntfile.js'
        ,'app/controllers/*.js'
        ,'app/*.js'
        ,'app/views/*.js'
        ,'app/routes/*.js'
      ]
			,options: {
				eqeqeq: true
				,eqnull: true
				,latedef: true
				,undef: true
				,globalstrict:true
				,force:true
				,globals: {
					jquery: true
					,console: true
					,module: true
					,document: true
					,ember: true
					,$: true
					,app: true
				}
			}
		}
		,concat: {
      lib: {
				src: [
          'app/library/jquery-1.9.1.js'
          ,'app/library/handlebars-1.0.0.js'
          ,'app/library/ember-1.0.0.js'
          ,'app/library/ember-data.js'
          ,'app/library/bootstrap.min.js'
        ]
				,dest:'build/lib.js'
			}
			,libCss: {
				src: [
          'app/css/bootstrap-theme.min.css'
          ,'app/css/bootstrap.min.css'
          ,'app/css/entypo_sans_sm.css'
          ,'app/css/animations.css'
        ]
				,dest:'build/lib.css'
			}
			,app: {
				src: [
          'app/app.js'
          ,'build/templates.js'
          ,'app/controllers/*.js'
          ,'app/views/*.js'
          ,'app/routes/*.js'
        ]
				,dest:'build/app.js'
			}
			,debugLib: {
				src:'build/lib.js'
				,dest:'debug/lib.js'
			}
			,debugLibCss: {
				src:'build/lib.css'
				,dest:'debug/lib.css'
			}
			,debugApp: {
				src:'build/app.js'
				,dest:'debug/app.js'
			}
			,debugAppCss: {
				src:'build/app.css'
				,dest:'debug/app.css'
			}
			,test: {
				src: ['app/tests/*.js']
				,dest: 'qunit/tests.js'
			}
			,testLib: {
				src:'build/lib.js'
				,dest:'qunit/lib.js'
			}
			,testLibCss: {
				src:'build/lib.css'
				,dest:'qunit/lib.css'
			}
			,testApp: {
				src:'build/app.js'
				,dest:'qunit/app.js'
			}
			,testAppCss: {
				src:'build/app.css'
				,dest:'qunit/app.css'
			}
		}
		,sass: {
			css: {
				files: {
					'build/app.css': 'app/css/base.scss'
				}
			}
		}
		,ember_handlebars: {
			compile: {
				options: {
					processName: function(fileName) {
						var arr = fileName.split(".")
							,path = arr[arr.length - 2].split("/")
							,name = path[path.length - 1];
						return name;
					}
				}
				,files: {
					"build/templates.js": "app/templates/*.hbs"
				}
			}
		}
		,clean: {
      build: [
        "build/"
      ]
      ,debug: [
        "debug/"
      ]
      ,release: [
        "release/"
      ]
    }
		,copy: {
			debug: {
				files: [ {
					expand: true
					,cwd: 'app/images/'
					,src: ['**']
					,dest: 'debug/images/'
				},{
					expand: true
					,cwd: 'app/fonts/'
					,src: ['**']
					,dest: 'debug/fonts/'
				},{
					expand: false
					,src: 'app/index/debug.index.html'
					,dest: 'debug/index.html'
				} ]
			}
      ,release: {
				files: [ {
					expand: true
					,cwd: 'app/images/'
					,src: ['**']
					,dest: 'release/images/'
				},{
					expand: true
					,cwd: 'app/fonts/'
					,src: ['**']
					,dest: 'release/fonts/'
				},{
					expand: false
					,src: 'app/index/release.index.html'
					,dest: 'release/index.html'
				} ]
			}
		}
		,uglify: {
			app: {
				src: [
          'build/app.js'
        ]
				,dest: 'release/app.min.js'
			}
			,lib: {
				src: [
          'build/lib.js'
        ]
				,dest: 'release/lib.min.js'
			}
		}
		,cssmin: {
			compress: {
				files: {
					"release/app.min.css": ["build/app.css"]
          ,"release/lib.min.css": ["build/lib.css"]
				}
			}
		}
		,qunit: {
			all: {
				options: {
					urls: [
						'http://localhost:9092/index.html'
					]
					,force:true
				}
			}
		}
    ,hashres: {
      // Global options
      options: {
        // Optional. Encoding used to read/write files. Default value 'utf8'
        encoding: 'ascii',
        // Optional. Format used to name the files specified in 'files' property.
        // Default value: '${hash}.${name}.cache.${ext}'
        fileNameFormat: '${hash}.${name}.cache.${ext}',
        // Optional. Should files be renamed or only alter the references to the files
        // Use it with '${name}.${ext}?${hash} to get perfect caching without renaming your files
        // Default value: true
        renameFiles: true
      }
      // hashres is a multitask. Here 'prod' is the name of the subtask. You can have as many as you want.
      ,release: {
        // Specific options, override the global ones
        options: {
        // You can override encoding, fileNameFormat or renameFiles
        }
        // Files to hash
        ,src: [
          // WARNING: These files will be renamed!
          'release/lib.min.js'
          ,'release/app.min.js'
          ,'release/lib.min.css'
          ,'release/app.min.css'
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: 'release/index.html',
        }
    }
		,watch: {
			scripts: {
				files: [
          'app/library/*.js'
          ,'app/*.js'
          ,'app/controllers/*.js'
          ,'app/views/*.js'
          ,'app/routes/*.js'
          ,'app/css/*.scss'
          ,'app/templates/*.hbs'
          ,'app/tests/*.js'
        ]
				,tasks: [
          'ember_handlebars'
          ,'concat'
        ]
				,options: {
					debounceDelay: 100
				}
			}
			,tests: {
				files: [
          'app/tests/*.js'
        ]
				,tasks: [
          'qunit'
        ]
				,options: {
					debounceDelay: 100
				}
			}
			,images: {
				files: [
          'app/images/*'
        ]
				,tasks: [
          'clean'
          ,'copy'
        ]
				,options: {
					debounceDelay: 100
				}
			}
		}
		,connect: {
			debug: {
				options: {
					port: 9090
					,base: 'debug'
				}
			}
			,release: {
				options: {
					port: 9091
					,base: 'release'
				}
			}
			,test: {
				options: {
					port: 9092
					,base: 'qunit'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-ember-handlebars');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-hashres');

	grunt.registerTask('default'
    ,[
      'debug'
      ,'connect'
      ,'watch'
    ]);
	grunt.registerTask('debug'
    ,[
      'clean:build'
      ,'clean:debug'
      ,'copy:debug'
      ,'ember_handlebars'
      ,'sass'
      ,'concat'
    ]);
	grunt.registerTask('release'
    ,[
      'jshint'
      ,'clean:build'
      ,'clean:release'
      ,'copy:release'
      ,'ember_handlebars'
      ,'sass'
      ,'concat'
      ,'uglify'
      ,'cssmin'
      //,'hashres'
    ]);
};
