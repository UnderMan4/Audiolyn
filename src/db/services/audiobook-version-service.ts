import { Service } from "../common/service";
import { AudiobookVersionEntity } from "../entities/audiobook-version-entity";

export class AudiobookVersionService extends Service<AudiobookVersionEntity> {
   constructor() {
      super(AudiobookVersionEntity);
   }

   /**
    * @deprecated This method is not supported in AudiobookVersionService.
    */
   public async getByName(): Promise<AudiobookVersionEntity[]> {
      throw new Error("Not supported.");
   }

   /**
    * @deprecated This method is not supported in AudiobookVersionService.
    */
   public async addOrGetIfExists(): Promise<AudiobookVersionEntity> {
      throw new Error("Not supported.");
   }
}
