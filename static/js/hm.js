(function () {
  var h = {},
    mt = {},
    c = {
      id: '104e73ef0c18b416b27abb23757ed8ee',
      dm: ['seata.io', 'aliyun.com'],
      js: 'tongji.baidu.com/hm-web/js/',
      etrk: [],
      cetrk: [],
      cptrk: [],
      icon: '',
      ctrk: [
        '%5b%22https%3a%5c%2f%5c%2fseata.io%5c%2fzh-cn%5c%2fdocs%5c%2foverview%5c%2fwhat-is-seata.html%22%2c%22https%3a%5c%2f%5c%2fseata.io%22%2c%22https%3a%5c%2f%5c%2fseata.io%5c%2fzh-cn%22%5d',
      ],
      vdur: 1800000,
      age: 31536000000,
      qiao: 0,
      pt: 0,
      spa: 0,
      aet: '',
      hca: 'A90F0F4399C90A66',
      ab: '0',
      v: 1,
    };
  var s = void 0,
    t = !0,
    u = null,
    x = !1;
  mt.cookie = {};
  mt.cookie.set = function (e, a, b) {
    var k;
    b.C && ((k = new Date()), k.setTime(k.getTime() + b.C));
    document.cookie =
      e +
      '=' +
      a +
      (b.domain ? '; domain=' + b.domain : '') +
      (b.path ? '; path=' + b.path : '') +
      (k ? '; expires=' + k.toGMTString() : '') +
      (b.dc ? '; secure' : '');
  };
  mt.cookie.get = function (e) {
    return (e = RegExp('(^| )' + e + '=([^;]*)(;|$)').exec(document.cookie))
      ? e[2]
      : u;
  };
  mt.cookie.rb = function (e, a) {
    try {
      var b = 'Hm_ck_' + +new Date();
      mt.cookie.set(b, '42', {
        domain: e,
        path: a,
        C: s,
      });
      var k = '42' === mt.cookie.get(b) ? '1' : '0';
      mt.cookie.set(b, '', {
        domain: e,
        path: a,
        C: -1,
      });
      return k;
    } catch (d) {
      return '0';
    }
  };
  mt.event = {};
  mt.event.c = function (e, a, b, k) {
    e.addEventListener
      ? e.addEventListener(a, b, k || x)
      : e.attachEvent &&
        e.attachEvent('on' + a, function (d) {
          b.call(e, d);
        });
  };
  (function () {
    var e = mt.event;
    mt.lang = {};
    mt.lang.i = function (a, b) {
      return '[object ' + b + ']' === {}.toString.call(a);
    };
    mt.lang.j = function (a) {
      return mt.lang.i(a, 'Function');
    };
    mt.lang.J = function (a) {
      return mt.lang.i(a, 'Object');
    };
    mt.lang.Wb = function (a) {
      return mt.lang.i(a, 'Number') && isFinite(a);
    };
    mt.lang.Z = function (a) {
      return mt.lang.i(a, 'String');
    };
    mt.lang.isArray = function (a) {
      return mt.lang.i(a, 'Array');
    };
    mt.lang.n = function (a) {
      return a.replace
        ? a.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2")
        : a;
    };
    mt.lang.trim = function (a) {
      return a.replace(/^\s+|\s+$/g, '');
    };
    mt.lang.find = function (a, b, k) {
      if (mt.lang.isArray(a) && mt.lang.j(b))
        for (var d = a.length, f = 0; f < d; f++)
          if (f in a && b.call(k || a, a[f], f)) return a[f];
      return u;
    };
    mt.lang.X = function (a, b) {
      return (
        mt.lang.find(a, function (k) {
          return k === b;
        }) != u
      );
    };
    mt.lang.filter = function (a, b) {
      var k = -1,
        d = 0,
        f = a == u ? 0 : a.length,
        g = [];
      if (mt.lang.j(b))
        for (; ++k < f; ) {
          var l = a[k];
          b(l, k, a) && (g[d++] = l);
        }
      return g;
    };
    mt.lang.unique = function (a, b) {
      var k = a.length,
        d = a.slice(0),
        f,
        g;
      for (
        mt.lang.j(b) ||
        (b = function (b, d) {
          return b === d;
        });
        0 < --k;

      ) {
        g = d[k];
        for (f = k; f--; )
          if (b(g, d[f])) {
            d.splice(k, 1);
            break;
          }
      }
      return d;
    };
    mt.lang.Zb = function (a, b) {
      function k(b) {
        b = (d + d + Number(b).toString(2)).slice(-64);
        return [parseInt(b.slice(0, 32), 2), parseInt(b.slice(-32), 2)];
      }
      var d = '00000000000000000000000000000000',
        f = k(a),
        g = k(b);
      return parseInt(
        (d + ((f[0] | g[0]) >>> 0).toString(2)).slice(-32) +
          (d + ((f[1] | g[1]) >>> 0).toString(2)).slice(-32),
        2
      );
    };
    mt.lang.extend = function (a) {
      for (
        var b = Array.prototype.slice.call(arguments, 1), k = 0;
        k < b.length;
        k++
      ) {
        var d = b[k],
          f;
        for (f in d)
          Object.prototype.hasOwnProperty.call(d, f) && d[f] && (a[f] = d[f]);
      }
      return a;
    };
    mt.lang.Ob = function (a) {
      function b(b, d) {
        var a = window.history,
          g = a[b];
        a[b] = function () {
          g.apply(a, arguments);
          mt.lang.j(d) && d();
        };
      }
      b('pushState', function () {
        a();
      });
      b('replaceState', function () {
        a();
      });
      e.c(
        window,
        window.history.pushState ? 'popstate' : 'hashchange',
        function () {
          a();
        }
      );
    };
    return mt.lang;
  })();
  mt.url = {};
  mt.url.f = function (e, a) {
    var b = e.match(RegExp('(^|&|\\?|#)(' + a + ')=([^&#]*)(&|$|#)', ''));
    return b ? b[3] : u;
  };
  mt.url.Sa = function (e) {
    return (e = e.match(/^(https?:\/\/)?([^\/\?#]*)/))
      ? e[2].replace(/.*@/, '')
      : u;
  };
  mt.url.V = function (e) {
    return (e = mt.url.Sa(e)) ? e.replace(/:\d+$/, '') : e;
  };
  mt.url.pb = function (e) {
    var a = document.location.href,
      a = a.replace(/^https?:\/\//, '');
    return 0 === a.indexOf(e);
  };
  mt.url.qb = function (e, a) {
    e = '.' + e.replace(/:\d+/, '');
    a = '.' + a.replace(/:\d+/, '');
    var b = e.indexOf(a);
    return -1 < b && b + a.length === e.length;
  };
  (function () {
    var e = mt.lang,
      a = mt.url;
    mt.d = {};
    mt.d.La = function (b) {
      return document.getElementById(b);
    };
    mt.d.Vb = function (b) {
      if (!b) return u;
      try {
        b = String(b);
        if (0 === b.indexOf('!HMCQ!')) return b;
        if (0 === b.indexOf('!HMCC!'))
          return document.querySelector(b.substring(6, b.length));
        for (
          var k = b.split('>'), d = document.body, a = k.length - 1;
          0 <= a;
          a--
        )
          if (-1 < k[a].indexOf('#')) {
            var g = k[a].split('#')[1];
            (d = document.getElementById(g)) ||
              (d = document.getElementById(decodeURIComponent(g)));
            k = k.splice(a + 1, k.length - (a + 1));
            break;
          }
        for (b = 0; d && b < k.length; ) {
          var l = String(k[b]).toLowerCase();
          if (!('html' === l || 'body' === l)) {
            var a = 0,
              e = k[b].match(/\[(\d+)\]/i),
              g = [];
            if (e) (a = e[1] - 1), (l = l.split('[')[0]);
            else if (1 !== d.childNodes.length) {
              for (var p = 0, n = 0, m = d.childNodes.length; n < m; n++) {
                var q = d.childNodes[n];
                1 === q.nodeType && q.nodeName.toLowerCase() === l && p++;
                if (1 < p) return u;
              }
              if (1 !== p) return u;
            }
            for (p = 0; p < d.childNodes.length; p++)
              1 === d.childNodes[p].nodeType &&
                d.childNodes[p].nodeName.toLowerCase() === l &&
                g.push(d.childNodes[p]);
            if (!g[a]) return u;
            d = g[a];
          }
          b++;
        }
        return d;
      } catch (v) {
        return u;
      }
    };
    mt.d.fa = function (b, a) {
      var d = [],
        f = [];
      if (!b) return f;
      for (; b.parentNode != u; ) {
        for (
          var g = 0, l = 0, e = b.parentNode.childNodes.length, p = 0;
          p < e;
          p++
        ) {
          var n = b.parentNode.childNodes[p];
          if (
            n.nodeName === b.nodeName &&
            (g++, n === b && (l = g), 0 < l && 1 < g)
          )
            break;
        }
        if ((e = '' !== b.id) && a) {
          d.unshift('#' + encodeURIComponent(b.id));
          break;
        } else
          e &&
            ((e = '#' + encodeURIComponent(b.id)),
            (e = 0 < d.length ? e + '>' + d.join('>') : e),
            f.push(e)),
            d.unshift(
              encodeURIComponent(String(b.nodeName).toLowerCase()) +
                (1 < g ? '[' + l + ']' : '')
            );
        b = b.parentNode;
      }
      f.push(d.join('>'));
      return f;
    };
    mt.d.Xa = function (b) {
      return (b = mt.d.fa(b, t)) && b.length ? String(b[0]) : '';
    };
    mt.d.Wa = function (b) {
      return mt.d.fa(b, x);
    };
    mt.d.Ma = function (b) {
      var a;
      for (a = 'A'; (b = b.parentNode) && 1 == b.nodeType; )
        if (b.tagName == a) return b;
      return u;
    };
    mt.d.Pa = function (b) {
      return 9 === b.nodeType ? b : b.ownerDocument || b.document;
    };
    mt.d.Ua = function (b) {
      var a = {
        top: 0,
        left: 0,
      };
      if (!b) return a;
      var d = mt.d.Pa(b).documentElement;
      'undefined' !== typeof b.getBoundingClientRect &&
        (a = b.getBoundingClientRect());
      return {
        top: a.top + (window.pageYOffset || d.scrollTop) - (d.clientTop || 0),
        left:
          a.left + (window.pageXOffset || d.scrollLeft) - (d.clientLeft || 0),
      };
    };
    mt.d.gc = function (b, a) {
      if (b)
        for (var d = b.childNodes, f = 0, g = d.length; f < g; f++) {
          var e = d[f];
          if (e && 3 === e.nodeType)
            return (
              (d = e.textContent || e.innerText || e.nodeValue || ''),
              e.textContent
                ? (e.textContent = a)
                : e.innerText
                ? (e.innerText = a)
                : (e.nodeValue = a),
              d
            );
        }
    };
    mt.d.ec = function (b, a) {
      if (!b) return {};
      var d = {};
      a = a || {};
      for (var f in a)
        a.hasOwnProperty(f) &&
          a[f] !== s &&
          ((d[f] = b.getAttribute(f) || ''), b.setAttribute(f, a[f]));
      return d;
    };
    mt.d.getAttribute = function (b, a) {
      var d = (b.getAttribute && b.getAttribute(a)) || u;
      if (!d && b.attributes && b.attributes.length)
        for (var f = b.attributes, e = f.length, l = 0; l < e; l++)
          f[l].nodeName === a && (d = f[l].nodeValue);
      return d;
    };
    mt.d.Qa = function (b) {
      var a = 'document';
      b.tagName !== s && (a = b.tagName);
      return a.toLowerCase();
    };
    mt.d.Za = function (b) {
      var a = '';
      b.textContent
        ? (a = e.trim(b.textContent))
        : b.innerText && (a = e.trim(b.innerText));
      a && (a = a.replace(/\s+/g, ' ').substring(0, 255));
      return a;
    };
    mt.d.Ub = function (b, k) {
      var d;
      e.Z(b) && 0 === String(b).indexOf('!HMCQ!')
        ? ((d = String(b)),
          (d = a.f(document.location.href, d.substring(6, d.length))))
        : e.Z(b) ||
          ((d = mt.d.Qa(b)),
          'input' === d && k && ('button' === b.type || 'submit' === b.type)
            ? (d = e.trim(b.value) || '')
            : 'input' === d && !k && 'password' !== b.type
            ? (d = e.trim(b.value) || '')
            : 'img' === d
            ? ((d = mt.d.getAttribute),
              (d = d(b, 'alt') || d(b, 'title') || d(b, 'src')))
            : (d =
                'body' === d || 'html' === d
                  ? ['(hm-default-content-for-', d, ')'].join('')
                  : mt.d.Za(b)));
      return String(d || '').substring(0, 255);
    };
    (function () {
      (mt.d.ac = (function () {
        function b() {
          if (!b.K) {
            b.K = t;
            for (var a = 0, d = f.length; a < d; a++) f[a]();
          }
        }
        function a() {
          try {
            document.documentElement.doScroll('left');
          } catch (d) {
            setTimeout(a, 1);
            return;
          }
          b();
        }
        var d = x,
          f = [],
          e;
        document.addEventListener
          ? (e = function () {
              document.removeEventListener('DOMContentLoaded', e, x);
              b();
            })
          : document.attachEvent &&
            (e = function () {
              'complete' === document.readyState &&
                (document.detachEvent('onreadystatechange', e), b());
            });
        (function () {
          if (!d)
            if (((d = t), 'complete' === document.readyState)) b.K = t;
            else if (document.addEventListener)
              document.addEventListener('DOMContentLoaded', e, x),
                window.addEventListener('load', b, x);
            else if (document.attachEvent) {
              document.attachEvent('onreadystatechange', e);
              window.attachEvent('onload', b);
              var f = x;
              try {
                f = window.frameElement == u;
              } catch (r) {}
              document.documentElement.doScroll && f && a();
            }
        })();
        return function (a) {
          b.K ? a() : f.push(a);
        };
      })()).K = x;
    })();
    return mt.d;
  })();
  (function () {
    var e = mt.event;
    mt.e = {};
    mt.e.mb = /msie (\d+\.\d+)/i.test(navigator.userAgent);
    mt.e.cookieEnabled = navigator.cookieEnabled;
    mt.e.javaEnabled = navigator.javaEnabled();
    mt.e.language =
      navigator.language ||
      navigator.browserLanguage ||
      navigator.systemLanguage ||
      navigator.userLanguage ||
      '';
    mt.e.Ab = (window.screen.width || 0) + 'x' + (window.screen.height || 0);
    mt.e.colorDepth = window.screen.colorDepth || 0;
    mt.e.Ya = function () {
      var a;
      a = a || document;
      return parseInt(
        window.pageYOffset ||
          a.documentElement.scrollTop ||
          (a.body && a.body.scrollTop) ||
          0,
        10
      );
    };
    mt.e.$a = function () {
      var a = document;
      return parseInt(
        window.innerHeight ||
          a.documentElement.clientHeight ||
          (a.body && a.body.clientHeight) ||
          0,
        10
      );
    };
    mt.e.W = function () {
      return mt.e.Ya() + mt.e.$a();
    };
    mt.e.sa = 0;
    mt.e.bb = function () {
      var a = document;
      return parseInt(
        window.innerWidth ||
          a.documentElement.clientWidth ||
          a.body.offsetWidth ||
          0,
        10
      );
    };
    mt.e.orientation = 0;
    (function () {
      function a() {
        var a = 0;
        window.orientation !== s && (a = window.orientation);
        screen &&
          screen.orientation &&
          screen.orientation.angle !== s &&
          (a = screen.orientation.angle);
        mt.e.orientation = a;
        mt.e.sa = mt.e.bb();
      }
      a();
      e.c(window, 'orientationchange', a);
    })();
    return mt.e;
  })();
  mt.w = {};
  mt.w.parse = function (e) {
    return new Function('return (' + e + ')')();
  };
  mt.w.stringify = (function () {
    function e(a) {
      /["\\\x00-\x1f]/.test(a) &&
        (a = a.replace(/["\\\x00-\x1f]/g, function (a) {
          var f = b[a];
          if (f) return f;
          f = a.charCodeAt();
          return (
            '\\u00' + Math.floor(f / 16).toString(16) + (f % 16).toString(16)
          );
        }));
      return '"' + a + '"';
    }
    function a(a) {
      return 10 > a ? '0' + a : a;
    }
    var b = {
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"': '\\"',
      '\\': '\\\\',
    };
    return function (b) {
      switch (typeof b) {
        case 'undefined':
          return 'undefined';
        case 'number':
          return isFinite(b) ? String(b) : 'null';
        case 'string':
          return e(b);
        case 'boolean':
          return String(b);
        default:
          if (b === u) return 'null';
          if (b instanceof Array) {
            var d = ['['],
              f = b.length,
              g,
              l,
              r;
            for (l = 0; l < f; l++)
              switch (((r = b[l]), typeof r)) {
                case 'undefined':
                case 'function':
                case 'unknown':
                  break;
                default:
                  g && d.push(','), d.push(mt.w.stringify(r)), (g = 1);
              }
            d.push(']');
            return d.join('');
          }
          if (b instanceof Date)
            return (
              '"' +
              b.getFullYear() +
              '-' +
              a(b.getMonth() + 1) +
              '-' +
              a(b.getDate()) +
              'T' +
              a(b.getHours()) +
              ':' +
              a(b.getMinutes()) +
              ':' +
              a(b.getSeconds()) +
              '"'
            );
          g = ['{'];
          l = mt.w.stringify;
          for (f in b)
            if (Object.prototype.hasOwnProperty.call(b, f))
              switch (((r = b[f]), typeof r)) {
                case 'undefined':
                case 'unknown':
                case 'function':
                  break;
                default:
                  d && g.push(','), (d = 1), g.push(l(f) + ':' + l(r));
              }
          g.push('}');
          return g.join('');
      }
    };
  })();
  mt.localStorage = {};
  mt.localStorage.Q = function () {
    if (!mt.localStorage.g)
      try {
        (mt.localStorage.g = document.createElement('input')),
          (mt.localStorage.g.type = 'hidden'),
          (mt.localStorage.g.style.display = 'none'),
          mt.localStorage.g.addBehavior('#default#userData'),
          document
            .getElementsByTagName('head')[0]
            .appendChild(mt.localStorage.g);
      } catch (e) {
        return x;
      }
    return t;
  };
  mt.localStorage.set = function (e, a, b) {
    var k = new Date();
    k.setTime(k.getTime() + (b || 31536e6));
    try {
      window.localStorage
        ? ((a = k.getTime() + '|' + a), window.localStorage.setItem(e, a))
        : mt.localStorage.Q() &&
          ((mt.localStorage.g.expires = k.toUTCString()),
          mt.localStorage.g.load(document.location.hostname),
          mt.localStorage.g.setAttribute(e, a),
          mt.localStorage.g.save(document.location.hostname));
    } catch (d) {}
  };
  mt.localStorage.get = function (e) {
    if (window.localStorage) {
      if ((e = window.localStorage.getItem(e))) {
        var a = e.indexOf('|'),
          b = e.substring(0, a) - 0;
        if (b && b > new Date().getTime()) return e.substring(a + 1);
      }
    } else if (mt.localStorage.Q())
      try {
        return (
          mt.localStorage.g.load(document.location.hostname),
          mt.localStorage.g.getAttribute(e)
        );
      } catch (k) {}
    return u;
  };
  mt.localStorage.remove = function (e) {
    if (window.localStorage) window.localStorage.removeItem(e);
    else if (mt.localStorage.Q())
      try {
        mt.localStorage.g.load(document.location.hostname),
          mt.localStorage.g.removeAttribute(e),
          mt.localStorage.g.save(document.location.hostname);
      } catch (a) {}
  };
  mt.sessionStorage = {};
  mt.sessionStorage.set = function (e, a) {
    try {
      window.sessionStorage && window.sessionStorage.setItem(e, a);
    } catch (b) {}
  };
  mt.sessionStorage.get = function (e) {
    try {
      return window.sessionStorage ? window.sessionStorage.getItem(e) : u;
    } catch (a) {
      return u;
    }
  };
  mt.sessionStorage.remove = function (e) {
    try {
      window.sessionStorage && window.sessionStorage.removeItem(e);
    } catch (a) {}
  };
  (function () {
    var e = mt.w;
    mt.A = {};
    mt.A.log = function (a, b) {
      var e = new Image(),
        d =
          'mini_tangram_log_' +
          Math.floor(2147483648 * Math.random()).toString(36);
      window[d] = e;
      e.onload = function () {
        e.onload = u;
        e = window[d] = u;
        b && b(a);
      };
      e.src = a;
    };
    mt.A.get = function (a, b) {
      return mt.A.wa({
        url: a,
        method: 'GET',
        data: b.data,
        timeout: b.timeout,
        noCache: t,
        success: b.success,
        fail: b.fail,
      });
    };
    mt.A.wa = function (a) {
      function b(a) {
        var b = [],
          d;
        for (d in a)
          a.hasOwnProperty(d) &&
            b.push(encodeURIComponent(d) + '=' + encodeURIComponent(a[d]));
        return b.join('&');
      }
      function k(b) {
        var d = a[b];
        if (d)
          if ((q && clearTimeout(q), 'success' !== b)) d && d(m);
          else {
            var f;
            try {
              f = e.parse(m.responseText);
            } catch (g) {
              d && d(m);
              return;
            }
            d && d(m, f);
          }
      }
      a = a || {};
      var d = a.data;
      'object' === typeof d && (d = b(a.data || {}));
      var f = a.url,
        g = (a.method || 'GET').toUpperCase(),
        l = a.headers || {},
        r = a.timeout || 0,
        p = a.noCache || x,
        n = a.withCredentials || x,
        m,
        q;
      try {
        a: if (window.XMLHttpRequest) m = new XMLHttpRequest();
        else {
          try {
            m = new ActiveXObject('Microsoft.XMLHTTP');
            break a;
          } catch (v) {}
          m = s;
        }
        'GET' === g &&
          (d && ((f += (0 <= f.indexOf('?') ? '&' : '?') + d), (d = u)),
          p &&
            (f +=
              (0 <= f.indexOf('?') ? '&' : '?') + 'b' + +new Date() + '=1'));
        m.open(g, f, t);
        m.onreadystatechange = function () {
          if (4 === m.readyState) {
            var a = 0;
            try {
              a = m.status;
            } catch (b) {
              k('fail');
              return;
            }
            (200 <= a && 300 > a) || 304 === a || 1223 === a
              ? k('success')
              : k('fail');
          }
        };
        for (var w in l) l.hasOwnProperty(w) && m.setRequestHeader(w, l[w]);
        n && (m.withCredentials = t);
        r &&
          (q = setTimeout(function () {
            m.onreadystatechange = function () {};
            m.abort();
            k('fail');
          }, r));
        m.send(d);
      } catch (A) {
        k('fail');
      }
      return m;
    };
    return mt.A;
  })();
  h.o = {
    kb: 'http://tongji.baidu.com/hm-web/welcome/ico',
    aa: 'hm.baidu.com/hm.gif',
    xa: /^(tongji|hmcdn).baidu.com$/,
    Gb: 'tongji.baidu.com',
    hb: 'hmmd',
    ib: 'hmpl',
    Jb: 'utm_medium',
    gb: 'hmkw',
    Lb: 'utm_term',
    eb: 'hmci',
    Ib: 'utm_content',
    jb: 'hmsr',
    Kb: 'utm_source',
    fb: 'hmcu',
    Hb: 'utm_campaign',
    ka: 0,
    B: Math.round(+new Date() / 1e3),
    protocol: 'https:' === document.location.protocol ? 'https:' : 'http:',
    L: 'https:',
    Da: 6e5,
    bc: 5e3,
    Ea: 5,
    ca: 1024,
    G: 2147483647,
    ra: 'hca cc cf ci ck cl cm cp cu cw ds vl ep et ja ln lo lt rnd si su v cv lv api sn r ww p u tt'.split(
      ' '
    ),
    ga: t,
    Pb: {
      id: 'data-hm-id',
      Tb: 'data-hm-class',
      jc: 'data-hm-xpath',
      content: 'data-hm-content',
      hc: 'data-hm-tag',
      link: 'data-hm-link',
    },
    Rb: 'data-hm-enabled',
    Qb: 'data-hm-disabled',
    xb: 'https://hmcdn.baidu.com/static/tongji/plugins/',
    na: ['UrlChangeTracker'],
    Nb: {
      $b: 0,
      ic: 1,
      Xb: 2,
    },
    Yb: 'https://fclog.baidu.com/log/ocpcagl?type=behavior&emd=euc',
  };
  (function () {
    var e = {
      t: {},
      c: function (a, b) {
        this.t[a] = this.t[a] || [];
        this.t[a].push(b);
      },
      k: function (a, b) {
        this.t[a] = this.t[a] || [];
        for (var e = this.t[a].length, d = 0; d < e; d++) this.t[a][d](b);
      },
    };
    return (h.s = e);
  })();
  (function () {
    var e = mt.lang,
      a = /^https?:\/\//,
      b = {
        Oa: function (a) {
          var b;
          try {
            b = JSON.parse(decodeURIComponent(a[0]));
          } catch (f) {}
          return b;
        },
        la: function (a, d) {
          return (
            b.ma(h.b && h.b.a && h.b.a.u, a, d) ||
            b.ma(document.location.href, a, d)
          );
        },
        ma: function (b, d, f) {
          if (b === s) return x;
          a.test(d) || (b = b.replace(a, ''));
          d = d.replace(/\/$/, '');
          b = b.replace(/\/$/, '');
          f && (b = b.replace(/^(https?:\/\/)?www\./, '$1'));
          return RegExp(
            '^' +
              d.replace(/[?.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') +
              '$'
          ).test(b);
        },
        H: function (a, d) {
          var f = b.Oa(a);
          if (!e.i(f, 'Undefined')) {
            if (e.isArray(f)) {
              for (var g = 0; g < f.length; g++) if (b.la(f[g], d)) return t;
              return x;
            }
            if (e.J(f)) {
              var g = [],
                l;
              for (l in f)
                f.hasOwnProperty(l) && b.la(l, d) && (g = g.concat(f[l]));
              return g;
            }
          }
        },
      };
    return (h.S = b);
  })();
  (function () {
    function e(b, e) {
      var d = document.createElement('script');
      d.charset = 'utf-8';
      a.j(e) &&
        (d.readyState
          ? (d.onreadystatechange = function () {
              if ('loaded' === d.readyState || 'complete' === d.readyState)
                (d.onreadystatechange = u), e();
            })
          : (d.onload = function () {
              e();
            }));
      d.src = b;
      var f = document.getElementsByTagName('script')[0];
      f.parentNode.insertBefore(d, f);
    }
    var a = mt.lang;
    return (h.load = e);
  })();
  (function () {
    var e = h.o,
      a = {
        D: function () {
          if ('' !== c.icon) {
            var a = c.icon.split('|'),
              k = e.kb + '?s=' + c.id,
              d = 'https://hmcdn.baidu.com/static' + a[0] + '.gif';
            document.write(
              'swf' === a[1] || 'gif' === a[1]
                ? '<a href="' +
                    k +
                    '" target="_blank"><img border="0" src="' +
                    d +
                    '" width="' +
                    a[2] +
                    '" height="' +
                    a[3] +
                    '"></a>'
                : '<a href="' + k + '" target="_blank">' + a[0] + '</a>'
            );
          }
        },
      };
    h.s.c('pv-b', a.D);
    return a;
  })();
  (function () {
    var e = mt.url,
      a = mt.cookie,
      b = mt.localStorage,
      k = mt.sessionStorage,
      d = {
        getData: function (d) {
          try {
            return a.get(d) || k.get(d) || b.get(d);
          } catch (e) {}
        },
        setData: function (f, e, l) {
          try {
            a.set(f, e, {
              domain: d.I(),
              path: d.U(),
              C: l,
            }),
              l ? b.set(f, e, l) : k.set(f, e);
          } catch (r) {}
        },
        removeData: function (e) {
          try {
            a.set(e, '', {
              domain: d.I(),
              path: d.U(),
              C: -1,
            }),
              k.remove(e),
              b.remove(e);
          } catch (g) {}
        },
        I: function () {
          for (
            var a = document.location.hostname, b = 0, d = c.dm.length;
            b < d;
            b++
          )
            if (e.qb(a, c.dm[b])) return c.dm[b].replace(/(:\d+)?[/?#].*/, '');
          return a;
        },
        U: function () {
          for (var a = 0, b = c.dm.length; a < b; a++) {
            var d = c.dm[a];
            if (-1 < d.indexOf('/') && e.pb(d))
              return d.replace(/^[^/]+(\/.*)/, '$1') + '/';
          }
          return '/';
        },
      };
    return (h.R = d);
  })();
  (function () {
    var e = mt.lang,
      a = mt.d,
      b = h.S,
      k = {
        Ha: function (d, e) {
          return function (g) {
            var l = g.target || g.srcElement;
            if (l) {
              var r = b.H(e) || [],
                p = l.getAttribute(d.P);
              g = g.clientX + ':' + g.clientY;
              if (p && p === g) l.removeAttribute(d.P);
              else if (0 < r.length && (l = a.Wa(l)) && l.length)
                if (
                  ((r = l.length),
                  (p = l[l.length - 1]),
                  1e4 > r * p.split('>').length)
                )
                  for (p = 0; p < r; p++) k.qa(d, l[p]);
                else k.qa(d, p);
            }
          };
        },
        qa: function (a, b) {
          for (var g = {}, l = String(b).split('>').length, k = 0; k < l; k++)
            (g[b] = ''),
              /\[1\]$/.test(b) && (g[b.substring(0, b.lastIndexOf('['))] = ''),
              /\]$/.test(b) || (g[b + '[1]'] = ''),
              (b = b.substring(0, b.lastIndexOf('>')));
          a && e.J(a) && a.ba && a.ba(g);
        },
        zb: function (a, b) {
          return function (e) {
            (e.target || e.srcElement).setAttribute(
              a.P,
              e.clientX + ':' + e.clientY
            );
            a &&
              a.N &&
              (b ? a.N(b) : a.N('#' + encodeURIComponent(this.id), e.type));
          };
        },
      };
    return (h.Ia = k);
  })();
  (function () {
    var e = mt.d,
      a = mt.event,
      b = h.S,
      k = h.Ia,
      d = {
        P: 'HM_fix',
        ua: function () {
          a.c(document, 'click', k.Ha(d, c.etrk), t);
          if (!document.addEventListener)
            for (var f = b.H(c.etrk) || [], g = 0; g < f.length; g++) {
              var l = f[g];
              -1 === l.indexOf('>') &&
                (0 === l.indexOf('#') && (l = l.substring(1)),
                (l = e.La(l)) && a.c(l, 'click', k.zb(d), t));
            }
        },
        ba: function (a) {
          for (var e = b.H(c.etrk) || [], k = 0; k < e.length; k++) {
            var r = e[k];
            a.hasOwnProperty(r) && d.N(r);
          }
        },
        N: function (a, b) {
          h.b.a.et = 1;
          h.b.a.ep = '{id:' + a + ',eventType:' + (b || 'click') + '}';
          h.b.m();
        },
      };
    h.s.c('pv-b', d.ua);
    return d;
  })();
  (function () {
    var e = mt.d,
      a = mt.lang,
      b = mt.event,
      k = mt.e,
      d = h.o,
      f = h.S,
      g = [],
      l = {
        ta: function () {
          c.ctrk &&
            0 < c.ctrk.length &&
            (b.c(document, 'mouseup', l.Ca()),
            b.c(window, 'unload', function () {
              l.M();
            }),
            setInterval(function () {
              l.M();
            }, d.Da));
        },
        Ca: function () {
          return function (a) {
            if (f.H(c.ctrk, t) && ((a = l.Na(a)), '' !== a)) {
              var b = (
                d.L +
                '//' +
                d.aa +
                '?' +
                h.b.pa().replace(/ep=[^&]*/, 'ep=' + encodeURIComponent(a))
              ).length;
              b + (d.G + '').length > d.ca ||
                (b +
                  encodeURIComponent(g.join('!') + (g.length ? '!' : ''))
                    .length +
                  (d.G + '').length >
                  d.ca && l.M(),
                g.push(a),
                (g.length >= d.Ea || /\*a\*/.test(a)) && l.M());
            }
          };
        },
        Na: function (b) {
          var d = b.target || b.srcElement,
            f,
            m;
          k.mb
            ? ((m = Math.max(
                document.documentElement.scrollTop,
                document.body.scrollTop
              )),
              (f = Math.max(
                document.documentElement.scrollLeft,
                document.body.scrollLeft
              )),
              (f = b.clientX + f),
              (m = b.clientY + m))
            : ((f = b.pageX), (m = b.pageY));
          b = l.Ta(b, d, f, m);
          var q =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.offsetWidth;
          switch (c.align) {
            case 1:
              f -= q / 2;
              break;
            case 2:
              f -= q;
          }
          q = [];
          q.push(f);
          q.push(m);
          q.push(b.ub);
          q.push(b.vb);
          q.push(b.yb);
          q.push(a.n(b.wb));
          q.push(b.Mb);
          q.push(b.cb);
          (d = 'a' === (d.tagName || '').toLowerCase() ? d : e.Ma(d))
            ? (q.push('a'), q.push(a.n(encodeURIComponent(d.href))))
            : q.push('b');
          return q.join('*');
        },
        Ta: function (b, d, f, m) {
          b = e.Xa(d);
          var q = 0,
            g = 0,
            w = 0,
            l = 0;
          if (
            d &&
            ((q = d.offsetWidth || d.clientWidth),
            (g = d.offsetHeight || d.clientHeight),
            (l = e.Ua(d)),
            (w = l.left),
            (l = l.top),
            a.j(d.getBBox) &&
              ((g = d.getBBox()), (q = g.width), (g = g.height)),
            'html' === (d.tagName || '').toLowerCase())
          )
            (q = Math.max(q, d.clientWidth)), (g = Math.max(g, d.clientHeight));
          return {
            ub: Math.round(100 * ((f - w) / q)),
            vb: Math.round(100 * ((m - l) / g)),
            yb: k.orientation,
            wb: b,
            Mb: q,
            cb: g,
          };
        },
        M: function () {
          0 !== g.length &&
            ((h.b.a.et = 2), (h.b.a.ep = g.join('!')), h.b.m(), (g = []));
        },
      };
    h.s.c('pv-b', l.ta);
    return l;
  })();
  (function () {
    function e() {
      return function () {
        h.b.a.et = 3;
        h.b.a.ep = h.T.Va() + ',' + h.T.Ra();
        h.b.a.hca = c.hca;
        h.b.m();
      };
    }
    function a() {
      clearTimeout(C);
      var b;
      w && (b = 'visible' == document[w]);
      A && (b = !document[A]);
      l = 'undefined' == typeof b ? t : b;
      if ((!g || !r) && l && p) (v = t), (m = +new Date());
      else if (g && r && (!l || !p)) (v = x), (q += +new Date() - m);
      g = l;
      r = p;
      C = setTimeout(a, 100);
    }
    function b(b) {
      var a = document,
        d = '';
      if (b in a) d = b;
      else
        for (var m = ['webkit', 'ms', 'moz', 'o'], e = 0; e < m.length; e++) {
          var f = m[e] + b.charAt(0).toUpperCase() + b.slice(1);
          if (f in a) {
            d = f;
            break;
          }
        }
      return d;
    }
    function k(b) {
      if (
        !('focus' == b.type || 'blur' == b.type) ||
        !(b.target && b.target != window)
      )
        (p = 'focus' == b.type || 'focusin' == b.type ? t : x), a();
    }
    var d = mt.event,
      f = h.s,
      g = t,
      l = t,
      r = t,
      p = t,
      n = +new Date(),
      m = n,
      q = 0,
      v = t,
      w = b('visibilityState'),
      A = b('hidden'),
      C;
    a();
    (function () {
      var b = w.replace(/[vV]isibilityState/, 'visibilitychange');
      d.c(document, b, a);
      d.c(window, 'pageshow', a);
      d.c(window, 'pagehide', a);
      'object' == typeof document.onfocusin
        ? (d.c(document, 'focusin', k), d.c(document, 'focusout', k))
        : (d.c(window, 'focus', k), d.c(window, 'blur', k));
    })();
    h.T = {
      Va: function () {
        return +new Date() - n;
      },
      Ra: function () {
        return v ? +new Date() - m + q : q;
      },
    };
    f.c('pv-b', function () {
      d.c(window, 'unload', e());
    });
    f.c('duration-send', e());
    f.c('duration-done', function () {
      m = n = +new Date();
      q = 0;
    });
    return h.T;
  })();
  (function () {
    var e = mt.lang,
      a = h.o,
      b = h.load,
      k = h.R,
      d = {
        lb: function (d) {
          if (
            (window._dxt === s || e.i(window._dxt, 'Array')) &&
            'undefined' !== typeof h.b
          ) {
            var g = k.I();
            b(
              [
                a.protocol,
                '//datax.baidu.com/x.js?si=',
                c.id,
                '&dm=',
                encodeURIComponent(g),
              ].join(''),
              d
            );
          }
        },
        Fb: function (b) {
          if (e.i(b, 'String') || e.i(b, 'Number'))
            (window._dxt = window._dxt || []),
              window._dxt.push(['_setUserId', b]);
        },
      };
    return (h.Fa = d);
  })();
  (function () {
    function e(a) {
      for (var d in a)
        if ({}.hasOwnProperty.call(a, d)) {
          var f = a[d];
          b.J(f) || b.isArray(f) ? e(f) : (a[d] = String(f));
        }
    }
    var a = mt.url,
      b = mt.lang,
      k = mt.w,
      d = mt.e,
      f = h.o,
      g = h.s,
      l = h.Fa,
      r = h.load,
      p = h.R,
      n = {
        F: [],
        O: 0,
        Y: x,
        D: function () {
          n.h = 0;
          g.c('pv-b', function () {
            n.Ga();
            n.Ja();
          });
          g.c('pv-d', function () {
            n.Ka();
          });
          g.c('stag-b', function () {
            h.b.a.api = n.h || n.O ? n.h + '_' + n.O : '';
          });
          g.c('stag-d', function () {
            h.b.a.api = 0;
            n.h = 0;
            n.O = 0;
          });
        },
        Ga: function () {
          var a = window._hmt || [];
          if (!a || b.i(a, 'Array'))
            (window._hmt = {
              id: c.id,
              cmd: {},
              push: function () {
                for (var a = window._hmt, d = 0; d < arguments.length; d++) {
                  var e = arguments[d];
                  b.i(e, 'Array') &&
                    (a.cmd[a.id].push(e),
                    '_setAccount' === e[0] &&
                      1 < e.length &&
                      /^[0-9a-f]{31,32}$/.test(e[1]) &&
                      ((e = e[1]), (a.id = e), (a.cmd[e] = a.cmd[e] || [])));
                }
              },
            }),
              (window._hmt.cmd[c.id] = []),
              window._hmt.push.apply(window._hmt, a);
        },
        Ja: function () {
          var b = window._hmt;
          if (b && b.cmd && b.cmd[c.id])
            for (
              var a = b.cmd[c.id],
                d = /^_track(Event|Order)$/,
                e = 0,
                f = a.length;
              e < f;
              e++
            ) {
              var g = a[e];
              d.test(g[0]) ? n.F.push(g) : n.$(g);
            }
          b.cmd[c.id] = {
            push: n.$,
          };
        },
        Ka: function () {
          if (0 < n.F.length)
            for (var b = 0, a = n.F.length; b < a; b++) n.$(n.F[b]);
          n.F = u;
        },
        $: function (a) {
          var d = a[0];
          if (n.hasOwnProperty(d) && b.j(n[d])) n[d](a);
        },
        _setAccount: function (b) {
          1 < b.length && /^[0-9a-f]{31,32}$/.test(b[1]) && (n.h |= 1);
        },
        _setAutoPageview: function (b) {
          if (1 < b.length && ((b = b[1]), x === b || t === b))
            (n.h |= 2), (h.b.ha = b);
        },
        _trackPageview: function (b) {
          1 < b.length &&
            b[1].charAt &&
            '/' === b[1].charAt(0) &&
            ((n.h |= 4),
            (h.b.a.sn = h.b.ea()),
            (h.b.a.et = 0),
            (h.b.a.ep = ''),
            (h.b.a.vl = d.W()),
            n.Y || (h.b.a.su = h.b.a.u || document.location.href),
            (h.b.a.u = f.protocol + '//' + document.location.host + b[1]),
            h.b.m(),
            (h.b.sb = +new Date()));
        },
        _trackEvent: function (a) {
          2 < a.length &&
            ((n.h |= 8),
            (h.b.a.et = 4),
            (h.b.a.ep =
              b.n(a[1]) +
              '*' +
              b.n(a[2]) +
              (a[3] ? '*' + b.n(a[3]) : '') +
              (a[4] ? '*' + b.n(a[4]) : '')),
            h.b.m());
        },
        _setCustomVar: function (a) {
          if (!(4 > a.length)) {
            var d = a[1],
              e = a[4] || 3;
            if (0 < d && 6 > d && 0 < e && 4 > e) {
              n.O++;
              for (
                var f = (h.b.a.cv || '*').split('!'), g = f.length;
                g < d - 1;
                g++
              )
                f.push('*');
              f[d - 1] = e + '*' + b.n(a[2]) + '*' + b.n(a[3]);
              h.b.a.cv = f.join('!');
              a = h.b.a.cv
                .replace(/[^1](\*[^!]*){2}/g, '*')
                .replace(/((^|!)\*)+$/g, '');
              '' !== a
                ? p.setData('Hm_cv_' + c.id, encodeURIComponent(a), c.age)
                : p.removeData('Hm_cv_' + c.id);
            }
          }
        },
        _setReferrerOverride: function (a) {
          1 < a.length &&
            ((a = a[1]),
            b.i(a, 'String')
              ? ((h.b.a.su =
                  '/' === a.charAt(0)
                    ? f.protocol + '//' + window.location.host + a
                    : a),
                (n.Y = t))
              : (n.Y = x));
        },
        _trackOrder: function (a) {
          a = a[1];
          b.J(a) &&
            (e(a),
            (n.h |= 16),
            (h.b.a.et = 94),
            (h.b.a.ep = k.stringify(a)),
            h.b.m());
        },
        _setDataxId: function (a) {
          a = a[1];
          l.lb();
          l.Fb(a);
        },
        _setAutoTracking: function (a) {
          if (1 < a.length && ((a = a[1]), x === a || t === a)) h.b.ia = a;
        },
        _trackPageDuration: function (a) {
          1 < a.length
            ? ((a = a[1]),
              2 === String(a).split(',').length &&
                ((h.b.a.et = 3), (h.b.a.ep = a), h.b.m()))
            : g.k('duration-send');
          g.k('duration-done');
        },
        _require: function (b) {
          1 < b.length && ((b = b[1]), f.xa.test(a.V(b)) && r(b));
        },
        _providePlugin: function (a) {
          if (1 < a.length) {
            var d = window._hmt,
              e = a[1];
            a = a[2];
            if (
              b.X(f.na, e) &&
              b.j(a) &&
              ((d.plugins = d.plugins || {}),
              (d.z = d.z || {}),
              (d.plugins[e] = a),
              (d.l = d.l || []),
              (a = d.l.slice()),
              e && a.length && a[0][1] === e)
            )
              for (var g = 0, k = a.length; g < k; g++) {
                var l = a[g][2] || {};
                if (d.plugins[e] && !d.z[e])
                  (d.z[e] = new d.plugins[e](l)), d.l.shift();
                else break;
              }
          }
        },
        _requirePlugin: function (a) {
          if (1 < a.length) {
            var d = window._hmt,
              e = a[1],
              g = a[2] || {};
            if (b.X(f.na, e))
              if (
                ((d.plugins = d.plugins || {}),
                (d.z = d.z || {}),
                d.plugins[e] && !d.z[e])
              )
                d.z[e] = new d.plugins[e](g);
              else {
                d.l = d.l || [];
                for (var g = 0, k = d.l.length; g < k; g++)
                  if (d.l[g][1] === e) return;
                d.l.push(a);
                n._require([u, f.xb + e + '.js']);
              }
          }
        },
      };
    n.D();
    h.ya = n;
    return h.ya;
  })();
  (function () {
    var e = h.s;
    c.spa !== s &&
      '1' === String(c.spa) &&
      ((window._hmt = window._hmt || []),
      window._hmt.push(['_requirePlugin', 'UrlChangeTracker']),
      e.c('pv-b', function () {
        '' !== window.location.hash && (h.b.a.u = window.location.href);
      }));
  })();
  (function () {
    function e() {
      'undefined' === typeof window['_bdhm_loaded_' + c.id] &&
        ((window['_bdhm_loaded_' + c.id] = t),
        (this.a = {}),
        (this.ob = this.ia = this.ha = t),
        (this.ga = m.ga),
        (this.Sb = k.Z(c.aet) && 0 < c.aet.length ? c.aet.split(',') : ''),
        this.D());
    }
    var a = mt.url,
      b = mt.A,
      k = mt.lang,
      d = mt.cookie,
      f = mt.e,
      g = mt.sessionStorage,
      l = mt.w,
      r = mt.event,
      p = h.R,
      n = mt.localStorage,
      m = h.o,
      q = h.load,
      v = h.s;
    e.prototype = {
      Db: function () {
        var a, b, e, f;
        m.ka = p.getData('Hm_lpvt_' + c.id) || 0;
        if ((f = p.getData('Hm_lvt_' + c.id))) {
          for (b = f.split(','); 2592e3 < m.B - b[0]; ) b.shift();
          e = 4 > b.length ? 2 : 3;
          for (m.B - m.ka > c.vdur && b.push(m.B); 4 < b.length; ) b.shift();
          f = b.join(',');
          b = b[b.length - 1];
        } else (f = m.B), (b = ''), (e = 1);
        this.nb()
          ? (p.setData('Hm_lvt_' + c.id, f, c.age),
            p.setData('Hm_lpvt_' + c.id, m.B),
            (a = d.rb(p.I(), p.U())))
          : this.da();
        this.a.cc = a;
        this.a.lt = b;
        this.a.lv = e;
      },
      nb: function () {
        var b = a.V(document.location.href);
        return !k.X(
          'sjh.baidu.com isite.baidu.com ls.wejianzhan.com bs.wejianzhan.com product.weijianzhan.com qianhu.weijianzhan.com aisite.wejianzhan.com'.split(
            ' '
          ),
          b
        );
      },
      Aa: function () {
        var a = 'Hm_clear_cookie_' + c.id,
          b = n.get(a) || 0;
        c.fc && Number(c.fc) > Number(b) && (this.da(), n.set(a, c.fc));
      },
      da: function () {
        for (var a = document.cookie.split(';'), b = 0; b < a.length; b++) {
          var d = a[b].split('=');
          d.length &&
            /Hm_(up|cv|lp?vt)_[0-9a-f]{31}/.test(String(d[0])) &&
            p.removeData(k.trim(d[0]));
          d.length &&
            /Hm_ck_[0-9]{13}/.test(String(d[0])) &&
            p.removeData(k.trim(d[0]));
        }
      },
      pa: function () {
        for (var a = [], b = this.a.et, d = 0, e = m.ra.length; d < e; d++) {
          var f = m.ra[d],
            g = this.a[f];
          'undefined' !== typeof g &&
            '' !== g &&
            ('tt' !== f || ('tt' === f && 0 === b)) &&
            a.push(f + '=' + encodeURIComponent(g));
        }
        return a.join('&');
      },
      Eb: function () {
        this.Db();
        this.a.si = c.id;
        this.a.sn = this.ea();
        this.a.su = document.referrer;
        this.a.ds = f.Ab;
        this.a.cl = f.colorDepth + '-bit';
        this.a.ln = String(f.language).toLowerCase();
        this.a.ja = f.javaEnabled ? 1 : 0;
        this.a.ck = f.cookieEnabled ? 1 : 0;
        this.a.lo = 'number' === typeof _bdhm_top ? 1 : 0;
        this.a.v = '1.3.0';
        this.a.cv = decodeURIComponent(p.getData('Hm_cv_' + c.id) || '');
        this.a.tt = document.title || '';
        this.a.vl = f.W();
        var b = document.location.href;
        this.a.cm = a.f(b, m.hb) || '';
        this.a.cp = a.f(b, m.ib) || a.f(b, m.Jb) || '';
        this.a.cw = a.f(b, m.gb) || a.f(b, m.Lb) || '';
        this.a.ci = a.f(b, m.eb) || a.f(b, m.Ib) || '';
        this.a.cf = a.f(b, m.jb) || a.f(b, m.Kb) || '';
        this.a.cu = a.f(b, m.fb) || a.f(b, m.Hb) || '';
        /https?:/.test(document.location.protocol) && (this.a.u = b);
      },
      D: function () {
        try {
          this.Aa(),
            this.Eb(),
            this.Cb(),
            (h.b = this),
            this.za(),
            this.tb(),
            v.k('pv-b'),
            this.ob && this.Bb();
        } catch (a) {
          var d = [];
          d.push('si=' + c.id);
          d.push('n=' + encodeURIComponent(a.name));
          d.push('m=' + encodeURIComponent(a.message));
          d.push('r=' + encodeURIComponent(document.referrer));
          b.log(m.L + '//' + m.aa + '?' + d.join('&'));
        }
      },
      Bb: function () {
        function a() {
          v.k('pv-d');
        }
        this.ha
          ? ((this.a.et = 0),
            (this.a.ep = ''),
            v.k('setPageviewProp'),
            (this.a.vl = f.W()),
            this.m(a),
            (this.a.p = ''))
          : a();
        this.sb = +new Date();
        v.k('clearPageviewProp');
      },
      m: function (a) {
        if (this.ia) {
          var d = this;
          d.a.rnd = Math.round(Math.random() * m.G);
          d.a.r = f.orientation;
          d.a.ww = f.sa;
          v.k('stag-b');
          var e = m.L + '//' + m.aa + '?' + d.pa();
          v.k('stag-d');
          d.va(e);
          b.log(e, function (b) {
            d.oa(b);
            k.j(a) && a.call(d);
          });
        }
      },
      za: function () {
        try {
          if (window.postMessage && window.self !== window.parent) {
            var b = this;
            r.c(window, 'message', function (d) {
              if (a.V(d.origin) === m.Gb) {
                d = d.data || {};
                var e = d.jn || '',
                  f = /^customevent$|^heatmap$|^pageclick$|^select$/.test(e);
                if (RegExp(c.id).test(d.sd || '') && f)
                  (b.a.rnd = Math.round(Math.random() * m.G)),
                    q(m.protocol + '//' + c.js + e + '.js?' + b.a.rnd);
              }
            });
            window.parent.postMessage(
              {
                id: c.id,
                url: document.location.href,
                status: '__Messenger__hmLoaded',
              },
              '*'
            );
          }
        } catch (d) {}
      },
      tb: function () {
        try {
          if (window.self === window.parent) {
            var b = document.location.href,
              d = a.f(b, 'baidu-analytics-token'),
              e = a.f(b, 'baidu-analytics-jn');
            /^[a-f0-9]{32}\/?$/.test(d) &&
              /^(overlay|vabtest)\/?$/.test(e) &&
              q(
                m.protocol +
                  '//' +
                  c.js +
                  e +
                  '.js?' +
                  Math.round(Math.random() * m.G)
              );
          }
        } catch (f) {}
      },
      va: function (a) {
        var b;
        try {
          b = l.parse(g.get('Hm_unsent_' + c.id) || '[]');
        } catch (d) {
          b = [];
        }
        var e = this.a.u
          ? ''
          : '&u=' + encodeURIComponent(document.location.href);
        b.push(a.replace(/^https?:\/\//, '') + e);
        g.set('Hm_unsent_' + c.id, l.stringify(b));
      },
      oa: function (a) {
        var b;
        try {
          b = l.parse(g.get('Hm_unsent_' + c.id) || '[]');
        } catch (d) {
          b = [];
        }
        if (b.length) {
          a = a.replace(/^https?:\/\//, '');
          for (var e = 0; e < b.length; e++)
            if (a.replace(/&u=[^&]*/, '') === b[e].replace(/&u=[^&]*/, '')) {
              b.splice(e, 1);
              break;
            }
          b.length ? g.set('Hm_unsent_' + c.id, l.stringify(b)) : this.Ba();
        }
      },
      Ba: function () {
        g.remove('Hm_unsent_' + c.id);
      },
      Cb: function () {
        var a = this,
          d;
        try {
          d = l.parse(g.get('Hm_unsent_' + c.id) || '[]');
        } catch (e) {
          d = [];
        }
        if (d.length)
          for (
            var f = function (d) {
                b.log(m.L + '//' + d, function (b) {
                  a.oa(b);
                });
              },
              k = 0;
            k < d.length;
            k++
          )
            f(d[k]);
      },
      ea: function () {
        return Math.round(+new Date() / 1e3) % 65535;
      },
    };
    return new e();
  })();
  var y = h.o,
    z = h.load;
  if (c.apps) {
    var B = [y.protocol, '//ers.baidu.com/app/s.js?'];
    B.push(c.apps);
    z(B.join(''));
  }
  var D = h.o,
    E = h.load;
  c.pt &&
    E(
      [D.protocol, '//ada.baidu.com/phone-tracker/insert_bdtj?sid=', c.pt].join(
        ''
      )
    );
  var F = h.load;
  if (c.qiao) {
    for (
      var G = ['https://goutong.baidu.com/site/'],
        H = c.id,
        I = 5381,
        J = H.length,
        K = 0;
      K < J;
      K++
    )
      I = (33 * I + Number(H.charCodeAt(K))) % 4294967296;
    2147483648 < I && (I -= 2147483648);
    G.push((I % 1e3) + '/');
    G.push(c.id + '/b.js');
    G.push('?siteId=' + c.qiao);
    F(G.join(''));
  }
})();
