--
-- PostgreSQL database dump
--

-- Dumped from database version 12.16 (Ubuntu 12.16-1.pgdg20.04+1)
-- Dumped by pg_dump version 12.16 (Ubuntu 12.16-1.pgdg20.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "postId" integer,
    "userId" integer,
    content text NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.follows (
    id integer NOT NULL,
    "followingId" integer,
    "followedId" integer
);


--
-- Name: follows_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.follows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: follows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.follows_id_seq OWNED BY public.follows.id;


--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name text NOT NULL,
    "postId" integer
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "postId" integer,
    "userId" integer
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    url text NOT NULL,
    content text,
    "userId" integer,
    "createdAt" integer
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: reposts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reposts (
    id integer NOT NULL,
    "postId" integer,
    "userId" integer,
    "createdAt" integer
);


--
-- Name: reposts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reposts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reposts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reposts_id_seq OWNED BY public.reposts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    image text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: follows id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows ALTER COLUMN id SET DEFAULT nextval('public.follows_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: reposts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts ALTER COLUMN id SET DEFAULT nextval('public.reposts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments VALUES (1, 4, 2, 'wow');
INSERT INTO public.comments VALUES (2, 4, 2, 'f');
INSERT INTO public.comments VALUES (3, 4, 1, 'ad');
INSERT INTO public.comments VALUES (4, 4, 1, 'A');
INSERT INTO public.comments VALUES (5, 4, 2, 'A');
INSERT INTO public.comments VALUES (6, 3, 1, 'asdas');
INSERT INTO public.comments VALUES (7, 4, 1, 'dasd');
INSERT INTO public.comments VALUES (8, 5, 1, 'asd');
INSERT INTO public.comments VALUES (9, 2, 2, 'ASDAS');
INSERT INTO public.comments VALUES (10, 6, 1, 'dasd');
INSERT INTO public.comments VALUES (11, 6, 1, 'dasds');
INSERT INTO public.comments VALUES (12, 6, 1, 'aa');
INSERT INTO public.comments VALUES (13, 6, 1, 'dd');
INSERT INTO public.comments VALUES (14, 6, 1, 'a');
INSERT INTO public.comments VALUES (15, 6, 1, 'a');
INSERT INTO public.comments VALUES (16, 5, 1, 'a');
INSERT INTO public.comments VALUES (17, 4, 2, 'a');
INSERT INTO public.comments VALUES (18, 5, 1, 'a');
INSERT INTO public.comments VALUES (19, 5, 1, 'b');
INSERT INTO public.comments VALUES (20, 7, 1, 'sadasd');
INSERT INTO public.comments VALUES (21, 7, 1, 'aa');
INSERT INTO public.comments VALUES (22, 7, 1, 'aasa');
INSERT INTO public.comments VALUES (23, 7, 1, 'a');
INSERT INTO public.comments VALUES (24, 7, 1, 'as');
INSERT INTO public.comments VALUES (25, 4, 1, 'a');
INSERT INTO public.comments VALUES (26, 3, 1, 'a');
INSERT INTO public.comments VALUES (27, 10, 1, 'a');
INSERT INTO public.comments VALUES (28, 10, 1, 'b');
INSERT INTO public.comments VALUES (29, 10, 1, 'c');
INSERT INTO public.comments VALUES (30, 10, 1, 'D');


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.follows VALUES (4, 1, 2);
INSERT INTO public.follows VALUES (5, 2, 1);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (1, 'pic', 2);
INSERT INTO public.hashtags VALUES (2, 'pic', 3);
INSERT INTO public.hashtags VALUES (3, 'pic', 4);
INSERT INTO public.hashtags VALUES (4, 'lol', 5);
INSERT INTO public.hashtags VALUES (5, 'test', 6);
INSERT INTO public.hashtags VALUES (6, 'vsf', 7);
INSERT INTO public.hashtags VALUES (7, 'vid', 8);
INSERT INTO public.hashtags VALUES (8, 'o', 9);
INSERT INTO public.hashtags VALUES (9, 'a', 10);


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (117, 4, 1);
INSERT INTO public.likes VALUES (119, 3, 1);
INSERT INTO public.likes VALUES (120, 5, 1);
INSERT INTO public.likes VALUES (122, 7, 1);
INSERT INTO public.likes VALUES (123, 9, 1);
INSERT INTO public.likes VALUES (105, 5, 2);
INSERT INTO public.likes VALUES (106, 6, 2);
INSERT INTO public.likes VALUES (108, 6, 1);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (2, 'https://br.pinterest.com/pin/607211962283985675/', 'test 1 #pic', 1, NULL);
INSERT INTO public.posts VALUES (3, 'https://br.pinterest.com/pin/607211962283985675/', 'test 1 #pic', 1, NULL);
INSERT INTO public.posts VALUES (4, 'https://br.pinterest.com/pin/607211962283985675/', 'test 2 #pic', 1, NULL);
INSERT INTO public.posts VALUES (5, 'https://www.youtube.com/', 'test 3 #lol
', 1, NULL);
INSERT INTO public.posts VALUES (6, 'https://www.devmedia.com.br/clausulas-inner-join-left-join-e-right-join-no-sql-server/18930', 'aaaaaa #test', 2, NULL);
INSERT INTO public.posts VALUES (7, 'https://linkr-4rno.onrender.com/', 'fksdjfks #vsf', 1, NULL);
INSERT INTO public.posts VALUES (8, 'https://www.youtube.com/watch?v=8iuLXODzL04&list=RDGMEMCMFH2exzjBeE_zAHHJOdxg&index=20', 'video #vid', 1, 1692897312);
INSERT INTO public.posts VALUES (9, 'https://www.youtube.com/watch?v=8iuLXODzL04&list=RDGMEMCMFH2exzjBeE_zAHHJOdxg&index=20', 'o #o', 1, 1692897349);
INSERT INTO public.posts VALUES (10, 'https://www.youtube.com/watch?v=8iuLXODzL04&list=RDGMEMCMFH2exzjBeE_zAHHJOdxg&index=20', 'a #a', 1, 1692897535);


--
-- Data for Name: reposts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.reposts VALUES (1, 3, 1, NULL);
INSERT INTO public.reposts VALUES (2, 4, 1, NULL);
INSERT INTO public.reposts VALUES (4, 10, 1, 1692906677);
INSERT INTO public.reposts VALUES (5, 9, 1, 1692911772);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '2fb780cc-f030-4a65-bbf6-00241ccf1f3a', 1);
INSERT INTO public.sessions VALUES (2, '1425e7bd-0150-4bd5-97cd-903a8bc88c9d', 2);
INSERT INTO public.sessions VALUES (3, '66602c71-d571-4a77-9d5f-4b620b0962aa', 1);
INSERT INTO public.sessions VALUES (5, 'e4e6b8f4-cb56-44f7-b461-2d2ff41e1228', 2);
INSERT INTO public.sessions VALUES (6, '6ed43459-8948-4e55-8709-cde27ad314aa', 1);
INSERT INTO public.sessions VALUES (7, 'dc535014-7231-4480-bde6-74a51568c02b', 1);
INSERT INTO public.sessions VALUES (9, '4ab138fe-d61d-412a-bf20-192f6c48d2f3', 2);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'vitor', 'vitor@hotmail.com', '$2b$04$FNoY7C55Oa1mSq4T9qJ6j.MKtPK7fq6pylpHrD/dRfeyqlALun66K', 'https://i.pinimg.com/originals/ac/1a/74/ac1a7483c5a8613502bd2594fd7ab1bd.jpg');
INSERT INTO public.users VALUES (2, 'vito', 'vito@hotmail.com', '$2b$04$SYY.JUOk7mZiGVbPS8MwSui/mFHQaFlxku3jiFcTQ1xbtRzzC5QZC', 'https://i.pinimg.com/originals/9e/c7/92/9ec7926f6c458a90d3a14224c4a89a93.jpg');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 30, true);


--
-- Name: follows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.follows_id_seq', 5, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 9, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 123, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 10, true);


--
-- Name: reposts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reposts_id_seq', 5, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: follows follows_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: reposts reposts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: follows follows_followedId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT "follows_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: follows follows_followingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: hashtags hashtags_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT "hashtags_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reposts reposts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT "reposts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: reposts reposts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT "reposts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

