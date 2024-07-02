import { ApiProperty } from '@nestjs/swagger'

export class CreateProductRequestModel {
  @ApiProperty({ example: 'Dumbbells' })
  public title: string

  @ApiProperty({ example: '30kg dumbbells best quality black' })
  public description: string

  @ApiProperty({ example: 'Super sport equipment Inc' })
  public vendor: string

  @ApiProperty({ example: 'dumbbell' })
  public type: string
}
