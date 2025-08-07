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
}
