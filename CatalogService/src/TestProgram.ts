import { MockDomainEventPublisher } from "Application/shared/DomainEvent/MockDomainEventPublisher";
import { MockTransactionManager } from "Application/shared/MockTransactionManager";
import { InMemoryBookRepository } from "Infrastructure/InMemory/Book/InMemoryBookRepository";
import { InMemoryReviewRepository } from "Infrastructure/InMemory/Review/InMemoryReviewRepository";
import { container } from "tsyringe";

container.register("IBookRepository", {
  useClass: InMemoryBookRepository,
});

container.register("IReviewRepository", {
  useClass: InMemoryReviewRepository,
});

container.register("ITransactionManager", {
  useClass: MockTransactionManager,
});

container.register("IDomainEventPublisher", {
  useClass: MockDomainEventPublisher,
});
