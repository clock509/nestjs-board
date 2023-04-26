import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1', // mac OS에서 'localhost'가 안되면 해 보라.
  port: 3306,
  username: 'root',
  password: 'skdisk12!!',
  database: 'boardproject',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], //entity를 이용해 데이터베이스 테이블을 생성함. 그래서 엔티티 파일이 어디 있는지 설정해 준다.
  synchronize: false, // 애플리케이션을 다시 실행할 때, 엔티티 안에서 수정된 컬럼의 길이, 타입, 변경값 등을 해당 테이블을 Drop한 후 다시 생성해 준다.
}
