module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    browserSync: {
        bsFiles: {
            src: [
                '**/*.css',
                '**/*.html'
                ]
        },
        options: {
            watchTask: false,
            server: {
                baseDir: "./"
            }
        }
    }
  });
  // Load the plugins tasks
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['browserSync']);
};