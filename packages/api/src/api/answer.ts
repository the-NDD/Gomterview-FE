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

  postAnswerDefault(data: DefaultAnswerRequestDto) {
    return getAPIResponseData<void, DefaultAnswerRequestDto>(this.instance, {
      method: 'post',
      url: `/answer/default`,
      data,
    });
  }

  getAnswerByQuestionId(questionId: number) {
    return getAPIResponseData<AnswerResponseDto[]>(this.instance, {
      method: 'get',
      url: `/answer/${questionId}`,
    });
  }

  deleteAnswerByAnswerId(answerId: number) {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/answer/${answerId}`,
    });
  }
}
