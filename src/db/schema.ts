import { ColumnsConfig, Table } from "litdb";

class BaseEntity {
   constructor(data: Partial<BaseEntity>) {
      Object.assign(this, data);
   }
   createdAt: Date = new Date();
   updatedAt: Date = new Date();
   version: number = 1;
}

const baseEntityColumns: ColumnsConfig<BaseEntity> = {
   createdAt: { type: "DATETIME", alias: "created_at" },
   updatedAt: { type: "DATETIME", alias: "updated_at" },
   version: { type: "INTEGER" },
};

/*           GENRE           */

export class Genre extends BaseEntity {
   constructor(data: Genre) {
      super(data);
      Object.assign(this, data);
   }
   id: number = 0;
   name: string = "";
}

Table(Genre, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      ...baseEntityColumns,
   },
});

/*           LANG           */

export class Lang extends BaseEntity {
   constructor(data: Lang) {
      super(data);
      Object.assign(this, data);
   }
   id: number = 0;
   code: string = "";
}

Table(Lang, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      code: { type: "TEXT", required: true },
      ...baseEntityColumns,
   },
});

/*           TAG           */

export class Tag extends BaseEntity {
   constructor(data: Tag) {
      super(data);
      Object.assign(this, data);
   }
   id: number = 0;
   name: string = "";
}

Table(Tag, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      ...baseEntityColumns,
   },
});

/*           AUTHOR           */

export class Author extends BaseEntity {
   constructor(data: Author) {
      super(data);
      Object.assign(this, data);
   }
   id: number = 0;
   name: string = "";
   surname: string = "";
   bio: string | undefined;
   image: string | undefined;
}

Table(Author, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      surname: { type: "TEXT", required: true },
      bio: { type: "TEXT", required: false },
      image: { type: "TEXT", required: false },

      ...baseEntityColumns,
   },
});

/*           NARRATOR           */

export class Narrator extends BaseEntity {
   constructor(data: Narrator) {
      super(data);
      Object.assign(this, data);
   }
   id: number = 0;
   name: string = "";
   surname: string = "";
   bio: string | undefined;
   image: string | undefined;
}

Table(Narrator, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      surname: { type: "TEXT", required: true },
      bio: { type: "TEXT", required: false },
      image: { type: "TEXT", required: false },
      ...baseEntityColumns,
   },
});

/*           FORMAT           */

export class Format extends BaseEntity {
   constructor(data: Format) {
      super(data);
      Object.assign(this, data);
   }
   id: number = 0;
   name: string = "";
}

Table(Format, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      ...baseEntityColumns,
   },
});

/*           AUDIOBOOK           */

export class Audiobook extends BaseEntity {
   constructor(data: Audiobook) {
      super(data);
      Object.assign(this, data);
   }
   id: number = 0;
   title: string = "";
   cover: string | undefined;
   description: string | undefined;
   releaseDate: Date | undefined;
   publisher: string | undefined;
   isbn: string | undefined;
}

Table(Audiobook, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      title: { type: "TEXT", required: true },
      cover: { type: "TEXT", required: false },
      description: { type: "TEXT", required: false },
      releaseDate: { type: "DATETIME", required: false, alias: "release_date" },
      publisher: { type: "TEXT", required: false },
      isbn: { type: "TEXT", required: false },
      ...baseEntityColumns,
   },
});

/*           AUDIOBOOK VERSION           */

export class AudiobookVersion extends BaseEntity {
   constructor(data: AudiobookVersion) {
      super(data);
      Object.assign(this, data);
   }
   id: number = 0;
   audiobookId: number = 0;
   formatId: number = 0;
   langId: number = 0;
   duration: number = 0;
   size: number = 0;
   path: string = "";
   bitrate: number = 0;
   sampleRate: number = 0;
}

Table(AudiobookVersion, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      audiobookId: {
         type: "INTEGER",
         required: true,
         alias: "audiobook_id",
         references: {
            table: Audiobook,
            on: ["DELETE", "CASCADE"],
         },
      },
      formatId: {
         type: "INTEGER",
         required: true,
         alias: "format_id",
         references: {
            table: Format,
            on: ["DELETE", "RESTRICT"],
         },
      },
      langId: {
         type: "INTEGER",
         required: true,
         alias: "lang_id",
         references: {
            table: Lang,
            on: ["DELETE", "RESTRICT"],
         },
      },
      duration: { type: "INTEGER", required: true },
      size: { type: "INTEGER", required: true },
      path: { type: "TEXT", required: true },
      bitrate: { type: "INTEGER", required: true },
      sampleRate: { type: "INTEGER", required: true },
      ...baseEntityColumns,
   },
});

