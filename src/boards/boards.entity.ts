import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './boards-status.enum';

@Entity() // 클래스가 엔티티임을 나타내는 데 사용됨. SQL의 'CREATE TABLE [테이블 명]'을 나타내는 부분임.
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn() // 엔티티의 Primary Key 컬럼임을 나타냄.
  id: number;

  @Column() // 컬럼
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}
