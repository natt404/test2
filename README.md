# IN Token Transfer Kontrolü

Bu basit uygulama, Binance Smart Chain üzerindeki bir IN token sözleşmesinin burn cüzdanını kontrol etmek için kullanılır. 
Dinleme işlemi, cüzdanın sahip olduğu IN token'in transferlerini, totalsupply ve totalCsupply değerlerini takip eder ve bu transferlerin detaylarını ekrana yazdırır.

> Test ağında IN Token Contract'ı yaratılarak test edilmiştir. Ağ üzerinde gerçekleşen işlemlerde düzenlemeler gerekebilir.
## Gereksinimler

- API Key
    https://bscscan.com/myapikey 
    Üyelik oluşturarak API Key alın

## Kullanım

1. EndPoint ve API_KEY düzenleyin.

   ```bash
    const apiEndpoint = 'https://api-testnet.bscscan.com/api';
    const apiKey = 'API_KEY';
    

2. Token Sözleşme Adresi ve Dinlenecek Cüzdan Bilgilerini Ekleyin
    
    ```bash
    const walletAddress = '0x0000000000000000000000000000000000000000';
    const contractAddress = '0x0f8E4a0325F8fE6FaFdfB05647bF438d4D8e1e07';
