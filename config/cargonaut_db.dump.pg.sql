--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: cargonaut_db; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA cargonaut_db;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bewertung; Type: TABLE; Schema: cargonaut_db; Owner: -
--

CREATE TABLE cargonaut_db.bewertung (
    id bigint NOT NULL,
    verfasser bigint NOT NULL,
    fahrt bigint NOT NULL,
    punktzahl integer NOT NULL,
    kommentar character varying(255) NOT NULL
);


--
-- Name: bewertung_id_seq; Type: SEQUENCE; Schema: cargonaut_db; Owner: -
--

CREATE SEQUENCE cargonaut_db.bewertung_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bewertung_id_seq; Type: SEQUENCE OWNED BY; Schema: cargonaut_db; Owner: -
--

ALTER SEQUENCE cargonaut_db.bewertung_id_seq OWNED BY cargonaut_db.bewertung.id;


--
-- Name: buchung; Type: TABLE; Schema: cargonaut_db; Owner: -
--

CREATE TABLE cargonaut_db.buchung (
    id bigint NOT NULL,
    gebucht_von bigint NOT NULL,
    zeit timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ladeflaeche bigint NOT NULL,
    anzahl_sitzplaetze bigint NOT NULL,
    post bigint NOT NULL
);


--
-- Name: buchung_id_seq; Type: SEQUENCE; Schema: cargonaut_db; Owner: -
--

CREATE SEQUENCE cargonaut_db.buchung_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: buchung_id_seq; Type: SEQUENCE OWNED BY; Schema: cargonaut_db; Owner: -
--

ALTER SEQUENCE cargonaut_db.buchung_id_seq OWNED BY cargonaut_db.buchung.id;


--
-- Name: cargonaut; Type: TABLE; Schema: cargonaut_db; Owner: -
--

CREATE TABLE cargonaut_db.cargonaut (
    id bigint NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    geburtsdatum date NOT NULL,
    kontoinhaber character varying(255) NOT NULL,
    iban character varying(255) NOT NULL,
    bic character varying(255) NOT NULL,
    image character varying(255) DEFAULT NULL::character varying
);


--
-- Name: cargonaut_id_seq; Type: SEQUENCE; Schema: cargonaut_db; Owner: -
--

CREATE SEQUENCE cargonaut_db.cargonaut_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cargonaut_id_seq; Type: SEQUENCE OWNED BY; Schema: cargonaut_db; Owner: -
--

ALTER SEQUENCE cargonaut_db.cargonaut_id_seq OWNED BY cargonaut_db.cargonaut.id;


--
-- Name: chat; Type: TABLE; Schema: cargonaut_db; Owner: -
--

CREATE TABLE cargonaut_db.chat (
    id bigint NOT NULL,
    cargonaut_1 bigint NOT NULL,
    cargonaut_2 bigint NOT NULL
);


--
-- Name: chat_id_seq; Type: SEQUENCE; Schema: cargonaut_db; Owner: -
--

CREATE SEQUENCE cargonaut_db.chat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: chat_id_seq; Type: SEQUENCE OWNED BY; Schema: cargonaut_db; Owner: -
--

ALTER SEQUENCE cargonaut_db.chat_id_seq OWNED BY cargonaut_db.chat.id;


--
-- Name: chatnachricht; Type: TABLE; Schema: cargonaut_db; Owner: -
--

CREATE TABLE cargonaut_db.chatnachricht (
    id bigint NOT NULL,
    nachricht character varying(255) NOT NULL,
    zeit timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    verfasser bigint NOT NULL,
    chat bigint NOT NULL
);


--
-- Name: chatnachricht_id_seq; Type: SEQUENCE; Schema: cargonaut_db; Owner: -
--

CREATE SEQUENCE cargonaut_db.chatnachricht_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: chatnachricht_id_seq; Type: SEQUENCE OWNED BY; Schema: cargonaut_db; Owner: -
--

ALTER SEQUENCE cargonaut_db.chatnachricht_id_seq OWNED BY cargonaut_db.chatnachricht.id;


--
-- Name: fahrzeug; Type: TABLE; Schema: cargonaut_db; Owner: -
--

