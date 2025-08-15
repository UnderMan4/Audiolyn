import { Service } from "../common/service";
import { SeriesEntity } from "../entities/series-entity";
import { ops } from "../utils";

export class SeriesService extends Service<SeriesEntity> {
   constructor() {
      super(SeriesEntity);
   }

   public async getByName(name: string): Promise<SeriesEntity[]> {
      return this.get((entity) =>
         entity.where((e) => ops.ilike(e.name, `%${name}%`))
      );
   }

   public async addOrGetIfExists(
      entity: Partial<SeriesEntity>
   ): Promise<SeriesEntity> {
      this.checkDb();

      if (!entity.name) {
         throw new Error("Name is required to add or get a series.");
      }

      const existing = await this.getOne((e) =>
         e.where((a) => ops.iequals(a.name, entity.name || ""))
      );

      if (existing) return existing;

      const newEntity = new SeriesEntity(entity);
      return this.add(newEntity);
   }
}
