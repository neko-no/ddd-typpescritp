import { Name } from "./Name";

describe("Name", () => {
    test("Nameが1文字で作成できる", () => {
        const name = new Name("a");
        expect(name.value).toBe("a");
    });
    
    test("Nameが50文字で作成できる", () => {
        const longName = "a".repeat(50);
        const name = new Name(longName);
        expect(name.value).toBe(longName);
    });

    test("最小長未満の値でNameを生成するとエラーを投げる", () => {
        expect(() => {
            new Name("");
        }).toThrow(`投稿者名は${Name.MIN_LENGTH}文字以上${Name.MAX_LENGTH}文字以下でなければなりません。`);
    });

    test("最大長を超える値でNameを生成するとエラーを投げる", () => {
        const tooLongName = "a".repeat(51);
        expect(() => {
            new Name(tooLongName);
        }).toThrow(`投稿者名は${Name.MIN_LENGTH}文字以上${Name.MAX_LENGTH}文字以下でなければなりません。`);
    });
});