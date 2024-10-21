/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dotenv/config.js":
/*!***************************************!*\
  !*** ./node_modules/dotenv/config.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("(function () {\n  (__webpack_require__(/*! ./lib/main */ \"./node_modules/dotenv/lib/main.js\").config)(\n    Object.assign(\n      {},\n      __webpack_require__(/*! ./lib/env-options */ \"./node_modules/dotenv/lib/env-options.js\"),\n      __webpack_require__(/*! ./lib/cli-options */ \"./node_modules/dotenv/lib/cli-options.js\")(process.argv)\n    )\n  )\n})()\n\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/dotenv/config.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/cli-options.js":
/*!************************************************!*\
  !*** ./node_modules/dotenv/lib/cli-options.js ***!
  \************************************************/
/***/ ((module) => {

eval("const re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/\n\nmodule.exports = function optionMatcher (args) {\n  return args.reduce(function (acc, cur) {\n    const matches = cur.match(re)\n    if (matches) {\n      acc[matches[1]] = matches[2]\n    }\n    return acc\n  }, {})\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/dotenv/lib/cli-options.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/env-options.js":
/*!************************************************!*\
  !*** ./node_modules/dotenv/lib/env-options.js ***!
  \************************************************/
/***/ ((module) => {

eval("// ../config.js accepts options via environment variables\nconst options = {}\n\nif (process.env.DOTENV_CONFIG_ENCODING != null) {\n  options.encoding = process.env.DOTENV_CONFIG_ENCODING\n}\n\nif (process.env.DOTENV_CONFIG_PATH != null) {\n  options.path = process.env.DOTENV_CONFIG_PATH\n}\n\nif (process.env.DOTENV_CONFIG_DEBUG != null) {\n  options.debug = process.env.DOTENV_CONFIG_DEBUG\n}\n\nif (process.env.DOTENV_CONFIG_OVERRIDE != null) {\n  options.override = process.env.DOTENV_CONFIG_OVERRIDE\n}\n\nif (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {\n  options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY\n}\n\nmodule.exports = options\n\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/dotenv/lib/env-options.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst os = __webpack_require__(/*! os */ \"os\")\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\")\nconst packageJson = __webpack_require__(/*! ../package.json */ \"./node_modules/dotenv/package.json\")\n\nconst version = packageJson.version\n\nconst LINE = /(?:^|^)\\s*(?:export\\s+)?([\\w.-]+)(?:\\s*=\\s*?|:\\s+?)(\\s*'(?:\\\\'|[^'])*'|\\s*\"(?:\\\\\"|[^\"])*\"|\\s*`(?:\\\\`|[^`])*`|[^#\\r\\n]+)?\\s*(?:#.*)?(?:$|$)/mg\n\n// Parse src into an Object\nfunction parse (src) {\n  const obj = {}\n\n  // Convert buffer to string\n  let lines = src.toString()\n\n  // Convert line breaks to same format\n  lines = lines.replace(/\\r\\n?/mg, '\\n')\n\n  let match\n  while ((match = LINE.exec(lines)) != null) {\n    const key = match[1]\n\n    // Default undefined or null to empty string\n    let value = (match[2] || '')\n\n    // Remove whitespace\n    value = value.trim()\n\n    // Check if double quoted\n    const maybeQuote = value[0]\n\n    // Remove surrounding quotes\n    value = value.replace(/^(['\"`])([\\s\\S]*)\\1$/mg, '$2')\n\n    // Expand newlines if double quoted\n    if (maybeQuote === '\"') {\n      value = value.replace(/\\\\n/g, '\\n')\n      value = value.replace(/\\\\r/g, '\\r')\n    }\n\n    // Add to object\n    obj[key] = value\n  }\n\n  return obj\n}\n\nfunction _parseVault (options) {\n  const vaultPath = _vaultPath(options)\n\n  // Parse .env.vault\n  const result = DotenvModule.configDotenv({ path: vaultPath })\n  if (!result.parsed) {\n    const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`)\n    err.code = 'MISSING_DATA'\n    throw err\n  }\n\n  // handle scenario for comma separated keys - for use with key rotation\n  // example: DOTENV_KEY=\"dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=prod,dotenv://:key_7890@dotenvx.com/vault/.env.vault?environment=prod\"\n  const keys = _dotenvKey(options).split(',')\n  const length = keys.length\n\n  let decrypted\n  for (let i = 0; i < length; i++) {\n    try {\n      // Get full key\n      const key = keys[i].trim()\n\n      // Get instructions for decrypt\n      const attrs = _instructions(result, key)\n\n      // Decrypt\n      decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key)\n\n      break\n    } catch (error) {\n      // last key\n      if (i + 1 >= length) {\n        throw error\n      }\n      // try next key\n    }\n  }\n\n  // Parse decrypted .env string\n  return DotenvModule.parse(decrypted)\n}\n\nfunction _log (message) {\n  console.log(`[dotenv@${version}][INFO] ${message}`)\n}\n\nfunction _warn (message) {\n  console.log(`[dotenv@${version}][WARN] ${message}`)\n}\n\nfunction _debug (message) {\n  console.log(`[dotenv@${version}][DEBUG] ${message}`)\n}\n\nfunction _dotenvKey (options) {\n  // prioritize developer directly setting options.DOTENV_KEY\n  if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {\n    return options.DOTENV_KEY\n  }\n\n  // secondary infra already contains a DOTENV_KEY environment variable\n  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {\n    return process.env.DOTENV_KEY\n  }\n\n  // fallback to empty string\n  return ''\n}\n\nfunction _instructions (result, dotenvKey) {\n  // Parse DOTENV_KEY. Format is a URI\n  let uri\n  try {\n    uri = new URL(dotenvKey)\n  } catch (error) {\n    if (error.code === 'ERR_INVALID_URL') {\n      const err = new Error('INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development')\n      err.code = 'INVALID_DOTENV_KEY'\n      throw err\n    }\n\n    throw error\n  }\n\n  // Get decrypt key\n  const key = uri.password\n  if (!key) {\n    const err = new Error('INVALID_DOTENV_KEY: Missing key part')\n    err.code = 'INVALID_DOTENV_KEY'\n    throw err\n  }\n\n  // Get environment\n  const environment = uri.searchParams.get('environment')\n  if (!environment) {\n    const err = new Error('INVALID_DOTENV_KEY: Missing environment part')\n    err.code = 'INVALID_DOTENV_KEY'\n    throw err\n  }\n\n  // Get ciphertext payload\n  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`\n  const ciphertext = result.parsed[environmentKey] // DOTENV_VAULT_PRODUCTION\n  if (!ciphertext) {\n    const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`)\n    err.code = 'NOT_FOUND_DOTENV_ENVIRONMENT'\n    throw err\n  }\n\n  return { ciphertext, key }\n}\n\nfunction _vaultPath (options) {\n  let possibleVaultPath = null\n\n  if (options && options.path && options.path.length > 0) {\n    if (Array.isArray(options.path)) {\n      for (const filepath of options.path) {\n        if (fs.existsSync(filepath)) {\n          possibleVaultPath = filepath.endsWith('.vault') ? filepath : `${filepath}.vault`\n        }\n      }\n    } else {\n      possibleVaultPath = options.path.endsWith('.vault') ? options.path : `${options.path}.vault`\n    }\n  } else {\n    possibleVaultPath = path.resolve(process.cwd(), '.env.vault')\n  }\n\n  if (fs.existsSync(possibleVaultPath)) {\n    return possibleVaultPath\n  }\n\n  return null\n}\n\nfunction _resolveHome (envPath) {\n  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath\n}\n\nfunction _configVault (options) {\n  _log('Loading env from encrypted .env.vault')\n\n  const parsed = DotenvModule._parseVault(options)\n\n  let processEnv = process.env\n  if (options && options.processEnv != null) {\n    processEnv = options.processEnv\n  }\n\n  DotenvModule.populate(processEnv, parsed, options)\n\n  return { parsed }\n}\n\nfunction configDotenv (options) {\n  const dotenvPath = path.resolve(process.cwd(), '.env')\n  let encoding = 'utf8'\n  const debug = Boolean(options && options.debug)\n\n  if (options && options.encoding) {\n    encoding = options.encoding\n  } else {\n    if (debug) {\n      _debug('No encoding is specified. UTF-8 is used by default')\n    }\n  }\n\n  let optionPaths = [dotenvPath] // default, look for .env\n  if (options && options.path) {\n    if (!Array.isArray(options.path)) {\n      optionPaths = [_resolveHome(options.path)]\n    } else {\n      optionPaths = [] // reset default\n      for (const filepath of options.path) {\n        optionPaths.push(_resolveHome(filepath))\n      }\n    }\n  }\n\n  // Build the parsed data in a temporary object (because we need to return it).  Once we have the final\n  // parsed data, we will combine it with process.env (or options.processEnv if provided).\n  let lastError\n  const parsedAll = {}\n  for (const path of optionPaths) {\n    try {\n      // Specifying an encoding returns a string instead of a buffer\n      const parsed = DotenvModule.parse(fs.readFileSync(path, { encoding }))\n\n      DotenvModule.populate(parsedAll, parsed, options)\n    } catch (e) {\n      if (debug) {\n        _debug(`Failed to load ${path} ${e.message}`)\n      }\n      lastError = e\n    }\n  }\n\n  let processEnv = process.env\n  if (options && options.processEnv != null) {\n    processEnv = options.processEnv\n  }\n\n  DotenvModule.populate(processEnv, parsedAll, options)\n\n  if (lastError) {\n    return { parsed: parsedAll, error: lastError }\n  } else {\n    return { parsed: parsedAll }\n  }\n}\n\n// Populates process.env from .env file\nfunction config (options) {\n  // fallback to original dotenv if DOTENV_KEY is not set\n  if (_dotenvKey(options).length === 0) {\n    return DotenvModule.configDotenv(options)\n  }\n\n  const vaultPath = _vaultPath(options)\n\n  // dotenvKey exists but .env.vault file does not exist\n  if (!vaultPath) {\n    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`)\n\n    return DotenvModule.configDotenv(options)\n  }\n\n  return DotenvModule._configVault(options)\n}\n\nfunction decrypt (encrypted, keyStr) {\n  const key = Buffer.from(keyStr.slice(-64), 'hex')\n  let ciphertext = Buffer.from(encrypted, 'base64')\n\n  const nonce = ciphertext.subarray(0, 12)\n  const authTag = ciphertext.subarray(-16)\n  ciphertext = ciphertext.subarray(12, -16)\n\n  try {\n    const aesgcm = crypto.createDecipheriv('aes-256-gcm', key, nonce)\n    aesgcm.setAuthTag(authTag)\n    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`\n  } catch (error) {\n    const isRange = error instanceof RangeError\n    const invalidKeyLength = error.message === 'Invalid key length'\n    const decryptionFailed = error.message === 'Unsupported state or unable to authenticate data'\n\n    if (isRange || invalidKeyLength) {\n      const err = new Error('INVALID_DOTENV_KEY: It must be 64 characters long (or more)')\n      err.code = 'INVALID_DOTENV_KEY'\n      throw err\n    } else if (decryptionFailed) {\n      const err = new Error('DECRYPTION_FAILED: Please check your DOTENV_KEY')\n      err.code = 'DECRYPTION_FAILED'\n      throw err\n    } else {\n      throw error\n    }\n  }\n}\n\n// Populate process.env with parsed values\nfunction populate (processEnv, parsed, options = {}) {\n  const debug = Boolean(options && options.debug)\n  const override = Boolean(options && options.override)\n\n  if (typeof parsed !== 'object') {\n    const err = new Error('OBJECT_REQUIRED: Please check the processEnv argument being passed to populate')\n    err.code = 'OBJECT_REQUIRED'\n    throw err\n  }\n\n  // Set process.env\n  for (const key of Object.keys(parsed)) {\n    if (Object.prototype.hasOwnProperty.call(processEnv, key)) {\n      if (override === true) {\n        processEnv[key] = parsed[key]\n      }\n\n      if (debug) {\n        if (override === true) {\n          _debug(`\"${key}\" is already defined and WAS overwritten`)\n        } else {\n          _debug(`\"${key}\" is already defined and was NOT overwritten`)\n        }\n      }\n    } else {\n      processEnv[key] = parsed[key]\n    }\n  }\n}\n\nconst DotenvModule = {\n  configDotenv,\n  _configVault,\n  _parseVault,\n  config,\n  decrypt,\n  parse,\n  populate\n}\n\nmodule.exports.configDotenv = DotenvModule.configDotenv\nmodule.exports._configVault = DotenvModule._configVault\nmodule.exports._parseVault = DotenvModule._parseVault\nmodule.exports.config = DotenvModule.config\nmodule.exports.decrypt = DotenvModule.decrypt\nmodule.exports.parse = DotenvModule.parse\nmodule.exports.populate = DotenvModule.populate\n\nmodule.exports = DotenvModule\n\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/dotenv/lib/main.js?");

/***/ }),

/***/ "./src/APIHandlers/deleteHandler.ts":
/*!******************************************!*\
  !*** ./src/APIHandlers/deleteHandler.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DeleteHandler = void 0;\nvar dbHandler_1 = __webpack_require__(/*! ../DBHandlers/dbHandler */ \"./src/DBHandlers/dbHandler.ts\");\nvar check = __importStar(__webpack_require__(/*! ../utils/inspectorsAPI */ \"./src/utils/inspectorsAPI.ts\"));\nvar replies = __importStar(__webpack_require__(/*! ../utils/sendingReplies */ \"./src/utils/sendingReplies.ts\"));\nfunction isUUIDv4(uuid) {\n    var uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;\n    return uuidv4Regex.test(uuid);\n}\nvar DeleteHandler = (function () {\n    function DeleteHandler() {\n        this.dBHandler = new dbHandler_1.DBHandler();\n    }\n    DeleteHandler.prototype.getUserData = function (req, res) {\n        if (!check.endpointIsValid(req.url, true)) {\n            replies.nonExistingEndpoint(res);\n        }\n        var userID = check.getUserID(req.url || '');\n        if (!check.isUUIDv4(userID)) {\n            replies.nonUUID(res);\n            return;\n        }\n        var userIndex = this.dBHandler.findUserByID(userID);\n        if (userIndex === -1) {\n            res.writeHead(404, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"User not found\" }));\n        }\n        else {\n            this.dBHandler.delUserByID(userID);\n            res.writeHead(204, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"User has been deleted\" }));\n        }\n    };\n    return DeleteHandler;\n}());\nexports.DeleteHandler = DeleteHandler;\n\n\n//# sourceURL=webpack://my-webpack-project/./src/APIHandlers/deleteHandler.ts?");

/***/ }),

