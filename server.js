const axios = require('axios')
const Web3 = require('web3');
var value = [];
var address = [];
var protocolMap = new Map();
protocolMap.set('All','');
const map = new Map();


connectWallet = async () =>{
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log("Connected");
      } else {
        alert("Metamask not found");
      }
}

const connect = document.getElementById("wallet");
connect.onclick = connectWallet;
getTokens = async () => {

    await axios.get('https://api.1inch.io/v4.0/56/tokens').then(function (response) {
        var data = response.data;
        var i = 0;
        var j = 0;
        var k = 0;
        Object.keys(data.tokens).forEach(function (key) {
            value[i++] = data.tokens[key].symbol;
            address[j++] = data.tokens[key].address;
        })
        for (let i = 0; i < value.length; i++) {
            map.set(value[i], address[i]);
        };


        var select = document.getElementById("ft1");
        console.log("First Token")
        var length = select.options.length;
        for (i = length - 1; i > 0; i--) {
            select.options[i] = null;
        }
        for (var i = 0; i < value.length; i++) {
            var opt = value[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }

        var select = document.getElementById("st1");
        console.log("Second Token")
        var length = select.options.length;
        for (i = length - 1; i > 0; i--) {
            select.options[i] = null;
        }
        for (var i = 0; i < value.length; i++) {
            var opt = value[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    })
}


const quoteApi = 'https://api.1inch.io/v4.0/56/quote';
const checkAllowanceApi = 'https://api.1inch.io/v4.0/56/approve/allowance';
const giveAllowanceApi = 'https://api.1inch.io/v4.0/56/approve/transaction';
const swapApi = 'https://api.1inch.io/v4.0/56/swap';
const protocolApi = 'https://api.1inch.io/v4.0/56/liquidity-sources';

getQuote = async () => {

    var t1 = document.getElementById('ft1')
    var t1data = t1.options[t1.selectedIndex].text;

    var t2 = document.getElementById('st1')
    var t2data = t2.options[t2.selectedIndex].text;

    var val = document.getElementById('swapValue')

    var selected = [];
    for (var option of document.getElementById('protocolList').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    
    var finalList = [];

    // if(selected[0]=='All'){
    //     finalList = ''
    // }else{
    //     finalList = selected.toString();
    // }

    for (let i=0;i<selected.length;i++){
        finalList[i]=protocolMap.get(selected[i]);
    }

    const response = await axios.get(quoteApi,
        {
            params: {
                fromTokenAddress: map.get(t1data),
                toTokenAddress: map.get(t2data),
                amount: val.value,
                protocols:finalList.toString()
            }
        }).then(function (response) {
            console.log(response)
        })
}


const quoteButton = document.getElementById("getQuote");
quoteButton.onclick = getQuote;




//0xe18B1dFb94BB3CEC3B47663F997D824D9cD0f4D2





checkAllowanceToken = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();

    var t1 = document.getElementById('ft1')
    var t1data = t1.options[t1.selectedIndex].text;

    console.log(accounts[0]);
    await axios.get(checkAllowanceApi, {
        params: {
            tokenAddress: map.get(t1data),
            walletAddress: accounts[0]
        }
    })
        .then(function (response) {
            console.log(response.data);
        })
}

const allowanceButton = document.getElementById("checkAllowanceBtn");
allowanceButton.onclick = checkAllowanceToken;

giveAllowance = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    var allowanceData;

    var t1 = document.getElementById('ft1')
    var t1data = t1.options[t1.selectedIndex].text;

    await axios.get(giveAllowanceApi, {
        params: {
            tokenAddress: map.get(t1data),
        }
    }).then(function (response) {
        allowanceData = response.data
    });
    console.log(allowanceData);

    const aData = {
        from: accounts[0],
        data: allowanceData.data,
        gasPrice: allowanceData.gasPrice,
        to: allowanceData.to,
        value: allowanceData.value
    };
    console.log(aData);

    const sign = await web3.eth.sendTransaction({
        from: accounts[0],
        data: allowanceData.data,
        gasPrice: allowanceData.gasPrice,
        to: allowanceData.to,
        value: allowanceData.value
    })
}
// init();
// giveAllowance();
getTokens();


const allowButton = document.getElementById("allowBtn");
allowButton.onclick = giveAllowance;

swapFunction = async () => {

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    var userAddress = accounts[0];


    var t1 = document.getElementById('ft1')
    var t1data = t1.options[t1.selectedIndex].text;

    var t2 = document.getElementById('st1')
    var t2data = t2.options[t2.selectedIndex].text;

    var val = document.getElementById('swapValue')

    var selected = [];
    for (var option of document.getElementById('protocolList').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    
    var finalList = [];

    // if(selected[0]=='All'){
    //     finalList = ''
    // }else{
    //     finalList = selected.toString();
    // }

    for (let i=0;i<selected.length;i++){
        finalList[i]=protocolMap.get(selected[i]);
    }

    const swapParams = {
        fromTokenAddress: map.get(t1data),
        toTokenAddress: map.get(t2data),
        amount: val.value,
        fromAddress: userAddress,
        slippage: 1,
        disableEstimate: false,
        allowPartialFill: false,
        protocols:finalList.toString()
    };


    var swapData;
    await axios.get(swapApi, { params: swapParams }).then(function (response) {
        // console.log(response)
        swapData = response.data.tx;
    });

    console.log(swapData)

    await web3.eth.sendTransaction(swapData)



}

const swapButton = document.getElementById("swapBtn");
swapButton.onclick = swapFunction;


getProtocolData = async () =>{
    var list;
    var id = [];
    var title = [];
    var i=0;
    var j=0;
    await axios.get(protocolApi).then(function(response){
        Object.keys(response.data.protocols).forEach(function(k){
            id[i] = response.data.protocols[k].id;
            title[i] = response.data.protocols[k].title;
            i++; 
        })
   })

   for (let i = 0; i < id.length; i++) {
    protocolMap.set(title[i], id[i]);
    };

    // console.log(protocolMap);

   var select = document.getElementById("protocolList");
        console.log("Protocol List")
        var length = select.options.length;
        for (i = length -1 ; i > 1; i--) {
            select.options[i] = null;
        }
        for (var i = 0; i < title.length; i++) {
            var opt = title[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }

//    console.log(title);
//    console.log(id);
}

getProtocolData();







