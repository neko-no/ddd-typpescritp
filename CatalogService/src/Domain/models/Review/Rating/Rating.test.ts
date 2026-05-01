import { Rating } from "./Rating";

describe("Rating", () => {
    // 正常系
    test("有効な値をもつRatingが作成できる", () => {
        expect(new Rating(1).value).toBe(1);
        expect(new Rating(3).value).toBe(3);
        expect(new Rating(5).value).toBe(5);
    });

    test("equlas", () => {
        const rating1 = new Rating(3);
        const rating2 = new Rating(3);
        const rating3 = new Rating(4);

        expect(rating1.equals(rating2)).toBeTruthy();
        expect(rating1.equals(rating3)).toBeFalsy();
    });

    test("getQualityFactor", () => {
        expect(new Rating(1).getQualityFactor()).toBe(0);
        expect(new Rating(3).getQualityFactor()).toBe(0.5);
        expect(new Rating(5).getQualityFactor()).toBe(1);
    });

    // 異常系
    test("最小値未満の値でRatingを作成しようとするとエラーが発生する", () => {
        expect(() => new Rating(0)).toThrowError("評価値は1から5までの整数値でなければなりません。");
    });

    test("最大値を超える値でRatingを作成しようとするとエラーが発生する", () => {
        expect(() => new Rating(6)).toThrowError("評価値は1から5までの整数値でなければなりません。");
    });

    test("整数以外の値でRatingを作成しようとするとエラーが発生する", () => {
        expect(() => new Rating(3.5)).toThrowError("評価値は整数値出なければなりません。");
        expect(() => new Rating("3" as unknown as number)).toThrowError("評価値は整数値出なければなりません。");
    });
});