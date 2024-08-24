import { AxiosInstance } from 'axios';
import {
  CreateWorkbookRequestDto,
  UpdateWorkbookRequestDto,
  WorkbookIdResponseDto,
  WorkbookResponseDto,
  WorkbookTitleResponseDto,
} from '../dto/dto';
import { getAPIResponseData } from '../utils/get-api-response-data';

export class WorkbookApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * @tags workbook
   * @summary 새로운 문제집 추가 추가
   * @request POST:/api/workbook
   * @secure*/
  postWorkbook(data: CreateWorkbookRequestDto) {
    return getAPIResponseData<WorkbookIdResponseDto, CreateWorkbookRequestDto>(
      this.instance,
      {
        method: 'post',
        url: `/workbook`,
        data,
      }
    );
  }

  /**
   * @tags workbook
   * @summary 카테고리별(null이면 전체) 문제집 조회
   * @request GET:/api/workbook*/
  getWorkbook(params: { category: number }) {
    return getAPIResponseData<WorkbookResponseDto[]>(this.instance, {
      method: 'get',
      url: `/workbook`,
      params,
    });
  }

  /**
   * @tags workbook
   * @summary 문제집 수정
   * @request PATCH:/api/workbook
   * @secure*/
  patchWorkbook(data: UpdateWorkbookRequestDto) {
    return getAPIResponseData<WorkbookResponseDto, UpdateWorkbookRequestDto>(
      this.instance,
      {
        method: 'patch',
        url: `/workbook`,
        data,
      }
    );
  }

  /**
   * @tags workbook
   * @summary 회원의(null이면 Top5) 문제집 조회
   * @request GET:/api/workbook/title*/
  getWorkbookTitle() {
    return getAPIResponseData<WorkbookTitleResponseDto[]>(this.instance, {
      method: 'get',
      url: `/workbook/title`,
    });
  }

  /**
   * @tags workbook
   * @summary 문제집 단건 조회
   * @request GET:/api/workbook/{workbookId}*/
  getWorkbookByWorkbookId(workbookId: number) {
    return getAPIResponseData<WorkbookResponseDto>(this.instance, {
      method: 'get',
      url: `/workbook/${workbookId}`,
    });
  }

  /**
   * @tags workbook
   * @summary 문제집 삭제
   * @request DELETE:/api/workbook/{workbookId}
   * @secure*/
  deleteWorkbookByWorkbookId(workbookId: number) {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/workbook/${workbookId}`,
    });
  }
}
