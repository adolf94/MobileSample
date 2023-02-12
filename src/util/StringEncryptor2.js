import * as Crypto from 'expo-crypto';

const key = await Crypto.getRandomBytesAsync(32);
const iv = await Crypto.getRandomBytesAsync(16);


export const encryptString = async (plainText) => {
  const encrypted = await Crypto.encryptData(
    plainText,
    {
      algorithm: Crypto.AES_GCM,
      key: key,
      iv: iv
    }
  );
  return encrypted;
};

export const decryptString = async (encryptedText) => {
  const decrypted = await Crypto.decryptData(
    encryptedText,
    {
      algorithm: Crypto.AES_GCM,
      key: key,
      iv: iv
    }
  );
  return decrypted;
};

const example = async () => {

  const original = 'secret message';
  const encrypted = await encryptString(original, key, iv);
  const decrypted = await decryptString(encrypted, key, iv);

  console.log('Original:', original);
  console.log('Encrypted:', encrypted);
  console.log('Decrypted:', decrypted);
};