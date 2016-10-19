//Gruntfile.js
module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            cssmin: {
                files: ["css/*.css", "!css/*.min.css"],
                tasks: ['cssmin']
            },
            concat: {
                files: ["app/**/*.js", "!app/**/*.min.js"],
                tasks: ['concat']
            },
            uglify: {
                files: ["app/**/*.js", "!app/**/*.min.js"],
                tasks: ['uglify']
            }
        },
        // Cssmin task config
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: { //Fichero combinado   //Ficheros que vamos a combinar, 2 .css
                    'css/app.min.css': ['css/style.css']
                }
            }
        },
        jshint: {
            all: [ /*'onepass.min.js'*/ ]
        },
        concat: {
            dist: {
                src: [
                    'app/scripts/app.js',
                    'app/services/services.js',
                    'app/controllers/loginCtrl.js',
                    'app/controllers/managerCtrl.js'

                ],
                dest: "app/app.concat.js"
            }
        },
        uglify: {
            dist: {
                src: "app/app.out.js",
                dest: "app/app.min.js"
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-browser-sync');
    // grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // grunt.loadNpmTasks('grunt-newer');

    //Tarea por defecto
    grunt.registerTask('default', [ /*'browserSync',*/ 'watch', 'cssmin', 'jshint', 'concat', 'uglify']);

};
