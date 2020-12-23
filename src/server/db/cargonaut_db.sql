-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Dez 2020 um 19:26
-- Server-Version: 10.1.38-MariaDB
-- PHP-Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `cargonaut_db`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bewertung`
--

CREATE TABLE `bewertung` (
  `id` int(25) NOT NULL,
  `verfasser` int(11) UNSIGNED NOT NULL,
  `fahrt` int(11) UNSIGNED NOT NULL,
  `punktzahl` int(1) UNSIGNED NOT NULL,
  `kommentar` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bezahlungsart`
--

CREATE TABLE `bezahlungsart` (
  `id` int(255) UNSIGNED NOT NULL,
  `art` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `beschreibung` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `cargonaut`
--

CREATE TABLE `cargonaut` (
  `id` int(255) UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `lastname` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `username` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `password` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `email` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `geburtsdatum` date NOT NULL,
  `adresse` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;


-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chat`
--

CREATE TABLE `chat` (
  `id` int(11) UNSIGNED NOT NULL,
  `cargonaut_1` int(11) UNSIGNED NOT NULL,
  `cargonaut_2` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chatnachricht`
--

CREATE TABLE `chatnachricht` (
  `id` int(255) UNSIGNED NOT NULL,
  `nachricht` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `zeit` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `verfasser` int(255) UNSIGNED NOT NULL,
  `chat` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fahrzeug`
--

CREATE TABLE `fahrzeug` (
  `id` int(255) UNSIGNED NOT NULL,
  `art` int(255) NOT NULL,
  `anzahl_sitzplaetze` int(255) NOT NULL,
  `sonstiges` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `ladeflaeche` int(11) NOT NULL,
  `besitzer` int(255) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fahrzeug_art`
--

CREATE TABLE `fahrzeug_art` (
  `id` int(11) NOT NULL,
  `art` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `Beschreibung` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `laderaum`
--

CREATE TABLE `laderaum` (
  `id` int(255) NOT NULL,
  `ladeflaeche_laenge_cm` int(255) NOT NULL,
  `ladeflaeche_breite_cm` int(255) NOT NULL,
  `ladeflaeche_hoehe_cm` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `post`
--

CREATE TABLE `post` (
  `id` int(255) UNSIGNED NOT NULL,
  `standort` int(255) UNSIGNED NOT NULL,
  `zielort` int(255) UNSIGNED NOT NULL,
  `start_zeit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ankunft_zeit` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `bezahlungsart` int(255) UNSIGNED NOT NULL,
  `laderaum` int(255) NOT NULL,
  `fahrzeug` int(255) UNSIGNED NOT NULL,
  `gebucht` tinyint(1) NOT NULL,
  `anzahl_sitzplaetze` int(255) NOT NULL,
  `beschreibung` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `typ` int(255) UNSIGNED NOT NULL,
  `verfasser` int(255) UNSIGNED NOT NULL,
  `status` int(255) UNSIGNED NOT NULL,
  `preis` double NOT NULL,
  `gebucht_von` int(255) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `post_typ`
--

CREATE TABLE `post_typ` (
  `id` int(255) UNSIGNED NOT NULL,
  `typ` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `beschreibung` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `standort`
--

CREATE TABLE `standort` (
  `strasse` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `hausnummer` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `plz` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `ort` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `standort`
--

INSERT INTO `standort` (`strasse`, `hausnummer`, `plz`, `ort`, `id`) VALUES
('teststrasse', '1', '123456', 'testort', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tracking_status`
--

CREATE TABLE `tracking_status` (
  `id` int(255) UNSIGNED NOT NULL,
  `status` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `beschreibung` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  ADD PRIMARY KEY (`id`),
  ADD KEY `verfasser` (`verfasser`),
  ADD KEY `fahrt` (`fahrt`);

--
-- Indizes für die Tabelle `bezahlungsart`
--
ALTER TABLE `bezahlungsart`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `cargonaut`
--
ALTER TABLE `cargonaut`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adresse` (`adresse`);

--
-- Indizes für die Tabelle `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cargonaut_1` (`cargonaut_1`),
  ADD KEY `cargonaut_2` (`cargonaut_2`);

--
-- Indizes für die Tabelle `chatnachricht`
--
ALTER TABLE `chatnachricht`
  ADD PRIMARY KEY (`id`),
  ADD KEY `verfasser` (`verfasser`),
  ADD KEY `chat` (`chat`);

--
-- Indizes für die Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  ADD PRIMARY KEY (`id`),
  ADD KEY `art` (`art`),
  ADD KEY `ladeflaeche` (`ladeflaeche`),
  ADD KEY `besitzer` (`besitzer`);

--
-- Indizes für die Tabelle `fahrzeug_art`
--
ALTER TABLE `fahrzeug_art`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `laderaum`
--
ALTER TABLE `laderaum`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `standort` (`standort`),
  ADD KEY `zielort` (`zielort`),
  ADD KEY `bezahlungsart` (`bezahlungsart`),
  ADD KEY `laderaum` (`laderaum`),
  ADD KEY `fahrzeug` (`fahrzeug`),
  ADD KEY `typ` (`typ`),
  ADD KEY `verfasser` (`verfasser`),
  ADD KEY `status` (`status`),
  ADD KEY `typ_2` (`typ`,`verfasser`,`status`),
  ADD KEY `gebucht_von` (`gebucht_von`);

--
-- Indizes für die Tabelle `post_typ`
--
ALTER TABLE `post_typ`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `standort`
--
ALTER TABLE `standort`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `tracking_status`
--
ALTER TABLE `tracking_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `bezahlungsart`
--
ALTER TABLE `bezahlungsart`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `cargonaut`
--
ALTER TABLE `cargonaut`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `chatnachricht`
--
ALTER TABLE `chatnachricht`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `laderaum`
--
ALTER TABLE `laderaum`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `post`
--
ALTER TABLE `post`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `post_typ`
--
ALTER TABLE `post_typ`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `standort`
--
ALTER TABLE `standort`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `tracking_status`
--
ALTER TABLE `tracking_status`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  ADD CONSTRAINT `bewertung_ibfk_1` FOREIGN KEY (`verfasser`) REFERENCES `cargonaut` (`id`);

--
-- Constraints der Tabelle `cargonaut`
--
ALTER TABLE `cargonaut`
  ADD CONSTRAINT `cargonaut_ibfk_1` FOREIGN KEY (`adresse`) REFERENCES `standort` (`id`);

--
-- Constraints der Tabelle `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`cargonaut_1`) REFERENCES `cargonaut` (`id`),
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`cargonaut_2`) REFERENCES `cargonaut` (`id`),
  ADD CONSTRAINT `chat_ibfk_3` FOREIGN KEY (`id`) REFERENCES `chatnachricht` (`chat`);

--
-- Constraints der Tabelle `chatnachricht`
--
ALTER TABLE `chatnachricht`
  ADD CONSTRAINT `chatnachricht_ibfk_1` FOREIGN KEY (`verfasser`) REFERENCES `cargonaut` (`id`);

--
-- Constraints der Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  ADD CONSTRAINT `fahrzeug_ibfk_1` FOREIGN KEY (`besitzer`) REFERENCES `cargonaut` (`id`),
  ADD CONSTRAINT `fahrzeug_ibfk_2` FOREIGN KEY (`art`) REFERENCES `fahrzeug_art` (`id`),
  ADD CONSTRAINT `fahrzeug_ibfk_3` FOREIGN KEY (`ladeflaeche`) REFERENCES `laderaum` (`id`),
  ADD CONSTRAINT `fahrzeug_ibfk_4` FOREIGN KEY (`id`) REFERENCES `post` (`fahrzeug`);

--
-- Constraints der Tabelle `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`laderaum`) REFERENCES `laderaum` (`id`),
  ADD CONSTRAINT `post_ibfk_10` FOREIGN KEY (`verfasser`) REFERENCES `cargonaut` (`id`),
  ADD CONSTRAINT `post_ibfk_3` FOREIGN KEY (`typ`) REFERENCES `post_typ` (`id`),
  ADD CONSTRAINT `post_ibfk_4` FOREIGN KEY (`bezahlungsart`) REFERENCES `bezahlungsart` (`id`),
  ADD CONSTRAINT `post_ibfk_5` FOREIGN KEY (`gebucht_von`) REFERENCES `cargonaut` (`id`),
  ADD CONSTRAINT `post_ibfk_6` FOREIGN KEY (`standort`) REFERENCES `standort` (`id`),
  ADD CONSTRAINT `post_ibfk_7` FOREIGN KEY (`zielort`) REFERENCES `standort` (`id`),
  ADD CONSTRAINT `post_ibfk_8` FOREIGN KEY (`id`) REFERENCES `bewertung` (`fahrt`),
  ADD CONSTRAINT `post_ibfk_9` FOREIGN KEY (`status`) REFERENCES `tracking_status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
