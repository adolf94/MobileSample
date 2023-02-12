// import {createCipheriv, createDecipheriv, randomBytes} from 'react-native-crypto';
const {createCipheriv, createDecipheriv, randomBytes, createHash}  = require( 'crypto')
// The string to be encrypted
const data = 'sensitive information';

// The password used to encrypt and decrypt the string
const password = 'DoCKvdLslTuB4y3EZlKate7XMottHski1LmyqJHvUhs'+'=';

// Convert the password to a byte array
var passwordBytes = new Buffer.from(password,'base64')
console.log(passwordBytes)
// Generate a random 16-byte IV
const iv = randomBytes(16);

// Create a new cipher using the password and IV
const cipher = createCipheriv('aes-256-cbc', passwordBytes, iv);

// Encrypt the data
const dataBytes = new TextEncoder().encode(data);
const encryptedBytes = cipher.update(dataBytes);
const finalEncryptedBytes = cipher.final();
const encrypted = new Uint8Array(encryptedBytes.length + finalEncryptedBytes.length + iv.length);
encrypted.set(iv, 0);
encrypted.set(encryptedBytes, 16);
encrypted.set(finalEncryptedBytes, encryptedBytes.length + 16);
console.log(iv.length)
console.log(encryptedBytes.length)
console.log(finalEncryptedBytes.length)
console.log(encrypted);

let base64 = "KWHUSHfJoog/X5QD7S7ANzwzaQ7rfEUgbmRREZ1Z5huKrqEYC2/QvISETSvyU8wm"

// let base64 = new Buffer.from(encrypted).toString("base64")
console.log(base64)





console.log(Uint8Array.from(atob(base64), c => c.charCodeAt(0)))

// Create a new decipher using the password and IV
const decipher = createDecipheriv('aes-256-cbc', passwordBytes, iv);

// Decrypt the encrypted data
const decryptedBytes = decipher.update(encrypted.slice(16));
const finalDecryptedBytes = decipher.final();
const decrypted = new TextDecoder().decode(decryptedBytes) + new TextDecoder().decode(finalDecryptedBytes);

console.log(decrypted); // Output: 'secret'