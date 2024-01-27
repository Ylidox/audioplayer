create table customer(
    id serial primary key,
    login text not null,
    password text not null
);

create table playlist(
    id serial primary key,
    customer_id  int references public.customer(id),
    name text not null
);

create table musik(
    id serial primary key,
    customer_id int references public.customer(id),
    playlist_id int references public.playlist(id),
    path text not null,
    name text not null,
    author text,
    liked boolean NOT NULL DEFAULT FALSE
);

ALTER TABLE musik
ADD liked boolean NOT NULL DEFAULT FALSE;

ALTER TABLE musik
ADD count_listenings int DEFAULT 0;