import { UUID } from '@domain/Type'
import { randomUUID } from 'crypto'
import { PlatformEnum } from '@domain/Enum'

export class GetOrdersQuery {
  public readonly id: UUID = randomUUID() as UUID

  constructor(
    public readonly platform: PlatformEnum,
  ) {}
}
