import { Author } from "./Author";

describe("Author", () => {
    // 正常系
    test("Authorが1文字で作成できる", () => {
        const author = new Author("A");
        expect(author.value).toBe("A");
    });

    test("Authorが100文字で作成できる", () => {
        const authorName = "A".repeat(100);
        const author = new Author(authorName);
        expect(author.value).toBe(authorName);
    });

    // 異常系
    test("Authorが0文字で作成できない", () => {
        expect(() => new Author("")).toThrowError(
            `著者名は1文字以上100文字以下でなければなりません。`
        );
    });

    test("最大長を超えるAuthorは作成できない", () => {
        const longAuthorName = "A".repeat(101);
        expect(() => new Author(longAuthorName)).toThrowError(
            `著者名は1文字以上100文字以下でなければなりません。`
        );
    });

});