const CryptoJS = require("crypto-js");
import { NativeModules } from 'react-native'
const { RNRandomBytes } = NativeModules

const password = 'secret-key';
export const encryptString = (data) => {
    // const IV = CryptoJS.lib.WordArray.random(128/8);
    const IV = new Uint8Array(Array(16).fill(null).map(()=>Math.floor(Math.random() * 256)));
    // console.log(IV) 
// RNRandomBytes.randomBytes(32, (err, bytes) => {
//     // bytes is a base64string 
//   })
    const key = CryptoJS.PBKDF2(password, IV, { keySize: 128/8, iterations: 1000 });
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return IV.toString() + encrypted.toString();
};

export const decryptString = (encrypted) => {
    const IV = CryptoJS.enc.Hex.parse(encrypted.substring(0, 32));
    const encryptedData = encrypted.substring(32);
    const key = CryptoJS.PBKDF2(password, IV, { keySize: 128/32, iterations: 1000 });
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

function wordArrayToHexArray(wordArray) {
    const hexArray = [];
    for (let i = 0; i < wordArray.length; i++) {
        const hex = wordArray[i].toString(16).padStart(8, '0');
        hexArray.push(hex);
    }
    return hexArray;
}
const data = "sensitive information";
const encrypted = encryptString(data);
const decrypted = decryptString(encrypted);
console.log('Encrypted Data: ', encrypted);
console.log('Decrypted Data: ', decrypted);