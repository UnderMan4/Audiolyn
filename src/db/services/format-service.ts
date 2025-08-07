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
}
