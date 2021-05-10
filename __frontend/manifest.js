"use strict";

/**
 * Name: manifest.js
 * Description: generate manifest.json
 * Main Module: manifest.js
 * Author: Epyo - stephen D.
 * Version: 1.0.0
 */

const fs = require('fs')
const pkg  = require('./package.json')

const input  = process.cwd() + '/public/manifest.json'
const output = process.cwd() + '/' + pkg.name

let manifest = fs.readFileSync(input, 'utf8').replace( /{{pkg.name}}/gi, pkg.name )

fs.writeFile(output + '/manifest.json', manifest, (err) => err ? console.log(err) : console.log('manifest.json generate') )