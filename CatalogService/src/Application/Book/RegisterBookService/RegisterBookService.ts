import { ITransactionManager } from "Application/shared/ITransactionManager";
import { Author } from "Domain/models/Book/Author/Author";
import { Book } from "Domain/models/Book/Book";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { BookIdentity } from "Domain/models/Book/BookIdentity/BookIdentity";
import { IBookRepository } from "Domain/models/Book/IBookRepository";
import { Price } from "Domain/models/Book/Price/Price";
import { Title } from "Domain/models/Book/Title/Title";

import { RegisterBookDTO } from "./RegisterBookDTO";

export type RegisterBookCommand = {
  isbn: string;
  title: string;
  author: string;
  price: number;
};

export class RegisterBookService {
  constructor(
    private bookrepository: IBookRepository,
    private transactionManager: ITransactionManager,
  ) {}

  async execute(command: RegisterBookCommand): Promise<RegisterBookDTO> {
    return await this.transactionManager.begin(async () => {
      const existingBook = await this.bookrepository.findById(
        new BookId(command.isbn),
      );

      if (existingBook) {
        throw new Error("この書籍はすでに登録されています。");
      }

      const bookId = new BookId(command.isbn);
      const title = new Title(command.title);
      const author = new Author(command.author);
      const price = new Price({ amount: command.price, currency: "JPY" });

      const bookIdentity = new BookIdentity(bookId, title, author);
      const book = new Book(bookIdentity, price);

      await this.bookrepository.save(book);

      return {
        id: book.bookId.value,
        title: book.title.value,
        author: book.author.value,
        price: {
          amount: book.price.amount,
          currency: book.price.currency,
        },
      };
    });
  }
}
