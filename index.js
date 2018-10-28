// @wavesfaucetbot

const TelegramBot = require('node-telegram-bot-api');
const WavesAPI = require('waves-api');

process.env.NTBA_FIX_319 = 1;

const token = '786561284:AAEZr554TJSyZXBJPEl6tEfBr5IRw8pKKwU';
const bot = new TelegramBot(token, {polling: true});

const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
const seed = Waves.Seed.fromExistingPhrase('zebra broom wolf marriage fault leaf dilemma harsh robust decrease phrase during security crew iron');
var address = seed.address;
// console.log(seed.phrase);
// console.log(seed.address);
// console.log(seed.keyPair);
// Waves.API.Node.v1.addresses.balance(address).then((balance) => {
//     console.log(balance);
// });
const AMOUNT = 100000000; // 0.1 WAVES

bot.on('message', (msg) => {
    if (msg.text.toString().toLowerCase() === '/start') {
        bot.sendMessage(msg.chat.id, "Hi, send me your Waves address");
    } else {
        var recipient = msg.text.toString();
        const transferData = {
            recipient: recipient,
            assetId: 'WAVES',
            amount: AMOUNT,
            feeAssetId: 'WAVES',
            fee: 100000,
            attachment: '',
            timestamp: Date.now()
        };
    
        Waves.API.Node.v1.assets.transfer(transferData, seed.keyPair).then((responseData) => {
            console.log(responseData);
            bot.sendMessage(msg.chat.id, `Success! Your tx: ${responseData.id}`);
        }).catch((e) => {
            console.error(e);
            bot.sendMessage(msg.chat.id, `Oops! Something's gone wrong: ${e.data.message}`);
            bot.sendMessage(msg.chat.id, "Try again, send me your Waves address");
        });
    }
});
