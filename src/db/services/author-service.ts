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
}
