import cryptoJS from 'crypto-js';
import * as Common from "@constants/Common.js";

export default class Crypto {
    static encrypt = (originText) => {
        return cryptoJS.AES.encrypt(originText, Common.SECRET_KEY_FOR_CRYPTO).toString();
    }

    static decrypt = (encryptedText) => {
        let decryptedByte = cryptoJS.AES.decrypt(encryptedText, Common.SECRET_KEY_FOR_CRYPTO);
        return decryptedByte.toString(cryptoJS.enc.Utf8);
    }
}