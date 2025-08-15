import { Service } from "../common/service";
import { GenreEntity } from "../entities/genre-entity";
import { ops } from "../utils";

export class GenreService extends Service<GenreEntity> {
   constructor() {
      super(GenreEntity);
   }

   public async getByName(name: string): Promise<GenreEntity[]> {
      return this.get((entity) =>
         entity.where((e) => ops.ilike(e.name, `%${name}%`))
      );
   }

   public async addOrGetIfExists(
      entity: Partial<GenreEntity>
   ): Promise<GenreEntity> {
      this.checkDb();

      if (!entity.name) {
         throw new Error("Name is required to add or get a genre.");
      }

      const existing = await this.getOne((e) =>
         e.where((a) => ops.iequals(a.name, entity.name || ""))
      );

      if (existing) return existing;

      const newEntity = new GenreEntity(entity);
      return this.add(newEntity);
   }
}
