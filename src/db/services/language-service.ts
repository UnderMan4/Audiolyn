import { Service } from "../common/service";
import { LanguageEntity } from "../entities/language-entity";
import { ops } from "../utils";

export class LanguageService extends Service<LanguageEntity> {
   constructor() {
      super(LanguageEntity);
   }

   public async getByName(code: string): Promise<LanguageEntity[]> {
      return this.get((entity) =>
         entity.where((e) => ops.ilike(e.code, `%${code}%`))
      );
   }
}
