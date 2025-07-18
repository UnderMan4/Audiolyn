CREATE TABLE
   Genre (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_genre AFTER
UPDATE ON Genre FOR EACH ROW BEGIN
UPDATE Genre
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   Lang (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_lang AFTER
UPDATE ON Lang FOR EACH ROW BEGIN
UPDATE Lang
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   Tag (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_tag AFTER
UPDATE ON Tag FOR EACH ROW BEGIN
UPDATE Tag
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   Author (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      bio TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_author AFTER
UPDATE ON Author FOR EACH ROW BEGIN
UPDATE Author
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   Narrator (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      bio TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_narrator AFTER
UPDATE ON Narrator FOR EACH ROW BEGIN
UPDATE Narrator
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   Format (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_format AFTER
UPDATE ON Format FOR EACH ROW BEGIN
UPDATE Format
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   Audiobook (
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

CREATE TRIGGER update_audiobook AFTER
UPDATE ON Audiobook FOR EACH ROW BEGIN
UPDATE Audiobook
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   AudiobookVersion (
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
      FOREIGN KEY (audiobook_id) REFERENCES Audiobook (id) ON DELETE CASCADE,
      FOREIGN KEY (format_id) REFERENCES Format (id) ON DELETE RESTRICT,
      FOREIGN KEY (lang_id) REFERENCES Lang (id) ON DELETE RESTRICT
   );

CREATE TRIGGER update_audiobook_version AFTER
UPDATE ON AudiobookVersion FOR EACH ROW BEGIN
UPDATE AudiobookVersion
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   Series (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1
   );

CREATE TRIGGER update_series_version AFTER
UPDATE ON Series FOR EACH ROW BEGIN
UPDATE Series
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
   Audiobook_Author (
      audiobook_id INTEGER NOT NULL,
      author_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_id) REFERENCES Audiobook (id) ON DELETE CASCADE,
      FOREIGN KEY (author_id) REFERENCES Author (id) ON DELETE CASCADE,
      PRIMARY KEY (audiobook_id, author_id)
   );

CREATE TRIGGER update_audiobook_author AFTER
UPDATE ON Audiobook_Author FOR EACH ROW BEGIN
UPDATE Audiobook_Author
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   Audiobook_Genre (
      audiobook_id INTEGER NOT NULL,
      genre_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_id) REFERENCES Audiobook (id) ON DELETE CASCADE,
      FOREIGN KEY (genre_id) REFERENCES Genre (id) ON DELETE CASCADE,
      PRIMARY KEY (audiobook_id, genre_id)
   );

CREATE TRIGGER update_audiobook_genre AFTER
UPDATE ON Audiobook_Genre FOR EACH ROW BEGIN
UPDATE Audiobook_Genre
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   Audiobook_Tag (
      audiobook_id INTEGER NOT NULL,
      tag_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_id) REFERENCES Audiobook (id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES Tag (id) ON DELETE CASCADE,
      PRIMARY KEY (audiobook_id, tag_id)
   );

CREATE TRIGGER update_audiobook_tag AFTER
UPDATE ON Audiobook_Tag FOR EACH ROW BEGIN
UPDATE Audiobook_Tag
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   AudiobookVersion_Narrator (
      audiobook_version_id INTEGER NOT NULL,
      narrator_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_version_id) REFERENCES AudiobookVersion (id) ON DELETE CASCADE,
      FOREIGN KEY (narrator_id) REFERENCES Narrator (id) ON DELETE CASCADE,
      PRIMARY KEY (audiobook_version_id, narrator_id)
   );

CREATE TRIGGER update_audiobook_version_narrator AFTER
UPDATE ON AudiobookVersion_Narrator FOR EACH ROW BEGIN
UPDATE AudiobookVersion_Narrator
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;

-----------------------------------------------------------------------------------
CREATE TABLE
   Audiobook_Series (
      audiobook_id INTEGER NOT NULL,
      series_id INTEGER NOT NULL,
      number_in_series REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      version INTEGER DEFAULT 1,
      FOREIGN KEY (audiobook_id) REFERENCES Audiobook (id) ON DELETE CASCADE,
      FOREIGN KEY (series_id) REFERENCES Series (id) ON DELETE CASCADE,
      PRIMARY KEY (audiobook_id, series_id)
   );

CREATE TRIGGER update_audiobook_series AFTER
UPDATE ON Audiobook_Series FOR EACH ROW BEGIN
UPDATE Audiobook_Series
SET
   updated_at = CURRENT_TIMESTAMP,
   version = version + 1
WHERE
   rowid = NEW.rowid;

END;