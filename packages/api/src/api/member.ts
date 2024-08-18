import { AxiosInstance } from 'axios';
import { MemberNicknameResponseDto, MemberResponseDto } from '../dto/dto';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class MemberApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  getMember() {
    return getAPIResponseData<MemberResponseDto>(this.instance, {
      method: 'get',
      url: `/member`,
    });
  }

  getMemberName() {
    return getAPIResponseData<MemberNicknameResponseDto>(this.instance, {
      method: 'get',
      url: `/member/name`,
    });
  }
}
