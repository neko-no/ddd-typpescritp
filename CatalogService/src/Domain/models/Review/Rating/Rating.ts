import { isEqual } from "lodash";

export class Rating {
    private readonly _value: number;

    static readonly MIN = 1;
    static readonly MAX = 5;

    constructor(value: number) {
        this.validate(value);
        this._value = value;
    }

    protected validate(value: number): void {
        if (!Number.isInteger(value)) {
            throw new Error("評価値は整数値出なければなりません。");
        }

        if (value < Rating.MIN || value > Rating.MAX) {
            throw new Error(`評価値は${Rating.MIN}から${Rating.MAX}までの整数値でなければなりません。`);
        }
    }

    equals(other: Rating): boolean {
        return isEqual(this._value, other._value);
    }

    get value(): number {
        return this._value;
    }

    getQualityFactor(): number {
        return (this._value - Rating.MIN) / (Rating.MAX - Rating.MIN);
    }
}