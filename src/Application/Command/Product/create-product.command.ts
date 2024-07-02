import { randomUUID } from 'crypto'
import { UUID } from '@domain/Type'
import { PlatformEnum } from '@domain/Enum'
import { CreateProductRequestModel } from '@application/Model/Request'

export class CreateProductCommand {
  public readonly id: UUID = randomUUID() as UUID

  constructor(
    public readonly platform: PlatformEnum,
    public readonly productModel: CreateProductRequestModel,
  ) {}
}
