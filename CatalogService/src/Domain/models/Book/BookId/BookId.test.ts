import { BookId } from "./BookId";

describe("BookId", () => {
    // 正常系
    test("有効なフォーマットの場合正しい変換結果を期待", () => {
        expect(new BookId("1234567890").value).toBe("1234567890");
    })

    test("equals", () => {
        const bookId1 = new BookId("1234567890");
        const bookId2 = new BookId("1234567890");
        const bookId3 = new BookId("0987654321");

        expect(bookId1.equals(bookId2)).toBeTruthy();
        expect(bookId1.equals(bookId3)).toBeFalsy();
    });

    test("toISBN() 13桁", () => {
        const bookId = new BookId("9784798126708");
        expect(bookId.toISBN()).toBe("ISBN978-4-79-812670-8");
    });
    test("toISBN() 10桁", () => {
        const bookId = new BookId("4167158051");
        expect(bookId.toISBN()).toBe("ISBN4-16-715805-1");
    });

    // 異常系
    test("不正な文字数の場合にエラーを投げる", () => {
        expect(() => new BookId("1".repeat(101))).toThrow("ISBNの文字数が不正です");
        expect(() => new BookId("1".repeat(9))).toThrow("ISBNの文字数が不正です");
    });
    
    test("不正なフォーマットの場合にエラーを投げる", () => {
        expect(() => new BookId("9994167158057")).toThrow("不正なISBNの形式です");
    });
});