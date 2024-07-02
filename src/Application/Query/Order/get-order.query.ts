import { UUID } from '@domain/Type'
import { PlatformEnum } from '@domain/Enum'
import { randomUUID } from 'crypto'

export class GetOrderQuery {
  public readonly id: UUID = randomUUID() as UUID

  constructor(
    public readonly platform: PlatformEnum,
    public readonly orderId: string,
  ) {}
}
