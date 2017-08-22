/**
 *  usuarios.js
 *    - Functions related to 'usuarios' on the database
 *  
 ******************************************************************************/

/* Importing modules */
var jwt = require('jsonwebtoken'),
  Config = require('../config'),
  Usuario = require('../schemas/usuario.schema');

/* Exporting the functions into the module */
module.exports.getLogin = getLogin;
module.exports.getUsuarios = getUsuarios;
module.exports.createUsuario = createUsuario;
module.exports.updateUsuario = updateUsuario;
module.exports.removeUsuario = removeUsuario;
module.exports.tokenMiddleware = tokenMiddleware;
module.exports.accessLevelMiddleware = accessLevelMiddleware;

/**
 * Utility function for authentication failed message
 * @param  {Object}     res   Response object
 * @return {Null}
 */
function returnAuthError(res) {
  return res.status(403).json({
    success: false,
    message: 'Falha na autenticação'
  });
}

/**
 * Logs an user in, returning it's session token
 * @param  {Object}     req   Requisition object
 * @param  {Object}     res   Response object
 * @param  {Function}   next  Callback function for the error handler
 * @return {Null}
 */
function getLogin(req, res, next) {
  /* Finds the user with the provided email */
  Usuario.findOne({ 'email': req.body.email }, function(err, userDoc) {
    /* Checking for errors */
    if (err) { return next(err); }

    /* Checking if user exists with provided email */
    if (!userDoc) {
      return returnAuthError(res);
    }

    /* Validating user password */
    userDoc.validPassword(req.body.senha, function(isMatch) {
      /* There was an error with the password */
      if (!isMatch) { return returnAuthError(res); }

      /* Returning the success message */
      return res.json({
        success: true,
        message: 'Bem vindo ' + userDoc.nome,
        session_token: jwt.sign(userDoc, Config.token, { expiresIn: '1d' })
      });
    });
  });
}

/**
 * Middleware for verifying access token
 * @param  {Object}     req   Requisition object
 * @param  {Object}     res   Response object
 * @param  {Function}   next  Callback function for the error handler
 * @return {Null}
 */
function tokenMiddleware(req, res, next) {
  var token = req.headers['x-access-token'];

  /* checking if there is a token to decode */
  if (token) {
    /* using jsonwebtoken to check the token */
    jwt.verify(token, Config.token, function(err, decoded) {
      /* checking for errors */
      if (err) {
        /* there was an error with the token (403 - Forbidden) */
        return returnAuthError(res);
      } else {
        /* no error with the token, we proceed to the next request */
        req.decodedUser = decoded;

        /* Finding the 'usuario' from the token (check if it still exists) */
        Usuario.findOne({ 'email': decoded._doc.email }, function(err, userDoc) {
          /* Checking for errors */
          if (err) { return next(err); }

          /* Checking if user exists with provided email */
          if (!userDoc) {
            return returnAuthError(res);
          }

          /* Proceeding to the next request */
          next();
        });
      }
    });
  } else {
    /* there's no token, returns an error (403 - Forbidden) */
    return returnAuthError(res);
  }
}

/**
 * Middleware for verifying access level of user
 * @param  {Object}     req   Requisition object
 * @param  {Object}     res   Response object
 * @param  {Function}   next  Callback function for the error handler
 * @return {Null}
 */
function accessLevelMiddleware(req, res, next) {
  /* Checking if there is a decoded user (token is valid) */
  if (req.decodedUser._doc) {
    /* Checking if user has admin permissions */
    if (req.decodedUser._doc.nivel_acesso == 1) {
      /* proceeds to the next request */
      next();
    } else {
      /* user not allowed, returns an error (403 - Forbidden) */
      return returnAuthError(res);
    }
  } else {
    /* there's no token, returns an error (403 - Forbidden) */
    return returnAuthError(res);
  }
}

/**
 * Queries the 'usuarios' on the database
 * @param  {Object}     req   Requisition object
 * @param  {Object}     res   Response object
 * @param  {Function}   next  Callback function for the error handler
 * @return {Null}
 */
function getUsuarios(req, res, next) {
  var matchQuery = {},
    queryArray = [];

  /* Checks query params for 'nome' */
  if (req.query.nome) {
    queryArray.push({ 'nome': req.query.nome });
  }

  /* Checks query params for 'email' */
  if (req.query.email) {
    queryArray.push({ 'email': req.query.email });
  }

  /* Checking the 'queryArray' size */
  if (queryArray.length >= 2) {
    /* If we have multiple queries, we need the '$and' operator */
    matchQuery = {
      '$and': queryArray
    };
  } else if (queryArray.length > 0) {
    /* There's a single query, and we can't use it as array */
    matchQuery = queryArray[0];
  }

  /* Finding the 'usuarios' based on the query */
  Usuario.find(matchQuery, { senha: 0 }, function(err, usuarios) {
    /* Checking for errors */
    if (err) { return next(err); }

    /* Checking if array is empty */
    if (usuarios.length === 0) {
      return res.json({
        success: false,
        message: 'Não existem usuários com estes filtros'
      });
    }

    /* Returning the success message */
    return res.json({
      success: true,
      usuarios: usuarios
    });
  });
}

