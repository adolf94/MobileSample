const CryptoJS = require("crypto-js");

const password = 'secret-key';

export const encryptString = (data) => {
    const IV = CryptoJS.lib.WordArray.random(128/8);
    const key = CryptoJS.PBKDF2(password, IV, { keySize: 128/32, iterations: 1000 });
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

const data = "sensitive information";
const encrypted = encryptString(data);
const decrypted = decryptString(encrypted);
console.log('Encrypted Data: ', encrypted);
console.log('Decrypted Data: ', decrypted);