CREATE TABLE cargonaut_db.fahrzeug (
    id bigint NOT NULL,
    art character varying(255) NOT NULL,
    anzahl_sitzplaetze bigint NOT NULL,
    ladeflaeche bigint NOT NULL,
    besitzer bigint NOT NULL,
    modell character varying(255) NOT NULL,
    kommentar character varying(255) NOT NULL
);


--
-- Name: fahrzeug_id_seq; Type: SEQUENCE; Schema: cargonaut_db; Owner: -
--

CREATE SEQUENCE cargonaut_db.fahrzeug_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: fahrzeug_id_seq; Type: SEQUENCE OWNED BY; Schema: cargonaut_db; Owner: -
--

ALTER SEQUENCE cargonaut_db.fahrzeug_id_seq OWNED BY cargonaut_db.fahrzeug.id;


--
-- Name: laderaum; Type: TABLE; Schema: cargonaut_db; Owner: -
--

CREATE TABLE cargonaut_db.laderaum (
    id bigint NOT NULL,
    ladeflaeche_laenge_cm bigint NOT NULL,
    ladeflaeche_breite_cm bigint NOT NULL,
    ladeflaeche_hoehe_cm bigint NOT NULL
);


--
-- Name: laderaum_id_seq; Type: SEQUENCE; Schema: cargonaut_db; Owner: -
--

CREATE SEQUENCE cargonaut_db.laderaum_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: laderaum_id_seq; Type: SEQUENCE OWNED BY; Schema: cargonaut_db; Owner: -
--

ALTER SEQUENCE cargonaut_db.laderaum_id_seq OWNED BY cargonaut_db.laderaum.id;


--
-- Name: post; Type: TABLE; Schema: cargonaut_db; Owner: -
--

CREATE TABLE cargonaut_db.post (
    id bigint NOT NULL,
    standort character varying(255) NOT NULL,
    zielort character varying(255) NOT NULL,
    startzeit timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ankunft_zeit timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    bezahlungsart character varying(255) NOT NULL,
    laderaum bigint,
    fahrzeug bigint,
    gebucht boolean NOT NULL,
    anzahl_sitzplaetze bigint NOT NULL,
    beschreibung character varying(255) NOT NULL,
    typ character varying(255) NOT NULL,
    verfasser bigint NOT NULL,
    status character varying(255) NOT NULL,
    preis double precision NOT NULL,
    fahrzeug_typ character varying(255) DEFAULT NULL::character varying
);


--
-- Name: post_id_seq; Type: SEQUENCE; Schema: cargonaut_db; Owner: -
--

CREATE SEQUENCE cargonaut_db.post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: cargonaut_db; Owner: -
--

ALTER SEQUENCE cargonaut_db.post_id_seq OWNED BY cargonaut_db.post.id;


--
-- Name: bewertung id; Type: DEFAULT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.bewertung ALTER COLUMN id SET DEFAULT nextval('cargonaut_db.bewertung_id_seq'::regclass);


--
-- Name: buchung id; Type: DEFAULT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.buchung ALTER COLUMN id SET DEFAULT nextval('cargonaut_db.buchung_id_seq'::regclass);


--
-- Name: cargonaut id; Type: DEFAULT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.cargonaut ALTER COLUMN id SET DEFAULT nextval('cargonaut_db.cargonaut_id_seq'::regclass);


--
-- Name: chat id; Type: DEFAULT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.chat ALTER COLUMN id SET DEFAULT nextval('cargonaut_db.chat_id_seq'::regclass);


--
-- Name: chatnachricht id; Type: DEFAULT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.chatnachricht ALTER COLUMN id SET DEFAULT nextval('cargonaut_db.chatnachricht_id_seq'::regclass);


--
-- Name: fahrzeug id; Type: DEFAULT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.fahrzeug ALTER COLUMN id SET DEFAULT nextval('cargonaut_db.fahrzeug_id_seq'::regclass);


--
-- Name: laderaum id; Type: DEFAULT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.laderaum ALTER COLUMN id SET DEFAULT nextval('cargonaut_db.laderaum_id_seq'::regclass);


--
-- Name: post id; Type: DEFAULT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.post ALTER COLUMN id SET DEFAULT nextval('cargonaut_db.post_id_seq'::regclass);


