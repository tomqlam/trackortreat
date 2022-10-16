CREATE TABLE houses (
  houseid SERIAL PRIMARY KEY,
  houseaddress VARCHAR(512) NOT NULL,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  candyflags JSONB,
  hascandy BOOL,
  haslargecandy BOOL,
  openbowl BOOL
);