/***/ "./src/APIHandlers/getHandler.ts":
/*!***************************************!*\
  !*** ./src/APIHandlers/getHandler.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GETHandler = void 0;\nvar dbHandler_1 = __webpack_require__(/*! ../DBHandlers/dbHandler */ \"./src/DBHandlers/dbHandler.ts\");\nvar check = __importStar(__webpack_require__(/*! ../utils/inspectorsAPI */ \"./src/utils/inspectorsAPI.ts\"));\nvar replies = __importStar(__webpack_require__(/*! ../utils/sendingReplies */ \"./src/utils/sendingReplies.ts\"));\nvar GETHandler = (function () {\n    function GETHandler() {\n        this.dBHandler = new dbHandler_1.DBHandler();\n    }\n    GETHandler.prototype.getUserData = function (req, res) {\n        if (check.endpointIsValid(req.url)) {\n            var users = this.dBHandler.getAllUsers();\n            res.writeHead(200, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify(users));\n            return;\n        }\n        if (!check.endpointIsValid(req.url, true)) {\n            replies.nonExistingEndpoint(res);\n            return;\n        }\n        var userID = check.getUserID(req.url || '');\n        if (!check.isUUIDv4(userID)) {\n            replies.nonUUID(res);\n            return;\n        }\n        var user = this.dBHandler.getUserByID(userID);\n        if (!user) {\n            replies.userNotFound(res);\n            return;\n        }\n        res.writeHead(200, { \"Content-Type\": \"application/json\" });\n        res.end(JSON.stringify(user));\n    };\n    return GETHandler;\n}());\nexports.GETHandler = GETHandler;\n\n\n//# sourceURL=webpack://my-webpack-project/./src/APIHandlers/getHandler.ts?");

