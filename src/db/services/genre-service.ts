import { Service } from "../common/service";
import { GenreEntity } from "../entities/genre-entity";
import { ops } from "../utils";

export class GenreService extends Service<GenreEntity> {
   constructor() {
      super(GenreEntity);
   }

   public async getByName(name: string): Promise<GenreEntity[]> {
      return this.get((entity) =>
         entity.where((e) => ops.like(e.name, `%${name}%`))
      );
   }
}
