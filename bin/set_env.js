const fs = require('fs');
const process = require('process');
const path = require('path');
const argv_str = JSON.parse(process.env.npm_config_argv)['original'].pop().slice(2);
const beautify = require('js-beautify').js;
const chalk = require('chalk');

const JSON_OBJECT = require(path.join(__dirname, '../config'));

// module.exports.CALL_DIRECTIVE = argv_str => {
    // console.log(argv_str);
    // for (let i in JSON_OBJECT.config.projects) {
    //     if (JSON_OBJECT.config.projects[i]['name'] == argv_str) {
    //             JSON_OBJECT.config.dev = {
    //             name: JSON_OBJECT.config.projects[i].name
    //         };
    //     }
    // }

    let storeObject = JSON_OBJECT.config.projects.filter(x => x.name == argv_str)[0];
  
    
    // console.log(storeObject);
    if(!storeObject) throw(chalk.red('!!!!!!!找不到该项目，请检查配置文件!!!!!!!'));

    JSON_OBJECT.config.dev = {
        name: storeObject.name
    };

    let moduleWritter = `module.exports = ${JSON.stringify(JSON_OBJECT)}`;
    // console.log(moduleWritter);
    fs.writeFileSync(path.join(__dirname, '../config', 'index.js'), beautify(moduleWritter, { indent_size: 4, space_in_empty_paren: true }));
// }
    console.log('配置已过！')
// module.exports = (function(string){

//     console.log(string);
//     for (let i in JSON_OBJECT.config.projects) {
//         if (JSON_OBJECT.config.projects[i]['name'] == argv_str) {
//                 JSON_OBJECT.config.dev = {
//                 name: JSON_OBJECT.config.projects[i].name
//             };
//         }
//     }




//     let moduleWritter = `module.exports = ${JSON.stringify(JSON_OBJECT)}`;
//     // console.log(moduleWritter);
//     fs.writeFile(path.join(__dirname, 'projectsInfo.js'), beautify(moduleWritter, { indent_size: 4, space_in_empty_paren: true }), (err) => {
//         if (err) throw err;
//         console.log('设置成功');
//     });
// }).apply()


// module.exports = (argv_str) => {

//     // console.log(argv_str);
//     // CALL_DIRECTIVE()
// }



// JSON_OBJECT.config.dev.
// console.log(JSON_OBJECT);