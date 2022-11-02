import { useState } from 'react';
import './App.css';
import React from 'react';
import { ethers } from 'ethers';
//import {Buffer} from 'buffer';
const App = () =>{

  //States
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [message,setMessage] = useState('');
  const [signature,setSignature] = useState('');
  const [signerAddress,setSignerAddress] = useState('');
  const [file,setFile] = useState(null)

  //functions

  const onClickConnect = async() =>{
    if(window?.ethereum){         //window.ethereum - detects ethereum provider
      const accounts = await window.ethereum.request({method : 'eth_requestAccounts'});
      setWalletAddress(accounts?.[0]);
      setIsWalletConnected(true);

      //Reset other values
      setFile('');
      setMessage('');
      setSignature('');
      setSignerAddress('');
    }
    else{
      alert('Browser wallet connection not supported!');
    }
  }

  const onSubmitFormSignMsg = async(event) =>{
    console.log('You proceeded to Sign Message');
    event.preventDefault();

    if(!message) 
      return;

    if(window?.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signedSignature = await signer.signMessage(message);
      setSignature(signedSignature);
      // const address = await signer.getAddress();
    }
    else {
      alert('Browser wallet connection not supported!');
    }
  
  }

  // const onUploadFile = async(event) =>{
  //   var CryptoJS = require("crypto-js");
  //     console.log('File is Uploading');
  //     event.preventDefault();
  //     const uploadedfile = event.target.files[0];
  //     var pch = ethers.utils.isHexString(uploadedfile);
  //     console.log(pch);

  //     const reader = new window.FileReader()
  //     reader.readAsArrayBuffer(uploadedfile);
      
  //      reader.onloadend = () => {
  //       //this.setState({ buffer: Buffer(reader.result) })
  //       const buffer = Buffer(reader.result);
  //       console.log(buffer);
  //       const fileHash = CryptoJS.SHA256(buffer);
  //       console.log(fileHash);
  //       // const message = fileHash.update(buffer).digest('hex');
  //       // console.log(message);
  //       const message = fileHash.toString(CryptoJS.enc.Hex);
  //       console.log(message);
  //       setMessage(message);
  //      } 
  // }

  const onSubmitFormVerifyMessage = async(event) =>{
    console.log('You proceeded to Verify Message');
    event.preventDefault();
    if(window?.ethereum){
      const signerAddress = await ethers.utils.verifyMessage(message,signature);
      setSignerAddress(signerAddress);
    }
    else{
      alert('Browser wallet connection not Supported!');
    }
  }  
  

return (
  <div className="App">
      <header className="App-header">
        <center>
          <h1>Digital Signature</h1>

          { !isWalletConnected 
            ? <button onClick = {onClickConnect}> Connect Wallet</button>
            : <div>

            <strong>Connected Wallet</strong>
            <pre><code>{walletAddress}</code></pre>

            <form onSubmit = { onSubmitFormSignMsg }>
              <div className='group'>
                <label htmlFor="message">Message to Sign</label>
                <input id="message" type="text" placeholder="Ex:hello world" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>

              {/* <div>
                <label htmlFor='file'>Upload File</label>
                <input id='file' type='file' onChange={onUploadFile} name='userFile'></input>
              </div> */}


              <div className='group'>
                <button>Sign Message</button>
              </div>
            </form>

            <h2>Verifying Message</h2>
            <form onSubmit={ onSubmitFormVerifyMessage}>
              <div className='group'>
                <label htmlFor="address">Wallet Address:</label>
                <input id="address" type="text" placeholder='Ex: hello world' value={walletAddress} onChange={(e) => setSignerAddress(e.target.value)} />
              </div>
    
              <div className='group'>
                <label htmlFor="message">Message:</label>
                <input id="message" type="text" placeholder="Ex:hello world" value={message} onChange={(e) => setMessage(e.target.value)}/>
              </div>

              <div className='group'>
                <label htmlFor='signature'>Signature:</label>
                <input id='signature' type='text' placeholder="Ex: 0xa123..." value={signature} onChange={(e) => setSignature(e.target.value)} />
              </div>

              <div className='group'>
                <button>Verify Message</button>
              </div>
            </form>

            <strong><small>Verification : </small></strong>

            <pre>
              <code>
                {JSON.stringify({
                  walletAddress,
                  signerAddress,
                  isVerified: walletAddress === signerAddress.toLowerCase() ? 'Verified✅' : 'Discrepated!!❌'}, null, " ")
                }
              </code>
            </pre>

            </div>
          }
        </center>
      </header>
    </div>
);

 }
export default App;
