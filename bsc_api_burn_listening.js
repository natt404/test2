
/*
  Test Ağında IN token sözleşmesi ile Test edilmiştir.
  Yakım cüzdanı olarak adlandırılan cüzdan, kontrat üzerinden timestamp ve hash bilgileri kontrol edilerek dinlenmektedir. 
  Dinleme işlemi gerçekleşen son işlemden başlar. Kod çalıştığı süre boyunca dinleme işlemini gerçekleştirir.  
  Web3.js kullanılarak RPC bağlantıları sırasında bazı kısıtlamalarla karşılaşılabilir. Ancak, ücretli bir API anahtarı alındığında, 
  akıllı sözleşmesi üzerinde meydana gelen olayları dinleyebilirsiniz.  
  
*/

const axios = require('axios');

// Api bağlantısı
const apiEndpoint = 'https://api-testnet.bscscan.com/api';
const apiKey = 'API_KEY';
const walletAddress = '0x0000000000000000000000000000000000000000';
const contractAddress = '0x0f8E4a0325F8fE6FaFdfB05647bF438d4D8e1e07';

let lastCheckedTimestamp = 0;
let processedTransactions = new Set();

async function getLatestTokenTransfers() {
  try {
    const response = await axios.get(`${apiEndpoint}?module=account&action=tokentx&address=${walletAddress}&contractaddress=${contractAddress}&sort=desc&apikey=${apiKey}`);

    if (response.data.status === '1') {
      const latestTransfers = response.data.result;

      for (const transfer of latestTransfers) {
        const timestamp = parseInt(transfer.timeStamp);

        // Son kontrol edilen timestamp'ten büyük veya eşit olan ve daha önce işlenmemiş işlemleri kontrol et
        if (timestamp >= lastCheckedTimestamp && !processedTransactions.has(transfer.hash)) {
          const blockNumber = transfer.blockNumber.toString();
          const hash = transfer.hash;
          const from = transfer.from;
          const to = transfer.to;
          const value = transfer.value;

          // Totalsupply ve dolaşımdaki miktarları al
          const totalSupplyResponse = await axios.get(`${apiEndpoint}?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${apiKey}`);
          const circulatingSupplyResponse = await axios.get(`${apiEndpoint}?module=stats&action=tokenCsupply&contractaddress=${contractAddress}&apikey=${apiKey}`);
          const totalSupply = totalSupplyResponse.data.result;
          const circulatingSupply = circulatingSupplyResponse.data.result;

          console.log(`
            Timestamp: ${timestamp}
            Block Number: ${blockNumber}
            Hash: ${hash}
            From: ${from}
            To: ${to}
            Value: ${value}
            Total Supply: ${totalSupply}
            Circulating Supply: ${circulatingSupply}
            
            ------------------------------------------
          `);

          // İşlemi daha önce işlenmiş olarak işaretle
          processedTransactions.add(hash);
          // En son işlemin timestamp'ini güncelle
          lastCheckedTimestamp = timestamp;
          console.log(lastCheckedTimestamp);
        }
      }
    } else {
      console.error('Error:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Belirli aralıklarla en son token transferlerini kontrol et
setInterval(getLatestTokenTransfers, 10000); 


/*
************************************************************************************
Web3js örnek yaklaşım, test edilmesi gerekmekte
"innerError: SubscriptionError: The current provider does not support subscriptions"
RPC tarafında subscriptions'a izin verilmediğinden dinleme işlemini gerçekleştiremiyorum. 
Dolayısıyla test işlemini gerçekleştiremedim.
Düğüm çalıştırarak kendi RPC noktamızı oluşturabiliriz. Ya da ücreli bir RPC API ile web3js üzerinden sözleşme işlemleri dinlenebilir.

const {Web3} = require('web3');

// BSC testnet JSON-RPC URL
const bscTestnetRpcUrl = 'https://bsc-dataseed.binance.org/';

// Web3 sağlayıcısı oluştur
const web3 = new Web3(new Web3.providers.HttpProvider(bscTestnetRpcUrl));

// Kontrat adresi
const contractAddress = '0x535154b23670a8c96e68230Cd59E7754884Fd67e';

// Kontrat ABI'si
const contractAbi = require('./abi.json');

// Kontrat nesnesini oluştur
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Transfer olayını dinle
contract.events.Transfer({}, (error, event) => {
  if (!error) {
    console.log('Transfer Event:', event.returnValues);
  } else {
    console.error('Transfer Event Error:', error);
  }
});

********************************************************************************************
*/
