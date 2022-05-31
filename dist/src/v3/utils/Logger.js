'use strict'
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.LoggerInstance = exports.Logger = exports.LogLevel = void 0
var LogLevel
;(function (LogLevel) {
  LogLevel[(LogLevel['None'] = -1)] = 'None'
  LogLevel[(LogLevel['Error'] = 0)] = 'Error'
  LogLevel[(LogLevel['Warn'] = 1)] = 'Warn'
  LogLevel[(LogLevel['Log'] = 2)] = 'Log'
  LogLevel[(LogLevel['Verbose'] = 3)] = 'Verbose'
})((LogLevel = exports.LogLevel || (exports.LogLevel = {})))
var Logger = (function () {
  function Logger(logLevel) {
    if (logLevel === void 0) {
      logLevel = LogLevel.Error
    }
    this.logLevel = logLevel
  }
  Logger.prototype.setLevel = function (logLevel) {
    this.logLevel = logLevel
  }
  Logger.prototype.bypass = function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    this.dispatch.apply(this, __spreadArray(['log', -Infinity], args, false))
  }
  Logger.prototype.debug = function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    this.dispatch.apply(
      this,
      __spreadArray(['debug', LogLevel.Verbose], args, false)
    )
  }
  Logger.prototype.log = function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    this.dispatch.apply(this, __spreadArray(['log', LogLevel.Log], args, false))
  }
  Logger.prototype.warn = function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    this.dispatch.apply(
      this,
      __spreadArray(['warn', LogLevel.Warn], args, false)
    )
  }
  Logger.prototype.error = function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    this.dispatch.apply(
      this,
      __spreadArray(['error', LogLevel.Error], args, false)
    )
  }
  Logger.prototype.dispatch = function (verb, level) {
    var args = []
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i]
    }
    if (this.logLevel >= level) {
      console[verb].apply(console, args)
    }
  }
  return Logger
})()
exports.Logger = Logger
exports.LoggerInstance = new Logger()
exports.default = exports.LoggerInstance
//# sourceMappingURL=Logger.js.map
