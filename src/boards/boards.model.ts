/*
모델을 정의하기 위해서는 class나 interface를 이용한다.

- Interface -> 변수의 타입만을 체크
- Class -> 변수의 타입 체크 & 인스턴스 생성
*/

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus; // status의 값을 'PUBLIC' 또는 'PRIVATE'로 한정하고 싶음. 그 외의 다른 값을 status에 넣으면 에러가 발생한다.
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}