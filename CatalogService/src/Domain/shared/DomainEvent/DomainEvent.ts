import { nanoid } from "nanoid";

export class DomainEvent<
  Type extends string = string,
  Body extends Record<string, unknown> = Record<string, unknown>,
> {
  private constructor(
    // ドメインイベントのID
    public readonly eventId: string,
    // 集約のID（書籍ID）
    public readonly aggregateId: string,
    // 集約の種類（Book集約など）
    public readonly aggregateType: string,
    // ドメインイベントの種類
    // 作成：{集約名}Created
    // 更新：{集約名}{項目名}Changed
    // 追加：{項目名}AddedTo{集約名}
    // 削除：{項目名}RemovedFrom{集約名}
    public readonly eventType: Type,
    // ドメインイベントの内容（イベントに必要な全ての情報）
    public readonly eventBody: Body,
    // ドメインイベントの発生時刻
    public readonly occurredOn: Date,
  ) {}

  static create<Type extends string, Body extends Record<string, unknown>>(
    aggregateId: string,
    aggregateType: string,
    eventType: Type,
    eventBody: Body,
  ): DomainEvent<Type, Body> {
    return new DomainEvent(
      nanoid(),
      aggregateId,
      aggregateType,
      eventType,
      eventBody,
      new Date(),
    );
  }

  static reconstruct<Type extends string, Body extends Record<string, unknown>>(
    eventId: string,
    aggregateId: string,
    aggregateType: string,
    eventType: Type,
    eventBody: Body,
    occurredOn: Date,
  ): DomainEvent<Type, Body> {
    return new DomainEvent(
      eventId,
      aggregateId,
      aggregateType,
      eventType,
      eventBody,
      occurredOn,
    );
  }
}
