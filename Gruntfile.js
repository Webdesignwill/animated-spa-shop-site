module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      options: {
        '-W043': true // multiline strings
      },
      all: ['Gruntfile.js', 'public/js/**/*.js', '!public/js/libs/**/*.js']
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 4 versions']
          })
        ]
      },
      dist: {
        src: 'public/assets/stylesheets/*.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-postcss');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('prefix', ['postcss:dist']);

  grunt.registerTask('default', ['jshint', 'prefix']);
};
