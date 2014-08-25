require.config({
    baseUrl: 'web/scripts',
    paths: {
        'angular': 'vendor/angular/angular',
        'angular-animate': 'vendor/angular-animate/angular-animate.min',
        'angular-resource': 'vendor/angular-resource/angular-resource.min',
        'angular-sanitize': 'vendor/angular-sanitize/angular-sanitize.min',
        'angular-route': 'vendor/angular-route/angular-route',
        'angular-touch': 'vendor/angular-touch/angular-touch.min',
        'angular-bootstrap': 'vendor/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-swipe': 'vendor/angular-swipe/dist/angular-swipe',

        'bootstrap': 'vendor/bootstrap/dist/js/bootstrap.min',
        'jquery': 'vendor/jquery/dist/jquery.min',
        'jquery-i18n': 'vendor/jquery-i18n-properties/jquery.i18n.properties',
        'jquery-touchswipe': 'vendor/jquery-touchswipe/jquery.touchSwipe.min',
        'highcharts': 'vendor/highcharts/highcharts',
        'async': 'vendor/requirejs-plugins/src/async'
    },
    shim: {
        'angular-route':['angular'],
        'angular-animate':['angular'],
        'angular-resource':['angular'],
        'angular-sanitize': ['angular'],
        'angular-touch': ['angular'],
        'angular-bootstrap': ['angular', 'bootstrap'],
        'angular-swipe': ['angular-touch'],

        'bootstrap':  ['jquery'],
        'jquery-i18n': ['jquery'],
        'jquery-touchswipe': ['jquery'],
        'highcharts': ['jquery']
    },
    waitSeconds: 40
});