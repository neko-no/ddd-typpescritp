import { ReviewId } from "../ReviewId/ReviewId";
import { ReviewIdentity } from "./ReviewIdentity";

describe("ReviewIdentity", () => {
    it("同じIDを持つエンティティは等価である", () => {
        const reviewId = new ReviewId();
        const identity1 = new ReviewIdentity(reviewId);
        const identity2 = new ReviewIdentity(reviewId);

        expect(identity1.equals(identity2)).toBeTruthy();
    });

    it("異なるIDを持つエンティティは等価でない", () => {
        const identity1 = new ReviewIdentity(new ReviewId());
        const identity2 = new ReviewIdentity(new ReviewId());
        
        expect(identity1.equals(identity2)).toBeFalsy();
    });
});