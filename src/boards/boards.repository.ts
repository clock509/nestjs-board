import { DataSource, Repository } from "typeorm";
import { Board } from './boards.entity';
import { Injectable } from "@nestjs/common";

@Injectable()
export class BoardsRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
}