--
-- Data for Name: bewertung; Type: TABLE DATA; Schema: cargonaut_db; Owner: -
--



--
-- Data for Name: buchung; Type: TABLE DATA; Schema: cargonaut_db; Owner: -
--

INSERT INTO cargonaut_db.buchung VALUES (6, 37, '2021-01-21 15:04:47.542999+01', 43, 1, 11);
INSERT INTO cargonaut_db.buchung VALUES (7, 37, '2021-01-21 15:08:32.947165+01', 44, 1, 13);
INSERT INTO cargonaut_db.buchung VALUES (8, 37, '2021-01-21 15:12:38.455208+01', 45, 1, 10);
INSERT INTO cargonaut_db.buchung VALUES (9, 34, '2021-01-21 15:19:50.043663+01', 46, 1, 18);
INSERT INTO cargonaut_db.buchung VALUES (10, 34, '2021-01-21 15:26:48.962648+01', 47, 1, 17);
INSERT INTO cargonaut_db.buchung VALUES (11, 37, '2021-01-21 15:50:42.709289+01', 48, 1, 19);


--
-- Data for Name: cargonaut; Type: TABLE DATA; Schema: cargonaut_db; Owner: -
--

INSERT INTO cargonaut_db.cargonaut VALUES (34, 'Donald', 'Duck', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'donald@duck.de', '1934-06-09', 'Donald Duck', 'DE93838428382838283223', '13131245687', NULL);
INSERT INTO cargonaut_db.cargonaut VALUES (36, 'Minnie', 'Mouse', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'minnie@mouse.de', '1940-12-12', 'Minnie Mouse', 'DE98989898987878787878', '12345678989', NULL);
INSERT INTO cargonaut_db.cargonaut VALUES (39, 'Mickey', 'Mouse', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'mickey@mouse.de', '1928-11-19', 'Mickey Maus', 'DE96423223232323232323', '12345678998', NULL);
INSERT INTO cargonaut_db.cargonaut VALUES (37, 'Dagobert', 'Duck', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 'dagobert@duck.de', '1934-01-17', 'Dagobert Duck', 'DE98989898987878787878', '12345678998', NULL);


--
-- Data for Name: chat; Type: TABLE DATA; Schema: cargonaut_db; Owner: -
--

INSERT INTO cargonaut_db.chat VALUES (13, 37, 34);
INSERT INTO cargonaut_db.chat VALUES (14, 36, 37);


--
-- Data for Name: chatnachricht; Type: TABLE DATA; Schema: cargonaut_db; Owner: -
--

INSERT INTO cargonaut_db.chatnachricht VALUES (8, 'Hallo, kann man am Preis noch was machen?', '2021-01-13 10:55:50+01', 34, 13);
INSERT INTO cargonaut_db.chatnachricht VALUES (9, 'Nein!', '2021-01-13 10:55:50+01', 37, 13);
INSERT INTO cargonaut_db.chatnachricht VALUES (10, 'Wirklich nicht?', '2021-01-13 10:55:50+01', 34, 13);
INSERT INTO cargonaut_db.chatnachricht VALUES (11, 'Nein!', '2021-01-13 10:55:50+01', 37, 13);
INSERT INTO cargonaut_db.chatnachricht VALUES (12, 'Hallo Minnie!', '2021-01-21 12:44:43.569+01', 37, 14);


--
-- Data for Name: fahrzeug; Type: TABLE DATA; Schema: cargonaut_db; Owner: -
--

INSERT INTO cargonaut_db.fahrzeug VALUES (9, 'Flugzeug', 60, 18, 37, 'Boeing 747', 'Privatflugzeug');
INSERT INTO cargonaut_db.fahrzeug VALUES (10, 'Transporter', 3, 36, 37, 'VW T1', 'Für kleinere Transporte');


--
-- Data for Name: laderaum; Type: TABLE DATA; Schema: cargonaut_db; Owner: -
--

