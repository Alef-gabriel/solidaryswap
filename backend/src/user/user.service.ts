import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { Wallet, ethers, Signer } from 'ethers';
import { Database } from '@tableland/sdk';
import { filecoinTestnet } from '../config/providers';
import * as fs from 'fs';
import bcrypt from 'bcrypt';
import { updateUserDto } from './updateUser.dto';

@Injectable()
export class UserService {
  private signer: Signer;

  constructor() {
    const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
    const wallet = new Wallet(
      process.env.SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
      provider,
    );
    this.signer = wallet.connect(provider);
  }
  async findOneById(id: string) {
    const db = new Database({ signer: this.signer });

    const { results } = await db
      .prepare(
        `SELECT * FROM ${process.env.SECRET_USER_TABLE_NAME} WHERE id='${id}'`,
      )
      .all();
    return results[0];
  }

  async findOneByEmail(email: string) {
    const db = new Database({ signer: this.signer });

    const { results } = await db
      .prepare(
        `SELECT * FROM ${process.env.SECRET_USER_TABLE_NAME} WHERE email='${email}'`,
      )
      .all();
    return results[0];
  }

  async create(createuserDto: CreateUserDto): Promise<void> {
    const { email, name, password } = createuserDto;
    const fileContent = fs.readFileSync(
      'solidarityswap/artifacts/contracts/UsersTable.sol/UsersTable.json',
      'utf-8',
    );
    const compiled = JSON.parse(fileContent);
    const contract = new ethers.Contract(
      process.env.SECRET_USER_TABLE_CONTRACT,
      compiled.abi,
      this.signer,
    );

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const id = btoa(email);

    await contract.insertIntoTable(
      'id,password, email, name',
      `'${id}','${hash}','${email}','${name}'`,
    );
  }

  async findAll() {
    const db = new Database({ signer: this.signer });

    const { results } = await db
      .prepare(`SELECT * FROM ${process.env.SECRET_USER_TABLE_NAME}`)
      .all();
    return results;
  }

  async updateUser(updateUser: updateUserDto) {
    const { id, biography, image, location } = updateUser;

    const compiled = JSON.parse(
      fs.readFileSync(
        'artifacts/contracts/UsersTable.sol/UsersTable.json',
        'utf-8',
      ),
    );
    const contract = new ethers.Contract(
      process.env.SECRET_USER_TABLE_CONTRACT,
      compiled.abi,
      this.signer,
    );
    await contract.updateTable(
      `'${id}'`,
      `biography='${biography}',image='${image}',location='${location}'`,
    );
  }
}
