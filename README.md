# React native internet identity integration

This Documentation is for referance to anyone trying to integrate internet identity authentication with react native.

## Versions Used : 

- JDK version 11.0.0.1
- React 18.2.0
- React native 0.72.7
- compileSDK and targetSdk 31
- minSdkVersion 21
- buildToolVersion 31.0.0
- Node v18.16.1
- @reduxjs/toolkit ^2.0.1

## Setting up and running the project

>**Use npm i --force if npm i gives errors**

>**Also make sure to run 'adb reverse tcp:4943 tcp:4943' for accessing and making canister calls from you device used for launching the project.**

- Clone the project using git clone < repo link >
- install the packages using npm i and mops i commands
- Complete upcoming steps simultaneously, after completing them you will be able to run the project.
- for running frontend:

1. fixing the 'ViewPropTypes will be removed' err before starting the frontend :

   i)`npm i --force  deprecated-react-native-prop-types`<br>
   ii) Inside node_modules find node_modules/react-native/index.js file.<br>
   iii)  Go to line 383 and replace the methods given there with :
   <pre>
      // Deprecated Prop Types
      get ColorPropType(): $FlowFixMe {<br>
         return require('deprecated-react-native-prop-types').ColorPropType;<br>
      },<br>

      get EdgeInsetsPropType(): $FlowFixMe {<br>
         return require('deprecated-react-native-prop-types').EdgeInsetsPropType;<br>
      },<br>

      get PointPropType(): $FlowFixMe {<br>
         return require('deprecated-react-native-prop-types').PointPropType;<br>
      },<br>

      get ViewPropTypes(): $FlowFixMe {<br>
         return require('deprecated-react-native-prop-types').ViewPropTypes;<br>
      },<br>
   </pre>
2. Follow [this doc](https://docs.google.com/document/d/14rPY-kNuBXau5fNxSXXpfaHrMNZSGqY9okc3Z8WDLu4/edit?usp=sharing)  to make necessary changes inside agent package to run the project.

3. run `npm start -- --reset-cache` command to start the frontend and then choose `a` to run it on android. You can also simply run `npm start` but the first command is suggested because sometimes react-native gives unnecessary warnings and errors which are fixed by clearing the cache by that command on running.

- for starting dfx : 

1. **dfx start**
2. **dfx generate** <br>

   after the declarations are generated inside src folder replace code inside index.js where we export the actor at the end with the code given in following example, e.g. for backend you will export it as :<br> 
   <pre>
      export const backend = createActor(canisterId, {
         agentOptions: {
            fetchOptions: {
               reactNative: {
                __nativeResponseType: 'base64',
               },
            },
            callOptions: {
            reactNative: {
               textStreaming: true,
            },
         },
            blsVerify: () => true,
            host: 'http://127.0.0.1:4943',
         },
      });
   </pre> 
   Similarly add the createActor function inside the declaration of other canisters , just change the backend to the name of that canister. Do the same for User, hotel and LoginWeb declarations' index.js. 
   <br>
   Also, around line 34 of every declaration above createActor function, we are returning Actor.createActor function. Pass 'bls_verify:true' as the third argument of that function like shown below : 
   <pre>
         return Actor.createActor(idlFactory, {
            agent,
            canisterId,
            blsVerify: () => true,
            ...options.actorOptions,
         });
   </pre>

3. **dfx deps install**
4. **dfx deps deploy internet_identity**
5. **dfx deploy backend**

   After deploying thes backend canister we will get its canister ID, which we have to place inside the index.js folder of the backend declaration like : <br>
   `export const canisterId ="bkyz2-fmaaa-aaaaa-qaaaq-cai"`

6. **dfx deploy LoginWeb**

   inside the src/app/Main.js folder place the complete link of the deployed LoginWeb canister on line 96 like : 
   <br>
   <pre>
   const url = `http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai&publicKey=${toHex(middleKeyIdentity.getPublicKey().toDer())}`; 
   </pre><br>
   replace all the url before '&publicKey' with your LoginWeb canister deployed link. 
   Also in line 158 where createActor method is called pass your backend canister instead you the one given.

7. **dfx canister call backend createNewUserCanister user**
8. **dfx canister call backend createNewHotelCanister hotel** 

   On making the above two canister calls you will get the respective canister IDs for newly created user and hotel canisters(You can change the names of the canisters if you want).
   <br>
   Copy those IDs and place them inside the index.js of their respective declarations like we did for backend declaration in step 5 of deploying dfx like:
   `export const canisterId ="br5f7-7uaaa-aaaaa-qaaca-cai"`

   Then inside src/app/Main.js replace the canister IDs passed while initializing actorUser and actorHotel on line 161 and 162 with the canister ID we got after deploying the canisters user and hotel respectively : 

   `let actorUser=createActor('br5f7-7uaaa-aaaaa-qaaca-cai',{agent})
    `<br>
   `let actorHotel=createActor('bw4dl-smaaa-aaaaa-qaacq-cai'{agent})`


## Global crypto not found solution 

> **Note :** These libraries are dependent on each other. Do not skip any of them. If you are using react-native <=0.60 make sure to link them using **react-native link < Library Name >**. For versions more than 0.60, link an unlink commands are not needed.   

### **Libraries to be installed :**

>1. [react-native-webview-crypto](https://www.npmjs.com/package/react-native-webview-crypto) 

**Command** 

npm i react-native-webview-crypto
<hr><br>

>2. [webview-crypt](https://www.npmjs.com/package/webview-crypto)

**Command** 

npm i webview-crypto
<hr>

### **Steps to follow :**

- Import PolyfillCrypto in your Root Component <br><br>
`import PolyfillCrypto from 'react-native-webview-crypto'`<br>


- Place the PolyfillsCrypto inside the root component<br><br>
<pre>
<b>const Component=()=>{
   < >
      < PolyfillCrypto />
   < />
}</b>
</pre>



