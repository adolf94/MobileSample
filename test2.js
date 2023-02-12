const crypto = require('crypto');

// The string to be encrypted
const data = 'secret';

// The password used to encrypt and decrypt the string
const password = 'password';

// Convert the password to a Uint8Array
const passwordBytes = new TextEncoder().encode(password);

// Create a new cipher using the password
const cipher = crypto.createCipheriv('aes-256-cbc', passwordBytes, new Uint8Array(16));

// Encrypt the string
const dataBytes = new TextEncoder().encode(data);
const encryptedBytes = new Uint8Array(cipher.update(dataBytes));
const finalEncryptedBytes = new Uint8Array(cipher.final());
const encrypted = new Uint8Array(encryptedBytes.length + finalEncryptedBytes.length);
encrypted.set(encryptedBytes, 0);
encrypted.set(finalEncryptedBytes, encryptedBytes.length);

// Create a new decipher using the password
const decipher = crypto.createDecipheriv('aes-256-cbc', passwordBytes, new Uint8Array(16));

// Decrypt the encrypted string
const decryptedBytes = new Uint8Array(decipher.update(encrypted));
const finalDecryptedBytes = new Uint8Array(decipher.final());
const decrypted = new TextDecoder().decode(decryptedBytes) + new TextDecoder().decode(finalDecryptedBytes);

console.log(decrypted); // Output: 'secret'