({
    mainConfigFile: 'web/scripts/config.js', //relative path from start-bundle.build.js
    baseUrl: './scripts',
    appDir: 'web',
    dir: 'www',
    modules: [
        {
            name: 'as24.modules',
            exclude: ['as24']
        },
        {
            name: 'as24',
            exclude: ['as24.modules']
        }
    ],
})