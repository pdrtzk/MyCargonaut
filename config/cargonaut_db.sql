-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 06. Jan 2021 um 15:16
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

--
-- Daten für Tabelle `bewertung`
--

INSERT INTO `bewertung` (`id`, `verfasser`, `fahrt`, `punktzahl`, `kommentar`) VALUES
(1, 5, 1, 5, 'Wunderbare Fahrt!'),
(2, 5, 1, 5, 'Wunderbare Fahrt!'),
(3, 5, 1, 5, 'Wunderbare Fahrt!');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `buchung`
--

CREATE TABLE `buchung` (
  `id` int(10) UNSIGNED NOT NULL,
  `gebucht_von` int(255) UNSIGNED NOT NULL,
  `zeit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ladeflaeche` int(255) NOT NULL,
  `anzahl_sitzplaetze` int(255) NOT NULL,
  `post` int(255) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `buchung`
--

INSERT INTO `buchung` (`id`, `gebucht_von`, `zeit`, `ladeflaeche`, `anzahl_sitzplaetze`, `post`) VALUES
(1, 5, '2021-01-02 10:32:44', 7, 1, 3),
(2, 13, '2021-01-02 10:44:32', 3, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `cargonaut`
--

CREATE TABLE `cargonaut` (
  `id` int(255) UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `lastname` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `password` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `email` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `geburtsdatum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `cargonaut`
--

INSERT INTO `cargonaut` (`id`, `firstname`, `lastname`, `password`, `email`, `geburtsdatum`) VALUES
(5, 'Admin', 'Admin', 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec', 'admin@admin.de', '0000-00-00'),
(8, '', '', 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e', 'test@teston.de', '0000-00-00'),
(13, 'Test', 'Tester', 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff', 'test@test.de', '0000-00-00'),
(18, 'Berta', 'Besispiel', 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff', 'berta@beispiel.de', '1960-01-01'),
(19, 'Max', 'Mustermann', 'test', 'max@mustermann.de', '1990-01-12'),
(20, 'Maxine', 'Musterfrau', 'test', 'maxine@musterfrau.de', '1977-01-19'),
(21, 'Test', 'Tester', 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff', 'test@testasd.de', '0000-00-00'),
(22, 'etest', 'tsetdf', 'bbe96aa2ce1149882f168249a4542c8cc3d2972945d25bddeb4e37f8353896c50ef84e69e91d8ecdc0e45bd6e025cee994365f7dc31d92d7411ab4da53f61c59', 'testestets@weaeas.de', '2021-01-20'),
(24, 'Test', 'Tester', 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff', 'test@tefghstasd.de', '0000-00-00'),
(30, 'Test', 'Tester', 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff', 'test@testasdfsd.de', '0000-00-00'),
(31, 'sdfsdf', 'sdfsdfsdf', 'a4faf47676918074799a3c3bb60be7aefd65e4c42db1726846e363f3f3f4f89dc564ae90be19ca66ba711abd4419c3ed4d292b29d7f9e855f1a640312399e826', 'sdfds@wqa.de', '2021-01-27');

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
  `art` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `anzahl_sitzplaetze` int(255) NOT NULL,
  `ladeflaeche` int(11) NOT NULL,
  `besitzer` int(255) UNSIGNED NOT NULL,
  `modell` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `kommentar` varchar(255) COLLATE latin1_german1_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `fahrzeug`
--

INSERT INTO `fahrzeug` (`id`, `art`, `anzahl_sitzplaetze`, `ladeflaeche`, `besitzer`, `modell`, `kommentar`) VALUES
(4, 'Kleinwagen', 3, 1, 5, '', ''),
(5, 'Sprinter', 2, 2, 5, '', '');

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

--
-- Daten für Tabelle `laderaum`
--

INSERT INTO `laderaum` (`id`, `ladeflaeche_laenge_cm`, `ladeflaeche_breite_cm`, `ladeflaeche_hoehe_cm`) VALUES
(1, 100, 100, 100),
(2, 200, 100, 50),
(3, 200, 100, 100),
(4, 123, 123332, 0),
(5, 123, 123332, 0),
(6, 123, 123332, 0),
(7, 20, 20, 20),
(8, 200, 100, 100);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `post`
--

CREATE TABLE `post` (
  `id` int(255) UNSIGNED NOT NULL,
  `standort` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `zielort` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `startzeit` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ankunft_zeit` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `bezahlungsart` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `laderaum` int(255) NOT NULL,
  `fahrzeug` int(255) UNSIGNED NOT NULL,
  `gebucht` tinyint(1) NOT NULL,
  `anzahl_sitzplaetze` int(255) NOT NULL,
  `beschreibung` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `typ` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `verfasser` int(255) UNSIGNED NOT NULL,
  `status` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `preis` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `post`
--

INSERT INTO `post` (`id`, `standort`, `zielort`, `startzeit`, `ankunft_zeit`, `bezahlungsart`, `laderaum`, `fahrzeug`, `gebucht`, `anzahl_sitzplaetze`, `beschreibung`, `typ`, `verfasser`, `status`, `preis`) VALUES
(1, '1', '5', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Bar', 1, 4, 0, 1, 'Testbeschreibung', 'Angebot', 5, '', 25),
(2, '40', '41', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Bar', 4, 4, 0, 1, 'Testeetsttetsetestse esr tsetset e t t etset', 'Angebot', 5, '', 23.99),
(3, '42', '43', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'EC', 5, 5, 0, 9, 'TESTETSETEST  TEStsettete ste t', 'Angebot', 5, '', 39.99),
(4, '48', '49', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Bar', 6, 4, 0, 1, 'Testeetsttetsetestse esr tsetset e t t etset', 'Angebot', 5, '', 23.99);

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
-- Indizes für die Tabelle `buchung`
--
ALTER TABLE `buchung`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ladeflaeche` (`ladeflaeche`),
  ADD KEY `gebucht_von` (`gebucht_von`),
  ADD KEY `post` (`post`);

--
-- Indizes für die Tabelle `cargonaut`
--
ALTER TABLE `cargonaut`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

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
  ADD KEY `ladeflaeche` (`ladeflaeche`),
  ADD KEY `besitzer` (`besitzer`);

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
  ADD KEY `laderaum` (`laderaum`),
  ADD KEY `fahrzeug` (`fahrzeug`),
  ADD KEY `verfasser` (`verfasser`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `buchung`
--
ALTER TABLE `buchung`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `cargonaut`
--
ALTER TABLE `cargonaut`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `laderaum`
--
ALTER TABLE `laderaum`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `post`
--
ALTER TABLE `post`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  ADD CONSTRAINT `bewertung_ibfk_1` FOREIGN KEY (`verfasser`) REFERENCES `cargonaut` (`id`),
  ADD CONSTRAINT `bewertung_ibfk_2` FOREIGN KEY (`fahrt`) REFERENCES `post` (`id`);

--
-- Constraints der Tabelle `buchung`
--
ALTER TABLE `buchung`
  ADD CONSTRAINT `index1` FOREIGN KEY (`gebucht_von`) REFERENCES `cargonaut` (`id`),
  ADD CONSTRAINT `index2` FOREIGN KEY (`ladeflaeche`) REFERENCES `laderaum` (`id`),
  ADD CONSTRAINT `index3` FOREIGN KEY (`post`) REFERENCES `post` (`id`);

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
  ADD CONSTRAINT `fahrzeug_ibfk_3` FOREIGN KEY (`ladeflaeche`) REFERENCES `laderaum` (`id`);

--
-- Constraints der Tabelle `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`laderaum`) REFERENCES `laderaum` (`id`),
  ADD CONSTRAINT `post_ibfk_10` FOREIGN KEY (`verfasser`) REFERENCES `cargonaut` (`id`),
  ADD CONSTRAINT `post_ibfk_11` FOREIGN KEY (`fahrzeug`) REFERENCES `fahrzeug` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
