const helper = require('./helper');

/**
 * decodes dpt11
 *
 * @param {Buffer} encoded
 * @return {Date}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 3
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 3);

  const byte3 = encoded.readUInt8(0);
  const byte2 = encoded.readUInt8(1);
  const byte1 = encoded.readUInt8(2);

  const day = byte3 & 0x1F;
  const month = byte2 & 0xF;
  var year = byte1 & 0x7F;

  // Convert year
  if (year < 90) {
    year += 2000;
  } else {
    year += 1900;
  }

  return new Date(year, month, day);
}

/**
 * encodes dpt11
 *
 * @param {Date} [decoded]
 * @return {Buffer}
 *
 * @throws {TypeError} Will throw an error if <decoded> is not a Date
 * @throws {RangeError} Will throw an error if the year of <decoded> is out of range
 */
function fromJS(decoded) {
  var date = new Date();

  if (decoded instanceof Date) {
    date = decoded
  } else if (typeof decoded !== 'undefined') {
    throw new TypeError('Invalid type (expected Date)')
  }

  var year = date.getFullYear();
  if (year < 1990 || year > 2089) {
    throw new RangeError('Value out of range (expected 1990-2089, got ' + year + ')');
  }

  // Convert year
  if (year >= 2000) {
    year -= 2000
  } else {
    year -= 1900
  }

  const buffer = Buffer.alloc(3, 0);
  buffer.writeInt8(date.getDate(), 0);
  buffer.writeInt8(date.getMonth(), 1);
  buffer.writeInt8(year, 2);
  return buffer;
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};