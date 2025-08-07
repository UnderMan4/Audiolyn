import { Service } from "../common/service";
import { AudiobookVersionEntity } from "../entities/audiobook-version-entity";
import { ops } from "../utils";

export class AudiobookVersionService extends Service<AudiobookVersionEntity> {
   constructor() {
      super(AudiobookVersionEntity);
   }

   public async getByName(name: string): Promise<AudiobookVersionEntity[]> {
      return this.get((entity) =>
         entity.where((e) => ops.ilike(e.path, `%${name}%`))
      );
   }
}
