import { Injectable } from '@nestjs/common';
import {Board, BoardStatus} from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardsService {
  private boards: Board[] = [];  // private을 사용하여 다른 컴포넌트가 boards 배열에 접근하여 수정할 수 없게 함.

  getAllBoards(): Board[] {
    return this.boards;
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

}
