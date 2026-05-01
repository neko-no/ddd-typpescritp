import { ValueObject } from "../../shared/ValueObject";

type RatingValue = number;
export class Rating extends ValueObject<RatingValue, "Rating"> {
    static readonly MIN = 1;
    static readonly MAX = 5;

    constructor(value: RatingValue) {
        super(value);
    }

    protected validate(value: RatingValue): void {
        if (!Number.isInteger(value)) {
            throw new Error("評価値は整数値出なければなりません。");
        }

        if (value < Rating.MIN || value > Rating.MAX) {
            throw new Error(`評価値は${Rating.MIN}から${Rating.MAX}までの整数値でなければなりません。`);
        }
    }

    getQualityFactor(): number {
        return (this._value - Rating.MIN) / (Rating.MAX - Rating.MIN);
    }
}