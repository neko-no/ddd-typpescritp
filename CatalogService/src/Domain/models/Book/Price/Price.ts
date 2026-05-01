import { ValueObject } from "Domain/models/shared/ValueObject";

interface PriceValue {
    amount: number;
    currency: "JPY"; 
}

export class Price extends ValueObject<PriceValue, "Price"> {
    static readonly MAX = 1000000; // 最大価格を設定
    static readonly MIN = 0; // 最小価格を設定

    constructor(value: PriceValue) {
        super(value);
    }

    protected validate(value: PriceValue): void {
        if (value.currency !== "JPY") {
            throw new Error("現在は日本円のみ扱います。");
        }

        if (value.amount < Price.MIN || value.amount > Price.MAX) {
            throw new Error(`価格は${Price.MIN}円から${Price.MAX}円の間でなければなりません。`);
        }
    }

    get amount(): PriceValue["amount"] {
        return this.value.amount;
    }

    get currency(): PriceValue["currency"] {
        return this.value.currency;
    }
}   