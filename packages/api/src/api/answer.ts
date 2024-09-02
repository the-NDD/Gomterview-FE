import { AxiosInstance } from 'axios';
import {
  AnswerResponseDto,
  CreateAnswerRequestDto,
  DefaultAnswerRequestDto,
} from '../dto/dto';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class AnswerApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * @tags answer
   * @summary 질문에 새로운 답변 추가
   * @request POST:/api/answer
   * @secure*/
  postAnswer(data: CreateAnswerRequestDto) {
    return getAPIResponseData<AnswerResponseDto, CreateAnswerRequestDto>(
      this.instance,
      {
        method: 'post',
        url: `/answer`,
        data,
      }
    );
  }

  /**
   * @tags answer
   * @summary 질문의 대표답변 설정
   * @request POST:/api/answer/default
   * @secure*/
  postAnswerDefault(data: DefaultAnswerRequestDto) {
    return getAPIResponseData<void, DefaultAnswerRequestDto>(this.instance, {
      method: 'post',
      url: `/answer/default`,
      data,
    });
  }

  /**
   * @tags answer
   * @summary 질문의 답변 리스트 반환
   * @request GET:/api/answer/{questionId}*/
  getAnswerByQuestionId(questionId: number) {
    return getAPIResponseData<AnswerResponseDto[]>(this.instance, {
      method: 'get',
      url: `/answer/${questionId}`,
    });
  }

  /**
   * @tags answer
   * @summary 답변 삭제
   * @request DELETE:/api/answer/{answerId}
   * @secure*/
  deleteAnswerByAnswerId(answerId: number) {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/answer/${answerId}`,
    });
  }
}
