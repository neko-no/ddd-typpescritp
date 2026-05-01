import { Author } from "../Author/Author";
import { BookId } from "../BookId/BookId";
import { Title } from "../Title/Title";
import { BookIdentity } from "./BookIdentity";

describe("BookIdentity", () => {
    it("同じIDを持つエンティティは等価である", () => {
        const id = new BookId("9784798126708");
        const identity1 = new BookIdentity(id, new Title("タイトルA"), new Author("著者A"));
        const identity2 = new BookIdentity(id, new Title("タイトルB"), new Author("著者B"));

        expect(identity1.equals(identity2)).toBeTruthy();
    });

    it("異なるIDを持つエンティティは等価でない", () => {
        const identity1 = new BookIdentity(new BookId("9784798126708"), new Title("タイトルA"), new Author("著者A"));
        const identity2 = new BookIdentity(new BookId("9784798126709"), new Title("タイトルA"), new Author("著者A"));
        
        expect(identity1.equals(identity2)).toBeFalsy();
    });
});