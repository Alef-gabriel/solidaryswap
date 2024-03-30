import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './createProject.dto';
import { Wallet, ethers, Signer } from 'ethers';
import { filecoinTestnet, botanixTestnet } from '../config/providers';
import { Database } from '@tableland/sdk';
import * as fs from 'fs';
import { CommentsService } from './comments/comments.service';

@Injectable()
export class ProjectService {
  private signer: Signer;

  constructor(private commentsService: CommentsService) {
    const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
    const wallet = new Wallet(
      process.env.SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
      provider,
    );
    this.signer = wallet.connect(provider);
  }

  async createProject(createProject: CreateProjectDto) {
    const {
      title,
      description,
      image,
      video,
      location,
      user_contract_id,
      category,
      subCategory,
      goal,
    } = createProject;
    const id = btoa(title);
    const compiled = JSON.parse(
      fs.readFileSync(
        'artifacts/contracts/ProjectsTable.sol/ProjectsTable.json',
        'utf-8',
      ),
    );
    const contract = new ethers.Contract(
      process.env.SECRET_PROJECT_TABLE_CONTRACT,
      compiled.abi,
      this.signer,
    );
    const backers_table_name = await this.createBackersTable();
    const comments_table_name =
      await this.commentsService.createCommentsTable();
    const deployed_project_contract = await this.deployProjectContract();

    await contract.insertIntoTable(
      'id,title,description,image,video,location,user_contract_id,backers_table_name,comments_table_name, category, sub_category, goal, project_contract_id',
      `'${id}','${title}','${description}','${image}','${video}','${location}','${user_contract_id}','${backers_table_name}','${comments_table_name}','${category}','${subCategory}','${goal}','${deployed_project_contract}'`,
    );
    return id;
  }

  private async createBackersTable(): Promise<string> {
    const db = new Database({ signer: this.signer });
    const prefix = 'backers_table';
    const { meta: create } = await db
      .prepare(`CREATE TABLE ${prefix} (id integer primary key, user_id text);`)
      .run();
    await create.txn?.wait();

    const tableName = create.txn?.names[0] ?? '';
    return tableName;
  }

  private async deployProjectContract(): Promise<string> {
    const provider = new ethers.providers.JsonRpcProvider(botanixTestnet);
    const wallet = new Wallet(
      process.env.SECRET_BOTANIX_TESTNET_PRIVATE_KEY,
      provider,
    );
    const signer = wallet.connect(provider);

    const compiled = JSON.parse(
      fs.readFileSync('artifacts/contracts/Project.sol/Project.json', 'utf-8'),
    );
    const contractFactory = new ethers.ContractFactory(
      compiled.abi,
      compiled.bytecode,
      signer,
    );

    const addressValue = ethers.utils.getAddress(
      process.env.SECRET_WALLET_ADDRESS,
    );
    const contract = await contractFactory.deploy(addressValue);
    return contract.address;
  }

  async findAll(id: string) {
    const db = new Database({ signer: this.signer });

    const { results } = await db
      .prepare(
        `SELECT * FROM ${process.env.SECRET_PROJECT_TABLE_NAME} WHERE id='${id}'`,
      )
      .all();
    return results;
  }

  async backersLenght(contractId: string) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(botanixTestnet);
      const addressValue = ethers.utils.getAddress(contractId);
      const wallet = new Wallet(
        process.env.SECRET_BOTANIX_TESTNET_PRIVATE_KEY,
        provider,
      );

      const compiled = JSON.parse(
        fs.readFileSync(
          'artifacts/contracts/Project.sol/Project.json',
          'utf-8',
        ),
      );
      const signer = wallet.connect(provider);
      const contract = new ethers.Contract(addressValue, compiled.abi, signer);

      const backersCount = await contract.getAddressCount();

      const backersCountString = backersCount.toString();
      return backersCountString;
    } catch (error) {
      throw new HttpException('Not Found backers table', HttpStatus.NOT_FOUND);
    }
  }
}
