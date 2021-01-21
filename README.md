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

- [Projekt Setup](#Projekt-Setup)
- [Paketübersicht](#Verwendete-Pakete)
- [Testing und CI/CD](#Testing-und-CICD)
- [Projektplanung und Konventionen](#Projektplanung-und-Konventionen)
- [Funktionalität von MyCargonaut](#Funktionalität-von-MyCargonaut)


# Projekt Setup

## Vorraussetzungen
- Abgeschlossene Installation von [node.js](https://github.com/nodejs)
- Abgeschlossene Installation von [MySQL](https://www.mysql.com/de/)
- Dieses [Projekt](https://github.com/Dxree/MyCargonaut) heruntergeladen bzw. geforkt

## Installation aller Abhängingkeiten
Um die Anwendung starten zu können, müssen zunächst alle Abhängigkeiten installiert werden. Das geht über das Terminal mit dem Befehl `npm install`.

```sh
cd MyCargonaut
npm install
```

## Setup der Datenbank
Das Projekt verwendet eine lokale MySQL Datenbank. Zur Einrichtung dieser sind folgende Schritte nötig:

1. Benutzer in MySQL wie folgt anlegen:
    * Benutzername: `root`
    * Host: `localhost`
    * Passwort: *keins*
2. Datenbank für Benutzer `root@localhost` namens `cargonaut_db` anlegen.
3. Das SQL-Skript, das unter [config/cargonaut_db.sql](https://github.com/Dxree/MyCargonaut/blob/main/config/cargonaut_db_.sql) zu finden ist, ausführen.
4. Überprüfen ob Datenbank erfolgreich eingerichtet wurde:
    Dazu die folgende Query ausführen und den Output vergleichen.
    ```sql
    SELECT COUNT(*) FROM cargonaut;
    ```
    Ist das Ergebnis `5`? Dann wurde alles richtig gemacht und die Datenbank ist jetzt einsatzbereit.


### Individuellen Datenbank Einstellungen verwenden
Alternativ kann auch Benutzername, Host, Passwort und Datenbankname individuell gewählt werden. Dazu müssen die entsprechenden Felder in der [config/config.skeleton](https://github.com/Dxree/MyCargonaut/blob/main/config/config.skeleton) geändert werden, eine `config.ts`-Datei daraus erstellt werden und im Anschluss mittels `tsc config/config.ts` kompiliert werden.

Es kann auch direkt die [config/config.js](https://github.com/Dxree/MyCargonaut/blob/main/config/config.js)-Datei angepasst werden.

### Setup unter Linux
Wird das Projekt unter Linux eingerichtet muss beim Datenbank-Setup darauf geachtet werden, dass die Authentifizierungsmethode des MySQL-Benutzers auf `mysql_native_password` (und nicht `auth_socket`) gesetzt ist. Diese ist nicht immer voreingestellt.
Weitere Infos dazu [hier](https://thequickblog.com/how-to-change-authentication-method-in-mysql/).


## Anwendung starten
Die Anwendung wird über das Terminal mit dem Befehl
```sh
npm run dev:ssr
```
gestartet. Anschließend kann unter http://localhost:4200/ darauf zugegriffen werden.


# Verwendete Pakete

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

## Testing

Zum Testen der Anwendung wurden verschiedene Testszenarien für die einzelnen Angular Komponenten und Services geschrieben. Diese sind im MyCargonaut/src-Ordner in verteilten `.spec`-Dateien definiert. Als Framework für diese Tests wurde Karma (mit Jasmine) genutzt.
Die weiteren Einstellungen zu Karma können der [karma.conf.js](https://github.com/Dxree/MyCargonaut/blob/main/karma.conf.js) entnommen werden.

Um die Szenarien lokal zu testen muss der Befehl `ng test` ausgeführt werden. Dabei kann die Option `--watch=false` genutzt werden, um den Testprozess nach einmaliger Ausführung direkt wieder zu beenden und nicht auf Änderungen im Code zu warten.

**Info:** Die Karma Tests werden in einem HeadlessChrome-Browser ausgeführt, damit diese auch innerhalb einer CI Pipeline getestet werden können.


### Continuous Integration [![Build Status](https://travis-ci.com/Dxree/MyCargonaut.svg?branch=main)](https://travis-ci.com/Dxree/MyCargonaut)

Pushes und Pull Requests im [GitHub-Repository]() des Projekts wurden mittels [Travis CI](https://travis-ci.com/) automatisiert getestet.
Dabei wurden folgende Befehle ausgeführt bzw. getestet:
* Statische Code-Analyse: `ng lint`
* Kompilieren und bauen des Servers und Angular Frontends: `npm run build:ssr`
* Ausführen der spec-Tests des Angular Frontends: `ng test --watch=false`

**Info:** Das gratis Credit-Kontingent für Travis CI wurde am 12.01.2020 aufgebraucht, weshalb seit dem keine weiteren Builds stattgefunden haben. Stattdessen sollte vor jedem Push mittels der oben aufgeführen Strategie manuell und lokal getestet werden.


## Deployment

Da es sich bei der Anwendung um eine Fullstack Anwendung mit Server und Datenbank handelt, kann diese nicht auf statischen Website-Hosting Services, wie GitHub Pages, deployt werden.

**Disclaimer:** Die Anwendung ist nirgends vollständig deployt, jedoch teilweise auf Heroku. Zu den Gründen kann man in den nachfolgenden Abschnitten mehr lesen.

### Deployment mit Firebase

Angular Universal Projekte können ganz leicht auf [Firebase](https://firebase.google.com/) deployt werden. Dazu müssen nur zwei Befehle ausgeführt werden:
```sh
ng add @angular/Firebase
ng deploy
```
Leider gehört das Deployment einer Serverseitig gerenderten App bei Firebase jedoch zu den Funktionen für die eine Kreditkarte hinterlegt werden muss, auch wenn die eigentliche Funktion kostenlos ist und auch so beworben wird. Das versuchte Deployment endete deshalb mit dieser Ausgabe auf der Konsole:

![Firebase Deployment](https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/firebase_deployment.png?raw=true)


### Deployment mit Heroku

[Heroku](https://www.heroku.com/) ist ein "Platform as a Service (PaaS)"-Dienst mit dem sich u.A. Node.js Projekte im Web bereitstellen lassen. Dabei bietet Heroku viele Einstellungsmöglichkeiten und Add-Ons.

Das Angular Frontend und der Node.js w/ express Server ließen sich sehr gut dort deployen. Jedoch fehlt die Datenbank und macht die Anwendung in Folge dort unbenutzbar, da man lediglich die Seiten Home (ohne Angebote und Gesuche), Login und Registrieren ansehen kann, jedoch nicht deren Funktionalitäten, wie das Anmelden, benutzen kann, da keine Verbindung zu einer Datenbank besteht. Das hat den Grund, dass sich zu Beginn der Entwicklung für eine MySQL Datenbank entschieden wurde und Heroku grundsätzlich nur eine PostgreSQL Datnebank zur Verfügung stellt. Dennoch gibt es eine Auswahl an Add-Ons, die eine MySQL Datenbank in Heroku integrieren können. Diese sind [ClearDB MySQL](https://elements.heroku.com/addons/cleardb), [JawsDB MySQL](https://elements.heroku.com/addons/jawsdb) und [JawsDB Maria](https://elements.heroku.com/addons/jawsdb-maria). Obwohl alle einen ausreichenden und kostenlosen Bezahlplan haben wurde beim tatsächlichen Versuch eine Datenbank in Heroku damit einzurichten klar, dass man für die Nutzung dieser Add-Ons einen verifizierten Heroku-Account benötigt. Da dies auch hier nur mit einer Kreditkarte möglich ist und wir mitten in der Entwicklung unserer Anwendung nicht einfach die Datenbank wechseln wollten, kamen wir auch mit dieser Deployment-Variante nicht final ans Ziel.

Dennoch ist die (teilweise) deployte Anwendung auf Heroku unter https://mycargonaut.herokuapp.com/ zu finden.
*Nach längerem Nicht-Besuchen der Seite schläft die Anwendung ein. Das laden dieser Anwendung kann daher initial einige Momente dauern.*

### Continuous Delivery

Da es kein (vollständig) erfolgreiches Deployment gibt, gibt es auch *keine* Nutzung einer Continuous Delivery und die Anwendung wurde bisher nur manuell bereitgestellt. Das Einbauen eines automatischen Deployments für den `main`-Branch nach erfolgreichem Testen über Travis CI war geplant und kann jedezeit ergänzt werden.

Dazu muss lediglich die [travis.yml](https://github.com/Dxree/MyCargonaut/blob/main/.travis.yml) um den folgenden Abschnitt erweitert werden:
```yml
deploy:
  provider: heroku
  api_key:
    secure: "API KEY HERE"
  app: mycargonaut
  on:
    branch: main
```

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
Während der Aufbau ähnlich wie beim Klassenmodell ist, wurden beim Datenbankmodell die Primär- und Fremdschlüssel ergänzt und diese miteinander verknüpft. Beim Löschen werden verknüpfte Einträge ebenfalls gelöscht, um das Ansammeln von Datenleichen zu verhindern und trotzdem zu gewährleisten, dass ein Nutzer etwas löschen kann. Außerdem wurden kleinere Anpassungen im Vergleich zum Klassenmodell vorgenommen. Beispielsweise durch die Zwischentablle "buchung".

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

## Startseite
Auf der Startseite der Anwendung sind aktuelle Posts von anderen Cargonauten zu sehen. Mit verschiedenen Filteroptionen 
lassen sich die Suchergebnisse einschränken. Außerdem gibt es ein Suchfeld, um nach Posts mit spezifischen Inhalten zu suchen.

<p align="center">
   <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/start.PNG" alt="Startseite von MyCargonaut" width="60%" height="60%">
</p>

## Authentifizierung
Über die Navbar kommt der Nutzer außerdem zur Registrierung oder zur Anmeldung. (siehe Bild oben)

Über den Button "Registrieren" bekommt der Nutzer die Möglichkeit, einen neuen Cargonauten auf der Plattform anzulegen und sich anschließend mit diesem anzumelden.
<p align="center">
   <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/registrieren.PNG" alt="Registrierungsfenster von MyCargonaut" width="60%" height="60%">
</p>


Über den Button "anmelden" können sich Nutzer, die bereits ein Nutzerprofil haben, in ihr Profil einloggen. Dadurch können selbst Posts erstellt und gebucht, 
sowie das persönliche Profil bearbeitet werden.
<p align="center">
    <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/login.PNG" alt="Anmeldefenster von MyCargonaut" width="60%" height="60%">
</p>

## Persönliches Profil
Nach der Anmeldung ist der Button "Profil" in der Navigationsleiste sichtbar. Dieser führt zum eigenen Profil, welches die bei der Registrierung angegebenen Informationen beinhaltet.
<p align="center">
    <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/profil.PNG" alt="Profil von MyCargonaut" width="60%" height="60%">
</p>

### Fahrzeugverwaltung
Über den Button "Fahrzeug hinzufügen" kann der Nutzer Fahrzeuge in seinem persönlichen Profil hinterlegen. Hierbei kann er Typ, Modell, Anzahl der 
Sitzplätze und einen Kommentar eingeben. Die Informationen über die erstellten Fahrzeuge werden direkt im Profil dargestellt und können hier bearbeitet werden. Außerdem kann man Fahrzeuge durch das Lösch-Symbol aus der Liste entfernen.

Die Fahrzeuge können beim Erstellen eines Angebots ausgewählt werden, um so die Daten eines Fahrzeugs in einen Post zu übernehmen.

<p align="center">
    <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/fahrzeug.PNG" alt="Fahzeugverwaltung von MyCargonaut" width="60%" height="60%">
</p>

### Bewertungen
Unter dem Abschnitt Bewertungen befinden sich alle Bewertungen, die der Cargonaut zu seinen Fahrten erhalten hat. Mit Klick auf einen Namen lässt sich auch das Profil des Cargonauten einsehen, der die Bewertung geschrieben hat. Eine Bewertung besteht aus einer Punkt/Sternzahl und einem Kommentar.

### Profil bearbeiten
Durch einen Klick auf das Bearbeitungssymbol lassen sich die Nutzerinformationen jederzeit ändern. Weitere Funktionen zur Bearbeitung bzw. Löschung des Profils bieten die Buttons "Passwort ändern", "Profilbild ändern" und "Nutzer entfernen" unterhalb des Profilbildes.

## Post erstellen
Über den "+" - Button auf dem Home Bereich lässt sich ein neuer Post erstellen. Zu Beginn muss entschieden werde, ob es sich um ein Angebot oder ein Gesuch handelt. In beiden Fällen müssen die 
allgemeinen Informationen angegeben werden (Zeit, Startort, Zielort, Bezahlart, Preis, Kommentar). Handelt es sich um ein Angebot, erhält der Nutzer unter "Fahrzeug" eine Liste mit seinen zuvor erstellten Fahrzeugen.
Bei Auswahl eines Fahrzeugs werden die Anzahl der Sitzplätze und der Laderraum in den Post übernommen, können aber auch noch angepasst werden.

<p align="center">
    <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/postErstellen.PNG" alt="Post Erstellen Formular von MyCargonaut" width="60%" height="60%">
</p>

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

<p align="center">
    <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/bookings_2.PNG" alt="Post Erstellen Formular von MyCargonaut" width="60%" height="60%">
</p>

Über den Button "Bewerten" öffnet sich ein Akkordionelement, in dem der Benutzer eine
kurze Bewertung für den Autor des Posts hinterlassen kann. Dazu kann er einen bis fünf
Sterne vergeben, sowie einen Kommentar im Freitextfeld hinterlassen. Wird eine Bewertung
abgesendet, folgt eine automatische Weiterleitung auf das Profil des bewerteten Nutzers.

## Post Details

#### Besucher-Ansicht


<p align="center">
    <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/post_view.PNG" alt="Post Erstellen Formular von MyCargonaut" width="60%" height="60%">
</p>


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

<p align="center">
    <img src="https://github.com/Dxree/MyCargonaut/blob/main/documentation/Screenshots/post_edit.PNG" alt="Post Erstellen Formular von MyCargonaut" width="60%" height="60%">
</p>

Gelangt ein Cargonaut auf einen von ihm selbst verfassten Post, hat er die Möglichkeit,
einige der Postdetails zu bearbeiten. Bearbeitet werden können Preis und Zahlungsart, 
freie Sitze, Start- und Endzeitpunkt sowie die Beschreibung. Außerdem kann der Benutzer,
falls er mehrere Fahrzeuge angelegt hat, über ein Dropdown aus diesen auswählen.

##### Fahrten-Vorschläge

Unter den Postdetails werden drei zufällige weitere Posts aus der Datenbank als 
Vorschaukarten angezeigt, die dem Benutzer Anregungen für weitere verfügbare oder gesuchte Fahrten geben sollen
