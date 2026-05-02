import { Review } from "Domain/models/Review/Review";

export class BookRecommendationDomainService {
    constructor() {}

    /**
     * 信頼できるレビューをフィルタリング
     * @param reviews レビューの配列
     * @returns 信頼できるレビューの配列
     */
    getTrustworthyReviews(reviews: Review[]): Review[] {
        return reviews.filter(review => review.isTrustworthy());
    }

    /**
     * レビューから推薦本を抽出
     * @param reviews レビューの配列
     * @param maxCount 推薦本の最大数(デフォルト3)
     * @return 推薦本のタイトルの配列(最大値はmaxCount個)
     */
    calculateTopRecommendedBooks(reviews: Review[], maxCount: number = 3): string[] {
        const trustworthyReviews = this.getTrustworthyReviews(reviews);

        const recommendedBooks = trustworthyReviews.reduce((acc, review) => {
            // reviewオブジェクトのメソッドで、コメントから推薦本のタイトルを抽出
            const bookTitles = review.extractRecommendedBooks(); 

            // タイトルごとに出現回数をカウント
            bookTitles.forEach(title => {
                acc[title] = (acc[title] || 0) + 1;  // ない場合は0で初期化して、1を加算
            });
            return acc; 
        }, {} as {[title: string]: number});

        // 出現回数が多い順にソートして、上位maxCount個のタイトルを抽出
        return Object.entries(recommendedBooks)
            .sort((a, b) => b[1] - a[1]) // 出現回数で降順ソート
            .slice(0, maxCount) // 上位maxCount個を取得
            .map(entry => entry[0]); // タイトルだけを抽出
    }
}