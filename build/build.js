({
    findNestedDependencies: true,	
    baseUrl: '../js',
    dir: '../built/js',
    mainConfigFile: '../js/main.js',
    optimize: 'uglify2',
    preserveLicenseComments: false,
    modules: [
        {
            name: "main",
        }
    ]    
})
