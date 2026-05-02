// Author BookId BookIdentity Price Titleをインポート
import { Author } from "./Author/Author";
import { BookId } from "./BookId/BookId";
import { BookIdentity } from "./BookIdentity/BookIdentity";
import { Price } from "./Price/Price";
import { Title } from "./Title/Title";
import { Book } from "./Book";


describe("Book", () => {
    const bookId = new BookId("9784798126708");
    const title = new Title("エリック・エヴァンスのドメイン駆動設計入門");
    const author = new Author("エリック・エヴァンス");
    const price = new Price({ amount: 5720, currency: "JPY" });
    const newPrice = new Price({ amount: 5200, currency: "JPY" });

    const bookIdentity = new BookIdentity(bookId, title, author);

    describe("create", () => {
        it("本を作成できる", () => {
            const book = Book.create(bookIdentity, price);
            expect(book.bookId).toBe(bookId);
            expect(book.title).toBe(title);
            expect(book.author).toBe(author);
            expect(book.price).toBe(price);
        });
    });

    describe("reconstruct", () => {
        it("本を再構築できる", () => {
            const book = Book.reconstruct(bookIdentity, price);
            expect(book.bookId).toBe(bookId);
            expect(book.title).toBe(title);
            expect(book.author).toBe(author);
            expect(book.price).toBe(price);
        });
    });

    describe("equals", () => {
        it("同一のIDを持つ本は等価である", () => {
            const book1 = Book.create(bookIdentity, price);
            const book2 = Book.create(bookIdentity, price);
            expect(book1.equals(book2)).toBeTruthy();
        });

        it("異なるIDを持つ本は等価でない", () => {
            const book1 = Book.create(bookIdentity, price);
            const differentBookIdentity = new BookIdentity(new BookId("9784798126709"), title, author);
            const book2 = Book.create(differentBookIdentity, price);
            expect(book1.equals(book2)).toBeFalsy();
        });
    });

    describe("changePrice", () => {
        it("価格を変更できる", () => {
            const book = Book.create(bookIdentity, price);

            expect(book.price).toBe(price);

            book.changePrice(newPrice);

            expect(book.price).toBe(newPrice);
        });
    });

});
