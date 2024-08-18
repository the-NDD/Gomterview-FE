import { AxiosInstance } from 'axios';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class Auth {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  getAuthLogin() {
    return getAPIResponseData<void>(this.instance, {
      method: 'get',
      url: `/api/auth/login`,
    });
  }

  getAuthGoogle() {
    return getAPIResponseData<void>(this.instance, {
      method: 'get',
      url: `/api/auth/google`,
    });
  }

  deleteAuthLogout() {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/api/auth/logout`,
    });
  }

  patchAuthReissue() {
    return getAPIResponseData<void>(this.instance, {
      method: 'patch',
      url: `/api/auth/reissue`,
    });
  }
}
