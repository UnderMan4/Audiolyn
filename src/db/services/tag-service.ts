import { Service } from "../common/service";
import { TagEntity } from "../entities/tag-entity";
import { ops } from "../utils";

export class TagService extends Service<TagEntity> {
   constructor() {
      super(TagEntity);
   }

   public async getByName(name: string): Promise<TagEntity[]> {
      return this.get((entity) =>
         entity.where((e) => ops.ilike(e.name, `%${name}%`))
      );
   }

   public async addOrGetIfExists(
      entity: Partial<TagEntity>
   ): Promise<TagEntity> {
      this.checkDb();

      if (!entity.name) {
         throw new Error("Name is required to add or get a tag.");
      }

      const existing = await this.getOne((e) =>
         e.where((a) => ops.iequals(a.name, entity.name || ""))
      );

      if (existing) return existing;

      const newEntity = new TagEntity(entity);
      return this.add(newEntity);
   }
}
