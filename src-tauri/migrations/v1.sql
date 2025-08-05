CREATE TABLE
   genres (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_genre BEFORE
UPDATE ON genres FOR EACH ROW BEGIN
UPDATE genres
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   languages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_language BEFORE
UPDATE ON languages FOR EACH ROW BEGIN
UPDATE languages
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_tag BEFORE
UPDATE ON tags FOR EACH ROW BEGIN
UPDATE tags
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   authors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      bio TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_author BEFORE
UPDATE ON authors FOR EACH ROW BEGIN
UPDATE authors
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   narrators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      bio TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_narrator BEFORE
UPDATE ON narrators FOR EACH ROW BEGIN
UPDATE narrators
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   formats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_format BEFORE
UPDATE ON formats FOR EACH ROW BEGIN
UPDATE formats
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   audiobooks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      cover TEXT,
      description TEXT,
      release_date DATETIME,
      publisher TEXT,
      isbn TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_audiobook BEFORE
UPDATE ON audiobooks FOR EACH ROW BEGIN
UPDATE audiobooks
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   audiobook_versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      audiobook_id INTEGER NOT NULL,
      format_id INTEGER NOT NULL,
      lang_id INTEGER NOT NULL,
      duration INTEGER NOT NULL,
      size INTEGER NOT NULL,
      path TEXT NOT NULL,
      bitrate INTEGER NOT NULL,
      sample_rate INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_id) REFERENCES audiobooks (id) ON DELETE CASCADE,
      FOREIGN KEY (format_id) REFERENCES formats (id) ON DELETE RESTRICT,
      FOREIGN KEY (lang_id) REFERENCES languages (id) ON DELETE RESTRICT
   );

CREATE TRIGGER update_audiobook_version BEFORE
UPDATE ON audiobook_versions FOR EACH ROW BEGIN
UPDATE audiobook_versions
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   series (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_series_version BEFORE
UPDATE ON series FOR EACH ROW BEGIN
UPDATE series
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
----------------------------------- JOIN TABLES -----------------------------------
-----------------------------------------------------------------------------------
CREATE TABLE
   audiobooks_authors (
      audiobook_id INTEGER NOT NULL,
      author_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_id) REFERENCES audiobooks (id) ON DELETE CASCADE,
      FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE,
      PRIMARY KEY (audiobook_id, author_id)
   );

CREATE TRIGGER update_audiobook_author BEFORE
UPDATE ON audiobooks_authors FOR EACH ROW BEGIN
UPDATE audiobooks_authors
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   audiobooks_genres (
      audiobook_id INTEGER NOT NULL,
      genre_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_id) REFERENCES audiobooks (id) ON DELETE CASCADE,
      FOREIGN KEY (genre_id) REFERENCES genres (id) ON DELETE CASCADE,
      PRIMARY KEY (audiobook_id, genre_id)
   );

CREATE TRIGGER update_audiobook_genre BEFORE
UPDATE ON audiobooks_genres FOR EACH ROW BEGIN
UPDATE audiobooks_genres
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   audiobooks_tags (
      audiobook_id INTEGER NOT NULL,
      tag_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_id) REFERENCES audiobooks (id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE,
      PRIMARY KEY (audiobook_id, tag_id)
   );

CREATE TRIGGER update_audiobook_tag BEFORE
UPDATE ON audiobooks_tags FOR EACH ROW BEGIN
UPDATE audiobooks_tags
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   audiobook_versions_narrators (
      audiobook_version_id INTEGER NOT NULL,
      narrator_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_version_id) REFERENCES audiobook_versions (id) ON DELETE CASCADE,
      FOREIGN KEY (narrator_id) REFERENCES narrators (id) ON DELETE CASCADE,
      PRIMARY KEY (audiobook_version_id, narrator_id)
   );

CREATE TRIGGER update_audiobook_version_narrator BEFORE
UPDATE ON audiobook_versions_narrators FOR EACH ROW BEGIN
UPDATE audiobook_versions_narrators
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   audiobooks_series (
      audiobook_id INTEGER NOT NULL,
      series_id INTEGER NOT NULL,
      number_in_series REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_id) REFERENCES audiobooks (id) ON DELETE CASCADE,
      FOREIGN KEY (series_id) REFERENCES series (id) ON DELETE CASCADE,
      PRIMARY KEY (audiobook_id, series_id)
   );

CREATE TRIGGER update_audiobook_series BEFORE
UPDATE ON audiobooks_series FOR EACH ROW BEGIN
UPDATE audiobooks_series
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;