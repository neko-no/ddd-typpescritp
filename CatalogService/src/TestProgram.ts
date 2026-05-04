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
