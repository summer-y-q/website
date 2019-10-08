const path = require("path");
const webpack = require("webpack");
const { spawnSync, spawn } = require("child_process");
const process = require("process");
const rimraf = require("rimraf");
const WebpackDevServer = require("webpack-dev-server");
const portFinder = require("portfinder");
const opn = require("opn");

const ora = require("ora");
const chalk = require("chalk");
const log = console.log;

const original = JSON.parse(process.env.npm_config_argv).original;
// let LAST_ARG = original.length >= 2 ? original[original.length - 1].replace(/\-+/gmi, '') : null;
// console.log(LAST_ARG);
// console.log(process.env.ENV);

// const CALL_DIRECTIVE = require('./bin/set_env').CALL_DIRECTIVE;

// LAST_ARG && CALL_DIRECTIVE(LAST_ARG);


const spinner = new ora({
    text: "<--------------- building --------------->",
    spinner: {
        interval: 80,
        frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
    }
});

let hasBuild = false;

webpackBundler();

// const noWrongToBuild = () => {
//     const fillAction = spawnSync("node", ["bin/fillComponent.js"]);
//     fillAction.status === 0 ? webpackBundler() : chalkType(fillAction.stderr);
// }

// if (/-/.test(original[original.length - 1])) {
//     let setEnvAction = spawnSync("node", [ "bin/set_env.js", original[original.length - 1] ]);


//     if(setEnvAction.status === 1) {
//         chalkType(setEnvAction.stderr);
//     } else {
//         webpackBundler();
//         // const fillAction = spawnSync("node", ["bin/fillComponent.js"]);
//         // fillAction.status === 0 ?  : chalkType(fillAction.stderr);
//     }

// } else {
//     noWrongToBuild();
// }



function chalkType(text, type) {
    if(type) {
        chalk[type](text);
    } else {
        throw chalk.red(text);
    }
}

function webpackBundler() {

    const webpackConfig = require("./bin/webpack.config")({
        ENV: process.env.ENV_TYPE
    });

    if (process.env.ENV_TYPE == "DEVELOPMENT") {
        portFinder.getPort((err, port) => {
            if (err) throw err;

            const devServerOptions = {
                contentBase: "./static/sites",
                publicPath: "/",
                hot: true,
                stats: { colors: true },
                open: true,
                port: port,
                host: "localhost",
                historyApiFallback: true,

            };

            WebpackDevServer.addDevServerEntrypoints(
                webpackConfig,
                devServerOptions
            );

            const RUNTIME = webpack(webpackConfig);

            const server = new WebpackDevServer(RUNTIME, devServerOptions);

            server.listen(port, "0.0.0.0", data => {
                console.log(`Page is served at http://localhost:${port}`);

                // opn(`http://localhost:${port}/`);
            });
        });
    } else {
        // clean
        // rimraf.sync("dist");
        log(chalk.green("<--------------- clean done --------------->"));

        const RUNTIME = webpack(webpackConfig);

        // build
        RUNTIME.run((err, stats) => {
            if (err) {
                log(chalk.red(err));
                spinner.fail("<--------------- build failed --------------->");
            }

            // spinner.succeed('<--------------- build done --------------->');
            log(chalk.blue(stats.toString()));
        });
    }
}
