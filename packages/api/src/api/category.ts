import { AxiosInstance } from 'axios';
import { CategoryResponseDto } from '../dto/dto';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class Category {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  getCategory() {
    return getAPIResponseData<CategoryResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/category`,
    });
  }
}
