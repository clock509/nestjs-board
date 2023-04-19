import { Injectable } from '@nestjs/common';
import { Board } from "./boards.model";

@Injectable()
export class BoardsService {
  private boards: Board[] = [];  // private을 사용하여 다른 컴포넌트가 boards 배열에 접근하여 수정할 수 없게 함.

  getAllBoards(): Board[] {
    return this.boards;
  }
}
