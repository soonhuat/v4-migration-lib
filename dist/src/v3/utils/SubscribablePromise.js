'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.SubscribablePromise = void 0
var SubscribableObserver_1 = require('./SubscribableObserver')
var SubscribablePromise = (function () {
  function SubscribablePromise(executor) {
    var _this = this
    this.observer = new SubscribableObserver_1.SubscribableObserver()
    this.promise = Object.assign(
      new Promise(function (resolve, reject) {
        setTimeout(function () {
          _this.observer.subscribe(undefined, resolve, reject)
        }, 0)
      }),
      this
    )
    setTimeout(function () {
      return _this.init(executor)
    }, 1)
  }
  SubscribablePromise.prototype.subscribe = function (onNext) {
    return this.observer.subscribe(onNext)
  }
  SubscribablePromise.prototype.next = function (onNext) {
    this.observer.subscribe(onNext)
    return this
  }
  SubscribablePromise.prototype.then = function (onfulfilled, onrejected) {
    return Object.assign(this.promise.then(onfulfilled, onrejected), this)
  }
  SubscribablePromise.prototype.catch = function (onrejected) {
    return Object.assign(this.promise.catch(onrejected), this)
  }
  SubscribablePromise.prototype.finally = function (onfinally) {
    return Object.assign(this.promise.finally(onfinally), this)
  }
  SubscribablePromise.prototype.init = function (executor) {
    var _this = this
    var execution = executor(this.observer)
    Promise.resolve(execution)
      .then(function (result) {
        if (typeof execution.then === 'function') {
          _this.observer.complete(result)
        }
      })
      .catch(function (result) {
        if (typeof execution.then === 'function') {
          _this.observer.error(result)
        }
      })
  }
  return SubscribablePromise
})()
exports.SubscribablePromise = SubscribablePromise
//# sourceMappingURL=SubscribablePromise.js.map