/***/ }),

/***/ "./src/APIHandlers/postHandler.ts":
/*!****************************************!*\
  !*** ./src/APIHandlers/postHandler.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.POSTHandler = void 0;\nvar dbHandler_1 = __webpack_require__(/*! ../DBHandlers/dbHandler */ \"./src/DBHandlers/dbHandler.ts\");\nvar check = __importStar(__webpack_require__(/*! ../utils/inspectorsAPI */ \"./src/utils/inspectorsAPI.ts\"));\nvar replies = __importStar(__webpack_require__(/*! ../utils/sendingReplies */ \"./src/utils/sendingReplies.ts\"));\nfunction isUser(data) {\n    if (typeof data !== \"object\" || data === null) {\n        return false;\n    }\n    var obj = data;\n    return (typeof obj.username === \"string\" &&\n        !Number.isNaN(Number(obj.age)) &&\n        Array.isArray(obj.hobbies));\n}\nfunction requiredFieldnotEmpty(userData) {\n    var username = userData.username, age = userData.age, hobbies = userData.hobbies;\n    if (!username || !age || !Array.isArray(hobbies)) {\n        return false;\n    }\n    return true;\n}\nfunction parseUserData(data, res) {\n    try {\n        var parsedData = JSON.parse(data);\n        if (isUser(parsedData)) {\n            return parsedData;\n        }\n        return null;\n    }\n    catch (error) {\n        res.writeHead(400, { \"Content-Type\": \"application/json\" });\n        res.end(JSON.stringify({ message: \"Error parsing JSON : \".concat(data) }));\n        return null;\n    }\n}\nvar POSTHandler = (function () {\n    function POSTHandler() {\n        this.dBHandler = new dbHandler_1.DBHandler();\n    }\n    POSTHandler.prototype.getUserData = function (req, res, data) {\n        if (!check.endpointIsValid(req.url)) {\n            replies.nonExistingEndpoint(res);\n            return;\n        }\n        if (!data) {\n            res.writeHead(400, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"body is empty\" }));\n            return;\n        }\n        try {\n            JSON.parse(data);\n        }\n        catch (error) {\n            res.writeHead(400, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"Error parsing JSON : \".concat(data) }));\n            return;\n        }\n        var parsedData = parseUserData(data, res);\n        if (!isUser(parsedData)) {\n            res.writeHead(400, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"Invalid User data : \".concat(data) }));\n            return;\n        }\n        var chekUserRes = requiredFieldnotEmpty(parsedData);\n        if (chekUserRes) {\n            var newUser = this.dBHandler.addUser(parsedData);\n            res.writeHead(201, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify(newUser));\n        }\n        else {\n            res.writeHead(400, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"Required fields are missing or invalid\" }));\n        }\n    };\n    return POSTHandler;\n}());\nexports.POSTHandler = POSTHandler;\n\n\n//# sourceURL=webpack://my-webpack-project/./src/APIHandlers/postHandler.ts?");

/***/ }),

