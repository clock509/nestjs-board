import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { BoardsService} from './boards.service';
import {Board, BoardStatus} from "./boards.model";
import { CreateBoardDto } from "./dto/create-board.dto";

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board { // Query string은 @Param으로 받습니다.
    return this.boardsService.getBoardById(id);
  }

  @Post()
  createBoard(
    // @Body() body, // 모든 body 파라미터에 접근이 가능
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createBoardDto: CreateBoardDto
  ): Board {
    return this.boardsService.createBoard(
      // title,
      // description
      createBoardDto
    )
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
