import { AxiosInstance } from 'axios';
import { MemberNicknameResponseDto, MemberResponseDto } from '../dto/dto';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class MemberApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * @tags member
   * @summary 회원 정보를 반환하는 메서드
   * @request GET:/api/member
   * @secure*/
  getMember() {
    return getAPIResponseData<MemberResponseDto>(this.instance, {
      method: 'get',
      url: `/member`,
    });
  }

  /**
   * @tags member
   * @summary 면접 화면에 표출할 이름을 반환하는 메서드
   * @request GET:/api/member/name*/
  getMemberName() {
    return getAPIResponseData<MemberNicknameResponseDto>(this.instance, {
      method: 'get',
      url: `/member/name`,
    });
  }
}
