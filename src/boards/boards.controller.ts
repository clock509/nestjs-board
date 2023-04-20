import {Body, Controller, Get, Post} from '@nestjs/common';
import { BoardsService} from './boards.service';
import {Board} from "./boards.model";

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(
    // @Body() body, // 모든 body 파라미터에 접근이 가능
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    return this.boardsService.createBoard(
      title,
      description
    )
  }
}
