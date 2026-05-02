import { ITransactionManager } from "Application/shared/ITransactionManager";
import { SQLClientManager } from "./SQLClientManager";

export class SQLTransactionManager implements ITransactionManager {
    constructor(private readonly clientManger: SQLClientManager) {}

    async begin<T>(callback: () => Promise<T>): Promise<T> {
        const existingClient = this.clientManger.getClient();
        if (existingClient) {
            return await callback();
        }

        const client = await this.clientManger.getConnection();
        try {
            return await this.clientManger.runWithClient(client, async () => {
                try {
                    // トランザクションの開始
                    await client.query("BEGIN");

                    const reuslt = await callback();

                    // トランザクションのコミット
                    await client.query("COMMIT");
                    return reuslt;
                } catch (error) {
                    await client.query("ROLLBACK");
                    throw error;
                }
            });

        } finally {
            client.release();
        }
    }
}