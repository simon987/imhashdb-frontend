import {Injectable} from '@angular/core';

@Injectable()
export class Base64Service {

  constructor() {
  }

  encBuffer(arrayBuffer: ArrayBuffer) {
    return this.encBytes(new Uint8Array(arrayBuffer));
  }

  toHex(input: string) {
    const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    let output = [];
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    let j = 0;
    while (i < input.length) {
      enc1 = encodings.indexOf(input.charAt(i++));
      enc2 = encodings.indexOf(input.charAt(i++));
      enc3 = encodings.indexOf(input.charAt(i++));
      enc4 = encodings.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output[j++] = chr1;
      if (enc3 != 64)
        output[j++] = chr2;
      if (enc4 != 64)
        output[j++] = chr3;
    }

    return output.map(x => (x < 16 ? "0" + x.toString(16) : x.toString(16))).join("");
  }

  encBytes(bytes: Uint8Array) {
    let base64 = ''
    const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    const byteLength = bytes.byteLength
    const byteRemainder = byteLength % 3
    const mainLength = byteLength - byteRemainder

    let a, b, c, d
    let chunk

    for (let i = 0; i < mainLength; i = i + 3) {
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

      a = (chunk & 16515072) >> 18
      b = (chunk & 258048) >> 12
      c = (chunk & 4032) >> 6
      d = chunk & 63

      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    if (byteRemainder == 1) {
      chunk = bytes[mainLength]
      a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
      b = (chunk & 3) << 4 // 3   = 2^2 - 1
      base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
      a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4
      c = (chunk & 15) << 2 // 15    = 2^4 - 1
      base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
  }
}
