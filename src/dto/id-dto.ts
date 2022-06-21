import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

/**
 * id DTO
 */
export class IDDto {
  @ApiProperty({ description: 'id' })
  @Transform((val) => BigInt(val.value))
  readonly id: bigint;
}
