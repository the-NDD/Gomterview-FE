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

  postQuestion(data: CreateQuestionRequestDto) {
    return getAPIResponseData<QuestionResponseDto, CreateQuestionRequestDto>(
      this.instance,
      {
        method: 'post',
        url: `/question`,
        data,
      }
    );
  }

  postQuestionCopy(data: CopyQuestionRequestDto) {
    return getAPIResponseData<WorkbookIdResponseDto, CopyQuestionRequestDto>(
      this.instance,
      {
        method: 'post',
        url: `/question/copy`,
        data,
      }
    );
  }

  getQuestionByWorkbookId(workbookId: number) {
    return getAPIResponseData<QuestionResponseDto[]>(this.instance, {
      method: 'get',
      url: `/question/${workbookId}`,
    });
  }

  patchQuestionIndex(data: UpdateIndexInWorkbookRequestDto) {
    return getAPIResponseData<void, UpdateIndexInWorkbookRequestDto>(
      this.instance,
      {
        method: 'patch',
        url: `/question/index`,
        data,
      }
    );
  }

  deleteQuestionByQuestionId(questionId: number) {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/question/${questionId}`,
    });
  }
}
