const CryptoJS = require("crypto-js");
const convert = new TextEncoder();

const IV = CryptoJS.lib.WordArray.random(128/8);

console.log(new Uint8Array(Array(16).fill(null).map(()=>Math.floor(Math.random() * 256))))

function CryptJsWordArrayToUint8Array(wordArray) {                                                                                       
    const l = wordArray.sigBytes;                                                                                                        
    const words = wordArray.words;                                                                                                       
    const result = new Uint8Array(l);                                                                                                    
    var i=0 /*dst*/, j=0 /*src*/;
    while(true) {
        // here i is a multiple of 4
        if (i==l)
            break;
        var w = words[j++];
        result[i++] = (w & 0xff000000) >>> 24;
        if (i==l)
            break;
        result[i++] = (w & 0x00ff0000) >>> 16;                                                                                            
        if (i==l)                                                                                                                        
            break;                                                                                                                       
        result[i++] = (w & 0x0000ff00) >>> 8;
        if (i==l)
            break;
        result[i++] = (w & 0x000000ff);                                                                                                  
    }
    return result;
}


console.log(IV);

console.log(IV.toString())
console.log(CryptJsWordArrayToUint8Array(IV));