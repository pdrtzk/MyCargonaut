-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 18. Jan 2021 um 14:13
-- Server-Version: 10.4.17-MariaDB
-- PHP-Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
(4, 37, 12, 2, 'Fahrer hat sehr lange gebraucht und wollte viel zu viel Geld!!!'),
(5, 35, 14, 4, 'Teuer aber toller Service!'),
(8, 37, 12, 2, '  War okay, aber einige Umwege gefahren');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `buchung`
--

CREATE TABLE `buchung` (
  `id` int(10) UNSIGNED NOT NULL,
  `gebucht_von` int(255) UNSIGNED NOT NULL,
  `zeit` timestamp NOT NULL DEFAULT current_timestamp(),
  `ladeflaeche` int(255) NOT NULL,
  `anzahl_sitzplaetze` int(255) NOT NULL,
  `post` int(255) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `buchung`
--

INSERT INTO `buchung` (`id`, `gebucht_von`, `zeit`, `ladeflaeche`, `anzahl_sitzplaetze`, `post`) VALUES
(5, 37, '2021-01-13 10:08:38', 26, 1, 12);

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
  `geburtsdatum` date NOT NULL,
  `kontoinhaber` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `iban` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `bic` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `image` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `cargonaut`
--

INSERT INTO `cargonaut` (`id`, `firstname`, `lastname`, `password`, `email`, `geburtsdatum`, `kontoinhaber`, `iban`, `bic`, `image`) VALUES
(34, 'Donald', 'Duck', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'donald@duck.de', '1934-06-09', 'Donald Duck', 'DE93838428382838283223', '13131245687', NULL),
(35, 'Daisy', 'Duck', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'daisy@duck.de', '1964-12-10', 'Daisy Duck', 'DE98989898987878787878', '12354678987', NULL),
(36, 'Minnie', 'Mouse', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'minnie@mouse.de', '1940-12-12', 'Minnie Mouse', 'DE98989898987878787878', '12345678989', NULL),
(37, 'Dagobert', 'Duck', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'dagobert@duck.de', '1934-01-17', 'Dagobert Duck', 'DE98989898987878787878', '12345678998', NULL),
(39, 'Mickey', 'Mouse', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'mickey@mouse.de', '1928-11-19', 'Mickey Maus', 'DE96423223232323232323', '12345678998', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chat`
--

CREATE TABLE `chat` (
  `id` int(11) UNSIGNED NOT NULL,
  `cargonaut_1` int(11) UNSIGNED NOT NULL,
  `cargonaut_2` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `chat`
--

INSERT INTO `chat` (`id`, `cargonaut_1`, `cargonaut_2`) VALUES
(12, 37, 35),
(13, 37, 34);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chatnachricht`
--

CREATE TABLE `chatnachricht` (
  `id` int(255) UNSIGNED NOT NULL,
  `nachricht` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `zeit` timestamp NOT NULL DEFAULT current_timestamp(),
  `verfasser` int(255) UNSIGNED NOT NULL,
  `chat` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `chatnachricht`
--

INSERT INTO `chatnachricht` (`id`, `nachricht`, `zeit`, `verfasser`, `chat`) VALUES
(6, 'Hey, danke nochmal für die Tolle fahrt!', '2021-01-13 09:52:56', 35, 12),
(7, 'Kein Thema, so billig ist es nächstes mal aber nicht!', '2021-01-13 09:52:56', 37, 12),
(8, 'Hallo, kann man am Preis noch was machen?', '2021-01-13 09:55:50', 34, 13),
(9, 'Nein!', '2021-01-13 09:55:50', 37, 13),
(10, 'Wirklich nicht?', '2021-01-13 09:55:50', 34, 13),
(11, 'Nein!', '2021-01-13 09:55:50', 37, 13);

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
(9, 'Flugzeug', 60, 18, 37, 'Boeing 747', 'Privatflugzeug'),
(10, 'Transporter', 2, 19, 37, 'VW T1', 'Für kleinere Transporte'),
(11, 'PKW', 3, 23, 35, 'Audi A3', '150 PS');

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
(18, 4000, 200, 200),
(19, 100, 100, 100),
(20, 4000, 200, 200),
(21, 100, 100, 100),
(22, 1, 1, 1),
(23, 1, 1, 1),
(24, 50, 50, 50),
(25, 100, 100, 100),
(26, 1, 1, 1),
(27, 1, 1, 1),
(28, 1, 1, 1),
(29, 1, 1, 1),
(30, 1, 1, 1),
(31, 4000, 200, 200),
(32, 10, 10, 10);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `post`
--

CREATE TABLE `post` (
  `id` int(255) UNSIGNED NOT NULL,
  `standort` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `zielort` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `startzeit` timestamp NOT NULL DEFAULT current_timestamp(),
  `ankunft_zeit` timestamp NOT NULL DEFAULT current_timestamp(),
  `bezahlungsart` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `laderaum` int(255) DEFAULT NULL,
  `fahrzeug` int(255) UNSIGNED DEFAULT NULL,
  `gebucht` tinyint(1) NOT NULL,
  `anzahl_sitzplaetze` int(255) NOT NULL,
  `beschreibung` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `typ` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `verfasser` int(255) UNSIGNED NOT NULL,
  `status` varchar(255) COLLATE latin1_german1_ci NOT NULL,
  `preis` double NOT NULL,
  `fahrzeug_typ` varchar(255) COLLATE latin1_german1_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_german1_ci;

--
-- Daten für Tabelle `post`
--

INSERT INTO `post` (`id`, `standort`, `zielort`, `startzeit`, `ankunft_zeit`, `bezahlungsart`, `laderaum`, `fahrzeug`, `gebucht`, `anzahl_sitzplaetze`, `beschreibung`, `typ`, `verfasser`, `status`, `preis`, `fahrzeug_typ`) VALUES
(10, 'Frankfurt am Main', 'Berlin', '2021-01-13 21:01:00', '2021-01-14 01:00:00', 'Bar', NULL, 9, 0, 60, 'Nachtflug von Frankfurt nach Berlin', 'Angebot', 37, '', 999, 'Flugzeug'),
(11, 'Frankfurt am Main', 'München', '2021-01-12 23:01:00', '2021-01-16 00:01:00', 'EC-Karte', NULL, NULL, 0, 2, 'Suche Flug nach München. Freue mich auf Angebote!', 'Gesuch', 36, '', 100, 'Flugzeug'),
(12, 'Stuttgart', 'Köln', '2021-01-20 00:01:00', '2021-01-20 01:01:00', 'Bar', NULL, 11, 1, 3, 'Suche Mitfahrer für Fahrt nach Köln!', 'Angebot', 35, 'abgeschlossen', 50, 'PKW'),
(13, 'Köln', 'Kiel', '2021-01-28 04:15:00', '2021-01-30 06:00:00', 'Kreditkarte', NULL, NULL, 0, 1, 'Suche Mitfahrgelegenheit mit Stauraum nach Kiel. Bitte Billig!!!', 'Gesuch', 34, '', 20, 'Transporter'),
(14, 'Potsdam', 'Rostock', '2021-01-14 01:01:00', '2021-01-14 01:01:00', 'Bar', NULL, 10, 0, 2, 'Fahrt von Potsdam nach Rostock.', 'Angebot', 37, '', 590, 'Transporter'),
(15, 'Berlin', 'Berlin', '2021-01-13 03:07:00', '2021-01-13 06:05:00', 'PayPal', NULL, 9, 0, 60, 'Ich habe Fleugzeug', 'Angebot', 37, '', 15, 'Flugzeug'),
(16, 'Bremen', 'Potsdam', '2021-01-13 00:02:00', '2021-01-13 06:04:00', 'Bar', NULL, NULL, 0, 1, 'Mit dem Schiff nach Amsterdam!', 'Gesuch', 37, '', 10, 'Schiff');

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
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `buchung`
--
ALTER TABLE `buchung`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `cargonaut`
--
ALTER TABLE `cargonaut`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `chatnachricht`
--
ALTER TABLE `chatnachricht`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT für Tabelle `laderaum`
--
ALTER TABLE `laderaum`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT für Tabelle `post`
--
ALTER TABLE `post`
  MODIFY `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  ADD CONSTRAINT `bewertung_ibfk_2` FOREIGN KEY (`fahrt`) REFERENCES `post` (`id`),
  ADD CONSTRAINT `bewertung_ibfk_3` FOREIGN KEY (`verfasser`) REFERENCES `cargonaut` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `buchung`
--
ALTER TABLE `buchung`
  ADD CONSTRAINT `buchung_ibfk_1` FOREIGN KEY (`gebucht_von`) REFERENCES `cargonaut` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `buchung_ibfk_2` FOREIGN KEY (`ladeflaeche`) REFERENCES `laderaum` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `index3` FOREIGN KEY (`post`) REFERENCES `post` (`id`);

--
-- Constraints der Tabelle `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`cargonaut_1`) REFERENCES `cargonaut` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`cargonaut_2`) REFERENCES `cargonaut` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `chatnachricht`
--
ALTER TABLE `chatnachricht`
  ADD CONSTRAINT `chatnachricht_ibfk_2` FOREIGN KEY (`chat`) REFERENCES `chat` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  ADD CONSTRAINT `fahrzeug_ibfk_2` FOREIGN KEY (`ladeflaeche`) REFERENCES `laderaum` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fahrzeug_ibfk_3` FOREIGN KEY (`besitzer`) REFERENCES `cargonaut` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_11` FOREIGN KEY (`fahrzeug`) REFERENCES `fahrzeug` (`id`),
  ADD CONSTRAINT `post_ibfk_12` FOREIGN KEY (`laderaum`) REFERENCES `laderaum` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_ibfk_13` FOREIGN KEY (`verfasser`) REFERENCES `cargonaut` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
