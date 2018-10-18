var forge = require('node-forge');
var rsa_keypair = require('./keys/key.json');

function encryptMsg(msg) {
    // initialize RSA object with public key
    var public_key_rsa = forge.pki.publicKeyFromPem(rsa_keypair.pub);
    //var encrypted = public_key_rsa.encrypt(bytes, 'RSA-OAEP');

    // generate AES key and IV
    var aes_key = forge.random.getBytesSync(32);
    var hmac_key = forge.random.getBytesSync(32);
    var iv = forge.random.getBytesSync(16);

    var aes_ciphertext = encryptAES(iv, aes_key, msg);
    var tag = runHMAC(hmac_key, aes_ciphertext);
    
    final_key = aes_key + hmac_key;
    var encrypted_key = public_key_rsa.encrypt(final_key, 'RSA-OAEP');

    var data = {
        "keys" : encrypted_key,
        "cipher" : aes_ciphertext,
        "tag" : tag
    }
    return data;
}


function runHMAC(hmac_key, aes_ciphertext) {
    var hmac = forge.hmac.create();
    hmac.start('sha256', hmac_key);
    hmac.update(aes_ciphertext);
    // console.log("hmac tag:  " + hmac.digest().data);
    return hmac.digest().data;
}

function encryptAES(iv, aes_key, msg) {
    // encrypt some bytes
    var cipher = forge.cipher.createCipher('AES-CBC', aes_key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(msg));
    cipher.finish();
    var encrypted = cipher.output;
    var ciphertext = iv + encrypted.data;
    // outputs encrypted hex
    // console.log("iv and cipher: \n" + ciphertext);
    return ciphertext;
}


// ################## decryption functions #######################

function decryptMsg(data) {
    var private_key_rsa = forge.pki.privateKeyFromPem(rsa_keypair.priv);
    var decrypted_keys = private_key_rsa.decrypt(data.keys, 'RSA-OAEP');

    var aes_key = decrypted_keys.slice(0, 32);
    var hmac_key = decrypted_keys.slice(32);

    var tag = runHMAC(hmac_key, data.cipher);
    if(tag === data.tag) { 
        console.log("HMAC tags matched! Continue decryption...");
    } else {
        console.log("HMAC tags don't match!");
        process.exit(1);
    }
    
    //console.log("aes key: " + aes_key + " this is our key");

    var plaintext = decryptAES(aes_key, data.cipher);
    
    
    
    
    
    
    
    
    // console.log("hmac: " + hmac_key);
    // console.log("hmac: " + hmac_key);
    console.log(plaintext.substring(0, plaintext.length - 1));
    // console.log("hmac: " + hmac_key);
}

function decryptAES(aes_key, aes_ciphertext) {
    var iv = aes_ciphertext.slice(0, 15);
    // console.log("iv in decryption: " + iv);
    // console.log("cipher in decryption: " + aes_ciphertext.slice(16));
    var encrypted = forge.util.createBuffer(aes_ciphertext.slice(16));

    var decipher = forge.cipher.createDecipher('AES-CBC', aes_key);
    decipher.start({iv: iv});
    decipher.update(encrypted);
    var result = decipher.finish(); // check 'result' for true/false
    // outputs decrypted hex
    // console.log("decrypted plaintext: " + decipher.output.data);
    return decipher.output.data;
}

var msg = "Hello World";
console.log("Encrypting message: " + msg);
var data = encryptMsg(msg);
decryptMsg(data);