/***/ "./src/APIHandlers/putHandler.ts":
/*!***************************************!*\
  !*** ./src/APIHandlers/putHandler.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.PUTHandler = void 0;\nvar dbHandler_1 = __webpack_require__(/*! ../DBHandlers/dbHandler */ \"./src/DBHandlers/dbHandler.ts\");\nvar check = __importStar(__webpack_require__(/*! ../utils/inspectorsAPI */ \"./src/utils/inspectorsAPI.ts\"));\nvar replies = __importStar(__webpack_require__(/*! ../utils/sendingReplies */ \"./src/utils/sendingReplies.ts\"));\nfunction isUser(data) {\n    if (typeof data !== \"object\" || data === null) {\n        return false;\n    }\n    var obj = data;\n    var isUsernameValid = typeof obj.username === \"string\";\n    var isAgeValid = typeof obj.age === \"number\" && !Number.isNaN(obj.age);\n    var isHobbiesValid = Array.isArray(obj.hobbies) && obj.hobbies.every(function (hobby) { return typeof hobby === \"string\"; });\n    return isUsernameValid || isAgeValid || isHobbiesValid;\n}\nfunction parseUserData(data, res) {\n    try {\n        var parsedData = JSON.parse(data);\n        if (isUser(parsedData)) {\n            return parsedData;\n        }\n        return null;\n    }\n    catch (error) {\n        res.writeHead(400, { \"Content-Type\": \"application/json\" });\n        res.end(JSON.stringify({ message: \"Error parsing JSON : \".concat(data) }));\n        return null;\n    }\n}\nvar PUTHandler = (function () {\n    function PUTHandler() {\n        this.dBHandler = new dbHandler_1.DBHandler();\n    }\n    PUTHandler.prototype.getUserData = function (req, res, data) {\n        if (!check.endpointIsValid(req.url, true)) {\n            replies.nonExistingEndpoint(res);\n        }\n        var userID = check.getUserID(req.url || '');\n        if (!check.isUUIDv4(userID)) {\n            replies.nonUUID(res);\n            return;\n        }\n        var finduser = this.dBHandler.getUserByID(userID);\n        if (!finduser) {\n            res.writeHead(404, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"User with id=\".concat(userID, \"  not found\") }));\n            return;\n        }\n        if (!data) {\n            res.writeHead(400, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"body is empty\" }));\n            return;\n        }\n        try {\n            JSON.parse(data);\n        }\n        catch (error) {\n            res.writeHead(400, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"Error parsing JSON : \".concat(data) }));\n            return;\n        }\n        var parsedData = parseUserData(data, res);\n        if (!isUser(parsedData)) {\n            res.writeHead(400, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"Invalid User data : \".concat(data) }));\n            return;\n        }\n        var user = this.dBHandler.getUserByID(userID);\n        if (!user) {\n            res.writeHead(404, { \"Content-Type\": \"application/json\" });\n            res.end(JSON.stringify({ message: \"User not found\" }));\n            return;\n        }\n        user = this.dBHandler.uppdateUser(userID, parsedData);\n        res.writeHead(200, { \"Content-Type\": \"application/json\" });\n        res.end(JSON.stringify(user));\n    };\n    return PUTHandler;\n}());\nexports.PUTHandler = PUTHandler;\n\n\n//# sourceURL=webpack://my-webpack-project/./src/APIHandlers/putHandler.ts?");

/***/ }),

/***/ "./src/DBHandlers/dbHandler.ts":
/*!*************************************!*\
  !*** ./src/DBHandlers/dbHandler.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DBHandler = void 0;\nvar uuid_1 = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-node/index.js\");\nvar DBHandler = (function () {\n    function DBHandler() {\n        var _this = this;\n        this.users = [];\n        this.addUser = function (user) {\n            var addingUser = user;\n            addingUser.id = (0, uuid_1.v4)();\n            _this.users.push(user);\n            return user;\n        };\n        this.getUserByID = function (userId) {\n            return _this.users.find(function (user) { return user.id === userId; });\n        };\n        this.findUserByID = function (userId) {\n            return _this.users.findIndex(function (user) { return user.id === userId; });\n        };\n        this.getAllUsers = function () { return _this.users; };\n        this.delUserByID = function (userId) {\n            var index = _this.findUserByID(userId);\n            if (index !== -1) {\n                _this.users.splice(index, 1);\n            }\n        };\n        this.uppdateUser = function (userID, userData) {\n            var userIndex = _this.findUserByID(userID);\n            var username = userData.username, age = userData.age, hobbies = userData.hobbies;\n            var updatedUser = __assign(__assign({}, _this.users[userIndex]), { username: username !== undefined ? username : _this.users[userIndex].username, age: age !== undefined ? age : _this.users[userIndex].age, hobbies: hobbies !== undefined ? hobbies : _this.users[userIndex].hobbies });\n            _this.users[userIndex] = updatedUser;\n            return updatedUser;\n        };\n        if (DBHandler.instance) {\n            return DBHandler.instance;\n        }\n        DBHandler.instance = this;\n    }\n    DBHandler.instance = null;\n    return DBHandler;\n}());\nexports.DBHandler = DBHandler;\n\n\n//# sourceURL=webpack://my-webpack-project/./src/DBHandlers/dbHandler.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.app = exports.Application = void 0;\n__webpack_require__(/*! dotenv/config */ \"./node_modules/dotenv/config.js\");\nvar http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\nvar postHandler_1 = __webpack_require__(/*! ./APIHandlers/postHandler */ \"./src/APIHandlers/postHandler.ts\");\nvar getHandler_1 = __webpack_require__(/*! ./APIHandlers/getHandler */ \"./src/APIHandlers/getHandler.ts\");\nvar putHandler_1 = __webpack_require__(/*! ./APIHandlers/putHandler */ \"./src/APIHandlers/putHandler.ts\");\nvar deleteHandler_1 = __webpack_require__(/*! ./APIHandlers/deleteHandler */ \"./src/APIHandlers/deleteHandler.ts\");\nvar Application = (function () {\n    function Application() {\n        var _this = this;\n        this.server = null;\n        this.postHandler = new postHandler_1.POSTHandler();\n        this.getHandler = new getHandler_1.GETHandler();\n        this.deleteHandler = new deleteHandler_1.DeleteHandler();\n        this.putHandler = new putHandler_1.PUTHandler();\n        this.getServer = function () { return _this.server; };\n        this.closeServer = function () {\n            var _a;\n            (_a = _this.server) === null || _a === void 0 ? void 0 : _a.close();\n        };\n        this.PORT = Number(process.env.PORT) || 3001;\n    }\n    Application.prototype.runApp = function () {\n        var _this = this;\n        this.server = http_1.default.createServer(function (req, res) {\n            var data = \"\";\n            req.on(\"data\", function (chunk) {\n                data += String(chunk);\n            });\n            req.on(\"end\", function () {\n                try {\n                    switch (req.method) {\n                        case \"POST\":\n                            _this.postHandler.getUserData(req, res, data);\n                            break;\n                        case \"GET\":\n                            _this.getHandler.getUserData(req, res);\n                            break;\n                        case \"DELETE\":\n                            _this.deleteHandler.getUserData(req, res);\n                            break;\n                        case \"PUT\":\n                            _this.putHandler.getUserData(req, res, data);\n                            break;\n                        default: {\n                            console.log(\"цкщтп ьуещв\");\n                        }\n                    }\n                }\n                catch (_a) {\n                    res.writeHead(500, { \"Content-Type\": \"application/json\" });\n                    res.end(JSON.stringify({ message: \"Errors on the server side\" }));\n                }\n            });\n        });\n        this.server.listen(this.PORT, function () {\n            console.log(\"Server is running on http://localhost:\".concat(_this.PORT));\n        });\n    };\n    return Application;\n}());\nexports.Application = Application;\nexports.app = new Application();\nexports.app.runApp();\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ }),

