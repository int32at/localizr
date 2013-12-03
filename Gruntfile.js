module.exports = function(grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		coffee: {
      compile: {
        files: {
          "dist/<%= pkg.name %>-<%= pkg.version %>.js": ["src/*.coffee"],
          'spec/allSpecs.js' : ['spec/*Spec.coffee']
        }
      }
    },

		uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n"
      },
      dist: {
        files: {
          "dist/<%= pkg.name %>-<%= pkg.version %>.min.js" : ["dist/<%= pkg.name %>-<%= pkg.version %>.js"]
        }
      }
    },

		jasmine: {
			pivotal: {
				src: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
				options: {
					specs: 'spec/allSpecs.js',	
					'--web-security' : false,
					'--local-to-remote-url-access' : true,
					'--ignore-ssl-errors' : true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.registerTask('default', ['coffee', 'uglify', 'jasmine']);
};