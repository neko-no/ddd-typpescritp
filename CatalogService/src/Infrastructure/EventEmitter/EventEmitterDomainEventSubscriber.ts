import { injectable } from "tsyringe";

import { IDomainEventSubscriber } from "Application/shared/DomainEvent/IDomainEventSubscriber";
import { eventEmitterClient } from "./EventEmitterClient";

@injectable()
export class EventEmitterDomainEventSubscriber implements IDomainEventSubscriber {
  subscribe(
    topic: string,
    callback: (event: Record<string, any>) => void,
  ): void {
    eventEmitterClient.on(topic, callback);
  }
}
