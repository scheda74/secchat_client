var forge = require('node-forge');
var rsa_keypair = require('../keys/key.json');


// Credit: https://github.com/digitalbazaar/forge/blob/master/README.md

export function encryptMsg(msg) {
    // initialize RSA object with public key
    var public_key_rsa = forge.pki.publicKeyFromPem(rsa_keypair.pub);
    msg = forge.util.encodeUtf8(msg);

    // generate AES key and IV
    var aes_key = forge.random.getBytesSync(32);
    var hmac_key = forge.random.getBytesSync(32);
    var iv = forge.random.getBytesSync(16);

    var aes_ciphertext = encryptAES(iv, aes_key, msg);
    var tag = runHMAC(hmac_key, aes_ciphertext);
    
    final_key = aes_key + hmac_key;
    var encrypted_key = public_key_rsa.encrypt(final_key, 'RSA-OAEP');

    return data = {
        "iv" : iv,
        "keys" : encrypted_key,
        "cipher" : aes_ciphertext,
        "tag" : tag
    }
}

function runHMAC(hmac_key, aes_ciphertext) {
    var hmac = forge.hmac.create();
    hmac.start('sha256', hmac_key);
    hmac.update(aes_ciphertext);
    return hmac.digest().data;
}

function encryptAES(iv, aes_key, msg) {
    // encrypt some bytes
    // Note: CBC and ECB modes use PKCS#7 padding as default
    var cipher = forge.cipher.createCipher('AES-CBC', aes_key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(msg));
    cipher.finish();
    // returning ciphertext
    return cipher.output.data;
}

// ################## decryption functions #######################

export function decryptMsg(data) {
    var private_key_rsa = forge.pki.privateKeyFromPem(rsa_keypair.priv);
    var decrypted_keys = private_key_rsa.decrypt(data.keys, 'RSA-OAEP');

    var iv = data.iv;
    var aes_key = decrypted_keys.slice(0, 32);
    var hmac_key = decrypted_keys.slice(32);

    var tag = runHMAC(hmac_key, data.cipher);
    if(tag === data.tag) { 
        console.log("HMAC tags matched! Continue decryption...");
    } else {
        console.log("HMAC tags don't match!");
        return "###THIS IS A SYSTEM MESSAGE:\n HMAC tags did not match! Message may be corrupted!\n ###END MESSAGE";
    }

    // returning plaintext
    return decryptAES(iv, aes_key, data.cipher);
}

export function decryptAES(iv, aes_key, aes_ciphertext) {
    var encrypted = forge.util.createBuffer(aes_ciphertext);
    var decipher = forge.cipher.createDecipher('AES-CBC', aes_key);

    decipher.start({iv: iv});
    decipher.update(encrypted);
    var result = decipher.finish(); // check 'result' for true/false
    
    return decipher.output.data;
}