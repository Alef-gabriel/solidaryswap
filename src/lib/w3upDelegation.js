import * as Delegation from "@ucanto/core/delegation";
import * as Client from "@web3-storage/w3up-client";

export const w3upDelegation = async () => {
  const client = await Client.create();

  const did = await client.did();
  const apiUrl = `http://localhost:5173/api/w3up-delegation/${did}`;
  const response = await fetch(apiUrl);
  const data = await response.arrayBuffer();

  const delegation = await Delegation.extract(new Uint8Array(data));
  if (!delegation.ok) {
    throw new Error("Failed to extract delegation", {
      cause: delegation.error,
    });
  }
  const space = await client.addSpace(delegation.ok);
  await client.setCurrentSpace(space.did());
  return client;
};
