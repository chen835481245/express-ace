var crypto = require('crypto');
//加密流程
exports.encrypt = function(text, key, iv)
{
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    cipher.setAutoPadding(false);
    var encryptText = cipher.update(pkcs5Pad(text),'utf8','hex');
    encryptText+=cipher.final('hex');
    return encryptText;
}
//解密流程
exports.decrypt = function(text, key, iv)
{
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    decipher.setAutoPadding(false);
    decryptText = decipher.update(text, 'hex','utf8');
    decryptText+= decipher.final('utf8');
    return pkcs5Unpad(decryptText);
}
//拼接 需要拼接几个 就拼接几个对应的ascall 码对应的字符
function pkcs5Pad(text) {
    var paddlen = 16 - mbStringLength(text)%16;
    return text+str_repeat(String.fromCharCode(paddlen),paddlen);
}
//去除末尾pad
function pkcs5Unpad(text) {
    var lastUnicode  = text.charCodeAt(text.length -1);
    text = text.substring(0,text.length -lastUnicode);
    return text;
}
/**
 * 重复字符
 * @param input 需要重复的字符
 * @param multiplier 重复次数
 * @returns {string}
 */
function str_repeat (input, multiplier) {
    var y = ''
    while (true) {
        if (multiplier & 1) {
            y += input
        }
        multiplier >>= 1
        if (multiplier) {
            input += input
        } else {
            break
        }
    }
    return y;
}
// 计算字节长度
function mbStringLength(s) {
    var totalLength = 0;
    var i;
    var charCode;
    for (i = 0; i < s.length; i++) {
        charCode = s.charCodeAt(i);
        if (charCode < 0x007f) {
            totalLength = totalLength + 1;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            totalLength += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            totalLength += 3;
        }
    }
    //alert(totalLength);
    return totalLength;
}