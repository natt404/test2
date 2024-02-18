# IN Token Transfer Kontrolü

Bu basit uygulama, Binance Smart Chain üzerindeki bir IN token sözleşmesinin burn cüzdanını kontrol etmek için kullanılır. 
Dinleme işlemi, cüzdanın sahip olduğu IN token'in transferlerini, totalsupply ve totalCsupply değerlerini takip eder ve bu transferlerin detaylarını ekrana yazdırır.

> Test ağında IN Token Contract'ı yaratılarak test edilmiştir. Ağ üzerinde gerçekleşen işlemlerde düzenlemeler gerekebilir.
## Gereksinimler

-   https://bscscan.com/myapikey
  
    API Key alın

## Kullanım

1. EndPoint ve API_KEY düzenleyin.

   ```bash
    const apiEndpoint = 'https://api-testnet.bscscan.com/api';
    const apiKey = 'API_KEY';
    

2. Token Sözleşme Adresi ve Dinlenecek Cüzdan Bilgilerini Ekleyin
    
    ```bash
    //Yakım Cüzdanı
    const walletAddress = '0x0000000000000000000000000000000000000000';
    const contractAddress = '0x0f8E4a0325F8fE6FaFdfB05647bF438d4D8e1e07';
    
## Terminal
```bash
$node script.js
            Timestamp: 1708264456
            Block Number: 37851344
            Hash: 0x8f5f7957554bb42947e5347281225285eb6da181e92e89beff0b476bddd4218c
            From: 0x7839924c817e4d0470d06c8eeb1254db3c87414c
            To: 0x0000000000000000000000000000000000000000
            Value: 511000000000000000000
            Total Supply: 9999937002000000000000000000
            Circulating Supply: 9999937002000000000000000000

            ------------------------------------------

            Timestamp: 1708264456
            Block Number: 37851344
            Hash: 0x754baed587e824340e78f1b7d9682b3fa5502e1afb29e1ee01619d546d60cc7d
            From: 0xabdc21effc3e64e88e053e3c00efa7a22974aa5a
            To: 0x0000000000000000000000000000000000000000
            Value: 53000000000000000000
            Total Supply: 9999937002000000000000000000
            Circulating Supply: 9999937002000000000000000000

            ------------------------------------------
  ```

**Aynı Timestamp ve Blok Numarası olan işlemler için hash kontrol edilir. İşlemler aynı anda gerçekleştiği için Total Supply değeri güncellenen son değeri alır**