/**
 * Creates an 'usuario' on the database
 * @param  {Object}     req   Requisition object
 * - Expects an object, example:
 *   {
 *     new: { nome, email, nivelAcesso, senha },
 *   }
 * @param  {Object}     res   Response object
 * @param  {Function}   next  Callback function for the error handler
 * @return {Null}
 */
function createUsuario(req, res, next) {
  /* Checking if there's already an user with the provided email */
  Usuario.findOne({ 'email': req.body.new.email }, function(err, userDoc) {
    /* Checking for errors */
    if (err) { return next(err); }

    /* Checking if user exists with provided email */
    if (userDoc) {
      return res.json({
        success: false,
        message: 'Já existe um usuário cadastrado com este email'
      });
    }

    /* Tries to create a hash from the password */
    try {
      var userObject = {};

      userObject.nome = req.body.new.nome;
      userObject.email = req.body.new.email;
      userObject.senha = req.body.new.senha;
      userObject.nivel_acesso = req.body.new.nivelAcesso;
    } catch (err) {
      /* There was an error creating the hash */
      return res.json({
        success: false,
        message: 'Confira se todos os campos foram preenchidos corretamente'
      });
    }

    /* Sending the create request to the database */
    Usuario.create(userObject, function(err) {
      /* Checking for errors */
      if (err) { return next(err); }

      /* Returning the success message */
      return res.json({
        success: true,
        message: userObject.nome + ' cadastrado com sucesso'
      });
    });
  });
}

/**
 * Updates an 'usuario' on the database
 * @param  {Object}     req   Requisition object
 * - Expects an object, example:
 *   {
 *     old: { senha },
 *     new: { nome, email, nivelAcesso, senha }
 *   }
 * @param  {Object}     res   Response object
 * @param  {Function}   next  Callback function for the error handler
 * @return {Null}
 */
function updateUsuario(req, res, next) {
  /* Finding the user document based on query */
  Usuario.findOne({ 'email': req.body.old.email }, function(err, userDoc) {
    /* Checking for errors */
    if (err) { return next(err); }

    /* Checking if the user was found */
    if (!userDoc) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    /* Checking user access level */
    var userAdmin = false;
    if (req.decodedUser._doc.nivel_acesso === 1) { userAdmin = true; }

    /* Checking if user is admin (should not require user password for admin) */
    if (!userAdmin) {
      /* Checking if the found user password is correct */
      userDoc.validPassword(req.body.old.senha, function(isMatch) {
        /* There was an error with the password */
        if (!isMatch) { return returnAuthError(res); }
      });
    }

    /* Tries to update the user's fields */
    try {
      /* Checking if user is admin (should only update accessLevel if admin) */
      if (userAdmin) {
        /* Checking each field ('nivelAcesso') */
        if (req.body.new.nivelAcesso) {
          userDoc.nivel_acesso = req.body.new.nivelAcesso;
        }
      }

      /* Checking each field ('email') */
      if (req.body.new.email) {
        userDoc.email = req.body.new.email;
      }

      /* Checking each field ('nome') */
      if (req.body.new.nome) {
        userDoc.nome = req.body.new.nome;
      }

      /* Checking if should update the password */
      if (req.body.new.senha) {
        userDoc.senha = req.body.old.senha;
      }
    } catch (err) {
      /* There was an error */
      return res.json({
        success: false,
        message: 'Confira se todos os campos foram preenchidos corretamente'
      });
    }

    /* Saving the updated 'usuario' document */
    userDoc.save(function(err) {
      /* Checking for errors */
      if (err) { return next(err); }

      /* Returning the success message */
      return res.json({
        success: true,
        message: userDoc.nome + ' alterado(a) com sucesso'
      });
    });
  });
}

/**
 * Removes an 'usuario' on the database
 * @param  {Object}     req   Requisition object
 * @param  {Object}     res   Response object
 * @param  {Function}   next  Callback function for the error handler
 * @return {Null}
 */
function removeUsuario(req, res, next) {
  /* Checking for the 'email' parameter */
  if (!req.body.email) {
    return res.json({
      success: false,
      message: 'Confira se todos os campos foram preenchidos corretamente'
    });
  }

  /* Finding the user document based on query */
  Usuario.findOne({ 'email': req.body.email }, function(err, userDoc) {
    /* Checking for errors */
    if (err) { return next(err); }

    /* Checking if the user was found */
    if (!userDoc) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    /* Sends the remove request to the database */
    Usuario.remove({ 'email': req.body.email }, function(err) {
      /* Checking for errors */
      if (err) { return next(err); }

      /* Returning the success message */
      return res.json({
        success: true,
        message: req.body.email + ' removido(a) com sucesso'
      });
    });
  });
}