/***/ "./src/utils/inspectorsAPI.ts":
/*!************************************!*\
  !*** ./src/utils/inspectorsAPI.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.endpointIsValid = endpointIsValid;\nexports.isUUIDv4 = isUUIDv4;\nexports.getUserID = getUserID;\nfunction endpointIsValid(path, hasUserID) {\n    if (hasUserID === void 0) { hasUserID = false; }\n    if (!path) {\n        return false;\n    }\n    var ckeckingPath = path[path.length - 1] === '/' ? path.slice(0, -1) : path;\n    var urlParts = ckeckingPath.split(\"/\");\n    var isUsersPathValid = (urlParts === null || urlParts === void 0 ? void 0 : urlParts[1]) === \"api\" && (urlParts === null || urlParts === void 0 ? void 0 : urlParts[2]) === \"users\";\n    return hasUserID ? isUsersPathValid && (urlParts === null || urlParts === void 0 ? void 0 : urlParts[3]) !== '' && urlParts.length === 4 : isUsersPathValid && urlParts.length === 3;\n}\nfunction isUUIDv4(uuid) {\n    var uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;\n    return uuidv4Regex.test(uuid);\n}\nfunction getUserID(url) {\n    var urlParts = url === null || url === void 0 ? void 0 : url.split(\"/\");\n    var userId = urlParts === null || urlParts === void 0 ? void 0 : urlParts[3];\n    return userId;\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/utils/inspectorsAPI.ts?");

/***/ }),

