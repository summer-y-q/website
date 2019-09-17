const postcssPresetEnv = require('postcss-preset-env');
// const precss = require("precss");
// const cssnano = require("cssnano");

module.exports = {
    // ident: 'postcss',
    // parser: 'sugarss',
    parser: 'postcss-scss',
    plugins: {
        'postcss-import': {
            "plugins": [
                // require('postcss-scss'),
                require('precss'), 
                require('postcss-preset-env'), 
                require('postcss-cssnext')
            ]
        },
        'precss': {},

        'postcss-preset-env': {},
        
        'postcss-cssnext': {
            // warnForDeprecations: false,
            warnForDuplicates: false,
            features: {
                // customProperties: {
                    //     preserve: false,
                    //     variables: {
                        //         'themeColor': BUILD_OBJECT.feature.theme.element.color ? BUILD_OBJECT.feature.theme.element.color : '#3e8ef7',
                        //         'projectName': BUILD_OBJECT.name
                        
                        //     }
                        // }
                        
                        
                    }
                },
        // 'postcss-custom-properties': {},
        // 'postcss-color-function': {},
        // 'postcss-color-mix': {},
    }
    
}