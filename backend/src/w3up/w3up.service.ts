import { Injectable } from '@nestjs/common';
import { CreateDelegationDto } from './createDelegation.dto';

@Injectable()
export class W3upService {
  async delegate(create: CreateDelegationDto) {
    const { DID } = require('@ipld/dag-ucan/did');
    const { Signer } = require('@ucanto/principal/ed25519');
    const { Client } = require('@web3-storage/w3up-client');
    const { StoreMemory } = require('@web3-storage/w3up-client/stores/memory');

    const principal = Signer.parse(process.env.SECRET_KEY);
    const store = new StoreMemory();
    const client = await Client.create({ principal, store });
    // Add proof that this agent has been delegated capabilities on the space
    const proof = await this.parseProof(process.env.SECRET_PROOF);
    const space = await client.addSpace(proof);
    await client.setCurrentSpace(space.did());

    const audience = DID.parse(create.did);
    const abilities = ['store/add', 'upload/add'];
    const expiration = Math.floor(Date.now() / 1000) + 60 * 3; // 3 minutes from now
    const delegation = await client.create(audience, abilities, {
      expiration,
    });

    const archive = await delegation.archive();
    return archive.ok;
  }

  /** @param {string} data Base64 encoded CAR file */
  private async parseProof(data) {
    const { Delegation } = require('@ucanto/core/delegation');
    const { CarReader } = require('@ipld/car');
    const blocks = [];
    const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'));
    for await (const block of reader.blocks()) {
      blocks.push(block);
    }
    return Delegation.importDAG(blocks);
  }
}
