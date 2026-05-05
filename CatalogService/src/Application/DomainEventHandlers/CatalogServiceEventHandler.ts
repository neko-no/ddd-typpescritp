import { IDomainEventSubscriber } from "Application/shared/DomainEvent/IDomainEventSubscriber";
import { inject, injectable } from "tsyringe";

@injectable()
export class CatalogServiceEventHandler {
  constructor(
    @inject("IDomainEventSubscriber")
    private subscriber: IDomainEventSubscriber,
  ) {}

  register() {
    this.subscriber.subscribe("CatalogService", (event: Record<sting, any>) => {
      this.handleDomainEvent(event);
    });
  }

  private handleDomainEvent(event: Record<string, any>) {
    switch (event.eventType) {
      case "ReviewCreated": {
        console.log(
          `新しいレビューが作成されました。レビューID: ${event.aggregatedId}, 書籍ID: ${event.eventBody.bookId}`,
        );

        break;
      }

      // 他のイベントタイプに対する処理もここに追加可能
    }
  }
}
