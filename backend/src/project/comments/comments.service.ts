import { Injectable } from '@nestjs/common';
import { Wallet, ethers, Signer } from 'ethers';
import { filecoinTestnet } from '../../config/providers';
import { Database } from '@tableland/sdk';
import { CreateCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  private signer: Signer;

  constructor() {
    const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
    const wallet = new Wallet(
      process.env.SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
      provider,
    );
    this.signer = wallet.connect(provider);
  }

  async createCommentsTable() {
    const db = new Database({ signer: this.signer });
    const prefix = 'comment_table';
    const { meta: create } = await db
      .prepare(
        `CREATE TABLE ${prefix} (id integer primary key, user_id text, val text);`,
      )
      .run();
    await create.txn?.wait();

    const tableName = create.txn?.names[0] ?? '';
    return tableName;
  }

  async incertComments(createComment: CreateCommentDto) {
    const { tableName, userId, comment } = createComment;
    const db = new Database({ signer: this.signer });

    const comments = await this.getCommentsId(db, tableName);
    const id = comments.length + 1;

    const { meta: insert } = await db
      .prepare(`INSERT INTO ${tableName} (id, user_id, val) VALUES (?, ?, ?);`)
      .bind(id, userId, comment)
      .run();
    await insert.txn?.wait();
    return new Response(JSON.stringify({ res: 'Susses' }), { status: 200 });
  }

  private async getCommentsId(db, comments_table_name) {
    const { results } = await db
      .prepare(`SELECT * FROM ${comments_table_name}`)
      .all();
    return results;
  }

  async findAll(tableName: string) {
    const db = new Database({ signer: this.signer });

    const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
    return results;
  }
}