/*           SERIES           */

export class Series extends BaseEntity {
   constructor(data: Series) {
      super(data);
      Object.assign(this, data);
   }
   id: number = 0;
   name: string = "";
}

Table(Series, {
   columns: {
      id: { type: "INTEGER", primaryKey: true, autoIncrement: true },
      name: { type: "TEXT", required: true },
      ...baseEntityColumns,
   },
});

/*           AUDIOBOOK AUTHOR           */

export class AudiobookAuthor extends BaseEntity {
   constructor(data: AudiobookAuthor) {
      super(data);
      Object.assign(this, data);
   }
   audiobookId: number = 0;
   authorId: number = 0;
}

Table(AudiobookAuthor, {
   columns: {
      audiobookId: {
         type: "INTEGER",
         required: true,
         alias: "audiobook_id",
         references: {
            table: Audiobook,
            on: ["DELETE", "CASCADE"],
         },
      },
      authorId: {
         type: "INTEGER",
         required: true,
         alias: "author_id",
         references: {
            table: Author,
            on: ["DELETE", "CASCADE"],
         },
      },
      ...baseEntityColumns,
   },
   table: {
      alias: "Audiobook_Author",
   },
});

/*           AUDIOBOOK GENRE           */

export class AudiobookGenre extends BaseEntity {
   constructor(data: AudiobookGenre) {
      super(data);
      Object.assign(this, data);
   }
   audiobookId: number = 0;
   genreId: number = 0;
}

Table(AudiobookGenre, {
   columns: {
      audiobookId: {
         type: "INTEGER",
         required: true,
         alias: "audiobook_id",
         references: {
            table: Audiobook,
            on: ["DELETE", "CASCADE"],
         },
      },
      genreId: {
         type: "INTEGER",
         required: true,
         alias: "genre_id",
         references: {
            table: Genre,
            on: ["DELETE", "CASCADE"],
         },
      },
      ...baseEntityColumns,
   },
   table: {
      alias: "Audiobook_Genre",
   },
});

/*           AUDIOBOOK TAG           */

export class AudiobookTag extends BaseEntity {
   constructor(data: AudiobookTag) {
      super(data);
      Object.assign(this, data);
   }
   audiobookId: number = 0;
   tagId: number = 0;
}

Table(AudiobookTag, {
   columns: {
      audiobookId: {
         type: "INTEGER",
         required: true,
         alias: "audiobook_id",
         references: {
            table: Audiobook,
            on: ["DELETE", "CASCADE"],
         },
      },
      tagId: {
         type: "INTEGER",
         required: true,
         alias: "tag_id",
         references: {
            table: Tag,
            on: ["DELETE", "CASCADE"],
         },
      },
      ...baseEntityColumns,
   },
   table: {
      alias: "Audiobook_Tag",
   },
});

/*           AUDIOBOOK VERSION NARRATOR           */

export class AudiobookVersionNarrator extends BaseEntity {
   constructor(data: AudiobookVersionNarrator) {
      super(data);
      Object.assign(this, data);
   }
   audiobookVersionId: number = 0;
   narratorId: number = 0;
}

Table(AudiobookVersionNarrator, {
   columns: {
      audiobookVersionId: {
         type: "INTEGER",
         required: true,
         alias: "audiobook_version_id",
         references: {
            table: AudiobookVersion,
            on: ["DELETE", "CASCADE"],
         },
      },
      narratorId: {
         type: "INTEGER",
         required: true,
         alias: "narrator_id",
         references: {
            table: Narrator,
            on: ["DELETE", "CASCADE"],
         },
      },
      ...baseEntityColumns,
   },
   table: {
      alias: "AudiobookVersion_Narrator",
   },
});

/*           AUDIOBOOK SERIES           */

export class AudiobookSeries extends BaseEntity {
   constructor(data: AudiobookSeries) {
      super(data);
      Object.assign(this, data);
   }
   audiobookId: number = 0;
   seriesId: number = 0;
   numberInSeries: number | undefined;
}

Table(AudiobookSeries, {
   columns: {
      audiobookId: {
         type: "INTEGER",
         required: true,
         alias: "audiobook_id",
         references: {
            table: Audiobook,
            on: ["DELETE", "CASCADE"],
         },
      },
      seriesId: {
         type: "INTEGER",
         required: true,
         alias: "series_id",
         references: {
            table: Series,
            on: ["DELETE", "CASCADE"],
         },
      },
      numberInSeries: {
         type: "REAL",
         required: false,
         alias: "number_in_series",
      },
      ...baseEntityColumns,
   },
   table: {
      alias: "Audiobook_Series",
   },
});
