const fs = require("fs");

const process = require("process");

const path = require("path");

// console.log(path.join(__dirname, '..', 'src', 'views'));

const PROJECT_DIR = path.join(__dirname, "..", "src", "views");

// const PROJECT_DIR = path.resolve(__dirname, "..", "views", ROUTE_MAP.name);
// const JSON_OBJECT = require(path.join(__dirname, "projectsInfo.json"));

// const menu = require(path.join(__dirname, "..", "src", "menu.json"));
const ROUTE_MAP = require(path.join(PROJECT_DIR, "modules.json"));

const JSONParser = ROUTE_MAP.modules = ROUTE_MAP.modules.map(_module => {
    // let object = {...module};
    // console.log(object);

    _module.url = _module.key && _module.key.replace('modules_', '').replace(/\_/gmi, '-')
    // menu.forEach(data => {
    //     // console.log(data);
    //     if (data.label == route.label) {
    //         route.key = data.url.replace(/\//gmi, "_");
    //     }
    // });
    return _module;
});

// console.log(ROUTE_MAP);
// let formatRoute = (array) => {
//     return array.map((foo)=> {
//         return (`{
//             path: "/${foo.path}",
//             component: () => import("../views/modules/${foo.path}.vue")
//         }`)
//     })
// };

// let routes = `export default [${formatRoute(ROUTE_MAP.modules)}]`


fs.writeFile(
    path.join(PROJECT_DIR, "..", "views/modules.json"),
    JSON.stringify(JSONParser),
    err => {
        if (err) throw err;
        console.log("设置成功");
    }
);
