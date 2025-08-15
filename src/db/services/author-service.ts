import { Service } from "../common/service";
import { AuthorEntity } from "../entities/author-entity";
import { ops } from "../utils";

export class AuthorService extends Service<AuthorEntity> {
   constructor() {
      super(AuthorEntity);
   }

   public async getByName(name: string): Promise<AuthorEntity[]> {
      return this.get((entity) =>
         entity.where((e) => ops.ilike(`${e.name} ${e.surname}`, `%${name}%`))
      );
   }

   public async addOrGetIfExists(
      entity: Partial<AuthorEntity>
   ): Promise<AuthorEntity> {
      this.checkDb();

      if (!entity.name && !entity.surname) {
         throw new Error(
            "Name or surname is required to add or get an author."
         );
      }

      const existing = await this.getOne((e) =>
         e.where(
            (a) =>
               ops.iequals(a.name, entity.name || "") &&
               ops.iequals(a.surname, entity.surname || "")
         )
      );

      if (existing) return existing;

      const newEntity = new AuthorEntity(entity);
      return this.add(newEntity);
   }
}
