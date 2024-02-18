!(function (e, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define('@ali/aes-tracker/index', [], n)
    : 'object' == typeof exports
    ? (exports.AES = n())
    : (e.AES = n());
})(window, function () {
  return (function (e) {
    var n = {};
    function t(o) {
      if (n[o]) return n[o].exports;
      var r = (n[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
    }
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function (e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o });
      }),
      (t.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (t.t = function (e, n) {
        if ((1 & n && (e = t(e)), 8 & n)) return e;
        if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (t.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
          2 & n && 'string' != typeof e)
        )
          for (var r in e)
            t.d(
              o,
              r,
              function (n) {
                return e[n];
              }.bind(null, r)
            );
        return o;
      }),
      (t.n = function (e) {
        var n =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      }),
      (t.p = ''),
      t((t.s = 3))
    );
  })([
    function (e, n, t) {
      e.exports = t(1);
    },
    function (e, n, t) {
      var o = t(2),
        r = o.JSON || (o.JSON = { stringify: JSON.stringify });
      e.exports = function (e) {
        return r.stringify.apply(r, arguments);
      };
    },
    function (e, n) {
      var t = (e.exports = { version: '2.6.12' });
      'number' == typeof __e && (__e = t);
    },
    function (e, n, t) {
      'use strict';
      t.r(n);
      var o = t(0),
        r = t.n(o),
        i =
          'undefined' != typeof my && !!my && 'function' == typeof my.showToast,
        a =
          'undefined' != typeof wx &&
          !!wx &&
          (void 0 !== wx.login || void 0 !== wx.miniProgram);
      function c(e, n) {
        'function' == typeof requestIdleCallback
          ? requestIdleCallback(e, { timeout: n || 1e3 })
          : setTimeout(e, 0);
      }
      function u(e) {
        return 'undefined' != typeof Promise && e instanceof Promise;
      }
      var f = {},
        d = (function () {
          if (!i || !a) return !1;
          try {
            var e = '';
            try {
              e = navigator ? navigator.userAgent || navigator.swuserAgent : '';
            } catch (e) {}
            if (!e)
              try {
                e = clientInformation ? clientInformation.appVersion : '';
              } catch (e) {}
            var n = !1;
            try {
              n = !!dd;
            } catch (e) {}
            return (
              n ||
              /AliApp\(AP/.test(e) ||
              /AliApp\(DingTalk/.test(e) ||
              /micromessenger/.test(e)
            );
          } catch (e) {
            return !1;
          }
        })()
          ? 5e3
          : 35e3,
        l = [],
        s = [],
        p = function e() {
          var n =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 20,
            t = arguments.length > 1 ? arguments[1] : void 0;
          return (
            (t = t || ''),
            n
              ? e(
                  --n,
                  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.charAt(
                    Math.floor(60 * Math.random())
                  ) + t
                )
              : t
          );
        },
        g = { sdk_version: '1.0.34', pv_id: p() };
      function v() {
        if (l.length) {
          var e = l.join('|');
          if (((d = g.maxUrlLength || d), e.length < d))
            return (l = []), void f.send(m(e));
          for (var n = ''; l.length; ) {
            var t = l[0];
            if (n && (n + '|' + t).length > d) break;
            l.shift(), (n += n ? '|' + t : t);
          }
          f.send(m(n)), l.length && v();
        }
      }
      function y(e, n) {
        !1 === n
          ? c(function () {
              f.send(m(e));
            })
          : (l.push(e), c(v));
      }
      function m(e) {
        var n = ['msg=' + e];
        for (var t in g)
          -1 === t.indexOf('plugin_') &&
            'requiredFields' !== t &&
            'maxUrlLength' !== t &&
            g.hasOwnProperty(t) &&
            (g[t] || 0 === g[t]) &&
            n.push(t + '=' + encodeURIComponent(g[t]));
        return n.join('&');
      }
      function h() {
        return (g.requiredFields || []).concat(['pid']).some(function (e) {
          return void 0 === g[e];
        });
      }
      (f.setConfig = function (e, n) {
        var t = function () {
          if (void 0 !== n) g[e] = n;
          else for (var t in e) g[t] = e[t];
        };
        s.length
          ? (t(),
            h() ||
              (s.forEach(function (e) {
                y.apply(null, e);
              }),
              (s = [])))
          : ((function () {
              if (void 0 !== n) return n !== g[e];
              for (var t in e) if (e[t] !== g[t]) return !0;
              return !1;
            })() && v(),
            t());
      }),
        (f.getConfig = function (e) {
          return e ? g[e] : g;
        }),
        (f.updatePVID = function () {
          f.setConfig('pv_id', p());
        }),
        (f.log = function (e) {
          var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            t =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
          if (e) {
            (n.ts = n.ts || new Date().getTime()), (n.type = e);
            var o = [];
            for (var i in n) {
              var a = n[i],
                c = Object.prototype.toString.call(a);
              ('[object String]' !== c &&
                '[object Number]' !== c &&
                '[object Boolean]' !== c &&
                '[object Object]' !== c &&
                '[object Array]' !== c) ||
                (('[object Object]' !== c && '[object Array]' !== c) ||
                  (a = r()(a)),
                o.push(''.concat(i, '=').concat(encodeURIComponent(a))));
            }
            (n = encodeURIComponent(o.join('&'))),
              h() ? s.push([n, t.combo]) : y(n, t.combo);
          }
        }),
        (f.before = function (e, n) {
          return function () {
            var t = arguments,
              o = n.apply(f, t);
            u(o)
              ? o.then(function (n) {
                  e.apply(f, n || t);
                })
              : e.apply(f, o || t);
          };
        }),
        (f.after = function (e, n) {
          return function () {
            var t = arguments;
            e.apply(f, t), n.apply(f, t);
          };
        });
      var b = f,
        w = -1 !== navigator.userAgent.indexOf('WindVane'),
        _ = [];
      b.setConfig(
        (function () {
          var e = (function () {
              if (window.goldlog && goldlog.spm_ab) return goldlog.spm_ab;
              var e,
                n =
                  document.querySelector('meta[name="spm-id"]') ||
                  document.querySelector('meta[name="data-spm"]');
              if (n && (e = n.content) && -1 !== e.indexOf('.'))
                return e.split('.');
              var t = document.body && document.body.getAttribute('data-spm');
              return e && t ? [e, t] : [];
            })(),
            n = {
              title: document.title,
              spm_a: e[0],
              spm_b: e[1],
              hash: location.hash,
              dpi: window.devicePixelRatio,
              sr: ''
                .concat(window.screen.width, 'x')
                .concat(window.screen.height),
            },
            t = document.querySelector('meta[name="aes-config"]');
          if (t)
            try {
              var o = t.getAttribute('content');
              o &&
                o.split('&').forEach(function (e) {
                  var t = e.split('='),
                    o = t[0],
                    r = decodeURIComponent(t[1]);
                  if (-1 !== o.indexOf('.')) {
                    var i = o.split('.')[0],
                      a = o.split('.')[1];
                    n[i] || (n[i] = {}), (n[i][a] = r);
                  } else n[o] = r;
                });
            } catch (e) {}
          for (var r in window.AES_CONFIG) n[r] = AES_CONFIG[r];
          return n;
        })()
      ),
        window.addEventListener('hashchange', function () {
          b.setConfig('hash', location.hash);
        });
      var x =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      if (x) {
        var S = function () {
          b.setConfig({ downlink: x.downlink, net_type: x.effectiveType }),
            navigator.onLine &&
              _.length &&
              (_.forEach(function (e) {
                c(function () {
                  b.send(e);
                });
              }),
              (_ = []));
        };
        S(), x.addEventListener('change', S);
      }
      try {
        var O = function () {
          var e = document.querySelector('title');
          e &&
            new MutationObserver(function () {
              b.setConfig('title', document.title);
            }).observe(e, { childList: !0, characterData: !0, subtree: !0 });
        };
        document.querySelector('title')
          ? O()
          : document.addEventListener('DOMContentLoaded', O);
      } catch (e) {}
      (b.log = b.before(b.log, function () {
        var e;
        if (window.goldlog) {
          var n = goldlog.spm_ab;
          n &&
            (b.getConfig('spm_a') !== n[0] && ((e || (e = {})).spm_a = n[0]),
            b.getConfig('spm_b') !== n[1] && ((e || (e = {})).spm_b = n[1]));
        }
        var t = (function () {
          try {
            if (window.xr) {
              var e = Array.from(xr.global.recordingContexts.keys());
              if (e.length > 0) {
                var n = xr.global.recordingContexts.get(e[0]);
                if (n.appKey && n.recordingId && n.isRecording)
                  return { appKey: n.appKey, recordingId: n.recordingId };
              }
            }
          } catch (e) {}
        })();
        if (t) {
          var o = t.appKey + ',' + t.recordingId;
          b.getConfig('xreplay_id') !== o && ((e || (e = {})).xreplay_id = o);
        }
        e && b.setConfig(e);
      })),
        (b.send = function (e) {
          var n = window.goldlog && 'function' == typeof goldlog.record;
          if (navigator.onLine || (w && n)) {
            var t,
              o = [
                '/aes.1.1',
                'EXP',
                e,
                window.AES_DISABLE_POST ? 'GET' : 'POST',
              ];
            if (n) (t = goldlog).record.apply(t, o);
            else
              window.goldlog_queue || (window.goldlog_queue = []),
                goldlog_queue.push({ action: 'goldlog.record', arguments: o });
          } else _.length > 500 && _.shift(), _.push(e);
        });
      ['AES_QUEUE', 'AES_QUENE'].forEach(function (e) {
        '[object Array]' === Object.prototype.toString.call(window[e])
          ? window[e].forEach(function (e) {
              'function' == typeof e ? e(b) : b[e.action].apply(b, e.arguments);
            })
          : (window[e] = []),
          (window[e].push = function (e) {
            'function' == typeof e ? e(b) : b[e.action].apply(b, e.arguments);
          });
      });
      n.default = b;
    },
  ]).default;
});
!(function (e, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n(require('@ali/aes-tracker')))
    : 'function' == typeof define && define.amd
    ? define('@ali/aes-tracker-plugin-pv/index', ['@ali/aes-tracker/index'], n)
    : 'object' == typeof exports
    ? (exports.AESPluginPV = n(require('@ali/aes-tracker')))
    : (e.AESPluginPV = n(e.AES));
})(window, function (e) {
  return (function (e) {
    var n = {};
    function t(o) {
      if (n[o]) return n[o].exports;
      var r = (n[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
    }
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function (e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o });
      }),
      (t.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (t.t = function (e, n) {
        if ((1 & n && (e = t(e)), 8 & n)) return e;
        if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (t.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
          2 & n && 'string' != typeof e)
        )
          for (var r in e)
            t.d(
              o,
              r,
              function (n) {
                return e[n];
              }.bind(null, r)
            );
        return o;
      }),
      (t.n = function (e) {
        var n =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      }),
      (t.p = ''),
      t((t.s = 1))
    );
  })([
    function (n, t) {
      n.exports = e;
    },
    function (e, n, t) {
      'use strict';
      t.r(n),
        t.d(n, 'sendPV', function () {
          return m;
        }),
        t.d(n, 'switchPage', function () {
          return x;
        }),
        t.d(n, 'clearAutoPV', function () {
          return j;
        }),
        t.d(n, 'clearAutoSend', function () {
          return j;
        }),
        t.d(n, 'sendLeave', function () {
          return P;
        }),
        t.d(n, 'clearAutoLeave', function () {
          return A;
        });
      var o,
        r = t(0),
        i = t.n(r);
      var u,
        a,
        c,
        l,
        d = i.a.getConfig('plugin_pv') || {},
        f = d.autoPV,
        s = void 0 === f || f,
        p = d.autoLeave,
        v = void 0 === p || p,
        y = d.enableHistory,
        h = d.enableHash,
        w = function (e, n) {
          if (e) {
            var t = n || 500;
            return e.length > t ? e.slice(0, t - 3) + '...' : e;
          }
        },
        b = null === (o = document) || void 0 === o ? void 0 : o.referrer,
        g = function () {
          return { p1: window.parent !== window, p2: w(b) };
        },
        P = function () {
          try {
            i.a.log('leave', g());
          } catch (e) {}
        },
        S = !0;
      function m() {
        S ? (S = !1) : i.a.updatePVID && i.a.updatePVID(),
          (function () {
            try {
              i.a.log('pv', g());
            } catch (e) {}
          })(),
          (b = location.href);
      }
      function x(e) {
        try {
          e && i.a.setConfig(e), m();
        } catch (e) {}
      }
      function j() {
        u && (clearTimeout(u), (u = null));
      }
      (s &&
        (u = setTimeout(function () {
          m();
        }, 10)),
      y && s
        ? (function (e) {
            var n, t, o, r;
            window.addEventListener('popstate', function (n) {
              e(n.state);
            });
            var i =
              null === (n = window) ||
              void 0 === n ||
              null === (t = n.history) ||
              void 0 === t
                ? void 0
                : t.pushState;
            i &&
              (history.pushState = function (n) {
                i.apply(this, arguments), e(n);
              });
            var u =
              null === (o = window) ||
              void 0 === o ||
              null === (r = o.history) ||
              void 0 === r
                ? void 0
                : r.replaceState;
            u &&
              (history.replaceState = function (n) {
                u.apply(this, arguments), e(n);
              });
          })(function (e) {
            m();
          })
        : h &&
          s &&
          ((a = m),
          window.addEventListener('hashchange', function () {
            a({ page_id: location.hash || '#' });
          })),
      v) &&
        ((c = function () {
          P();
        }),
        null === (l = window) ||
          void 0 === l ||
          l.addEventListener('beforeunload', c));
      function A() {
        c && (window.removeEventListener('beforeunload', c), (c = null));
      }
      n.default = {
        sendPV: m,
        switchPage: x,
        clearAutoPV: j,
        clearAutoSend: j,
        sendLeave: P,
        clearAutoLeave: A,
      };
    },
  ]).default;
});
!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('@ali/aes-tracker')))
    : 'function' == typeof define && define.amd
    ? define(
        '@ali/aes-tracker-plugin-event/index',
        ['@ali/aes-tracker/index'],
        t
      )
    : 'object' == typeof exports
    ? (exports.AESPluginEvent = t(require('@ali/aes-tracker')))
    : (e.AESPluginEvent = t(e.AES));
})(window, function (e) {
  return (function (e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var o = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var o in e)
            n.d(
              r,
              o,
              function (t) {
                return e[t];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 1))
    );
  })([
    function (t, n) {
      t.exports = e;
    },
    function (e, t, n) {
      'use strict';
      n.r(t);
      var r = n(0),
        o = ['ec', 'ea', 'el', 'et'];
      var l,
        u = function (e, t) {
          var n = function (e) {
            var n = e.ec,
              r = e.ea,
              o = e.el,
              l = e.et,
              u = void 0 === l ? 'CLK' : l,
              i = e.xpath;
            delete e.ec,
              delete e.ea,
              delete e.el,
              delete e.et,
              delete e.xpath,
              (e.p1 = n),
              (e.p2 = r),
              (e.p3 = o),
              (e.p4 = u),
              (e.p5 = i);
            try {
              t.log('event', e);
            } catch (e) {}
          };
          return function () {
            var t = arguments,
              r = {};
            if (0 !== t.length) {
              for (var l = 0; l < t.length; l++) {
                var u,
                  i,
                  a = t[l];
                if (0 !== l && 'object' == typeof a && l !== t.length - 1)
                  return void (
                    null == e ||
                    null === (u = e.console) ||
                    void 0 === u ||
                    null === (i = u.warn) ||
                    void 0 === i ||
                    i.call(
                      u,
                      '[AES tracker-plugin-event]',
                      'Only the last argument can be object type'
                    )
                  );
                if ('string' == typeof a || 'number' == typeof a) r[o[l]] = a;
                else if ('object' == typeof a && l === t.length - 1)
                  for (var c in a) a.hasOwnProperty(c) && (r[c] = a[c]);
              }
              n(r);
            } else {
              var f, p;
              null === (f = e.console) ||
                void 0 === f ||
                null === (p = f.warn) ||
                void 0 === p ||
                p.call(
                  f,
                  '[AES tracker-plugin-event]',
                  'At lease one augument'
                );
            }
          };
        },
        i = ((l = window), u(l, n.n(r).a));
      t.default = i;
    },
  ]).default;
});
!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('@ali/aes-tracker')))
    : 'function' == typeof define && define.amd
    ? define(
        '@ali/aes-tracker-plugin-jserror/index',
        ['@ali/aes-tracker/index'],
        t
      )
    : 'object' == typeof exports
    ? (exports.AESPluginJSError = t(require('@ali/aes-tracker')))
    : (e.AESPluginJSError = t(e.AES));
})(window, function (e) {
  return (function (e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var o = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var o in e)
            n.d(
              r,
              o,
              function (t) {
                return e[t];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 4))
    );
  })([
    function (t, n) {
      t.exports = e;
    },
    function (e, t, n) {
      e.exports = n(2);
    },
    function (e, t, n) {
      var r = n(3),
        o = r.JSON || (r.JSON = { stringify: JSON.stringify });
      e.exports = function (e) {
        return o.stringify.apply(o, arguments);
      };
    },
    function (e, t) {
      var n = (e.exports = { version: '2.6.12' });
      'number' == typeof __e && (__e = n);
    },
    function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, 'sendError', function () {
          return _;
        });
      var r = n(0),
        o = n.n(r),
        i = {
          noop: function () {},
          win: 'object' == typeof window && window.document ? window : void 0,
          T: function (e, t) {
            var n = Object.prototype.toString
              .call(e)
              .substring(8)
              .replace(']', '');
            return t ? n === t : n;
          },
          on: function (e, t, n, r, o) {
            return (
              e.addEventListener
                ? ((o = o || !1),
                  e.addEventListener(
                    t,
                    function i(c) {
                      r && e.removeEventListener(t, i, o), n.call(this, c);
                    },
                    o
                  ))
                : e.attachEvent &&
                  e.attachEvent('on' + t, function o(i) {
                    r && e.detachEvent('on' + t, o), n.call(this, i);
                  }),
              this
            );
          },
          off: function (e, t, n) {
            return n
              ? (e.removeEventListener
                  ? e.removeEventListener(t, n)
                  : e.detachEvent && e.detachEvent(t, n),
                this)
              : this;
          },
        },
        c = n(1),
        s = n.n(c),
        u = {};
      function f(e) {
        if (void 0 !== typeof e) return u[e];
      }
      function a(e) {
        return e ? (e.length < 1001 ? e : e.substr(0, 997) + '...') : '';
      }
      function l(e) {
        if (!e || 'string' != typeof e) return '';
        try {
          var t = e
            .split('\n')
            .slice(1)
            .map(function (e) {
              return e.replace(/^\s+at\s+/, '');
            })
            .filter(function (e) {
              return !!e;
            });
          if (t.join('^').length <= 2e3) return t.join('^');
          for (var n = !1; t.join('^').length > 2e3; )
            if (2 === t.length) t.splice(1, 1), (n = !0);
            else if (1 === t.length) {
              var r = t[0];
              t[0] = ''
                .concat(r.substr(0, 997), '...')
                .concat(r.substr(-1e3, 1e3));
            } else t.splice(t.length - 2), (n = !0);
          if (t.length > 1 && n) {
            var o = t.pop();
            return t.join('^') + '^...^' + o;
          }
          return 1 === t.length && n ? t[0] + '^...' : t.join('^');
        } catch (e) {
          return '';
        }
      }
      function p(e) {
        if ('string' == typeof e.message) {
          var t = e.message.match(/Uncaught (\w+):/);
          if (t && t[1]) return t[1];
        }
        return e.error_type
          ? e.error_type
          : e.name
          ? e.name
          : e.constructor.name;
      }
      var d = function (e) {
        if ('object' == typeof e) {
          var t = f('AES'),
            n = e.message,
            r = void 0 === n ? '' : n,
            o = e.filename,
            i = e.lineno,
            c = e.colno,
            s = e.stack,
            u = e.error_code,
            d = void 0 === u ? '' : u,
            g = e.error,
            y = (t.getConfig('plugin_jserror') || {}).ignoreList;
          (y &&
            y.some(function (t) {
              if ('string' == typeof t) return t === r;
              if ('function' == typeof t)
                try {
                  return t(r, e);
                } catch (e) {}
              else if (t instanceof RegExp) return t.test(r);
            })) ||
            t.log('js_error', {
              message: r,
              url: a(o),
              lineno: i,
              colno: c,
              stack: l((g && g.stack) || s),
              error_type: p(e),
              error_code: d,
            });
        }
      };
      function g(e, t, n, r, o) {
        try {
          if ('string' == typeof e)
            return void d({
              message: e,
              filename: t,
              lineno: n,
              colno: r,
              error: o,
            });
          d(e);
        } catch (e) {}
      }
      function y(e) {
        if (e)
          try {
            var t = '',
              n = 0,
              r = 0,
              o = '',
              i = '',
              c = 'string' == typeof e ? e : e.reason,
              u = f('AES').getConfig(
                'plugin_js_error_processPromiseRejectReason'
              );
            if (
              'function' == typeof u &&
              (!1 === (c = u(c)) || void 0 === c || '' === c || null === c)
            )
              return;
            'string' == typeof e.message && (t = e.message),
              'string' == typeof c
                ? (t = c)
                : 'object' == typeof c && (t = c.message);
            try {
              t || (t = 'object' == typeof c ? s()(c).substr(0, 150) : t);
            } catch (e) {}
            if ('object' == typeof c) {
              if ('number' == typeof c.column) (r = c.column), (n = c.line);
              else if (c.stack) {
                (a = c.stack.match(/at\s+.+:(\d+):(\d+)/)) &&
                  ((n = a[1]), (r = a[2]));
              }
              if (c.sourceURL) o = c.sourceURL;
              else if (c.stack) {
                var a;
                (a = c.stack.match(/at\s+(.+):\d+:\d+/)) && (o = a[1]);
              }
              c.stack && (i = c.stack);
            }
            d({
              message: t,
              filename: o,
              lineno: n,
              colno: r,
              stack: i,
              error_type: e.constructor.name,
            });
          } catch (e) {}
      }
      var v,
        m,
        j = function (e) {
          'undefined' != typeof PromiseRejectionEvent &&
          e instanceof PromiseRejectionEvent
            ? y(e)
            : g.apply(null, arguments);
        },
        b = g,
        h = y;
      (v = 'AES'), (m = o.a), void 0 !== typeof v && (u[v] = m);
      var E,
        _ = j,
        w = b,
        S = h;
      (E = o.a.getConfig('plugin_jserror') || {}),
        window &&
          !window.AESPluginJsError &&
          (i.on(window, 'error', w),
          !E.disable_unhandled_rejection &&
            i.on(window, 'unhandledrejection', S));
      t.default = { sendError: _ };
    },
  ]).default;
});
!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('@ali/aes-tracker')))
    : 'function' == typeof define && define.amd
    ? define('@ali/aes-tracker-plugin-api/index', ['@ali/aes-tracker/index'], t)
    : 'object' == typeof exports
    ? (exports.AESPluginAPI = t(require('@ali/aes-tracker')))
    : (e.AESPluginAPI = t(e.AES));
})(window, function (e) {
  return (function (e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var o = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var o in e)
            n.d(
              r,
              o,
              function (t) {
                return e[t];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 22))
    );
  })([
    function (t, n) {
      t.exports = e;
    },
    function (e, t, n) {
      e.exports = !n(7)(function () {
        return (
          7 !=
          Object.defineProperty({}, 'a', {
            get: function () {
              return 7;
            },
          }).a
        );
      });
    },
    function (e, t) {
      var n = (e.exports = { version: '2.6.12' });
      'number' == typeof __e && (__e = n);
    },
    function (e, t) {
      e.exports = function (e) {
        return 'object' == typeof e ? null !== e : 'function' == typeof e;
      };
    },
    function (e, t, n) {
      e.exports = n(10);
    },
    function (e, t) {
      var n = (e.exports =
        'undefined' != typeof window && window.Math == Math
          ? window
          : 'undefined' != typeof self && self.Math == Math
          ? self
          : Function('return this')());
      'number' == typeof __g && (__g = n);
    },
    function (e, t, n) {
      var r = n(16),
        o = n(17),
        i = n(19),
        a = Object.defineProperty;
      t.f = n(1)
        ? Object.defineProperty
        : function (e, t, n) {
            if ((r(e), (t = i(t, !0)), r(n), o))
              try {
                return a(e, t, n);
              } catch (e) {}
            if ('get' in n || 'set' in n)
              throw TypeError('Accessors not supported!');
            return 'value' in n && (e[t] = n.value), e;
          };
    },
    function (e, t) {
      e.exports = function (e) {
        try {
          return !!e();
        } catch (e) {
          return !0;
        }
      };
    },
    function (e, t, n) {
      e.exports = n(9);
    },
    function (e, t, n) {
      var r = n(2),
        o = r.JSON || (r.JSON = { stringify: JSON.stringify });
      e.exports = function (e) {
        return o.stringify.apply(o, arguments);
      };
    },
    function (e, t, n) {
      n(11);
      var r = n(2).Object;
      e.exports = function (e, t, n) {
        return r.defineProperty(e, t, n);
      };
    },
    function (e, t, n) {
      var r = n(12);
      r(r.S + r.F * !n(1), 'Object', { defineProperty: n(6).f });
    },
    function (e, t, n) {
      var r = n(5),
        o = n(2),
        i = n(13),
        a = n(15),
        s = n(21),
        c = function (e, t, n) {
          var u,
            f,
            p,
            d = e & c.F,
            l = e & c.G,
            y = e & c.S,
            h = e & c.P,
            g = e & c.B,
            v = e & c.W,
            m = l ? o : o[t] || (o[t] = {}),
            w = m.prototype,
            b = l ? r : y ? r[t] : (r[t] || {}).prototype;
          for (u in (l && (n = t), n))
            ((f = !d && b && void 0 !== b[u]) && s(m, u)) ||
              ((p = f ? b[u] : n[u]),
              (m[u] =
                l && 'function' != typeof b[u]
                  ? n[u]
                  : g && f
                  ? i(p, r)
                  : v && b[u] == p
                  ? (function (e) {
                      var t = function (t, n, r) {
                        if (this instanceof e) {
                          switch (arguments.length) {
                            case 0:
                              return new e();
                            case 1:
                              return new e(t);
                            case 2:
                              return new e(t, n);
                          }
                          return new e(t, n, r);
                        }
                        return e.apply(this, arguments);
                      };
                      return (t.prototype = e.prototype), t;
                    })(p)
                  : h && 'function' == typeof p
                  ? i(Function.call, p)
                  : p),
              h &&
                (((m.virtual || (m.virtual = {}))[u] = p),
                e & c.R && w && !w[u] && a(w, u, p)));
        };
      (c.F = 1),
        (c.G = 2),
        (c.S = 4),
        (c.P = 8),
        (c.B = 16),
        (c.W = 32),
        (c.U = 64),
        (c.R = 128),
        (e.exports = c);
    },
    function (e, t, n) {
      var r = n(14);
      e.exports = function (e, t, n) {
        if ((r(e), void 0 === t)) return e;
        switch (n) {
          case 1:
            return function (n) {
              return e.call(t, n);
            };
          case 2:
            return function (n, r) {
              return e.call(t, n, r);
            };
          case 3:
            return function (n, r, o) {
              return e.call(t, n, r, o);
            };
        }
        return function () {
          return e.apply(t, arguments);
        };
      };
    },
    function (e, t) {
      e.exports = function (e) {
        if ('function' != typeof e) throw TypeError(e + ' is not a function!');
        return e;
      };
    },
    function (e, t, n) {
      var r = n(6),
        o = n(20);
      e.exports = n(1)
        ? function (e, t, n) {
            return r.f(e, t, o(1, n));
          }
        : function (e, t, n) {
            return (e[t] = n), e;
          };
    },
    function (e, t, n) {
      var r = n(3);
      e.exports = function (e) {
        if (!r(e)) throw TypeError(e + ' is not an object!');
        return e;
      };
    },
    function (e, t, n) {
      e.exports =
        !n(1) &&
        !n(7)(function () {
          return (
            7 !=
            Object.defineProperty(n(18)('div'), 'a', {
              get: function () {
                return 7;
              },
            }).a
          );
        });
    },
    function (e, t, n) {
      var r = n(3),
        o = n(5).document,
        i = r(o) && r(o.createElement);
      e.exports = function (e) {
        return i ? o.createElement(e) : {};
      };
    },
    function (e, t, n) {
      var r = n(3);
      e.exports = function (e, t) {
        if (!r(e)) return e;
        var n, o;
        if (t && 'function' == typeof (n = e.toString) && !r((o = n.call(e))))
          return o;
        if ('function' == typeof (n = e.valueOf) && !r((o = n.call(e))))
          return o;
        if (!t && 'function' == typeof (n = e.toString) && !r((o = n.call(e))))
          return o;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function (e, t) {
      e.exports = function (e, t) {
        return {
          enumerable: !(1 & e),
          configurable: !(2 & e),
          writable: !(4 & e),
          value: t,
        };
      };
    },
    function (e, t) {
      var n = {}.hasOwnProperty;
      e.exports = function (e, t) {
        return n.call(e, t);
      };
    },
    function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, 'sendApi', function () {
          return s;
        });
      var r = n(0),
        o = n.n(r);
      function i(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
      }
      function a(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3;
        if ('string' == typeof e)
          return e.length > t && (e = e.substr(0, t - 3) + '...'), e;
      }
      var s = function (e) {
        var t = e.url,
          n = e.success,
          r = e.msg,
          i = e.status,
          s = e.code,
          c = e.duration,
          u = e.traceId,
          f = e.params,
          p = e.body,
          d = e.response,
          l = e.headers,
          y = e.rtype,
          h = e.method,
          g = o.a.getConfig('plugin_api') || {},
          v = g.ignoreList,
          m = g.sendResponseOnSuccess;
        if (
          !v ||
          !v.some(function (n) {
            if ('string' == typeof n) return n === t;
            if ('function' == typeof n)
              try {
                return n(t, e);
              } catch (e) {}
            else if (n instanceof RegExp) return n.test(t);
          })
        ) {
          var w = (function () {
            if (!('object' == typeof my)) return !1;
            try {
              var e = '';
              try {
                e = navigator
                  ? navigator.userAgent || navigator.swuserAgent
                  : '';
              } catch (e) {}
              if (!e)
                try {
                  e = clientInformation ? clientInformation.appVersion : '';
                } catch (e) {}
              var t = !1;
              try {
                t = !!dd;
              } catch (e) {}
              return (
                t ||
                /AliApp\(AP/.test(e) ||
                /AliApp\(DingTalk/.test(e) ||
                /micromessenger/.test(e)
              );
            } catch (e) {
              return !1;
            }
          })();
          o.a.log('api', {
            url: t,
            method: 'string' == typeof h ? h.toUpperCase() : void 0,
            success: n,
            msg: r,
            status: i,
            code: s,
            duration: c,
            trace_id: u,
            params: f,
            body: a(p, w ? 2e3 : 1e4),
            response: !n || m ? a(d, w ? 1e3 : 1e4) : void 0,
            headers: l,
            rtype: y,
          });
        }
      };
      function c(e, t) {
        return (
          (void 0 === t || (t >= 200 && t < 300)) &&
          (void 0 !== e.success
            ? !0 === e.success || 'true' === e.success
            : void 0 !== e.isSuccess
            ? !0 === e.isSuccess || 'true' === e.isSuccess
            : void 0 !== e.isOk
            ? !0 === e.isOk || 'true' === e.isOk
            : void 0 !== e.ok
            ? !0 === e.ok || 'true' === e.ok
            : isNaN(e.status)
            ? !!isNaN(e.code) || 200 == e.code
            : 200 == e.status)
        );
      }
      function u(e) {
        return e.code;
      }
      function f(e) {
        var t = e.msg || e.message || e.errMsg || e.errorMessage || e.errorMsg;
        return t && t.length > 50 && (t = t.substring(1, 50)), t;
      }
      function p(e, t) {
        if (((t = t.toUpperCase()), e && ('POST' === t || 'PUT' === t))) {
          if ('string' == typeof e) return e;
          if (window.FormData && e instanceof FormData) {
            var n = [];
            return (
              e.forEach(function (e, t) {
                n.push(
                  ''
                    .concat(t, '=')
                    .concat(
                      'string' == typeof e
                        ? e
                        : Object.prototype.toString.call(e)
                    )
                );
              }),
              n.join('&')
            );
          }
          return window.URLSearchParams && e instanceof URLSearchParams
            ? e.toString()
            : window.Request && e instanceof Request
            ? e.clone().text()
            : Object.prototype.toString.call(e);
        }
      }
      function d(e, t, n) {
        var r,
          i = e;
        if ('string' == typeof i)
          try {
            i = JSON.parse(e);
          } catch (e) {}
        r =
          '[object Object]' === Object.prototype.toString.call(i)
            ? { msg: f(i), code: u(i), success: c(i, t) }
            : { success: void 0 === t || (t >= 200 && t < 300) };
        var a = o.a.getConfig('plugin_api') || {};
        if ('function' == typeof a.parseResponse)
          try {
            var s = a.parseResponse(i, t, n) || {};
            for (var p in s) r[p] = s[p];
          } catch (e) {}
        return r;
      }
      function l(e) {
        return (
          !e ||
          (-1 !== e.indexOf('api=') &&
            -1 !== e.indexOf('v=') &&
            -1 !== e.indexOf('jsv=')) ||
          -1 !== e.indexOf('.mmstat.com=') ||
          e.match(/\.(js|css|png|jpg|gif|jpeg|webp|ico|svg)(\?.*)?$/)
        );
      }
      function y(e) {
        return 'undefined' != typeof Promise && e instanceof Promise;
      }
      function h(e) {
        if (window.Headers && e instanceof Headers) {
          var t = {};
          return (
            e.forEach(function (e, n) {
              t[n] = e;
            }),
            t
          );
        }
      }
      function g(e, t) {
        if (t.originResponse) return e;
        if ('jsonp' === t.method) return e.text();
        var n =
          e.headers && e.headers.get ? e.headers.get('content-type') : null;
        return n &&
          -1 === n.toLowerCase().indexOf('json') &&
          -1 === n.toLowerCase().indexOf('text')
          ? '['.concat(n, ']')
          : e.text();
      }
      var v = function () {
        if (
          !(
            'function' != typeof window.fetch ||
            (window.fetch && window.fetch.polyfill)
          )
        ) {
          var e = window.fetch;
          window.fetch = function (t) {
            var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              r = o.a.getConfig('plugin_api') || {};
            if ('HEAD' === n.method || 'no-cors' === n.mode)
              return e.apply(window, arguments);
            var a = 'object' == typeof t ? t.url || t.href : t;
            if (l(a)) return e.apply(window, arguments);
            var c,
              u,
              f = a.split('?'),
              v = f[0],
              m = f[1],
              w = n.method || t.method || 'GET';
            try {
              u = h(n.headers || t.headers);
            } catch (e) {}
            try {
              y((c = p(n.body || t, w))) &&
                c.then(function (e) {
                  c = e;
                });
            } catch (e) {}
            var b = new Date().getTime();
            return e.apply(window, arguments).then(
              function (e) {
                try {
                  if ('[object Response]' !== Object.prototype.toString.call(e))
                    return e;
                  var t,
                    o = new Date().getTime() - b,
                    a = e.clone ? e.clone() : e,
                    f = a.status;
                  a.headers.has('eagleeye-traceid')
                    ? (t = a.headers.get('eagleeye-traceid'))
                    : a.headers.has('x-eagleeye-id') &&
                      (t = a.headers.get('x-eagleeye-id'));
                  var p = function (e) {
                      (!1 !==
                        (a = d(e, f, {
                          type: 'fetch',
                          params: m,
                          url: v,
                          body: n.body,
                        })).success &&
                        r.disable_send_on_success) ||
                        s(
                          i(
                            {
                              url: v,
                              method: w,
                              status: f,
                              duration: o,
                              traceId: t,
                              params: m,
                              headers: u,
                              body: c,
                              response: e,
                              rtype: 'fetch',
                            },
                            a
                          )
                        );
                    },
                    l = g(a, n);
                  y(l) ? l.then(p) : p(l);
                } catch (e) {}
                return e;
              },
              function (e) {
                var t = new Date().getTime() - b,
                  n = d('', -1, { type: 'fetch', params: m, url: v });
                throw (
                  (s(
                    i(
                      {
                        url: v,
                        method: w,
                        success: !1,
                        msg: e.message,
                        status: -1,
                        duration: t,
                        params: m,
                        body: c,
                        headers: u,
                        rtype: 'fetch',
                      },
                      n
                    )
                  ),
                  e)
                );
              }
            );
          };
        }
      };
      var m = function () {
          if (
            'function' == typeof window.XMLHttpRequest &&
            window.addEventListener
          ) {
            var e = window.XMLHttpRequest,
              t = e.prototype,
              n = t.open,
              r = t.send,
              a = t.setRequestHeader;
            (e.prototype.open = function (e, t) {
              n.apply(this, arguments), (this._aesHook = { method: e, url: t });
            }),
              (e.prototype.setRequestHeader = function (e, t) {
                a.apply(this, arguments),
                  this._aesHook.headers || (this._aesHook.headers = {}),
                  (this._aesHook.headers[e] = t);
              }),
              (e.prototype.send = function (e) {
                r.apply(this, arguments);
                try {
                  var t = this._aesHook,
                    n = t.url,
                    a = t.method,
                    c = void 0 === a ? 'GET' : a,
                    u = t.headers;
                  delete this._aesHook;
                  var f = n ? n.href || n : '';
                  if (l(f)) return;
                  var y,
                    h = f.split('?'),
                    g = this,
                    v = 0,
                    m = h[1],
                    w = new Date().getTime();
                  n = h[0];
                  try {
                    y = p(e, c);
                  } catch (e) {}
                  var b = function () {
                    v = g.status || v;
                    var t,
                      r = new Date().getTime() - w;
                    try {
                      var a = g.getAllResponseHeaders();
                      -1 !== a.indexOf('eagleeye-traceid')
                        ? (t = g.getResponseHeader('eagleeye-traceid'))
                        : -1 !== a.indexOf('x-eagleeye-id') &&
                          (t = g.getResponseHeader('x-eagleeye-id'));
                    } catch (e) {}
                    var f,
                      p = g.responseType || 'text';
                    'text' === p || 'json' === p
                      ? (f = g.response)
                      : g.response &&
                        (f = Object.prototype.toString.call(g.response));
                    var l = d(f || '', v, {
                        type: 'xhr',
                        params: m,
                        url: n,
                        body: e,
                      }),
                      h = o.a.getConfig('plugin_api') || {};
                    (l.success && h.disable_send_on_success) ||
                      s(
                        i(
                          {
                            url: n,
                            method: c,
                            status: v,
                            duration: r,
                            traceId: t,
                            params: m,
                            headers: u,
                            body: y,
                            response: f,
                            rtype: 'xhr',
                          },
                          l
                        )
                      );
                  };
                  void 0 !== g.onloadend
                    ? (g.addEventListener('abort', function (e) {
                        v = -2;
                      }),
                      g.addEventListener('timeout', function (e) {
                        v = -3;
                      }),
                      g.addEventListener('loadend', b))
                    : g.addEventListener('readystatechange', function () {
                        4 === g.readyState && b();
                      });
                } catch (e) {}
              });
          }
        },
        w = n(8),
        b = n.n(w),
        x = n(4),
        _ = n.n(x);
      var O = {
        hookFetch: v,
        hookXHR: m,
        hookMtop: function () {
          function e(e) {
            var t = this.options,
              n = this.params,
              r = new Date().getTime();
            return e().then(function () {
              var e = t.retJson.ret,
                a = new Date().getTime() - r;
              e instanceof Array && (e = e.join(','));
              var c = o.a.getConfig('plugin_api') || {},
                u = {};
              if ('function' == typeof c.parseResponse)
                try {
                  u =
                    c.parseResponse(t.retJson, '', {
                      type: 'mtop',
                      params: n.data,
                      url: n.api,
                    }) || {};
                } catch (e) {}
              var f =
                void 0 === u.success ? -1 === e.indexOf('SUCCESS') : !u.success;
              if (f || !c.disable_send_on_success) {
                var p,
                  d,
                  l,
                  y = t.retJson.code || 200,
                  h = t.retJson.responseHeaders;
                if ('string' == typeof h) {
                  var g = h.match(
                    /(x-eagleeye-id|eagleeye-traceid):\s*([a-z0-9]+)/
                  );
                  g && (p = g[2]);
                  var v = h.match(/status:\s*(\d+)/);
                  v && (y = v[1]);
                }
                if (e) {
                  var m = e.split('::');
                  (d = m[0]), (l = m[1]);
                }
                s(
                  i(
                    {
                      url: n.api,
                      success: !f,
                      method: n.type || 'GET',
                      msg: l,
                      status: y,
                      code: d,
                      duration: a,
                      traceId: p,
                      params: n.data,
                      response: b()(t.retJson),
                      rtype: 'mtop',
                    },
                    u
                  )
                );
              }
            });
          }
          var t;
          window.lib || (window.lib = {}),
            lib.mtop
              ? lib.mtop.middlewares && lib.mtop.middlewares.push(e)
              : _()(lib, 'mtop', {
                  configurable: !0,
                  set: function (n) {
                    var r;
                    (t = n).middlewares
                      ? -1 === t.middlewares.indexOf(e) && t.middlewares.push(e)
                      : _()(t, 'middlewares', {
                          configurable: !0,
                          set: function (t) {
                            -1 === (r = t).indexOf(e) && r.push(e);
                          },
                          get: function () {
                            return r;
                          },
                        });
                  },
                  get: function () {
                    return t;
                  },
                });
        },
      };
      !(function () {
        if (!window.__AES_PLUGIN_API__) {
          window.__AES_PLUGIN_API__ = !0;
          var e = o.a.getConfig('plugin_api') || {},
            t = e.disableHook,
            n = e.disableHookFetch,
            r = e.disableHookXHR,
            i = e.disableHookMtop;
          if (!0 !== t) {
            var a = O.hookXHR,
              s = O.hookMtop;
            !0 !== n && (0, O.hookFetch)(), !0 !== r && a(), !0 !== i && s();
          }
        }
      })();
      t.default = { sendApi: s };
    },
  ]).default;
});
!(function (e, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n(require('@ali/aes-tracker')))
    : 'function' == typeof define && define.amd
    ? define(
        '@ali/aes-tracker-plugin-perf/index',
        ['@ali/aes-tracker/index'],
        n
      )
    : 'object' == typeof exports
    ? (exports.AESPluginPerf = n(require('@ali/aes-tracker')))
    : (e.AESPluginPerf = n(e.AES));
})(window, function (e) {
  return (function (e) {
    var n = {};
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = (n[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
    }
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function (e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r });
      }),
      (t.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (t.t = function (e, n) {
        if ((1 & n && (e = t(e)), 8 & n)) return e;
        if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (t.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
          2 & n && 'string' != typeof e)
        )
          for (var o in e)
            t.d(
              r,
              o,
              function (n) {
                return e[n];
              }.bind(null, o)
            );
        return r;
      }),
      (t.n = function (e) {
        var n =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      }),
      (t.p = ''),
      t((t.s = 46))
    );
  })([
    function (n, t) {
      n.exports = e;
    },
    function (e, n) {
      var t = (e.exports = { version: '2.6.12' });
      'number' == typeof __e && (__e = t);
    },
    function (e, n, t) {
      e.exports = !t(5)(function () {
        return (
          7 !=
          Object.defineProperty({}, 'a', {
            get: function () {
              return 7;
            },
          }).a
        );
      });
    },
    function (e, n) {
      var t = (e.exports =
        'undefined' != typeof window && window.Math == Math
          ? window
          : 'undefined' != typeof self && self.Math == Math
          ? self
          : Function('return this')());
      'number' == typeof __g && (__g = t);
    },
    function (e, n) {
      e.exports = function (e) {
        return 'object' == typeof e ? null !== e : 'function' == typeof e;
      };
    },
    function (e, n) {
      e.exports = function (e) {
        try {
          return !!e();
        } catch (e) {
          return !0;
        }
      };
    },
    function (e, n, t) {
      e.exports = t(17);
    },
    function (e, n, t) {
      e.exports = t(42);
    },
    function (e, n) {
      (e.exports = function (e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }),
        (e.exports.__esModule = !0),
        (e.exports.default = e.exports);
    },
    function (e, n, t) {
      var r = t(43);
      function o(e, n) {
        for (var t = 0; t < n.length; t++) {
          var o = n[t];
          (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            'value' in o && (o.writable = !0),
            r(e, o.key, o);
        }
      }
      (e.exports = function (e, n, t) {
        return (
          n && o(e.prototype, n),
          t && o(e, t),
          r(e, 'prototype', { writable: !1 }),
          e
        );
      }),
        (e.exports.__esModule = !0),
        (e.exports.default = e.exports);
    },
    function (e, n, t) {
      var r = t(3),
        o = t(1),
        i = t(19),
        u = t(21),
        a = t(12),
        c = function (e, n, t) {
          var s,
            f,
            l,
            p = e & c.F,
            d = e & c.G,
            v = e & c.S,
            m = e & c.P,
            y = e & c.B,
            h = e & c.W,
            g = d ? o : o[n] || (o[n] = {}),
            w = g.prototype,
            b = d ? r : v ? r[n] : (r[n] || {}).prototype;
          for (s in (d && (t = n), t))
            ((f = !p && b && void 0 !== b[s]) && a(g, s)) ||
              ((l = f ? b[s] : t[s]),
              (g[s] =
                d && 'function' != typeof b[s]
                  ? t[s]
                  : y && f
                  ? i(l, r)
                  : h && b[s] == l
                  ? (function (e) {
                      var n = function (n, t, r) {
                        if (this instanceof e) {
                          switch (arguments.length) {
                            case 0:
                              return new e();
                            case 1:
                              return new e(n);
                            case 2:
                              return new e(n, t);
                          }
                          return new e(n, t, r);
                        }
                        return e.apply(this, arguments);
                      };
                      return (n.prototype = e.prototype), n;
                    })(l)
                  : m && 'function' == typeof l
                  ? i(Function.call, l)
                  : l),
              m &&
                (((g.virtual || (g.virtual = {}))[s] = l),
                e & c.R && w && !w[s] && u(w, s, l)));
        };
      (c.F = 1),
        (c.G = 2),
        (c.S = 4),
        (c.P = 8),
        (c.B = 16),
        (c.W = 32),
        (c.U = 64),
        (c.R = 128),
        (e.exports = c);
    },
    function (e, n, t) {
      var r = t(22),
        o = t(23),
        i = t(25),
        u = Object.defineProperty;
      n.f = t(2)
        ? Object.defineProperty
        : function (e, n, t) {
            if ((r(e), (n = i(n, !0)), r(t), o))
              try {
                return u(e, n, t);
              } catch (e) {}
            if ('get' in t || 'set' in t)
              throw TypeError('Accessors not supported!');
            return 'value' in t && (e[n] = t.value), e;
          };
    },
    function (e, n) {
      var t = {}.hasOwnProperty;
      e.exports = function (e, n) {
        return t.call(e, n);
      };
    },
    function (e, n, t) {
      var r = t(14),
        o = t(15);
      e.exports = function (e) {
        return r(o(e));
      };
    },
    function (e, n, t) {
      var r = t(30);
      e.exports = Object('z').propertyIsEnumerable(0)
        ? Object
        : function (e) {
            return 'String' == r(e) ? e.split('') : Object(e);
          };
    },
    function (e, n) {
      e.exports = function (e) {
        if (null == e) throw TypeError("Can't call method on  " + e);
        return e;
      };
    },
    function (e, n) {
      var t = Math.ceil,
        r = Math.floor;
      e.exports = function (e) {
        return isNaN((e = +e)) ? 0 : (e > 0 ? r : t)(e);
      };
    },
    function (e, n, t) {
      t(18), (e.exports = t(1).Object.assign);
    },
    function (e, n, t) {
      var r = t(10);
      r(r.S + r.F, 'Object', { assign: t(27) });
    },
    function (e, n, t) {
      var r = t(20);
      e.exports = function (e, n, t) {
        if ((r(e), void 0 === n)) return e;
        switch (t) {
          case 1:
            return function (t) {
              return e.call(n, t);
            };
          case 2:
            return function (t, r) {
              return e.call(n, t, r);
            };
          case 3:
            return function (t, r, o) {
              return e.call(n, t, r, o);
            };
        }
        return function () {
          return e.apply(n, arguments);
        };
      };
    },
    function (e, n) {
      e.exports = function (e) {
        if ('function' != typeof e) throw TypeError(e + ' is not a function!');
        return e;
      };
    },
    function (e, n, t) {
      var r = t(11),
        o = t(26);
      e.exports = t(2)
        ? function (e, n, t) {
            return r.f(e, n, o(1, t));
          }
        : function (e, n, t) {
            return (e[n] = t), e;
          };
    },
    function (e, n, t) {
      var r = t(4);
      e.exports = function (e) {
        if (!r(e)) throw TypeError(e + ' is not an object!');
        return e;
      };
    },
    function (e, n, t) {
      e.exports =
        !t(2) &&
        !t(5)(function () {
          return (
            7 !=
            Object.defineProperty(t(24)('div'), 'a', {
              get: function () {
                return 7;
              },
            }).a
          );
        });
    },
    function (e, n, t) {
      var r = t(4),
        o = t(3).document,
        i = r(o) && r(o.createElement);
      e.exports = function (e) {
        return i ? o.createElement(e) : {};
      };
    },
    function (e, n, t) {
      var r = t(4);
      e.exports = function (e, n) {
        if (!r(e)) return e;
        var t, o;
        if (n && 'function' == typeof (t = e.toString) && !r((o = t.call(e))))
          return o;
        if ('function' == typeof (t = e.valueOf) && !r((o = t.call(e))))
          return o;
        if (!n && 'function' == typeof (t = e.toString) && !r((o = t.call(e))))
          return o;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function (e, n) {
      e.exports = function (e, n) {
        return {
          enumerable: !(1 & e),
          configurable: !(2 & e),
          writable: !(4 & e),
          value: n,
        };
      };
    },
    function (e, n, t) {
      'use strict';
      var r = t(2),
        o = t(28),
        i = t(39),
        u = t(40),
        a = t(41),
        c = t(14),
        s = Object.assign;
      e.exports =
        !s ||
        t(5)(function () {
          var e = {},
            n = {},
            t = Symbol(),
            r = 'abcdefghijklmnopqrst';
          return (
            (e[t] = 7),
            r.split('').forEach(function (e) {
              n[e] = e;
            }),
            7 != s({}, e)[t] || Object.keys(s({}, n)).join('') != r
          );
        })
          ? function (e, n) {
              for (
                var t = a(e), s = arguments.length, f = 1, l = i.f, p = u.f;
                s > f;

              )
                for (
                  var d,
                    v = c(arguments[f++]),
                    m = l ? o(v).concat(l(v)) : o(v),
                    y = m.length,
                    h = 0;
                  y > h;

                )
                  (d = m[h++]), (r && !p.call(v, d)) || (t[d] = v[d]);
              return t;
            }
          : s;
    },
    function (e, n, t) {
      var r = t(29),
        o = t(38);
      e.exports =
        Object.keys ||
        function (e) {
          return r(e, o);
        };
    },
    function (e, n, t) {
      var r = t(12),
        o = t(13),
        i = t(31)(!1),
        u = t(34)('IE_PROTO');
      e.exports = function (e, n) {
        var t,
          a = o(e),
          c = 0,
          s = [];
        for (t in a) t != u && r(a, t) && s.push(t);
        for (; n.length > c; ) r(a, (t = n[c++])) && (~i(s, t) || s.push(t));
        return s;
      };
    },
    function (e, n) {
      var t = {}.toString;
      e.exports = function (e) {
        return t.call(e).slice(8, -1);
      };
    },
    function (e, n, t) {
      var r = t(13),
        o = t(32),
        i = t(33);
      e.exports = function (e) {
        return function (n, t, u) {
          var a,
            c = r(n),
            s = o(c.length),
            f = i(u, s);
          if (e && t != t) {
            for (; s > f; ) if ((a = c[f++]) != a) return !0;
          } else
            for (; s > f; f++)
              if ((e || f in c) && c[f] === t) return e || f || 0;
          return !e && -1;
        };
      };
    },
    function (e, n, t) {
      var r = t(16),
        o = Math.min;
      e.exports = function (e) {
        return e > 0 ? o(r(e), 9007199254740991) : 0;
      };
    },
    function (e, n, t) {
      var r = t(16),
        o = Math.max,
        i = Math.min;
      e.exports = function (e, n) {
        return (e = r(e)) < 0 ? o(e + n, 0) : i(e, n);
      };
    },
    function (e, n, t) {
      var r = t(35)('keys'),
        o = t(37);
      e.exports = function (e) {
        return r[e] || (r[e] = o(e));
      };
    },
    function (e, n, t) {
      var r = t(1),
        o = t(3),
        i = o['__core-js_shared__'] || (o['__core-js_shared__'] = {});
      (e.exports = function (e, n) {
        return i[e] || (i[e] = void 0 !== n ? n : {});
      })('versions', []).push({
        version: r.version,
        mode: t(36) ? 'pure' : 'global',
        copyright: 'Â© 2020 Denis Pushkarev (zloirock.ru)',
      });
    },
    function (e, n) {
      e.exports = !0;
    },
    function (e, n) {
      var t = 0,
        r = Math.random();
      e.exports = function (e) {
        return 'Symbol('.concat(
          void 0 === e ? '' : e,
          ')_',
          (++t + r).toString(36)
        );
      };
    },
    function (e, n) {
      e.exports =
        'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
          ','
        );
    },
    function (e, n) {
      n.f = Object.getOwnPropertySymbols;
    },
    function (e, n) {
      n.f = {}.propertyIsEnumerable;
    },
    function (e, n, t) {
      var r = t(15);
      e.exports = function (e) {
        return Object(r(e));
      };
    },
    function (e, n, t) {
      var r = t(1),
        o = r.JSON || (r.JSON = { stringify: JSON.stringify });
      e.exports = function (e) {
        return o.stringify.apply(o, arguments);
      };
    },
    function (e, n, t) {
      e.exports = t(44);
    },
    function (e, n, t) {
      t(45);
      var r = t(1).Object;
      e.exports = function (e, n, t) {
        return r.defineProperty(e, n, t);
      };
    },
    function (e, n, t) {
      var r = t(10);
      r(r.S + r.F * !t(2), 'Object', { defineProperty: t(11).f });
    },
    function (e, n, t) {
      'use strict';
      t.r(n),
        t.d(n, 'mark', function () {
          return S;
        }),
        t.d(n, 'measure', function () {
          return k;
        }),
        t.d(n, 'markWithEntry', function () {
          return T;
        }),
        t.d(n, 'measureWithEntry', function () {
          return E;
        }),
        t.d(n, 'markOnMCP', function () {
          return C;
        });
      var r = t(0),
        o = t.n(r),
        i = t(6),
        u = t.n(i),
        a = t(7),
        c = t.n(a),
        s = {},
        f = null,
        l = 0,
        p = function () {
          f && h(f), (l || f) && o.a.log('paint', s);
        },
        d = function (e) {
          var n = e.entryType,
            t = e.name,
            r = {
              p1: e.startTime,
              p2: e.duration,
              p3: n,
              p4: t,
              c1: e.c1,
              c2: e.c2,
              c3: e.c3,
              c4: e.c4,
              c5: e.c5,
              c6: e.c6,
            };
          o.a.log('usertiming', r);
        },
        v = function (e) {
          var n,
            t = {
              startTime: 'p1',
              identifier: 'p2',
              name: 'p3',
              url: 'p4',
              element: 'p5',
              naturalHeight: 'p6',
              naturalWidth: 'p7',
            },
            r = {};
          for (var i in t)
            void 0 !== e[i] &&
              (r[t[i]] =
                'string' == typeof (n = e[i]) || 'number' == typeof n
                  ? n
                  : 'object' == typeof n && n instanceof HTMLElement
                  ? n.tagName
                  : void 0);
          o.a.log('elementtiming', r);
        },
        m = function () {
          var e,
            n,
            t,
            r,
            i = o.a.getConfig('plugin_perf_resourceTimingSampling') || 0.01;
          if (
            !(Math.random() >= i) &&
            'function' == typeof window.fetch &&
            null !== (e = window) &&
            void 0 !== e &&
            null !== (n = e.performance) &&
            void 0 !== n &&
            n.getEntries &&
            null !== (t = window) &&
            void 0 !== t &&
            null !== (r = t.performance) &&
            void 0 !== r &&
            r.getEntriesByType
          ) {
            var u =
                o.a.getConfig('plugin_perf_resourceTimingThreshhold') || 8e3,
              a =
                performance.getEntriesByType('navigation')[0] ||
                window.performance.timing;
            if (a) if (a.loadEventStart - a.fetchStart < u) return;
            var s = performance.getEntries();
            if (s && 0 !== s.length)
              try {
                var f = o.a.getConfig('pv_id'),
                  l = o.a.getConfig('pid'),
                  p = {
                    __topic__: 'resourcetiming',
                    __logs__: [
                      {
                        pid: l,
                        name: f,
                        resource: encodeURIComponent(c()(s.slice(0, 200))),
                      },
                    ],
                  };
                if (!l || !f) return;
                fetch(
                  'https://aes.cn-wulanchabu.log.aliyuncs.com/logstores/aes-resourcetiming/track',
                  {
                    method: 'POST',
                    body: c()(p),
                    headers: {
                      'Content-Type': 'application/json',
                      'x-log-apiversion': '0.6.0',
                      'x-log-bodyrawsize': '1234',
                    },
                  }
                );
              } catch (e) {}
          }
        },
        y = function (e) {
          f = e;
        },
        h = function (e) {
          var n,
            t = { startTime: 'p3', element: 'p4', url: 'p5' };
          for (var r in t)
            void 0 !== e[r] &&
              (s[t[r]] =
                'string' == typeof (n = e[r]) || 'number' == typeof n
                  ? n
                  : 'object' == typeof n && n instanceof HTMLElement
                  ? n.tagName
                  : void 0);
        },
        g = new Date().getTime(),
        w = [],
        b = function (e) {
          return w
            .concat([])
            .reverse()
            .find(function (n) {
              return n.name === ''.concat(e);
            });
        },
        x = function () {
          var e, n, t, r;
          return null !== (e = window) &&
            void 0 !== e &&
            null !== (n = e.performance) &&
            void 0 !== n &&
            n.now
            ? performance.now()
            : null !== (t = window) &&
              void 0 !== t &&
              null !== (r = t.performance) &&
              void 0 !== r &&
              r.timing
            ? new Date().getTime() - performance.timing.navigationStart
            : new Date().getTime() - g;
        },
        S = function (e) {
          if (void 0 === e)
            return console.error(
              "Failed to execute 'mark' on 'Performance': 1 argument required, but only 0 present."
            );
          var n = {
            name: e + '',
            entryType: 'mark',
            startTime: x(),
            duration: 0,
          };
          return w.push(n), d(n), n;
        },
        T = function (e) {
          return d(u()({ entryType: 'mark', duration: 0 }, e)), e;
        },
        k = function (e, n, t) {
          if (void 0 === e)
            return console.error(
              "Failed to execute 'measure' on 'Performance': at least 1 argument required, but only 0 present."
            );
          var r = void 0 === n ? null : b(n),
            o = void 0 === t ? null : b(t);
          if (void 0 !== n && !r)
            return console.error(
              "Failed to execute 'measure' on 'Performance': The mark '".concat(
                n,
                "' does not exist."
              )
            );
          if (void 0 !== t && !o)
            return console.error(
              "Failed to execute 'measure' on 'Performance': The mark '".concat(
                t,
                "' does not exist."
              )
            );
          o = o || { startTime: 0 };
          var i = {
            name: e + '',
            entryType: 'measure',
            startTime: (r = r || { startTime: 0 }).startTime,
            duration: (o.startTime || x()) - r.startTime,
          };
          return d(i), i;
        },
        E = function (e) {
          return d(u()({ entryType: 'measure' }, e)), e;
        },
        _ = t(8),
        O = t.n(_),
        P = t(9),
        j = t.n(P),
        L = {
          hasHookRequest: !1,
          requestStackSize: 0,
          listeners: [],
          runListeners: function () {
            var e = this;
            this.listeners.forEach(function (n) {
              return n(e.requestStackSize);
            });
          },
          hook: function () {
            var e,
              n,
              t,
              r = this,
              o = XMLHttpRequest.prototype.send;
            if (
              window.fetch &&
              null !== (e = window) &&
              void 0 !== e &&
              null !== (n = e.Response) &&
              void 0 !== n &&
              null !== (t = n.prototype) &&
              void 0 !== t &&
              t.blob
            ) {
              var i = window.fetch;
              window.fetch = function () {
                return (
                  r.requestStackSize++,
                  r.runListeners(),
                  i.apply(window, arguments).then(
                    function (e) {
                      try {
                        e.clone()
                          .blob()
                          .then(function (e) {
                            r.requestStackSize--, r.runListeners();
                          });
                      } catch (e) {}
                      return e;
                    },
                    function (e) {
                      try {
                        r.requestStackSize--, r.runListeners();
                      } catch (e) {}
                      throw e;
                    }
                  )
                );
              };
            }
            XMLHttpRequest.prototype.send = function () {
              o.apply(this, arguments), r.requestStackSize++, r.runListeners();
              var e = this;
              e.addEventListener('readystatechange', function () {
                4 === e.readyState && (r.requestStackSize--, r.runListeners());
              });
            };
          },
          addEventListener: function (e) {
            this.hasHookRequest || (this.hook(), (this.hasHookRequest = !0)),
              this.listeners.push(e);
          },
          removeEventListener: function (e) {
            this.listeners = this.listeners.filter(function (n) {
              return n !== e;
            });
          },
        },
        M = (function () {
          function e(n) {
            var t = this;
            O()(this, e),
              (this.assetsStack = 0),
              (this.observer = function () {
                (t.requestStackSize = L.requestStackSize + t.assetsStack),
                  1 !== t.end && n(t.requestStackSize);
              });
          }
          return (
            j()(e, [
              {
                key: 'observe',
                value: function (e) {
                  var n = this;
                  return e
                    ? (n.assetsStack++,
                      e.addEventListener('load', function () {
                        n.assetsStack--, n.observer();
                      }),
                      void e.addEventListener('error', function () {
                        n.assetsStack--, n.observer();
                      }))
                    : (L.addEventListener(this.observer), this);
                },
              },
              {
                key: 'disconnect',
                value: function () {
                  (this.end = 1), L.removeEventListener(this.observer);
                },
              },
            ]),
            e
          );
        })(),
        q = (function () {
          function e(n) {
            O()(this, e),
              (this.inputTypes = ['click', 'keypress', 'wheel']),
              (this.eventHandler = n);
          }
          return (
            j()(e, [
              {
                key: 'observer',
                value: function () {
                  var e = this;
                  this.inputTypes.forEach(function (n) {
                    window.addEventListener(n, e.eventHandler, !0);
                  });
                },
              },
              {
                key: 'disconnect',
                value: function () {
                  var e = this;
                  this.inputTypes.forEach(function (n) {
                    window.removeEventListener(n, e.eventHandler, !0);
                  });
                },
              },
            ]),
            e
          );
        })();
      function C(e) {
        var n, t;
        if (
          window.PerformanceLongTaskTiming &&
          window.MutationObserver &&
          null !== (n = window) &&
          void 0 !== n &&
          null !== (t = n.performance) &&
          void 0 !== t &&
          t.now
        ) {
          var r,
            o,
            i,
            u,
            a,
            c,
            s,
            f,
            l = function () {
              document.hidden && d();
            },
            p = function () {
              i && clearTimeout(i),
                (i = setTimeout(function () {
                  s &&
                    s.requestStackSize < 1 &&
                    (d(),
                    T({
                      name: 'aes-mcp',
                      startTime: r - o,
                      c1: o > 0 ? '0' : '1',
                    }),
                    e && e({ startTime: r - o }));
                }, 100));
            },
            d = function () {
              i && clearTimeout(i),
                (i = null),
                [u, c, a, s, f].forEach(function (e) {
                  e && e.disconnect(), (e = null);
                }),
                l && window.removeEventListener('visibilitychange', l),
                (l = null),
                0 === o && window.removeEventListener('load', v);
            },
            v = function () {
              (s = new M(p)).observe(),
                (u = new MutationObserver(function (e, n) {
                  (r = performance.now()),
                    null == e ||
                      e.forEach(function (e) {
                        var n;
                        'childList' === e.type &&
                          (null == e ||
                            null === (n = e.addedNodes) ||
                            void 0 === n ||
                            n.forEach(function (e) {
                              ((('SCRIPT' === e.tagName ||
                                'IMG' === e.tagName) &&
                                e.src) ||
                                ('LINK' === e.tagName &&
                                  'stylesheet' === e.rel &&
                                  e.href)) &&
                                s &&
                                s.observe(e);
                            }));
                      });
                })).observe(document.documentElement, {
                  attributes: !0,
                  childList: !0,
                  subtree: !0,
                }),
                window.LayoutShiftAttribution &&
                  (c = new PerformanceObserver(function () {
                    (r = performance.now()), p();
                  })).observe({ entryTypes: ['layout-shift'] }),
                (a = new PerformanceObserver(function (e) {
                  e.getEntries().some(function (e) {
                    e.duration > 50 && p();
                  });
                })).observe({ entryTypes: ['longtask'] }),
                (f = new q(function () {
                  d();
                })).observer(),
                window.addEventListener('visibilitychange', l),
                p();
            };
          return (
            'complete' !== document.readyState
              ? ((o = 0), window.addEventListener('load', v))
              : ((o = performance.now()), v()),
            { abort: d }
          );
        }
      }
      var z,
        N = function () {
          return (
            (function () {
              var e, n;
              if (
                window.PerformanceNavigationTiming &&
                null !== (e = window) &&
                void 0 !== e &&
                null !== (n = e.performance) &&
                void 0 !== n &&
                n.getEntriesByType
              ) {
                var t = performance.getEntriesByType('navigation')[0],
                  r = {};
                for (var o in t)
                  'entryType' !== o &&
                    'initiatorType' !== o &&
                    'name' !== o &&
                    0 !== t[o] &&
                    'number' == typeof t[o] &&
                    (r[o] = t[o].toFixed(2));
                return r;
              }
            })() ||
            (function () {
              var e, n, t;
              if (
                (null === (e = window) ||
                void 0 === e ||
                null === (n = e.performance) ||
                void 0 === n ||
                null === (t = n.timing) ||
                void 0 === t
                  ? void 0
                  : t.navigationStart) > 0
              ) {
                var r = {};
                for (var o in performance.timing)
                  'number' == typeof performance.timing[o] &&
                    performance.timing[o] > 0 &&
                    (r[o] = Math.max(
                      performance.timing[o] -
                        performance.timing.navigationStart,
                      0
                    ));
                return r;
              }
            })()
          );
        };
      (z = function () {
        var e = N();
        e &&
          e.responseStart &&
          e.responseEnd &&
          e.responseEnd >= e.responseStart &&
          o.a.log('perf', e),
          o.a.getConfig('plugin_perf_enableResourceTiming') &&
            setTimeout(m, 5e3);
      }),
        'complete' === document.readyState
          ? setTimeout(z)
          : window.addEventListener('load', function () {
              return setTimeout(z);
            });
      !(function () {
        if (window.PerformanceObserver) {
          var e = [];
          o.a.getConfig('plugin_perf_enableUserTimingObserve') &&
            (window.PerformanceMark && e.push('mark'),
            window.PerformanceMeasure && e.push('measure')),
            window.PerformancePaintTiming && e.push('paint'),
            window.PerformanceElementTiming && e.push('element'),
            window.LargestContentfulPaint &&
              (e.push('largest-contentful-paint'),
              document.addEventListener(
                'visibilitychange',
                function e() {
                  document.hidden &&
                    (document.removeEventListener('visibilitychange', e, !0),
                    p());
                },
                !0
              ));
          try {
            !(function () {
              for (var n = {}, t = 0; t < e.length; t++) {
                var r = e[t],
                  o = new PerformanceObserver(function (e) {
                    e.getEntries().forEach(function (e) {
                      switch (e.entryType) {
                        case 'paint':
                          (r = (t = e).name),
                            (o = t.startTime),
                            (i = {
                              'first-paint': 'p1',
                              'first-contentful-paint': 'p2',
                            })[r] &&
                              ((s[i[r]] = o),
                              l++,
                              window.LargestContentfulPaint || 2 !== l || p());
                          break;
                        case 'mark':
                        case 'measure':
                          d(e);
                          break;
                        case 'element':
                          n[e.identifier] || ((n[e.identifier] = 1), v(e));
                          break;
                        case 'largest-contentful-paint':
                          y(e);
                      }
                      var t, r, o, i;
                    });
                  });
                try {
                  o.observe({ type: r, buffered: !0 });
                } catch (n) {
                  o.observe({ entryTypes: e });
                  break;
                }
              }
            })();
          } catch (e) {}
        }
      })();
      n.default = {
        mark: S,
        measure: k,
        markWithEntry: T,
        measureWithEntry: E,
        markOnMCP: C,
      };
    },
  ]).default;
});
!(function (e, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n(require('@ali/aes-tracker')))
    : 'function' == typeof define && define.amd
    ? define(
        '@ali/aes-tracker-plugin-eventTiming/index',
        ['@ali/aes-tracker/index'],
        n
      )
    : 'object' == typeof exports
    ? (exports.AESPluginEventTiming = n(require('@ali/aes-tracker')))
    : (e.AESPluginEventTiming = n(e.AES));
})(window, function (e) {
  return (function (e) {
    var n = {};
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = (n[i] = { i: i, l: !1, exports: {} });
      return e[i].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
    }
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function (e, n, i) {
        t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: i });
      }),
      (t.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (t.t = function (e, n) {
        if ((1 & n && (e = t(e)), 8 & n)) return e;
        if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (
          (t.r(i),
          Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
          2 & n && 'string' != typeof e)
        )
          for (var r in e)
            t.d(
              i,
              r,
              function (n) {
                return e[n];
              }.bind(null, r)
            );
        return i;
      }),
      (t.n = function (e) {
        var n =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      }),
      (t.p = ''),
      t((t.s = 1))
    );
  })([
    function (n, t) {
      n.exports = e;
    },
    function (e, n, t) {
      'use strict';
      t.r(n);
      var i,
        r,
        o,
        u = t(0),
        c = t.n(u),
        a = function (e) {
          for (
            var n = [], t = window, i = document, r = 0, o = e.length;
            r < o;
            r++
          ) {
            var u = e[r];
            if (u === t || u === i) break;
            if (u.id) {
              n.push('#'.concat(u.id));
              break;
            }
            u.className && 'string' == typeof u.className
              ? n.push(
                  '.' +
                    u.className
                      .split(/\s+/)
                      .filter(function (e) {
                        return !!e;
                      })
                      .join('.')
                )
              : n.push(u.nodeName);
          }
          return n.reverse().join(' ');
        },
        d = function (e) {
          if ('[object Array]' === Object.prototype.toString.apply(e))
            return a(e);
          for (var n = [], t = e; t; ) n.push(t), (t = t.parentNode);
          return a(n);
        },
        s =
          void 0 !== document.hidden
            ? { hidden: 'hidden', visibilityChange: 'visibilitychange' }
            : void 0 !== document.webkitHidden
            ? {
                hidden: 'webkitHidden',
                visibilityChange: 'webkitvisibilitychange',
              }
            : void 0 !== document.msHidden
            ? { hidden: 'msHidden', visibilityChange: 'msvisibilitychange' }
            : void 0,
        f = !!s;
      if (window.PerformanceEventTiming) {
        var l,
          p,
          v,
          b = function (e, n) {
            var t, i;
            (t = function () {
              c.a.log('eventTiming', {
                p1: e.startTime,
                p2: e.duration,
                p3: e.target && d(e.target),
                p4: e.name,
                p5: e.processingStart,
                p6: e.processingEnd,
                p7: n ? '1' : '0',
              });
            }),
              'function' == typeof requestIdleCallback
                ? requestIdleCallback(t, { timeout: i || 1e3 })
                : setTimeout(t, 0);
          },
          m = new PerformanceObserver(function (e) {
            var n = e.getEntries().filter(function (e) {
                return (
                  void 0 !== e.interactionId &&
                  e.processingStart &&
                  e.processingEnd &&
                  e.processingEnd - e.processingStart > 1
                );
              }),
              t = n
                .filter(function (e) {
                  return 0 !== e.interactionId;
                })
                .reduce(function (e, n) {
                  var t = n.interactionId;
                  return e[t] || (e[t] = []), e[t].push(n), e;
                }, {});
            for (var i in t) b(t[i][t[i].length - 1]);
            n.filter(function (e) {
              return 0 === e.interactionId;
            }).forEach(function (e) {
              b(e);
            });
          });
        try {
          m.observe({ type: 'event', durationThreshold: 100 });
        } catch (e) {}
        null !== (l = window.PerformanceObserver) &&
          void 0 !== l &&
          null !== (p = l.supportedEntryTypes) &&
          void 0 !== p &&
          p.includes('first-input') &&
          (v = new PerformanceObserver(function (e, n) {
            b(e.getEntries()[0], !0), n.disconnect(), (v = null);
          })).observe({ type: 'first-input', buffered: !0 }),
          (i = function (e) {
            e
              ? setTimeout(function () {
                  try {
                    m.observe({ type: 'event', durationThreshold: 100 });
                  } catch (e) {}
                }, 100)
              : (v && v.disconnect(), m && m.disconnect());
          }),
          f &&
            document.addEventListener(
              s.visibilityChange,
              (o = function (e) {
                r && document.removeEventListener(s.visibilityChange, o),
                  i(!document[s.hidden]);
              })
            );
      }
    },
  ]).default;
});