INSERT INTO cargonaut_db.laderaum VALUES (18, 4000, 200, 200);
INSERT INTO cargonaut_db.laderaum VALUES (19, 100, 100, 100);
INSERT INTO cargonaut_db.laderaum VALUES (20, 4000, 200, 200);
INSERT INTO cargonaut_db.laderaum VALUES (21, 100, 100, 100);
INSERT INTO cargonaut_db.laderaum VALUES (22, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (23, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (24, 50, 50, 50);
INSERT INTO cargonaut_db.laderaum VALUES (25, 100, 100, 100);
INSERT INTO cargonaut_db.laderaum VALUES (26, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (27, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (28, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (29, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (30, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (31, 4000, 200, 200);
INSERT INTO cargonaut_db.laderaum VALUES (32, 10, 10, 10);
INSERT INTO cargonaut_db.laderaum VALUES (33, 100, 200, 100);
INSERT INTO cargonaut_db.laderaum VALUES (34, 100, 100, 200);
INSERT INTO cargonaut_db.laderaum VALUES (35, 200, 100, 100);
INSERT INTO cargonaut_db.laderaum VALUES (36, 100, 100, 100);
INSERT INTO cargonaut_db.laderaum VALUES (37, 1, 2, 3);
INSERT INTO cargonaut_db.laderaum VALUES (38, 1, 2, 4);
INSERT INTO cargonaut_db.laderaum VALUES (39, 100, 100, 100);
INSERT INTO cargonaut_db.laderaum VALUES (40, 100, 100, 100);
INSERT INTO cargonaut_db.laderaum VALUES (41, 100, 100, 100);
INSERT INTO cargonaut_db.laderaum VALUES (42, 300, 200, 100);
INSERT INTO cargonaut_db.laderaum VALUES (43, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (44, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (45, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (46, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (47, 1, 1, 1);
INSERT INTO cargonaut_db.laderaum VALUES (48, 1, 1, 1);


--
-- Data for Name: post; Type: TABLE DATA; Schema: cargonaut_db; Owner: -
--

INSERT INTO cargonaut_db.post VALUES (10, 'Frankfurt am Main', 'Berlin', '2021-01-13 22:01:00+01', '2021-01-14 02:00:00+01', 'Bar', NULL, 9, false, 60, 'Nachtflug von Frankfurt nach Berlin', 'Angebot', 37, '', 999, 'Flugzeug');
INSERT INTO cargonaut_db.post VALUES (13, 'Köln', 'Kiel', '2021-01-28 05:15:00+01', '2021-01-30 07:00:00+01', 'Kreditkarte', NULL, NULL, false, 1, 'Suche Mitfahrgelegenheit mit Stauraum nach Kiel. Bitte Billig!!!', 'Gesuch', 34, '', 20, 'Transporter');
INSERT INTO cargonaut_db.post VALUES (14, 'Potsdam', 'Rostock', '2021-01-14 02:01:00+01', '2021-01-14 02:01:00+01', 'Bar', NULL, 10, false, 2, 'Fahrt von Potsdam nach Rostock.', 'Angebot', 37, '', 590, 'Transporter');
INSERT INTO cargonaut_db.post VALUES (15, 'Berlin', 'Berlin', '2021-01-13 04:07:00+01', '2021-01-13 07:05:00+01', 'PayPal', NULL, 9, false, 60, 'Ich habe Fleugzeug', 'Angebot', 37, '', 15, 'Flugzeug');
INSERT INTO cargonaut_db.post VALUES (16, 'Bremen', 'Potsdam', '2021-01-13 01:02:00+01', '2021-01-13 07:04:00+01', 'Bar', NULL, NULL, false, 1, 'Mit dem Schiff nach Amsterdam!', 'Gesuch', 37, '', 10, 'Schiff');
INSERT INTO cargonaut_db.post VALUES (11, 'Frankfurt am Main', 'München', '2021-01-13 00:01:00+01', '2021-01-16 01:01:00+01', 'EC-Karte', NULL, NULL, false, 2, 'Suche Flug nach München. Freue mich auf Angebote!', 'Gesuch', 36, 'unterwegs', 100, 'Flugzeug');
INSERT INTO cargonaut_db.post VALUES (18, 'Hanau', 'Ronneburg', '2021-01-21 01:02:00+01', '2021-01-21 03:04:00+01', 'EC-Karte', 42, NULL, true, 2, 'fdhfhadfhd', 'Gesuch', 37, 'ausstehend', 1, 'Schiff');
INSERT INTO cargonaut_db.post VALUES (17, 'Gießen', 'Gießen', '2021-01-21 00:00:00+01', '2021-01-21 00:00:00+01', 'EC-Karte', 41, 10, true, 3, 'dsagadgadsg', 'Angebot', 37, 'ausstehend', 1, 'Transporter');
INSERT INTO cargonaut_db.post VALUES (19, 'Hier', 'Da', '2021-01-19 22:00:00+01', '2021-01-19 22:00:00+01', 'EC-Karte', NULL, NULL, true, 2, 'no description', 'Gesuch', 34, 'ausstehend', 1, 'Schiff');


--
-- Name: bewertung_id_seq; Type: SEQUENCE SET; Schema: cargonaut_db; Owner: -
--

SELECT pg_catalog.setval('cargonaut_db.bewertung_id_seq', 9, true);


--
-- Name: buchung_id_seq; Type: SEQUENCE SET; Schema: cargonaut_db; Owner: -
--

SELECT pg_catalog.setval('cargonaut_db.buchung_id_seq', 11, true);


--
-- Name: cargonaut_id_seq; Type: SEQUENCE SET; Schema: cargonaut_db; Owner: -
--

SELECT pg_catalog.setval('cargonaut_db.cargonaut_id_seq', 40, true);


--
-- Name: chat_id_seq; Type: SEQUENCE SET; Schema: cargonaut_db; Owner: -
--

SELECT pg_catalog.setval('cargonaut_db.chat_id_seq', 14, true);


--
-- Name: chatnachricht_id_seq; Type: SEQUENCE SET; Schema: cargonaut_db; Owner: -
--

SELECT pg_catalog.setval('cargonaut_db.chatnachricht_id_seq', 13, true);


--
-- Name: fahrzeug_id_seq; Type: SEQUENCE SET; Schema: cargonaut_db; Owner: -
--

SELECT pg_catalog.setval('cargonaut_db.fahrzeug_id_seq', 12, true);


--
-- Name: laderaum_id_seq; Type: SEQUENCE SET; Schema: cargonaut_db; Owner: -
--

SELECT pg_catalog.setval('cargonaut_db.laderaum_id_seq', 48, true);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: cargonaut_db; Owner: -
--

SELECT pg_catalog.setval('cargonaut_db.post_id_seq', 19, true);


--
-- Name: bewertung idx_16389_primary; Type: CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.bewertung
    ADD CONSTRAINT idx_16389_primary PRIMARY KEY (id);


--
-- Name: buchung idx_16395_primary; Type: CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.buchung
    ADD CONSTRAINT idx_16395_primary PRIMARY KEY (id);


--
-- Name: cargonaut idx_16402_primary; Type: CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.cargonaut
    ADD CONSTRAINT idx_16402_primary PRIMARY KEY (id);


--
-- Name: chat idx_16412_primary; Type: CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.chat
    ADD CONSTRAINT idx_16412_primary PRIMARY KEY (id);


--
-- Name: chatnachricht idx_16418_primary; Type: CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.chatnachricht
    ADD CONSTRAINT idx_16418_primary PRIMARY KEY (id);


--
-- Name: fahrzeug idx_16425_primary; Type: CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.fahrzeug
    ADD CONSTRAINT idx_16425_primary PRIMARY KEY (id);


--
-- Name: laderaum idx_16434_primary; Type: CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.laderaum
    ADD CONSTRAINT idx_16434_primary PRIMARY KEY (id);


--
-- Name: post idx_16440_primary; Type: CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.post
    ADD CONSTRAINT idx_16440_primary PRIMARY KEY (id);


--
-- Name: idx_16389_fahrt; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16389_fahrt ON cargonaut_db.bewertung USING btree (fahrt);


--
-- Name: idx_16389_verfasser; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16389_verfasser ON cargonaut_db.bewertung USING btree (verfasser);


--
-- Name: idx_16395_gebucht_von; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16395_gebucht_von ON cargonaut_db.buchung USING btree (gebucht_von);


--
-- Name: idx_16395_ladeflaeche; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16395_ladeflaeche ON cargonaut_db.buchung USING btree (ladeflaeche);


--
-- Name: idx_16395_post; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16395_post ON cargonaut_db.buchung USING btree (post);


--
-- Name: idx_16402_email; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE UNIQUE INDEX idx_16402_email ON cargonaut_db.cargonaut USING btree (email);


--
-- Name: idx_16412_cargonaut_1; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16412_cargonaut_1 ON cargonaut_db.chat USING btree (cargonaut_1);


--
-- Name: idx_16412_cargonaut_2; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16412_cargonaut_2 ON cargonaut_db.chat USING btree (cargonaut_2);


--
-- Name: idx_16418_chat; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16418_chat ON cargonaut_db.chatnachricht USING btree (chat);


--
-- Name: idx_16418_verfasser; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16418_verfasser ON cargonaut_db.chatnachricht USING btree (verfasser);


--
-- Name: idx_16425_besitzer; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16425_besitzer ON cargonaut_db.fahrzeug USING btree (besitzer);


--
-- Name: idx_16425_ladeflaeche; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16425_ladeflaeche ON cargonaut_db.fahrzeug USING btree (ladeflaeche);


--
-- Name: idx_16440_fahrzeug; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16440_fahrzeug ON cargonaut_db.post USING btree (fahrzeug);


--
-- Name: idx_16440_laderaum; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16440_laderaum ON cargonaut_db.post USING btree (laderaum);


--
-- Name: idx_16440_verfasser; Type: INDEX; Schema: cargonaut_db; Owner: -
--

CREATE INDEX idx_16440_verfasser ON cargonaut_db.post USING btree (verfasser);


--
-- Name: bewertung bewertung_ibfk_2; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.bewertung
    ADD CONSTRAINT bewertung_ibfk_2 FOREIGN KEY (fahrt) REFERENCES cargonaut_db.post(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: bewertung bewertung_ibfk_3; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.bewertung
    ADD CONSTRAINT bewertung_ibfk_3 FOREIGN KEY (verfasser) REFERENCES cargonaut_db.cargonaut(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: buchung buchung_ibfk_1; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.buchung
    ADD CONSTRAINT buchung_ibfk_1 FOREIGN KEY (gebucht_von) REFERENCES cargonaut_db.cargonaut(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: buchung buchung_ibfk_2; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.buchung
    ADD CONSTRAINT buchung_ibfk_2 FOREIGN KEY (ladeflaeche) REFERENCES cargonaut_db.laderaum(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: chat chat_ibfk_1; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.chat
    ADD CONSTRAINT chat_ibfk_1 FOREIGN KEY (cargonaut_1) REFERENCES cargonaut_db.cargonaut(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: chat chat_ibfk_2; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.chat
    ADD CONSTRAINT chat_ibfk_2 FOREIGN KEY (cargonaut_2) REFERENCES cargonaut_db.cargonaut(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: chatnachricht chatnachricht_ibfk_2; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.chatnachricht
    ADD CONSTRAINT chatnachricht_ibfk_2 FOREIGN KEY (chat) REFERENCES cargonaut_db.chat(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: fahrzeug fahrzeug_ibfk_2; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.fahrzeug
    ADD CONSTRAINT fahrzeug_ibfk_2 FOREIGN KEY (ladeflaeche) REFERENCES cargonaut_db.laderaum(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: fahrzeug fahrzeug_ibfk_3; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.fahrzeug
    ADD CONSTRAINT fahrzeug_ibfk_3 FOREIGN KEY (besitzer) REFERENCES cargonaut_db.cargonaut(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: buchung index3; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.buchung
    ADD CONSTRAINT index3 FOREIGN KEY (post) REFERENCES cargonaut_db.post(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: post post_ibfk_11; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.post
    ADD CONSTRAINT post_ibfk_11 FOREIGN KEY (fahrzeug) REFERENCES cargonaut_db.fahrzeug(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: post post_ibfk_12; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.post
    ADD CONSTRAINT post_ibfk_12 FOREIGN KEY (laderaum) REFERENCES cargonaut_db.laderaum(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: post post_ibfk_13; Type: FK CONSTRAINT; Schema: cargonaut_db; Owner: -
--

ALTER TABLE ONLY cargonaut_db.post
    ADD CONSTRAINT post_ibfk_13 FOREIGN KEY (verfasser) REFERENCES cargonaut_db.cargonaut(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

