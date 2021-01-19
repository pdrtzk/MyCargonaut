<p align="center">
   <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/MyCargonaut_Logo.svg" alt="Logo von MyCargonaut" width="60%" height="60%">
</p>

<h2 align="center">My Cargonaut</h2>

<p align="center">
  Mein Cargonaut ist eine Angular-Web-Applikation um Angebote und Gesuche für private Speditionen und Mitfahrgelegenheiten aufzugeben. Der Kunde, auch Cargonaut genannt, kann für *0,99€ monatlich das Angebot nutzen. Nach der Registrierung können Cargonauten ihr Profil, Fahrzeuge und ihre Posts verwalten.
</p>

*_Hinweis: Dies ist ein fiktionales Projekt des Moduks 'Konzepte moderner Softwareentwicklung'. Es werden keine Kosten erhoben._

Dieses Projekt wurde generiert mit [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

# Inhaltsverzeichnis

- [Das Projekt aufsetzen](#Das-Projekt-aufsetzen)
- [Paketübersicht](#Verwendete-Pakete)
- [Testing und CI/CD](#Testing-und-CI/CD)
- [Funktionalität von MyCargonaut](#Funktionalität-von-MyCargonaut)


## Das Projekt aufsetzen
- [Das Projekt forken](https://github.com/Dxree/MyCargonaut)
- Installiere [node.js](https://github.com/nodejs)
- Importiere [die SQL-Datenbank](https://github.com/Dxree/MyCargonaut/blob/main/config/cargonaut_new.sql) into a preferred SQL-Webserver-Application.
- Du wirst die [server.ts](https://github.com/Dxree/MyCargonaut/blob/main/server.ts) nicht compilieren brauchen.
- Rufe die [config.skeleton](https://github.com/Dxree/MyCargonaut/blob/main/config/config.skeleton) auf, generiere anhand dieser eine neue config.ts und verändere die Einstellungen falls nötig. Dann kompiliere deine config.ts.
- Installiere die [package.json](https://github.com/Dxree/MyCargonaut/blob/main/package.json) via `npm install`
- Um das Projekt mitsamt des Servers zu starten schreibe `ng run MyCargonaut:serve-ssr` in die Konsole des Projektpfads oder starte es einfach über die [package.json](https://github.com/Dxree/MyCargonaut/blob/main/package.json).
- Jetzt sollte das Projekt local auf localhost laufen (siehe Konsole).


## Verwendete Pakete

[![npm](https://img.shields.io/npm/v/npm)](https://www.npmjs.com/package/npm)
[![npm](https://img.shields.io/npm/v/@angular/cli?label=AngularCLI)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/github/v/release/nodejs/node?label=nodejs)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/npm/v/@ng-bootstrap/ng-bootstrap?label=ng-bootstrap)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/npm/v/bootstrap?color=%23563D7C&label=bootstrap)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/npm/v/express?color=%23545F6A&label=express)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/github/v/release/google/material-design-icons?color=%23BDBDBD&label=material-design-icons)](https://www.npmjs.com/package/@angular/cli)
[![npm](https://img.shields.io/npm/v/jasmine-core?color=%238A4182&label=jasmine-core)](https://jasmine.github.io/)
[![npm](https://img.shields.io/npm/v/karma?color=%23429F87&label=karma)](https://github.com/karma-runner/karma)
[![npm](https://img.shields.io/npm/v/protractor?color=%23E33137&label=protractor)](https://github.com/angular/protractor)
[![npm](https://img.shields.io/npm/v/protractor?color=%23142640&label=tslint)](https://github.com/palantir/tslint)
[![npm](https://img.shields.io/npm/v/typescript?color=%233178C6&label=typescript)](https://github.com/microsoft/TypeScript)

# Testing und CI/CD

## Development server

Run `ng run MyCargonaut:serve-ssr` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
If you just want to start the Angular FrontEnd Webserver, type `ng serve` or `ng build --watch` or just compile the Angular project with `ng build`

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


# Projektplanung und Konventionen

## Vom Wireframe zum Prototyp

Eine Erstellung einer groben Skizze stellt den ersten Schritt zur Websitegestaltung dar. Darauf wurden Wireframes aufgebaut, welche bereits eine grobe Skizzierung der Websitefunktionalität darstellen. Diese wiederum wurden nach der Auswahl von Farb- und Stilkonventionen in einen Prototypen umgesetzt.

<h2 align="center"><a href="<a href="https://github.com/Dxree/MyCargonaut/tree/main/documentation/Skizze">Skizze</a></h2>
<p align="center">
   <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Skizze/1.jpeg" alt="Screenshot of HomeSite in Skizze" width="60%" height="60%">
</p>

<h1 align="center">
  ↓
</h1>

<h2 align="center"><a href="<a href="https://github.com/Dxree/MyCargonaut/tree/main/documentation/Wireframes">Wireframe</a></h2>
<p align="center">
   <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Wireframes/Home.png" alt="Screenshot of HomeSite in Wireframes" width="60%" height="60%">
</p>

<h1 align="center">
  ↓
</h1>

<h2 align="center"><a href="<a href="https://www.figma.com/proto/SRY39RYSBVFst1yHjrowCf/KMS-My-Cargonaut?node-id=4%3A18&scaling=min-zoom">Prototyp</a></h2>
<p align="center">
   <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/prototyp_home.png" alt="Screenshot of HomeSite in Ptrototyp" width="60%" height="60%">
</p>

## UML-Klassendiagramm

Es wurde für eine bessere Strukturierung des Projektes ein UML-Klassendiagramm erstellt. Die zentrale Einheit als Nutzer bildet der Cargonaut. Dieser kann Posts erstellen und besitzt Fahrzeuge. Außerdem kann er als Fahrer oder Teilnehmer einer Fahrt ein Fahrzeug nutzen und Bewertung abgeben/erhalten. Zusätzlich kann ein Cargonaut Chatnachrichten in Chats verfassen, welche jeweils immer genau 2 Cargonauten zugeordnet sind.

<p align="center">
   <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/MyCargonautDomains.png" alt="Screenshot of UML" width="60%" height="60%">
</p>


## Datenbankmodell

<p align="center">
   <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/screenshot_dbmodell.png" alt="Screenshot of DataBase Model" width="60%" height="60%">
</p>


## Wichtige Projektkonventionen

### Projektplanung

Die Projektplanung erfolgt über User Stories, die in Github Cards geschrieben und in ein [Kanban-Board](https://github.com/Dxree/MyCargonaut/projects/1) eingepflegt.
Dabei ist wichtig, dass wöchtentlich eine Planung statt findet und Cards entsprechend in ToDo geschoben werden. Jeder Autor muss seine eigenen zugeteilten Cards verschieben. Im wöchentlichen Meeting werden dann auch alle Cards reviewt (siehe "needs review"), bevor sie in Done verschoben werden dürfen oder erneut in den Kanban-Prozess eingepflegt werden müssen.

### Dokumentation

Werden neue Funktionalitäten in MyCargonaut eingepflegt, zusätzliche Pakete oder lizensierte Produkte verwendet, so sind diese entsprechend in der Dokumentation anzugeben.

### Testing

Für genauere Erklärung siehe [Testing und CI/CD](#Testing-und-CI/CD). Für neue Angular-Komponenten oder neue Angular-Services sind in der entsprechenden spec-Datei der Komponente / des Services Tests nach den Konventionen der [Angular-Testing Dokumentation](https://angular.io/guide/testing-services) zu schreiben.

### Farbkonvention

Folgende Farben sind zu verwenden:

<ul>
  <li style="color: #005b52">Grün: #005b52</li>
  <li style="color: #005b52">Hell-Grau: #f5f5f5</li>
  <li style="color: #005b52">Mittleres Grau: #e5e5e5</li>
  <li style="color: #005b52">Dunkel-Grau: #c4c4c4</li>
  <li style="color: #005b52">Weiss: #005b52</li>
</ul>

  
### Sprachkonvention

Die Dokumentation ist in Deutsch zu verfassen. Der Code, Variablen, Funktionen etc. sind in Englisch anzugeben und die Seitentexte sind auf Deutsch (siehe [Prototyp](#Projektplanung-und-konventionen)).

### Programmierkonvention

Für Bezeichner aus mehreren Wörtern ist der CamelCase zu verwenden.
Es ist sind soweit möglich die Programmierkonventionen von [Angular](https://angular.io/guide/property-binding-best-practices) einzuhalten.
Parallel zur Entwicklung sind entsprechende Tests zu schreibe, siehe [Testing und CI/CD](#Testing-und-CI/CD).
Die Verwendung von Bootstrap Flexbox und eine dementsprechende Responsivität ist erwartet.

# Funktionalität von MyCargonaut
