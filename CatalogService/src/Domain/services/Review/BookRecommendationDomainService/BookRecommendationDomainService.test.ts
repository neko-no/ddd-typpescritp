// BookId Comment Name Rating Review ReviewIs ReviewIdentity BookRecommendationDomainService をインポート
import { BookId } from "Domain/models/Book/BookId/BookId";
import { Comment } from "Domain/models/Review/Comment/Comment";
import { Name } from "Domain/models/Review/Name/Name";
import { Rating } from "Domain/models/Review/Rating/Rating";
import { Review } from "Domain/models/Review/Review";
import { ReviewId } from "Domain/models/Review/ReviewId/ReviewId";
import { ReviewIdentity } from "Domain/models/Review/ReviewIdentity/ReviewIdentity";
import { BookRecommendationDomainService } from "./BookRecommendationDomainService";

describe("BookRecommendationDomainService", () => {
    let service: BookRecommendationDomainService;

    beforeEach(() => {
        service = new BookRecommendationDomainService();
    });

    // ヘルパー関数: レビューを作成
    const createReview = (
        reviewId: string,
        bookId: string,
        name: string,
        rating: number,
        comment?: string
    ): Review => {
        return Review.create(
            new ReviewIdentity(new ReviewId(reviewId)),
            new BookId(bookId),
            new Name(name),
            new Rating(rating),
            comment ? new Comment(comment) : undefined
        );
    };

    describe("calculateTopRecommendedBooks", () => {
        test("信頼できるレビューから推薦書籍を正しく抽出してカウントする", () => {
            // 信頼的る(Rating 5)
            const review1 = createReview("r1", "9784798126708", "レビュアーA", 5, "素晴らしい本でした。『実践ドメイン駆動設計』を先に読むことを推奨します。");
            // 信頼できる (Rating 4)
            const review2 = createReview(
                "r2",
                "9784814400737",
                "レビュアー2",
                4,
                "とても良いです。前提書籍として『エリック・エヴァンスのドメイン駆動設計』が必要です。"
            );
            // 信頼できる (Rating 5)
            const review3 = createReview(
                "r3",
                "9784814400737",
                "レビュアー3",
                5,
                "最高！『実践ドメイン駆動設計』を先に読むことを推奨します。"
            );
            // 信頼できない (Rating 2)
            const review4 = createReview(
                "r4",
                "9784814400737",
                "レビュアー4",
                2,
                "つまらなかった。"
            );

            const allReviews = [review1, review2, review3, review4];
            const recommendations = service.calculateTopRecommendedBooks(allReviews, 2);

            expect(recommendations).toEqual([
                "実践ドメイン駆動設計",
                "エリック・エヴァンスのドメイン駆動設計",
            ])
        });

        test("信頼できるレビューがない場合、空の配列を返す", () => {
            // 信頼できない
            const review1 = createReview(
                "r6",
                "4798046140",
                "レビュアー6",
                1,
                "ひどい"
            );
            // 信頼できない
            const review2 = createReview(
                "r7",
                "4798046140",
                "レビュアー7",
                2,
                "良くない"
            );

            const reviews = [review1, review2];
            const recommendations = service.calculateTopRecommendedBooks(reviews);
            expect(recommendations).toEqual([]);
        });

        test("レビューが存在しない場合、空の配列を返す", () => {
            const reviews: Review[] = [];
            const recommendations = service.calculateTopRecommendedBooks(reviews);
            expect(recommendations).toEqual([]);
        })
    });


});
