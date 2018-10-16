var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;

var rsa = new RSA();
rsa.generateKeypair(function(keypair) {
 
    // Callback function receives new keypair as a first argument
    console.log("this is working..");
    var publicKey = keypair.publicKey;
    var privateKey = keypair.privateKey;
    console.log(publicKey);
    console.log(privateKey);
  });
