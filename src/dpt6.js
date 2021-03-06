const helper = require("./helper");

/**
 * decodes dpt6
 *
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 1);

  return encoded.readInt8(0);
}

/**
 * encodes dpt6
 *
 * @param {number} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function fromJS(decoded) {
  var value = Number(decoded);

  if (value < -128 || value > 127) {
    throw new RangeError("Value out of range (expected -128-127, got " + value + ")");
  }

  var b = Buffer.alloc(1, 0);

  b.writeInt8(value);

  return b;
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};
