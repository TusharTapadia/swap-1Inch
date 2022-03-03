// const contractAbi = [
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "inputs": [],
//       "name": "pancakeRouter",
//       "outputs": [
//         {
//           "internalType": "contract IPancakeRouter02",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "stateMutability": "payable",
//       "type": "receive",
//       "payable": true
//     },
//     {
//       "inputs": [],
//       "name": "bnbToCake",
//       "outputs": [],
//       "stateMutability": "payable",
//       "type": "function",
//       "payable": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "bnb",
//           "type": "uint256"
//         }
//       ],
//       "name": "getEstimateBUSD",
//       "outputs": [
//         {
//           "internalType": "uint256[]",
//           "name": "",
//           "type": "uint256[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     }
//   ];

init = async () => {
  if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  await window.ethereum.enable();
  console.log("Connected");
} else {
  alert("Metamask not found");
}
};

// const contractAddress = '0xcb35eCB10A81DEBE11b970D6b65Da0b42F511C3f';

const swapValue = document.getElementById("swapValue");


// swapFunction = async () =>{
//   const web3 = new Web3(window.ethereum);
//   const accounts = await web3.eth.getAccounts();
//   console.log(accounts[0]);

//   const instance = new web3.eth.Contract(contractAbi, contractAddress, {from: accounts[0]});

//   await instance.methods.bnbToCake().send({
//       value: swapValue.value,
//       gas: 1500000,
//       from: accounts[0]})
//       .once("receipt", (receipt) => {
//           console.log(receipt);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
// };

init();







// const Web3 = require('web3')
const axios = require('axios')


async function swap(){
  try{
    const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);

      const response = await axios.get(`https://api.1inch.io/v4.0/56/swap?fromTokenAddress=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&toTokenAddress=0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82&amount=5000000000000000&&fromAddress=${accounts[0]}&slippage=0.1&disableEstimate=true`)
      if(response.data){
          data = response.data
          // data.tx.value = 5000000000000000
          console.log(data);
          tx = await web3.eth.sendTransaction(data.tx)
          if(tx.status){
              console.log("Swap Successfull! :)")
          }
      }
  }catch(err){
      console.log(err)
  }

}

const swapButton = document.getElementById("swapBtn");
swapButton.onclick = swap;


approve = async() =>{
  try {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);

  const response = await axios.get("https://api.1inch.io/v4.0/56/approve/transaction?tokenAddress=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&amount=20000000000000000")
  if(response.data){
    data = response.data
    console.log(data);
    tx = await web3.eth.sign(data)
    if(tx.status){
        console.log("Swap Successfull! :)")
    }
  }
  } catch(err){
  console.log("encountered an error below")
  console.log(err)
  }
}

const approveButton = document.getElementById("approveBtn");
approveButton.onclick=approve;