import { AxiosInstance } from 'axios';
import { CategoryResponseDto } from '../dto/dto';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class CategoryApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * @tags category
   * @summary 전체 카테고리를 조회한다.
   * @request GET:/api/category*/
  getCategory() {
    return getAPIResponseData<CategoryResponseDto[]>(this.instance, {
      method: 'get',
      url: `/category`,
    });
  }
}
