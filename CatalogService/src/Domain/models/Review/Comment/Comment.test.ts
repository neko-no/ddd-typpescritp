import { Comment } from "./Comment";

describe("Comment", () => {
    test("Commentが1文字で作成できる", () => {
        const comment = new Comment("a");
        expect(comment.value).toBe("a");
    });

    test("Commentが1000文字で作成できる", () => {
        const longComment = "a".repeat(1000);
        const comment = new Comment(longComment);
        expect(comment.value).toBe(longComment);
    });

    test("最小長未満の値でCommentを生成するとエラーを投げる", () => {
        expect(() => {
            new Comment("");
        }).toThrow(`コメントは${Comment.MIN_LENGTH}文字以上${Comment.MAX_LENGTH}文字以下でなければなりません。`);
    });

    test("最大長を超える値でCommentを生成するとエラーを投げる", () => {
        const tooLongComment = "a".repeat(1001);
        expect(() => {
            new Comment(tooLongComment);
        }).toThrow(`コメントは${Comment.MIN_LENGTH}文字以上${Comment.MAX_LENGTH}文字以下でなければなりません。`);
    });

    test("getQualityFactor() 短いコメントの品質係数が正しく計算される", () => {
        expect(new Comment("a").value.length).toBeLessThan(10);
        expect(new Comment("a").getQualityFactor()).toBe(0.2);
    });

    test("getQualityFactor() 最適な長さのコメントの品質係数が正しく計算される", () => {
        const optimalComment = "a".repeat(100);
        expect(new Comment(optimalComment).value.length).toBeGreaterThanOrEqual(100);
        expect(new Comment(optimalComment).getQualityFactor()).toBe(1.0);
    });

    test("getQualityFactor() 中程度の長さのコメントの品質係数が正しく計算される", () => {
        const midLengthComment = "a".repeat(50);
        expect(new Comment(midLengthComment).value.length).toBeGreaterThanOrEqual(10);
        expect(new Comment(midLengthComment).value.length).toBeLessThan(100);
        const expectedQuality = 0.2 + 0.8 * ((50 - 10) / (100 - 10));
        expect(new Comment(midLengthComment).getQualityFactor()).toBeCloseTo(expectedQuality);
    });
});