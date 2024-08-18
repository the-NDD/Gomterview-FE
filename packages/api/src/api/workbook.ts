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

  postWorkbook(data: CreateWorkbookRequestDto) {
    return getAPIResponseData<WorkbookIdResponseDto, CreateWorkbookRequestDto>(
      this.instance,
      {
        method: 'post',
        url: `/api/workbook`,
        data,
      }
    );
  }

  getWorkbook(params: { category: number }) {
    return getAPIResponseData<WorkbookResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/workbook`,
      params,
    });
  }

  patchWorkbook(data: UpdateWorkbookRequestDto) {
    return getAPIResponseData<WorkbookResponseDto, UpdateWorkbookRequestDto>(
      this.instance,
      {
        method: 'patch',
        url: `/api/workbook`,
        data,
      }
    );
  }

  getWorkbookTitle() {
    return getAPIResponseData<WorkbookTitleResponseDto[]>(this.instance, {
      method: 'get',
      url: `/api/workbook/title`,
    });
  }

  getWorkbookByWorkbookId(workbookId: number) {
    return getAPIResponseData<WorkbookResponseDto>(this.instance, {
      method: 'get',
      url: `/api/workbook/${workbookId}`,
    });
  }

  deleteWorkbookByWorkbookId(workbookId: number) {
    return getAPIResponseData<void>(this.instance, {
      method: 'delete',
      url: `/api/workbook/${workbookId}`,
    });
  }
}