/***/ "./src/utils/sendingReplies.ts":
/*!*************************************!*\
  !*** ./src/utils/sendingReplies.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Message = exports.StatusCode = void 0;\nexports.nonExistingEndpoint = nonExistingEndpoint;\nexports.nonUUID = nonUUID;\nexports.userNotFound = userNotFound;\nvar StatusCode;\n(function (StatusCode) {\n    StatusCode[StatusCode[\"OK\"] = 200] = \"OK\";\n    StatusCode[StatusCode[\"Created\"] = 201] = \"Created\";\n    StatusCode[StatusCode[\"NoContent\"] = 204] = \"NoContent\";\n    StatusCode[StatusCode[\"BadRequest\"] = 400] = \"BadRequest\";\n    StatusCode[StatusCode[\"NotFound\"] = 404] = \"NotFound\";\n    StatusCode[StatusCode[\"ServerError\"] = 500] = \"ServerError\";\n})(StatusCode || (exports.StatusCode = StatusCode = {}));\n;\nvar Message;\n(function (Message) {\n    Message[\"nonExistEndpointMessage\"] = \"request to non-existing endpoint\";\n    Message[\"nonUUIDMessage\"] = \"userId is invalid (not uuid)\";\n    Message[\"userNotFoundMessages\"] = \"User with this id not found\";\n})(Message || (exports.Message = Message = {}));\nfunction nonExistingEndpoint(res) {\n    res.writeHead(StatusCode.NotFound, { \"Content-Type\": \"application/json\" });\n    res.end(JSON.stringify({ message: Message.nonExistEndpointMessage }));\n}\nfunction nonUUID(res) {\n    res.writeHead(StatusCode.BadRequest, { \"Content-Type\": \"application/json\" });\n    res.end(JSON.stringify({ message: Message.nonUUIDMessage }));\n}\nfunction userNotFound(res) {\n    res.writeHead(StatusCode.NotFound, { \"Content-Type\": \"application/json\" });\n    res.end(JSON.stringify({ message: \"User with this id not found\" }));\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/utils/sendingReplies.ts?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/index.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MAX: () => (/* reexport safe */ _max_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   NIL: () => (/* reexport safe */ _nil_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   parse: () => (/* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   stringify: () => (/* reexport safe */ _stringify_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   v1: () => (/* reexport safe */ _v1_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   v1ToV6: () => (/* reexport safe */ _v1ToV6_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   v3: () => (/* reexport safe */ _v3_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   v4: () => (/* reexport safe */ _v4_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]),\n/* harmony export */   v5: () => (/* reexport safe */ _v5_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]),\n/* harmony export */   v6: () => (/* reexport safe */ _v6_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]),\n/* harmony export */   v6ToV1: () => (/* reexport safe */ _v6ToV1_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]),\n/* harmony export */   v7: () => (/* reexport safe */ _v7_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]),\n/* harmony export */   validate: () => (/* reexport safe */ _validate_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]),\n/* harmony export */   version: () => (/* reexport safe */ _version_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./max.js */ \"./node_modules/uuid/dist/esm-node/max.js\");\n/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nil.js */ \"./node_modules/uuid/dist/esm-node/nil.js\");\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/esm-node/parse.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v1.js */ \"./node_modules/uuid/dist/esm-node/v1.js\");\n/* harmony import */ var _v1ToV6_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./v1ToV6.js */ \"./node_modules/uuid/dist/esm-node/v1ToV6.js\");\n/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./v3.js */ \"./node_modules/uuid/dist/esm-node/v3.js\");\n/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./v4.js */ \"./node_modules/uuid/dist/esm-node/v4.js\");\n/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./v5.js */ \"./node_modules/uuid/dist/esm-node/v5.js\");\n/* harmony import */ var _v6_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./v6.js */ \"./node_modules/uuid/dist/esm-node/v6.js\");\n/* harmony import */ var _v6ToV1_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./v6ToV1.js */ \"./node_modules/uuid/dist/esm-node/v6ToV1.js\");\n/* harmony import */ var _v7_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./v7.js */ \"./node_modules/uuid/dist/esm-node/v7.js\");\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./version.js */ \"./node_modules/uuid/dist/esm-node/version.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/index.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/max.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/max.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('ffffffff-ffff-ffff-ffff-ffffffffffff');\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/max.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/md5.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/md5.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:crypto */ \"node:crypto\");\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction md5(bytes) {\n  if (Array.isArray(bytes)) {\n    bytes = Buffer.from(bytes);\n  } else if (typeof bytes === 'string') {\n    bytes = Buffer.from(bytes, 'utf8');\n  }\n  return node_crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash('md5').update(bytes).digest();\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (md5);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/md5.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/native.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/native.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:crypto */ \"node:crypto\");\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  randomUUID: (node_crypto__WEBPACK_IMPORTED_MODULE_0___default().randomUUID)\n});\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/native.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/nil.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/nil.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('00000000-0000-0000-0000-000000000000');\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/nil.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/parse.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/parse.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n\nfunction parse(uuid) {\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Invalid UUID');\n  }\n  let v;\n  const arr = new Uint8Array(16);\n\n  // Parse ########-....-....-....-............\n  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;\n  arr[1] = v >>> 16 & 0xff;\n  arr[2] = v >>> 8 & 0xff;\n  arr[3] = v & 0xff;\n\n  // Parse ........-####-....-....-............\n  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;\n  arr[5] = v & 0xff;\n\n  // Parse ........-....-####-....-............\n  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;\n  arr[7] = v & 0xff;\n\n  // Parse ........-....-....-####-............\n  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;\n  arr[9] = v & 0xff;\n\n  // Parse ........-....-....-....-############\n  // (Use \"/\" to avoid 32-bit truncation when bit-shifting high-order bytes)\n  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;\n  arr[11] = v / 0x100000000 & 0xff;\n  arr[12] = v >>> 24 & 0xff;\n  arr[13] = v >>> 16 & 0xff;\n  arr[14] = v >>> 8 & 0xff;\n  arr[15] = v & 0xff;\n  return arr;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parse);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/parse.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/regex.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/regex.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/rng.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/rng.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:crypto */ \"node:crypto\");\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);\n\nconst rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate\nlet poolPtr = rnds8Pool.length;\nfunction rng() {\n  if (poolPtr > rnds8Pool.length - 16) {\n    node_crypto__WEBPACK_IMPORTED_MODULE_0___default().randomFillSync(rnds8Pool);\n    poolPtr = 0;\n  }\n  return rnds8Pool.slice(poolPtr, poolPtr += 16);\n}\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/sha1.js":
/*!*************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/sha1.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:crypto */ \"node:crypto\");\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction sha1(bytes) {\n  if (Array.isArray(bytes)) {\n    bytes = Buffer.from(bytes);\n  } else if (typeof bytes === 'string') {\n    bytes = Buffer.from(bytes, 'utf8');\n  }\n  return node_crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash('sha1').update(bytes).digest();\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sha1);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/sha1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/stringify.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/stringify.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nconst byteToHex = [];\nfor (let i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).slice(1));\n}\nfunction unsafeStringify(arr, offset = 0) {\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  //\n  // Note to future-self: No, you can't remove the `toLowerCase()` call.\n  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351\n  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();\n}\nfunction stringify(arr, offset = 0) {\n  const uuid = unsafeStringify(arr, offset);\n  // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n  return uuid;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v1.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v1.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-node/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n\n\n\n// **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nlet _nodeId;\nlet _clockseq;\n\n// Previous uuid creation time\nlet _lastMSecs = 0;\nlet _lastNSecs = 0;\n\n// See https://github.com/uuidjs/uuid for API details\nfunction v1(options, buf, offset) {\n  let i = buf && offset || 0;\n  const b = buf || new Array(16);\n  options = options || {};\n  let node = options.node;\n  let clockseq = options.clockseq;\n\n  // v1 only: Use cached `node` and `clockseq` values\n  if (!options._v6) {\n    if (!node) {\n      node = _nodeId;\n    }\n    if (clockseq == null) {\n      clockseq = _clockseq;\n    }\n  }\n\n  // Handle cases where we need entropy.  We do this lazily to minimize issues\n  // related to insufficient system entropy.  See #189\n  if (node == null || clockseq == null) {\n    const seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n    // Randomize node\n    if (node == null) {\n      node = [seedBytes[0], seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];\n\n      // v1 only: cache node value for reuse\n      if (!_nodeId && !options._v6) {\n        // per RFC4122 4.5: Set MAC multicast bit (v1 only)\n        node[0] |= 0x01; // Set multicast bit\n\n        _nodeId = node;\n      }\n    }\n\n    // Randomize clockseq\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n      if (_clockseq === undefined && !options._v6) {\n        _clockseq = clockseq;\n      }\n    }\n  }\n\n  // v1 & v6 timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so time is\n  // handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n  let msecs = options.msecs !== undefined ? options.msecs : Date.now();\n\n  // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;\n\n  // Time since last uuid creation (in msecs)\n  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;\n\n  // Per 4.2.1.2, Bump clockseq on clock regression\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  }\n\n  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  }\n\n  // Per 4.2.1.2 Throw error if too many uuids are requested\n  if (nsecs >= 10000) {\n    throw new Error(\"uuid.v1(): Can't create more than 10M uuids/sec\");\n  }\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq;\n\n  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n  msecs += 12219292800000;\n\n  // `time_low`\n  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff;\n\n  // `time_mid`\n  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff;\n\n  // `time_high_and_version`\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n  b[i++] = tmh >>> 16 & 0xff;\n\n  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n  b[i++] = clockseq >>> 8 | 0x80;\n\n  // `clock_seq_low`\n  b[i++] = clockseq & 0xff;\n\n  // `node`\n  for (let n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n  return buf || (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__.unsafeStringify)(b);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v1);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/v1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v1ToV6.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v1ToV6.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ v1ToV6)\n/* harmony export */ });\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/esm-node/parse.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n\n\n\n/**\n * Convert a v1 UUID to a v6 UUID\n *\n * @param {string|Uint8Array} uuid - The v1 UUID to convert to v6\n * @returns {string|Uint8Array} The v6 UUID as the same type as the `uuid` arg\n * (string or Uint8Array)\n */\nfunction v1ToV6(uuid) {\n  const v1Bytes = typeof uuid === 'string' ? (0,_parse_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid) : uuid;\n  const v6Bytes = _v1ToV6(v1Bytes);\n  return typeof uuid === 'string' ? (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__.unsafeStringify)(v6Bytes) : v6Bytes;\n}\n\n// Do the field transformation needed for v1 -> v6\nfunction _v1ToV6(v1Bytes, randomize = false) {\n  return Uint8Array.of((v1Bytes[6] & 0x0f) << 4 | v1Bytes[7] >> 4 & 0x0f, (v1Bytes[7] & 0x0f) << 4 | (v1Bytes[4] & 0xf0) >> 4, (v1Bytes[4] & 0x0f) << 4 | (v1Bytes[5] & 0xf0) >> 4, (v1Bytes[5] & 0x0f) << 4 | (v1Bytes[0] & 0xf0) >> 4, (v1Bytes[0] & 0x0f) << 4 | (v1Bytes[1] & 0xf0) >> 4, (v1Bytes[1] & 0x0f) << 4 | (v1Bytes[2] & 0xf0) >> 4, 0x60 | v1Bytes[2] & 0x0f, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);\n}\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/v1ToV6.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v3.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v3.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ \"./node_modules/uuid/dist/esm-node/v35.js\");\n/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ \"./node_modules/uuid/dist/esm-node/md5.js\");\n\n\nconst v3 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v3);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/v3.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v35.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v35.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DNS: () => (/* binding */ DNS),\n/* harmony export */   URL: () => (/* binding */ URL),\n/* harmony export */   \"default\": () => (/* binding */ v35)\n/* harmony export */ });\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/esm-node/parse.js\");\n\n\nfunction stringToBytes(str) {\n  str = unescape(encodeURIComponent(str)); // UTF8 escape\n\n  const bytes = [];\n  for (let i = 0; i < str.length; ++i) {\n    bytes.push(str.charCodeAt(i));\n  }\n  return bytes;\n}\nconst DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';\nconst URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';\nfunction v35(name, version, hashfunc) {\n  function generateUUID(value, namespace, buf, offset) {\n    var _namespace;\n    if (typeof value === 'string') {\n      value = stringToBytes(value);\n    }\n    if (typeof namespace === 'string') {\n      namespace = (0,_parse_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(namespace);\n    }\n    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {\n      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');\n    }\n\n    // Compute hash of namespace and value, Per 4.3\n    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =\n    // hashfunc([...namespace, ... value])`\n    let bytes = new Uint8Array(16 + value.length);\n    bytes.set(namespace);\n    bytes.set(value, namespace.length);\n    bytes = hashfunc(bytes);\n    bytes[6] = bytes[6] & 0x0f | version;\n    bytes[8] = bytes[8] & 0x3f | 0x80;\n    if (buf) {\n      offset = offset || 0;\n      for (let i = 0; i < 16; ++i) {\n        buf[offset + i] = bytes[i];\n      }\n      return buf;\n    }\n    return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__.unsafeStringify)(bytes);\n  }\n\n  // Function#name is not settable on some platforms (#270)\n  try {\n    generateUUID.name = name;\n  } catch (err) {}\n\n  // For CommonJS default export support\n  generateUUID.DNS = DNS;\n  generateUUID.URL = URL;\n  return generateUUID;\n}\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/v35.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v4.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v4.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ \"./node_modules/uuid/dist/esm-node/native.js\");\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-node/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n  if (_native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID && !buf && !options) {\n    return _native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID();\n  }\n  options = options || {};\n  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    offset = offset || 0;\n    for (let i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n    return buf;\n  }\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v5.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v5.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ \"./node_modules/uuid/dist/esm-node/v35.js\");\n/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ \"./node_modules/uuid/dist/esm-node/sha1.js\");\n\n\nconst v5 = (0,_v35_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v5);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/v5.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v6.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v6.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ v6)\n/* harmony export */ });\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ \"./node_modules/uuid/dist/esm-node/v1.js\");\n/* harmony import */ var _v1ToV6_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v1ToV6.js */ \"./node_modules/uuid/dist/esm-node/v1ToV6.js\");\n\n\n\n\n/**\n *\n * @param {object} options\n * @param {Uint8Array=} buf\n * @param {number=} offset\n * @returns\n */\nfunction v6(options = {}, buf, offset = 0) {\n  // v6 is v1 with different field layout, so we start with a v1 UUID, albeit\n  // with slightly different behavior around how the clock_seq and node fields\n  // are randomized, which is why we call v1 with _v6: true.\n  let bytes = (0,_v1_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    ...options,\n    _v6: true\n  }, new Uint8Array(16));\n\n  // Reorder the fields to v6 layout.\n  bytes = (0,_v1ToV6_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(bytes);\n\n  // Return as a byte array if requested\n  if (buf) {\n    for (let i = 0; i < 16; i++) {\n      buf[offset + i] = bytes[i];\n    }\n    return buf;\n  }\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(bytes);\n}\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/v6.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v6ToV1.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v6ToV1.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ v6ToV1)\n/* harmony export */ });\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/esm-node/parse.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n\n\n\n/**\n * Convert a v6 UUID to a v1 UUID\n *\n * @param {string|Uint8Array} uuid - The v6 UUID to convert to v6\n * @returns {string|Uint8Array} The v1 UUID as the same type as the `uuid` arg\n * (string or Uint8Array)\n */\nfunction v6ToV1(uuid) {\n  const v6Bytes = typeof uuid === 'string' ? (0,_parse_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid) : uuid;\n  const v1Bytes = _v6ToV1(v6Bytes);\n  return typeof uuid === 'string' ? (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__.unsafeStringify)(v1Bytes) : v1Bytes;\n}\n\n// Do the field transformation needed for v6 -> v1\nfunction _v6ToV1(v6Bytes) {\n  return Uint8Array.of((v6Bytes[3] & 0x0f) << 4 | v6Bytes[4] >> 4 & 0x0f, (v6Bytes[4] & 0x0f) << 4 | (v6Bytes[5] & 0xf0) >> 4, (v6Bytes[5] & 0x0f) << 4 | v6Bytes[6] & 0x0f, v6Bytes[7], (v6Bytes[1] & 0x0f) << 4 | (v6Bytes[2] & 0xf0) >> 4, (v6Bytes[2] & 0x0f) << 4 | (v6Bytes[3] & 0xf0) >> 4, 0x10 | (v6Bytes[0] & 0xf0) >> 4, (v6Bytes[0] & 0x0f) << 4 | (v6Bytes[1] & 0xf0) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);\n}\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/v6ToV1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v7.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v7.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-node/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-node/stringify.js\");\n\n\n\n/**\n * UUID V7 - Unix Epoch time-based UUID\n *\n * The IETF has published RFC9562, introducing 3 new UUID versions (6,7,8). This\n * implementation of V7 is based on the accepted, though not yet approved,\n * revisions.\n *\n * RFC 9562:https://www.rfc-editor.org/rfc/rfc9562.html Universally Unique\n * IDentifiers (UUIDs)\n\n *\n * Sample V7 value:\n * https://www.rfc-editor.org/rfc/rfc9562.html#name-example-of-a-uuidv7-value\n *\n * Monotonic Bit Layout: RFC rfc9562.6.2 Method 1, Dedicated Counter Bits ref:\n *     https://www.rfc-editor.org/rfc/rfc9562.html#section-6.2-5.1\n *\n *   0                   1                   2                   3 0 1 2 3 4 5 6\n *   7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n *  |                          unix_ts_ms                           |\n *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n *  |          unix_ts_ms           |  ver  |        seq_hi         |\n *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n *  |var|               seq_low               |        rand         |\n *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n *  |                             rand                              |\n *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n *\n * seq is a 31 bit serialized counter; comprised of 12 bit seq_hi and 19 bit\n * seq_low, and randomly initialized upon timestamp change. 31 bit counter size\n * was selected as any bitwise operations in node are done as _signed_ 32 bit\n * ints. we exclude the sign bit.\n */\n\nlet _seqLow = null;\nlet _seqHigh = null;\nlet _msecs = 0;\nfunction v7(options, buf, offset) {\n  options = options || {};\n\n  // initialize buffer and pointer\n  let i = buf && offset || 0;\n  const b = buf || new Uint8Array(16);\n\n  // rnds is Uint8Array(16) filled with random bytes\n  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n  // milliseconds since unix epoch, 1970-01-01 00:00\n  const msecs = options.msecs !== undefined ? options.msecs : Date.now();\n\n  // seq is user provided 31 bit counter\n  let seq = options.seq !== undefined ? options.seq : null;\n\n  // initialize local seq high/low parts\n  let seqHigh = _seqHigh;\n  let seqLow = _seqLow;\n\n  // check if clock has advanced and user has not provided msecs\n  if (msecs > _msecs && options.msecs === undefined) {\n    _msecs = msecs;\n\n    // unless user provided seq, reset seq parts\n    if (seq !== null) {\n      seqHigh = null;\n      seqLow = null;\n    }\n  }\n\n  // if we have a user provided seq\n  if (seq !== null) {\n    // trim provided seq to 31 bits of value, avoiding overflow\n    if (seq > 0x7fffffff) {\n      seq = 0x7fffffff;\n    }\n\n    // split provided seq into high/low parts\n    seqHigh = seq >>> 19 & 0xfff;\n    seqLow = seq & 0x7ffff;\n  }\n\n  // randomly initialize seq\n  if (seqHigh === null || seqLow === null) {\n    seqHigh = rnds[6] & 0x7f;\n    seqHigh = seqHigh << 8 | rnds[7];\n    seqLow = rnds[8] & 0x3f; // pad for var\n    seqLow = seqLow << 8 | rnds[9];\n    seqLow = seqLow << 5 | rnds[10] >>> 3;\n  }\n\n  // increment seq if within msecs window\n  if (msecs + 10000 > _msecs && seq === null) {\n    if (++seqLow > 0x7ffff) {\n      seqLow = 0;\n      if (++seqHigh > 0xfff) {\n        seqHigh = 0;\n\n        // increment internal _msecs. this allows us to continue incrementing\n        // while staying monotonic. Note, once we hit 10k milliseconds beyond system\n        // clock, we will reset breaking monotonicity (after (2^31)*10000 generations)\n        _msecs++;\n      }\n    }\n  } else {\n    // resetting; we have advanced more than\n    // 10k milliseconds beyond system clock\n    _msecs = msecs;\n  }\n  _seqHigh = seqHigh;\n  _seqLow = seqLow;\n\n  // [bytes 0-5] 48 bits of local timestamp\n  b[i++] = _msecs / 0x10000000000 & 0xff;\n  b[i++] = _msecs / 0x100000000 & 0xff;\n  b[i++] = _msecs / 0x1000000 & 0xff;\n  b[i++] = _msecs / 0x10000 & 0xff;\n  b[i++] = _msecs / 0x100 & 0xff;\n  b[i++] = _msecs & 0xff;\n\n  // [byte 6] - set 4 bits of version (7) with first 4 bits seq_hi\n  b[i++] = seqHigh >>> 4 & 0x0f | 0x70;\n\n  // [byte 7] remaining 8 bits of seq_hi\n  b[i++] = seqHigh & 0xff;\n\n  // [byte 8] - variant (2 bits), first 6 bits seq_low\n  b[i++] = seqLow >>> 13 & 0x3f | 0x80;\n\n  // [byte 9] 8 bits seq_low\n  b[i++] = seqLow >>> 5 & 0xff;\n\n  // [byte 10] remaining 5 bits seq_low, 3 bits random\n  b[i++] = seqLow << 3 & 0xff | rnds[10] & 0x07;\n\n  // [bytes 11-15] always random\n  b[i++] = rnds[11];\n  b[i++] = rnds[12];\n  b[i++] = rnds[13];\n  b[i++] = rnds[14];\n  b[i++] = rnds[15];\n  return buf || (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__.unsafeStringify)(b);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v7);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/v7.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/validate.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/validate.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-node/regex.js\");\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/validate.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/version.js":
/*!****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/version.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-node/validate.js\");\n\nfunction version(uuid) {\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Invalid UUID');\n  }\n  return parseInt(uuid.slice(14, 15), 16);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (version);\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/uuid/dist/esm-node/version.js?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "./node_modules/dotenv/package.json":
/*!******************************************!*\
  !*** ./node_modules/dotenv/package.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"name\":\"dotenv\",\"version\":\"16.4.5\",\"description\":\"Loads environment variables from .env file\",\"main\":\"lib/main.js\",\"types\":\"lib/main.d.ts\",\"exports\":{\".\":{\"types\":\"./lib/main.d.ts\",\"require\":\"./lib/main.js\",\"default\":\"./lib/main.js\"},\"./config\":\"./config.js\",\"./config.js\":\"./config.js\",\"./lib/env-options\":\"./lib/env-options.js\",\"./lib/env-options.js\":\"./lib/env-options.js\",\"./lib/cli-options\":\"./lib/cli-options.js\",\"./lib/cli-options.js\":\"./lib/cli-options.js\",\"./package.json\":\"./package.json\"},\"scripts\":{\"dts-check\":\"tsc --project tests/types/tsconfig.json\",\"lint\":\"standard\",\"lint-readme\":\"standard-markdown\",\"pretest\":\"npm run lint && npm run dts-check\",\"test\":\"tap tests/*.js --100 -Rspec\",\"test:coverage\":\"tap --coverage-report=lcov\",\"prerelease\":\"npm test\",\"release\":\"standard-version\"},\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/motdotla/dotenv.git\"},\"funding\":\"https://dotenvx.com\",\"keywords\":[\"dotenv\",\"env\",\".env\",\"environment\",\"variables\",\"config\",\"settings\"],\"readmeFilename\":\"README.md\",\"license\":\"BSD-2-Clause\",\"devDependencies\":{\"@definitelytyped/dtslint\":\"^0.0.133\",\"@types/node\":\"^18.11.3\",\"decache\":\"^4.6.1\",\"sinon\":\"^14.0.1\",\"standard\":\"^17.0.0\",\"standard-markdown\":\"^7.1.0\",\"standard-version\":\"^9.5.0\",\"tap\":\"^16.3.0\",\"tar\":\"^6.1.11\",\"typescript\":\"^4.8.4\"},\"engines\":{\"node\":\">=12\"},\"browser\":{\"fs\":false}}');\n\n//# sourceURL=webpack://my-webpack-project/./node_modules/dotenv/package.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;