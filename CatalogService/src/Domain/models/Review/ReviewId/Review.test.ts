import { ReviewId } from "./ReviewId";

jest.mock("nanoid", () => ({
    nanoid: () => "testIdWithExactLength",
}));

describe("ReviewId", () => {
    test("デフォルトの値でReviewIdが作成できる", () => {
        const reviewId = new ReviewId();
        expect(reviewId.value).toBe("testIdWithExactLength");
    });

    test("指定された値でReviewIdが作成できる", () => {
        const customId = "customReviewId";
        const reviewId = new ReviewId(customId);
        expect(reviewId.value).toBe(customId);
    });

    test('最小値以下の値でReviewIdを生成するとエラーを投げる', () => {
        expect(() => {
            new ReviewId("");
        }).toThrow(`レビューIDは${ReviewId.MIN_LENGTH}文字以上${ReviewId.MAX_LENGTH}文字以下でなければなりません。`);
    });
    
    test('最大値を超える値でReviewIdを生成するとエラーを投げる', () => {
        const tooLongId = "a".repeat(ReviewId.MAX_LENGTH + 1);
        expect(() => {
            new ReviewId(tooLongId);
        }).toThrow(`レビューIDは${ReviewId.MIN_LENGTH}文字以上${ReviewId.MAX_LENGTH}文字以下でなければなりません。`);
    });
});