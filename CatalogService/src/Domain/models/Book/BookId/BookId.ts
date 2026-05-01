import { ValueObject } from "Domain/models/shared/ValueObject";

type BookIdValue = string;
export class BookId extends ValueObject<BookIdValue, "BookId"> {
    static MAX_LENGTH = 13;
    static MIN_LENGTH = 10;

    constructor(value: BookIdValue) {
        super(value);
    }

    protected validate(isbn: BookIdValue): void {
        if (isbn.length < BookId.MIN_LENGTH || isbn.length > BookId.MAX_LENGTH) {
            throw new Error(`ISBNの文字数が不正です。`);
        }

        if (!this.isValidISBN10(isbn) && !this.isValidISBN13(isbn)) {
            throw new Error("不正なISBNの形式です。");
        }
    }

    private isValidISBN10(isbn10: string): boolean {
        return isbn10.length === 10;
    }

    private isValidISBN13(isbn13: string): boolean {
        return isbn13.startsWith("978") && isbn13.length === 13;
    }

    toISBN(): string {
        if (this._value.length === 10) {
            const groupIdentifier = this._value.substring(0, 1); // 国コードなど
            const publisherCode = this._value.substring(1, 3); // 出版社コード
            const bookCode = this._value.substring(3, 9); // 書籍コード
            const checksum = this._value.substring(9); // チェックサム
            return `ISBN${groupIdentifier}-${publisherCode}-${bookCode}-${checksum}`;
        } else {
            const isbnPrefix = this._value.substring(0, 3); // "978"などのプレフィックス
            const groupIdentifier = this._value.substring(3, 4); // 国コードなど
            const publisherCode = this._value.substring(4, 6); // 出版社コード
            const bookCode = this._value.substring(6, 12); // 書籍コード
            const checksum = this._value.substring(12); // チェックサム
            return `ISBN${isbnPrefix}-${groupIdentifier}-${publisherCode}-${bookCode}-${checksum}`;
        }
    }
}