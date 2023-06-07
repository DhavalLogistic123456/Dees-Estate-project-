import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
const modulesPath = `${__dirname}/Modules`;
console.log("modulesPath",modulesPath);
import fs from 'fs';
import { defaultsDeep } from "lodash";
const fs = fs;
let allModules = fs.readdirSync(modulesPath).filter(function (file) {
    return fs.statSync(modulesPath+'/'+file).isDirectory();
});

allModules = ['Blog'];
console.log("this is ");
module.exports = Promise.all(allModules.map(async target => {
    let modulePath = `${modulesPath}/${target}`;
    console.log("modulePath",modulePath);

}))
/*  const ComponentFactory = require('laravel-mix/src/components/ComponentFactory')
const WebpackConfig = require('laravel-mix/src/builder/WebpackConfig')

const modulesPath = `${__dirname}/Modules`;
const fs = require('fs');

let allModules = fs.readdirSync(modulesPath).filter(function (file) {
                    return fs.statSync(modulesPath+'/'+file).isDirectory();
                });

allModules = ['Blog'];
module.exports = Promise.all(allModules.map(async target => {
    let modulePath = `${modulesPath}/${target}`;

    
     // As our first step, global variables are build or
    //  reset with default value.
     
    let mix = require('laravel-mix/src/index');

    
     // We'll pull in the user's mix file.
     // Based on what the user requests in that file,
     // a generic config object will be constructed for us.
     
    new ComponentFactory().installAll()

    require(path.join(modulePath, `webpack.mix`))
    mix.setPublicPath('public');

    
    // Just in case the user needs to hook into this point
    // in the build process, we'll make an announcement.
     //
    Mix.dispatch('init', Mix)
    
     // Now that we know which build tasks are required by the
    // user, we can dynamically create a configuration object
    // for Webpack. And that's all there is to it. Simple!
     
    const config = new WebpackConfig().build()
    config.name = target

    return config
}))
  */