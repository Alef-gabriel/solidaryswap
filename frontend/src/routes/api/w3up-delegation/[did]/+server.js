import { CarReader } from "@ipld/car";
import * as DID from "@ipld/dag-ucan/did";
import * as Delegation from "@ucanto/core/delegation";
import * as Signer from "@ucanto/principal/ed25519";
import * as Client from "@web3-storage/w3up-client";
import { StoreMemory } from "@web3-storage/w3up-client/stores/memory";
import { SECRET_KEY, SECRET_PROOF } from "$env/static/private";

//TODO validate the request
export async function GET({ params }) {
  const principal = Signer.parse(SECRET_KEY);
  const store = new StoreMemory();
  const client = await Client.create({ principal, store });
  // Add proof that this agent has been delegated capabilities on the space
  const proof = await parseProof(SECRET_PROOF);
  const space = await client.addSpace(proof);
  await client.setCurrentSpace(space.did());

  const audience = DID.parse(params.did);
  const abilities = ["store/add", "upload/add"];
  const expiration = Math.floor(Date.now() / 1000) + 60 * 3; // 3 minutes from now
  const delegation = await client.createDelegation(audience, abilities, {
    expiration,
  });

  // Serialize the delegation and send it to the client
  const archive = await delegation.archive()
  return new Response(archive.ok, { status: 200 });
}

/** @param {string} data Base64 encoded CAR file */
async function parseProof(data) {
  const blocks = [];
  const reader = await CarReader.fromBytes(Buffer.from(data, "base64"));
  for await (const block of reader.blocks()) {
    blocks.push(block);
  }
  return Delegation.importDAG(blocks);
}
