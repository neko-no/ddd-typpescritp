// // BookID Comment Name Rating ReviewId ReviewIdentityをインポート
import { BookId } from "../Book/BookId/BookId";
import { Comment } from "./Comment/Comment";
import { Name } from "./Name/Name";
import { Rating } from "./Rating/Rating";
import { Review } from "./Review";
import { ReviewId } from "./ReviewId/ReviewId";
import { ReviewIdentity } from "./ReviewIdentity/ReviewIdentity";


describe("Review", () => {
    const reviewId = new ReviewId();
    const identity = new ReviewIdentity(reviewId);
    const bookId = new BookId("9784798126708");
    const name = new Name("レビュアーA");
    const rating = new Rating(4);
    const comment = new Comment("とても面白い本でした！おすすめです。");


    describe("create", () => {
        it("レビューを作成できる", () => {
            const review = Review.create(identity, bookId, name, rating, comment);
            expect(review.reviewId.equals(reviewId)).toBeTruthy();
            expect(review.bookId.equals(bookId)).toBeTruthy();
            expect(review.name.equals(name)).toBeTruthy();
            expect(review.rating.equals(rating)).toBeTruthy();
            expect(review.comment?.equals(comment)).toBeTruthy();
        });
    });

    describe("reconstruct", () => {
        it("レビューを再構築できる", () => {
            const review = Review.reconstruct(identity, bookId, name, rating, comment);
            expect(review.reviewId.equals(reviewId)).toBeTruthy();
            expect(review.bookId.equals(bookId)).toBeTruthy();
            expect(review.name.equals(name)).toBeTruthy();
            expect(review.rating.equals(rating)).toBeTruthy();
            expect(review.comment?.equals(comment)).toBeTruthy();
        });
    });

    describe("equals", () => {
        it("同一のIDを持つレビューは等価である", () => {
            const review1 = Review.create(identity, bookId, name, rating, comment);
            const review2 = Review.create(identity, bookId, name, rating, comment);
            expect(review1.equals(review2)).toBeTruthy();
        });

        it("異なるIDを持つレビューは等価でない", () => {
            const review1 = Review.create(identity, bookId, name, rating, comment);
            const review2 = Review.create(new ReviewIdentity(new ReviewId()), bookId, name, rating, comment);
            expect(review1.equals(review2)).toBeFalsy();
        });
    });

    describe("isTrustworthy", () => {
        it("コメントありの場合、評価とコメントの品質を組み合わせて信頼性を判断する", () => {
            const review = Review.create(identity, bookId, name, rating, comment);

            jest.spyOn(review.rating, "getQualityFactor").mockReturnValue(0.75);
            jest.spyOn(review.comment!, "getQualityFactor").mockReturnValue(0.3);

            expect(review.isTrustworthy(0.6)).toBeTruthy();
            expect(review.isTrustworthy(0.8)).toBeFalsy();
        });

        it("コメントなしの場合、評価の品質のみで信頼性を判断する", () => {
            const review = Review.create(identity, bookId, name, rating);

            jest.spyOn(review.rating, "getQualityFactor").mockReturnValue(0.5);

            expect(review.isTrustworthy(0.6)).toBeFalsy();
            expect(review.isTrustworthy(0.4)).toBeTruthy();
        });
    });

    describe("extractRecommendedBooks", () => {
        it("コメントがない場合は空の配列を返す", () => {
            const review = Review.create(identity, bookId, name, rating, comment);

            const recommendedBooks = review.extractRecommendedBooks();
            expect(recommendedBooks).toEqual([]);
        });

        it("コメントからパターンに一致する複数の推薦本を抽出できる", () => {
            const commetWithMultipleBooks = new Comment("『実践ドメイン駆動設計』を読んだ後に読むと理解しやすいです。また、前提知識として『エリック・エヴァンスのドメイン駆動設計』が必要です。");

            const review = Review.create(identity, bookId, name, rating, commetWithMultipleBooks);

            const recommendedBooks = review.extractRecommendedBooks();
            expect(recommendedBooks).toEqual([
                "実践ドメイン駆動設計",
                "エリック・エヴァンスのドメイン駆動設計"
            ]);
        });

        it("重複する推薦本は一度だけ抽出される", () => {
            const commetWithDuplicateBooks = new Comment("『実践ドメイン駆動設計』を読んだ後に読むと理解しやすいです。また、前提知識として『実践ドメイン駆動設計』が必要です。");

            const review = Review.create(identity, bookId, name, rating, commetWithDuplicateBooks);

            const recommendedBooks = review.extractRecommendedBooks();
            expect(recommendedBooks).toEqual([
                "実践ドメイン駆動設計"
            ]);
        });
    });

    describe("updateName", () => {
        it("レビュアーの名前を更新できる", () => {
            const review = Review.create(identity, bookId, name, rating, comment);
            const newName = new Name("レビュアーB");
            review.updateName(newName);
            expect(review.name.equals(newName)).toBeTruthy();
        });
    });

    describe("updateRating", () => {
        it("評価を更新できる", () => {
            const review = Review.create(identity, bookId, name, rating, comment);
            const newRating = new Rating(5);
            review.updateRating(newRating);
            expect(review.rating.equals(newRating)).toBeTruthy();
        });
    });

    describe("editComment", () => {
        it("コメントを更新できる", () => {
            const review = Review.create(identity, bookId, name, rating, comment);
            const newComment = new Comment("内容を更新しました。");
            review.editComment(newComment);
            expect(review.comment?.equals(newComment)).toBeTruthy();
        });
    });     
});