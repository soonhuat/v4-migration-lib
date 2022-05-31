import 'uuid'
import t from 'decimal.js'
import e from 'web3'
import i from 'fs'
import r from 'save-file'
import n from 'node-abort-controller'
import s, { fetch as a } from 'cross-fetch'
import o from 'buffer'
import u from 'assert'
import h from 'crypto'
import d from 'stream'
import 'events'
import l from 'util'
import f from 'string_decoder/'
import c from 'path'
import p, { homedir as m } from 'os'
import g from '@oceanprotocol/contracts/artifacts/Metadata.json'
import { LZMA as y } from 'lzma/src/lzma-c'
import b from '@oceanprotocol/contracts/artifacts/DTFactory.json'
import w from '@oceanprotocol/contracts/artifacts/DataTokenTemplate.json'
import { lookup as v } from '@ethereum-navigator/navigator'
import { SHA256 as M } from 'crypto-js'
import A from '@oceanprotocol/contracts/artifacts/BPool.json'
import _ from '@oceanprotocol/contracts/artifacts/BFactory.json'
import S from '@oceanprotocol/contracts/artifacts/FixedRateExchange.json'
import T from '@oceanprotocol/contracts/artifacts/Dispenser.json'
import x from '@oceanprotocol/contracts/artifacts/address.json'
import E from 'axios'
import R from 'crypto-js/sha256'
function k() {
  return (
    (k =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = arguments[e]
          for (var r in i)
            Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
        }
        return t
      }),
    k.apply(this, arguments)
  )
}
var I
!(function (t) {
  ;(t[(t.None = -1)] = 'None'),
    (t[(t.Error = 0)] = 'Error'),
    (t[(t.Warn = 1)] = 'Warn'),
    (t[(t.Log = 2)] = 'Log'),
    (t[(t.Verbose = 3)] = 'Verbose')
})(I || (I = {}))
const B = new (class {
    constructor(t = I.Error) {
      ;(this.logLevel = void 0), (this.logLevel = t)
    }
    setLevel(t) {
      this.logLevel = t
    }
    bypass(...t) {
      this.dispatch('log', -Infinity, ...t)
    }
    debug(...t) {
      this.dispatch('debug', I.Verbose, ...t)
    }
    log(...t) {
      this.dispatch('log', I.Log, ...t)
    }
    warn(...t) {
      this.dispatch('warn', I.Warn, ...t)
    }
    error(...t) {
      this.dispatch('error', I.Error, ...t)
    }
    dispatch(t, e, ...i) {
      this.logLevel >= e && console[t](...i)
    }
  })(),
  O = (t) => P(t, !1)
function P(t = '', e) {
  const { valid: i, output: r } = F(
    t,
    /^(?:0x)*([a-f0-9]+)$/i,
    'zeroXTransformer'
  )
  return (e && i ? '0x' : '') + r
}
const C = (t) => N(t, !0)
function N(t = '', e) {
  const { valid: i, output: r } = F(
    t,
    /^(?:0x|did:op:)*([a-f0-9]{40})$/i,
    'didTransformer'
  )
  return (e && i ? 'did:op:' : '') + r
}
const L = (t) => ((t) => P(t, !0))(N(t, !1)),
  D = (t) => O(N(t, !1))
function F(t, e, i) {
  if ('string' != typeof t)
    throw (
      (B.debug('Not input string:'),
      B.debug(t),
      new Error(`[${i}] Expected string, input type: ${typeof t}`))
    )
  const r = t.match(e)
  return r
    ? { valid: !0, output: r[1] }
    : (B.warn(`[${i}] Input transformation failed.`), { valid: !1, output: t })
}
class U {
  constructor() {
    ;(this.completed = !1), (this.subscriptions = new Set())
  }
  subscribe(t, e, i) {
    if (this.completed) throw new Error('Observer completed.')
    const r = { onNext: t, onComplete: e, onError: i }
    return (
      this.subscriptions.add(r),
      { unsubscribe: () => this.subscriptions.delete(r) }
    )
  }
  next(t) {
    this.emit('onNext', t)
  }
  complete(t) {
    this.emit('onComplete', t), this.unsubscribe()
  }
  error(t) {
    this.emit('onError', t), this.unsubscribe()
  }
  emit(t, e) {
    Array.from(this.subscriptions)
      .map((e) => e[t])
      .filter((t) => t && 'function' == typeof t)
      .forEach((t) => t(e))
  }
  unsubscribe() {
    ;(this.completed = !0), this.subscriptions.clear()
  }
}
class q {
  constructor(t) {
    ;(this.observer = new U()),
      (this.promise = Object.assign(
        new Promise((t, e) => {
          setTimeout(() => {
            this.observer.subscribe(void 0, t, e)
          }, 0)
        }),
        this
      )),
      setTimeout(() => this.init(t), 1)
  }
  subscribe(t) {
    return this.observer.subscribe(t)
  }
  next(t) {
    return this.observer.subscribe(t), this
  }
  then(t, e) {
    return Object.assign(this.promise.then(t, e), this)
  }
  catch(t) {
    return Object.assign(this.promise.catch(t), this)
  }
  finally(t) {
    return Object.assign(this.promise.finally(t), this)
  }
  init(t) {
    const e = t(this.observer)
    Promise.resolve(e)
      .then((t) => {
        'function' == typeof e.then && this.observer.complete(t)
      })
      .catch((t) => {
        'function' == typeof e.then && this.observer.error(t)
      })
  }
}
var j = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
  z = Math.ceil,
  W = Math.floor,
  $ = '[BigNumber Error] ',
  H = $ + 'Number primitive has more than 15 significant digits: ',
  G = 1e14,
  Z = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
  K = 1e9
function V(t) {
  var e = 0 | t
  return t > 0 || t === e ? e : e - 1
}
function J(t) {
  for (var e, i, r = 1, n = t.length, s = t[0] + ''; r < n; ) {
    for (i = 14 - (e = t[r++] + '').length; i--; e = '0' + e);
    s += e
  }
  for (n = s.length; 48 === s.charCodeAt(--n); );
  return s.slice(0, n + 1 || 1)
}
function X(t, e) {
  var i,
    r,
    n = t.c,
    s = e.c,
    a = t.s,
    o = e.s,
    u = t.e,
    h = e.e
  if (!a || !o) return null
  if (((r = s && !s[0]), (i = n && !n[0]) || r)) return i ? (r ? 0 : -o) : a
  if (a != o) return a
  if (((i = a < 0), (r = u == h), !n || !s)) return r ? 0 : !n ^ i ? 1 : -1
  if (!r) return (u > h) ^ i ? 1 : -1
  for (o = (u = n.length) < (h = s.length) ? u : h, a = 0; a < o; a++)
    if (n[a] != s[a]) return (n[a] > s[a]) ^ i ? 1 : -1
  return u == h ? 0 : (u > h) ^ i ? 1 : -1
}
function Y(t, e, i, r) {
  if (t < e || t > i || t !== (t < 0 ? z(t) : W(t)))
    throw Error(
      $ +
        (r || 'Argument') +
        ('number' == typeof t
          ? t < e || t > i
            ? ' out of range: '
            : ' not an integer: '
          : ' not a primitive number: ') +
        t
    )
}
function Q(t) {
  return '[object Array]' == Object.prototype.toString.call(t)
}
function tt(t) {
  var e = t.c.length - 1
  return V(t.e / 14) == e && t.c[e] % 2 != 0
}
function et(t, e) {
  return (
    (t.length > 1 ? t.charAt(0) + '.' + t.slice(1) : t) +
    (e < 0 ? 'e' : 'e+') +
    e
  )
}
function it(t, e, i) {
  var r, n
  if (e < 0) {
    for (n = i + '.'; ++e; n += i);
    t = n + t
  } else if (++e > (r = t.length)) {
    for (n = i, e -= r; --e; n += i);
    t += n
  } else e < r && (t = t.slice(0, e) + '.' + t.slice(e))
  return t
}
var rt = (function t(e) {
  var i,
    r,
    n,
    s,
    a,
    o,
    u,
    h,
    d,
    l,
    f = (T.prototype = { constructor: T, toString: null, valueOf: null }),
    c = new T(1),
    p = 20,
    m = 4,
    g = -7,
    y = 21,
    b = -1e7,
    w = 1e7,
    v = !1,
    M = 1,
    A = 0,
    _ = {
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: ' ',
      fractionGroupSize: 0
    },
    S = '0123456789abcdefghijklmnopqrstuvwxyz'
  function T(t, e) {
    var i,
      s,
      a,
      o,
      u,
      h,
      d,
      l,
      f = this
    if (!(f instanceof T)) return new T(t, e)
    if (null == e) {
      if (t instanceof T)
        return (f.s = t.s), (f.e = t.e), void (f.c = (t = t.c) ? t.slice() : t)
      if ((h = 'number' == typeof t) && 0 * t == 0) {
        if (((f.s = 1 / t < 0 ? ((t = -t), -1) : 1), t === ~~t)) {
          for (o = 0, u = t; u >= 10; u /= 10, o++);
          return (f.e = o), void (f.c = [t])
        }
        l = t + ''
      } else {
        if (!j.test((l = t + ''))) return n(f, l, h)
        f.s = 45 == l.charCodeAt(0) ? ((l = l.slice(1)), -1) : 1
      }
      ;(o = l.indexOf('.')) > -1 && (l = l.replace('.', '')),
        (u = l.search(/e/i)) > 0
          ? (o < 0 && (o = u), (o += +l.slice(u + 1)), (l = l.substring(0, u)))
          : o < 0 && (o = l.length)
    } else {
      if ((Y(e, 2, S.length, 'Base'), (l = t + ''), 10 == e))
        return k((f = new T(t instanceof T ? t : l)), p + f.e + 1, m)
      if ((h = 'number' == typeof t)) {
        if (0 * t != 0) return n(f, l, h, e)
        if (
          ((f.s = 1 / t < 0 ? ((l = l.slice(1)), -1) : 1),
          T.DEBUG && l.replace(/^0\.0*|\./, '').length > 15)
        )
          throw Error(H + t)
        h = !1
      } else f.s = 45 === l.charCodeAt(0) ? ((l = l.slice(1)), -1) : 1
      for (i = S.slice(0, e), o = u = 0, d = l.length; u < d; u++)
        if (i.indexOf((s = l.charAt(u))) < 0) {
          if ('.' == s) {
            if (u > o) {
              o = d
              continue
            }
          } else if (
            !a &&
            ((l == l.toUpperCase() && (l = l.toLowerCase())) ||
              (l == l.toLowerCase() && (l = l.toUpperCase())))
          ) {
            ;(a = !0), (u = -1), (o = 0)
            continue
          }
          return n(f, t + '', h, e)
        }
      ;(o = (l = r(l, e, 10, f.s)).indexOf('.')) > -1
        ? (l = l.replace('.', ''))
        : (o = l.length)
    }
    for (u = 0; 48 === l.charCodeAt(u); u++);
    for (d = l.length; 48 === l.charCodeAt(--d); );
    if ((l = l.slice(u, ++d))) {
      if (
        ((d -= u),
        h && T.DEBUG && d > 15 && (t > 9007199254740991 || t !== W(t)))
      )
        throw Error(H + f.s * t)
      if ((o = o - u - 1) > w) f.c = f.e = null
      else if (o < b) f.c = [(f.e = 0)]
      else {
        if (
          ((f.e = o), (f.c = []), (u = (o + 1) % 14), o < 0 && (u += 14), u < d)
        ) {
          for (u && f.c.push(+l.slice(0, u)), d -= 14; u < d; )
            f.c.push(+l.slice(u, (u += 14)))
          u = 14 - (l = l.slice(u)).length
        } else u -= d
        for (; u--; l += '0');
        f.c.push(+l)
      }
    } else f.c = [(f.e = 0)]
  }
  function x(t, e, i, r) {
    var n, s, a, o, u
    if ((null == i ? (i = m) : Y(i, 0, 8), !t.c)) return t.toString()
    if (((n = t.c[0]), (a = t.e), null == e))
      (u = J(t.c)),
        (u = 1 == r || (2 == r && a <= g) ? et(u, a) : it(u, a, '0'))
    else if (
      ((s = (t = k(new T(t), e, i)).e),
      (o = (u = J(t.c)).length),
      1 == r || (2 == r && (e <= s || s <= g)))
    ) {
      for (; o < e; u += '0', o++);
      u = et(u, s)
    } else if (((e -= a), (u = it(u, s, '0')), s + 1 > o)) {
      if (--e > 0) for (u += '.'; e--; u += '0');
    } else if ((e += s - o) > 0) for (s + 1 == o && (u += '.'); e--; u += '0');
    return t.s < 0 && n ? '-' + u : u
  }
  function E(t, e) {
    var i,
      r,
      n = 0
    for (Q(t[0]) && (t = t[0]), i = new T(t[0]); ++n < t.length; ) {
      if (!(r = new T(t[n])).s) {
        i = r
        break
      }
      e.call(i, r) && (i = r)
    }
    return i
  }
  function R(t, e, i) {
    for (var r = 1, n = e.length; !e[--n]; e.pop());
    for (n = e[0]; n >= 10; n /= 10, r++);
    return (
      (i = r + 14 * i - 1) > w
        ? (t.c = t.e = null)
        : i < b
        ? (t.c = [(t.e = 0)])
        : ((t.e = i), (t.c = e)),
      t
    )
  }
  function k(t, e, i, r) {
    var n,
      s,
      a,
      o,
      u,
      h,
      d,
      l = t.c,
      f = Z
    if (l) {
      t: {
        for (n = 1, o = l[0]; o >= 10; o /= 10, n++);
        if ((s = e - n) < 0)
          (s += 14), (d = ((u = l[(h = 0)]) / f[n - (a = e) - 1]) % 10 | 0)
        else if ((h = z((s + 1) / 14)) >= l.length) {
          if (!r) break t
          for (; l.length <= h; l.push(0));
          ;(u = d = 0), (n = 1), (a = (s %= 14) - 14 + 1)
        } else {
          for (u = o = l[h], n = 1; o >= 10; o /= 10, n++);
          d = (a = (s %= 14) - 14 + n) < 0 ? 0 : (u / f[n - a - 1]) % 10 | 0
        }
        if (
          ((r =
            r || e < 0 || null != l[h + 1] || (a < 0 ? u : u % f[n - a - 1])),
          (r =
            i < 4
              ? (d || r) && (0 == i || i == (t.s < 0 ? 3 : 2))
              : d > 5 ||
                (5 == d &&
                  (4 == i ||
                    r ||
                    (6 == i &&
                      (s > 0 ? (a > 0 ? u / f[n - a] : 0) : l[h - 1]) % 10 &
                        1) ||
                    i == (t.s < 0 ? 8 : 7)))),
          e < 1 || !l[0])
        )
          return (
            (l.length = 0),
            r
              ? ((l[0] = f[(14 - ((e -= t.e + 1) % 14)) % 14]), (t.e = -e || 0))
              : (l[0] = t.e = 0),
            t
          )
        if (
          (0 == s
            ? ((l.length = h), (o = 1), h--)
            : ((l.length = h + 1),
              (o = f[14 - s]),
              (l[h] = a > 0 ? W((u / f[n - a]) % f[a]) * o : 0)),
          r)
        )
          for (;;) {
            if (0 == h) {
              for (s = 1, a = l[0]; a >= 10; a /= 10, s++);
              for (a = l[0] += o, o = 1; a >= 10; a /= 10, o++);
              s != o && (t.e++, l[0] == G && (l[0] = 1))
              break
            }
            if (((l[h] += o), l[h] != G)) break
            ;(l[h--] = 0), (o = 1)
          }
        for (s = l.length; 0 === l[--s]; l.pop());
      }
      t.e > w ? (t.c = t.e = null) : t.e < b && (t.c = [(t.e = 0)])
    }
    return t
  }
  return (
    (T.clone = t),
    (T.ROUND_UP = 0),
    (T.ROUND_DOWN = 1),
    (T.ROUND_CEIL = 2),
    (T.ROUND_FLOOR = 3),
    (T.ROUND_HALF_UP = 4),
    (T.ROUND_HALF_DOWN = 5),
    (T.ROUND_HALF_EVEN = 6),
    (T.ROUND_HALF_CEIL = 7),
    (T.ROUND_HALF_FLOOR = 8),
    (T.EUCLID = 9),
    (T.config = T.set =
      function (t) {
        var e, i
        if (null != t) {
          if ('object' != typeof t) throw Error($ + 'Object expected: ' + t)
          if (
            (t.hasOwnProperty((e = 'DECIMAL_PLACES')) &&
              (Y((i = t[e]), 0, K, e), (p = i)),
            t.hasOwnProperty((e = 'ROUNDING_MODE')) &&
              (Y((i = t[e]), 0, 8, e), (m = i)),
            t.hasOwnProperty((e = 'EXPONENTIAL_AT')) &&
              (Q((i = t[e]))
                ? (Y(i[0], -K, 0, e), Y(i[1], 0, K, e), (g = i[0]), (y = i[1]))
                : (Y(i, -K, K, e), (g = -(y = i < 0 ? -i : i)))),
            t.hasOwnProperty((e = 'RANGE')))
          )
            if (Q((i = t[e])))
              Y(i[0], -K, -1, e), Y(i[1], 1, K, e), (b = i[0]), (w = i[1])
            else {
              if ((Y(i, -K, K, e), !i))
                throw Error($ + e + ' cannot be zero: ' + i)
              b = -(w = i < 0 ? -i : i)
            }
          if (t.hasOwnProperty((e = 'CRYPTO'))) {
            if ((i = t[e]) !== !!i)
              throw Error($ + e + ' not true or false: ' + i)
            if (i) {
              if (
                'undefined' == typeof crypto ||
                !crypto ||
                (!crypto.getRandomValues && !crypto.randomBytes)
              )
                throw ((v = !i), Error($ + 'crypto unavailable'))
              v = i
            } else v = i
          }
          if (
            (t.hasOwnProperty((e = 'MODULO_MODE')) &&
              (Y((i = t[e]), 0, 9, e), (M = i)),
            t.hasOwnProperty((e = 'POW_PRECISION')) &&
              (Y((i = t[e]), 0, K, e), (A = i)),
            t.hasOwnProperty((e = 'FORMAT')))
          ) {
            if ('object' != typeof (i = t[e]))
              throw Error($ + e + ' not an object: ' + i)
            _ = i
          }
          if (t.hasOwnProperty((e = 'ALPHABET'))) {
            if ('string' != typeof (i = t[e]) || /^.$|\.|(.).*\1/.test(i))
              throw Error($ + e + ' invalid: ' + i)
            S = i
          }
        }
        return {
          DECIMAL_PLACES: p,
          ROUNDING_MODE: m,
          EXPONENTIAL_AT: [g, y],
          RANGE: [b, w],
          CRYPTO: v,
          MODULO_MODE: M,
          POW_PRECISION: A,
          FORMAT: _,
          ALPHABET: S
        }
      }),
    (T.isBigNumber = function (t) {
      return t instanceof T || (t && !0 === t._isBigNumber) || !1
    }),
    (T.maximum = T.max =
      function () {
        return E(arguments, f.lt)
      }),
    (T.minimum = T.min =
      function () {
        return E(arguments, f.gt)
      }),
    (T.random =
      ((s = 9007199254740992),
      (a =
        (Math.random() * s) & 2097151
          ? function () {
              return W(Math.random() * s)
            }
          : function () {
              return (
                8388608 * ((1073741824 * Math.random()) | 0) +
                ((8388608 * Math.random()) | 0)
              )
            }),
      function (t) {
        var e,
          i,
          r,
          n,
          s,
          o = 0,
          u = [],
          h = new T(c)
        if ((null == t ? (t = p) : Y(t, 0, K), (n = z(t / 14)), v))
          if (crypto.getRandomValues) {
            for (e = crypto.getRandomValues(new Uint32Array((n *= 2))); o < n; )
              (s = 131072 * e[o] + (e[o + 1] >>> 11)) >= 9e15
                ? ((i = crypto.getRandomValues(new Uint32Array(2))),
                  (e[o] = i[0]),
                  (e[o + 1] = i[1]))
                : (u.push(s % 1e14), (o += 2))
            o = n / 2
          } else {
            if (!crypto.randomBytes)
              throw ((v = !1), Error($ + 'crypto unavailable'))
            for (e = crypto.randomBytes((n *= 7)); o < n; )
              (s =
                281474976710656 * (31 & e[o]) +
                1099511627776 * e[o + 1] +
                4294967296 * e[o + 2] +
                16777216 * e[o + 3] +
                (e[o + 4] << 16) +
                (e[o + 5] << 8) +
                e[o + 6]) >= 9e15
                ? crypto.randomBytes(7).copy(e, o)
                : (u.push(s % 1e14), (o += 7))
            o = n / 7
          }
        if (!v) for (; o < n; ) (s = a()) < 9e15 && (u[o++] = s % 1e14)
        for (
          t %= 14, (n = u[--o]) && t && (u[o] = W(n / (s = Z[14 - t])) * s);
          0 === u[o];
          u.pop(), o--
        );
        if (o < 0) u = [(r = 0)]
        else {
          for (r = -1; 0 === u[0]; u.splice(0, 1), r -= 14);
          for (o = 1, s = u[0]; s >= 10; s /= 10, o++);
          o < 14 && (r -= 14 - o)
        }
        return (h.e = r), (h.c = u), h
      })),
    (r = (function () {
      var t = '0123456789'
      function e(t, e, i, r) {
        for (var n, s, a = [0], o = 0, u = t.length; o < u; ) {
          for (s = a.length; s--; a[s] *= e);
          for (a[0] += r.indexOf(t.charAt(o++)), n = 0; n < a.length; n++)
            a[n] > i - 1 &&
              (null == a[n + 1] && (a[n + 1] = 0),
              (a[n + 1] += (a[n] / i) | 0),
              (a[n] %= i))
        }
        return a.reverse()
      }
      return function (r, n, s, a, o) {
        var u,
          h,
          d,
          l,
          f,
          c,
          g,
          y,
          b = r.indexOf('.'),
          w = p,
          v = m
        for (
          b >= 0 &&
            ((l = A),
            (A = 0),
            (r = r.replace('.', '')),
            (c = (y = new T(n)).pow(r.length - b)),
            (A = l),
            (y.c = e(it(J(c.c), c.e, '0'), 10, s, t)),
            (y.e = y.c.length)),
            d = l = (g = e(r, n, s, o ? ((u = S), t) : ((u = t), S))).length;
          0 == g[--l];
          g.pop()
        );
        if (!g[0]) return u.charAt(0)
        if (
          (b < 0
            ? --d
            : ((c.c = g),
              (c.e = d),
              (c.s = a),
              (g = (c = i(c, y, w, v, s)).c),
              (f = c.r),
              (d = c.e)),
          (b = g[(h = d + w + 1)]),
          (l = s / 2),
          (f = f || h < 0 || null != g[h + 1]),
          (f =
            v < 4
              ? (null != b || f) && (0 == v || v == (c.s < 0 ? 3 : 2))
              : b > l ||
                (b == l &&
                  (4 == v ||
                    f ||
                    (6 == v && 1 & g[h - 1]) ||
                    v == (c.s < 0 ? 8 : 7)))),
          h < 1 || !g[0])
        )
          r = f ? it(u.charAt(1), -w, u.charAt(0)) : u.charAt(0)
        else {
          if (((g.length = h), f))
            for (--s; ++g[--h] > s; )
              (g[h] = 0), h || (++d, (g = [1].concat(g)))
          for (l = g.length; !g[--l]; );
          for (b = 0, r = ''; b <= l; r += u.charAt(g[b++]));
          r = it(r, d, u.charAt(0))
        }
        return r
      }
    })()),
    (i = (function () {
      function t(t, e, i) {
        var r,
          n,
          s,
          a,
          o = 0,
          u = t.length,
          h = e % 1e7,
          d = (e / 1e7) | 0
        for (t = t.slice(); u--; )
          (o =
            (((n =
              h * (s = t[u] % 1e7) +
              ((r = d * s + (a = (t[u] / 1e7) | 0) * h) % 1e7) * 1e7 +
              o) /
              i) |
              0) +
            ((r / 1e7) | 0) +
            d * a),
            (t[u] = n % i)
        return o && (t = [o].concat(t)), t
      }
      function e(t, e, i, r) {
        var n, s
        if (i != r) s = i > r ? 1 : -1
        else
          for (n = s = 0; n < i; n++)
            if (t[n] != e[n]) {
              s = t[n] > e[n] ? 1 : -1
              break
            }
        return s
      }
      function i(t, e, i, r) {
        for (var n = 0; i--; )
          (t[i] -= n), (t[i] = (n = t[i] < e[i] ? 1 : 0) * r + t[i] - e[i])
        for (; !t[0] && t.length > 1; t.splice(0, 1));
      }
      return function (r, n, s, a, o) {
        var u,
          h,
          d,
          l,
          f,
          c,
          p,
          m,
          g,
          y,
          b,
          w,
          v,
          M,
          A,
          _,
          S,
          x = r.s == n.s ? 1 : -1,
          E = r.c,
          R = n.c
        if (!(E && E[0] && R && R[0]))
          return new T(
            r.s && n.s && (E ? !R || E[0] != R[0] : R)
              ? (E && 0 == E[0]) || !R
                ? 0 * x
                : x / 0
              : NaN
          )
        for (
          g = (m = new T(x)).c = [],
            x = s + (h = r.e - n.e) + 1,
            o || ((o = G), (h = V(r.e / 14) - V(n.e / 14)), (x = (x / 14) | 0)),
            d = 0;
          R[d] == (E[d] || 0);
          d++
        );
        if ((R[d] > (E[d] || 0) && h--, x < 0)) g.push(1), (l = !0)
        else {
          for (
            M = E.length,
              _ = R.length,
              d = 0,
              x += 2,
              (f = W(o / (R[0] + 1))) > 1 &&
                ((R = t(R, f, o)),
                (E = t(E, f, o)),
                (_ = R.length),
                (M = E.length)),
              v = _,
              b = (y = E.slice(0, _)).length;
            b < _;
            y[b++] = 0
          );
          ;(S = R.slice()),
            (S = [0].concat(S)),
            (A = R[0]),
            R[1] >= o / 2 && A++
          do {
            if (((f = 0), (u = e(R, y, _, b)) < 0)) {
              if (
                ((w = y[0]),
                _ != b && (w = w * o + (y[1] || 0)),
                (f = W(w / A)) > 1)
              )
                for (
                  f >= o && (f = o - 1),
                    p = (c = t(R, f, o)).length,
                    b = y.length;
                  1 == e(c, y, p, b);

                )
                  f--, i(c, _ < p ? S : R, p, o), (p = c.length), (u = 1)
              else 0 == f && (u = f = 1), (p = (c = R.slice()).length)
              if (
                (p < b && (c = [0].concat(c)),
                i(y, c, b, o),
                (b = y.length),
                -1 == u)
              )
                for (; e(R, y, _, b) < 1; )
                  f++, i(y, _ < b ? S : R, b, o), (b = y.length)
            } else 0 === u && (f++, (y = [0]))
            ;(g[d++] = f), y[0] ? (y[b++] = E[v] || 0) : ((y = [E[v]]), (b = 1))
          } while ((v++ < M || null != y[0]) && x--)
          ;(l = null != y[0]), g[0] || g.splice(0, 1)
        }
        if (o == G) {
          for (d = 1, x = g[0]; x >= 10; x /= 10, d++);
          k(m, s + (m.e = d + 14 * h - 1) + 1, a, l)
        } else (m.e = h), (m.r = +l)
        return m
      }
    })()),
    (o = /^(-?)0([xbo])(?=\w[\w.]*$)/i),
    (u = /^([^.]+)\.$/),
    (h = /^\.([^.]+)$/),
    (d = /^-?(Infinity|NaN)$/),
    (l = /^\s*\+(?=[\w.])|^\s+|\s+$/g),
    (n = function (t, e, i, r) {
      var n,
        s = i ? e : e.replace(l, '')
      if (d.test(s))
        (t.s = isNaN(s) ? null : s < 0 ? -1 : 1), (t.c = t.e = null)
      else {
        if (
          !i &&
          ((s = s.replace(o, function (t, e, i) {
            return (
              (n = 'x' == (i = i.toLowerCase()) ? 16 : 'b' == i ? 2 : 8),
              r && r != n ? t : e
            )
          })),
          r && ((n = r), (s = s.replace(u, '$1').replace(h, '0.$1'))),
          e != s)
        )
          return new T(s, n)
        if (T.DEBUG)
          throw Error($ + 'Not a' + (r ? ' base ' + r : '') + ' number: ' + e)
        t.c = t.e = t.s = null
      }
    }),
    (f.absoluteValue = f.abs =
      function () {
        var t = new T(this)
        return t.s < 0 && (t.s = 1), t
      }),
    (f.comparedTo = function (t, e) {
      return X(this, new T(t, e))
    }),
    (f.decimalPlaces = f.dp =
      function (t, e) {
        var i,
          r,
          n,
          s = this
        if (null != t)
          return (
            Y(t, 0, K),
            null == e ? (e = m) : Y(e, 0, 8),
            k(new T(s), t + s.e + 1, e)
          )
        if (!(i = s.c)) return null
        if (((r = 14 * ((n = i.length - 1) - V(this.e / 14))), (n = i[n])))
          for (; n % 10 == 0; n /= 10, r--);
        return r < 0 && (r = 0), r
      }),
    (f.dividedBy = f.div =
      function (t, e) {
        return i(this, new T(t, e), p, m)
      }),
    (f.dividedToIntegerBy = f.idiv =
      function (t, e) {
        return i(this, new T(t, e), 0, 1)
      }),
    (f.exponentiatedBy = f.pow =
      function (t, e) {
        var i,
          r,
          n,
          s,
          a,
          o,
          u,
          h = this
        if ((t = new T(t)).c && !t.isInteger())
          throw Error($ + 'Exponent not an integer: ' + t)
        if (
          (null != e && (e = new T(e)),
          (s = t.e > 14),
          !h.c ||
            !h.c[0] ||
            (1 == h.c[0] && !h.e && 1 == h.c.length) ||
            !t.c ||
            !t.c[0])
        )
          return (
            (u = new T(Math.pow(+h.valueOf(), s ? 2 - tt(t) : +t))),
            e ? u.mod(e) : u
          )
        if (((a = t.s < 0), e)) {
          if (e.c ? !e.c[0] : !e.s) return new T(NaN)
          ;(r = !a && h.isInteger() && e.isInteger()) && (h = h.mod(e))
        } else {
          if (
            t.e > 9 &&
            (h.e > 0 ||
              h.e < -1 ||
              (0 == h.e
                ? h.c[0] > 1 || (s && h.c[1] >= 24e7)
                : h.c[0] < 8e13 || (s && h.c[0] <= 9999975e7)))
          )
            return (
              (n = h.s < 0 && tt(t) ? -0 : 0),
              h.e > -1 && (n = 1 / n),
              new T(a ? 1 / n : n)
            )
          A && (n = z(A / 14 + 2))
        }
        for (
          s ? ((i = new T(0.5)), (o = tt(t))) : (o = t % 2),
            a && (t.s = 1),
            u = new T(c);
          ;

        ) {
          if (o) {
            if (!(u = u.times(h)).c) break
            n ? u.c.length > n && (u.c.length = n) : r && (u = u.mod(e))
          }
          if (s) {
            if ((k((t = t.times(i)), t.e + 1, 1), !t.c[0])) break
            ;(s = t.e > 14), (o = tt(t))
          } else {
            if (!(t = W(t / 2))) break
            o = t % 2
          }
          ;(h = h.times(h)),
            n ? h.c && h.c.length > n && (h.c.length = n) : r && (h = h.mod(e))
        }
        return r
          ? u
          : (a && (u = c.div(u)), e ? u.mod(e) : n ? k(u, A, m, void 0) : u)
      }),
    (f.integerValue = function (t) {
      var e = new T(this)
      return null == t ? (t = m) : Y(t, 0, 8), k(e, e.e + 1, t)
    }),
    (f.isEqualTo = f.eq =
      function (t, e) {
        return 0 === X(this, new T(t, e))
      }),
    (f.isFinite = function () {
      return !!this.c
    }),
    (f.isGreaterThan = f.gt =
      function (t, e) {
        return X(this, new T(t, e)) > 0
      }),
    (f.isGreaterThanOrEqualTo = f.gte =
      function (t, e) {
        return 1 === (e = X(this, new T(t, e))) || 0 === e
      }),
    (f.isInteger = function () {
      return !!this.c && V(this.e / 14) > this.c.length - 2
    }),
    (f.isLessThan = f.lt =
      function (t, e) {
        return X(this, new T(t, e)) < 0
      }),
    (f.isLessThanOrEqualTo = f.lte =
      function (t, e) {
        return -1 === (e = X(this, new T(t, e))) || 0 === e
      }),
    (f.isNaN = function () {
      return !this.s
    }),
    (f.isNegative = function () {
      return this.s < 0
    }),
    (f.isPositive = function () {
      return this.s > 0
    }),
    (f.isZero = function () {
      return !!this.c && 0 == this.c[0]
    }),
    (f.minus = function (t, e) {
      var i,
        r,
        n,
        s,
        a = this,
        o = a.s
      if (((e = (t = new T(t, e)).s), !o || !e)) return new T(NaN)
      if (o != e) return (t.s = -e), a.plus(t)
      var u = a.e / 14,
        h = t.e / 14,
        d = a.c,
        l = t.c
      if (!u || !h) {
        if (!d || !l) return d ? ((t.s = -e), t) : new T(l ? a : NaN)
        if (!d[0] || !l[0])
          return l[0] ? ((t.s = -e), t) : new T(d[0] ? a : 3 == m ? -0 : 0)
      }
      if (((u = V(u)), (h = V(h)), (d = d.slice()), (o = u - h))) {
        for (
          (s = o < 0) ? ((o = -o), (n = d)) : ((h = u), (n = l)),
            n.reverse(),
            e = o;
          e--;
          n.push(0)
        );
        n.reverse()
      } else
        for (
          r = (s = (o = d.length) < (e = l.length)) ? o : e, o = e = 0;
          e < r;
          e++
        )
          if (d[e] != l[e]) {
            s = d[e] < l[e]
            break
          }
      if (
        (s && ((n = d), (d = l), (l = n), (t.s = -t.s)),
        (e = (r = l.length) - (i = d.length)) > 0)
      )
        for (; e--; d[i++] = 0);
      for (e = G - 1; r > o; ) {
        if (d[--r] < l[r]) {
          for (i = r; i && !d[--i]; d[i] = e);
          --d[i], (d[r] += G)
        }
        d[r] -= l[r]
      }
      for (; 0 == d[0]; d.splice(0, 1), --h);
      return d[0]
        ? R(t, d, h)
        : ((t.s = 3 == m ? -1 : 1), (t.c = [(t.e = 0)]), t)
    }),
    (f.modulo = f.mod =
      function (t, e) {
        var r,
          n,
          s = this
        return (
          (t = new T(t, e)),
          !s.c || !t.s || (t.c && !t.c[0])
            ? new T(NaN)
            : !t.c || (s.c && !s.c[0])
            ? new T(s)
            : (9 == M
                ? ((n = t.s),
                  (t.s = 1),
                  (r = i(s, t, 0, 3)),
                  (t.s = n),
                  (r.s *= n))
                : (r = i(s, t, 0, M)),
              (t = s.minus(r.times(t))).c[0] || 1 != M || (t.s = s.s),
              t)
        )
      }),
    (f.multipliedBy = f.times =
      function (t, e) {
        var i,
          r,
          n,
          s,
          a,
          o,
          u,
          h,
          d,
          l,
          f,
          c,
          p,
          m,
          g,
          y = this,
          b = y.c,
          w = (t = new T(t, e)).c
        if (!(b && w && b[0] && w[0]))
          return (
            !y.s || !t.s || (b && !b[0] && !w) || (w && !w[0] && !b)
              ? (t.c = t.e = t.s = null)
              : ((t.s *= y.s),
                b && w ? ((t.c = [0]), (t.e = 0)) : (t.c = t.e = null)),
            t
          )
        for (
          r = V(y.e / 14) + V(t.e / 14),
            t.s *= y.s,
            (u = b.length) < (l = w.length) &&
              ((p = b), (b = w), (w = p), (n = u), (u = l), (l = n)),
            n = u + l,
            p = [];
          n--;
          p.push(0)
        );
        for (m = G, g = 1e7, n = l; --n >= 0; ) {
          for (
            i = 0, f = w[n] % g, c = (w[n] / g) | 0, s = n + (a = u);
            s > n;

          )
            (i =
              (((h =
                f * (h = b[--a] % g) +
                ((o = c * h + (d = (b[a] / g) | 0) * f) % g) * g +
                p[s] +
                i) /
                m) |
                0) +
              ((o / g) | 0) +
              c * d),
              (p[s--] = h % m)
          p[s] = i
        }
        return i ? ++r : p.splice(0, 1), R(t, p, r)
      }),
    (f.negated = function () {
      var t = new T(this)
      return (t.s = -t.s || null), t
    }),
    (f.plus = function (t, e) {
      var i,
        r = this,
        n = r.s
      if (((e = (t = new T(t, e)).s), !n || !e)) return new T(NaN)
      if (n != e) return (t.s = -e), r.minus(t)
      var s = r.e / 14,
        a = t.e / 14,
        o = r.c,
        u = t.c
      if (!s || !a) {
        if (!o || !u) return new T(n / 0)
        if (!o[0] || !u[0]) return u[0] ? t : new T(o[0] ? r : 0 * n)
      }
      if (((s = V(s)), (a = V(a)), (o = o.slice()), (n = s - a))) {
        for (
          n > 0 ? ((a = s), (i = u)) : ((n = -n), (i = o)), i.reverse();
          n--;
          i.push(0)
        );
        i.reverse()
      }
      for (
        (n = o.length) - (e = u.length) < 0 &&
          ((i = u), (u = o), (o = i), (e = n)),
          n = 0;
        e;

      )
        (n = ((o[--e] = o[e] + u[e] + n) / G) | 0),
          (o[e] = G === o[e] ? 0 : o[e] % G)
      return n && ((o = [n].concat(o)), ++a), R(t, o, a)
    }),
    (f.precision = f.sd =
      function (t, e) {
        var i,
          r,
          n,
          s = this
        if (null != t && t !== !!t)
          return Y(t, 1, K), null == e ? (e = m) : Y(e, 0, 8), k(new T(s), t, e)
        if (!(i = s.c)) return null
        if (((r = 14 * (n = i.length - 1) + 1), (n = i[n]))) {
          for (; n % 10 == 0; n /= 10, r--);
          for (n = i[0]; n >= 10; n /= 10, r++);
        }
        return t && s.e + 1 > r && (r = s.e + 1), r
      }),
    (f.shiftedBy = function (t) {
      return Y(t, -9007199254740991, 9007199254740991), this.times('1e' + t)
    }),
    (f.squareRoot = f.sqrt =
      function () {
        var t,
          e,
          r,
          n,
          s,
          a = this,
          o = a.c,
          u = a.s,
          h = a.e,
          d = p + 4,
          l = new T('0.5')
        if (1 !== u || !o || !o[0])
          return new T(!u || (u < 0 && (!o || o[0])) ? NaN : o ? a : 1 / 0)
        if (
          (0 == (u = Math.sqrt(+a)) || u == 1 / 0
            ? (((e = J(o)).length + h) % 2 == 0 && (e += '0'),
              (u = Math.sqrt(e)),
              (h = V((h + 1) / 2) - (h < 0 || h % 2)),
              (r = new T(
                (e =
                  u == 1 / 0
                    ? '1e' + h
                    : (e = u.toExponential()).slice(0, e.indexOf('e') + 1) + h)
              )))
            : (r = new T(u + '')),
          r.c[0])
        )
          for ((u = (h = r.e) + d) < 3 && (u = 0); ; )
            if (
              ((r = l.times((s = r).plus(i(a, s, d, 1)))),
              J(s.c).slice(0, u) === (e = J(r.c)).slice(0, u))
            ) {
              if (
                (r.e < h && --u,
                '9999' != (e = e.slice(u - 3, u + 1)) && (n || '4999' != e))
              ) {
                ;(+e && (+e.slice(1) || '5' != e.charAt(0))) ||
                  (k(r, r.e + p + 2, 1), (t = !r.times(r).eq(a)))
                break
              }
              if (!n && (k(s, s.e + p + 2, 0), s.times(s).eq(a))) {
                r = s
                break
              }
              ;(d += 4), (u += 4), (n = 1)
            }
        return k(r, r.e + p + 1, m, t)
      }),
    (f.toExponential = function (t, e) {
      return null != t && (Y(t, 0, K), t++), x(this, t, e, 1)
    }),
    (f.toFixed = function (t, e) {
      return null != t && (Y(t, 0, K), (t = t + this.e + 1)), x(this, t, e)
    }),
    (f.toFormat = function (t, e) {
      var i = this.toFixed(t, e)
      if (this.c) {
        var r,
          n = i.split('.'),
          s = +_.groupSize,
          a = +_.secondaryGroupSize,
          o = _.groupSeparator,
          u = n[0],
          h = n[1],
          d = this.s < 0,
          l = d ? u.slice(1) : u,
          f = l.length
        if ((a && ((r = s), (s = a), (a = r), (f -= r)), s > 0 && f > 0)) {
          for (u = l.substr(0, (r = f % s || s)); r < f; r += s)
            u += o + l.substr(r, s)
          a > 0 && (u += o + l.slice(r)), d && (u = '-' + u)
        }
        i = h
          ? u +
            _.decimalSeparator +
            ((a = +_.fractionGroupSize)
              ? h.replace(
                  new RegExp('\\d{' + a + '}\\B', 'g'),
                  '$&' + _.fractionGroupSeparator
                )
              : h)
          : u
      }
      return i
    }),
    (f.toFraction = function (t) {
      var e,
        r,
        n,
        s,
        a,
        o,
        u,
        h,
        d,
        l,
        f,
        p,
        g = this,
        y = g.c
      if (
        null != t &&
        ((!(h = new T(t)).isInteger() && (h.c || 1 !== h.s)) || h.lt(c))
      )
        throw Error(
          $ +
            'Argument ' +
            (h.isInteger() ? 'out of range: ' : 'not an integer: ') +
            t
        )
      if (!y) return g.toString()
      for (
        r = new T(c),
          l = n = new T(c),
          s = d = new T(c),
          p = J(y),
          o = r.e = p.length - g.e - 1,
          r.c[0] = Z[(u = o % 14) < 0 ? 14 + u : u],
          t = !t || h.comparedTo(r) > 0 ? (o > 0 ? r : l) : h,
          u = w,
          w = 1 / 0,
          h = new T(p),
          d.c[0] = 0;
        (f = i(h, r, 0, 1)), 1 != (a = n.plus(f.times(s))).comparedTo(t);

      )
        (n = s),
          (s = a),
          (l = d.plus(f.times((a = l)))),
          (d = a),
          (r = h.minus(f.times((a = r)))),
          (h = a)
      return (
        (a = i(t.minus(n), s, 0, 1)),
        (d = d.plus(a.times(l))),
        (n = n.plus(a.times(s))),
        (d.s = l.s = g.s),
        (e =
          i(l, s, (o *= 2), m)
            .minus(g)
            .abs()
            .comparedTo(i(d, n, o, m).minus(g).abs()) < 1
            ? [l.toString(), s.toString()]
            : [d.toString(), n.toString()]),
        (w = u),
        e
      )
    }),
    (f.toNumber = function () {
      return +this
    }),
    (f.toPrecision = function (t, e) {
      return null != t && Y(t, 1, K), x(this, t, e, 2)
    }),
    (f.toString = function (t) {
      var e,
        i = this,
        n = i.s,
        s = i.e
      return (
        null === s
          ? n
            ? ((e = 'Infinity'), n < 0 && (e = '-' + e))
            : (e = 'NaN')
          : ((e = J(i.c)),
            null == t
              ? (e = s <= g || s >= y ? et(e, s) : it(e, s, '0'))
              : (Y(t, 2, S.length, 'Base'),
                (e = r(it(e, s, '0'), 10, t, n, !0))),
            n < 0 && i.c[0] && (e = '-' + e)),
        e
      )
    }),
    (f.valueOf = f.toJSON =
      function () {
        var t,
          e = this,
          i = e.e
        return null === i
          ? e.toString()
          : ((t = J(e.c)),
            (t = i <= g || i >= y ? et(t, i) : it(t, i, '0')),
            e.s < 0 ? '-' + t : t)
      }),
    (f._isBigNumber = !0),
    null != e && T.set(e),
    T
  )
})()
async function nt(t, e) {
  const i = new rt(await t.eth.getGasPrice())
  return e && e.gasFeeMultiplier
    ? i
        .multipliedBy(e.gasFeeMultiplier)
        .integerValue(rt.ROUND_DOWN)
        .toString(10)
    : i.toString(10)
}
function st(t, e) {
  return (
    e &&
      ((t.transactionBlockTimeout = e.transactionBlockTimeout),
      (t.transactionConfirmationBlocks = e.transactionConfirmationBlocks),
      (t.transactionPollingTimeout = e.transactionPollingTimeout)),
    t
  )
}
function at(t) {
  return void 0 !== t.id
}
async function ot(t, e) {
  if (at(t)) return { did: t.id, ddo: t }
  {
    const i = await e.assets.resolve(t)
    return { did: i.id, ddo: i }
  }
}
var ut = {
  nouns: [
    'Crab',
    'Fish',
    'Seal',
    'Octopus',
    'Shark',
    'Seahorse',
    'Walrus',
    'Starfish',
    'Whale',
    'Orca',
    'Penguin',
    'Jellyfish',
    'Squid',
    'Lobster',
    'Pelican',
    'Shrimp',
    'Oyster',
    'Clam',
    'Seagull',
    'Dolphin',
    'Shell',
    'Cormorant',
    'Otter',
    'Anemone',
    'Turtle',
    'Coral',
    'Ray',
    'Barracuda',
    'Krill',
    'Anchovy',
    'Angelfish',
    'Barnacle',
    'Clownfish',
    'Cod',
    'Cuttlefish',
    'Eel',
    'Fugu',
    'Herring',
    'Haddock',
    'Ling',
    'Mackerel',
    'Manatee',
    'Narwhal',
    'Nautilus',
    'Plankton',
    'Porpoise',
    'Prawn',
    'Pufferfish',
    'Swordfish',
    'Tuna'
  ],
  adjectives: [
    'adamant',
    'adroit',
    'amatory',
    'ambitious',
    'amused',
    'animistic',
    'antic',
    'arcadian',
    'artistic',
    'astonishing',
    'astounding',
    'baleful',
    'bellicose',
    'bilious',
    'blissful',
    'boorish',
    'brave',
    'breathtaking',
    'brilliant',
    'calamitous',
    'caustic',
    'cerulean',
    'clever',
    'charming',
    'comely',
    'competent',
    'concomitant',
    'confident',
    'contumacious',
    'corpulent',
    'crapulous',
    'creative',
    'dazzling',
    'dedicated',
    'defamatory',
    'delighted',
    'delightful',
    'determined',
    'didactic',
    'dilatory',
    'dowdy',
    'efficacious',
    'effulgent',
    'egregious',
    'empowered',
    'endemic',
    'enthusiastic',
    'equanimous',
    'exceptional',
    'execrable',
    'fabulous',
    'fantastic',
    'fastidious',
    'feckless',
    'fecund',
    'friable',
    'fulsome',
    'garrulous',
    'generous',
    'gentle',
    'guileless',
    'gustatory',
    'heuristic',
    'histrionic',
    'hubristic',
    'incendiary',
    'incredible',
    'insidious',
    'insolent',
    'inspired',
    'intransigent',
    'inveterate',
    'invidious',
    'invigorated',
    'irksome',
    'jejune',
    'juicy',
    'jocular',
    'joyful',
    'judicious',
    'kind',
    'lachrymose',
    'limpid',
    'loquacious',
    'lovely',
    'luminous',
    'mannered',
    'marvelous',
    'mendacious',
    'meretricious',
    'minatory',
    'mordant',
    'motivated',
    'munificent',
    'nefarious',
    'noxious',
    'obtuse',
    'optimistic',
    'parsimonious',
    'pendulous',
    'pernicious',
    'pervasive',
    'petulant',
    'passionate',
    'phenomenal',
    'platitudinous',
    'pleasant',
    'powerful',
    'precipitate',
    'propitious',
    'puckish',
    'querulous',
    'quiescent',
    'rebarbative',
    'recalcitant',
    'redolent',
    'rhadamanthine',
    'risible',
    'ruminative',
    'sagacious',
    'salubrious',
    'sartorial',
    'sclerotic',
    'serpentine',
    'smart',
    'spasmodic',
    'strident',
    'stunning',
    'stupendous',
    'taciturn',
    'tactful',
    'tasty',
    'tenacious',
    'tremendous',
    'tremulous',
    'trenchant',
    'turbulent',
    'turgid',
    'ubiquitous',
    'uxorious',
    'verdant',
    'vibrant',
    'voluble',
    'voracious',
    'wheedling',
    'withering',
    'wonderful',
    'zealous'
  ]
}
class ht {
  constructor() {
    ;(this._ocean = void 0),
      (this._web3 = void 0),
      (this._config = void 0),
      (this._logger = void 0)
  }
  get ocean() {
    return this._ocean || B.error('Ocean instance is not defined.'), this._ocean
  }
  get web3() {
    return this._web3 || B.error('Web3 instance is not defined.'), this._web3
  }
  get config() {
    return (
      this._config || B.error('Config instance is not defined.'), this._config
    )
  }
  get logger() {
    return B
  }
  get instanceConfig() {
    const { ocean: t, web3: e, config: i, logger: r } = this
    return { ocean: t, web3: e, config: i, logger: r }
  }
  static async getInstance(t) {
    B.warn('getInstance() methods has needs to be added to child class.')
  }
  static setInstanceConfig(t, { ocean: e, config: i, web3: r, logger: n }) {
    ;(t._ocean = e), (t._config = i), (t._web3 = r), (t._logger = n)
  }
  setInstanceConfig(t) {
    ht.setInstanceConfig(this, t)
  }
}
class dt extends ht {
  constructor(t = '0x0', e) {
    super(),
      (this.id = void 0),
      (this.password = void 0),
      (this.token = void 0),
      (this.id = t),
      e && this.setInstanceConfig(e)
  }
  getId() {
    return this.id
  }
  setId(t) {
    this.id = t
  }
  setPassword(t) {
    this.password = t
  }
  getPassword() {
    return this.password
  }
  async getTokenBalance(e) {
    if (null === e) return null
    const i = [
      {
        constant: !0,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        payable: !1,
        stateMutability: 'view',
        type: 'function'
      }
    ]
    let r = null
    const n = await this.getTokenDecimals(e)
    try {
      const s = new this.web3.eth.Contract(i, e, { from: this.id }),
        a = await s.methods.balanceOf(this.id).call()
      r = new t(a).div(10 ** n).toString()
    } catch (t) {
      this.logger.error(`ERROR: Failed to get the balance: ${t.message}`)
    }
    return r
  }
  async getTokenDecimals(t) {
    let e = 18
    if (null === t) return e
    const i = [
      {
        constant: !0,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function'
      }
    ]
    try {
      const r = new this.web3.eth.Contract(i, t, { from: this.id })
      e = await r.methods.decimals().call()
    } catch (t) {
      this.logger.error(`ERROR: Failed to get decimals : ${t.message}`)
    }
    return e
  }
  async getOceanBalance() {
    return this.getTokenBalance(this.config.oceanTokenAddress)
  }
  async getTokenSymbol(t) {
    return ''
  }
  async getEtherBalance() {
    const t = await this.web3.eth.getBalance(this.id, 'latest')
    return this.web3.utils.fromWei(t)
  }
}
class lt {
  static parse(t) {
    let e
    t instanceof lt && (t = t.getDid())
    const i = t.match(/^did:op:([a-f0-9]{40})$/i)
    if ((i && (e = new lt(i[1])), !e))
      throw new Error(`Parsing DID failed, ${t}`)
    return e
  }
  static generate(t) {
    return new lt(O(t))
  }
  constructor(t) {
    ;(this.id = void 0), (this.id = t)
  }
  getDid() {
    return `did:op:${this.id}`
  }
  getId() {
    return this.id
  }
}
class ft extends ht {
  static async getInstance(t) {
    const e = new ft()
    return e.setInstanceConfig(t), e
  }
  async list() {
    const t = (await this.web3.eth.getAccounts()).map(
      (t) => new dt(t, this.instanceConfig)
    )
    return Promise.all(t)
  }
  getTokenBalance(t, e) {
    return e.getTokenBalance(t)
  }
  getOceanBalance(t) {
    return t.getOceanBalance()
  }
  getEtherBalance(t) {
    return t.getEtherBalance()
  }
}
class ct {
  static getWeb3(t = {}) {
    return new e(
      t.web3Provider ||
        e.givenProvider ||
        new e.providers.HttpProvider(t.nodeUri)
    )
  }
}
class pt {
  static serialize(t) {
    return JSON.stringify(t, null, 2)
  }
  static deserialize(t) {
    const e = JSON.parse(t)
    return new pt(e)
  }
  constructor(t = {}) {
    ;(this['@context'] = 'https://w3id.org/did/v1'),
      (this.id = null),
      (this.created = void 0),
      (this.updated = void 0),
      (this.dataToken = void 0),
      (this.publicKey = []),
      (this.authentication = []),
      (this.service = []),
      (this.proof = void 0),
      (this.price = void 0),
      (this.isInPurgatory = void 0),
      (this.purgatoryData = void 0),
      (this.dataTokenInfo = void 0),
      (this.credentials = void 0),
      (this.chainId = void 0),
      (this.event = void 0),
      Object.assign(this, t, {
        created:
          (t && t.created) || new Date().toISOString().replace(/\.[0-9]{3}/, '')
      })
  }
  shortId() {
    return this.id.replace('did:op:', '')
  }
  findServiceById(t) {
    if (isNaN(t)) throw new Error('index is not set')
    const e = this.service.find((e) => e.index === t)
    return e
  }
  findServiceByType(t) {
    if (!t) throw new Error('serviceType not set')
    return this.service.find((e) => e.type === t)
  }
  getChecksum() {
    const { attributes: t } = this.findServiceByType('metadata'),
      { files: e, name: i, author: r, license: n } = t.main,
      s = [
        ...(e || []).map(({ checksum: t }) => t).filter((t) => !!t),
        i,
        r,
        n,
        this.id
      ]
    return ct
      .getWeb3()
      .utils.sha3(s.join(''))
      .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
  }
  async addProof(t, e, i) {
    if (this.proof) throw new Error('Proof already exists')
    this.proof = {
      created: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
      creator: e,
      type: 'AddressHash',
      signatureValue: ct
        .getWeb3()
        .utils.sha3(e)
        .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
    }
  }
}
function mt(t) {
  if (!Number.isInteger(t))
    throw new TypeError('Expected an integer, got ' + typeof t)
  const e = new WeakMap(),
    i = new n(),
    r = setTimeout(() => {
      i.abort()
    }, t)
  return e.set(i.signal, r), i.signal
}
class gt {
  constructor(t, e) {
    ;(this.logger = void 0),
      (this.requestTimeout = 5e3),
      (this.logger = t),
      (this.requestTimeout = e || this.requestTimeout)
  }
  post(t, e) {
    return this.postWithHeaders(t, e, { 'Content-type': 'application/json' })
  }
  postWithOctet(t, e) {
    return this.postWithHeaders(t, e, {
      'Content-type': 'application/octet-stream'
    })
  }
  postWithHeaders(t, e, i) {
    return this.fetch(
      t,
      null != e
        ? {
            method: 'POST',
            body: e,
            headers: i,
            signal: mt(this.requestTimeout)
          }
        : { method: 'POST', signal: mt(this.requestTimeout) }
    )
  }
  get(t) {
    return this.fetch(t, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      signal: mt(this.requestTimeout)
    })
  }
  put(t, e) {
    return this.fetch(
      t,
      null != e
        ? {
            method: 'PUT',
            body: e,
            headers: { 'Content-type': 'application/json' },
            signal: mt(this.requestTimeout)
          }
        : {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            signal: mt(this.requestTimeout)
          }
    )
  }
  delete(t, e) {
    return this.fetch(
      t,
      null != e
        ? {
            method: 'DELETE',
            body: e,
            headers: { 'Content-type': 'application/json' },
            signal: mt(this.requestTimeout)
          }
        : {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            signal: mt(this.requestTimeout)
          }
    )
  }
  async downloadFile(t, e, n) {
    const s = await this.get(t)
    if (!s.ok) throw new Error('Response error.')
    let a
    try {
      a = s.headers
        .get('content-disposition')
        .match(/attachment;filename=(.+)/)[1]
    } catch (e) {
      try {
        a = t.split('/').pop()
      } catch (t) {
        a = `file${n}`
      }
    }
    if (e)
      return (
        await new Promise(async (t, r) => {
          i.mkdirSync(e, { recursive: !0 })
          const n = i.createWriteStream(`${e}${a}`)
          s.body.pipe(n), s.body.on('error', r), n.on('finish', t)
        }),
        e
      )
    r(await s.arrayBuffer(), a)
  }
  async downloadFileBrowser(t) {
    const e = document.createElement('a')
    ;(e.download = ''), (e.href = t), e.click()
  }
  async fetch(t, e) {
    const i = await s(t, e)
    if (!i.ok)
      throw (
        (this.logger.error(`Error requesting [${e.method}] ${t}`),
        this.logger.error(`Response message: \n${await i.text()}`),
        i)
      )
    return i
  }
}
class yt extends ht {
  constructor(...t) {
    super(...t),
      (this.nonce = void 0),
      (this.baseUrl = void 0),
      (this.servicesEndpoints = void 0),
      (this.computeAddress = void 0),
      (this.providerAddress = void 0),
      (this.providerVersion = void 0),
      (this.computeLimits = void 0)
  }
  static async getInstance(t) {
    const e = new yt()
    return (
      e.setInstanceConfig(t),
      (e.nonce = '0'),
      await e.setBaseUrl(t.config.providerUri),
      e
    )
  }
  async setBaseUrl(t) {
    return (
      (this.baseUrl = t),
      (this.servicesEndpoints = await this.getServiceEndpoints()),
      !0
    )
  }
  get url() {
    return this.baseUrl
  }
  async getServiceEndpoints() {
    const t = []
    try {
      const e = await (await this.ocean.utils.fetch.get(this.url)).json()
      ;(this.providerAddress = e.providerAddress),
        'computeAddress' in e && (this.computeAddress = e.computeAddress),
        'version' in e && (this.providerVersion = e.version),
        'computeLimits' in e && (this.computeLimits = e.computeLimits)
      for (const i in e.serviceEndpoints)
        t.push({
          serviceName: i,
          method: e.serviceEndpoints[i][0],
          urlPath: this.url + e.serviceEndpoints[i][1]
        })
      return t
    } catch (t) {
      return this.logger.error('Finding the service endpoints failed:', t), null
    }
  }
  getEndpointURL(t) {
    return this.servicesEndpoints
      ? this.servicesEndpoints.find((e) => e.serviceName === t)
      : null
  }
  async createSignature(t, e) {
    return await this.ocean.utils.signature.signText(O(e), t.getId())
  }
  async createHashSignature(t, e) {
    return await this.ocean.utils.signature.signWithHash(e, t.getId())
  }
  async encrypt(t, e, i) {
    await this.getNonce(i.getId())
    const r = {
        documentId: t,
        document: JSON.stringify(e),
        publisherAddress: i.getId()
      },
      n = this.getEncryptEndpoint() ? this.getEncryptEndpoint().urlPath : null
    if (!n) return null
    try {
      const t = await this.ocean.utils.fetch.post(
        n,
        decodeURI(JSON.stringify(r))
      )
      return (await t.json()).encryptedDocument
    } catch (t) {
      throw (this.logger.error(t), new Error('HTTP request failed'))
    }
  }
  async fileinfo(t) {
    const e = { url: t },
      i = [],
      r = this.getFileinfoEndpoint() ? this.getFileinfoEndpoint().urlPath : null
    if (!r) return null
    try {
      const t = await this.ocean.utils.fetch.post(r, JSON.stringify(e)),
        n = await t.json()
      for (const t of n) i.push(t)
      return i
    } catch (t) {
      return null
    }
  }
  async isFileConsumable(t, e) {
    const i = { did: t.getDid() },
      r = await this.ocean.metadataCache.retrieveDDO(t)
    if (!r) return !1
    const n = r.findServiceById(e)
    if (!n) return !1
    const s = n.serviceEndpoint + '/api/v1/services/fileinfo'
    try {
      const t = await this.ocean.utils.fetch.post(s, JSON.stringify(i))
      return (await t.json())[0].valid
    } catch (t) {
      return !1
    }
  }
  async getNonce(t) {
    const e = this.getNonceEndpoint() ? this.getNonceEndpoint().urlPath : null
    if (!e) return null
    try {
      const i = await this.ocean.utils.fetch.get(e + `?userAddress=${t}`)
      return (this.nonce = String((await i.json()).nonce)), this.nonce
    } catch (t) {
      throw (this.logger.error(t), new Error('HTTP request failed'))
    }
  }
  async initialize(t, e, i, r, n) {
    const { did: s, ddo: a } = await ot(t, this.ocean)
    let o = this.getInitializeEndpoint()
      ? this.getInitializeEndpoint().urlPath
      : null
    if (!o) return null
    ;(o += `?documentId=${s}`),
      (o += `&serviceId=${e}`),
      (o += `&serviceType=${i}`),
      (o += `&dataToken=${a.dataToken}`),
      (o += `&consumerAddress=${r}`),
      n && (o += '&userdata=' + encodeURI(JSON.stringify(n)))
    try {
      const t = await this.ocean.utils.fetch.get(o)
      return await t.text()
    } catch (t) {
      throw (
        (this.logger.error(t),
        new Error('Asset URL not found or not available.'))
      )
    }
  }
  async download(t, e, i, r, n, s, a, o, u = -1, h) {
    await this.getNonce(a.getId())
    const d = await this.createSignature(a, t + this.nonce),
      l = this.getDownloadEndpoint() ? this.getDownloadEndpoint().urlPath : null
    if (!l) return null
    const f = o
      .filter((t, e) => -1 === u || e === u)
      .map(async ({ index: o }) => {
        let u = l
        ;(u += `?fileIndex=${o}`),
          (u += `&documentId=${t}`),
          (u += `&serviceId=${n}`),
          (u += `&serviceType=${r}`),
          (u += `&dataToken=${i}`),
          (u += `&transferTxId=${e}`),
          (u += `&consumerAddress=${a.getId()}`),
          (u += `&signature=${d}`),
          h && (u += '&userdata=' + encodeURI(JSON.stringify(h)))
        try {
          s
            ? await this.ocean.utils.fetch.downloadFile(u, s, o)
            : await this.ocean.utils.fetch.downloadFileBrowser(u)
        } catch (t) {
          throw (
            (this.logger.error('Error consuming assets'),
            this.logger.error(t),
            t)
          )
        }
      })
    return await Promise.all(f), s
  }
  async computeStart(t, e, i, r, n, s, a, o, u, h) {
    const d = e.getId()
    await this.getNonce(e.getId())
    const l = Object()
    l.documentId = O(t)
    let f = d
    ;(f += (t && `${O(t)}`) || ''), (f += this.nonce)
    const c = await this.createHashSignature(e, f)
    ;(l.signature = c),
      r && (l.output = r),
      i.did && (l.algorithmDid = i.did),
      i.meta && (l.algorithmMeta = i.meta),
      (l.consumerAddress = d),
      n && (l.transferTxId = n),
      i.transferTxId && (l.algorithmTransferTxId = i.transferTxId),
      i.dataToken && (l.algorithmDataToken = i.dataToken),
      s && (l.serviceId = s),
      a && (l.serviceType = a),
      o && (l.dataToken = o),
      u && (l.additionalInputs = u),
      h && (l.userdata = h),
      i.algoCustomParameters && (l.algocustomdata = i.algoCustomParameters),
      i.userCustomParameters && (l.algouserdata = i.userCustomParameters)
    const p = this.getComputeStartEndpoint()
      ? this.getComputeStartEndpoint().urlPath
      : null
    if (!p) return null
    try {
      const t = await this.ocean.utils.fetch.post(p, JSON.stringify(l))
      return null != t && t.ok
        ? await t.json()
        : (console.error('Compute start failed:', t.status, t.statusText),
          this.logger.error('Payload was:', l),
          null)
    } catch (t) {
      return (
        this.logger.error('Compute start failed:'),
        this.logger.error(t),
        this.logger.error('Payload was:', l),
        null
      )
    }
  }
  async computeStop(t, e, i) {
    const r = e.getId()
    await this.getNonce(e.getId())
    const n = Object()
    n.documentId = O(t)
    let s = r
    ;(s += i || ''), (s += (t && `${O(t)}`) || ''), (s += this.nonce)
    const a = await this.createHashSignature(e, s)
    ;(n.signature = a), (n.jobId = i), (n.consumerAddress = r)
    const o = this.getComputeStopEndpoint()
      ? this.getComputeStopEndpoint().urlPath
      : null
    if (!o) return null
    try {
      const t = await this.ocean.utils.fetch.put(o, JSON.stringify(n))
      return null != t && t.ok
        ? await t.json()
        : (this.logger.error('Compute stop failed:', t.status, t.statusText),
          this.logger.error('Payload was:', n),
          null)
    } catch (t) {
      return (
        this.logger.error('Compute stop failed:'),
        this.logger.error(t),
        this.logger.error('Payload was:', n),
        null
      )
    }
  }
  async computeDelete(t, e, i) {
    const r = e.getId()
    await this.getNonce(e.getId())
    const n = Object()
    n.documentId = O(t)
    let s = r
    ;(s += i || ''), (s += (t && `${O(t)}`) || ''), (s += this.nonce)
    const a = await this.createHashSignature(e, s)
    ;(n.signature = a), (n.jobId = i), (n.consumerAddress = r)
    const o = this.getComputeDeleteEndpoint()
      ? this.getComputeDeleteEndpoint().urlPath
      : null
    if (!o) return null
    try {
      const t = await this.ocean.utils.fetch.delete(o, JSON.stringify(n))
      return null != t && t.ok
        ? await t.json()
        : (this.logger.error(
            'Delete compute job failed:',
            t.status,
            t.statusText
          ),
          this.logger.error('Payload was:', n),
          null)
    } catch (t) {
      return (
        this.logger.error('Delete compute job failed:'),
        this.logger.error(t),
        this.logger.error('Payload was:', n),
        null
      )
    }
  }
  async computeStatus(t, e, i, r) {
    const n = e.getId()
    await this.getNonce(e.getId())
    let s = '?documentId=' + O(t)
    ;(s += (i && `&jobId=${i}`) || ''),
      (s += `&consumerAddress=${n}`),
      (s += (r && `&transferTxId=${r}`) || '')
    const a = this.getComputeStatusEndpoint()
      ? this.getComputeStatusEndpoint().urlPath
      : null
    if (!a) return null
    try {
      const t = await this.ocean.utils.fetch.get(a + s)
      return null != t && t.ok
        ? await t.json()
        : (this.logger.error(
            'Get compute status failed:',
            t.status,
            t.statusText
          ),
          null)
    } catch (t) {
      return (
        this.logger.error('Get compute status failed'),
        this.logger.error(t),
        null
      )
    }
  }
  async computeResult(t, e, i, r) {
    await this.getNonce(r.getId())
    let n = r.getId()
    ;(n += t), (n += String(e)), (n += this.nonce)
    const s = await this.createHashSignature(r, n),
      a = this.getComputeResultEndpoint()
        ? this.getComputeResultEndpoint().urlPath
        : null
    if (!a) return null
    let o = a
    ;(o += `?jobId=${t}`),
      (o += `&index=${String(e)}`),
      (o += `&signature=${s}`),
      (o += `&consumerAddress=${r.getId()}`)
    try {
      i
        ? await this.ocean.utils.fetch.downloadFile(o, i, e)
        : await this.ocean.utils.fetch.downloadFileBrowser(o)
    } catch (t) {
      throw (
        (this.logger.error('Error getting job result'), this.logger.error(t), t)
      )
    }
    return i
  }
  getInitializeEndpoint() {
    return this.getEndpointURL('initialize')
  }
  getNonceEndpoint() {
    return this.getEndpointURL('nonce')
  }
  getEncryptEndpoint() {
    return this.getEndpointURL('encrypt')
  }
  getFileinfoEndpoint() {
    return this.getEndpointURL('fileinfo')
  }
  getComputeStartEndpoint() {
    return this.getEndpointURL('computeStart')
  }
  getComputeStopEndpoint() {
    return this.getEndpointURL('computeStop')
  }
  getComputeStatusEndpoint() {
    return this.getEndpointURL('computeStatus')
  }
  getComputeDeleteEndpoint() {
    return this.getEndpointURL('computeDelete')
  }
  getComputeResultEndpoint() {
    return this.getEndpointURL('computeResult')
  }
  getDownloadEndpoint() {
    return this.getEndpointURL('download')
  }
  async isValidProvider(t) {
    try {
      const e = await this.ocean.utils.fetch.get(t)
      if (null != e && e.ok) {
        const t = await e.json()
        if (t && t.providerAddress) return !0
      }
      return !1
    } catch (t) {
      return this.logger.error(`Error validating provider: ${t.message}`), !1
    }
  }
  async getAssetURL(t, e, i) {
    const r = t.getId(),
      n = await this.getNonce(r)
    let a
    try {
      a = await this.createSignature(t, e + n)
    } catch (t) {
      console.log('error', t)
    }
    let o = this.getEndpointURL('assetUrls')
      ? this.getEndpointURL('encrypt').urlPath
      : null
    null === o && (o = 'http://localhost:8030/api/v1/services/assetUrls')
    let u = o
    ;(u += `?documentId=${e}`),
      (u += `&signature=${a}`),
      (u += `&serviceId=${i}`),
      (u += `&nonce=${n}`),
      (u += `&publisherAddress=${r}`)
    try {
      const t = await s(u, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      return JSON.parse(await t.text())[0]
    } catch (t) {
      throw (console.error(t), new Error('HTTP request failed'))
    }
  }
}
var bt =
  'undefined' != typeof globalThis
    ? globalThis
    : 'undefined' != typeof window
    ? window
    : 'undefined' != typeof global
    ? global
    : 'undefined' != typeof self
    ? self
    : {}
function wt(t) {
  var e = { exports: {} }
  return t(e, e.exports), e.exports
}
function vt(t) {
  throw new Error(
    'Could not dynamically require "' +
      t +
      '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.'
  )
}
var Mt = wt(function (t) {
    !(function (t, e) {
      function i(t, e) {
        if (!t) throw new Error(e || 'Assertion failed')
      }
      function r(t, e) {
        t.super_ = e
        var i = function () {}
        ;(i.prototype = e.prototype),
          (t.prototype = new i()),
          (t.prototype.constructor = t)
      }
      function n(t, e, i) {
        if (n.isBN(t)) return t
        ;(this.negative = 0),
          (this.words = null),
          (this.length = 0),
          (this.red = null),
          null !== t &&
            (('le' !== e && 'be' !== e) || ((i = e), (e = 10)),
            this._init(t || 0, e || 10, i || 'be'))
      }
      var s
      'object' == typeof t ? (t.exports = n) : (e.BN = n),
        (n.BN = n),
        (n.wordSize = 26)
      try {
        s = vt('buffer').Buffer
      } catch (t) {}
      function a(t, e, i) {
        for (var r = 0, n = Math.min(t.length, i), s = e; s < n; s++) {
          var a = t.charCodeAt(s) - 48
          ;(r <<= 4),
            (r |=
              a >= 49 && a <= 54
                ? a - 49 + 10
                : a >= 17 && a <= 22
                ? a - 17 + 10
                : 15 & a)
        }
        return r
      }
      function o(t, e, i, r) {
        for (var n = 0, s = Math.min(t.length, i), a = e; a < s; a++) {
          var o = t.charCodeAt(a) - 48
          ;(n *= r), (n += o >= 49 ? o - 49 + 10 : o >= 17 ? o - 17 + 10 : o)
        }
        return n
      }
      ;(n.isBN = function (t) {
        return (
          t instanceof n ||
          (null !== t &&
            'object' == typeof t &&
            t.constructor.wordSize === n.wordSize &&
            Array.isArray(t.words))
        )
      }),
        (n.max = function (t, e) {
          return t.cmp(e) > 0 ? t : e
        }),
        (n.min = function (t, e) {
          return t.cmp(e) < 0 ? t : e
        }),
        (n.prototype._init = function (t, e, r) {
          if ('number' == typeof t) return this._initNumber(t, e, r)
          if ('object' == typeof t) return this._initArray(t, e, r)
          'hex' === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36)
          var n = 0
          '-' === (t = t.toString().replace(/\s+/g, ''))[0] && n++,
            16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n),
            '-' === t[0] && (this.negative = 1),
            this.strip(),
            'le' === r && this._initArray(this.toArray(), e, r)
        }),
        (n.prototype._initNumber = function (t, e, r) {
          t < 0 && ((this.negative = 1), (t = -t)),
            t < 67108864
              ? ((this.words = [67108863 & t]), (this.length = 1))
              : t < 4503599627370496
              ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                (this.length = 2))
              : (i(t < 9007199254740992),
                (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                (this.length = 3)),
            'le' === r && this._initArray(this.toArray(), e, r)
        }),
        (n.prototype._initArray = function (t, e, r) {
          if ((i('number' == typeof t.length), t.length <= 0))
            return (this.words = [0]), (this.length = 1), this
          ;(this.length = Math.ceil(t.length / 3)),
            (this.words = new Array(this.length))
          for (var n = 0; n < this.length; n++) this.words[n] = 0
          var s,
            a,
            o = 0
          if ('be' === r)
            for (n = t.length - 1, s = 0; n >= 0; n -= 3)
              (this.words[s] |=
                ((a = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)) << o) &
                67108863),
                (this.words[s + 1] = (a >>> (26 - o)) & 67108863),
                (o += 24) >= 26 && ((o -= 26), s++)
          else if ('le' === r)
            for (n = 0, s = 0; n < t.length; n += 3)
              (this.words[s] |=
                ((a = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) << o) &
                67108863),
                (this.words[s + 1] = (a >>> (26 - o)) & 67108863),
                (o += 24) >= 26 && ((o -= 26), s++)
          return this.strip()
        }),
        (n.prototype._parseHex = function (t, e) {
          ;(this.length = Math.ceil((t.length - e) / 6)),
            (this.words = new Array(this.length))
          for (var i = 0; i < this.length; i++) this.words[i] = 0
          var r,
            n,
            s = 0
          for (i = t.length - 6, r = 0; i >= e; i -= 6)
            (n = a(t, i, i + 6)),
              (this.words[r] |= (n << s) & 67108863),
              (this.words[r + 1] |= (n >>> (26 - s)) & 4194303),
              (s += 24) >= 26 && ((s -= 26), r++)
          i + 6 !== e &&
            ((n = a(t, e, i + 6)),
            (this.words[r] |= (n << s) & 67108863),
            (this.words[r + 1] |= (n >>> (26 - s)) & 4194303)),
            this.strip()
        }),
        (n.prototype._parseBase = function (t, e, i) {
          ;(this.words = [0]), (this.length = 1)
          for (var r = 0, n = 1; n <= 67108863; n *= e) r++
          r--, (n = (n / e) | 0)
          for (
            var s = t.length - i,
              a = s % r,
              u = Math.min(s, s - a) + i,
              h = 0,
              d = i;
            d < u;
            d += r
          )
            (h = o(t, d, d + r, e)),
              this.imuln(n),
              this.words[0] + h < 67108864
                ? (this.words[0] += h)
                : this._iaddn(h)
          if (0 !== a) {
            var l = 1
            for (h = o(t, d, t.length, e), d = 0; d < a; d++) l *= e
            this.imuln(l),
              this.words[0] + h < 67108864
                ? (this.words[0] += h)
                : this._iaddn(h)
          }
        }),
        (n.prototype.copy = function (t) {
          t.words = new Array(this.length)
          for (var e = 0; e < this.length; e++) t.words[e] = this.words[e]
          ;(t.length = this.length),
            (t.negative = this.negative),
            (t.red = this.red)
        }),
        (n.prototype.clone = function () {
          var t = new n(null)
          return this.copy(t), t
        }),
        (n.prototype._expand = function (t) {
          for (; this.length < t; ) this.words[this.length++] = 0
          return this
        }),
        (n.prototype.strip = function () {
          for (; this.length > 1 && 0 === this.words[this.length - 1]; )
            this.length--
          return this._normSign()
        }),
        (n.prototype._normSign = function () {
          return (
            1 === this.length && 0 === this.words[0] && (this.negative = 0),
            this
          )
        }),
        (n.prototype.inspect = function () {
          return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
        })
      var u = [
          '',
          '0',
          '00',
          '000',
          '0000',
          '00000',
          '000000',
          '0000000',
          '00000000',
          '000000000',
          '0000000000',
          '00000000000',
          '000000000000',
          '0000000000000',
          '00000000000000',
          '000000000000000',
          '0000000000000000',
          '00000000000000000',
          '000000000000000000',
          '0000000000000000000',
          '00000000000000000000',
          '000000000000000000000',
          '0000000000000000000000',
          '00000000000000000000000',
          '000000000000000000000000',
          '0000000000000000000000000'
        ],
        h = [
          0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        d = [
          0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
          16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
          11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
          5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
          20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
          60466176
        ]
      function l(t, e, i) {
        i.negative = e.negative ^ t.negative
        var r = (t.length + e.length) | 0
        ;(i.length = r), (r = (r - 1) | 0)
        var n = 0 | t.words[0],
          s = 0 | e.words[0],
          a = n * s,
          o = (a / 67108864) | 0
        i.words[0] = 67108863 & a
        for (var u = 1; u < r; u++) {
          for (
            var h = o >>> 26,
              d = 67108863 & o,
              l = Math.min(u, e.length - 1),
              f = Math.max(0, u - t.length + 1);
            f <= l;
            f++
          )
            (h +=
              ((a = (n = 0 | t.words[(u - f) | 0]) * (s = 0 | e.words[f]) + d) /
                67108864) |
              0),
              (d = 67108863 & a)
          ;(i.words[u] = 0 | d), (o = 0 | h)
        }
        return 0 !== o ? (i.words[u] = 0 | o) : i.length--, i.strip()
      }
      ;(n.prototype.toString = function (t, e) {
        var r
        if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
          r = ''
          for (var n = 0, s = 0, a = 0; a < this.length; a++) {
            var o = this.words[a],
              l = (16777215 & ((o << n) | s)).toString(16)
            ;(r =
              0 != (s = (o >>> (24 - n)) & 16777215) || a !== this.length - 1
                ? u[6 - l.length] + l + r
                : l + r),
              (n += 2) >= 26 && ((n -= 26), a--)
          }
          for (0 !== s && (r = s.toString(16) + r); r.length % e != 0; )
            r = '0' + r
          return 0 !== this.negative && (r = '-' + r), r
        }
        if (t === (0 | t) && t >= 2 && t <= 36) {
          var f = h[t],
            c = d[t]
          r = ''
          var p = this.clone()
          for (p.negative = 0; !p.isZero(); ) {
            var m = p.modn(c).toString(t)
            r = (p = p.idivn(c)).isZero() ? m + r : u[f - m.length] + m + r
          }
          for (this.isZero() && (r = '0' + r); r.length % e != 0; ) r = '0' + r
          return 0 !== this.negative && (r = '-' + r), r
        }
        i(!1, 'Base should be between 2 and 36')
      }),
        (n.prototype.toNumber = function () {
          var t = this.words[0]
          return (
            2 === this.length
              ? (t += 67108864 * this.words[1])
              : 3 === this.length && 1 === this.words[2]
              ? (t += 4503599627370496 + 67108864 * this.words[1])
              : this.length > 2 &&
                i(!1, 'Number can only safely store up to 53 bits'),
            0 !== this.negative ? -t : t
          )
        }),
        (n.prototype.toJSON = function () {
          return this.toString(16)
        }),
        (n.prototype.toBuffer = function (t, e) {
          return i(void 0 !== s), this.toArrayLike(s, t, e)
        }),
        (n.prototype.toArray = function (t, e) {
          return this.toArrayLike(Array, t, e)
        }),
        (n.prototype.toArrayLike = function (t, e, r) {
          var n = this.byteLength(),
            s = r || Math.max(1, n)
          i(n <= s, 'byte array longer than desired length'),
            i(s > 0, 'Requested array length <= 0'),
            this.strip()
          var a,
            o,
            u = 'le' === e,
            h = new t(s),
            d = this.clone()
          if (u) {
            for (o = 0; !d.isZero(); o++)
              (a = d.andln(255)), d.iushrn(8), (h[o] = a)
            for (; o < s; o++) h[o] = 0
          } else {
            for (o = 0; o < s - n; o++) h[o] = 0
            for (o = 0; !d.isZero(); o++)
              (a = d.andln(255)), d.iushrn(8), (h[s - o - 1] = a)
          }
          return h
        }),
        (n.prototype._countBits = Math.clz32
          ? function (t) {
              return 32 - Math.clz32(t)
            }
          : function (t) {
              var e = t,
                i = 0
              return (
                e >= 4096 && ((i += 13), (e >>>= 13)),
                e >= 64 && ((i += 7), (e >>>= 7)),
                e >= 8 && ((i += 4), (e >>>= 4)),
                e >= 2 && ((i += 2), (e >>>= 2)),
                i + e
              )
            }),
        (n.prototype._zeroBits = function (t) {
          if (0 === t) return 26
          var e = t,
            i = 0
          return (
            0 == (8191 & e) && ((i += 13), (e >>>= 13)),
            0 == (127 & e) && ((i += 7), (e >>>= 7)),
            0 == (15 & e) && ((i += 4), (e >>>= 4)),
            0 == (3 & e) && ((i += 2), (e >>>= 2)),
            0 == (1 & e) && i++,
            i
          )
        }),
        (n.prototype.bitLength = function () {
          var t = this._countBits(this.words[this.length - 1])
          return 26 * (this.length - 1) + t
        }),
        (n.prototype.zeroBits = function () {
          if (this.isZero()) return 0
          for (var t = 0, e = 0; e < this.length; e++) {
            var i = this._zeroBits(this.words[e])
            if (((t += i), 26 !== i)) break
          }
          return t
        }),
        (n.prototype.byteLength = function () {
          return Math.ceil(this.bitLength() / 8)
        }),
        (n.prototype.toTwos = function (t) {
          return 0 !== this.negative
            ? this.abs().inotn(t).iaddn(1)
            : this.clone()
        }),
        (n.prototype.fromTwos = function (t) {
          return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
        }),
        (n.prototype.isNeg = function () {
          return 0 !== this.negative
        }),
        (n.prototype.neg = function () {
          return this.clone().ineg()
        }),
        (n.prototype.ineg = function () {
          return this.isZero() || (this.negative ^= 1), this
        }),
        (n.prototype.iuor = function (t) {
          for (; this.length < t.length; ) this.words[this.length++] = 0
          for (var e = 0; e < t.length; e++)
            this.words[e] = this.words[e] | t.words[e]
          return this.strip()
        }),
        (n.prototype.ior = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuor(t)
        }),
        (n.prototype.or = function (t) {
          return this.length > t.length
            ? this.clone().ior(t)
            : t.clone().ior(this)
        }),
        (n.prototype.uor = function (t) {
          return this.length > t.length
            ? this.clone().iuor(t)
            : t.clone().iuor(this)
        }),
        (n.prototype.iuand = function (t) {
          var e
          e = this.length > t.length ? t : this
          for (var i = 0; i < e.length; i++)
            this.words[i] = this.words[i] & t.words[i]
          return (this.length = e.length), this.strip()
        }),
        (n.prototype.iand = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuand(t)
        }),
        (n.prototype.and = function (t) {
          return this.length > t.length
            ? this.clone().iand(t)
            : t.clone().iand(this)
        }),
        (n.prototype.uand = function (t) {
          return this.length > t.length
            ? this.clone().iuand(t)
            : t.clone().iuand(this)
        }),
        (n.prototype.iuxor = function (t) {
          var e, i
          this.length > t.length ? ((e = this), (i = t)) : ((e = t), (i = this))
          for (var r = 0; r < i.length; r++)
            this.words[r] = e.words[r] ^ i.words[r]
          if (this !== e) for (; r < e.length; r++) this.words[r] = e.words[r]
          return (this.length = e.length), this.strip()
        }),
        (n.prototype.ixor = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuxor(t)
        }),
        (n.prototype.xor = function (t) {
          return this.length > t.length
            ? this.clone().ixor(t)
            : t.clone().ixor(this)
        }),
        (n.prototype.uxor = function (t) {
          return this.length > t.length
            ? this.clone().iuxor(t)
            : t.clone().iuxor(this)
        }),
        (n.prototype.inotn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = 0 | Math.ceil(t / 26),
            r = t % 26
          this._expand(e), r > 0 && e--
          for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n]
          return (
            r > 0 && (this.words[n] = ~this.words[n] & (67108863 >> (26 - r))),
            this.strip()
          )
        }),
        (n.prototype.notn = function (t) {
          return this.clone().inotn(t)
        }),
        (n.prototype.setn = function (t, e) {
          i('number' == typeof t && t >= 0)
          var r = (t / 26) | 0,
            n = t % 26
          return (
            this._expand(r + 1),
            (this.words[r] = e
              ? this.words[r] | (1 << n)
              : this.words[r] & ~(1 << n)),
            this.strip()
          )
        }),
        (n.prototype.iadd = function (t) {
          var e, i, r
          if (0 !== this.negative && 0 === t.negative)
            return (
              (this.negative = 0),
              (e = this.isub(t)),
              (this.negative ^= 1),
              this._normSign()
            )
          if (0 === this.negative && 0 !== t.negative)
            return (
              (t.negative = 0),
              (e = this.isub(t)),
              (t.negative = 1),
              e._normSign()
            )
          this.length > t.length ? ((i = this), (r = t)) : ((i = t), (r = this))
          for (var n = 0, s = 0; s < r.length; s++)
            (this.words[s] =
              67108863 & (e = (0 | i.words[s]) + (0 | r.words[s]) + n)),
              (n = e >>> 26)
          for (; 0 !== n && s < i.length; s++)
            (this.words[s] = 67108863 & (e = (0 | i.words[s]) + n)),
              (n = e >>> 26)
          if (((this.length = i.length), 0 !== n))
            (this.words[this.length] = n), this.length++
          else if (i !== this)
            for (; s < i.length; s++) this.words[s] = i.words[s]
          return this
        }),
        (n.prototype.add = function (t) {
          var e
          return 0 !== t.negative && 0 === this.negative
            ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
            : 0 === t.negative && 0 !== this.negative
            ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
            : this.length > t.length
            ? this.clone().iadd(t)
            : t.clone().iadd(this)
        }),
        (n.prototype.isub = function (t) {
          if (0 !== t.negative) {
            t.negative = 0
            var e = this.iadd(t)
            return (t.negative = 1), e._normSign()
          }
          if (0 !== this.negative)
            return (
              (this.negative = 0),
              this.iadd(t),
              (this.negative = 1),
              this._normSign()
            )
          var i,
            r,
            n = this.cmp(t)
          if (0 === n)
            return (
              (this.negative = 0), (this.length = 1), (this.words[0] = 0), this
            )
          n > 0 ? ((i = this), (r = t)) : ((i = t), (r = this))
          for (var s = 0, a = 0; a < r.length; a++)
            (s = (e = (0 | i.words[a]) - (0 | r.words[a]) + s) >> 26),
              (this.words[a] = 67108863 & e)
          for (; 0 !== s && a < i.length; a++)
            (s = (e = (0 | i.words[a]) + s) >> 26),
              (this.words[a] = 67108863 & e)
          if (0 === s && a < i.length && i !== this)
            for (; a < i.length; a++) this.words[a] = i.words[a]
          return (
            (this.length = Math.max(this.length, a)),
            i !== this && (this.negative = 1),
            this.strip()
          )
        }),
        (n.prototype.sub = function (t) {
          return this.clone().isub(t)
        })
      var f = function (t, e, i) {
        var r,
          n,
          s,
          a = t.words,
          o = e.words,
          u = i.words,
          h = 0,
          d = 0 | a[0],
          l = 8191 & d,
          f = d >>> 13,
          c = 0 | a[1],
          p = 8191 & c,
          m = c >>> 13,
          g = 0 | a[2],
          y = 8191 & g,
          b = g >>> 13,
          w = 0 | a[3],
          v = 8191 & w,
          M = w >>> 13,
          A = 0 | a[4],
          _ = 8191 & A,
          S = A >>> 13,
          T = 0 | a[5],
          x = 8191 & T,
          E = T >>> 13,
          R = 0 | a[6],
          k = 8191 & R,
          I = R >>> 13,
          B = 0 | a[7],
          O = 8191 & B,
          P = B >>> 13,
          C = 0 | a[8],
          N = 8191 & C,
          L = C >>> 13,
          D = 0 | a[9],
          F = 8191 & D,
          U = D >>> 13,
          q = 0 | o[0],
          j = 8191 & q,
          z = q >>> 13,
          W = 0 | o[1],
          $ = 8191 & W,
          H = W >>> 13,
          G = 0 | o[2],
          Z = 8191 & G,
          K = G >>> 13,
          V = 0 | o[3],
          J = 8191 & V,
          X = V >>> 13,
          Y = 0 | o[4],
          Q = 8191 & Y,
          tt = Y >>> 13,
          et = 0 | o[5],
          it = 8191 & et,
          rt = et >>> 13,
          nt = 0 | o[6],
          st = 8191 & nt,
          at = nt >>> 13,
          ot = 0 | o[7],
          ut = 8191 & ot,
          ht = ot >>> 13,
          dt = 0 | o[8],
          lt = 8191 & dt,
          ft = dt >>> 13,
          ct = 0 | o[9],
          pt = 8191 & ct,
          mt = ct >>> 13
        ;(i.negative = t.negative ^ e.negative), (i.length = 19)
        var gt =
          (((h + (r = Math.imul(l, j))) | 0) +
            ((8191 & (n = ((n = Math.imul(l, z)) + Math.imul(f, j)) | 0)) <<
              13)) |
          0
        ;(h = ((((s = Math.imul(f, z)) + (n >>> 13)) | 0) + (gt >>> 26)) | 0),
          (gt &= 67108863),
          (r = Math.imul(p, j)),
          (n = ((n = Math.imul(p, z)) + Math.imul(m, j)) | 0),
          (s = Math.imul(m, z))
        var yt =
          (((h + (r = (r + Math.imul(l, $)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, H)) | 0) + Math.imul(f, $)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, H)) | 0) + (n >>> 13)) | 0) + (yt >>> 26)) |
          0),
          (yt &= 67108863),
          (r = Math.imul(y, j)),
          (n = ((n = Math.imul(y, z)) + Math.imul(b, j)) | 0),
          (s = Math.imul(b, z)),
          (r = (r + Math.imul(p, $)) | 0),
          (n = ((n = (n + Math.imul(p, H)) | 0) + Math.imul(m, $)) | 0),
          (s = (s + Math.imul(m, H)) | 0)
        var bt =
          (((h + (r = (r + Math.imul(l, Z)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, K)) | 0) + Math.imul(f, Z)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, K)) | 0) + (n >>> 13)) | 0) + (bt >>> 26)) |
          0),
          (bt &= 67108863),
          (r = Math.imul(v, j)),
          (n = ((n = Math.imul(v, z)) + Math.imul(M, j)) | 0),
          (s = Math.imul(M, z)),
          (r = (r + Math.imul(y, $)) | 0),
          (n = ((n = (n + Math.imul(y, H)) | 0) + Math.imul(b, $)) | 0),
          (s = (s + Math.imul(b, H)) | 0),
          (r = (r + Math.imul(p, Z)) | 0),
          (n = ((n = (n + Math.imul(p, K)) | 0) + Math.imul(m, Z)) | 0),
          (s = (s + Math.imul(m, K)) | 0)
        var wt =
          (((h + (r = (r + Math.imul(l, J)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, X)) | 0) + Math.imul(f, J)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, X)) | 0) + (n >>> 13)) | 0) + (wt >>> 26)) |
          0),
          (wt &= 67108863),
          (r = Math.imul(_, j)),
          (n = ((n = Math.imul(_, z)) + Math.imul(S, j)) | 0),
          (s = Math.imul(S, z)),
          (r = (r + Math.imul(v, $)) | 0),
          (n = ((n = (n + Math.imul(v, H)) | 0) + Math.imul(M, $)) | 0),
          (s = (s + Math.imul(M, H)) | 0),
          (r = (r + Math.imul(y, Z)) | 0),
          (n = ((n = (n + Math.imul(y, K)) | 0) + Math.imul(b, Z)) | 0),
          (s = (s + Math.imul(b, K)) | 0),
          (r = (r + Math.imul(p, J)) | 0),
          (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, J)) | 0),
          (s = (s + Math.imul(m, X)) | 0)
        var vt =
          (((h + (r = (r + Math.imul(l, Q)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, tt)) | 0) + Math.imul(f, Q)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, tt)) | 0) + (n >>> 13)) | 0) +
            (vt >>> 26)) |
          0),
          (vt &= 67108863),
          (r = Math.imul(x, j)),
          (n = ((n = Math.imul(x, z)) + Math.imul(E, j)) | 0),
          (s = Math.imul(E, z)),
          (r = (r + Math.imul(_, $)) | 0),
          (n = ((n = (n + Math.imul(_, H)) | 0) + Math.imul(S, $)) | 0),
          (s = (s + Math.imul(S, H)) | 0),
          (r = (r + Math.imul(v, Z)) | 0),
          (n = ((n = (n + Math.imul(v, K)) | 0) + Math.imul(M, Z)) | 0),
          (s = (s + Math.imul(M, K)) | 0),
          (r = (r + Math.imul(y, J)) | 0),
          (n = ((n = (n + Math.imul(y, X)) | 0) + Math.imul(b, J)) | 0),
          (s = (s + Math.imul(b, X)) | 0),
          (r = (r + Math.imul(p, Q)) | 0),
          (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
          (s = (s + Math.imul(m, tt)) | 0)
        var Mt =
          (((h + (r = (r + Math.imul(l, it)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, rt)) | 0) + Math.imul(f, it)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, rt)) | 0) + (n >>> 13)) | 0) +
            (Mt >>> 26)) |
          0),
          (Mt &= 67108863),
          (r = Math.imul(k, j)),
          (n = ((n = Math.imul(k, z)) + Math.imul(I, j)) | 0),
          (s = Math.imul(I, z)),
          (r = (r + Math.imul(x, $)) | 0),
          (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(E, $)) | 0),
          (s = (s + Math.imul(E, H)) | 0),
          (r = (r + Math.imul(_, Z)) | 0),
          (n = ((n = (n + Math.imul(_, K)) | 0) + Math.imul(S, Z)) | 0),
          (s = (s + Math.imul(S, K)) | 0),
          (r = (r + Math.imul(v, J)) | 0),
          (n = ((n = (n + Math.imul(v, X)) | 0) + Math.imul(M, J)) | 0),
          (s = (s + Math.imul(M, X)) | 0),
          (r = (r + Math.imul(y, Q)) | 0),
          (n = ((n = (n + Math.imul(y, tt)) | 0) + Math.imul(b, Q)) | 0),
          (s = (s + Math.imul(b, tt)) | 0),
          (r = (r + Math.imul(p, it)) | 0),
          (n = ((n = (n + Math.imul(p, rt)) | 0) + Math.imul(m, it)) | 0),
          (s = (s + Math.imul(m, rt)) | 0)
        var At =
          (((h + (r = (r + Math.imul(l, st)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, at)) | 0) + Math.imul(f, st)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, at)) | 0) + (n >>> 13)) | 0) +
            (At >>> 26)) |
          0),
          (At &= 67108863),
          (r = Math.imul(O, j)),
          (n = ((n = Math.imul(O, z)) + Math.imul(P, j)) | 0),
          (s = Math.imul(P, z)),
          (r = (r + Math.imul(k, $)) | 0),
          (n = ((n = (n + Math.imul(k, H)) | 0) + Math.imul(I, $)) | 0),
          (s = (s + Math.imul(I, H)) | 0),
          (r = (r + Math.imul(x, Z)) | 0),
          (n = ((n = (n + Math.imul(x, K)) | 0) + Math.imul(E, Z)) | 0),
          (s = (s + Math.imul(E, K)) | 0),
          (r = (r + Math.imul(_, J)) | 0),
          (n = ((n = (n + Math.imul(_, X)) | 0) + Math.imul(S, J)) | 0),
          (s = (s + Math.imul(S, X)) | 0),
          (r = (r + Math.imul(v, Q)) | 0),
          (n = ((n = (n + Math.imul(v, tt)) | 0) + Math.imul(M, Q)) | 0),
          (s = (s + Math.imul(M, tt)) | 0),
          (r = (r + Math.imul(y, it)) | 0),
          (n = ((n = (n + Math.imul(y, rt)) | 0) + Math.imul(b, it)) | 0),
          (s = (s + Math.imul(b, rt)) | 0),
          (r = (r + Math.imul(p, st)) | 0),
          (n = ((n = (n + Math.imul(p, at)) | 0) + Math.imul(m, st)) | 0),
          (s = (s + Math.imul(m, at)) | 0)
        var _t =
          (((h + (r = (r + Math.imul(l, ut)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, ht)) | 0) + Math.imul(f, ut)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, ht)) | 0) + (n >>> 13)) | 0) +
            (_t >>> 26)) |
          0),
          (_t &= 67108863),
          (r = Math.imul(N, j)),
          (n = ((n = Math.imul(N, z)) + Math.imul(L, j)) | 0),
          (s = Math.imul(L, z)),
          (r = (r + Math.imul(O, $)) | 0),
          (n = ((n = (n + Math.imul(O, H)) | 0) + Math.imul(P, $)) | 0),
          (s = (s + Math.imul(P, H)) | 0),
          (r = (r + Math.imul(k, Z)) | 0),
          (n = ((n = (n + Math.imul(k, K)) | 0) + Math.imul(I, Z)) | 0),
          (s = (s + Math.imul(I, K)) | 0),
          (r = (r + Math.imul(x, J)) | 0),
          (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(E, J)) | 0),
          (s = (s + Math.imul(E, X)) | 0),
          (r = (r + Math.imul(_, Q)) | 0),
          (n = ((n = (n + Math.imul(_, tt)) | 0) + Math.imul(S, Q)) | 0),
          (s = (s + Math.imul(S, tt)) | 0),
          (r = (r + Math.imul(v, it)) | 0),
          (n = ((n = (n + Math.imul(v, rt)) | 0) + Math.imul(M, it)) | 0),
          (s = (s + Math.imul(M, rt)) | 0),
          (r = (r + Math.imul(y, st)) | 0),
          (n = ((n = (n + Math.imul(y, at)) | 0) + Math.imul(b, st)) | 0),
          (s = (s + Math.imul(b, at)) | 0),
          (r = (r + Math.imul(p, ut)) | 0),
          (n = ((n = (n + Math.imul(p, ht)) | 0) + Math.imul(m, ut)) | 0),
          (s = (s + Math.imul(m, ht)) | 0)
        var St =
          (((h + (r = (r + Math.imul(l, lt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, ft)) | 0) + Math.imul(f, lt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, ft)) | 0) + (n >>> 13)) | 0) +
            (St >>> 26)) |
          0),
          (St &= 67108863),
          (r = Math.imul(F, j)),
          (n = ((n = Math.imul(F, z)) + Math.imul(U, j)) | 0),
          (s = Math.imul(U, z)),
          (r = (r + Math.imul(N, $)) | 0),
          (n = ((n = (n + Math.imul(N, H)) | 0) + Math.imul(L, $)) | 0),
          (s = (s + Math.imul(L, H)) | 0),
          (r = (r + Math.imul(O, Z)) | 0),
          (n = ((n = (n + Math.imul(O, K)) | 0) + Math.imul(P, Z)) | 0),
          (s = (s + Math.imul(P, K)) | 0),
          (r = (r + Math.imul(k, J)) | 0),
          (n = ((n = (n + Math.imul(k, X)) | 0) + Math.imul(I, J)) | 0),
          (s = (s + Math.imul(I, X)) | 0),
          (r = (r + Math.imul(x, Q)) | 0),
          (n = ((n = (n + Math.imul(x, tt)) | 0) + Math.imul(E, Q)) | 0),
          (s = (s + Math.imul(E, tt)) | 0),
          (r = (r + Math.imul(_, it)) | 0),
          (n = ((n = (n + Math.imul(_, rt)) | 0) + Math.imul(S, it)) | 0),
          (s = (s + Math.imul(S, rt)) | 0),
          (r = (r + Math.imul(v, st)) | 0),
          (n = ((n = (n + Math.imul(v, at)) | 0) + Math.imul(M, st)) | 0),
          (s = (s + Math.imul(M, at)) | 0),
          (r = (r + Math.imul(y, ut)) | 0),
          (n = ((n = (n + Math.imul(y, ht)) | 0) + Math.imul(b, ut)) | 0),
          (s = (s + Math.imul(b, ht)) | 0),
          (r = (r + Math.imul(p, lt)) | 0),
          (n = ((n = (n + Math.imul(p, ft)) | 0) + Math.imul(m, lt)) | 0),
          (s = (s + Math.imul(m, ft)) | 0)
        var Tt =
          (((h + (r = (r + Math.imul(l, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, mt)) | 0) + Math.imul(f, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, mt)) | 0) + (n >>> 13)) | 0) +
            (Tt >>> 26)) |
          0),
          (Tt &= 67108863),
          (r = Math.imul(F, $)),
          (n = ((n = Math.imul(F, H)) + Math.imul(U, $)) | 0),
          (s = Math.imul(U, H)),
          (r = (r + Math.imul(N, Z)) | 0),
          (n = ((n = (n + Math.imul(N, K)) | 0) + Math.imul(L, Z)) | 0),
          (s = (s + Math.imul(L, K)) | 0),
          (r = (r + Math.imul(O, J)) | 0),
          (n = ((n = (n + Math.imul(O, X)) | 0) + Math.imul(P, J)) | 0),
          (s = (s + Math.imul(P, X)) | 0),
          (r = (r + Math.imul(k, Q)) | 0),
          (n = ((n = (n + Math.imul(k, tt)) | 0) + Math.imul(I, Q)) | 0),
          (s = (s + Math.imul(I, tt)) | 0),
          (r = (r + Math.imul(x, it)) | 0),
          (n = ((n = (n + Math.imul(x, rt)) | 0) + Math.imul(E, it)) | 0),
          (s = (s + Math.imul(E, rt)) | 0),
          (r = (r + Math.imul(_, st)) | 0),
          (n = ((n = (n + Math.imul(_, at)) | 0) + Math.imul(S, st)) | 0),
          (s = (s + Math.imul(S, at)) | 0),
          (r = (r + Math.imul(v, ut)) | 0),
          (n = ((n = (n + Math.imul(v, ht)) | 0) + Math.imul(M, ut)) | 0),
          (s = (s + Math.imul(M, ht)) | 0),
          (r = (r + Math.imul(y, lt)) | 0),
          (n = ((n = (n + Math.imul(y, ft)) | 0) + Math.imul(b, lt)) | 0),
          (s = (s + Math.imul(b, ft)) | 0)
        var xt =
          (((h + (r = (r + Math.imul(p, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(m, mt)) | 0) + (n >>> 13)) | 0) +
            (xt >>> 26)) |
          0),
          (xt &= 67108863),
          (r = Math.imul(F, Z)),
          (n = ((n = Math.imul(F, K)) + Math.imul(U, Z)) | 0),
          (s = Math.imul(U, K)),
          (r = (r + Math.imul(N, J)) | 0),
          (n = ((n = (n + Math.imul(N, X)) | 0) + Math.imul(L, J)) | 0),
          (s = (s + Math.imul(L, X)) | 0),
          (r = (r + Math.imul(O, Q)) | 0),
          (n = ((n = (n + Math.imul(O, tt)) | 0) + Math.imul(P, Q)) | 0),
          (s = (s + Math.imul(P, tt)) | 0),
          (r = (r + Math.imul(k, it)) | 0),
          (n = ((n = (n + Math.imul(k, rt)) | 0) + Math.imul(I, it)) | 0),
          (s = (s + Math.imul(I, rt)) | 0),
          (r = (r + Math.imul(x, st)) | 0),
          (n = ((n = (n + Math.imul(x, at)) | 0) + Math.imul(E, st)) | 0),
          (s = (s + Math.imul(E, at)) | 0),
          (r = (r + Math.imul(_, ut)) | 0),
          (n = ((n = (n + Math.imul(_, ht)) | 0) + Math.imul(S, ut)) | 0),
          (s = (s + Math.imul(S, ht)) | 0),
          (r = (r + Math.imul(v, lt)) | 0),
          (n = ((n = (n + Math.imul(v, ft)) | 0) + Math.imul(M, lt)) | 0),
          (s = (s + Math.imul(M, ft)) | 0)
        var Et =
          (((h + (r = (r + Math.imul(y, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(y, mt)) | 0) + Math.imul(b, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(b, mt)) | 0) + (n >>> 13)) | 0) +
            (Et >>> 26)) |
          0),
          (Et &= 67108863),
          (r = Math.imul(F, J)),
          (n = ((n = Math.imul(F, X)) + Math.imul(U, J)) | 0),
          (s = Math.imul(U, X)),
          (r = (r + Math.imul(N, Q)) | 0),
          (n = ((n = (n + Math.imul(N, tt)) | 0) + Math.imul(L, Q)) | 0),
          (s = (s + Math.imul(L, tt)) | 0),
          (r = (r + Math.imul(O, it)) | 0),
          (n = ((n = (n + Math.imul(O, rt)) | 0) + Math.imul(P, it)) | 0),
          (s = (s + Math.imul(P, rt)) | 0),
          (r = (r + Math.imul(k, st)) | 0),
          (n = ((n = (n + Math.imul(k, at)) | 0) + Math.imul(I, st)) | 0),
          (s = (s + Math.imul(I, at)) | 0),
          (r = (r + Math.imul(x, ut)) | 0),
          (n = ((n = (n + Math.imul(x, ht)) | 0) + Math.imul(E, ut)) | 0),
          (s = (s + Math.imul(E, ht)) | 0),
          (r = (r + Math.imul(_, lt)) | 0),
          (n = ((n = (n + Math.imul(_, ft)) | 0) + Math.imul(S, lt)) | 0),
          (s = (s + Math.imul(S, ft)) | 0)
        var Rt =
          (((h + (r = (r + Math.imul(v, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(v, mt)) | 0) + Math.imul(M, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(M, mt)) | 0) + (n >>> 13)) | 0) +
            (Rt >>> 26)) |
          0),
          (Rt &= 67108863),
          (r = Math.imul(F, Q)),
          (n = ((n = Math.imul(F, tt)) + Math.imul(U, Q)) | 0),
          (s = Math.imul(U, tt)),
          (r = (r + Math.imul(N, it)) | 0),
          (n = ((n = (n + Math.imul(N, rt)) | 0) + Math.imul(L, it)) | 0),
          (s = (s + Math.imul(L, rt)) | 0),
          (r = (r + Math.imul(O, st)) | 0),
          (n = ((n = (n + Math.imul(O, at)) | 0) + Math.imul(P, st)) | 0),
          (s = (s + Math.imul(P, at)) | 0),
          (r = (r + Math.imul(k, ut)) | 0),
          (n = ((n = (n + Math.imul(k, ht)) | 0) + Math.imul(I, ut)) | 0),
          (s = (s + Math.imul(I, ht)) | 0),
          (r = (r + Math.imul(x, lt)) | 0),
          (n = ((n = (n + Math.imul(x, ft)) | 0) + Math.imul(E, lt)) | 0),
          (s = (s + Math.imul(E, ft)) | 0)
        var kt =
          (((h + (r = (r + Math.imul(_, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(_, mt)) | 0) + Math.imul(S, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(S, mt)) | 0) + (n >>> 13)) | 0) +
            (kt >>> 26)) |
          0),
          (kt &= 67108863),
          (r = Math.imul(F, it)),
          (n = ((n = Math.imul(F, rt)) + Math.imul(U, it)) | 0),
          (s = Math.imul(U, rt)),
          (r = (r + Math.imul(N, st)) | 0),
          (n = ((n = (n + Math.imul(N, at)) | 0) + Math.imul(L, st)) | 0),
          (s = (s + Math.imul(L, at)) | 0),
          (r = (r + Math.imul(O, ut)) | 0),
          (n = ((n = (n + Math.imul(O, ht)) | 0) + Math.imul(P, ut)) | 0),
          (s = (s + Math.imul(P, ht)) | 0),
          (r = (r + Math.imul(k, lt)) | 0),
          (n = ((n = (n + Math.imul(k, ft)) | 0) + Math.imul(I, lt)) | 0),
          (s = (s + Math.imul(I, ft)) | 0)
        var It =
          (((h + (r = (r + Math.imul(x, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(x, mt)) | 0) + Math.imul(E, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(E, mt)) | 0) + (n >>> 13)) | 0) +
            (It >>> 26)) |
          0),
          (It &= 67108863),
          (r = Math.imul(F, st)),
          (n = ((n = Math.imul(F, at)) + Math.imul(U, st)) | 0),
          (s = Math.imul(U, at)),
          (r = (r + Math.imul(N, ut)) | 0),
          (n = ((n = (n + Math.imul(N, ht)) | 0) + Math.imul(L, ut)) | 0),
          (s = (s + Math.imul(L, ht)) | 0),
          (r = (r + Math.imul(O, lt)) | 0),
          (n = ((n = (n + Math.imul(O, ft)) | 0) + Math.imul(P, lt)) | 0),
          (s = (s + Math.imul(P, ft)) | 0)
        var Bt =
          (((h + (r = (r + Math.imul(k, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(k, mt)) | 0) + Math.imul(I, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(I, mt)) | 0) + (n >>> 13)) | 0) +
            (Bt >>> 26)) |
          0),
          (Bt &= 67108863),
          (r = Math.imul(F, ut)),
          (n = ((n = Math.imul(F, ht)) + Math.imul(U, ut)) | 0),
          (s = Math.imul(U, ht)),
          (r = (r + Math.imul(N, lt)) | 0),
          (n = ((n = (n + Math.imul(N, ft)) | 0) + Math.imul(L, lt)) | 0),
          (s = (s + Math.imul(L, ft)) | 0)
        var Ot =
          (((h + (r = (r + Math.imul(O, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(O, mt)) | 0) + Math.imul(P, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(P, mt)) | 0) + (n >>> 13)) | 0) +
            (Ot >>> 26)) |
          0),
          (Ot &= 67108863),
          (r = Math.imul(F, lt)),
          (n = ((n = Math.imul(F, ft)) + Math.imul(U, lt)) | 0),
          (s = Math.imul(U, ft))
        var Pt =
          (((h + (r = (r + Math.imul(N, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(N, mt)) | 0) + Math.imul(L, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(L, mt)) | 0) + (n >>> 13)) | 0) +
            (Pt >>> 26)) |
          0),
          (Pt &= 67108863)
        var Ct =
          (((h + (r = Math.imul(F, pt))) | 0) +
            ((8191 & (n = ((n = Math.imul(F, mt)) + Math.imul(U, pt)) | 0)) <<
              13)) |
          0
        return (
          (h = ((((s = Math.imul(U, mt)) + (n >>> 13)) | 0) + (Ct >>> 26)) | 0),
          (Ct &= 67108863),
          (u[0] = gt),
          (u[1] = yt),
          (u[2] = bt),
          (u[3] = wt),
          (u[4] = vt),
          (u[5] = Mt),
          (u[6] = At),
          (u[7] = _t),
          (u[8] = St),
          (u[9] = Tt),
          (u[10] = xt),
          (u[11] = Et),
          (u[12] = Rt),
          (u[13] = kt),
          (u[14] = It),
          (u[15] = Bt),
          (u[16] = Ot),
          (u[17] = Pt),
          (u[18] = Ct),
          0 !== h && ((u[19] = h), i.length++),
          i
        )
      }
      function c(t, e, i) {
        return new p().mulp(t, e, i)
      }
      function p(t, e) {
        ;(this.x = t), (this.y = e)
      }
      Math.imul || (f = l),
        (n.prototype.mulTo = function (t, e) {
          var i,
            r = this.length + t.length
          return (
            (i =
              10 === this.length && 10 === t.length
                ? f(this, t, e)
                : r < 63
                ? l(this, t, e)
                : r < 1024
                ? (function (t, e, i) {
                    ;(i.negative = e.negative ^ t.negative),
                      (i.length = t.length + e.length)
                    for (var r = 0, n = 0, s = 0; s < i.length - 1; s++) {
                      var a = n
                      n = 0
                      for (
                        var o = 67108863 & r,
                          u = Math.min(s, e.length - 1),
                          h = Math.max(0, s - t.length + 1);
                        h <= u;
                        h++
                      ) {
                        var d = (0 | t.words[s - h]) * (0 | e.words[h]),
                          l = 67108863 & d
                        ;(o = 67108863 & (l = (l + o) | 0)),
                          (n +=
                            (a =
                              ((a = (a + ((d / 67108864) | 0)) | 0) +
                                (l >>> 26)) |
                              0) >>> 26),
                          (a &= 67108863)
                      }
                      ;(i.words[s] = o), (r = a), (a = n)
                    }
                    return 0 !== r ? (i.words[s] = r) : i.length--, i.strip()
                  })(this, t, e)
                : c(this, t, e)),
            i
          )
        }),
        (p.prototype.makeRBT = function (t) {
          for (
            var e = new Array(t), i = n.prototype._countBits(t) - 1, r = 0;
            r < t;
            r++
          )
            e[r] = this.revBin(r, i, t)
          return e
        }),
        (p.prototype.revBin = function (t, e, i) {
          if (0 === t || t === i - 1) return t
          for (var r = 0, n = 0; n < e; n++)
            (r |= (1 & t) << (e - n - 1)), (t >>= 1)
          return r
        }),
        (p.prototype.permute = function (t, e, i, r, n, s) {
          for (var a = 0; a < s; a++) (r[a] = e[t[a]]), (n[a] = i[t[a]])
        }),
        (p.prototype.transform = function (t, e, i, r, n, s) {
          this.permute(s, t, e, i, r, n)
          for (var a = 1; a < n; a <<= 1)
            for (
              var o = a << 1,
                u = Math.cos((2 * Math.PI) / o),
                h = Math.sin((2 * Math.PI) / o),
                d = 0;
              d < n;
              d += o
            )
              for (var l = u, f = h, c = 0; c < a; c++) {
                var p = i[d + c],
                  m = r[d + c],
                  g = i[d + c + a],
                  y = r[d + c + a],
                  b = l * g - f * y
                ;(y = l * y + f * g),
                  (i[d + c] = p + (g = b)),
                  (r[d + c] = m + y),
                  (i[d + c + a] = p - g),
                  (r[d + c + a] = m - y),
                  c !== o && ((b = u * l - h * f), (f = u * f + h * l), (l = b))
              }
        }),
        (p.prototype.guessLen13b = function (t, e) {
          var i = 1 | Math.max(e, t),
            r = 1 & i,
            n = 0
          for (i = (i / 2) | 0; i; i >>>= 1) n++
          return 1 << (n + 1 + r)
        }),
        (p.prototype.conjugate = function (t, e, i) {
          if (!(i <= 1))
            for (var r = 0; r < i / 2; r++) {
              var n = t[r]
              ;(t[r] = t[i - r - 1]),
                (t[i - r - 1] = n),
                (n = e[r]),
                (e[r] = -e[i - r - 1]),
                (e[i - r - 1] = -n)
            }
        }),
        (p.prototype.normalize13b = function (t, e) {
          for (var i = 0, r = 0; r < e / 2; r++) {
            var n =
              8192 * Math.round(t[2 * r + 1] / e) + Math.round(t[2 * r] / e) + i
            ;(t[r] = 67108863 & n), (i = n < 67108864 ? 0 : (n / 67108864) | 0)
          }
          return t
        }),
        (p.prototype.convert13b = function (t, e, r, n) {
          for (var s = 0, a = 0; a < e; a++)
            (r[2 * a] = 8191 & (s += 0 | t[a])),
              (r[2 * a + 1] = 8191 & (s >>>= 13)),
              (s >>>= 13)
          for (a = 2 * e; a < n; ++a) r[a] = 0
          i(0 === s), i(0 == (-8192 & s))
        }),
        (p.prototype.stub = function (t) {
          for (var e = new Array(t), i = 0; i < t; i++) e[i] = 0
          return e
        }),
        (p.prototype.mulp = function (t, e, i) {
          var r = 2 * this.guessLen13b(t.length, e.length),
            n = this.makeRBT(r),
            s = this.stub(r),
            a = new Array(r),
            o = new Array(r),
            u = new Array(r),
            h = new Array(r),
            d = new Array(r),
            l = new Array(r),
            f = i.words
          ;(f.length = r),
            this.convert13b(t.words, t.length, a, r),
            this.convert13b(e.words, e.length, h, r),
            this.transform(a, s, o, u, r, n),
            this.transform(h, s, d, l, r, n)
          for (var c = 0; c < r; c++) {
            var p = o[c] * d[c] - u[c] * l[c]
            ;(u[c] = o[c] * l[c] + u[c] * d[c]), (o[c] = p)
          }
          return (
            this.conjugate(o, u, r),
            this.transform(o, u, f, s, r, n),
            this.conjugate(f, s, r),
            this.normalize13b(f, r),
            (i.negative = t.negative ^ e.negative),
            (i.length = t.length + e.length),
            i.strip()
          )
        }),
        (n.prototype.mul = function (t) {
          var e = new n(null)
          return (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
        }),
        (n.prototype.mulf = function (t) {
          var e = new n(null)
          return (e.words = new Array(this.length + t.length)), c(this, t, e)
        }),
        (n.prototype.imul = function (t) {
          return this.clone().mulTo(t, this)
        }),
        (n.prototype.imuln = function (t) {
          i('number' == typeof t), i(t < 67108864)
          for (var e = 0, r = 0; r < this.length; r++) {
            var n = (0 | this.words[r]) * t,
              s = (67108863 & n) + (67108863 & e)
            ;(e >>= 26),
              (e += (n / 67108864) | 0),
              (e += s >>> 26),
              (this.words[r] = 67108863 & s)
          }
          return 0 !== e && ((this.words[r] = e), this.length++), this
        }),
        (n.prototype.muln = function (t) {
          return this.clone().imuln(t)
        }),
        (n.prototype.sqr = function () {
          return this.mul(this)
        }),
        (n.prototype.isqr = function () {
          return this.imul(this.clone())
        }),
        (n.prototype.pow = function (t) {
          var e = (function (t) {
            for (var e = new Array(t.bitLength()), i = 0; i < e.length; i++) {
              var r = i % 26
              e[i] = (t.words[(i / 26) | 0] & (1 << r)) >>> r
            }
            return e
          })(t)
          if (0 === e.length) return new n(1)
          for (
            var i = this, r = 0;
            r < e.length && 0 === e[r];
            r++, i = i.sqr()
          );
          if (++r < e.length)
            for (var s = i.sqr(); r < e.length; r++, s = s.sqr())
              0 !== e[r] && (i = i.mul(s))
          return i
        }),
        (n.prototype.iushln = function (t) {
          i('number' == typeof t && t >= 0)
          var e,
            r = t % 26,
            n = (t - r) / 26,
            s = (67108863 >>> (26 - r)) << (26 - r)
          if (0 !== r) {
            var a = 0
            for (e = 0; e < this.length; e++) {
              var o = this.words[e] & s
              ;(this.words[e] = (((0 | this.words[e]) - o) << r) | a),
                (a = o >>> (26 - r))
            }
            a && ((this.words[e] = a), this.length++)
          }
          if (0 !== n) {
            for (e = this.length - 1; e >= 0; e--)
              this.words[e + n] = this.words[e]
            for (e = 0; e < n; e++) this.words[e] = 0
            this.length += n
          }
          return this.strip()
        }),
        (n.prototype.ishln = function (t) {
          return i(0 === this.negative), this.iushln(t)
        }),
        (n.prototype.iushrn = function (t, e, r) {
          var n
          i('number' == typeof t && t >= 0), (n = e ? (e - (e % 26)) / 26 : 0)
          var s = t % 26,
            a = Math.min((t - s) / 26, this.length),
            o = 67108863 ^ ((67108863 >>> s) << s),
            u = r
          if (((n -= a), (n = Math.max(0, n)), u)) {
            for (var h = 0; h < a; h++) u.words[h] = this.words[h]
            u.length = a
          }
          if (0 === a);
          else if (this.length > a)
            for (this.length -= a, h = 0; h < this.length; h++)
              this.words[h] = this.words[h + a]
          else (this.words[0] = 0), (this.length = 1)
          var d = 0
          for (h = this.length - 1; h >= 0 && (0 !== d || h >= n); h--) {
            var l = 0 | this.words[h]
            ;(this.words[h] = (d << (26 - s)) | (l >>> s)), (d = l & o)
          }
          return (
            u && 0 !== d && (u.words[u.length++] = d),
            0 === this.length && ((this.words[0] = 0), (this.length = 1)),
            this.strip()
          )
        }),
        (n.prototype.ishrn = function (t, e, r) {
          return i(0 === this.negative), this.iushrn(t, e, r)
        }),
        (n.prototype.shln = function (t) {
          return this.clone().ishln(t)
        }),
        (n.prototype.ushln = function (t) {
          return this.clone().iushln(t)
        }),
        (n.prototype.shrn = function (t) {
          return this.clone().ishrn(t)
        }),
        (n.prototype.ushrn = function (t) {
          return this.clone().iushrn(t)
        }),
        (n.prototype.testn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = t % 26,
            r = (t - e) / 26
          return !(this.length <= r || !(this.words[r] & (1 << e)))
        }),
        (n.prototype.imaskn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = t % 26,
            r = (t - e) / 26
          return (
            i(0 === this.negative, 'imaskn works only with positive numbers'),
            this.length <= r
              ? this
              : (0 !== e && r++,
                (this.length = Math.min(r, this.length)),
                0 !== e &&
                  (this.words[this.length - 1] &=
                    67108863 ^ ((67108863 >>> e) << e)),
                this.strip())
          )
        }),
        (n.prototype.maskn = function (t) {
          return this.clone().imaskn(t)
        }),
        (n.prototype.iaddn = function (t) {
          return (
            i('number' == typeof t),
            i(t < 67108864),
            t < 0
              ? this.isubn(-t)
              : 0 !== this.negative
              ? 1 === this.length && (0 | this.words[0]) < t
                ? ((this.words[0] = t - (0 | this.words[0])),
                  (this.negative = 0),
                  this)
                : ((this.negative = 0),
                  this.isubn(t),
                  (this.negative = 1),
                  this)
              : this._iaddn(t)
          )
        }),
        (n.prototype._iaddn = function (t) {
          this.words[0] += t
          for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
            (this.words[e] -= 67108864),
              e === this.length - 1
                ? (this.words[e + 1] = 1)
                : this.words[e + 1]++
          return (this.length = Math.max(this.length, e + 1)), this
        }),
        (n.prototype.isubn = function (t) {
          if ((i('number' == typeof t), i(t < 67108864), t < 0))
            return this.iaddn(-t)
          if (0 !== this.negative)
            return (this.negative = 0), this.iaddn(t), (this.negative = 1), this
          if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
            (this.words[0] = -this.words[0]), (this.negative = 1)
          else
            for (var e = 0; e < this.length && this.words[e] < 0; e++)
              (this.words[e] += 67108864), (this.words[e + 1] -= 1)
          return this.strip()
        }),
        (n.prototype.addn = function (t) {
          return this.clone().iaddn(t)
        }),
        (n.prototype.subn = function (t) {
          return this.clone().isubn(t)
        }),
        (n.prototype.iabs = function () {
          return (this.negative = 0), this
        }),
        (n.prototype.abs = function () {
          return this.clone().iabs()
        }),
        (n.prototype._ishlnsubmul = function (t, e, r) {
          var n, s
          this._expand(t.length + r)
          var a = 0
          for (n = 0; n < t.length; n++) {
            s = (0 | this.words[n + r]) + a
            var o = (0 | t.words[n]) * e
            ;(a = ((s -= 67108863 & o) >> 26) - ((o / 67108864) | 0)),
              (this.words[n + r] = 67108863 & s)
          }
          for (; n < this.length - r; n++)
            (a = (s = (0 | this.words[n + r]) + a) >> 26),
              (this.words[n + r] = 67108863 & s)
          if (0 === a) return this.strip()
          for (i(-1 === a), a = 0, n = 0; n < this.length; n++)
            (a = (s = -(0 | this.words[n]) + a) >> 26),
              (this.words[n] = 67108863 & s)
          return (this.negative = 1), this.strip()
        }),
        (n.prototype._wordDiv = function (t, e) {
          var i,
            r = this.clone(),
            s = t,
            a = 0 | s.words[s.length - 1]
          0 != (i = 26 - this._countBits(a)) &&
            ((s = s.ushln(i)), r.iushln(i), (a = 0 | s.words[s.length - 1]))
          var o,
            u = r.length - s.length
          if ('mod' !== e) {
            ;((o = new n(null)).length = u + 1), (o.words = new Array(o.length))
            for (var h = 0; h < o.length; h++) o.words[h] = 0
          }
          var d = r.clone()._ishlnsubmul(s, 1, u)
          0 === d.negative && ((r = d), o && (o.words[u] = 1))
          for (var l = u - 1; l >= 0; l--) {
            var f =
              67108864 * (0 | r.words[s.length + l]) +
              (0 | r.words[s.length + l - 1])
            for (
              f = Math.min((f / a) | 0, 67108863), r._ishlnsubmul(s, f, l);
              0 !== r.negative;

            )
              f--,
                (r.negative = 0),
                r._ishlnsubmul(s, 1, l),
                r.isZero() || (r.negative ^= 1)
            o && (o.words[l] = f)
          }
          return (
            o && o.strip(),
            r.strip(),
            'div' !== e && 0 !== i && r.iushrn(i),
            { div: o || null, mod: r }
          )
        }),
        (n.prototype.divmod = function (t, e, r) {
          return (
            i(!t.isZero()),
            this.isZero()
              ? { div: new n(0), mod: new n(0) }
              : 0 !== this.negative && 0 === t.negative
              ? ((o = this.neg().divmod(t, e)),
                'mod' !== e && (s = o.div.neg()),
                'div' !== e &&
                  ((a = o.mod.neg()), r && 0 !== a.negative && a.iadd(t)),
                { div: s, mod: a })
              : 0 === this.negative && 0 !== t.negative
              ? ((o = this.divmod(t.neg(), e)),
                'mod' !== e && (s = o.div.neg()),
                { div: s, mod: o.mod })
              : 0 != (this.negative & t.negative)
              ? ((o = this.neg().divmod(t.neg(), e)),
                'div' !== e &&
                  ((a = o.mod.neg()), r && 0 !== a.negative && a.isub(t)),
                { div: o.div, mod: a })
              : t.length > this.length || this.cmp(t) < 0
              ? { div: new n(0), mod: this }
              : 1 === t.length
              ? 'div' === e
                ? { div: this.divn(t.words[0]), mod: null }
                : 'mod' === e
                ? { div: null, mod: new n(this.modn(t.words[0])) }
                : {
                    div: this.divn(t.words[0]),
                    mod: new n(this.modn(t.words[0]))
                  }
              : this._wordDiv(t, e)
          )
          var s, a, o
        }),
        (n.prototype.div = function (t) {
          return this.divmod(t, 'div', !1).div
        }),
        (n.prototype.mod = function (t) {
          return this.divmod(t, 'mod', !1).mod
        }),
        (n.prototype.umod = function (t) {
          return this.divmod(t, 'mod', !0).mod
        }),
        (n.prototype.divRound = function (t) {
          var e = this.divmod(t)
          if (e.mod.isZero()) return e.div
          var i = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
            r = t.ushrn(1),
            n = t.andln(1),
            s = i.cmp(r)
          return s < 0 || (1 === n && 0 === s)
            ? e.div
            : 0 !== e.div.negative
            ? e.div.isubn(1)
            : e.div.iaddn(1)
        }),
        (n.prototype.modn = function (t) {
          i(t <= 67108863)
          for (var e = (1 << 26) % t, r = 0, n = this.length - 1; n >= 0; n--)
            r = (e * r + (0 | this.words[n])) % t
          return r
        }),
        (n.prototype.idivn = function (t) {
          i(t <= 67108863)
          for (var e = 0, r = this.length - 1; r >= 0; r--) {
            var n = (0 | this.words[r]) + 67108864 * e
            ;(this.words[r] = (n / t) | 0), (e = n % t)
          }
          return this.strip()
        }),
        (n.prototype.divn = function (t) {
          return this.clone().idivn(t)
        }),
        (n.prototype.egcd = function (t) {
          i(0 === t.negative), i(!t.isZero())
          var e = this,
            r = t.clone()
          e = 0 !== e.negative ? e.umod(t) : e.clone()
          for (
            var s = new n(1), a = new n(0), o = new n(0), u = new n(1), h = 0;
            e.isEven() && r.isEven();

          )
            e.iushrn(1), r.iushrn(1), ++h
          for (var d = r.clone(), l = e.clone(); !e.isZero(); ) {
            for (
              var f = 0, c = 1;
              0 == (e.words[0] & c) && f < 26;
              ++f, c <<= 1
            );
            if (f > 0)
              for (e.iushrn(f); f-- > 0; )
                (s.isOdd() || a.isOdd()) && (s.iadd(d), a.isub(l)),
                  s.iushrn(1),
                  a.iushrn(1)
            for (
              var p = 0, m = 1;
              0 == (r.words[0] & m) && p < 26;
              ++p, m <<= 1
            );
            if (p > 0)
              for (r.iushrn(p); p-- > 0; )
                (o.isOdd() || u.isOdd()) && (o.iadd(d), u.isub(l)),
                  o.iushrn(1),
                  u.iushrn(1)
            e.cmp(r) >= 0
              ? (e.isub(r), s.isub(o), a.isub(u))
              : (r.isub(e), o.isub(s), u.isub(a))
          }
          return { a: o, b: u, gcd: r.iushln(h) }
        }),
        (n.prototype._invmp = function (t) {
          i(0 === t.negative), i(!t.isZero())
          var e = this,
            r = t.clone()
          e = 0 !== e.negative ? e.umod(t) : e.clone()
          for (
            var s, a = new n(1), o = new n(0), u = r.clone();
            e.cmpn(1) > 0 && r.cmpn(1) > 0;

          ) {
            for (
              var h = 0, d = 1;
              0 == (e.words[0] & d) && h < 26;
              ++h, d <<= 1
            );
            if (h > 0)
              for (e.iushrn(h); h-- > 0; ) a.isOdd() && a.iadd(u), a.iushrn(1)
            for (
              var l = 0, f = 1;
              0 == (r.words[0] & f) && l < 26;
              ++l, f <<= 1
            );
            if (l > 0)
              for (r.iushrn(l); l-- > 0; ) o.isOdd() && o.iadd(u), o.iushrn(1)
            e.cmp(r) >= 0 ? (e.isub(r), a.isub(o)) : (r.isub(e), o.isub(a))
          }
          return (s = 0 === e.cmpn(1) ? a : o).cmpn(0) < 0 && s.iadd(t), s
        }),
        (n.prototype.gcd = function (t) {
          if (this.isZero()) return t.abs()
          if (t.isZero()) return this.abs()
          var e = this.clone(),
            i = t.clone()
          ;(e.negative = 0), (i.negative = 0)
          for (var r = 0; e.isEven() && i.isEven(); r++)
            e.iushrn(1), i.iushrn(1)
          for (;;) {
            for (; e.isEven(); ) e.iushrn(1)
            for (; i.isEven(); ) i.iushrn(1)
            var n = e.cmp(i)
            if (n < 0) {
              var s = e
              ;(e = i), (i = s)
            } else if (0 === n || 0 === i.cmpn(1)) break
            e.isub(i)
          }
          return i.iushln(r)
        }),
        (n.prototype.invm = function (t) {
          return this.egcd(t).a.umod(t)
        }),
        (n.prototype.isEven = function () {
          return 0 == (1 & this.words[0])
        }),
        (n.prototype.isOdd = function () {
          return 1 == (1 & this.words[0])
        }),
        (n.prototype.andln = function (t) {
          return this.words[0] & t
        }),
        (n.prototype.bincn = function (t) {
          i('number' == typeof t)
          var e = t % 26,
            r = (t - e) / 26,
            n = 1 << e
          if (this.length <= r)
            return this._expand(r + 1), (this.words[r] |= n), this
          for (var s = n, a = r; 0 !== s && a < this.length; a++) {
            var o = 0 | this.words[a]
            ;(s = (o += s) >>> 26), (this.words[a] = o &= 67108863)
          }
          return 0 !== s && ((this.words[a] = s), this.length++), this
        }),
        (n.prototype.isZero = function () {
          return 1 === this.length && 0 === this.words[0]
        }),
        (n.prototype.cmpn = function (t) {
          var e,
            r = t < 0
          if (0 !== this.negative && !r) return -1
          if (0 === this.negative && r) return 1
          if ((this.strip(), this.length > 1)) e = 1
          else {
            r && (t = -t), i(t <= 67108863, 'Number is too big')
            var n = 0 | this.words[0]
            e = n === t ? 0 : n < t ? -1 : 1
          }
          return 0 !== this.negative ? 0 | -e : e
        }),
        (n.prototype.cmp = function (t) {
          if (0 !== this.negative && 0 === t.negative) return -1
          if (0 === this.negative && 0 !== t.negative) return 1
          var e = this.ucmp(t)
          return 0 !== this.negative ? 0 | -e : e
        }),
        (n.prototype.ucmp = function (t) {
          if (this.length > t.length) return 1
          if (this.length < t.length) return -1
          for (var e = 0, i = this.length - 1; i >= 0; i--) {
            var r = 0 | this.words[i],
              n = 0 | t.words[i]
            if (r !== n) {
              r < n ? (e = -1) : r > n && (e = 1)
              break
            }
          }
          return e
        }),
        (n.prototype.gtn = function (t) {
          return 1 === this.cmpn(t)
        }),
        (n.prototype.gt = function (t) {
          return 1 === this.cmp(t)
        }),
        (n.prototype.gten = function (t) {
          return this.cmpn(t) >= 0
        }),
        (n.prototype.gte = function (t) {
          return this.cmp(t) >= 0
        }),
        (n.prototype.ltn = function (t) {
          return -1 === this.cmpn(t)
        }),
        (n.prototype.lt = function (t) {
          return -1 === this.cmp(t)
        }),
        (n.prototype.lten = function (t) {
          return this.cmpn(t) <= 0
        }),
        (n.prototype.lte = function (t) {
          return this.cmp(t) <= 0
        }),
        (n.prototype.eqn = function (t) {
          return 0 === this.cmpn(t)
        }),
        (n.prototype.eq = function (t) {
          return 0 === this.cmp(t)
        }),
        (n.red = function (t) {
          return new M(t)
        }),
        (n.prototype.toRed = function (t) {
          return (
            i(!this.red, 'Already a number in reduction context'),
            i(0 === this.negative, 'red works only with positives'),
            t.convertTo(this)._forceRed(t)
          )
        }),
        (n.prototype.fromRed = function () {
          return (
            i(this.red, 'fromRed works only with numbers in reduction context'),
            this.red.convertFrom(this)
          )
        }),
        (n.prototype._forceRed = function (t) {
          return (this.red = t), this
        }),
        (n.prototype.forceRed = function (t) {
          return (
            i(!this.red, 'Already a number in reduction context'),
            this._forceRed(t)
          )
        }),
        (n.prototype.redAdd = function (t) {
          return (
            i(this.red, 'redAdd works only with red numbers'),
            this.red.add(this, t)
          )
        }),
        (n.prototype.redIAdd = function (t) {
          return (
            i(this.red, 'redIAdd works only with red numbers'),
            this.red.iadd(this, t)
          )
        }),
        (n.prototype.redSub = function (t) {
          return (
            i(this.red, 'redSub works only with red numbers'),
            this.red.sub(this, t)
          )
        }),
        (n.prototype.redISub = function (t) {
          return (
            i(this.red, 'redISub works only with red numbers'),
            this.red.isub(this, t)
          )
        }),
        (n.prototype.redShl = function (t) {
          return (
            i(this.red, 'redShl works only with red numbers'),
            this.red.shl(this, t)
          )
        }),
        (n.prototype.redMul = function (t) {
          return (
            i(this.red, 'redMul works only with red numbers'),
            this.red._verify2(this, t),
            this.red.mul(this, t)
          )
        }),
        (n.prototype.redIMul = function (t) {
          return (
            i(this.red, 'redMul works only with red numbers'),
            this.red._verify2(this, t),
            this.red.imul(this, t)
          )
        }),
        (n.prototype.redSqr = function () {
          return (
            i(this.red, 'redSqr works only with red numbers'),
            this.red._verify1(this),
            this.red.sqr(this)
          )
        }),
        (n.prototype.redISqr = function () {
          return (
            i(this.red, 'redISqr works only with red numbers'),
            this.red._verify1(this),
            this.red.isqr(this)
          )
        }),
        (n.prototype.redSqrt = function () {
          return (
            i(this.red, 'redSqrt works only with red numbers'),
            this.red._verify1(this),
            this.red.sqrt(this)
          )
        }),
        (n.prototype.redInvm = function () {
          return (
            i(this.red, 'redInvm works only with red numbers'),
            this.red._verify1(this),
            this.red.invm(this)
          )
        }),
        (n.prototype.redNeg = function () {
          return (
            i(this.red, 'redNeg works only with red numbers'),
            this.red._verify1(this),
            this.red.neg(this)
          )
        }),
        (n.prototype.redPow = function (t) {
          return (
            i(this.red && !t.red, 'redPow(normalNum)'),
            this.red._verify1(this),
            this.red.pow(this, t)
          )
        })
      var m = { k256: null, p224: null, p192: null, p25519: null }
      function g(t, e) {
        ;(this.name = t),
          (this.p = new n(e, 16)),
          (this.n = this.p.bitLength()),
          (this.k = new n(1).iushln(this.n).isub(this.p)),
          (this.tmp = this._tmp())
      }
      function y() {
        g.call(
          this,
          'k256',
          'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
        )
      }
      function b() {
        g.call(
          this,
          'p224',
          'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
        )
      }
      function w() {
        g.call(
          this,
          'p192',
          'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
        )
      }
      function v() {
        g.call(
          this,
          '25519',
          '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
        )
      }
      function M(t) {
        if ('string' == typeof t) {
          var e = n._prime(t)
          ;(this.m = e.p), (this.prime = e)
        } else i(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null)
      }
      function A(t) {
        M.call(this, t),
          (this.shift = this.m.bitLength()),
          this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
          (this.r = new n(1).iushln(this.shift)),
          (this.r2 = this.imod(this.r.sqr())),
          (this.rinv = this.r._invmp(this.m)),
          (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
          (this.minv = this.minv.umod(this.r)),
          (this.minv = this.r.sub(this.minv))
      }
      ;(g.prototype._tmp = function () {
        var t = new n(null)
        return (t.words = new Array(Math.ceil(this.n / 13))), t
      }),
        (g.prototype.ireduce = function (t) {
          var e,
            i = t
          do {
            this.split(i, this.tmp),
              (e = (i = (i = this.imulK(i)).iadd(this.tmp)).bitLength())
          } while (e > this.n)
          var r = e < this.n ? -1 : i.ucmp(this.p)
          return (
            0 === r
              ? ((i.words[0] = 0), (i.length = 1))
              : r > 0
              ? i.isub(this.p)
              : i.strip(),
            i
          )
        }),
        (g.prototype.split = function (t, e) {
          t.iushrn(this.n, 0, e)
        }),
        (g.prototype.imulK = function (t) {
          return t.imul(this.k)
        }),
        r(y, g),
        (y.prototype.split = function (t, e) {
          for (var i = 4194303, r = Math.min(t.length, 9), n = 0; n < r; n++)
            e.words[n] = t.words[n]
          if (((e.length = r), t.length <= 9))
            return (t.words[0] = 0), void (t.length = 1)
          var s = t.words[9]
          for (e.words[e.length++] = s & i, n = 10; n < t.length; n++) {
            var a = 0 | t.words[n]
            ;(t.words[n - 10] = ((a & i) << 4) | (s >>> 22)), (s = a)
          }
          ;(t.words[n - 10] = s >>>= 22),
            (t.length -= 0 === s && t.length > 10 ? 10 : 9)
        }),
        (y.prototype.imulK = function (t) {
          ;(t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2)
          for (var e = 0, i = 0; i < t.length; i++) {
            var r = 0 | t.words[i]
            ;(t.words[i] = 67108863 & (e += 977 * r)),
              (e = 64 * r + ((e / 67108864) | 0))
          }
          return (
            0 === t.words[t.length - 1] &&
              (t.length--, 0 === t.words[t.length - 1] && t.length--),
            t
          )
        }),
        r(b, g),
        r(w, g),
        r(v, g),
        (v.prototype.imulK = function (t) {
          for (var e = 0, i = 0; i < t.length; i++) {
            var r = 19 * (0 | t.words[i]) + e,
              n = 67108863 & r
            ;(r >>>= 26), (t.words[i] = n), (e = r)
          }
          return 0 !== e && (t.words[t.length++] = e), t
        }),
        (n._prime = function (t) {
          if (m[t]) return m[t]
          var e
          if ('k256' === t) e = new y()
          else if ('p224' === t) e = new b()
          else if ('p192' === t) e = new w()
          else {
            if ('p25519' !== t) throw new Error('Unknown prime ' + t)
            e = new v()
          }
          return (m[t] = e), e
        }),
        (M.prototype._verify1 = function (t) {
          i(0 === t.negative, 'red works only with positives'),
            i(t.red, 'red works only with red numbers')
        }),
        (M.prototype._verify2 = function (t, e) {
          i(0 == (t.negative | e.negative), 'red works only with positives'),
            i(t.red && t.red === e.red, 'red works only with red numbers')
        }),
        (M.prototype.imod = function (t) {
          return this.prime
            ? this.prime.ireduce(t)._forceRed(this)
            : t.umod(this.m)._forceRed(this)
        }),
        (M.prototype.neg = function (t) {
          return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
        }),
        (M.prototype.add = function (t, e) {
          this._verify2(t, e)
          var i = t.add(e)
          return i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this)
        }),
        (M.prototype.iadd = function (t, e) {
          this._verify2(t, e)
          var i = t.iadd(e)
          return i.cmp(this.m) >= 0 && i.isub(this.m), i
        }),
        (M.prototype.sub = function (t, e) {
          this._verify2(t, e)
          var i = t.sub(e)
          return i.cmpn(0) < 0 && i.iadd(this.m), i._forceRed(this)
        }),
        (M.prototype.isub = function (t, e) {
          this._verify2(t, e)
          var i = t.isub(e)
          return i.cmpn(0) < 0 && i.iadd(this.m), i
        }),
        (M.prototype.shl = function (t, e) {
          return this._verify1(t), this.imod(t.ushln(e))
        }),
        (M.prototype.imul = function (t, e) {
          return this._verify2(t, e), this.imod(t.imul(e))
        }),
        (M.prototype.mul = function (t, e) {
          return this._verify2(t, e), this.imod(t.mul(e))
        }),
        (M.prototype.isqr = function (t) {
          return this.imul(t, t.clone())
        }),
        (M.prototype.sqr = function (t) {
          return this.mul(t, t)
        }),
        (M.prototype.sqrt = function (t) {
          if (t.isZero()) return t.clone()
          var e = this.m.andln(3)
          if ((i(e % 2 == 1), 3 === e)) {
            var r = this.m.add(new n(1)).iushrn(2)
            return this.pow(t, r)
          }
          for (var s = this.m.subn(1), a = 0; !s.isZero() && 0 === s.andln(1); )
            a++, s.iushrn(1)
          i(!s.isZero())
          var o = new n(1).toRed(this),
            u = o.redNeg(),
            h = this.m.subn(1).iushrn(1),
            d = this.m.bitLength()
          for (d = new n(2 * d * d).toRed(this); 0 !== this.pow(d, h).cmp(u); )
            d.redIAdd(u)
          for (
            var l = this.pow(d, s),
              f = this.pow(t, s.addn(1).iushrn(1)),
              c = this.pow(t, s),
              p = a;
            0 !== c.cmp(o);

          ) {
            for (var m = c, g = 0; 0 !== m.cmp(o); g++) m = m.redSqr()
            i(g < p)
            var y = this.pow(l, new n(1).iushln(p - g - 1))
            ;(f = f.redMul(y)), (l = y.redSqr()), (c = c.redMul(l)), (p = g)
          }
          return f
        }),
        (M.prototype.invm = function (t) {
          var e = t._invmp(this.m)
          return 0 !== e.negative
            ? ((e.negative = 0), this.imod(e).redNeg())
            : this.imod(e)
        }),
        (M.prototype.pow = function (t, e) {
          if (e.isZero()) return new n(1)
          if (0 === e.cmpn(1)) return t.clone()
          var i = new Array(16)
          ;(i[0] = new n(1).toRed(this)), (i[1] = t)
          for (var r = 2; r < i.length; r++) i[r] = this.mul(i[r - 1], t)
          var s = i[0],
            a = 0,
            o = 0,
            u = e.bitLength() % 26
          for (0 === u && (u = 26), r = e.length - 1; r >= 0; r--) {
            for (var h = e.words[r], d = u - 1; d >= 0; d--) {
              var l = (h >> d) & 1
              s !== i[0] && (s = this.sqr(s)),
                0 !== l || 0 !== a
                  ? ((a <<= 1),
                    (a |= l),
                    (4 == ++o || (0 === r && 0 === d)) &&
                      ((s = this.mul(s, i[a])), (o = 0), (a = 0)))
                  : (o = 0)
            }
            u = 26
          }
          return s
        }),
        (M.prototype.convertTo = function (t) {
          var e = t.umod(this.m)
          return e === t ? e.clone() : e
        }),
        (M.prototype.convertFrom = function (t) {
          var e = t.clone()
          return (e.red = null), e
        }),
        (n.mont = function (t) {
          return new A(t)
        }),
        r(A, M),
        (A.prototype.convertTo = function (t) {
          return this.imod(t.ushln(this.shift))
        }),
        (A.prototype.convertFrom = function (t) {
          var e = this.imod(t.mul(this.rinv))
          return (e.red = null), e
        }),
        (A.prototype.imul = function (t, e) {
          if (t.isZero() || e.isZero())
            return (t.words[0] = 0), (t.length = 1), t
          var i = t.imul(e),
            r = i
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m),
            n = i.isub(r).iushrn(this.shift),
            s = n
          return (
            n.cmp(this.m) >= 0
              ? (s = n.isub(this.m))
              : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
            s._forceRed(this)
          )
        }),
        (A.prototype.mul = function (t, e) {
          if (t.isZero() || e.isZero()) return new n(0)._forceRed(this)
          var i = t.mul(e),
            r = i
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m),
            s = i.isub(r).iushrn(this.shift),
            a = s
          return (
            s.cmp(this.m) >= 0
              ? (a = s.isub(this.m))
              : s.cmpn(0) < 0 && (a = s.iadd(this.m)),
            a._forceRed(this)
          )
        }),
        (A.prototype.invm = function (t) {
          return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
        })
    })(t, bt)
  }),
  At = wt(function (t) {
    !(function (t, e) {
      function i(t, e) {
        if (!t) throw new Error(e || 'Assertion failed')
      }
      function r(t, e) {
        t.super_ = e
        var i = function () {}
        ;(i.prototype = e.prototype),
          (t.prototype = new i()),
          (t.prototype.constructor = t)
      }
      function n(t, e, i) {
        if (n.isBN(t)) return t
        ;(this.negative = 0),
          (this.words = null),
          (this.length = 0),
          (this.red = null),
          null !== t &&
            (('le' !== e && 'be' !== e) || ((i = e), (e = 10)),
            this._init(t || 0, e || 10, i || 'be'))
      }
      var s
      'object' == typeof t ? (t.exports = n) : (e.BN = n),
        (n.BN = n),
        (n.wordSize = 26)
      try {
        s = vt('buffer').Buffer
      } catch (t) {}
      function a(t, e, i) {
        for (var r = 0, n = Math.min(t.length, i), s = e; s < n; s++) {
          var a = t.charCodeAt(s) - 48
          ;(r <<= 4),
            (r |=
              a >= 49 && a <= 54
                ? a - 49 + 10
                : a >= 17 && a <= 22
                ? a - 17 + 10
                : 15 & a)
        }
        return r
      }
      function o(t, e, i, r) {
        for (var n = 0, s = Math.min(t.length, i), a = e; a < s; a++) {
          var o = t.charCodeAt(a) - 48
          ;(n *= r), (n += o >= 49 ? o - 49 + 10 : o >= 17 ? o - 17 + 10 : o)
        }
        return n
      }
      ;(n.isBN = function (t) {
        return (
          t instanceof n ||
          (null !== t &&
            'object' == typeof t &&
            t.constructor.wordSize === n.wordSize &&
            Array.isArray(t.words))
        )
      }),
        (n.max = function (t, e) {
          return t.cmp(e) > 0 ? t : e
        }),
        (n.min = function (t, e) {
          return t.cmp(e) < 0 ? t : e
        }),
        (n.prototype._init = function (t, e, r) {
          if ('number' == typeof t) return this._initNumber(t, e, r)
          if ('object' == typeof t) return this._initArray(t, e, r)
          'hex' === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36)
          var n = 0
          '-' === (t = t.toString().replace(/\s+/g, ''))[0] && n++,
            16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n),
            '-' === t[0] && (this.negative = 1),
            this.strip(),
            'le' === r && this._initArray(this.toArray(), e, r)
        }),
        (n.prototype._initNumber = function (t, e, r) {
          t < 0 && ((this.negative = 1), (t = -t)),
            t < 67108864
              ? ((this.words = [67108863 & t]), (this.length = 1))
              : t < 4503599627370496
              ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                (this.length = 2))
              : (i(t < 9007199254740992),
                (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                (this.length = 3)),
            'le' === r && this._initArray(this.toArray(), e, r)
        }),
        (n.prototype._initArray = function (t, e, r) {
          if ((i('number' == typeof t.length), t.length <= 0))
            return (this.words = [0]), (this.length = 1), this
          ;(this.length = Math.ceil(t.length / 3)),
            (this.words = new Array(this.length))
          for (var n = 0; n < this.length; n++) this.words[n] = 0
          var s,
            a,
            o = 0
          if ('be' === r)
            for (n = t.length - 1, s = 0; n >= 0; n -= 3)
              (this.words[s] |=
                ((a = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)) << o) &
                67108863),
                (this.words[s + 1] = (a >>> (26 - o)) & 67108863),
                (o += 24) >= 26 && ((o -= 26), s++)
          else if ('le' === r)
            for (n = 0, s = 0; n < t.length; n += 3)
              (this.words[s] |=
                ((a = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) << o) &
                67108863),
                (this.words[s + 1] = (a >>> (26 - o)) & 67108863),
                (o += 24) >= 26 && ((o -= 26), s++)
          return this.strip()
        }),
        (n.prototype._parseHex = function (t, e) {
          ;(this.length = Math.ceil((t.length - e) / 6)),
            (this.words = new Array(this.length))
          for (var i = 0; i < this.length; i++) this.words[i] = 0
          var r,
            n,
            s = 0
          for (i = t.length - 6, r = 0; i >= e; i -= 6)
            (n = a(t, i, i + 6)),
              (this.words[r] |= (n << s) & 67108863),
              (this.words[r + 1] |= (n >>> (26 - s)) & 4194303),
              (s += 24) >= 26 && ((s -= 26), r++)
          i + 6 !== e &&
            ((n = a(t, e, i + 6)),
            (this.words[r] |= (n << s) & 67108863),
            (this.words[r + 1] |= (n >>> (26 - s)) & 4194303)),
            this.strip()
        }),
        (n.prototype._parseBase = function (t, e, i) {
          ;(this.words = [0]), (this.length = 1)
          for (var r = 0, n = 1; n <= 67108863; n *= e) r++
          r--, (n = (n / e) | 0)
          for (
            var s = t.length - i,
              a = s % r,
              u = Math.min(s, s - a) + i,
              h = 0,
              d = i;
            d < u;
            d += r
          )
            (h = o(t, d, d + r, e)),
              this.imuln(n),
              this.words[0] + h < 67108864
                ? (this.words[0] += h)
                : this._iaddn(h)
          if (0 !== a) {
            var l = 1
            for (h = o(t, d, t.length, e), d = 0; d < a; d++) l *= e
            this.imuln(l),
              this.words[0] + h < 67108864
                ? (this.words[0] += h)
                : this._iaddn(h)
          }
        }),
        (n.prototype.copy = function (t) {
          t.words = new Array(this.length)
          for (var e = 0; e < this.length; e++) t.words[e] = this.words[e]
          ;(t.length = this.length),
            (t.negative = this.negative),
            (t.red = this.red)
        }),
        (n.prototype.clone = function () {
          var t = new n(null)
          return this.copy(t), t
        }),
        (n.prototype._expand = function (t) {
          for (; this.length < t; ) this.words[this.length++] = 0
          return this
        }),
        (n.prototype.strip = function () {
          for (; this.length > 1 && 0 === this.words[this.length - 1]; )
            this.length--
          return this._normSign()
        }),
        (n.prototype._normSign = function () {
          return (
            1 === this.length && 0 === this.words[0] && (this.negative = 0),
            this
          )
        }),
        (n.prototype.inspect = function () {
          return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
        })
      var u = [
          '',
          '0',
          '00',
          '000',
          '0000',
          '00000',
          '000000',
          '0000000',
          '00000000',
          '000000000',
          '0000000000',
          '00000000000',
          '000000000000',
          '0000000000000',
          '00000000000000',
          '000000000000000',
          '0000000000000000',
          '00000000000000000',
          '000000000000000000',
          '0000000000000000000',
          '00000000000000000000',
          '000000000000000000000',
          '0000000000000000000000',
          '00000000000000000000000',
          '000000000000000000000000',
          '0000000000000000000000000'
        ],
        h = [
          0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        d = [
          0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
          16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
          11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
          5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
          20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
          60466176
        ]
      function l(t, e, i) {
        i.negative = e.negative ^ t.negative
        var r = (t.length + e.length) | 0
        ;(i.length = r), (r = (r - 1) | 0)
        var n = 0 | t.words[0],
          s = 0 | e.words[0],
          a = n * s,
          o = (a / 67108864) | 0
        i.words[0] = 67108863 & a
        for (var u = 1; u < r; u++) {
          for (
            var h = o >>> 26,
              d = 67108863 & o,
              l = Math.min(u, e.length - 1),
              f = Math.max(0, u - t.length + 1);
            f <= l;
            f++
          )
            (h +=
              ((a = (n = 0 | t.words[(u - f) | 0]) * (s = 0 | e.words[f]) + d) /
                67108864) |
              0),
              (d = 67108863 & a)
          ;(i.words[u] = 0 | d), (o = 0 | h)
        }
        return 0 !== o ? (i.words[u] = 0 | o) : i.length--, i.strip()
      }
      ;(n.prototype.toString = function (t, e) {
        var r
        if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
          r = ''
          for (var n = 0, s = 0, a = 0; a < this.length; a++) {
            var o = this.words[a],
              l = (16777215 & ((o << n) | s)).toString(16)
            ;(r =
              0 != (s = (o >>> (24 - n)) & 16777215) || a !== this.length - 1
                ? u[6 - l.length] + l + r
                : l + r),
              (n += 2) >= 26 && ((n -= 26), a--)
          }
          for (0 !== s && (r = s.toString(16) + r); r.length % e != 0; )
            r = '0' + r
          return 0 !== this.negative && (r = '-' + r), r
        }
        if (t === (0 | t) && t >= 2 && t <= 36) {
          var f = h[t],
            c = d[t]
          r = ''
          var p = this.clone()
          for (p.negative = 0; !p.isZero(); ) {
            var m = p.modn(c).toString(t)
            r = (p = p.idivn(c)).isZero() ? m + r : u[f - m.length] + m + r
          }
          for (this.isZero() && (r = '0' + r); r.length % e != 0; ) r = '0' + r
          return 0 !== this.negative && (r = '-' + r), r
        }
        i(!1, 'Base should be between 2 and 36')
      }),
        (n.prototype.toNumber = function () {
          var t = this.words[0]
          return (
            2 === this.length
              ? (t += 67108864 * this.words[1])
              : 3 === this.length && 1 === this.words[2]
              ? (t += 4503599627370496 + 67108864 * this.words[1])
              : this.length > 2 &&
                i(!1, 'Number can only safely store up to 53 bits'),
            0 !== this.negative ? -t : t
          )
        }),
        (n.prototype.toJSON = function () {
          return this.toString(16)
        }),
        (n.prototype.toBuffer = function (t, e) {
          return i(void 0 !== s), this.toArrayLike(s, t, e)
        }),
        (n.prototype.toArray = function (t, e) {
          return this.toArrayLike(Array, t, e)
        }),
        (n.prototype.toArrayLike = function (t, e, r) {
          var n = this.byteLength(),
            s = r || Math.max(1, n)
          i(n <= s, 'byte array longer than desired length'),
            i(s > 0, 'Requested array length <= 0'),
            this.strip()
          var a,
            o,
            u = 'le' === e,
            h = new t(s),
            d = this.clone()
          if (u) {
            for (o = 0; !d.isZero(); o++)
              (a = d.andln(255)), d.iushrn(8), (h[o] = a)
            for (; o < s; o++) h[o] = 0
          } else {
            for (o = 0; o < s - n; o++) h[o] = 0
            for (o = 0; !d.isZero(); o++)
              (a = d.andln(255)), d.iushrn(8), (h[s - o - 1] = a)
          }
          return h
        }),
        (n.prototype._countBits = Math.clz32
          ? function (t) {
              return 32 - Math.clz32(t)
            }
          : function (t) {
              var e = t,
                i = 0
              return (
                e >= 4096 && ((i += 13), (e >>>= 13)),
                e >= 64 && ((i += 7), (e >>>= 7)),
                e >= 8 && ((i += 4), (e >>>= 4)),
                e >= 2 && ((i += 2), (e >>>= 2)),
                i + e
              )
            }),
        (n.prototype._zeroBits = function (t) {
          if (0 === t) return 26
          var e = t,
            i = 0
          return (
            0 == (8191 & e) && ((i += 13), (e >>>= 13)),
            0 == (127 & e) && ((i += 7), (e >>>= 7)),
            0 == (15 & e) && ((i += 4), (e >>>= 4)),
            0 == (3 & e) && ((i += 2), (e >>>= 2)),
            0 == (1 & e) && i++,
            i
          )
        }),
        (n.prototype.bitLength = function () {
          var t = this._countBits(this.words[this.length - 1])
          return 26 * (this.length - 1) + t
        }),
        (n.prototype.zeroBits = function () {
          if (this.isZero()) return 0
          for (var t = 0, e = 0; e < this.length; e++) {
            var i = this._zeroBits(this.words[e])
            if (((t += i), 26 !== i)) break
          }
          return t
        }),
        (n.prototype.byteLength = function () {
          return Math.ceil(this.bitLength() / 8)
        }),
        (n.prototype.toTwos = function (t) {
          return 0 !== this.negative
            ? this.abs().inotn(t).iaddn(1)
            : this.clone()
        }),
        (n.prototype.fromTwos = function (t) {
          return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
        }),
        (n.prototype.isNeg = function () {
          return 0 !== this.negative
        }),
        (n.prototype.neg = function () {
          return this.clone().ineg()
        }),
        (n.prototype.ineg = function () {
          return this.isZero() || (this.negative ^= 1), this
        }),
        (n.prototype.iuor = function (t) {
          for (; this.length < t.length; ) this.words[this.length++] = 0
          for (var e = 0; e < t.length; e++)
            this.words[e] = this.words[e] | t.words[e]
          return this.strip()
        }),
        (n.prototype.ior = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuor(t)
        }),
        (n.prototype.or = function (t) {
          return this.length > t.length
            ? this.clone().ior(t)
            : t.clone().ior(this)
        }),
        (n.prototype.uor = function (t) {
          return this.length > t.length
            ? this.clone().iuor(t)
            : t.clone().iuor(this)
        }),
        (n.prototype.iuand = function (t) {
          var e
          e = this.length > t.length ? t : this
          for (var i = 0; i < e.length; i++)
            this.words[i] = this.words[i] & t.words[i]
          return (this.length = e.length), this.strip()
        }),
        (n.prototype.iand = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuand(t)
        }),
        (n.prototype.and = function (t) {
          return this.length > t.length
            ? this.clone().iand(t)
            : t.clone().iand(this)
        }),
        (n.prototype.uand = function (t) {
          return this.length > t.length
            ? this.clone().iuand(t)
            : t.clone().iuand(this)
        }),
        (n.prototype.iuxor = function (t) {
          var e, i
          this.length > t.length ? ((e = this), (i = t)) : ((e = t), (i = this))
          for (var r = 0; r < i.length; r++)
            this.words[r] = e.words[r] ^ i.words[r]
          if (this !== e) for (; r < e.length; r++) this.words[r] = e.words[r]
          return (this.length = e.length), this.strip()
        }),
        (n.prototype.ixor = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuxor(t)
        }),
        (n.prototype.xor = function (t) {
          return this.length > t.length
            ? this.clone().ixor(t)
            : t.clone().ixor(this)
        }),
        (n.prototype.uxor = function (t) {
          return this.length > t.length
            ? this.clone().iuxor(t)
            : t.clone().iuxor(this)
        }),
        (n.prototype.inotn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = 0 | Math.ceil(t / 26),
            r = t % 26
          this._expand(e), r > 0 && e--
          for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n]
          return (
            r > 0 && (this.words[n] = ~this.words[n] & (67108863 >> (26 - r))),
            this.strip()
          )
        }),
        (n.prototype.notn = function (t) {
          return this.clone().inotn(t)
        }),
        (n.prototype.setn = function (t, e) {
          i('number' == typeof t && t >= 0)
          var r = (t / 26) | 0,
            n = t % 26
          return (
            this._expand(r + 1),
            (this.words[r] = e
              ? this.words[r] | (1 << n)
              : this.words[r] & ~(1 << n)),
            this.strip()
          )
        }),
        (n.prototype.iadd = function (t) {
          var e, i, r
          if (0 !== this.negative && 0 === t.negative)
            return (
              (this.negative = 0),
              (e = this.isub(t)),
              (this.negative ^= 1),
              this._normSign()
            )
          if (0 === this.negative && 0 !== t.negative)
            return (
              (t.negative = 0),
              (e = this.isub(t)),
              (t.negative = 1),
              e._normSign()
            )
          this.length > t.length ? ((i = this), (r = t)) : ((i = t), (r = this))
          for (var n = 0, s = 0; s < r.length; s++)
            (this.words[s] =
              67108863 & (e = (0 | i.words[s]) + (0 | r.words[s]) + n)),
              (n = e >>> 26)
          for (; 0 !== n && s < i.length; s++)
            (this.words[s] = 67108863 & (e = (0 | i.words[s]) + n)),
              (n = e >>> 26)
          if (((this.length = i.length), 0 !== n))
            (this.words[this.length] = n), this.length++
          else if (i !== this)
            for (; s < i.length; s++) this.words[s] = i.words[s]
          return this
        }),
        (n.prototype.add = function (t) {
          var e
          return 0 !== t.negative && 0 === this.negative
            ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
            : 0 === t.negative && 0 !== this.negative
            ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
            : this.length > t.length
            ? this.clone().iadd(t)
            : t.clone().iadd(this)
        }),
        (n.prototype.isub = function (t) {
          if (0 !== t.negative) {
            t.negative = 0
            var e = this.iadd(t)
            return (t.negative = 1), e._normSign()
          }
          if (0 !== this.negative)
            return (
              (this.negative = 0),
              this.iadd(t),
              (this.negative = 1),
              this._normSign()
            )
          var i,
            r,
            n = this.cmp(t)
          if (0 === n)
            return (
              (this.negative = 0), (this.length = 1), (this.words[0] = 0), this
            )
          n > 0 ? ((i = this), (r = t)) : ((i = t), (r = this))
          for (var s = 0, a = 0; a < r.length; a++)
            (s = (e = (0 | i.words[a]) - (0 | r.words[a]) + s) >> 26),
              (this.words[a] = 67108863 & e)
          for (; 0 !== s && a < i.length; a++)
            (s = (e = (0 | i.words[a]) + s) >> 26),
              (this.words[a] = 67108863 & e)
          if (0 === s && a < i.length && i !== this)
            for (; a < i.length; a++) this.words[a] = i.words[a]
          return (
            (this.length = Math.max(this.length, a)),
            i !== this && (this.negative = 1),
            this.strip()
          )
        }),
        (n.prototype.sub = function (t) {
          return this.clone().isub(t)
        })
      var f = function (t, e, i) {
        var r,
          n,
          s,
          a = t.words,
          o = e.words,
          u = i.words,
          h = 0,
          d = 0 | a[0],
          l = 8191 & d,
          f = d >>> 13,
          c = 0 | a[1],
          p = 8191 & c,
          m = c >>> 13,
          g = 0 | a[2],
          y = 8191 & g,
          b = g >>> 13,
          w = 0 | a[3],
          v = 8191 & w,
          M = w >>> 13,
          A = 0 | a[4],
          _ = 8191 & A,
          S = A >>> 13,
          T = 0 | a[5],
          x = 8191 & T,
          E = T >>> 13,
          R = 0 | a[6],
          k = 8191 & R,
          I = R >>> 13,
          B = 0 | a[7],
          O = 8191 & B,
          P = B >>> 13,
          C = 0 | a[8],
          N = 8191 & C,
          L = C >>> 13,
          D = 0 | a[9],
          F = 8191 & D,
          U = D >>> 13,
          q = 0 | o[0],
          j = 8191 & q,
          z = q >>> 13,
          W = 0 | o[1],
          $ = 8191 & W,
          H = W >>> 13,
          G = 0 | o[2],
          Z = 8191 & G,
          K = G >>> 13,
          V = 0 | o[3],
          J = 8191 & V,
          X = V >>> 13,
          Y = 0 | o[4],
          Q = 8191 & Y,
          tt = Y >>> 13,
          et = 0 | o[5],
          it = 8191 & et,
          rt = et >>> 13,
          nt = 0 | o[6],
          st = 8191 & nt,
          at = nt >>> 13,
          ot = 0 | o[7],
          ut = 8191 & ot,
          ht = ot >>> 13,
          dt = 0 | o[8],
          lt = 8191 & dt,
          ft = dt >>> 13,
          ct = 0 | o[9],
          pt = 8191 & ct,
          mt = ct >>> 13
        ;(i.negative = t.negative ^ e.negative), (i.length = 19)
        var gt =
          (((h + (r = Math.imul(l, j))) | 0) +
            ((8191 & (n = ((n = Math.imul(l, z)) + Math.imul(f, j)) | 0)) <<
              13)) |
          0
        ;(h = ((((s = Math.imul(f, z)) + (n >>> 13)) | 0) + (gt >>> 26)) | 0),
          (gt &= 67108863),
          (r = Math.imul(p, j)),
          (n = ((n = Math.imul(p, z)) + Math.imul(m, j)) | 0),
          (s = Math.imul(m, z))
        var yt =
          (((h + (r = (r + Math.imul(l, $)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, H)) | 0) + Math.imul(f, $)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, H)) | 0) + (n >>> 13)) | 0) + (yt >>> 26)) |
          0),
          (yt &= 67108863),
          (r = Math.imul(y, j)),
          (n = ((n = Math.imul(y, z)) + Math.imul(b, j)) | 0),
          (s = Math.imul(b, z)),
          (r = (r + Math.imul(p, $)) | 0),
          (n = ((n = (n + Math.imul(p, H)) | 0) + Math.imul(m, $)) | 0),
          (s = (s + Math.imul(m, H)) | 0)
        var bt =
          (((h + (r = (r + Math.imul(l, Z)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, K)) | 0) + Math.imul(f, Z)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, K)) | 0) + (n >>> 13)) | 0) + (bt >>> 26)) |
          0),
          (bt &= 67108863),
          (r = Math.imul(v, j)),
          (n = ((n = Math.imul(v, z)) + Math.imul(M, j)) | 0),
          (s = Math.imul(M, z)),
          (r = (r + Math.imul(y, $)) | 0),
          (n = ((n = (n + Math.imul(y, H)) | 0) + Math.imul(b, $)) | 0),
          (s = (s + Math.imul(b, H)) | 0),
          (r = (r + Math.imul(p, Z)) | 0),
          (n = ((n = (n + Math.imul(p, K)) | 0) + Math.imul(m, Z)) | 0),
          (s = (s + Math.imul(m, K)) | 0)
        var wt =
          (((h + (r = (r + Math.imul(l, J)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, X)) | 0) + Math.imul(f, J)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, X)) | 0) + (n >>> 13)) | 0) + (wt >>> 26)) |
          0),
          (wt &= 67108863),
          (r = Math.imul(_, j)),
          (n = ((n = Math.imul(_, z)) + Math.imul(S, j)) | 0),
          (s = Math.imul(S, z)),
          (r = (r + Math.imul(v, $)) | 0),
          (n = ((n = (n + Math.imul(v, H)) | 0) + Math.imul(M, $)) | 0),
          (s = (s + Math.imul(M, H)) | 0),
          (r = (r + Math.imul(y, Z)) | 0),
          (n = ((n = (n + Math.imul(y, K)) | 0) + Math.imul(b, Z)) | 0),
          (s = (s + Math.imul(b, K)) | 0),
          (r = (r + Math.imul(p, J)) | 0),
          (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, J)) | 0),
          (s = (s + Math.imul(m, X)) | 0)
        var vt =
          (((h + (r = (r + Math.imul(l, Q)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, tt)) | 0) + Math.imul(f, Q)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, tt)) | 0) + (n >>> 13)) | 0) +
            (vt >>> 26)) |
          0),
          (vt &= 67108863),
          (r = Math.imul(x, j)),
          (n = ((n = Math.imul(x, z)) + Math.imul(E, j)) | 0),
          (s = Math.imul(E, z)),
          (r = (r + Math.imul(_, $)) | 0),
          (n = ((n = (n + Math.imul(_, H)) | 0) + Math.imul(S, $)) | 0),
          (s = (s + Math.imul(S, H)) | 0),
          (r = (r + Math.imul(v, Z)) | 0),
          (n = ((n = (n + Math.imul(v, K)) | 0) + Math.imul(M, Z)) | 0),
          (s = (s + Math.imul(M, K)) | 0),
          (r = (r + Math.imul(y, J)) | 0),
          (n = ((n = (n + Math.imul(y, X)) | 0) + Math.imul(b, J)) | 0),
          (s = (s + Math.imul(b, X)) | 0),
          (r = (r + Math.imul(p, Q)) | 0),
          (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
          (s = (s + Math.imul(m, tt)) | 0)
        var Mt =
          (((h + (r = (r + Math.imul(l, it)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, rt)) | 0) + Math.imul(f, it)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, rt)) | 0) + (n >>> 13)) | 0) +
            (Mt >>> 26)) |
          0),
          (Mt &= 67108863),
          (r = Math.imul(k, j)),
          (n = ((n = Math.imul(k, z)) + Math.imul(I, j)) | 0),
          (s = Math.imul(I, z)),
          (r = (r + Math.imul(x, $)) | 0),
          (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(E, $)) | 0),
          (s = (s + Math.imul(E, H)) | 0),
          (r = (r + Math.imul(_, Z)) | 0),
          (n = ((n = (n + Math.imul(_, K)) | 0) + Math.imul(S, Z)) | 0),
          (s = (s + Math.imul(S, K)) | 0),
          (r = (r + Math.imul(v, J)) | 0),
          (n = ((n = (n + Math.imul(v, X)) | 0) + Math.imul(M, J)) | 0),
          (s = (s + Math.imul(M, X)) | 0),
          (r = (r + Math.imul(y, Q)) | 0),
          (n = ((n = (n + Math.imul(y, tt)) | 0) + Math.imul(b, Q)) | 0),
          (s = (s + Math.imul(b, tt)) | 0),
          (r = (r + Math.imul(p, it)) | 0),
          (n = ((n = (n + Math.imul(p, rt)) | 0) + Math.imul(m, it)) | 0),
          (s = (s + Math.imul(m, rt)) | 0)
        var At =
          (((h + (r = (r + Math.imul(l, st)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, at)) | 0) + Math.imul(f, st)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, at)) | 0) + (n >>> 13)) | 0) +
            (At >>> 26)) |
          0),
          (At &= 67108863),
          (r = Math.imul(O, j)),
          (n = ((n = Math.imul(O, z)) + Math.imul(P, j)) | 0),
          (s = Math.imul(P, z)),
          (r = (r + Math.imul(k, $)) | 0),
          (n = ((n = (n + Math.imul(k, H)) | 0) + Math.imul(I, $)) | 0),
          (s = (s + Math.imul(I, H)) | 0),
          (r = (r + Math.imul(x, Z)) | 0),
          (n = ((n = (n + Math.imul(x, K)) | 0) + Math.imul(E, Z)) | 0),
          (s = (s + Math.imul(E, K)) | 0),
          (r = (r + Math.imul(_, J)) | 0),
          (n = ((n = (n + Math.imul(_, X)) | 0) + Math.imul(S, J)) | 0),
          (s = (s + Math.imul(S, X)) | 0),
          (r = (r + Math.imul(v, Q)) | 0),
          (n = ((n = (n + Math.imul(v, tt)) | 0) + Math.imul(M, Q)) | 0),
          (s = (s + Math.imul(M, tt)) | 0),
          (r = (r + Math.imul(y, it)) | 0),
          (n = ((n = (n + Math.imul(y, rt)) | 0) + Math.imul(b, it)) | 0),
          (s = (s + Math.imul(b, rt)) | 0),
          (r = (r + Math.imul(p, st)) | 0),
          (n = ((n = (n + Math.imul(p, at)) | 0) + Math.imul(m, st)) | 0),
          (s = (s + Math.imul(m, at)) | 0)
        var _t =
          (((h + (r = (r + Math.imul(l, ut)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, ht)) | 0) + Math.imul(f, ut)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, ht)) | 0) + (n >>> 13)) | 0) +
            (_t >>> 26)) |
          0),
          (_t &= 67108863),
          (r = Math.imul(N, j)),
          (n = ((n = Math.imul(N, z)) + Math.imul(L, j)) | 0),
          (s = Math.imul(L, z)),
          (r = (r + Math.imul(O, $)) | 0),
          (n = ((n = (n + Math.imul(O, H)) | 0) + Math.imul(P, $)) | 0),
          (s = (s + Math.imul(P, H)) | 0),
          (r = (r + Math.imul(k, Z)) | 0),
          (n = ((n = (n + Math.imul(k, K)) | 0) + Math.imul(I, Z)) | 0),
          (s = (s + Math.imul(I, K)) | 0),
          (r = (r + Math.imul(x, J)) | 0),
          (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(E, J)) | 0),
          (s = (s + Math.imul(E, X)) | 0),
          (r = (r + Math.imul(_, Q)) | 0),
          (n = ((n = (n + Math.imul(_, tt)) | 0) + Math.imul(S, Q)) | 0),
          (s = (s + Math.imul(S, tt)) | 0),
          (r = (r + Math.imul(v, it)) | 0),
          (n = ((n = (n + Math.imul(v, rt)) | 0) + Math.imul(M, it)) | 0),
          (s = (s + Math.imul(M, rt)) | 0),
          (r = (r + Math.imul(y, st)) | 0),
          (n = ((n = (n + Math.imul(y, at)) | 0) + Math.imul(b, st)) | 0),
          (s = (s + Math.imul(b, at)) | 0),
          (r = (r + Math.imul(p, ut)) | 0),
          (n = ((n = (n + Math.imul(p, ht)) | 0) + Math.imul(m, ut)) | 0),
          (s = (s + Math.imul(m, ht)) | 0)
        var St =
          (((h + (r = (r + Math.imul(l, lt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, ft)) | 0) + Math.imul(f, lt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, ft)) | 0) + (n >>> 13)) | 0) +
            (St >>> 26)) |
          0),
          (St &= 67108863),
          (r = Math.imul(F, j)),
          (n = ((n = Math.imul(F, z)) + Math.imul(U, j)) | 0),
          (s = Math.imul(U, z)),
          (r = (r + Math.imul(N, $)) | 0),
          (n = ((n = (n + Math.imul(N, H)) | 0) + Math.imul(L, $)) | 0),
          (s = (s + Math.imul(L, H)) | 0),
          (r = (r + Math.imul(O, Z)) | 0),
          (n = ((n = (n + Math.imul(O, K)) | 0) + Math.imul(P, Z)) | 0),
          (s = (s + Math.imul(P, K)) | 0),
          (r = (r + Math.imul(k, J)) | 0),
          (n = ((n = (n + Math.imul(k, X)) | 0) + Math.imul(I, J)) | 0),
          (s = (s + Math.imul(I, X)) | 0),
          (r = (r + Math.imul(x, Q)) | 0),
          (n = ((n = (n + Math.imul(x, tt)) | 0) + Math.imul(E, Q)) | 0),
          (s = (s + Math.imul(E, tt)) | 0),
          (r = (r + Math.imul(_, it)) | 0),
          (n = ((n = (n + Math.imul(_, rt)) | 0) + Math.imul(S, it)) | 0),
          (s = (s + Math.imul(S, rt)) | 0),
          (r = (r + Math.imul(v, st)) | 0),
          (n = ((n = (n + Math.imul(v, at)) | 0) + Math.imul(M, st)) | 0),
          (s = (s + Math.imul(M, at)) | 0),
          (r = (r + Math.imul(y, ut)) | 0),
          (n = ((n = (n + Math.imul(y, ht)) | 0) + Math.imul(b, ut)) | 0),
          (s = (s + Math.imul(b, ht)) | 0),
          (r = (r + Math.imul(p, lt)) | 0),
          (n = ((n = (n + Math.imul(p, ft)) | 0) + Math.imul(m, lt)) | 0),
          (s = (s + Math.imul(m, ft)) | 0)
        var Tt =
          (((h + (r = (r + Math.imul(l, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, mt)) | 0) + Math.imul(f, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, mt)) | 0) + (n >>> 13)) | 0) +
            (Tt >>> 26)) |
          0),
          (Tt &= 67108863),
          (r = Math.imul(F, $)),
          (n = ((n = Math.imul(F, H)) + Math.imul(U, $)) | 0),
          (s = Math.imul(U, H)),
          (r = (r + Math.imul(N, Z)) | 0),
          (n = ((n = (n + Math.imul(N, K)) | 0) + Math.imul(L, Z)) | 0),
          (s = (s + Math.imul(L, K)) | 0),
          (r = (r + Math.imul(O, J)) | 0),
          (n = ((n = (n + Math.imul(O, X)) | 0) + Math.imul(P, J)) | 0),
          (s = (s + Math.imul(P, X)) | 0),
          (r = (r + Math.imul(k, Q)) | 0),
          (n = ((n = (n + Math.imul(k, tt)) | 0) + Math.imul(I, Q)) | 0),
          (s = (s + Math.imul(I, tt)) | 0),
          (r = (r + Math.imul(x, it)) | 0),
          (n = ((n = (n + Math.imul(x, rt)) | 0) + Math.imul(E, it)) | 0),
          (s = (s + Math.imul(E, rt)) | 0),
          (r = (r + Math.imul(_, st)) | 0),
          (n = ((n = (n + Math.imul(_, at)) | 0) + Math.imul(S, st)) | 0),
          (s = (s + Math.imul(S, at)) | 0),
          (r = (r + Math.imul(v, ut)) | 0),
          (n = ((n = (n + Math.imul(v, ht)) | 0) + Math.imul(M, ut)) | 0),
          (s = (s + Math.imul(M, ht)) | 0),
          (r = (r + Math.imul(y, lt)) | 0),
          (n = ((n = (n + Math.imul(y, ft)) | 0) + Math.imul(b, lt)) | 0),
          (s = (s + Math.imul(b, ft)) | 0)
        var xt =
          (((h + (r = (r + Math.imul(p, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(m, mt)) | 0) + (n >>> 13)) | 0) +
            (xt >>> 26)) |
          0),
          (xt &= 67108863),
          (r = Math.imul(F, Z)),
          (n = ((n = Math.imul(F, K)) + Math.imul(U, Z)) | 0),
          (s = Math.imul(U, K)),
          (r = (r + Math.imul(N, J)) | 0),
          (n = ((n = (n + Math.imul(N, X)) | 0) + Math.imul(L, J)) | 0),
          (s = (s + Math.imul(L, X)) | 0),
          (r = (r + Math.imul(O, Q)) | 0),
          (n = ((n = (n + Math.imul(O, tt)) | 0) + Math.imul(P, Q)) | 0),
          (s = (s + Math.imul(P, tt)) | 0),
          (r = (r + Math.imul(k, it)) | 0),
          (n = ((n = (n + Math.imul(k, rt)) | 0) + Math.imul(I, it)) | 0),
          (s = (s + Math.imul(I, rt)) | 0),
          (r = (r + Math.imul(x, st)) | 0),
          (n = ((n = (n + Math.imul(x, at)) | 0) + Math.imul(E, st)) | 0),
          (s = (s + Math.imul(E, at)) | 0),
          (r = (r + Math.imul(_, ut)) | 0),
          (n = ((n = (n + Math.imul(_, ht)) | 0) + Math.imul(S, ut)) | 0),
          (s = (s + Math.imul(S, ht)) | 0),
          (r = (r + Math.imul(v, lt)) | 0),
          (n = ((n = (n + Math.imul(v, ft)) | 0) + Math.imul(M, lt)) | 0),
          (s = (s + Math.imul(M, ft)) | 0)
        var Et =
          (((h + (r = (r + Math.imul(y, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(y, mt)) | 0) + Math.imul(b, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(b, mt)) | 0) + (n >>> 13)) | 0) +
            (Et >>> 26)) |
          0),
          (Et &= 67108863),
          (r = Math.imul(F, J)),
          (n = ((n = Math.imul(F, X)) + Math.imul(U, J)) | 0),
          (s = Math.imul(U, X)),
          (r = (r + Math.imul(N, Q)) | 0),
          (n = ((n = (n + Math.imul(N, tt)) | 0) + Math.imul(L, Q)) | 0),
          (s = (s + Math.imul(L, tt)) | 0),
          (r = (r + Math.imul(O, it)) | 0),
          (n = ((n = (n + Math.imul(O, rt)) | 0) + Math.imul(P, it)) | 0),
          (s = (s + Math.imul(P, rt)) | 0),
          (r = (r + Math.imul(k, st)) | 0),
          (n = ((n = (n + Math.imul(k, at)) | 0) + Math.imul(I, st)) | 0),
          (s = (s + Math.imul(I, at)) | 0),
          (r = (r + Math.imul(x, ut)) | 0),
          (n = ((n = (n + Math.imul(x, ht)) | 0) + Math.imul(E, ut)) | 0),
          (s = (s + Math.imul(E, ht)) | 0),
          (r = (r + Math.imul(_, lt)) | 0),
          (n = ((n = (n + Math.imul(_, ft)) | 0) + Math.imul(S, lt)) | 0),
          (s = (s + Math.imul(S, ft)) | 0)
        var Rt =
          (((h + (r = (r + Math.imul(v, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(v, mt)) | 0) + Math.imul(M, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(M, mt)) | 0) + (n >>> 13)) | 0) +
            (Rt >>> 26)) |
          0),
          (Rt &= 67108863),
          (r = Math.imul(F, Q)),
          (n = ((n = Math.imul(F, tt)) + Math.imul(U, Q)) | 0),
          (s = Math.imul(U, tt)),
          (r = (r + Math.imul(N, it)) | 0),
          (n = ((n = (n + Math.imul(N, rt)) | 0) + Math.imul(L, it)) | 0),
          (s = (s + Math.imul(L, rt)) | 0),
          (r = (r + Math.imul(O, st)) | 0),
          (n = ((n = (n + Math.imul(O, at)) | 0) + Math.imul(P, st)) | 0),
          (s = (s + Math.imul(P, at)) | 0),
          (r = (r + Math.imul(k, ut)) | 0),
          (n = ((n = (n + Math.imul(k, ht)) | 0) + Math.imul(I, ut)) | 0),
          (s = (s + Math.imul(I, ht)) | 0),
          (r = (r + Math.imul(x, lt)) | 0),
          (n = ((n = (n + Math.imul(x, ft)) | 0) + Math.imul(E, lt)) | 0),
          (s = (s + Math.imul(E, ft)) | 0)
        var kt =
          (((h + (r = (r + Math.imul(_, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(_, mt)) | 0) + Math.imul(S, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(S, mt)) | 0) + (n >>> 13)) | 0) +
            (kt >>> 26)) |
          0),
          (kt &= 67108863),
          (r = Math.imul(F, it)),
          (n = ((n = Math.imul(F, rt)) + Math.imul(U, it)) | 0),
          (s = Math.imul(U, rt)),
          (r = (r + Math.imul(N, st)) | 0),
          (n = ((n = (n + Math.imul(N, at)) | 0) + Math.imul(L, st)) | 0),
          (s = (s + Math.imul(L, at)) | 0),
          (r = (r + Math.imul(O, ut)) | 0),
          (n = ((n = (n + Math.imul(O, ht)) | 0) + Math.imul(P, ut)) | 0),
          (s = (s + Math.imul(P, ht)) | 0),
          (r = (r + Math.imul(k, lt)) | 0),
          (n = ((n = (n + Math.imul(k, ft)) | 0) + Math.imul(I, lt)) | 0),
          (s = (s + Math.imul(I, ft)) | 0)
        var It =
          (((h + (r = (r + Math.imul(x, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(x, mt)) | 0) + Math.imul(E, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(E, mt)) | 0) + (n >>> 13)) | 0) +
            (It >>> 26)) |
          0),
          (It &= 67108863),
          (r = Math.imul(F, st)),
          (n = ((n = Math.imul(F, at)) + Math.imul(U, st)) | 0),
          (s = Math.imul(U, at)),
          (r = (r + Math.imul(N, ut)) | 0),
          (n = ((n = (n + Math.imul(N, ht)) | 0) + Math.imul(L, ut)) | 0),
          (s = (s + Math.imul(L, ht)) | 0),
          (r = (r + Math.imul(O, lt)) | 0),
          (n = ((n = (n + Math.imul(O, ft)) | 0) + Math.imul(P, lt)) | 0),
          (s = (s + Math.imul(P, ft)) | 0)
        var Bt =
          (((h + (r = (r + Math.imul(k, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(k, mt)) | 0) + Math.imul(I, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(I, mt)) | 0) + (n >>> 13)) | 0) +
            (Bt >>> 26)) |
          0),
          (Bt &= 67108863),
          (r = Math.imul(F, ut)),
          (n = ((n = Math.imul(F, ht)) + Math.imul(U, ut)) | 0),
          (s = Math.imul(U, ht)),
          (r = (r + Math.imul(N, lt)) | 0),
          (n = ((n = (n + Math.imul(N, ft)) | 0) + Math.imul(L, lt)) | 0),
          (s = (s + Math.imul(L, ft)) | 0)
        var Ot =
          (((h + (r = (r + Math.imul(O, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(O, mt)) | 0) + Math.imul(P, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(P, mt)) | 0) + (n >>> 13)) | 0) +
            (Ot >>> 26)) |
          0),
          (Ot &= 67108863),
          (r = Math.imul(F, lt)),
          (n = ((n = Math.imul(F, ft)) + Math.imul(U, lt)) | 0),
          (s = Math.imul(U, ft))
        var Pt =
          (((h + (r = (r + Math.imul(N, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(N, mt)) | 0) + Math.imul(L, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(L, mt)) | 0) + (n >>> 13)) | 0) +
            (Pt >>> 26)) |
          0),
          (Pt &= 67108863)
        var Ct =
          (((h + (r = Math.imul(F, pt))) | 0) +
            ((8191 & (n = ((n = Math.imul(F, mt)) + Math.imul(U, pt)) | 0)) <<
              13)) |
          0
        return (
          (h = ((((s = Math.imul(U, mt)) + (n >>> 13)) | 0) + (Ct >>> 26)) | 0),
          (Ct &= 67108863),
          (u[0] = gt),
          (u[1] = yt),
          (u[2] = bt),
          (u[3] = wt),
          (u[4] = vt),
          (u[5] = Mt),
          (u[6] = At),
          (u[7] = _t),
          (u[8] = St),
          (u[9] = Tt),
          (u[10] = xt),
          (u[11] = Et),
          (u[12] = Rt),
          (u[13] = kt),
          (u[14] = It),
          (u[15] = Bt),
          (u[16] = Ot),
          (u[17] = Pt),
          (u[18] = Ct),
          0 !== h && ((u[19] = h), i.length++),
          i
        )
      }
      function c(t, e, i) {
        return new p().mulp(t, e, i)
      }
      function p(t, e) {
        ;(this.x = t), (this.y = e)
      }
      Math.imul || (f = l),
        (n.prototype.mulTo = function (t, e) {
          var i,
            r = this.length + t.length
          return (
            (i =
              10 === this.length && 10 === t.length
                ? f(this, t, e)
                : r < 63
                ? l(this, t, e)
                : r < 1024
                ? (function (t, e, i) {
                    ;(i.negative = e.negative ^ t.negative),
                      (i.length = t.length + e.length)
                    for (var r = 0, n = 0, s = 0; s < i.length - 1; s++) {
                      var a = n
                      n = 0
                      for (
                        var o = 67108863 & r,
                          u = Math.min(s, e.length - 1),
                          h = Math.max(0, s - t.length + 1);
                        h <= u;
                        h++
                      ) {
                        var d = (0 | t.words[s - h]) * (0 | e.words[h]),
                          l = 67108863 & d
                        ;(o = 67108863 & (l = (l + o) | 0)),
                          (n +=
                            (a =
                              ((a = (a + ((d / 67108864) | 0)) | 0) +
                                (l >>> 26)) |
                              0) >>> 26),
                          (a &= 67108863)
                      }
                      ;(i.words[s] = o), (r = a), (a = n)
                    }
                    return 0 !== r ? (i.words[s] = r) : i.length--, i.strip()
                  })(this, t, e)
                : c(this, t, e)),
            i
          )
        }),
        (p.prototype.makeRBT = function (t) {
          for (
            var e = new Array(t), i = n.prototype._countBits(t) - 1, r = 0;
            r < t;
            r++
          )
            e[r] = this.revBin(r, i, t)
          return e
        }),
        (p.prototype.revBin = function (t, e, i) {
          if (0 === t || t === i - 1) return t
          for (var r = 0, n = 0; n < e; n++)
            (r |= (1 & t) << (e - n - 1)), (t >>= 1)
          return r
        }),
        (p.prototype.permute = function (t, e, i, r, n, s) {
          for (var a = 0; a < s; a++) (r[a] = e[t[a]]), (n[a] = i[t[a]])
        }),
        (p.prototype.transform = function (t, e, i, r, n, s) {
          this.permute(s, t, e, i, r, n)
          for (var a = 1; a < n; a <<= 1)
            for (
              var o = a << 1,
                u = Math.cos((2 * Math.PI) / o),
                h = Math.sin((2 * Math.PI) / o),
                d = 0;
              d < n;
              d += o
            )
              for (var l = u, f = h, c = 0; c < a; c++) {
                var p = i[d + c],
                  m = r[d + c],
                  g = i[d + c + a],
                  y = r[d + c + a],
                  b = l * g - f * y
                ;(y = l * y + f * g),
                  (i[d + c] = p + (g = b)),
                  (r[d + c] = m + y),
                  (i[d + c + a] = p - g),
                  (r[d + c + a] = m - y),
                  c !== o && ((b = u * l - h * f), (f = u * f + h * l), (l = b))
              }
        }),
        (p.prototype.guessLen13b = function (t, e) {
          var i = 1 | Math.max(e, t),
            r = 1 & i,
            n = 0
          for (i = (i / 2) | 0; i; i >>>= 1) n++
          return 1 << (n + 1 + r)
        }),
        (p.prototype.conjugate = function (t, e, i) {
          if (!(i <= 1))
            for (var r = 0; r < i / 2; r++) {
              var n = t[r]
              ;(t[r] = t[i - r - 1]),
                (t[i - r - 1] = n),
                (n = e[r]),
                (e[r] = -e[i - r - 1]),
                (e[i - r - 1] = -n)
            }
        }),
        (p.prototype.normalize13b = function (t, e) {
          for (var i = 0, r = 0; r < e / 2; r++) {
            var n =
              8192 * Math.round(t[2 * r + 1] / e) + Math.round(t[2 * r] / e) + i
            ;(t[r] = 67108863 & n), (i = n < 67108864 ? 0 : (n / 67108864) | 0)
          }
          return t
        }),
        (p.prototype.convert13b = function (t, e, r, n) {
          for (var s = 0, a = 0; a < e; a++)
            (r[2 * a] = 8191 & (s += 0 | t[a])),
              (r[2 * a + 1] = 8191 & (s >>>= 13)),
              (s >>>= 13)
          for (a = 2 * e; a < n; ++a) r[a] = 0
          i(0 === s), i(0 == (-8192 & s))
        }),
        (p.prototype.stub = function (t) {
          for (var e = new Array(t), i = 0; i < t; i++) e[i] = 0
          return e
        }),
        (p.prototype.mulp = function (t, e, i) {
          var r = 2 * this.guessLen13b(t.length, e.length),
            n = this.makeRBT(r),
            s = this.stub(r),
            a = new Array(r),
            o = new Array(r),
            u = new Array(r),
            h = new Array(r),
            d = new Array(r),
            l = new Array(r),
            f = i.words
          ;(f.length = r),
            this.convert13b(t.words, t.length, a, r),
            this.convert13b(e.words, e.length, h, r),
            this.transform(a, s, o, u, r, n),
            this.transform(h, s, d, l, r, n)
          for (var c = 0; c < r; c++) {
            var p = o[c] * d[c] - u[c] * l[c]
            ;(u[c] = o[c] * l[c] + u[c] * d[c]), (o[c] = p)
          }
          return (
            this.conjugate(o, u, r),
            this.transform(o, u, f, s, r, n),
            this.conjugate(f, s, r),
            this.normalize13b(f, r),
            (i.negative = t.negative ^ e.negative),
            (i.length = t.length + e.length),
            i.strip()
          )
        }),
        (n.prototype.mul = function (t) {
          var e = new n(null)
          return (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
        }),
        (n.prototype.mulf = function (t) {
          var e = new n(null)
          return (e.words = new Array(this.length + t.length)), c(this, t, e)
        }),
        (n.prototype.imul = function (t) {
          return this.clone().mulTo(t, this)
        }),
        (n.prototype.imuln = function (t) {
          i('number' == typeof t), i(t < 67108864)
          for (var e = 0, r = 0; r < this.length; r++) {
            var n = (0 | this.words[r]) * t,
              s = (67108863 & n) + (67108863 & e)
            ;(e >>= 26),
              (e += (n / 67108864) | 0),
              (e += s >>> 26),
              (this.words[r] = 67108863 & s)
          }
          return 0 !== e && ((this.words[r] = e), this.length++), this
        }),
        (n.prototype.muln = function (t) {
          return this.clone().imuln(t)
        }),
        (n.prototype.sqr = function () {
          return this.mul(this)
        }),
        (n.prototype.isqr = function () {
          return this.imul(this.clone())
        }),
        (n.prototype.pow = function (t) {
          var e = (function (t) {
            for (var e = new Array(t.bitLength()), i = 0; i < e.length; i++) {
              var r = i % 26
              e[i] = (t.words[(i / 26) | 0] & (1 << r)) >>> r
            }
            return e
          })(t)
          if (0 === e.length) return new n(1)
          for (
            var i = this, r = 0;
            r < e.length && 0 === e[r];
            r++, i = i.sqr()
          );
          if (++r < e.length)
            for (var s = i.sqr(); r < e.length; r++, s = s.sqr())
              0 !== e[r] && (i = i.mul(s))
          return i
        }),
        (n.prototype.iushln = function (t) {
          i('number' == typeof t && t >= 0)
          var e,
            r = t % 26,
            n = (t - r) / 26,
            s = (67108863 >>> (26 - r)) << (26 - r)
          if (0 !== r) {
            var a = 0
            for (e = 0; e < this.length; e++) {
              var o = this.words[e] & s
              ;(this.words[e] = (((0 | this.words[e]) - o) << r) | a),
                (a = o >>> (26 - r))
            }
            a && ((this.words[e] = a), this.length++)
          }
          if (0 !== n) {
            for (e = this.length - 1; e >= 0; e--)
              this.words[e + n] = this.words[e]
            for (e = 0; e < n; e++) this.words[e] = 0
            this.length += n
          }
          return this.strip()
        }),
        (n.prototype.ishln = function (t) {
          return i(0 === this.negative), this.iushln(t)
        }),
        (n.prototype.iushrn = function (t, e, r) {
          var n
          i('number' == typeof t && t >= 0), (n = e ? (e - (e % 26)) / 26 : 0)
          var s = t % 26,
            a = Math.min((t - s) / 26, this.length),
            o = 67108863 ^ ((67108863 >>> s) << s),
            u = r
          if (((n -= a), (n = Math.max(0, n)), u)) {
            for (var h = 0; h < a; h++) u.words[h] = this.words[h]
            u.length = a
          }
          if (0 === a);
          else if (this.length > a)
            for (this.length -= a, h = 0; h < this.length; h++)
              this.words[h] = this.words[h + a]
          else (this.words[0] = 0), (this.length = 1)
          var d = 0
          for (h = this.length - 1; h >= 0 && (0 !== d || h >= n); h--) {
            var l = 0 | this.words[h]
            ;(this.words[h] = (d << (26 - s)) | (l >>> s)), (d = l & o)
          }
          return (
            u && 0 !== d && (u.words[u.length++] = d),
            0 === this.length && ((this.words[0] = 0), (this.length = 1)),
            this.strip()
          )
        }),
        (n.prototype.ishrn = function (t, e, r) {
          return i(0 === this.negative), this.iushrn(t, e, r)
        }),
        (n.prototype.shln = function (t) {
          return this.clone().ishln(t)
        }),
        (n.prototype.ushln = function (t) {
          return this.clone().iushln(t)
        }),
        (n.prototype.shrn = function (t) {
          return this.clone().ishrn(t)
        }),
        (n.prototype.ushrn = function (t) {
          return this.clone().iushrn(t)
        }),
        (n.prototype.testn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = t % 26,
            r = (t - e) / 26
          return !(this.length <= r || !(this.words[r] & (1 << e)))
        }),
        (n.prototype.imaskn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = t % 26,
            r = (t - e) / 26
          return (
            i(0 === this.negative, 'imaskn works only with positive numbers'),
            this.length <= r
              ? this
              : (0 !== e && r++,
                (this.length = Math.min(r, this.length)),
                0 !== e &&
                  (this.words[this.length - 1] &=
                    67108863 ^ ((67108863 >>> e) << e)),
                this.strip())
          )
        }),
        (n.prototype.maskn = function (t) {
          return this.clone().imaskn(t)
        }),
        (n.prototype.iaddn = function (t) {
          return (
            i('number' == typeof t),
            i(t < 67108864),
            t < 0
              ? this.isubn(-t)
              : 0 !== this.negative
              ? 1 === this.length && (0 | this.words[0]) < t
                ? ((this.words[0] = t - (0 | this.words[0])),
                  (this.negative = 0),
                  this)
                : ((this.negative = 0),
                  this.isubn(t),
                  (this.negative = 1),
                  this)
              : this._iaddn(t)
          )
        }),
        (n.prototype._iaddn = function (t) {
          this.words[0] += t
          for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
            (this.words[e] -= 67108864),
              e === this.length - 1
                ? (this.words[e + 1] = 1)
                : this.words[e + 1]++
          return (this.length = Math.max(this.length, e + 1)), this
        }),
        (n.prototype.isubn = function (t) {
          if ((i('number' == typeof t), i(t < 67108864), t < 0))
            return this.iaddn(-t)
          if (0 !== this.negative)
            return (this.negative = 0), this.iaddn(t), (this.negative = 1), this
          if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
            (this.words[0] = -this.words[0]), (this.negative = 1)
          else
            for (var e = 0; e < this.length && this.words[e] < 0; e++)
              (this.words[e] += 67108864), (this.words[e + 1] -= 1)
          return this.strip()
        }),
        (n.prototype.addn = function (t) {
          return this.clone().iaddn(t)
        }),
        (n.prototype.subn = function (t) {
          return this.clone().isubn(t)
        }),
        (n.prototype.iabs = function () {
          return (this.negative = 0), this
        }),
        (n.prototype.abs = function () {
          return this.clone().iabs()
        }),
        (n.prototype._ishlnsubmul = function (t, e, r) {
          var n, s
          this._expand(t.length + r)
          var a = 0
          for (n = 0; n < t.length; n++) {
            s = (0 | this.words[n + r]) + a
            var o = (0 | t.words[n]) * e
            ;(a = ((s -= 67108863 & o) >> 26) - ((o / 67108864) | 0)),
              (this.words[n + r] = 67108863 & s)
          }
          for (; n < this.length - r; n++)
            (a = (s = (0 | this.words[n + r]) + a) >> 26),
              (this.words[n + r] = 67108863 & s)
          if (0 === a) return this.strip()
          for (i(-1 === a), a = 0, n = 0; n < this.length; n++)
            (a = (s = -(0 | this.words[n]) + a) >> 26),
              (this.words[n] = 67108863 & s)
          return (this.negative = 1), this.strip()
        }),
        (n.prototype._wordDiv = function (t, e) {
          var i,
            r = this.clone(),
            s = t,
            a = 0 | s.words[s.length - 1]
          0 != (i = 26 - this._countBits(a)) &&
            ((s = s.ushln(i)), r.iushln(i), (a = 0 | s.words[s.length - 1]))
          var o,
            u = r.length - s.length
          if ('mod' !== e) {
            ;((o = new n(null)).length = u + 1), (o.words = new Array(o.length))
            for (var h = 0; h < o.length; h++) o.words[h] = 0
          }
          var d = r.clone()._ishlnsubmul(s, 1, u)
          0 === d.negative && ((r = d), o && (o.words[u] = 1))
          for (var l = u - 1; l >= 0; l--) {
            var f =
              67108864 * (0 | r.words[s.length + l]) +
              (0 | r.words[s.length + l - 1])
            for (
              f = Math.min((f / a) | 0, 67108863), r._ishlnsubmul(s, f, l);
              0 !== r.negative;

            )
              f--,
                (r.negative = 0),
                r._ishlnsubmul(s, 1, l),
                r.isZero() || (r.negative ^= 1)
            o && (o.words[l] = f)
          }
          return (
            o && o.strip(),
            r.strip(),
            'div' !== e && 0 !== i && r.iushrn(i),
            { div: o || null, mod: r }
          )
        }),
        (n.prototype.divmod = function (t, e, r) {
          return (
            i(!t.isZero()),
            this.isZero()
              ? { div: new n(0), mod: new n(0) }
              : 0 !== this.negative && 0 === t.negative
              ? ((o = this.neg().divmod(t, e)),
                'mod' !== e && (s = o.div.neg()),
                'div' !== e &&
                  ((a = o.mod.neg()), r && 0 !== a.negative && a.iadd(t)),
                { div: s, mod: a })
              : 0 === this.negative && 0 !== t.negative
              ? ((o = this.divmod(t.neg(), e)),
                'mod' !== e && (s = o.div.neg()),
                { div: s, mod: o.mod })
              : 0 != (this.negative & t.negative)
              ? ((o = this.neg().divmod(t.neg(), e)),
                'div' !== e &&
                  ((a = o.mod.neg()), r && 0 !== a.negative && a.isub(t)),
                { div: o.div, mod: a })
              : t.length > this.length || this.cmp(t) < 0
              ? { div: new n(0), mod: this }
              : 1 === t.length
              ? 'div' === e
                ? { div: this.divn(t.words[0]), mod: null }
                : 'mod' === e
                ? { div: null, mod: new n(this.modn(t.words[0])) }
                : {
                    div: this.divn(t.words[0]),
                    mod: new n(this.modn(t.words[0]))
                  }
              : this._wordDiv(t, e)
          )
          var s, a, o
        }),
        (n.prototype.div = function (t) {
          return this.divmod(t, 'div', !1).div
        }),
        (n.prototype.mod = function (t) {
          return this.divmod(t, 'mod', !1).mod
        }),
        (n.prototype.umod = function (t) {
          return this.divmod(t, 'mod', !0).mod
        }),
        (n.prototype.divRound = function (t) {
          var e = this.divmod(t)
          if (e.mod.isZero()) return e.div
          var i = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
            r = t.ushrn(1),
            n = t.andln(1),
            s = i.cmp(r)
          return s < 0 || (1 === n && 0 === s)
            ? e.div
            : 0 !== e.div.negative
            ? e.div.isubn(1)
            : e.div.iaddn(1)
        }),
        (n.prototype.modn = function (t) {
          i(t <= 67108863)
          for (var e = (1 << 26) % t, r = 0, n = this.length - 1; n >= 0; n--)
            r = (e * r + (0 | this.words[n])) % t
          return r
        }),
        (n.prototype.idivn = function (t) {
          i(t <= 67108863)
          for (var e = 0, r = this.length - 1; r >= 0; r--) {
            var n = (0 | this.words[r]) + 67108864 * e
            ;(this.words[r] = (n / t) | 0), (e = n % t)
          }
          return this.strip()
        }),
        (n.prototype.divn = function (t) {
          return this.clone().idivn(t)
        }),
        (n.prototype.egcd = function (t) {
          i(0 === t.negative), i(!t.isZero())
          var e = this,
            r = t.clone()
          e = 0 !== e.negative ? e.umod(t) : e.clone()
          for (
            var s = new n(1), a = new n(0), o = new n(0), u = new n(1), h = 0;
            e.isEven() && r.isEven();

          )
            e.iushrn(1), r.iushrn(1), ++h
          for (var d = r.clone(), l = e.clone(); !e.isZero(); ) {
            for (
              var f = 0, c = 1;
              0 == (e.words[0] & c) && f < 26;
              ++f, c <<= 1
            );
            if (f > 0)
              for (e.iushrn(f); f-- > 0; )
                (s.isOdd() || a.isOdd()) && (s.iadd(d), a.isub(l)),
                  s.iushrn(1),
                  a.iushrn(1)
            for (
              var p = 0, m = 1;
              0 == (r.words[0] & m) && p < 26;
              ++p, m <<= 1
            );
            if (p > 0)
              for (r.iushrn(p); p-- > 0; )
                (o.isOdd() || u.isOdd()) && (o.iadd(d), u.isub(l)),
                  o.iushrn(1),
                  u.iushrn(1)
            e.cmp(r) >= 0
              ? (e.isub(r), s.isub(o), a.isub(u))
              : (r.isub(e), o.isub(s), u.isub(a))
          }
          return { a: o, b: u, gcd: r.iushln(h) }
        }),
        (n.prototype._invmp = function (t) {
          i(0 === t.negative), i(!t.isZero())
          var e = this,
            r = t.clone()
          e = 0 !== e.negative ? e.umod(t) : e.clone()
          for (
            var s, a = new n(1), o = new n(0), u = r.clone();
            e.cmpn(1) > 0 && r.cmpn(1) > 0;

          ) {
            for (
              var h = 0, d = 1;
              0 == (e.words[0] & d) && h < 26;
              ++h, d <<= 1
            );
            if (h > 0)
              for (e.iushrn(h); h-- > 0; ) a.isOdd() && a.iadd(u), a.iushrn(1)
            for (
              var l = 0, f = 1;
              0 == (r.words[0] & f) && l < 26;
              ++l, f <<= 1
            );
            if (l > 0)
              for (r.iushrn(l); l-- > 0; ) o.isOdd() && o.iadd(u), o.iushrn(1)
            e.cmp(r) >= 0 ? (e.isub(r), a.isub(o)) : (r.isub(e), o.isub(a))
          }
          return (s = 0 === e.cmpn(1) ? a : o).cmpn(0) < 0 && s.iadd(t), s
        }),
        (n.prototype.gcd = function (t) {
          if (this.isZero()) return t.abs()
          if (t.isZero()) return this.abs()
          var e = this.clone(),
            i = t.clone()
          ;(e.negative = 0), (i.negative = 0)
          for (var r = 0; e.isEven() && i.isEven(); r++)
            e.iushrn(1), i.iushrn(1)
          for (;;) {
            for (; e.isEven(); ) e.iushrn(1)
            for (; i.isEven(); ) i.iushrn(1)
            var n = e.cmp(i)
            if (n < 0) {
              var s = e
              ;(e = i), (i = s)
            } else if (0 === n || 0 === i.cmpn(1)) break
            e.isub(i)
          }
          return i.iushln(r)
        }),
        (n.prototype.invm = function (t) {
          return this.egcd(t).a.umod(t)
        }),
        (n.prototype.isEven = function () {
          return 0 == (1 & this.words[0])
        }),
        (n.prototype.isOdd = function () {
          return 1 == (1 & this.words[0])
        }),
        (n.prototype.andln = function (t) {
          return this.words[0] & t
        }),
        (n.prototype.bincn = function (t) {
          i('number' == typeof t)
          var e = t % 26,
            r = (t - e) / 26,
            n = 1 << e
          if (this.length <= r)
            return this._expand(r + 1), (this.words[r] |= n), this
          for (var s = n, a = r; 0 !== s && a < this.length; a++) {
            var o = 0 | this.words[a]
            ;(s = (o += s) >>> 26), (this.words[a] = o &= 67108863)
          }
          return 0 !== s && ((this.words[a] = s), this.length++), this
        }),
        (n.prototype.isZero = function () {
          return 1 === this.length && 0 === this.words[0]
        }),
        (n.prototype.cmpn = function (t) {
          var e,
            r = t < 0
          if (0 !== this.negative && !r) return -1
          if (0 === this.negative && r) return 1
          if ((this.strip(), this.length > 1)) e = 1
          else {
            r && (t = -t), i(t <= 67108863, 'Number is too big')
            var n = 0 | this.words[0]
            e = n === t ? 0 : n < t ? -1 : 1
          }
          return 0 !== this.negative ? 0 | -e : e
        }),
        (n.prototype.cmp = function (t) {
          if (0 !== this.negative && 0 === t.negative) return -1
          if (0 === this.negative && 0 !== t.negative) return 1
          var e = this.ucmp(t)
          return 0 !== this.negative ? 0 | -e : e
        }),
        (n.prototype.ucmp = function (t) {
          if (this.length > t.length) return 1
          if (this.length < t.length) return -1
          for (var e = 0, i = this.length - 1; i >= 0; i--) {
            var r = 0 | this.words[i],
              n = 0 | t.words[i]
            if (r !== n) {
              r < n ? (e = -1) : r > n && (e = 1)
              break
            }
          }
          return e
        }),
        (n.prototype.gtn = function (t) {
          return 1 === this.cmpn(t)
        }),
        (n.prototype.gt = function (t) {
          return 1 === this.cmp(t)
        }),
        (n.prototype.gten = function (t) {
          return this.cmpn(t) >= 0
        }),
        (n.prototype.gte = function (t) {
          return this.cmp(t) >= 0
        }),
        (n.prototype.ltn = function (t) {
          return -1 === this.cmpn(t)
        }),
        (n.prototype.lt = function (t) {
          return -1 === this.cmp(t)
        }),
        (n.prototype.lten = function (t) {
          return this.cmpn(t) <= 0
        }),
        (n.prototype.lte = function (t) {
          return this.cmp(t) <= 0
        }),
        (n.prototype.eqn = function (t) {
          return 0 === this.cmpn(t)
        }),
        (n.prototype.eq = function (t) {
          return 0 === this.cmp(t)
        }),
        (n.red = function (t) {
          return new M(t)
        }),
        (n.prototype.toRed = function (t) {
          return (
            i(!this.red, 'Already a number in reduction context'),
            i(0 === this.negative, 'red works only with positives'),
            t.convertTo(this)._forceRed(t)
          )
        }),
        (n.prototype.fromRed = function () {
          return (
            i(this.red, 'fromRed works only with numbers in reduction context'),
            this.red.convertFrom(this)
          )
        }),
        (n.prototype._forceRed = function (t) {
          return (this.red = t), this
        }),
        (n.prototype.forceRed = function (t) {
          return (
            i(!this.red, 'Already a number in reduction context'),
            this._forceRed(t)
          )
        }),
        (n.prototype.redAdd = function (t) {
          return (
            i(this.red, 'redAdd works only with red numbers'),
            this.red.add(this, t)
          )
        }),
        (n.prototype.redIAdd = function (t) {
          return (
            i(this.red, 'redIAdd works only with red numbers'),
            this.red.iadd(this, t)
          )
        }),
        (n.prototype.redSub = function (t) {
          return (
            i(this.red, 'redSub works only with red numbers'),
            this.red.sub(this, t)
          )
        }),
        (n.prototype.redISub = function (t) {
          return (
            i(this.red, 'redISub works only with red numbers'),
            this.red.isub(this, t)
          )
        }),
        (n.prototype.redShl = function (t) {
          return (
            i(this.red, 'redShl works only with red numbers'),
            this.red.shl(this, t)
          )
        }),
        (n.prototype.redMul = function (t) {
          return (
            i(this.red, 'redMul works only with red numbers'),
            this.red._verify2(this, t),
            this.red.mul(this, t)
          )
        }),
        (n.prototype.redIMul = function (t) {
          return (
            i(this.red, 'redMul works only with red numbers'),
            this.red._verify2(this, t),
            this.red.imul(this, t)
          )
        }),
        (n.prototype.redSqr = function () {
          return (
            i(this.red, 'redSqr works only with red numbers'),
            this.red._verify1(this),
            this.red.sqr(this)
          )
        }),
        (n.prototype.redISqr = function () {
          return (
            i(this.red, 'redISqr works only with red numbers'),
            this.red._verify1(this),
            this.red.isqr(this)
          )
        }),
        (n.prototype.redSqrt = function () {
          return (
            i(this.red, 'redSqrt works only with red numbers'),
            this.red._verify1(this),
            this.red.sqrt(this)
          )
        }),
        (n.prototype.redInvm = function () {
          return (
            i(this.red, 'redInvm works only with red numbers'),
            this.red._verify1(this),
            this.red.invm(this)
          )
        }),
        (n.prototype.redNeg = function () {
          return (
            i(this.red, 'redNeg works only with red numbers'),
            this.red._verify1(this),
            this.red.neg(this)
          )
        }),
        (n.prototype.redPow = function (t) {
          return (
            i(this.red && !t.red, 'redPow(normalNum)'),
            this.red._verify1(this),
            this.red.pow(this, t)
          )
        })
      var m = { k256: null, p224: null, p192: null, p25519: null }
      function g(t, e) {
        ;(this.name = t),
          (this.p = new n(e, 16)),
          (this.n = this.p.bitLength()),
          (this.k = new n(1).iushln(this.n).isub(this.p)),
          (this.tmp = this._tmp())
      }
      function y() {
        g.call(
          this,
          'k256',
          'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
        )
      }
      function b() {
        g.call(
          this,
          'p224',
          'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
        )
      }
      function w() {
        g.call(
          this,
          'p192',
          'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
        )
      }
      function v() {
        g.call(
          this,
          '25519',
          '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
        )
      }
      function M(t) {
        if ('string' == typeof t) {
          var e = n._prime(t)
          ;(this.m = e.p), (this.prime = e)
        } else i(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null)
      }
      function A(t) {
        M.call(this, t),
          (this.shift = this.m.bitLength()),
          this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
          (this.r = new n(1).iushln(this.shift)),
          (this.r2 = this.imod(this.r.sqr())),
          (this.rinv = this.r._invmp(this.m)),
          (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
          (this.minv = this.minv.umod(this.r)),
          (this.minv = this.r.sub(this.minv))
      }
      ;(g.prototype._tmp = function () {
        var t = new n(null)
        return (t.words = new Array(Math.ceil(this.n / 13))), t
      }),
        (g.prototype.ireduce = function (t) {
          var e,
            i = t
          do {
            this.split(i, this.tmp),
              (e = (i = (i = this.imulK(i)).iadd(this.tmp)).bitLength())
          } while (e > this.n)
          var r = e < this.n ? -1 : i.ucmp(this.p)
          return (
            0 === r
              ? ((i.words[0] = 0), (i.length = 1))
              : r > 0
              ? i.isub(this.p)
              : i.strip(),
            i
          )
        }),
        (g.prototype.split = function (t, e) {
          t.iushrn(this.n, 0, e)
        }),
        (g.prototype.imulK = function (t) {
          return t.imul(this.k)
        }),
        r(y, g),
        (y.prototype.split = function (t, e) {
          for (var i = 4194303, r = Math.min(t.length, 9), n = 0; n < r; n++)
            e.words[n] = t.words[n]
          if (((e.length = r), t.length <= 9))
            return (t.words[0] = 0), void (t.length = 1)
          var s = t.words[9]
          for (e.words[e.length++] = s & i, n = 10; n < t.length; n++) {
            var a = 0 | t.words[n]
            ;(t.words[n - 10] = ((a & i) << 4) | (s >>> 22)), (s = a)
          }
          ;(t.words[n - 10] = s >>>= 22),
            (t.length -= 0 === s && t.length > 10 ? 10 : 9)
        }),
        (y.prototype.imulK = function (t) {
          ;(t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2)
          for (var e = 0, i = 0; i < t.length; i++) {
            var r = 0 | t.words[i]
            ;(t.words[i] = 67108863 & (e += 977 * r)),
              (e = 64 * r + ((e / 67108864) | 0))
          }
          return (
            0 === t.words[t.length - 1] &&
              (t.length--, 0 === t.words[t.length - 1] && t.length--),
            t
          )
        }),
        r(b, g),
        r(w, g),
        r(v, g),
        (v.prototype.imulK = function (t) {
          for (var e = 0, i = 0; i < t.length; i++) {
            var r = 19 * (0 | t.words[i]) + e,
              n = 67108863 & r
            ;(r >>>= 26), (t.words[i] = n), (e = r)
          }
          return 0 !== e && (t.words[t.length++] = e), t
        }),
        (n._prime = function (t) {
          if (m[t]) return m[t]
          var e
          if ('k256' === t) e = new y()
          else if ('p224' === t) e = new b()
          else if ('p192' === t) e = new w()
          else {
            if ('p25519' !== t) throw new Error('Unknown prime ' + t)
            e = new v()
          }
          return (m[t] = e), e
        }),
        (M.prototype._verify1 = function (t) {
          i(0 === t.negative, 'red works only with positives'),
            i(t.red, 'red works only with red numbers')
        }),
        (M.prototype._verify2 = function (t, e) {
          i(0 == (t.negative | e.negative), 'red works only with positives'),
            i(t.red && t.red === e.red, 'red works only with red numbers')
        }),
        (M.prototype.imod = function (t) {
          return this.prime
            ? this.prime.ireduce(t)._forceRed(this)
            : t.umod(this.m)._forceRed(this)
        }),
        (M.prototype.neg = function (t) {
          return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
        }),
        (M.prototype.add = function (t, e) {
          this._verify2(t, e)
          var i = t.add(e)
          return i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this)
        }),
        (M.prototype.iadd = function (t, e) {
          this._verify2(t, e)
          var i = t.iadd(e)
          return i.cmp(this.m) >= 0 && i.isub(this.m), i
        }),
        (M.prototype.sub = function (t, e) {
          this._verify2(t, e)
          var i = t.sub(e)
          return i.cmpn(0) < 0 && i.iadd(this.m), i._forceRed(this)
        }),
        (M.prototype.isub = function (t, e) {
          this._verify2(t, e)
          var i = t.isub(e)
          return i.cmpn(0) < 0 && i.iadd(this.m), i
        }),
        (M.prototype.shl = function (t, e) {
          return this._verify1(t), this.imod(t.ushln(e))
        }),
        (M.prototype.imul = function (t, e) {
          return this._verify2(t, e), this.imod(t.imul(e))
        }),
        (M.prototype.mul = function (t, e) {
          return this._verify2(t, e), this.imod(t.mul(e))
        }),
        (M.prototype.isqr = function (t) {
          return this.imul(t, t.clone())
        }),
        (M.prototype.sqr = function (t) {
          return this.mul(t, t)
        }),
        (M.prototype.sqrt = function (t) {
          if (t.isZero()) return t.clone()
          var e = this.m.andln(3)
          if ((i(e % 2 == 1), 3 === e)) {
            var r = this.m.add(new n(1)).iushrn(2)
            return this.pow(t, r)
          }
          for (var s = this.m.subn(1), a = 0; !s.isZero() && 0 === s.andln(1); )
            a++, s.iushrn(1)
          i(!s.isZero())
          var o = new n(1).toRed(this),
            u = o.redNeg(),
            h = this.m.subn(1).iushrn(1),
            d = this.m.bitLength()
          for (d = new n(2 * d * d).toRed(this); 0 !== this.pow(d, h).cmp(u); )
            d.redIAdd(u)
          for (
            var l = this.pow(d, s),
              f = this.pow(t, s.addn(1).iushrn(1)),
              c = this.pow(t, s),
              p = a;
            0 !== c.cmp(o);

          ) {
            for (var m = c, g = 0; 0 !== m.cmp(o); g++) m = m.redSqr()
            i(g < p)
            var y = this.pow(l, new n(1).iushln(p - g - 1))
            ;(f = f.redMul(y)), (l = y.redSqr()), (c = c.redMul(l)), (p = g)
          }
          return f
        }),
        (M.prototype.invm = function (t) {
          var e = t._invmp(this.m)
          return 0 !== e.negative
            ? ((e.negative = 0), this.imod(e).redNeg())
            : this.imod(e)
        }),
        (M.prototype.pow = function (t, e) {
          if (e.isZero()) return new n(1)
          if (0 === e.cmpn(1)) return t.clone()
          var i = new Array(16)
          ;(i[0] = new n(1).toRed(this)), (i[1] = t)
          for (var r = 2; r < i.length; r++) i[r] = this.mul(i[r - 1], t)
          var s = i[0],
            a = 0,
            o = 0,
            u = e.bitLength() % 26
          for (0 === u && (u = 26), r = e.length - 1; r >= 0; r--) {
            for (var h = e.words[r], d = u - 1; d >= 0; d--) {
              var l = (h >> d) & 1
              s !== i[0] && (s = this.sqr(s)),
                0 !== l || 0 !== a
                  ? ((a <<= 1),
                    (a |= l),
                    (4 == ++o || (0 === r && 0 === d)) &&
                      ((s = this.mul(s, i[a])), (o = 0), (a = 0)))
                  : (o = 0)
            }
            u = 26
          }
          return s
        }),
        (M.prototype.convertTo = function (t) {
          var e = t.umod(this.m)
          return e === t ? e.clone() : e
        }),
        (M.prototype.convertFrom = function (t) {
          var e = t.clone()
          return (e.red = null), e
        }),
        (n.mont = function (t) {
          return new A(t)
        }),
        r(A, M),
        (A.prototype.convertTo = function (t) {
          return this.imod(t.ushln(this.shift))
        }),
        (A.prototype.convertFrom = function (t) {
          var e = this.imod(t.mul(this.rinv))
          return (e.red = null), e
        }),
        (A.prototype.imul = function (t, e) {
          if (t.isZero() || e.isZero())
            return (t.words[0] = 0), (t.length = 1), t
          var i = t.imul(e),
            r = i
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m),
            n = i.isub(r).iushrn(this.shift),
            s = n
          return (
            n.cmp(this.m) >= 0
              ? (s = n.isub(this.m))
              : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
            s._forceRed(this)
          )
        }),
        (A.prototype.mul = function (t, e) {
          if (t.isZero() || e.isZero()) return new n(0)._forceRed(this)
          var i = t.mul(e),
            r = i
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m),
            s = i.isub(r).iushrn(this.shift),
            a = s
          return (
            s.cmp(this.m) >= 0
              ? (a = s.isub(this.m))
              : s.cmpn(0) < 0 && (a = s.iadd(this.m)),
            a._forceRed(this)
          )
        }),
        (A.prototype.invm = function (t) {
          return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
        })
    })(t, bt)
  }),
  _t = function (t) {
    return 'string' != typeof t
      ? t
      : (function (t) {
          if ('string' != typeof t)
            throw new Error(
              "[is-hex-prefixed] value must be type 'string', is currently type " +
                typeof t +
                ', while checking isHexPrefixed.'
            )
          return '0x' === t.slice(0, 2)
        })(t)
      ? t.slice(2)
      : t
  },
  St = function (t) {
    if ('string' == typeof t || 'number' == typeof t) {
      var e = new At(1),
        i = String(t).toLowerCase().trim(),
        r = '0x' === i.substr(0, 2) || '-0x' === i.substr(0, 3),
        n = _t(i)
      if (
        ('-' === n.substr(0, 1) && ((n = _t(n.slice(1))), (e = new At(-1, 10))),
        (!(n = '' === n ? '0' : n).match(/^-?[0-9]+$/) &&
          n.match(/^[0-9A-Fa-f]+$/)) ||
          n.match(/^[a-fA-F]+$/) ||
          (!0 === r && n.match(/^[0-9A-Fa-f]+$/)))
      )
        return new At(n, 16).mul(e)
      if ((n.match(/^-?[0-9]+$/) || '' === n) && !1 === r)
        return new At(n, 10).mul(e)
    } else if (
      'object' == typeof t &&
      t.toString &&
      !t.pop &&
      !t.push &&
      t.toString(10).match(/^-?[0-9]+$/) &&
      (t.mul || t.dividedToIntegerBy)
    )
      return new At(t.toString(10), 10)
    throw new Error(
      '[number-to-bn] while converting number ' +
        JSON.stringify(t) +
        ' to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.'
    )
  },
  Tt = new Mt(0),
  xt = new Mt(-1),
  Et = {
    noether: '0',
    wei: '1',
    kwei: '1000',
    Kwei: '1000',
    babbage: '1000',
    femtoether: '1000',
    mwei: '1000000',
    Mwei: '1000000',
    lovelace: '1000000',
    picoether: '1000000',
    gwei: '1000000000',
    Gwei: '1000000000',
    shannon: '1000000000',
    nanoether: '1000000000',
    nano: '1000000000',
    szabo: '1000000000000',
    microether: '1000000000000',
    micro: '1000000000000',
    finney: '1000000000000000',
    milliether: '1000000000000000',
    milli: '1000000000000000',
    ether: '1000000000000000000',
    kether: '1000000000000000000000',
    grand: '1000000000000000000000',
    mether: '1000000000000000000000000',
    gether: '1000000000000000000000000000',
    tether: '1000000000000000000000000000000'
  }
function Rt(t) {
  var e = t ? t.toLowerCase() : 'ether',
    i = Et[e]
  if ('string' != typeof i)
    throw new Error(
      '[ethjs-unit] the unit provided ' +
        t +
        " doesn't exists, please use the one of the following units " +
        JSON.stringify(Et, null, 2)
    )
  return new Mt(i, 10)
}
function kt(t) {
  if ('string' == typeof t) {
    if (!t.match(/^-?[0-9.]+$/))
      throw new Error(
        "while converting number to string, invalid number value '" +
          t +
          "', should be a number matching (^-?[0-9.]+)."
      )
    return t
  }
  if ('number' == typeof t) return String(t)
  if ('object' == typeof t && t.toString && (t.toTwos || t.dividedToIntegerBy))
    return t.toPrecision ? String(t.toPrecision()) : t.toString(10)
  throw new Error(
    "while converting number to string, invalid number value '" +
      t +
      "' type " +
      typeof t +
      '.'
  )
}
var It = {
    unitMap: Et,
    numberToString: kt,
    getValueOfUnit: Rt,
    fromWei: function (t, e, i) {
      var r = St(t),
        n = r.lt(Tt),
        s = Rt(e),
        a = Et[e].length - 1 || 1,
        o = i || {}
      n && (r = r.mul(xt))
      for (var u = r.mod(s).toString(10); u.length < a; ) u = '0' + u
      o.pad || (u = u.match(/^([0-9]*[1-9]|0)(0*)/)[1])
      var h = r.div(s).toString(10)
      o.commify && (h = h.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
      var d = h + ('0' == u ? '' : '.' + u)
      return n && (d = '-' + d), d
    },
    toWei: function (t, e) {
      var i = kt(t),
        r = Rt(e),
        n = Et[e].length - 1 || 1,
        s = '-' === i.substring(0, 1)
      if ((s && (i = i.substring(1)), '.' === i))
        throw new Error(
          '[ethjs-unit] while converting number ' + t + ' to wei, invalid value'
        )
      var a = i.split('.')
      if (a.length > 2)
        throw new Error(
          '[ethjs-unit] while converting number ' +
            t +
            ' to wei,  too many decimal points'
        )
      var o = a[0],
        u = a[1]
      if ((o || (o = '0'), u || (u = '0'), u.length > n))
        throw new Error(
          '[ethjs-unit] while converting number ' +
            t +
            ' to wei, too many decimal places'
        )
      for (; u.length < n; ) u += '0'
      ;(o = new Mt(o)), (u = new Mt(u))
      var h = o.mul(r).add(u)
      return s && (h = h.mul(xt)), new Mt(h.toString(10), 10)
    }
  },
  Bt = wt(function (t) {
    !(function (t, e) {
      function i(t, e) {
        if (!t) throw new Error(e || 'Assertion failed')
      }
      function r(t, e) {
        t.super_ = e
        var i = function () {}
        ;(i.prototype = e.prototype),
          (t.prototype = new i()),
          (t.prototype.constructor = t)
      }
      function n(t, e, i) {
        if (n.isBN(t)) return t
        ;(this.negative = 0),
          (this.words = null),
          (this.length = 0),
          (this.red = null),
          null !== t &&
            (('le' !== e && 'be' !== e) || ((i = e), (e = 10)),
            this._init(t || 0, e || 10, i || 'be'))
      }
      var s
      'object' == typeof t ? (t.exports = n) : (e.BN = n),
        (n.BN = n),
        (n.wordSize = 26)
      try {
        s =
          'undefined' != typeof window && void 0 !== window.Buffer
            ? window.Buffer
            : o.Buffer
      } catch (t) {}
      function a(t, e) {
        var i = t.charCodeAt(e)
        return i >= 65 && i <= 70
          ? i - 55
          : i >= 97 && i <= 102
          ? i - 87
          : (i - 48) & 15
      }
      function u(t, e, i) {
        var r = a(t, i)
        return i - 1 >= e && (r |= a(t, i - 1) << 4), r
      }
      function h(t, e, i, r) {
        for (var n = 0, s = Math.min(t.length, i), a = e; a < s; a++) {
          var o = t.charCodeAt(a) - 48
          ;(n *= r), (n += o >= 49 ? o - 49 + 10 : o >= 17 ? o - 17 + 10 : o)
        }
        return n
      }
      ;(n.isBN = function (t) {
        return (
          t instanceof n ||
          (null !== t &&
            'object' == typeof t &&
            t.constructor.wordSize === n.wordSize &&
            Array.isArray(t.words))
        )
      }),
        (n.max = function (t, e) {
          return t.cmp(e) > 0 ? t : e
        }),
        (n.min = function (t, e) {
          return t.cmp(e) < 0 ? t : e
        }),
        (n.prototype._init = function (t, e, r) {
          if ('number' == typeof t) return this._initNumber(t, e, r)
          if ('object' == typeof t) return this._initArray(t, e, r)
          'hex' === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36)
          var n = 0
          '-' === (t = t.toString().replace(/\s+/g, ''))[0] &&
            (n++, (this.negative = 1)),
            n < t.length &&
              (16 === e
                ? this._parseHex(t, n, r)
                : (this._parseBase(t, e, n),
                  'le' === r && this._initArray(this.toArray(), e, r)))
        }),
        (n.prototype._initNumber = function (t, e, r) {
          t < 0 && ((this.negative = 1), (t = -t)),
            t < 67108864
              ? ((this.words = [67108863 & t]), (this.length = 1))
              : t < 4503599627370496
              ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                (this.length = 2))
              : (i(t < 9007199254740992),
                (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                (this.length = 3)),
            'le' === r && this._initArray(this.toArray(), e, r)
        }),
        (n.prototype._initArray = function (t, e, r) {
          if ((i('number' == typeof t.length), t.length <= 0))
            return (this.words = [0]), (this.length = 1), this
          ;(this.length = Math.ceil(t.length / 3)),
            (this.words = new Array(this.length))
          for (var n = 0; n < this.length; n++) this.words[n] = 0
          var s,
            a,
            o = 0
          if ('be' === r)
            for (n = t.length - 1, s = 0; n >= 0; n -= 3)
              (this.words[s] |=
                ((a = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)) << o) &
                67108863),
                (this.words[s + 1] = (a >>> (26 - o)) & 67108863),
                (o += 24) >= 26 && ((o -= 26), s++)
          else if ('le' === r)
            for (n = 0, s = 0; n < t.length; n += 3)
              (this.words[s] |=
                ((a = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) << o) &
                67108863),
                (this.words[s + 1] = (a >>> (26 - o)) & 67108863),
                (o += 24) >= 26 && ((o -= 26), s++)
          return this.strip()
        }),
        (n.prototype._parseHex = function (t, e, i) {
          ;(this.length = Math.ceil((t.length - e) / 6)),
            (this.words = new Array(this.length))
          for (var r = 0; r < this.length; r++) this.words[r] = 0
          var n,
            s = 0,
            a = 0
          if ('be' === i)
            for (r = t.length - 1; r >= e; r -= 2)
              (n = u(t, e, r) << s),
                (this.words[a] |= 67108863 & n),
                s >= 18
                  ? ((s -= 18), (this.words[(a += 1)] |= n >>> 26))
                  : (s += 8)
          else
            for (r = (t.length - e) % 2 == 0 ? e + 1 : e; r < t.length; r += 2)
              (n = u(t, e, r) << s),
                (this.words[a] |= 67108863 & n),
                s >= 18
                  ? ((s -= 18), (this.words[(a += 1)] |= n >>> 26))
                  : (s += 8)
          this.strip()
        }),
        (n.prototype._parseBase = function (t, e, i) {
          ;(this.words = [0]), (this.length = 1)
          for (var r = 0, n = 1; n <= 67108863; n *= e) r++
          r--, (n = (n / e) | 0)
          for (
            var s = t.length - i,
              a = s % r,
              o = Math.min(s, s - a) + i,
              u = 0,
              d = i;
            d < o;
            d += r
          )
            (u = h(t, d, d + r, e)),
              this.imuln(n),
              this.words[0] + u < 67108864
                ? (this.words[0] += u)
                : this._iaddn(u)
          if (0 !== a) {
            var l = 1
            for (u = h(t, d, t.length, e), d = 0; d < a; d++) l *= e
            this.imuln(l),
              this.words[0] + u < 67108864
                ? (this.words[0] += u)
                : this._iaddn(u)
          }
          this.strip()
        }),
        (n.prototype.copy = function (t) {
          t.words = new Array(this.length)
          for (var e = 0; e < this.length; e++) t.words[e] = this.words[e]
          ;(t.length = this.length),
            (t.negative = this.negative),
            (t.red = this.red)
        }),
        (n.prototype.clone = function () {
          var t = new n(null)
          return this.copy(t), t
        }),
        (n.prototype._expand = function (t) {
          for (; this.length < t; ) this.words[this.length++] = 0
          return this
        }),
        (n.prototype.strip = function () {
          for (; this.length > 1 && 0 === this.words[this.length - 1]; )
            this.length--
          return this._normSign()
        }),
        (n.prototype._normSign = function () {
          return (
            1 === this.length && 0 === this.words[0] && (this.negative = 0),
            this
          )
        }),
        (n.prototype.inspect = function () {
          return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
        })
      var d = [
          '',
          '0',
          '00',
          '000',
          '0000',
          '00000',
          '000000',
          '0000000',
          '00000000',
          '000000000',
          '0000000000',
          '00000000000',
          '000000000000',
          '0000000000000',
          '00000000000000',
          '000000000000000',
          '0000000000000000',
          '00000000000000000',
          '000000000000000000',
          '0000000000000000000',
          '00000000000000000000',
          '000000000000000000000',
          '0000000000000000000000',
          '00000000000000000000000',
          '000000000000000000000000',
          '0000000000000000000000000'
        ],
        l = [
          0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        f = [
          0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
          16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
          11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
          5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
          20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
          60466176
        ]
      function c(t, e, i) {
        i.negative = e.negative ^ t.negative
        var r = (t.length + e.length) | 0
        ;(i.length = r), (r = (r - 1) | 0)
        var n = 0 | t.words[0],
          s = 0 | e.words[0],
          a = n * s,
          o = (a / 67108864) | 0
        i.words[0] = 67108863 & a
        for (var u = 1; u < r; u++) {
          for (
            var h = o >>> 26,
              d = 67108863 & o,
              l = Math.min(u, e.length - 1),
              f = Math.max(0, u - t.length + 1);
            f <= l;
            f++
          )
            (h +=
              ((a = (n = 0 | t.words[(u - f) | 0]) * (s = 0 | e.words[f]) + d) /
                67108864) |
              0),
              (d = 67108863 & a)
          ;(i.words[u] = 0 | d), (o = 0 | h)
        }
        return 0 !== o ? (i.words[u] = 0 | o) : i.length--, i.strip()
      }
      ;(n.prototype.toString = function (t, e) {
        var r
        if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
          r = ''
          for (var n = 0, s = 0, a = 0; a < this.length; a++) {
            var o = this.words[a],
              u = (16777215 & ((o << n) | s)).toString(16)
            ;(r =
              0 != (s = (o >>> (24 - n)) & 16777215) || a !== this.length - 1
                ? d[6 - u.length] + u + r
                : u + r),
              (n += 2) >= 26 && ((n -= 26), a--)
          }
          for (0 !== s && (r = s.toString(16) + r); r.length % e != 0; )
            r = '0' + r
          return 0 !== this.negative && (r = '-' + r), r
        }
        if (t === (0 | t) && t >= 2 && t <= 36) {
          var h = l[t],
            c = f[t]
          r = ''
          var p = this.clone()
          for (p.negative = 0; !p.isZero(); ) {
            var m = p.modn(c).toString(t)
            r = (p = p.idivn(c)).isZero() ? m + r : d[h - m.length] + m + r
          }
          for (this.isZero() && (r = '0' + r); r.length % e != 0; ) r = '0' + r
          return 0 !== this.negative && (r = '-' + r), r
        }
        i(!1, 'Base should be between 2 and 36')
      }),
        (n.prototype.toNumber = function () {
          var t = this.words[0]
          return (
            2 === this.length
              ? (t += 67108864 * this.words[1])
              : 3 === this.length && 1 === this.words[2]
              ? (t += 4503599627370496 + 67108864 * this.words[1])
              : this.length > 2 &&
                i(!1, 'Number can only safely store up to 53 bits'),
            0 !== this.negative ? -t : t
          )
        }),
        (n.prototype.toJSON = function () {
          return this.toString(16)
        }),
        (n.prototype.toBuffer = function (t, e) {
          return i(void 0 !== s), this.toArrayLike(s, t, e)
        }),
        (n.prototype.toArray = function (t, e) {
          return this.toArrayLike(Array, t, e)
        }),
        (n.prototype.toArrayLike = function (t, e, r) {
          var n = this.byteLength(),
            s = r || Math.max(1, n)
          i(n <= s, 'byte array longer than desired length'),
            i(s > 0, 'Requested array length <= 0'),
            this.strip()
          var a,
            o,
            u = 'le' === e,
            h = new t(s),
            d = this.clone()
          if (u) {
            for (o = 0; !d.isZero(); o++)
              (a = d.andln(255)), d.iushrn(8), (h[o] = a)
            for (; o < s; o++) h[o] = 0
          } else {
            for (o = 0; o < s - n; o++) h[o] = 0
            for (o = 0; !d.isZero(); o++)
              (a = d.andln(255)), d.iushrn(8), (h[s - o - 1] = a)
          }
          return h
        }),
        (n.prototype._countBits = Math.clz32
          ? function (t) {
              return 32 - Math.clz32(t)
            }
          : function (t) {
              var e = t,
                i = 0
              return (
                e >= 4096 && ((i += 13), (e >>>= 13)),
                e >= 64 && ((i += 7), (e >>>= 7)),
                e >= 8 && ((i += 4), (e >>>= 4)),
                e >= 2 && ((i += 2), (e >>>= 2)),
                i + e
              )
            }),
        (n.prototype._zeroBits = function (t) {
          if (0 === t) return 26
          var e = t,
            i = 0
          return (
            0 == (8191 & e) && ((i += 13), (e >>>= 13)),
            0 == (127 & e) && ((i += 7), (e >>>= 7)),
            0 == (15 & e) && ((i += 4), (e >>>= 4)),
            0 == (3 & e) && ((i += 2), (e >>>= 2)),
            0 == (1 & e) && i++,
            i
          )
        }),
        (n.prototype.bitLength = function () {
          var t = this._countBits(this.words[this.length - 1])
          return 26 * (this.length - 1) + t
        }),
        (n.prototype.zeroBits = function () {
          if (this.isZero()) return 0
          for (var t = 0, e = 0; e < this.length; e++) {
            var i = this._zeroBits(this.words[e])
            if (((t += i), 26 !== i)) break
          }
          return t
        }),
        (n.prototype.byteLength = function () {
          return Math.ceil(this.bitLength() / 8)
        }),
        (n.prototype.toTwos = function (t) {
          return 0 !== this.negative
            ? this.abs().inotn(t).iaddn(1)
            : this.clone()
        }),
        (n.prototype.fromTwos = function (t) {
          return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
        }),
        (n.prototype.isNeg = function () {
          return 0 !== this.negative
        }),
        (n.prototype.neg = function () {
          return this.clone().ineg()
        }),
        (n.prototype.ineg = function () {
          return this.isZero() || (this.negative ^= 1), this
        }),
        (n.prototype.iuor = function (t) {
          for (; this.length < t.length; ) this.words[this.length++] = 0
          for (var e = 0; e < t.length; e++)
            this.words[e] = this.words[e] | t.words[e]
          return this.strip()
        }),
        (n.prototype.ior = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuor(t)
        }),
        (n.prototype.or = function (t) {
          return this.length > t.length
            ? this.clone().ior(t)
            : t.clone().ior(this)
        }),
        (n.prototype.uor = function (t) {
          return this.length > t.length
            ? this.clone().iuor(t)
            : t.clone().iuor(this)
        }),
        (n.prototype.iuand = function (t) {
          var e
          e = this.length > t.length ? t : this
          for (var i = 0; i < e.length; i++)
            this.words[i] = this.words[i] & t.words[i]
          return (this.length = e.length), this.strip()
        }),
        (n.prototype.iand = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuand(t)
        }),
        (n.prototype.and = function (t) {
          return this.length > t.length
            ? this.clone().iand(t)
            : t.clone().iand(this)
        }),
        (n.prototype.uand = function (t) {
          return this.length > t.length
            ? this.clone().iuand(t)
            : t.clone().iuand(this)
        }),
        (n.prototype.iuxor = function (t) {
          var e, i
          this.length > t.length ? ((e = this), (i = t)) : ((e = t), (i = this))
          for (var r = 0; r < i.length; r++)
            this.words[r] = e.words[r] ^ i.words[r]
          if (this !== e) for (; r < e.length; r++) this.words[r] = e.words[r]
          return (this.length = e.length), this.strip()
        }),
        (n.prototype.ixor = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuxor(t)
        }),
        (n.prototype.xor = function (t) {
          return this.length > t.length
            ? this.clone().ixor(t)
            : t.clone().ixor(this)
        }),
        (n.prototype.uxor = function (t) {
          return this.length > t.length
            ? this.clone().iuxor(t)
            : t.clone().iuxor(this)
        }),
        (n.prototype.inotn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = 0 | Math.ceil(t / 26),
            r = t % 26
          this._expand(e), r > 0 && e--
          for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n]
          return (
            r > 0 && (this.words[n] = ~this.words[n] & (67108863 >> (26 - r))),
            this.strip()
          )
        }),
        (n.prototype.notn = function (t) {
          return this.clone().inotn(t)
        }),
        (n.prototype.setn = function (t, e) {
          i('number' == typeof t && t >= 0)
          var r = (t / 26) | 0,
            n = t % 26
          return (
            this._expand(r + 1),
            (this.words[r] = e
              ? this.words[r] | (1 << n)
              : this.words[r] & ~(1 << n)),
            this.strip()
          )
        }),
        (n.prototype.iadd = function (t) {
          var e, i, r
          if (0 !== this.negative && 0 === t.negative)
            return (
              (this.negative = 0),
              (e = this.isub(t)),
              (this.negative ^= 1),
              this._normSign()
            )
          if (0 === this.negative && 0 !== t.negative)
            return (
              (t.negative = 0),
              (e = this.isub(t)),
              (t.negative = 1),
              e._normSign()
            )
          this.length > t.length ? ((i = this), (r = t)) : ((i = t), (r = this))
          for (var n = 0, s = 0; s < r.length; s++)
            (this.words[s] =
              67108863 & (e = (0 | i.words[s]) + (0 | r.words[s]) + n)),
              (n = e >>> 26)
          for (; 0 !== n && s < i.length; s++)
            (this.words[s] = 67108863 & (e = (0 | i.words[s]) + n)),
              (n = e >>> 26)
          if (((this.length = i.length), 0 !== n))
            (this.words[this.length] = n), this.length++
          else if (i !== this)
            for (; s < i.length; s++) this.words[s] = i.words[s]
          return this
        }),
        (n.prototype.add = function (t) {
          var e
          return 0 !== t.negative && 0 === this.negative
            ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
            : 0 === t.negative && 0 !== this.negative
            ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
            : this.length > t.length
            ? this.clone().iadd(t)
            : t.clone().iadd(this)
        }),
        (n.prototype.isub = function (t) {
          if (0 !== t.negative) {
            t.negative = 0
            var e = this.iadd(t)
            return (t.negative = 1), e._normSign()
          }
          if (0 !== this.negative)
            return (
              (this.negative = 0),
              this.iadd(t),
              (this.negative = 1),
              this._normSign()
            )
          var i,
            r,
            n = this.cmp(t)
          if (0 === n)
            return (
              (this.negative = 0), (this.length = 1), (this.words[0] = 0), this
            )
          n > 0 ? ((i = this), (r = t)) : ((i = t), (r = this))
          for (var s = 0, a = 0; a < r.length; a++)
            (s = (e = (0 | i.words[a]) - (0 | r.words[a]) + s) >> 26),
              (this.words[a] = 67108863 & e)
          for (; 0 !== s && a < i.length; a++)
            (s = (e = (0 | i.words[a]) + s) >> 26),
              (this.words[a] = 67108863 & e)
          if (0 === s && a < i.length && i !== this)
            for (; a < i.length; a++) this.words[a] = i.words[a]
          return (
            (this.length = Math.max(this.length, a)),
            i !== this && (this.negative = 1),
            this.strip()
          )
        }),
        (n.prototype.sub = function (t) {
          return this.clone().isub(t)
        })
      var p = function (t, e, i) {
        var r,
          n,
          s,
          a = t.words,
          o = e.words,
          u = i.words,
          h = 0,
          d = 0 | a[0],
          l = 8191 & d,
          f = d >>> 13,
          c = 0 | a[1],
          p = 8191 & c,
          m = c >>> 13,
          g = 0 | a[2],
          y = 8191 & g,
          b = g >>> 13,
          w = 0 | a[3],
          v = 8191 & w,
          M = w >>> 13,
          A = 0 | a[4],
          _ = 8191 & A,
          S = A >>> 13,
          T = 0 | a[5],
          x = 8191 & T,
          E = T >>> 13,
          R = 0 | a[6],
          k = 8191 & R,
          I = R >>> 13,
          B = 0 | a[7],
          O = 8191 & B,
          P = B >>> 13,
          C = 0 | a[8],
          N = 8191 & C,
          L = C >>> 13,
          D = 0 | a[9],
          F = 8191 & D,
          U = D >>> 13,
          q = 0 | o[0],
          j = 8191 & q,
          z = q >>> 13,
          W = 0 | o[1],
          $ = 8191 & W,
          H = W >>> 13,
          G = 0 | o[2],
          Z = 8191 & G,
          K = G >>> 13,
          V = 0 | o[3],
          J = 8191 & V,
          X = V >>> 13,
          Y = 0 | o[4],
          Q = 8191 & Y,
          tt = Y >>> 13,
          et = 0 | o[5],
          it = 8191 & et,
          rt = et >>> 13,
          nt = 0 | o[6],
          st = 8191 & nt,
          at = nt >>> 13,
          ot = 0 | o[7],
          ut = 8191 & ot,
          ht = ot >>> 13,
          dt = 0 | o[8],
          lt = 8191 & dt,
          ft = dt >>> 13,
          ct = 0 | o[9],
          pt = 8191 & ct,
          mt = ct >>> 13
        ;(i.negative = t.negative ^ e.negative), (i.length = 19)
        var gt =
          (((h + (r = Math.imul(l, j))) | 0) +
            ((8191 & (n = ((n = Math.imul(l, z)) + Math.imul(f, j)) | 0)) <<
              13)) |
          0
        ;(h = ((((s = Math.imul(f, z)) + (n >>> 13)) | 0) + (gt >>> 26)) | 0),
          (gt &= 67108863),
          (r = Math.imul(p, j)),
          (n = ((n = Math.imul(p, z)) + Math.imul(m, j)) | 0),
          (s = Math.imul(m, z))
        var yt =
          (((h + (r = (r + Math.imul(l, $)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, H)) | 0) + Math.imul(f, $)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, H)) | 0) + (n >>> 13)) | 0) + (yt >>> 26)) |
          0),
          (yt &= 67108863),
          (r = Math.imul(y, j)),
          (n = ((n = Math.imul(y, z)) + Math.imul(b, j)) | 0),
          (s = Math.imul(b, z)),
          (r = (r + Math.imul(p, $)) | 0),
          (n = ((n = (n + Math.imul(p, H)) | 0) + Math.imul(m, $)) | 0),
          (s = (s + Math.imul(m, H)) | 0)
        var bt =
          (((h + (r = (r + Math.imul(l, Z)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, K)) | 0) + Math.imul(f, Z)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, K)) | 0) + (n >>> 13)) | 0) + (bt >>> 26)) |
          0),
          (bt &= 67108863),
          (r = Math.imul(v, j)),
          (n = ((n = Math.imul(v, z)) + Math.imul(M, j)) | 0),
          (s = Math.imul(M, z)),
          (r = (r + Math.imul(y, $)) | 0),
          (n = ((n = (n + Math.imul(y, H)) | 0) + Math.imul(b, $)) | 0),
          (s = (s + Math.imul(b, H)) | 0),
          (r = (r + Math.imul(p, Z)) | 0),
          (n = ((n = (n + Math.imul(p, K)) | 0) + Math.imul(m, Z)) | 0),
          (s = (s + Math.imul(m, K)) | 0)
        var wt =
          (((h + (r = (r + Math.imul(l, J)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, X)) | 0) + Math.imul(f, J)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, X)) | 0) + (n >>> 13)) | 0) + (wt >>> 26)) |
          0),
          (wt &= 67108863),
          (r = Math.imul(_, j)),
          (n = ((n = Math.imul(_, z)) + Math.imul(S, j)) | 0),
          (s = Math.imul(S, z)),
          (r = (r + Math.imul(v, $)) | 0),
          (n = ((n = (n + Math.imul(v, H)) | 0) + Math.imul(M, $)) | 0),
          (s = (s + Math.imul(M, H)) | 0),
          (r = (r + Math.imul(y, Z)) | 0),
          (n = ((n = (n + Math.imul(y, K)) | 0) + Math.imul(b, Z)) | 0),
          (s = (s + Math.imul(b, K)) | 0),
          (r = (r + Math.imul(p, J)) | 0),
          (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, J)) | 0),
          (s = (s + Math.imul(m, X)) | 0)
        var vt =
          (((h + (r = (r + Math.imul(l, Q)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, tt)) | 0) + Math.imul(f, Q)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, tt)) | 0) + (n >>> 13)) | 0) +
            (vt >>> 26)) |
          0),
          (vt &= 67108863),
          (r = Math.imul(x, j)),
          (n = ((n = Math.imul(x, z)) + Math.imul(E, j)) | 0),
          (s = Math.imul(E, z)),
          (r = (r + Math.imul(_, $)) | 0),
          (n = ((n = (n + Math.imul(_, H)) | 0) + Math.imul(S, $)) | 0),
          (s = (s + Math.imul(S, H)) | 0),
          (r = (r + Math.imul(v, Z)) | 0),
          (n = ((n = (n + Math.imul(v, K)) | 0) + Math.imul(M, Z)) | 0),
          (s = (s + Math.imul(M, K)) | 0),
          (r = (r + Math.imul(y, J)) | 0),
          (n = ((n = (n + Math.imul(y, X)) | 0) + Math.imul(b, J)) | 0),
          (s = (s + Math.imul(b, X)) | 0),
          (r = (r + Math.imul(p, Q)) | 0),
          (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
          (s = (s + Math.imul(m, tt)) | 0)
        var Mt =
          (((h + (r = (r + Math.imul(l, it)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, rt)) | 0) + Math.imul(f, it)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, rt)) | 0) + (n >>> 13)) | 0) +
            (Mt >>> 26)) |
          0),
          (Mt &= 67108863),
          (r = Math.imul(k, j)),
          (n = ((n = Math.imul(k, z)) + Math.imul(I, j)) | 0),
          (s = Math.imul(I, z)),
          (r = (r + Math.imul(x, $)) | 0),
          (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(E, $)) | 0),
          (s = (s + Math.imul(E, H)) | 0),
          (r = (r + Math.imul(_, Z)) | 0),
          (n = ((n = (n + Math.imul(_, K)) | 0) + Math.imul(S, Z)) | 0),
          (s = (s + Math.imul(S, K)) | 0),
          (r = (r + Math.imul(v, J)) | 0),
          (n = ((n = (n + Math.imul(v, X)) | 0) + Math.imul(M, J)) | 0),
          (s = (s + Math.imul(M, X)) | 0),
          (r = (r + Math.imul(y, Q)) | 0),
          (n = ((n = (n + Math.imul(y, tt)) | 0) + Math.imul(b, Q)) | 0),
          (s = (s + Math.imul(b, tt)) | 0),
          (r = (r + Math.imul(p, it)) | 0),
          (n = ((n = (n + Math.imul(p, rt)) | 0) + Math.imul(m, it)) | 0),
          (s = (s + Math.imul(m, rt)) | 0)
        var At =
          (((h + (r = (r + Math.imul(l, st)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, at)) | 0) + Math.imul(f, st)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, at)) | 0) + (n >>> 13)) | 0) +
            (At >>> 26)) |
          0),
          (At &= 67108863),
          (r = Math.imul(O, j)),
          (n = ((n = Math.imul(O, z)) + Math.imul(P, j)) | 0),
          (s = Math.imul(P, z)),
          (r = (r + Math.imul(k, $)) | 0),
          (n = ((n = (n + Math.imul(k, H)) | 0) + Math.imul(I, $)) | 0),
          (s = (s + Math.imul(I, H)) | 0),
          (r = (r + Math.imul(x, Z)) | 0),
          (n = ((n = (n + Math.imul(x, K)) | 0) + Math.imul(E, Z)) | 0),
          (s = (s + Math.imul(E, K)) | 0),
          (r = (r + Math.imul(_, J)) | 0),
          (n = ((n = (n + Math.imul(_, X)) | 0) + Math.imul(S, J)) | 0),
          (s = (s + Math.imul(S, X)) | 0),
          (r = (r + Math.imul(v, Q)) | 0),
          (n = ((n = (n + Math.imul(v, tt)) | 0) + Math.imul(M, Q)) | 0),
          (s = (s + Math.imul(M, tt)) | 0),
          (r = (r + Math.imul(y, it)) | 0),
          (n = ((n = (n + Math.imul(y, rt)) | 0) + Math.imul(b, it)) | 0),
          (s = (s + Math.imul(b, rt)) | 0),
          (r = (r + Math.imul(p, st)) | 0),
          (n = ((n = (n + Math.imul(p, at)) | 0) + Math.imul(m, st)) | 0),
          (s = (s + Math.imul(m, at)) | 0)
        var _t =
          (((h + (r = (r + Math.imul(l, ut)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, ht)) | 0) + Math.imul(f, ut)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, ht)) | 0) + (n >>> 13)) | 0) +
            (_t >>> 26)) |
          0),
          (_t &= 67108863),
          (r = Math.imul(N, j)),
          (n = ((n = Math.imul(N, z)) + Math.imul(L, j)) | 0),
          (s = Math.imul(L, z)),
          (r = (r + Math.imul(O, $)) | 0),
          (n = ((n = (n + Math.imul(O, H)) | 0) + Math.imul(P, $)) | 0),
          (s = (s + Math.imul(P, H)) | 0),
          (r = (r + Math.imul(k, Z)) | 0),
          (n = ((n = (n + Math.imul(k, K)) | 0) + Math.imul(I, Z)) | 0),
          (s = (s + Math.imul(I, K)) | 0),
          (r = (r + Math.imul(x, J)) | 0),
          (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(E, J)) | 0),
          (s = (s + Math.imul(E, X)) | 0),
          (r = (r + Math.imul(_, Q)) | 0),
          (n = ((n = (n + Math.imul(_, tt)) | 0) + Math.imul(S, Q)) | 0),
          (s = (s + Math.imul(S, tt)) | 0),
          (r = (r + Math.imul(v, it)) | 0),
          (n = ((n = (n + Math.imul(v, rt)) | 0) + Math.imul(M, it)) | 0),
          (s = (s + Math.imul(M, rt)) | 0),
          (r = (r + Math.imul(y, st)) | 0),
          (n = ((n = (n + Math.imul(y, at)) | 0) + Math.imul(b, st)) | 0),
          (s = (s + Math.imul(b, at)) | 0),
          (r = (r + Math.imul(p, ut)) | 0),
          (n = ((n = (n + Math.imul(p, ht)) | 0) + Math.imul(m, ut)) | 0),
          (s = (s + Math.imul(m, ht)) | 0)
        var St =
          (((h + (r = (r + Math.imul(l, lt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, ft)) | 0) + Math.imul(f, lt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, ft)) | 0) + (n >>> 13)) | 0) +
            (St >>> 26)) |
          0),
          (St &= 67108863),
          (r = Math.imul(F, j)),
          (n = ((n = Math.imul(F, z)) + Math.imul(U, j)) | 0),
          (s = Math.imul(U, z)),
          (r = (r + Math.imul(N, $)) | 0),
          (n = ((n = (n + Math.imul(N, H)) | 0) + Math.imul(L, $)) | 0),
          (s = (s + Math.imul(L, H)) | 0),
          (r = (r + Math.imul(O, Z)) | 0),
          (n = ((n = (n + Math.imul(O, K)) | 0) + Math.imul(P, Z)) | 0),
          (s = (s + Math.imul(P, K)) | 0),
          (r = (r + Math.imul(k, J)) | 0),
          (n = ((n = (n + Math.imul(k, X)) | 0) + Math.imul(I, J)) | 0),
          (s = (s + Math.imul(I, X)) | 0),
          (r = (r + Math.imul(x, Q)) | 0),
          (n = ((n = (n + Math.imul(x, tt)) | 0) + Math.imul(E, Q)) | 0),
          (s = (s + Math.imul(E, tt)) | 0),
          (r = (r + Math.imul(_, it)) | 0),
          (n = ((n = (n + Math.imul(_, rt)) | 0) + Math.imul(S, it)) | 0),
          (s = (s + Math.imul(S, rt)) | 0),
          (r = (r + Math.imul(v, st)) | 0),
          (n = ((n = (n + Math.imul(v, at)) | 0) + Math.imul(M, st)) | 0),
          (s = (s + Math.imul(M, at)) | 0),
          (r = (r + Math.imul(y, ut)) | 0),
          (n = ((n = (n + Math.imul(y, ht)) | 0) + Math.imul(b, ut)) | 0),
          (s = (s + Math.imul(b, ht)) | 0),
          (r = (r + Math.imul(p, lt)) | 0),
          (n = ((n = (n + Math.imul(p, ft)) | 0) + Math.imul(m, lt)) | 0),
          (s = (s + Math.imul(m, ft)) | 0)
        var Tt =
          (((h + (r = (r + Math.imul(l, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, mt)) | 0) + Math.imul(f, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, mt)) | 0) + (n >>> 13)) | 0) +
            (Tt >>> 26)) |
          0),
          (Tt &= 67108863),
          (r = Math.imul(F, $)),
          (n = ((n = Math.imul(F, H)) + Math.imul(U, $)) | 0),
          (s = Math.imul(U, H)),
          (r = (r + Math.imul(N, Z)) | 0),
          (n = ((n = (n + Math.imul(N, K)) | 0) + Math.imul(L, Z)) | 0),
          (s = (s + Math.imul(L, K)) | 0),
          (r = (r + Math.imul(O, J)) | 0),
          (n = ((n = (n + Math.imul(O, X)) | 0) + Math.imul(P, J)) | 0),
          (s = (s + Math.imul(P, X)) | 0),
          (r = (r + Math.imul(k, Q)) | 0),
          (n = ((n = (n + Math.imul(k, tt)) | 0) + Math.imul(I, Q)) | 0),
          (s = (s + Math.imul(I, tt)) | 0),
          (r = (r + Math.imul(x, it)) | 0),
          (n = ((n = (n + Math.imul(x, rt)) | 0) + Math.imul(E, it)) | 0),
          (s = (s + Math.imul(E, rt)) | 0),
          (r = (r + Math.imul(_, st)) | 0),
          (n = ((n = (n + Math.imul(_, at)) | 0) + Math.imul(S, st)) | 0),
          (s = (s + Math.imul(S, at)) | 0),
          (r = (r + Math.imul(v, ut)) | 0),
          (n = ((n = (n + Math.imul(v, ht)) | 0) + Math.imul(M, ut)) | 0),
          (s = (s + Math.imul(M, ht)) | 0),
          (r = (r + Math.imul(y, lt)) | 0),
          (n = ((n = (n + Math.imul(y, ft)) | 0) + Math.imul(b, lt)) | 0),
          (s = (s + Math.imul(b, ft)) | 0)
        var xt =
          (((h + (r = (r + Math.imul(p, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(m, mt)) | 0) + (n >>> 13)) | 0) +
            (xt >>> 26)) |
          0),
          (xt &= 67108863),
          (r = Math.imul(F, Z)),
          (n = ((n = Math.imul(F, K)) + Math.imul(U, Z)) | 0),
          (s = Math.imul(U, K)),
          (r = (r + Math.imul(N, J)) | 0),
          (n = ((n = (n + Math.imul(N, X)) | 0) + Math.imul(L, J)) | 0),
          (s = (s + Math.imul(L, X)) | 0),
          (r = (r + Math.imul(O, Q)) | 0),
          (n = ((n = (n + Math.imul(O, tt)) | 0) + Math.imul(P, Q)) | 0),
          (s = (s + Math.imul(P, tt)) | 0),
          (r = (r + Math.imul(k, it)) | 0),
          (n = ((n = (n + Math.imul(k, rt)) | 0) + Math.imul(I, it)) | 0),
          (s = (s + Math.imul(I, rt)) | 0),
          (r = (r + Math.imul(x, st)) | 0),
          (n = ((n = (n + Math.imul(x, at)) | 0) + Math.imul(E, st)) | 0),
          (s = (s + Math.imul(E, at)) | 0),
          (r = (r + Math.imul(_, ut)) | 0),
          (n = ((n = (n + Math.imul(_, ht)) | 0) + Math.imul(S, ut)) | 0),
          (s = (s + Math.imul(S, ht)) | 0),
          (r = (r + Math.imul(v, lt)) | 0),
          (n = ((n = (n + Math.imul(v, ft)) | 0) + Math.imul(M, lt)) | 0),
          (s = (s + Math.imul(M, ft)) | 0)
        var Et =
          (((h + (r = (r + Math.imul(y, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(y, mt)) | 0) + Math.imul(b, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(b, mt)) | 0) + (n >>> 13)) | 0) +
            (Et >>> 26)) |
          0),
          (Et &= 67108863),
          (r = Math.imul(F, J)),
          (n = ((n = Math.imul(F, X)) + Math.imul(U, J)) | 0),
          (s = Math.imul(U, X)),
          (r = (r + Math.imul(N, Q)) | 0),
          (n = ((n = (n + Math.imul(N, tt)) | 0) + Math.imul(L, Q)) | 0),
          (s = (s + Math.imul(L, tt)) | 0),
          (r = (r + Math.imul(O, it)) | 0),
          (n = ((n = (n + Math.imul(O, rt)) | 0) + Math.imul(P, it)) | 0),
          (s = (s + Math.imul(P, rt)) | 0),
          (r = (r + Math.imul(k, st)) | 0),
          (n = ((n = (n + Math.imul(k, at)) | 0) + Math.imul(I, st)) | 0),
          (s = (s + Math.imul(I, at)) | 0),
          (r = (r + Math.imul(x, ut)) | 0),
          (n = ((n = (n + Math.imul(x, ht)) | 0) + Math.imul(E, ut)) | 0),
          (s = (s + Math.imul(E, ht)) | 0),
          (r = (r + Math.imul(_, lt)) | 0),
          (n = ((n = (n + Math.imul(_, ft)) | 0) + Math.imul(S, lt)) | 0),
          (s = (s + Math.imul(S, ft)) | 0)
        var Rt =
          (((h + (r = (r + Math.imul(v, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(v, mt)) | 0) + Math.imul(M, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(M, mt)) | 0) + (n >>> 13)) | 0) +
            (Rt >>> 26)) |
          0),
          (Rt &= 67108863),
          (r = Math.imul(F, Q)),
          (n = ((n = Math.imul(F, tt)) + Math.imul(U, Q)) | 0),
          (s = Math.imul(U, tt)),
          (r = (r + Math.imul(N, it)) | 0),
          (n = ((n = (n + Math.imul(N, rt)) | 0) + Math.imul(L, it)) | 0),
          (s = (s + Math.imul(L, rt)) | 0),
          (r = (r + Math.imul(O, st)) | 0),
          (n = ((n = (n + Math.imul(O, at)) | 0) + Math.imul(P, st)) | 0),
          (s = (s + Math.imul(P, at)) | 0),
          (r = (r + Math.imul(k, ut)) | 0),
          (n = ((n = (n + Math.imul(k, ht)) | 0) + Math.imul(I, ut)) | 0),
          (s = (s + Math.imul(I, ht)) | 0),
          (r = (r + Math.imul(x, lt)) | 0),
          (n = ((n = (n + Math.imul(x, ft)) | 0) + Math.imul(E, lt)) | 0),
          (s = (s + Math.imul(E, ft)) | 0)
        var kt =
          (((h + (r = (r + Math.imul(_, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(_, mt)) | 0) + Math.imul(S, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(S, mt)) | 0) + (n >>> 13)) | 0) +
            (kt >>> 26)) |
          0),
          (kt &= 67108863),
          (r = Math.imul(F, it)),
          (n = ((n = Math.imul(F, rt)) + Math.imul(U, it)) | 0),
          (s = Math.imul(U, rt)),
          (r = (r + Math.imul(N, st)) | 0),
          (n = ((n = (n + Math.imul(N, at)) | 0) + Math.imul(L, st)) | 0),
          (s = (s + Math.imul(L, at)) | 0),
          (r = (r + Math.imul(O, ut)) | 0),
          (n = ((n = (n + Math.imul(O, ht)) | 0) + Math.imul(P, ut)) | 0),
          (s = (s + Math.imul(P, ht)) | 0),
          (r = (r + Math.imul(k, lt)) | 0),
          (n = ((n = (n + Math.imul(k, ft)) | 0) + Math.imul(I, lt)) | 0),
          (s = (s + Math.imul(I, ft)) | 0)
        var It =
          (((h + (r = (r + Math.imul(x, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(x, mt)) | 0) + Math.imul(E, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(E, mt)) | 0) + (n >>> 13)) | 0) +
            (It >>> 26)) |
          0),
          (It &= 67108863),
          (r = Math.imul(F, st)),
          (n = ((n = Math.imul(F, at)) + Math.imul(U, st)) | 0),
          (s = Math.imul(U, at)),
          (r = (r + Math.imul(N, ut)) | 0),
          (n = ((n = (n + Math.imul(N, ht)) | 0) + Math.imul(L, ut)) | 0),
          (s = (s + Math.imul(L, ht)) | 0),
          (r = (r + Math.imul(O, lt)) | 0),
          (n = ((n = (n + Math.imul(O, ft)) | 0) + Math.imul(P, lt)) | 0),
          (s = (s + Math.imul(P, ft)) | 0)
        var Bt =
          (((h + (r = (r + Math.imul(k, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(k, mt)) | 0) + Math.imul(I, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(I, mt)) | 0) + (n >>> 13)) | 0) +
            (Bt >>> 26)) |
          0),
          (Bt &= 67108863),
          (r = Math.imul(F, ut)),
          (n = ((n = Math.imul(F, ht)) + Math.imul(U, ut)) | 0),
          (s = Math.imul(U, ht)),
          (r = (r + Math.imul(N, lt)) | 0),
          (n = ((n = (n + Math.imul(N, ft)) | 0) + Math.imul(L, lt)) | 0),
          (s = (s + Math.imul(L, ft)) | 0)
        var Ot =
          (((h + (r = (r + Math.imul(O, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(O, mt)) | 0) + Math.imul(P, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(P, mt)) | 0) + (n >>> 13)) | 0) +
            (Ot >>> 26)) |
          0),
          (Ot &= 67108863),
          (r = Math.imul(F, lt)),
          (n = ((n = Math.imul(F, ft)) + Math.imul(U, lt)) | 0),
          (s = Math.imul(U, ft))
        var Pt =
          (((h + (r = (r + Math.imul(N, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(N, mt)) | 0) + Math.imul(L, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(L, mt)) | 0) + (n >>> 13)) | 0) +
            (Pt >>> 26)) |
          0),
          (Pt &= 67108863)
        var Ct =
          (((h + (r = Math.imul(F, pt))) | 0) +
            ((8191 & (n = ((n = Math.imul(F, mt)) + Math.imul(U, pt)) | 0)) <<
              13)) |
          0
        return (
          (h = ((((s = Math.imul(U, mt)) + (n >>> 13)) | 0) + (Ct >>> 26)) | 0),
          (Ct &= 67108863),
          (u[0] = gt),
          (u[1] = yt),
          (u[2] = bt),
          (u[3] = wt),
          (u[4] = vt),
          (u[5] = Mt),
          (u[6] = At),
          (u[7] = _t),
          (u[8] = St),
          (u[9] = Tt),
          (u[10] = xt),
          (u[11] = Et),
          (u[12] = Rt),
          (u[13] = kt),
          (u[14] = It),
          (u[15] = Bt),
          (u[16] = Ot),
          (u[17] = Pt),
          (u[18] = Ct),
          0 !== h && ((u[19] = h), i.length++),
          i
        )
      }
      function m(t, e, i) {
        return new g().mulp(t, e, i)
      }
      function g(t, e) {
        ;(this.x = t), (this.y = e)
      }
      Math.imul || (p = c),
        (n.prototype.mulTo = function (t, e) {
          var i,
            r = this.length + t.length
          return (
            (i =
              10 === this.length && 10 === t.length
                ? p(this, t, e)
                : r < 63
                ? c(this, t, e)
                : r < 1024
                ? (function (t, e, i) {
                    ;(i.negative = e.negative ^ t.negative),
                      (i.length = t.length + e.length)
                    for (var r = 0, n = 0, s = 0; s < i.length - 1; s++) {
                      var a = n
                      n = 0
                      for (
                        var o = 67108863 & r,
                          u = Math.min(s, e.length - 1),
                          h = Math.max(0, s - t.length + 1);
                        h <= u;
                        h++
                      ) {
                        var d = (0 | t.words[s - h]) * (0 | e.words[h]),
                          l = 67108863 & d
                        ;(o = 67108863 & (l = (l + o) | 0)),
                          (n +=
                            (a =
                              ((a = (a + ((d / 67108864) | 0)) | 0) +
                                (l >>> 26)) |
                              0) >>> 26),
                          (a &= 67108863)
                      }
                      ;(i.words[s] = o), (r = a), (a = n)
                    }
                    return 0 !== r ? (i.words[s] = r) : i.length--, i.strip()
                  })(this, t, e)
                : m(this, t, e)),
            i
          )
        }),
        (g.prototype.makeRBT = function (t) {
          for (
            var e = new Array(t), i = n.prototype._countBits(t) - 1, r = 0;
            r < t;
            r++
          )
            e[r] = this.revBin(r, i, t)
          return e
        }),
        (g.prototype.revBin = function (t, e, i) {
          if (0 === t || t === i - 1) return t
          for (var r = 0, n = 0; n < e; n++)
            (r |= (1 & t) << (e - n - 1)), (t >>= 1)
          return r
        }),
        (g.prototype.permute = function (t, e, i, r, n, s) {
          for (var a = 0; a < s; a++) (r[a] = e[t[a]]), (n[a] = i[t[a]])
        }),
        (g.prototype.transform = function (t, e, i, r, n, s) {
          this.permute(s, t, e, i, r, n)
          for (var a = 1; a < n; a <<= 1)
            for (
              var o = a << 1,
                u = Math.cos((2 * Math.PI) / o),
                h = Math.sin((2 * Math.PI) / o),
                d = 0;
              d < n;
              d += o
            )
              for (var l = u, f = h, c = 0; c < a; c++) {
                var p = i[d + c],
                  m = r[d + c],
                  g = i[d + c + a],
                  y = r[d + c + a],
                  b = l * g - f * y
                ;(y = l * y + f * g),
                  (i[d + c] = p + (g = b)),
                  (r[d + c] = m + y),
                  (i[d + c + a] = p - g),
                  (r[d + c + a] = m - y),
                  c !== o && ((b = u * l - h * f), (f = u * f + h * l), (l = b))
              }
        }),
        (g.prototype.guessLen13b = function (t, e) {
          var i = 1 | Math.max(e, t),
            r = 1 & i,
            n = 0
          for (i = (i / 2) | 0; i; i >>>= 1) n++
          return 1 << (n + 1 + r)
        }),
        (g.prototype.conjugate = function (t, e, i) {
          if (!(i <= 1))
            for (var r = 0; r < i / 2; r++) {
              var n = t[r]
              ;(t[r] = t[i - r - 1]),
                (t[i - r - 1] = n),
                (n = e[r]),
                (e[r] = -e[i - r - 1]),
                (e[i - r - 1] = -n)
            }
        }),
        (g.prototype.normalize13b = function (t, e) {
          for (var i = 0, r = 0; r < e / 2; r++) {
            var n =
              8192 * Math.round(t[2 * r + 1] / e) + Math.round(t[2 * r] / e) + i
            ;(t[r] = 67108863 & n), (i = n < 67108864 ? 0 : (n / 67108864) | 0)
          }
          return t
        }),
        (g.prototype.convert13b = function (t, e, r, n) {
          for (var s = 0, a = 0; a < e; a++)
            (r[2 * a] = 8191 & (s += 0 | t[a])),
              (r[2 * a + 1] = 8191 & (s >>>= 13)),
              (s >>>= 13)
          for (a = 2 * e; a < n; ++a) r[a] = 0
          i(0 === s), i(0 == (-8192 & s))
        }),
        (g.prototype.stub = function (t) {
          for (var e = new Array(t), i = 0; i < t; i++) e[i] = 0
          return e
        }),
        (g.prototype.mulp = function (t, e, i) {
          var r = 2 * this.guessLen13b(t.length, e.length),
            n = this.makeRBT(r),
            s = this.stub(r),
            a = new Array(r),
            o = new Array(r),
            u = new Array(r),
            h = new Array(r),
            d = new Array(r),
            l = new Array(r),
            f = i.words
          ;(f.length = r),
            this.convert13b(t.words, t.length, a, r),
            this.convert13b(e.words, e.length, h, r),
            this.transform(a, s, o, u, r, n),
            this.transform(h, s, d, l, r, n)
          for (var c = 0; c < r; c++) {
            var p = o[c] * d[c] - u[c] * l[c]
            ;(u[c] = o[c] * l[c] + u[c] * d[c]), (o[c] = p)
          }
          return (
            this.conjugate(o, u, r),
            this.transform(o, u, f, s, r, n),
            this.conjugate(f, s, r),
            this.normalize13b(f, r),
            (i.negative = t.negative ^ e.negative),
            (i.length = t.length + e.length),
            i.strip()
          )
        }),
        (n.prototype.mul = function (t) {
          var e = new n(null)
          return (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
        }),
        (n.prototype.mulf = function (t) {
          var e = new n(null)
          return (e.words = new Array(this.length + t.length)), m(this, t, e)
        }),
        (n.prototype.imul = function (t) {
          return this.clone().mulTo(t, this)
        }),
        (n.prototype.imuln = function (t) {
          i('number' == typeof t), i(t < 67108864)
          for (var e = 0, r = 0; r < this.length; r++) {
            var n = (0 | this.words[r]) * t,
              s = (67108863 & n) + (67108863 & e)
            ;(e >>= 26),
              (e += (n / 67108864) | 0),
              (e += s >>> 26),
              (this.words[r] = 67108863 & s)
          }
          return 0 !== e && ((this.words[r] = e), this.length++), this
        }),
        (n.prototype.muln = function (t) {
          return this.clone().imuln(t)
        }),
        (n.prototype.sqr = function () {
          return this.mul(this)
        }),
        (n.prototype.isqr = function () {
          return this.imul(this.clone())
        }),
        (n.prototype.pow = function (t) {
          var e = (function (t) {
            for (var e = new Array(t.bitLength()), i = 0; i < e.length; i++) {
              var r = i % 26
              e[i] = (t.words[(i / 26) | 0] & (1 << r)) >>> r
            }
            return e
          })(t)
          if (0 === e.length) return new n(1)
          for (
            var i = this, r = 0;
            r < e.length && 0 === e[r];
            r++, i = i.sqr()
          );
          if (++r < e.length)
            for (var s = i.sqr(); r < e.length; r++, s = s.sqr())
              0 !== e[r] && (i = i.mul(s))
          return i
        }),
        (n.prototype.iushln = function (t) {
          i('number' == typeof t && t >= 0)
          var e,
            r = t % 26,
            n = (t - r) / 26,
            s = (67108863 >>> (26 - r)) << (26 - r)
          if (0 !== r) {
            var a = 0
            for (e = 0; e < this.length; e++) {
              var o = this.words[e] & s
              ;(this.words[e] = (((0 | this.words[e]) - o) << r) | a),
                (a = o >>> (26 - r))
            }
            a && ((this.words[e] = a), this.length++)
          }
          if (0 !== n) {
            for (e = this.length - 1; e >= 0; e--)
              this.words[e + n] = this.words[e]
            for (e = 0; e < n; e++) this.words[e] = 0
            this.length += n
          }
          return this.strip()
        }),
        (n.prototype.ishln = function (t) {
          return i(0 === this.negative), this.iushln(t)
        }),
        (n.prototype.iushrn = function (t, e, r) {
          var n
          i('number' == typeof t && t >= 0), (n = e ? (e - (e % 26)) / 26 : 0)
          var s = t % 26,
            a = Math.min((t - s) / 26, this.length),
            o = 67108863 ^ ((67108863 >>> s) << s),
            u = r
          if (((n -= a), (n = Math.max(0, n)), u)) {
            for (var h = 0; h < a; h++) u.words[h] = this.words[h]
            u.length = a
          }
          if (0 === a);
          else if (this.length > a)
            for (this.length -= a, h = 0; h < this.length; h++)
              this.words[h] = this.words[h + a]
          else (this.words[0] = 0), (this.length = 1)
          var d = 0
          for (h = this.length - 1; h >= 0 && (0 !== d || h >= n); h--) {
            var l = 0 | this.words[h]
            ;(this.words[h] = (d << (26 - s)) | (l >>> s)), (d = l & o)
          }
          return (
            u && 0 !== d && (u.words[u.length++] = d),
            0 === this.length && ((this.words[0] = 0), (this.length = 1)),
            this.strip()
          )
        }),
        (n.prototype.ishrn = function (t, e, r) {
          return i(0 === this.negative), this.iushrn(t, e, r)
        }),
        (n.prototype.shln = function (t) {
          return this.clone().ishln(t)
        }),
        (n.prototype.ushln = function (t) {
          return this.clone().iushln(t)
        }),
        (n.prototype.shrn = function (t) {
          return this.clone().ishrn(t)
        }),
        (n.prototype.ushrn = function (t) {
          return this.clone().iushrn(t)
        }),
        (n.prototype.testn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = t % 26,
            r = (t - e) / 26
          return !(this.length <= r || !(this.words[r] & (1 << e)))
        }),
        (n.prototype.imaskn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = t % 26,
            r = (t - e) / 26
          return (
            i(0 === this.negative, 'imaskn works only with positive numbers'),
            this.length <= r
              ? this
              : (0 !== e && r++,
                (this.length = Math.min(r, this.length)),
                0 !== e &&
                  (this.words[this.length - 1] &=
                    67108863 ^ ((67108863 >>> e) << e)),
                this.strip())
          )
        }),
        (n.prototype.maskn = function (t) {
          return this.clone().imaskn(t)
        }),
        (n.prototype.iaddn = function (t) {
          return (
            i('number' == typeof t),
            i(t < 67108864),
            t < 0
              ? this.isubn(-t)
              : 0 !== this.negative
              ? 1 === this.length && (0 | this.words[0]) < t
                ? ((this.words[0] = t - (0 | this.words[0])),
                  (this.negative = 0),
                  this)
                : ((this.negative = 0),
                  this.isubn(t),
                  (this.negative = 1),
                  this)
              : this._iaddn(t)
          )
        }),
        (n.prototype._iaddn = function (t) {
          this.words[0] += t
          for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
            (this.words[e] -= 67108864),
              e === this.length - 1
                ? (this.words[e + 1] = 1)
                : this.words[e + 1]++
          return (this.length = Math.max(this.length, e + 1)), this
        }),
        (n.prototype.isubn = function (t) {
          if ((i('number' == typeof t), i(t < 67108864), t < 0))
            return this.iaddn(-t)
          if (0 !== this.negative)
            return (this.negative = 0), this.iaddn(t), (this.negative = 1), this
          if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
            (this.words[0] = -this.words[0]), (this.negative = 1)
          else
            for (var e = 0; e < this.length && this.words[e] < 0; e++)
              (this.words[e] += 67108864), (this.words[e + 1] -= 1)
          return this.strip()
        }),
        (n.prototype.addn = function (t) {
          return this.clone().iaddn(t)
        }),
        (n.prototype.subn = function (t) {
          return this.clone().isubn(t)
        }),
        (n.prototype.iabs = function () {
          return (this.negative = 0), this
        }),
        (n.prototype.abs = function () {
          return this.clone().iabs()
        }),
        (n.prototype._ishlnsubmul = function (t, e, r) {
          var n, s
          this._expand(t.length + r)
          var a = 0
          for (n = 0; n < t.length; n++) {
            s = (0 | this.words[n + r]) + a
            var o = (0 | t.words[n]) * e
            ;(a = ((s -= 67108863 & o) >> 26) - ((o / 67108864) | 0)),
              (this.words[n + r] = 67108863 & s)
          }
          for (; n < this.length - r; n++)
            (a = (s = (0 | this.words[n + r]) + a) >> 26),
              (this.words[n + r] = 67108863 & s)
          if (0 === a) return this.strip()
          for (i(-1 === a), a = 0, n = 0; n < this.length; n++)
            (a = (s = -(0 | this.words[n]) + a) >> 26),
              (this.words[n] = 67108863 & s)
          return (this.negative = 1), this.strip()
        }),
        (n.prototype._wordDiv = function (t, e) {
          var i,
            r = this.clone(),
            s = t,
            a = 0 | s.words[s.length - 1]
          0 != (i = 26 - this._countBits(a)) &&
            ((s = s.ushln(i)), r.iushln(i), (a = 0 | s.words[s.length - 1]))
          var o,
            u = r.length - s.length
          if ('mod' !== e) {
            ;((o = new n(null)).length = u + 1), (o.words = new Array(o.length))
            for (var h = 0; h < o.length; h++) o.words[h] = 0
          }
          var d = r.clone()._ishlnsubmul(s, 1, u)
          0 === d.negative && ((r = d), o && (o.words[u] = 1))
          for (var l = u - 1; l >= 0; l--) {
            var f =
              67108864 * (0 | r.words[s.length + l]) +
              (0 | r.words[s.length + l - 1])
            for (
              f = Math.min((f / a) | 0, 67108863), r._ishlnsubmul(s, f, l);
              0 !== r.negative;

            )
              f--,
                (r.negative = 0),
                r._ishlnsubmul(s, 1, l),
                r.isZero() || (r.negative ^= 1)
            o && (o.words[l] = f)
          }
          return (
            o && o.strip(),
            r.strip(),
            'div' !== e && 0 !== i && r.iushrn(i),
            { div: o || null, mod: r }
          )
        }),
        (n.prototype.divmod = function (t, e, r) {
          return (
            i(!t.isZero()),
            this.isZero()
              ? { div: new n(0), mod: new n(0) }
              : 0 !== this.negative && 0 === t.negative
              ? ((o = this.neg().divmod(t, e)),
                'mod' !== e && (s = o.div.neg()),
                'div' !== e &&
                  ((a = o.mod.neg()), r && 0 !== a.negative && a.iadd(t)),
                { div: s, mod: a })
              : 0 === this.negative && 0 !== t.negative
              ? ((o = this.divmod(t.neg(), e)),
                'mod' !== e && (s = o.div.neg()),
                { div: s, mod: o.mod })
              : 0 != (this.negative & t.negative)
              ? ((o = this.neg().divmod(t.neg(), e)),
                'div' !== e &&
                  ((a = o.mod.neg()), r && 0 !== a.negative && a.isub(t)),
                { div: o.div, mod: a })
              : t.length > this.length || this.cmp(t) < 0
              ? { div: new n(0), mod: this }
              : 1 === t.length
              ? 'div' === e
                ? { div: this.divn(t.words[0]), mod: null }
                : 'mod' === e
                ? { div: null, mod: new n(this.modn(t.words[0])) }
                : {
                    div: this.divn(t.words[0]),
                    mod: new n(this.modn(t.words[0]))
                  }
              : this._wordDiv(t, e)
          )
          var s, a, o
        }),
        (n.prototype.div = function (t) {
          return this.divmod(t, 'div', !1).div
        }),
        (n.prototype.mod = function (t) {
          return this.divmod(t, 'mod', !1).mod
        }),
        (n.prototype.umod = function (t) {
          return this.divmod(t, 'mod', !0).mod
        }),
        (n.prototype.divRound = function (t) {
          var e = this.divmod(t)
          if (e.mod.isZero()) return e.div
          var i = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
            r = t.ushrn(1),
            n = t.andln(1),
            s = i.cmp(r)
          return s < 0 || (1 === n && 0 === s)
            ? e.div
            : 0 !== e.div.negative
            ? e.div.isubn(1)
            : e.div.iaddn(1)
        }),
        (n.prototype.modn = function (t) {
          i(t <= 67108863)
          for (var e = (1 << 26) % t, r = 0, n = this.length - 1; n >= 0; n--)
            r = (e * r + (0 | this.words[n])) % t
          return r
        }),
        (n.prototype.idivn = function (t) {
          i(t <= 67108863)
          for (var e = 0, r = this.length - 1; r >= 0; r--) {
            var n = (0 | this.words[r]) + 67108864 * e
            ;(this.words[r] = (n / t) | 0), (e = n % t)
          }
          return this.strip()
        }),
        (n.prototype.divn = function (t) {
          return this.clone().idivn(t)
        }),
        (n.prototype.egcd = function (t) {
          i(0 === t.negative), i(!t.isZero())
          var e = this,
            r = t.clone()
          e = 0 !== e.negative ? e.umod(t) : e.clone()
          for (
            var s = new n(1), a = new n(0), o = new n(0), u = new n(1), h = 0;
            e.isEven() && r.isEven();

          )
            e.iushrn(1), r.iushrn(1), ++h
          for (var d = r.clone(), l = e.clone(); !e.isZero(); ) {
            for (
              var f = 0, c = 1;
              0 == (e.words[0] & c) && f < 26;
              ++f, c <<= 1
            );
            if (f > 0)
              for (e.iushrn(f); f-- > 0; )
                (s.isOdd() || a.isOdd()) && (s.iadd(d), a.isub(l)),
                  s.iushrn(1),
                  a.iushrn(1)
            for (
              var p = 0, m = 1;
              0 == (r.words[0] & m) && p < 26;
              ++p, m <<= 1
            );
            if (p > 0)
              for (r.iushrn(p); p-- > 0; )
                (o.isOdd() || u.isOdd()) && (o.iadd(d), u.isub(l)),
                  o.iushrn(1),
                  u.iushrn(1)
            e.cmp(r) >= 0
              ? (e.isub(r), s.isub(o), a.isub(u))
              : (r.isub(e), o.isub(s), u.isub(a))
          }
          return { a: o, b: u, gcd: r.iushln(h) }
        }),
        (n.prototype._invmp = function (t) {
          i(0 === t.negative), i(!t.isZero())
          var e = this,
            r = t.clone()
          e = 0 !== e.negative ? e.umod(t) : e.clone()
          for (
            var s, a = new n(1), o = new n(0), u = r.clone();
            e.cmpn(1) > 0 && r.cmpn(1) > 0;

          ) {
            for (
              var h = 0, d = 1;
              0 == (e.words[0] & d) && h < 26;
              ++h, d <<= 1
            );
            if (h > 0)
              for (e.iushrn(h); h-- > 0; ) a.isOdd() && a.iadd(u), a.iushrn(1)
            for (
              var l = 0, f = 1;
              0 == (r.words[0] & f) && l < 26;
              ++l, f <<= 1
            );
            if (l > 0)
              for (r.iushrn(l); l-- > 0; ) o.isOdd() && o.iadd(u), o.iushrn(1)
            e.cmp(r) >= 0 ? (e.isub(r), a.isub(o)) : (r.isub(e), o.isub(a))
          }
          return (s = 0 === e.cmpn(1) ? a : o).cmpn(0) < 0 && s.iadd(t), s
        }),
        (n.prototype.gcd = function (t) {
          if (this.isZero()) return t.abs()
          if (t.isZero()) return this.abs()
          var e = this.clone(),
            i = t.clone()
          ;(e.negative = 0), (i.negative = 0)
          for (var r = 0; e.isEven() && i.isEven(); r++)
            e.iushrn(1), i.iushrn(1)
          for (;;) {
            for (; e.isEven(); ) e.iushrn(1)
            for (; i.isEven(); ) i.iushrn(1)
            var n = e.cmp(i)
            if (n < 0) {
              var s = e
              ;(e = i), (i = s)
            } else if (0 === n || 0 === i.cmpn(1)) break
            e.isub(i)
          }
          return i.iushln(r)
        }),
        (n.prototype.invm = function (t) {
          return this.egcd(t).a.umod(t)
        }),
        (n.prototype.isEven = function () {
          return 0 == (1 & this.words[0])
        }),
        (n.prototype.isOdd = function () {
          return 1 == (1 & this.words[0])
        }),
        (n.prototype.andln = function (t) {
          return this.words[0] & t
        }),
        (n.prototype.bincn = function (t) {
          i('number' == typeof t)
          var e = t % 26,
            r = (t - e) / 26,
            n = 1 << e
          if (this.length <= r)
            return this._expand(r + 1), (this.words[r] |= n), this
          for (var s = n, a = r; 0 !== s && a < this.length; a++) {
            var o = 0 | this.words[a]
            ;(s = (o += s) >>> 26), (this.words[a] = o &= 67108863)
          }
          return 0 !== s && ((this.words[a] = s), this.length++), this
        }),
        (n.prototype.isZero = function () {
          return 1 === this.length && 0 === this.words[0]
        }),
        (n.prototype.cmpn = function (t) {
          var e,
            r = t < 0
          if (0 !== this.negative && !r) return -1
          if (0 === this.negative && r) return 1
          if ((this.strip(), this.length > 1)) e = 1
          else {
            r && (t = -t), i(t <= 67108863, 'Number is too big')
            var n = 0 | this.words[0]
            e = n === t ? 0 : n < t ? -1 : 1
          }
          return 0 !== this.negative ? 0 | -e : e
        }),
        (n.prototype.cmp = function (t) {
          if (0 !== this.negative && 0 === t.negative) return -1
          if (0 === this.negative && 0 !== t.negative) return 1
          var e = this.ucmp(t)
          return 0 !== this.negative ? 0 | -e : e
        }),
        (n.prototype.ucmp = function (t) {
          if (this.length > t.length) return 1
          if (this.length < t.length) return -1
          for (var e = 0, i = this.length - 1; i >= 0; i--) {
            var r = 0 | this.words[i],
              n = 0 | t.words[i]
            if (r !== n) {
              r < n ? (e = -1) : r > n && (e = 1)
              break
            }
          }
          return e
        }),
        (n.prototype.gtn = function (t) {
          return 1 === this.cmpn(t)
        }),
        (n.prototype.gt = function (t) {
          return 1 === this.cmp(t)
        }),
        (n.prototype.gten = function (t) {
          return this.cmpn(t) >= 0
        }),
        (n.prototype.gte = function (t) {
          return this.cmp(t) >= 0
        }),
        (n.prototype.ltn = function (t) {
          return -1 === this.cmpn(t)
        }),
        (n.prototype.lt = function (t) {
          return -1 === this.cmp(t)
        }),
        (n.prototype.lten = function (t) {
          return this.cmpn(t) <= 0
        }),
        (n.prototype.lte = function (t) {
          return this.cmp(t) <= 0
        }),
        (n.prototype.eqn = function (t) {
          return 0 === this.cmpn(t)
        }),
        (n.prototype.eq = function (t) {
          return 0 === this.cmp(t)
        }),
        (n.red = function (t) {
          return new _(t)
        }),
        (n.prototype.toRed = function (t) {
          return (
            i(!this.red, 'Already a number in reduction context'),
            i(0 === this.negative, 'red works only with positives'),
            t.convertTo(this)._forceRed(t)
          )
        }),
        (n.prototype.fromRed = function () {
          return (
            i(this.red, 'fromRed works only with numbers in reduction context'),
            this.red.convertFrom(this)
          )
        }),
        (n.prototype._forceRed = function (t) {
          return (this.red = t), this
        }),
        (n.prototype.forceRed = function (t) {
          return (
            i(!this.red, 'Already a number in reduction context'),
            this._forceRed(t)
          )
        }),
        (n.prototype.redAdd = function (t) {
          return (
            i(this.red, 'redAdd works only with red numbers'),
            this.red.add(this, t)
          )
        }),
        (n.prototype.redIAdd = function (t) {
          return (
            i(this.red, 'redIAdd works only with red numbers'),
            this.red.iadd(this, t)
          )
        }),
        (n.prototype.redSub = function (t) {
          return (
            i(this.red, 'redSub works only with red numbers'),
            this.red.sub(this, t)
          )
        }),
        (n.prototype.redISub = function (t) {
          return (
            i(this.red, 'redISub works only with red numbers'),
            this.red.isub(this, t)
          )
        }),
        (n.prototype.redShl = function (t) {
          return (
            i(this.red, 'redShl works only with red numbers'),
            this.red.shl(this, t)
          )
        }),
        (n.prototype.redMul = function (t) {
          return (
            i(this.red, 'redMul works only with red numbers'),
            this.red._verify2(this, t),
            this.red.mul(this, t)
          )
        }),
        (n.prototype.redIMul = function (t) {
          return (
            i(this.red, 'redMul works only with red numbers'),
            this.red._verify2(this, t),
            this.red.imul(this, t)
          )
        }),
        (n.prototype.redSqr = function () {
          return (
            i(this.red, 'redSqr works only with red numbers'),
            this.red._verify1(this),
            this.red.sqr(this)
          )
        }),
        (n.prototype.redISqr = function () {
          return (
            i(this.red, 'redISqr works only with red numbers'),
            this.red._verify1(this),
            this.red.isqr(this)
          )
        }),
        (n.prototype.redSqrt = function () {
          return (
            i(this.red, 'redSqrt works only with red numbers'),
            this.red._verify1(this),
            this.red.sqrt(this)
          )
        }),
        (n.prototype.redInvm = function () {
          return (
            i(this.red, 'redInvm works only with red numbers'),
            this.red._verify1(this),
            this.red.invm(this)
          )
        }),
        (n.prototype.redNeg = function () {
          return (
            i(this.red, 'redNeg works only with red numbers'),
            this.red._verify1(this),
            this.red.neg(this)
          )
        }),
        (n.prototype.redPow = function (t) {
          return (
            i(this.red && !t.red, 'redPow(normalNum)'),
            this.red._verify1(this),
            this.red.pow(this, t)
          )
        })
      var y = { k256: null, p224: null, p192: null, p25519: null }
      function b(t, e) {
        ;(this.name = t),
          (this.p = new n(e, 16)),
          (this.n = this.p.bitLength()),
          (this.k = new n(1).iushln(this.n).isub(this.p)),
          (this.tmp = this._tmp())
      }
      function w() {
        b.call(
          this,
          'k256',
          'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
        )
      }
      function v() {
        b.call(
          this,
          'p224',
          'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
        )
      }
      function M() {
        b.call(
          this,
          'p192',
          'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
        )
      }
      function A() {
        b.call(
          this,
          '25519',
          '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
        )
      }
      function _(t) {
        if ('string' == typeof t) {
          var e = n._prime(t)
          ;(this.m = e.p), (this.prime = e)
        } else i(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null)
      }
      function S(t) {
        _.call(this, t),
          (this.shift = this.m.bitLength()),
          this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
          (this.r = new n(1).iushln(this.shift)),
          (this.r2 = this.imod(this.r.sqr())),
          (this.rinv = this.r._invmp(this.m)),
          (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
          (this.minv = this.minv.umod(this.r)),
          (this.minv = this.r.sub(this.minv))
      }
      ;(b.prototype._tmp = function () {
        var t = new n(null)
        return (t.words = new Array(Math.ceil(this.n / 13))), t
      }),
        (b.prototype.ireduce = function (t) {
          var e,
            i = t
          do {
            this.split(i, this.tmp),
              (e = (i = (i = this.imulK(i)).iadd(this.tmp)).bitLength())
          } while (e > this.n)
          var r = e < this.n ? -1 : i.ucmp(this.p)
          return (
            0 === r
              ? ((i.words[0] = 0), (i.length = 1))
              : r > 0
              ? i.isub(this.p)
              : void 0 !== i.strip
              ? i.strip()
              : i._strip(),
            i
          )
        }),
        (b.prototype.split = function (t, e) {
          t.iushrn(this.n, 0, e)
        }),
        (b.prototype.imulK = function (t) {
          return t.imul(this.k)
        }),
        r(w, b),
        (w.prototype.split = function (t, e) {
          for (var i = 4194303, r = Math.min(t.length, 9), n = 0; n < r; n++)
            e.words[n] = t.words[n]
          if (((e.length = r), t.length <= 9))
            return (t.words[0] = 0), void (t.length = 1)
          var s = t.words[9]
          for (e.words[e.length++] = s & i, n = 10; n < t.length; n++) {
            var a = 0 | t.words[n]
            ;(t.words[n - 10] = ((a & i) << 4) | (s >>> 22)), (s = a)
          }
          ;(t.words[n - 10] = s >>>= 22),
            (t.length -= 0 === s && t.length > 10 ? 10 : 9)
        }),
        (w.prototype.imulK = function (t) {
          ;(t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2)
          for (var e = 0, i = 0; i < t.length; i++) {
            var r = 0 | t.words[i]
            ;(t.words[i] = 67108863 & (e += 977 * r)),
              (e = 64 * r + ((e / 67108864) | 0))
          }
          return (
            0 === t.words[t.length - 1] &&
              (t.length--, 0 === t.words[t.length - 1] && t.length--),
            t
          )
        }),
        r(v, b),
        r(M, b),
        r(A, b),
        (A.prototype.imulK = function (t) {
          for (var e = 0, i = 0; i < t.length; i++) {
            var r = 19 * (0 | t.words[i]) + e,
              n = 67108863 & r
            ;(r >>>= 26), (t.words[i] = n), (e = r)
          }
          return 0 !== e && (t.words[t.length++] = e), t
        }),
        (n._prime = function (t) {
          if (y[t]) return y[t]
          var e
          if ('k256' === t) e = new w()
          else if ('p224' === t) e = new v()
          else if ('p192' === t) e = new M()
          else {
            if ('p25519' !== t) throw new Error('Unknown prime ' + t)
            e = new A()
          }
          return (y[t] = e), e
        }),
        (_.prototype._verify1 = function (t) {
          i(0 === t.negative, 'red works only with positives'),
            i(t.red, 'red works only with red numbers')
        }),
        (_.prototype._verify2 = function (t, e) {
          i(0 == (t.negative | e.negative), 'red works only with positives'),
            i(t.red && t.red === e.red, 'red works only with red numbers')
        }),
        (_.prototype.imod = function (t) {
          return this.prime
            ? this.prime.ireduce(t)._forceRed(this)
            : t.umod(this.m)._forceRed(this)
        }),
        (_.prototype.neg = function (t) {
          return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
        }),
        (_.prototype.add = function (t, e) {
          this._verify2(t, e)
          var i = t.add(e)
          return i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this)
        }),
        (_.prototype.iadd = function (t, e) {
          this._verify2(t, e)
          var i = t.iadd(e)
          return i.cmp(this.m) >= 0 && i.isub(this.m), i
        }),
        (_.prototype.sub = function (t, e) {
          this._verify2(t, e)
          var i = t.sub(e)
          return i.cmpn(0) < 0 && i.iadd(this.m), i._forceRed(this)
        }),
        (_.prototype.isub = function (t, e) {
          this._verify2(t, e)
          var i = t.isub(e)
          return i.cmpn(0) < 0 && i.iadd(this.m), i
        }),
        (_.prototype.shl = function (t, e) {
          return this._verify1(t), this.imod(t.ushln(e))
        }),
        (_.prototype.imul = function (t, e) {
          return this._verify2(t, e), this.imod(t.imul(e))
        }),
        (_.prototype.mul = function (t, e) {
          return this._verify2(t, e), this.imod(t.mul(e))
        }),
        (_.prototype.isqr = function (t) {
          return this.imul(t, t.clone())
        }),
        (_.prototype.sqr = function (t) {
          return this.mul(t, t)
        }),
        (_.prototype.sqrt = function (t) {
          if (t.isZero()) return t.clone()
          var e = this.m.andln(3)
          if ((i(e % 2 == 1), 3 === e)) {
            var r = this.m.add(new n(1)).iushrn(2)
            return this.pow(t, r)
          }
          for (var s = this.m.subn(1), a = 0; !s.isZero() && 0 === s.andln(1); )
            a++, s.iushrn(1)
          i(!s.isZero())
          var o = new n(1).toRed(this),
            u = o.redNeg(),
            h = this.m.subn(1).iushrn(1),
            d = this.m.bitLength()
          for (d = new n(2 * d * d).toRed(this); 0 !== this.pow(d, h).cmp(u); )
            d.redIAdd(u)
          for (
            var l = this.pow(d, s),
              f = this.pow(t, s.addn(1).iushrn(1)),
              c = this.pow(t, s),
              p = a;
            0 !== c.cmp(o);

          ) {
            for (var m = c, g = 0; 0 !== m.cmp(o); g++) m = m.redSqr()
            i(g < p)
            var y = this.pow(l, new n(1).iushln(p - g - 1))
            ;(f = f.redMul(y)), (l = y.redSqr()), (c = c.redMul(l)), (p = g)
          }
          return f
        }),
        (_.prototype.invm = function (t) {
          var e = t._invmp(this.m)
          return 0 !== e.negative
            ? ((e.negative = 0), this.imod(e).redNeg())
            : this.imod(e)
        }),
        (_.prototype.pow = function (t, e) {
          if (e.isZero()) return new n(1).toRed(this)
          if (0 === e.cmpn(1)) return t.clone()
          var i = new Array(16)
          ;(i[0] = new n(1).toRed(this)), (i[1] = t)
          for (var r = 2; r < i.length; r++) i[r] = this.mul(i[r - 1], t)
          var s = i[0],
            a = 0,
            o = 0,
            u = e.bitLength() % 26
          for (0 === u && (u = 26), r = e.length - 1; r >= 0; r--) {
            for (var h = e.words[r], d = u - 1; d >= 0; d--) {
              var l = (h >> d) & 1
              s !== i[0] && (s = this.sqr(s)),
                0 !== l || 0 !== a
                  ? ((a <<= 1),
                    (a |= l),
                    (4 == ++o || (0 === r && 0 === d)) &&
                      ((s = this.mul(s, i[a])), (o = 0), (a = 0)))
                  : (o = 0)
            }
            u = 26
          }
          return s
        }),
        (_.prototype.convertTo = function (t) {
          var e = t.umod(this.m)
          return e === t ? e.clone() : e
        }),
        (_.prototype.convertFrom = function (t) {
          var e = t.clone()
          return (e.red = null), e
        }),
        (n.mont = function (t) {
          return new S(t)
        }),
        r(S, _),
        (S.prototype.convertTo = function (t) {
          return this.imod(t.ushln(this.shift))
        }),
        (S.prototype.convertFrom = function (t) {
          var e = this.imod(t.mul(this.rinv))
          return (e.red = null), e
        }),
        (S.prototype.imul = function (t, e) {
          if (t.isZero() || e.isZero())
            return (t.words[0] = 0), (t.length = 1), t
          var i = t.imul(e),
            r = i
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m),
            n = i.isub(r).iushrn(this.shift),
            s = n
          return (
            n.cmp(this.m) >= 0
              ? (s = n.isub(this.m))
              : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
            s._forceRed(this)
          )
        }),
        (S.prototype.mul = function (t, e) {
          if (t.isZero() || e.isZero()) return new n(0)._forceRed(this)
          var i = t.mul(e),
            r = i
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m),
            s = i.isub(r).iushrn(this.shift),
            a = s
          return (
            s.cmp(this.m) >= 0
              ? (a = s.isub(this.m))
              : s.cmpn(0) < 0 && (a = s.iadd(this.m)),
            a._forceRed(this)
          )
        }),
        (S.prototype.invm = function (t) {
          return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
        })
    })(t, bt)
  }),
  Ot = wt(function (t, e) {
    !(function (t) {
      var e,
        i,
        r,
        n = String.fromCharCode
      function s(t) {
        for (var e, i, r = [], n = 0, s = t.length; n < s; )
          (e = t.charCodeAt(n++)) >= 55296 && e <= 56319 && n < s
            ? 56320 == (64512 & (i = t.charCodeAt(n++)))
              ? r.push(((1023 & e) << 10) + (1023 & i) + 65536)
              : (r.push(e), n--)
            : r.push(e)
        return r
      }
      function a(t) {
        if (t >= 55296 && t <= 57343)
          throw Error(
            'Lone surrogate U+' +
              t.toString(16).toUpperCase() +
              ' is not a scalar value'
          )
      }
      function o(t, e) {
        return n(((t >> e) & 63) | 128)
      }
      function u(t) {
        if (0 == (4294967168 & t)) return n(t)
        var e = ''
        return (
          0 == (4294965248 & t)
            ? (e = n(((t >> 6) & 31) | 192))
            : 0 == (4294901760 & t)
            ? (a(t), (e = n(((t >> 12) & 15) | 224)), (e += o(t, 6)))
            : 0 == (4292870144 & t) &&
              ((e = n(((t >> 18) & 7) | 240)), (e += o(t, 12)), (e += o(t, 6))),
          e + n((63 & t) | 128)
        )
      }
      function h() {
        if (r >= i) throw Error('Invalid byte index')
        var t = 255 & e[r]
        if ((r++, 128 == (192 & t))) return 63 & t
        throw Error('Invalid continuation byte')
      }
      function d() {
        var t, n
        if (r > i) throw Error('Invalid byte index')
        if (r == i) return !1
        if (((t = 255 & e[r]), r++, 0 == (128 & t))) return t
        if (192 == (224 & t)) {
          if ((n = ((31 & t) << 6) | h()) >= 128) return n
          throw Error('Invalid continuation byte')
        }
        if (224 == (240 & t)) {
          if ((n = ((15 & t) << 12) | (h() << 6) | h()) >= 2048) return a(n), n
          throw Error('Invalid continuation byte')
        }
        if (
          240 == (248 & t) &&
          (n = ((7 & t) << 18) | (h() << 12) | (h() << 6) | h()) >= 65536 &&
          n <= 1114111
        )
          return n
        throw Error('Invalid UTF-8 detected')
      }
      ;(t.version = '3.0.0'),
        (t.encode = function (t) {
          for (var e = s(t), i = e.length, r = -1, n = ''; ++r < i; )
            n += u(e[r])
          return n
        }),
        (t.decode = function (t) {
          ;(e = s(t)), (i = e.length), (r = 0)
          for (var a, o = []; !1 !== (a = d()); ) o.push(a)
          return (function (t) {
            for (var e, i = t.length, r = -1, s = ''; ++r < i; )
              (e = t[r]) > 65535 &&
                ((s += n((((e -= 65536) >>> 10) & 1023) | 55296)),
                (e = 56320 | (1023 & e))),
                (s += n(e))
            return s
          })(o)
        })
    })(e)
  }),
  Pt = wt(function (t) {
    !(function (t, e) {
      function i(t, e) {
        if (!t) throw new Error(e || 'Assertion failed')
      }
      function r(t, e) {
        t.super_ = e
        var i = function () {}
        ;(i.prototype = e.prototype),
          (t.prototype = new i()),
          (t.prototype.constructor = t)
      }
      function n(t, e, i) {
        if (n.isBN(t)) return t
        ;(this.negative = 0),
          (this.words = null),
          (this.length = 0),
          (this.red = null),
          null !== t &&
            (('le' !== e && 'be' !== e) || ((i = e), (e = 10)),
            this._init(t || 0, e || 10, i || 'be'))
      }
      var s
      'object' == typeof t ? (t.exports = n) : (e.BN = n),
        (n.BN = n),
        (n.wordSize = 26)
      try {
        s =
          'undefined' != typeof window && void 0 !== window.Buffer
            ? window.Buffer
            : o.Buffer
      } catch (t) {}
      function a(t, e) {
        var r = t.charCodeAt(e)
        return r >= 48 && r <= 57
          ? r - 48
          : r >= 65 && r <= 70
          ? r - 55
          : r >= 97 && r <= 102
          ? r - 87
          : void i(!1, 'Invalid character in ' + t)
      }
      function u(t, e, i) {
        var r = a(t, i)
        return i - 1 >= e && (r |= a(t, i - 1) << 4), r
      }
      function h(t, e, r, n) {
        for (var s = 0, a = 0, o = Math.min(t.length, r), u = e; u < o; u++) {
          var h = t.charCodeAt(u) - 48
          ;(s *= n),
            (a = h >= 49 ? h - 49 + 10 : h >= 17 ? h - 17 + 10 : h),
            i(h >= 0 && a < n, 'Invalid character'),
            (s += a)
        }
        return s
      }
      function d(t, e) {
        ;(t.words = e.words),
          (t.length = e.length),
          (t.negative = e.negative),
          (t.red = e.red)
      }
      if (
        ((n.isBN = function (t) {
          return (
            t instanceof n ||
            (null !== t &&
              'object' == typeof t &&
              t.constructor.wordSize === n.wordSize &&
              Array.isArray(t.words))
          )
        }),
        (n.max = function (t, e) {
          return t.cmp(e) > 0 ? t : e
        }),
        (n.min = function (t, e) {
          return t.cmp(e) < 0 ? t : e
        }),
        (n.prototype._init = function (t, e, r) {
          if ('number' == typeof t) return this._initNumber(t, e, r)
          if ('object' == typeof t) return this._initArray(t, e, r)
          'hex' === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36)
          var n = 0
          '-' === (t = t.toString().replace(/\s+/g, ''))[0] &&
            (n++, (this.negative = 1)),
            n < t.length &&
              (16 === e
                ? this._parseHex(t, n, r)
                : (this._parseBase(t, e, n),
                  'le' === r && this._initArray(this.toArray(), e, r)))
        }),
        (n.prototype._initNumber = function (t, e, r) {
          t < 0 && ((this.negative = 1), (t = -t)),
            t < 67108864
              ? ((this.words = [67108863 & t]), (this.length = 1))
              : t < 4503599627370496
              ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                (this.length = 2))
              : (i(t < 9007199254740992),
                (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                (this.length = 3)),
            'le' === r && this._initArray(this.toArray(), e, r)
        }),
        (n.prototype._initArray = function (t, e, r) {
          if ((i('number' == typeof t.length), t.length <= 0))
            return (this.words = [0]), (this.length = 1), this
          ;(this.length = Math.ceil(t.length / 3)),
            (this.words = new Array(this.length))
          for (var n = 0; n < this.length; n++) this.words[n] = 0
          var s,
            a,
            o = 0
          if ('be' === r)
            for (n = t.length - 1, s = 0; n >= 0; n -= 3)
              (this.words[s] |=
                ((a = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)) << o) &
                67108863),
                (this.words[s + 1] = (a >>> (26 - o)) & 67108863),
                (o += 24) >= 26 && ((o -= 26), s++)
          else if ('le' === r)
            for (n = 0, s = 0; n < t.length; n += 3)
              (this.words[s] |=
                ((a = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) << o) &
                67108863),
                (this.words[s + 1] = (a >>> (26 - o)) & 67108863),
                (o += 24) >= 26 && ((o -= 26), s++)
          return this._strip()
        }),
        (n.prototype._parseHex = function (t, e, i) {
          ;(this.length = Math.ceil((t.length - e) / 6)),
            (this.words = new Array(this.length))
          for (var r = 0; r < this.length; r++) this.words[r] = 0
          var n,
            s = 0,
            a = 0
          if ('be' === i)
            for (r = t.length - 1; r >= e; r -= 2)
              (n = u(t, e, r) << s),
                (this.words[a] |= 67108863 & n),
                s >= 18
                  ? ((s -= 18), (this.words[(a += 1)] |= n >>> 26))
                  : (s += 8)
          else
            for (r = (t.length - e) % 2 == 0 ? e + 1 : e; r < t.length; r += 2)
              (n = u(t, e, r) << s),
                (this.words[a] |= 67108863 & n),
                s >= 18
                  ? ((s -= 18), (this.words[(a += 1)] |= n >>> 26))
                  : (s += 8)
          this._strip()
        }),
        (n.prototype._parseBase = function (t, e, i) {
          ;(this.words = [0]), (this.length = 1)
          for (var r = 0, n = 1; n <= 67108863; n *= e) r++
          r--, (n = (n / e) | 0)
          for (
            var s = t.length - i,
              a = s % r,
              o = Math.min(s, s - a) + i,
              u = 0,
              d = i;
            d < o;
            d += r
          )
            (u = h(t, d, d + r, e)),
              this.imuln(n),
              this.words[0] + u < 67108864
                ? (this.words[0] += u)
                : this._iaddn(u)
          if (0 !== a) {
            var l = 1
            for (u = h(t, d, t.length, e), d = 0; d < a; d++) l *= e
            this.imuln(l),
              this.words[0] + u < 67108864
                ? (this.words[0] += u)
                : this._iaddn(u)
          }
          this._strip()
        }),
        (n.prototype.copy = function (t) {
          t.words = new Array(this.length)
          for (var e = 0; e < this.length; e++) t.words[e] = this.words[e]
          ;(t.length = this.length),
            (t.negative = this.negative),
            (t.red = this.red)
        }),
        (n.prototype._move = function (t) {
          d(t, this)
        }),
        (n.prototype.clone = function () {
          var t = new n(null)
          return this.copy(t), t
        }),
        (n.prototype._expand = function (t) {
          for (; this.length < t; ) this.words[this.length++] = 0
          return this
        }),
        (n.prototype._strip = function () {
          for (; this.length > 1 && 0 === this.words[this.length - 1]; )
            this.length--
          return this._normSign()
        }),
        (n.prototype._normSign = function () {
          return (
            1 === this.length && 0 === this.words[0] && (this.negative = 0),
            this
          )
        }),
        'undefined' != typeof Symbol && 'function' == typeof Symbol.for)
      )
        try {
          n.prototype[Symbol.for('nodejs.util.inspect.custom')] = l
        } catch (t) {
          n.prototype.inspect = l
        }
      else n.prototype.inspect = l
      function l() {
        return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
      }
      var f = [
          '',
          '0',
          '00',
          '000',
          '0000',
          '00000',
          '000000',
          '0000000',
          '00000000',
          '000000000',
          '0000000000',
          '00000000000',
          '000000000000',
          '0000000000000',
          '00000000000000',
          '000000000000000',
          '0000000000000000',
          '00000000000000000',
          '000000000000000000',
          '0000000000000000000',
          '00000000000000000000',
          '000000000000000000000',
          '0000000000000000000000',
          '00000000000000000000000',
          '000000000000000000000000',
          '0000000000000000000000000'
        ],
        c = [
          0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        p = [
          0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
          16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
          11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
          5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
          20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
          60466176
        ]
      function m(t, e, i) {
        i.negative = e.negative ^ t.negative
        var r = (t.length + e.length) | 0
        ;(i.length = r), (r = (r - 1) | 0)
        var n = 0 | t.words[0],
          s = 0 | e.words[0],
          a = n * s,
          o = (a / 67108864) | 0
        i.words[0] = 67108863 & a
        for (var u = 1; u < r; u++) {
          for (
            var h = o >>> 26,
              d = 67108863 & o,
              l = Math.min(u, e.length - 1),
              f = Math.max(0, u - t.length + 1);
            f <= l;
            f++
          )
            (h +=
              ((a = (n = 0 | t.words[(u - f) | 0]) * (s = 0 | e.words[f]) + d) /
                67108864) |
              0),
              (d = 67108863 & a)
          ;(i.words[u] = 0 | d), (o = 0 | h)
        }
        return 0 !== o ? (i.words[u] = 0 | o) : i.length--, i._strip()
      }
      ;(n.prototype.toString = function (t, e) {
        var r
        if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
          r = ''
          for (var n = 0, s = 0, a = 0; a < this.length; a++) {
            var o = this.words[a],
              u = (16777215 & ((o << n) | s)).toString(16)
            ;(r =
              0 != (s = (o >>> (24 - n)) & 16777215) || a !== this.length - 1
                ? f[6 - u.length] + u + r
                : u + r),
              (n += 2) >= 26 && ((n -= 26), a--)
          }
          for (0 !== s && (r = s.toString(16) + r); r.length % e != 0; )
            r = '0' + r
          return 0 !== this.negative && (r = '-' + r), r
        }
        if (t === (0 | t) && t >= 2 && t <= 36) {
          var h = c[t],
            d = p[t]
          r = ''
          var l = this.clone()
          for (l.negative = 0; !l.isZero(); ) {
            var m = l.modrn(d).toString(t)
            r = (l = l.idivn(d)).isZero() ? m + r : f[h - m.length] + m + r
          }
          for (this.isZero() && (r = '0' + r); r.length % e != 0; ) r = '0' + r
          return 0 !== this.negative && (r = '-' + r), r
        }
        i(!1, 'Base should be between 2 and 36')
      }),
        (n.prototype.toNumber = function () {
          var t = this.words[0]
          return (
            2 === this.length
              ? (t += 67108864 * this.words[1])
              : 3 === this.length && 1 === this.words[2]
              ? (t += 4503599627370496 + 67108864 * this.words[1])
              : this.length > 2 &&
                i(!1, 'Number can only safely store up to 53 bits'),
            0 !== this.negative ? -t : t
          )
        }),
        (n.prototype.toJSON = function () {
          return this.toString(16, 2)
        }),
        s &&
          (n.prototype.toBuffer = function (t, e) {
            return this.toArrayLike(s, t, e)
          }),
        (n.prototype.toArray = function (t, e) {
          return this.toArrayLike(Array, t, e)
        }),
        (n.prototype.toArrayLike = function (t, e, r) {
          this._strip()
          var n = this.byteLength(),
            s = r || Math.max(1, n)
          i(n <= s, 'byte array longer than desired length'),
            i(s > 0, 'Requested array length <= 0')
          var a = (function (t, e) {
            return t.allocUnsafe ? t.allocUnsafe(e) : new t(e)
          })(t, s)
          return this['_toArrayLike' + ('le' === e ? 'LE' : 'BE')](a, n), a
        }),
        (n.prototype._toArrayLikeLE = function (t, e) {
          for (var i = 0, r = 0, n = 0, s = 0; n < this.length; n++) {
            var a = (this.words[n] << s) | r
            ;(t[i++] = 255 & a),
              i < t.length && (t[i++] = (a >> 8) & 255),
              i < t.length && (t[i++] = (a >> 16) & 255),
              6 === s
                ? (i < t.length && (t[i++] = (a >> 24) & 255), (r = 0), (s = 0))
                : ((r = a >>> 24), (s += 2))
          }
          if (i < t.length) for (t[i++] = r; i < t.length; ) t[i++] = 0
        }),
        (n.prototype._toArrayLikeBE = function (t, e) {
          for (
            var i = t.length - 1, r = 0, n = 0, s = 0;
            n < this.length;
            n++
          ) {
            var a = (this.words[n] << s) | r
            ;(t[i--] = 255 & a),
              i >= 0 && (t[i--] = (a >> 8) & 255),
              i >= 0 && (t[i--] = (a >> 16) & 255),
              6 === s
                ? (i >= 0 && (t[i--] = (a >> 24) & 255), (r = 0), (s = 0))
                : ((r = a >>> 24), (s += 2))
          }
          if (i >= 0) for (t[i--] = r; i >= 0; ) t[i--] = 0
        }),
        (n.prototype._countBits = Math.clz32
          ? function (t) {
              return 32 - Math.clz32(t)
            }
          : function (t) {
              var e = t,
                i = 0
              return (
                e >= 4096 && ((i += 13), (e >>>= 13)),
                e >= 64 && ((i += 7), (e >>>= 7)),
                e >= 8 && ((i += 4), (e >>>= 4)),
                e >= 2 && ((i += 2), (e >>>= 2)),
                i + e
              )
            }),
        (n.prototype._zeroBits = function (t) {
          if (0 === t) return 26
          var e = t,
            i = 0
          return (
            0 == (8191 & e) && ((i += 13), (e >>>= 13)),
            0 == (127 & e) && ((i += 7), (e >>>= 7)),
            0 == (15 & e) && ((i += 4), (e >>>= 4)),
            0 == (3 & e) && ((i += 2), (e >>>= 2)),
            0 == (1 & e) && i++,
            i
          )
        }),
        (n.prototype.bitLength = function () {
          var t = this._countBits(this.words[this.length - 1])
          return 26 * (this.length - 1) + t
        }),
        (n.prototype.zeroBits = function () {
          if (this.isZero()) return 0
          for (var t = 0, e = 0; e < this.length; e++) {
            var i = this._zeroBits(this.words[e])
            if (((t += i), 26 !== i)) break
          }
          return t
        }),
        (n.prototype.byteLength = function () {
          return Math.ceil(this.bitLength() / 8)
        }),
        (n.prototype.toTwos = function (t) {
          return 0 !== this.negative
            ? this.abs().inotn(t).iaddn(1)
            : this.clone()
        }),
        (n.prototype.fromTwos = function (t) {
          return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
        }),
        (n.prototype.isNeg = function () {
          return 0 !== this.negative
        }),
        (n.prototype.neg = function () {
          return this.clone().ineg()
        }),
        (n.prototype.ineg = function () {
          return this.isZero() || (this.negative ^= 1), this
        }),
        (n.prototype.iuor = function (t) {
          for (; this.length < t.length; ) this.words[this.length++] = 0
          for (var e = 0; e < t.length; e++)
            this.words[e] = this.words[e] | t.words[e]
          return this._strip()
        }),
        (n.prototype.ior = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuor(t)
        }),
        (n.prototype.or = function (t) {
          return this.length > t.length
            ? this.clone().ior(t)
            : t.clone().ior(this)
        }),
        (n.prototype.uor = function (t) {
          return this.length > t.length
            ? this.clone().iuor(t)
            : t.clone().iuor(this)
        }),
        (n.prototype.iuand = function (t) {
          var e
          e = this.length > t.length ? t : this
          for (var i = 0; i < e.length; i++)
            this.words[i] = this.words[i] & t.words[i]
          return (this.length = e.length), this._strip()
        }),
        (n.prototype.iand = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuand(t)
        }),
        (n.prototype.and = function (t) {
          return this.length > t.length
            ? this.clone().iand(t)
            : t.clone().iand(this)
        }),
        (n.prototype.uand = function (t) {
          return this.length > t.length
            ? this.clone().iuand(t)
            : t.clone().iuand(this)
        }),
        (n.prototype.iuxor = function (t) {
          var e, i
          this.length > t.length ? ((e = this), (i = t)) : ((e = t), (i = this))
          for (var r = 0; r < i.length; r++)
            this.words[r] = e.words[r] ^ i.words[r]
          if (this !== e) for (; r < e.length; r++) this.words[r] = e.words[r]
          return (this.length = e.length), this._strip()
        }),
        (n.prototype.ixor = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuxor(t)
        }),
        (n.prototype.xor = function (t) {
          return this.length > t.length
            ? this.clone().ixor(t)
            : t.clone().ixor(this)
        }),
        (n.prototype.uxor = function (t) {
          return this.length > t.length
            ? this.clone().iuxor(t)
            : t.clone().iuxor(this)
        }),
        (n.prototype.inotn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = 0 | Math.ceil(t / 26),
            r = t % 26
          this._expand(e), r > 0 && e--
          for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n]
          return (
            r > 0 && (this.words[n] = ~this.words[n] & (67108863 >> (26 - r))),
            this._strip()
          )
        }),
        (n.prototype.notn = function (t) {
          return this.clone().inotn(t)
        }),
        (n.prototype.setn = function (t, e) {
          i('number' == typeof t && t >= 0)
          var r = (t / 26) | 0,
            n = t % 26
          return (
            this._expand(r + 1),
            (this.words[r] = e
              ? this.words[r] | (1 << n)
              : this.words[r] & ~(1 << n)),
            this._strip()
          )
        }),
        (n.prototype.iadd = function (t) {
          var e, i, r
          if (0 !== this.negative && 0 === t.negative)
            return (
              (this.negative = 0),
              (e = this.isub(t)),
              (this.negative ^= 1),
              this._normSign()
            )
          if (0 === this.negative && 0 !== t.negative)
            return (
              (t.negative = 0),
              (e = this.isub(t)),
              (t.negative = 1),
              e._normSign()
            )
          this.length > t.length ? ((i = this), (r = t)) : ((i = t), (r = this))
          for (var n = 0, s = 0; s < r.length; s++)
            (this.words[s] =
              67108863 & (e = (0 | i.words[s]) + (0 | r.words[s]) + n)),
              (n = e >>> 26)
          for (; 0 !== n && s < i.length; s++)
            (this.words[s] = 67108863 & (e = (0 | i.words[s]) + n)),
              (n = e >>> 26)
          if (((this.length = i.length), 0 !== n))
            (this.words[this.length] = n), this.length++
          else if (i !== this)
            for (; s < i.length; s++) this.words[s] = i.words[s]
          return this
        }),
        (n.prototype.add = function (t) {
          var e
          return 0 !== t.negative && 0 === this.negative
            ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
            : 0 === t.negative && 0 !== this.negative
            ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
            : this.length > t.length
            ? this.clone().iadd(t)
            : t.clone().iadd(this)
        }),
        (n.prototype.isub = function (t) {
          if (0 !== t.negative) {
            t.negative = 0
            var e = this.iadd(t)
            return (t.negative = 1), e._normSign()
          }
          if (0 !== this.negative)
            return (
              (this.negative = 0),
              this.iadd(t),
              (this.negative = 1),
              this._normSign()
            )
          var i,
            r,
            n = this.cmp(t)
          if (0 === n)
            return (
              (this.negative = 0), (this.length = 1), (this.words[0] = 0), this
            )
          n > 0 ? ((i = this), (r = t)) : ((i = t), (r = this))
          for (var s = 0, a = 0; a < r.length; a++)
            (s = (e = (0 | i.words[a]) - (0 | r.words[a]) + s) >> 26),
              (this.words[a] = 67108863 & e)
          for (; 0 !== s && a < i.length; a++)
            (s = (e = (0 | i.words[a]) + s) >> 26),
              (this.words[a] = 67108863 & e)
          if (0 === s && a < i.length && i !== this)
            for (; a < i.length; a++) this.words[a] = i.words[a]
          return (
            (this.length = Math.max(this.length, a)),
            i !== this && (this.negative = 1),
            this._strip()
          )
        }),
        (n.prototype.sub = function (t) {
          return this.clone().isub(t)
        })
      var g = function (t, e, i) {
        var r,
          n,
          s,
          a = t.words,
          o = e.words,
          u = i.words,
          h = 0,
          d = 0 | a[0],
          l = 8191 & d,
          f = d >>> 13,
          c = 0 | a[1],
          p = 8191 & c,
          m = c >>> 13,
          g = 0 | a[2],
          y = 8191 & g,
          b = g >>> 13,
          w = 0 | a[3],
          v = 8191 & w,
          M = w >>> 13,
          A = 0 | a[4],
          _ = 8191 & A,
          S = A >>> 13,
          T = 0 | a[5],
          x = 8191 & T,
          E = T >>> 13,
          R = 0 | a[6],
          k = 8191 & R,
          I = R >>> 13,
          B = 0 | a[7],
          O = 8191 & B,
          P = B >>> 13,
          C = 0 | a[8],
          N = 8191 & C,
          L = C >>> 13,
          D = 0 | a[9],
          F = 8191 & D,
          U = D >>> 13,
          q = 0 | o[0],
          j = 8191 & q,
          z = q >>> 13,
          W = 0 | o[1],
          $ = 8191 & W,
          H = W >>> 13,
          G = 0 | o[2],
          Z = 8191 & G,
          K = G >>> 13,
          V = 0 | o[3],
          J = 8191 & V,
          X = V >>> 13,
          Y = 0 | o[4],
          Q = 8191 & Y,
          tt = Y >>> 13,
          et = 0 | o[5],
          it = 8191 & et,
          rt = et >>> 13,
          nt = 0 | o[6],
          st = 8191 & nt,
          at = nt >>> 13,
          ot = 0 | o[7],
          ut = 8191 & ot,
          ht = ot >>> 13,
          dt = 0 | o[8],
          lt = 8191 & dt,
          ft = dt >>> 13,
          ct = 0 | o[9],
          pt = 8191 & ct,
          mt = ct >>> 13
        ;(i.negative = t.negative ^ e.negative), (i.length = 19)
        var gt =
          (((h + (r = Math.imul(l, j))) | 0) +
            ((8191 & (n = ((n = Math.imul(l, z)) + Math.imul(f, j)) | 0)) <<
              13)) |
          0
        ;(h = ((((s = Math.imul(f, z)) + (n >>> 13)) | 0) + (gt >>> 26)) | 0),
          (gt &= 67108863),
          (r = Math.imul(p, j)),
          (n = ((n = Math.imul(p, z)) + Math.imul(m, j)) | 0),
          (s = Math.imul(m, z))
        var yt =
          (((h + (r = (r + Math.imul(l, $)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, H)) | 0) + Math.imul(f, $)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, H)) | 0) + (n >>> 13)) | 0) + (yt >>> 26)) |
          0),
          (yt &= 67108863),
          (r = Math.imul(y, j)),
          (n = ((n = Math.imul(y, z)) + Math.imul(b, j)) | 0),
          (s = Math.imul(b, z)),
          (r = (r + Math.imul(p, $)) | 0),
          (n = ((n = (n + Math.imul(p, H)) | 0) + Math.imul(m, $)) | 0),
          (s = (s + Math.imul(m, H)) | 0)
        var bt =
          (((h + (r = (r + Math.imul(l, Z)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, K)) | 0) + Math.imul(f, Z)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, K)) | 0) + (n >>> 13)) | 0) + (bt >>> 26)) |
          0),
          (bt &= 67108863),
          (r = Math.imul(v, j)),
          (n = ((n = Math.imul(v, z)) + Math.imul(M, j)) | 0),
          (s = Math.imul(M, z)),
          (r = (r + Math.imul(y, $)) | 0),
          (n = ((n = (n + Math.imul(y, H)) | 0) + Math.imul(b, $)) | 0),
          (s = (s + Math.imul(b, H)) | 0),
          (r = (r + Math.imul(p, Z)) | 0),
          (n = ((n = (n + Math.imul(p, K)) | 0) + Math.imul(m, Z)) | 0),
          (s = (s + Math.imul(m, K)) | 0)
        var wt =
          (((h + (r = (r + Math.imul(l, J)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, X)) | 0) + Math.imul(f, J)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, X)) | 0) + (n >>> 13)) | 0) + (wt >>> 26)) |
          0),
          (wt &= 67108863),
          (r = Math.imul(_, j)),
          (n = ((n = Math.imul(_, z)) + Math.imul(S, j)) | 0),
          (s = Math.imul(S, z)),
          (r = (r + Math.imul(v, $)) | 0),
          (n = ((n = (n + Math.imul(v, H)) | 0) + Math.imul(M, $)) | 0),
          (s = (s + Math.imul(M, H)) | 0),
          (r = (r + Math.imul(y, Z)) | 0),
          (n = ((n = (n + Math.imul(y, K)) | 0) + Math.imul(b, Z)) | 0),
          (s = (s + Math.imul(b, K)) | 0),
          (r = (r + Math.imul(p, J)) | 0),
          (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, J)) | 0),
          (s = (s + Math.imul(m, X)) | 0)
        var vt =
          (((h + (r = (r + Math.imul(l, Q)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, tt)) | 0) + Math.imul(f, Q)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, tt)) | 0) + (n >>> 13)) | 0) +
            (vt >>> 26)) |
          0),
          (vt &= 67108863),
          (r = Math.imul(x, j)),
          (n = ((n = Math.imul(x, z)) + Math.imul(E, j)) | 0),
          (s = Math.imul(E, z)),
          (r = (r + Math.imul(_, $)) | 0),
          (n = ((n = (n + Math.imul(_, H)) | 0) + Math.imul(S, $)) | 0),
          (s = (s + Math.imul(S, H)) | 0),
          (r = (r + Math.imul(v, Z)) | 0),
          (n = ((n = (n + Math.imul(v, K)) | 0) + Math.imul(M, Z)) | 0),
          (s = (s + Math.imul(M, K)) | 0),
          (r = (r + Math.imul(y, J)) | 0),
          (n = ((n = (n + Math.imul(y, X)) | 0) + Math.imul(b, J)) | 0),
          (s = (s + Math.imul(b, X)) | 0),
          (r = (r + Math.imul(p, Q)) | 0),
          (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
          (s = (s + Math.imul(m, tt)) | 0)
        var Mt =
          (((h + (r = (r + Math.imul(l, it)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, rt)) | 0) + Math.imul(f, it)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, rt)) | 0) + (n >>> 13)) | 0) +
            (Mt >>> 26)) |
          0),
          (Mt &= 67108863),
          (r = Math.imul(k, j)),
          (n = ((n = Math.imul(k, z)) + Math.imul(I, j)) | 0),
          (s = Math.imul(I, z)),
          (r = (r + Math.imul(x, $)) | 0),
          (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(E, $)) | 0),
          (s = (s + Math.imul(E, H)) | 0),
          (r = (r + Math.imul(_, Z)) | 0),
          (n = ((n = (n + Math.imul(_, K)) | 0) + Math.imul(S, Z)) | 0),
          (s = (s + Math.imul(S, K)) | 0),
          (r = (r + Math.imul(v, J)) | 0),
          (n = ((n = (n + Math.imul(v, X)) | 0) + Math.imul(M, J)) | 0),
          (s = (s + Math.imul(M, X)) | 0),
          (r = (r + Math.imul(y, Q)) | 0),
          (n = ((n = (n + Math.imul(y, tt)) | 0) + Math.imul(b, Q)) | 0),
          (s = (s + Math.imul(b, tt)) | 0),
          (r = (r + Math.imul(p, it)) | 0),
          (n = ((n = (n + Math.imul(p, rt)) | 0) + Math.imul(m, it)) | 0),
          (s = (s + Math.imul(m, rt)) | 0)
        var At =
          (((h + (r = (r + Math.imul(l, st)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, at)) | 0) + Math.imul(f, st)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, at)) | 0) + (n >>> 13)) | 0) +
            (At >>> 26)) |
          0),
          (At &= 67108863),
          (r = Math.imul(O, j)),
          (n = ((n = Math.imul(O, z)) + Math.imul(P, j)) | 0),
          (s = Math.imul(P, z)),
          (r = (r + Math.imul(k, $)) | 0),
          (n = ((n = (n + Math.imul(k, H)) | 0) + Math.imul(I, $)) | 0),
          (s = (s + Math.imul(I, H)) | 0),
          (r = (r + Math.imul(x, Z)) | 0),
          (n = ((n = (n + Math.imul(x, K)) | 0) + Math.imul(E, Z)) | 0),
          (s = (s + Math.imul(E, K)) | 0),
          (r = (r + Math.imul(_, J)) | 0),
          (n = ((n = (n + Math.imul(_, X)) | 0) + Math.imul(S, J)) | 0),
          (s = (s + Math.imul(S, X)) | 0),
          (r = (r + Math.imul(v, Q)) | 0),
          (n = ((n = (n + Math.imul(v, tt)) | 0) + Math.imul(M, Q)) | 0),
          (s = (s + Math.imul(M, tt)) | 0),
          (r = (r + Math.imul(y, it)) | 0),
          (n = ((n = (n + Math.imul(y, rt)) | 0) + Math.imul(b, it)) | 0),
          (s = (s + Math.imul(b, rt)) | 0),
          (r = (r + Math.imul(p, st)) | 0),
          (n = ((n = (n + Math.imul(p, at)) | 0) + Math.imul(m, st)) | 0),
          (s = (s + Math.imul(m, at)) | 0)
        var _t =
          (((h + (r = (r + Math.imul(l, ut)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, ht)) | 0) + Math.imul(f, ut)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, ht)) | 0) + (n >>> 13)) | 0) +
            (_t >>> 26)) |
          0),
          (_t &= 67108863),
          (r = Math.imul(N, j)),
          (n = ((n = Math.imul(N, z)) + Math.imul(L, j)) | 0),
          (s = Math.imul(L, z)),
          (r = (r + Math.imul(O, $)) | 0),
          (n = ((n = (n + Math.imul(O, H)) | 0) + Math.imul(P, $)) | 0),
          (s = (s + Math.imul(P, H)) | 0),
          (r = (r + Math.imul(k, Z)) | 0),
          (n = ((n = (n + Math.imul(k, K)) | 0) + Math.imul(I, Z)) | 0),
          (s = (s + Math.imul(I, K)) | 0),
          (r = (r + Math.imul(x, J)) | 0),
          (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(E, J)) | 0),
          (s = (s + Math.imul(E, X)) | 0),
          (r = (r + Math.imul(_, Q)) | 0),
          (n = ((n = (n + Math.imul(_, tt)) | 0) + Math.imul(S, Q)) | 0),
          (s = (s + Math.imul(S, tt)) | 0),
          (r = (r + Math.imul(v, it)) | 0),
          (n = ((n = (n + Math.imul(v, rt)) | 0) + Math.imul(M, it)) | 0),
          (s = (s + Math.imul(M, rt)) | 0),
          (r = (r + Math.imul(y, st)) | 0),
          (n = ((n = (n + Math.imul(y, at)) | 0) + Math.imul(b, st)) | 0),
          (s = (s + Math.imul(b, at)) | 0),
          (r = (r + Math.imul(p, ut)) | 0),
          (n = ((n = (n + Math.imul(p, ht)) | 0) + Math.imul(m, ut)) | 0),
          (s = (s + Math.imul(m, ht)) | 0)
        var St =
          (((h + (r = (r + Math.imul(l, lt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, ft)) | 0) + Math.imul(f, lt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, ft)) | 0) + (n >>> 13)) | 0) +
            (St >>> 26)) |
          0),
          (St &= 67108863),
          (r = Math.imul(F, j)),
          (n = ((n = Math.imul(F, z)) + Math.imul(U, j)) | 0),
          (s = Math.imul(U, z)),
          (r = (r + Math.imul(N, $)) | 0),
          (n = ((n = (n + Math.imul(N, H)) | 0) + Math.imul(L, $)) | 0),
          (s = (s + Math.imul(L, H)) | 0),
          (r = (r + Math.imul(O, Z)) | 0),
          (n = ((n = (n + Math.imul(O, K)) | 0) + Math.imul(P, Z)) | 0),
          (s = (s + Math.imul(P, K)) | 0),
          (r = (r + Math.imul(k, J)) | 0),
          (n = ((n = (n + Math.imul(k, X)) | 0) + Math.imul(I, J)) | 0),
          (s = (s + Math.imul(I, X)) | 0),
          (r = (r + Math.imul(x, Q)) | 0),
          (n = ((n = (n + Math.imul(x, tt)) | 0) + Math.imul(E, Q)) | 0),
          (s = (s + Math.imul(E, tt)) | 0),
          (r = (r + Math.imul(_, it)) | 0),
          (n = ((n = (n + Math.imul(_, rt)) | 0) + Math.imul(S, it)) | 0),
          (s = (s + Math.imul(S, rt)) | 0),
          (r = (r + Math.imul(v, st)) | 0),
          (n = ((n = (n + Math.imul(v, at)) | 0) + Math.imul(M, st)) | 0),
          (s = (s + Math.imul(M, at)) | 0),
          (r = (r + Math.imul(y, ut)) | 0),
          (n = ((n = (n + Math.imul(y, ht)) | 0) + Math.imul(b, ut)) | 0),
          (s = (s + Math.imul(b, ht)) | 0),
          (r = (r + Math.imul(p, lt)) | 0),
          (n = ((n = (n + Math.imul(p, ft)) | 0) + Math.imul(m, lt)) | 0),
          (s = (s + Math.imul(m, ft)) | 0)
        var Tt =
          (((h + (r = (r + Math.imul(l, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, mt)) | 0) + Math.imul(f, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, mt)) | 0) + (n >>> 13)) | 0) +
            (Tt >>> 26)) |
          0),
          (Tt &= 67108863),
          (r = Math.imul(F, $)),
          (n = ((n = Math.imul(F, H)) + Math.imul(U, $)) | 0),
          (s = Math.imul(U, H)),
          (r = (r + Math.imul(N, Z)) | 0),
          (n = ((n = (n + Math.imul(N, K)) | 0) + Math.imul(L, Z)) | 0),
          (s = (s + Math.imul(L, K)) | 0),
          (r = (r + Math.imul(O, J)) | 0),
          (n = ((n = (n + Math.imul(O, X)) | 0) + Math.imul(P, J)) | 0),
          (s = (s + Math.imul(P, X)) | 0),
          (r = (r + Math.imul(k, Q)) | 0),
          (n = ((n = (n + Math.imul(k, tt)) | 0) + Math.imul(I, Q)) | 0),
          (s = (s + Math.imul(I, tt)) | 0),
          (r = (r + Math.imul(x, it)) | 0),
          (n = ((n = (n + Math.imul(x, rt)) | 0) + Math.imul(E, it)) | 0),
          (s = (s + Math.imul(E, rt)) | 0),
          (r = (r + Math.imul(_, st)) | 0),
          (n = ((n = (n + Math.imul(_, at)) | 0) + Math.imul(S, st)) | 0),
          (s = (s + Math.imul(S, at)) | 0),
          (r = (r + Math.imul(v, ut)) | 0),
          (n = ((n = (n + Math.imul(v, ht)) | 0) + Math.imul(M, ut)) | 0),
          (s = (s + Math.imul(M, ht)) | 0),
          (r = (r + Math.imul(y, lt)) | 0),
          (n = ((n = (n + Math.imul(y, ft)) | 0) + Math.imul(b, lt)) | 0),
          (s = (s + Math.imul(b, ft)) | 0)
        var xt =
          (((h + (r = (r + Math.imul(p, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(m, mt)) | 0) + (n >>> 13)) | 0) +
            (xt >>> 26)) |
          0),
          (xt &= 67108863),
          (r = Math.imul(F, Z)),
          (n = ((n = Math.imul(F, K)) + Math.imul(U, Z)) | 0),
          (s = Math.imul(U, K)),
          (r = (r + Math.imul(N, J)) | 0),
          (n = ((n = (n + Math.imul(N, X)) | 0) + Math.imul(L, J)) | 0),
          (s = (s + Math.imul(L, X)) | 0),
          (r = (r + Math.imul(O, Q)) | 0),
          (n = ((n = (n + Math.imul(O, tt)) | 0) + Math.imul(P, Q)) | 0),
          (s = (s + Math.imul(P, tt)) | 0),
          (r = (r + Math.imul(k, it)) | 0),
          (n = ((n = (n + Math.imul(k, rt)) | 0) + Math.imul(I, it)) | 0),
          (s = (s + Math.imul(I, rt)) | 0),
          (r = (r + Math.imul(x, st)) | 0),
          (n = ((n = (n + Math.imul(x, at)) | 0) + Math.imul(E, st)) | 0),
          (s = (s + Math.imul(E, at)) | 0),
          (r = (r + Math.imul(_, ut)) | 0),
          (n = ((n = (n + Math.imul(_, ht)) | 0) + Math.imul(S, ut)) | 0),
          (s = (s + Math.imul(S, ht)) | 0),
          (r = (r + Math.imul(v, lt)) | 0),
          (n = ((n = (n + Math.imul(v, ft)) | 0) + Math.imul(M, lt)) | 0),
          (s = (s + Math.imul(M, ft)) | 0)
        var Et =
          (((h + (r = (r + Math.imul(y, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(y, mt)) | 0) + Math.imul(b, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(b, mt)) | 0) + (n >>> 13)) | 0) +
            (Et >>> 26)) |
          0),
          (Et &= 67108863),
          (r = Math.imul(F, J)),
          (n = ((n = Math.imul(F, X)) + Math.imul(U, J)) | 0),
          (s = Math.imul(U, X)),
          (r = (r + Math.imul(N, Q)) | 0),
          (n = ((n = (n + Math.imul(N, tt)) | 0) + Math.imul(L, Q)) | 0),
          (s = (s + Math.imul(L, tt)) | 0),
          (r = (r + Math.imul(O, it)) | 0),
          (n = ((n = (n + Math.imul(O, rt)) | 0) + Math.imul(P, it)) | 0),
          (s = (s + Math.imul(P, rt)) | 0),
          (r = (r + Math.imul(k, st)) | 0),
          (n = ((n = (n + Math.imul(k, at)) | 0) + Math.imul(I, st)) | 0),
          (s = (s + Math.imul(I, at)) | 0),
          (r = (r + Math.imul(x, ut)) | 0),
          (n = ((n = (n + Math.imul(x, ht)) | 0) + Math.imul(E, ut)) | 0),
          (s = (s + Math.imul(E, ht)) | 0),
          (r = (r + Math.imul(_, lt)) | 0),
          (n = ((n = (n + Math.imul(_, ft)) | 0) + Math.imul(S, lt)) | 0),
          (s = (s + Math.imul(S, ft)) | 0)
        var Rt =
          (((h + (r = (r + Math.imul(v, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(v, mt)) | 0) + Math.imul(M, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(M, mt)) | 0) + (n >>> 13)) | 0) +
            (Rt >>> 26)) |
          0),
          (Rt &= 67108863),
          (r = Math.imul(F, Q)),
          (n = ((n = Math.imul(F, tt)) + Math.imul(U, Q)) | 0),
          (s = Math.imul(U, tt)),
          (r = (r + Math.imul(N, it)) | 0),
          (n = ((n = (n + Math.imul(N, rt)) | 0) + Math.imul(L, it)) | 0),
          (s = (s + Math.imul(L, rt)) | 0),
          (r = (r + Math.imul(O, st)) | 0),
          (n = ((n = (n + Math.imul(O, at)) | 0) + Math.imul(P, st)) | 0),
          (s = (s + Math.imul(P, at)) | 0),
          (r = (r + Math.imul(k, ut)) | 0),
          (n = ((n = (n + Math.imul(k, ht)) | 0) + Math.imul(I, ut)) | 0),
          (s = (s + Math.imul(I, ht)) | 0),
          (r = (r + Math.imul(x, lt)) | 0),
          (n = ((n = (n + Math.imul(x, ft)) | 0) + Math.imul(E, lt)) | 0),
          (s = (s + Math.imul(E, ft)) | 0)
        var kt =
          (((h + (r = (r + Math.imul(_, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(_, mt)) | 0) + Math.imul(S, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(S, mt)) | 0) + (n >>> 13)) | 0) +
            (kt >>> 26)) |
          0),
          (kt &= 67108863),
          (r = Math.imul(F, it)),
          (n = ((n = Math.imul(F, rt)) + Math.imul(U, it)) | 0),
          (s = Math.imul(U, rt)),
          (r = (r + Math.imul(N, st)) | 0),
          (n = ((n = (n + Math.imul(N, at)) | 0) + Math.imul(L, st)) | 0),
          (s = (s + Math.imul(L, at)) | 0),
          (r = (r + Math.imul(O, ut)) | 0),
          (n = ((n = (n + Math.imul(O, ht)) | 0) + Math.imul(P, ut)) | 0),
          (s = (s + Math.imul(P, ht)) | 0),
          (r = (r + Math.imul(k, lt)) | 0),
          (n = ((n = (n + Math.imul(k, ft)) | 0) + Math.imul(I, lt)) | 0),
          (s = (s + Math.imul(I, ft)) | 0)
        var It =
          (((h + (r = (r + Math.imul(x, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(x, mt)) | 0) + Math.imul(E, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(E, mt)) | 0) + (n >>> 13)) | 0) +
            (It >>> 26)) |
          0),
          (It &= 67108863),
          (r = Math.imul(F, st)),
          (n = ((n = Math.imul(F, at)) + Math.imul(U, st)) | 0),
          (s = Math.imul(U, at)),
          (r = (r + Math.imul(N, ut)) | 0),
          (n = ((n = (n + Math.imul(N, ht)) | 0) + Math.imul(L, ut)) | 0),
          (s = (s + Math.imul(L, ht)) | 0),
          (r = (r + Math.imul(O, lt)) | 0),
          (n = ((n = (n + Math.imul(O, ft)) | 0) + Math.imul(P, lt)) | 0),
          (s = (s + Math.imul(P, ft)) | 0)
        var Bt =
          (((h + (r = (r + Math.imul(k, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(k, mt)) | 0) + Math.imul(I, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(I, mt)) | 0) + (n >>> 13)) | 0) +
            (Bt >>> 26)) |
          0),
          (Bt &= 67108863),
          (r = Math.imul(F, ut)),
          (n = ((n = Math.imul(F, ht)) + Math.imul(U, ut)) | 0),
          (s = Math.imul(U, ht)),
          (r = (r + Math.imul(N, lt)) | 0),
          (n = ((n = (n + Math.imul(N, ft)) | 0) + Math.imul(L, lt)) | 0),
          (s = (s + Math.imul(L, ft)) | 0)
        var Ot =
          (((h + (r = (r + Math.imul(O, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(O, mt)) | 0) + Math.imul(P, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(P, mt)) | 0) + (n >>> 13)) | 0) +
            (Ot >>> 26)) |
          0),
          (Ot &= 67108863),
          (r = Math.imul(F, lt)),
          (n = ((n = Math.imul(F, ft)) + Math.imul(U, lt)) | 0),
          (s = Math.imul(U, ft))
        var Pt =
          (((h + (r = (r + Math.imul(N, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(N, mt)) | 0) + Math.imul(L, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(L, mt)) | 0) + (n >>> 13)) | 0) +
            (Pt >>> 26)) |
          0),
          (Pt &= 67108863)
        var Ct =
          (((h + (r = Math.imul(F, pt))) | 0) +
            ((8191 & (n = ((n = Math.imul(F, mt)) + Math.imul(U, pt)) | 0)) <<
              13)) |
          0
        return (
          (h = ((((s = Math.imul(U, mt)) + (n >>> 13)) | 0) + (Ct >>> 26)) | 0),
          (Ct &= 67108863),
          (u[0] = gt),
          (u[1] = yt),
          (u[2] = bt),
          (u[3] = wt),
          (u[4] = vt),
          (u[5] = Mt),
          (u[6] = At),
          (u[7] = _t),
          (u[8] = St),
          (u[9] = Tt),
          (u[10] = xt),
          (u[11] = Et),
          (u[12] = Rt),
          (u[13] = kt),
          (u[14] = It),
          (u[15] = Bt),
          (u[16] = Ot),
          (u[17] = Pt),
          (u[18] = Ct),
          0 !== h && ((u[19] = h), i.length++),
          i
        )
      }
      function y(t, e, i) {
        ;(i.negative = e.negative ^ t.negative),
          (i.length = t.length + e.length)
        for (var r = 0, n = 0, s = 0; s < i.length - 1; s++) {
          var a = n
          n = 0
          for (
            var o = 67108863 & r,
              u = Math.min(s, e.length - 1),
              h = Math.max(0, s - t.length + 1);
            h <= u;
            h++
          ) {
            var d = (0 | t.words[s - h]) * (0 | e.words[h]),
              l = 67108863 & d
            ;(o = 67108863 & (l = (l + o) | 0)),
              (n +=
                (a =
                  ((a = (a + ((d / 67108864) | 0)) | 0) + (l >>> 26)) | 0) >>>
                26),
              (a &= 67108863)
          }
          ;(i.words[s] = o), (r = a), (a = n)
        }
        return 0 !== r ? (i.words[s] = r) : i.length--, i._strip()
      }
      function b(t, e, i) {
        return y(t, e, i)
      }
      Math.imul || (g = m),
        (n.prototype.mulTo = function (t, e) {
          var i = this.length + t.length
          return 10 === this.length && 10 === t.length
            ? g(this, t, e)
            : i < 63
            ? m(this, t, e)
            : i < 1024
            ? y(this, t, e)
            : b(this, t, e)
        }),
        (n.prototype.mul = function (t) {
          var e = new n(null)
          return (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
        }),
        (n.prototype.mulf = function (t) {
          var e = new n(null)
          return (e.words = new Array(this.length + t.length)), b(this, t, e)
        }),
        (n.prototype.imul = function (t) {
          return this.clone().mulTo(t, this)
        }),
        (n.prototype.imuln = function (t) {
          var e = t < 0
          e && (t = -t), i('number' == typeof t), i(t < 67108864)
          for (var r = 0, n = 0; n < this.length; n++) {
            var s = (0 | this.words[n]) * t,
              a = (67108863 & s) + (67108863 & r)
            ;(r >>= 26),
              (r += (s / 67108864) | 0),
              (r += a >>> 26),
              (this.words[n] = 67108863 & a)
          }
          return (
            0 !== r && ((this.words[n] = r), this.length++),
            e ? this.ineg() : this
          )
        }),
        (n.prototype.muln = function (t) {
          return this.clone().imuln(t)
        }),
        (n.prototype.sqr = function () {
          return this.mul(this)
        }),
        (n.prototype.isqr = function () {
          return this.imul(this.clone())
        }),
        (n.prototype.pow = function (t) {
          var e = (function (t) {
            for (var e = new Array(t.bitLength()), i = 0; i < e.length; i++)
              e[i] = (t.words[(i / 26) | 0] >>> i % 26) & 1
            return e
          })(t)
          if (0 === e.length) return new n(1)
          for (
            var i = this, r = 0;
            r < e.length && 0 === e[r];
            r++, i = i.sqr()
          );
          if (++r < e.length)
            for (var s = i.sqr(); r < e.length; r++, s = s.sqr())
              0 !== e[r] && (i = i.mul(s))
          return i
        }),
        (n.prototype.iushln = function (t) {
          i('number' == typeof t && t >= 0)
          var e,
            r = t % 26,
            n = (t - r) / 26,
            s = (67108863 >>> (26 - r)) << (26 - r)
          if (0 !== r) {
            var a = 0
            for (e = 0; e < this.length; e++) {
              var o = this.words[e] & s
              ;(this.words[e] = (((0 | this.words[e]) - o) << r) | a),
                (a = o >>> (26 - r))
            }
            a && ((this.words[e] = a), this.length++)
          }
          if (0 !== n) {
            for (e = this.length - 1; e >= 0; e--)
              this.words[e + n] = this.words[e]
            for (e = 0; e < n; e++) this.words[e] = 0
            this.length += n
          }
          return this._strip()
        }),
        (n.prototype.ishln = function (t) {
          return i(0 === this.negative), this.iushln(t)
        }),
        (n.prototype.iushrn = function (t, e, r) {
          var n
          i('number' == typeof t && t >= 0), (n = e ? (e - (e % 26)) / 26 : 0)
          var s = t % 26,
            a = Math.min((t - s) / 26, this.length),
            o = 67108863 ^ ((67108863 >>> s) << s),
            u = r
          if (((n -= a), (n = Math.max(0, n)), u)) {
            for (var h = 0; h < a; h++) u.words[h] = this.words[h]
            u.length = a
          }
          if (0 === a);
          else if (this.length > a)
            for (this.length -= a, h = 0; h < this.length; h++)
              this.words[h] = this.words[h + a]
          else (this.words[0] = 0), (this.length = 1)
          var d = 0
          for (h = this.length - 1; h >= 0 && (0 !== d || h >= n); h--) {
            var l = 0 | this.words[h]
            ;(this.words[h] = (d << (26 - s)) | (l >>> s)), (d = l & o)
          }
          return (
            u && 0 !== d && (u.words[u.length++] = d),
            0 === this.length && ((this.words[0] = 0), (this.length = 1)),
            this._strip()
          )
        }),
        (n.prototype.ishrn = function (t, e, r) {
          return i(0 === this.negative), this.iushrn(t, e, r)
        }),
        (n.prototype.shln = function (t) {
          return this.clone().ishln(t)
        }),
        (n.prototype.ushln = function (t) {
          return this.clone().iushln(t)
        }),
        (n.prototype.shrn = function (t) {
          return this.clone().ishrn(t)
        }),
        (n.prototype.ushrn = function (t) {
          return this.clone().iushrn(t)
        }),
        (n.prototype.testn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = t % 26,
            r = (t - e) / 26
          return !(this.length <= r || !(this.words[r] & (1 << e)))
        }),
        (n.prototype.imaskn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = t % 26,
            r = (t - e) / 26
          return (
            i(0 === this.negative, 'imaskn works only with positive numbers'),
            this.length <= r
              ? this
              : (0 !== e && r++,
                (this.length = Math.min(r, this.length)),
                0 !== e &&
                  (this.words[this.length - 1] &=
                    67108863 ^ ((67108863 >>> e) << e)),
                this._strip())
          )
        }),
        (n.prototype.maskn = function (t) {
          return this.clone().imaskn(t)
        }),
        (n.prototype.iaddn = function (t) {
          return (
            i('number' == typeof t),
            i(t < 67108864),
            t < 0
              ? this.isubn(-t)
              : 0 !== this.negative
              ? 1 === this.length && (0 | this.words[0]) <= t
                ? ((this.words[0] = t - (0 | this.words[0])),
                  (this.negative = 0),
                  this)
                : ((this.negative = 0),
                  this.isubn(t),
                  (this.negative = 1),
                  this)
              : this._iaddn(t)
          )
        }),
        (n.prototype._iaddn = function (t) {
          this.words[0] += t
          for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
            (this.words[e] -= 67108864),
              e === this.length - 1
                ? (this.words[e + 1] = 1)
                : this.words[e + 1]++
          return (this.length = Math.max(this.length, e + 1)), this
        }),
        (n.prototype.isubn = function (t) {
          if ((i('number' == typeof t), i(t < 67108864), t < 0))
            return this.iaddn(-t)
          if (0 !== this.negative)
            return (this.negative = 0), this.iaddn(t), (this.negative = 1), this
          if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
            (this.words[0] = -this.words[0]), (this.negative = 1)
          else
            for (var e = 0; e < this.length && this.words[e] < 0; e++)
              (this.words[e] += 67108864), (this.words[e + 1] -= 1)
          return this._strip()
        }),
        (n.prototype.addn = function (t) {
          return this.clone().iaddn(t)
        }),
        (n.prototype.subn = function (t) {
          return this.clone().isubn(t)
        }),
        (n.prototype.iabs = function () {
          return (this.negative = 0), this
        }),
        (n.prototype.abs = function () {
          return this.clone().iabs()
        }),
        (n.prototype._ishlnsubmul = function (t, e, r) {
          var n, s
          this._expand(t.length + r)
          var a = 0
          for (n = 0; n < t.length; n++) {
            s = (0 | this.words[n + r]) + a
            var o = (0 | t.words[n]) * e
            ;(a = ((s -= 67108863 & o) >> 26) - ((o / 67108864) | 0)),
              (this.words[n + r] = 67108863 & s)
          }
          for (; n < this.length - r; n++)
            (a = (s = (0 | this.words[n + r]) + a) >> 26),
              (this.words[n + r] = 67108863 & s)
          if (0 === a) return this._strip()
          for (i(-1 === a), a = 0, n = 0; n < this.length; n++)
            (a = (s = -(0 | this.words[n]) + a) >> 26),
              (this.words[n] = 67108863 & s)
          return (this.negative = 1), this._strip()
        }),
        (n.prototype._wordDiv = function (t, e) {
          var i,
            r = this.clone(),
            s = t,
            a = 0 | s.words[s.length - 1]
          0 != (i = 26 - this._countBits(a)) &&
            ((s = s.ushln(i)), r.iushln(i), (a = 0 | s.words[s.length - 1]))
          var o,
            u = r.length - s.length
          if ('mod' !== e) {
            ;((o = new n(null)).length = u + 1), (o.words = new Array(o.length))
            for (var h = 0; h < o.length; h++) o.words[h] = 0
          }
          var d = r.clone()._ishlnsubmul(s, 1, u)
          0 === d.negative && ((r = d), o && (o.words[u] = 1))
          for (var l = u - 1; l >= 0; l--) {
            var f =
              67108864 * (0 | r.words[s.length + l]) +
              (0 | r.words[s.length + l - 1])
            for (
              f = Math.min((f / a) | 0, 67108863), r._ishlnsubmul(s, f, l);
              0 !== r.negative;

            )
              f--,
                (r.negative = 0),
                r._ishlnsubmul(s, 1, l),
                r.isZero() || (r.negative ^= 1)
            o && (o.words[l] = f)
          }
          return (
            o && o._strip(),
            r._strip(),
            'div' !== e && 0 !== i && r.iushrn(i),
            { div: o || null, mod: r }
          )
        }),
        (n.prototype.divmod = function (t, e, r) {
          return (
            i(!t.isZero()),
            this.isZero()
              ? { div: new n(0), mod: new n(0) }
              : 0 !== this.negative && 0 === t.negative
              ? ((o = this.neg().divmod(t, e)),
                'mod' !== e && (s = o.div.neg()),
                'div' !== e &&
                  ((a = o.mod.neg()), r && 0 !== a.negative && a.iadd(t)),
                { div: s, mod: a })
              : 0 === this.negative && 0 !== t.negative
              ? ((o = this.divmod(t.neg(), e)),
                'mod' !== e && (s = o.div.neg()),
                { div: s, mod: o.mod })
              : 0 != (this.negative & t.negative)
              ? ((o = this.neg().divmod(t.neg(), e)),
                'div' !== e &&
                  ((a = o.mod.neg()), r && 0 !== a.negative && a.isub(t)),
                { div: o.div, mod: a })
              : t.length > this.length || this.cmp(t) < 0
              ? { div: new n(0), mod: this }
              : 1 === t.length
              ? 'div' === e
                ? { div: this.divn(t.words[0]), mod: null }
                : 'mod' === e
                ? { div: null, mod: new n(this.modrn(t.words[0])) }
                : {
                    div: this.divn(t.words[0]),
                    mod: new n(this.modrn(t.words[0]))
                  }
              : this._wordDiv(t, e)
          )
          var s, a, o
        }),
        (n.prototype.div = function (t) {
          return this.divmod(t, 'div', !1).div
        }),
        (n.prototype.mod = function (t) {
          return this.divmod(t, 'mod', !1).mod
        }),
        (n.prototype.umod = function (t) {
          return this.divmod(t, 'mod', !0).mod
        }),
        (n.prototype.divRound = function (t) {
          var e = this.divmod(t)
          if (e.mod.isZero()) return e.div
          var i = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
            r = t.ushrn(1),
            n = t.andln(1),
            s = i.cmp(r)
          return s < 0 || (1 === n && 0 === s)
            ? e.div
            : 0 !== e.div.negative
            ? e.div.isubn(1)
            : e.div.iaddn(1)
        }),
        (n.prototype.modrn = function (t) {
          var e = t < 0
          e && (t = -t), i(t <= 67108863)
          for (var r = (1 << 26) % t, n = 0, s = this.length - 1; s >= 0; s--)
            n = (r * n + (0 | this.words[s])) % t
          return e ? -n : n
        }),
        (n.prototype.modn = function (t) {
          return this.modrn(t)
        }),
        (n.prototype.idivn = function (t) {
          var e = t < 0
          e && (t = -t), i(t <= 67108863)
          for (var r = 0, n = this.length - 1; n >= 0; n--) {
            var s = (0 | this.words[n]) + 67108864 * r
            ;(this.words[n] = (s / t) | 0), (r = s % t)
          }
          return this._strip(), e ? this.ineg() : this
        }),
        (n.prototype.divn = function (t) {
          return this.clone().idivn(t)
        }),
        (n.prototype.egcd = function (t) {
          i(0 === t.negative), i(!t.isZero())
          var e = this,
            r = t.clone()
          e = 0 !== e.negative ? e.umod(t) : e.clone()
          for (
            var s = new n(1), a = new n(0), o = new n(0), u = new n(1), h = 0;
            e.isEven() && r.isEven();

          )
            e.iushrn(1), r.iushrn(1), ++h
          for (var d = r.clone(), l = e.clone(); !e.isZero(); ) {
            for (
              var f = 0, c = 1;
              0 == (e.words[0] & c) && f < 26;
              ++f, c <<= 1
            );
            if (f > 0)
              for (e.iushrn(f); f-- > 0; )
                (s.isOdd() || a.isOdd()) && (s.iadd(d), a.isub(l)),
                  s.iushrn(1),
                  a.iushrn(1)
            for (
              var p = 0, m = 1;
              0 == (r.words[0] & m) && p < 26;
              ++p, m <<= 1
            );
            if (p > 0)
              for (r.iushrn(p); p-- > 0; )
                (o.isOdd() || u.isOdd()) && (o.iadd(d), u.isub(l)),
                  o.iushrn(1),
                  u.iushrn(1)
            e.cmp(r) >= 0
              ? (e.isub(r), s.isub(o), a.isub(u))
              : (r.isub(e), o.isub(s), u.isub(a))
          }
          return { a: o, b: u, gcd: r.iushln(h) }
        }),
        (n.prototype._invmp = function (t) {
          i(0 === t.negative), i(!t.isZero())
          var e = this,
            r = t.clone()
          e = 0 !== e.negative ? e.umod(t) : e.clone()
          for (
            var s, a = new n(1), o = new n(0), u = r.clone();
            e.cmpn(1) > 0 && r.cmpn(1) > 0;

          ) {
            for (
              var h = 0, d = 1;
              0 == (e.words[0] & d) && h < 26;
              ++h, d <<= 1
            );
            if (h > 0)
              for (e.iushrn(h); h-- > 0; ) a.isOdd() && a.iadd(u), a.iushrn(1)
            for (
              var l = 0, f = 1;
              0 == (r.words[0] & f) && l < 26;
              ++l, f <<= 1
            );
            if (l > 0)
              for (r.iushrn(l); l-- > 0; ) o.isOdd() && o.iadd(u), o.iushrn(1)
            e.cmp(r) >= 0 ? (e.isub(r), a.isub(o)) : (r.isub(e), o.isub(a))
          }
          return (s = 0 === e.cmpn(1) ? a : o).cmpn(0) < 0 && s.iadd(t), s
        }),
        (n.prototype.gcd = function (t) {
          if (this.isZero()) return t.abs()
          if (t.isZero()) return this.abs()
          var e = this.clone(),
            i = t.clone()
          ;(e.negative = 0), (i.negative = 0)
          for (var r = 0; e.isEven() && i.isEven(); r++)
            e.iushrn(1), i.iushrn(1)
          for (;;) {
            for (; e.isEven(); ) e.iushrn(1)
            for (; i.isEven(); ) i.iushrn(1)
            var n = e.cmp(i)
            if (n < 0) {
              var s = e
              ;(e = i), (i = s)
            } else if (0 === n || 0 === i.cmpn(1)) break
            e.isub(i)
          }
          return i.iushln(r)
        }),
        (n.prototype.invm = function (t) {
          return this.egcd(t).a.umod(t)
        }),
        (n.prototype.isEven = function () {
          return 0 == (1 & this.words[0])
        }),
        (n.prototype.isOdd = function () {
          return 1 == (1 & this.words[0])
        }),
        (n.prototype.andln = function (t) {
          return this.words[0] & t
        }),
        (n.prototype.bincn = function (t) {
          i('number' == typeof t)
          var e = t % 26,
            r = (t - e) / 26,
            n = 1 << e
          if (this.length <= r)
            return this._expand(r + 1), (this.words[r] |= n), this
          for (var s = n, a = r; 0 !== s && a < this.length; a++) {
            var o = 0 | this.words[a]
            ;(s = (o += s) >>> 26), (this.words[a] = o &= 67108863)
          }
          return 0 !== s && ((this.words[a] = s), this.length++), this
        }),
        (n.prototype.isZero = function () {
          return 1 === this.length && 0 === this.words[0]
        }),
        (n.prototype.cmpn = function (t) {
          var e,
            r = t < 0
          if (0 !== this.negative && !r) return -1
          if (0 === this.negative && r) return 1
          if ((this._strip(), this.length > 1)) e = 1
          else {
            r && (t = -t), i(t <= 67108863, 'Number is too big')
            var n = 0 | this.words[0]
            e = n === t ? 0 : n < t ? -1 : 1
          }
          return 0 !== this.negative ? 0 | -e : e
        }),
        (n.prototype.cmp = function (t) {
          if (0 !== this.negative && 0 === t.negative) return -1
          if (0 === this.negative && 0 !== t.negative) return 1
          var e = this.ucmp(t)
          return 0 !== this.negative ? 0 | -e : e
        }),
        (n.prototype.ucmp = function (t) {
          if (this.length > t.length) return 1
          if (this.length < t.length) return -1
          for (var e = 0, i = this.length - 1; i >= 0; i--) {
            var r = 0 | this.words[i],
              n = 0 | t.words[i]
            if (r !== n) {
              r < n ? (e = -1) : r > n && (e = 1)
              break
            }
          }
          return e
        }),
        (n.prototype.gtn = function (t) {
          return 1 === this.cmpn(t)
        }),
        (n.prototype.gt = function (t) {
          return 1 === this.cmp(t)
        }),
        (n.prototype.gten = function (t) {
          return this.cmpn(t) >= 0
        }),
        (n.prototype.gte = function (t) {
          return this.cmp(t) >= 0
        }),
        (n.prototype.ltn = function (t) {
          return -1 === this.cmpn(t)
        }),
        (n.prototype.lt = function (t) {
          return -1 === this.cmp(t)
        }),
        (n.prototype.lten = function (t) {
          return this.cmpn(t) <= 0
        }),
        (n.prototype.lte = function (t) {
          return this.cmp(t) <= 0
        }),
        (n.prototype.eqn = function (t) {
          return 0 === this.cmpn(t)
        }),
        (n.prototype.eq = function (t) {
          return 0 === this.cmp(t)
        }),
        (n.red = function (t) {
          return new T(t)
        }),
        (n.prototype.toRed = function (t) {
          return (
            i(!this.red, 'Already a number in reduction context'),
            i(0 === this.negative, 'red works only with positives'),
            t.convertTo(this)._forceRed(t)
          )
        }),
        (n.prototype.fromRed = function () {
          return (
            i(this.red, 'fromRed works only with numbers in reduction context'),
            this.red.convertFrom(this)
          )
        }),
        (n.prototype._forceRed = function (t) {
          return (this.red = t), this
        }),
        (n.prototype.forceRed = function (t) {
          return (
            i(!this.red, 'Already a number in reduction context'),
            this._forceRed(t)
          )
        }),
        (n.prototype.redAdd = function (t) {
          return (
            i(this.red, 'redAdd works only with red numbers'),
            this.red.add(this, t)
          )
        }),
        (n.prototype.redIAdd = function (t) {
          return (
            i(this.red, 'redIAdd works only with red numbers'),
            this.red.iadd(this, t)
          )
        }),
        (n.prototype.redSub = function (t) {
          return (
            i(this.red, 'redSub works only with red numbers'),
            this.red.sub(this, t)
          )
        }),
        (n.prototype.redISub = function (t) {
          return (
            i(this.red, 'redISub works only with red numbers'),
            this.red.isub(this, t)
          )
        }),
        (n.prototype.redShl = function (t) {
          return (
            i(this.red, 'redShl works only with red numbers'),
            this.red.shl(this, t)
          )
        }),
        (n.prototype.redMul = function (t) {
          return (
            i(this.red, 'redMul works only with red numbers'),
            this.red._verify2(this, t),
            this.red.mul(this, t)
          )
        }),
        (n.prototype.redIMul = function (t) {
          return (
            i(this.red, 'redMul works only with red numbers'),
            this.red._verify2(this, t),
            this.red.imul(this, t)
          )
        }),
        (n.prototype.redSqr = function () {
          return (
            i(this.red, 'redSqr works only with red numbers'),
            this.red._verify1(this),
            this.red.sqr(this)
          )
        }),
        (n.prototype.redISqr = function () {
          return (
            i(this.red, 'redISqr works only with red numbers'),
            this.red._verify1(this),
            this.red.isqr(this)
          )
        }),
        (n.prototype.redSqrt = function () {
          return (
            i(this.red, 'redSqrt works only with red numbers'),
            this.red._verify1(this),
            this.red.sqrt(this)
          )
        }),
        (n.prototype.redInvm = function () {
          return (
            i(this.red, 'redInvm works only with red numbers'),
            this.red._verify1(this),
            this.red.invm(this)
          )
        }),
        (n.prototype.redNeg = function () {
          return (
            i(this.red, 'redNeg works only with red numbers'),
            this.red._verify1(this),
            this.red.neg(this)
          )
        }),
        (n.prototype.redPow = function (t) {
          return (
            i(this.red && !t.red, 'redPow(normalNum)'),
            this.red._verify1(this),
            this.red.pow(this, t)
          )
        })
      var w = { k256: null, p224: null, p192: null, p25519: null }
      function v(t, e) {
        ;(this.name = t),
          (this.p = new n(e, 16)),
          (this.n = this.p.bitLength()),
          (this.k = new n(1).iushln(this.n).isub(this.p)),
          (this.tmp = this._tmp())
      }
      function M() {
        v.call(
          this,
          'k256',
          'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
        )
      }
      function A() {
        v.call(
          this,
          'p224',
          'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
        )
      }
      function _() {
        v.call(
          this,
          'p192',
          'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
        )
      }
      function S() {
        v.call(
          this,
          '25519',
          '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
        )
      }
      function T(t) {
        if ('string' == typeof t) {
          var e = n._prime(t)
          ;(this.m = e.p), (this.prime = e)
        } else i(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null)
      }
      function x(t) {
        T.call(this, t),
          (this.shift = this.m.bitLength()),
          this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
          (this.r = new n(1).iushln(this.shift)),
          (this.r2 = this.imod(this.r.sqr())),
          (this.rinv = this.r._invmp(this.m)),
          (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
          (this.minv = this.minv.umod(this.r)),
          (this.minv = this.r.sub(this.minv))
      }
      ;(v.prototype._tmp = function () {
        var t = new n(null)
        return (t.words = new Array(Math.ceil(this.n / 13))), t
      }),
        (v.prototype.ireduce = function (t) {
          var e,
            i = t
          do {
            this.split(i, this.tmp),
              (e = (i = (i = this.imulK(i)).iadd(this.tmp)).bitLength())
          } while (e > this.n)
          var r = e < this.n ? -1 : i.ucmp(this.p)
          return (
            0 === r
              ? ((i.words[0] = 0), (i.length = 1))
              : r > 0
              ? i.isub(this.p)
              : void 0 !== i.strip
              ? i.strip()
              : i._strip(),
            i
          )
        }),
        (v.prototype.split = function (t, e) {
          t.iushrn(this.n, 0, e)
        }),
        (v.prototype.imulK = function (t) {
          return t.imul(this.k)
        }),
        r(M, v),
        (M.prototype.split = function (t, e) {
          for (var i = 4194303, r = Math.min(t.length, 9), n = 0; n < r; n++)
            e.words[n] = t.words[n]
          if (((e.length = r), t.length <= 9))
            return (t.words[0] = 0), void (t.length = 1)
          var s = t.words[9]
          for (e.words[e.length++] = s & i, n = 10; n < t.length; n++) {
            var a = 0 | t.words[n]
            ;(t.words[n - 10] = ((a & i) << 4) | (s >>> 22)), (s = a)
          }
          ;(t.words[n - 10] = s >>>= 22),
            (t.length -= 0 === s && t.length > 10 ? 10 : 9)
        }),
        (M.prototype.imulK = function (t) {
          ;(t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2)
          for (var e = 0, i = 0; i < t.length; i++) {
            var r = 0 | t.words[i]
            ;(t.words[i] = 67108863 & (e += 977 * r)),
              (e = 64 * r + ((e / 67108864) | 0))
          }
          return (
            0 === t.words[t.length - 1] &&
              (t.length--, 0 === t.words[t.length - 1] && t.length--),
            t
          )
        }),
        r(A, v),
        r(_, v),
        r(S, v),
        (S.prototype.imulK = function (t) {
          for (var e = 0, i = 0; i < t.length; i++) {
            var r = 19 * (0 | t.words[i]) + e,
              n = 67108863 & r
            ;(r >>>= 26), (t.words[i] = n), (e = r)
          }
          return 0 !== e && (t.words[t.length++] = e), t
        }),
        (n._prime = function (t) {
          if (w[t]) return w[t]
          var e
          if ('k256' === t) e = new M()
          else if ('p224' === t) e = new A()
          else if ('p192' === t) e = new _()
          else {
            if ('p25519' !== t) throw new Error('Unknown prime ' + t)
            e = new S()
          }
          return (w[t] = e), e
        }),
        (T.prototype._verify1 = function (t) {
          i(0 === t.negative, 'red works only with positives'),
            i(t.red, 'red works only with red numbers')
        }),
        (T.prototype._verify2 = function (t, e) {
          i(0 == (t.negative | e.negative), 'red works only with positives'),
            i(t.red && t.red === e.red, 'red works only with red numbers')
        }),
        (T.prototype.imod = function (t) {
          return this.prime
            ? this.prime.ireduce(t)._forceRed(this)
            : (d(t, t.umod(this.m)._forceRed(this)), t)
        }),
        (T.prototype.neg = function (t) {
          return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
        }),
        (T.prototype.add = function (t, e) {
          this._verify2(t, e)
          var i = t.add(e)
          return i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this)
        }),
        (T.prototype.iadd = function (t, e) {
          this._verify2(t, e)
          var i = t.iadd(e)
          return i.cmp(this.m) >= 0 && i.isub(this.m), i
        }),
        (T.prototype.sub = function (t, e) {
          this._verify2(t, e)
          var i = t.sub(e)
          return i.cmpn(0) < 0 && i.iadd(this.m), i._forceRed(this)
        }),
        (T.prototype.isub = function (t, e) {
          this._verify2(t, e)
          var i = t.isub(e)
          return i.cmpn(0) < 0 && i.iadd(this.m), i
        }),
        (T.prototype.shl = function (t, e) {
          return this._verify1(t), this.imod(t.ushln(e))
        }),
        (T.prototype.imul = function (t, e) {
          return this._verify2(t, e), this.imod(t.imul(e))
        }),
        (T.prototype.mul = function (t, e) {
          return this._verify2(t, e), this.imod(t.mul(e))
        }),
        (T.prototype.isqr = function (t) {
          return this.imul(t, t.clone())
        }),
        (T.prototype.sqr = function (t) {
          return this.mul(t, t)
        }),
        (T.prototype.sqrt = function (t) {
          if (t.isZero()) return t.clone()
          var e = this.m.andln(3)
          if ((i(e % 2 == 1), 3 === e)) {
            var r = this.m.add(new n(1)).iushrn(2)
            return this.pow(t, r)
          }
          for (var s = this.m.subn(1), a = 0; !s.isZero() && 0 === s.andln(1); )
            a++, s.iushrn(1)
          i(!s.isZero())
          var o = new n(1).toRed(this),
            u = o.redNeg(),
            h = this.m.subn(1).iushrn(1),
            d = this.m.bitLength()
          for (d = new n(2 * d * d).toRed(this); 0 !== this.pow(d, h).cmp(u); )
            d.redIAdd(u)
          for (
            var l = this.pow(d, s),
              f = this.pow(t, s.addn(1).iushrn(1)),
              c = this.pow(t, s),
              p = a;
            0 !== c.cmp(o);

          ) {
            for (var m = c, g = 0; 0 !== m.cmp(o); g++) m = m.redSqr()
            i(g < p)
            var y = this.pow(l, new n(1).iushln(p - g - 1))
            ;(f = f.redMul(y)), (l = y.redSqr()), (c = c.redMul(l)), (p = g)
          }
          return f
        }),
        (T.prototype.invm = function (t) {
          var e = t._invmp(this.m)
          return 0 !== e.negative
            ? ((e.negative = 0), this.imod(e).redNeg())
            : this.imod(e)
        }),
        (T.prototype.pow = function (t, e) {
          if (e.isZero()) return new n(1).toRed(this)
          if (0 === e.cmpn(1)) return t.clone()
          var i = new Array(16)
          ;(i[0] = new n(1).toRed(this)), (i[1] = t)
          for (var r = 2; r < i.length; r++) i[r] = this.mul(i[r - 1], t)
          var s = i[0],
            a = 0,
            o = 0,
            u = e.bitLength() % 26
          for (0 === u && (u = 26), r = e.length - 1; r >= 0; r--) {
            for (var h = e.words[r], d = u - 1; d >= 0; d--) {
              var l = (h >> d) & 1
              s !== i[0] && (s = this.sqr(s)),
                0 !== l || 0 !== a
                  ? ((a <<= 1),
                    (a |= l),
                    (4 == ++o || (0 === r && 0 === d)) &&
                      ((s = this.mul(s, i[a])), (o = 0), (a = 0)))
                  : (o = 0)
            }
            u = 26
          }
          return s
        }),
        (T.prototype.convertTo = function (t) {
          var e = t.umod(this.m)
          return e === t ? e.clone() : e
        }),
        (T.prototype.convertFrom = function (t) {
          var e = t.clone()
          return (e.red = null), e
        }),
        (n.mont = function (t) {
          return new x(t)
        }),
        r(x, T),
        (x.prototype.convertTo = function (t) {
          return this.imod(t.ushln(this.shift))
        }),
        (x.prototype.convertFrom = function (t) {
          var e = this.imod(t.mul(this.rinv))
          return (e.red = null), e
        }),
        (x.prototype.imul = function (t, e) {
          if (t.isZero() || e.isZero())
            return (t.words[0] = 0), (t.length = 1), t
          var i = t.imul(e),
            r = i
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m),
            n = i.isub(r).iushrn(this.shift),
            s = n
          return (
            n.cmp(this.m) >= 0
              ? (s = n.isub(this.m))
              : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
            s._forceRed(this)
          )
        }),
        (x.prototype.mul = function (t, e) {
          if (t.isZero() || e.isZero()) return new n(0)._forceRed(this)
          var i = t.mul(e),
            r = i
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m),
            s = i.isub(r).iushrn(this.shift),
            a = s
          return (
            s.cmp(this.m) >= 0
              ? (a = s.isub(this.m))
              : s.cmpn(0) < 0 && (a = s.iadd(this.m)),
            a._forceRed(this)
          )
        }),
        (x.prototype.invm = function (t) {
          return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
        })
    })(t, bt)
  }),
  Ct = wt(function (t) {
    !(function (t, e) {
      function i(t, e) {
        if (!t) throw new Error(e || 'Assertion failed')
      }
      function r(t, e) {
        t.super_ = e
        var i = function () {}
        ;(i.prototype = e.prototype),
          (t.prototype = new i()),
          (t.prototype.constructor = t)
      }
      function n(t, e, i) {
        if (n.isBN(t)) return t
        ;(this.negative = 0),
          (this.words = null),
          (this.length = 0),
          (this.red = null),
          null !== t &&
            (('le' !== e && 'be' !== e) || ((i = e), (e = 10)),
            this._init(t || 0, e || 10, i || 'be'))
      }
      var s
      'object' == typeof t ? (t.exports = n) : (e.BN = n),
        (n.BN = n),
        (n.wordSize = 26)
      try {
        s =
          'undefined' != typeof window && void 0 !== window.Buffer
            ? window.Buffer
            : o.Buffer
      } catch (t) {}
      function a(t, e) {
        var r = t.charCodeAt(e)
        return r >= 48 && r <= 57
          ? r - 48
          : r >= 65 && r <= 70
          ? r - 55
          : r >= 97 && r <= 102
          ? r - 87
          : void i(!1, 'Invalid character in ' + t)
      }
      function u(t, e, i) {
        var r = a(t, i)
        return i - 1 >= e && (r |= a(t, i - 1) << 4), r
      }
      function h(t, e, r, n) {
        for (var s = 0, a = 0, o = Math.min(t.length, r), u = e; u < o; u++) {
          var h = t.charCodeAt(u) - 48
          ;(s *= n),
            (a = h >= 49 ? h - 49 + 10 : h >= 17 ? h - 17 + 10 : h),
            i(h >= 0 && a < n, 'Invalid character'),
            (s += a)
        }
        return s
      }
      function d(t, e) {
        ;(t.words = e.words),
          (t.length = e.length),
          (t.negative = e.negative),
          (t.red = e.red)
      }
      if (
        ((n.isBN = function (t) {
          return (
            t instanceof n ||
            (null !== t &&
              'object' == typeof t &&
              t.constructor.wordSize === n.wordSize &&
              Array.isArray(t.words))
          )
        }),
        (n.max = function (t, e) {
          return t.cmp(e) > 0 ? t : e
        }),
        (n.min = function (t, e) {
          return t.cmp(e) < 0 ? t : e
        }),
        (n.prototype._init = function (t, e, r) {
          if ('number' == typeof t) return this._initNumber(t, e, r)
          if ('object' == typeof t) return this._initArray(t, e, r)
          'hex' === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36)
          var n = 0
          '-' === (t = t.toString().replace(/\s+/g, ''))[0] &&
            (n++, (this.negative = 1)),
            n < t.length &&
              (16 === e
                ? this._parseHex(t, n, r)
                : (this._parseBase(t, e, n),
                  'le' === r && this._initArray(this.toArray(), e, r)))
        }),
        (n.prototype._initNumber = function (t, e, r) {
          t < 0 && ((this.negative = 1), (t = -t)),
            t < 67108864
              ? ((this.words = [67108863 & t]), (this.length = 1))
              : t < 4503599627370496
              ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                (this.length = 2))
              : (i(t < 9007199254740992),
                (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                (this.length = 3)),
            'le' === r && this._initArray(this.toArray(), e, r)
        }),
        (n.prototype._initArray = function (t, e, r) {
          if ((i('number' == typeof t.length), t.length <= 0))
            return (this.words = [0]), (this.length = 1), this
          ;(this.length = Math.ceil(t.length / 3)),
            (this.words = new Array(this.length))
          for (var n = 0; n < this.length; n++) this.words[n] = 0
          var s,
            a,
            o = 0
          if ('be' === r)
            for (n = t.length - 1, s = 0; n >= 0; n -= 3)
              (this.words[s] |=
                ((a = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)) << o) &
                67108863),
                (this.words[s + 1] = (a >>> (26 - o)) & 67108863),
                (o += 24) >= 26 && ((o -= 26), s++)
          else if ('le' === r)
            for (n = 0, s = 0; n < t.length; n += 3)
              (this.words[s] |=
                ((a = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) << o) &
                67108863),
                (this.words[s + 1] = (a >>> (26 - o)) & 67108863),
                (o += 24) >= 26 && ((o -= 26), s++)
          return this._strip()
        }),
        (n.prototype._parseHex = function (t, e, i) {
          ;(this.length = Math.ceil((t.length - e) / 6)),
            (this.words = new Array(this.length))
          for (var r = 0; r < this.length; r++) this.words[r] = 0
          var n,
            s = 0,
            a = 0
          if ('be' === i)
            for (r = t.length - 1; r >= e; r -= 2)
              (n = u(t, e, r) << s),
                (this.words[a] |= 67108863 & n),
                s >= 18
                  ? ((s -= 18), (this.words[(a += 1)] |= n >>> 26))
                  : (s += 8)
          else
            for (r = (t.length - e) % 2 == 0 ? e + 1 : e; r < t.length; r += 2)
              (n = u(t, e, r) << s),
                (this.words[a] |= 67108863 & n),
                s >= 18
                  ? ((s -= 18), (this.words[(a += 1)] |= n >>> 26))
                  : (s += 8)
          this._strip()
        }),
        (n.prototype._parseBase = function (t, e, i) {
          ;(this.words = [0]), (this.length = 1)
          for (var r = 0, n = 1; n <= 67108863; n *= e) r++
          r--, (n = (n / e) | 0)
          for (
            var s = t.length - i,
              a = s % r,
              o = Math.min(s, s - a) + i,
              u = 0,
              d = i;
            d < o;
            d += r
          )
            (u = h(t, d, d + r, e)),
              this.imuln(n),
              this.words[0] + u < 67108864
                ? (this.words[0] += u)
                : this._iaddn(u)
          if (0 !== a) {
            var l = 1
            for (u = h(t, d, t.length, e), d = 0; d < a; d++) l *= e
            this.imuln(l),
              this.words[0] + u < 67108864
                ? (this.words[0] += u)
                : this._iaddn(u)
          }
          this._strip()
        }),
        (n.prototype.copy = function (t) {
          t.words = new Array(this.length)
          for (var e = 0; e < this.length; e++) t.words[e] = this.words[e]
          ;(t.length = this.length),
            (t.negative = this.negative),
            (t.red = this.red)
        }),
        (n.prototype._move = function (t) {
          d(t, this)
        }),
        (n.prototype.clone = function () {
          var t = new n(null)
          return this.copy(t), t
        }),
        (n.prototype._expand = function (t) {
          for (; this.length < t; ) this.words[this.length++] = 0
          return this
        }),
        (n.prototype._strip = function () {
          for (; this.length > 1 && 0 === this.words[this.length - 1]; )
            this.length--
          return this._normSign()
        }),
        (n.prototype._normSign = function () {
          return (
            1 === this.length && 0 === this.words[0] && (this.negative = 0),
            this
          )
        }),
        'undefined' != typeof Symbol && 'function' == typeof Symbol.for)
      )
        try {
          n.prototype[Symbol.for('nodejs.util.inspect.custom')] = l
        } catch (t) {
          n.prototype.inspect = l
        }
      else n.prototype.inspect = l
      function l() {
        return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
      }
      var f = [
          '',
          '0',
          '00',
          '000',
          '0000',
          '00000',
          '000000',
          '0000000',
          '00000000',
          '000000000',
          '0000000000',
          '00000000000',
          '000000000000',
          '0000000000000',
          '00000000000000',
          '000000000000000',
          '0000000000000000',
          '00000000000000000',
          '000000000000000000',
          '0000000000000000000',
          '00000000000000000000',
          '000000000000000000000',
          '0000000000000000000000',
          '00000000000000000000000',
          '000000000000000000000000',
          '0000000000000000000000000'
        ],
        c = [
          0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        p = [
          0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
          16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
          11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
          5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
          20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
          60466176
        ]
      function m(t, e, i) {
        i.negative = e.negative ^ t.negative
        var r = (t.length + e.length) | 0
        ;(i.length = r), (r = (r - 1) | 0)
        var n = 0 | t.words[0],
          s = 0 | e.words[0],
          a = n * s,
          o = (a / 67108864) | 0
        i.words[0] = 67108863 & a
        for (var u = 1; u < r; u++) {
          for (
            var h = o >>> 26,
              d = 67108863 & o,
              l = Math.min(u, e.length - 1),
              f = Math.max(0, u - t.length + 1);
            f <= l;
            f++
          )
            (h +=
              ((a = (n = 0 | t.words[(u - f) | 0]) * (s = 0 | e.words[f]) + d) /
                67108864) |
              0),
              (d = 67108863 & a)
          ;(i.words[u] = 0 | d), (o = 0 | h)
        }
        return 0 !== o ? (i.words[u] = 0 | o) : i.length--, i._strip()
      }
      ;(n.prototype.toString = function (t, e) {
        var r
        if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
          r = ''
          for (var n = 0, s = 0, a = 0; a < this.length; a++) {
            var o = this.words[a],
              u = (16777215 & ((o << n) | s)).toString(16)
            ;(r =
              0 != (s = (o >>> (24 - n)) & 16777215) || a !== this.length - 1
                ? f[6 - u.length] + u + r
                : u + r),
              (n += 2) >= 26 && ((n -= 26), a--)
          }
          for (0 !== s && (r = s.toString(16) + r); r.length % e != 0; )
            r = '0' + r
          return 0 !== this.negative && (r = '-' + r), r
        }
        if (t === (0 | t) && t >= 2 && t <= 36) {
          var h = c[t],
            d = p[t]
          r = ''
          var l = this.clone()
          for (l.negative = 0; !l.isZero(); ) {
            var m = l.modrn(d).toString(t)
            r = (l = l.idivn(d)).isZero() ? m + r : f[h - m.length] + m + r
          }
          for (this.isZero() && (r = '0' + r); r.length % e != 0; ) r = '0' + r
          return 0 !== this.negative && (r = '-' + r), r
        }
        i(!1, 'Base should be between 2 and 36')
      }),
        (n.prototype.toNumber = function () {
          var t = this.words[0]
          return (
            2 === this.length
              ? (t += 67108864 * this.words[1])
              : 3 === this.length && 1 === this.words[2]
              ? (t += 4503599627370496 + 67108864 * this.words[1])
              : this.length > 2 &&
                i(!1, 'Number can only safely store up to 53 bits'),
            0 !== this.negative ? -t : t
          )
        }),
        (n.prototype.toJSON = function () {
          return this.toString(16, 2)
        }),
        s &&
          (n.prototype.toBuffer = function (t, e) {
            return this.toArrayLike(s, t, e)
          }),
        (n.prototype.toArray = function (t, e) {
          return this.toArrayLike(Array, t, e)
        }),
        (n.prototype.toArrayLike = function (t, e, r) {
          this._strip()
          var n = this.byteLength(),
            s = r || Math.max(1, n)
          i(n <= s, 'byte array longer than desired length'),
            i(s > 0, 'Requested array length <= 0')
          var a = (function (t, e) {
            return t.allocUnsafe ? t.allocUnsafe(e) : new t(e)
          })(t, s)
          return this['_toArrayLike' + ('le' === e ? 'LE' : 'BE')](a, n), a
        }),
        (n.prototype._toArrayLikeLE = function (t, e) {
          for (var i = 0, r = 0, n = 0, s = 0; n < this.length; n++) {
            var a = (this.words[n] << s) | r
            ;(t[i++] = 255 & a),
              i < t.length && (t[i++] = (a >> 8) & 255),
              i < t.length && (t[i++] = (a >> 16) & 255),
              6 === s
                ? (i < t.length && (t[i++] = (a >> 24) & 255), (r = 0), (s = 0))
                : ((r = a >>> 24), (s += 2))
          }
          if (i < t.length) for (t[i++] = r; i < t.length; ) t[i++] = 0
        }),
        (n.prototype._toArrayLikeBE = function (t, e) {
          for (
            var i = t.length - 1, r = 0, n = 0, s = 0;
            n < this.length;
            n++
          ) {
            var a = (this.words[n] << s) | r
            ;(t[i--] = 255 & a),
              i >= 0 && (t[i--] = (a >> 8) & 255),
              i >= 0 && (t[i--] = (a >> 16) & 255),
              6 === s
                ? (i >= 0 && (t[i--] = (a >> 24) & 255), (r = 0), (s = 0))
                : ((r = a >>> 24), (s += 2))
          }
          if (i >= 0) for (t[i--] = r; i >= 0; ) t[i--] = 0
        }),
        (n.prototype._countBits = Math.clz32
          ? function (t) {
              return 32 - Math.clz32(t)
            }
          : function (t) {
              var e = t,
                i = 0
              return (
                e >= 4096 && ((i += 13), (e >>>= 13)),
                e >= 64 && ((i += 7), (e >>>= 7)),
                e >= 8 && ((i += 4), (e >>>= 4)),
                e >= 2 && ((i += 2), (e >>>= 2)),
                i + e
              )
            }),
        (n.prototype._zeroBits = function (t) {
          if (0 === t) return 26
          var e = t,
            i = 0
          return (
            0 == (8191 & e) && ((i += 13), (e >>>= 13)),
            0 == (127 & e) && ((i += 7), (e >>>= 7)),
            0 == (15 & e) && ((i += 4), (e >>>= 4)),
            0 == (3 & e) && ((i += 2), (e >>>= 2)),
            0 == (1 & e) && i++,
            i
          )
        }),
        (n.prototype.bitLength = function () {
          var t = this._countBits(this.words[this.length - 1])
          return 26 * (this.length - 1) + t
        }),
        (n.prototype.zeroBits = function () {
          if (this.isZero()) return 0
          for (var t = 0, e = 0; e < this.length; e++) {
            var i = this._zeroBits(this.words[e])
            if (((t += i), 26 !== i)) break
          }
          return t
        }),
        (n.prototype.byteLength = function () {
          return Math.ceil(this.bitLength() / 8)
        }),
        (n.prototype.toTwos = function (t) {
          return 0 !== this.negative
            ? this.abs().inotn(t).iaddn(1)
            : this.clone()
        }),
        (n.prototype.fromTwos = function (t) {
          return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
        }),
        (n.prototype.isNeg = function () {
          return 0 !== this.negative
        }),
        (n.prototype.neg = function () {
          return this.clone().ineg()
        }),
        (n.prototype.ineg = function () {
          return this.isZero() || (this.negative ^= 1), this
        }),
        (n.prototype.iuor = function (t) {
          for (; this.length < t.length; ) this.words[this.length++] = 0
          for (var e = 0; e < t.length; e++)
            this.words[e] = this.words[e] | t.words[e]
          return this._strip()
        }),
        (n.prototype.ior = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuor(t)
        }),
        (n.prototype.or = function (t) {
          return this.length > t.length
            ? this.clone().ior(t)
            : t.clone().ior(this)
        }),
        (n.prototype.uor = function (t) {
          return this.length > t.length
            ? this.clone().iuor(t)
            : t.clone().iuor(this)
        }),
        (n.prototype.iuand = function (t) {
          var e
          e = this.length > t.length ? t : this
          for (var i = 0; i < e.length; i++)
            this.words[i] = this.words[i] & t.words[i]
          return (this.length = e.length), this._strip()
        }),
        (n.prototype.iand = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuand(t)
        }),
        (n.prototype.and = function (t) {
          return this.length > t.length
            ? this.clone().iand(t)
            : t.clone().iand(this)
        }),
        (n.prototype.uand = function (t) {
          return this.length > t.length
            ? this.clone().iuand(t)
            : t.clone().iuand(this)
        }),
        (n.prototype.iuxor = function (t) {
          var e, i
          this.length > t.length ? ((e = this), (i = t)) : ((e = t), (i = this))
          for (var r = 0; r < i.length; r++)
            this.words[r] = e.words[r] ^ i.words[r]
          if (this !== e) for (; r < e.length; r++) this.words[r] = e.words[r]
          return (this.length = e.length), this._strip()
        }),
        (n.prototype.ixor = function (t) {
          return i(0 == (this.negative | t.negative)), this.iuxor(t)
        }),
        (n.prototype.xor = function (t) {
          return this.length > t.length
            ? this.clone().ixor(t)
            : t.clone().ixor(this)
        }),
        (n.prototype.uxor = function (t) {
          return this.length > t.length
            ? this.clone().iuxor(t)
            : t.clone().iuxor(this)
        }),
        (n.prototype.inotn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = 0 | Math.ceil(t / 26),
            r = t % 26
          this._expand(e), r > 0 && e--
          for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n]
          return (
            r > 0 && (this.words[n] = ~this.words[n] & (67108863 >> (26 - r))),
            this._strip()
          )
        }),
        (n.prototype.notn = function (t) {
          return this.clone().inotn(t)
        }),
        (n.prototype.setn = function (t, e) {
          i('number' == typeof t && t >= 0)
          var r = (t / 26) | 0,
            n = t % 26
          return (
            this._expand(r + 1),
            (this.words[r] = e
              ? this.words[r] | (1 << n)
              : this.words[r] & ~(1 << n)),
            this._strip()
          )
        }),
        (n.prototype.iadd = function (t) {
          var e, i, r
          if (0 !== this.negative && 0 === t.negative)
            return (
              (this.negative = 0),
              (e = this.isub(t)),
              (this.negative ^= 1),
              this._normSign()
            )
          if (0 === this.negative && 0 !== t.negative)
            return (
              (t.negative = 0),
              (e = this.isub(t)),
              (t.negative = 1),
              e._normSign()
            )
          this.length > t.length ? ((i = this), (r = t)) : ((i = t), (r = this))
          for (var n = 0, s = 0; s < r.length; s++)
            (this.words[s] =
              67108863 & (e = (0 | i.words[s]) + (0 | r.words[s]) + n)),
              (n = e >>> 26)
          for (; 0 !== n && s < i.length; s++)
            (this.words[s] = 67108863 & (e = (0 | i.words[s]) + n)),
              (n = e >>> 26)
          if (((this.length = i.length), 0 !== n))
            (this.words[this.length] = n), this.length++
          else if (i !== this)
            for (; s < i.length; s++) this.words[s] = i.words[s]
          return this
        }),
        (n.prototype.add = function (t) {
          var e
          return 0 !== t.negative && 0 === this.negative
            ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
            : 0 === t.negative && 0 !== this.negative
            ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
            : this.length > t.length
            ? this.clone().iadd(t)
            : t.clone().iadd(this)
        }),
        (n.prototype.isub = function (t) {
          if (0 !== t.negative) {
            t.negative = 0
            var e = this.iadd(t)
            return (t.negative = 1), e._normSign()
          }
          if (0 !== this.negative)
            return (
              (this.negative = 0),
              this.iadd(t),
              (this.negative = 1),
              this._normSign()
            )
          var i,
            r,
            n = this.cmp(t)
          if (0 === n)
            return (
              (this.negative = 0), (this.length = 1), (this.words[0] = 0), this
            )
          n > 0 ? ((i = this), (r = t)) : ((i = t), (r = this))
          for (var s = 0, a = 0; a < r.length; a++)
            (s = (e = (0 | i.words[a]) - (0 | r.words[a]) + s) >> 26),
              (this.words[a] = 67108863 & e)
          for (; 0 !== s && a < i.length; a++)
            (s = (e = (0 | i.words[a]) + s) >> 26),
              (this.words[a] = 67108863 & e)
          if (0 === s && a < i.length && i !== this)
            for (; a < i.length; a++) this.words[a] = i.words[a]
          return (
            (this.length = Math.max(this.length, a)),
            i !== this && (this.negative = 1),
            this._strip()
          )
        }),
        (n.prototype.sub = function (t) {
          return this.clone().isub(t)
        })
      var g = function (t, e, i) {
        var r,
          n,
          s,
          a = t.words,
          o = e.words,
          u = i.words,
          h = 0,
          d = 0 | a[0],
          l = 8191 & d,
          f = d >>> 13,
          c = 0 | a[1],
          p = 8191 & c,
          m = c >>> 13,
          g = 0 | a[2],
          y = 8191 & g,
          b = g >>> 13,
          w = 0 | a[3],
          v = 8191 & w,
          M = w >>> 13,
          A = 0 | a[4],
          _ = 8191 & A,
          S = A >>> 13,
          T = 0 | a[5],
          x = 8191 & T,
          E = T >>> 13,
          R = 0 | a[6],
          k = 8191 & R,
          I = R >>> 13,
          B = 0 | a[7],
          O = 8191 & B,
          P = B >>> 13,
          C = 0 | a[8],
          N = 8191 & C,
          L = C >>> 13,
          D = 0 | a[9],
          F = 8191 & D,
          U = D >>> 13,
          q = 0 | o[0],
          j = 8191 & q,
          z = q >>> 13,
          W = 0 | o[1],
          $ = 8191 & W,
          H = W >>> 13,
          G = 0 | o[2],
          Z = 8191 & G,
          K = G >>> 13,
          V = 0 | o[3],
          J = 8191 & V,
          X = V >>> 13,
          Y = 0 | o[4],
          Q = 8191 & Y,
          tt = Y >>> 13,
          et = 0 | o[5],
          it = 8191 & et,
          rt = et >>> 13,
          nt = 0 | o[6],
          st = 8191 & nt,
          at = nt >>> 13,
          ot = 0 | o[7],
          ut = 8191 & ot,
          ht = ot >>> 13,
          dt = 0 | o[8],
          lt = 8191 & dt,
          ft = dt >>> 13,
          ct = 0 | o[9],
          pt = 8191 & ct,
          mt = ct >>> 13
        ;(i.negative = t.negative ^ e.negative), (i.length = 19)
        var gt =
          (((h + (r = Math.imul(l, j))) | 0) +
            ((8191 & (n = ((n = Math.imul(l, z)) + Math.imul(f, j)) | 0)) <<
              13)) |
          0
        ;(h = ((((s = Math.imul(f, z)) + (n >>> 13)) | 0) + (gt >>> 26)) | 0),
          (gt &= 67108863),
          (r = Math.imul(p, j)),
          (n = ((n = Math.imul(p, z)) + Math.imul(m, j)) | 0),
          (s = Math.imul(m, z))
        var yt =
          (((h + (r = (r + Math.imul(l, $)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, H)) | 0) + Math.imul(f, $)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, H)) | 0) + (n >>> 13)) | 0) + (yt >>> 26)) |
          0),
          (yt &= 67108863),
          (r = Math.imul(y, j)),
          (n = ((n = Math.imul(y, z)) + Math.imul(b, j)) | 0),
          (s = Math.imul(b, z)),
          (r = (r + Math.imul(p, $)) | 0),
          (n = ((n = (n + Math.imul(p, H)) | 0) + Math.imul(m, $)) | 0),
          (s = (s + Math.imul(m, H)) | 0)
        var bt =
          (((h + (r = (r + Math.imul(l, Z)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, K)) | 0) + Math.imul(f, Z)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, K)) | 0) + (n >>> 13)) | 0) + (bt >>> 26)) |
          0),
          (bt &= 67108863),
          (r = Math.imul(v, j)),
          (n = ((n = Math.imul(v, z)) + Math.imul(M, j)) | 0),
          (s = Math.imul(M, z)),
          (r = (r + Math.imul(y, $)) | 0),
          (n = ((n = (n + Math.imul(y, H)) | 0) + Math.imul(b, $)) | 0),
          (s = (s + Math.imul(b, H)) | 0),
          (r = (r + Math.imul(p, Z)) | 0),
          (n = ((n = (n + Math.imul(p, K)) | 0) + Math.imul(m, Z)) | 0),
          (s = (s + Math.imul(m, K)) | 0)
        var wt =
          (((h + (r = (r + Math.imul(l, J)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, X)) | 0) + Math.imul(f, J)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, X)) | 0) + (n >>> 13)) | 0) + (wt >>> 26)) |
          0),
          (wt &= 67108863),
          (r = Math.imul(_, j)),
          (n = ((n = Math.imul(_, z)) + Math.imul(S, j)) | 0),
          (s = Math.imul(S, z)),
          (r = (r + Math.imul(v, $)) | 0),
          (n = ((n = (n + Math.imul(v, H)) | 0) + Math.imul(M, $)) | 0),
          (s = (s + Math.imul(M, H)) | 0),
          (r = (r + Math.imul(y, Z)) | 0),
          (n = ((n = (n + Math.imul(y, K)) | 0) + Math.imul(b, Z)) | 0),
          (s = (s + Math.imul(b, K)) | 0),
          (r = (r + Math.imul(p, J)) | 0),
          (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, J)) | 0),
          (s = (s + Math.imul(m, X)) | 0)
        var vt =
          (((h + (r = (r + Math.imul(l, Q)) | 0)) | 0) +
            ((8191 &
              (n = ((n = (n + Math.imul(l, tt)) | 0) + Math.imul(f, Q)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, tt)) | 0) + (n >>> 13)) | 0) +
            (vt >>> 26)) |
          0),
          (vt &= 67108863),
          (r = Math.imul(x, j)),
          (n = ((n = Math.imul(x, z)) + Math.imul(E, j)) | 0),
          (s = Math.imul(E, z)),
          (r = (r + Math.imul(_, $)) | 0),
          (n = ((n = (n + Math.imul(_, H)) | 0) + Math.imul(S, $)) | 0),
          (s = (s + Math.imul(S, H)) | 0),
          (r = (r + Math.imul(v, Z)) | 0),
          (n = ((n = (n + Math.imul(v, K)) | 0) + Math.imul(M, Z)) | 0),
          (s = (s + Math.imul(M, K)) | 0),
          (r = (r + Math.imul(y, J)) | 0),
          (n = ((n = (n + Math.imul(y, X)) | 0) + Math.imul(b, J)) | 0),
          (s = (s + Math.imul(b, X)) | 0),
          (r = (r + Math.imul(p, Q)) | 0),
          (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
          (s = (s + Math.imul(m, tt)) | 0)
        var Mt =
          (((h + (r = (r + Math.imul(l, it)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, rt)) | 0) + Math.imul(f, it)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, rt)) | 0) + (n >>> 13)) | 0) +
            (Mt >>> 26)) |
          0),
          (Mt &= 67108863),
          (r = Math.imul(k, j)),
          (n = ((n = Math.imul(k, z)) + Math.imul(I, j)) | 0),
          (s = Math.imul(I, z)),
          (r = (r + Math.imul(x, $)) | 0),
          (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(E, $)) | 0),
          (s = (s + Math.imul(E, H)) | 0),
          (r = (r + Math.imul(_, Z)) | 0),
          (n = ((n = (n + Math.imul(_, K)) | 0) + Math.imul(S, Z)) | 0),
          (s = (s + Math.imul(S, K)) | 0),
          (r = (r + Math.imul(v, J)) | 0),
          (n = ((n = (n + Math.imul(v, X)) | 0) + Math.imul(M, J)) | 0),
          (s = (s + Math.imul(M, X)) | 0),
          (r = (r + Math.imul(y, Q)) | 0),
          (n = ((n = (n + Math.imul(y, tt)) | 0) + Math.imul(b, Q)) | 0),
          (s = (s + Math.imul(b, tt)) | 0),
          (r = (r + Math.imul(p, it)) | 0),
          (n = ((n = (n + Math.imul(p, rt)) | 0) + Math.imul(m, it)) | 0),
          (s = (s + Math.imul(m, rt)) | 0)
        var At =
          (((h + (r = (r + Math.imul(l, st)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, at)) | 0) + Math.imul(f, st)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, at)) | 0) + (n >>> 13)) | 0) +
            (At >>> 26)) |
          0),
          (At &= 67108863),
          (r = Math.imul(O, j)),
          (n = ((n = Math.imul(O, z)) + Math.imul(P, j)) | 0),
          (s = Math.imul(P, z)),
          (r = (r + Math.imul(k, $)) | 0),
          (n = ((n = (n + Math.imul(k, H)) | 0) + Math.imul(I, $)) | 0),
          (s = (s + Math.imul(I, H)) | 0),
          (r = (r + Math.imul(x, Z)) | 0),
          (n = ((n = (n + Math.imul(x, K)) | 0) + Math.imul(E, Z)) | 0),
          (s = (s + Math.imul(E, K)) | 0),
          (r = (r + Math.imul(_, J)) | 0),
          (n = ((n = (n + Math.imul(_, X)) | 0) + Math.imul(S, J)) | 0),
          (s = (s + Math.imul(S, X)) | 0),
          (r = (r + Math.imul(v, Q)) | 0),
          (n = ((n = (n + Math.imul(v, tt)) | 0) + Math.imul(M, Q)) | 0),
          (s = (s + Math.imul(M, tt)) | 0),
          (r = (r + Math.imul(y, it)) | 0),
          (n = ((n = (n + Math.imul(y, rt)) | 0) + Math.imul(b, it)) | 0),
          (s = (s + Math.imul(b, rt)) | 0),
          (r = (r + Math.imul(p, st)) | 0),
          (n = ((n = (n + Math.imul(p, at)) | 0) + Math.imul(m, st)) | 0),
          (s = (s + Math.imul(m, at)) | 0)
        var _t =
          (((h + (r = (r + Math.imul(l, ut)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, ht)) | 0) + Math.imul(f, ut)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, ht)) | 0) + (n >>> 13)) | 0) +
            (_t >>> 26)) |
          0),
          (_t &= 67108863),
          (r = Math.imul(N, j)),
          (n = ((n = Math.imul(N, z)) + Math.imul(L, j)) | 0),
          (s = Math.imul(L, z)),
          (r = (r + Math.imul(O, $)) | 0),
          (n = ((n = (n + Math.imul(O, H)) | 0) + Math.imul(P, $)) | 0),
          (s = (s + Math.imul(P, H)) | 0),
          (r = (r + Math.imul(k, Z)) | 0),
          (n = ((n = (n + Math.imul(k, K)) | 0) + Math.imul(I, Z)) | 0),
          (s = (s + Math.imul(I, K)) | 0),
          (r = (r + Math.imul(x, J)) | 0),
          (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(E, J)) | 0),
          (s = (s + Math.imul(E, X)) | 0),
          (r = (r + Math.imul(_, Q)) | 0),
          (n = ((n = (n + Math.imul(_, tt)) | 0) + Math.imul(S, Q)) | 0),
          (s = (s + Math.imul(S, tt)) | 0),
          (r = (r + Math.imul(v, it)) | 0),
          (n = ((n = (n + Math.imul(v, rt)) | 0) + Math.imul(M, it)) | 0),
          (s = (s + Math.imul(M, rt)) | 0),
          (r = (r + Math.imul(y, st)) | 0),
          (n = ((n = (n + Math.imul(y, at)) | 0) + Math.imul(b, st)) | 0),
          (s = (s + Math.imul(b, at)) | 0),
          (r = (r + Math.imul(p, ut)) | 0),
          (n = ((n = (n + Math.imul(p, ht)) | 0) + Math.imul(m, ut)) | 0),
          (s = (s + Math.imul(m, ht)) | 0)
        var St =
          (((h + (r = (r + Math.imul(l, lt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, ft)) | 0) + Math.imul(f, lt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, ft)) | 0) + (n >>> 13)) | 0) +
            (St >>> 26)) |
          0),
          (St &= 67108863),
          (r = Math.imul(F, j)),
          (n = ((n = Math.imul(F, z)) + Math.imul(U, j)) | 0),
          (s = Math.imul(U, z)),
          (r = (r + Math.imul(N, $)) | 0),
          (n = ((n = (n + Math.imul(N, H)) | 0) + Math.imul(L, $)) | 0),
          (s = (s + Math.imul(L, H)) | 0),
          (r = (r + Math.imul(O, Z)) | 0),
          (n = ((n = (n + Math.imul(O, K)) | 0) + Math.imul(P, Z)) | 0),
          (s = (s + Math.imul(P, K)) | 0),
          (r = (r + Math.imul(k, J)) | 0),
          (n = ((n = (n + Math.imul(k, X)) | 0) + Math.imul(I, J)) | 0),
          (s = (s + Math.imul(I, X)) | 0),
          (r = (r + Math.imul(x, Q)) | 0),
          (n = ((n = (n + Math.imul(x, tt)) | 0) + Math.imul(E, Q)) | 0),
          (s = (s + Math.imul(E, tt)) | 0),
          (r = (r + Math.imul(_, it)) | 0),
          (n = ((n = (n + Math.imul(_, rt)) | 0) + Math.imul(S, it)) | 0),
          (s = (s + Math.imul(S, rt)) | 0),
          (r = (r + Math.imul(v, st)) | 0),
          (n = ((n = (n + Math.imul(v, at)) | 0) + Math.imul(M, st)) | 0),
          (s = (s + Math.imul(M, at)) | 0),
          (r = (r + Math.imul(y, ut)) | 0),
          (n = ((n = (n + Math.imul(y, ht)) | 0) + Math.imul(b, ut)) | 0),
          (s = (s + Math.imul(b, ht)) | 0),
          (r = (r + Math.imul(p, lt)) | 0),
          (n = ((n = (n + Math.imul(p, ft)) | 0) + Math.imul(m, lt)) | 0),
          (s = (s + Math.imul(m, ft)) | 0)
        var Tt =
          (((h + (r = (r + Math.imul(l, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(l, mt)) | 0) + Math.imul(f, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(f, mt)) | 0) + (n >>> 13)) | 0) +
            (Tt >>> 26)) |
          0),
          (Tt &= 67108863),
          (r = Math.imul(F, $)),
          (n = ((n = Math.imul(F, H)) + Math.imul(U, $)) | 0),
          (s = Math.imul(U, H)),
          (r = (r + Math.imul(N, Z)) | 0),
          (n = ((n = (n + Math.imul(N, K)) | 0) + Math.imul(L, Z)) | 0),
          (s = (s + Math.imul(L, K)) | 0),
          (r = (r + Math.imul(O, J)) | 0),
          (n = ((n = (n + Math.imul(O, X)) | 0) + Math.imul(P, J)) | 0),
          (s = (s + Math.imul(P, X)) | 0),
          (r = (r + Math.imul(k, Q)) | 0),
          (n = ((n = (n + Math.imul(k, tt)) | 0) + Math.imul(I, Q)) | 0),
          (s = (s + Math.imul(I, tt)) | 0),
          (r = (r + Math.imul(x, it)) | 0),
          (n = ((n = (n + Math.imul(x, rt)) | 0) + Math.imul(E, it)) | 0),
          (s = (s + Math.imul(E, rt)) | 0),
          (r = (r + Math.imul(_, st)) | 0),
          (n = ((n = (n + Math.imul(_, at)) | 0) + Math.imul(S, st)) | 0),
          (s = (s + Math.imul(S, at)) | 0),
          (r = (r + Math.imul(v, ut)) | 0),
          (n = ((n = (n + Math.imul(v, ht)) | 0) + Math.imul(M, ut)) | 0),
          (s = (s + Math.imul(M, ht)) | 0),
          (r = (r + Math.imul(y, lt)) | 0),
          (n = ((n = (n + Math.imul(y, ft)) | 0) + Math.imul(b, lt)) | 0),
          (s = (s + Math.imul(b, ft)) | 0)
        var xt =
          (((h + (r = (r + Math.imul(p, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(m, mt)) | 0) + (n >>> 13)) | 0) +
            (xt >>> 26)) |
          0),
          (xt &= 67108863),
          (r = Math.imul(F, Z)),
          (n = ((n = Math.imul(F, K)) + Math.imul(U, Z)) | 0),
          (s = Math.imul(U, K)),
          (r = (r + Math.imul(N, J)) | 0),
          (n = ((n = (n + Math.imul(N, X)) | 0) + Math.imul(L, J)) | 0),
          (s = (s + Math.imul(L, X)) | 0),
          (r = (r + Math.imul(O, Q)) | 0),
          (n = ((n = (n + Math.imul(O, tt)) | 0) + Math.imul(P, Q)) | 0),
          (s = (s + Math.imul(P, tt)) | 0),
          (r = (r + Math.imul(k, it)) | 0),
          (n = ((n = (n + Math.imul(k, rt)) | 0) + Math.imul(I, it)) | 0),
          (s = (s + Math.imul(I, rt)) | 0),
          (r = (r + Math.imul(x, st)) | 0),
          (n = ((n = (n + Math.imul(x, at)) | 0) + Math.imul(E, st)) | 0),
          (s = (s + Math.imul(E, at)) | 0),
          (r = (r + Math.imul(_, ut)) | 0),
          (n = ((n = (n + Math.imul(_, ht)) | 0) + Math.imul(S, ut)) | 0),
          (s = (s + Math.imul(S, ht)) | 0),
          (r = (r + Math.imul(v, lt)) | 0),
          (n = ((n = (n + Math.imul(v, ft)) | 0) + Math.imul(M, lt)) | 0),
          (s = (s + Math.imul(M, ft)) | 0)
        var Et =
          (((h + (r = (r + Math.imul(y, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(y, mt)) | 0) + Math.imul(b, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(b, mt)) | 0) + (n >>> 13)) | 0) +
            (Et >>> 26)) |
          0),
          (Et &= 67108863),
          (r = Math.imul(F, J)),
          (n = ((n = Math.imul(F, X)) + Math.imul(U, J)) | 0),
          (s = Math.imul(U, X)),
          (r = (r + Math.imul(N, Q)) | 0),
          (n = ((n = (n + Math.imul(N, tt)) | 0) + Math.imul(L, Q)) | 0),
          (s = (s + Math.imul(L, tt)) | 0),
          (r = (r + Math.imul(O, it)) | 0),
          (n = ((n = (n + Math.imul(O, rt)) | 0) + Math.imul(P, it)) | 0),
          (s = (s + Math.imul(P, rt)) | 0),
          (r = (r + Math.imul(k, st)) | 0),
          (n = ((n = (n + Math.imul(k, at)) | 0) + Math.imul(I, st)) | 0),
          (s = (s + Math.imul(I, at)) | 0),
          (r = (r + Math.imul(x, ut)) | 0),
          (n = ((n = (n + Math.imul(x, ht)) | 0) + Math.imul(E, ut)) | 0),
          (s = (s + Math.imul(E, ht)) | 0),
          (r = (r + Math.imul(_, lt)) | 0),
          (n = ((n = (n + Math.imul(_, ft)) | 0) + Math.imul(S, lt)) | 0),
          (s = (s + Math.imul(S, ft)) | 0)
        var Rt =
          (((h + (r = (r + Math.imul(v, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(v, mt)) | 0) + Math.imul(M, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(M, mt)) | 0) + (n >>> 13)) | 0) +
            (Rt >>> 26)) |
          0),
          (Rt &= 67108863),
          (r = Math.imul(F, Q)),
          (n = ((n = Math.imul(F, tt)) + Math.imul(U, Q)) | 0),
          (s = Math.imul(U, tt)),
          (r = (r + Math.imul(N, it)) | 0),
          (n = ((n = (n + Math.imul(N, rt)) | 0) + Math.imul(L, it)) | 0),
          (s = (s + Math.imul(L, rt)) | 0),
          (r = (r + Math.imul(O, st)) | 0),
          (n = ((n = (n + Math.imul(O, at)) | 0) + Math.imul(P, st)) | 0),
          (s = (s + Math.imul(P, at)) | 0),
          (r = (r + Math.imul(k, ut)) | 0),
          (n = ((n = (n + Math.imul(k, ht)) | 0) + Math.imul(I, ut)) | 0),
          (s = (s + Math.imul(I, ht)) | 0),
          (r = (r + Math.imul(x, lt)) | 0),
          (n = ((n = (n + Math.imul(x, ft)) | 0) + Math.imul(E, lt)) | 0),
          (s = (s + Math.imul(E, ft)) | 0)
        var kt =
          (((h + (r = (r + Math.imul(_, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(_, mt)) | 0) + Math.imul(S, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(S, mt)) | 0) + (n >>> 13)) | 0) +
            (kt >>> 26)) |
          0),
          (kt &= 67108863),
          (r = Math.imul(F, it)),
          (n = ((n = Math.imul(F, rt)) + Math.imul(U, it)) | 0),
          (s = Math.imul(U, rt)),
          (r = (r + Math.imul(N, st)) | 0),
          (n = ((n = (n + Math.imul(N, at)) | 0) + Math.imul(L, st)) | 0),
          (s = (s + Math.imul(L, at)) | 0),
          (r = (r + Math.imul(O, ut)) | 0),
          (n = ((n = (n + Math.imul(O, ht)) | 0) + Math.imul(P, ut)) | 0),
          (s = (s + Math.imul(P, ht)) | 0),
          (r = (r + Math.imul(k, lt)) | 0),
          (n = ((n = (n + Math.imul(k, ft)) | 0) + Math.imul(I, lt)) | 0),
          (s = (s + Math.imul(I, ft)) | 0)
        var It =
          (((h + (r = (r + Math.imul(x, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(x, mt)) | 0) + Math.imul(E, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(E, mt)) | 0) + (n >>> 13)) | 0) +
            (It >>> 26)) |
          0),
          (It &= 67108863),
          (r = Math.imul(F, st)),
          (n = ((n = Math.imul(F, at)) + Math.imul(U, st)) | 0),
          (s = Math.imul(U, at)),
          (r = (r + Math.imul(N, ut)) | 0),
          (n = ((n = (n + Math.imul(N, ht)) | 0) + Math.imul(L, ut)) | 0),
          (s = (s + Math.imul(L, ht)) | 0),
          (r = (r + Math.imul(O, lt)) | 0),
          (n = ((n = (n + Math.imul(O, ft)) | 0) + Math.imul(P, lt)) | 0),
          (s = (s + Math.imul(P, ft)) | 0)
        var Bt =
          (((h + (r = (r + Math.imul(k, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(k, mt)) | 0) + Math.imul(I, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(I, mt)) | 0) + (n >>> 13)) | 0) +
            (Bt >>> 26)) |
          0),
          (Bt &= 67108863),
          (r = Math.imul(F, ut)),
          (n = ((n = Math.imul(F, ht)) + Math.imul(U, ut)) | 0),
          (s = Math.imul(U, ht)),
          (r = (r + Math.imul(N, lt)) | 0),
          (n = ((n = (n + Math.imul(N, ft)) | 0) + Math.imul(L, lt)) | 0),
          (s = (s + Math.imul(L, ft)) | 0)
        var Ot =
          (((h + (r = (r + Math.imul(O, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(O, mt)) | 0) + Math.imul(P, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(P, mt)) | 0) + (n >>> 13)) | 0) +
            (Ot >>> 26)) |
          0),
          (Ot &= 67108863),
          (r = Math.imul(F, lt)),
          (n = ((n = Math.imul(F, ft)) + Math.imul(U, lt)) | 0),
          (s = Math.imul(U, ft))
        var Pt =
          (((h + (r = (r + Math.imul(N, pt)) | 0)) | 0) +
            ((8191 &
              (n =
                ((n = (n + Math.imul(N, mt)) | 0) + Math.imul(L, pt)) | 0)) <<
              13)) |
          0
        ;(h =
          ((((s = (s + Math.imul(L, mt)) | 0) + (n >>> 13)) | 0) +
            (Pt >>> 26)) |
          0),
          (Pt &= 67108863)
        var Ct =
          (((h + (r = Math.imul(F, pt))) | 0) +
            ((8191 & (n = ((n = Math.imul(F, mt)) + Math.imul(U, pt)) | 0)) <<
              13)) |
          0
        return (
          (h = ((((s = Math.imul(U, mt)) + (n >>> 13)) | 0) + (Ct >>> 26)) | 0),
          (Ct &= 67108863),
          (u[0] = gt),
          (u[1] = yt),
          (u[2] = bt),
          (u[3] = wt),
          (u[4] = vt),
          (u[5] = Mt),
          (u[6] = At),
          (u[7] = _t),
          (u[8] = St),
          (u[9] = Tt),
          (u[10] = xt),
          (u[11] = Et),
          (u[12] = Rt),
          (u[13] = kt),
          (u[14] = It),
          (u[15] = Bt),
          (u[16] = Ot),
          (u[17] = Pt),
          (u[18] = Ct),
          0 !== h && ((u[19] = h), i.length++),
          i
        )
      }
      function y(t, e, i) {
        ;(i.negative = e.negative ^ t.negative),
          (i.length = t.length + e.length)
        for (var r = 0, n = 0, s = 0; s < i.length - 1; s++) {
          var a = n
          n = 0
          for (
            var o = 67108863 & r,
              u = Math.min(s, e.length - 1),
              h = Math.max(0, s - t.length + 1);
            h <= u;
            h++
          ) {
            var d = (0 | t.words[s - h]) * (0 | e.words[h]),
              l = 67108863 & d
            ;(o = 67108863 & (l = (l + o) | 0)),
              (n +=
                (a =
                  ((a = (a + ((d / 67108864) | 0)) | 0) + (l >>> 26)) | 0) >>>
                26),
              (a &= 67108863)
          }
          ;(i.words[s] = o), (r = a), (a = n)
        }
        return 0 !== r ? (i.words[s] = r) : i.length--, i._strip()
      }
      function b(t, e, i) {
        return y(t, e, i)
      }
      Math.imul || (g = m),
        (n.prototype.mulTo = function (t, e) {
          var i = this.length + t.length
          return 10 === this.length && 10 === t.length
            ? g(this, t, e)
            : i < 63
            ? m(this, t, e)
            : i < 1024
            ? y(this, t, e)
            : b(this, t, e)
        }),
        (n.prototype.mul = function (t) {
          var e = new n(null)
          return (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
        }),
        (n.prototype.mulf = function (t) {
          var e = new n(null)
          return (e.words = new Array(this.length + t.length)), b(this, t, e)
        }),
        (n.prototype.imul = function (t) {
          return this.clone().mulTo(t, this)
        }),
        (n.prototype.imuln = function (t) {
          var e = t < 0
          e && (t = -t), i('number' == typeof t), i(t < 67108864)
          for (var r = 0, n = 0; n < this.length; n++) {
            var s = (0 | this.words[n]) * t,
              a = (67108863 & s) + (67108863 & r)
            ;(r >>= 26),
              (r += (s / 67108864) | 0),
              (r += a >>> 26),
              (this.words[n] = 67108863 & a)
          }
          return (
            0 !== r && ((this.words[n] = r), this.length++),
            e ? this.ineg() : this
          )
        }),
        (n.prototype.muln = function (t) {
          return this.clone().imuln(t)
        }),
        (n.prototype.sqr = function () {
          return this.mul(this)
        }),
        (n.prototype.isqr = function () {
          return this.imul(this.clone())
        }),
        (n.prototype.pow = function (t) {
          var e = (function (t) {
            for (var e = new Array(t.bitLength()), i = 0; i < e.length; i++)
              e[i] = (t.words[(i / 26) | 0] >>> i % 26) & 1
            return e
          })(t)
          if (0 === e.length) return new n(1)
          for (
            var i = this, r = 0;
            r < e.length && 0 === e[r];
            r++, i = i.sqr()
          );
          if (++r < e.length)
            for (var s = i.sqr(); r < e.length; r++, s = s.sqr())
              0 !== e[r] && (i = i.mul(s))
          return i
        }),
        (n.prototype.iushln = function (t) {
          i('number' == typeof t && t >= 0)
          var e,
            r = t % 26,
            n = (t - r) / 26,
            s = (67108863 >>> (26 - r)) << (26 - r)
          if (0 !== r) {
            var a = 0
            for (e = 0; e < this.length; e++) {
              var o = this.words[e] & s
              ;(this.words[e] = (((0 | this.words[e]) - o) << r) | a),
                (a = o >>> (26 - r))
            }
            a && ((this.words[e] = a), this.length++)
          }
          if (0 !== n) {
            for (e = this.length - 1; e >= 0; e--)
              this.words[e + n] = this.words[e]
            for (e = 0; e < n; e++) this.words[e] = 0
            this.length += n
          }
          return this._strip()
        }),
        (n.prototype.ishln = function (t) {
          return i(0 === this.negative), this.iushln(t)
        }),
        (n.prototype.iushrn = function (t, e, r) {
          var n
          i('number' == typeof t && t >= 0), (n = e ? (e - (e % 26)) / 26 : 0)
          var s = t % 26,
            a = Math.min((t - s) / 26, this.length),
            o = 67108863 ^ ((67108863 >>> s) << s),
            u = r
          if (((n -= a), (n = Math.max(0, n)), u)) {
            for (var h = 0; h < a; h++) u.words[h] = this.words[h]
            u.length = a
          }
          if (0 === a);
          else if (this.length > a)
            for (this.length -= a, h = 0; h < this.length; h++)
              this.words[h] = this.words[h + a]
          else (this.words[0] = 0), (this.length = 1)
          var d = 0
          for (h = this.length - 1; h >= 0 && (0 !== d || h >= n); h--) {
            var l = 0 | this.words[h]
            ;(this.words[h] = (d << (26 - s)) | (l >>> s)), (d = l & o)
          }
          return (
            u && 0 !== d && (u.words[u.length++] = d),
            0 === this.length && ((this.words[0] = 0), (this.length = 1)),
            this._strip()
          )
        }),
        (n.prototype.ishrn = function (t, e, r) {
          return i(0 === this.negative), this.iushrn(t, e, r)
        }),
        (n.prototype.shln = function (t) {
          return this.clone().ishln(t)
        }),
        (n.prototype.ushln = function (t) {
          return this.clone().iushln(t)
        }),
        (n.prototype.shrn = function (t) {
          return this.clone().ishrn(t)
        }),
        (n.prototype.ushrn = function (t) {
          return this.clone().iushrn(t)
        }),
        (n.prototype.testn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = t % 26,
            r = (t - e) / 26
          return !(this.length <= r || !(this.words[r] & (1 << e)))
        }),
        (n.prototype.imaskn = function (t) {
          i('number' == typeof t && t >= 0)
          var e = t % 26,
            r = (t - e) / 26
          return (
            i(0 === this.negative, 'imaskn works only with positive numbers'),
            this.length <= r
              ? this
              : (0 !== e && r++,
                (this.length = Math.min(r, this.length)),
                0 !== e &&
                  (this.words[this.length - 1] &=
                    67108863 ^ ((67108863 >>> e) << e)),
                this._strip())
          )
        }),
        (n.prototype.maskn = function (t) {
          return this.clone().imaskn(t)
        }),
        (n.prototype.iaddn = function (t) {
          return (
            i('number' == typeof t),
            i(t < 67108864),
            t < 0
              ? this.isubn(-t)
              : 0 !== this.negative
              ? 1 === this.length && (0 | this.words[0]) <= t
                ? ((this.words[0] = t - (0 | this.words[0])),
                  (this.negative = 0),
                  this)
                : ((this.negative = 0),
                  this.isubn(t),
                  (this.negative = 1),
                  this)
              : this._iaddn(t)
          )
        }),
        (n.prototype._iaddn = function (t) {
          this.words[0] += t
          for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
            (this.words[e] -= 67108864),
              e === this.length - 1
                ? (this.words[e + 1] = 1)
                : this.words[e + 1]++
          return (this.length = Math.max(this.length, e + 1)), this
        }),
        (n.prototype.isubn = function (t) {
          if ((i('number' == typeof t), i(t < 67108864), t < 0))
            return this.iaddn(-t)
          if (0 !== this.negative)
            return (this.negative = 0), this.iaddn(t), (this.negative = 1), this
          if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
            (this.words[0] = -this.words[0]), (this.negative = 1)
          else
            for (var e = 0; e < this.length && this.words[e] < 0; e++)
              (this.words[e] += 67108864), (this.words[e + 1] -= 1)
          return this._strip()
        }),
        (n.prototype.addn = function (t) {
          return this.clone().iaddn(t)
        }),
        (n.prototype.subn = function (t) {
          return this.clone().isubn(t)
        }),
        (n.prototype.iabs = function () {
          return (this.negative = 0), this
        }),
        (n.prototype.abs = function () {
          return this.clone().iabs()
        }),
        (n.prototype._ishlnsubmul = function (t, e, r) {
          var n, s
          this._expand(t.length + r)
          var a = 0
          for (n = 0; n < t.length; n++) {
            s = (0 | this.words[n + r]) + a
            var o = (0 | t.words[n]) * e
            ;(a = ((s -= 67108863 & o) >> 26) - ((o / 67108864) | 0)),
              (this.words[n + r] = 67108863 & s)
          }
          for (; n < this.length - r; n++)
            (a = (s = (0 | this.words[n + r]) + a) >> 26),
              (this.words[n + r] = 67108863 & s)
          if (0 === a) return this._strip()
          for (i(-1 === a), a = 0, n = 0; n < this.length; n++)
            (a = (s = -(0 | this.words[n]) + a) >> 26),
              (this.words[n] = 67108863 & s)
          return (this.negative = 1), this._strip()
        }),
        (n.prototype._wordDiv = function (t, e) {
          var i,
            r = this.clone(),
            s = t,
            a = 0 | s.words[s.length - 1]
          0 != (i = 26 - this._countBits(a)) &&
            ((s = s.ushln(i)), r.iushln(i), (a = 0 | s.words[s.length - 1]))
          var o,
            u = r.length - s.length
          if ('mod' !== e) {
            ;((o = new n(null)).length = u + 1), (o.words = new Array(o.length))
            for (var h = 0; h < o.length; h++) o.words[h] = 0
          }
          var d = r.clone()._ishlnsubmul(s, 1, u)
          0 === d.negative && ((r = d), o && (o.words[u] = 1))
          for (var l = u - 1; l >= 0; l--) {
            var f =
              67108864 * (0 | r.words[s.length + l]) +
              (0 | r.words[s.length + l - 1])
            for (
              f = Math.min((f / a) | 0, 67108863), r._ishlnsubmul(s, f, l);
              0 !== r.negative;

            )
              f--,
                (r.negative = 0),
                r._ishlnsubmul(s, 1, l),
                r.isZero() || (r.negative ^= 1)
            o && (o.words[l] = f)
          }
          return (
            o && o._strip(),
            r._strip(),
            'div' !== e && 0 !== i && r.iushrn(i),
            { div: o || null, mod: r }
          )
        }),
        (n.prototype.divmod = function (t, e, r) {
          return (
            i(!t.isZero()),
            this.isZero()
              ? { div: new n(0), mod: new n(0) }
              : 0 !== this.negative && 0 === t.negative
              ? ((o = this.neg().divmod(t, e)),
                'mod' !== e && (s = o.div.neg()),
                'div' !== e &&
                  ((a = o.mod.neg()), r && 0 !== a.negative && a.iadd(t)),
                { div: s, mod: a })
              : 0 === this.negative && 0 !== t.negative
              ? ((o = this.divmod(t.neg(), e)),
                'mod' !== e && (s = o.div.neg()),
                { div: s, mod: o.mod })
              : 0 != (this.negative & t.negative)
              ? ((o = this.neg().divmod(t.neg(), e)),
                'div' !== e &&
                  ((a = o.mod.neg()), r && 0 !== a.negative && a.isub(t)),
                { div: o.div, mod: a })
              : t.length > this.length || this.cmp(t) < 0
              ? { div: new n(0), mod: this }
              : 1 === t.length
              ? 'div' === e
                ? { div: this.divn(t.words[0]), mod: null }
                : 'mod' === e
                ? { div: null, mod: new n(this.modrn(t.words[0])) }
                : {
                    div: this.divn(t.words[0]),
                    mod: new n(this.modrn(t.words[0]))
                  }
              : this._wordDiv(t, e)
          )
          var s, a, o
        }),
        (n.prototype.div = function (t) {
          return this.divmod(t, 'div', !1).div
        }),
        (n.prototype.mod = function (t) {
          return this.divmod(t, 'mod', !1).mod
        }),
        (n.prototype.umod = function (t) {
          return this.divmod(t, 'mod', !0).mod
        }),
        (n.prototype.divRound = function (t) {
          var e = this.divmod(t)
          if (e.mod.isZero()) return e.div
          var i = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
            r = t.ushrn(1),
            n = t.andln(1),
            s = i.cmp(r)
          return s < 0 || (1 === n && 0 === s)
            ? e.div
            : 0 !== e.div.negative
            ? e.div.isubn(1)
            : e.div.iaddn(1)
        }),
        (n.prototype.modrn = function (t) {
          var e = t < 0
          e && (t = -t), i(t <= 67108863)
          for (var r = (1 << 26) % t, n = 0, s = this.length - 1; s >= 0; s--)
            n = (r * n + (0 | this.words[s])) % t
          return e ? -n : n
        }),
        (n.prototype.modn = function (t) {
          return this.modrn(t)
        }),
        (n.prototype.idivn = function (t) {
          var e = t < 0
          e && (t = -t), i(t <= 67108863)
          for (var r = 0, n = this.length - 1; n >= 0; n--) {
            var s = (0 | this.words[n]) + 67108864 * r
            ;(this.words[n] = (s / t) | 0), (r = s % t)
          }
          return this._strip(), e ? this.ineg() : this
        }),
        (n.prototype.divn = function (t) {
          return this.clone().idivn(t)
        }),
        (n.prototype.egcd = function (t) {
          i(0 === t.negative), i(!t.isZero())
          var e = this,
            r = t.clone()
          e = 0 !== e.negative ? e.umod(t) : e.clone()
          for (
            var s = new n(1), a = new n(0), o = new n(0), u = new n(1), h = 0;
            e.isEven() && r.isEven();

          )
            e.iushrn(1), r.iushrn(1), ++h
          for (var d = r.clone(), l = e.clone(); !e.isZero(); ) {
            for (
              var f = 0, c = 1;
              0 == (e.words[0] & c) && f < 26;
              ++f, c <<= 1
            );
            if (f > 0)
              for (e.iushrn(f); f-- > 0; )
                (s.isOdd() || a.isOdd()) && (s.iadd(d), a.isub(l)),
                  s.iushrn(1),
                  a.iushrn(1)
            for (
              var p = 0, m = 1;
              0 == (r.words[0] & m) && p < 26;
              ++p, m <<= 1
            );
            if (p > 0)
              for (r.iushrn(p); p-- > 0; )
                (o.isOdd() || u.isOdd()) && (o.iadd(d), u.isub(l)),
                  o.iushrn(1),
                  u.iushrn(1)
            e.cmp(r) >= 0
              ? (e.isub(r), s.isub(o), a.isub(u))
              : (r.isub(e), o.isub(s), u.isub(a))
          }
          return { a: o, b: u, gcd: r.iushln(h) }
        }),
        (n.prototype._invmp = function (t) {
          i(0 === t.negative), i(!t.isZero())
          var e = this,
            r = t.clone()
          e = 0 !== e.negative ? e.umod(t) : e.clone()
          for (
            var s, a = new n(1), o = new n(0), u = r.clone();
            e.cmpn(1) > 0 && r.cmpn(1) > 0;

          ) {
            for (
              var h = 0, d = 1;
              0 == (e.words[0] & d) && h < 26;
              ++h, d <<= 1
            );
            if (h > 0)
              for (e.iushrn(h); h-- > 0; ) a.isOdd() && a.iadd(u), a.iushrn(1)
            for (
              var l = 0, f = 1;
              0 == (r.words[0] & f) && l < 26;
              ++l, f <<= 1
            );
            if (l > 0)
              for (r.iushrn(l); l-- > 0; ) o.isOdd() && o.iadd(u), o.iushrn(1)
            e.cmp(r) >= 0 ? (e.isub(r), a.isub(o)) : (r.isub(e), o.isub(a))
          }
          return (s = 0 === e.cmpn(1) ? a : o).cmpn(0) < 0 && s.iadd(t), s
        }),
        (n.prototype.gcd = function (t) {
          if (this.isZero()) return t.abs()
          if (t.isZero()) return this.abs()
          var e = this.clone(),
            i = t.clone()
          ;(e.negative = 0), (i.negative = 0)
          for (var r = 0; e.isEven() && i.isEven(); r++)
            e.iushrn(1), i.iushrn(1)
          for (;;) {
            for (; e.isEven(); ) e.iushrn(1)
            for (; i.isEven(); ) i.iushrn(1)
            var n = e.cmp(i)
            if (n < 0) {
              var s = e
              ;(e = i), (i = s)
            } else if (0 === n || 0 === i.cmpn(1)) break
            e.isub(i)
          }
          return i.iushln(r)
        }),
        (n.prototype.invm = function (t) {
          return this.egcd(t).a.umod(t)
        }),
        (n.prototype.isEven = function () {
          return 0 == (1 & this.words[0])
        }),
        (n.prototype.isOdd = function () {
          return 1 == (1 & this.words[0])
        }),
        (n.prototype.andln = function (t) {
          return this.words[0] & t
        }),
        (n.prototype.bincn = function (t) {
          i('number' == typeof t)
          var e = t % 26,
            r = (t - e) / 26,
            n = 1 << e
          if (this.length <= r)
            return this._expand(r + 1), (this.words[r] |= n), this
          for (var s = n, a = r; 0 !== s && a < this.length; a++) {
            var o = 0 | this.words[a]
            ;(s = (o += s) >>> 26), (this.words[a] = o &= 67108863)
          }
          return 0 !== s && ((this.words[a] = s), this.length++), this
        }),
        (n.prototype.isZero = function () {
          return 1 === this.length && 0 === this.words[0]
        }),
        (n.prototype.cmpn = function (t) {
          var e,
            r = t < 0
          if (0 !== this.negative && !r) return -1
          if (0 === this.negative && r) return 1
          if ((this._strip(), this.length > 1)) e = 1
          else {
            r && (t = -t), i(t <= 67108863, 'Number is too big')
            var n = 0 | this.words[0]
            e = n === t ? 0 : n < t ? -1 : 1
          }
          return 0 !== this.negative ? 0 | -e : e
        }),
        (n.prototype.cmp = function (t) {
          if (0 !== this.negative && 0 === t.negative) return -1
          if (0 === this.negative && 0 !== t.negative) return 1
          var e = this.ucmp(t)
          return 0 !== this.negative ? 0 | -e : e
        }),
        (n.prototype.ucmp = function (t) {
          if (this.length > t.length) return 1
          if (this.length < t.length) return -1
          for (var e = 0, i = this.length - 1; i >= 0; i--) {
            var r = 0 | this.words[i],
              n = 0 | t.words[i]
            if (r !== n) {
              r < n ? (e = -1) : r > n && (e = 1)
              break
            }
          }
          return e
        }),
        (n.prototype.gtn = function (t) {
          return 1 === this.cmpn(t)
        }),
        (n.prototype.gt = function (t) {
          return 1 === this.cmp(t)
        }),
        (n.prototype.gten = function (t) {
          return this.cmpn(t) >= 0
        }),
        (n.prototype.gte = function (t) {
          return this.cmp(t) >= 0
        }),
        (n.prototype.ltn = function (t) {
          return -1 === this.cmpn(t)
        }),
        (n.prototype.lt = function (t) {
          return -1 === this.cmp(t)
        }),
        (n.prototype.lten = function (t) {
          return this.cmpn(t) <= 0
        }),
        (n.prototype.lte = function (t) {
          return this.cmp(t) <= 0
        }),
        (n.prototype.eqn = function (t) {
          return 0 === this.cmpn(t)
        }),
        (n.prototype.eq = function (t) {
          return 0 === this.cmp(t)
        }),
        (n.red = function (t) {
          return new T(t)
        }),
        (n.prototype.toRed = function (t) {
          return (
            i(!this.red, 'Already a number in reduction context'),
            i(0 === this.negative, 'red works only with positives'),
            t.convertTo(this)._forceRed(t)
          )
        }),
        (n.prototype.fromRed = function () {
          return (
            i(this.red, 'fromRed works only with numbers in reduction context'),
            this.red.convertFrom(this)
          )
        }),
        (n.prototype._forceRed = function (t) {
          return (this.red = t), this
        }),
        (n.prototype.forceRed = function (t) {
          return (
            i(!this.red, 'Already a number in reduction context'),
            this._forceRed(t)
          )
        }),
        (n.prototype.redAdd = function (t) {
          return (
            i(this.red, 'redAdd works only with red numbers'),
            this.red.add(this, t)
          )
        }),
        (n.prototype.redIAdd = function (t) {
          return (
            i(this.red, 'redIAdd works only with red numbers'),
            this.red.iadd(this, t)
          )
        }),
        (n.prototype.redSub = function (t) {
          return (
            i(this.red, 'redSub works only with red numbers'),
            this.red.sub(this, t)
          )
        }),
        (n.prototype.redISub = function (t) {
          return (
            i(this.red, 'redISub works only with red numbers'),
            this.red.isub(this, t)
          )
        }),
        (n.prototype.redShl = function (t) {
          return (
            i(this.red, 'redShl works only with red numbers'),
            this.red.shl(this, t)
          )
        }),
        (n.prototype.redMul = function (t) {
          return (
            i(this.red, 'redMul works only with red numbers'),
            this.red._verify2(this, t),
            this.red.mul(this, t)
          )
        }),
        (n.prototype.redIMul = function (t) {
          return (
            i(this.red, 'redMul works only with red numbers'),
            this.red._verify2(this, t),
            this.red.imul(this, t)
          )
        }),
        (n.prototype.redSqr = function () {
          return (
            i(this.red, 'redSqr works only with red numbers'),
            this.red._verify1(this),
            this.red.sqr(this)
          )
        }),
        (n.prototype.redISqr = function () {
          return (
            i(this.red, 'redISqr works only with red numbers'),
            this.red._verify1(this),
            this.red.isqr(this)
          )
        }),
        (n.prototype.redSqrt = function () {
          return (
            i(this.red, 'redSqrt works only with red numbers'),
            this.red._verify1(this),
            this.red.sqrt(this)
          )
        }),
        (n.prototype.redInvm = function () {
          return (
            i(this.red, 'redInvm works only with red numbers'),
            this.red._verify1(this),
            this.red.invm(this)
          )
        }),
        (n.prototype.redNeg = function () {
          return (
            i(this.red, 'redNeg works only with red numbers'),
            this.red._verify1(this),
            this.red.neg(this)
          )
        }),
        (n.prototype.redPow = function (t) {
          return (
            i(this.red && !t.red, 'redPow(normalNum)'),
            this.red._verify1(this),
            this.red.pow(this, t)
          )
        })
      var w = { k256: null, p224: null, p192: null, p25519: null }
      function v(t, e) {
        ;(this.name = t),
          (this.p = new n(e, 16)),
          (this.n = this.p.bitLength()),
          (this.k = new n(1).iushln(this.n).isub(this.p)),
          (this.tmp = this._tmp())
      }
      function M() {
        v.call(
          this,
          'k256',
          'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
        )
      }
      function A() {
        v.call(
          this,
          'p224',
          'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
        )
      }
      function _() {
        v.call(
          this,
          'p192',
          'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
        )
      }
      function S() {
        v.call(
          this,
          '25519',
          '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
        )
      }
      function T(t) {
        if ('string' == typeof t) {
          var e = n._prime(t)
          ;(this.m = e.p), (this.prime = e)
        } else i(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null)
      }
      function x(t) {
        T.call(this, t),
          (this.shift = this.m.bitLength()),
          this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
          (this.r = new n(1).iushln(this.shift)),
          (this.r2 = this.imod(this.r.sqr())),
          (this.rinv = this.r._invmp(this.m)),
          (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
          (this.minv = this.minv.umod(this.r)),
          (this.minv = this.r.sub(this.minv))
      }
      ;(v.prototype._tmp = function () {
        var t = new n(null)
        return (t.words = new Array(Math.ceil(this.n / 13))), t
      }),
        (v.prototype.ireduce = function (t) {
          var e,
            i = t
          do {
            this.split(i, this.tmp),
              (e = (i = (i = this.imulK(i)).iadd(this.tmp)).bitLength())
          } while (e > this.n)
          var r = e < this.n ? -1 : i.ucmp(this.p)
          return (
            0 === r
              ? ((i.words[0] = 0), (i.length = 1))
              : r > 0
              ? i.isub(this.p)
              : void 0 !== i.strip
              ? i.strip()
              : i._strip(),
            i
          )
        }),
        (v.prototype.split = function (t, e) {
          t.iushrn(this.n, 0, e)
        }),
        (v.prototype.imulK = function (t) {
          return t.imul(this.k)
        }),
        r(M, v),
        (M.prototype.split = function (t, e) {
          for (var i = 4194303, r = Math.min(t.length, 9), n = 0; n < r; n++)
            e.words[n] = t.words[n]
          if (((e.length = r), t.length <= 9))
            return (t.words[0] = 0), void (t.length = 1)
          var s = t.words[9]
          for (e.words[e.length++] = s & i, n = 10; n < t.length; n++) {
            var a = 0 | t.words[n]
            ;(t.words[n - 10] = ((a & i) << 4) | (s >>> 22)), (s = a)
          }
          ;(t.words[n - 10] = s >>>= 22),
            (t.length -= 0 === s && t.length > 10 ? 10 : 9)
        }),
        (M.prototype.imulK = function (t) {
          ;(t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2)
          for (var e = 0, i = 0; i < t.length; i++) {
            var r = 0 | t.words[i]
            ;(t.words[i] = 67108863 & (e += 977 * r)),
              (e = 64 * r + ((e / 67108864) | 0))
          }
          return (
            0 === t.words[t.length - 1] &&
              (t.length--, 0 === t.words[t.length - 1] && t.length--),
            t
          )
        }),
        r(A, v),
        r(_, v),
        r(S, v),
        (S.prototype.imulK = function (t) {
          for (var e = 0, i = 0; i < t.length; i++) {
            var r = 19 * (0 | t.words[i]) + e,
              n = 67108863 & r
            ;(r >>>= 26), (t.words[i] = n), (e = r)
          }
          return 0 !== e && (t.words[t.length++] = e), t
        }),
        (n._prime = function (t) {
          if (w[t]) return w[t]
          var e
          if ('k256' === t) e = new M()
          else if ('p224' === t) e = new A()
          else if ('p192' === t) e = new _()
          else {
            if ('p25519' !== t) throw new Error('Unknown prime ' + t)
            e = new S()
          }
          return (w[t] = e), e
        }),
        (T.prototype._verify1 = function (t) {
          i(0 === t.negative, 'red works only with positives'),
            i(t.red, 'red works only with red numbers')
        }),
        (T.prototype._verify2 = function (t, e) {
          i(0 == (t.negative | e.negative), 'red works only with positives'),
            i(t.red && t.red === e.red, 'red works only with red numbers')
        }),
        (T.prototype.imod = function (t) {
          return this.prime
            ? this.prime.ireduce(t)._forceRed(this)
            : (d(t, t.umod(this.m)._forceRed(this)), t)
        }),
        (T.prototype.neg = function (t) {
          return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
        }),
        (T.prototype.add = function (t, e) {
          this._verify2(t, e)
          var i = t.add(e)
          return i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this)
        }),
        (T.prototype.iadd = function (t, e) {
          this._verify2(t, e)
          var i = t.iadd(e)
          return i.cmp(this.m) >= 0 && i.isub(this.m), i
        }),
        (T.prototype.sub = function (t, e) {
          this._verify2(t, e)
          var i = t.sub(e)
          return i.cmpn(0) < 0 && i.iadd(this.m), i._forceRed(this)
        }),
        (T.prototype.isub = function (t, e) {
          this._verify2(t, e)
          var i = t.isub(e)
          return i.cmpn(0) < 0 && i.iadd(this.m), i
        }),
        (T.prototype.shl = function (t, e) {
          return this._verify1(t), this.imod(t.ushln(e))
        }),
        (T.prototype.imul = function (t, e) {
          return this._verify2(t, e), this.imod(t.imul(e))
        }),
        (T.prototype.mul = function (t, e) {
          return this._verify2(t, e), this.imod(t.mul(e))
        }),
        (T.prototype.isqr = function (t) {
          return this.imul(t, t.clone())
        }),
        (T.prototype.sqr = function (t) {
          return this.mul(t, t)
        }),
        (T.prototype.sqrt = function (t) {
          if (t.isZero()) return t.clone()
          var e = this.m.andln(3)
          if ((i(e % 2 == 1), 3 === e)) {
            var r = this.m.add(new n(1)).iushrn(2)
            return this.pow(t, r)
          }
          for (var s = this.m.subn(1), a = 0; !s.isZero() && 0 === s.andln(1); )
            a++, s.iushrn(1)
          i(!s.isZero())
          var o = new n(1).toRed(this),
            u = o.redNeg(),
            h = this.m.subn(1).iushrn(1),
            d = this.m.bitLength()
          for (d = new n(2 * d * d).toRed(this); 0 !== this.pow(d, h).cmp(u); )
            d.redIAdd(u)
          for (
            var l = this.pow(d, s),
              f = this.pow(t, s.addn(1).iushrn(1)),
              c = this.pow(t, s),
              p = a;
            0 !== c.cmp(o);

          ) {
            for (var m = c, g = 0; 0 !== m.cmp(o); g++) m = m.redSqr()
            i(g < p)
            var y = this.pow(l, new n(1).iushln(p - g - 1))
            ;(f = f.redMul(y)), (l = y.redSqr()), (c = c.redMul(l)), (p = g)
          }
          return f
        }),
        (T.prototype.invm = function (t) {
          var e = t._invmp(this.m)
          return 0 !== e.negative
            ? ((e.negative = 0), this.imod(e).redNeg())
            : this.imod(e)
        }),
        (T.prototype.pow = function (t, e) {
          if (e.isZero()) return new n(1).toRed(this)
          if (0 === e.cmpn(1)) return t.clone()
          var i = new Array(16)
          ;(i[0] = new n(1).toRed(this)), (i[1] = t)
          for (var r = 2; r < i.length; r++) i[r] = this.mul(i[r - 1], t)
          var s = i[0],
            a = 0,
            o = 0,
            u = e.bitLength() % 26
          for (0 === u && (u = 26), r = e.length - 1; r >= 0; r--) {
            for (var h = e.words[r], d = u - 1; d >= 0; d--) {
              var l = (h >> d) & 1
              s !== i[0] && (s = this.sqr(s)),
                0 !== l || 0 !== a
                  ? ((a <<= 1),
                    (a |= l),
                    (4 == ++o || (0 === r && 0 === d)) &&
                      ((s = this.mul(s, i[a])), (o = 0), (a = 0)))
                  : (o = 0)
            }
            u = 26
          }
          return s
        }),
        (T.prototype.convertTo = function (t) {
          var e = t.umod(this.m)
          return e === t ? e.clone() : e
        }),
        (T.prototype.convertFrom = function (t) {
          var e = t.clone()
          return (e.red = null), e
        }),
        (n.mont = function (t) {
          return new x(t)
        }),
        r(x, T),
        (x.prototype.convertTo = function (t) {
          return this.imod(t.ushln(this.shift))
        }),
        (x.prototype.convertFrom = function (t) {
          var e = this.imod(t.mul(this.rinv))
          return (e.red = null), e
        }),
        (x.prototype.imul = function (t, e) {
          if (t.isZero() || e.isZero())
            return (t.words[0] = 0), (t.length = 1), t
          var i = t.imul(e),
            r = i
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m),
            n = i.isub(r).iushrn(this.shift),
            s = n
          return (
            n.cmp(this.m) >= 0
              ? (s = n.isub(this.m))
              : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
            s._forceRed(this)
          )
        }),
        (x.prototype.mul = function (t, e) {
          if (t.isZero() || e.isZero()) return new n(0)._forceRed(this)
          var i = t.mul(e),
            r = i
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m),
            s = i.isub(r).iushrn(this.shift),
            a = s
          return (
            s.cmp(this.m) >= 0
              ? (a = s.isub(this.m))
              : s.cmpn(0) < 0 && (a = s.iadd(this.m)),
            a._forceRed(this)
          )
        }),
        (x.prototype.invm = function (t) {
          return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
        })
    })(t, bt)
  }),
  Nt = wt(function (t, e) {
    var i =
      (bt && bt.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      }
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.getLength = e.decode = e.encode = void 0)
    const r = i(Ct)
    function n(t, e) {
      if ('0' === t[0] && '0' === t[1])
        throw new Error('invalid RLP: extra zeros')
      return parseInt(t, e)
    }
    function s(t, e) {
      if (t < 56) return Buffer.from([t + e])
      {
        const i = u(t),
          r = u(e + 55 + i.length / 2)
        return Buffer.from(r + i, 'hex')
      }
    }
    function a(t) {
      let e, i, r, s, o
      const u = [],
        h = t[0]
      if (h <= 127) return { data: t.slice(0, 1), remainder: t.slice(1) }
      if (h <= 183) {
        if (
          ((e = h - 127),
          (r = 128 === h ? Buffer.from([]) : t.slice(1, e)),
          2 === e && r[0] < 128)
        )
          throw new Error('invalid rlp encoding: byte must be less 0x80')
        return { data: r, remainder: t.slice(e) }
      }
      if (h <= 191) {
        if (((i = h - 182), t.length - 1 < i))
          throw new Error('invalid RLP: not enough bytes for string length')
        if (((e = n(t.slice(1, i).toString('hex'), 16)), e <= 55))
          throw new Error(
            'invalid RLP: expected string length to be greater than 55'
          )
        if (((r = t.slice(i, e + i)), r.length < e))
          throw new Error('invalid RLP: not enough bytes for string')
        return { data: r, remainder: t.slice(e + i) }
      }
      if (h <= 247) {
        for (e = h - 191, s = t.slice(1, e); s.length; )
          (o = a(s)), u.push(o.data), (s = o.remainder)
        return { data: u, remainder: t.slice(e) }
      }
      {
        ;(i = h - 246), (e = n(t.slice(1, i).toString('hex'), 16))
        const r = i + e
        if (r > t.length)
          throw new Error('invalid rlp: total length is larger than the data')
        if (((s = t.slice(i, r)), 0 === s.length))
          throw new Error('invalid rlp, List has a invalid length')
        for (; s.length; ) (o = a(s)), u.push(o.data), (s = o.remainder)
        return { data: u, remainder: t.slice(r) }
      }
    }
    function o(t) {
      return '0x' === t.slice(0, 2)
    }
    function u(t) {
      if (t < 0)
        throw new Error('Invalid integer as argument, must be unsigned!')
      const e = t.toString(16)
      return e.length % 2 ? `0${e}` : e
    }
    function h(t) {
      if (!Buffer.isBuffer(t)) {
        if ('string' == typeof t)
          return o(t)
            ? Buffer.from(
                (e = 'string' != typeof (i = t) ? i : o(i) ? i.slice(2) : i)
                  .length % 2
                  ? `0${e}`
                  : e,
                'hex'
              )
            : Buffer.from(t)
        if ('number' == typeof t || 'bigint' == typeof t)
          return t
            ? (function (t) {
                const e = u(t)
                return Buffer.from(e, 'hex')
              })(t)
            : Buffer.from([])
        if (null == t) return Buffer.from([])
        if (t instanceof Uint8Array) return Buffer.from(t)
        if (r.default.isBN(t)) return Buffer.from(t.toArray())
        throw new Error('invalid type')
      }
      var e, i
      return t
    }
    ;(e.encode = function t(e) {
      if (Array.isArray(e)) {
        const i = []
        for (let r = 0; r < e.length; r++) i.push(t(e[r]))
        const r = Buffer.concat(i)
        return Buffer.concat([s(r.length, 192), r])
      }
      {
        const t = h(e)
        return 1 === t.length && t[0] < 128
          ? t
          : Buffer.concat([s(t.length, 128), t])
      }
    }),
      (e.decode = function (t, e = !1) {
        if (!t || 0 === t.length) return Buffer.from([])
        const i = a(h(t))
        if (e) return i
        if (0 !== i.remainder.length) throw new Error('invalid remainder')
        return i.data
      }),
      (e.getLength = function (t) {
        if (!t || 0 === t.length) return Buffer.from([])
        const e = h(t),
          i = e[0]
        if (i <= 127) return e.length
        if (i <= 183) return i - 127
        if (i <= 191) return i - 182
        if (i <= 247) return i - 191
        {
          const t = i - 246
          return t + n(e.slice(1, t).toString('hex'), 16)
        }
      })
  }),
  Lt = wt(function (t, e) {
    var i =
        (bt && bt.__createBinding) ||
        (Object.create
          ? function (t, e, i, r) {
              void 0 === r && (r = i),
                Object.defineProperty(t, r, {
                  enumerable: !0,
                  get: function () {
                    return e[i]
                  }
                })
            }
          : function (t, e, i, r) {
              void 0 === r && (r = i), (t[r] = e[i])
            }),
      r =
        (bt && bt.__setModuleDefault) ||
        (Object.create
          ? function (t, e) {
              Object.defineProperty(t, 'default', { enumerable: !0, value: e })
            }
          : function (t, e) {
              t.default = e
            }),
      n =
        (bt && bt.__importStar) ||
        function (t) {
          if (t && t.__esModule) return t
          var e = {}
          if (null != t)
            for (var n in t)
              'default' !== n &&
                Object.prototype.hasOwnProperty.call(t, n) &&
                i(e, t, n)
          return r(e, t), e
        },
      s =
        (bt && bt.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t }
        }
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.rlp = e.BN = void 0)
    const a = s(Pt)
    e.BN = a.default
    const o = n(Nt)
    e.rlp = o
  }),
  Dt = wt(function (t, e) {
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.KECCAK256_RLP =
        e.KECCAK256_RLP_S =
        e.KECCAK256_RLP_ARRAY =
        e.KECCAK256_RLP_ARRAY_S =
        e.KECCAK256_NULL =
        e.KECCAK256_NULL_S =
        e.TWO_POW256 =
        e.MAX_INTEGER =
        e.MAX_UINT64 =
          void 0),
      (e.MAX_UINT64 = new Lt.BN('ffffffffffffffff', 16)),
      (e.MAX_INTEGER = new Lt.BN(
        'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        16
      )),
      (e.TWO_POW256 = new Lt.BN(
        '10000000000000000000000000000000000000000000000000000000000000000',
        16
      )),
      (e.KECCAK256_NULL_S =
        'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'),
      (e.KECCAK256_NULL = o.Buffer.from(e.KECCAK256_NULL_S, 'hex')),
      (e.KECCAK256_RLP_ARRAY_S =
        '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'),
      (e.KECCAK256_RLP_ARRAY = o.Buffer.from(e.KECCAK256_RLP_ARRAY_S, 'hex')),
      (e.KECCAK256_RLP_S =
        '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421'),
      (e.KECCAK256_RLP = o.Buffer.from(e.KECCAK256_RLP_S, 'hex'))
  }),
  Ft = 'function' == typeof __webpack_require__ ? __non_webpack_require__ : vt,
  Ut = (process.config && process.config.variables) || {},
  qt = !!process.env.PREBUILDS_ONLY,
  jt = process.versions.modules,
  zt =
    (process.versions && process.versions.electron) ||
    process.env.ELECTRON_RUN_AS_NODE ||
    ('undefined' != typeof window &&
      window.process &&
      'renderer' === window.process.type)
      ? 'electron'
      : 'node',
  Wt = p.arch(),
  $t = p.platform(),
  Ht =
    process.env.LIBC ||
    ((function (t) {
      return 'linux' === t && i.existsSync('/etc/alpine-release')
    })($t)
      ? 'musl'
      : 'glibc'),
  Gt = process.env.ARM_VERSION || ('arm64' === Wt ? '8' : Ut.arm_version) || '',
  Zt = (process.versions.uv || '').split('.')[0],
  Kt = Vt
function Vt(t) {
  return Ft(Vt.path(t))
}
function Jt(t) {
  try {
    return i.readdirSync(t)
  } catch (t) {
    return []
  }
}
function Xt(t, e) {
  var i = Jt(t).filter(e)
  return i[0] && c.join(t, i[0])
}
function Yt(t) {
  return /\.node$/.test(t)
}
function Qt(t) {
  var e = t.split('-')
  if (2 === e.length) {
    var i = e[0],
      r = e[1].split('+')
    if (i && r.length && r.every(Boolean))
      return { name: t, platform: i, architectures: r }
  }
}
function te(t, e) {
  return function (i) {
    return null != i && i.platform === t && i.architectures.includes(e)
  }
}
function ee(t, e) {
  return t.architectures.length - e.architectures.length
}
function ie(t) {
  var e = t.split('.'),
    i = { file: t, specificity: 0 }
  if ('node' === e.pop()) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r]
      if ('node' === n || 'electron' === n || 'node-webkit' === n) i.runtime = n
      else if ('napi' === n) i.napi = !0
      else if ('abi' === n.slice(0, 3)) i.abi = n.slice(3)
      else if ('uv' === n.slice(0, 2)) i.uv = n.slice(2)
      else if ('armv' === n.slice(0, 4)) i.armv = n.slice(4)
      else {
        if ('glibc' !== n && 'musl' !== n) continue
        i.libc = n
      }
      i.specificity++
    }
    return i
  }
}
function re(t, e) {
  return function (i) {
    return !(
      null == i ||
      (i.runtime !== t &&
        !(function (t) {
          return 'node' === t.runtime && t.napi
        })(i)) ||
      (i.abi !== e && !i.napi) ||
      (i.uv && i.uv !== Zt) ||
      (i.armv && i.armv !== Gt) ||
      (i.libc && i.libc !== Ht)
    )
  }
}
function ne(t) {
  return function (e, i) {
    return e.runtime !== i.runtime
      ? e.runtime === t
        ? -1
        : 1
      : e.abi !== i.abi
      ? e.abi
        ? -1
        : 1
      : e.specificity !== i.specificity
      ? e.specificity > i.specificity
        ? -1
        : 1
      : 0
  }
}
;(Vt.path = function (t) {
  t = c.resolve(t || '.')
  try {
    var e = Ft(c.join(t, 'package.json')).name.toUpperCase().replace(/-/g, '_')
    process.env[e + '_PREBUILD'] && (t = process.env[e + '_PREBUILD'])
  } catch (t) {}
  if (!qt) {
    var i = Xt(c.join(t, 'build/Release'), Yt)
    if (i) return i
    var r = Xt(c.join(t, 'build/Debug'), Yt)
    if (r) return r
  }
  var n = o(t)
  if (n) return n
  var s = o(c.dirname(process.execPath))
  if (s) return s
  var a = [
    'platform=' + $t,
    'arch=' + Wt,
    'runtime=' + zt,
    'abi=' + jt,
    'uv=' + Zt,
    Gt ? 'armv=' + Gt : '',
    'libc=' + Ht,
    'node=' + process.versions.node,
    process.versions.electron ? 'electron=' + process.versions.electron : '',
    'function' == typeof __webpack_require__ ? 'webpack=true' : ''
  ]
    .filter(Boolean)
    .join(' ')
  throw new Error(
    'No native build was found for ' + a + '\n    loaded from: ' + t + '\n'
  )
  function o(t) {
    var e = Jt(c.join(t, 'prebuilds')).map(Qt).filter(te($t, Wt)).sort(ee)[0]
    if (e) {
      var i = c.join(t, 'prebuilds', e.name),
        r = Jt(i).map(ie).filter(re(zt, jt)).sort(ne(zt))[0]
      return r ? c.join(i, r.file) : void 0
    }
  }
}),
  (Vt.parseTags = ie),
  (Vt.matchTags = re),
  (Vt.compareTags = ne),
  (Vt.parseTuple = Qt),
  (Vt.matchTuple = te),
  (Vt.compareTuples = ee)
const se = 'Impossible case. Please create issue.',
  ae = 'The tweak was out of range or the resulted private key is invalid',
  oe = 'Public Key could not be parsed',
  ue = 'Signature could not be parsed'
function he(t, e) {
  if (!t) throw new Error(e)
}
function de(t, e, i) {
  if (
    (he(e instanceof Uint8Array, `Expected ${t} to be an Uint8Array`),
    void 0 !== i)
  )
    if (Array.isArray(i)) {
      const r = `Expected ${t} to be an Uint8Array with length [${i.join(
        ', '
      )}]`
      he(i.includes(e.length), r)
    } else
      he(e.length === i, `Expected ${t} to be an Uint8Array with length ${i}`)
}
function le(t) {
  he('Boolean' === ce(t), 'Expected compressed to be a Boolean')
}
function fe(t = (t) => new Uint8Array(t), e) {
  return 'function' == typeof t && (t = t(e)), de('output', t, e), t
}
function ce(t) {
  return Object.prototype.toString.call(t).slice(8, -1)
}
var pe = (t) => ({
    contextRandomize(e) {
      if (
        (he(
          null === e || e instanceof Uint8Array,
          'Expected seed to be an Uint8Array or null'
        ),
        null !== e && de('seed', e, 32),
        1 === t.contextRandomize(e))
      )
        throw new Error('Unknow error on context randomization')
    },
    privateKeyVerify: (e) => (
      de('private key', e, 32), 0 === t.privateKeyVerify(e)
    ),
    privateKeyNegate(e) {
      switch ((de('private key', e, 32), t.privateKeyNegate(e))) {
        case 0:
          return e
        case 1:
          throw new Error(se)
      }
    },
    privateKeyTweakAdd(e, i) {
      switch (
        (de('private key', e, 32),
        de('tweak', i, 32),
        t.privateKeyTweakAdd(e, i))
      ) {
        case 0:
          return e
        case 1:
          throw new Error(ae)
      }
    },
    privateKeyTweakMul(e, i) {
      switch (
        (de('private key', e, 32),
        de('tweak', i, 32),
        t.privateKeyTweakMul(e, i))
      ) {
        case 0:
          return e
        case 1:
          throw new Error('The tweak was out of range or equal to zero')
      }
    },
    publicKeyVerify: (e) => (
      de('public key', e, [33, 65]), 0 === t.publicKeyVerify(e)
    ),
    publicKeyCreate(e, i = !0, r) {
      switch (
        (de('private key', e, 32),
        le(i),
        (r = fe(r, i ? 33 : 65)),
        t.publicKeyCreate(r, e))
      ) {
        case 0:
          return r
        case 1:
          throw new Error('Private Key is invalid')
        case 2:
          throw new Error('Public Key serialization error')
      }
    },
    publicKeyConvert(e, i = !0, r) {
      switch (
        (de('public key', e, [33, 65]),
        le(i),
        (r = fe(r, i ? 33 : 65)),
        t.publicKeyConvert(r, e))
      ) {
        case 0:
          return r
        case 1:
          throw new Error(oe)
        case 2:
          throw new Error('Public Key serialization error')
      }
    },
    publicKeyNegate(e, i = !0, r) {
      switch (
        (de('public key', e, [33, 65]),
        le(i),
        (r = fe(r, i ? 33 : 65)),
        t.publicKeyNegate(r, e))
      ) {
        case 0:
          return r
        case 1:
          throw new Error(oe)
        case 2:
          throw new Error(se)
        case 3:
          throw new Error('Public Key serialization error')
      }
    },
    publicKeyCombine(e, i = !0, r) {
      he(Array.isArray(e), 'Expected public keys to be an Array'),
        he(
          e.length > 0,
          'Expected public keys array will have more than zero items'
        )
      for (const t of e) de('public key', t, [33, 65])
      switch ((le(i), (r = fe(r, i ? 33 : 65)), t.publicKeyCombine(r, e))) {
        case 0:
          return r
        case 1:
          throw new Error(oe)
        case 2:
          throw new Error('The sum of the public keys is not valid')
        case 3:
          throw new Error('Public Key serialization error')
      }
    },
    publicKeyTweakAdd(e, i, r = !0, n) {
      switch (
        (de('public key', e, [33, 65]),
        de('tweak', i, 32),
        le(r),
        (n = fe(n, r ? 33 : 65)),
        t.publicKeyTweakAdd(n, e, i))
      ) {
        case 0:
          return n
        case 1:
          throw new Error(oe)
        case 2:
          throw new Error(ae)
      }
    },
    publicKeyTweakMul(e, i, r = !0, n) {
      switch (
        (de('public key', e, [33, 65]),
        de('tweak', i, 32),
        le(r),
        (n = fe(n, r ? 33 : 65)),
        t.publicKeyTweakMul(n, e, i))
      ) {
        case 0:
          return n
        case 1:
          throw new Error(oe)
        case 2:
          throw new Error('The tweak was out of range or equal to zero')
      }
    },
    signatureNormalize(e) {
      switch ((de('signature', e, 64), t.signatureNormalize(e))) {
        case 0:
          return e
        case 1:
          throw new Error(ue)
      }
    },
    signatureExport(e, i) {
      de('signature', e, 64)
      const r = { output: (i = fe(i, 72)), outputlen: 72 }
      switch (t.signatureExport(r, e)) {
        case 0:
          return i.slice(0, r.outputlen)
        case 1:
          throw new Error(ue)
        case 2:
          throw new Error(se)
      }
    },
    signatureImport(e, i) {
      switch ((de('signature', e), (i = fe(i, 64)), t.signatureImport(i, e))) {
        case 0:
          return i
        case 1:
          throw new Error(ue)
        case 2:
          throw new Error(se)
      }
    },
    ecdsaSign(e, i, r = {}, n) {
      de('message', e, 32),
        de('private key', i, 32),
        he('Object' === ce(r), 'Expected options to be an Object'),
        void 0 !== r.data && de('options.data', r.data),
        void 0 !== r.noncefn &&
          he(
            'Function' === ce(r.noncefn),
            'Expected options.noncefn to be a Function'
          )
      const s = { signature: (n = fe(n, 64)), recid: null }
      switch (t.ecdsaSign(s, e, i, r.data, r.noncefn)) {
        case 0:
          return s
        case 1:
          throw new Error(
            'The nonce generation function failed, or the private key was invalid'
          )
        case 2:
          throw new Error(se)
      }
    },
    ecdsaVerify(e, i, r) {
      switch (
        (de('signature', e, 64),
        de('message', i, 32),
        de('public key', r, [33, 65]),
        t.ecdsaVerify(e, i, r))
      ) {
        case 0:
          return !0
        case 3:
          return !1
        case 1:
          throw new Error(ue)
        case 2:
          throw new Error(oe)
      }
    },
    ecdsaRecover(e, i, r, n = !0, s) {
      switch (
        (de('signature', e, 64),
        he(
          'Number' === ce(i) && i >= 0 && i <= 3,
          'Expected recovery id to be a Number within interval [0, 3]'
        ),
        de('message', r, 32),
        le(n),
        (s = fe(s, n ? 33 : 65)),
        t.ecdsaRecover(s, e, i, r))
      ) {
        case 0:
          return s
        case 1:
          throw new Error(ue)
        case 2:
          throw new Error('Public key could not be recover')
        case 3:
          throw new Error(se)
      }
    },
    ecdh(e, i, r = {}, n) {
      switch (
        (de('public key', e, [33, 65]),
        de('private key', i, 32),
        he('Object' === ce(r), 'Expected options to be an Object'),
        void 0 !== r.data && de('options.data', r.data),
        void 0 !== r.hashfn
          ? (he(
              'Function' === ce(r.hashfn),
              'Expected options.hashfn to be a Function'
            ),
            void 0 !== r.xbuf && de('options.xbuf', r.xbuf, 32),
            void 0 !== r.ybuf && de('options.ybuf', r.ybuf, 32),
            de('output', n))
          : (n = fe(n, 32)),
        t.ecdh(n, e, i, r.data, r.hashfn, r.xbuf, r.ybuf))
      ) {
        case 0:
          return n
        case 1:
          throw new Error(oe)
        case 2:
          throw new Error('Scalar was invalid (zero or overflow)')
      }
    }
  }),
  me = pe(new (Kt(__dirname).Secp256k1)()),
  ge = ye
function ye(t, e) {
  if (!t) throw new Error(e || 'Assertion failed')
}
ye.equal = function (t, e, i) {
  if (t != e) throw new Error(i || 'Assertion failed: ' + t + ' != ' + e)
}
var be,
  we = wt(function (t, e) {
    var i = e
    function r(t) {
      return 1 === t.length ? '0' + t : t
    }
    function n(t) {
      for (var e = '', i = 0; i < t.length; i++) e += r(t[i].toString(16))
      return e
    }
    ;(i.toArray = function (t, e) {
      if (Array.isArray(t)) return t.slice()
      if (!t) return []
      var i = []
      if ('string' != typeof t) {
        for (var r = 0; r < t.length; r++) i[r] = 0 | t[r]
        return i
      }
      if ('hex' === e)
        for (
          (t = t.replace(/[^a-z0-9]+/gi, '')).length % 2 != 0 && (t = '0' + t),
            r = 0;
          r < t.length;
          r += 2
        )
          i.push(parseInt(t[r] + t[r + 1], 16))
      else
        for (r = 0; r < t.length; r++) {
          var n = t.charCodeAt(r),
            s = n >> 8,
            a = 255 & n
          s ? i.push(s, a) : i.push(a)
        }
      return i
    }),
      (i.zero2 = r),
      (i.toHex = n),
      (i.encode = function (t, e) {
        return 'hex' === e ? n(t) : t
      })
  }),
  ve = wt(function (t, e) {
    var i = e
    ;(i.assert = ge),
      (i.toArray = we.toArray),
      (i.zero2 = we.zero2),
      (i.toHex = we.toHex),
      (i.encode = we.encode),
      (i.getNAF = function (t, e, i) {
        var r = new Array(Math.max(t.bitLength(), i) + 1)
        r.fill(0)
        for (var n = 1 << (e + 1), s = t.clone(), a = 0; a < r.length; a++) {
          var o,
            u = s.andln(n - 1)
          s.isOdd()
            ? s.isubn((o = u > (n >> 1) - 1 ? (n >> 1) - u : u))
            : (o = 0),
            (r[a] = o),
            s.iushrn(1)
        }
        return r
      }),
      (i.getJSF = function (t, e) {
        var i = [[], []]
        ;(t = t.clone()), (e = e.clone())
        for (var r, n = 0, s = 0; t.cmpn(-n) > 0 || e.cmpn(-s) > 0; ) {
          var a,
            o,
            u = (t.andln(3) + n) & 3,
            h = (e.andln(3) + s) & 3
          3 === u && (u = -1),
            3 === h && (h = -1),
            (a =
              0 == (1 & u)
                ? 0
                : (3 != (r = (t.andln(7) + n) & 7) && 5 !== r) || 2 !== h
                ? u
                : -u),
            i[0].push(a),
            (o =
              0 == (1 & h)
                ? 0
                : (3 != (r = (e.andln(7) + s) & 7) && 5 !== r) || 2 !== u
                ? h
                : -h),
            i[1].push(o),
            2 * n === a + 1 && (n = 1 - n),
            2 * s === o + 1 && (s = 1 - s),
            t.iushrn(1),
            e.iushrn(1)
        }
        return i
      }),
      (i.cachedProperty = function (t, e, i) {
        var r = '_' + e
        t.prototype[e] = function () {
          return void 0 !== this[r] ? this[r] : (this[r] = i.call(this))
        }
      }),
      (i.parseBytes = function (t) {
        return 'string' == typeof t ? i.toArray(t, 'hex') : t
      }),
      (i.intFromLE = function (t) {
        return new Bt(t, 'hex', 'le')
      })
  }),
  Me = function (t) {
    return be || (be = new Ae(null)), be.generate(t)
  }
function Ae(t) {
  this.rand = t
}
var _e = Ae
if (
  ((Ae.prototype.generate = function (t) {
    return this._rand(t)
  }),
  (Ae.prototype._rand = function (t) {
    if (this.rand.getBytes) return this.rand.getBytes(t)
    for (var e = new Uint8Array(t), i = 0; i < e.length; i++)
      e[i] = this.rand.getByte()
    return e
  }),
  'object' == typeof self)
)
  self.crypto && self.crypto.getRandomValues
    ? (Ae.prototype._rand = function (t) {
        var e = new Uint8Array(t)
        return self.crypto.getRandomValues(e), e
      })
    : self.msCrypto && self.msCrypto.getRandomValues
    ? (Ae.prototype._rand = function (t) {
        var e = new Uint8Array(t)
        return self.msCrypto.getRandomValues(e), e
      })
    : 'object' == typeof window &&
      (Ae.prototype._rand = function () {
        throw new Error('Not implemented yet')
      })
else
  try {
    var Se = h
    if ('function' != typeof Se.randomBytes) throw new Error('Not supported')
    Ae.prototype._rand = function (t) {
      return Se.randomBytes(t)
    }
  } catch (t) {}
Me.Rand = _e
var Te = ve.getNAF,
  xe = ve.getJSF,
  Ee = ve.assert
function Re(t, e) {
  ;(this.type = t),
    (this.p = new Bt(e.p, 16)),
    (this.red = e.prime ? Bt.red(e.prime) : Bt.mont(this.p)),
    (this.zero = new Bt(0).toRed(this.red)),
    (this.one = new Bt(1).toRed(this.red)),
    (this.two = new Bt(2).toRed(this.red)),
    (this.n = e.n && new Bt(e.n, 16)),
    (this.g = e.g && this.pointFromJSON(e.g, e.gRed)),
    (this._wnafT1 = new Array(4)),
    (this._wnafT2 = new Array(4)),
    (this._wnafT3 = new Array(4)),
    (this._wnafT4 = new Array(4)),
    (this._bitLength = this.n ? this.n.bitLength() : 0)
  var i = this.n && this.p.div(this.n)
  !i || i.cmpn(100) > 0
    ? (this.redN = null)
    : ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)))
}
var ke = Re
function Ie(t, e) {
  ;(this.curve = t), (this.type = e), (this.precomputed = null)
}
;(Re.prototype.point = function () {
  throw new Error('Not implemented')
}),
  (Re.prototype.validate = function () {
    throw new Error('Not implemented')
  }),
  (Re.prototype._fixedNafMul = function (t, e) {
    Ee(t.precomputed)
    var i = t._getDoubles(),
      r = Te(e, 1, this._bitLength),
      n = (1 << (i.step + 1)) - (i.step % 2 == 0 ? 2 : 1)
    n /= 3
    var s,
      a,
      o = []
    for (s = 0; s < r.length; s += i.step) {
      a = 0
      for (var u = s + i.step - 1; u >= s; u--) a = (a << 1) + r[u]
      o.push(a)
    }
    for (
      var h = this.jpoint(null, null, null),
        d = this.jpoint(null, null, null),
        l = n;
      l > 0;
      l--
    ) {
      for (s = 0; s < o.length; s++)
        (a = o[s]) === l
          ? (d = d.mixedAdd(i.points[s]))
          : a === -l && (d = d.mixedAdd(i.points[s].neg()))
      h = h.add(d)
    }
    return h.toP()
  }),
  (Re.prototype._wnafMul = function (t, e) {
    for (
      var i = 4,
        r = t._getNAFPoints(i),
        n = r.points,
        s = Te(e, (i = r.wnd), this._bitLength),
        a = this.jpoint(null, null, null),
        o = s.length - 1;
      o >= 0;
      o--
    ) {
      for (var u = 0; o >= 0 && 0 === s[o]; o--) u++
      if ((o >= 0 && u++, (a = a.dblp(u)), o < 0)) break
      var h = s[o]
      Ee(0 !== h),
        (a =
          'affine' === t.type
            ? a.mixedAdd(h > 0 ? n[(h - 1) >> 1] : n[(-h - 1) >> 1].neg())
            : a.add(h > 0 ? n[(h - 1) >> 1] : n[(-h - 1) >> 1].neg()))
    }
    return 'affine' === t.type ? a.toP() : a
  }),
  (Re.prototype._wnafMulAdd = function (t, e, i, r, n) {
    var s,
      a,
      o,
      u = this._wnafT1,
      h = this._wnafT2,
      d = this._wnafT3,
      l = 0
    for (s = 0; s < r; s++) {
      var f = (o = e[s])._getNAFPoints(t)
      ;(u[s] = f.wnd), (h[s] = f.points)
    }
    for (s = r - 1; s >= 1; s -= 2) {
      var c = s - 1,
        p = s
      if (1 === u[c] && 1 === u[p]) {
        var m = [e[c], null, null, e[p]]
        0 === e[c].y.cmp(e[p].y)
          ? ((m[1] = e[c].add(e[p])), (m[2] = e[c].toJ().mixedAdd(e[p].neg())))
          : 0 === e[c].y.cmp(e[p].y.redNeg())
          ? ((m[1] = e[c].toJ().mixedAdd(e[p])), (m[2] = e[c].add(e[p].neg())))
          : ((m[1] = e[c].toJ().mixedAdd(e[p])),
            (m[2] = e[c].toJ().mixedAdd(e[p].neg())))
        var g = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
          y = xe(i[c], i[p])
        for (
          l = Math.max(y[0].length, l),
            d[c] = new Array(l),
            d[p] = new Array(l),
            a = 0;
          a < l;
          a++
        )
          (d[c][a] = g[3 * (1 + (0 | y[0][a])) + (1 + (0 | y[1][a]))]),
            (d[p][a] = 0),
            (h[c] = m)
      } else
        (d[c] = Te(i[c], u[c], this._bitLength)),
          (d[p] = Te(i[p], u[p], this._bitLength)),
          (l = Math.max(d[c].length, l)),
          (l = Math.max(d[p].length, l))
    }
    var b = this.jpoint(null, null, null),
      w = this._wnafT4
    for (s = l; s >= 0; s--) {
      for (var v = 0; s >= 0; ) {
        var M = !0
        for (a = 0; a < r; a++) (w[a] = 0 | d[a][s]), 0 !== w[a] && (M = !1)
        if (!M) break
        v++, s--
      }
      if ((s >= 0 && v++, (b = b.dblp(v)), s < 0)) break
      for (a = 0; a < r; a++) {
        var A = w[a]
        0 !== A &&
          (A > 0
            ? (o = h[a][(A - 1) >> 1])
            : A < 0 && (o = h[a][(-A - 1) >> 1].neg()),
          (b = 'affine' === o.type ? b.mixedAdd(o) : b.add(o)))
      }
    }
    for (s = 0; s < r; s++) h[s] = null
    return n ? b : b.toP()
  }),
  (Re.BasePoint = Ie),
  (Ie.prototype.eq = function () {
    throw new Error('Not implemented')
  }),
  (Ie.prototype.validate = function () {
    return this.curve.validate(this)
  }),
  (Re.prototype.decodePoint = function (t, e) {
    t = ve.toArray(t, e)
    var i = this.p.byteLength()
    if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * i)
      return (
        6 === t[0]
          ? Ee(t[t.length - 1] % 2 == 0)
          : 7 === t[0] && Ee(t[t.length - 1] % 2 == 1),
        this.point(t.slice(1, 1 + i), t.slice(1 + i, 1 + 2 * i))
      )
    if ((2 === t[0] || 3 === t[0]) && t.length - 1 === i)
      return this.pointFromX(t.slice(1, 1 + i), 3 === t[0])
    throw new Error('Unknown point format')
  }),
  (Ie.prototype.encodeCompressed = function (t) {
    return this.encode(t, !0)
  }),
  (Ie.prototype._encode = function (t) {
    var e = this.curve.p.byteLength(),
      i = this.getX().toArray('be', e)
    return t
      ? [this.getY().isEven() ? 2 : 3].concat(i)
      : [4].concat(i, this.getY().toArray('be', e))
  }),
  (Ie.prototype.encode = function (t, e) {
    return ve.encode(this._encode(e), t)
  }),
  (Ie.prototype.precompute = function (t) {
    if (this.precomputed) return this
    var e = { doubles: null, naf: null, beta: null }
    return (
      (e.naf = this._getNAFPoints(8)),
      (e.doubles = this._getDoubles(4, t)),
      (e.beta = this._getBeta()),
      (this.precomputed = e),
      this
    )
  }),
  (Ie.prototype._hasDoubles = function (t) {
    if (!this.precomputed) return !1
    var e = this.precomputed.doubles
    return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
  }),
  (Ie.prototype._getDoubles = function (t, e) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles
    for (var i = [this], r = this, n = 0; n < e; n += t) {
      for (var s = 0; s < t; s++) r = r.dbl()
      i.push(r)
    }
    return { step: t, points: i }
  }),
  (Ie.prototype._getNAFPoints = function (t) {
    if (this.precomputed && this.precomputed.naf) return this.precomputed.naf
    for (
      var e = [this], i = (1 << t) - 1, r = 1 === i ? null : this.dbl(), n = 1;
      n < i;
      n++
    )
      e[n] = e[n - 1].add(r)
    return { wnd: t, points: e }
  }),
  (Ie.prototype._getBeta = function () {
    return null
  }),
  (Ie.prototype.dblp = function (t) {
    for (var e = this, i = 0; i < t; i++) e = e.dbl()
    return e
  })
var Be = wt(function (t) {
    t.exports =
      'function' == typeof Object.create
        ? function (t, e) {
            e &&
              ((t.super_ = e),
              (t.prototype = Object.create(e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0
                }
              })))
          }
        : function (t, e) {
            if (e) {
              t.super_ = e
              var i = function () {}
              ;(i.prototype = e.prototype),
                (t.prototype = new i()),
                (t.prototype.constructor = t)
            }
          }
  }),
  Oe = wt(function (t) {
    try {
      if ('function' != typeof l.inherits) throw ''
      t.exports = l.inherits
    } catch (e) {
      t.exports = Be
    }
  }),
  Pe = ve.assert
function Ce(t) {
  ke.call(this, 'short', t),
    (this.a = new Bt(t.a, 16).toRed(this.red)),
    (this.b = new Bt(t.b, 16).toRed(this.red)),
    (this.tinv = this.two.redInvm()),
    (this.zeroA = 0 === this.a.fromRed().cmpn(0)),
    (this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3)),
    (this.endo = this._getEndomorphism(t)),
    (this._endoWnafT1 = new Array(4)),
    (this._endoWnafT2 = new Array(4))
}
Oe(Ce, ke)
var Ne = Ce
function Le(t, e, i, r) {
  ke.BasePoint.call(this, t, 'affine'),
    null === e && null === i
      ? ((this.x = null), (this.y = null), (this.inf = !0))
      : ((this.x = new Bt(e, 16)),
        (this.y = new Bt(i, 16)),
        r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)),
        this.x.red || (this.x = this.x.toRed(this.curve.red)),
        this.y.red || (this.y = this.y.toRed(this.curve.red)),
        (this.inf = !1))
}
function De(t, e, i, r) {
  ke.BasePoint.call(this, t, 'jacobian'),
    null === e && null === i && null === r
      ? ((this.x = this.curve.one),
        (this.y = this.curve.one),
        (this.z = new Bt(0)))
      : ((this.x = new Bt(e, 16)),
        (this.y = new Bt(i, 16)),
        (this.z = new Bt(r, 16))),
    this.x.red || (this.x = this.x.toRed(this.curve.red)),
    this.y.red || (this.y = this.y.toRed(this.curve.red)),
    this.z.red || (this.z = this.z.toRed(this.curve.red)),
    (this.zOne = this.z === this.curve.one)
}
function Fe(t) {
  ke.call(this, 'mont', t),
    (this.a = new Bt(t.a, 16).toRed(this.red)),
    (this.b = new Bt(t.b, 16).toRed(this.red)),
    (this.i4 = new Bt(4).toRed(this.red).redInvm()),
    (this.two = new Bt(2).toRed(this.red)),
    (this.a24 = this.i4.redMul(this.a.redAdd(this.two)))
}
;(Ce.prototype._getEndomorphism = function (t) {
  if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
    var e, i
    if (t.beta) e = new Bt(t.beta, 16).toRed(this.red)
    else {
      var r = this._getEndoRoots(this.p)
      e = (e = r[0].cmp(r[1]) < 0 ? r[0] : r[1]).toRed(this.red)
    }
    if (t.lambda) i = new Bt(t.lambda, 16)
    else {
      var n = this._getEndoRoots(this.n)
      0 === this.g.mul(n[0]).x.cmp(this.g.x.redMul(e))
        ? (i = n[0])
        : Pe(0 === this.g.mul((i = n[1])).x.cmp(this.g.x.redMul(e)))
    }
    return {
      beta: e,
      lambda: i,
      basis: t.basis
        ? t.basis.map(function (t) {
            return { a: new Bt(t.a, 16), b: new Bt(t.b, 16) }
          })
        : this._getEndoBasis(i)
    }
  }
}),
  (Ce.prototype._getEndoRoots = function (t) {
    var e = t === this.p ? this.red : Bt.mont(t),
      i = new Bt(2).toRed(e).redInvm(),
      r = i.redNeg(),
      n = new Bt(3).toRed(e).redNeg().redSqrt().redMul(i)
    return [r.redAdd(n).fromRed(), r.redSub(n).fromRed()]
  }),
  (Ce.prototype._getEndoBasis = function (t) {
    for (
      var e,
        i,
        r,
        n,
        s,
        a,
        o,
        u,
        h,
        d = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
        l = t,
        f = this.n.clone(),
        c = new Bt(1),
        p = new Bt(0),
        m = new Bt(0),
        g = new Bt(1),
        y = 0;
      0 !== l.cmpn(0);

    ) {
      var b = f.div(l)
      ;(u = f.sub(b.mul(l))), (h = m.sub(b.mul(c)))
      var w = g.sub(b.mul(p))
      if (!r && u.cmp(d) < 0) (e = o.neg()), (i = c), (r = u.neg()), (n = h)
      else if (r && 2 == ++y) break
      ;(o = u), (f = l), (l = u), (m = c), (c = h), (g = p), (p = w)
    }
    ;(s = u.neg()), (a = h)
    var v = r.sqr().add(n.sqr())
    return (
      s.sqr().add(a.sqr()).cmp(v) >= 0 && ((s = e), (a = i)),
      r.negative && ((r = r.neg()), (n = n.neg())),
      s.negative && ((s = s.neg()), (a = a.neg())),
      [
        { a: r, b: n },
        { a: s, b: a }
      ]
    )
  }),
  (Ce.prototype._endoSplit = function (t) {
    var e = this.endo.basis,
      i = e[0],
      r = e[1],
      n = r.b.mul(t).divRound(this.n),
      s = i.b.neg().mul(t).divRound(this.n),
      a = n.mul(i.a),
      o = s.mul(r.a),
      u = n.mul(i.b),
      h = s.mul(r.b)
    return { k1: t.sub(a).sub(o), k2: u.add(h).neg() }
  }),
  (Ce.prototype.pointFromX = function (t, e) {
    ;(t = new Bt(t, 16)).red || (t = t.toRed(this.red))
    var i = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b),
      r = i.redSqrt()
    if (0 !== r.redSqr().redSub(i).cmp(this.zero))
      throw new Error('invalid point')
    var n = r.fromRed().isOdd()
    return ((e && !n) || (!e && n)) && (r = r.redNeg()), this.point(t, r)
  }),
  (Ce.prototype.validate = function (t) {
    if (t.inf) return !0
    var e = t.x,
      i = t.y,
      r = this.a.redMul(e),
      n = e.redSqr().redMul(e).redIAdd(r).redIAdd(this.b)
    return 0 === i.redSqr().redISub(n).cmpn(0)
  }),
  (Ce.prototype._endoWnafMulAdd = function (t, e, i) {
    for (
      var r = this._endoWnafT1, n = this._endoWnafT2, s = 0;
      s < t.length;
      s++
    ) {
      var a = this._endoSplit(e[s]),
        o = t[s],
        u = o._getBeta()
      a.k1.negative && (a.k1.ineg(), (o = o.neg(!0))),
        a.k2.negative && (a.k2.ineg(), (u = u.neg(!0))),
        (r[2 * s] = o),
        (r[2 * s + 1] = u),
        (n[2 * s] = a.k1),
        (n[2 * s + 1] = a.k2)
    }
    for (var h = this._wnafMulAdd(1, r, n, 2 * s, i), d = 0; d < 2 * s; d++)
      (r[d] = null), (n[d] = null)
    return h
  }),
  Oe(Le, ke.BasePoint),
  (Ce.prototype.point = function (t, e, i) {
    return new Le(this, t, e, i)
  }),
  (Ce.prototype.pointFromJSON = function (t, e) {
    return Le.fromJSON(this, t, e)
  }),
  (Le.prototype._getBeta = function () {
    if (this.curve.endo) {
      var t = this.precomputed
      if (t && t.beta) return t.beta
      var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y)
      if (t) {
        var i = this.curve,
          r = function (t) {
            return i.point(t.x.redMul(i.endo.beta), t.y)
          }
        ;(t.beta = e),
          (e.precomputed = {
            beta: null,
            naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(r) },
            doubles: t.doubles && {
              step: t.doubles.step,
              points: t.doubles.points.map(r)
            }
          })
      }
      return e
    }
  }),
  (Le.prototype.toJSON = function () {
    return this.precomputed
      ? [
          this.x,
          this.y,
          this.precomputed && {
            doubles: this.precomputed.doubles && {
              step: this.precomputed.doubles.step,
              points: this.precomputed.doubles.points.slice(1)
            },
            naf: this.precomputed.naf && {
              wnd: this.precomputed.naf.wnd,
              points: this.precomputed.naf.points.slice(1)
            }
          }
        ]
      : [this.x, this.y]
  }),
  (Le.fromJSON = function (t, e, i) {
    'string' == typeof e && (e = JSON.parse(e))
    var r = t.point(e[0], e[1], i)
    if (!e[2]) return r
    function n(e) {
      return t.point(e[0], e[1], i)
    }
    var s = e[2]
    return (
      (r.precomputed = {
        beta: null,
        doubles: s.doubles && {
          step: s.doubles.step,
          points: [r].concat(s.doubles.points.map(n))
        },
        naf: s.naf && {
          wnd: s.naf.wnd,
          points: [r].concat(s.naf.points.map(n))
        }
      }),
      r
    )
  }),
  (Le.prototype.inspect = function () {
    return this.isInfinity()
      ? '<EC Point Infinity>'
      : '<EC Point x: ' +
          this.x.fromRed().toString(16, 2) +
          ' y: ' +
          this.y.fromRed().toString(16, 2) +
          '>'
  }),
  (Le.prototype.isInfinity = function () {
    return this.inf
  }),
  (Le.prototype.add = function (t) {
    if (this.inf) return t
    if (t.inf) return this
    if (this.eq(t)) return this.dbl()
    if (this.neg().eq(t)) return this.curve.point(null, null)
    if (0 === this.x.cmp(t.x)) return this.curve.point(null, null)
    var e = this.y.redSub(t.y)
    0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()))
    var i = e.redSqr().redISub(this.x).redISub(t.x),
      r = e.redMul(this.x.redSub(i)).redISub(this.y)
    return this.curve.point(i, r)
  }),
  (Le.prototype.dbl = function () {
    if (this.inf) return this
    var t = this.y.redAdd(this.y)
    if (0 === t.cmpn(0)) return this.curve.point(null, null)
    var e = this.curve.a,
      i = this.x.redSqr(),
      r = t.redInvm(),
      n = i.redAdd(i).redIAdd(i).redIAdd(e).redMul(r),
      s = n.redSqr().redISub(this.x.redAdd(this.x)),
      a = n.redMul(this.x.redSub(s)).redISub(this.y)
    return this.curve.point(s, a)
  }),
  (Le.prototype.getX = function () {
    return this.x.fromRed()
  }),
  (Le.prototype.getY = function () {
    return this.y.fromRed()
  }),
  (Le.prototype.mul = function (t) {
    return (
      (t = new Bt(t, 16)),
      this.isInfinity()
        ? this
        : this._hasDoubles(t)
        ? this.curve._fixedNafMul(this, t)
        : this.curve.endo
        ? this.curve._endoWnafMulAdd([this], [t])
        : this.curve._wnafMul(this, t)
    )
  }),
  (Le.prototype.mulAdd = function (t, e, i) {
    var r = [this, e],
      n = [t, i]
    return this.curve.endo
      ? this.curve._endoWnafMulAdd(r, n)
      : this.curve._wnafMulAdd(1, r, n, 2)
  }),
  (Le.prototype.jmulAdd = function (t, e, i) {
    var r = [this, e],
      n = [t, i]
    return this.curve.endo
      ? this.curve._endoWnafMulAdd(r, n, !0)
      : this.curve._wnafMulAdd(1, r, n, 2, !0)
  }),
  (Le.prototype.eq = function (t) {
    return (
      this === t ||
      (this.inf === t.inf &&
        (this.inf || (0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))))
    )
  }),
  (Le.prototype.neg = function (t) {
    if (this.inf) return this
    var e = this.curve.point(this.x, this.y.redNeg())
    if (t && this.precomputed) {
      var i = this.precomputed,
        r = function (t) {
          return t.neg()
        }
      e.precomputed = {
        naf: i.naf && { wnd: i.naf.wnd, points: i.naf.points.map(r) },
        doubles: i.doubles && {
          step: i.doubles.step,
          points: i.doubles.points.map(r)
        }
      }
    }
    return e
  }),
  (Le.prototype.toJ = function () {
    return this.inf
      ? this.curve.jpoint(null, null, null)
      : this.curve.jpoint(this.x, this.y, this.curve.one)
  }),
  Oe(De, ke.BasePoint),
  (Ce.prototype.jpoint = function (t, e, i) {
    return new De(this, t, e, i)
  }),
  (De.prototype.toP = function () {
    if (this.isInfinity()) return this.curve.point(null, null)
    var t = this.z.redInvm(),
      e = t.redSqr(),
      i = this.x.redMul(e),
      r = this.y.redMul(e).redMul(t)
    return this.curve.point(i, r)
  }),
  (De.prototype.neg = function () {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
  }),
  (De.prototype.add = function (t) {
    if (this.isInfinity()) return t
    if (t.isInfinity()) return this
    var e = t.z.redSqr(),
      i = this.z.redSqr(),
      r = this.x.redMul(e),
      n = t.x.redMul(i),
      s = this.y.redMul(e.redMul(t.z)),
      a = t.y.redMul(i.redMul(this.z)),
      o = r.redSub(n),
      u = s.redSub(a)
    if (0 === o.cmpn(0))
      return 0 !== u.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl()
    var h = o.redSqr(),
      d = h.redMul(o),
      l = r.redMul(h),
      f = u.redSqr().redIAdd(d).redISub(l).redISub(l),
      c = u.redMul(l.redISub(f)).redISub(s.redMul(d)),
      p = this.z.redMul(t.z).redMul(o)
    return this.curve.jpoint(f, c, p)
  }),
  (De.prototype.mixedAdd = function (t) {
    if (this.isInfinity()) return t.toJ()
    if (t.isInfinity()) return this
    var e = this.z.redSqr(),
      i = this.x,
      r = t.x.redMul(e),
      n = this.y,
      s = t.y.redMul(e).redMul(this.z),
      a = i.redSub(r),
      o = n.redSub(s)
    if (0 === a.cmpn(0))
      return 0 !== o.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl()
    var u = a.redSqr(),
      h = u.redMul(a),
      d = i.redMul(u),
      l = o.redSqr().redIAdd(h).redISub(d).redISub(d),
      f = o.redMul(d.redISub(l)).redISub(n.redMul(h)),
      c = this.z.redMul(a)
    return this.curve.jpoint(l, f, c)
  }),
  (De.prototype.dblp = function (t) {
    if (0 === t) return this
    if (this.isInfinity()) return this
    if (!t) return this.dbl()
    var e
    if (this.curve.zeroA || this.curve.threeA) {
      var i = this
      for (e = 0; e < t; e++) i = i.dbl()
      return i
    }
    var r = this.curve.a,
      n = this.curve.tinv,
      s = this.x,
      a = this.y,
      o = this.z,
      u = o.redSqr().redSqr(),
      h = a.redAdd(a)
    for (e = 0; e < t; e++) {
      var d = s.redSqr(),
        l = h.redSqr(),
        f = l.redSqr(),
        c = d.redAdd(d).redIAdd(d).redIAdd(r.redMul(u)),
        p = s.redMul(l),
        m = c.redSqr().redISub(p.redAdd(p)),
        g = p.redISub(m),
        y = c.redMul(g)
      y = y.redIAdd(y).redISub(f)
      var b = h.redMul(o)
      e + 1 < t && (u = u.redMul(f)), (s = m), (o = b), (h = y)
    }
    return this.curve.jpoint(s, h.redMul(n), o)
  }),
  (De.prototype.dbl = function () {
    return this.isInfinity()
      ? this
      : this.curve.zeroA
      ? this._zeroDbl()
      : this.curve.threeA
      ? this._threeDbl()
      : this._dbl()
  }),
  (De.prototype._zeroDbl = function () {
    var t, e, i
    if (this.zOne) {
      var r = this.x.redSqr(),
        n = this.y.redSqr(),
        s = n.redSqr(),
        a = this.x.redAdd(n).redSqr().redISub(r).redISub(s)
      a = a.redIAdd(a)
      var o = r.redAdd(r).redIAdd(r),
        u = o.redSqr().redISub(a).redISub(a),
        h = s.redIAdd(s)
      ;(h = (h = h.redIAdd(h)).redIAdd(h)),
        (t = u),
        (e = o.redMul(a.redISub(u)).redISub(h)),
        (i = this.y.redAdd(this.y))
    } else {
      var d = this.x.redSqr(),
        l = this.y.redSqr(),
        f = l.redSqr(),
        c = this.x.redAdd(l).redSqr().redISub(d).redISub(f)
      c = c.redIAdd(c)
      var p = d.redAdd(d).redIAdd(d),
        m = p.redSqr(),
        g = f.redIAdd(f)
      ;(g = (g = g.redIAdd(g)).redIAdd(g)),
        (t = m.redISub(c).redISub(c)),
        (e = p.redMul(c.redISub(t)).redISub(g)),
        (i = (i = this.y.redMul(this.z)).redIAdd(i))
    }
    return this.curve.jpoint(t, e, i)
  }),
  (De.prototype._threeDbl = function () {
    var t, e, i
    if (this.zOne) {
      var r = this.x.redSqr(),
        n = this.y.redSqr(),
        s = n.redSqr(),
        a = this.x.redAdd(n).redSqr().redISub(r).redISub(s)
      a = a.redIAdd(a)
      var o = r.redAdd(r).redIAdd(r).redIAdd(this.curve.a),
        u = o.redSqr().redISub(a).redISub(a)
      t = u
      var h = s.redIAdd(s)
      ;(h = (h = h.redIAdd(h)).redIAdd(h)),
        (e = o.redMul(a.redISub(u)).redISub(h)),
        (i = this.y.redAdd(this.y))
    } else {
      var d = this.z.redSqr(),
        l = this.y.redSqr(),
        f = this.x.redMul(l),
        c = this.x.redSub(d).redMul(this.x.redAdd(d))
      c = c.redAdd(c).redIAdd(c)
      var p = f.redIAdd(f),
        m = (p = p.redIAdd(p)).redAdd(p)
      ;(t = c.redSqr().redISub(m)),
        (i = this.y.redAdd(this.z).redSqr().redISub(l).redISub(d))
      var g = l.redSqr()
      ;(g = (g = (g = g.redIAdd(g)).redIAdd(g)).redIAdd(g)),
        (e = c.redMul(p.redISub(t)).redISub(g))
    }
    return this.curve.jpoint(t, e, i)
  }),
  (De.prototype._dbl = function () {
    var t = this.curve.a,
      e = this.x,
      i = this.y,
      r = this.z,
      n = r.redSqr().redSqr(),
      s = e.redSqr(),
      a = i.redSqr(),
      o = s.redAdd(s).redIAdd(s).redIAdd(t.redMul(n)),
      u = e.redAdd(e),
      h = (u = u.redIAdd(u)).redMul(a),
      d = o.redSqr().redISub(h.redAdd(h)),
      l = h.redISub(d),
      f = a.redSqr()
    f = (f = (f = f.redIAdd(f)).redIAdd(f)).redIAdd(f)
    var c = o.redMul(l).redISub(f),
      p = i.redAdd(i).redMul(r)
    return this.curve.jpoint(d, c, p)
  }),
  (De.prototype.trpl = function () {
    if (!this.curve.zeroA) return this.dbl().add(this)
    var t = this.x.redSqr(),
      e = this.y.redSqr(),
      i = this.z.redSqr(),
      r = e.redSqr(),
      n = t.redAdd(t).redIAdd(t),
      s = n.redSqr(),
      a = this.x.redAdd(e).redSqr().redISub(t).redISub(r),
      o = (a = (a = (a = a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(
        s
      )).redSqr(),
      u = r.redIAdd(r)
    u = (u = (u = u.redIAdd(u)).redIAdd(u)).redIAdd(u)
    var h = n.redIAdd(a).redSqr().redISub(s).redISub(o).redISub(u),
      d = e.redMul(h)
    d = (d = d.redIAdd(d)).redIAdd(d)
    var l = this.x.redMul(o).redISub(d)
    l = (l = l.redIAdd(l)).redIAdd(l)
    var f = this.y.redMul(h.redMul(u.redISub(h)).redISub(a.redMul(o)))
    f = (f = (f = f.redIAdd(f)).redIAdd(f)).redIAdd(f)
    var c = this.z.redAdd(a).redSqr().redISub(i).redISub(o)
    return this.curve.jpoint(l, f, c)
  }),
  (De.prototype.mul = function (t, e) {
    return (t = new Bt(t, e)), this.curve._wnafMul(this, t)
  }),
  (De.prototype.eq = function (t) {
    if ('affine' === t.type) return this.eq(t.toJ())
    if (this === t) return !0
    var e = this.z.redSqr(),
      i = t.z.redSqr()
    if (0 !== this.x.redMul(i).redISub(t.x.redMul(e)).cmpn(0)) return !1
    var r = e.redMul(this.z),
      n = i.redMul(t.z)
    return 0 === this.y.redMul(n).redISub(t.y.redMul(r)).cmpn(0)
  }),
  (De.prototype.eqXToP = function (t) {
    var e = this.z.redSqr(),
      i = t.toRed(this.curve.red).redMul(e)
    if (0 === this.x.cmp(i)) return !0
    for (var r = t.clone(), n = this.curve.redN.redMul(e); ; ) {
      if ((r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)) return !1
      if ((i.redIAdd(n), 0 === this.x.cmp(i))) return !0
    }
  }),
  (De.prototype.inspect = function () {
    return this.isInfinity()
      ? '<EC JPoint Infinity>'
      : '<EC JPoint x: ' +
          this.x.toString(16, 2) +
          ' y: ' +
          this.y.toString(16, 2) +
          ' z: ' +
          this.z.toString(16, 2) +
          '>'
  }),
  (De.prototype.isInfinity = function () {
    return 0 === this.z.cmpn(0)
  }),
  Oe(Fe, ke)
var Ue = Fe
function qe(t, e, i) {
  ke.BasePoint.call(this, t, 'projective'),
    null === e && null === i
      ? ((this.x = this.curve.one), (this.z = this.curve.zero))
      : ((this.x = new Bt(e, 16)),
        (this.z = new Bt(i, 16)),
        this.x.red || (this.x = this.x.toRed(this.curve.red)),
        this.z.red || (this.z = this.z.toRed(this.curve.red)))
}
;(Fe.prototype.validate = function (t) {
  var e = t.normalize().x,
    i = e.redSqr(),
    r = i.redMul(e).redAdd(i.redMul(this.a)).redAdd(e)
  return 0 === r.redSqrt().redSqr().cmp(r)
}),
  Oe(qe, ke.BasePoint),
  (Fe.prototype.decodePoint = function (t, e) {
    return this.point(ve.toArray(t, e), 1)
  }),
  (Fe.prototype.point = function (t, e) {
    return new qe(this, t, e)
  }),
  (Fe.prototype.pointFromJSON = function (t) {
    return qe.fromJSON(this, t)
  }),
  (qe.prototype.precompute = function () {}),
  (qe.prototype._encode = function () {
    return this.getX().toArray('be', this.curve.p.byteLength())
  }),
  (qe.fromJSON = function (t, e) {
    return new qe(t, e[0], e[1] || t.one)
  }),
  (qe.prototype.inspect = function () {
    return this.isInfinity()
      ? '<EC Point Infinity>'
      : '<EC Point x: ' +
          this.x.fromRed().toString(16, 2) +
          ' z: ' +
          this.z.fromRed().toString(16, 2) +
          '>'
  }),
  (qe.prototype.isInfinity = function () {
    return 0 === this.z.cmpn(0)
  }),
  (qe.prototype.dbl = function () {
    var t = this.x.redAdd(this.z).redSqr(),
      e = this.x.redSub(this.z).redSqr(),
      i = t.redSub(e),
      r = t.redMul(e),
      n = i.redMul(e.redAdd(this.curve.a24.redMul(i)))
    return this.curve.point(r, n)
  }),
  (qe.prototype.add = function () {
    throw new Error('Not supported on Montgomery curve')
  }),
  (qe.prototype.diffAdd = function (t, e) {
    var i = this.x.redAdd(this.z),
      r = this.x.redSub(this.z),
      n = t.x.redAdd(t.z),
      s = t.x.redSub(t.z).redMul(i),
      a = n.redMul(r),
      o = e.z.redMul(s.redAdd(a).redSqr()),
      u = e.x.redMul(s.redISub(a).redSqr())
    return this.curve.point(o, u)
  }),
  (qe.prototype.mul = function (t) {
    for (
      var e = t.clone(), i = this, r = this.curve.point(null, null), n = [];
      0 !== e.cmpn(0);
      e.iushrn(1)
    )
      n.push(e.andln(1))
    for (var s = n.length - 1; s >= 0; s--)
      0 === n[s]
        ? ((i = i.diffAdd(r, this)), (r = r.dbl()))
        : ((r = i.diffAdd(r, this)), (i = i.dbl()))
    return r
  }),
  (qe.prototype.mulAdd = function () {
    throw new Error('Not supported on Montgomery curve')
  }),
  (qe.prototype.jumlAdd = function () {
    throw new Error('Not supported on Montgomery curve')
  }),
  (qe.prototype.eq = function (t) {
    return 0 === this.getX().cmp(t.getX())
  }),
  (qe.prototype.normalize = function () {
    return (
      (this.x = this.x.redMul(this.z.redInvm())),
      (this.z = this.curve.one),
      this
    )
  }),
  (qe.prototype.getX = function () {
    return this.normalize(), this.x.fromRed()
  })
var je = ve.assert
function ze(t) {
  ;(this.twisted = 1 != (0 | t.a)),
    (this.mOneA = this.twisted && -1 == (0 | t.a)),
    (this.extended = this.mOneA),
    ke.call(this, 'edwards', t),
    (this.a = new Bt(t.a, 16).umod(this.red.m)),
    (this.a = this.a.toRed(this.red)),
    (this.c = new Bt(t.c, 16).toRed(this.red)),
    (this.c2 = this.c.redSqr()),
    (this.d = new Bt(t.d, 16).toRed(this.red)),
    (this.dd = this.d.redAdd(this.d)),
    je(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
    (this.oneC = 1 == (0 | t.c))
}
Oe(ze, ke)
var We = ze
function $e(t, e, i, r, n) {
  ke.BasePoint.call(this, t, 'projective'),
    null === e && null === i && null === r
      ? ((this.x = this.curve.zero),
        (this.y = this.curve.one),
        (this.z = this.curve.one),
        (this.t = this.curve.zero),
        (this.zOne = !0))
      : ((this.x = new Bt(e, 16)),
        (this.y = new Bt(i, 16)),
        (this.z = r ? new Bt(r, 16) : this.curve.one),
        (this.t = n && new Bt(n, 16)),
        this.x.red || (this.x = this.x.toRed(this.curve.red)),
        this.y.red || (this.y = this.y.toRed(this.curve.red)),
        this.z.red || (this.z = this.z.toRed(this.curve.red)),
        this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)),
        (this.zOne = this.z === this.curve.one),
        this.curve.extended &&
          !this.t &&
          ((this.t = this.x.redMul(this.y)),
          this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
}
;(ze.prototype._mulA = function (t) {
  return this.mOneA ? t.redNeg() : this.a.redMul(t)
}),
  (ze.prototype._mulC = function (t) {
    return this.oneC ? t : this.c.redMul(t)
  }),
  (ze.prototype.jpoint = function (t, e, i, r) {
    return this.point(t, e, i, r)
  }),
  (ze.prototype.pointFromX = function (t, e) {
    ;(t = new Bt(t, 16)).red || (t = t.toRed(this.red))
    var i = t.redSqr(),
      r = this.c2.redSub(this.a.redMul(i)),
      n = this.one.redSub(this.c2.redMul(this.d).redMul(i)),
      s = r.redMul(n.redInvm()),
      a = s.redSqrt()
    if (0 !== a.redSqr().redSub(s).cmp(this.zero))
      throw new Error('invalid point')
    var o = a.fromRed().isOdd()
    return ((e && !o) || (!e && o)) && (a = a.redNeg()), this.point(t, a)
  }),
  (ze.prototype.pointFromY = function (t, e) {
    ;(t = new Bt(t, 16)).red || (t = t.toRed(this.red))
    var i = t.redSqr(),
      r = i.redSub(this.c2),
      n = i.redMul(this.d).redMul(this.c2).redSub(this.a),
      s = r.redMul(n.redInvm())
    if (0 === s.cmp(this.zero)) {
      if (e) throw new Error('invalid point')
      return this.point(this.zero, t)
    }
    var a = s.redSqrt()
    if (0 !== a.redSqr().redSub(s).cmp(this.zero))
      throw new Error('invalid point')
    return a.fromRed().isOdd() !== e && (a = a.redNeg()), this.point(a, t)
  }),
  (ze.prototype.validate = function (t) {
    if (t.isInfinity()) return !0
    t.normalize()
    var e = t.x.redSqr(),
      i = t.y.redSqr(),
      r = e.redMul(this.a).redAdd(i),
      n = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(i)))
    return 0 === r.cmp(n)
  }),
  Oe($e, ke.BasePoint),
  (ze.prototype.pointFromJSON = function (t) {
    return $e.fromJSON(this, t)
  }),
  (ze.prototype.point = function (t, e, i, r) {
    return new $e(this, t, e, i, r)
  }),
  ($e.fromJSON = function (t, e) {
    return new $e(t, e[0], e[1], e[2])
  }),
  ($e.prototype.inspect = function () {
    return this.isInfinity()
      ? '<EC Point Infinity>'
      : '<EC Point x: ' +
          this.x.fromRed().toString(16, 2) +
          ' y: ' +
          this.y.fromRed().toString(16, 2) +
          ' z: ' +
          this.z.fromRed().toString(16, 2) +
          '>'
  }),
  ($e.prototype.isInfinity = function () {
    return (
      0 === this.x.cmpn(0) &&
      (0 === this.y.cmp(this.z) ||
        (this.zOne && 0 === this.y.cmp(this.curve.c)))
    )
  }),
  ($e.prototype._extDbl = function () {
    var t = this.x.redSqr(),
      e = this.y.redSqr(),
      i = this.z.redSqr()
    i = i.redIAdd(i)
    var r = this.curve._mulA(t),
      n = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
      s = r.redAdd(e),
      a = s.redSub(i),
      o = r.redSub(e),
      u = n.redMul(a),
      h = s.redMul(o),
      d = n.redMul(o),
      l = a.redMul(s)
    return this.curve.point(u, h, l, d)
  }),
  ($e.prototype._projDbl = function () {
    var t,
      e,
      i,
      r,
      n,
      s,
      a = this.x.redAdd(this.y).redSqr(),
      o = this.x.redSqr(),
      u = this.y.redSqr()
    if (this.curve.twisted) {
      var h = (r = this.curve._mulA(o)).redAdd(u)
      this.zOne
        ? ((t = a.redSub(o).redSub(u).redMul(h.redSub(this.curve.two))),
          (e = h.redMul(r.redSub(u))),
          (i = h.redSqr().redSub(h).redSub(h)))
        : ((n = this.z.redSqr()),
          (s = h.redSub(n).redISub(n)),
          (t = a.redSub(o).redISub(u).redMul(s)),
          (e = h.redMul(r.redSub(u))),
          (i = h.redMul(s)))
    } else
      (r = o.redAdd(u)),
        (n = this.curve._mulC(this.z).redSqr()),
        (s = r.redSub(n).redSub(n)),
        (t = this.curve._mulC(a.redISub(r)).redMul(s)),
        (e = this.curve._mulC(r).redMul(o.redISub(u))),
        (i = r.redMul(s))
    return this.curve.point(t, e, i)
  }),
  ($e.prototype.dbl = function () {
    return this.isInfinity()
      ? this
      : this.curve.extended
      ? this._extDbl()
      : this._projDbl()
  }),
  ($e.prototype._extAdd = function (t) {
    var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
      i = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
      r = this.t.redMul(this.curve.dd).redMul(t.t),
      n = this.z.redMul(t.z.redAdd(t.z)),
      s = i.redSub(e),
      a = n.redSub(r),
      o = n.redAdd(r),
      u = i.redAdd(e),
      h = s.redMul(a),
      d = o.redMul(u),
      l = s.redMul(u),
      f = a.redMul(o)
    return this.curve.point(h, d, f, l)
  }),
  ($e.prototype._projAdd = function (t) {
    var e,
      i,
      r = this.z.redMul(t.z),
      n = r.redSqr(),
      s = this.x.redMul(t.x),
      a = this.y.redMul(t.y),
      o = this.curve.d.redMul(s).redMul(a),
      u = n.redSub(o),
      h = n.redAdd(o),
      d = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(s).redISub(a),
      l = r.redMul(u).redMul(d)
    return (
      this.curve.twisted
        ? ((e = r.redMul(h).redMul(a.redSub(this.curve._mulA(s)))),
          (i = u.redMul(h)))
        : ((e = r.redMul(h).redMul(a.redSub(s))),
          (i = this.curve._mulC(u).redMul(h))),
      this.curve.point(l, e, i)
    )
  }),
  ($e.prototype.add = function (t) {
    return this.isInfinity()
      ? t
      : t.isInfinity()
      ? this
      : this.curve.extended
      ? this._extAdd(t)
      : this._projAdd(t)
  }),
  ($e.prototype.mul = function (t) {
    return this._hasDoubles(t)
      ? this.curve._fixedNafMul(this, t)
      : this.curve._wnafMul(this, t)
  }),
  ($e.prototype.mulAdd = function (t, e, i) {
    return this.curve._wnafMulAdd(1, [this, e], [t, i], 2, !1)
  }),
  ($e.prototype.jmulAdd = function (t, e, i) {
    return this.curve._wnafMulAdd(1, [this, e], [t, i], 2, !0)
  }),
  ($e.prototype.normalize = function () {
    if (this.zOne) return this
    var t = this.z.redInvm()
    return (
      (this.x = this.x.redMul(t)),
      (this.y = this.y.redMul(t)),
      this.t && (this.t = this.t.redMul(t)),
      (this.z = this.curve.one),
      (this.zOne = !0),
      this
    )
  }),
  ($e.prototype.neg = function () {
    return this.curve.point(
      this.x.redNeg(),
      this.y,
      this.z,
      this.t && this.t.redNeg()
    )
  }),
  ($e.prototype.getX = function () {
    return this.normalize(), this.x.fromRed()
  }),
  ($e.prototype.getY = function () {
    return this.normalize(), this.y.fromRed()
  }),
  ($e.prototype.eq = function (t) {
    return (
      this === t ||
      (0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY()))
    )
  }),
  ($e.prototype.eqXToP = function (t) {
    var e = t.toRed(this.curve.red).redMul(this.z)
    if (0 === this.x.cmp(e)) return !0
    for (var i = t.clone(), r = this.curve.redN.redMul(this.z); ; ) {
      if ((i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)) return !1
      if ((e.redIAdd(r), 0 === this.x.cmp(e))) return !0
    }
  }),
  ($e.prototype.toP = $e.prototype.normalize),
  ($e.prototype.mixedAdd = $e.prototype.add)
var He = wt(function (t, e) {
  var i = e
  ;(i.base = ke), (i.short = Ne), (i.mont = Ue), (i.edwards = We)
})
function Ge(t, e) {
  return (
    55296 == (64512 & t.charCodeAt(e)) &&
    !(e < 0 || e + 1 >= t.length) &&
    56320 == (64512 & t.charCodeAt(e + 1))
  )
}
function Ze(t) {
  return (
    ((t >>> 24) |
      ((t >>> 8) & 65280) |
      ((t << 8) & 16711680) |
      ((255 & t) << 24)) >>>
    0
  )
}
function Ke(t) {
  return 1 === t.length ? '0' + t : t
}
function Ve(t) {
  return 7 === t.length
    ? '0' + t
    : 6 === t.length
    ? '00' + t
    : 5 === t.length
    ? '000' + t
    : 4 === t.length
    ? '0000' + t
    : 3 === t.length
    ? '00000' + t
    : 2 === t.length
    ? '000000' + t
    : 1 === t.length
    ? '0000000' + t
    : t
}
var Je = {
  inherits: Oe,
  toArray: function (t, e) {
    if (Array.isArray(t)) return t.slice()
    if (!t) return []
    var i = []
    if ('string' == typeof t)
      if (e) {
        if ('hex' === e)
          for (
            (t = t.replace(/[^a-z0-9]+/gi, '')).length % 2 != 0 &&
              (t = '0' + t),
              n = 0;
            n < t.length;
            n += 2
          )
            i.push(parseInt(t[n] + t[n + 1], 16))
      } else
        for (var r = 0, n = 0; n < t.length; n++) {
          var s = t.charCodeAt(n)
          s < 128
            ? (i[r++] = s)
            : s < 2048
            ? ((i[r++] = (s >> 6) | 192), (i[r++] = (63 & s) | 128))
            : Ge(t, n)
            ? ((s = 65536 + ((1023 & s) << 10) + (1023 & t.charCodeAt(++n))),
              (i[r++] = (s >> 18) | 240),
              (i[r++] = ((s >> 12) & 63) | 128),
              (i[r++] = ((s >> 6) & 63) | 128),
              (i[r++] = (63 & s) | 128))
            : ((i[r++] = (s >> 12) | 224),
              (i[r++] = ((s >> 6) & 63) | 128),
              (i[r++] = (63 & s) | 128))
        }
    else for (n = 0; n < t.length; n++) i[n] = 0 | t[n]
    return i
  },
  toHex: function (t) {
    for (var e = '', i = 0; i < t.length; i++) e += Ke(t[i].toString(16))
    return e
  },
  htonl: Ze,
  toHex32: function (t, e) {
    for (var i = '', r = 0; r < t.length; r++) {
      var n = t[r]
      'little' === e && (n = Ze(n)), (i += Ve(n.toString(16)))
    }
    return i
  },
  zero2: Ke,
  zero8: Ve,
  join32: function (t, e, i, r) {
    var n = i - e
    ge(n % 4 == 0)
    for (var s = new Array(n / 4), a = 0, o = e; a < s.length; a++, o += 4)
      s[a] =
        ('big' === r
          ? (t[o] << 24) | (t[o + 1] << 16) | (t[o + 2] << 8) | t[o + 3]
          : (t[o + 3] << 24) | (t[o + 2] << 16) | (t[o + 1] << 8) | t[o]) >>> 0
    return s
  },
  split32: function (t, e) {
    for (
      var i = new Array(4 * t.length), r = 0, n = 0;
      r < t.length;
      r++, n += 4
    ) {
      var s = t[r]
      'big' === e
        ? ((i[n] = s >>> 24),
          (i[n + 1] = (s >>> 16) & 255),
          (i[n + 2] = (s >>> 8) & 255),
          (i[n + 3] = 255 & s))
        : ((i[n + 3] = s >>> 24),
          (i[n + 2] = (s >>> 16) & 255),
          (i[n + 1] = (s >>> 8) & 255),
          (i[n] = 255 & s))
    }
    return i
  },
  rotr32: function (t, e) {
    return (t >>> e) | (t << (32 - e))
  },
  rotl32: function (t, e) {
    return (t << e) | (t >>> (32 - e))
  },
  sum32: function (t, e) {
    return (t + e) >>> 0
  },
  sum32_3: function (t, e, i) {
    return (t + e + i) >>> 0
  },
  sum32_4: function (t, e, i, r) {
    return (t + e + i + r) >>> 0
  },
  sum32_5: function (t, e, i, r, n) {
    return (t + e + i + r + n) >>> 0
  },
  sum64: function (t, e, i, r) {
    var n = (r + t[e + 1]) >>> 0
    ;(t[e] = ((n < r ? 1 : 0) + i + t[e]) >>> 0), (t[e + 1] = n)
  },
  sum64_hi: function (t, e, i, r) {
    return (((e + r) >>> 0 < e ? 1 : 0) + t + i) >>> 0
  },
  sum64_lo: function (t, e, i, r) {
    return (e + r) >>> 0
  },
  sum64_4_hi: function (t, e, i, r, n, s, a, o) {
    var u = 0,
      h = e
    return (
      (u += (h = (h + r) >>> 0) < e ? 1 : 0),
      (u += (h = (h + s) >>> 0) < s ? 1 : 0),
      (t + i + n + a + (u += (h = (h + o) >>> 0) < o ? 1 : 0)) >>> 0
    )
  },
  sum64_4_lo: function (t, e, i, r, n, s, a, o) {
    return (e + r + s + o) >>> 0
  },
  sum64_5_hi: function (t, e, i, r, n, s, a, o, u, h) {
    var d = 0,
      l = e
    return (
      (d += (l = (l + r) >>> 0) < e ? 1 : 0),
      (d += (l = (l + s) >>> 0) < s ? 1 : 0),
      (d += (l = (l + o) >>> 0) < o ? 1 : 0),
      (t + i + n + a + u + (d += (l = (l + h) >>> 0) < h ? 1 : 0)) >>> 0
    )
  },
  sum64_5_lo: function (t, e, i, r, n, s, a, o, u, h) {
    return (e + r + s + o + h) >>> 0
  },
  rotr64_hi: function (t, e, i) {
    return ((e << (32 - i)) | (t >>> i)) >>> 0
  },
  rotr64_lo: function (t, e, i) {
    return ((t << (32 - i)) | (e >>> i)) >>> 0
  },
  shr64_hi: function (t, e, i) {
    return t >>> i
  },
  shr64_lo: function (t, e, i) {
    return ((t << (32 - i)) | (e >>> i)) >>> 0
  }
}
function Xe() {
  ;(this.pending = null),
    (this.pendingTotal = 0),
    (this.blockSize = this.constructor.blockSize),
    (this.outSize = this.constructor.outSize),
    (this.hmacStrength = this.constructor.hmacStrength),
    (this.padLength = this.constructor.padLength / 8),
    (this.endian = 'big'),
    (this._delta8 = this.blockSize / 8),
    (this._delta32 = this.blockSize / 32)
}
var Ye = Xe
;(Xe.prototype.update = function (t, e) {
  if (
    ((t = Je.toArray(t, e)),
    (this.pending = this.pending ? this.pending.concat(t) : t),
    (this.pendingTotal += t.length),
    this.pending.length >= this._delta8)
  ) {
    var i = (t = this.pending).length % this._delta8
    ;(this.pending = t.slice(t.length - i, t.length)),
      0 === this.pending.length && (this.pending = null),
      (t = Je.join32(t, 0, t.length - i, this.endian))
    for (var r = 0; r < t.length; r += this._delta32)
      this._update(t, r, r + this._delta32)
  }
  return this
}),
  (Xe.prototype.digest = function (t) {
    return this.update(this._pad()), ge(null === this.pending), this._digest(t)
  }),
  (Xe.prototype._pad = function () {
    var t = this.pendingTotal,
      e = this._delta8,
      i = e - ((t + this.padLength) % e),
      r = new Array(i + this.padLength)
    r[0] = 128
    for (var n = 1; n < i; n++) r[n] = 0
    if (((t <<= 3), 'big' === this.endian)) {
      for (var s = 8; s < this.padLength; s++) r[n++] = 0
      ;(r[n++] = 0),
        (r[n++] = 0),
        (r[n++] = 0),
        (r[n++] = 0),
        (r[n++] = (t >>> 24) & 255),
        (r[n++] = (t >>> 16) & 255),
        (r[n++] = (t >>> 8) & 255),
        (r[n++] = 255 & t)
    } else
      for (
        r[n++] = 255 & t,
          r[n++] = (t >>> 8) & 255,
          r[n++] = (t >>> 16) & 255,
          r[n++] = (t >>> 24) & 255,
          r[n++] = 0,
          r[n++] = 0,
          r[n++] = 0,
          r[n++] = 0,
          s = 8;
        s < this.padLength;
        s++
      )
        r[n++] = 0
    return r
  })
var Qe = { BlockHash: Ye },
  ti = Je.rotr32
function ei(t, e, i) {
  return (t & e) ^ (~t & i)
}
function ii(t, e, i) {
  return (t & e) ^ (t & i) ^ (e & i)
}
var ri = ei,
  ni = ii,
  si = Je.rotl32,
  ai = Je.sum32,
  oi = Je.sum32_5,
  ui = function (t, e, i, r) {
    return 0 === t
      ? ei(e, i, r)
      : 1 === t || 3 === t
      ? (function (t, e, i) {
          return t ^ e ^ i
        })(e, i, r)
      : 2 === t
      ? ii(e, i, r)
      : void 0
  },
  hi = Qe.BlockHash,
  di = [1518500249, 1859775393, 2400959708, 3395469782]
function li() {
  if (!(this instanceof li)) return new li()
  hi.call(this),
    (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
    (this.W = new Array(80))
}
Je.inherits(li, hi)
var fi = li
;(li.blockSize = 512),
  (li.outSize = 160),
  (li.hmacStrength = 80),
  (li.padLength = 64),
  (li.prototype._update = function (t, e) {
    for (var i = this.W, r = 0; r < 16; r++) i[r] = t[e + r]
    for (; r < i.length; r++)
      i[r] = si(i[r - 3] ^ i[r - 8] ^ i[r - 14] ^ i[r - 16], 1)
    var n = this.h[0],
      s = this.h[1],
      a = this.h[2],
      o = this.h[3],
      u = this.h[4]
    for (r = 0; r < i.length; r++) {
      var h = ~~(r / 20),
        d = oi(si(n, 5), ui(h, s, a, o), u, i[r], di[h])
      ;(u = o), (o = a), (a = si(s, 30)), (s = n), (n = d)
    }
    ;(this.h[0] = ai(this.h[0], n)),
      (this.h[1] = ai(this.h[1], s)),
      (this.h[2] = ai(this.h[2], a)),
      (this.h[3] = ai(this.h[3], o)),
      (this.h[4] = ai(this.h[4], u))
  }),
  (li.prototype._digest = function (t) {
    return 'hex' === t ? Je.toHex32(this.h, 'big') : Je.split32(this.h, 'big')
  })
var ci = Je.sum32,
  pi = Je.sum32_4,
  mi = Je.sum32_5,
  gi = ri,
  yi = ni,
  bi = function (t) {
    return ti(t, 2) ^ ti(t, 13) ^ ti(t, 22)
  },
  wi = function (t) {
    return ti(t, 6) ^ ti(t, 11) ^ ti(t, 25)
  },
  vi = function (t) {
    return ti(t, 7) ^ ti(t, 18) ^ (t >>> 3)
  },
  Mi = Qe.BlockHash,
  Ai = [
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298
  ]
function _i() {
  if (!(this instanceof _i)) return new _i()
  Mi.call(this),
    (this.h = [
      1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
      528734635, 1541459225
    ]),
    (this.k = Ai),
    (this.W = new Array(64))
}
Je.inherits(_i, Mi)
var Si = _i
function Ti() {
  if (!(this instanceof Ti)) return new Ti()
  Si.call(this),
    (this.h = [
      3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025,
      1694076839, 3204075428
    ])
}
;(_i.blockSize = 512),
  (_i.outSize = 256),
  (_i.hmacStrength = 192),
  (_i.padLength = 64),
  (_i.prototype._update = function (t, e) {
    for (var i = this.W, r = 0; r < 16; r++) i[r] = t[e + r]
    for (; r < i.length; r++)
      i[r] = pi(
        ti((n = i[r - 2]), 17) ^ ti(n, 19) ^ (n >>> 10),
        i[r - 7],
        vi(i[r - 15]),
        i[r - 16]
      )
    var n,
      s = this.h[0],
      a = this.h[1],
      o = this.h[2],
      u = this.h[3],
      h = this.h[4],
      d = this.h[5],
      l = this.h[6],
      f = this.h[7]
    for (ge(this.k.length === i.length), r = 0; r < i.length; r++) {
      var c = mi(f, wi(h), gi(h, d, l), this.k[r], i[r]),
        p = ci(bi(s), yi(s, a, o))
      ;(f = l),
        (l = d),
        (d = h),
        (h = ci(u, c)),
        (u = o),
        (o = a),
        (a = s),
        (s = ci(c, p))
    }
    ;(this.h[0] = ci(this.h[0], s)),
      (this.h[1] = ci(this.h[1], a)),
      (this.h[2] = ci(this.h[2], o)),
      (this.h[3] = ci(this.h[3], u)),
      (this.h[4] = ci(this.h[4], h)),
      (this.h[5] = ci(this.h[5], d)),
      (this.h[6] = ci(this.h[6], l)),
      (this.h[7] = ci(this.h[7], f))
  }),
  (_i.prototype._digest = function (t) {
    return 'hex' === t ? Je.toHex32(this.h, 'big') : Je.split32(this.h, 'big')
  }),
  Je.inherits(Ti, Si)
var xi = Ti
;(Ti.blockSize = 512),
  (Ti.outSize = 224),
  (Ti.hmacStrength = 192),
  (Ti.padLength = 64),
  (Ti.prototype._digest = function (t) {
    return 'hex' === t
      ? Je.toHex32(this.h.slice(0, 7), 'big')
      : Je.split32(this.h.slice(0, 7), 'big')
  })
var Ei = Je.rotr64_hi,
  Ri = Je.rotr64_lo,
  ki = Je.shr64_hi,
  Ii = Je.shr64_lo,
  Bi = Je.sum64,
  Oi = Je.sum64_hi,
  Pi = Je.sum64_lo,
  Ci = Je.sum64_4_hi,
  Ni = Je.sum64_4_lo,
  Li = Je.sum64_5_hi,
  Di = Je.sum64_5_lo,
  Fi = Qe.BlockHash,
  Ui = [
    1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
    3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
    2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
    310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
    1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
    3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
    264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
    1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
    2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
    3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
    113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
    773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
    1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
    2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
    3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
    3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
    430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
    883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
    1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
    2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
    2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
    3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
    3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
    174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
    685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
    1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
    1607167915, 987167468, 1816402316, 1246189591
  ]
function qi() {
  if (!(this instanceof qi)) return new qi()
  Fi.call(this),
    (this.h = [
      1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723,
      2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199,
      528734635, 4215389547, 1541459225, 327033209
    ]),
    (this.k = Ui),
    (this.W = new Array(160))
}
Je.inherits(qi, Fi)
var ji = qi
function zi(t, e, i, r, n) {
  var s = (t & i) ^ (~t & n)
  return s < 0 && (s += 4294967296), s
}
function Wi(t, e, i, r, n, s) {
  var a = (e & r) ^ (~e & s)
  return a < 0 && (a += 4294967296), a
}
function $i(t, e, i, r, n) {
  var s = (t & i) ^ (t & n) ^ (i & n)
  return s < 0 && (s += 4294967296), s
}
function Hi(t, e, i, r, n, s) {
  var a = (e & r) ^ (e & s) ^ (r & s)
  return a < 0 && (a += 4294967296), a
}
function Gi(t, e) {
  var i = Ei(t, e, 28) ^ Ei(e, t, 2) ^ Ei(e, t, 7)
  return i < 0 && (i += 4294967296), i
}
function Zi(t, e) {
  var i = Ri(t, e, 28) ^ Ri(e, t, 2) ^ Ri(e, t, 7)
  return i < 0 && (i += 4294967296), i
}
function Ki(t, e) {
  var i = Ei(t, e, 14) ^ Ei(t, e, 18) ^ Ei(e, t, 9)
  return i < 0 && (i += 4294967296), i
}
function Vi(t, e) {
  var i = Ri(t, e, 14) ^ Ri(t, e, 18) ^ Ri(e, t, 9)
  return i < 0 && (i += 4294967296), i
}
function Ji(t, e) {
  var i = Ei(t, e, 1) ^ Ei(t, e, 8) ^ ki(t, e, 7)
  return i < 0 && (i += 4294967296), i
}
function Xi(t, e) {
  var i = Ri(t, e, 1) ^ Ri(t, e, 8) ^ Ii(t, e, 7)
  return i < 0 && (i += 4294967296), i
}
function Yi(t, e) {
  var i = Ei(t, e, 19) ^ Ei(e, t, 29) ^ ki(t, e, 6)
  return i < 0 && (i += 4294967296), i
}
function Qi(t, e) {
  var i = Ri(t, e, 19) ^ Ri(e, t, 29) ^ Ii(t, e, 6)
  return i < 0 && (i += 4294967296), i
}
function tr() {
  if (!(this instanceof tr)) return new tr()
  ji.call(this),
    (this.h = [
      3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999,
      355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025,
      3675008525, 1694076839, 1203062813, 3204075428
    ])
}
;(qi.blockSize = 1024),
  (qi.outSize = 512),
  (qi.hmacStrength = 192),
  (qi.padLength = 128),
  (qi.prototype._prepareBlock = function (t, e) {
    for (var i = this.W, r = 0; r < 32; r++) i[r] = t[e + r]
    for (; r < i.length; r += 2) {
      var n = Yi(i[r - 4], i[r - 3]),
        s = Qi(i[r - 4], i[r - 3]),
        a = i[r - 14],
        o = i[r - 13],
        u = Ji(i[r - 30], i[r - 29]),
        h = Xi(i[r - 30], i[r - 29]),
        d = i[r - 32],
        l = i[r - 31]
      ;(i[r] = Ci(n, s, a, o, u, h, d, l)),
        (i[r + 1] = Ni(n, s, a, o, u, h, d, l))
    }
  }),
  (qi.prototype._update = function (t, e) {
    this._prepareBlock(t, e)
    var i = this.W,
      r = this.h[0],
      n = this.h[1],
      s = this.h[2],
      a = this.h[3],
      o = this.h[4],
      u = this.h[5],
      h = this.h[6],
      d = this.h[7],
      l = this.h[8],
      f = this.h[9],
      c = this.h[10],
      p = this.h[11],
      m = this.h[12],
      g = this.h[13],
      y = this.h[14],
      b = this.h[15]
    ge(this.k.length === i.length)
    for (var w = 0; w < i.length; w += 2) {
      var v = y,
        M = b,
        A = Ki(l, f),
        _ = Vi(l, f),
        S = zi(l, 0, c, 0, m),
        T = Wi(0, f, 0, p, 0, g),
        x = this.k[w],
        E = this.k[w + 1],
        R = i[w],
        k = i[w + 1],
        I = Li(v, M, A, _, S, T, x, E, R, k),
        B = Di(v, M, A, _, S, T, x, E, R, k)
      ;(v = Gi(r, n)),
        (M = Zi(r, n)),
        (A = $i(r, 0, s, 0, o)),
        (_ = Hi(0, n, 0, a, 0, u))
      var O = Oi(v, M, A, _),
        P = Pi(v, M, A, _)
      ;(y = m),
        (b = g),
        (m = c),
        (g = p),
        (c = l),
        (p = f),
        (l = Oi(h, d, I, B)),
        (f = Pi(d, d, I, B)),
        (h = o),
        (d = u),
        (o = s),
        (u = a),
        (s = r),
        (a = n),
        (r = Oi(I, B, O, P)),
        (n = Pi(I, B, O, P))
    }
    Bi(this.h, 0, r, n),
      Bi(this.h, 2, s, a),
      Bi(this.h, 4, o, u),
      Bi(this.h, 6, h, d),
      Bi(this.h, 8, l, f),
      Bi(this.h, 10, c, p),
      Bi(this.h, 12, m, g),
      Bi(this.h, 14, y, b)
  }),
  (qi.prototype._digest = function (t) {
    return 'hex' === t ? Je.toHex32(this.h, 'big') : Je.split32(this.h, 'big')
  }),
  Je.inherits(tr, ji)
var er = tr
;(tr.blockSize = 1024),
  (tr.outSize = 384),
  (tr.hmacStrength = 192),
  (tr.padLength = 128),
  (tr.prototype._digest = function (t) {
    return 'hex' === t
      ? Je.toHex32(this.h.slice(0, 12), 'big')
      : Je.split32(this.h.slice(0, 12), 'big')
  })
var ir = { sha1: fi, sha224: xi, sha256: Si, sha384: er, sha512: ji },
  rr = Je.rotl32,
  nr = Je.sum32,
  sr = Je.sum32_3,
  ar = Je.sum32_4,
  or = Qe.BlockHash
function ur() {
  if (!(this instanceof ur)) return new ur()
  or.call(this),
    (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
    (this.endian = 'little')
}
Je.inherits(ur, or)
var hr = ur
function dr(t, e, i, r) {
  return t <= 15
    ? e ^ i ^ r
    : t <= 31
    ? (e & i) | (~e & r)
    : t <= 47
    ? (e | ~i) ^ r
    : t <= 63
    ? (e & r) | (i & ~r)
    : e ^ (i | ~r)
}
function lr(t) {
  return t <= 15
    ? 0
    : t <= 31
    ? 1518500249
    : t <= 47
    ? 1859775393
    : t <= 63
    ? 2400959708
    : 2840853838
}
function fr(t) {
  return t <= 15
    ? 1352829926
    : t <= 31
    ? 1548603684
    : t <= 47
    ? 1836072691
    : t <= 63
    ? 2053994217
    : 0
}
;(ur.blockSize = 512),
  (ur.outSize = 160),
  (ur.hmacStrength = 192),
  (ur.padLength = 64),
  (ur.prototype._update = function (t, e) {
    for (
      var i = this.h[0],
        r = this.h[1],
        n = this.h[2],
        s = this.h[3],
        a = this.h[4],
        o = i,
        u = r,
        h = n,
        d = s,
        l = a,
        f = 0;
      f < 80;
      f++
    ) {
      var c = nr(rr(ar(i, dr(f, r, n, s), t[cr[f] + e], lr(f)), mr[f]), a)
      ;(i = a),
        (a = s),
        (s = rr(n, 10)),
        (n = r),
        (r = c),
        (c = nr(rr(ar(o, dr(79 - f, u, h, d), t[pr[f] + e], fr(f)), gr[f]), l)),
        (o = l),
        (l = d),
        (d = rr(h, 10)),
        (h = u),
        (u = c)
    }
    ;(c = sr(this.h[1], n, d)),
      (this.h[1] = sr(this.h[2], s, l)),
      (this.h[2] = sr(this.h[3], a, o)),
      (this.h[3] = sr(this.h[4], i, u)),
      (this.h[4] = sr(this.h[0], r, h)),
      (this.h[0] = c)
  }),
  (ur.prototype._digest = function (t) {
    return 'hex' === t
      ? Je.toHex32(this.h, 'little')
      : Je.split32(this.h, 'little')
  })
var cr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6,
    15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13,
    11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9,
    7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
  ],
  pr = [
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5,
    10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10,
    0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10,
    4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
  ],
  mr = [
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9,
    7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13,
    6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9,
    15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
  ],
  gr = [
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8,
    9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14,
    13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5,
    12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
  ],
  yr = { ripemd160: hr }
function br(t, e, i) {
  if (!(this instanceof br)) return new br(t, e, i)
  ;(this.Hash = t),
    (this.blockSize = t.blockSize / 8),
    (this.outSize = t.outSize / 8),
    (this.inner = null),
    (this.outer = null),
    this._init(Je.toArray(e, i))
}
var wr = br
;(br.prototype._init = function (t) {
  t.length > this.blockSize && (t = new this.Hash().update(t).digest()),
    ge(t.length <= this.blockSize)
  for (var e = t.length; e < this.blockSize; e++) t.push(0)
  for (e = 0; e < t.length; e++) t[e] ^= 54
  for (this.inner = new this.Hash().update(t), e = 0; e < t.length; e++)
    t[e] ^= 106
  this.outer = new this.Hash().update(t)
}),
  (br.prototype.update = function (t, e) {
    return this.inner.update(t, e), this
  }),
  (br.prototype.digest = function (t) {
    return this.outer.update(this.inner.digest()), this.outer.digest(t)
  })
var vr = wt(function (t, e) {
    var i = e
    ;(i.utils = Je),
      (i.common = Qe),
      (i.sha = ir),
      (i.ripemd = yr),
      (i.hmac = wr),
      (i.sha1 = i.sha.sha1),
      (i.sha256 = i.sha.sha256),
      (i.sha224 = i.sha.sha224),
      (i.sha384 = i.sha.sha384),
      (i.sha512 = i.sha.sha512),
      (i.ripemd160 = i.ripemd.ripemd160)
  }),
  Mr = {
    doubles: {
      step: 4,
      points: [
        [
          'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
          'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
        ],
        [
          '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
          '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
        ],
        [
          '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
          'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
        ],
        [
          '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
          '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
        ],
        [
          '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
          '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
        ],
        [
          '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
          '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
        ],
        [
          'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
          '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
        ],
        [
          '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
          'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
        ],
        [
          'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
          '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
        ],
        [
          'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
          'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
        ],
        [
          'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
          '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
        ],
        [
          '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
          '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
        ],
        [
          '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
          '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
        ],
        [
          '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
          '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
        ],
        [
          '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
          '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
        ],
        [
          '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
          '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
        ],
        [
          '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
          '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
        ],
        [
          '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
          '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
        ],
        [
          '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
          'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
        ],
        [
          'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
          '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
        ],
        [
          'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
          '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
        ],
        [
          '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
          '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
        ],
        [
          '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
          '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
        ],
        [
          'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
          '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
        ],
        [
          '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
          'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
        ],
        [
          'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
          '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
        ],
        [
          'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
          'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
        ],
        [
          'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
          '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
        ],
        [
          'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
          'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
        ],
        [
          'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
          '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
        ],
        [
          '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
          'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
        ],
        [
          '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
          '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
        ],
        [
          'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
          '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
        ],
        [
          '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
          'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
        ],
        [
          'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
          '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
        ],
        [
          'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
          '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
        ],
        [
          'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
          'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
        ],
        [
          '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
          '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
        ],
        [
          '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
          '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
        ],
        [
          '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
          'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
        ],
        [
          '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
          '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
        ],
        [
          'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
          '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
        ],
        [
          '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
          '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
        ],
        [
          '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
          'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
        ],
        [
          '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
          '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
        ],
        [
          'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
          '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
        ],
        [
          '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
          'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
        ],
        [
          'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
          'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
        ],
        [
          'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
          '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
        ],
        [
          '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
          'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
        ],
        [
          '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
          'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
        ],
        [
          'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
          '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
        ],
        [
          'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
          '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
        ],
        [
          'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
          '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
        ],
        [
          '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
          'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
        ],
        [
          '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
          '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
        ],
        [
          'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
          'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
        ],
        [
          '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
          'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
        ],
        [
          '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
          '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
        ],
        [
          '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
          '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
        ],
        [
          'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
          'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
        ],
        [
          '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
          '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
        ],
        [
          '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
          '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
        ],
        [
          'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
          '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
        ],
        [
          'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
          'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
        ]
      ]
    },
    naf: {
      wnd: 7,
      points: [
        [
          'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
          '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
        ],
        [
          '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
          'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
        ],
        [
          '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
          '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
        ],
        [
          'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
          'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
        ],
        [
          '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
          'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
        ],
        [
          'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
          'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
        ],
        [
          'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
          '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
        ],
        [
          'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
          '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
        ],
        [
          '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
          '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
        ],
        [
          '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
          '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
        ],
        [
          '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
          '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
        ],
        [
          '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
          '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
        ],
        [
          'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
          'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
        ],
        [
          'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
          '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
        ],
        [
          '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
          'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
        ],
        [
          '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
          'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
        ],
        [
          '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
          '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
        ],
        [
          '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
          '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
        ],
        [
          '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
          '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
        ],
        [
          '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
          'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
        ],
        [
          'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
          'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
        ],
        [
          '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
          '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
        ],
        [
          '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
          '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
        ],
        [
          'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
          'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
        ],
        [
          '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
          '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
        ],
        [
          'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
          'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
        ],
        [
          'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
          'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
        ],
        [
          '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
          '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
        ],
        [
          '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
          '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
        ],
        [
          '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
          '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
        ],
        [
          'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
          '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
        ],
        [
          '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
          '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
        ],
        [
          'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
          '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
        ],
        [
          '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
          'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
        ],
        [
          '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
          'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
        ],
        [
          'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
          'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
        ],
        [
          '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
          '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
        ],
        [
          '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
          'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
        ],
        [
          'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
          'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
        ],
        [
          '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
          '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
        ],
        [
          '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
          'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
        ],
        [
          '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
          '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
        ],
        [
          '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
          'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
        ],
        [
          'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
          '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
        ],
        [
          '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
          '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
        ],
        [
          '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
          'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
        ],
        [
          '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
          'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
        ],
        [
          'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
          'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
        ],
        [
          'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
          'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
        ],
        [
          '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
          '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
        ],
        [
          '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
          '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
        ],
        [
          'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
          '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
        ],
        [
          'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
          'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
        ],
        [
          '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
          '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
        ],
        [
          '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
          '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
        ],
        [
          'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
          '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
        ],
        [
          '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
          '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
        ],
        [
          'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
          'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
        ],
        [
          '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
          'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
        ],
        [
          '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
          '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
        ],
        [
          'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
          '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
        ],
        [
          'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
          '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
        ],
        [
          '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
          '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
        ],
        [
          '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
          '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
        ],
        [
          '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
          'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
        ],
        [
          '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
          'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
        ],
        [
          '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
          '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
        ],
        [
          '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
          '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
        ],
        [
          '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
          '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
        ],
        [
          '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
          'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
        ],
        [
          'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
          'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
        ],
        [
          '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
          'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
        ],
        [
          'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
          '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
        ],
        [
          'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
          '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
        ],
        [
          'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
          '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
        ],
        [
          'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
          '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
        ],
        [
          '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
          'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
        ],
        [
          '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
          '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
        ],
        [
          '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
          'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
        ],
        [
          'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
          'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
        ],
        [
          'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
          '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
        ],
        [
          'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
          'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
        ],
        [
          'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
          '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
        ],
        [
          '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
          '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
        ],
        [
          'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
          '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
        ],
        [
          'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
          '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
        ],
        [
          '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
          '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
        ],
        [
          '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
          'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
        ],
        [
          'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
          '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
        ],
        [
          'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
          '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
        ],
        [
          'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
          '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
        ],
        [
          '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
          '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
        ],
        [
          'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
          'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
        ],
        [
          '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
          'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
        ],
        [
          'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
          'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
        ],
        [
          'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
          '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
        ],
        [
          '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
          'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
        ],
        [
          'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
          '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
        ],
        [
          'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
          '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
        ],
        [
          'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
          '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
        ],
        [
          '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
          'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
        ],
        [
          '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
          'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
        ],
        [
          'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
          '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
        ],
        [
          '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
          'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
        ],
        [
          '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
          '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
        ],
        [
          '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
          'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
        ],
        [
          'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
          'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
        ],
        [
          '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
          'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
        ],
        [
          '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
          '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
        ],
        [
          '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
          'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
        ],
        [
          '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
          '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
        ],
        [
          'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
          'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
        ],
        [
          '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
          '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
        ],
        [
          'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
          '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
        ],
        [
          '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
          '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
        ],
        [
          'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
          'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
        ],
        [
          'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
          '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
        ],
        [
          'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
          'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
        ],
        [
          '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
          'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
        ],
        [
          '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
          '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
        ],
        [
          '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
          'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
        ],
        [
          '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
          '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
        ],
        [
          '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
          '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
        ],
        [
          '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
          'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
        ],
        [
          '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
          '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
        ],
        [
          '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
          '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
        ],
        [
          '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
          '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
        ]
      ]
    }
  },
  Ar = wt(function (t, e) {
    var i,
      r = e,
      n = ve.assert
    function s(t) {
      ;(this.curve =
        'short' === t.type
          ? new He.short(t)
          : 'edwards' === t.type
          ? new He.edwards(t)
          : new He.mont(t)),
        (this.g = this.curve.g),
        (this.n = this.curve.n),
        (this.hash = t.hash),
        n(this.g.validate(), 'Invalid curve'),
        n(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O')
    }
    function a(t, e) {
      Object.defineProperty(r, t, {
        configurable: !0,
        enumerable: !0,
        get: function () {
          var i = new s(e)
          return (
            Object.defineProperty(r, t, {
              configurable: !0,
              enumerable: !0,
              value: i
            }),
            i
          )
        }
      })
    }
    ;(r.PresetCurve = s),
      a('p192', {
        type: 'short',
        prime: 'p192',
        p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
        a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
        b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
        n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
        hash: vr.sha256,
        gRed: !1,
        g: [
          '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
          '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
        ]
      }),
      a('p224', {
        type: 'short',
        prime: 'p224',
        p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
        a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
        b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
        n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
        hash: vr.sha256,
        gRed: !1,
        g: [
          'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
          'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
        ]
      }),
      a('p256', {
        type: 'short',
        prime: null,
        p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
        a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
        b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
        n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
        hash: vr.sha256,
        gRed: !1,
        g: [
          '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
          '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
        ]
      }),
      a('p384', {
        type: 'short',
        prime: null,
        p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff',
        a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc',
        b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
        n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
        hash: vr.sha384,
        gRed: !1,
        g: [
          'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7',
          '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
        ]
      }),
      a('p521', {
        type: 'short',
        prime: null,
        p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff',
        a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc',
        b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
        n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
        hash: vr.sha512,
        gRed: !1,
        g: [
          '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
          '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650'
        ]
      }),
      a('curve25519', {
        type: 'mont',
        prime: 'p25519',
        p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
        a: '76d06',
        b: '1',
        n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
        hash: vr.sha256,
        gRed: !1,
        g: ['9']
      }),
      a('ed25519', {
        type: 'edwards',
        prime: 'p25519',
        p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
        a: '-1',
        c: '1',
        d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
        n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
        hash: vr.sha256,
        gRed: !1,
        g: [
          '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',
          '6666666666666666666666666666666666666666666666666666666666666658'
        ]
      })
    try {
      i = Mr
    } catch (t) {
      i = void 0
    }
    a('secp256k1', {
      type: 'short',
      prime: 'k256',
      p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
      a: '0',
      b: '7',
      n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
      h: '1',
      hash: vr.sha256,
      beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
      lambda:
        '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
      basis: [
        {
          a: '3086d221a7d46bcde86c90e49284eb15',
          b: '-e4437ed6010e88286f547fa90abfe4c3'
        },
        {
          a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
          b: '3086d221a7d46bcde86c90e49284eb15'
        }
      ],
      gRed: !1,
      g: [
        '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
        '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
        i
      ]
    })
  })
function _r(t) {
  if (!(this instanceof _r)) return new _r(t)
  ;(this.hash = t.hash),
    (this.predResist = !!t.predResist),
    (this.outLen = this.hash.outSize),
    (this.minEntropy = t.minEntropy || this.hash.hmacStrength),
    (this._reseed = null),
    (this.reseedInterval = null),
    (this.K = null),
    (this.V = null)
  var e = we.toArray(t.entropy, t.entropyEnc || 'hex'),
    i = we.toArray(t.nonce, t.nonceEnc || 'hex'),
    r = we.toArray(t.pers, t.persEnc || 'hex')
  ge(
    e.length >= this.minEntropy / 8,
    'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits'
  ),
    this._init(e, i, r)
}
var Sr = _r
;(_r.prototype._init = function (t, e, i) {
  var r = t.concat(e).concat(i)
  ;(this.K = new Array(this.outLen / 8)), (this.V = new Array(this.outLen / 8))
  for (var n = 0; n < this.V.length; n++) (this.K[n] = 0), (this.V[n] = 1)
  this._update(r), (this._reseed = 1), (this.reseedInterval = 281474976710656)
}),
  (_r.prototype._hmac = function () {
    return new vr.hmac(this.hash, this.K)
  }),
  (_r.prototype._update = function (t) {
    var e = this._hmac().update(this.V).update([0])
    t && (e = e.update(t)),
      (this.K = e.digest()),
      (this.V = this._hmac().update(this.V).digest()),
      t &&
        ((this.K = this._hmac().update(this.V).update([1]).update(t).digest()),
        (this.V = this._hmac().update(this.V).digest()))
  }),
  (_r.prototype.reseed = function (t, e, i, r) {
    'string' != typeof e && ((r = i), (i = e), (e = null)),
      (t = we.toArray(t, e)),
      (i = we.toArray(i, r)),
      ge(
        t.length >= this.minEntropy / 8,
        'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits'
      ),
      this._update(t.concat(i || [])),
      (this._reseed = 1)
  }),
  (_r.prototype.generate = function (t, e, i, r) {
    if (this._reseed > this.reseedInterval)
      throw new Error('Reseed is required')
    'string' != typeof e && ((r = i), (i = e), (e = null)),
      i && ((i = we.toArray(i, r || 'hex')), this._update(i))
    for (var n = []; n.length < t; )
      (this.V = this._hmac().update(this.V).digest()), (n = n.concat(this.V))
    var s = n.slice(0, t)
    return this._update(i), this._reseed++, we.encode(s, e)
  })
var Tr = ve.assert
function xr(t, e) {
  ;(this.ec = t),
    (this.priv = null),
    (this.pub = null),
    e.priv && this._importPrivate(e.priv, e.privEnc),
    e.pub && this._importPublic(e.pub, e.pubEnc)
}
var Er = xr
;(xr.fromPublic = function (t, e, i) {
  return e instanceof xr ? e : new xr(t, { pub: e, pubEnc: i })
}),
  (xr.fromPrivate = function (t, e, i) {
    return e instanceof xr ? e : new xr(t, { priv: e, privEnc: i })
  }),
  (xr.prototype.validate = function () {
    var t = this.getPublic()
    return t.isInfinity()
      ? { result: !1, reason: 'Invalid public key' }
      : t.validate()
      ? t.mul(this.ec.curve.n).isInfinity()
        ? { result: !0, reason: null }
        : { result: !1, reason: 'Public key * N != O' }
      : { result: !1, reason: 'Public key is not a point' }
  }),
  (xr.prototype.getPublic = function (t, e) {
    return (
      'string' == typeof t && ((e = t), (t = null)),
      this.pub || (this.pub = this.ec.g.mul(this.priv)),
      e ? this.pub.encode(e, t) : this.pub
    )
  }),
  (xr.prototype.getPrivate = function (t) {
    return 'hex' === t ? this.priv.toString(16, 2) : this.priv
  }),
  (xr.prototype._importPrivate = function (t, e) {
    ;(this.priv = new Bt(t, e || 16)),
      (this.priv = this.priv.umod(this.ec.curve.n))
  }),
  (xr.prototype._importPublic = function (t, e) {
    if (t.x || t.y)
      return (
        'mont' === this.ec.curve.type
          ? Tr(t.x, 'Need x coordinate')
          : ('short' !== this.ec.curve.type &&
              'edwards' !== this.ec.curve.type) ||
            Tr(t.x && t.y, 'Need both x and y coordinate'),
        void (this.pub = this.ec.curve.point(t.x, t.y))
      )
    this.pub = this.ec.curve.decodePoint(t, e)
  }),
  (xr.prototype.derive = function (t) {
    return (
      t.validate() || Tr(t.validate(), 'public point not validated'),
      t.mul(this.priv).getX()
    )
  }),
  (xr.prototype.sign = function (t, e, i) {
    return this.ec.sign(t, this, e, i)
  }),
  (xr.prototype.verify = function (t, e) {
    return this.ec.verify(t, e, this)
  }),
  (xr.prototype.inspect = function () {
    return (
      '<Key priv: ' +
      (this.priv && this.priv.toString(16, 2)) +
      ' pub: ' +
      (this.pub && this.pub.inspect()) +
      ' >'
    )
  })
var Rr = ve.assert
function kr(t, e) {
  if (t instanceof kr) return t
  this._importDER(t, e) ||
    (Rr(t.r && t.s, 'Signature without r or s'),
    (this.r = new Bt(t.r, 16)),
    (this.s = new Bt(t.s, 16)),
    (this.recoveryParam = void 0 === t.recoveryParam ? null : t.recoveryParam))
}
var Ir = kr
function Br() {
  this.place = 0
}
function Or(t, e) {
  var i = t[e.place++]
  if (!(128 & i)) return i
  var r = 15 & i
  if (0 === r || r > 4) return !1
  for (var n = 0, s = 0, a = e.place; s < r; s++, a++)
    (n <<= 8), (n |= t[a]), (n >>>= 0)
  return !(n <= 127) && ((e.place = a), n)
}
function Pr(t) {
  for (var e = 0, i = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < i; ) e++
  return 0 === e ? t : t.slice(e)
}
function Cr(t, e) {
  if (e < 128) t.push(e)
  else {
    var i = 1 + ((Math.log(e) / Math.LN2) >>> 3)
    for (t.push(128 | i); --i; ) t.push((e >>> (i << 3)) & 255)
    t.push(e)
  }
}
;(kr.prototype._importDER = function (t, e) {
  t = ve.toArray(t, e)
  var i = new Br()
  if (48 !== t[i.place++]) return !1
  var r = Or(t, i)
  if (!1 === r) return !1
  if (r + i.place !== t.length) return !1
  if (2 !== t[i.place++]) return !1
  var n = Or(t, i)
  if (!1 === n) return !1
  var s = t.slice(i.place, n + i.place)
  if (((i.place += n), 2 !== t[i.place++])) return !1
  var a = Or(t, i)
  if (!1 === a) return !1
  if (t.length !== a + i.place) return !1
  var o = t.slice(i.place, a + i.place)
  if (0 === s[0]) {
    if (!(128 & s[1])) return !1
    s = s.slice(1)
  }
  if (0 === o[0]) {
    if (!(128 & o[1])) return !1
    o = o.slice(1)
  }
  return (
    (this.r = new Bt(s)), (this.s = new Bt(o)), (this.recoveryParam = null), !0
  )
}),
  (kr.prototype.toDER = function (t) {
    var e = this.r.toArray(),
      i = this.s.toArray()
    for (
      128 & e[0] && (e = [0].concat(e)),
        128 & i[0] && (i = [0].concat(i)),
        e = Pr(e),
        i = Pr(i);
      !(i[0] || 128 & i[1]);

    )
      i = i.slice(1)
    var r = [2]
    Cr(r, e.length), (r = r.concat(e)).push(2), Cr(r, i.length)
    var n = r.concat(i),
      s = [48]
    return Cr(s, n.length), (s = s.concat(n)), ve.encode(s, t)
  })
var Nr = ve.assert
function Lr(t) {
  if (!(this instanceof Lr)) return new Lr(t)
  'string' == typeof t &&
    (Nr(Object.prototype.hasOwnProperty.call(Ar, t), 'Unknown curve ' + t),
    (t = Ar[t])),
    t instanceof Ar.PresetCurve && (t = { curve: t }),
    (this.curve = t.curve.curve),
    (this.n = this.curve.n),
    (this.nh = this.n.ushrn(1)),
    (this.g = this.curve.g),
    (this.g = t.curve.g),
    this.g.precompute(t.curve.n.bitLength() + 1),
    (this.hash = t.hash || t.curve.hash)
}
var Dr = Lr
;(Lr.prototype.keyPair = function (t) {
  return new Er(this, t)
}),
  (Lr.prototype.keyFromPrivate = function (t, e) {
    return Er.fromPrivate(this, t, e)
  }),
  (Lr.prototype.keyFromPublic = function (t, e) {
    return Er.fromPublic(this, t, e)
  }),
  (Lr.prototype.genKeyPair = function (t) {
    t || (t = {})
    for (
      var e = new Sr({
          hash: this.hash,
          pers: t.pers,
          persEnc: t.persEnc || 'utf8',
          entropy: t.entropy || Me(this.hash.hmacStrength),
          entropyEnc: (t.entropy && t.entropyEnc) || 'utf8',
          nonce: this.n.toArray()
        }),
        i = this.n.byteLength(),
        r = this.n.sub(new Bt(2));
      ;

    ) {
      var n = new Bt(e.generate(i))
      if (!(n.cmp(r) > 0)) return n.iaddn(1), this.keyFromPrivate(n)
    }
  }),
  (Lr.prototype._truncateToN = function (t, e) {
    var i = 8 * t.byteLength() - this.n.bitLength()
    return (
      i > 0 && (t = t.ushrn(i)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
    )
  }),
  (Lr.prototype.sign = function (t, e, i, r) {
    'object' == typeof i && ((r = i), (i = null)),
      r || (r = {}),
      (e = this.keyFromPrivate(e, i)),
      (t = this._truncateToN(new Bt(t, 16)))
    for (
      var n = this.n.byteLength(),
        s = e.getPrivate().toArray('be', n),
        a = t.toArray('be', n),
        o = new Sr({
          hash: this.hash,
          entropy: s,
          nonce: a,
          pers: r.pers,
          persEnc: r.persEnc || 'utf8'
        }),
        u = this.n.sub(new Bt(1)),
        h = 0;
      ;
      h++
    ) {
      var d = r.k ? r.k(h) : new Bt(o.generate(this.n.byteLength()))
      if (!((d = this._truncateToN(d, !0)).cmpn(1) <= 0 || d.cmp(u) >= 0)) {
        var l = this.g.mul(d)
        if (!l.isInfinity()) {
          var f = l.getX(),
            c = f.umod(this.n)
          if (0 !== c.cmpn(0)) {
            var p = d.invm(this.n).mul(c.mul(e.getPrivate()).iadd(t))
            if (0 !== (p = p.umod(this.n)).cmpn(0)) {
              var m = (l.getY().isOdd() ? 1 : 0) | (0 !== f.cmp(c) ? 2 : 0)
              return (
                r.canonical &&
                  p.cmp(this.nh) > 0 &&
                  ((p = this.n.sub(p)), (m ^= 1)),
                new Ir({ r: c, s: p, recoveryParam: m })
              )
            }
          }
        }
      }
    }
  }),
  (Lr.prototype.verify = function (t, e, i, r) {
    ;(t = this._truncateToN(new Bt(t, 16))), (i = this.keyFromPublic(i, r))
    var n = (e = new Ir(e, 'hex')).r,
      s = e.s
    if (n.cmpn(1) < 0 || n.cmp(this.n) >= 0) return !1
    if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return !1
    var a,
      o = s.invm(this.n),
      u = o.mul(t).umod(this.n),
      h = o.mul(n).umod(this.n)
    return this.curve._maxwellTrick
      ? !(a = this.g.jmulAdd(u, i.getPublic(), h)).isInfinity() && a.eqXToP(n)
      : !(a = this.g.mulAdd(u, i.getPublic(), h)).isInfinity() &&
          0 === a.getX().umod(this.n).cmp(n)
  }),
  (Lr.prototype.recoverPubKey = function (t, e, i, r) {
    Nr((3 & i) === i, 'The recovery param is more than two bits'),
      (e = new Ir(e, r))
    var n = this.n,
      s = new Bt(t),
      a = e.r,
      o = e.s,
      u = 1 & i,
      h = i >> 1
    if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && h)
      throw new Error('Unable to find sencond key candinate')
    a = this.curve.pointFromX(h ? a.add(this.curve.n) : a, u)
    var d = e.r.invm(n),
      l = n.sub(s).mul(d).umod(n),
      f = o.mul(d).umod(n)
    return this.g.mulAdd(l, a, f)
  }),
  (Lr.prototype.getKeyRecoveryParam = function (t, e, i, r) {
    if (null !== (e = new Ir(e, r)).recoveryParam) return e.recoveryParam
    for (var n = 0; n < 4; n++) {
      var s
      try {
        s = this.recoverPubKey(t, e, n)
      } catch (t) {
        continue
      }
      if (s.eq(i)) return n
    }
    throw new Error('Unable to find valid recovery factor')
  })
var Fr = ve.assert,
  Ur = ve.parseBytes,
  qr = ve.cachedProperty
function jr(t, e) {
  ;(this.eddsa = t),
    (this._secret = Ur(e.secret)),
    t.isPoint(e.pub) ? (this._pub = e.pub) : (this._pubBytes = Ur(e.pub))
}
;(jr.fromPublic = function (t, e) {
  return e instanceof jr ? e : new jr(t, { pub: e })
}),
  (jr.fromSecret = function (t, e) {
    return e instanceof jr ? e : new jr(t, { secret: e })
  }),
  (jr.prototype.secret = function () {
    return this._secret
  }),
  qr(jr, 'pubBytes', function () {
    return this.eddsa.encodePoint(this.pub())
  }),
  qr(jr, 'pub', function () {
    return this._pubBytes
      ? this.eddsa.decodePoint(this._pubBytes)
      : this.eddsa.g.mul(this.priv())
  }),
  qr(jr, 'privBytes', function () {
    var t = this.eddsa,
      e = this.hash(),
      i = t.encodingLength - 1,
      r = e.slice(0, t.encodingLength)
    return (r[0] &= 248), (r[i] &= 127), (r[i] |= 64), r
  }),
  qr(jr, 'priv', function () {
    return this.eddsa.decodeInt(this.privBytes())
  }),
  qr(jr, 'hash', function () {
    return this.eddsa.hash().update(this.secret()).digest()
  }),
  qr(jr, 'messagePrefix', function () {
    return this.hash().slice(this.eddsa.encodingLength)
  }),
  (jr.prototype.sign = function (t) {
    return Fr(this._secret, 'KeyPair can only verify'), this.eddsa.sign(t, this)
  }),
  (jr.prototype.verify = function (t, e) {
    return this.eddsa.verify(t, e, this)
  }),
  (jr.prototype.getSecret = function (t) {
    return (
      Fr(this._secret, 'KeyPair is public only'), ve.encode(this.secret(), t)
    )
  }),
  (jr.prototype.getPublic = function (t) {
    return ve.encode(this.pubBytes(), t)
  })
var zr = jr,
  Wr = ve.assert,
  $r = ve.cachedProperty,
  Hr = ve.parseBytes
function Gr(t, e) {
  ;(this.eddsa = t),
    'object' != typeof e && (e = Hr(e)),
    Array.isArray(e) &&
      (e = { R: e.slice(0, t.encodingLength), S: e.slice(t.encodingLength) }),
    Wr(e.R && e.S, 'Signature without R or S'),
    t.isPoint(e.R) && (this._R = e.R),
    e.S instanceof Bt && (this._S = e.S),
    (this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded),
    (this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded)
}
$r(Gr, 'S', function () {
  return this.eddsa.decodeInt(this.Sencoded())
}),
  $r(Gr, 'R', function () {
    return this.eddsa.decodePoint(this.Rencoded())
  }),
  $r(Gr, 'Rencoded', function () {
    return this.eddsa.encodePoint(this.R())
  }),
  $r(Gr, 'Sencoded', function () {
    return this.eddsa.encodeInt(this.S())
  }),
  (Gr.prototype.toBytes = function () {
    return this.Rencoded().concat(this.Sencoded())
  }),
  (Gr.prototype.toHex = function () {
    return ve.encode(this.toBytes(), 'hex').toUpperCase()
  })
var Zr = Gr,
  Kr = ve.assert,
  Vr = ve.parseBytes
function Jr(t) {
  if (
    (Kr('ed25519' === t, 'only tested with ed25519 so far'),
    !(this instanceof Jr))
  )
    return new Jr(t)
  ;(this.curve = t = Ar[t].curve),
    (this.g = t.g),
    this.g.precompute(t.n.bitLength() + 1),
    (this.pointClass = t.point().constructor),
    (this.encodingLength = Math.ceil(t.n.bitLength() / 8)),
    (this.hash = vr.sha512)
}
var Xr = Jr
;(Jr.prototype.sign = function (t, e) {
  t = Vr(t)
  var i = this.keyFromSecret(e),
    r = this.hashInt(i.messagePrefix(), t),
    n = this.g.mul(r),
    s = this.encodePoint(n),
    a = this.hashInt(s, i.pubBytes(), t).mul(i.priv()),
    o = r.add(a).umod(this.curve.n)
  return this.makeSignature({ R: n, S: o, Rencoded: s })
}),
  (Jr.prototype.verify = function (t, e, i) {
    ;(t = Vr(t)), (e = this.makeSignature(e))
    var r = this.keyFromPublic(i),
      n = this.hashInt(e.Rencoded(), r.pubBytes(), t),
      s = this.g.mul(e.S())
    return e.R().add(r.pub().mul(n)).eq(s)
  }),
  (Jr.prototype.hashInt = function () {
    for (var t = this.hash(), e = 0; e < arguments.length; e++)
      t.update(arguments[e])
    return ve.intFromLE(t.digest()).umod(this.curve.n)
  }),
  (Jr.prototype.keyFromPublic = function (t) {
    return zr.fromPublic(this, t)
  }),
  (Jr.prototype.keyFromSecret = function (t) {
    return zr.fromSecret(this, t)
  }),
  (Jr.prototype.makeSignature = function (t) {
    return t instanceof Zr ? t : new Zr(this, t)
  }),
  (Jr.prototype.encodePoint = function (t) {
    var e = t.getY().toArray('le', this.encodingLength)
    return (e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0), e
  }),
  (Jr.prototype.decodePoint = function (t) {
    var e = (t = ve.parseBytes(t)).length - 1,
      i = t.slice(0, e).concat(-129 & t[e]),
      r = 0 != (128 & t[e]),
      n = ve.intFromLE(i)
    return this.curve.pointFromY(n, r)
  }),
  (Jr.prototype.encodeInt = function (t) {
    return t.toArray('le', this.encodingLength)
  }),
  (Jr.prototype.decodeInt = function (t) {
    return ve.intFromLE(t)
  }),
  (Jr.prototype.isPoint = function (t) {
    return t instanceof this.pointClass
  })
var Yr = wt(function (t, e) {
  var i = e
  ;(i.version = '6.5.4'),
    (i.utils = ve),
    (i.rand = Me),
    (i.curve = He),
    (i.curves = Ar),
    (i.ec = Dr),
    (i.eddsa = Xr)
})
const Qr = new (0, Yr.ec)('secp256k1'),
  tn = Qr.curve,
  en = tn.n.constructor
function rn(t) {
  const e = t[0]
  switch (e) {
    case 2:
    case 3:
      return 33 !== t.length
        ? null
        : (function (t, e) {
            let i = new en(e)
            if (i.cmp(tn.p) >= 0) return null
            i = i.toRed(tn.red)
            let r = i.redSqr().redIMul(i).redIAdd(tn.b).redSqrt()
            return (
              (3 === t) !== r.isOdd() && (r = r.redNeg()),
              Qr.keyPair({ pub: { x: i, y: r } })
            )
          })(e, t.subarray(1, 33))
    case 4:
    case 6:
    case 7:
      return 65 !== t.length
        ? null
        : (function (t, e, i) {
            let r = new en(e),
              n = new en(i)
            if (r.cmp(tn.p) >= 0 || n.cmp(tn.p) >= 0) return null
            if (
              ((r = r.toRed(tn.red)),
              (n = n.toRed(tn.red)),
              (6 === t || 7 === t) && n.isOdd() !== (7 === t))
            )
              return null
            const s = r.redSqr().redIMul(r)
            return n.redSqr().redISub(s.redIAdd(tn.b)).isZero()
              ? Qr.keyPair({ pub: { x: r, y: n } })
              : null
          })(e, t.subarray(1, 33), t.subarray(33, 65))
    default:
      return null
  }
}
function nn(t, e) {
  const i = e.encode(null, 33 === t.length)
  for (let e = 0; e < t.length; ++e) t[e] = i[e]
}
var sn = {
    contextRandomize: () => 0,
    privateKeyVerify(t) {
      const e = new en(t)
      return e.cmp(tn.n) < 0 && !e.isZero() ? 0 : 1
    },
    privateKeyNegate(t) {
      const e = new en(t),
        i = tn.n.sub(e).umod(tn.n).toArrayLike(Uint8Array, 'be', 32)
      return t.set(i), 0
    },
    privateKeyTweakAdd(t, e) {
      const i = new en(e)
      if (i.cmp(tn.n) >= 0) return 1
      if ((i.iadd(new en(t)), i.cmp(tn.n) >= 0 && i.isub(tn.n), i.isZero()))
        return 1
      const r = i.toArrayLike(Uint8Array, 'be', 32)
      return t.set(r), 0
    },
    privateKeyTweakMul(t, e) {
      let i = new en(e)
      if (i.cmp(tn.n) >= 0 || i.isZero()) return 1
      i.imul(new en(t)), i.cmp(tn.n) >= 0 && (i = i.umod(tn.n))
      const r = i.toArrayLike(Uint8Array, 'be', 32)
      return t.set(r), 0
    },
    publicKeyVerify: (t) => (null === rn(t) ? 1 : 0),
    publicKeyCreate(t, e) {
      const i = new en(e)
      return i.cmp(tn.n) >= 0 || i.isZero()
        ? 1
        : (nn(t, Qr.keyFromPrivate(e).getPublic()), 0)
    },
    publicKeyConvert(t, e) {
      const i = rn(e)
      return null === i ? 1 : (nn(t, i.getPublic()), 0)
    },
    publicKeyNegate(t, e) {
      const i = rn(e)
      if (null === i) return 1
      const r = i.getPublic()
      return (r.y = r.y.redNeg()), nn(t, r), 0
    },
    publicKeyCombine(t, e) {
      const i = new Array(e.length)
      for (let t = 0; t < e.length; ++t)
        if (((i[t] = rn(e[t])), null === i[t])) return 1
      let r = i[0].getPublic()
      for (let t = 1; t < i.length; ++t) r = r.add(i[t].pub)
      return r.isInfinity() ? 2 : (nn(t, r), 0)
    },
    publicKeyTweakAdd(t, e, i) {
      const r = rn(e)
      if (null === r) return 1
      if ((i = new en(i)).cmp(tn.n) >= 0) return 2
      const n = r.getPublic().add(tn.g.mul(i))
      return n.isInfinity() ? 2 : (nn(t, n), 0)
    },
    publicKeyTweakMul(t, e, i) {
      const r = rn(e)
      return null === r
        ? 1
        : (i = new en(i)).cmp(tn.n) >= 0 || i.isZero()
        ? 2
        : (nn(t, r.getPublic().mul(i)), 0)
    },
    signatureNormalize(t) {
      const e = new en(t.subarray(0, 32)),
        i = new en(t.subarray(32, 64))
      return e.cmp(tn.n) >= 0 || i.cmp(tn.n) >= 0
        ? 1
        : (1 === i.cmp(Qr.nh) &&
            t.set(tn.n.sub(i).toArrayLike(Uint8Array, 'be', 32), 32),
          0)
    },
    signatureExport(t, e) {
      const i = e.subarray(0, 32),
        r = e.subarray(32, 64)
      if (new en(i).cmp(tn.n) >= 0) return 1
      if (new en(r).cmp(tn.n) >= 0) return 1
      const { output: n } = t
      let s = n.subarray(4, 37)
      ;(s[0] = 0), s.set(i, 1)
      let a = 33,
        o = 0
      for (; a > 1 && 0 === s[o] && !(128 & s[o + 1]); --a, ++o);
      if (((s = s.subarray(o)), 128 & s[0])) return 1
      if (a > 1 && 0 === s[0] && !(128 & s[1])) return 1
      let u = n.subarray(39, 72)
      ;(u[0] = 0), u.set(r, 1)
      let h = 33,
        d = 0
      for (; h > 1 && 0 === u[d] && !(128 & u[d + 1]); --h, ++d);
      return (
        (u = u.subarray(d)),
        128 & u[0] || (h > 1 && 0 === u[0] && !(128 & u[1]))
          ? 1
          : ((t.outputlen = 6 + a + h),
            (n[0] = 48),
            (n[1] = t.outputlen - 2),
            (n[2] = 2),
            (n[3] = s.length),
            n.set(s, 4),
            (n[4 + a] = 2),
            (n[5 + a] = u.length),
            n.set(u, 6 + a),
            0)
      )
    },
    signatureImport(t, e) {
      if (e.length < 8) return 1
      if (e.length > 72) return 1
      if (48 !== e[0]) return 1
      if (e[1] !== e.length - 2) return 1
      if (2 !== e[2]) return 1
      const i = e[3]
      if (0 === i) return 1
      if (5 + i >= e.length) return 1
      if (2 !== e[4 + i]) return 1
      const r = e[5 + i]
      if (0 === r) return 1
      if (6 + i + r !== e.length) return 1
      if (128 & e[4]) return 1
      if (i > 1 && 0 === e[4] && !(128 & e[5])) return 1
      if (128 & e[i + 6]) return 1
      if (r > 1 && 0 === e[i + 6] && !(128 & e[i + 7])) return 1
      let n = e.subarray(4, 4 + i)
      if ((33 === n.length && 0 === n[0] && (n = n.subarray(1)), n.length > 32))
        return 1
      let s = e.subarray(6 + i)
      if ((33 === s.length && 0 === s[0] && (s = s.slice(1)), s.length > 32))
        throw new Error('S length is too long')
      let a = new en(n)
      a.cmp(tn.n) >= 0 && (a = new en(0))
      let o = new en(e.subarray(6 + i))
      return (
        o.cmp(tn.n) >= 0 && (o = new en(0)),
        t.set(a.toArrayLike(Uint8Array, 'be', 32), 0),
        t.set(o.toArrayLike(Uint8Array, 'be', 32), 32),
        0
      )
    },
    ecdsaSign(t, e, i, r, n) {
      if (n) {
        const t = n
        n = (n) => {
          const s = t(e, i, null, r, n)
          if (!(s instanceof Uint8Array && 32 === s.length))
            throw new Error('This is the way')
          return new en(s)
        }
      }
      const s = new en(i)
      if (s.cmp(tn.n) >= 0 || s.isZero()) return 1
      let a
      try {
        a = Qr.sign(e, i, { canonical: !0, k: n, pers: r })
      } catch (t) {
        return 1
      }
      return (
        t.signature.set(a.r.toArrayLike(Uint8Array, 'be', 32), 0),
        t.signature.set(a.s.toArrayLike(Uint8Array, 'be', 32), 32),
        (t.recid = a.recoveryParam),
        0
      )
    },
    ecdsaVerify(t, e, i) {
      const r = { r: t.subarray(0, 32), s: t.subarray(32, 64) },
        n = new en(r.r),
        s = new en(r.s)
      if (n.cmp(tn.n) >= 0 || s.cmp(tn.n) >= 0) return 1
      if (1 === s.cmp(Qr.nh) || n.isZero() || s.isZero()) return 3
      const a = rn(i)
      if (null === a) return 2
      const o = a.getPublic()
      return Qr.verify(e, r, o) ? 0 : 3
    },
    ecdsaRecover(t, e, i, r) {
      const n = { r: e.slice(0, 32), s: e.slice(32, 64) },
        s = new en(n.r),
        a = new en(n.s)
      if (s.cmp(tn.n) >= 0 || a.cmp(tn.n) >= 0) return 1
      if (s.isZero() || a.isZero()) return 2
      let o
      try {
        o = Qr.recoverPubKey(r, n, i)
      } catch (t) {
        return 2
      }
      return nn(t, o), 0
    },
    ecdh(t, e, i, r, n, s, a) {
      const o = rn(e)
      if (null === o) return 1
      const u = new en(i)
      if (u.cmp(tn.n) >= 0 || u.isZero()) return 2
      const h = o.getPublic().mul(u)
      if (void 0 === n) {
        const e = h.encode(null, !0),
          i = Qr.hash().update(e).digest()
        for (let e = 0; e < 32; ++e) t[e] = i[e]
      } else {
        s || (s = new Uint8Array(32))
        const e = h.getX().toArray('be', 32)
        for (let t = 0; t < 32; ++t) s[t] = e[t]
        a || (a = new Uint8Array(32))
        const i = h.getY().toArray('be', 32)
        for (let t = 0; t < 32; ++t) a[t] = i[t]
        const o = n(s, a, r)
        if (!(o instanceof Uint8Array && o.length === t.length)) return 2
        t.set(o)
      }
      return 0
    }
  },
  an = pe(sn),
  on = wt(function (t) {
    try {
      t.exports = me
    } catch (e) {
      t.exports = an
    }
  }),
  un = h.randomBytes,
  hn = /*#__PURE__*/ Object.defineProperty(
    {
      getRandomBytes: function (t) {
        return new Promise(function (e, i) {
          un(t, function (t, r) {
            t ? i(t) : e(r)
          })
        })
      },
      getRandomBytesSync: function (t) {
        return un(t)
      }
    },
    '__esModule',
    { value: !0 }
  ),
  dn = wt(function (t, e) {
    var i =
        (bt && bt.__awaiter) ||
        function (t, e, i, r) {
          return new (i || (i = Promise))(function (n, s) {
            function a(t) {
              try {
                u(r.next(t))
              } catch (t) {
                s(t)
              }
            }
            function o(t) {
              try {
                u(r.throw(t))
              } catch (t) {
                s(t)
              }
            }
            function u(t) {
              var e
              t.done
                ? n(t.value)
                : ((e = t.value),
                  e instanceof i
                    ? e
                    : new i(function (t) {
                        t(e)
                      })).then(a, o)
            }
            u((r = r.apply(t, e || [])).next())
          })
        },
      r =
        (bt && bt.__generator) ||
        function (t, e) {
          var i,
            r,
            n,
            s,
            a = {
              label: 0,
              sent: function () {
                if (1 & n[0]) throw n[1]
                return n[1]
              },
              trys: [],
              ops: []
            }
          return (
            (s = { next: o(0), throw: o(1), return: o(2) }),
            'function' == typeof Symbol &&
              (s[Symbol.iterator] = function () {
                return this
              }),
            s
          )
          function o(s) {
            return function (o) {
              return (function (s) {
                if (i) throw new TypeError('Generator is already executing.')
                for (; a; )
                  try {
                    if (
                      ((i = 1),
                      r &&
                        (n =
                          2 & s[0]
                            ? r.return
                            : s[0]
                            ? r.throw || ((n = r.return) && n.call(r), 0)
                            : r.next) &&
                        !(n = n.call(r, s[1])).done)
                    )
                      return n
                    switch (((r = 0), n && (s = [2 & s[0], n.value]), s[0])) {
                      case 0:
                      case 1:
                        n = s
                        break
                      case 4:
                        return a.label++, { value: s[1], done: !1 }
                      case 5:
                        a.label++, (r = s[1]), (s = [0])
                        continue
                      case 7:
                        ;(s = a.ops.pop()), a.trys.pop()
                        continue
                      default:
                        if (
                          !(
                            (n = (n = a.trys).length > 0 && n[n.length - 1]) ||
                            (6 !== s[0] && 2 !== s[0])
                          )
                        ) {
                          a = 0
                          continue
                        }
                        if (
                          3 === s[0] &&
                          (!n || (s[1] > n[0] && s[1] < n[3]))
                        ) {
                          a.label = s[1]
                          break
                        }
                        if (6 === s[0] && a.label < n[1]) {
                          ;(a.label = n[1]), (n = s)
                          break
                        }
                        if (n && a.label < n[2]) {
                          ;(a.label = n[2]), a.ops.push(s)
                          break
                        }
                        n[2] && a.ops.pop(), a.trys.pop()
                        continue
                    }
                    s = e.call(t, a)
                  } catch (t) {
                    ;(s = [6, t]), (r = 0)
                  } finally {
                    i = n = 0
                  }
                if (5 & s[0]) throw s[1]
                return { value: s[0] ? s[1] : void 0, done: !0 }
              })([s, o])
            }
          }
        }
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.createPrivateKey = function () {
        return i(this, void 0, void 0, function () {
          var t
          return r(this, function (e) {
            switch (e.label) {
              case 0:
                return [4, hn.getRandomBytes(32)]
              case 1:
                return (t = e.sent()), on.privateKeyVerify(t) ? [2, t] : [3, 0]
              case 2:
                return [2]
            }
          })
        })
      }),
      (e.createPrivateKeySync = function () {
        for (;;) {
          var t = hn.getRandomBytesSync(32)
          if (on.privateKeyVerify(t)) return t
        }
      }),
      (function (t) {
        for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i])
      })(on)
  }),
  ln = wt(function (t, e) {
    function i(t) {
      if ('string' != typeof t)
        throw new Error(
          "[isHexPrefixed] input must be type 'string', received type " +
            typeof t
        )
      return '0' === t[0] && 'x' === t[1]
    }
    function r(t) {
      let e = t
      if ('string' != typeof e)
        throw new Error(
          "[padToEven] value must be type 'string', received " + typeof e
        )
      return e.length % 2 && (e = `0${e}`), e
    }
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.isHexString =
        e.getKeys =
        e.fromAscii =
        e.fromUtf8 =
        e.toAscii =
        e.arrayContainsArray =
        e.getBinarySize =
        e.padToEven =
        e.stripHexPrefix =
        e.isHexPrefixed =
          void 0),
      (e.isHexPrefixed = i),
      (e.stripHexPrefix = (t) => {
        if ('string' != typeof t)
          throw new Error(
            "[stripHexPrefix] input must be type 'string', received " + typeof t
          )
        return i(t) ? t.slice(2) : t
      }),
      (e.padToEven = r),
      (e.getBinarySize = function (t) {
        if ('string' != typeof t)
          throw new Error(
            "[getBinarySize] method requires input type 'string', recieved " +
              typeof t
          )
        return Buffer.byteLength(t, 'utf8')
      }),
      (e.arrayContainsArray = function (t, e, i) {
        if (!0 !== Array.isArray(t))
          throw new Error(
            `[arrayContainsArray] method requires input 'superset' to be an array, got type '${typeof t}'`
          )
        if (!0 !== Array.isArray(e))
          throw new Error(
            `[arrayContainsArray] method requires input 'subset' to be an array, got type '${typeof e}'`
          )
        return e[i ? 'some' : 'every']((e) => t.indexOf(e) >= 0)
      }),
      (e.toAscii = function (t) {
        let e = '',
          i = 0
        const r = t.length
        for ('0x' === t.substring(0, 2) && (i = 2); i < r; i += 2) {
          const r = parseInt(t.substr(i, 2), 16)
          e += String.fromCharCode(r)
        }
        return e
      }),
      (e.fromUtf8 = function (t) {
        return `0x${r(Buffer.from(t, 'utf8').toString('hex')).replace(
          /^0+|0+$/g,
          ''
        )}`
      }),
      (e.fromAscii = function (t) {
        let e = ''
        for (let i = 0; i < t.length; i++) {
          const r = t.charCodeAt(i).toString(16)
          e += r.length < 2 ? `0${r}` : r
        }
        return `0x${e}`
      }),
      (e.getKeys = function (t, e, i) {
        if (!Array.isArray(t))
          throw new Error(
            "[getKeys] method expects input 'params' to be an array, got " +
              typeof t
          )
        if ('string' != typeof e)
          throw new Error(
            "[getKeys] method expects input 'key' to be type 'string', got " +
              typeof t
          )
        const r = []
        for (let n = 0; n < t.length; n++) {
          let s = t[n][e]
          if (i && !s) s = ''
          else if ('string' != typeof s)
            throw new Error(
              "invalid abi - expected type 'string', received " + typeof s
            )
          r.push(s)
        }
        return r
      }),
      (e.isHexString = function (t, e) {
        return !(
          'string' != typeof t ||
          !t.match(/^0x[0-9A-Fa-f]*$/) ||
          (e && t.length !== 2 + 2 * e)
        )
      })
  }),
  fn = wt(function (t, e) {
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.assertIsString =
        e.assertIsArray =
        e.assertIsBuffer =
        e.assertIsHexString =
          void 0),
      (e.assertIsHexString = function (t) {
        if (!(0, ln.isHexString)(t))
          throw new Error(
            `This method only supports 0x-prefixed hex strings but input was: ${t}`
          )
      }),
      (e.assertIsBuffer = function (t) {
        if (!Buffer.isBuffer(t))
          throw new Error(
            `This method only supports Buffer but input was: ${t}`
          )
      }),
      (e.assertIsArray = function (t) {
        if (!Array.isArray(t))
          throw new Error(
            `This method only supports number arrays but input was: ${t}`
          )
      }),
      (e.assertIsString = function (t) {
        if ('string' != typeof t)
          throw new Error(
            `This method only supports strings but input was: ${t}`
          )
      })
  }),
  cn = wt(function (t, e) {
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.bufArrToArr =
        e.arrToBufArr =
        e.validateNoLeadingZeroes =
        e.baToJSON =
        e.toUtf8 =
        e.addHexPrefix =
        e.toUnsigned =
        e.fromSigned =
        e.bufferToHex =
        e.bufferToInt =
        e.toBuffer =
        e.unpadHexString =
        e.unpadArray =
        e.unpadBuffer =
        e.setLengthRight =
        e.setLengthLeft =
        e.zeros =
        e.intToBuffer =
        e.intToHex =
          void 0),
      (e.intToHex = function (t) {
        if (!Number.isSafeInteger(t) || t < 0)
          throw new Error(`Received an invalid integer type: ${t}`)
        return `0x${t.toString(16)}`
      }),
      (e.intToBuffer = function (t) {
        const i = (0, e.intToHex)(t)
        return Buffer.from((0, ln.padToEven)(i.slice(2)), 'hex')
      }),
      (e.zeros = function (t) {
        return Buffer.allocUnsafe(t).fill(0)
      })
    const i = function (t, i, r) {
      const n = (0, e.zeros)(i)
      return r
        ? t.length < i
          ? (t.copy(n), n)
          : t.slice(0, i)
        : t.length < i
        ? (t.copy(n, i - t.length), n)
        : t.slice(-i)
    }
    ;(e.setLengthLeft = function (t, e) {
      return (0, fn.assertIsBuffer)(t), i(t, e, !1)
    }),
      (e.setLengthRight = function (t, e) {
        return (0, fn.assertIsBuffer)(t), i(t, e, !0)
      })
    const r = function (t) {
      let e = t[0]
      for (; t.length > 0 && '0' === e.toString(); ) e = (t = t.slice(1))[0]
      return t
    }
    ;(e.unpadBuffer = function (t) {
      return (0, fn.assertIsBuffer)(t), r(t)
    }),
      (e.unpadArray = function (t) {
        return (0, fn.assertIsArray)(t), r(t)
      }),
      (e.unpadHexString = function (t) {
        return (
          (0, fn.assertIsHexString)(t), (t = (0, ln.stripHexPrefix)(t)), r(t)
        )
      }),
      (e.toBuffer = function (t) {
        if (null == t) return Buffer.allocUnsafe(0)
        if (Buffer.isBuffer(t)) return Buffer.from(t)
        if (Array.isArray(t) || t instanceof Uint8Array) return Buffer.from(t)
        if ('string' == typeof t) {
          if (!(0, ln.isHexString)(t))
            throw new Error(
              `Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${t}`
            )
          return Buffer.from(
            (0, ln.padToEven)((0, ln.stripHexPrefix)(t)),
            'hex'
          )
        }
        if ('number' == typeof t) return (0, e.intToBuffer)(t)
        if (Lt.BN.isBN(t)) {
          if (t.isNeg())
            throw new Error(`Cannot convert negative BN to buffer. Given: ${t}`)
          return t.toArrayLike(Buffer)
        }
        if (t.toArray) return Buffer.from(t.toArray())
        if (t.toBuffer) return Buffer.from(t.toBuffer())
        throw new Error('invalid type')
      }),
      (e.bufferToInt = function (t) {
        return new Lt.BN((0, e.toBuffer)(t)).toNumber()
      }),
      (e.bufferToHex = function (t) {
        return '0x' + (t = (0, e.toBuffer)(t)).toString('hex')
      }),
      (e.fromSigned = function (t) {
        return new Lt.BN(t).fromTwos(256)
      }),
      (e.toUnsigned = function (t) {
        return Buffer.from(t.toTwos(256).toArray())
      }),
      (e.addHexPrefix = function (t) {
        return 'string' != typeof t || (0, ln.isHexPrefixed)(t) ? t : '0x' + t
      }),
      (e.toUtf8 = function (t) {
        if ((t = (0, ln.stripHexPrefix)(t)).length % 2 != 0)
          throw new Error(
            'Invalid non-even hex string input for toUtf8() provided'
          )
        return Buffer.from(t.replace(/^(00)+|(00)+$/g, ''), 'hex').toString(
          'utf8'
        )
      }),
      (e.baToJSON = function (t) {
        if (Buffer.isBuffer(t)) return `0x${t.toString('hex')}`
        if (t instanceof Array) {
          const i = []
          for (let r = 0; r < t.length; r++) i.push((0, e.baToJSON)(t[r]))
          return i
        }
      }),
      (e.validateNoLeadingZeroes = function (t) {
        for (const [e, i] of Object.entries(t))
          if (void 0 !== i && i.length > 0 && 0 === i[0])
            throw new Error(
              `${e} cannot have leading zeroes, received: ${i.toString('hex')}`
            )
      }),
      (e.arrToBufArr = function t(e) {
        return Array.isArray(e) ? e.map((e) => t(e)) : Buffer.from(e)
      }),
      (e.bufArrToArr = function t(e) {
        return Array.isArray(e)
          ? e.map((e) => t(e))
          : Uint8Array.from(null != e ? e : [])
      })
  }),
  pn = /*#__PURE__*/ Object.defineProperty(
    {
      createHashFunction: function (t) {
        return function (e) {
          var i = t()
          return i.update(e), Buffer.from(i.digest())
        }
      }
    },
    '__esModule',
    { value: !0 }
  ),
  mn = d
function gn(t, e) {
  var i = Object.keys(t)
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t)
    e &&
      (r = r.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })),
      i.push.apply(i, r)
  }
  return i
}
function yn(t, e, i) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = i),
    t
  )
}
var bn = o.Buffer,
  wn = l.inspect,
  vn = (wn && wn.custom) || 'inspect'
function Mn(t, e, i) {
  bn.prototype.copy.call(t, e, i)
}
var An =
  /*#__PURE__*/
  (function () {
    function t() {
      !(function (t, e) {
        if (!(t instanceof e))
          throw new TypeError('Cannot call a class as a function')
      })(this, t),
        (this.head = null),
        (this.tail = null),
        (this.length = 0)
    }
    var e
    return (
      (e = [
        {
          key: 'push',
          value: function (t) {
            var e = { data: t, next: null }
            this.length > 0 ? (this.tail.next = e) : (this.head = e),
              (this.tail = e),
              ++this.length
          }
        },
        {
          key: 'unshift',
          value: function (t) {
            var e = { data: t, next: this.head }
            0 === this.length && (this.tail = e), (this.head = e), ++this.length
          }
        },
        {
          key: 'shift',
          value: function () {
            if (0 !== this.length) {
              var t = this.head.data
              return (
                (this.head =
                  1 === this.length ? (this.tail = null) : this.head.next),
                --this.length,
                t
              )
            }
          }
        },
        {
          key: 'clear',
          value: function () {
            ;(this.head = this.tail = null), (this.length = 0)
          }
        },
        {
          key: 'join',
          value: function (t) {
            if (0 === this.length) return ''
            for (var e = this.head, i = '' + e.data; (e = e.next); )
              i += t + e.data
            return i
          }
        },
        {
          key: 'concat',
          value: function (t) {
            if (0 === this.length) return bn.alloc(0)
            for (var e = bn.allocUnsafe(t >>> 0), i = this.head, r = 0; i; )
              Mn(i.data, e, r), (r += i.data.length), (i = i.next)
            return e
          }
        },
        {
          key: 'consume',
          value: function (t, e) {
            var i
            return (
              t < this.head.data.length
                ? ((i = this.head.data.slice(0, t)),
                  (this.head.data = this.head.data.slice(t)))
                : (i =
                    t === this.head.data.length
                      ? this.shift()
                      : e
                      ? this._getString(t)
                      : this._getBuffer(t)),
              i
            )
          }
        },
        {
          key: 'first',
          value: function () {
            return this.head.data
          }
        },
        {
          key: '_getString',
          value: function (t) {
            var e = this.head,
              i = 1,
              r = e.data
            for (t -= r.length; (e = e.next); ) {
              var n = e.data,
                s = t > n.length ? n.length : t
              if (((r += s === n.length ? n : n.slice(0, t)), 0 == (t -= s))) {
                s === n.length
                  ? (++i, (this.head = e.next ? e.next : (this.tail = null)))
                  : ((this.head = e), (e.data = n.slice(s)))
                break
              }
              ++i
            }
            return (this.length -= i), r
          }
        },
        {
          key: '_getBuffer',
          value: function (t) {
            var e = bn.allocUnsafe(t),
              i = this.head,
              r = 1
            for (i.data.copy(e), t -= i.data.length; (i = i.next); ) {
              var n = i.data,
                s = t > n.length ? n.length : t
              if ((n.copy(e, e.length - t, 0, s), 0 == (t -= s))) {
                s === n.length
                  ? (++r, (this.head = i.next ? i.next : (this.tail = null)))
                  : ((this.head = i), (i.data = n.slice(s)))
                break
              }
              ++r
            }
            return (this.length -= r), e
          }
        },
        {
          key: vn,
          value: function (t, e) {
            return wn(
              this,
              (function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var i = null != arguments[e] ? arguments[e] : {}
                  e % 2
                    ? gn(Object(i), !0).forEach(function (e) {
                        yn(t, e, i[e])
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                        t,
                        Object.getOwnPropertyDescriptors(i)
                      )
                    : gn(Object(i)).forEach(function (e) {
                        Object.defineProperty(
                          t,
                          e,
                          Object.getOwnPropertyDescriptor(i, e)
                        )
                      })
                }
                return t
              })({}, e, { depth: 0, customInspect: !1 })
            )
          }
        }
      ]),
      e &&
        (function (t, e) {
          for (var i = 0; i < e.length; i++) {
            var r = e[i]
            ;(r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(t, r.key, r)
          }
        })(t.prototype, e),
      t
    )
  })()
function _n(t, e) {
  Tn(t, e), Sn(t)
}
function Sn(t) {
  ;(t._writableState && !t._writableState.emitClose) ||
    (t._readableState && !t._readableState.emitClose) ||
    t.emit('close')
}
function Tn(t, e) {
  t.emit('error', e)
}
var xn = function (t, e) {
    var i = this
    return (this._readableState && this._readableState.destroyed) ||
      (this._writableState && this._writableState.destroyed)
      ? (e
          ? e(t)
          : t &&
            (this._writableState
              ? this._writableState.errorEmitted ||
                ((this._writableState.errorEmitted = !0),
                process.nextTick(Tn, this, t))
              : process.nextTick(Tn, this, t)),
        this)
      : (this._readableState && (this._readableState.destroyed = !0),
        this._writableState && (this._writableState.destroyed = !0),
        this._destroy(t || null, function (t) {
          !e && t
            ? i._writableState
              ? i._writableState.errorEmitted
                ? process.nextTick(Sn, i)
                : ((i._writableState.errorEmitted = !0),
                  process.nextTick(_n, i, t))
              : process.nextTick(_n, i, t)
            : e
            ? (process.nextTick(Sn, i), e(t))
            : process.nextTick(Sn, i)
        }),
        this)
  },
  En = function () {
    this._readableState &&
      ((this._readableState.destroyed = !1),
      (this._readableState.reading = !1),
      (this._readableState.ended = !1),
      (this._readableState.endEmitted = !1)),
      this._writableState &&
        ((this._writableState.destroyed = !1),
        (this._writableState.ended = !1),
        (this._writableState.ending = !1),
        (this._writableState.finalCalled = !1),
        (this._writableState.prefinished = !1),
        (this._writableState.finished = !1),
        (this._writableState.errorEmitted = !1))
  },
  Rn = function (t, e) {
    var i = t._readableState,
      r = t._writableState
    ;(i && i.autoDestroy) || (r && r.autoDestroy)
      ? t.destroy(e)
      : t.emit('error', e)
  }
const kn = {}
function In(t, e, i) {
  i || (i = Error)
  class r extends i {
    constructor(t, i, r) {
      super(
        (function (t, i, r) {
          return 'string' == typeof e ? e : e(t, i, r)
        })(t, i, r)
      )
    }
  }
  ;(r.prototype.name = i.name), (r.prototype.code = t), (kn[t] = r)
}
function Bn(t, e) {
  if (Array.isArray(t)) {
    const i = t.length
    return (
      (t = t.map((t) => String(t))),
      i > 2
        ? `one of ${e} ${t.slice(0, i - 1).join(', ')}, or ` + t[i - 1]
        : 2 === i
        ? `one of ${e} ${t[0]} or ${t[1]}`
        : `of ${e} ${t[0]}`
    )
  }
  return `of ${e} ${String(t)}`
}
In(
  'ERR_INVALID_OPT_VALUE',
  function (t, e) {
    return 'The value "' + e + '" is invalid for option "' + t + '"'
  },
  TypeError
),
  In(
    'ERR_INVALID_ARG_TYPE',
    function (t, e, i) {
      let r, n
      var s, a
      return (
        'string' == typeof e && 'not ' === e.substr(0, 'not '.length)
          ? ((r = 'must not be'), (e = e.replace(/^not /, '')))
          : (r = 'must be'),
        (n = (function (t, e, i) {
          return (
            (void 0 === i || i > t.length) && (i = t.length),
            t.substring(i - e.length, i) === e
          )
        })(t, ' argument')
          ? `The ${t} ${r} ${Bn(e, 'type')}`
          : `The "${t}" ${
              ('number' != typeof a && (a = 0),
              a + '.'.length > (s = t).length || -1 === s.indexOf('.', a)
                ? 'argument'
                : 'property')
            } ${r} ${Bn(e, 'type')}`),
        (n += '. Received type ' + typeof i),
        n
      )
    },
    TypeError
  ),
  In('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF'),
  In('ERR_METHOD_NOT_IMPLEMENTED', function (t) {
    return 'The ' + t + ' method is not implemented'
  }),
  In('ERR_STREAM_PREMATURE_CLOSE', 'Premature close'),
  In('ERR_STREAM_DESTROYED', function (t) {
    return 'Cannot call ' + t + ' after a stream was destroyed'
  }),
  In('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times'),
  In('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable'),
  In('ERR_STREAM_WRITE_AFTER_END', 'write after end'),
  In(
    'ERR_STREAM_NULL_VALUES',
    'May not write null values to stream',
    TypeError
  ),
  In(
    'ERR_UNKNOWN_ENCODING',
    function (t) {
      return 'Unknown encoding: ' + t
    },
    TypeError
  ),
  In('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event')
var On,
  Pn = { codes: kn },
  Cn = Pn.codes.ERR_INVALID_OPT_VALUE,
  Nn = function (t, e, i, r) {
    var n = (function (t, e, i) {
      return null != t.highWaterMark ? t.highWaterMark : e ? t[i] : null
    })(e, r, i)
    if (null != n) {
      if (!isFinite(n) || Math.floor(n) !== n || n < 0)
        throw new Cn(r ? i : 'highWaterMark', n)
      return Math.floor(n)
    }
    return t.objectMode ? 16 : 16384
  },
  Ln = l.deprecate,
  Dn = fs,
  Fn = rs
function Un(t) {
  var e = this
  ;(this.next = null),
    (this.entry = null),
    (this.finish = function () {
      !(function (t, e, i) {
        var r = t.entry
        for (t.entry = null; r; ) {
          var n = r.callback
          e.pendingcb--, n(void 0), (r = r.next)
        }
        e.corkedRequestsFree.next = t
      })(e, t)
    })
}
rs.WritableState = is
var qn,
  jn = { deprecate: Ln },
  zn = o.Buffer,
  Wn = bt.Uint8Array || function () {},
  $n = Nn,
  Hn = Pn.codes,
  Gn = Hn.ERR_INVALID_ARG_TYPE,
  Zn = Hn.ERR_METHOD_NOT_IMPLEMENTED,
  Kn = Hn.ERR_MULTIPLE_CALLBACK,
  Vn = Hn.ERR_STREAM_CANNOT_PIPE,
  Jn = Hn.ERR_STREAM_DESTROYED,
  Xn = Hn.ERR_STREAM_NULL_VALUES,
  Yn = Hn.ERR_STREAM_WRITE_AFTER_END,
  Qn = Hn.ERR_UNKNOWN_ENCODING,
  ts = Rn
function es() {}
function is(t, e, i) {
  ;(On = On || Dn),
    'boolean' != typeof i && (i = e instanceof On),
    (this.objectMode = !!(t = t || {}).objectMode),
    i && (this.objectMode = this.objectMode || !!t.writableObjectMode),
    (this.highWaterMark = $n(this, t, 'writableHighWaterMark', i)),
    (this.finalCalled = !1),
    (this.needDrain = !1),
    (this.ending = !1),
    (this.ended = !1),
    (this.finished = !1),
    (this.destroyed = !1),
    (this.decodeStrings = !(!1 === t.decodeStrings)),
    (this.defaultEncoding = t.defaultEncoding || 'utf8'),
    (this.length = 0),
    (this.writing = !1),
    (this.corked = 0),
    (this.sync = !0),
    (this.bufferProcessing = !1),
    (this.onwrite = function (t) {
      !(function (t, e) {
        var i = t._writableState,
          r = i.sync,
          n = i.writecb
        if ('function' != typeof n) throw new Kn()
        if (
          ((function (t) {
            ;(t.writing = !1),
              (t.writecb = null),
              (t.length -= t.writelen),
              (t.writelen = 0)
          })(i),
          e)
        )
          !(function (t, e, i, r, n) {
            --e.pendingcb,
              i
                ? (process.nextTick(n, r),
                  process.nextTick(hs, t, e),
                  (t._writableState.errorEmitted = !0),
                  ts(t, r))
                : (n(r),
                  (t._writableState.errorEmitted = !0),
                  ts(t, r),
                  hs(t, e))
          })(t, i, r, e, n)
        else {
          var s = os(i) || t.destroyed
          s || i.corked || i.bufferProcessing || !i.bufferedRequest || as(t, i),
            r ? process.nextTick(ss, t, i, s, n) : ss(t, i, s, n)
        }
      })(e, t)
    }),
    (this.writecb = null),
    (this.writelen = 0),
    (this.bufferedRequest = null),
    (this.lastBufferedRequest = null),
    (this.pendingcb = 0),
    (this.prefinished = !1),
    (this.errorEmitted = !1),
    (this.emitClose = !1 !== t.emitClose),
    (this.autoDestroy = !!t.autoDestroy),
    (this.bufferedRequestCount = 0),
    (this.corkedRequestsFree = new Un(this))
}
function rs(t) {
  var e = this instanceof (On = On || Dn)
  if (!e && !qn.call(rs, this)) return new rs(t)
  ;(this._writableState = new is(t, this, e)),
    (this.writable = !0),
    t &&
      ('function' == typeof t.write && (this._write = t.write),
      'function' == typeof t.writev && (this._writev = t.writev),
      'function' == typeof t.destroy && (this._destroy = t.destroy),
      'function' == typeof t.final && (this._final = t.final)),
    mn.call(this)
}
function ns(t, e, i, r, n, s, a) {
  ;(e.writelen = r),
    (e.writecb = a),
    (e.writing = !0),
    (e.sync = !0),
    e.destroyed
      ? e.onwrite(new Jn('write'))
      : i
      ? t._writev(n, e.onwrite)
      : t._write(n, s, e.onwrite),
    (e.sync = !1)
}
function ss(t, e, i, r) {
  i ||
    (function (t, e) {
      0 === e.length && e.needDrain && ((e.needDrain = !1), t.emit('drain'))
    })(t, e),
    e.pendingcb--,
    r(),
    hs(t, e)
}
function as(t, e) {
  e.bufferProcessing = !0
  var i = e.bufferedRequest
  if (t._writev && i && i.next) {
    var r = new Array(e.bufferedRequestCount),
      n = e.corkedRequestsFree
    n.entry = i
    for (var s = 0, a = !0; i; )
      (r[s] = i), i.isBuf || (a = !1), (i = i.next), (s += 1)
    ;(r.allBuffers = a),
      ns(t, e, !0, e.length, r, '', n.finish),
      e.pendingcb++,
      (e.lastBufferedRequest = null),
      n.next
        ? ((e.corkedRequestsFree = n.next), (n.next = null))
        : (e.corkedRequestsFree = new Un(e)),
      (e.bufferedRequestCount = 0)
  } else {
    for (; i; ) {
      var o = i.chunk
      if (
        (ns(t, e, !1, e.objectMode ? 1 : o.length, o, i.encoding, i.callback),
        (i = i.next),
        e.bufferedRequestCount--,
        e.writing)
      )
        break
    }
    null === i && (e.lastBufferedRequest = null)
  }
  ;(e.bufferedRequest = i), (e.bufferProcessing = !1)
}
function os(t) {
  return (
    t.ending &&
    0 === t.length &&
    null === t.bufferedRequest &&
    !t.finished &&
    !t.writing
  )
}
function us(t, e) {
  t._final(function (i) {
    e.pendingcb--,
      i && ts(t, i),
      (e.prefinished = !0),
      t.emit('prefinish'),
      hs(t, e)
  })
}
function hs(t, e) {
  var i = os(e)
  if (
    i &&
    ((function (t, e) {
      e.prefinished ||
        e.finalCalled ||
        ('function' != typeof t._final || e.destroyed
          ? ((e.prefinished = !0), t.emit('prefinish'))
          : (e.pendingcb++, (e.finalCalled = !0), process.nextTick(us, t, e)))
    })(t, e),
    0 === e.pendingcb && ((e.finished = !0), t.emit('finish'), e.autoDestroy))
  ) {
    var r = t._readableState
    ;(!r || (r.autoDestroy && r.endEmitted)) && t.destroy()
  }
  return i
}
Oe(rs, mn),
  (is.prototype.getBuffer = function () {
    for (var t = this.bufferedRequest, e = []; t; ) e.push(t), (t = t.next)
    return e
  }),
  (function () {
    try {
      Object.defineProperty(is.prototype, 'buffer', {
        get: jn.deprecate(
          function () {
            return this.getBuffer()
          },
          '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.',
          'DEP0003'
        )
      })
    } catch (t) {}
  })(),
  'function' == typeof Symbol &&
  Symbol.hasInstance &&
  'function' == typeof Function.prototype[Symbol.hasInstance]
    ? ((qn = Function.prototype[Symbol.hasInstance]),
      Object.defineProperty(rs, Symbol.hasInstance, {
        value: function (t) {
          return (
            !!qn.call(this, t) ||
            (this === rs && t && t._writableState instanceof is)
          )
        }
      }))
    : (qn = function (t) {
        return t instanceof this
      }),
  (rs.prototype.pipe = function () {
    ts(this, new Vn())
  }),
  (rs.prototype.write = function (t, e, i) {
    var r,
      n = this._writableState,
      s = !1,
      a = !n.objectMode && (zn.isBuffer((r = t)) || r instanceof Wn)
    return (
      a &&
        !zn.isBuffer(t) &&
        (t = (function (t) {
          return zn.from(t)
        })(t)),
      'function' == typeof e && ((i = e), (e = null)),
      a ? (e = 'buffer') : e || (e = n.defaultEncoding),
      'function' != typeof i && (i = es),
      n.ending
        ? (function (t, e) {
            var i = new Yn()
            ts(t, i), process.nextTick(e, i)
          })(this, i)
        : (a ||
            (function (t, e, i, r) {
              var n
              return (
                null === i
                  ? (n = new Xn())
                  : 'string' == typeof i ||
                    e.objectMode ||
                    (n = new Gn('chunk', ['string', 'Buffer'], i)),
                !n || (ts(t, n), process.nextTick(r, n), !1)
              )
            })(this, n, t, i)) &&
          (n.pendingcb++,
          (s = (function (t, e, i, r, n, s) {
            if (!i) {
              var a = (function (t, e, i) {
                return (
                  t.objectMode ||
                    !1 === t.decodeStrings ||
                    'string' != typeof e ||
                    (e = zn.from(e, i)),
                  e
                )
              })(e, r, n)
              r !== a && ((i = !0), (n = 'buffer'), (r = a))
            }
            var o = e.objectMode ? 1 : r.length
            e.length += o
            var u = e.length < e.highWaterMark
            if ((u || (e.needDrain = !0), e.writing || e.corked)) {
              var h = e.lastBufferedRequest
              ;(e.lastBufferedRequest = {
                chunk: r,
                encoding: n,
                isBuf: i,
                callback: s,
                next: null
              }),
                h
                  ? (h.next = e.lastBufferedRequest)
                  : (e.bufferedRequest = e.lastBufferedRequest),
                (e.bufferedRequestCount += 1)
            } else ns(t, e, !1, o, r, n, s)
            return u
          })(this, n, a, t, e, i))),
      s
    )
  }),
  (rs.prototype.cork = function () {
    this._writableState.corked++
  }),
  (rs.prototype.uncork = function () {
    var t = this._writableState
    t.corked &&
      (t.corked--,
      t.writing ||
        t.corked ||
        t.bufferProcessing ||
        !t.bufferedRequest ||
        as(this, t))
  }),
  (rs.prototype.setDefaultEncoding = function (t) {
    if (
      ('string' == typeof t && (t = t.toLowerCase()),
      !(
        [
          'hex',
          'utf8',
          'utf-8',
          'ascii',
          'binary',
          'base64',
          'ucs2',
          'ucs-2',
          'utf16le',
          'utf-16le',
          'raw'
        ].indexOf((t + '').toLowerCase()) > -1
      ))
    )
      throw new Qn(t)
    return (this._writableState.defaultEncoding = t), this
  }),
  Object.defineProperty(rs.prototype, 'writableBuffer', {
    enumerable: !1,
    get: function () {
      return this._writableState && this._writableState.getBuffer()
    }
  }),
  Object.defineProperty(rs.prototype, 'writableHighWaterMark', {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark
    }
  }),
  (rs.prototype._write = function (t, e, i) {
    i(new Zn('_write()'))
  }),
  (rs.prototype._writev = null),
  (rs.prototype.end = function (t, e, i) {
    var r = this._writableState
    return (
      'function' == typeof t
        ? ((i = t), (t = null), (e = null))
        : 'function' == typeof e && ((i = e), (e = null)),
      null != t && this.write(t, e),
      r.corked && ((r.corked = 1), this.uncork()),
      r.ending ||
        (function (t, e, i) {
          ;(e.ending = !0),
            hs(t, e),
            i && (e.finished ? process.nextTick(i) : t.once('finish', i)),
            (e.ended = !0),
            (t.writable = !1)
        })(this, r, i),
      this
    )
  }),
  Object.defineProperty(rs.prototype, 'writableLength', {
    enumerable: !1,
    get: function () {
      return this._writableState.length
    }
  }),
  Object.defineProperty(rs.prototype, 'destroyed', {
    enumerable: !1,
    get: function () {
      return void 0 !== this._writableState && this._writableState.destroyed
    },
    set: function (t) {
      this._writableState && (this._writableState.destroyed = t)
    }
  }),
  (rs.prototype.destroy = xn),
  (rs.prototype._undestroy = En),
  (rs.prototype._destroy = function (t, e) {
    e(t)
  })
var ds = $s,
  ls =
    Object.keys ||
    function (t) {
      var e = []
      for (var i in t) e.push(i)
      return e
    },
  fs = gs
Oe(gs, ds)
for (var cs = ls(Fn.prototype), ps = 0; ps < cs.length; ps++) {
  var ms = cs[ps]
  gs.prototype[ms] || (gs.prototype[ms] = Fn.prototype[ms])
}
function gs(t) {
  if (!(this instanceof gs)) return new gs(t)
  ds.call(this, t),
    Fn.call(this, t),
    (this.allowHalfOpen = !0),
    t &&
      (!1 === t.readable && (this.readable = !1),
      !1 === t.writable && (this.writable = !1),
      !1 === t.allowHalfOpen &&
        ((this.allowHalfOpen = !1), this.once('end', ys)))
}
function ys() {
  this._writableState.ended || process.nextTick(bs, this)
}
function bs(t) {
  t.end()
}
Object.defineProperty(gs.prototype, 'writableHighWaterMark', {
  enumerable: !1,
  get: function () {
    return this._writableState.highWaterMark
  }
}),
  Object.defineProperty(gs.prototype, 'writableBuffer', {
    enumerable: !1,
    get: function () {
      return this._writableState && this._writableState.getBuffer()
    }
  }),
  Object.defineProperty(gs.prototype, 'writableLength', {
    enumerable: !1,
    get: function () {
      return this._writableState.length
    }
  }),
  Object.defineProperty(gs.prototype, 'destroyed', {
    enumerable: !1,
    get: function () {
      return (
        void 0 !== this._readableState &&
        void 0 !== this._writableState &&
        this._readableState.destroyed &&
        this._writableState.destroyed
      )
    },
    set: function (t) {
      void 0 !== this._readableState &&
        void 0 !== this._writableState &&
        ((this._readableState.destroyed = t),
        (this._writableState.destroyed = t))
    }
  })
var ws = Pn.codes.ERR_STREAM_PREMATURE_CLOSE
function vs() {}
var Ms,
  As = function t(e, i, r) {
    if ('function' == typeof i) return t(e, null, i)
    i || (i = {}),
      (r = (function (t) {
        var e = !1
        return function () {
          if (!e) {
            e = !0
            for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
              r[n] = arguments[n]
            t.apply(this, r)
          }
        }
      })(r || vs))
    var n = i.readable || (!1 !== i.readable && e.readable),
      s = i.writable || (!1 !== i.writable && e.writable),
      a = function () {
        e.writable || u()
      },
      o = e._writableState && e._writableState.finished,
      u = function () {
        ;(s = !1), (o = !0), n || r.call(e)
      },
      h = e._readableState && e._readableState.endEmitted,
      d = function () {
        ;(n = !1), (h = !0), s || r.call(e)
      },
      l = function (t) {
        r.call(e, t)
      },
      f = function () {
        var t
        return n && !h
          ? ((e._readableState && e._readableState.ended) || (t = new ws()),
            r.call(e, t))
          : s && !o
          ? ((e._writableState && e._writableState.ended) || (t = new ws()),
            r.call(e, t))
          : void 0
      },
      c = function () {
        e.req.on('finish', u)
      }
    return (
      (function (t) {
        return t.setHeader && 'function' == typeof t.abort
      })(e)
        ? (e.on('complete', u),
          e.on('abort', f),
          e.req ? c() : e.on('request', c))
        : s && !e._writableState && (e.on('end', a), e.on('close', a)),
      e.on('end', d),
      e.on('finish', u),
      !1 !== i.error && e.on('error', l),
      e.on('close', f),
      function () {
        e.removeListener('complete', u),
          e.removeListener('abort', f),
          e.removeListener('request', c),
          e.req && e.req.removeListener('finish', u),
          e.removeListener('end', a),
          e.removeListener('close', a),
          e.removeListener('finish', u),
          e.removeListener('end', d),
          e.removeListener('error', l),
          e.removeListener('close', f)
      }
    )
  }
function _s(t, e, i) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = i),
    t
  )
}
var Ss = Symbol('lastResolve'),
  Ts = Symbol('lastReject'),
  xs = Symbol('error'),
  Es = Symbol('ended'),
  Rs = Symbol('lastPromise'),
  ks = Symbol('handlePromise'),
  Is = Symbol('stream')
function Bs(t, e) {
  return { value: t, done: e }
}
function Os(t) {
  var e = t[Ss]
  if (null !== e) {
    var i = t[Is].read()
    null !== i && ((t[Rs] = null), (t[Ss] = null), (t[Ts] = null), e(Bs(i, !1)))
  }
}
function Ps(t) {
  process.nextTick(Os, t)
}
var Cs = Object.getPrototypeOf(function () {}),
  Ns = Object.setPrototypeOf(
    (_s(
      (Ms = {
        get stream() {
          return this[Is]
        },
        next: function () {
          var t = this,
            e = this[xs]
          if (null !== e) return Promise.reject(e)
          if (this[Es]) return Promise.resolve(Bs(void 0, !0))
          if (this[Is].destroyed)
            return new Promise(function (e, i) {
              process.nextTick(function () {
                t[xs] ? i(t[xs]) : e(Bs(void 0, !0))
              })
            })
          var i,
            r = this[Rs]
          if (r)
            i = new Promise(
              (function (t, e) {
                return function (i, r) {
                  t.then(function () {
                    e[Es] ? i(Bs(void 0, !0)) : e[ks](i, r)
                  }, r)
                }
              })(r, this)
            )
          else {
            var n = this[Is].read()
            if (null !== n) return Promise.resolve(Bs(n, !1))
            i = new Promise(this[ks])
          }
          return (this[Rs] = i), i
        }
      }),
      Symbol.asyncIterator,
      function () {
        return this
      }
    ),
    _s(Ms, 'return', function () {
      var t = this
      return new Promise(function (e, i) {
        t[Is].destroy(null, function (t) {
          t ? i(t) : e(Bs(void 0, !0))
        })
      })
    }),
    Ms),
    Cs
  ),
  Ls = function (t) {
    var e,
      i = Object.create(
        Ns,
        (_s((e = {}), Is, { value: t, writable: !0 }),
        _s(e, Ss, { value: null, writable: !0 }),
        _s(e, Ts, { value: null, writable: !0 }),
        _s(e, xs, { value: null, writable: !0 }),
        _s(e, Es, { value: t._readableState.endEmitted, writable: !0 }),
        _s(e, ks, {
          value: function (t, e) {
            var r = i[Is].read()
            r
              ? ((i[Rs] = null), (i[Ss] = null), (i[Ts] = null), t(Bs(r, !1)))
              : ((i[Ss] = t), (i[Ts] = e))
          },
          writable: !0
        }),
        e)
      )
    return (
      (i[Rs] = null),
      As(t, function (t) {
        if (t && 'ERR_STREAM_PREMATURE_CLOSE' !== t.code) {
          var e = i[Ts]
          return (
            null !== e &&
              ((i[Rs] = null), (i[Ss] = null), (i[Ts] = null), e(t)),
            void (i[xs] = t)
          )
        }
        var r = i[Ss]
        null !== r &&
          ((i[Rs] = null), (i[Ss] = null), (i[Ts] = null), r(Bs(void 0, !0))),
          (i[Es] = !0)
      }),
      t.on('readable', Ps.bind(null, i)),
      i
    )
  }
function Ds(t, e, i, r, n, s, a) {
  try {
    var o = t[s](a),
      u = o.value
  } catch (t) {
    return void i(t)
  }
  o.done ? e(u) : Promise.resolve(u).then(r, n)
}
function Fs(t) {
  return function () {
    var e = this,
      i = arguments
    return new Promise(function (r, n) {
      var s = t.apply(e, i)
      function a(t) {
        Ds(s, r, n, a, o, 'next', t)
      }
      function o(t) {
        Ds(s, r, n, a, o, 'throw', t)
      }
      a(void 0)
    })
  }
}
function Us(t, e) {
  var i = Object.keys(t)
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t)
    e &&
      (r = r.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })),
      i.push.apply(i, r)
  }
  return i
}
function qs(t, e, i) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = i),
    t
  )
}
var js,
  zs = Pn.codes.ERR_INVALID_ARG_TYPE,
  Ws = function (t, e, i) {
    var r
    if (e && 'function' == typeof e.next) r = e
    else if (e && e[Symbol.asyncIterator]) r = e[Symbol.asyncIterator]()
    else {
      if (!e || !e[Symbol.iterator]) throw new zs('iterable', ['Iterable'], e)
      r = e[Symbol.iterator]()
    }
    var n = new t(
        (function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {}
            e % 2
              ? Us(Object(i), !0).forEach(function (e) {
                  qs(t, e, i[e])
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
              : Us(Object(i)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(i, e)
                  )
                })
          }
          return t
        })({ objectMode: !0 }, i)
      ),
      s = !1
    function a() {
      return o.apply(this, arguments)
    }
    function o() {
      return (o = Fs(function* () {
        try {
          var t = yield r.next(),
            e = t.value
          t.done ? n.push(null) : n.push(yield e) ? a() : (s = !1)
        } catch (t) {
          n.destroy(t)
        }
      })).apply(this, arguments)
    }
    return (
      (n._read = function () {
        s || ((s = !0), a())
      }),
      n
    )
  },
  $s = oa
oa.ReadableState = aa
var Hs,
  Gs = function (t, e) {
    return t.listeners(e).length
  },
  Zs = o.Buffer,
  Ks = bt.Uint8Array || function () {}
Hs = l && l.debuglog ? l.debuglog('stream') : function () {}
var Vs,
  Js,
  Xs,
  Ys = Nn,
  Qs = Pn.codes,
  ta = Qs.ERR_INVALID_ARG_TYPE,
  ea = Qs.ERR_STREAM_PUSH_AFTER_EOF,
  ia = Qs.ERR_METHOD_NOT_IMPLEMENTED,
  ra = Qs.ERR_STREAM_UNSHIFT_AFTER_END_EVENT
Oe(oa, mn)
var na = Rn,
  sa = ['error', 'close', 'destroy', 'pause', 'resume']
function aa(t, e, i) {
  ;(js = js || Dn),
    'boolean' != typeof i && (i = e instanceof js),
    (this.objectMode = !!(t = t || {}).objectMode),
    i && (this.objectMode = this.objectMode || !!t.readableObjectMode),
    (this.highWaterMark = Ys(this, t, 'readableHighWaterMark', i)),
    (this.buffer = new An()),
    (this.length = 0),
    (this.pipes = null),
    (this.pipesCount = 0),
    (this.flowing = null),
    (this.ended = !1),
    (this.endEmitted = !1),
    (this.reading = !1),
    (this.sync = !0),
    (this.needReadable = !1),
    (this.emittedReadable = !1),
    (this.readableListening = !1),
    (this.resumeScheduled = !1),
    (this.paused = !0),
    (this.emitClose = !1 !== t.emitClose),
    (this.autoDestroy = !!t.autoDestroy),
    (this.destroyed = !1),
    (this.defaultEncoding = t.defaultEncoding || 'utf8'),
    (this.awaitDrain = 0),
    (this.readingMore = !1),
    (this.decoder = null),
    (this.encoding = null),
    t.encoding &&
      (Vs || (Vs = f.StringDecoder),
      (this.decoder = new Vs(t.encoding)),
      (this.encoding = t.encoding))
}
function oa(t) {
  if (((js = js || Dn), !(this instanceof oa))) return new oa(t)
  ;(this._readableState = new aa(t, this, this instanceof js)),
    (this.readable = !0),
    t &&
      ('function' == typeof t.read && (this._read = t.read),
      'function' == typeof t.destroy && (this._destroy = t.destroy)),
    mn.call(this)
}
function ua(t, e, i, r, n) {
  Hs('readableAddChunk', e)
  var s,
    a = t._readableState
  if (null === e)
    (a.reading = !1),
      (function (t, e) {
        if ((Hs('onEofChunk'), !e.ended)) {
          if (e.decoder) {
            var i = e.decoder.end()
            i &&
              i.length &&
              (e.buffer.push(i), (e.length += e.objectMode ? 1 : i.length))
          }
          ;(e.ended = !0),
            e.sync
              ? la(t)
              : ((e.needReadable = !1),
                e.emittedReadable || ((e.emittedReadable = !0), fa(t)))
        }
      })(t, a)
  else if (
    (n ||
      (s = (function (t, e) {
        var i, r
        return (
          Zs.isBuffer((r = e)) ||
            r instanceof Ks ||
            'string' == typeof e ||
            void 0 === e ||
            t.objectMode ||
            (i = new ta('chunk', ['string', 'Buffer', 'Uint8Array'], e)),
          i
        )
      })(a, e)),
    s)
  )
    na(t, s)
  else if (a.objectMode || (e && e.length > 0))
    if (
      ('string' == typeof e ||
        a.objectMode ||
        Object.getPrototypeOf(e) === Zs.prototype ||
        (e = (function (t) {
          return Zs.from(t)
        })(e)),
      r)
    )
      a.endEmitted ? na(t, new ra()) : ha(t, a, e, !0)
    else if (a.ended) na(t, new ea())
    else {
      if (a.destroyed) return !1
      ;(a.reading = !1),
        a.decoder && !i
          ? ((e = a.decoder.write(e)),
            a.objectMode || 0 !== e.length ? ha(t, a, e, !1) : ca(t, a))
          : ha(t, a, e, !1)
    }
  else r || ((a.reading = !1), ca(t, a))
  return !a.ended && (a.length < a.highWaterMark || 0 === a.length)
}
function ha(t, e, i, r) {
  e.flowing && 0 === e.length && !e.sync
    ? ((e.awaitDrain = 0), t.emit('data', i))
    : ((e.length += e.objectMode ? 1 : i.length),
      r ? e.buffer.unshift(i) : e.buffer.push(i),
      e.needReadable && la(t)),
    ca(t, e)
}
function da(t, e) {
  return t <= 0 || (0 === e.length && e.ended)
    ? 0
    : e.objectMode
    ? 1
    : t != t
    ? e.flowing && e.length
      ? e.buffer.head.data.length
      : e.length
    : (t > e.highWaterMark &&
        (e.highWaterMark = (function (t) {
          return (
            t >= 1073741824
              ? (t = 1073741824)
              : (t--,
                (t |= t >>> 1),
                (t |= t >>> 2),
                (t |= t >>> 4),
                (t |= t >>> 8),
                (t |= t >>> 16),
                t++),
            t
          )
        })(t)),
      t <= e.length ? t : e.ended ? e.length : ((e.needReadable = !0), 0))
}
function la(t) {
  var e = t._readableState
  Hs('emitReadable', e.needReadable, e.emittedReadable),
    (e.needReadable = !1),
    e.emittedReadable ||
      (Hs('emitReadable', e.flowing),
      (e.emittedReadable = !0),
      process.nextTick(fa, t))
}
function fa(t) {
  var e = t._readableState
  Hs('emitReadable_', e.destroyed, e.length, e.ended),
    e.destroyed ||
      (!e.length && !e.ended) ||
      (t.emit('readable'), (e.emittedReadable = !1)),
    (e.needReadable = !e.flowing && !e.ended && e.length <= e.highWaterMark),
    ba(t)
}
function ca(t, e) {
  e.readingMore || ((e.readingMore = !0), process.nextTick(pa, t, e))
}
function pa(t, e) {
  for (
    ;
    !e.reading &&
    !e.ended &&
    (e.length < e.highWaterMark || (e.flowing && 0 === e.length));

  ) {
    var i = e.length
    if ((Hs('maybeReadMore read 0'), t.read(0), i === e.length)) break
  }
  e.readingMore = !1
}
function ma(t) {
  var e = t._readableState
  ;(e.readableListening = t.listenerCount('readable') > 0),
    e.resumeScheduled && !e.paused
      ? (e.flowing = !0)
      : t.listenerCount('data') > 0 && t.resume()
}
function ga(t) {
  Hs('readable nexttick read 0'), t.read(0)
}
function ya(t, e) {
  Hs('resume', e.reading),
    e.reading || t.read(0),
    (e.resumeScheduled = !1),
    t.emit('resume'),
    ba(t),
    e.flowing && !e.reading && t.read(0)
}
function ba(t) {
  var e = t._readableState
  for (Hs('flow', e.flowing); e.flowing && null !== t.read(); );
}
function wa(t, e) {
  return 0 === e.length
    ? null
    : (e.objectMode
        ? (i = e.buffer.shift())
        : !t || t >= e.length
        ? ((i = e.decoder
            ? e.buffer.join('')
            : 1 === e.buffer.length
            ? e.buffer.first()
            : e.buffer.concat(e.length)),
          e.buffer.clear())
        : (i = e.buffer.consume(t, e.decoder)),
      i)
  var i
}
function va(t) {
  var e = t._readableState
  Hs('endReadable', e.endEmitted),
    e.endEmitted || ((e.ended = !0), process.nextTick(Ma, e, t))
}
function Ma(t, e) {
  if (
    (Hs('endReadableNT', t.endEmitted, t.length),
    !t.endEmitted &&
      0 === t.length &&
      ((t.endEmitted = !0), (e.readable = !1), e.emit('end'), t.autoDestroy))
  ) {
    var i = e._writableState
    ;(!i || (i.autoDestroy && i.finished)) && e.destroy()
  }
}
function Aa(t, e) {
  for (var i = 0, r = t.length; i < r; i++) if (t[i] === e) return i
  return -1
}
Object.defineProperty(oa.prototype, 'destroyed', {
  enumerable: !1,
  get: function () {
    return void 0 !== this._readableState && this._readableState.destroyed
  },
  set: function (t) {
    this._readableState && (this._readableState.destroyed = t)
  }
}),
  (oa.prototype.destroy = xn),
  (oa.prototype._undestroy = En),
  (oa.prototype._destroy = function (t, e) {
    e(t)
  }),
  (oa.prototype.push = function (t, e) {
    var i,
      r = this._readableState
    return (
      r.objectMode
        ? (i = !0)
        : 'string' == typeof t &&
          ((e = e || r.defaultEncoding) !== r.encoding &&
            ((t = Zs.from(t, e)), (e = '')),
          (i = !0)),
      ua(this, t, e, !1, i)
    )
  }),
  (oa.prototype.unshift = function (t) {
    return ua(this, t, null, !0, !1)
  }),
  (oa.prototype.isPaused = function () {
    return !1 === this._readableState.flowing
  }),
  (oa.prototype.setEncoding = function (t) {
    Vs || (Vs = f.StringDecoder)
    var e = new Vs(t)
    ;(this._readableState.decoder = e),
      (this._readableState.encoding = this._readableState.decoder.encoding)
    for (var i = this._readableState.buffer.head, r = ''; null !== i; )
      (r += e.write(i.data)), (i = i.next)
    return (
      this._readableState.buffer.clear(),
      '' !== r && this._readableState.buffer.push(r),
      (this._readableState.length = r.length),
      this
    )
  }),
  (oa.prototype.read = function (t) {
    Hs('read', t), (t = parseInt(t, 10))
    var e = this._readableState,
      i = t
    if (
      (0 !== t && (e.emittedReadable = !1),
      0 === t &&
        e.needReadable &&
        ((0 !== e.highWaterMark ? e.length >= e.highWaterMark : e.length > 0) ||
          e.ended))
    )
      return (
        Hs('read: emitReadable', e.length, e.ended),
        0 === e.length && e.ended ? va(this) : la(this),
        null
      )
    if (0 === (t = da(t, e)) && e.ended) return 0 === e.length && va(this), null
    var r,
      n = e.needReadable
    return (
      Hs('need readable', n),
      (0 === e.length || e.length - t < e.highWaterMark) &&
        Hs('length less than watermark', (n = !0)),
      e.ended || e.reading
        ? Hs('reading or ended', (n = !1))
        : n &&
          (Hs('do read'),
          (e.reading = !0),
          (e.sync = !0),
          0 === e.length && (e.needReadable = !0),
          this._read(e.highWaterMark),
          (e.sync = !1),
          e.reading || (t = da(i, e))),
      null === (r = t > 0 ? wa(t, e) : null)
        ? ((e.needReadable = e.length <= e.highWaterMark), (t = 0))
        : ((e.length -= t), (e.awaitDrain = 0)),
      0 === e.length &&
        (e.ended || (e.needReadable = !0), i !== t && e.ended && va(this)),
      null !== r && this.emit('data', r),
      r
    )
  }),
  (oa.prototype._read = function (t) {
    na(this, new ia('_read()'))
  }),
  (oa.prototype.pipe = function (t, e) {
    var i = this,
      r = this._readableState
    switch (r.pipesCount) {
      case 0:
        r.pipes = t
        break
      case 1:
        r.pipes = [r.pipes, t]
        break
      default:
        r.pipes.push(t)
    }
    ;(r.pipesCount += 1), Hs('pipe count=%d opts=%j', r.pipesCount, e)
    var n =
      (e && !1 === e.end) || t === process.stdout || t === process.stderr
        ? f
        : s
    function s() {
      Hs('onend'), t.end()
    }
    r.endEmitted ? process.nextTick(n) : i.once('end', n),
      t.on('unpipe', function e(n, c) {
        Hs('onunpipe'),
          n === i &&
            c &&
            !1 === c.hasUnpiped &&
            ((c.hasUnpiped = !0),
            Hs('cleanup'),
            t.removeListener('close', d),
            t.removeListener('finish', l),
            t.removeListener('drain', a),
            t.removeListener('error', h),
            t.removeListener('unpipe', e),
            i.removeListener('end', s),
            i.removeListener('end', f),
            i.removeListener('data', u),
            (o = !0),
            !r.awaitDrain ||
              (t._writableState && !t._writableState.needDrain) ||
              a())
      })
    var a = (function (t) {
      return function () {
        var e = t._readableState
        Hs('pipeOnDrain', e.awaitDrain),
          e.awaitDrain && e.awaitDrain--,
          0 === e.awaitDrain && Gs(t, 'data') && ((e.flowing = !0), ba(t))
      }
    })(i)
    t.on('drain', a)
    var o = !1
    function u(e) {
      Hs('ondata')
      var n = t.write(e)
      Hs('dest.write', n),
        !1 === n &&
          (((1 === r.pipesCount && r.pipes === t) ||
            (r.pipesCount > 1 && -1 !== Aa(r.pipes, t))) &&
            !o &&
            (Hs('false write response, pause', r.awaitDrain), r.awaitDrain++),
          i.pause())
    }
    function h(e) {
      Hs('onerror', e),
        f(),
        t.removeListener('error', h),
        0 === Gs(t, 'error') && na(t, e)
    }
    function d() {
      t.removeListener('finish', l), f()
    }
    function l() {
      Hs('onfinish'), t.removeListener('close', d), f()
    }
    function f() {
      Hs('unpipe'), i.unpipe(t)
    }
    return (
      i.on('data', u),
      (function (t, e, i) {
        if ('function' == typeof t.prependListener)
          return t.prependListener(e, i)
        t._events && t._events.error
          ? Array.isArray(t._events.error)
            ? t._events.error.unshift(i)
            : (t._events.error = [i, t._events.error])
          : t.on(e, i)
      })(t, 'error', h),
      t.once('close', d),
      t.once('finish', l),
      t.emit('pipe', i),
      r.flowing || (Hs('pipe resume'), i.resume()),
      t
    )
  }),
  (oa.prototype.unpipe = function (t) {
    var e = this._readableState,
      i = { hasUnpiped: !1 }
    if (0 === e.pipesCount) return this
    if (1 === e.pipesCount)
      return (
        (t && t !== e.pipes) ||
          (t || (t = e.pipes),
          (e.pipes = null),
          (e.pipesCount = 0),
          (e.flowing = !1),
          t && t.emit('unpipe', this, i)),
        this
      )
    if (!t) {
      var r = e.pipes,
        n = e.pipesCount
      ;(e.pipes = null), (e.pipesCount = 0), (e.flowing = !1)
      for (var s = 0; s < n; s++) r[s].emit('unpipe', this, { hasUnpiped: !1 })
      return this
    }
    var a = Aa(e.pipes, t)
    return (
      -1 === a ||
        (e.pipes.splice(a, 1),
        (e.pipesCount -= 1),
        1 === e.pipesCount && (e.pipes = e.pipes[0]),
        t.emit('unpipe', this, i)),
      this
    )
  }),
  (oa.prototype.addListener = oa.prototype.on =
    function (t, e) {
      var i = mn.prototype.on.call(this, t, e),
        r = this._readableState
      return (
        'data' === t
          ? ((r.readableListening = this.listenerCount('readable') > 0),
            !1 !== r.flowing && this.resume())
          : 'readable' === t &&
            (r.endEmitted ||
              r.readableListening ||
              ((r.readableListening = r.needReadable = !0),
              (r.flowing = !1),
              (r.emittedReadable = !1),
              Hs('on readable', r.length, r.reading),
              r.length ? la(this) : r.reading || process.nextTick(ga, this))),
        i
      )
    }),
  (oa.prototype.removeListener = function (t, e) {
    var i = mn.prototype.removeListener.call(this, t, e)
    return 'readable' === t && process.nextTick(ma, this), i
  }),
  (oa.prototype.removeAllListeners = function (t) {
    var e = mn.prototype.removeAllListeners.apply(this, arguments)
    return ('readable' !== t && void 0 !== t) || process.nextTick(ma, this), e
  }),
  (oa.prototype.resume = function () {
    var t = this._readableState
    return (
      t.flowing ||
        (Hs('resume'),
        (t.flowing = !t.readableListening),
        (function (t, e) {
          e.resumeScheduled ||
            ((e.resumeScheduled = !0), process.nextTick(ya, t, e))
        })(this, t)),
      (t.paused = !1),
      this
    )
  }),
  (oa.prototype.pause = function () {
    return (
      Hs('call pause flowing=%j', this._readableState.flowing),
      !1 !== this._readableState.flowing &&
        (Hs('pause'), (this._readableState.flowing = !1), this.emit('pause')),
      (this._readableState.paused = !0),
      this
    )
  }),
  (oa.prototype.wrap = function (t) {
    var e = this,
      i = this._readableState,
      r = !1
    for (var n in (t.on('end', function () {
      if ((Hs('wrapped end'), i.decoder && !i.ended)) {
        var t = i.decoder.end()
        t && t.length && e.push(t)
      }
      e.push(null)
    }),
    t.on('data', function (n) {
      Hs('wrapped data'),
        i.decoder && (n = i.decoder.write(n)),
        (i.objectMode && null == n) ||
          ((i.objectMode || (n && n.length)) &&
            (e.push(n) || ((r = !0), t.pause())))
    }),
    t))
      void 0 === this[n] &&
        'function' == typeof t[n] &&
        (this[n] = (function (e) {
          return function () {
            return t[e].apply(t, arguments)
          }
        })(n))
    for (var s = 0; s < sa.length; s++) t.on(sa[s], this.emit.bind(this, sa[s]))
    return (
      (this._read = function (e) {
        Hs('wrapped _read', e), r && ((r = !1), t.resume())
      }),
      this
    )
  }),
  'function' == typeof Symbol &&
    (oa.prototype[Symbol.asyncIterator] = function () {
      return void 0 === Js && (Js = Ls), Js(this)
    }),
  Object.defineProperty(oa.prototype, 'readableHighWaterMark', {
    enumerable: !1,
    get: function () {
      return this._readableState.highWaterMark
    }
  }),
  Object.defineProperty(oa.prototype, 'readableBuffer', {
    enumerable: !1,
    get: function () {
      return this._readableState && this._readableState.buffer
    }
  }),
  Object.defineProperty(oa.prototype, 'readableFlowing', {
    enumerable: !1,
    get: function () {
      return this._readableState.flowing
    },
    set: function (t) {
      this._readableState && (this._readableState.flowing = t)
    }
  }),
  (oa._fromList = wa),
  Object.defineProperty(oa.prototype, 'readableLength', {
    enumerable: !1,
    get: function () {
      return this._readableState.length
    }
  }),
  'function' == typeof Symbol &&
    (oa.from = function (t, e) {
      return void 0 === Xs && (Xs = Ws), Xs(oa, t, e)
    })
var _a = Ia,
  Sa = Pn.codes,
  Ta = Sa.ERR_METHOD_NOT_IMPLEMENTED,
  xa = Sa.ERR_MULTIPLE_CALLBACK,
  Ea = Sa.ERR_TRANSFORM_ALREADY_TRANSFORMING,
  Ra = Sa.ERR_TRANSFORM_WITH_LENGTH_0
function ka(t, e) {
  var i = this._transformState
  i.transforming = !1
  var r = i.writecb
  if (null === r) return this.emit('error', new xa())
  ;(i.writechunk = null), (i.writecb = null), null != e && this.push(e), r(t)
  var n = this._readableState
  ;(n.reading = !1),
    (n.needReadable || n.length < n.highWaterMark) &&
      this._read(n.highWaterMark)
}
function Ia(t) {
  if (!(this instanceof Ia)) return new Ia(t)
  Dn.call(this, t),
    (this._transformState = {
      afterTransform: ka.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }),
    (this._readableState.needReadable = !0),
    (this._readableState.sync = !1),
    t &&
      ('function' == typeof t.transform && (this._transform = t.transform),
      'function' == typeof t.flush && (this._flush = t.flush)),
    this.on('prefinish', Ba)
}
function Ba() {
  var t = this
  'function' != typeof this._flush || this._readableState.destroyed
    ? Oa(this, null, null)
    : this._flush(function (e, i) {
        Oa(t, e, i)
      })
}
function Oa(t, e, i) {
  if (e) return t.emit('error', e)
  if ((null != i && t.push(i), t._writableState.length)) throw new Ra()
  if (t._transformState.transforming) throw new Ea()
  return t.push(null)
}
Oe(Ia, Dn),
  (Ia.prototype.push = function (t, e) {
    return (
      (this._transformState.needTransform = !1),
      Dn.prototype.push.call(this, t, e)
    )
  }),
  (Ia.prototype._transform = function (t, e, i) {
    i(new Ta('_transform()'))
  }),
  (Ia.prototype._write = function (t, e, i) {
    var r = this._transformState
    if (
      ((r.writecb = i),
      (r.writechunk = t),
      (r.writeencoding = e),
      !r.transforming)
    ) {
      var n = this._readableState
      ;(r.needTransform || n.needReadable || n.length < n.highWaterMark) &&
        this._read(n.highWaterMark)
    }
  }),
  (Ia.prototype._read = function (t) {
    var e = this._transformState
    null === e.writechunk || e.transforming
      ? (e.needTransform = !0)
      : ((e.transforming = !0),
        this._transform(e.writechunk, e.writeencoding, e.afterTransform))
  }),
  (Ia.prototype._destroy = function (t, e) {
    Dn.prototype._destroy.call(this, t, function (t) {
      e(t)
    })
  })
var Pa,
  Ca = Na
function Na(t) {
  if (!(this instanceof Na)) return new Na(t)
  _a.call(this, t)
}
Oe(Na, _a),
  (Na.prototype._transform = function (t, e, i) {
    i(null, t)
  })
var La = Pn.codes,
  Da = La.ERR_MISSING_ARGS,
  Fa = La.ERR_STREAM_DESTROYED
function Ua(t) {
  if (t) throw t
}
function qa(t, e, i, r) {
  r = (function (t) {
    var e = !1
    return function () {
      e || ((e = !0), t.apply(void 0, arguments))
    }
  })(r)
  var n = !1
  t.on('close', function () {
    n = !0
  }),
    void 0 === Pa && (Pa = As),
    Pa(t, { readable: e, writable: i }, function (t) {
      if (t) return r(t)
      ;(n = !0), r()
    })
  var s = !1
  return function (e) {
    if (!n && !s)
      return (
        (s = !0),
        (function (t) {
          return t.setHeader && 'function' == typeof t.abort
        })(t)
          ? t.abort()
          : 'function' == typeof t.destroy
          ? t.destroy()
          : void r(e || new Fa('pipe'))
      )
  }
}
function ja(t) {
  t()
}
function za(t, e) {
  return t.pipe(e)
}
function Wa(t) {
  return t.length ? ('function' != typeof t[t.length - 1] ? Ua : t.pop()) : Ua
}
var $a = function () {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i]
    var r,
      n = Wa(e)
    if ((Array.isArray(e[0]) && (e = e[0]), e.length < 2))
      throw new Da('streams')
    var s = e.map(function (t, i) {
      var a = i < e.length - 1
      return qa(t, a, i > 0, function (t) {
        r || (r = t), t && s.forEach(ja), a || (s.forEach(ja), n(r))
      })
    })
    return e.reduce(za)
  },
  Ha = wt(function (t, e) {
    'disable' === process.env.READABLE_STREAM && d
      ? ((t.exports = d.Readable),
        Object.assign(t.exports, d),
        (t.exports.Stream = d))
      : (((e = t.exports = ds).Stream = d || e),
        (e.Readable = e),
        (e.Writable = Fn),
        (e.Duplex = Dn),
        (e.Transform = _a),
        (e.PassThrough = Ca),
        (e.finished = As),
        (e.pipeline = $a))
  })
const { Transform: Ga } = Ha
var Za = (t) =>
  class e extends Ga {
    constructor(e, i, r, n, s) {
      super(s),
        (this._rate = e),
        (this._capacity = i),
        (this._delimitedSuffix = r),
        (this._hashBitLength = n),
        (this._options = s),
        (this._state = new t()),
        this._state.initialize(e, i),
        (this._finalized = !1)
    }
    _transform(t, e, i) {
      let r = null
      try {
        this.update(t, e)
      } catch (t) {
        r = t
      }
      i(r)
    }
    _flush(t) {
      let e = null
      try {
        this.push(this.digest())
      } catch (t) {
        e = t
      }
      t(e)
    }
    update(t, e) {
      if (!Buffer.isBuffer(t) && 'string' != typeof t)
        throw new TypeError('Data must be a string or a buffer')
      if (this._finalized) throw new Error('Digest already called')
      return (
        Buffer.isBuffer(t) || (t = Buffer.from(t, e)),
        this._state.absorb(t),
        this
      )
    }
    digest(t) {
      if (this._finalized) throw new Error('Digest already called')
      ;(this._finalized = !0),
        this._delimitedSuffix &&
          this._state.absorbLastFewBits(this._delimitedSuffix)
      let e = this._state.squeeze(this._hashBitLength / 8)
      return void 0 !== t && (e = e.toString(t)), this._resetState(), e
    }
    _resetState() {
      return this._state.initialize(this._rate, this._capacity), this
    }
    _clone() {
      const t = new e(
        this._rate,
        this._capacity,
        this._delimitedSuffix,
        this._hashBitLength,
        this._options
      )
      return this._state.copy(t._state), (t._finalized = this._finalized), t
    }
  }
const { Transform: Ka } = Ha
var Va = (t) =>
    class e extends Ka {
      constructor(e, i, r, n) {
        super(n),
          (this._rate = e),
          (this._capacity = i),
          (this._delimitedSuffix = r),
          (this._options = n),
          (this._state = new t()),
          this._state.initialize(e, i),
          (this._finalized = !1)
      }
      _transform(t, e, i) {
        let r = null
        try {
          this.update(t, e)
        } catch (t) {
          r = t
        }
        i(r)
      }
      _flush() {}
      _read(t) {
        this.push(this.squeeze(t))
      }
      update(t, e) {
        if (!Buffer.isBuffer(t) && 'string' != typeof t)
          throw new TypeError('Data must be a string or a buffer')
        if (this._finalized) throw new Error('Squeeze already called')
        return (
          Buffer.isBuffer(t) || (t = Buffer.from(t, e)),
          this._state.absorb(t),
          this
        )
      }
      squeeze(t, e) {
        this._finalized ||
          ((this._finalized = !0),
          this._state.absorbLastFewBits(this._delimitedSuffix))
        let i = this._state.squeeze(t)
        return void 0 !== e && (i = i.toString(e)), i
      }
      _resetState() {
        return this._state.initialize(this._rate, this._capacity), this
      }
      _clone() {
        const t = new e(
          this._rate,
          this._capacity,
          this._delimitedSuffix,
          this._options
        )
        return this._state.copy(t._state), (t._finalized = this._finalized), t
      }
    },
  Ja = function (t) {
    const e = Za(t),
      i = Va(t)
    return function (t, r) {
      switch ('string' == typeof t ? t.toLowerCase() : t) {
        case 'keccak224':
          return new e(1152, 448, null, 224, r)
        case 'keccak256':
          return new e(1088, 512, null, 256, r)
        case 'keccak384':
          return new e(832, 768, null, 384, r)
        case 'keccak512':
          return new e(576, 1024, null, 512, r)
        case 'sha3-224':
          return new e(1152, 448, 6, 224, r)
        case 'sha3-256':
          return new e(1088, 512, 6, 256, r)
        case 'sha3-384':
          return new e(832, 768, 6, 384, r)
        case 'sha3-512':
          return new e(576, 1024, 6, 512, r)
        case 'shake128':
          return new i(1344, 256, 31, r)
        case 'shake256':
          return new i(1088, 512, 31, r)
        default:
          throw new Error('Invald algorithm: ' + t)
      }
    }
  },
  Xa = Ja(Kt(__dirname))
const Ya = [
  1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
  2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0,
  2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905,
  2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0,
  2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649,
  0, 2147516424, 2147483648
]
var Qa = function (t) {
  for (let e = 0; e < 24; ++e) {
    const i = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40],
      r = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41],
      n = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
      s = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43],
      a = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44],
      o = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
      u = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46],
      h = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47],
      d = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48],
      l = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]
    let f = d ^ ((n << 1) | (s >>> 31)),
      c = l ^ ((s << 1) | (n >>> 31))
    const p = t[0] ^ f,
      m = t[1] ^ c,
      g = t[10] ^ f,
      y = t[11] ^ c,
      b = t[20] ^ f,
      w = t[21] ^ c,
      v = t[30] ^ f,
      M = t[31] ^ c,
      A = t[40] ^ f,
      _ = t[41] ^ c
    ;(f = i ^ ((a << 1) | (o >>> 31))), (c = r ^ ((o << 1) | (a >>> 31)))
    const S = t[2] ^ f,
      T = t[3] ^ c,
      x = t[12] ^ f,
      E = t[13] ^ c,
      R = t[22] ^ f,
      k = t[23] ^ c,
      I = t[32] ^ f,
      B = t[33] ^ c,
      O = t[42] ^ f,
      P = t[43] ^ c
    ;(f = n ^ ((u << 1) | (h >>> 31))), (c = s ^ ((h << 1) | (u >>> 31)))
    const C = t[4] ^ f,
      N = t[5] ^ c,
      L = t[14] ^ f,
      D = t[15] ^ c,
      F = t[24] ^ f,
      U = t[25] ^ c,
      q = t[34] ^ f,
      j = t[35] ^ c,
      z = t[44] ^ f,
      W = t[45] ^ c
    ;(f = a ^ ((d << 1) | (l >>> 31))), (c = o ^ ((l << 1) | (d >>> 31)))
    const $ = t[6] ^ f,
      H = t[7] ^ c,
      G = t[16] ^ f,
      Z = t[17] ^ c,
      K = t[26] ^ f,
      V = t[27] ^ c,
      J = t[36] ^ f,
      X = t[37] ^ c,
      Y = t[46] ^ f,
      Q = t[47] ^ c
    ;(f = u ^ ((i << 1) | (r >>> 31))), (c = h ^ ((r << 1) | (i >>> 31)))
    const tt = t[8] ^ f,
      et = t[9] ^ c,
      it = t[18] ^ f,
      rt = t[19] ^ c,
      nt = t[28] ^ f,
      st = t[29] ^ c,
      at = t[38] ^ f,
      ot = t[39] ^ c,
      ut = t[48] ^ f,
      ht = t[49] ^ c,
      dt = p,
      lt = m,
      ft = (y << 4) | (g >>> 28),
      ct = (g << 4) | (y >>> 28),
      pt = (b << 3) | (w >>> 29),
      mt = (w << 3) | (b >>> 29),
      gt = (M << 9) | (v >>> 23),
      yt = (v << 9) | (M >>> 23),
      bt = (A << 18) | (_ >>> 14),
      wt = (_ << 18) | (A >>> 14),
      vt = (S << 1) | (T >>> 31),
      Mt = (T << 1) | (S >>> 31),
      At = (E << 12) | (x >>> 20),
      _t = (x << 12) | (E >>> 20),
      St = (R << 10) | (k >>> 22),
      Tt = (k << 10) | (R >>> 22),
      xt = (B << 13) | (I >>> 19),
      Et = (I << 13) | (B >>> 19),
      Rt = (O << 2) | (P >>> 30),
      kt = (P << 2) | (O >>> 30),
      It = (N << 30) | (C >>> 2),
      Bt = (C << 30) | (N >>> 2),
      Ot = (L << 6) | (D >>> 26),
      Pt = (D << 6) | (L >>> 26),
      Ct = (U << 11) | (F >>> 21),
      Nt = (F << 11) | (U >>> 21),
      Lt = (q << 15) | (j >>> 17),
      Dt = (j << 15) | (q >>> 17),
      Ft = (W << 29) | (z >>> 3),
      Ut = (z << 29) | (W >>> 3),
      qt = ($ << 28) | (H >>> 4),
      jt = (H << 28) | ($ >>> 4),
      zt = (Z << 23) | (G >>> 9),
      Wt = (G << 23) | (Z >>> 9),
      $t = (K << 25) | (V >>> 7),
      Ht = (V << 25) | (K >>> 7),
      Gt = (J << 21) | (X >>> 11),
      Zt = (X << 21) | (J >>> 11),
      Kt = (Q << 24) | (Y >>> 8),
      Vt = (Y << 24) | (Q >>> 8),
      Jt = (tt << 27) | (et >>> 5),
      Xt = (et << 27) | (tt >>> 5),
      Yt = (it << 20) | (rt >>> 12),
      Qt = (rt << 20) | (it >>> 12),
      te = (st << 7) | (nt >>> 25),
      ee = (nt << 7) | (st >>> 25),
      ie = (at << 8) | (ot >>> 24),
      re = (ot << 8) | (at >>> 24),
      ne = (ut << 14) | (ht >>> 18),
      se = (ht << 14) | (ut >>> 18)
    ;(t[0] = dt ^ (~At & Ct)),
      (t[1] = lt ^ (~_t & Nt)),
      (t[10] = qt ^ (~Yt & pt)),
      (t[11] = jt ^ (~Qt & mt)),
      (t[20] = vt ^ (~Ot & $t)),
      (t[21] = Mt ^ (~Pt & Ht)),
      (t[30] = Jt ^ (~ft & St)),
      (t[31] = Xt ^ (~ct & Tt)),
      (t[40] = It ^ (~zt & te)),
      (t[41] = Bt ^ (~Wt & ee)),
      (t[2] = At ^ (~Ct & Gt)),
      (t[3] = _t ^ (~Nt & Zt)),
      (t[12] = Yt ^ (~pt & xt)),
      (t[13] = Qt ^ (~mt & Et)),
      (t[22] = Ot ^ (~$t & ie)),
      (t[23] = Pt ^ (~Ht & re)),
      (t[32] = ft ^ (~St & Lt)),
      (t[33] = ct ^ (~Tt & Dt)),
      (t[42] = zt ^ (~te & gt)),
      (t[43] = Wt ^ (~ee & yt)),
      (t[4] = Ct ^ (~Gt & ne)),
      (t[5] = Nt ^ (~Zt & se)),
      (t[14] = pt ^ (~xt & Ft)),
      (t[15] = mt ^ (~Et & Ut)),
      (t[24] = $t ^ (~ie & bt)),
      (t[25] = Ht ^ (~re & wt)),
      (t[34] = St ^ (~Lt & Kt)),
      (t[35] = Tt ^ (~Dt & Vt)),
      (t[44] = te ^ (~gt & Rt)),
      (t[45] = ee ^ (~yt & kt)),
      (t[6] = Gt ^ (~ne & dt)),
      (t[7] = Zt ^ (~se & lt)),
      (t[16] = xt ^ (~Ft & qt)),
      (t[17] = Et ^ (~Ut & jt)),
      (t[26] = ie ^ (~bt & vt)),
      (t[27] = re ^ (~wt & Mt)),
      (t[36] = Lt ^ (~Kt & Jt)),
      (t[37] = Dt ^ (~Vt & Xt)),
      (t[46] = gt ^ (~Rt & It)),
      (t[47] = yt ^ (~kt & Bt)),
      (t[8] = ne ^ (~dt & At)),
      (t[9] = se ^ (~lt & _t)),
      (t[18] = Ft ^ (~qt & Yt)),
      (t[19] = Ut ^ (~jt & Qt)),
      (t[28] = bt ^ (~vt & Ot)),
      (t[29] = wt ^ (~Mt & Pt)),
      (t[38] = Kt ^ (~Jt & ft)),
      (t[39] = Vt ^ (~Xt & ct)),
      (t[48] = Rt ^ (~It & zt)),
      (t[49] = kt ^ (~Bt & Wt)),
      (t[0] ^= Ya[2 * e]),
      (t[1] ^= Ya[2 * e + 1])
  }
}
function to() {
  ;(this.state = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]),
    (this.blockSize = null),
    (this.count = 0),
    (this.squeezing = !1)
}
;(to.prototype.initialize = function (t, e) {
  for (let t = 0; t < 50; ++t) this.state[t] = 0
  ;(this.blockSize = t / 8), (this.count = 0), (this.squeezing = !1)
}),
  (to.prototype.absorb = function (t) {
    for (let e = 0; e < t.length; ++e)
      (this.state[~~(this.count / 4)] ^= t[e] << ((this.count % 4) * 8)),
        (this.count += 1),
        this.count === this.blockSize && (Qa(this.state), (this.count = 0))
  }),
  (to.prototype.absorbLastFewBits = function (t) {
    ;(this.state[~~(this.count / 4)] ^= t << ((this.count % 4) * 8)),
      0 != (128 & t) && this.count === this.blockSize - 1 && Qa(this.state),
      (this.state[~~((this.blockSize - 1) / 4)] ^=
        128 << (((this.blockSize - 1) % 4) * 8)),
      Qa(this.state),
      (this.count = 0),
      (this.squeezing = !0)
  }),
  (to.prototype.squeeze = function (t) {
    this.squeezing || this.absorbLastFewBits(1)
    const e = Buffer.alloc(t)
    for (let i = 0; i < t; ++i)
      (e[i] =
        (this.state[~~(this.count / 4)] >>> ((this.count % 4) * 8)) & 255),
        (this.count += 1),
        this.count === this.blockSize && (Qa(this.state), (this.count = 0))
    return e
  }),
  (to.prototype.copy = function (t) {
    for (let e = 0; e < 50; ++e) t.state[e] = this.state[e]
    ;(t.blockSize = this.blockSize),
      (t.count = this.count),
      (t.squeezing = this.squeezing)
  })
var eo = Ja(to),
  io = wt(function (t) {
    try {
      t.exports = Xa
    } catch (e) {
      t.exports = eo
    }
  }),
  ro = pn,
  no = ro.createHashFunction(function () {
    return io('keccak224')
  }),
  so = ro.createHashFunction(function () {
    return io('keccak256')
  }),
  ao = ro.createHashFunction(function () {
    return io('keccak384')
  }),
  oo = ro.createHashFunction(function () {
    return io('keccak512')
  }),
  uo = h.createHash,
  ho = /*#__PURE__*/ Object.defineProperty(
    { keccak224: no, keccak256: so, keccak384: ao, keccak512: oo },
    '__esModule',
    { value: !0 }
  ),
  lo = wt(function (t, e) {
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.rlphash =
        e.ripemd160FromArray =
        e.ripemd160FromString =
        e.ripemd160 =
        e.sha256FromArray =
        e.sha256FromString =
        e.sha256 =
        e.keccakFromArray =
        e.keccakFromHexString =
        e.keccakFromString =
        e.keccak256 =
        e.keccak =
          void 0),
      (e.keccak = function (t, e = 256) {
        switch (((0, fn.assertIsBuffer)(t), e)) {
          case 224:
            return (0, ho.keccak224)(t)
          case 256:
            return (0, ho.keccak256)(t)
          case 384:
            return (0, ho.keccak384)(t)
          case 512:
            return (0, ho.keccak512)(t)
          default:
            throw new Error(`Invald algorithm: keccak${e}`)
        }
      }),
      (e.keccak256 = function (t) {
        return (0, e.keccak)(t)
      }),
      (e.keccakFromString = function (t, i = 256) {
        ;(0, fn.assertIsString)(t)
        const r = Buffer.from(t, 'utf8')
        return (0, e.keccak)(r, i)
      }),
      (e.keccakFromHexString = function (t, i = 256) {
        return (
          (0, fn.assertIsHexString)(t), (0, e.keccak)((0, cn.toBuffer)(t), i)
        )
      }),
      (e.keccakFromArray = function (t, i = 256) {
        return (0, fn.assertIsArray)(t), (0, e.keccak)((0, cn.toBuffer)(t), i)
      })
    const i = function (t) {
      return (t = (0, cn.toBuffer)(t)), uo('sha256').update(t).digest()
    }
    ;(e.sha256 = function (t) {
      return (0, fn.assertIsBuffer)(t), i(t)
    }),
      (e.sha256FromString = function (t) {
        return (0, fn.assertIsString)(t), i(t)
      }),
      (e.sha256FromArray = function (t) {
        return (0, fn.assertIsArray)(t), i(t)
      })
    const r = function (t, e) {
      t = (0, cn.toBuffer)(t)
      const i = uo('rmd160').update(t).digest()
      return !0 === e ? (0, cn.setLengthLeft)(i, 32) : i
    }
    ;(e.ripemd160 = function (t, e) {
      return (0, fn.assertIsBuffer)(t), r(t, e)
    }),
      (e.ripemd160FromString = function (t, e) {
        return (0, fn.assertIsString)(t), r(t, e)
      }),
      (e.ripemd160FromArray = function (t, e) {
        return (0, fn.assertIsArray)(t), r(t, e)
      }),
      (e.rlphash = function (t) {
        return (0, e.keccak)(Lt.rlp.encode(t))
      })
  }),
  fo = wt(function (t, e) {
    function i(t) {
      return (0, cn.unpadBuffer)(t.toArrayLike(Buffer))
    }
    var r
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.toType =
        e.TypeOutput =
        e.bnToRlp =
        e.bnToUnpaddedBuffer =
        e.bnToHex =
          void 0),
      (e.bnToHex = function (t) {
        return `0x${t.toString(16)}`
      }),
      (e.bnToUnpaddedBuffer = i),
      (e.bnToRlp = function (t) {
        return i(t)
      }),
      (function (t) {
        ;(t[(t.Number = 0)] = 'Number'),
          (t[(t.BN = 1)] = 'BN'),
          (t[(t.Buffer = 2)] = 'Buffer'),
          (t[(t.PrefixedHexString = 3)] = 'PrefixedHexString')
      })((r = e.TypeOutput || (e.TypeOutput = {}))),
      (e.toType = function (t, e) {
        if (null === t) return null
        if (void 0 === t) return
        if ('string' == typeof t && !(0, ln.isHexString)(t))
          throw new Error(
            `A string must be provided with a 0x-prefix, given: ${t}`
          )
        if ('number' == typeof t && !Number.isSafeInteger(t))
          throw new Error(
            'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
          )
        const i = (0, cn.toBuffer)(t)
        if (e === r.Buffer) return i
        if (e === r.BN) return new Lt.BN(i)
        if (e === r.Number) {
          const t = new Lt.BN(i),
            e = new Lt.BN(Number.MAX_SAFE_INTEGER.toString())
          if (t.gt(e))
            throw new Error(
              'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)'
            )
          return t.toNumber()
        }
        return `0x${i.toString('hex')}`
      })
  }),
  co = dn,
  po = wt(function (t, e) {
    var i =
      (bt && bt.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      }
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.isZeroAddress =
        e.zeroAddress =
        e.importPublic =
        e.privateToAddress =
        e.privateToPublic =
        e.publicToAddress =
        e.pubToAddress =
        e.isValidPublic =
        e.isValidPrivate =
        e.generateAddress2 =
        e.generateAddress =
        e.isValidChecksumAddress =
        e.toChecksumAddress =
        e.isValidAddress =
        e.Account =
          void 0)
    const r = i(u)
    class n {
      constructor(
        t = new Lt.BN(0),
        e = new Lt.BN(0),
        i = Dt.KECCAK256_RLP,
        r = Dt.KECCAK256_NULL
      ) {
        ;(this.nonce = t),
          (this.balance = e),
          (this.stateRoot = i),
          (this.codeHash = r),
          this._validate()
      }
      static fromAccountData(t) {
        const { nonce: e, balance: i, stateRoot: r, codeHash: s } = t
        return new n(
          e ? new Lt.BN((0, cn.toBuffer)(e)) : void 0,
          i ? new Lt.BN((0, cn.toBuffer)(i)) : void 0,
          r ? (0, cn.toBuffer)(r) : void 0,
          s ? (0, cn.toBuffer)(s) : void 0
        )
      }
      static fromRlpSerializedAccount(t) {
        const e = Lt.rlp.decode(t)
        if (!Array.isArray(e))
          throw new Error('Invalid serialized account input. Must be array')
        return this.fromValuesArray(e)
      }
      static fromValuesArray(t) {
        const [e, i, r, s] = t
        return new n(new Lt.BN(e), new Lt.BN(i), r, s)
      }
      _validate() {
        if (this.nonce.lt(new Lt.BN(0)))
          throw new Error('nonce must be greater than zero')
        if (this.balance.lt(new Lt.BN(0)))
          throw new Error('balance must be greater than zero')
        if (32 !== this.stateRoot.length)
          throw new Error('stateRoot must have a length of 32')
        if (32 !== this.codeHash.length)
          throw new Error('codeHash must have a length of 32')
      }
      raw() {
        return [
          (0, fo.bnToUnpaddedBuffer)(this.nonce),
          (0, fo.bnToUnpaddedBuffer)(this.balance),
          this.stateRoot,
          this.codeHash
        ]
      }
      serialize() {
        return Lt.rlp.encode(this.raw())
      }
      isContract() {
        return !this.codeHash.equals(Dt.KECCAK256_NULL)
      }
      isEmpty() {
        return (
          this.balance.isZero() &&
          this.nonce.isZero() &&
          this.codeHash.equals(Dt.KECCAK256_NULL)
        )
      }
    }
    ;(e.Account = n),
      (e.isValidAddress = function (t) {
        try {
          ;(0, fn.assertIsString)(t)
        } catch (t) {
          return !1
        }
        return /^0x[0-9a-fA-F]{40}$/.test(t)
      }),
      (e.toChecksumAddress = function (t, e) {
        ;(0, fn.assertIsHexString)(t)
        const i = (0, ln.stripHexPrefix)(t).toLowerCase()
        let r = ''
        e && (r = (0, fo.toType)(e, fo.TypeOutput.BN).toString() + '0x')
        const n = (0, lo.keccakFromString)(r + i).toString('hex')
        let s = '0x'
        for (let t = 0; t < i.length; t++)
          parseInt(n[t], 16) >= 8 ? (s += i[t].toUpperCase()) : (s += i[t])
        return s
      }),
      (e.isValidChecksumAddress = function (t, i) {
        return (0, e.isValidAddress)(t) && (0, e.toChecksumAddress)(t, i) === t
      }),
      (e.generateAddress = function (t, e) {
        ;(0, fn.assertIsBuffer)(t), (0, fn.assertIsBuffer)(e)
        const i = new Lt.BN(e)
        return i.isZero()
          ? (0, lo.rlphash)([t, null]).slice(-20)
          : (0, lo.rlphash)([t, Buffer.from(i.toArray())]).slice(-20)
      }),
      (e.generateAddress2 = function (t, e, i) {
        return (
          (0, fn.assertIsBuffer)(t),
          (0, fn.assertIsBuffer)(e),
          (0, fn.assertIsBuffer)(i),
          (0, r.default)(20 === t.length),
          (0, r.default)(32 === e.length),
          (0, lo.keccak256)(
            Buffer.concat([
              Buffer.from('ff', 'hex'),
              t,
              e,
              (0, lo.keccak256)(i)
            ])
          ).slice(-20)
        )
      }),
      (e.isValidPrivate = function (t) {
        return (0, co.privateKeyVerify)(t)
      }),
      (e.isValidPublic = function (t, e = !1) {
        return (
          (0, fn.assertIsBuffer)(t),
          64 === t.length
            ? (0, co.publicKeyVerify)(Buffer.concat([Buffer.from([4]), t]))
            : !!e && (0, co.publicKeyVerify)(t)
        )
      }),
      (e.pubToAddress = function (t, e = !1) {
        return (
          (0, fn.assertIsBuffer)(t),
          e &&
            64 !== t.length &&
            (t = Buffer.from((0, co.publicKeyConvert)(t, !1).slice(1))),
          (0, r.default)(64 === t.length),
          (0, lo.keccak)(t).slice(-20)
        )
      }),
      (e.publicToAddress = e.pubToAddress),
      (e.privateToPublic = function (t) {
        return (
          (0, fn.assertIsBuffer)(t),
          Buffer.from((0, co.publicKeyCreate)(t, !1)).slice(1)
        )
      }),
      (e.privateToAddress = function (t) {
        return (0, e.publicToAddress)((0, e.privateToPublic)(t))
      }),
      (e.importPublic = function (t) {
        return (
          (0, fn.assertIsBuffer)(t),
          64 !== t.length &&
            (t = Buffer.from((0, co.publicKeyConvert)(t, !1).slice(1))),
          t
        )
      }),
      (e.zeroAddress = function () {
        const t = (0, cn.zeros)(20)
        return (0, cn.bufferToHex)(t)
      }),
      (e.isZeroAddress = function (t) {
        try {
          ;(0, fn.assertIsString)(t)
        } catch (t) {
          return !1
        }
        return (0, e.zeroAddress)() === t
      })
  }),
  mo = wt(function (t, e) {
    var i =
      (bt && bt.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      }
    Object.defineProperty(e, '__esModule', { value: !0 }), (e.Address = void 0)
    const r = i(u)
    class n {
      constructor(t) {
        ;(0, r.default)(20 === t.length, 'Invalid address length'),
          (this.buf = t)
      }
      static zero() {
        return new n((0, cn.zeros)(20))
      }
      static fromString(t) {
        return (
          (0, r.default)((0, po.isValidAddress)(t), 'Invalid address'),
          new n((0, cn.toBuffer)(t))
        )
      }
      static fromPublicKey(t) {
        ;(0, r.default)(Buffer.isBuffer(t), 'Public key should be Buffer')
        const e = (0, po.pubToAddress)(t)
        return new n(e)
      }
      static fromPrivateKey(t) {
        ;(0, r.default)(Buffer.isBuffer(t), 'Private key should be Buffer')
        const e = (0, po.privateToAddress)(t)
        return new n(e)
      }
      static generate(t, e) {
        return (
          (0, r.default)(Lt.BN.isBN(e)),
          new n((0, po.generateAddress)(t.buf, e.toArrayLike(Buffer)))
        )
      }
      static generate2(t, e, i) {
        return (
          (0, r.default)(Buffer.isBuffer(e)),
          (0, r.default)(Buffer.isBuffer(i)),
          new n((0, po.generateAddress2)(t.buf, e, i))
        )
      }
      equals(t) {
        return this.buf.equals(t.buf)
      }
      isZero() {
        return this.equals(n.zero())
      }
      isPrecompileOrSystemAddress() {
        const t = new Lt.BN(this.buf),
          e = new Lt.BN(0),
          i = new Lt.BN('ffff', 'hex')
        return t.gte(e) && t.lte(i)
      }
      toString() {
        return '0x' + this.buf.toString('hex')
      }
      toBuffer() {
        return Buffer.from(this.buf)
      }
    }
    e.Address = n
  }),
  go = wt(function (t, e) {
    function i(t, e) {
      const i = (0, fo.toType)(t, fo.TypeOutput.BN)
      if (!e) return i.subn(27)
      const r = (0, fo.toType)(e, fo.TypeOutput.BN)
      return i.sub(r.muln(2).addn(35))
    }
    function r(t) {
      const e = new Lt.BN(t)
      return e.eqn(0) || e.eqn(1)
    }
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.hashPersonalMessage =
        e.isValidSignature =
        e.fromRpcSig =
        e.toCompactSig =
        e.toRpcSig =
        e.ecrecover =
        e.ecsign =
          void 0),
      (e.ecsign = function (t, e, i) {
        const { signature: r, recid: n } = (0, co.ecdsaSign)(t, e),
          s = Buffer.from(r.slice(0, 32)),
          a = Buffer.from(r.slice(32, 64))
        if (!i || 'number' == typeof i) {
          if (i && !Number.isSafeInteger(i))
            throw new Error(
              'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
            )
          return { r: s, s: a, v: i ? n + (2 * i + 35) : n + 27 }
        }
        return {
          r: s,
          s: a,
          v: (0, fo.toType)(i, fo.TypeOutput.BN)
            .muln(2)
            .addn(35)
            .addn(n)
            .toArrayLike(Buffer)
        }
      }),
      (e.ecrecover = function (t, e, n, s, a) {
        const o = Buffer.concat(
            [(0, cn.setLengthLeft)(n, 32), (0, cn.setLengthLeft)(s, 32)],
            64
          ),
          u = i(e, a)
        if (!r(u)) throw new Error('Invalid signature v value')
        const h = (0, co.ecdsaRecover)(o, u.toNumber(), t)
        return Buffer.from((0, co.publicKeyConvert)(h, !1).slice(1))
      }),
      (e.toRpcSig = function (t, e, n, s) {
        if (!r(i(t, s))) throw new Error('Invalid signature v value')
        return (0, cn.bufferToHex)(
          Buffer.concat([
            (0, cn.setLengthLeft)(e, 32),
            (0, cn.setLengthLeft)(n, 32),
            (0, cn.toBuffer)(t)
          ])
        )
      }),
      (e.toCompactSig = function (t, e, n, s) {
        if (!r(i(t, s))) throw new Error('Invalid signature v value')
        const a = (0, fo.toType)(t, fo.TypeOutput.Number)
        let o = n
        return (
          ((a > 28 && a % 2 == 1) || 1 === a || 28 === a) &&
            ((o = Buffer.from(n)), (o[0] |= 128)),
          (0, cn.bufferToHex)(
            Buffer.concat([
              (0, cn.setLengthLeft)(e, 32),
              (0, cn.setLengthLeft)(o, 32)
            ])
          )
        )
      }),
      (e.fromRpcSig = function (t) {
        const e = (0, cn.toBuffer)(t)
        let i, r, n
        if (e.length >= 65)
          (i = e.slice(0, 32)),
            (r = e.slice(32, 64)),
            (n = (0, cn.bufferToInt)(e.slice(64)))
        else {
          if (64 !== e.length) throw new Error('Invalid signature length')
          ;(i = e.slice(0, 32)),
            (r = e.slice(32, 64)),
            (n = (0, cn.bufferToInt)(e.slice(32, 33)) >> 7),
            (r[0] &= 127)
        }
        return n < 27 && (n += 27), { v: n, r: i, s: r }
      }),
      (e.isValidSignature = function (t, e, n, s = !0, a) {
        const o = new Lt.BN(
            '7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0',
            16
          ),
          u = new Lt.BN(
            'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141',
            16
          )
        if (32 !== e.length || 32 !== n.length) return !1
        if (!r(i(t, a))) return !1
        const h = new Lt.BN(e),
          d = new Lt.BN(n)
        return !(
          h.isZero() ||
          h.gt(u) ||
          d.isZero() ||
          d.gt(u) ||
          (s && 1 === d.cmp(o))
        )
      }),
      (e.hashPersonalMessage = function (t) {
        ;(0, fn.assertIsBuffer)(t)
        const e = Buffer.from(`Ethereum Signed Message:\n${t.length}`, 'utf-8')
        return (0, lo.keccak)(Buffer.concat([e, t]))
      })
  }),
  yo = wt(function (t, e) {
    var i =
      (bt && bt.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      }
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.defineProperties = void 0)
    const r = i(u)
    e.defineProperties = function (t, e, i) {
      if (
        ((t.raw = []),
        (t._fields = []),
        (t.toJSON = function (e = !1) {
          if (e) {
            const e = {}
            return (
              t._fields.forEach((i) => {
                e[i] = `0x${t[i].toString('hex')}`
              }),
              e
            )
          }
          return (0, cn.baToJSON)(t.raw)
        }),
        (t.serialize = function () {
          return Lt.rlp.encode(t.raw)
        }),
        e.forEach((e, i) => {
          function n() {
            return t.raw[i]
          }
          function s(n) {
            '00' !== (n = (0, cn.toBuffer)(n)).toString('hex') ||
              e.allowZero ||
              (n = Buffer.allocUnsafe(0)),
              e.allowLess && e.length
                ? ((n = (0, cn.unpadBuffer)(n)),
                  (0, r.default)(
                    e.length >= n.length,
                    `The field ${e.name} must not have more ${e.length} bytes`
                  ))
                : (e.allowZero && 0 === n.length) ||
                  !e.length ||
                  (0, r.default)(
                    e.length === n.length,
                    `The field ${e.name} must have byte length of ${e.length}`
                  ),
              (t.raw[i] = n)
          }
          t._fields.push(e.name),
            Object.defineProperty(t, e.name, {
              enumerable: !0,
              configurable: !0,
              get: n,
              set: s
            }),
            e.default && (t[e.name] = e.default),
            e.alias &&
              Object.defineProperty(t, e.alias, {
                enumerable: !1,
                configurable: !0,
                set: s,
                get: n
              })
        }),
        i)
      )
        if (
          ('string' == typeof i &&
            (i = Buffer.from((0, ln.stripHexPrefix)(i), 'hex')),
          Buffer.isBuffer(i) && (i = Lt.rlp.decode(i)),
          Array.isArray(i))
        ) {
          if (i.length > t._fields.length)
            throw new Error('wrong number of fields in data')
          i.forEach((e, i) => {
            t[t._fields[i]] = (0, cn.toBuffer)(e)
          })
        } else {
          if ('object' != typeof i) throw new Error('invalid data')
          {
            const r = Object.keys(i)
            e.forEach((e) => {
              ;-1 !== r.indexOf(e.name) && (t[e.name] = i[e.name]),
                -1 !== r.indexOf(e.alias) && (t[e.alias] = i[e.alias])
            })
          }
        }
    }
  }),
  bo = wt(function (t, e) {
    var i =
        (bt && bt.__createBinding) ||
        (Object.create
          ? function (t, e, i, r) {
              void 0 === r && (r = i),
                Object.defineProperty(t, r, {
                  enumerable: !0,
                  get: function () {
                    return e[i]
                  }
                })
            }
          : function (t, e, i, r) {
              void 0 === r && (r = i), (t[r] = e[i])
            }),
      r =
        (bt && bt.__exportStar) ||
        function (t, e) {
          for (var r in t)
            'default' === r ||
              Object.prototype.hasOwnProperty.call(e, r) ||
              i(e, t, r)
        }
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.isHexString =
        e.getKeys =
        e.fromAscii =
        e.fromUtf8 =
        e.toAscii =
        e.arrayContainsArray =
        e.getBinarySize =
        e.padToEven =
        e.stripHexPrefix =
        e.isHexPrefixed =
          void 0),
      r(Dt, e),
      r(po, e),
      r(mo, e),
      r(lo, e),
      r(go, e),
      r(cn, e),
      r(yo, e),
      r(Lt, e),
      r(fo, e),
      Object.defineProperty(e, 'isHexPrefixed', {
        enumerable: !0,
        get: function () {
          return ln.isHexPrefixed
        }
      }),
      Object.defineProperty(e, 'stripHexPrefix', {
        enumerable: !0,
        get: function () {
          return ln.stripHexPrefix
        }
      }),
      Object.defineProperty(e, 'padToEven', {
        enumerable: !0,
        get: function () {
          return ln.padToEven
        }
      }),
      Object.defineProperty(e, 'getBinarySize', {
        enumerable: !0,
        get: function () {
          return ln.getBinarySize
        }
      }),
      Object.defineProperty(e, 'arrayContainsArray', {
        enumerable: !0,
        get: function () {
          return ln.arrayContainsArray
        }
      }),
      Object.defineProperty(e, 'toAscii', {
        enumerable: !0,
        get: function () {
          return ln.toAscii
        }
      }),
      Object.defineProperty(e, 'fromUtf8', {
        enumerable: !0,
        get: function () {
          return ln.fromUtf8
        }
      }),
      Object.defineProperty(e, 'fromAscii', {
        enumerable: !0,
        get: function () {
          return ln.fromAscii
        }
      }),
      Object.defineProperty(e, 'getKeys', {
        enumerable: !0,
        get: function () {
          return ln.getKeys
        }
      }),
      Object.defineProperty(e, 'isHexString', {
        enumerable: !0,
        get: function () {
          return ln.isHexString
        }
      })
  }),
  wo = wt(function (t) {
    !(function () {
      var e = 'input is invalid type',
        i = 'object' == typeof window,
        r = i ? window : {}
      r.JS_SHA3_NO_WINDOW && (i = !1)
      var n = !i && 'object' == typeof self
      !r.JS_SHA3_NO_NODE_JS &&
      'object' == typeof process &&
      process.versions &&
      process.versions.node
        ? (r = bt)
        : n && (r = self)
      var s = !r.JS_SHA3_NO_COMMON_JS && t.exports,
        a = !r.JS_SHA3_NO_ARRAY_BUFFER && 'undefined' != typeof ArrayBuffer,
        o = '0123456789abcdef'.split(''),
        u = [4, 1024, 262144, 67108864],
        h = [0, 8, 16, 24],
        d = [
          1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
          2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136,
          0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648,
          32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128,
          2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648,
          32896, 2147483648, 2147483649, 0, 2147516424, 2147483648
        ],
        l = [224, 256, 384, 512],
        f = [128, 256],
        c = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'],
        p = { 128: 168, 256: 136 }
      ;(!r.JS_SHA3_NO_NODE_JS && Array.isArray) ||
        (Array.isArray = function (t) {
          return '[object Array]' === Object.prototype.toString.call(t)
        }),
        !a ||
          (!r.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
          (ArrayBuffer.isView = function (t) {
            return (
              'object' == typeof t &&
              t.buffer &&
              t.buffer.constructor === ArrayBuffer
            )
          })
      for (
        var m = function (t, e, i) {
            return function (r) {
              return new I(t, e, t).update(r)[i]()
            }
          },
          g = function (t, e, i) {
            return function (r, n) {
              return new I(t, e, n).update(r)[i]()
            }
          },
          y = function (t, e, i) {
            return function (e, r, n, s) {
              return A['cshake' + t].update(e, r, n, s)[i]()
            }
          },
          b = function (t, e, i) {
            return function (e, r, n, s) {
              return A['kmac' + t].update(e, r, n, s)[i]()
            }
          },
          w = function (t, e, i, r) {
            for (var n = 0; n < c.length; ++n) {
              var s = c[n]
              t[s] = e(i, r, s)
            }
            return t
          },
          v = function (t, e) {
            var i = m(t, e, 'hex')
            return (
              (i.create = function () {
                return new I(t, e, t)
              }),
              (i.update = function (t) {
                return i.create().update(t)
              }),
              w(i, m, t, e)
            )
          },
          M = [
            {
              name: 'keccak',
              padding: [1, 256, 65536, 16777216],
              bits: l,
              createMethod: v
            },
            {
              name: 'sha3',
              padding: [6, 1536, 393216, 100663296],
              bits: l,
              createMethod: v
            },
            {
              name: 'shake',
              padding: [31, 7936, 2031616, 520093696],
              bits: f,
              createMethod: function (t, e) {
                var i = g(t, e, 'hex')
                return (
                  (i.create = function (i) {
                    return new I(t, e, i)
                  }),
                  (i.update = function (t, e) {
                    return i.create(e).update(t)
                  }),
                  w(i, g, t, e)
                )
              }
            },
            {
              name: 'cshake',
              padding: u,
              bits: f,
              createMethod: function (t, e) {
                var i = p[t],
                  r = y(t, 0, 'hex')
                return (
                  (r.create = function (r, n, s) {
                    return n || s
                      ? new I(t, e, r).bytepad([n, s], i)
                      : A['shake' + t].create(r)
                  }),
                  (r.update = function (t, e, i, n) {
                    return r.create(e, i, n).update(t)
                  }),
                  w(r, y, t, e)
                )
              }
            },
            {
              name: 'kmac',
              padding: u,
              bits: f,
              createMethod: function (t, e) {
                var i = p[t],
                  r = b(t, 0, 'hex')
                return (
                  (r.create = function (r, n, s) {
                    return new B(t, e, n)
                      .bytepad(['KMAC', s], i)
                      .bytepad([r], i)
                  }),
                  (r.update = function (t, e, i, n) {
                    return r.create(t, i, n).update(e)
                  }),
                  w(r, b, t, e)
                )
              }
            }
          ],
          A = {},
          _ = [],
          S = 0;
        S < M.length;
        ++S
      )
        for (var T = M[S], x = T.bits, E = 0; E < x.length; ++E) {
          var R = T.name + '_' + x[E]
          if (
            (_.push(R),
            (A[R] = T.createMethod(x[E], T.padding)),
            'sha3' !== T.name)
          ) {
            var k = T.name + x[E]
            _.push(k), (A[k] = A[R])
          }
        }
      function I(t, e, i) {
        ;(this.blocks = []),
          (this.s = []),
          (this.padding = e),
          (this.outputBits = i),
          (this.reset = !0),
          (this.finalized = !1),
          (this.block = 0),
          (this.start = 0),
          (this.blockCount = (1600 - (t << 1)) >> 5),
          (this.byteCount = this.blockCount << 2),
          (this.outputBlocks = i >> 5),
          (this.extraBytes = (31 & i) >> 3)
        for (var r = 0; r < 50; ++r) this.s[r] = 0
      }
      function B(t, e, i) {
        I.call(this, t, e, i)
      }
      ;(I.prototype.update = function (t) {
        if (this.finalized) throw new Error('finalize already called')
        var i,
          r = typeof t
        if ('string' !== r) {
          if ('object' !== r) throw new Error(e)
          if (null === t) throw new Error(e)
          if (a && t.constructor === ArrayBuffer) t = new Uint8Array(t)
          else if (!(Array.isArray(t) || (a && ArrayBuffer.isView(t))))
            throw new Error(e)
          i = !0
        }
        for (
          var n,
            s,
            o = this.blocks,
            u = this.byteCount,
            d = t.length,
            l = this.blockCount,
            f = 0,
            c = this.s;
          f < d;

        ) {
          if (this.reset)
            for (this.reset = !1, o[0] = this.block, n = 1; n < l + 1; ++n)
              o[n] = 0
          if (i)
            for (n = this.start; f < d && n < u; ++f)
              o[n >> 2] |= t[f] << h[3 & n++]
          else
            for (n = this.start; f < d && n < u; ++f)
              (s = t.charCodeAt(f)) < 128
                ? (o[n >> 2] |= s << h[3 & n++])
                : s < 2048
                ? ((o[n >> 2] |= (192 | (s >> 6)) << h[3 & n++]),
                  (o[n >> 2] |= (128 | (63 & s)) << h[3 & n++]))
                : s < 55296 || s >= 57344
                ? ((o[n >> 2] |= (224 | (s >> 12)) << h[3 & n++]),
                  (o[n >> 2] |= (128 | ((s >> 6) & 63)) << h[3 & n++]),
                  (o[n >> 2] |= (128 | (63 & s)) << h[3 & n++]))
                : ((s =
                    65536 + (((1023 & s) << 10) | (1023 & t.charCodeAt(++f)))),
                  (o[n >> 2] |= (240 | (s >> 18)) << h[3 & n++]),
                  (o[n >> 2] |= (128 | ((s >> 12) & 63)) << h[3 & n++]),
                  (o[n >> 2] |= (128 | ((s >> 6) & 63)) << h[3 & n++]),
                  (o[n >> 2] |= (128 | (63 & s)) << h[3 & n++]))
          if (((this.lastByteIndex = n), n >= u)) {
            for (this.start = n - u, this.block = o[l], n = 0; n < l; ++n)
              c[n] ^= o[n]
            O(c), (this.reset = !0)
          } else this.start = n
        }
        return this
      }),
        (I.prototype.encode = function (t, e) {
          var i = 255 & t,
            r = 1,
            n = [i]
          for (i = 255 & (t >>= 8); i > 0; )
            n.unshift(i), (i = 255 & (t >>= 8)), ++r
          return e ? n.push(r) : n.unshift(r), this.update(n), n.length
        }),
        (I.prototype.encodeString = function (t) {
          var i,
            r = typeof t
          if ('string' !== r) {
            if ('object' !== r) throw new Error(e)
            if (null === t) throw new Error(e)
            if (a && t.constructor === ArrayBuffer) t = new Uint8Array(t)
            else if (!(Array.isArray(t) || (a && ArrayBuffer.isView(t))))
              throw new Error(e)
            i = !0
          }
          var n = 0
          if (i) n = t.length
          else
            for (var s = 0; s < t.length; ++s) {
              var o = t.charCodeAt(s)
              o < 128
                ? (n += 1)
                : o < 2048
                ? (n += 2)
                : o < 55296 || o >= 57344
                ? (n += 3)
                : ((o =
                    65536 + (((1023 & o) << 10) | (1023 & t.charCodeAt(++s)))),
                  (n += 4))
            }
          return (n += this.encode(8 * n)), this.update(t), n
        }),
        (I.prototype.bytepad = function (t, e) {
          for (var i = this.encode(e), r = 0; r < t.length; ++r)
            i += this.encodeString(t[r])
          var n = []
          return (n.length = e - (i % e)), this.update(n), this
        }),
        (I.prototype.finalize = function () {
          if (!this.finalized) {
            this.finalized = !0
            var t = this.blocks,
              e = this.lastByteIndex,
              i = this.blockCount,
              r = this.s
            if (
              ((t[e >> 2] |= this.padding[3 & e]),
              this.lastByteIndex === this.byteCount)
            )
              for (t[0] = t[i], e = 1; e < i + 1; ++e) t[e] = 0
            for (t[i - 1] |= 2147483648, e = 0; e < i; ++e) r[e] ^= t[e]
            O(r)
          }
        }),
        (I.prototype.toString = I.prototype.hex =
          function () {
            this.finalize()
            for (
              var t,
                e = this.blockCount,
                i = this.s,
                r = this.outputBlocks,
                n = this.extraBytes,
                s = 0,
                a = 0,
                u = '';
              a < r;

            ) {
              for (s = 0; s < e && a < r; ++s, ++a)
                u +=
                  o[((t = i[s]) >> 4) & 15] +
                  o[15 & t] +
                  o[(t >> 12) & 15] +
                  o[(t >> 8) & 15] +
                  o[(t >> 20) & 15] +
                  o[(t >> 16) & 15] +
                  o[(t >> 28) & 15] +
                  o[(t >> 24) & 15]
              a % e == 0 && (O(i), (s = 0))
            }
            return (
              n &&
                ((u += o[((t = i[s]) >> 4) & 15] + o[15 & t]),
                n > 1 && (u += o[(t >> 12) & 15] + o[(t >> 8) & 15]),
                n > 2 && (u += o[(t >> 20) & 15] + o[(t >> 16) & 15])),
              u
            )
          }),
        (I.prototype.buffer = I.prototype.arrayBuffer =
          function () {
            this.finalize()
            var t,
              e = this.blockCount,
              i = this.s,
              r = this.outputBlocks,
              n = this.extraBytes,
              s = 0,
              a = 0,
              o = this.outputBits >> 3
            t = n ? new ArrayBuffer((r + 1) << 2) : new ArrayBuffer(o)
            for (var u = new Uint32Array(t); a < r; ) {
              for (s = 0; s < e && a < r; ++s, ++a) u[a] = i[s]
              a % e == 0 && O(i)
            }
            return n && ((u[s] = i[s]), (t = t.slice(0, o))), t
          }),
        (I.prototype.digest = I.prototype.array =
          function () {
            this.finalize()
            for (
              var t,
                e,
                i = this.blockCount,
                r = this.s,
                n = this.outputBlocks,
                s = this.extraBytes,
                a = 0,
                o = 0,
                u = [];
              o < n;

            ) {
              for (a = 0; a < i && o < n; ++a, ++o)
                (u[(t = o << 2)] = 255 & (e = r[a])),
                  (u[t + 1] = (e >> 8) & 255),
                  (u[t + 2] = (e >> 16) & 255),
                  (u[t + 3] = (e >> 24) & 255)
              o % i == 0 && O(r)
            }
            return (
              s &&
                ((u[(t = o << 2)] = 255 & (e = r[a])),
                s > 1 && (u[t + 1] = (e >> 8) & 255),
                s > 2 && (u[t + 2] = (e >> 16) & 255)),
              u
            )
          }),
        ((B.prototype = new I()).finalize = function () {
          return (
            this.encode(this.outputBits, !0), I.prototype.finalize.call(this)
          )
        })
      var O = function (t) {
        var e,
          i,
          r,
          n,
          s,
          a,
          o,
          u,
          h,
          l,
          f,
          c,
          p,
          m,
          g,
          y,
          b,
          w,
          v,
          M,
          A,
          _,
          S,
          T,
          x,
          E,
          R,
          k,
          I,
          B,
          O,
          P,
          C,
          N,
          L,
          D,
          F,
          U,
          q,
          j,
          z,
          W,
          $,
          H,
          G,
          Z,
          K,
          V,
          J,
          X,
          Y,
          Q,
          tt,
          et,
          it,
          rt,
          nt,
          st,
          at,
          ot,
          ut,
          ht,
          dt
        for (r = 0; r < 48; r += 2)
          (n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40]),
            (s = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41]),
            (u = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44]),
            (h = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45]),
            (l = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46]),
            (f = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47]),
            (i =
              (p = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]) ^
              (((o = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43]) << 1) |
                ((a = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42]) >>> 31))),
            (t[0] ^= e =
              (c = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]) ^
              ((a << 1) | (o >>> 31))),
            (t[1] ^= i),
            (t[10] ^= e),
            (t[11] ^= i),
            (t[20] ^= e),
            (t[21] ^= i),
            (t[30] ^= e),
            (t[31] ^= i),
            (t[40] ^= e),
            (t[41] ^= i),
            (i = s ^ ((h << 1) | (u >>> 31))),
            (t[2] ^= e = n ^ ((u << 1) | (h >>> 31))),
            (t[3] ^= i),
            (t[12] ^= e),
            (t[13] ^= i),
            (t[22] ^= e),
            (t[23] ^= i),
            (t[32] ^= e),
            (t[33] ^= i),
            (t[42] ^= e),
            (t[43] ^= i),
            (i = o ^ ((f << 1) | (l >>> 31))),
            (t[4] ^= e = a ^ ((l << 1) | (f >>> 31))),
            (t[5] ^= i),
            (t[14] ^= e),
            (t[15] ^= i),
            (t[24] ^= e),
            (t[25] ^= i),
            (t[34] ^= e),
            (t[35] ^= i),
            (t[44] ^= e),
            (t[45] ^= i),
            (i = h ^ ((p << 1) | (c >>> 31))),
            (t[6] ^= e = u ^ ((c << 1) | (p >>> 31))),
            (t[7] ^= i),
            (t[16] ^= e),
            (t[17] ^= i),
            (t[26] ^= e),
            (t[27] ^= i),
            (t[36] ^= e),
            (t[37] ^= i),
            (t[46] ^= e),
            (t[47] ^= i),
            (i = f ^ ((s << 1) | (n >>> 31))),
            (t[8] ^= e = l ^ ((n << 1) | (s >>> 31))),
            (t[9] ^= i),
            (t[18] ^= e),
            (t[19] ^= i),
            (t[28] ^= e),
            (t[29] ^= i),
            (t[38] ^= e),
            (t[39] ^= i),
            (t[48] ^= e),
            (t[49] ^= i),
            (g = t[1]),
            (Z = (t[11] << 4) | (t[10] >>> 28)),
            (K = (t[10] << 4) | (t[11] >>> 28)),
            (k = (t[20] << 3) | (t[21] >>> 29)),
            (I = (t[21] << 3) | (t[20] >>> 29)),
            (ot = (t[31] << 9) | (t[30] >>> 23)),
            (ut = (t[30] << 9) | (t[31] >>> 23)),
            (W = (t[40] << 18) | (t[41] >>> 14)),
            ($ = (t[41] << 18) | (t[40] >>> 14)),
            (N = (t[2] << 1) | (t[3] >>> 31)),
            (L = (t[3] << 1) | (t[2] >>> 31)),
            (b = (t[12] << 12) | (t[13] >>> 20)),
            (V = (t[22] << 10) | (t[23] >>> 22)),
            (J = (t[23] << 10) | (t[22] >>> 22)),
            (B = (t[33] << 13) | (t[32] >>> 19)),
            (O = (t[32] << 13) | (t[33] >>> 19)),
            (ht = (t[42] << 2) | (t[43] >>> 30)),
            (dt = (t[43] << 2) | (t[42] >>> 30)),
            (et = (t[5] << 30) | (t[4] >>> 2)),
            (it = (t[4] << 30) | (t[5] >>> 2)),
            (D = (t[14] << 6) | (t[15] >>> 26)),
            (F = (t[15] << 6) | (t[14] >>> 26)),
            (v = (t[24] << 11) | (t[25] >>> 21)),
            (X = (t[34] << 15) | (t[35] >>> 17)),
            (Y = (t[35] << 15) | (t[34] >>> 17)),
            (P = (t[45] << 29) | (t[44] >>> 3)),
            (C = (t[44] << 29) | (t[45] >>> 3)),
            (T = (t[6] << 28) | (t[7] >>> 4)),
            (x = (t[7] << 28) | (t[6] >>> 4)),
            (rt = (t[17] << 23) | (t[16] >>> 9)),
            (nt = (t[16] << 23) | (t[17] >>> 9)),
            (U = (t[26] << 25) | (t[27] >>> 7)),
            (q = (t[27] << 25) | (t[26] >>> 7)),
            (M = (t[36] << 21) | (t[37] >>> 11)),
            (A = (t[37] << 21) | (t[36] >>> 11)),
            (Q = (t[47] << 24) | (t[46] >>> 8)),
            (tt = (t[46] << 24) | (t[47] >>> 8)),
            (H = (t[8] << 27) | (t[9] >>> 5)),
            (G = (t[9] << 27) | (t[8] >>> 5)),
            (E = (t[18] << 20) | (t[19] >>> 12)),
            (R = (t[19] << 20) | (t[18] >>> 12)),
            (st = (t[29] << 7) | (t[28] >>> 25)),
            (at = (t[28] << 7) | (t[29] >>> 25)),
            (j = (t[38] << 8) | (t[39] >>> 24)),
            (z = (t[39] << 8) | (t[38] >>> 24)),
            (_ = (t[48] << 14) | (t[49] >>> 18)),
            (S = (t[49] << 14) | (t[48] >>> 18)),
            (t[0] =
              (m = t[0]) ^
              (~(y = (t[13] << 12) | (t[12] >>> 20)) &
                (w = (t[25] << 11) | (t[24] >>> 21)))),
            (t[1] = g ^ (~b & v)),
            (t[10] = T ^ (~E & k)),
            (t[11] = x ^ (~R & I)),
            (t[20] = N ^ (~D & U)),
            (t[21] = L ^ (~F & q)),
            (t[30] = H ^ (~Z & V)),
            (t[31] = G ^ (~K & J)),
            (t[40] = et ^ (~rt & st)),
            (t[41] = it ^ (~nt & at)),
            (t[2] = y ^ (~w & M)),
            (t[3] = b ^ (~v & A)),
            (t[12] = E ^ (~k & B)),
            (t[13] = R ^ (~I & O)),
            (t[22] = D ^ (~U & j)),
            (t[23] = F ^ (~q & z)),
            (t[32] = Z ^ (~V & X)),
            (t[33] = K ^ (~J & Y)),
            (t[42] = rt ^ (~st & ot)),
            (t[43] = nt ^ (~at & ut)),
            (t[4] = w ^ (~M & _)),
            (t[5] = v ^ (~A & S)),
            (t[14] = k ^ (~B & P)),
            (t[15] = I ^ (~O & C)),
            (t[24] = U ^ (~j & W)),
            (t[25] = q ^ (~z & $)),
            (t[34] = V ^ (~X & Q)),
            (t[35] = J ^ (~Y & tt)),
            (t[44] = st ^ (~ot & ht)),
            (t[45] = at ^ (~ut & dt)),
            (t[6] = M ^ (~_ & m)),
            (t[7] = A ^ (~S & g)),
            (t[16] = B ^ (~P & T)),
            (t[17] = O ^ (~C & x)),
            (t[26] = j ^ (~W & N)),
            (t[27] = z ^ (~$ & L)),
            (t[36] = X ^ (~Q & H)),
            (t[37] = Y ^ (~tt & G)),
            (t[46] = ot ^ (~ht & et)),
            (t[47] = ut ^ (~dt & it)),
            (t[8] = _ ^ (~m & y)),
            (t[9] = S ^ (~g & b)),
            (t[18] = P ^ (~T & E)),
            (t[19] = C ^ (~x & R)),
            (t[28] = W ^ (~N & D)),
            (t[29] = $ ^ (~L & F)),
            (t[38] = Q ^ (~H & Z)),
            (t[39] = tt ^ (~G & K)),
            (t[48] = ht ^ (~et & rt)),
            (t[49] = dt ^ (~it & nt)),
            (t[0] ^= d[r]),
            (t[1] ^= d[r + 1])
      }
      if (s) t.exports = A
      else for (S = 0; S < _.length; ++S) r[_[S]] = A[_[S]]
    })()
  })
function vo(t) {
  if (null == t) throw new Error('cannot convert null value to array')
  if ('string' == typeof t) {
    const e = t.match(/^(0x)?[0-9a-fA-F]*$/)
    if (!e) throw new Error('invalid hexidecimal string')
    if ('0x' !== e[1]) throw new Error('hex string must have 0x prefix')
    ;(t = t.substring(2)).length % 2 && (t = '0' + t)
    const i = []
    for (let e = 0; e < t.length; e += 2) i.push(parseInt(t.substr(e, 2), 16))
    return Mo(new Uint8Array(i))
  }
  if (
    (function (t) {
      if (!t || parseInt(String(t.length)) != t.length || 'string' == typeof t)
        return !1
      for (let e = 0; e < t.length; e++) {
        const i = t[e]
        if (i < 0 || i >= 256 || parseInt(String(i)) != i) return !1
      }
      return !0
    })(t)
  )
    return Mo(new Uint8Array(t))
  throw new Error('invalid arrayify value')
}
function Mo(t) {
  return (
    void 0 !== t.slice ||
      (t.slice = () => {
        const e = Array.prototype.slice.call(arguments)
        return Mo(new Uint8Array(Array.prototype.slice.apply(t, e)))
      }),
    t
  )
}
var Ao = /*#__PURE__*/ Object.defineProperty(
  {
    keccak256: function (t) {
      return '0x' + wo.keccak_256(vo(t))
    },
    padLeft: (t, e) => {
      const i = /^0x/i.test(t) || 'number' == typeof t
      return (
        (t = t.toString().replace(/^0x/i, '')),
        (i ? '0x' : '') +
          new Array(e - t.length + 1 >= 0 ? e - t.length + 1 : 0).join('0') +
          t
      )
    },
    bytesToHex: function (t) {
      const e = []
      for (let i = 0; i < t.length; i++)
        e.push((t[i] >>> 4).toString(16)), e.push((15 & t[i]).toString(16))
      return `0x${e.join('').replace(/^0+/, '')}`
    },
    toByteArray: vo
  },
  '__esModule',
  { value: !0 }
)
function _o(t) {
  return !(
    'string' != typeof t ||
    !/^(0x)?[0-9a-f]{512}$/i.test(t) ||
    (!/^(0x)?[0-9a-f]{512}$/.test(t) && !/^(0x)?[0-9A-F]{512}$/.test(t))
  )
}
function So(t, e) {
  'object' == typeof e && e.constructor === Uint8Array && (e = Ao.bytesToHex(e))
  const i = Ao.keccak256(e).replace('0x', '')
  for (let e = 0; e < 12; e += 4) {
    const r =
        ((parseInt(i.substr(e, 2), 16) << 8) +
          parseInt(i.substr(e + 2, 2), 16)) &
        2047,
      n = 1 << r % 4
    if ((To(t.charCodeAt(t.length - 1 - Math.floor(r / 4))) & n) !== n)
      return !1
  }
  return !0
}
function To(t) {
  if (t >= 48 && t <= 57) return t - 48
  if (t >= 65 && t <= 70) return t - 55
  if (t >= 97 && t <= 102) return t - 87
  throw new Error('invalid bloom')
}
function xo(t) {
  return !(
    'string' != typeof t ||
    !/^(0x)?[0-9a-f]{64}$/i.test(t) ||
    (!/^(0x)?[0-9a-f]{64}$/.test(t) && !/^(0x)?[0-9A-F]{64}$/.test(t))
  )
}
function Eo(t) {
  return !(
    'string' != typeof t ||
    (!t.match(/^(0x)?[0-9a-fA-F]{40}$/) &&
      !t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/))
  )
}
var Ro = /*#__PURE__*/ Object.defineProperty(
    {
      isBloom: _o,
      isInBloom: So,
      isUserEthereumAddressInBloom: function (t, e) {
        if (!_o(t)) throw new Error('Invalid bloom given')
        if (!Eo(e)) throw new Error(`Invalid ethereum address given: "${e}"`)
        return So(t, Ao.padLeft(e, 64))
      },
      isContractAddressInBloom: function (t, e) {
        if (!_o(t)) throw new Error('Invalid bloom given')
        if (!Eo(e)) throw new Error(`Invalid contract address given: "${e}"`)
        return So(t, e)
      },
      isTopicInBloom: function (t, e) {
        if (!_o(t)) throw new Error('Invalid bloom given')
        if (!xo(e)) throw new Error('Invalid topic')
        return So(t, e)
      },
      isTopic: xo,
      isAddress: Eo
    },
    '__esModule',
    { value: !0 }
  ),
  ko = function (t) {
    return Bt.isBN(t)
  },
  Io = function (t) {
    return t && t.constructor && 'BigNumber' === t.constructor.name
  },
  Bo = function (t) {
    try {
      return St.apply(null, arguments)
    } catch (e) {
      throw new Error(e + ' Given value: "' + t + '"')
    }
  },
  Oo = function (t) {
    return (
      !!/^(0x)?[0-9a-f]{40}$/i.test(t) &&
      (!(
        !/^(0x|0X)?[0-9a-f]{40}$/.test(t) && !/^(0x|0X)?[0-9A-F]{40}$/.test(t)
      ) ||
        Po(t))
    )
  },
  Po = function (t) {
    t = t.replace(/^0x/i, '')
    for (var e = jo(t.toLowerCase()).replace(/^0x/i, ''), i = 0; i < 40; i++)
      if (
        (parseInt(e[i], 16) > 7 && t[i].toUpperCase() !== t[i]) ||
        (parseInt(e[i], 16) <= 7 && t[i].toLowerCase() !== t[i])
      )
        return !1
    return !0
  },
  Co = function (t) {
    var e = ''
    t = (t = (t = (t = (t = Ot.encode(t)).replace(/^(?:\u0000)*/, ''))
      .split('')
      .reverse()
      .join('')).replace(/^(?:\u0000)*/, ''))
      .split('')
      .reverse()
      .join('')
    for (var i = 0; i < t.length; i++) {
      var r = t.charCodeAt(i).toString(16)
      e += r.length < 2 ? '0' + r : r
    }
    return '0x' + e
  },
  No = function (t) {
    if (!t) return t
    if ('string' == typeof t && !Fo(t))
      throw new Error('Given value "' + t + '" is not a valid hex string.')
    return Bo(t).toNumber()
  },
  Lo = function (t) {
    if (null == t) return t
    if (!isFinite(t) && !Fo(t))
      throw new Error('Given input "' + t + '" is not a number.')
    var e = Bo(t),
      i = e.toString(16)
    return e.lt(new Bt(0)) ? '-0x' + i.substr(1) : '0x' + i
  },
  Do = function (t, e) {
    if (Oo(t)) return e ? 'address' : '0x' + t.toLowerCase().replace(/^0x/i, '')
    if ('boolean' == typeof t) return e ? 'bool' : t ? '0x01' : '0x00'
    if (Buffer.isBuffer(t)) return '0x' + t.toString('hex')
    if ('object' == typeof t && t && !Io(t) && !ko(t))
      return e ? 'string' : Co(JSON.stringify(t))
    if ('string' == typeof t) {
      if (0 === t.indexOf('-0x') || 0 === t.indexOf('-0X'))
        return e ? 'int256' : Lo(t)
      if (0 === t.indexOf('0x') || 0 === t.indexOf('0X')) return e ? 'bytes' : t
      if (!isFinite(t)) return e ? 'string' : Co(t)
    }
    return e ? (t < 0 ? 'int256' : 'uint256') : Lo(t)
  },
  Fo = function (t) {
    return (
      ('string' == typeof t || 'number' == typeof t) &&
      /^(-)?0x[0-9a-f]*$/i.test(t)
    )
  },
  Uo = function (t) {
    return (
      ('string' == typeof t || 'number' == typeof t) &&
      /^(-0x|0x)?[0-9a-f]*$/i.test(t)
    )
  },
  qo = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  jo = function (t) {
    ko(t) && (t = t.toString()),
      Fo(t) && /^0x/i.test(t.toString())
        ? (t = bo.toBuffer(t))
        : 'string' == typeof t && (t = Buffer.from(t, 'utf-8'))
    var e = bo.bufferToHex(bo.keccak256(t))
    return e === qo ? null : e
  }
jo._Hash = bo.keccak256
var zo,
  Wo,
  $o,
  Ho = {
    BN: Bt,
    isBN: ko,
    isBigNumber: Io,
    toBN: Bo,
    isAddress: Oo,
    isBloom: function (t) {
      return Ro.isBloom(t)
    },
    isUserEthereumAddressInBloom: function (t, e) {
      return Ro.isUserEthereumAddressInBloom(t, e)
    },
    isContractAddressInBloom: function (t, e) {
      return Ro.isContractAddressInBloom(t, e)
    },
    isTopic: function (t) {
      return Ro.isTopic(t)
    },
    isTopicInBloom: function (t, e) {
      return Ro.isTopicInBloom(t, e)
    },
    isInBloom: function (t, e) {
      return Ro.isInBloom(t, e)
    },
    checkAddressChecksum: Po,
    utf8ToHex: Co,
    hexToUtf8: function (t) {
      if (!Fo(t))
        throw new Error('The parameter "' + t + '" must be a valid HEX string.')
      for (
        var e = '',
          i = 0,
          r = (t = (t = (t = (t = (t = t.replace(/^0x/i, '')).replace(
            /^(?:00)*/,
            ''
          ))
            .split('')
            .reverse()
            .join('')).replace(/^(?:00)*/, ''))
            .split('')
            .reverse()
            .join('')).length,
          n = 0;
        n < r;
        n += 2
      )
        (i = parseInt(t.substr(n, 2), 16)), (e += String.fromCharCode(i))
      return Ot.decode(e)
    },
    hexToNumber: No,
    hexToNumberString: function (t) {
      if (!t) return t
      if ('string' == typeof t && !Fo(t))
        throw new Error('Given value "' + t + '" is not a valid hex string.')
      return Bo(t).toString(10)
    },
    numberToHex: Lo,
    toHex: Do,
    hexToBytes: function (t) {
      if (((t = t.toString(16)), !Fo(t)))
        throw new Error('Given value "' + t + '" is not a valid hex string.')
      t = t.replace(/^0x/i, '')
      for (var e = [], i = 0; i < t.length; i += 2)
        e.push(parseInt(t.substr(i, 2), 16))
      return e
    },
    bytesToHex: function (t) {
      for (var e = [], i = 0; i < t.length; i++)
        e.push((t[i] >>> 4).toString(16)), e.push((15 & t[i]).toString(16))
      return '0x' + e.join('')
    },
    isHex: Uo,
    isHexStrict: Fo,
    stripHexPrefix: function (t) {
      return 0 !== t && Uo(t) ? t.replace(/^(-)?0x/i, '$1') : t
    },
    leftPad: function (t, e, i) {
      var r = /^0x/i.test(t) || 'number' == typeof t
      return (
        (t = t.toString(16).replace(/^0x/i, '')),
        (r ? '0x' : '') +
          new Array(e - t.length + 1 >= 0 ? e - t.length + 1 : 0).join(
            i || '0'
          ) +
          t
      )
    },
    rightPad: function (t, e, i) {
      return (
        (/^0x/i.test(t) || 'number' == typeof t ? '0x' : '') +
        (t = t.toString(16).replace(/^0x/i, '')) +
        new Array(e - t.length + 1 >= 0 ? e - t.length + 1 : 0).join(i || '0')
      )
    },
    toTwosComplement: function (t) {
      return '0x' + Bo(t).toTwos(256).toString(16, 64)
    },
    sha3: jo,
    sha3Raw: function (t) {
      return null === (t = jo(t)) ? qo : t
    },
    toNumber: function (t) {
      return 'number' == typeof t ? t : No(Do(t))
    }
  },
  Go = function (t) {
    var e = typeof t
    if ('string' === e)
      return Ho.isHexStrict(t)
        ? new Bt(t.replace(/0x/i, ''), 16)
        : new Bt(t, 10)
    if ('number' === e) return new Bt(t)
    if (Ho.isBigNumber(t)) return new Bt(t.toString(10))
    if (Ho.isBN(t)) return t
    throw new Error(t + ' is not a number')
  },
  Zo = function (t, e, i) {
    var r, n, s
    if (
      'bytes' ===
      (t = (s = t).startsWith('int[')
        ? 'int256' + s.slice(3)
        : 'int' === s
        ? 'int256'
        : s.startsWith('uint[')
        ? 'uint256' + s.slice(4)
        : 'uint' === s
        ? 'uint256'
        : s.startsWith('fixed[')
        ? 'fixed128x128' + s.slice(5)
        : 'fixed' === s
        ? 'fixed128x128'
        : s.startsWith('ufixed[')
        ? 'ufixed128x128' + s.slice(6)
        : 'ufixed' === s
        ? 'ufixed128x128'
        : s)
    ) {
      if (e.replace(/^0x/i, '').length % 2 != 0)
        throw new Error('Invalid bytes characters ' + e.length)
      return e
    }
    if ('string' === t) return Ho.utf8ToHex(e)
    if ('bool' === t) return e ? '01' : '00'
    if (t.startsWith('address')) {
      if (((r = i ? 64 : 40), !Ho.isAddress(e)))
        throw new Error(
          e + ' is not a valid address, or the checksum is invalid.'
        )
      return Ho.leftPad(e.toLowerCase(), r)
    }
    if (
      ((r = (function (t) {
        var e = /^\D+(\d+).*$/.exec(t)
        return e ? parseInt(e[1], 10) : null
      })(t)),
      t.startsWith('bytes'))
    ) {
      if (!r) throw new Error('bytes[] not yet supported in solidity')
      if (
        (i && (r = 32), r < 1 || r > 32 || r < e.replace(/^0x/i, '').length / 2)
      )
        throw new Error('Invalid bytes' + r + ' for ' + e)
      return Ho.rightPad(e, 2 * r)
    }
    if (t.startsWith('uint')) {
      if (r % 8 || r < 8 || r > 256)
        throw new Error('Invalid uint' + r + ' size')
      if ((n = Go(e)).bitLength() > r)
        throw new Error(
          'Supplied uint exceeds width: ' + r + ' vs ' + n.bitLength()
        )
      if (n.lt(new Bt(0)))
        throw new Error('Supplied uint ' + n.toString() + ' is negative')
      return r ? Ho.leftPad(n.toString('hex'), (r / 8) * 2) : n
    }
    if (t.startsWith('int')) {
      if (r % 8 || r < 8 || r > 256)
        throw new Error('Invalid int' + r + ' size')
      if ((n = Go(e)).bitLength() > r)
        throw new Error(
          'Supplied int exceeds width: ' + r + ' vs ' + n.bitLength()
        )
      return n.lt(new Bt(0))
        ? n.toTwos(r).toString('hex')
        : r
        ? Ho.leftPad(n.toString('hex'), (r / 8) * 2)
        : n
    }
    throw new Error('Unsupported or invalid type: ' + t)
  },
  Ko = function (t) {
    if (Array.isArray(t))
      throw new Error('Autodetection of array types is not supported.')
    var e,
      i,
      r = ''
    if (
      (t &&
      'object' == typeof t &&
      (t.hasOwnProperty('v') ||
        t.hasOwnProperty('t') ||
        t.hasOwnProperty('value') ||
        t.hasOwnProperty('type'))
        ? ((e = t.hasOwnProperty('t') ? t.t : t.type),
          (r = t.hasOwnProperty('v') ? t.v : t.value))
        : ((e = Ho.toHex(t, !0)),
          (r = Ho.toHex(t)),
          e.startsWith('int') || e.startsWith('uint') || (e = 'bytes')),
      (!e.startsWith('int') && !e.startsWith('uint')) ||
        'string' != typeof r ||
        /^(-)?0x/i.test(r) ||
        (r = new Bt(r)),
      Array.isArray(r))
    ) {
      if (
        ((i = (function (t) {
          var e = /^\D+\d*\[(\d+)\]$/.exec(t)
          return e ? parseInt(e[1], 10) : null
        })(e)),
        i && r.length !== i)
      )
        throw new Error(
          e + ' is not matching the given array ' + JSON.stringify(r)
        )
      i = r.length
    }
    return Array.isArray(r)
      ? r
          .map(function (t) {
            return Zo(e, t, i).toString('hex').replace('0x', '')
          })
          .join('')
      : Zo(e, r, i).toString('hex').replace('0x', '')
  },
  Vo = {
    soliditySha3: function () {
      var t = Array.prototype.slice.call(arguments),
        e = t.map(Ko)
      return Ho.sha3('0x' + e.join(''))
    },
    soliditySha3Raw: function () {
      return Ho.sha3Raw(
        '0x' + Array.prototype.slice.call(arguments).map(Ko).join('')
      )
    },
    encodePacked: function () {
      var t = Array.prototype.slice.call(arguments),
        e = t.map(Ko)
      return '0x' + e.join('').toLowerCase()
    }
  },
  Jo = function (t, e) {
    var i = []
    return (
      e.forEach(function (e) {
        if ('object' == typeof e.components) {
          if ('tuple' !== e.type.substring(0, 5))
            throw new Error(
              'components found but type is not tuple; report on GitHub'
            )
          var r = '',
            n = e.type.indexOf('[')
          n >= 0 && (r = e.type.substring(n))
          var s = Jo(t, e.components)
          Array.isArray(s) && t
            ? i.push('tuple(' + s.join(',') + ')' + r)
            : i.push(t ? '(' + s + ')' : '(' + s.join(',') + ')' + r)
        } else i.push(e.type)
      }),
      i
    )
  },
  Xo = function (t) {
    if (!Ho.isHexStrict(t))
      throw new Error('The parameter must be a valid HEX string.')
    var e = '',
      i = 0,
      r = t.length
    for ('0x' === t.substring(0, 2) && (i = 2); i < r; i += 2) {
      var n = parseInt(t.substr(i, 2), 16)
      e += String.fromCharCode(n)
    }
    return e
  },
  Yo = function (t) {
    if (!t) return '0x00'
    for (var e = '', i = 0; i < t.length; i++) {
      var r = t.charCodeAt(i).toString(16)
      e += r.length < 2 ? '0' + r : r
    }
    return '0x' + e
  },
  Qo = function (t) {
    if (((t = t ? t.toLowerCase() : 'ether'), !It.unitMap[t]))
      throw new Error(
        'This unit "' +
          t +
          '" doesn\'t exist, please use the one of the following units' +
          JSON.stringify(It.unitMap, null, 2)
      )
    return t
  },
  tu = {
    _fireError: function (t, e, i, r, n) {
      return (
        !t ||
          'object' != typeof t ||
          t instanceof Error ||
          !t.data ||
          (((t.data && 'object' == typeof t.data) || Array.isArray(t.data)) &&
            (t.data = JSON.stringify(t.data, null, 2)),
          (t = t.message + '\n' + t.data)),
        'string' == typeof t && (t = new Error(t)),
        'function' == typeof r && r(t, n),
        'function' == typeof i &&
          (((e &&
            'function' == typeof e.listeners &&
            e.listeners('error').length) ||
            'function' == typeof r) &&
            e.catch(function () {}),
          setTimeout(function () {
            i(t)
          }, 1)),
        e &&
          'function' == typeof e.emit &&
          setTimeout(function () {
            e.emit('error', t, n), e.removeAllListeners()
          }, 1),
        e
      )
    },
    _jsonInterfaceMethodToString: function (t) {
      return t && 'object' == typeof t && t.name && -1 !== t.name.indexOf('(')
        ? t.name
        : t.name + '(' + Jo(!1, t.inputs).join(',') + ')'
    },
    _flattenTypes: Jo,
    randomHex: function (t) {
      return '0x' + un(t).toString('hex')
    },
    BN: Ho.BN,
    isBN: Ho.isBN,
    isBigNumber: Ho.isBigNumber,
    isHex: Ho.isHex,
    isHexStrict: Ho.isHexStrict,
    sha3: Ho.sha3,
    sha3Raw: Ho.sha3Raw,
    keccak256: Ho.sha3,
    soliditySha3: Vo.soliditySha3,
    soliditySha3Raw: Vo.soliditySha3Raw,
    encodePacked: Vo.encodePacked,
    isAddress: Ho.isAddress,
    checkAddressChecksum: Ho.checkAddressChecksum,
    toChecksumAddress: function (t) {
      if (void 0 === t) return ''
      if (!/^(0x)?[0-9a-f]{40}$/i.test(t))
        throw new Error(
          'Given address "' + t + '" is not a valid Ethereum address.'
        )
      t = t.toLowerCase().replace(/^0x/i, '')
      for (
        var e = Ho.sha3(t).replace(/^0x/i, ''), i = '0x', r = 0;
        r < t.length;
        r++
      )
        parseInt(e[r], 16) > 7 ? (i += t[r].toUpperCase()) : (i += t[r])
      return i
    },
    toHex: Ho.toHex,
    toBN: Ho.toBN,
    bytesToHex: Ho.bytesToHex,
    hexToBytes: Ho.hexToBytes,
    hexToNumberString: Ho.hexToNumberString,
    hexToNumber: Ho.hexToNumber,
    toDecimal: Ho.hexToNumber,
    numberToHex: Ho.numberToHex,
    fromDecimal: Ho.numberToHex,
    hexToUtf8: Ho.hexToUtf8,
    hexToString: Ho.hexToUtf8,
    toUtf8: Ho.hexToUtf8,
    stripHexPrefix: Ho.stripHexPrefix,
    utf8ToHex: Ho.utf8ToHex,
    stringToHex: Ho.utf8ToHex,
    fromUtf8: Ho.utf8ToHex,
    hexToAscii: Xo,
    toAscii: Xo,
    asciiToHex: Yo,
    fromAscii: Yo,
    unitMap: It.unitMap,
    toWei: function (t, e) {
      if (((e = Qo(e)), !Ho.isBN(t) && 'string' != typeof t))
        throw new Error(
          'Please pass numbers as strings or BN objects to avoid precision errors.'
        )
      return Ho.isBN(t) ? It.toWei(t, e) : It.toWei(t, e).toString(10)
    },
    fromWei: function (t, e) {
      if (((e = Qo(e)), !Ho.isBN(t) && 'string' != typeof t))
        throw new Error(
          'Please pass numbers as strings or BN objects to avoid precision errors.'
        )
      return Ho.isBN(t) ? It.fromWei(t, e) : It.fromWei(t, e).toString(10)
    },
    padLeft: Ho.leftPad,
    leftPad: Ho.leftPad,
    padRight: Ho.rightPad,
    rightPad: Ho.rightPad,
    toTwosComplement: Ho.toTwosComplement,
    isBloom: Ho.isBloom,
    isUserEthereumAddressInBloom: Ho.isUserEthereumAddressInBloom,
    isContractAddressInBloom: Ho.isContractAddressInBloom,
    isTopic: Ho.isTopic,
    isTopicInBloom: Ho.isTopicInBloom,
    isInBloom: Ho.isInBloom,
    compareBlockNumbers: function (t, e) {
      if (t == e) return 0
      if (
        ('genesis' != t && 'earliest' != t && 0 != t) ||
        ('genesis' != e && 'earliest' != e && 0 != e)
      ) {
        if ('genesis' == t || 'earliest' == t) return -1
        if ('genesis' == e || 'earliest' == e) return 1
        if ('latest' == t) return 'pending' == e ? -1 : 1
        if ('latest' === e) return 'pending' == t ? 1 : -1
        if ('pending' == t) return 1
        if ('pending' == e) return -1
        {
          let i = new Bt(t),
            r = new Bt(e)
          return i.lt(r) ? -1 : i.eq(r) ? 0 : 1
        }
      }
      return 0
    },
    toNumber: Ho.toNumber
  }
function eu(t, e, i) {
  let r = !1
  if ('allow' === i) {
    if (t && t.allow) {
      const i = t.allow.find((t) => t.type === e)
      r = i && i.values.length > 0
    }
    return r
  }
  if (t && t.deny) {
    const i = t.deny.find((t) => t.type === e)
    r = i && i.values.length > 0
  }
  return r
}
function iu(t, e, i) {
  const r = eu(t.credentials, e, i)
  return (
    'allow' === i
      ? (r &&
          (t.credentials.allow = t.credentials.allow.filter(
            (t) => t.type !== e
          )),
        t.credentials &&
          !t.credentials.allow &&
          (t.credentials = { deny: t.credentials && t.credentials.deny }))
      : (r &&
          (t.credentials.deny = t.credentials.deny.filter((t) => t.type !== e)),
        t.credentials &&
          !t.credentials.deny &&
          (t.credentials = { allow: t.credentials && t.credentials.allow })),
    t
  )
}
function ru(t, e, i, r) {
  const n = eu(t.credentials, e, r)
  return (
    'allow' === r
      ? n
        ? t.credentials.allow.find((t) => {
            t.type === e && (t.values = i)
          })
        : (t = nu(t, e, i, r))
      : n
      ? t.credentials.deny.find((t) => {
          t.type === e && (t.values = i)
        })
      : (t = nu(t, e, i, r)),
    t
  )
}
function nu(t, e, i, r) {
  const n = { type: e, values: i }
  return (
    'allow' === r
      ? t.credentials && t.credentials.allow
        ? t.credentials.allow.push(n)
        : (t.credentials = {
            allow: [n],
            deny: t.credentials && t.credentials.deny
          })
      : t.credentials && t.credentials.deny
      ? t.credentials.deny.push(n)
      : (t.credentials = {
          allow: t.credentials && t.credentials.allow,
          deny: [n]
        }),
    t
  )
}
class su extends ht {
  constructor(...t) {
    super(...t), (this.baseUrl = void 0)
  }
  static async getInstance(t) {
    var e
    const i = new su()
    return (
      i.setInstanceConfig(t),
      await i.setBaseUrl(null == (e = t.config) ? void 0 : e.rbacUri),
      i
    )
  }
  async setBaseUrl(t) {
    this.baseUrl = t
  }
  get url() {
    return this.baseUrl
  }
  getIsPermitArgs(t, e, i, r, n, s) {
    return 'consume' === e
      ? {
          component: t,
          eventType: e,
          authService: i,
          did: s,
          credentials: { type: n, value: r }
        }
      : {
          component: t,
          eventType: e,
          authService: i,
          credentials: { type: n, value: r }
        }
  }
  async isPermit(t, e, i, r, n, s) {
    if (!this.url) return !0
    const a = this.getIsPermitArgs(t, e, i, r, n, s)
    try {
      const t = await this.ocean.utils.fetch.post(this.url, JSON.stringify(a))
      let e = await t.json()
      return (e = JSON.stringify(e)), 'true' === e
    } catch (t) {
      throw (
        (this.logger.error(t),
        new Error('ERROR: Asset URL not found or not available.'))
      )
    }
  }
}
!(function (t) {
  ;(t[(t.CreatingDataToken = 0)] = 'CreatingDataToken'),
    (t[(t.DataTokenCreated = 1)] = 'DataTokenCreated'),
    (t[(t.EncryptingFiles = 2)] = 'EncryptingFiles'),
    (t[(t.FilesEncrypted = 3)] = 'FilesEncrypted'),
    (t[(t.StoringDdo = 4)] = 'StoringDdo'),
    (t[(t.DdoStored = 5)] = 'DdoStored')
})(zo || (zo = {})),
  (function (t) {
    t[(t.TransferDataToken = 0)] = 'TransferDataToken'
  })(Wo || (Wo = {}))
class au extends ht {
  static async getInstance(t) {
    const e = new au()
    return e.setInstanceConfig(t), e
  }
  create(t, e, i = [], r, n, s, a, o) {
    return r && !tu.isAddress(r)
      ? (this.logger.error(
          `Passed Data Token address ${r} is not valid. Aborting publishing.`
        ),
        null)
      : (this.logger.log('Creating asset'),
        new q(async (u) => {
          0 === i.length &&
            this.logger.log('You have no services. Are you sure about this?')
          const { datatokens: h } = this.ocean
          if (!r) {
            if (
              (this.logger.log('Creating datatoken'),
              u.next(zo.CreatingDataToken),
              (r = await h.create('', e.getId(), n, s, a)),
              !tu.isAddress(r))
            )
              return (
                this.logger.error(
                  `Created Data Token address ${r} is not valid. Aborting publishing.`
                ),
                null
              )
            this.logger.log(`DataToken ${r} created`),
              u.next(zo.DataTokenCreated)
          }
          const d = lt.generate(r)
          let l
          this.logger.log('Encrypting files'),
            u.next(zo.EncryptingFiles),
            o
              ? ((l = await yt.getInstance(this.instanceConfig)),
                await l.setBaseUrl(o))
              : (l = this.ocean.provider)
          const f = await l.encrypt(d.getDid(), t.main.files, e)
          this.logger.log('Files encrypted'), u.next(zo.FilesEncrypted)
          let c = 0
          const p = new pt({
            id: d.getDid(),
            dataToken: r,
            authentication: [
              { type: 'RsaSignatureAuthentication2018', publicKey: d.getDid() }
            ],
            publicKey: [
              { id: d.getDid(), type: 'EthereumECDSAKey', owner: e.getId() }
            ],
            service: [
              {
                type: 'metadata',
                attributes: k(
                  {
                    status: { isListed: !0, isRetired: !1, isOrderDisabled: !1 }
                  },
                  t,
                  {
                    encryptedFiles: f,
                    main: k({}, t.main, {
                      files: t.main.files.map((t, e) =>
                        k({}, t, { index: e, url: void 0 })
                      )
                    })
                  }
                )
              },
              ...i
            ]
              .reverse()
              .filter(
                ({ type: t }, e, i) =>
                  i.findIndex(({ type: e }) => e === t) === e
              )
              .reverse()
              .map((t) => k({}, t, { index: c++ }))
          })
          return (
            await p.addProof(this.ocean, e.getId()),
            (p.dataTokenInfo = {
              name: s,
              symbol: a,
              address: r,
              cap: parseFloat(n)
            }),
            p
          )
        }))
  }
  async resolve(t) {
    return this.ocean.metadataCache.retrieveDDO(t)
  }
  async editMetadata(t, e) {
    if (!t) return null
    for (let r = 0; r < t.service.length; r++) {
      var i
      'metadata' === t.service[r].type &&
        (e.title && (t.service[r].attributes.main.name = e.title),
        e.author && (t.service[r].attributes.main.author = e.author),
        t.service[r].attributes.additionalInformation ||
          (t.service[r].attributes.additionalInformation = Object()),
        e.description &&
          (t.service[r].attributes.additionalInformation.description =
            e.description),
        (t.service[r].attributes.additionalInformation.links = e.links
          ? e.links
          : []),
        void 0 !== (null == (i = e.status) ? void 0 : i.isOrderDisabled) &&
          (t.service[r].attributes.status
            ? (t.service[r].attributes.status.isOrderDisabled =
                e.status.isOrderDisabled)
            : (t.service[r].attributes.status = {
                isOrderDisabled: e.status.isOrderDisabled
              })))
    }
    return t
  }
  async updateCredentials(t, e, i, r) {
    let n
    return (
      (n = i && i.length > 0 ? ru(t, e, i, 'allow') : iu(t, e, 'allow')),
      (n = r && r.length > 0 ? ru(t, e, r, 'deny') : iu(t, e, 'deny')),
      n
    )
  }
  checkCredential(t, e, i) {
    let r = 0,
      n = 'All good',
      s = !0
    if (t.credentials) {
      if (t.credentials.allow && t.credentials.allow.length > 0) {
        const a = t.credentials.allow.find((t) => t.type === e)
        a &&
          !a.values.includes(i) &&
          ((r = 2),
          (n =
            'Access is denied, your wallet address is not found on allow list'),
          (s = !1))
      }
      if (t.credentials.deny && t.credentials.deny.length > 0) {
        const a = t.credentials.deny.find((t) => t.type === e)
        a &&
          a.values.includes(i) &&
          ((r = 3),
          (n = 'Access is denied, your wallet address is found on deny list'),
          (s = !1))
      }
    }
    return { status: r, message: n, result: s }
  }
  async publishDdo(t, e, i = !1) {
    return await this.ocean.onChainMetadata.publish(t.id, t, e, i)
  }
  async updateMetadata(t, e) {
    return await this.ocean.onChainMetadata.update(t.id, t, e)
  }
  async editServiceTimeout(t, e, i) {
    return t
      ? void 0 === t.service[e] || i < 0
        ? null
        : ((t.service[e].attributes.main.timeout = parseInt(i.toFixed())), t)
      : null
  }
  async creator(t) {
    const { did: e, ddo: i } = await ot(t, this.ocean),
      r = i.getChecksum(),
      { creator: n, signatureValue: s } = i.proof,
      a = await this.ocean.utils.signature.verifyText(r, s)
    return (
      a.toLowerCase() !== n.toLowerCase() &&
        this.logger.warn(
          `Owner of ${e} doesn't match. Expected ${n} instead of ${a}.`
        ),
      n
    )
  }
  async getServiceByType(t, e) {
    const { ddo: i } = await ot(t, this.ocean)
    let r
    return (
      i.service.forEach((t) => {
        t.type.toString() === e && (r = t)
      }),
      r
    )
  }
  async getServiceByIndex(t, e) {
    const { ddo: i } = await ot(t, this.ocean)
    let r
    return (
      i.service.forEach((t) => {
        t.index === e && (r = t)
      }),
      r
    )
  }
  async query(t) {
    return this.ocean.metadataCache.queryMetadata(t)
  }
  async createAccessServiceAttributes(t, e, i, r = 0, n, s) {
    const a = {
      type: 'access',
      index: 2,
      serviceEndpoint: n || this.ocean.provider.url,
      attributes: {
        main: {
          creator: t.getId(),
          datePublished: i,
          cost: e,
          timeout: r,
          name: 'dataAssetAccess'
        }
      }
    }
    return (
      null != s &&
        s.userCustomParameters &&
        (a.attributes.userCustomParameters = s.userCustomParameters),
      null != s &&
        s.algoCustomParameters &&
        (a.attributes.algoCustomParameters = s.algoCustomParameters),
      a
    )
  }
  async initialize(t, e, i, r = -1, n, s) {
    const a = await yt.getInstance(this.instanceConfig)
    await a.setBaseUrl(n)
    const o = await a.initialize(t, r, e, i, s)
    return null === o ? null : JSON.parse(o)
  }
  async order(t, e, i, r = -1, n, s, a, o = 'json', u = !0) {
    let h
    const { ddo: d } = await ot(t, this.ocean),
      l = await this.isConsumable(d, i, 'address', o)
    if (!l.result) throw new Error('Order asset failed, ' + l.message)
    if (
      (s || (s = i),
      -1 === r
        ? ((h = await this.getServiceByType(d, e)), (r = h.index))
        : ((h = await this.getServiceByIndex(d, r)), (e = h.type)),
      !(await this.isUserCustomParametersValid(
        h.attributes.userCustomParameters,
        a
      )))
    )
      throw new Error(
        'Order asset failed, Missing required fiels in userCustomParameters'
      )
    try {
      const t = await this.initialize(d, e, i, r, h.serviceEndpoint, a)
      if (!t)
        throw new Error(
          'Order asset failed, Failed to initialize service to compute totalCost for ordering'
        )
      if (u) {
        const e = await this.ocean.datatokens.getPreviousValidOrders(
          t.dataToken,
          t.numTokens,
          r,
          h.attributes.main.timeout,
          s
        )
        if (e) return e
      }
      const o = new rt(await this.ocean.datatokens.balance(t.dataToken, i)),
        l = new rt(String(t.numTokens))
      if (o.isLessThan(l))
        throw (
          (this.logger.error(
            'ERROR: Not enough funds Needed ' +
              l.toString() +
              ' but balance is ' +
              o.toString()
          ),
          new Error(
            'ERROR: Not enough funds Needed ' +
              l.toString() +
              ' but balance is ' +
              o.toString()
          ))
        )
      const f = await this.ocean.datatokens.startOrder(
        t.dataToken,
        s,
        String(t.numTokens),
        r,
        n,
        i
      )
      if (f) return f.transactionHash
    } catch (t) {
      throw (
        (this.logger.error(`ERROR: Failed to order a service : ${t.message}`),
        new Error(`${t.message}`))
      )
    }
  }
  async download(t, e, i, r, n, s = -1, a) {
    const { did: o, ddo: u } = await ot(t, this.ocean),
      { attributes: h } = u.findServiceByType('metadata'),
      d = u.findServiceByType('access'),
      { files: l } = h.main,
      { serviceEndpoint: f } = d
    if (!f)
      throw new Error(
        'Consume asset failed, service definition is missing the `serviceEndpoint`.'
      )
    this.logger.log('Consuming files'),
      (n = n ? `${n}/datafile.${u.shortId()}.${d.index}/` : void 0)
    const c = await yt.getInstance(this.instanceConfig)
    return (
      await c.setBaseUrl(f),
      await c.download(o, e, i, d.type, d.index.toString(), n, r, l, s, a),
      !0
    )
  }
  async simpleDownload(t, e, i, r) {
    var n, s
    let a = e
    ;(a += `?consumerAddress=${r}`),
      (a += `&tokenAddress=${t}`),
      (a += `&transferTxId=${i}`)
    const o = new gt(
      this.logger,
      null == (n = this.instanceConfig) || null == (s = n.config)
        ? void 0
        : s.requestTimeout
    )
    try {
      await o.downloadFile(a)
    } catch (t) {
      throw (
        (this.logger.error('Error consuming assets'), this.logger.error(t), t)
      )
    }
    return e
  }
  async getOrderHistory(t, e, i) {
    const r = [],
      n = t.getId().toLowerCase(),
      { datatokens: s } = this.ocean,
      a = '0x000000000000000000000000' + n.substring(2),
      o = s.getStartOrderEventSignature(),
      u = await this.web3.eth.getPastLogs({
        topics: [o, null, a],
        fromBlock: i || 0,
        toBlock: 'latest'
      })
    for (let t = 0; t < u.length; t++) {
      const i = {
        dtAddress: u[t].address,
        timestamp: 0,
        transactionHash: u[t].transactionHash,
        amount: null,
        consumer: '0x' + u[t].topics[1].substring(u[t].topics[1].length - 40),
        payer: '0x' + u[t].topics[2].substring(u[t].topics[2].length - 40)
      }
      try {
        const n = this.web3.eth.abi.decodeParameters(
          ['uint256', 'uint256', 'uint256', 'uint256'],
          u[t].data
        )
        ;(i.serviceId = parseInt(n[1])),
          (i.timestamp = parseInt(n[2])),
          (i.amount = this.web3.utils.fromWei(n[0])),
          (i.did = C(D(i.dtAddress)))
        const s = await this.getServiceByIndex(i.did, i.serviceId)
        ;(i.serviceType = s.type), (!e || (e && e === s.type)) && r.push(i)
      } catch (t) {}
    }
    return r
  }
  async isConsumable(t, e, i, r) {
    var n, s
    if (!t) throw new Error('ERROR: DDO does not exist')
    const a = { status: 2, message: 'Consume access is denied.', result: !1 }
    if (
      null != (n = t.findServiceByType('metadata').attributes.status) &&
      n.isOrderDisabled
    )
      return {
        status: 1,
        message:
          'Ordering this asset has been temporarily disabled by the publisher.',
        result: !1
      }
    const o = this.instanceConfig
    if (e && null != o && null != (s = o.config) && s.rbacUri) {
      const n = await su.getInstance(this.instanceConfig)
      if (!(await n.isPermit('market', 'consume', r, e, i, t.id))) return a
    }
    return { status: 0, message: 'All good', result: !0 }
  }
  async isUserCustomParametersValid(t, e) {
    if (t)
      for (const i of t) {
        const t = i.name
        if (i.required && (!e || !e[t]))
          return this.logger.error('Missing key: ' + t + ' from customData'), !1
      }
    return !0
  }
}
!(function (t) {
  ;(t.Loading = 'Loading'),
    (t.Unknown = 'Unknown'),
    (t.Stopped = 'Stopped'),
    (t.Working = 'Working')
})($o || ($o = {}))
class ou extends ht {
  static async getInstance(t) {
    const e = new ou()
    return e.setInstanceConfig(t), e
  }
  async get() {
    const t = {}
    t.lib = {
      name: 'Lib',
      version: '0.20.2',
      commit: '2be0918d8355395a4206396d5b592d6cc2d88eab',
      status: $o.Working
    }
    try {
      const { software: e, version: i } =
        await this.ocean.metadataCache.getVersionInfo()
      t.metadataCache = { name: e, status: $o.Working, version: i }
    } catch (e) {
      t.metadataCache = { name: 'MetadataCache', status: $o.Stopped }
    }
    const e = Object.values(t)
    return (t.status = { ok: !e.find(({ status: t }) => t !== $o.Working) }), t
  }
}
class uu {
  constructor(t, e) {
    ;(this.web3 = void 0),
      (this.logger = void 0),
      (this.web3 = t),
      (this.logger = e)
  }
  async signText(t, e, i) {
    const r =
      this.web3 &&
      this.web3.currentProvider &&
      this.web3.currentProvider.isMetaMask
    try {
      return await this.web3.eth.personal.sign(t, e, i)
    } catch (i) {
      if (r) throw i
      this.logger.warn('Error on personal sign.'), this.logger.warn(i)
      try {
        return await this.web3.eth.sign(t, e)
      } catch (t) {
        throw (
          (this.logger.error('Error on sign.'),
          this.logger.error(t),
          new Error('Error executing personal sign'))
        )
      }
    }
  }
  async signWithHash(t, e, i) {
    const r = this.web3.utils.utf8ToHex(t),
      n =
        this.web3 &&
        this.web3.currentProvider &&
        this.web3.currentProvider.isMetaMask
    try {
      return await this.web3.eth.personal.sign(r, e, i)
    } catch (t) {
      if (n) throw t
      this.logger.warn('Error on personal sign.'), this.logger.warn(t)
      try {
        return await this.web3.eth.sign(r, e)
      } catch (t) {
        throw (
          (this.logger.error('Error on sign.'),
          this.logger.error(t),
          new Error('Error executing personal sign'))
        )
      }
    }
  }
  async verifyText(t, e) {
    return this.web3.eth.personal.ecRecover(t, e)
  }
  async getHash(t) {
    let e = ''
    for (let i = 0; i < t.length; i++) e += '' + t.charCodeAt(i).toString(16)
    return '0x' + e
  }
  async signForAquarius(t, e) {
    const i = await this.getHash(t),
      r =
        this.web3 &&
        this.web3.currentProvider &&
        this.web3.currentProvider.isMetaMask
    try {
      return this.web3.eth.personal.sign(i, e.getId(), e.getPassword())
    } catch (t) {
      if (r) throw t
      return (
        this.logger.warn('Error on personal sign.'), this.logger.warn(t), null
      )
    }
  }
}
class hu extends ht {
  constructor(...t) {
    super(...t), (this.signature = void 0), (this.fetch = void 0)
  }
  static async getInstance(t) {
    var e
    const i = new hu()
    return (
      i.setInstanceConfig(t),
      (i.signature = new uu(t.web3, t.logger)),
      (i.fetch = new gt(
        t.logger,
        null == (e = t.config) ? void 0 : e.requestTimeout
      )),
      i
    )
  }
}
const du = '/api/v1/aquarius/assets/ddo'
class lu {
  get url() {
    return this.metadataCacheUri
  }
  constructor(t, e, i) {
    ;(this.fetch = void 0),
      (this.logger = void 0),
      (this.metadataCacheUri = void 0),
      (this.fetch = new gt(e, i)),
      (this.logger = e),
      (this.metadataCacheUri = t)
  }
  async getVersionInfo() {
    return (await this.fetch.get(this.url)).json()
  }
  async getAccessUrl(t, e) {
    return await this.fetch
      .post(`${t.service_endpoint}/${t.resource_id}`, e)
      .then((t) =>
        t.ok
          ? t.text()
          : (this.logger.error('Failed: ', t.status, t.statusText), null)
      )
      .then(
        (t) => (this.logger.error('Success accessing consume endpoint: ', t), t)
      )
      .catch(
        (t) => (
          this.logger.error(
            'Error fetching the data asset consumption url: ',
            t
          ),
          null
        )
      )
  }
  async queryMetadata(t) {
    return await this.fetch
      .post(`${this.url}/api/v1/aquarius/assets/query`, JSON.stringify(t))
      .then((t) =>
        t.ok
          ? t.json()
          : (this.logger.error('queryMetadata failed:', t.status, t.statusText),
            null)
      )
      .then((t) => t)
      .catch(
        (t) => (
          this.logger.error('Error fetching querying metadata: ', t), null
        )
      )
  }
  async encryptDDO(t) {
    const e = `${this.url}/api/v1/aquarius/assets/ddo/encryptashex `
    return await this.fetch
      .postWithOctet(e, t)
      .then((e) =>
        e.ok
          ? e.text()
          : (this.logger.error('encryptDDO failed:', e.status, e.statusText, t),
            null)
      )
      .catch((t) => (this.logger.error('Error encryptDDO: ', t), null))
  }
  async validateMetadata(t) {
    const e = { valid: !1 },
      i = at(t) ? '/validate-remote' : '/validate'
    try {
      const r = await this.fetch.post(`${this.url}${du}${i}`, JSON.stringify(t))
      if (r.ok) {
        const t = await r.json()
        !0 === t ? (e.valid = !0) : (e.errors = t)
      } else
        this.logger.error('validate Metadata failed:', r.status, r.statusText)
    } catch (t) {
      this.logger.error('Error validating metadata: ', t)
    }
    return e
  }
  async retrieveDDO(t, e) {
    t = t && lt.parse(t)
    const i = e || `${this.url}${du}/${t.getDid()}`
    return await this.fetch
      .get(i)
      .then((e) =>
        e.ok
          ? e.json()
          : (this.logger.log('retrieveDDO failed:', e.status, e.statusText, t),
            null)
      )
      .then((t) => new pt(t))
      .catch(
        (t) => (
          this.logger.error('Error fetching querying metadata: ', t), null
        )
      )
  }
  async retrieveDDOByUrl(t) {
    return this.retrieveDDO(void 0, t)
  }
  getServiceEndpoint(t) {
    return `${this.url}/api/v1/aquarius/assets/ddo/did:op:${t.getId()}`
  }
  getURI() {
    return `${this.url}`
  }
  sleep(t) {
    return new Promise((e) => {
      setTimeout(e, t)
    })
  }
  async waitForAqua(t, e) {
    let i = 0
    do {
      try {
        const i = await a(this.getURI() + '/api/v1/aquarius/assets/ddo/' + t)
        if (i.ok) {
          if (!e) break
          {
            const t = await i.json()
            if (t.event && t.event.txid === e) break
          }
        }
      } catch (t) {}
      await this.sleep(1500), i++
    } while (i < 100)
  }
}
class fu {
  constructor(t, e, i = null, r = null, n, s) {
    ;(this.GASLIMIT_DEFAULT = 1e6),
      (this.DDOContractAddress = void 0),
      (this.DDOContractABI = void 0),
      (this.web3 = void 0),
      (this.DDOContract = null),
      (this.logger = void 0),
      (this.metadataCache = void 0),
      (this.config = void 0),
      (this.web3 = t),
      (this.config = s),
      (this.DDOContractAddress = i),
      (this.DDOContractABI = r || g.abi),
      t &&
        (this.DDOContract = st(
          new this.web3.eth.Contract(
            this.DDOContractABI,
            this.DDOContractAddress
          ),
          this.config
        )),
      (this.logger = e),
      (this.metadataCache = n)
  }
  async compressDDO(t) {
    return (y.disableEndMark = !0), y.compress(t, 9)
  }
  async publish(t, e, i, r = !1, n = !0) {
    if (n && !(await this.metadataCache.validateMetadata(e)).valid)
      throw new Error('DDO has failed validation')
    const s = await this.prepareRawData(e, r)
    if (s) return this.publishRaw(L(t), s.flags, s.data, i)
    throw new Error('Could not prepare raw data for publish')
  }
  async update(t, e, i, r = !1, n = !0) {
    if (n && !(await this.metadataCache.validateMetadata(e)).valid)
      throw new Error('DDO has failed validation')
    const s = await this.prepareRawData(e, r)
    if (s) return this.updateRaw(L(t), s.flags, s.data, i)
    throw new Error('Could not prepare raw data for udate')
  }
  async prepareRawData(t, e = !1) {
    let i = 0,
      r = pt.serialize(t)
    if (!1 === e)
      (r = await this.compressDDO(r)), (i |= 1), (r = this.getHex(r))
    else {
      if (((r = await this.metadataCache.encryptDDO(r)), !r)) return null
      i |= 2
    }
    return { flags: i, data: r }
  }
  async publishRaw(t, e, i, r) {
    if (!this.DDOContract)
      return this.logger.error('ERROR: Missing DDOContract'), null
    const n = this.GASLIMIT_DEFAULT
    let s
    try {
      s = await this.DDOContract.methods
        .create(L(t), e, i)
        .estimateGas({ from: r }, (t, e) => (t ? n : e))
    } catch (t) {
      s = n
    }
    try {
      return await this.DDOContract.methods
        .create(L(t), e, i)
        .send({
          from: r,
          gas: s + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      return (
        this.logger.error(`ERROR: Failed to publish raw DDO : ${t.message}`),
        null
      )
    }
  }
  async updateRaw(t, e, i, r) {
    if (!this.DDOContract)
      return this.logger.error('ERROR: Missing DDOContract'), null
    const n = this.GASLIMIT_DEFAULT
    let s
    try {
      s = await this.DDOContract.methods
        .update(L(t), e, i)
        .estimateGas({ from: r }, (t, e) => (t ? n : e))
    } catch (t) {
      s = n
    }
    try {
      return await this.DDOContract.methods
        .update(L(t), e, i)
        .send({
          from: r,
          gas: s + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      return (
        this.logger.error(`ERROR: Failed to update raw DDO : ${t.message}`),
        null
      )
    }
  }
  async transferOwnership(t, e, i) {
    if (!this.DDOContract) return null
    try {
      return await this.DDOContract.methods
        .transferOwnership(L(t), e)
        .send({ from: i })
    } catch (t) {
      return (
        this.logger.error(
          `ERROR: Failed to transfer DDO ownership : ${t.message}`
        ),
        null
      )
    }
  }
  getHex(t) {
    const e = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F'
    ]
    let i = ''
    try {
      for (let r = 0; r < t.length; r++)
        i += '' + e[(t[r] >> 4) & 15] + e[15 & t[r]]
    } catch (t) {
      this.logger.error(`ERROR: Failed to get hex message value : ${t.message}`)
    }
    return '0x' + i
  }
}
class cu {
  constructor(t, e, i, r, n, s) {
    ;(this.GASLIMIT_DEFAULT = 1e6),
      (this.factoryAddress = void 0),
      (this.factoryABI = void 0),
      (this.datatokensABI = void 0),
      (this.web3 = void 0),
      (this.logger = void 0),
      (this.startBlock = void 0),
      (this.config = void 0),
      (this.factoryAddress = t),
      (this.factoryABI = e || b.abi),
      (this.datatokensABI = i || w.abi),
      (this.web3 = r),
      (this.logger = n),
      (this.config = s),
      (this.startBlock = (s && s.startBlock) || 0)
  }
  generateDtName(t) {
    const { name: e, symbol: i } = (function (t) {
      const e = t || ut,
        i = Math.floor(Math.random() * e.adjectives.length),
        r = Math.floor(Math.random() * e.nouns.length),
        n = Math.floor(100 * Math.random()),
        s = e.adjectives[i].replace(/^\w/, (t) => t.toUpperCase()),
        a = e.nouns[r].replace(/^\w/, (t) => t.toUpperCase())
      return {
        name: `${s} ${a} Token`,
        symbol: `${(s.substring(0, 3) + a.substring(0, 3)).toUpperCase()}-${n}`
      }
    })(t)
    return { name: e, symbol: i }
  }
  async create(t, e, i, r, n) {
    i || (i = '1000'),
      (r && n) || ({ name: r, symbol: n } = this.generateDtName())
    const s = st(
        new this.web3.eth.Contract(this.factoryABI, this.factoryAddress, {
          from: e
        }),
        this.config
      ),
      a = this.GASLIMIT_DEFAULT
    let o
    try {
      o = await s.methods
        .createToken(t, r, n, this.web3.utils.toWei(i))
        .estimateGas({ from: e }, (t, e) => (t ? a : e))
    } catch (t) {
      o = a
    }
    const u = await s.methods
      .createToken(t, r, n, this.web3.utils.toWei(i))
      .send({ from: e, gas: o + 1, gasPrice: await nt(this.web3, this.config) })
    let h = null
    try {
      h = u.events.TokenCreated.returnValues[0]
    } catch (t) {
      this.logger.error(`ERROR: Failed to create datatoken : ${t.message}`)
    }
    return h
  }
  async approve(t, e, i, r) {
    const n = st(
        new this.web3.eth.Contract(this.datatokensABI, t, { from: r }),
        this.config
      ),
      s = this.GASLIMIT_DEFAULT
    let a
    try {
      a = await n.methods
        .approve(e, this.web3.utils.toWei(i))
        .estimateGas({ from: r }, (t, e) => (t ? s : e))
    } catch (t) {
      a = s
    }
    return await n.methods
      .approve(e, this.web3.utils.toWei(i))
      .send({ from: r, gas: a + 1, gasPrice: await nt(this.web3, this.config) })
  }
  async mint(e, i, r, n) {
    const s = st(
        new this.web3.eth.Contract(this.datatokensABI, e, { from: i }),
        this.config
      ),
      a = await this.getCap(e)
    if (new t(a).gte(r)) {
      const t = this.GASLIMIT_DEFAULT
      let e
      try {
        e = await s.methods
          .mint(n || i, this.web3.utils.toWei(r))
          .estimateGas({ from: i }, (e, i) => (e ? t : i))
      } catch (i) {
        e = t
      }
      return await s.methods
        .mint(n || i, this.web3.utils.toWei(r))
        .send({
          from: i,
          gas: e + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    }
    throw new Error('Mint amount exceeds cap available')
  }
  async transfer(t, e, i, r) {
    return this.transferToken(t, e, i, r)
  }
  async transferToken(t, e, i, r) {
    const n = this.web3.utils.toWei(i)
    return this.transferWei(t, e, n, r)
  }
  async transferWei(t, e, i, r) {
    const n = st(
        new this.web3.eth.Contract(this.datatokensABI, t, { from: r }),
        this.config
      ),
      s = this.GASLIMIT_DEFAULT
    let a
    try {
      a = await n.methods
        .transfer(e, i)
        .estimateGas({ from: r }, (t, e) => (t ? s : e))
    } catch (t) {
      a = s
    }
    return await n.methods
      .transfer(e, i)
      .send({ from: r, gas: a + 1, gasPrice: await nt(this.web3, this.config) })
  }
  async transferFrom(t, e, i, r) {
    const n = st(
        new this.web3.eth.Contract(this.datatokensABI, t, { from: r }),
        this.config
      ),
      s = this.GASLIMIT_DEFAULT
    let a
    try {
      a = await n.methods
        .transferFrom(e, r, this.web3.utils.toWei(i))
        .estimateGas({ from: r }, (t, e) => (t ? s : e))
    } catch (t) {
      a = s
    }
    return await n.methods
      .transferFrom(e, r, this.web3.utils.toWei(i))
      .send({ from: r, gas: a + 1, gasPrice: await nt(this.web3, this.config) })
  }
  async balance(t, e) {
    const i = st(
        new this.web3.eth.Contract(this.datatokensABI, t, { from: e }),
        this.config
      ),
      r = await i.methods.balanceOf(e).call()
    return this.web3.utils.fromWei(r)
  }
  async allowance(t, e, i) {
    const r = st(
        new this.web3.eth.Contract(this.datatokensABI, t, { from: i }),
        this.config
      ),
      n = await r.methods.allowance(e, i).call()
    return this.web3.utils.fromWei(n)
  }
  async getBlob(t) {
    const e = st(new this.web3.eth.Contract(this.datatokensABI, t), this.config)
    return await e.methods.blob().call()
  }
  async getName(t) {
    const e = st(new this.web3.eth.Contract(this.datatokensABI, t), this.config)
    return await e.methods.name().call()
  }
  async getSymbol(t) {
    const e = st(new this.web3.eth.Contract(this.datatokensABI, t), this.config)
    return await e.methods.symbol().call()
  }
  async getCap(t) {
    const e = st(
        new this.web3.eth.Contract(this.datatokensABI, t),
        this.config
      ),
      i = await e.methods.cap().call()
    return this.web3.utils.fromWei(i)
  }
  toWei(t) {
    return this.web3.utils.toWei(t)
  }
  fromWei(t) {
    return this.web3.utils.fromWei(t)
  }
  async startOrder(t, e, i, r, n, s) {
    const a = st(
      new this.web3.eth.Contract(this.datatokensABI, t, { from: s }),
      this.config
    )
    n || (n = '0x0000000000000000000000000000000000000000')
    try {
      const t = this.GASLIMIT_DEFAULT
      let o
      try {
        o = await a.methods
          .startOrder(e, this.web3.utils.toWei(i), String(r), n)
          .estimateGas({ from: s }, (e, i) => (e ? t : i))
      } catch (e) {
        o = t
      }
      return await a.methods
        .startOrder(e, this.web3.utils.toWei(i), String(r), n)
        .send({
          from: s,
          gas: o + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      throw (
        (this.logger.error(`ERROR: Failed to start order : ${t.message}`),
        new Error(`Failed to start order: ${t.message}`))
      )
    }
  }
  async getPreviousValidOrders(t, e, i, r, n) {
    const s = st(
      new this.web3.eth.Contract(this.datatokensABI, t, { from: n }),
      this.config
    )
    let a
    r > 0
      ? ((a = (await this.web3.eth.getBlockNumber()) - r),
        a < this.startBlock && (a = this.startBlock))
      : (a = this.startBlock)
    const o = await s.getPastEvents('OrderStarted', {
      filter: { consumer: n },
      fromBlock: a,
      toBlock: 'latest'
    })
    for (let t = 0; t < o.length; t++)
      if (
        String(o[t].returnValues.amount) === this.web3.utils.toWei(String(e)) &&
        String(o[t].returnValues.serviceId) === String(i) &&
        o[t].returnValues.consumer.toLowerCase() === n.toLowerCase()
      ) {
        if (0 === r) return o[t].transactionHash
        const e = await this.web3.eth.getBlock(o[t].blockHash),
          i = new rt(e.timestamp).plus(r)
        if (new rt(Math.floor(Date.now() / 1e3)).isLessThan(i))
          return o[t].transactionHash
      }
    return null
  }
  getStartOrderEventSignature() {
    const t = this.datatokensABI.find(function (t) {
      if ('OrderStarted' === t.name && 'event' === t.type) return t
    })
    return this.web3.eth.abi.encodeEventSignature(t)
  }
  async proposeMinter(t, e, i) {
    const r = st(
        new this.web3.eth.Contract(this.datatokensABI, t, { from: i }),
        this.config
      ),
      n = this.GASLIMIT_DEFAULT
    let s
    try {
      s = await r.methods
        .proposeMinter(e)
        .estimateGas({ from: i }, (t, e) => (t ? n : e))
    } catch (t) {
      s = n
    }
    try {
      return await r.methods
        .proposeMinter(e)
        .send({
          from: i,
          gas: s + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      return this.logger.error('ERROR: Propose minter failed'), null
    }
  }
  async approveMinter(t, e) {
    const i = st(
        new this.web3.eth.Contract(this.datatokensABI, t, { from: e }),
        this.config
      ),
      r = this.GASLIMIT_DEFAULT
    let n
    try {
      n = await i.methods
        .approveMinter()
        .estimateGas({ from: e }, (t, e) => (t ? r : e))
    } catch (t) {
      n = r
    }
    try {
      return await i.methods
        .approveMinter()
        .send({
          from: e,
          gas: n + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      return null
    }
  }
  async isMinter(t, e) {
    const i = st(new this.web3.eth.Contract(this.datatokensABI, t), this.config)
    return await i.methods.isMinter(e).call()
  }
}
class pu extends ht {
  getNetworkId() {
    return this.web3.eth.net.getId()
  }
  async getNetworkName() {
    return this.web3.eth.net.getId().then((t) => {
      const e = v(t)
      return e && e.name ? e.name : 'Development'
    })
  }
}
var mu
!(function (t) {
  t[(t.TransferDataToken = 0)] = 'TransferDataToken'
})(mu || (mu = {})),
  Object.freeze({
    WarmingUp: 1,
    Started: 10,
    ConfiguringVolumes: 20,
    ProvisioningSuccess: 30,
    DataProvisioningFailed: 31,
    AlgorithmProvisioningFailed: 32,
    RunningAlgorithm: 40,
    FilteringResults: 50,
    PublishingResult: 60,
    Completed: 70,
    Stopped: 80,
    Deleted: 90
  })
class gu extends ht {
  static async getInstance(t) {
    const e = new gu()
    return e.setInstanceConfig(t), e
  }
  async getComputeAddress(t, e = -1) {
    let i,
      r = 'compute'
    ;-1 === e
      ? ((i = await this.ocean.assets.getServiceByType(t, r)), (e = i.index))
      : ((i = await this.ocean.assets.getServiceByIndex(t, e)), (r = i.type))
    const { serviceEndpoint: n } = i,
      s = await yt.getInstance(this.instanceConfig)
    return await s.setBaseUrl(n), s.computeAddress
  }
  async start(t, e, i, r, n, s, a, o, u, h) {
    s = this.checkOutput(r, s)
    const { did: d, ddo: l } = await ot(t, this.ocean),
      f = l.findServiceByType('compute'),
      { serviceEndpoint: c } = f
    if (n.serviceIndex) {
      const { ddo: t } = await ot(n.did, this.ocean),
        e = t.findServiceById(n.serviceIndex)
      if (
        !(await this.ocean.assets.isUserCustomParametersValid(
          e.attributes.algoCustomParameters,
          n.algoCustomParameters
        ))
      )
        return null
    }
    if (d && e) {
      const t = await yt.getInstance(this.instanceConfig)
      await t.setBaseUrl(c)
      const l = await t.computeStart(d, r, n, s, e, a, o, i, u, h)
      return l ? l[0] : null
    }
    return null
  }
  async stop(t, e, i) {
    const { did: r, ddo: n } = await ot(e, this.ocean),
      s = n.findServiceByType('compute'),
      { serviceEndpoint: a } = s,
      o = await yt.getInstance(this.instanceConfig)
    await o.setBaseUrl(a)
    const u = await o.computeStop(r, t, i)
    return u ? u[0] : null
  }
  async delete(t, e, i) {
    const { did: r, ddo: n } = await ot(e, this.ocean),
      s = n.findServiceByType('compute'),
      { serviceEndpoint: a } = s,
      o = await yt.getInstance(this.instanceConfig)
    await o.setBaseUrl(a)
    const u = await o.computeDelete(r, t, i)
    return u ? u[0] : null
  }
  async status(t, e, i, r, n, s) {
    let a
    if (e || r || i) {
      if (!r) {
        if (!i && !(i = await this.ocean.assets.resolve(e)))
          throw new Error(`Couldn't resolve the did ${e}`)
        if (!(r = i.findServiceByType('compute')))
          throw new Error(
            `Couldn't find a compute service on the asset with did ${e}`
          )
      }
      const { serviceEndpoint: t } = r
      ;(a = await yt.getInstance(this.instanceConfig)), await a.setBaseUrl(t)
    } else a = this.ocean.provider
    return await a.computeStatus(e, t, n, s)
  }
  async getResult(t, e, i, r, n, s, a) {
    let o
    if (n || a || s) {
      if (!a) {
        if (!s && !(s = await this.ocean.assets.resolve(n)))
          throw new Error(`Couldn't resolve the did ${n}`)
        if (!(a = s.findServiceByType('compute')))
          throw new Error(
            `Couldn't find a compute service on the asset with did ${n}`
          )
      }
      const { serviceEndpoint: t } = a
      ;(o = await yt.getInstance(this.instanceConfig)), await o.setBaseUrl(t)
    } else o = this.ocean.provider
    return await o.computeResult(e, i, r, t)
  }
  createServerAttributes(t, e, i, r, n, s, a, o) {
    return {
      serverId: t,
      serverType: e,
      cost: i,
      cpu: r,
      gpu: n,
      memory: s,
      disk: a,
      maxExecutionTime: o
    }
  }
  createContainerAttributes(t, e, i) {
    return { image: t, tag: e, checksum: i }
  }
  createClusterAttributes(t, e) {
    return { type: t, url: e }
  }
  createProviderAttributes(t, e, i, r, n) {
    return {
      type: t,
      description: e,
      environment: { cluster: i, supportedServers: n, supportedContainers: r }
    }
  }
  createComputeService(t, e, i, r, n, s, a, o) {
    s || (s = 3600)
    const u = {
      type: 'compute',
      index: 3,
      serviceEndpoint: a || this.ocean.provider.url,
      attributes: {
        main: {
          name: 'dataAssetComputingService',
          creator: t.getId(),
          datePublished: i,
          cost: e,
          timeout: s,
          provider: r,
          privacy: {}
        }
      }
    }
    return (
      n && (u.attributes.main.privacy = n),
      null != o &&
        o.userCustomParameters &&
        (u.attributes.userCustomParameters = o.userCustomParameters),
      null != o &&
        o.algoCustomParameters &&
        (u.attributes.algoCustomParameters = o.algoCustomParameters),
      u
    )
  }
  checkOutput(t, e) {
    return e && (e.publishAlgorithmLog || e.publishOutput)
      ? {
          publishAlgorithmLog: e.publishAlgorithmLog,
          publishOutput: e.publishOutput,
          providerAddress: e.providerAddress || this.config.providerAddress,
          providerUri: e.providerUri || this.config.providerUri,
          metadataUri: e.metadataUri || this.config.metadataCacheUri,
          nodeUri: e.nodeUri || this.config.nodeUri,
          owner: e.owner || t.getId()
        }
      : { publishAlgorithmLog: !1, publishOutput: !1 }
  }
  async isOrderable(t, e, i, r) {
    const n = await ot(t, this.ocean),
      s = n.ddo.findServiceById(e)
    if (!s) return !1
    if ('compute' === s.type) {
      if (i.meta)
        return (
          !(
            !s.attributes.main.privacy ||
            !s.attributes.main.privacy.allowRawAlgorithm
          ) ||
          (this.logger.error(
            'ERROR: This service does not allow raw algorithm'
          ),
          !1)
        )
      if (i.did) {
        if (i.serviceIndex) {
          if (!r && !(r = await this.ocean.assets.resolve(i.did)))
            throw new Error(`Couldn't resolve the did ${i.did}`)
          const t = r.findServiceById(i.serviceIndex)
          if (t && 'compute' === t.type) {
            const e = await yt.getInstance(this.instanceConfig)
            await e.setBaseUrl(t.serviceEndpoint)
            const i = await yt.getInstance(this.instanceConfig)
            if (
              (await i.setBaseUrl(s.serviceEndpoint),
              e.providerAddress !== i.providerAddress)
            )
              return (
                this.logger.error(
                  'ERROR: Both assets with compute service are not served by the same provider'
                ),
                !1
              )
          }
        }
        if (s.attributes.main.privacy) {
          if (s.attributes.main.privacy.allowAllPublishedAlgorithms) return !0
          if (!s.attributes.main.privacy.publisherTrustedAlgorithms) return !1
          let t
          for (t of s.attributes.main.privacy.publisherTrustedAlgorithms)
            if (t.did === i.did) {
              const e = await this.createPublisherTrustedAlgorithmfromDID(i.did)
              return t.containerSectionChecksum &&
                t.containerSectionChecksum !== e.containerSectionChecksum
                ? (this.logger.error(
                    'ERROR: Algorithm container section was altered since it was added as trusted by ' +
                      n.did
                  ),
                  !1)
                : !t.filesChecksum ||
                    t.filesChecksum === e.filesChecksum ||
                    (this.logger.error(
                      'ERROR: Algorithm files section was altered since it was added as trusted by ' +
                        n.ddo
                    ),
                    !1)
            }
          return (
            this.logger.error(
              'ERROR: Algorithm ' + i.did + ' is not allowed by ' + n.did
            ),
            !1
          )
        }
        console.error('Algo Index:' + i.serviceIndex)
      }
    }
    return !0
  }
  orderAsset(t, e, i, r, n, s, a, o = 'json', u = !0) {
    return new q(async (h) => {
      const { ddo: d } = await ot(e, this.ocean)
      if (!(await this.isOrderable(d, i, r)))
        throw new Error(
          'Dataset order failed, dataset is not orderable with the specified algorithm'
        )
      const l = d.findServiceById(i)
      if (!l)
        throw new Error(
          'Dataset order failed, Could not find service for the DDO'
        )
      try {
        return await this.ocean.assets.order(d, l.type, t, -1, n, s, a, o, u)
      } catch (t) {
        throw (
          (this.logger.error(`ERROR: Failed to order: ${t.message}`),
          new Error(`Failed to order dataset: ${t.message}`))
        )
      }
    })
  }
  async orderAlgorithm(t, e, i, r = -1, n, s, a, o = 'json', u = !0) {
    try {
      return await this.ocean.assets.order(t, e, i, r, n, s, a, o, u)
    } catch (t) {
      throw (
        (this.logger.error(`ERROR: Failed to orderAlgorithm: ${t.message}`),
        new Error(`Failed to order algorithm: ${t.message}`))
      )
    }
  }
  async editComputePrivacy(t, e, i) {
    if (!t) return null
    if (-1 === e) {
      const i = t.findServiceByType('compute')
      if (!i) return null
      e = i.index
    }
    return void 0 === t.service[e] || 'compute' !== t.service[e].type
      ? null
      : ((t.service[e].attributes.main.privacy.allowRawAlgorithm =
          i.allowRawAlgorithm),
        (t.service[e].attributes.main.privacy.allowAllPublishedAlgorithms =
          i.allowAllPublishedAlgorithms),
        (t.service[e].attributes.main.privacy.allowNetworkAccess =
          i.allowNetworkAccess),
        (t.service[e].attributes.main.privacy.publisherTrustedAlgorithms =
          i.publisherTrustedAlgorithms),
        t)
  }
  async toggleAllowAllPublishedAlgorithms(t, e, i) {
    if (!t) return null
    if (-1 === e) {
      const i = t.findServiceByType('compute')
      if (!i) return null
      e = i.index
    }
    return void 0 === t.service[e] || 'compute' !== t.service[e].type
      ? null
      : ((t.service[e].attributes.main.privacy.allowAllPublishedAlgorithms = i),
        t)
  }
  async createPublisherTrustedAlgorithmfromDID(t, e) {
    if (!e && !(e = await this.ocean.assets.resolve(t))) return null
    const i = e.findServiceByType('metadata')
    return i &&
      i.attributes.main.algorithm &&
      i.attributes.encryptedFiles &&
      i.attributes.main.files
      ? {
          did: t,
          containerSectionChecksum: M(
            JSON.stringify(i.attributes.main.algorithm.container)
          ).toString(),
          filesChecksum: M(
            i.attributes.encryptedFiles +
              JSON.stringify(i.attributes.main.files)
          ).toString()
        }
      : null
  }
  async addTrustedAlgorithmtoAsset(t, e, i) {
    if (!t) return null
    if (-1 === e) {
      const i = t.findServiceByType('compute')
      if (!i) return null
      e = i.index
    }
    if (void 0 === t.service[e]) return null
    if ('compute' !== t.service[e].type) return null
    t.service[e].attributes.main.privacy.publisherTrustedAlgorithms ||
      (t.service[e].attributes.main.privacy.publisherTrustedAlgorithms = [])
    const r = await this.createPublisherTrustedAlgorithmfromDID(i)
    return (
      r &&
        t.service[e].attributes.main.privacy.publisherTrustedAlgorithms.push(r),
      t
    )
  }
  async isAlgorithmTrusted(t, e, i) {
    if (!t) return !1
    if (-1 === e) {
      const i = t.findServiceByType('compute')
      if (!i) return !1
      e = i.index
    }
    if (void 0 === t.service[e]) return !1
    if ('compute' !== t.service[e].type) return !1
    if (t.service[e].attributes.main.privacy.allowAllPublishedAlgorithms)
      return !0
    let r
    for (r of t.service[e].attributes.main.privacy.publisherTrustedAlgorithms)
      if (r.did === i) return !0
    return !1
  }
  async removeTrustedAlgorithmFromAsset(t, e, i) {
    if (!t) return null
    if (-1 === e) {
      const i = t.findServiceByType('compute')
      if (!i) return t
      e = i.index
    }
    return void 0 === t.service[e] || 'compute' !== t.service[e].type
      ? t
      : t.service[e].attributes.main.privacy.publisherTrustedAlgorithms
      ? ((t.service[e].attributes.main.privacy.publisherTrustedAlgorithms =
          t.service[
            e
          ].attributes.main.privacy.publisherTrustedAlgorithms.filter(function (
            t
          ) {
            return t.did !== i
          })),
        t)
      : t
  }
}
const yu =
  '115792089237316195423570985008687907853269984665640564039457584007913129639934'
var bu, wu, vu, Mu
!(function (t) {
  ;(t[(t.CreatingPool = 0)] = 'CreatingPool'),
    (t[(t.ApprovingDatatoken = 1)] = 'ApprovingDatatoken'),
    (t[(t.ApprovingOcean = 2)] = 'ApprovingOcean'),
    (t[(t.SetupPool = 3)] = 'SetupPool')
})(bu || (bu = {}))
class Au extends class extends class {
  constructor(t, e, i = null, r = null, n) {
    ;(this.GASLIMIT_DEFAULT = 1e6),
      (this.web3 = null),
      (this.factoryABI = void 0),
      (this.factoryAddress = void 0),
      (this.logger = void 0),
      (this.config = void 0),
      (this.web3 = t),
      (this.factoryABI = i || _.abi),
      r && (this.factoryAddress = r),
      (this.logger = e),
      (this.config = n)
  }
  async createPool(t) {
    if (null === this.web3)
      return this.logger.error('ERROR: Web3 object is null'), null
    if (null === this.factoryAddress)
      return this.logger.error('ERROR: bfactoryAddress is null'), null
    const e = st(
      new this.web3.eth.Contract(this.factoryABI, this.factoryAddress, {
        from: t
      }),
      this.config
    )
    let i = null
    const r = this.GASLIMIT_DEFAULT
    let n
    try {
      n = await e.methods
        .newBPool()
        .estimateGas({ from: t }, (t, e) => (t ? r : e))
    } catch (t) {
      this.logger.log('Error estimate gas newBPool'),
        this.logger.log(t),
        (n = r)
    }
    try {
      i = await e.methods
        .newBPool()
        .send({
          from: t,
          gas: n + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(`ERROR: Failed to create new pool: ${t.message}`)
    }
    return i
  }
} {
  constructor(t, e, i = null, r = null, n = null, s) {
    super(t, e, i, n, s), (this.poolABI = void 0), (this.poolABI = r || A.abi)
  }
  async createPool(t) {
    return await super.createPool(t)
  }
  async setup(t, e, i, r, n, s, a, o, u) {
    const h = st(
      new this.web3.eth.Contract(this.poolABI, e, { from: t }),
      this.config
    )
    let d = null
    const l = this.GASLIMIT_DEFAULT
    let f
    try {
      f = await h.methods
        .setup(i, r, n, s, a, o, u)
        .estimateGas({ from: t }, (t, e) => (t ? l : e))
    } catch (t) {
      f = l
    }
    try {
      d = await h.methods
        .setup(i, r, n, s, a, o, u)
        .send({ from: t, gas: f, gasPrice: await nt(this.web3, this.config) })
    } catch (t) {
      this.logger.error(`ERROR: Failed to setup a pool: ${t.message}`)
    }
    return d
  }
  async allowance(t, e, i) {
    const r = st(
        new this.web3.eth.Contract(w.abi, t, { from: i }),
        this.config
      ),
      n = await r.methods.allowance(e, i).call()
    return this.web3.utils.fromWei(n)
  }
  async approve(e, i, r, n, s = !1) {
    const a = st(
      new this.web3.eth.Contract(
        [
          {
            constant: !1,
            inputs: [
              { name: '_spender', type: 'address' },
              { name: '_value', type: 'uint256' }
            ],
            name: 'approve',
            outputs: [{ name: '', type: 'bool' }],
            payable: !1,
            stateMutability: 'nonpayable',
            type: 'function'
          }
        ],
        i,
        { from: e }
      ),
      this.config
    )
    if (!s) {
      const s = await this.allowance(i, e, r)
      if (new t(this.web3.utils.toWei(s)).greaterThanOrEqualTo(n)) return s
    }
    let o = null
    const u = this.GASLIMIT_DEFAULT
    let h
    try {
      h = await a.methods
        .approve(r, n)
        .estimateGas({ from: e }, (t, e) => (t ? u : e))
    } catch (t) {
      h = u
    }
    try {
      o = await a.methods
        .approve(r, n)
        .send({
          from: e,
          gas: h + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(
        `ERRPR: Failed to approve spender to spend tokens : ${t.message}`
      )
    }
    return o
  }
  async sharesBalance(t, e) {
    let i = null
    try {
      const r = st(new this.web3.eth.Contract(this.poolABI, e), this.config),
        n = await r.methods.balanceOf(t).call()
      i = this.web3.utils.fromWei(n)
    } catch (t) {
      this.logger.error(`ERROR: Failed to get shares of pool : ${t.message}`)
    }
    return i
  }
  async addToPool(t, e, i) {
    const r = st(
      new this.web3.eth.Contract(this.poolABI, e, { from: t }),
      this.config
    )
    let n
    for (n of i)
      try {
        await this.approve(
          t,
          n.address,
          e,
          this.web3.utils.toWei(`${n.amount}`)
        ),
          await r.methods
            .bind(
              n.address,
              this.web3.utils.toWei(n.amount),
              this.web3.utils.toWei(n.weight)
            )
            .send({
              from: t,
              gas: this.GASLIMIT_DEFAULT,
              gasPrice: await nt(this.web3, this.config)
            })
      } catch (t) {
        this.logger.error(`ERROR: Failed to add tokens to pool: ${t.message}`)
      }
  }
  async setSwapFee(t, e, i) {
    const r = st(
      new this.web3.eth.Contract(this.poolABI, e, { from: t }),
      this.config
    )
    let n = null
    try {
      n = await r.methods
        .setSwapFee(this.web3.utils.toWei(i))
        .send({
          from: t,
          gas: this.GASLIMIT_DEFAULT,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(`ERROR: Failed to set pool swap fee: ${t.message}`)
    }
    return n
  }
  async finalize(t, e) {
    const i = st(
      new this.web3.eth.Contract(this.poolABI, e, { from: t }),
      this.config
    )
    let r = null
    try {
      r = await i.methods
        .finalize()
        .send({
          from: t,
          gas: this.GASLIMIT_DEFAULT,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(`ERROR: Failed to finalize pool: ${t.message}`)
    }
    return r
  }
  async getNumTokens(t) {
    const e = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let i = null
    try {
      i = await e.methods.getNumTokens().call()
    } catch (t) {
      this.logger.error(`ERROR: Failed to get number of tokens: ${t.message}`)
    }
    return i
  }
  async getPoolSharesTotalSupply(t) {
    const e = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let i = null
    try {
      const t = await e.methods.totalSupply().call()
      i = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to get total supply of pool shares: ${t.message}`
      )
    }
    return i
  }
  async getCurrentTokens(t) {
    const e = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let i = null
    try {
      i = await e.methods.getCurrentTokens().call()
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to get tokens composing this pool: ${t.message}`
      )
    }
    return i
  }
  async getFinalTokens(t) {
    const e = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let i = null
    try {
      i = await e.methods.getFinalTokens().call()
    } catch (t) {
      this.logger.error(
        'ERROR: Failed to get the final tokens composing this pool'
      )
    }
    return i
  }
  async getController(t) {
    const e = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let i = null
    try {
      i = await e.methods.getController().call()
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to get pool controller address: ${t.message}`
      )
    }
    return i
  }
  async setController(t, e, i) {
    const r = st(
      new this.web3.eth.Contract(this.poolABI, e, { from: t }),
      this.config
    )
    let n = null
    try {
      n = await r.methods
        .setController(i)
        .send({ from: t, gas: this.GASLIMIT_DEFAULT })
    } catch (t) {
      this.logger.error(`ERROR: Failed to set pool controller: ${t.message}`)
    }
    return n
  }
  async isBound(t, e) {
    const i = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let r = null
    try {
      r = await i.methods.isBound(e).call()
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to check whether a token       bounded to a pool. ${t.message}`
      )
    }
    return r
  }
  async getReserve(t, e) {
    let i = null
    try {
      const r = st(new this.web3.eth.Contract(this.poolABI, t), this.config),
        n = await r.methods.getBalance(e).call()
      i = this.web3.utils.fromWei(n)
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to get how many tokens       are in the pool: ${t.message}`
      )
    }
    return i
  }
  async isFinalized(t) {
    const e = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let i = null
    try {
      i = await e.methods.isFinalized().call()
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to check whether pool is finalized: ${t.message}`
      )
    }
    return i
  }
  async getSwapFee(t) {
    const e = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let i = null
    try {
      const t = await e.methods.getSwapFee().call()
      i = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error(`ERROR: Failed to get pool fee: ${t.message}`)
    }
    return i
  }
  async getNormalizedWeight(t, e) {
    const i = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let r = null
    try {
      const t = await i.methods.getNormalizedWeight(e).call()
      r = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to get normalized weight of a token: ${t.message}`
      )
    }
    return r
  }
  async getDenormalizedWeight(t, e) {
    const i = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let r = null
    try {
      const t = await i.methods.getDenormalizedWeight(e).call()
      r = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error(
        'ERROR: Failed to get denormalized weight of a token in pool'
      )
    }
    return r
  }
  async getTotalDenormalizedWeight(t) {
    const e = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let i = null
    try {
      const t = await e.methods.getTotalDenormalizedWeight().call()
      i = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error(
        'ERROR: Failed to get total denormalized weight in pool'
      )
    }
    return i
  }
  async swapExactAmountIn(t, e, i, r, n, s, a) {
    const o = st(
      new this.web3.eth.Contract(this.poolABI, e, { from: t }),
      this.config
    )
    let u = null
    const h = this.GASLIMIT_DEFAULT
    let d
    try {
      d = await o.methods
        .swapExactAmountIn(
          i,
          this.web3.utils.toWei(r),
          n,
          this.web3.utils.toWei(s),
          a ? this.web3.utils.toWei(a) : yu
        )
        .estimateGas({ from: t }, (t, e) => (t ? h : e))
    } catch (t) {
      this.logger.log('Error estimate gas swapExactAmountIn'),
        this.logger.log(t),
        (d = h)
    }
    try {
      u = await o.methods
        .swapExactAmountIn(
          i,
          this.web3.utils.toWei(r),
          n,
          this.web3.utils.toWei(s),
          a ? this.web3.utils.toWei(a) : yu
        )
        .send({
          from: t,
          gas: d + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(`ERROR: Failed to swap exact amount in : ${t.message}`)
    }
    return u
  }
  async swapExactAmountOut(t, e, i, r, n, s, a) {
    const o = st(
      new this.web3.eth.Contract(this.poolABI, e, { from: t }),
      this.config
    )
    let u = null
    const h = this.GASLIMIT_DEFAULT
    let d
    try {
      d = await o.methods
        .swapExactAmountOut(
          i,
          this.web3.utils.toWei(r),
          n,
          this.web3.utils.toWei(s),
          a ? this.web3.utils.toWei(a) : yu
        )
        .estimateGas({ from: t }, (t, e) => (t ? h : e))
    } catch (t) {
      ;(d = h),
        this.logger.log('Error estimate gas swapExactAmountIn'),
        this.logger.log(t)
    }
    try {
      u = await o.methods
        .swapExactAmountOut(
          i,
          this.web3.utils.toWei(r),
          n,
          this.web3.utils.toWei(s),
          a ? this.web3.utils.toWei(a) : yu
        )
        .send({
          from: t,
          gas: d + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(`ERROR: Failed to swap exact amount out: ${t.message}`)
    }
    return u
  }
  async joinPool(t, e, i, r) {
    const n = st(
        new this.web3.eth.Contract(this.poolABI, e, { from: t }),
        this.config
      ),
      s = []
    let a
    for (a of r) s.push(this.web3.utils.toWei(a))
    let o = null
    const u = this.GASLIMIT_DEFAULT
    let h
    try {
      h = await n.methods
        .joinPool(this.web3.utils.toWei(i), s)
        .estimateGas({ from: t }, (t, e) => (t ? u : e))
    } catch (t) {
      h = u
    }
    try {
      o = await n.methods
        .joinPool(this.web3.utils.toWei(i), s)
        .send({
          from: t,
          gas: h + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(`ERROR: Failed to join pool: ${t.message}`)
    }
    return o
  }
  async exitPool(t, e, i, r) {
    const n = st(
        new this.web3.eth.Contract(this.poolABI, e, { from: t }),
        this.config
      ),
      s = []
    let a
    for (a of r) s.push(this.web3.utils.toWei(a))
    let o = null
    const u = this.GASLIMIT_DEFAULT
    let h
    try {
      h = await n.methods
        .exitPool(this.web3.utils.toWei(i), s)
        .estimateGas({ from: t }, (t, e) => (t ? u : e))
    } catch (t) {
      h = u
    }
    try {
      o = await n.methods
        .exitPool(this.web3.utils.toWei(i), s)
        .send({ from: t, gas: h, gasPrice: await nt(this.web3, this.config) })
    } catch (t) {
      this.logger.error(`ERROR: Failed to exit pool: ${t.message}`)
    }
    return o
  }
  async joinswapExternAmountIn(t, e, i, r, n) {
    const s = st(
      new this.web3.eth.Contract(this.poolABI, e, { from: t }),
      this.config
    )
    let a = null
    const o = this.GASLIMIT_DEFAULT
    let u
    try {
      u = await s.methods
        .joinswapExternAmountIn(
          i,
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n)
        )
        .estimateGas({ from: t }, (t, e) => (t ? o : e))
    } catch (t) {
      u = o
    }
    try {
      a = await s.methods
        .joinswapExternAmountIn(
          i,
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n)
        )
        .send({
          from: t,
          gas: u + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to pay tokens in order to       join the pool: ${t.message}`
      )
    }
    return a
  }
  async joinswapPoolAmountOut(t, e, i, r, n) {
    const s = st(
      new this.web3.eth.Contract(this.poolABI, e, { from: t }),
      this.config
    )
    let a = null
    const o = this.GASLIMIT_DEFAULT
    let u
    try {
      u = await s.methods
        .joinswapPoolAmountOut(
          i,
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n)
        )
        .estimateGas({ from: t }, (t, e) => (t ? o : e))
    } catch (t) {
      u = o
    }
    try {
      a = await s.methods
        .joinswapPoolAmountOut(
          i,
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n)
        )
        .send({
          from: t,
          gas: u + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error('ERROR: Failed to join swap pool amount out')
    }
    return a
  }
  async exitswapPoolAmountIn(t, e, i, r, n) {
    const s = st(
      new this.web3.eth.Contract(this.poolABI, e, { from: t }),
      this.config
    )
    let a = null
    const o = this.GASLIMIT_DEFAULT
    let u
    try {
      u = await s.methods
        .exitswapPoolAmountIn(
          i,
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n)
        )
        .estimateGas({ from: t }, (t, e) => (t ? o : e))
    } catch (t) {
      u = o
    }
    try {
      a = await s.methods
        .exitswapPoolAmountIn(
          i,
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n)
        )
        .send({
          from: t,
          gas: u + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to pay pool shares into the pool: ${t.message}`
      )
    }
    return a
  }
  async exitswapExternAmountOut(t, e, i, r, n) {
    const s = this.GASLIMIT_DEFAULT,
      a = st(
        new this.web3.eth.Contract(this.poolABI, e, { from: t }),
        this.config
      )
    let o,
      u = null
    try {
      o = await a.methods
        .exitswapExternAmountOut(
          i,
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n)
        )
        .estimateGas({ from: t }, (t, e) => (t ? s : e))
    } catch (t) {
      o = s
    }
    try {
      u = await a.methods
        .exitswapExternAmountOut(
          i,
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n)
        )
        .send({
          from: t,
          gas: o + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error('ERROR: Failed to exitswapExternAmountOut')
    }
    return u
  }
  async getSpotPrice(t, e, i) {
    const r = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let n = null
    try {
      const t = await r.methods.getSpotPrice(e, i).call()
      n = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error(
        'ERROR: Failed to get spot price of swapping tokenIn to tokenOut'
      )
    }
    return n
  }
  async getSpotPriceSansFee(t, e, i) {
    const r = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let n = null
    try {
      const t = await r.methods.getSpotPriceSansFee(e, i).call()
      n = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error('ERROR: Failed to getSpotPriceSansFee')
    }
    return n
  }
  async calcSpotPrice(t, e, i, r, n, s) {
    const a = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let o = '0'
    try {
      const t = await a.methods
        .calcSpotPrice(
          this.web3.utils.toWei(e),
          this.web3.utils.toWei(i),
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n),
          this.web3.utils.toWei(s)
        )
        .call()
      o = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error('ERROR: Failed to call calcSpotPrice')
    }
    return o
  }
  async calcInGivenOut(e, i, r, n, s, a, o) {
    const u = st(new this.web3.eth.Contract(this.poolABI, e), this.config)
    let h = null
    if (new t(a).gte(n)) return null
    try {
      const t = await u.methods
        .calcInGivenOut(
          this.web3.utils.toWei(i),
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n),
          this.web3.utils.toWei(s),
          this.web3.utils.toWei(a),
          this.web3.utils.toWei(o)
        )
        .call()
      h = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error('ERROR: Failed to calcInGivenOut')
    }
    return h
  }
  async calcOutGivenIn(t, e, i, r, n, s, a) {
    const o = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let u = null
    try {
      const t = await o.methods
        .calcOutGivenIn(
          this.web3.utils.toWei(e),
          this.web3.utils.toWei(i),
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n),
          this.web3.utils.toWei(s),
          this.web3.utils.toWei(a)
        )
        .call()
      u = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error('ERROR: Failed to calcOutGivenIn')
    }
    return u
  }
  async calcPoolOutGivenSingleIn(t, e, i, r, n, s, a) {
    const o = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let u = null
    try {
      const t = await o.methods
        .calcPoolOutGivenSingleIn(
          this.web3.utils.toWei(e),
          this.web3.utils.toWei(i),
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n),
          this.web3.utils.toWei(s),
          this.web3.utils.toWei(a)
        )
        .call()
      u = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to calculate PoolOutGivenSingleIn : ${t.message}`
      )
    }
    return u
  }
  async calcSingleInGivenPoolOut(t, e, i, r, n, s, a) {
    const o = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let u = null
    try {
      const t = await o.methods
        .calcSingleInGivenPoolOut(
          this.web3.utils.toWei(e),
          this.web3.utils.toWei(i),
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n),
          this.web3.utils.toWei(s),
          this.web3.utils.toWei(a)
        )
        .call()
      u = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to calculate SingleInGivenPoolOut : ${t.message}`
      )
    }
    return u
  }
  async calcSingleOutGivenPoolIn(t, e, i, r, n, s, a) {
    const o = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let u = null
    try {
      const t = await o.methods
        .calcSingleOutGivenPoolIn(
          this.web3.utils.toWei(e),
          this.web3.utils.toWei(i),
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n),
          this.web3.utils.toWei(s),
          this.web3.utils.toWei(a)
        )
        .call()
      u = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to calculate SingleOutGivenPoolIn : ${t.message}`
      )
    }
    return u
  }
  async calcPoolInGivenSingleOut(t, e, i, r, n, s, a) {
    const o = st(new this.web3.eth.Contract(this.poolABI, t), this.config)
    let u = null
    try {
      const t = await o.methods
        .calcPoolInGivenSingleOut(
          this.web3.utils.toWei(e),
          this.web3.utils.toWei(i),
          this.web3.utils.toWei(r),
          this.web3.utils.toWei(n),
          this.web3.utils.toWei(s),
          this.web3.utils.toWei(a)
        )
        .call()
      u = this.web3.utils.fromWei(t)
    } catch (t) {
      this.logger.error(
        `ERROR: Failed to calculate PoolInGivenSingleOut : ${t.message}`
      )
    }
    return u
  }
  getSwapEventSignature() {
    const t = this.poolABI.find(function (t) {
      if ('LOG_SWAP' === t.name && 'event' === t.type) return t
    })
    return this.web3.eth.abi.encodeEventSignature(t)
  }
  getJoinEventSignature() {
    const t = this.poolABI.find(function (t) {
      if ('LOG_JOIN' === t.name && 'event' === t.type) return t
    })
    return this.web3.eth.abi.encodeEventSignature(t)
  }
  getExitEventSignature() {
    const t = this.poolABI.find(function (t) {
      if ('LOG_EXIT' === t.name && 'event' === t.type) return t
    })
    return this.web3.eth.abi.encodeEventSignature(t)
  }
} {
  constructor(t, e, i = null, r = null, n = null, s = null, a) {
    super(t, e, i, r, n, a),
      (this.oceanAddress = null),
      (this.dtAddress = null),
      (this.startBlock = void 0),
      s && (this.oceanAddress = s),
      (this.startBlock = (a && a.startBlock) || 0)
  }
  create(t, e, i, r, n, s) {
    if (null == this.oceanAddress)
      throw (
        (this.logger.error('ERROR: oceanAddress is not defined'),
        new Error('ERROR: oceanAddress is not defined'))
      )
    if (parseFloat(s) > 0.1)
      throw (
        (this.logger.error(
          'ERROR: Swap fee too high. The maximum allowed swapFee is 10%'
        ),
        new Error(
          'ERROR: Swap fee too high. The maximum allowed swapFee is 10%'
        ))
      )
    if (parseFloat(i) < 2)
      throw (
        (this.logger.error('ERROR: Amount of DT is too low'),
        new Error('ERROR: Amount of DT is too low'))
      )
    if (parseFloat(r) > 9 || parseFloat(r) < 1)
      throw (
        (this.logger.error('ERROR: Weight out of bounds (min 1, max9)'),
        new Error('ERROR: Weight out of bounds (min 1, max9)'))
      )
    return new q(async (a) => {
      a.next(bu.CreatingPool)
      const o = await super.createPool(t)
      if (!o)
        throw (
          (this.logger.error('ERROR: Failed to call create pool'),
          new Error('ERROR: Failed to call create pool'))
        )
      const u = o.events.BPoolRegistered.returnValues[0],
        h = 10 - parseFloat(r)
      let d
      if (
        ((this.dtAddress = e),
        a.next(bu.ApprovingDatatoken),
        (d = await this.approve(t, e, u, this.web3.utils.toWei(String(i)))),
        !d)
      )
        throw (
          (this.logger.error('ERROR: Failed to call approve DT token'),
          new Error('ERROR: Failed to call approve DT token'))
        )
      if (
        (a.next(bu.ApprovingOcean),
        (d = await this.approve(
          t,
          this.oceanAddress,
          u,
          this.web3.utils.toWei(String(n))
        )),
        !d)
      )
        throw (
          (this.logger.error('ERROR: Failed to call approve OCEAN token'),
          new Error('ERROR: Failed to call approve OCEAN token'))
        )
      if (
        (a.next(bu.SetupPool),
        (d = await super.setup(
          t,
          u,
          e,
          this.web3.utils.toWei(String(i)),
          this.web3.utils.toWei(String(r)),
          this.oceanAddress,
          this.web3.utils.toWei(String(n)),
          this.web3.utils.toWei(String(h)),
          this.web3.utils.toWei(s)
        )),
        !d)
      )
        throw (
          (this.logger.error('ERROR: Failed to create a new pool'),
          new Error('ERROR: Failed to create a new pool'))
        )
      return o
    })
  }
  async getDTAddress(t) {
    this.dtAddress = null
    const e = await this.getCurrentTokens(t)
    let i
    if (null != e)
      for (i of e)
        i.toLowerCase() !== this.oceanAddress.toLowerCase() &&
          (this.dtAddress = i)
    return this.dtAddress
  }
  async getOceanReserve(t) {
    return null == this.oceanAddress
      ? (this.logger.error('ERROR: oceanAddress is not defined'), null)
      : super.getReserve(t, this.oceanAddress)
  }
  async getDTReserve(t) {
    const e = await this.getDTAddress(t)
    return super.getReserve(t, e)
  }
  async getMaxBuyQuantity(e, i) {
    const r = await super.getReserve(e, i)
    return new t(r).div(3).toString()
  }
  async getOceanMaxBuyQuantity(t) {
    return this.getMaxBuyQuantity(t, this.oceanAddress)
  }
  async getDTMaxBuyQuantity(t) {
    return this.getMaxBuyQuantity(t, await this.getDTAddress(t))
  }
  async calcInGivenOut(t, e, i, r) {
    return await super.calcInGivenOut(
      t,
      await super.getReserve(t, e),
      await super.getDenormalizedWeight(t, e),
      await super.getReserve(t, i),
      await super.getDenormalizedWeight(t, i),
      r,
      await this.getSwapFee(t)
    )
  }
  async calcOutGivenIn(t, e, i, r) {
    return await super.calcOutGivenIn(
      t,
      await super.getReserve(t, e),
      await super.getDenormalizedWeight(t, e),
      await super.getReserve(t, i),
      await super.getDenormalizedWeight(t, i),
      r,
      await super.getSwapFee(t)
    )
  }
  async calcPoolOutGivenSingleIn(t, e, i) {
    return super.calcPoolOutGivenSingleIn(
      t,
      await super.getReserve(t, e),
      await super.getDenormalizedWeight(t, e),
      await super.getPoolSharesTotalSupply(t),
      await super.getTotalDenormalizedWeight(t),
      i,
      await super.getSwapFee(t)
    )
  }
  async calcSingleInGivenPoolOut(t, e, i) {
    return super.calcSingleInGivenPoolOut(
      t,
      await super.getReserve(t, e),
      await super.getDenormalizedWeight(t, e),
      await super.getPoolSharesTotalSupply(t),
      await super.getTotalDenormalizedWeight(t),
      i,
      await super.getSwapFee(t)
    )
  }
  async calcSingleOutGivenPoolIn(t, e, i) {
    return super.calcSingleOutGivenPoolIn(
      t,
      await super.getReserve(t, e),
      await super.getDenormalizedWeight(t, e),
      await super.getPoolSharesTotalSupply(t),
      await super.getTotalDenormalizedWeight(t),
      i,
      await super.getSwapFee(t)
    )
  }
  async calcPoolInGivenSingleOut(t, e, i) {
    return super.calcPoolInGivenSingleOut(
      t,
      await super.getReserve(t, e),
      await super.getDenormalizedWeight(t, e),
      await super.getPoolSharesTotalSupply(t),
      await super.getTotalDenormalizedWeight(t),
      i,
      await super.getSwapFee(t)
    )
  }
  async getPoolSharesRequiredToRemoveDT(t, e) {
    const i = await this.getDTAddress(t)
    return this.calcPoolInGivenSingleOut(t, i, e)
  }
  async getDTRemovedforPoolShares(t, e) {
    const i = await this.getDTAddress(t)
    return this.calcSingleOutGivenPoolIn(t, i, e)
  }
  async getPoolSharesRequiredToRemoveOcean(t, e) {
    return this.calcPoolInGivenSingleOut(t, this.oceanAddress, e)
  }
  async getOceanRemovedforPoolShares(t, e) {
    return this.calcSingleOutGivenPoolIn(t, this.oceanAddress, e)
  }
  async getTokensRemovedforPoolShares(e, i) {
    try {
      const r = await this.getPoolSharesTotalSupply(e),
        n = await this.getDTReserve(e),
        s = await this.getOceanReserve(e)
      return {
        dtAmount: new t(i).div(r).mul(n).toString(),
        oceanAmount: new t(i).div(r).mul(s).toString()
      }
    } catch (t) {
      this.logger.error(`ERROR: Unable to get token info. ${t.message}`)
    }
  }
  async getDTMaxAddLiquidity(t) {
    const e = await this.getDTAddress(t)
    return this.getMaxAddLiquidity(t, e)
  }
  async getOceanMaxAddLiquidity(t) {
    return this.getMaxAddLiquidity(t, this.oceanAddress)
  }
  async getMaxAddLiquidity(e, i) {
    const r = await super.getReserve(e, i)
    return parseFloat(r) > 0 ? new t(r).mul(0.25).toString() : '0'
  }
  async getMaxRemoveLiquidity(e, i) {
    const r = await super.getReserve(e, i)
    return parseFloat(r) > 0 ? new t(r).mul(0.25).toString() : '0'
  }
  async getDTMaxRemoveLiquidity(t) {
    const e = await this.getDTAddress(t)
    return this.getMaxRemoveLiquidity(t, e)
  }
  async getOceanMaxRemoveLiquidity(t) {
    return this.getMaxRemoveLiquidity(t, this.oceanAddress)
  }
  async buyDT(e, i, r, n, s) {
    if (null == this.oceanAddress)
      return (
        this.logger.error('ERROR: undefined ocean token contract address'), null
      )
    const a = await this.getDTAddress(i)
    if (new t(r).greaterThan(await this.getDTMaxBuyQuantity(i)))
      return (
        this.logger.error('ERROR: Buy quantity exceeds quantity allowed'), null
      )
    const o = await this.getOceanNeeded(i, r)
    if (new t(o).greaterThan(n))
      return this.logger.error('ERROR: Not enough Ocean Tokens'), null
    if (
      !(await super.approve(e, this.oceanAddress, i, this.web3.utils.toWei(n)))
    )
      throw (
        (this.logger.error('ERROR: Failed to call approve OCEAN token'),
        new Error('ERROR: Failed to call approve OCEAN token'))
      )
    return await super.swapExactAmountOut(e, i, this.oceanAddress, n, a, r, s)
  }
  async buyDTWithExactOcean(e, i, r, n, s) {
    if (null == this.oceanAddress)
      return (
        this.logger.error('ERROR: undefined ocean token contract address'), null
      )
    const a = await this.getDTAddress(i)
    if (new t(r).greaterThan(await this.getDTMaxBuyQuantity(i)))
      return (
        this.logger.error('ERROR: Buy quantity exceeds quantity allowed'), null
      )
    const o = await this.getOceanNeeded(i, r)
    if (new t(o).greaterThan(n))
      return this.logger.error('ERROR: Not enough Ocean Tokens'), null
    if (
      !(await super.approve(e, this.oceanAddress, i, this.web3.utils.toWei(n)))
    )
      throw (
        (this.logger.error('ERROR: Failed to call approve OCEAN token'),
        new Error('ERROR: Failed to call approve OCEAN token'))
      )
    return await super.swapExactAmountIn(e, i, this.oceanAddress, n, a, r, s)
  }
  async sellDT(e, i, r, n, s) {
    if (null == this.oceanAddress)
      return this.logger.error('ERROR: oceanAddress is not defined'), null
    const a = await this.getDTAddress(i)
    if (new t(n).greaterThan(await this.getOceanMaxBuyQuantity(i)))
      return (
        this.logger.error('ERROR: Buy quantity exceeds quantity allowed'), null
      )
    const o = await this.getOceanReceived(i, r)
    if (new t(o).lessThan(n))
      return this.logger.error('ERROR: Not enough datatokens'), null
    if (!(await super.approve(e, a, i, this.web3.utils.toWei(r))))
      throw (
        (this.logger.error('ERROR: Failed to call approve DT token'),
        new Error('ERROR: Failed to call approve DT token'))
      )
    return await super.swapExactAmountIn(e, i, a, r, this.oceanAddress, n, s)
  }
  async addDTLiquidity(e, i, r) {
    const n = await this.getDTAddress(i),
      s = await this.getMaxAddLiquidity(i, n)
    if (new t(r).greaterThan(s))
      return this.logger.error('ERROR: Too much reserve to add'), null
    if (!(await super.approve(e, n, i, this.web3.utils.toWei(r))))
      throw (
        (this.logger.error('ERROR: Failed to call approve DT token'),
        new Error('ERROR: Failed to call approve DT token'))
      )
    return await super.joinswapExternAmountIn(e, i, n, r, '0')
  }
  async removeDTLiquidity(e, i, r, n) {
    const s = await this.getDTAddress(i),
      a = await this.getDTMaxRemoveLiquidity(i)
    if (new t(r).greaterThan(a))
      return this.logger.error('ERROR: Too much reserve to remove'), null
    const o = await this.sharesBalance(e, i)
    if (new t(o).lessThan(n))
      return this.logger.error('ERROR: Not enough poolShares'), null
    const u = await this.getPoolSharesRequiredToRemoveDT(i, r)
    return new t(n).lessThan(u)
      ? (this.logger.error('ERROR: Not enough poolShares'), null)
      : (new t(n).lessThan(u) && (n = new t(n).mul(0.9999).toString()),
        this.exitswapExternAmountOut(e, i, s, r, n))
  }
  async addOceanLiquidity(e, i, r) {
    if (null == this.oceanAddress)
      return this.logger.error('ERROR: oceanAddress is not defined'), null
    const n = await this.getOceanMaxAddLiquidity(i)
    if (new t(r).greaterThan(n))
      return this.logger.error('ERROR: Too much reserve to add'), null
    if (
      !(await super.approve(e, this.oceanAddress, i, this.web3.utils.toWei(r)))
    )
      throw (
        (this.logger.error('ERROR: Failed to call approve OCEAN token'),
        new Error('ERROR: Failed to call approve OCEAN token'))
      )
    return await super.joinswapExternAmountIn(e, i, this.oceanAddress, r, '0')
  }
  async removeOceanLiquidityWithMinimum(e, i, r, n) {
    if (null == this.oceanAddress)
      return this.logger.error('ERROR: oceanAddress is not defined'), null
    const s = await this.sharesBalance(e, i)
    return new t(s).lessThan(r)
      ? (this.logger.error('ERROR: Not enough poolShares'), null)
      : super.exitswapPoolAmountIn(e, i, this.oceanAddress, r, n)
  }
  async removeOceanLiquidity(e, i, r, n) {
    if (null == this.oceanAddress)
      return this.logger.error('ERROR: oceanAddress is not defined'), null
    const s = await this.getOceanMaxRemoveLiquidity(i)
    if (new t(r).greaterThan(s))
      return this.logger.error('ERROR: Too much reserve to remove'), null
    const a = await this.sharesBalance(e, i)
    if (new t(a).lessThan(n))
      return this.logger.error('ERROR: Not enough poolShares'), null
    const o = await this.getPoolSharesRequiredToRemoveOcean(i, r)
    return new t(n).lessThan(o)
      ? (this.logger.error('ERROR: Not enough poolShares'), null)
      : (new t(n).lessThan(o) && (n = new t(n).mul(0.9999).toString()),
        super.exitswapExternAmountOut(e, i, this.oceanAddress, r, n))
  }
  async removePoolLiquidity(e, i, r, n = '0', s = '0') {
    const a = await this.sharesBalance(e, i)
    return new t(a).lessThan(r)
      ? (this.logger.error('ERROR: Not enough poolShares'), null)
      : (new t(a).equals(r) && (r = new t(r).mul(0.9999).toString()),
        this.exitPool(e, i, r, [n, s]))
  }
  async getDTPrice(t) {
    return null == this.oceanAddress
      ? (this.logger.error('ERROR: oceanAddress is not defined'), '0')
      : this.getOceanNeeded(t, '1')
  }
  async searchPoolforDT(t) {
    const e = [],
      i = st(
        new this.web3.eth.Contract(this.factoryABI, this.factoryAddress),
        this.config
      ),
      r = await i.getPastEvents('BPoolRegistered', {
        filter: {},
        fromBlock: this.startBlock,
        toBlock: 'latest'
      })
    r.sort((t, e) => (t.blockNumber > e.blockNumber ? 1 : -1))
    for (let i = 0; i < r.length; i++)
      (await super.getCurrentTokens(r[i].returnValues[0])).includes(t) &&
        e.push(r[i].returnValues[0])
    return e
  }
  async getOceanNeeded(e, i) {
    const r = await this.getDTAddress(e)
    return new t(i).greaterThan(await this.getDTMaxBuyQuantity(e))
      ? '0'
      : this.calcInGivenOut(e, this.oceanAddress, r, i)
  }
  async getOceanReceived(t, e) {
    const i = await this.getDTAddress(t)
    return this.calcOutGivenIn(t, i, this.oceanAddress, e)
  }
  async getDTReceived(t, e) {
    const i = await this.getDTAddress(t)
    return this.calcOutGivenIn(t, this.oceanAddress, i, e)
  }
  async getDTNeeded(e, i) {
    const r = await this.getDTAddress(e)
    return new t(i).greaterThan(await this.getOceanMaxBuyQuantity(e))
      ? '0'
      : this.calcInGivenOut(e, r, this.oceanAddress, i)
  }
  async getPoolsbyCreator(t) {
    const e = [],
      i = st(
        new this.web3.eth.Contract(this.factoryABI, this.factoryAddress),
        this.config
      ),
      r = await i.getPastEvents('BPoolRegistered', {
        filter: t ? { registeredBy: t } : {},
        fromBlock: this.startBlock,
        toBlock: 'latest'
      })
    for (let i = 0; i < r.length; i++)
      (t && r[i].returnValues[1].toLowerCase() !== t.toLowerCase()) ||
        e.push(await this.getPoolDetails(r[i].returnValues[0]))
    return e
  }
  async getResult(t, e) {
    const i = await super.sharesBalance(t, e.returnValues[0])
    if (parseFloat(i) > 0) {
      const t = await this.getDTAddress(e.returnValues[0])
      if (t) return { shares: i, poolAddress: e.returnValues[0], did: C(D(t)) }
    }
  }
  async getPoolSharesByAddress(t) {
    const e = [],
      i = st(
        new this.web3.eth.Contract(this.factoryABI, this.factoryAddress),
        this.config
      ),
      r = await i.getPastEvents('BPoolRegistered', {
        filter: {},
        fromBlock: this.startBlock,
        toBlock: 'latest'
      })
    let n = []
    for (let i = 0; i < r.length; i++)
      if ((n.push(this.getResult(t, r[i])), n.length > 10)) {
        const t = await Promise.all(n)
        for (let i = 0; i < t.length; i++) e.push(t[i])
        n = []
      }
    if (n.length > 0) {
      const t = await Promise.all(n)
      for (let i = 0; i < t.length; i++) e.push(t[i])
      n = []
    }
    return e.filter((t) => void 0 !== t)
  }
  async getPoolDetails(t) {
    return { poolAddress: t, tokens: await super.getFinalTokens(t) }
  }
  async getPoolLogs(t, e = 0, i) {
    const r = [],
      n = await this.getDTAddress(t)
    0 === e && (e = this.startBlock)
    const s = super.getSwapEventSignature(),
      a = super.getJoinEventSignature(),
      o = super.getExitEventSignature()
    let u
    u = i ? '0x000000000000000000000000' + i.substring(2).toLowerCase() : null
    const h = await this.web3.eth.getPastLogs({
      address: t,
      topics: [[s, a, o], u],
      fromBlock: e,
      toBlock: 'latest'
    })
    let d = []
    for (let e = 0; e < h.length; e++)
      if ((d.push(this.getEventData(t, n, h[e])), d.length > 10)) {
        const t = await Promise.all(d)
        for (let e = 0; e < t.length; e++) r.push(t[e])
        d = []
      }
    if (d.length > 0) {
      const t = await Promise.all(d)
      for (let e = 0; e < t.length; e++) r.push(t[e])
      d = []
    }
    return r.filter((t) => void 0 !== t)
  }
  async getAllPoolLogs(t) {
    const e = [],
      i = st(
        new this.web3.eth.Contract(this.factoryABI, this.factoryAddress),
        this.config
      ),
      r = await i.getPastEvents('BPoolRegistered', {
        filter: {},
        fromBlock: this.startBlock,
        toBlock: 'latest'
      })
    let n = []
    for (let i = 0; i < r.length; i++)
      if (
        (n.push(this.getPoolLogs(r[i].returnValues[0], r[i].blockNumber, t)),
        n.length > 10)
      ) {
        const t = await Promise.all(n)
        for (let i = 0; i < t.length; i++) e.push(t[i])
        n = []
      }
    if (n.length > 0) {
      const t = await Promise.all(n)
      for (let i = 0; i < t.length; i++) e.push(t[i])
      n = []
    }
    return e.reduce((t, e) => t.concat(e))
  }
  async getEventData(t, e, i) {
    const r = await this.web3.eth.getBlock(i.blockNumber),
      n = super.getSwapEventSignature(),
      s = super.getJoinEventSignature(),
      a = super.getExitEventSignature()
    let o
    switch (i.topics[0]) {
      case n:
        o = 'swap'
        break
      case s:
        o = 'join'
        break
      case a:
        o = 'exit'
    }
    let u,
      h = {
        poolAddress: t,
        dtAddress: e,
        caller: i.topics[1],
        transactionHash: i.transactionHash,
        blockNumber: i.blockNumber,
        timestamp: parseInt(String(r.timestamp)),
        type: o
      }
    switch (o) {
      case 'swap':
        ;(u = this.web3.eth.abi.decodeParameters(
          ['uint256', 'uint256'],
          i.data
        )),
          (h = k({}, h, {
            tokenIn: '0x' + i.topics[2].substring(i.topics[2].length - 40),
            tokenOut: '0x' + i.topics[3].substring(i.topics[3].length - 40),
            tokenAmountIn: this.web3.utils.fromWei(u[0]),
            tokenAmountOut: this.web3.utils.fromWei(u[1])
          }))
        break
      case 'join':
        ;(u = this.web3.eth.abi.decodeParameters(['uint256'], i.data)),
          (h = k({}, h, {
            tokenIn: '0x' + i.topics[2].substring(i.topics[2].length - 40),
            tokenAmountIn: this.web3.utils.fromWei(u[0])
          }))
        break
      case 'exit':
        ;(u = this.web3.eth.abi.decodeParameters(['uint256'], i.data)),
          (h = k({}, h, {
            tokenOut: '0x' + i.topics[2].substring(i.topics[2].length - 40),
            tokenAmountOut: this.web3.utils.fromWei(u[0])
          }))
    }
    return h
  }
  async computeSlippage(e, i, r, n, s, a, o, u) {
    const h = await super.calcSpotPrice(e, i, r, n, s, u),
      d = await super.calcSpotPrice(e, a, r, o, s, u)
    return new t(d).mul(100).div(h).minus(100).toString()
  }
  async computeBuySlippage(t, e) {
    const i = await this.getDTAddress(t),
      r = await super.getDenormalizedWeight(t, i),
      n = await super.getDenormalizedWeight(t, this.oceanAddress),
      s = await super.getReserve(t, i),
      a = await super.getReserve(t, i),
      o = await super.getSwapFee(t),
      u = await super.calcOutGivenIn(t, a, n, s, r, e, o),
      h = new rt(this.web3.utils.toWei(s)).minus(this.web3.utils.toWei(u)),
      d = new rt(this.web3.utils.toWei(a)).plus(this.web3.utils.toWei(e))
    return await this.computeSlippage(
      t,
      a,
      n,
      s,
      r,
      this.web3.utils.fromWei(d.toString()),
      this.web3.utils.fromWei(h.toString()),
      o
    )
  }
  async computeSellSlippage(t, e) {
    const i = await this.getDTAddress(t),
      r = await super.getDenormalizedWeight(t, i),
      n = await super.getDenormalizedWeight(t, this.oceanAddress),
      s = await super.getReserve(t, i),
      a = await super.getReserve(t, i),
      o = await super.getSwapFee(t),
      u = await super.calcOutGivenIn(t, s, r, a, n, e, o),
      h = new rt(this.web3.utils.toWei(s)).plus(this.web3.utils.toWei(e)),
      d = new rt(this.web3.utils.toWei(a)).minus(this.web3.utils.toWei(u))
    return await this.computeSlippage(
      t,
      s,
      r,
      a,
      n,
      this.web3.utils.fromWei(h.toString()),
      this.web3.utils.fromWei(d.toString()),
      o
    )
  }
}
!(function (t) {
  ;(t[(t.CreatingExchange = 0)] = 'CreatingExchange'),
    (t[(t.ApprovingDatatoken = 1)] = 'ApprovingDatatoken')
})(wu || (wu = {}))
class _u {
  constructor(t, e, i = null, r = null, n = null, s, a) {
    ;(this.GASLIMIT_DEFAULT = 1e6),
      (this.oceanAddress = null),
      (this.fixedRateExchangeAddress = void 0),
      (this.fixedRateExchangeABI = void 0),
      (this.web3 = void 0),
      (this.contract = null),
      (this.logger = void 0),
      (this.datatokens = void 0),
      (this.startBlock = void 0),
      (this.config = void 0),
      (this.web3 = t),
      (this.fixedRateExchangeAddress = i),
      (this.config = a),
      (this.startBlock = (a && a.startBlock) || 0),
      (this.fixedRateExchangeABI = r || S.abi),
      (this.oceanAddress = n),
      (this.datatokens = s),
      t &&
        (this.contract = st(
          new this.web3.eth.Contract(
            this.fixedRateExchangeABI,
            this.fixedRateExchangeAddress
          ),
          this.config
        )),
      (this.logger = e)
  }
  create(t, e, i, r) {
    return this.createExchange(this.oceanAddress, t, e, i, r)
  }
  createExchange(t, e, i, r, n) {
    return new q(async (s) => {
      let a
      s.next(wu.CreatingExchange)
      const o = this.GASLIMIT_DEFAULT
      try {
        a = await this.contract.methods
          .create(t, e, this.web3.utils.toWei(i))
          .estimateGas({ from: r }, (t, e) => (t ? o : e))
      } catch (t) {
        a = o
      }
      let u = null,
        h = null
      try {
        ;(h = await this.contract.methods
          .create(t, e, this.web3.utils.toWei(i))
          .send({
            from: r,
            gas: a + 1,
            gasPrice: await nt(this.web3, this.config)
          })),
          (u = h.events.ExchangeCreated.returnValues[0])
      } catch (t) {
        this.logger.error(`ERROR: Failed to create new exchange: ${t.message}`)
      }
      return (
        n &&
          u &&
          (s.next(wu.ApprovingDatatoken),
          this.datatokens.approve(e, this.fixedRateExchangeAddress, n, r)),
        h
      )
    })
  }
  async generateExchangeId(t, e) {
    return await this.contract.methods
      .generateExchangeId(this.oceanAddress, t, e)
      .call()
  }
  async buyDT(t, e, i) {
    const r = this.GASLIMIT_DEFAULT
    let n
    try {
      n = await this.contract.methods
        .swap(t, this.web3.utils.toWei(String(e)))
        .estimateGas({ from: i }, (t, e) => (t ? r : e))
    } catch (t) {
      n = r
    }
    try {
      return await this.contract.methods
        .swap(t, this.web3.utils.toWei(String(e)))
        .send({
          from: i,
          gas: n + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      return (
        this.logger.error(`ERROR: Failed to buy datatokens: ${t.message}`), null
      )
    }
  }
  async getNumberOfExchanges() {
    return await this.contract.methods.getNumberOfExchanges().call()
  }
  async setRate(t, e, i) {
    const r = this.GASLIMIT_DEFAULT
    let n
    try {
      n = await this.contract.methods
        .setRate(t, this.web3.utils.toWei(String(e)))
        .estimateGas({ from: i }, (t, e) => (t ? r : e))
    } catch (t) {
      n = r
    }
    return await this.contract.methods
      .setRate(t, this.web3.utils.toWei(String(e)))
      .send({ from: i, gas: n + 1, gasPrice: await nt(this.web3, this.config) })
  }
  async activate(t, e) {
    const i = await this.getExchange(t)
    if (!i) return null
    if (!0 === i.active) return null
    const r = this.GASLIMIT_DEFAULT
    let n
    try {
      n = await this.contract.methods
        .toggleExchangeState(t)
        .estimateGas({ from: e }, (t, e) => (t ? r : e))
    } catch (t) {
      n = r
    }
    return await this.contract.methods
      .toggleExchangeState(t)
      .send({ from: e, gas: n + 1, gasPrice: await nt(this.web3, this.config) })
  }
  async deactivate(t, e) {
    const i = await this.getExchange(t)
    if (!i) return null
    if (!1 === i.active) return null
    const r = this.GASLIMIT_DEFAULT
    let n
    try {
      n = await this.contract.methods
        .toggleExchangeState(t)
        .estimateGas({ from: e }, (t, e) => (t ? r : e))
    } catch (t) {
      n = r
    }
    return await this.contract.methods
      .toggleExchangeState(t)
      .send({ from: e, gas: n + 1, gasPrice: await nt(this.web3, this.config) })
  }
  async getRate(t) {
    const e = await this.contract.methods.getRate(t).call()
    return this.web3.utils.fromWei(e)
  }
  async getSupply(t) {
    const e = await this.contract.methods.getSupply(t).call()
    return this.web3.utils.fromWei(e)
  }
  async getOceanNeeded(t, e) {
    const i = await this.contract.methods
      .CalcInGivenOut(t, this.web3.utils.toWei(e))
      .call()
    return this.web3.utils.fromWei(i)
  }
  async getExchange(t) {
    const e = await this.contract.methods.getExchange(t).call()
    return (
      (e.fixedRate = this.web3.utils.fromWei(e.fixedRate)),
      (e.supply = this.web3.utils.fromWei(e.supply)),
      (e.exchangeID = t),
      e
    )
  }
  async getExchanges() {
    return await this.contract.methods.getExchanges().call()
  }
  async isActive(t) {
    return await this.contract.methods.isActive(t).call()
  }
  async CalcInGivenOut(t, e) {
    const i = await this.contract.methods
      .CalcInGivenOut(t, this.web3.utils.toWei(e))
      .call()
    return this.web3.utils.fromWei(i)
  }
  async searchforDT(t, e) {
    const i = [],
      r = await this.contract.getPastEvents('ExchangeCreated', {
        filter: { datatoken: t.toLowerCase() },
        fromBlock: this.startBlock,
        toBlock: 'latest'
      })
    let n = []
    for (let s = 0; s < r.length; s++)
      if (
        (n.push(this.getExchange(r[s].returnValues[0])),
        n.length > 10 || s === r.length - 1)
      ) {
        const r = await Promise.all(n)
        for (let n = 0; n < r.length; n++) {
          const s = r[n]
          if (
            !0 === s.active &&
            s.dataToken.toLowerCase() === t.toLowerCase()
          ) {
            const t = new rt(s.supply),
              r = new rt(e)
            t.gte(r) && i.push(s)
          }
        }
        n = []
      }
    return i
  }
  async getExchangesbyCreator(t) {
    const e = [],
      i = await this.contract.getPastEvents('ExchangeCreated', {
        filter: {},
        fromBlock: this.startBlock,
        toBlock: 'latest'
      })
    for (let r = 0; r < i.length; r++)
      (t && i[r].returnValues[3].toLowerCase() !== t.toLowerCase()) ||
        e.push(await this.getExchange(i[r].returnValues[0]))
    return e
  }
  async getExchangeSwaps(t, e) {
    const i = [],
      r = await this.contract.getPastEvents('Swapped', {
        filter: { exchangeId: t },
        fromBlock: this.startBlock,
        toBlock: 'latest'
      })
    for (let t = 0; t < r.length; t++)
      (e && r[t].returnValues[1].toLowerCase() !== e.toLowerCase()) ||
        i.push(this.getEventData(r[t]))
    return i
  }
  async getAllExchangesSwaps(t) {
    const e = [],
      i = await this.contract.getPastEvents('ExchangeCreated', {
        filter: {},
        fromBlock: this.startBlock,
        toBlock: 'latest'
      })
    for (let r = 0; r < i.length; r++)
      (await this.getExchangeSwaps(i[r].returnValues[0], t)).forEach((t) => {
        e.push(t)
      })
    return e
  }
  getEventData(t) {
    return {
      exchangeID: t.returnValues[0],
      caller: t.returnValues[1],
      baseTokenAmount: this.web3.utils.fromWei(t.returnValues[2]),
      dataTokenAmount: this.web3.utils.fromWei(t.returnValues[3])
    }
  }
}
!(function (t) {
  ;(t[(t.MakeDispenserMinter = 0)] = 'MakeDispenserMinter'),
    (t[(t.AcceptingNewMinter = 1)] = 'AcceptingNewMinter')
})(vu || (vu = {})),
  (function (t) {
    ;(t[(t.MakeOwnerMinter = 0)] = 'MakeOwnerMinter'),
      (t[(t.AcceptingNewMinter = 1)] = 'AcceptingNewMinter')
  })(Mu || (Mu = {}))
class Su {
  constructor(t, e, i = null, r = null, n, s) {
    ;(this.GASLIMIT_DEFAULT = 1e6),
      (this.dispenserAddress = void 0),
      (this.dispenserABI = void 0),
      (this.web3 = void 0),
      (this.contract = null),
      (this.logger = void 0),
      (this.datatokens = void 0),
      (this.startBlock = void 0),
      (this.config = void 0),
      (this.web3 = t),
      (this.config = s),
      (this.dispenserAddress = i),
      (this.startBlock = (s && s.startBlock) || 0),
      (this.dispenserABI = r || T.abi),
      (this.datatokens = n),
      t &&
        (this.contract = st(
          new this.web3.eth.Contract(this.dispenserABI, this.dispenserAddress),
          this.config
        )),
      (this.logger = e)
  }
  async status(t) {
    try {
      const e = await this.contract.methods.status(t).call()
      return (
        (e.maxTokens = this.web3.utils.fromWei(e.maxTokens)),
        (e.maxBalance = this.web3.utils.fromWei(e.maxBalance)),
        (e.balance = this.web3.utils.fromWei(e.balance)),
        e
      )
    } catch (e) {
      this.logger.warn(`No dispenser available for data token: ${t}`)
    }
    return null
  }
  async activate(t, e, i, r) {
    let n
    const s = this.GASLIMIT_DEFAULT
    try {
      n = await this.contract.methods
        .activate(t, this.web3.utils.toWei(e), this.web3.utils.toWei(i))
        .estimateGas({ from: r }, (t, e) => (t ? s : e))
    } catch (t) {
      n = s
    }
    let a = null
    try {
      a = await this.contract.methods
        .activate(t, this.web3.utils.toWei(e), this.web3.utils.toWei(i))
        .send({
          from: r,
          gas: n + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(`ERROR: Failed to activate dispenser: ${t.message}`)
    }
    return a
  }
  async deactivate(t, e) {
    let i
    const r = this.GASLIMIT_DEFAULT
    try {
      i = await this.contract.methods
        .deactivate(t)
        .estimateGas({ from: e }, (t, e) => (t ? r : e))
    } catch (t) {
      i = r
    }
    let n = null
    try {
      n = await this.contract.methods
        .deactivate(t)
        .send({
          from: e,
          gas: i + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(`ERROR: Failed to deactivate dispenser: ${t.message}`)
    }
    return n
  }
  makeMinter(t, e) {
    return new q(async (i) => {
      let r
      i.next(vu.MakeDispenserMinter)
      const n = this.GASLIMIT_DEFAULT
      if (!(await this.datatokens.proposeMinter(t, this.dispenserAddress, e)))
        return null
      i.next(vu.AcceptingNewMinter)
      try {
        r = await this.contract.methods
          .acceptMinter(t)
          .estimateGas({ from: e }, (t, e) => (t ? n : e))
      } catch (t) {
        r = n
      }
      let s = null
      try {
        s = await this.contract.methods
          .acceptMinter(t)
          .send({
            from: e,
            gas: r + 1,
            gasPrice: await nt(this.web3, this.config)
          })
      } catch (t) {
        this.logger.error(`ERROR: Failed to accept minter role: ${t.message}`)
      }
      return s
    })
  }
  cancelMinter(t, e) {
    return new q(async (i) => {
      let r
      i.next(Mu.MakeOwnerMinter)
      const n = this.GASLIMIT_DEFAULT
      try {
        r = await this.contract.methods
          .removeMinter(t)
          .estimateGas({ from: e }, (t, e) => (t ? n : e))
      } catch (t) {
        r = n
      }
      let s = null
      try {
        s = await this.contract.methods
          .removeMinter(t)
          .send({
            from: e,
            gas: r + 1,
            gasPrice: await nt(this.web3, this.config)
          })
      } catch (t) {
        this.logger.error(`ERROR: Failed to remove minter role: ${t.message}`)
      }
      return s
        ? (i.next(Mu.AcceptingNewMinter),
          await this.datatokens.approveMinter(t, e))
        : null
    })
  }
  async dispense(t, e, i = '1') {
    let r
    const n = this.GASLIMIT_DEFAULT
    try {
      r = await this.contract.methods
        .dispense(t, this.web3.utils.toWei(i))
        .estimateGas({ from: e }, (t, e) => (t ? n : e))
    } catch (t) {
      r = n
    }
    let s = null
    try {
      s = await this.contract.methods
        .dispense(t, this.web3.utils.toWei(i))
        .send({
          from: e,
          gas: r + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(`ERROR: Failed to dispense tokens: ${t.message}`)
    }
    return s
  }
  async ownerWithdraw(t, e) {
    let i
    const r = this.GASLIMIT_DEFAULT
    try {
      i = await this.contract.methods
        .ownerWithdraw(t)
        .estimateGas({ from: e }, (t, e) => (t ? r : e))
    } catch (t) {
      i = r
    }
    let n = null
    try {
      n = await this.contract.methods
        .ownerWithdraw(t)
        .send({
          from: e,
          gas: i + 1,
          gasPrice: await nt(this.web3, this.config)
        })
    } catch (t) {
      this.logger.error(`ERROR: Failed to withdraw tokens: ${t.message}`)
    }
    return n
  }
  async isDispensable(e, i, r = '1') {
    const n = await this.status(e)
    return !(
      !n ||
      !1 === n.active ||
      new t(await this.datatokens.balance(e, i)).greaterThanOrEqualTo(
        n.maxBalance
      ) ||
      new t(String(r)).greaterThan(n.maxTokens) ||
      (!new t(n.balance).greaterThanOrEqualTo(r) && !0 !== n.isTrueMinter)
    )
  }
}
class Tu extends ht {
  constructor(...t) {
    super(...t),
      (this.network = void 0),
      (this.provider = void 0),
      (this.eventAccessControl = void 0),
      (this.web3Provider = void 0),
      (this.metadataCache = void 0),
      (this.onChainMetadata = void 0),
      (this.accounts = void 0),
      (this.assets = void 0),
      (this.compute = void 0),
      (this.datatokens = void 0),
      (this.pool = void 0),
      (this.fixedRateExchange = void 0),
      (this.OceanDispenser = void 0),
      (this.versions = void 0),
      (this.utils = void 0)
  }
  static async getInstance(t) {
    var e
    const i = new Tu(),
      r = k(
        {},
        (function (t) {
          return { config: t, web3: t.web3Provider, logger: B }
        })(t),
        { ocean: i }
      )
    return (
      i.setInstanceConfig(r),
      (i.utils = await hu.getInstance(r)),
      (i.provider = await yt.getInstance(r)),
      (i.eventAccessControl = await su.getInstance(r)),
      (i.metadataCache = new lu(
        r.config.metadataCacheUri,
        r.logger,
        null == (e = r.config) ? void 0 : e.requestTimeout
      )),
      (i.accounts = await ft.getInstance(r)),
      (i.assets = await au.getInstance(r)),
      (i.compute = await gu.getInstance(r)),
      (i.datatokens = new cu(
        r.config.factoryAddress,
        r.config.factoryABI,
        r.config.datatokensABI,
        r.config.web3Provider,
        r.logger,
        r.config
      )),
      (i.pool = new Au(
        r.config.web3Provider,
        r.logger,
        r.config.poolFactoryABI,
        r.config.poolABI,
        r.config.poolFactoryAddress,
        r.config.oceanTokenAddress,
        r.config
      )),
      (i.fixedRateExchange = new _u(
        r.config.web3Provider,
        r.logger,
        r.config.fixedRateExchangeAddress,
        r.config.fixedRateExchangeAddressABI,
        r.config.oceanTokenAddress,
        i.datatokens,
        r.config
      )),
      (i.OceanDispenser = new Su(
        r.config.web3Provider,
        r.logger,
        r.config.dispenserAddress,
        r.config.dispenserABI,
        i.datatokens,
        r.config
      )),
      (i.onChainMetadata = new fu(
        r.config.web3Provider,
        r.logger,
        r.config.metadataContractAddress,
        r.config.metadataContractABI,
        i.metadataCache,
        r.config
      )),
      (i.versions = await ou.getInstance(r)),
      (i.network = new pu()),
      i
    )
  }
}
const xu = {
    networkId: null,
    network: 'unknown',
    metadataCacheUri: 'https://aquarius.oceanprotocol.com',
    nodeUri: 'http://localhost:8545',
    providerUri: 'http://127.0.0.1:8030',
    subgraphUri: null,
    explorerUri: null,
    oceanTokenAddress: null,
    oceanTokenSymbol: 'OCEAN',
    factoryAddress: '0x1234',
    poolFactoryAddress: null,
    fixedRateExchangeAddress: null,
    dispenserAddress: null,
    metadataContractAddress: null,
    startBlock: 0,
    transactionBlockTimeout: 50,
    transactionConfirmationBlocks: 1,
    transactionPollingTimeout: 750,
    gasFeeMultiplier: 1
  },
  Eu = [
    k({}, xu),
    k({}, xu, {
      networkId: 8996,
      network: 'development',
      metadataCacheUri: 'http://127.0.0.1:5000',
      rbacUri: 'http://127.0.0.1:3000'
    }),
    k({}, xu, {
      networkId: 3,
      network: 'ropsten',
      nodeUri: 'https://ropsten.infura.io/v3',
      providerUri: 'https://provider.ropsten.oceanprotocol.com',
      subgraphUri: 'https://subgraph.ropsten.oceanprotocol.com',
      explorerUri: 'https://ropsten.etherscan.io',
      startBlock: 9227563
    }),
    k({}, xu, {
      networkId: 4,
      network: 'rinkeby',
      nodeUri: 'https://rinkeby.infura.io/v3',
      providerUri: 'https://provider.rinkeby.oceanprotocol.com',
      subgraphUri: 'https://subgraph.rinkeby.oceanprotocol.com',
      explorerUri: 'https://rinkeby.etherscan.io',
      startBlock: 7294090
    }),
    k({}, xu, {
      networkId: 1,
      network: 'mainnet',
      nodeUri: 'https://mainnet.infura.io/v3',
      providerUri: 'https://provider.mainnet.oceanprotocol.com',
      subgraphUri: 'https://subgraph.mainnet.oceanprotocol.com',
      explorerUri: 'https://etherscan.io',
      startBlock: 11105459,
      transactionBlockTimeout: 150,
      transactionConfirmationBlocks: 5,
      transactionPollingTimeout: 1750,
      gasFeeMultiplier: 1.05
    }),
    k({}, xu, {
      networkId: 137,
      network: 'polygon',
      nodeUri: 'https://polygon-mainnet.infura.io/v3',
      providerUri: 'https://provider.polygon.oceanprotocol.com',
      subgraphUri: 'https://subgraph.polygon.oceanprotocol.com',
      explorerUri: 'https://polygonscan.com',
      oceanTokenSymbol: 'mOCEAN',
      startBlock: 11005222,
      gasFeeMultiplier: 1.05
    }),
    k({}, xu, {
      networkId: 1287,
      network: 'moonbeamalpha',
      nodeUri: 'https://rpc.testnet.moonbeam.network',
      providerUri: 'https://provider.moonbeamalpha.oceanprotocol.com',
      subgraphUri: 'https://subgraph.moonbeamalpha.oceanprotocol.com',
      explorerUri: 'https://moonbase-blockscout.testnet.moonbeam.network/',
      startBlock: 90707
    }),
    k({}, xu, {
      networkId: 2021e3,
      network: 'gaiaxtestnet',
      nodeUri: 'https://rpc.gaiaxtestnet.oceanprotocol.com',
      providerUri: 'https://provider.gaiaxtestnet.oceanprotocol.com',
      subgraphUri: 'https://subgraph.gaiaxtestnet.oceanprotocol.com',
      explorerUri: 'https://blockscout.gaiaxtestnet.oceanprotocol.com'
    }),
    k({}, xu, {
      networkId: 2021001,
      network: 'catenaxtestnet',
      nodeUri: 'https://rpc.catenaxtestnet.oceanprotocol.com',
      providerUri: 'https://provider.catenaxtestnet.oceanprotocol.com',
      subgraphUri: 'https://subgraph.catenaxtestnet.oceanprotocol.com',
      explorerUri: 'https://blockscout.catenaxtestnet.oceanprotocol.com',
      metadataCacheUri: 'https://aquarius.catenaxtestnet.oceanprotocol.com'
    }),
    k({}, xu, {
      networkId: 80001,
      network: 'mumbai',
      nodeUri: 'https://polygon-mumbai.infura.io/v3',
      providerUri: 'https://provider.mumbai.oceanprotocol.com',
      subgraphUri: 'https://subgraph.mumbai.oceanprotocol.com',
      explorerUri: 'https://mumbai.polygonscan.com'
    }),
    k({}, xu, {
      networkId: 56,
      network: 'bsc',
      nodeUri: 'https://bsc-dataseed.binance.org',
      providerUri: 'https://provider.bsc.oceanprotocol.com',
      subgraphUri: 'https://subgraph.bsc.oceanprotocol.com',
      explorerUri: 'https://bscscan.com/',
      gasFeeMultiplier: 1.05
    }),
    k({}, xu, {
      networkId: 44787,
      network: 'celoalfajores',
      nodeUri: 'https://alfajores-forno.celo-testnet.org',
      providerUri: 'https://provider.celoalfajores.oceanprotocol.com',
      subgraphUri: 'https://subgraph.celoalfajores.oceanprotocol.com',
      explorerUri: 'https://alfajores-blockscout.celo-testnet.org'
    }),
    k({}, xu, {
      networkId: 246,
      network: 'energyweb',
      nodeUri: 'https://rpc.energyweb.org',
      providerUri: 'https://provider.energyweb.oceanprotocol.com',
      subgraphUri: 'https://subgraph.energyweb.oceanprotocol.com',
      explorerUri: 'https://explorer.energyweb.org',
      gasFeeMultiplier: 1.05
    }),
    k({}, xu, {
      networkId: 1285,
      network: 'moonriver',
      nodeUri: 'https://moonriver.api.onfinality.io/public',
      providerUri: 'https://provider.moonriver.oceanprotocol.com',
      subgraphUri: 'https://subgraph.moonriver.oceanprotocol.com',
      explorerUri: 'https://blockscout.moonriver.moonbeam.network',
      gasFeeMultiplier: 1.05
    })
  ]
class Ru {
  getAddressesFromEnv(t) {
    let e
    if (x[t]) {
      const {
        DTFactory: i,
        BFactory: r,
        FixedRateExchange: n,
        Dispenser: s,
        Metadata: a,
        Ocean: o,
        chainId: u,
        startBlock: h
      } = x[t]
      e = k(
        {
          factoryAddress: i,
          poolFactoryAddress: r,
          fixedRateExchangeAddress: n,
          dispenserAddress: s,
          metadataContractAddress: a,
          oceanTokenAddress: o,
          networkId: u,
          startBlock: h
        },
        process.env.AQUARIUS_URI && {
          metadataCacheUri: process.env.AQUARIUS_URI
        }
      )
    }
    if (i && process.env.ADDRESS_FILE)
      try {
        const r = JSON.parse(
            i.readFileSync(
              process.env.ADDRESS_FILE ||
                `${m}/.ocean/ocean-contracts/artifacts/address.json`,
              'utf8'
            )
          ),
          {
            DTFactory: n,
            BFactory: s,
            FixedRateExchange: a,
            Dispenser: o,
            Metadata: u,
            Ocean: h,
            chainId: d,
            startBlock: l
          } = r[t]
        e = k(
          {
            factoryAddress: n,
            poolFactoryAddress: s,
            fixedRateExchangeAddress: a,
            dispenserAddress: o,
            metadataContractAddress: u,
            oceanTokenAddress: h,
            networkId: d,
            startBlock: l
          },
          process.env.AQUARIUS_URI && {
            metadataCacheUri: process.env.AQUARIUS_URI
          }
        )
      } catch (t) {}
    return e
  }
  getConfig(t, e) {
    const i = 'string' == typeof t ? 'network' : 'networkId'
    let r = Eu.find((e) => e[i] === t)
    return r
      ? ((r = k({}, r, this.getAddressesFromEnv(r.network))),
        k({}, r, { nodeUri: e ? `${r.nodeUri}/${e}` : r.nodeUri }))
      : (B.error(`No config found for given network '${t}'`), null)
  }
}
async function ku(t, e) {
  try {
    const i = await E.get(`${e}/api/v1/aquarius/assets/ddo/${t}`)
    if (!i || 200 !== i.status || !i.data) return
    const r = k({}, i.data)
    return new pt(r)
  } catch (t) {
    E.isCancel(t) ? B.log(t.message) : B.error(t.message)
  }
}
async function Iu(t, e, i, r, n) {
  const s = new Date(Date.now()).toISOString().split('.')[0] + 'Z',
    a = {
      created: s,
      updated: s,
      type: e.service[0].attributes.main.type,
      name: e.service[0].attributes.main.name,
      description: e.service[0].attributes.additionalInformation.description,
      tags: e.service[0].attributes.additionalInformation.tags,
      author: e.service[0].attributes.main.author,
      license: e.service[0].attributes.main.license,
      links: e.service[0].attributes.additionalInformation.links.url,
      additionalInformation: {
        termsAndConditions:
          e.service[0].attributes.additionalInformation.termsAndConditions
      }
    },
    o = k(
      {
        id: t,
        type: e.service[1].type,
        files: n || '',
        datatokenAddress: r,
        serviceEndpoint: e.service[1].serviceEndpoint,
        timeout: e.service[1].attributes.main.timeout
      },
      'compute' === e.service[1].type && {
        compute: {
          namespace: '',
          allowRawAlgorithm: !1,
          allowNetworkAccess: !0,
          publisherTrustedAlgorithmPublishers: null,
          publisherTrustedAlgorithms: null
        }
      }
    )
  return {
    '@context': ['https://w3id.org/did/v1'],
    id: t,
    version: '4.0.0',
    chainId: e.chainId,
    nftAddress: i,
    metadata: a,
    services: [o]
  }
}
async function Bu(t, e, i, r, n, s) {
  const a = await ku(t, n)
  return await Iu(e, a, i, r, s)
}
var Ou,
  Pu = [
    {
      inputs: [
        { internalType: 'address', name: '_template721', type: 'address' },
        { internalType: 'address', name: '_template', type: 'address' },
        { internalType: 'address', name: '_router', type: 'address' }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'datatokenAddress',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'maxTokens',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'maxBalance',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'address',
          name: 'allowedSwapper',
          type: 'address'
        }
      ],
      name: 'DispenserCreated',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: 'address',
          name: 'instance',
          type: 'address'
        }
      ],
      name: 'InstanceDeployed',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: 'address',
          name: 'newTokenAddress',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'templateAddress',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'string',
          name: 'tokenName',
          type: 'string'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'admin',
          type: 'address'
        },
        { indexed: !1, internalType: 'string', name: 'symbol', type: 'string' },
        {
          indexed: !1,
          internalType: 'string',
          name: 'tokenURI',
          type: 'string'
        },
        {
          indexed: !1,
          internalType: 'bool',
          name: 'transferable',
          type: 'bool'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'creator',
          type: 'address'
        }
      ],
      name: 'NFTCreated',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: 'address',
          name: 'dispenserContract',
          type: 'address'
        }
      ],
      name: 'NewDispenser',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: 'bytes32',
          name: 'exchangeId',
          type: 'bytes32'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'address',
          name: 'exchangeContract',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'baseToken',
          type: 'address'
        }
      ],
      name: 'NewFixedRate',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: 'address',
          name: 'poolAddress',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'address',
          name: 'ssContract',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'address',
          name: 'baseTokenAddress',
          type: 'address'
        }
      ],
      name: 'NewPool',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: '_templateAddress',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'uint256',
          name: 'nftTemplateCount',
          type: 'uint256'
        }
      ],
      name: 'Template20Added',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: '_templateAddress',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'uint256',
          name: 'nftTemplateCount',
          type: 'uint256'
        }
      ],
      name: 'Template721Added',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'newTokenAddress',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'templateAddress',
          type: 'address'
        },
        { indexed: !1, internalType: 'string', name: 'name', type: 'string' },
        { indexed: !1, internalType: 'string', name: 'symbol', type: 'string' },
        { indexed: !1, internalType: 'uint256', name: 'cap', type: 'uint256' },
        {
          indexed: !1,
          internalType: 'address',
          name: 'creator',
          type: 'address'
        }
      ],
      name: 'TokenCreated',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'address', name: 'from', type: 'address' },
        { indexed: !0, internalType: 'address', name: 'to', type: 'address' },
        {
          indexed: !0,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'Transfer',
      type: 'event'
    },
    {
      inputs: [
        { internalType: 'address', name: '_templateAddress', type: 'address' }
      ],
      name: 'add721TokenTemplate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_templateAddress', type: 'address' }
      ],
      name: 'addTokenTemplate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'symbol', type: 'string' },
            { internalType: 'uint256', name: 'templateIndex', type: 'uint256' },
            { internalType: 'string', name: 'tokenURI', type: 'string' },
            { internalType: 'bool', name: 'transferable', type: 'bool' },
            { internalType: 'address', name: 'owner', type: 'address' }
          ],
          internalType: 'struct IFactory.NftCreateData',
          name: '_NftCreateData',
          type: 'tuple'
        },
        {
          components: [
            { internalType: 'uint256', name: 'templateIndex', type: 'uint256' },
            { internalType: 'string[]', name: 'strings', type: 'string[]' },
            { internalType: 'address[]', name: 'addresses', type: 'address[]' },
            { internalType: 'uint256[]', name: 'uints', type: 'uint256[]' },
            { internalType: 'bytes[]', name: 'bytess', type: 'bytes[]' }
          ],
          internalType: 'struct IFactory.ErcCreateData',
          name: '_ErcCreateData',
          type: 'tuple'
        }
      ],
      name: 'createNftWithErc20',
      outputs: [
        { internalType: 'address', name: 'erc721Address', type: 'address' },
        { internalType: 'address', name: 'erc20Address', type: 'address' }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'symbol', type: 'string' },
            { internalType: 'uint256', name: 'templateIndex', type: 'uint256' },
            { internalType: 'string', name: 'tokenURI', type: 'string' },
            { internalType: 'bool', name: 'transferable', type: 'bool' },
            { internalType: 'address', name: 'owner', type: 'address' }
          ],
          internalType: 'struct IFactory.NftCreateData',
          name: '_NftCreateData',
          type: 'tuple'
        },
        {
          components: [
            { internalType: 'uint256', name: 'templateIndex', type: 'uint256' },
            { internalType: 'string[]', name: 'strings', type: 'string[]' },
            { internalType: 'address[]', name: 'addresses', type: 'address[]' },
            { internalType: 'uint256[]', name: 'uints', type: 'uint256[]' },
            { internalType: 'bytes[]', name: 'bytess', type: 'bytes[]' }
          ],
          internalType: 'struct IFactory.ErcCreateData',
          name: '_ErcCreateData',
          type: 'tuple'
        },
        {
          components: [
            {
              internalType: 'address',
              name: 'dispenserAddress',
              type: 'address'
            },
            { internalType: 'uint256', name: 'maxTokens', type: 'uint256' },
            { internalType: 'uint256', name: 'maxBalance', type: 'uint256' },
            { internalType: 'bool', name: 'withMint', type: 'bool' },
            { internalType: 'address', name: 'allowedSwapper', type: 'address' }
          ],
          internalType: 'struct IFactory.DispenserData',
          name: '_DispenserData',
          type: 'tuple'
        }
      ],
      name: 'createNftWithErc20WithDispenser',
      outputs: [
        { internalType: 'address', name: 'erc721Address', type: 'address' },
        { internalType: 'address', name: 'erc20Address', type: 'address' }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'symbol', type: 'string' },
            { internalType: 'uint256', name: 'templateIndex', type: 'uint256' },
            { internalType: 'string', name: 'tokenURI', type: 'string' },
            { internalType: 'bool', name: 'transferable', type: 'bool' },
            { internalType: 'address', name: 'owner', type: 'address' }
          ],
          internalType: 'struct IFactory.NftCreateData',
          name: '_NftCreateData',
          type: 'tuple'
        },
        {
          components: [
            { internalType: 'uint256', name: 'templateIndex', type: 'uint256' },
            { internalType: 'string[]', name: 'strings', type: 'string[]' },
            { internalType: 'address[]', name: 'addresses', type: 'address[]' },
            { internalType: 'uint256[]', name: 'uints', type: 'uint256[]' },
            { internalType: 'bytes[]', name: 'bytess', type: 'bytes[]' }
          ],
          internalType: 'struct IFactory.ErcCreateData',
          name: '_ErcCreateData',
          type: 'tuple'
        },
        {
          components: [
            {
              internalType: 'address',
              name: 'fixedPriceAddress',
              type: 'address'
            },
            { internalType: 'address[]', name: 'addresses', type: 'address[]' },
            { internalType: 'uint256[]', name: 'uints', type: 'uint256[]' }
          ],
          internalType: 'struct IFactory.FixedData',
          name: '_FixedData',
          type: 'tuple'
        }
      ],
      name: 'createNftWithErc20WithFixedRate',
      outputs: [
        { internalType: 'address', name: 'erc721Address', type: 'address' },
        { internalType: 'address', name: 'erc20Address', type: 'address' },
        { internalType: 'bytes32', name: 'exchangeId', type: 'bytes32' }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'symbol', type: 'string' },
            { internalType: 'uint256', name: 'templateIndex', type: 'uint256' },
            { internalType: 'string', name: 'tokenURI', type: 'string' },
            { internalType: 'bool', name: 'transferable', type: 'bool' },
            { internalType: 'address', name: 'owner', type: 'address' }
          ],
          internalType: 'struct IFactory.NftCreateData',
          name: '_NftCreateData',
          type: 'tuple'
        },
        {
          components: [
            { internalType: 'uint256', name: 'templateIndex', type: 'uint256' },
            { internalType: 'string[]', name: 'strings', type: 'string[]' },
            { internalType: 'address[]', name: 'addresses', type: 'address[]' },
            { internalType: 'uint256[]', name: 'uints', type: 'uint256[]' },
            { internalType: 'bytes[]', name: 'bytess', type: 'bytes[]' }
          ],
          internalType: 'struct IFactory.ErcCreateData',
          name: '_ErcCreateData',
          type: 'tuple'
        },
        {
          components: [
            { internalType: 'uint256[]', name: 'ssParams', type: 'uint256[]' },
            { internalType: 'uint256[]', name: 'swapFees', type: 'uint256[]' },
            { internalType: 'address[]', name: 'addresses', type: 'address[]' }
          ],
          internalType: 'struct IFactory.PoolData',
          name: '_PoolData',
          type: 'tuple'
        }
      ],
      name: 'createNftWithErc20WithPool',
      outputs: [
        { internalType: 'address', name: 'erc721Address', type: 'address' },
        { internalType: 'address', name: 'erc20Address', type: 'address' },
        { internalType: 'address', name: 'poolAddress', type: 'address' }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'symbol', type: 'string' },
            { internalType: 'uint256', name: 'templateIndex', type: 'uint256' },
            { internalType: 'string', name: 'tokenURI', type: 'string' },
            { internalType: 'bool', name: 'transferable', type: 'bool' },
            { internalType: 'address', name: 'owner', type: 'address' }
          ],
          internalType: 'struct IFactory.NftCreateData',
          name: '_NftCreateData',
          type: 'tuple'
        },
        {
          components: [
            { internalType: 'uint8', name: '_metaDataState', type: 'uint8' },
            {
              internalType: 'string',
              name: '_metaDataDecryptorUrl',
              type: 'string'
            },
            {
              internalType: 'string',
              name: '_metaDataDecryptorAddress',
              type: 'string'
            },
            { internalType: 'bytes', name: 'flags', type: 'bytes' },
            { internalType: 'bytes', name: 'data', type: 'bytes' },
            { internalType: 'bytes32', name: '_metaDataHash', type: 'bytes32' },
            {
              components: [
                {
                  internalType: 'address',
                  name: 'validatorAddress',
                  type: 'address'
                },
                { internalType: 'uint8', name: 'v', type: 'uint8' },
                { internalType: 'bytes32', name: 'r', type: 'bytes32' },
                { internalType: 'bytes32', name: 's', type: 'bytes32' }
              ],
              internalType: 'struct IERC721Template.metaDataProof[]',
              name: '_metadataProofs',
              type: 'tuple[]'
            }
          ],
          internalType: 'struct ERC721Factory.MetaData',
          name: '_MetaData',
          type: 'tuple'
        }
      ],
      name: 'createNftWithMetaData',
      outputs: [
        { internalType: 'address', name: 'erc721Address', type: 'address' }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_templateIndex', type: 'uint256' },
        { internalType: 'string[]', name: 'strings', type: 'string[]' },
        { internalType: 'address[]', name: 'addresses', type: 'address[]' },
        { internalType: 'uint256[]', name: 'uints', type: 'uint256[]' },
        { internalType: 'bytes[]', name: 'bytess', type: 'bytes[]' }
      ],
      name: 'createToken',
      outputs: [{ internalType: 'address', name: 'token', type: 'address' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'string', name: 'name', type: 'string' },
        { internalType: 'string', name: 'symbol', type: 'string' },
        { internalType: 'uint256', name: '_templateIndex', type: 'uint256' },
        {
          internalType: 'address',
          name: 'additionalERC20Deployer',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'additionalMetaDataUpdater',
          type: 'address'
        },
        { internalType: 'string', name: 'tokenURI', type: 'string' },
        { internalType: 'bool', name: 'transferable', type: 'bool' },
        { internalType: 'address', name: 'owner', type: 'address' }
      ],
      name: 'deployERC721Contract',
      outputs: [{ internalType: 'address', name: 'token', type: 'address' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
      name: 'disable721TokenTemplate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
      name: 'disableTokenTemplate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'erc20List',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'erc721List',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getCurrentNFTCount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getCurrentNFTTemplateCount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getCurrentTemplateCount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getCurrentTokenCount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
      name: 'getNFTTemplate',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'templateAddress',
              type: 'address'
            },
            { internalType: 'bool', name: 'isActive', type: 'bool' }
          ],
          internalType: 'struct ERC721Factory.Template',
          name: '',
          type: 'tuple'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
      name: 'getTokenTemplate',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'templateAddress',
              type: 'address'
            },
            { internalType: 'bool', name: 'isActive', type: 'bool' }
          ],
          internalType: 'struct ERC721Factory.Template',
          name: '',
          type: 'tuple'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'nftTemplateList',
      outputs: [
        { internalType: 'address', name: 'templateAddress', type: 'address' },
        { internalType: 'bool', name: 'isActive', type: 'bool' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
      name: 'reactivate721TokenTemplate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
      name: 'reactivateTokenTemplate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'tokenAddress', type: 'address' },
            { internalType: 'bytes32', name: 'orderTxId', type: 'bytes32' },
            {
              components: [
                {
                  internalType: 'address',
                  name: 'providerFeeAddress',
                  type: 'address'
                },
                {
                  internalType: 'address',
                  name: 'providerFeeToken',
                  type: 'address'
                },
                {
                  internalType: 'uint256',
                  name: 'providerFeeAmount',
                  type: 'uint256'
                },
                { internalType: 'uint8', name: 'v', type: 'uint8' },
                { internalType: 'bytes32', name: 'r', type: 'bytes32' },
                { internalType: 'bytes32', name: 's', type: 'bytes32' },
                {
                  internalType: 'uint256',
                  name: 'validUntil',
                  type: 'uint256'
                },
                { internalType: 'bytes', name: 'providerData', type: 'bytes' }
              ],
              internalType: 'struct IERC20Template.providerFee',
              name: '_providerFee',
              type: 'tuple'
            }
          ],
          internalType: 'struct ERC721Factory.reuseTokenOrder[]',
          name: 'orders',
          type: 'tuple[]'
        }
      ],
      name: 'reuseMultipleTokenOrder',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'router',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'tokenAddress', type: 'address' },
            { internalType: 'address', name: 'consumer', type: 'address' },
            { internalType: 'uint256', name: 'serviceIndex', type: 'uint256' },
            {
              components: [
                {
                  internalType: 'address',
                  name: 'providerFeeAddress',
                  type: 'address'
                },
                {
                  internalType: 'address',
                  name: 'providerFeeToken',
                  type: 'address'
                },
                {
                  internalType: 'uint256',
                  name: 'providerFeeAmount',
                  type: 'uint256'
                },
                { internalType: 'uint8', name: 'v', type: 'uint8' },
                { internalType: 'bytes32', name: 'r', type: 'bytes32' },
                { internalType: 'bytes32', name: 's', type: 'bytes32' },
                {
                  internalType: 'uint256',
                  name: 'validUntil',
                  type: 'uint256'
                },
                { internalType: 'bytes', name: 'providerData', type: 'bytes' }
              ],
              internalType: 'struct IERC20Template.providerFee',
              name: '_providerFee',
              type: 'tuple'
            },
            {
              components: [
                {
                  internalType: 'address',
                  name: 'consumeMarketFeeAddress',
                  type: 'address'
                },
                {
                  internalType: 'address',
                  name: 'consumeMarketFeeToken',
                  type: 'address'
                },
                {
                  internalType: 'uint256',
                  name: 'consumeMarketFeeAmount',
                  type: 'uint256'
                }
              ],
              internalType: 'struct IERC20Template.consumeMarketFee',
              name: '_consumeMarketFee',
              type: 'tuple'
            }
          ],
          internalType: 'struct ERC721Factory.tokenOrder[]',
          name: 'orders',
          type: 'tuple[]'
        }
      ],
      name: 'startMultipleTokenOrder',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'templateCount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'templateList',
      outputs: [
        { internalType: 'address', name: 'templateAddress', type: 'address' },
        { internalType: 'bool', name: 'isActive', type: 'bool' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ],
  Cu = [
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'address', name: 'user', type: 'address' },
        {
          indexed: !0,
          internalType: 'address',
          name: 'signer',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'AddedManager',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'address', name: 'user', type: 'address' },
        {
          indexed: !0,
          internalType: 'address',
          name: 'signer',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'AddedTo725StoreList',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'address', name: 'user', type: 'address' },
        {
          indexed: !0,
          internalType: 'address',
          name: 'signer',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'AddedToCreateERC20List',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'address', name: 'user', type: 'address' },
        {
          indexed: !0,
          internalType: 'address',
          name: 'signer',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'AddedToMetadataList',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'approved',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'Approval',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'operator',
          type: 'address'
        },
        { indexed: !1, internalType: 'bool', name: 'approved', type: 'bool' }
      ],
      name: 'ApprovalForAll',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'signer',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'CleanedPermissions',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'contractAddress',
          type: 'address'
        }
      ],
      name: 'ContractCreated',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'bytes32', name: 'key', type: 'bytes32' },
        { indexed: !1, internalType: 'bytes', name: 'value', type: 'bytes' }
      ],
      name: 'DataChanged',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'uint256',
          name: '_operation',
          type: 'uint256'
        },
        { indexed: !0, internalType: 'address', name: '_to', type: 'address' },
        {
          indexed: !0,
          internalType: 'uint256',
          name: '_value',
          type: 'uint256'
        },
        { indexed: !1, internalType: 'bytes', name: '_data', type: 'bytes' }
      ],
      name: 'Executed',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'createdBy',
          type: 'address'
        },
        { indexed: !1, internalType: 'uint8', name: 'state', type: 'uint8' },
        {
          indexed: !1,
          internalType: 'string',
          name: 'decryptorUrl',
          type: 'string'
        },
        { indexed: !1, internalType: 'bytes', name: 'flags', type: 'bytes' },
        { indexed: !1, internalType: 'bytes', name: 'data', type: 'bytes' },
        {
          indexed: !1,
          internalType: 'bytes32',
          name: 'metaDataHash',
          type: 'bytes32'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'MetadataCreated',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'updatedBy',
          type: 'address'
        },
        { indexed: !1, internalType: 'uint8', name: 'state', type: 'uint8' },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'MetadataState',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'updatedBy',
          type: 'address'
        },
        { indexed: !1, internalType: 'uint8', name: 'state', type: 'uint8' },
        {
          indexed: !1,
          internalType: 'string',
          name: 'decryptorUrl',
          type: 'string'
        },
        { indexed: !1, internalType: 'bytes', name: 'flags', type: 'bytes' },
        { indexed: !1, internalType: 'bytes', name: 'data', type: 'bytes' },
        {
          indexed: !1,
          internalType: 'bytes32',
          name: 'metaDataHash',
          type: 'bytes32'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'MetadataUpdated',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'validator',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'bytes32',
          name: 'metaDataHash',
          type: 'bytes32'
        },
        { indexed: !1, internalType: 'uint8', name: 'v', type: 'uint8' },
        { indexed: !1, internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { indexed: !1, internalType: 'bytes32', name: 's', type: 'bytes32' }
      ],
      name: 'MetadataValidated',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'address', name: 'user', type: 'address' },
        {
          indexed: !0,
          internalType: 'address',
          name: 'signer',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'RemovedFrom725StoreList',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'address', name: 'user', type: 'address' },
        {
          indexed: !0,
          internalType: 'address',
          name: 'signer',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'RemovedFromCreateERC20List',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'address', name: 'user', type: 'address' },
        {
          indexed: !0,
          internalType: 'address',
          name: 'signer',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'RemovedFromMetadataList',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'address', name: 'user', type: 'address' },
        {
          indexed: !0,
          internalType: 'address',
          name: 'signer',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'RemovedManager',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'newTokenAddress',
          type: 'address'
        },
        {
          indexed: !0,
          internalType: 'address',
          name: 'templateAddress',
          type: 'address'
        },
        { indexed: !1, internalType: 'string', name: 'name', type: 'string' },
        { indexed: !1, internalType: 'string', name: 'symbol', type: 'string' },
        { indexed: !1, internalType: 'uint256', name: 'cap', type: 'uint256' },
        {
          indexed: !1,
          internalType: 'address',
          name: 'creator',
          type: 'address'
        }
      ],
      name: 'TokenCreated',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          internalType: 'address',
          name: 'updatedBy',
          type: 'address'
        },
        {
          indexed: !1,
          internalType: 'string',
          name: 'tokenURI',
          type: 'string'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'tokenID',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: !1,
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256'
        }
      ],
      name: 'TokenURIUpdate',
      type: 'event'
    },
    {
      anonymous: !1,
      inputs: [
        { indexed: !0, internalType: 'address', name: 'from', type: 'address' },
        { indexed: !0, internalType: 'address', name: 'to', type: 'address' },
        {
          indexed: !0,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'Transfer',
      type: 'event'
    },
    { stateMutability: 'payable', type: 'fallback' },
    {
      inputs: [
        { internalType: 'address', name: '_managerAddress', type: 'address' }
      ],
      name: 'addManager',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address[]', name: 'addresses', type: 'address[]' },
        {
          internalType: 'enum ERC721RolesAddress.RolesType[]',
          name: 'roles',
          type: 'uint8[]'
        }
      ],
      name: 'addMultipleUsersToRoles',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_allowedAddress', type: 'address' }
      ],
      name: 'addTo725StoreList',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_allowedAddress', type: 'address' }
      ],
      name: 'addToCreateERC20List',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_allowedAddress', type: 'address' }
      ],
      name: 'addToMetadataList',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'auth',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'baseURI',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'cleanPermissions',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_templateIndex', type: 'uint256' },
        { internalType: 'string[]', name: 'strings', type: 'string[]' },
        { internalType: 'address[]', name: 'addresses', type: 'address[]' },
        { internalType: 'uint256[]', name: 'uints', type: 'uint256[]' },
        { internalType: 'bytes[]', name: 'bytess', type: 'bytes[]' }
      ],
      name: 'createERC20',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_operation', type: 'uint256' },
        { internalType: 'address', name: '_to', type: 'address' },
        { internalType: 'uint256', name: '_value', type: 'uint256' },
        { internalType: 'bytes', name: '_data', type: 'bytes' }
      ],
      name: 'executeCall',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'getApproved',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'bytes32', name: '_key', type: 'bytes32' }],
      name: 'getData',
      outputs: [{ internalType: 'bytes', name: '_value', type: 'bytes' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getId',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      stateMutability: 'pure',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getMetaData',
      outputs: [
        { internalType: 'string', name: '', type: 'string' },
        { internalType: 'string', name: '', type: 'string' },
        { internalType: 'uint8', name: '', type: 'uint8' },
        { internalType: 'bool', name: '', type: 'bool' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
      name: 'getPermissions',
      outputs: [
        {
          components: [
            { internalType: 'bool', name: 'manager', type: 'bool' },
            { internalType: 'bool', name: 'deployERC20', type: 'bool' },
            { internalType: 'bool', name: 'updateMetadata', type: 'bool' },
            { internalType: 'bool', name: 'store', type: 'bool' }
          ],
          internalType: 'struct ERC721RolesAddress.Roles',
          name: '',
          type: 'tuple'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getTokensList',
      outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'hasMetaData',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'string', name: 'name_', type: 'string' },
        { internalType: 'string', name: 'symbol_', type: 'string' },
        { internalType: 'address', name: 'tokenFactory', type: 'address' },
        {
          internalType: 'address',
          name: 'additionalERC20Deployer',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'additionalMetaDataUpdater',
          type: 'address'
        },
        { internalType: 'string', name: 'tokenURI', type: 'string' },
        { internalType: 'bool', name: 'transferable_', type: 'bool' }
      ],
      name: 'initialize',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'operator', type: 'address' }
      ],
      name: 'isApprovedForAll',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'datatoken', type: 'address' }],
      name: 'isDeployed',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'isERC20Deployer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'isInitialized',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'metaDataDecryptorAddress',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'metaDataDecryptorUrl',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'metaDataState',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'ownerOf',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_allowedAddress', type: 'address' }
      ],
      name: 'removeFrom725StoreList',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_allowedAddress', type: 'address' }
      ],
      name: 'removeFromCreateERC20List',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_allowedAddress', type: 'address' }
      ],
      name: 'removeFromMetadataList',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_managerAddress', type: 'address' }
      ],
      name: 'removeManager',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'from', type: 'address' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'operator', type: 'address' },
        { internalType: 'bool', name: 'approved', type: 'bool' }
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'string', name: '_baseURI', type: 'string' }],
      name: 'setBaseURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'bytes32', name: '_key', type: 'bytes32' },
        { internalType: 'bytes', name: '_value', type: 'bytes' }
      ],
      name: 'setDataERC20',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint8', name: '_metaDataState', type: 'uint8' },
        {
          internalType: 'string',
          name: '_metaDataDecryptorUrl',
          type: 'string'
        },
        {
          internalType: 'string',
          name: '_metaDataDecryptorAddress',
          type: 'string'
        },
        { internalType: 'bytes', name: 'flags', type: 'bytes' },
        { internalType: 'bytes', name: 'data', type: 'bytes' },
        { internalType: 'bytes32', name: '_metaDataHash', type: 'bytes32' },
        {
          components: [
            {
              internalType: 'address',
              name: 'validatorAddress',
              type: 'address'
            },
            { internalType: 'uint8', name: 'v', type: 'uint8' },
            { internalType: 'bytes32', name: 'r', type: 'bytes32' },
            { internalType: 'bytes32', name: 's', type: 'bytes32' }
          ],
          internalType: 'struct ERC721Template.metaDataProof[]',
          name: '_metadataProofs',
          type: 'tuple[]'
        }
      ],
      name: 'setMetaData',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'uint8', name: 'metaDataState', type: 'uint8' },
            {
              internalType: 'string',
              name: 'metaDataDecryptorUrl',
              type: 'string'
            },
            {
              internalType: 'string',
              name: 'metaDataDecryptorAddress',
              type: 'string'
            },
            { internalType: 'bytes', name: 'flags', type: 'bytes' },
            { internalType: 'bytes', name: 'data', type: 'bytes' },
            { internalType: 'bytes32', name: 'metaDataHash', type: 'bytes32' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'string', name: 'tokenURI', type: 'string' },
            {
              components: [
                {
                  internalType: 'address',
                  name: 'validatorAddress',
                  type: 'address'
                },
                { internalType: 'uint8', name: 'v', type: 'uint8' },
                { internalType: 'bytes32', name: 'r', type: 'bytes32' },
                { internalType: 'bytes32', name: 's', type: 'bytes32' }
              ],
              internalType: 'struct ERC721Template.metaDataProof[]',
              name: 'metadataProofs',
              type: 'tuple[]'
            }
          ],
          internalType: 'struct ERC721Template.metaDataAndTokenURI',
          name: '_metaDataAndTokenURI',
          type: 'tuple'
        }
      ],
      name: 'setMetaDataAndTokenURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint8', name: '_metaDataState', type: 'uint8' }
      ],
      name: 'setMetaDataState',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'bytes32', name: '_key', type: 'bytes32' },
        { internalType: 'bytes', name: '_value', type: 'bytes' }
      ],
      name: 'setNewData',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'string', name: 'tokenURI', type: 'string' }
      ],
      name: 'setTokenURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
      name: 'supportsInterface',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
      name: 'tokenByIndex',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'uint256', name: 'index', type: 'uint256' }
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'tokenURI',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'from', type: 'address' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'transferable',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'withdrawETH',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    },
    { stateMutability: 'payable', type: 'receive' }
  ]
async function Nu(t) {
  return new rt(await t.eth.getGasPrice())
    .multipliedBy(1.05)
    .integerValue(rt.ROUND_DOWN)
    .toString(10)
}
!(function (t) {
  ;(t[(t.None = -1)] = 'None'),
    (t[(t.Error = 0)] = 'Error'),
    (t[(t.Warn = 1)] = 'Warn'),
    (t[(t.Log = 2)] = 'Log'),
    (t[(t.Verbose = 3)] = 'Verbose')
})(Ou || (Ou = {}))
const Lu = new (class {
    constructor(t = Ou.Error) {
      ;(this.logLevel = void 0), (this.logLevel = t)
    }
    setLevel(t) {
      this.logLevel = t
    }
    bypass(...t) {
      this.dispatch('log', -Infinity, ...t)
    }
    debug(...t) {
      this.dispatch('debug', Ou.Verbose, ...t)
    }
    log(...t) {
      this.dispatch('log', Ou.Log, ...t)
    }
    warn(...t) {
      this.dispatch('warn', Ou.Warn, ...t)
    }
    error(...t) {
      this.dispatch('error', Ou.Error, ...t)
    }
    dispatch(t, e, ...i) {
      this.logLevel >= e && console[t](...i)
    }
  })(),
  Du = (t) =>
    (function (t = '', e) {
      const { valid: i, output: r } = (function (t, e, i) {
        if ('string' != typeof t)
          throw (
            (Lu.debug('Not input string:'),
            Lu.debug(t),
            new Error(
              '[zeroXTransformer] Expected string, input type: ' + typeof t
            ))
          )
        const r = t.match(/^(?:0x)*([a-f0-9]+)$/i)
        return r
          ? { valid: !0, output: r[1] }
          : (Lu.warn('[zeroXTransformer] Input transformation failed.'),
            { valid: !1, output: t })
      })(t)
      return (e && i ? '0x' : '') + r
    })(t, !1),
  Fu = new (class {
    async getEndpoints(t) {
      try {
        const e = await (async function (t) {
          return s(t, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
          })
        })(t)
        return await e.json()
      } catch (t) {
        return Lu.error('Finding the service endpoints failed:', t), null
      }
    }
    getEndpointURL(t, e) {
      return t ? t.find((t) => t.serviceName === e) : null
    }
    async getServiceEndpoints(t, e) {
      const i = []
      for (const r in e.serviceEndpoints)
        i.push({
          serviceName: r,
          method: e.serviceEndpoints[r][0],
          urlPath: t + e.serviceEndpoints[r][1]
        })
      return i
    }
    async getNonce(t, e, i, r, n) {
      r || (r = await this.getEndpoints(t)),
        n || (n = await this.getServiceEndpoints(t, r))
      const a = this.getEndpointURL(n, 'nonce')
        ? this.getEndpointURL(n, 'nonce').urlPath
        : null
      if (!a) return null
      try {
        const t = await s(a + `?userAddress=${e}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: i
        })
        return String((await t.json()).nonce)
      } catch (t) {
        throw (Lu.error(t), new Error('HTTP request failed'))
      }
    }
    async createSignature(t, e, i) {
      const r = await (async function (t, e, i, r) {
        const n = t && t.currentProvider && t.currentProvider.isMetaMask
        try {
          return await t.eth.personal.sign(e, i, void 0)
        } catch (r) {
          if (n) throw r
          Lu.warn('Error on personal sign.'), Lu.warn(r)
          try {
            return await t.eth.sign(e, i)
          } catch (t) {
            throw (
              (Lu.error('Error on sign.'),
              Lu.error(t),
              new Error('Error executing personal sign'))
            )
          }
        }
      })(t, Du(i), e)
      return r
    }
    async createHashSignature(t, e, i) {
      const r = await (async function (t, e, i, r) {
        const n = t.utils.utf8ToHex(e),
          s = t && t.currentProvider && t.currentProvider.isMetaMask
        try {
          return await t.eth.personal.sign(n, i, void 0)
        } catch (e) {
          if (s) throw e
          Lu.warn('Error on personal sign.'), Lu.warn(e)
          try {
            return await t.eth.sign(n, i)
          } catch (t) {
            throw (
              (Lu.error('Error on sign.'),
              Lu.error(t),
              new Error('Error executing personal sign'))
            )
          }
        }
      })(t, i, e)
      return r
    }
    async encrypt(t, e, i) {
      const r = await this.getEndpoints(e),
        n = await this.getServiceEndpoints(e, r),
        a = this.getEndpointURL(n, 'encrypt')
          ? this.getEndpointURL(n, 'encrypt').urlPath
          : null
      if (!a) return null
      try {
        const e = await s(a, {
          method: 'POST',
          body: decodeURI(JSON.stringify(t)),
          headers: { 'Content-Type': 'application/octet-stream' },
          signal: i
        })
        return await e.text()
      } catch (t) {
        throw (Lu.error(t), new Error('HTTP request failed'))
      }
    }
    async checkDidFiles(t, e, i, r) {
      const n = await this.getEndpoints(i),
        a = await this.getServiceEndpoints(i, n),
        o = { did: t, serviceId: e },
        u = [],
        h = this.getEndpointURL(a, 'fileinfo')
          ? this.getEndpointURL(a, 'fileinfo').urlPath
          : null
      if (!h) return null
      try {
        const t = await s(h, {
            method: 'POST',
            body: JSON.stringify(o),
            headers: { 'Content-Type': 'application/json' },
            signal: r
          }),
          e = await t.json()
        for (const t of e) u.push(t)
        return u
      } catch (t) {
        return null
      }
    }
    async checkFileUrl(t, e, i) {
      const r = await this.getEndpoints(e),
        n = await this.getServiceEndpoints(e, r),
        a = { url: t, type: 'url' },
        o = [],
        u = this.getEndpointURL(n, 'fileinfo')
          ? this.getEndpointURL(n, 'fileinfo').urlPath
          : null
      if (!u) return null
      try {
        const t = await s(u, {
            method: 'POST',
            body: JSON.stringify(a),
            headers: { 'Content-Type': 'application/json' },
            signal: i
          }),
          e = await t.json()
        for (const t of e) o.push(t)
        return o
      } catch (t) {
        return null
      }
    }
    async getComputeEnvironments(t, e) {
      var i
      const r = await this.getEndpoints(t),
        n = await this.getServiceEndpoints(t, r),
        a =
          null == (i = this.getEndpointURL(n, 'computeEnvironments'))
            ? void 0
            : i.urlPath
      if (!a) return null
      try {
        const t = await s(a, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: e
        })
        return await t.json()
      } catch (t) {
        return Lu.error(t.message), null
      }
    }
    async initialize(t, e, i, r, n, a, o, u, h) {
      const d = await this.getEndpoints(n),
        l = await this.getServiceEndpoints(n, d)
      let f = this.getEndpointURL(l, 'initialize')
        ? this.getEndpointURL(l, 'initialize').urlPath
        : null
      if (!f) return null
      ;(f += `?documentId=${t}`),
        (f += `&serviceId=${e}`),
        (f += `&fileIndex=${i}`),
        (f += `&consumerAddress=${r}`),
        o && (f += '&userdata=' + encodeURI(JSON.stringify(o))),
        u && (f += '&environment=' + encodeURI(u)),
        h && (f += '&validUntil=' + h)
      try {
        const t = await s(f, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: a
        })
        return await t.json()
      } catch (t) {
        throw (Lu.error(t), new Error('Asset URL not found or not available.'))
      }
    }
    async getDownloadUrl(t, e, i, r, n, s, a, o) {
      const u = await this.getEndpoints(s),
        h = await this.getServiceEndpoints(s, u),
        d = this.getEndpointURL(h, 'download')
          ? this.getEndpointURL(h, 'download').urlPath
          : null
      if (!d) return null
      const l = Date.now()
      let f = d
      return (
        (f += `?fileIndex=${r}`),
        (f += `&documentId=${t}`),
        (f += `&transferTxId=${n}`),
        (f += `&serviceId=${i}`),
        (f += `&consumerAddress=${e}`),
        (f += `&nonce=${l}`),
        (f += `&signature=${await this.createSignature(a, e, t + l)}`),
        o && (f += '&userdata=' + encodeURI(JSON.stringify(o))),
        f
      )
    }
    async computeStart(t, e, i, r, n, a, o, u, h) {
      const d = await this.getEndpoints(t),
        l = await this.getServiceEndpoints(t, d),
        f = this.getEndpointURL(l, 'computeStart')
          ? this.getEndpointURL(l, 'computeStart').urlPath
          : null,
        c = Date.now()
      let p = i
      ;(p += n.documentId), (p += c)
      const m = await this.createHashSignature(e, i, p),
        g = Object()
      if (
        ((g.consumerAddress = i),
        (g.signature = m),
        (g.nonce = c),
        (g.environment = r),
        (g.dataset = n),
        (g.algorithm = a),
        g.additionalDatasets && (g.additionalDatasets = u),
        h && (g.output = h),
        !f)
      )
        return null
      try {
        const t = await s(f, {
          method: 'POST',
          body: JSON.stringify(g),
          headers: { 'Content-Type': 'application/json' },
          signal: o
        })
        return null != t && t.ok
          ? await t.json()
          : (console.error('Compute start failed:', t.status, t.statusText),
            Lu.error('Payload was:', g),
            null)
      } catch (t) {
        return (
          Lu.error('Compute start failed:'),
          Lu.error(t),
          Lu.error('Payload was:', g),
          null
        )
      }
    }
    async computeStop(t, e, i, r, n, a) {
      const o = await this.getEndpoints(r),
        u = await this.getServiceEndpoints(r, o),
        h = this.getEndpointURL(u, 'computeStop')
          ? this.getEndpointURL(u, 'computeStop').urlPath
          : null,
        d = await this.getNonce(r, e, a, o, u)
      let l = e
      ;(l += i || ''), (l += (t && `${Du(t)}`) || ''), (l += d)
      const f = await this.createHashSignature(n, e, l),
        c = Object()
      if (
        ((c.signature = f),
        (c.documentId = Du(t)),
        (c.consumerAddress = e),
        i && (c.jobId = i),
        !h)
      )
        return null
      try {
        const t = await s(h, {
          method: 'PUT',
          body: JSON.stringify(c),
          headers: { 'Content-Type': 'application/json' },
          signal: a
        })
        return null != t && t.ok
          ? await t.json()
          : (Lu.error('Compute stop failed:', t.status, t.statusText),
            Lu.error('Payload was:', c),
            null)
      } catch (t) {
        return (
          Lu.error('Compute stop failed:'),
          Lu.error(t),
          Lu.error('Payload was:', c),
          null
        )
      }
    }
    async computeStatus(t, e, i, r, n) {
      if (!i && !r && !n)
        throw new Error('You need at least one of jobId, did, consumerAddress')
      const a = await this.getEndpoints(t),
        o = await this.getServiceEndpoints(t, a),
        u = this.getEndpointURL(o, 'computeStatus')
          ? this.getEndpointURL(o, 'computeStatus').urlPath
          : null
      let h = '?documentId=' + Du(r)
      if (
        ((h += (n && `&consumerAddress=${n}`) || ''),
        (h += (i && `&jobId=${i}`) || ''),
        !u)
      )
        return null
      try {
        const t = await s(u + h, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: e
        })
        return null != t && t.ok
          ? await t.json()
          : (Lu.error('Get compute status failed:', t.status, t.statusText),
            null)
      } catch (t) {
        return Lu.error('Get compute status failed'), Lu.error(t), null
      }
    }
    async computeResult(t, e, i, r, n, a) {
      const o = await this.getEndpoints(r),
        u = await this.getServiceEndpoints(r, o),
        h = this.getEndpointURL(u, 'computeResult')
          ? this.getEndpointURL(u, 'computeResult').urlPath
          : null,
        d = await this.getNonce(r, i, a, o, u)
      let l = i
      ;(l += t), (l += String(e)), (l += d)
      const f = await this.createHashSignature(n, i, l)
      let c = h
      if (
        ((c += `?consumerAddress=${i}`),
        (c += `&jobId=${t}`),
        (c += `&index=${String(e)}`),
        (c += (f && `&signature=${f}`) || ''),
        !h)
      )
        return null
      try {
        if (!document)
          return await (async function (t, e) {
            const i = await s(t)
            if (!i.ok) throw new Error('Response error.')
            let r
            try {
              r = i.headers
                .get('content-disposition')
                .match(/attachment;filename=(.+)/)[1]
            } catch (i) {
              try {
                r = t.split('/').pop()
              } catch (t) {
                r = `file${e}`
              }
            }
            return { data: await i.arrayBuffer(), filename: r }
          })(c, e)
        await (async function (t) {
          const e = document.createElement('a')
          ;(e.download = ''), (e.href = t), e.click()
        })(c)
      } catch (t) {
        throw (Lu.error('Error getting job result'), Lu.error(t), t)
      }
    }
    async computeDelete(t, e, i, r, n, a) {
      const o = await this.getEndpoints(r),
        u = await this.getServiceEndpoints(r, o),
        h = this.getEndpointURL(u, 'computeDelete')
          ? this.getEndpointURL(u, 'computeDelete').urlPath
          : null,
        d = await this.getNonce(r, e, a, o, u)
      let l = e
      ;(l += i || ''), (l += (t && `${Du(t)}`) || ''), (l += d)
      const f = await this.createHashSignature(n, e, l),
        c = Object()
      if (
        ((c.documentId = Du(t)),
        (c.consumerAddress = e),
        (c.jobId = i),
        f && (c.signature = f),
        !h)
      )
        return null
      try {
        const t = await s(h, {
          method: 'DELETE',
          body: JSON.stringify(c),
          headers: { 'Content-Type': 'application/json' },
          signal: a
        })
        return null != t && t.ok
          ? await t.json()
          : (Lu.error('Delete compute job failed:', t.status, t.statusText),
            Lu.error('Payload was:', c),
            null)
      } catch (t) {
        return (
          Lu.error('Delete compute job failed:'),
          Lu.error(t),
          Lu.error('Payload was:', c),
          null
        )
      }
    }
    async isValidProvider(t, e) {
      try {
        const i = await s(t, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: e
        })
        if (null != i && i.ok) {
          const t = await i.json()
          if (t && t.providerAddress) return !0
        }
        return !1
      } catch (t) {
        return Lu.error(`Error validating provider: ${t.message}`), !1
      }
    }
  })()
class Uu {
  constructor(t, e) {
    ;(this.GASLIMIT_DEFAULT = 1e6),
      (this.web3 = void 0),
      (this.startBlock = void 0),
      (this.web3 = t),
      (this.startBlock = e || 0)
  }
  async generateDidv4(t) {
    return `did:op:${M(t + (1).toString(10)).toString()}`
  }
  async getHash(t) {
    let e = ''
    for (let i = 0; i < t.length; i++) e += '' + t.charCodeAt(i).toString(16)
    return '0x' + e
  }
  async validateAssetAquariusV4(t, e) {
    const i = e || 'https://v4.aquarius.oceanprotocol.com',
      r = JSON.stringify(t),
      n = await E.post(`${i}/api/aquarius/assets/ddo/validate`, r, {
        headers: { 'Content-Type': 'application/octet-stream' }
      })
    if (!n || 200 !== n.status || !n.data)
      return { response: null, validation: {} }
    const { publicKey: s, r: a, s: o, v: u } = n.data
    return {
      response: n.data,
      validation: { validatorAddress: s, r: a[0], s: o[0], v: u }
    }
  }
  async getAssetURL(t, e, i, r) {
    let n
    if ('v4-testing' === i) return 'http://oceanprotocol.com/test'
    try {
      const s = new Ru().getConfig(i, r)
      s.web3Provider = this.web3
      const a = await Tu.getInstance(s)
      n = await a.provider.getAssetURL(t, e, 1)
    } catch (t) {
      console.log('error', t)
    }
    return n
  }
  async getEncryptedFiles(t, e, i, r) {
    const n = [
      { type: 'url', url: await this.getAssetURL(e, i, r), method: 'GET' }
    ]
    try {
      return await Fu.encrypt(n, t)
    } catch (t) {
      console.error('Error parsing json: ' + t.message)
    }
  }
  async estGasPublishFixedRateAsset(
    t,
    e,
    i,
    r,
    n,
    s,
    a,
    o,
    u,
    h,
    d,
    l,
    f,
    c,
    p,
    m
  ) {
    const g = new this.web3.eth.Contract(Pu, i),
      y = this.GASLIMIT_DEFAULT
    let b
    const w = Buffer.from(
      JSON.stringify({ name: r, symbol: n, description: e })
    ).toString('base64')
    try {
      b = await g.methods
        .createNftWithErc20WithFixedRate(
          {
            name: r,
            symbol: n,
            templateIndex: c,
            tokenURI: `data:application/json;base64,${w}`
          },
          {
            strings: [p, m],
            templateIndex: c,
            addresses: [s, s, h, d],
            uints: [a, 0],
            bytess: []
          },
          {
            fixedPriceAddress: l,
            addresses: [f, s, s, h],
            uints: [18, 18, o, u, 0]
          }
        )
        .estimateGas({ from: s }, (t, e) => (t ? y : e))
    } catch (t) {
      console.log('error', t)
    }
    return b
  }
  async publishFixedRateAsset(t, e, i, r, n, s, a, o, u, h, d, l, f, c, p, m) {
    const g = new this.web3.eth.Contract(Pu, i),
      y = await this.estGasPublishFixedRateAsset(
        t,
        e,
        i,
        r,
        n,
        s,
        a,
        o,
        u,
        h,
        d,
        l,
        f,
        c,
        p,
        m
      )
    let b
    const w = Buffer.from(
      JSON.stringify({ name: r, symbol: n, description: e })
    ).toString('base64')
    try {
      b = await g.methods
        .createNftWithErc20WithFixedRate(
          {
            name: r,
            symbol: n,
            templateIndex: c,
            tokenURI: `data:application/json;base64,${w}`
          },
          {
            strings: [p, m],
            templateIndex: c,
            addresses: [s, s, h, d],
            uints: [a, 0],
            bytess: []
          },
          {
            fixedPriceAddress: l,
            addresses: [f, s, s, h],
            uints: [18, 18, o, u, 0]
          }
        )
        .send({ from: s, gas: y + 1, gasPrice: await Nu(this.web3) })
    } catch (t) {
      console.log('error', t)
    }
    return b
  }
  async estGaspublishFreeAsset(t, e, i, r, n, s, a, o, u, h, d, l) {
    const f = new this.web3.eth.Contract(Pu, e),
      c = Buffer.from(
        JSON.stringify({ name: i, symbol: r, description: t })
      ).toString('base64'),
      p = this.GASLIMIT_DEFAULT
    let m
    try {
      m = await f.methods
        .createNftWithErc20WithDispenser(
          {
            name: i,
            symbol: r,
            templateIndex: u,
            tokenURI: `data:application/json;base64,${c}`
          },
          {
            strings: [h, d],
            templateIndex: u,
            addresses: [n, n, a, o],
            uints: [s, 0],
            bytess: []
          },
          l
        )
        .estimateGas({ from: n }, (t, e) => (t ? p : e))
    } catch (t) {
      console.log('error', t)
    }
    return m
  }
  async publishFreeAsset(t, e, i, r, n, s, a, o, u, h, d, l) {
    const f = new this.web3.eth.Contract(Pu, e),
      c = await this.estGaspublishFreeAsset(t, e, i, r, n, s, a, o, u, h, d, l)
    let p
    const m = Buffer.from(
      JSON.stringify({ name: i, symbol: r, description: t })
    ).toString('base64')
    try {
      p = await f.methods
        .createNftWithErc20WithDispenser(
          {
            name: i,
            symbol: r,
            templateIndex: u,
            tokenURI: `data:application/json;base64,${m}`
          },
          {
            strings: [h, d],
            templateIndex: u,
            addresses: [n, n, a, o],
            uints: [s, 0],
            bytess: []
          },
          l
        )
        .send({ from: n, gas: c + 1, gasPrice: await Nu(this.web3) })
    } catch (t) {
      console.log('error', t)
    }
    return p
  }
  async estGasUpdateMetadata(t, e, i, r, n, s, a, o, u) {
    const h = this.GASLIMIT_DEFAULT
    let d
    u || (u = [])
    const l = new this.web3.eth.Contract(
      Cu,
      e.events.NFTCreated.returnValues.newTokenAddress
    )
    try {
      d = await l.methods
        .setMetaData(i, r, n, s, a, o, u)
        .estimateGas({ from: t }, (t, e) => (t ? h : e))
    } catch (t) {
      console.log('error', t)
    }
    return d
  }
  async updateMetadata(t, e, i, r, n, s, a, o, u) {
    u || (u = [])
    const h = new this.web3.eth.Contract(
        Cu,
        e.events.NFTCreated.returnValues.newTokenAddress
      ),
      d = await this.estGasUpdateMetadata(t, e, i, r, n, s, a, o, u)
    let l
    try {
      l = await h.methods
        .setMetaData(i, r, n, s, a, o, u)
        .send({ from: t, gas: d + 1, gasPrice: await Nu(this.web3) })
    } catch (t) {
      console.log('setMetaDataAndTokenURI ERROR', t)
    }
    return l
  }
  async migrateFixedRateAsset(
    t,
    e,
    i,
    r,
    n,
    s,
    a,
    o,
    u,
    h,
    d,
    l,
    f,
    c,
    p,
    m,
    g,
    y,
    b,
    w,
    v,
    M,
    A,
    _
  ) {
    let S
    const T = (await ku(t, y)).service[0].attributes.additionalInformation
      .description
    try {
      S = await this.publishFixedRateAsset(
        t,
        T,
        e,
        i,
        r,
        n,
        a,
        o,
        h,
        d,
        l,
        f,
        c,
        b,
        w,
        v
      )
    } catch (t) {
      console.log('publishFixedRateAsset Error', t)
    }
    const x = S.events.NFTCreated.returnValues.newTokenAddress,
      E = S.events.TokenCreated.returnValues.newTokenAddress,
      k = await this.getEncryptedFiles(g, s, t, M),
      I = await this.generateDidv4(x),
      B = await Bu(t, I, x, E, y, k),
      O = await Fu,
      P = await O.encrypt(B, _ || g),
      C = '0x' + R(JSON.stringify(B)).toString(),
      { validation: N, response: L } = await this.validateAssetAquariusV4(B, A)
    if (0 == (L.hash === C))
      return console.log('Asset is not valid'), new Error('Invalid DDO hash')
    let D
    try {
      D = await this.updateMetadata(n, S, p, _ || g, m, u, P, C, [N])
    } catch (t) {
      console.log('Error', t)
    }
    return { txReceipt: S, txReceipt2: D }
  }
  async migrateFreeAsset(
    t,
    e,
    i,
    r,
    n,
    s,
    a,
    o,
    u,
    h,
    d,
    l,
    f,
    c,
    p,
    m,
    g,
    y,
    b,
    w
  ) {
    let v
    const M = (await ku(t, c)).service[0].attributes.additionalInformation
      .description
    try {
      v = await this.publishFreeAsset(M, e, i, r, n, a, u, h, p, m, g, b)
    } catch (t) {
      console.log('publishFixedRateAsset Error', t)
    }
    const A = v.events.NFTCreated.returnValues.newTokenAddress,
      _ = v.events.TokenCreated.returnValues.newTokenAddress,
      S = await this.getEncryptedFiles(f, s, t, y),
      T = await this.generateDidv4(A),
      x = await Bu(t, T, A, _, c, S),
      E = await Fu,
      k = await E.encrypt(x, f),
      I = '0x' + R(JSON.stringify(x)).toString(),
      { validation: B, response: O } = await this.validateAssetAquariusV4(x, w)
    if (0 == (O.hash === I))
      return console.log('Asset is not valid'), new Error('Invalid DDO hash')
    let P
    try {
      P = await this.updateMetadata(n, v, d, f, l, o, k, I, [B])
    } catch (t) {
      console.log('Error', t)
    }
    return { txReceipt: v, txReceipt2: P }
  }
}
export {
  Uu as Migration,
  Iu as convertDDO,
  Bu as getAndConvertDDO,
  ku as getDDO
}
//# sourceMappingURL=index.module.js.map
