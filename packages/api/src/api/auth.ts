import { AxiosInstance } from 'axios';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class AuthApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * @tags auth
   * @request GET:/api/auth/login*/
  getAuthLogin() {
    return getAPIResponseData<void>(this.instance, {
      method: 'get',
      url: `/auth/login`,
    });
  }

  /**
   * @tags auth
   * @request GET:/api/auth/google*/
  getAuthGoogle() {
    return getAPIResponseData<void>(this.instance, {
      method: 'get',
      url: `/auth/google`,
    });
  }

  /**
   * @tags auth
   * @request DELETE:/api/auth/logout*/
  deleteAuthLogout() {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/auth/logout`,
    });
  }

  /**
   * @tags auth
   * @request PATCH:/api/auth/reissue*/
  patchAuthReissue() {
    return getAPIResponseData<void>(this.instance, {
      method: 'patch',
      url: `/auth/reissue`,
    });
  }
}
