import { QuestionApi } from '@gomterview/api';
import instance from '@/apis/instance';

const questionApi = new QuestionApi(instance);

export { questionApi };
