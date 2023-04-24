import {Injectable, NotFoundException} from '@nestjs/common';
import {Board, BoardStatus} from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardsService {
  private boards: Board[] = [];  // private을 사용하여 다른 컴포넌트가 boards 배열에 접근하여 수정할 수 없게 함.

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    const board: Board = this.boards.find((board) => board.id === id);
    if (!board) {  // 특정 게시물이 없는 경우의 처리
      throw new NotFoundException(`Cannot find a board with id(${id})`); // custom error message 지정
    }
    return board
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
    }

    this.boards.push(board);
    return board;
  }

  deleteBoard(id: string): void { // 리턴값을 주지 않기로 한다면 void 타입으로 정의
    const foundBoard = this.getBoardById(id)
    this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
