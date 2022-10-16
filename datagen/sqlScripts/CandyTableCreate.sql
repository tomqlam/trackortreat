CREATE TABLE candies (
  candyid SERIAL PRIMARY KEY,
  candyname VARCHAR(128) NOT NULL,
  chocolate BOOLEAN NOT NULL,
  fruit BOOLEAN NOT NULL,
  caramel BOOLEAN NOT NULL,
  nut BOOLEAN NOT NULL,
  nougat BOOLEAN NOT NULL,
  hard BOOLEAN NOT NULL,
  bar BOOLEAN NOT NULL,
  plural BOOLEAN NOT NULL
);