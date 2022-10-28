import { ethers } from 'ethers';
import './App.css';

function App() {

  const init = async() => {
    console.log("working..");  

    //create wallet
    const wallet = ethers.Wallet.createRandom();
    console.log({wallet});

    //message to be signed
    const msg1 = "muskan";
    const msg2 = "muskan";  

    //Signing the message; making it a signature
    const signatureHash1 = await wallet.signMessage(msg1);
    console.log("Signature Hash of Msg1 : " ,{ signatureHash1 });

    const signatureHash2 = await wallet.signMessage(msg2);
    console.log("Signature Hash of Msg2 : " ,{ signatureHash2 });

    //split signatureHash
    const signature1 = ethers.utils.splitSignature(signatureHash1);
    console.log( "signature 1 : ",{signature1});

    const signature2 = ethers.utils.splitSignature(signatureHash2);
    console.log( "signature 2 : ",{signature2});

    //verify the address of the signature and message so that it matches the originating wallet signer 
    const verifiedAddress1 = await ethers.utils.verifyMessage(msg1 , signature1);
    const verifiedAddress2 = await ethers.utils.verifyMessage(msg2 , signature2);

    //ethers.utils.verifyMessage : 
    //   Returns the address of the account that signed messageStringOrArrayish to generate signature.
    console.log({verifiedAddress1});
    console.log({verifiedAddress2});


    console.log({ isVerified : verifiedAddress1 === wallet.address});
    console.log({ isVerified : verifiedAddress2 === wallet.address});

  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={init}>Create Random Wallet</button>
      </header>
    </div>
  );
}

export default App;
