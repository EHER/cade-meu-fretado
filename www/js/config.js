var require = {
    shim: {
        'leaflet': {
            exports: 'L',
            init: function () {
                return this.L.noConflict();
            }
        },
        'jquery.timeago.pt-br': ['jquery.timeago'],
        'jquery.timeago': ['jquery'],
        'jquery': {
            exports: 'jQuery',
            init: function () {
                return this.jQuery.noConflict();
            }
        }
    },
    paths: {
        'quo': 'vendor/quojs/quo',
        'lungo': 'vendor/lungo/lungo',
        'leaflet': 'vendor/leaflet-dist/leaflet',
        'jquery.timeago.pt-br': 'vendor/jquery-timeago/locales/jquery.timeago.pt-br',
        'jquery.timeago': 'vendor/jquery-timeago/jquery.timeago',
        'jquery': 'vendor/jquery/jquery.min'
    }
};

