import { AxiosInstance } from 'axios';
import {
  CopyQuestionRequestDto,
  CreateQuestionRequestDto,
  QuestionResponseDto,
  UpdateIndexInWorkbookRequestDto,
  WorkbookIdResponseDto,
} from '../dto/dto';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class QuestionApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * @tags question
   * @summary 커스텀 질문 저장
   * @request POST:/api/question
   * @secure*/
  postQuestion(data: CreateQuestionRequestDto) {
    return getAPIResponseData<QuestionResponseDto, CreateQuestionRequestDto>(
      this.instance,
      {
        method: 'post',
        url: `/api/question`,
        data,
      }
    );
  }

  /**
   * @tags question
   * @summary 질문 복제
   * @request POST:/api/question/copy
   * @secure*/
  postQuestionCopy(data: CopyQuestionRequestDto) {
    return getAPIResponseData<WorkbookIdResponseDto, CopyQuestionRequestDto>(
      this.instance,
      {
        method: 'post',
        url: `/api/question/copy`,
        data,
      }
    );
  }

  /**
   * @tags question
   * @summary 카테고리별 질문 리스트 조회
   * @request GET:/api/question/{workbookId}*/
  getQuestionByWorkbookId(workbookId: number) {
    return getAPIResponseData<QuestionResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/question/${workbookId}`,
    });
  }

  /**
   * @tags question
   * @summary 질문들의 인덱스 조정
   * @request PATCH:/api/question/index
   * @secure*/
  patchQuestionIndex(data: UpdateIndexInWorkbookRequestDto) {
    return getAPIResponseData<void, UpdateIndexInWorkbookRequestDto>(
      this.instance,
      {
        method: 'patch',
        url: `/api/question/index`,
        data,
      }
    );
  }

  /**
   * @tags question
   * @summary 질문 삭제
   * @request DELETE:/api/question/{questionId}
   * @secure*/
  deleteQuestionByQuestionId(questionId: number) {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/api/question/${questionId}`,
    });
  }
}
