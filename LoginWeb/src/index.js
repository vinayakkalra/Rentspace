import {backend, createActor} from '../../src/declarations/backend/index';
import {AuthClient} from '@dfinity/auth-client';
import {HttpAgent} from '@dfinity/agent';
import {
  DelegationIdentity,
  Ed25519PublicKey,
  ECDSAKeyIdentity,
  DelegationChain,
} from '@dfinity/identity';

let actor = backend;
var url = new URL(window.location.href);

// Get the search parameters from the URL
var params = new URLSearchParams(url.search);

const loginButton = document.getElementById('login');
loginButton.onclick = async e => {
  e.preventDefault();

//   var middleKeyIdentity = await ECDSAKeyIdentity.generate({extractable: true});
  let publicKey = params.get('publicKey');
  let newIdentity = new ECDSAKeyIdentity(
    {publicKey: publicKey},
    publicKey,
    null,
  );
  let authClient = await AuthClient.create({identity: newIdentity});
  await new Promise(resolve => {
    authClient.login({
      identityProvider: process.env.DFX_NETWORK === "ic"
                  ? "https://identity.ic0.app"
                  : `http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`,
      onSuccess: resolve,
    });
  });

  const identity = authClient.getIdentity();

  var delegationString = JSON.stringify(identity.getDelegation().toJSON());

  const encodedDelegation = encodeURIComponent(delegationString);

//   const chain = DelegationChain.fromJSON(
//     JSON.parse(decodeURIComponent(encodedDelegation)),
//   );
//   const middleIdentity = DelegationIdentity.fromDelegation(
//     middleKeyIdentity,
//     chain,
//   );

//   const agent = new HttpAgent({identity: middleIdentity});

//   actor = createActor('bkyz2-fmaaa-aaaaa-qaaaq-cai', {
//     agent,
//   });
//   console.log('actor', actor);
//   let whoami = await actor.whoami();
//   console.log(whoami);

  var url = `rentspace://auth?delegation=${encodedDelegation}`;
  window.open(url, '_self');

  return false;
};