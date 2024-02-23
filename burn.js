const {Web3} = require('web3');


const privateKey = 'Key'; 
const senderAddress = "Cüzdan adresi";

//Test Ağında IN token contract addresi
const contractAddress = '0x0f8E4a0325F8fE6FaFdfB05647bF438d4D8e1e07';

// Web3 sağlayıcısını belirle
const web3 = new Web3('https://bsc-testnet.publicnode.com');

// ERC-20 token sözleşmesinin ABI'sini tanımla
const tokenAbi = require("./tokenabi.json");

// Sözleşme nesnesini oluştur
const tokenContract = new web3.eth.Contract(tokenAbi, contractAddress);

// Token bakiyesini kontrol etmek için balanceOf fonksiyonunu kullan
const checkTokenBalance = async () => {
  const balance = await tokenContract.methods.balanceOf(senderAddress).call();
  console.log('Token Balance:', balance);
  return balance;
};

// Token yakma işlevini çağır
const burnTokens = async (amountToBurn) => {
  const senderAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  const gasPrice = await web3.eth.getGasPrice();

  // Token bakiyesini kontrol et
  const balance = await checkTokenBalance();

  if (balance >= amountToBurn) {
    const transactionData = tokenContract.methods.burn(amountToBurn).encodeABI();

    

    const rawTransaction = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(300000), // GasEstimate Kullanımı için bakıcam
      to: contractAddress,
      value: '0x0',
      data: transactionData,
      chainId: web3.utils.toHex(97) 
      // Ethereum ana ağı için 1, Ropsten için 3, Rinkeby için 4, vs.
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
      rawTransaction,
      senderAccount.privateKey
    );

    const transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    console.log('Transaction Receipt:', transactionReceipt);
  } else {
    console.log('Yetersiz bakiye. Token yakma işlemi gerçekleştirilemedi.');
  }
};

// Örneğin 100 token yakma işlemi
burnTokens(100 * 10**18);
