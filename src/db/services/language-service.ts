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

   public async addOrGetIfExists(
      entity: Partial<LanguageEntity>
   ): Promise<LanguageEntity> {
      this.checkDb();

      if (!entity.code) {
         throw new Error("Code is required to add or get a language.");
      }

      const existing = await this.getOne((e) =>
         e.where((a) => ops.iequals(a.code, entity.code || ""))
      );

      if (existing) return existing;

      const newEntity = new LanguageEntity(entity);
      return this.add(newEntity);
   }
}
