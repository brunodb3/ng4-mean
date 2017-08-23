/**
 *  usuarios.js
 *    - Defining the 'usuarios' database model
 *  
 ******************************************************************************/

/* Importing modules */
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  mongoose_encrypt = require('mongoose-encryption');

/* Cryptography variables (system's environment variables) */
var signKey = process.env.CRYPTO_64_BYTE,
  cryptoKey = process.env.CRYPTO_32_BYTE;

/* Creating the Schema */
var usuariosSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  nivel_acesso: { type: Number, required: true },
  token_senha: { type: String, required: false },
  token_senha_expira: { type: Date, required: false },
  dt_cadastro: { type: Date, required: true, default: Date.now }
});

/* Middleware to hash passwords pre-save (update or create) */
usuariosSchema.pre('save', function(next) {
  var user = this,
    SALT_FACTOR = 8;

  /* Checking if user password is not modified */
  if (!user.isModified('senha')) { return next(); }

  /* Generating a "salt" */
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    /* Checking for errors */
    if (err) { return next(err); }

    /* Generating the hash based on the "salt" */
    bcrypt.hash(user.senha, salt, null, function(err, hash) {
      /* Checking for errors */
      if (err) { return next(err); }

      /* Setting the user password */
      user.senha = hash;
      return next();
    });
  });
});

/**
 * Validates a hash against a string (for password)
 * @param  {String}  checkPassword   Password to check against the hash
 * @return {Null}                       
 */
usuariosSchema.methods.validPassword = function(checkPassword) {
  return bcrypt.compareSync(checkPassword, this.senha);
};

/* Enabling encryption plugin */
usuariosSchema.plugin(mongoose_encrypt, {
  signingKey: signKey,
  encryptionKey: cryptoKey,
  encryptedFields: ['dt_cadastro']
});

/* Exporting the mongoose model as a module */
module.exports = mongoose.model('Usuario', usuariosSchema);