'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.SubscribableObserver = void 0
var SubscribableObserver = (function () {
  function SubscribableObserver() {
    this.completed = false
    this.subscriptions = new Set()
  }
  SubscribableObserver.prototype.subscribe = function (
    onNext,
    onComplete,
    onError
  ) {
    var _this = this
    if (this.completed) {
      throw new Error('Observer completed.')
    }
    var subscription = {
      onNext: onNext,
      onComplete: onComplete,
      onError: onError
    }
    this.subscriptions.add(subscription)
    return {
      unsubscribe: function () {
        return _this.subscriptions.delete(subscription)
      }
    }
  }
  SubscribableObserver.prototype.next = function (next) {
    this.emit('onNext', next)
  }
  SubscribableObserver.prototype.complete = function (resolve) {
    this.emit('onComplete', resolve)
    this.unsubscribe()
  }
  SubscribableObserver.prototype.error = function (error) {
    this.emit('onError', error)
    this.unsubscribe()
  }
  SubscribableObserver.prototype.emit = function (type, value) {
    Array.from(this.subscriptions)
      .map(function (subscription) {
        return subscription[type]
      })
      .filter(function (callback) {
        return callback && typeof callback === 'function'
      })
      .forEach(function (callback) {
        return callback(value)
      })
  }
  SubscribableObserver.prototype.unsubscribe = function () {
    this.completed = true
    this.subscriptions.clear()
  }
  return SubscribableObserver
})()
exports.SubscribableObserver = SubscribableObserver
//# sourceMappingURL=SubscribableObserver.js.map
