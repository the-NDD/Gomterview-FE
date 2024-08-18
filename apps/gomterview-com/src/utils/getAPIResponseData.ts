import axios, { AxiosRequestConfig } from 'axios';
import instance from '@/apis/instance';

const getAPIResponseData = async <T, D = T>(option: AxiosRequestConfig<D>) => {
  try {
    const result = await instance<T>(option);
    return result.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      import.meta.env.NODE_ENV === 'development' && console.error(e.toJSON());
    }
    throw e;
  }
};

export default getAPIResponseData;
