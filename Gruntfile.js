module.exports = function( grunt ) {
 
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'), 
		
		babel: {
	        options: {
	        	// compact: true,
	            sourceMap: true,
	            minified: true,
	            presets: ['env']
	        },
	        dist: {
	            files: {
	                'public/javascripts/main.js' : 'public/javascripts/_main.js'
	            }
	        }
	    },

		less: { 			
			build: { 				
				options: { 					
					yuicompress: true,
					compress: true
				},  				
				files: { 					
					"public/stylesheets/style.css" : "public/less/style.less",
				}
			} 		
		}, // less  

		watch : {
			less: { 				
				files: [ 'public/less/**/*' ], 				
				tasks: [ 'less' ] 			
			},  			

			js: { 				
				files: [ 'public/javascripts/**/*' ], 				
				tasks: [ 'babel' ] 			
			}
		} // watch		  	
	});	  	

	// Plugins do Grunt  	
	grunt.loadNpmTasks( 'grunt-babel' ); 
	grunt.loadNpmTasks( 'grunt-contrib-less' ); 	
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	// Tarefas que serão executadas 	
	grunt.registerTask( 'build', [ 'less', 'babel' ] ); 	

	// Tarefa para Watch 	
	grunt.registerTask( 'w', [ 'watch' ] ); 
	
};