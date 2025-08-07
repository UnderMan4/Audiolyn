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
}
