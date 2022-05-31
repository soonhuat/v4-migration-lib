'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var node_abort_controller_1 = __importDefault(require('node-abort-controller'))
function timeoutSignal(timeout) {
  if (!Number.isInteger(timeout)) {
    throw new TypeError('Expected an integer, got '.concat(typeof timeout))
  }
  var signalMap = new WeakMap()
  var controller = new node_abort_controller_1.default()
  var timeoutId = setTimeout(function () {
    controller.abort()
  }, timeout)
  signalMap.set(controller.signal, timeoutId)
  return controller.signal
}
exports.default = timeoutSignal
//# sourceMappingURL=Timeout.js.map
