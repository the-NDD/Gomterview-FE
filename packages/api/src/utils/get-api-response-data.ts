import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const getAPIResponseData = async <T, D = T>(
  instance: AxiosInstance,
  option: AxiosRequestConfig<D>
) => {
  try {
    const result = await instance<T>(option);
    return result.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      process.env.NODE_ENV === 'development' && console.error(e.toJSON());
    }
    throw e;
  }
};

export { getAPIResponseData };
