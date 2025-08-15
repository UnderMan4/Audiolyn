import { Service } from "../common/service";
import { AudiobookEntity } from "../entities/audiobook-entity";
import { AuthorEntity } from "../entities/author-entity";
import { GenreEntity } from "../entities/genre-entity";
import { AudiobookAuthorEntity } from "../entities/junction/audiobook-author-entity";
import { AudiobookGenreEntity } from "../entities/junction/audiobook-genre-entity";
import { AudiobookTagEntity } from "../entities/junction/audiobook-tag-entity";
import { TagEntity } from "../entities/tag-entity";
import { junctionQuery, ops } from "../utils";

export class AudiobookService extends Service<AudiobookEntity> {
   constructor() {
      super(AudiobookEntity);
   }

   public getByName(title: string): Promise<AudiobookEntity[]> {
      return this.get((entity) =>
         entity.where((e) => ops.ilike(e.title, `%${title}%`))
      );
   }

   public getAudiobookAuthors(audiobookId: number): Promise<AuthorEntity[]> {
      this.checkDb();

      const query = junctionQuery(
         {
            left: AudiobookEntity,
            junction: AudiobookAuthorEntity,
            right: AuthorEntity,
            leftId: "audiobookId",
            rightId: "authorId",
         },
         audiobookId
      );

      return this.db.select<AuthorEntity[]>(...query);
   }

   public async getAudiobookGenres(
      audiobookId: number
   ): Promise<GenreEntity[]> {
      this.checkDb();

      const query = junctionQuery(
         {
            left: AudiobookEntity,
            junction: AudiobookGenreEntity,
            right: GenreEntity,
            leftId: "audiobookId",
            rightId: "genreId",
         },
         audiobookId
      );

      return this.db.select<GenreEntity[]>(...query);
   }

   public async getAudiobookTags(audiobookId: number): Promise<TagEntity[]> {
      this.checkDb();

      const query = junctionQuery(
         {
            left: AudiobookEntity,
            junction: AudiobookTagEntity,
            right: TagEntity,
            leftId: "audiobookId",
            rightId: "tagId",
         },
         audiobookId
      );

      return await this.db.select<TagEntity[]>(...query);
   }

   public async addOrGetIfExists(
      entity: Partial<AudiobookEntity>
   ): Promise<AudiobookEntity> {
      this.checkDb();

      if (!entity.title) {
         throw new Error("Title is required to add or get an audiobook.");
      }

      const existing = await this.getOne((e) =>
         e.where((a) => ops.iequals(a.title, entity.title || ""))
      );

      if (existing) return existing;

      const newEntity = new AudiobookEntity(entity);
      return this.add(newEntity);
   }
}
