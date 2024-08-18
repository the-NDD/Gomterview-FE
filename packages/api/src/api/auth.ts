import { AxiosInstance } from 'axios';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class AuthApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  getAuthLogin() {
    return getAPIResponseData<void>(this.instance, {
      method: 'get',
      url: `/auth/login`,
    });
  }

  getAuthGoogle() {
    return getAPIResponseData<void>(this.instance, {
      method: 'get',
      url: `/auth/google`,
    });
  }

  deleteAuthLogout() {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/auth/logout`,
    });
  }

  patchAuthReissue() {
    return getAPIResponseData<void>(this.instance, {
      method: 'patch',
      url: `/auth/reissue`,
    });
  }
}
