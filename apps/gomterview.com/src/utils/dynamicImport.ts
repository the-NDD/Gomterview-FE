const dynamicImport = <T>(path: string): Promise<T> | undefined => {
  try {
    return import(path) as Promise<T>;
  } catch (error) {
    console.error(`${path} 모듈을 로드할 수 없습니다.\n`, error);
  }
};

export default dynamicImport;
