import { Service } from "../common/service";
import { FormatEntity } from "../entities/format-entity";
import { ops } from "../utils";

export class FormatService extends Service<FormatEntity> {
   constructor() {
      super(FormatEntity);
   }

   public async getByName(name: string): Promise<FormatEntity[]> {
      return this.get((entity) =>
         entity.where((e) => ops.ilike(e.name, `%${name}%`))
      );
   }

   public async addOrGetIfExists(
      entity: Partial<FormatEntity>
   ): Promise<FormatEntity> {
      this.checkDb();

      if (!entity.name) {
         throw new Error("Name is required to add or get a format.");
      }

      const existing = await this.getOne((e) =>
         e.where((a) => ops.iequals(a.name, entity.name || ""))
      );

      if (existing) return existing;

      const newEntity = new FormatEntity(entity);
      return this.add(newEntity);
   }
}
