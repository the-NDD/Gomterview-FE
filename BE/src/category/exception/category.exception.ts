import { HttpException } from '@nestjs/common';

class CategoryNameEmptyException extends HttpException {
  constructor() {
    super('카테고리명을 입력해주세요.', 400);
  }
}

class CategoryNotFoundException extends HttpException {
  constructor() {
    super('카테고리가 존재하지 않습니다.', 404);
  }
}

class CategoryForbiddenException extends HttpException {
  constructor() {
    super('해당 카테고리/질문에 대한 권한이 없습니다.', 403);
  }
}

export {
  CategoryNameEmptyException,
  CategoryNotFoundException,
  CategoryForbiddenException,
};
