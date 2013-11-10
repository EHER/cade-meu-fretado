module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        manifest: {
            generate: {
                options: {
                    preferOnline: false,
                    timestamp: true,
                    hash: true,
                    basePath: 'www'
                },
                src: [
                    "*.html",
                    "*/*.html",
                    "js/*.js",
                    "css/*.css",
                    "js/vendor/*/*.js",
                    "js/vendor/*/*.css",
                    "images/*.png"
                ],
                dest: "www/cache.manifest"
            }
        },
        release: {
            options: {
                npm: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-release');

    grunt.registerTask('default', []);
};
