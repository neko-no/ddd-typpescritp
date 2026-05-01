import { Title } from "./Title";

describe("Title", () => {
    test("Titleが1文字で作成できる", () => {
        const title = new Title("a");
        expect(title.value).toBe("a");
    });

    test("Titleが1000文字で作成できる", () => {
        const longTitle = "a".repeat(1000);
        const title = new Title(longTitle);
        expect(title.value).toBe(longTitle);
    });

    test("最小長以上の値でTitleを生成するとエラーを投げる", () => {
        expect(() => {
            new Title("");
        }).toThrow(`タイトルは${Title.MIN_LENGTH}文字以上${Title.MAX_LENGTH}文字以下でなければなりません。`);
    });

    test("最大長を超える値でTitleを生成するとエラーを投げる", () => {
        const tooLongTitle = "a".repeat(1001);
        expect(() => {
            new Title(tooLongTitle);
        }).toThrow(`タイトルは${Title.MIN_LENGTH}文字以上${Title.MAX_LENGTH}文字以下でなければなりません。`);
    });
});