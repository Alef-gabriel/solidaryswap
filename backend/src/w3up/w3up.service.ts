import { Injectable } from '@nestjs/common';
import { CarReader } from '@ipld/car';
import * as DID from '@ipld/dag-ucan/did';
import * as Delegation from '@ucanto/core/delegation';
import * as Signer from '@ucanto/principal/ed25519';
import * as Client from '@web3-storage/w3up-client';
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory';
import { createDelegationDto } from './createDelegation.dto';

@Injectable()
export class W3upService {
  async createDelegation(createDelegation: createDelegationDto) {
    const principal = Signer.parse(process.env.SECRET_KEY);
    const store = new StoreMemory();
    const client = await Client.create({ principal, store });
    // Add proof that this agent has been delegated capabilities on the space
    const proof = await this.parseProof(process.env.SECRET_PROOF);
    const space = await client.addSpace(proof);
    await client.setCurrentSpace(space.did());

    const audience = DID.parse(createDelegation.did);
    const abilities = ['store/add', 'upload/add'];
    const expiration = Math.floor(Date.now() / 1000) + 60 * 3; // 3 minutes from now
    const delegation = await client.createDelegation(audience, abilities, {
      expiration,
    });

    const archive = await delegation.archive();
    return archive.ok;
  }
  /** @param {string} data Base64 encoded CAR file */
  async parseProof(data) {
    const blocks = [];
    const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'));
    for await (const block of reader.blocks()) {
      blocks.push(block);
    }
    return Delegation.importDAG(blocks);
  }
}
