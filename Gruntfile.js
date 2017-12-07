module.exports = function(grunt) {

  var env_var = grunt.file.readJSON('variables/environment.json');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    shopify: {
      options: {
        api_key: env_var.shopify.api_key,
        password: env_var.shopify.password,
        url: "wisecare.myshopify.com",
        base: "theme/",
        disable_growl_notifications: true
      }
    },


    handlebars: {
      compile: {
        options: {
          namespace: "templates",
          processName: function(filePath) {
            var name = "";
            filePath = filePath.split(".");
            filePath = filePath[0].split("/");
            name += filePath[2];
            for (var i = 3; i < filePath.length; i++) {
                name += "/" + filePath[i];
            };
            return name;
          }
        },
        files: {
          "theme/assets/templates.js": ["src/templates/**/*.hbs"]
        }
      }
    },


    sass: {
      options: {
        outputStyle: 'compressed'
      },
      compile: {
        files: {
            'theme/assets/all.css': 'src/scss/all.scss',
        }
      }
    },

    
    coffee: {
      shop: {
        files: {
          'theme/assets/app.js': [
            'src/coffee/app.coffee',
            'src/coffee/core/**/*.coffee',
            'src/coffee/models/**/*.coffee',
            'src/coffee/collections/**/*.coffee',
            'src/coffee/views/**/*.coffee',
            'src/coffee/routers/router.coffee']
        }
      }
    },

    uglify: {
      js: {
        files: {
          'theme/assets/app.min.js': ['theme/assets/app.js']
        }
      },
      handlebars: {
        files: {
          'theme/assets/templates.min.js': ['theme/assets/templates.js']
        }
      }
    },


    open: {
      start: {
        path: 'https://wisemenscare.com/',
        app: 'Google Chrome'
      }
    },


    watch: {
      shopify: {
        files: ["theme/**"],
        tasks: ["shopify"],
        options: {
          livereload: {
            host: 'localhost',
            port: 9000,
            key: grunt.file.read('keys/livereload.key'),
            cert: grunt.file.read('keys/livereload.crt')
          }
        }
      },
      handlebars: {
        files: 'src/templates/**/*.hbs',
        tasks: ['handlebars', 'uglify:handlebars'],
      },
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass'],
      },
      coffee: {
        files: 'src/coffee/**/*.coffee',
        tasks: ['coffee', 'uglify:js'],
      }
    }


  });


  grunt.loadNpmTasks('grunt-shopify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');



  grunt.registerTask('default', ['handlebars', 'sass', 'coffee', 'open', 'watch']);

};



