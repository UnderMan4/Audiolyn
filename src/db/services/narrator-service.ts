import { Service } from "../common/service";
import { NarratorEntity } from "../entities/narrator-entity";
import { ops } from "../utils";

export class NarratorService extends Service<NarratorEntity> {
   constructor() {
      super(NarratorEntity);
   }

   public async getByName(name: string): Promise<NarratorEntity[]> {
      return this.get((entity) =>
         entity.where((e) => ops.ilike(`${e.name} ${e.surname}`, `%${name}%`))
      );
   }

   public async addOrGetIfExists(
      entity: Partial<NarratorEntity>
   ): Promise<NarratorEntity> {
      this.checkDb();

      if (!entity.name && !entity.surname) {
         throw new Error(
            "Name or surname is required to add or get a narrator."
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

      const newEntity = new NarratorEntity(entity);
      return this.add(newEntity);
   }
}
