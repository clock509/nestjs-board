import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from "../boards-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {

  readonly StatusOptions = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ]

  transform(value: any, metadata: ArgumentMetadata) {
    /*
    * value: 처리가 된 인자의 값
    * metadata: 인자의 메타데이터를 포함한 객체
    *
    * 이 메소드에서 return된 값은 route handler로 전해지고, 만약 예외가 발생하면 클라이언트에 바로 전해진다.
    * */
    value = value.toUpperCase(); // BoardStatus의 모든 value가 대문자이므로 대문자 값으로 업데이트 해 준다.

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options.`)
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
