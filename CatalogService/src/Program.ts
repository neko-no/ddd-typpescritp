import { container } from "tsyringe";

import { SQLBookRepository } from "Infrastructure/SQL/Book/SQLBookRepository";
import { SQLReviewRepository } from "Infrastructure/SQL/Review/SQLReviewRepository";
import { SQLTransactionManager } from "Infrastructure/SQL/SQLTransactionManager";
import { EventEmitterDomainEventPublisher } from "Infrastructure/EventEmitter/EventEmitterDomainEventPublisher";
import { EventEmitterDomainEventSubscriber } from "Infrastructure/EventEmitter/EventEmitterDomainEventSubscriber";

container.register("IBookRepository", {
  useClass: SQLBookRepository,
});

container.register("IReviewRepository", {
  useClass: SQLReviewRepository,
});

container.register("ITransactionManager", {
  useClass: SQLTransactionManager,
});

// DomainEvent
container.register("IDomainEventPublisher", {
  useClass: EventEmitterDomainEventPublisher,
});

container.register("IDomainEventSubscriber", {
  useClass: EventEmitterDomainEventSubscriber,
});
