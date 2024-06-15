import {BaseService} from './BaseService';

class CharacterCoreService {
  private baseService: BaseService;
  constructor() {
    this.baseService = new BaseService(process.env.API_URL);
  }

  async getCharacter() {
    const response = await this.baseService.get('character');
    return response.data;
  }
}

export const characterService = new CharacterCoreService();
