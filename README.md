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

## UML-Klassendiagramm

## Datenbankmodell

## Wichtige Projektkonventionen


# Funktionalität von MyCargonaut

## Eigene Buchungen einsehen

Angemeldete Benutzer können über den Menüpunkt "Buchungen" aktuelle und vergangene
Buchungen verwalten. Durch Klicken auf die jeweiligen Tab-Überschriften lässt sich
zwischen Buchungsein- und Ausgang umschalten: Links befindet sich eine Übersicht 
aller Buchungen, die zu einem Post gehören, der vom angemeldeten Benutzer erstellt
wurde. Im rechten Tab sind alle Posts aufgelistet, die vom Cargonauten selbst
gebucht wurden.

In der Buchungsübersicht sind Buchungsstatus ("aufgetragen", "unterwegs" oder "abgeschlossen")
und der Name des Postautors angezeigt. Für mehr Informationen muss der Benutzer
über den entsprechenden Button auf die Post-Detailseite navigieren.
Die Ansicht in der Postübersicht bietet außerdem einen direkten Link zum Chat mit dem
Autor des Posts, sowie für abgeschlossene Buchungen die Möglichkeit, eine Buchung zu bewerten.

#### Buchung bewerten

Über den Button "Bewerten" öffnet sich ein Akkordionelement, in dem der Benutzer eine
kurze Bewertung für den Autor des Posts hinterlassen kann. Dazu kann er einen bis fünf
Sterne vergeben, sowie einen Kommentar im Freitextfeld hinterlassen. Wird eine Bewertung
abgesendet, folgt eine automatische Weiterleitung auf das Profil des bewerteten Nutzers.

## Post Details

#### Besucher-Ansicht

 Die Post Seite bietet suchenden Cargonauten einige weitere Informationen zu Fahrtdetails,
 Fahrzeug und Autor, sowie die Möglichkeit, die Fahrt zu buchen oder mit dem Autor Kontakt aufzunehmen.
 
 Wichtig für den Besucher sind vor allem die Informationen über Start- und Zielort der
 Fahrt, Preis und bevorzugte Zahlungsart, sowie die Zeiten und noch verfügbaren Plätze im Fahrzeug (hier wird unterschieden zwischen
 Sitz- und Ladeplätzen). Die Art des gesuchten oder angebotenen Fahrzeugs wird oben rechts
 zusätzlich als Icon angezeigt, hier sind aktuell die Fahrzeugtypen PKW, LKW, Transporter, 
 Schiff und Flugzeug möglich.
 
Um den Cargonauten, der den Post erstellt hat, besser einschätzen zu können, wird auf dem
Post der Durchschnitt aus den bisherigen Bewertungen des Autors angezeigt.

Alle weiteren Informationen müssen aus dem Beschreibungstext entnommen, oder im Chat erfragt
werden.

#### Autoren-Ansicht

Gelangt ein Cargonaut auf einen von ihm selbst verfassten Post, hat er die Möglichkeit,
einige der Postdetails zu bearbeiten. Bearbeitet werden können Preis und Zahlungsart, 
freie Sitze, Start- und Endzeitpunkt sowie die Beschreibung. Außerdem kann der Benutzer,
falls er mehrere Fahrzeuge angelegt hat, über ein Dropdown aus diesen auswählen.

##### Fahrten-Vorschläge

Unter den Postdetails werden drei zufällige weitere Posts aus der Datenbank als 
Vorschaukarten angezeigt, die dem Benutzer Anregungen für weitere verfügbare oder gesuchte Fahrten geben sollen
