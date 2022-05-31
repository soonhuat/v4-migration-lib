'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.postData =
  exports.getData =
  exports.downloadFile =
  exports.downloadFileBrowser =
  exports.fetchData =
    void 0
var cross_fetch_1 = __importDefault(require('cross-fetch'))
var Logger_1 = __importDefault(require('./Logger'))
function fetchData(url, opts) {
  return __awaiter(this, void 0, void 0, function () {
    var result, _a, _b, _c
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          return [4, (0, cross_fetch_1.default)(url, opts)]
        case 1:
          result = _d.sent()
          if (!!result.ok) return [3, 3]
          Logger_1.default.error(
            'Error requesting ['.concat(opts.method, '] ').concat(url)
          )
          _b = (_a = Logger_1.default).error
          _c = 'Response message: \n'.concat
          return [4, result.text()]
        case 2:
          _b.apply(_a, [_c.apply('Response message: \n', [_d.sent()])])
          throw result
        case 3:
          return [2, result]
      }
    })
  })
}
exports.fetchData = fetchData
function downloadFileBrowser(url) {
  return __awaiter(this, void 0, void 0, function () {
    var anchor
    return __generator(this, function (_a) {
      anchor = document.createElement('a')
      anchor.download = ''
      anchor.href = url
      anchor.click()
      return [2]
    })
  })
}
exports.downloadFileBrowser = downloadFileBrowser
function downloadFile(url, index) {
  return __awaiter(this, void 0, void 0, function () {
    var response, filename
    var _a
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [4, (0, cross_fetch_1.default)(url)]
        case 1:
          response = _b.sent()
          if (!response.ok) {
            throw new Error('Response error.')
          }
          try {
            filename = response.headers
              .get('content-disposition')
              .match(/attachment;filename=(.+)/)[1]
          } catch (_c) {
            try {
              filename = url.split('/').pop()
            } catch (_d) {
              filename = 'file'.concat(index)
            }
          }
          _a = {}
          return [4, response.arrayBuffer()]
        case 2:
          return [2, ((_a.data = _b.sent()), (_a.filename = filename), _a)]
      }
    })
  })
}
exports.downloadFile = downloadFile
function getData(url) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2,
        (0, cross_fetch_1.default)(url, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        })
      ]
    })
  })
}
exports.getData = getData
function postWithHeaders(url, payload, headers) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      if (payload != null) {
        return [
          2,
          (0, cross_fetch_1.default)(url, {
            method: 'POST',
            body: payload,
            headers: headers
          })
        ]
      } else {
        return [
          2,
          (0, cross_fetch_1.default)(url, {
            method: 'POST'
          })
        ]
      }
      return [2]
    })
  })
}
function postData(url, payload) {
  return __awaiter(this, void 0, void 0, function () {
    var headers
    return __generator(this, function (_a) {
      headers = {
        'Content-type': 'application/json'
      }
      return [2, postWithHeaders(url, payload, headers)]
    })
  })
}
exports.postData = postData
//# sourceMappingURL=FetchHelper.js.map
