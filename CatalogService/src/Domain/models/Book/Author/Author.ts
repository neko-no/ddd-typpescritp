import { ValueObject } from "../../shared/ValueObject";

type AuthorValue = string;
export class Author extends ValueObject<AuthorValue, "Author"> {
    static MAX_LENGTH = 100;
    static MIN_LENGTH = 1;

    constructor(value: AuthorValue) {
        super(value);
    }

    protected validate(author: AuthorValue): void {
        if (author.length < Author.MIN_LENGTH || author.length > Author.MAX_LENGTH) {
            throw new Error(`著者名は${Author.MIN_LENGTH}文字以上${Author.MAX_LENGTH}文字以下でなければなりません。`);
        }
    }
}