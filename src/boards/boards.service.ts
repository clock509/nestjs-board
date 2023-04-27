import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsRepository) // 이 데코레이터를 이용하여, 이 서비스에서 BoardsRepository를 사용한다고 Inject한다.
    private boardsRepository: BoardsRepository,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardsRepository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException(`Cannot find a board with id(${id})`); // custom error message 지정
    }
    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardsRepository.createBoard(createBoardDto);
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardsRepository.deleteBoard(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cannot find a board with id(${id})`);
    }
    console.log('result: ', result); // result: DeleteResult { raw: [], affected: 0} -> delete 메서드의 영향을 받은 행 개수를 반환해준다.
  }
  // private boards: Board[] = [];  // private을 사용하여 다른 컴포넌트가 boards 배열에 접근하여 수정할 수 없게 함.
  //
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  //
  // getBoardById(id: string): Board {
  //   const board: Board = this.boards.find((board) => board.id === id);
  //   if (!board) {  // 특정 게시물이 없는 경우의 처리
  //     throw new NotFoundException(`Cannot find a board with id(${id})`); // custom error message 지정
  //   }
  //   return board
  // }
  //
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title: title,
  //     description: description,
  //     status: BoardStatus.PUBLIC,
  //   }
  //
  //   this.boards.push(board);
  //   return board;
  // }
  //
  // deleteBoard(id: string): void { // 리턴값을 주지 않기로 한다면 void 타입으로 정의
  //   const foundBoard = this.getBoardById(id)
  //   this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
