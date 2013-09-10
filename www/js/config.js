var require = {
    shim: {
        leaflet: {
            exports: 'L',
            init: function () {
                return this.L.noConflict();
            }
        },
        jquery: {
            exports: 'jQuery',
            init: function () {
                return this.jQuery.noConflict();
            }
        }
    },
    paths: {
        quo: 'vendor/quojs/quo',
        lungo: 'vendor/lungo/lungo',
        leaflet: 'vendor/leaflet-dist/leaflet',
        jquery: 'vendor/jquery/jquery.min'
    }
};

