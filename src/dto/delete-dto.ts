import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

/**
 * 删除功能 DTO
 */
export class DeleteDto {
  @ApiProperty({ description: 'id' })
  @Transform((val) =>
    val.value.map((i) => {
      return BigInt(i);
    }),
  )
  readonly ids: bigint[];
}
