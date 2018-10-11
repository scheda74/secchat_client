import React from 'react';


class generateKeys extends React.Component {
    var RSAKey = require('react-native-rsa');

    const bits = 2048;
    const exponent = '10001'; // must be a string
    var rsa = new RSAKey();
    var r = rsa.generate(bits, exponent);
    var publicKey = rsa.RSAGetPublicString(); // return json encoded string
    var privateKey = rsa.RSAGetPrivateString(); // return json encoded string
};


export default generateKeys;

