module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        manifest: {
            generate: {
                options: {
                    preferOnline: false,
                    timestamp: true,
                    hash: true,
                    basePath: 'app'
                },
                src: [
                    "*.html",
                    "*/*.html",
                    "js/*.js",
                    "css/*.css",
                    "vendor/*/*.js",
                    "vendor/*/*.css",
                    "images/*.png"
                ],
                dest: "app/cache.manifest"
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
