import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Board } from './boards.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards-status.enum';

@Injectable()
export class BoardsRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  } // @EntityRepository(Board) 가 typeorm 0.3.x에서 deprecated되어, 이렇게 써야 함.

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  async deleteBoard(id: number): Promise<DeleteResult> {
    return await this.delete({ id: id });
  }
}
