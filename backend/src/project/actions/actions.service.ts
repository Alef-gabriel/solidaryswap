import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Wallet, ethers, Signer } from 'ethers';
import { botanixTestnet } from '../../config/providers';
import * as fs from 'fs';
import { WithdrawDto } from './withdraw.dto';
import { ProfitSharingDto } from './profitSharing.dto';

@Injectable()
export class ActionsService {
  private signer: Signer;

  constructor() {
    const provider = new ethers.providers.JsonRpcProvider(botanixTestnet);
    const wallet = new Wallet(
      process.env.SECRET_BOTANIX_TESTNET_PRIVATE_KEY,
      provider,
    );
    this.signer = wallet.connect(provider);
  }

  async withdraw(data: WithdrawDto) {
    const { contractAddress, amount, walletToRecive } = data;
    try {
      const addressValue = ethers.utils.getAddress(contractAddress);
      const compiled = JSON.parse(
        fs.readFileSync(
          'artifacts/contracts/Project.sol/Project.json',
          'utf-8',
        ),
      );
      const contract = new ethers.Contract(
        addressValue,
        compiled.abi,
        this.signer,
      );
      const uintValue = ethers.utils.parseEther(amount);

      await contract.withdraw(walletToRecive, uintValue, {
        gasLimit: 210000,
      });
    } catch (error) {
      throw new HttpException('withdraw operation error', HttpStatus.NOT_FOUND);
    }
  }

  async profitSharing(data: ProfitSharingDto) {
    const { contractAddress, amount } = data;

    try {
      const addressValue = ethers.utils.getAddress(contractAddress);
      const compiled = JSON.parse(
        fs.readFileSync(
          'artifacts/contracts/Project.sol/Project.json',
          'utf-8',
        ),
      );
      const contract = new ethers.Contract(
        addressValue,
        compiled.abi,
        this.signer,
      );

      const totalValue = ethers.utils.parseEther(amount);
      const total = await contract.totalSupply();
      const backersLenght = await contract.getAddressCount();

      for (let index = 0; index < backersLenght; index++) {
        const balance = await contract.getAddressBalance(index);
        const percentage = balance.mul(totalValue).div(total);
        await contract.distributeFading(percentage, index, {
          gasLimit: 210000,
        });
      }
      return new Response(JSON.stringify({ res: 'Susses' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ res: error }), { status: 500 });
    }
  }
}
