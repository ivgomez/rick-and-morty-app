import {BaseService} from './BaseService';

class CharacterCoreService {
  private baseService: BaseService;
  constructor() {
    this.baseService = new BaseService(process.env.API_URL);
  }

  async getCharacter(url: string) {
    const response = await this.baseService.get(url);
    return response.data;
  }
}

export const characterService = new CharacterCoreService();
