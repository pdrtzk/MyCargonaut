<p align="center">
   <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/MyCargonaut_Logo.svg" alt="Logo von MyCargonaut" width="60%" height="60%">
</p>

<h2 align="center">My Cargonaut</h2>

<p align="center">
  My Cargonaut is a Angular-Web-Application for offering or searching private transports and lifts to other customers. The customer, named Cargonaut, can setup an account for *0,99€ per month. After registration cargonauts can access the administration of his vehicles, posts and profile. 
</p>

*_Hinweis: This is a fictional project the class "Konzepte moderner Softwareentwicklung". No costs will be charged._

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

# Table of contents

- [Setup the project](#Setup-the-project)


## Setup the project
- [Fork the project](https://github.com/Dxree/MyCargonaut)
- Install [node.js](https://github.com/nodejs)
- Import [the SQL-Database](https://github.com/Dxree/MyCargonaut/blob/main/config/cargonaut_new.sql) into a preferred SQL-Webserver-Application.
- You won't need to compile the [server.ts](https://github.com/Dxree/MyCargonaut/blob/main/server.ts)
- Look up the [config.skeleton](https://github.com/Dxree/MyCargonaut/blob/main/config/config.skeleton), generate a new config.ts file, make changes if needed. Then compile your config.ts.
- Install the [package.json](https://github.com/Dxree/MyCargonaut/blob/main/package.json) via `npm install`
- For starting the project with the server type `ng run MyCargonaut:serve-ssr` or start it via the [package.json](https://github.com/Dxree/MyCargonaut/blob/main/package.json)
- Now the project should be available at localhost (see command line)
- If you just want to start the Angular FrontEnd Webserver, type `ng serve` or `ng build --watch` or just compile the Angular project with `ng build`

## Used Packages

[![npm](https://img.shields.io/npm/v/npm)](https://www.npmjs.com/package/npm)
[![npm](https://img.shields.io/npm/v/@angular/cli?label=AngularCLI)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/github/v/release/nodejs/node?label=nodejs)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/npm/v/@ng-bootstrap/ng-bootstrap?label=ng-bootstrap)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/npm/v/bootstrap?color=%23563D7C&label=bootstrap)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/npm/v/express?color=%23545F6A&label=express)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/github/v/release/google/material-design-icons?color=%23BDBDBD&label=material-design-icons)](https://www.npmjs.com/package/@angular/cli)


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
