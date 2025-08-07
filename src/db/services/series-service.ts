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
}
