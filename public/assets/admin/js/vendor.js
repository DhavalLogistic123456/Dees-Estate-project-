function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*!
 * metismenu - v2.7.7
 * A jQuery menu plugin
 * https://github.com/onokumus/metismenu#readme
 *
 * Made by Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
 * Under MIT License
 */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : global.metisMenu = factory(global.jQuery);
})(this, function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var Util = function ($$$1) {
    // eslint-disable-line no-shadow
    var TRANSITION_END = 'transitionend';
    var Util = {
      // eslint-disable-line no-shadow
      TRANSITION_END: 'mmTransitionEnd',
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      }
    };

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined;
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.mmEmulateTransitionEnd = transitionEndEmulator; // eslint-disable-line no-param-reassign
      // eslint-disable-next-line no-param-reassign

      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }

    setTransitionEndSupport();
    return Util;
  }($);

  var MetisMenu = function ($$$1) {
    // eslint-disable-line no-shadow
    var NAME = 'metisMenu';
    var DATA_KEY = 'metisMenu';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var TRANSITION_DURATION = 350;
    var Default = {
      toggle: true,
      preventDefault: true,
      activeClass: 'active',
      collapseClass: 'collapse',
      collapseInClass: 'in',
      collapsingClass: 'collapsing',
      triggerElement: 'a',
      parentTrigger: 'li',
      subMenu: 'ul'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };

    var MetisMenu = /*#__PURE__*/function () {
      // eslint-disable-line no-shadow
      function MetisMenu(element, config) {
        this.element = element;
        this.config = _objectSpread({}, Default, config);
        this.transitioning = null;
        this.init();
      }

      var _proto = MetisMenu.prototype;

      _proto.init = function init() {
        var self = this;
        var conf = this.config;
        $$$1(this.element).find(conf.parentTrigger + "." + conf.activeClass).has(conf.subMenu).children(conf.subMenu).attr('aria-expanded', true).addClass(conf.collapseClass + " " + conf.collapseInClass);
        $$$1(this.element).find(conf.parentTrigger).not("." + conf.activeClass).has(conf.subMenu).children(conf.subMenu).attr('aria-expanded', false).addClass(conf.collapseClass);
        $$$1(this.element).find(conf.parentTrigger).has(conf.subMenu).children(conf.triggerElement).on(Event.CLICK_DATA_API, function (e) {
          // eslint-disable-line func-names
          var eTar = $$$1(this);
          var paRent = eTar.parent(conf.parentTrigger);
          var sibLings = paRent.siblings(conf.parentTrigger).children(conf.triggerElement);
          var List = paRent.children(conf.subMenu);

          if (conf.preventDefault) {
            e.preventDefault();
          }

          if (eTar.attr('aria-disabled') === 'true') {
            return;
          }

          if (paRent.hasClass(conf.activeClass)) {
            eTar.attr('aria-expanded', false);
            self.hide(List);
          } else {
            self.show(List);
            eTar.attr('aria-expanded', true);

            if (conf.toggle) {
              sibLings.attr('aria-expanded', false);
            }
          }

          if (conf.onTransitionStart) {
            conf.onTransitionStart(e);
          }
        });
      };

      _proto.show = function show(element) {
        var _this = this;

        if (this.transitioning || $$$1(element).hasClass(this.config.collapsingClass)) {
          return;
        }

        var elem = $$$1(element);
        var startEvent = $$$1.Event(Event.SHOW);
        elem.trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        elem.parent(this.config.parentTrigger).addClass(this.config.activeClass);

        if (this.config.toggle) {
          this.hide(elem.parent(this.config.parentTrigger).siblings().children(this.config.subMenu + "." + this.config.collapseInClass).attr('aria-expanded', false));
        }

        elem.removeClass(this.config.collapseClass).addClass(this.config.collapsingClass).height(0);
        this.setTransitioning(true);

        var complete = function complete() {
          // check if disposed
          if (!_this.config || !_this.element) {
            return;
          }

          elem.removeClass(_this.config.collapsingClass).addClass(_this.config.collapseClass + " " + _this.config.collapseInClass).height('').attr('aria-expanded', true);

          _this.setTransitioning(false);

          elem.trigger(Event.SHOWN);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        elem.height(element[0].scrollHeight).one(Util.TRANSITION_END, complete).mmEmulateTransitionEnd(TRANSITION_DURATION);
      };

      _proto.hide = function hide(element) {
        var _this2 = this;

        if (this.transitioning || !$$$1(element).hasClass(this.config.collapseInClass)) {
          return;
        }

        var elem = $$$1(element);
        var startEvent = $$$1.Event(Event.HIDE);
        elem.trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        elem.parent(this.config.parentTrigger).removeClass(this.config.activeClass); // eslint-disable-next-line no-unused-expressions

        elem.height(elem.height())[0].offsetHeight;
        elem.addClass(this.config.collapsingClass).removeClass(this.config.collapseClass).removeClass(this.config.collapseInClass);
        this.setTransitioning(true);

        var complete = function complete() {
          // check if disposed
          if (!_this2.config || !_this2.element) {
            return;
          }

          if (_this2.transitioning && _this2.config.onTransitionEnd) {
            _this2.config.onTransitionEnd();
          }

          _this2.setTransitioning(false);

          elem.trigger(Event.HIDDEN);
          elem.removeClass(_this2.config.collapsingClass).addClass(_this2.config.collapseClass).attr('aria-expanded', false);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        if (elem.height() === 0 || elem.css('display') === 'none') {
          complete();
        } else {
          elem.height(0).one(Util.TRANSITION_END, complete).mmEmulateTransitionEnd(TRANSITION_DURATION);
        }
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this.transitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this.element, DATA_KEY);
        $$$1(this.element).find(this.config.parentTrigger).has(this.config.subMenu).children(this.config.triggerElement).off('click');
        this.transitioning = null;
        this.config = null;
        this.element = null;
      };

      MetisMenu.jQueryInterface = function jQueryInterface(config) {
        // eslint-disable-next-line func-names
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var conf = _objectSpread({}, Default, $this.data(), _typeof(config) === 'object' && config ? config : {});

          if (!data && /dispose/.test(config)) {
            this.dispose();
          }

          if (!data) {
            data = new MetisMenu(this, conf);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      return MetisMenu;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = MetisMenu.jQueryInterface; // eslint-disable-line no-param-reassign

    $$$1.fn[NAME].Constructor = MetisMenu; // eslint-disable-line no-param-reassign

    $$$1.fn[NAME].noConflict = function () {
      // eslint-disable-line no-param-reassign
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT; // eslint-disable-line no-param-reassign

      return MetisMenu.jQueryInterface;
    };

    return MetisMenu;
  }($);

  return MetisMenu;
});
/*! pace 1.0.2 */


(function () {
  var a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u,
      _v,
      w,
      x,
      y,
      z,
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L,
      M,
      N,
      O,
      P,
      Q,
      R,
      S,
      T,
      U,
      V,
      W,
      X = [].slice,
      Y = {}.hasOwnProperty,
      Z = function Z(a, b) {
    function c() {
      this.constructor = a;
    }

    for (var d in b) {
      Y.call(b, d) && (a[d] = b[d]);
    }

    return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, a;
  },
      $ = [].indexOf || function (a) {
    for (var b = 0, c = this.length; c > b; b++) {
      if (b in this && this[b] === a) return b;
    }

    return -1;
  };

  for (u = {
    catchupTime: 100,
    initialRate: .03,
    minTime: 250,
    ghostTime: 100,
    maxProgressPerFrame: 20,
    easeFactor: 1.25,
    startOnPageLoad: !0,
    restartOnPushState: !0,
    restartOnRequestAfter: 500,
    target: "body",
    elements: {
      checkInterval: 100,
      selectors: ["body"]
    },
    eventLag: {
      minSamples: 10,
      sampleCount: 3,
      lagThreshold: 3
    },
    ajax: {
      trackMethods: ["GET"],
      trackWebSockets: !0,
      ignoreURLs: []
    }
  }, C = function C() {
    var a;
    return null != (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? a : +new Date();
  }, E = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == E && (E = function E(a) {
    return setTimeout(a, 50);
  }, t = function t(a) {
    return clearTimeout(a);
  }), G = function G(a) {
    var b, _c;

    return b = C(), (_c = function c() {
      var d;
      return d = C() - b, d >= 33 ? (b = C(), a(d, function () {
        return E(_c);
      })) : setTimeout(_c, 33 - d);
    })();
  }, F = function F() {
    var a, b, c;
    return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? X.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b];
  }, _v = function v() {
    var a, b, c, d, e, f, g;

    for (b = arguments[0], d = 2 <= arguments.length ? X.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++) {
      if (c = d[f]) for (a in c) {
        Y.call(c, a) && (e = c[a], null != b[a] && "object" == _typeof(b[a]) && null != e && "object" == _typeof(e) ? _v(b[a], e) : b[a] = e);
      }
    }

    return b;
  }, q = function q(a) {
    var b, c, d, e, f;

    for (c = b = 0, e = 0, f = a.length; f > e; e++) {
      d = a[e], c += Math.abs(d), b++;
    }

    return c / b;
  }, x = function x(a, b) {
    var c, d, e;

    if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
      if (c = e.getAttribute("data-pace-" + a), !b) return c;

      try {
        return JSON.parse(c);
      } catch (f) {
        return d = f, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0;
      }
    }
  }, g = function () {
    function a() {}

    return a.prototype.on = function (a, b, c, d) {
      var e;
      return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({
        handler: b,
        ctx: c,
        once: d
      });
    }, a.prototype.once = function (a, b, c) {
      return this.on(a, b, c, !0);
    }, a.prototype.off = function (a, b) {
      var c, d, e;

      if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
        if (null == b) return delete this.bindings[a];

        for (c = 0, e = []; c < this.bindings[a].length;) {
          e.push(this.bindings[a][c].handler === b ? this.bindings[a].splice(c, 1) : c++);
        }

        return e;
      }
    }, a.prototype.trigger = function () {
      var a, b, c, d, e, f, g, h, i;

      if (c = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
        for (e = 0, i = []; e < this.bindings[c].length;) {
          h = this.bindings[c][e], d = h.handler, b = h.ctx, f = h.once, d.apply(null != b ? b : this, a), i.push(f ? this.bindings[c].splice(e, 1) : e++);
        }

        return i;
      }
    }, a;
  }(), j = window.Pace || {}, window.Pace = j, _v(j, g.prototype), D = j.options = _v({}, u, window.paceOptions, x()), U = ["ajax", "document", "eventLag", "elements"], Q = 0, S = U.length; S > Q; Q++) {
    K = U[Q], D[K] === !0 && (D[K] = u[K]);
  }

  i = function (a) {
    function b() {
      return V = b.__super__.constructor.apply(this, arguments);
    }

    return Z(b, a), b;
  }(Error), b = function () {
    function a() {
      this.progress = 0;
    }

    return a.prototype.getElement = function () {
      var a;

      if (null == this.el) {
        if (a = document.querySelector(D.target), !a) throw new i();
        this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el);
      }

      return this.el;
    }, a.prototype.finish = function () {
      var a;
      return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done";
    }, a.prototype.update = function (a) {
      return this.progress = a, this.render();
    }, a.prototype.destroy = function () {
      try {
        this.getElement().parentNode.removeChild(this.getElement());
      } catch (a) {
        i = a;
      }

      return this.el = void 0;
    }, a.prototype.render = function () {
      var a, b, c, d, e, f, g;
      if (null == document.querySelector(D.target)) return !1;

      for (a = this.getElement(), d = "translate3d(" + this.progress + "%, 0, 0)", g = ["webkitTransform", "msTransform", "transform"], e = 0, f = g.length; f > e; e++) {
        b = g[e], a.children[0].style[b] = d;
      }

      return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? c = "99" : (c = this.progress < 10 ? "0" : "", c += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + c)), this.lastRenderedProgress = this.progress;
    }, a.prototype.done = function () {
      return this.progress >= 100;
    }, a;
  }(), h = function () {
    function a() {
      this.bindings = {};
    }

    return a.prototype.trigger = function (a, b) {
      var c, d, e, f, g;

      if (null != this.bindings[a]) {
        for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++) {
          c = f[d], g.push(c.call(this, b));
        }

        return g;
      }
    }, a.prototype.on = function (a, b) {
      var c;
      return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b);
    }, a;
  }(), P = window.XMLHttpRequest, O = window.XDomainRequest, N = window.WebSocket, w = function w(a, b) {
    var c, d, e;
    e = [];

    for (d in b.prototype) {
      try {
        e.push(null == a[d] && "function" != typeof b[d] ? "function" == typeof Object.defineProperty ? Object.defineProperty(a, d, {
          get: function get() {
            return b.prototype[d];
          },
          configurable: !0,
          enumerable: !0
        }) : a[d] = b.prototype[d] : void 0);
      } catch (f) {
        c = f;
      }
    }

    return e;
  }, A = [], j.ignore = function () {
    var a, b, c;
    return b = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], A.unshift("ignore"), c = b.apply(null, a), A.shift(), c;
  }, j.track = function () {
    var a, b, c;
    return b = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], A.unshift("track"), c = b.apply(null, a), A.shift(), c;
  }, J = function J(a) {
    var b;
    if (null == a && (a = "GET"), "track" === A[0]) return "force";

    if (!A.length && D.ajax) {
      if ("socket" === a && D.ajax.trackWebSockets) return !0;
      if (b = a.toUpperCase(), $.call(D.ajax.trackMethods, b) >= 0) return !0;
    }

    return !1;
  }, k = function (a) {
    function b() {
      var a,
          c = this;
      b.__super__.constructor.apply(this, arguments), a = function a(_a) {
        var b;
        return b = _a.open, _a.open = function (d, e) {
          return J(d) && c.trigger("request", {
            type: d,
            url: e,
            request: _a
          }), b.apply(_a, arguments);
        };
      }, window.XMLHttpRequest = function (b) {
        var c;
        return c = new P(b), a(c), c;
      };

      try {
        w(window.XMLHttpRequest, P);
      } catch (d) {}

      if (null != O) {
        window.XDomainRequest = function () {
          var b;
          return b = new O(), a(b), b;
        };

        try {
          w(window.XDomainRequest, O);
        } catch (d) {}
      }

      if (null != N && D.ajax.trackWebSockets) {
        window.WebSocket = function (a, b) {
          var d;
          return d = null != b ? new N(a, b) : new N(a), J("socket") && c.trigger("request", {
            type: "socket",
            url: a,
            protocols: b,
            request: d
          }), d;
        };

        try {
          w(window.WebSocket, N);
        } catch (d) {}
      }
    }

    return Z(b, a), b;
  }(h), R = null, y = function y() {
    return null == R && (R = new k()), R;
  }, I = function I(a) {
    var b, c, d, e;

    for (e = D.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++) {
      if (b = e[c], "string" == typeof b) {
        if (-1 !== a.indexOf(b)) return !0;
      } else if (b.test(a)) return !0;
    }

    return !1;
  }, y().on("request", function (b) {
    var c, d, e, f, g;
    return f = b.type, e = b.request, g = b.url, I(g) ? void 0 : j.running || D.restartOnRequestAfter === !1 && "force" !== J(f) ? void 0 : (d = arguments, c = D.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function () {
      var b, c, g, h, i, k;

      if (b = "socket" === f ? e.readyState < 2 : 0 < (h = e.readyState) && 4 > h) {
        for (j.restart(), i = j.sources, k = [], c = 0, g = i.length; g > c; c++) {
          if (K = i[c], K instanceof a) {
            K.watch.apply(K, d);
            break;
          }

          k.push(void 0);
        }

        return k;
      }
    }, c));
  }), a = function () {
    function a() {
      var a = this;
      this.elements = [], y().on("request", function () {
        return a.watch.apply(a, arguments);
      });
    }

    return a.prototype.watch = function (a) {
      var b, c, d, e;
      return d = a.type, b = a.request, e = a.url, I(e) ? void 0 : (c = "socket" === d ? new n(b) : new o(b), this.elements.push(c));
    }, a;
  }(), o = function () {
    function a(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h = this;
      if (this.progress = 0, null != window.ProgressEvent) for (c = null, a.addEventListener("progress", function (a) {
        return h.progress = a.lengthComputable ? 100 * a.loaded / a.total : h.progress + (100 - h.progress) / 2;
      }, !1), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++) {
        b = g[d], a.addEventListener(b, function () {
          return h.progress = 100;
        }, !1);
      } else f = a.onreadystatechange, a.onreadystatechange = function () {
        var b;
        return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50), "function" == typeof f ? f.apply(null, arguments) : void 0;
      };
    }

    return a;
  }(), n = function () {
    function a(a) {
      var b,
          c,
          d,
          e,
          f = this;

      for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++) {
        b = e[c], a.addEventListener(b, function () {
          return f.progress = 100;
        }, !1);
      }
    }

    return a;
  }(), d = function () {
    function a(a) {
      var b, c, d, f;

      for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++) {
        b = f[c], this.elements.push(new e(b));
      }
    }

    return a;
  }(), e = function () {
    function a(a) {
      this.selector = a, this.progress = 0, this.check();
    }

    return a.prototype.check = function () {
      var a = this;
      return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
        return a.check();
      }, D.elements.checkInterval);
    }, a.prototype.done = function () {
      return this.progress = 100;
    }, a;
  }(), c = function () {
    function a() {
      var a,
          b,
          c = this;
      this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function () {
        return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0;
      };
    }

    return a.prototype.states = {
      loading: 0,
      interactive: 50,
      complete: 100
    }, a;
  }(), f = function () {
    function a() {
      var a,
          b,
          c,
          d,
          e,
          f = this;
      this.progress = 0, a = 0, e = [], d = 0, c = C(), b = setInterval(function () {
        var g;
        return g = C() - c - 50, c = C(), e.push(g), e.length > D.eventLag.sampleCount && e.shift(), a = q(e), ++d >= D.eventLag.minSamples && a < D.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3));
      }, 50);
    }

    return a;
  }(), m = function () {
    function a(a) {
      this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = D.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = F(this.source, "progress"));
    }

    return a.prototype.tick = function (a, b) {
      var c;
      return null == b && (b = F(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / D.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, D.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + D.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress;
    }, a;
  }(), L = null, H = null, r = null, M = null, p = null, s = null, j.running = !1, z = function z() {
    return D.restartOnPushState ? j.restart() : void 0;
  }, null != window.history.pushState && (T = window.history.pushState, window.history.pushState = function () {
    return z(), T.apply(window.history, arguments);
  }), null != window.history.replaceState && (W = window.history.replaceState, window.history.replaceState = function () {
    return z(), W.apply(window.history, arguments);
  }), l = {
    ajax: a,
    elements: d,
    document: c,
    eventLag: f
  }, (B = function B() {
    var a, c, d, e, f, g, h, i;

    for (j.sources = L = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++) {
      a = g[c], D[a] !== !1 && L.push(new l[a](D[a]));
    }

    for (i = null != (h = D.extraSources) ? h : [], d = 0, f = i.length; f > d; d++) {
      K = i[d], L.push(new K(D));
    }

    return j.bar = r = new b(), H = [], M = new m();
  })(), j.stop = function () {
    return j.trigger("stop"), j.running = !1, r.destroy(), s = !0, null != p && ("function" == typeof t && t(p), p = null), B();
  }, j.restart = function () {
    return j.trigger("restart"), j.stop(), j.start();
  }, j.go = function () {
    var a;
    return j.running = !0, r.render(), a = C(), s = !1, p = G(function (b, c) {
      var d, e, f, g, h, i, k, l, n, o, p, q, t, u, v, w;

      for (l = 100 - r.progress, e = p = 0, f = !0, i = q = 0, u = L.length; u > q; i = ++q) {
        for (K = L[i], o = null != H[i] ? H[i] : H[i] = [], h = null != (w = K.elements) ? w : [K], k = t = 0, v = h.length; v > t; k = ++t) {
          g = h[k], n = null != o[k] ? o[k] : o[k] = new m(g), f &= n.done, n.done || (e++, p += n.tick(b));
        }
      }

      return d = p / e, r.update(M.tick(b, d)), r.done() || f || s ? (r.update(100), j.trigger("done"), setTimeout(function () {
        return r.finish(), j.running = !1, j.trigger("hide");
      }, Math.max(D.ghostTime, Math.max(D.minTime - (C() - a), 0)))) : c();
    });
  }, j.start = function (a) {
    _v(D, a), j.running = !0;

    try {
      r.render();
    } catch (b) {
      i = b;
    }

    return document.querySelector(".pace") ? (j.trigger("start"), j.go()) : setTimeout(j.start, 50);
  }, "function" == typeof define && define.amd ? define(["pace"], function () {
    return j;
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = j : D.startOnPageLoad && j.start();
}).call(this);
/*! iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */

(function (f) {
  function A(a, b, d) {
    var c = a[0],
        g = /er/.test(d) ? _indeterminate : /bl/.test(d) ? n : k,
        e = d == _update ? {
      checked: c[k],
      disabled: c[n],
      indeterminate: "true" == a.attr(_indeterminate) || "false" == a.attr(_determinate)
    } : c[g];
    if (/^(ch|di|in)/.test(d) && !e) x(a, g);else if (/^(un|en|de)/.test(d) && e) q(a, g);else if (d == _update) for (var f in e) {
      e[f] ? x(a, f, !0) : q(a, f, !0);
    } else if (!b || "toggle" == d) {
      if (!b) a[_callback]("ifClicked");
      e ? c[_type] !== r && q(a, g) : x(a, g);
    }
  }

  function x(a, b, d) {
    var c = a[0],
        g = a.parent(),
        e = b == k,
        u = b == _indeterminate,
        v = b == n,
        s = u ? _determinate : e ? y : "enabled",
        F = l(a, s + t(c[_type])),
        B = l(a, b + t(c[_type]));

    if (!0 !== c[b]) {
      if (!d && b == k && c[_type] == r && c.name) {
        var w = a.closest("form"),
            p = 'input[name="' + c.name + '"]',
            p = w.length ? w.find(p) : f(p);
        p.each(function () {
          this !== c && f(this).data(m) && q(f(this), b);
        });
      }

      u ? (c[b] = !0, c[k] && q(a, k, "force")) : (d || (c[b] = !0), e && c[_indeterminate] && q(a, _indeterminate, !1));
      D(a, e, b, d);
    }

    c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "default");

    g[_add](B || l(a, b) || "");

    g.attr("role") && !u && g.attr("aria-" + (v ? n : k), "true");

    g[_remove](F || l(a, s) || "");
  }

  function q(a, b, d) {
    var c = a[0],
        g = a.parent(),
        e = b == k,
        f = b == _indeterminate,
        m = b == n,
        s = f ? _determinate : e ? y : "enabled",
        q = l(a, s + t(c[_type])),
        r = l(a, b + t(c[_type]));

    if (!1 !== c[b]) {
      if (f || !d || "force" == d) c[b] = !1;
      D(a, e, s, d);
    }

    !c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "pointer");

    g[_remove](r || l(a, b) || "");

    g.attr("role") && !f && g.attr("aria-" + (m ? n : k), "false");

    g[_add](q || l(a, s) || "");
  }

  function E(a, b) {
    if (a.data(m)) {
      a.parent().html(a.attr("style", a.data(m).s || ""));
      if (b) a[_callback](b);
      a.off(".i").unwrap();
      f(_label + '[for="' + a[0].id + '"]').add(a.closest(_label)).off(".i");
    }
  }

  function l(a, b, f) {
    if (a.data(m)) return a.data(m).o[b + (f ? "" : "Class")];
  }

  function t(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }

  function D(a, b, f, c) {
    if (!c) {
      if (b) a[_callback]("ifToggled");

      a[_callback]("ifChanged")[_callback]("if" + t(f));
    }
  }

  var m = "iCheck",
      C = m + "-helper",
      r = "radio",
      k = "checked",
      y = "un" + k,
      n = "disabled";
  _determinate = "determinate";
  _indeterminate = "in" + _determinate;
  _update = "update";
  _type = "type";
  _click = "click";
  _touch = "touchbegin.i touchend.i";
  _add = "addClass";
  _remove = "removeClass";
  _callback = "trigger";
  _label = "label";
  _cursor = "cursor";
  _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

  f.fn[m] = function (a, b) {
    var d = 'input[type="checkbox"], input[type="' + r + '"]',
        c = f(),
        g = function g(a) {
      a.each(function () {
        var a = f(this);
        c = a.is(d) ? c.add(a) : c.add(a.find(d));
      });
    };

    if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a)) return a = a.toLowerCase(), g(this), c.each(function () {
      var c = f(this);
      "destroy" == a ? E(c, "ifDestroyed") : A(c, !0, a);
      f.isFunction(b) && b();
    });
    if ("object" != _typeof(a) && a) return this;
    var e = f.extend({
      checkedClass: k,
      disabledClass: n,
      indeterminateClass: _indeterminate,
      labelHover: !0
    }, a),
        l = e.handle,
        v = e.hoverClass || "hover",
        s = e.focusClass || "focus",
        t = e.activeClass || "active",
        B = !!e.labelHover,
        w = e.labelHoverClass || "hover",
        p = ("" + e.increaseArea).replace("%", "") | 0;
    if ("checkbox" == l || l == r) d = 'input[type="' + l + '"]';
    -50 > p && (p = -50);
    g(this);
    return c.each(function () {
      var a = f(this);
      E(a);
      var c = this,
          b = c.id,
          g = -p + "%",
          d = 100 + 2 * p + "%",
          d = {
        position: "absolute",
        top: g,
        left: g,
        display: "block",
        width: d,
        height: d,
        margin: 0,
        padding: 0,
        background: "#fff",
        border: 0,
        opacity: 0
      },
          g = _mobile ? {
        position: "absolute",
        visibility: "hidden"
      } : p ? d : {
        position: "absolute",
        opacity: 0
      },
          l = "checkbox" == c[_type] ? e.checkboxClass || "icheckbox" : e.radioClass || "i" + r,
          z = f(_label + '[for="' + b + '"]').add(a.closest(_label)),
          u = !!e.aria,
          y = m + "-" + Math.random().toString(36).substr(2, 6),
          h = '<div class="' + l + '" ' + (u ? 'role="' + c[_type] + '" ' : "");
      u && z.each(function () {
        h += 'aria-labelledby="';
        this.id ? h += this.id : (this.id = y, h += y);
        h += '"';
      });
      h = a.wrap(h + "/>")[_callback]("ifCreated").parent().append(e.insert);
      d = f('<ins class="' + C + '"/>').css(d).appendTo(h);
      a.data(m, {
        o: e,
        s: a.attr("style")
      }).css(g);
      e.inheritClass && h[_add](c.className || "");
      e.inheritID && b && h.attr("id", m + "-" + b);
      "static" == h.css("position") && h.css("position", "relative");
      A(a, !0, _update);
      if (z.length) z.on(_click + ".i mouseover.i mouseout.i " + _touch, function (b) {
        var d = b[_type],
            e = f(this);

        if (!c[n]) {
          if (d == _click) {
            if (f(b.target).is("a")) return;
            A(a, !1, !0);
          } else B && (/ut|nd/.test(d) ? (h[_remove](v), e[_remove](w)) : (h[_add](v), e[_add](w)));

          if (_mobile) b.stopPropagation();else return !1;
        }
      });
      a.on(_click + ".i focus.i blur.i keyup.i keydown.i keypress.i", function (b) {
        var d = b[_type];
        b = b.keyCode;
        if (d == _click) return !1;
        if ("keydown" == d && 32 == b) return c[_type] == r && c[k] || (c[k] ? q(a, k) : x(a, k)), !1;
        if ("keyup" == d && c[_type] == r) !c[k] && x(a, k);else if (/us|ur/.test(d)) h["blur" == d ? _remove : _add](s);
      });
      d.on(_click + " mousedown mouseup mouseover mouseout " + _touch, function (b) {
        var d = b[_type],
            e = /wn|up/.test(d) ? t : v;

        if (!c[n]) {
          if (d == _click) A(a, !1, !0);else {
            if (/wn|er|in/.test(d)) h[_add](e);else h[_remove](e + " " + t);
            if (z.length && B && e == v) z[/ut|nd/.test(d) ? _remove : _add](w);
          }
          if (_mobile) b.stopPropagation();else return !1;
        }
      });
    });
  };
})(window.jQuery || window.Zepto);
/** File generated by Grunt -- do not modify
 *  JQUERY-FORM-VALIDATOR
 *
 *  @version 2.3.26
 *  @website http://formvalidator.net/
 *  @author Victor Jonsson, http://victorjonsson.se
 *  @license MIT
 */


!function (a, b) {
  "function" == typeof define && define.amd ? define(["jquery"], function (a) {
    return b(a);
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = b(require("jquery")) : b(jQuery);
}(this, function (a) {
  !function (a, b) {
    "use strict";

    function c(b) {
      b && "custom" === b.errorMessagePosition && "function" == typeof b.errorMessageCustom && (a.formUtils.warn("Use of deprecated function errorMessageCustom, use config.submitErrorMessageCallback instead"), b.submitErrorMessageCallback = function (a, c) {
        b.errorMessageCustom(a, b.language.errorTitle, c, b);
      });
    }

    function d(b) {
      if (b.errorMessagePosition && "object" == _typeof(b.errorMessagePosition)) {
        a.formUtils.warn("Deprecated use of config parameter errorMessagePosition, use config.submitErrorMessageCallback instead");
        var c = b.errorMessagePosition;
        b.errorMessagePosition = "top", b.submitErrorMessageCallback = function () {
          return c;
        };
      }
    }

    function e(b) {
      var c = b.find("[data-validation-if-checked]");
      c.length && a.formUtils.warn('Detected use of attribute "data-validation-if-checked" which is deprecated. Use "data-validation-depends-on" provided by module "logic"'), c.on("beforeValidation", function () {
        var c = a(this),
            d = c.valAttr("if-checked"),
            e = a('input[name="' + d + '"]', b),
            f = e.is(":checked"),
            g = (a.formUtils.getValue(e) || "").toString(),
            h = c.valAttr("if-checked-value");
        (!f || h && h !== g) && c.valAttr("skipped", !0);
      });
    }

    a.fn.validateForm = function (b, c) {
      return a.formUtils.warn("Use of deprecated function $.validateForm, use $.isValid instead"), this.isValid(b, c, !0);
    }, a(window).on("validatorsLoaded formValidationSetup", function (b, f, g) {
      f || (f = a("form")), c(g), d(g), e(f);
    });
  }(a), function (a) {
    "use strict";

    var b = {
      resolveErrorMessage: function resolveErrorMessage(a, b, c, d, e) {
        var f = d.validationErrorMsgAttribute + "-" + c.replace("validate_", ""),
            g = a.attr(f);
        return g || (g = a.attr(d.validationErrorMsgAttribute), g || (g = "function" != typeof b.errorMessageKey ? e[b.errorMessageKey] : e[b.errorMessageKey(d)], g || (g = b.errorMessage))), g;
      },
      getParentContainer: function getParentContainer(b) {
        if (b.valAttr("error-msg-container")) return a(b.valAttr("error-msg-container"));
        var c = b.parent();

        if (!c.hasClass("form-group") && !c.closest("form").hasClass("form-horizontal")) {
          var d = c.closest(".form-group");
          if (d.length) return d.eq(0);
        }

        return c;
      },
      applyInputErrorStyling: function applyInputErrorStyling(a, b) {
        a.addClass(b.errorElementClass).removeClass("valid"), this.getParentContainer(a).addClass(b.inputParentClassOnError).removeClass(b.inputParentClassOnSuccess), "" !== b.borderColorOnError && a.css("border-color", b.borderColorOnError);
      },
      applyInputSuccessStyling: function applyInputSuccessStyling(a, b) {
        a.addClass("valid"), this.getParentContainer(a).addClass(b.inputParentClassOnSuccess);
      },
      removeInputStylingAndMessage: function removeInputStylingAndMessage(a, c) {
        a.removeClass("valid").removeClass(c.errorElementClass).css("border-color", "");
        var d = b.getParentContainer(a);

        if (d.removeClass(c.inputParentClassOnError).removeClass(c.inputParentClassOnSuccess), "function" == typeof c.inlineErrorMessageCallback) {
          var e = c.inlineErrorMessageCallback(a, !1, c);
          e && e.html("");
        } else d.find("." + c.errorMessageClass).remove();
      },
      removeAllMessagesAndStyling: function removeAllMessagesAndStyling(c, d) {
        if ("function" == typeof d.submitErrorMessageCallback) {
          var e = d.submitErrorMessageCallback(c, d);
          e && e.html("");
        } else c.find("." + d.errorMessageClass + ".alert").remove();

        c.find("." + d.errorElementClass + ",.valid").each(function () {
          b.removeInputStylingAndMessage(a(this), d);
        });
      },
      setInlineMessage: function setInlineMessage(b, c, d) {
        this.applyInputErrorStyling(b, d);

        var e,
            f = document.getElementById(b.attr("name") + "_err_msg"),
            g = !1,
            h = function h(d) {
          a.formUtils.$win.trigger("validationErrorDisplay", [b, d]), d.html(c);
        },
            i = function i() {
          var f = !1;
          g.find("." + d.errorMessageClass).each(function () {
            return this.inputReferer === b[0] ? (f = a(this), !1) : void 0;
          }), f ? c ? h(f) : f.remove() : "" !== c && (e = a('<div class="' + d.errorMessageClass + ' alert"></div>'), h(e), e[0].inputReferer = b[0], g.prepend(e));
        };

        if (f) a.formUtils.warn("Using deprecated element reference " + f.id), g = a(f), i();else if ("function" == typeof d.inlineErrorMessageCallback) {
          if (g = d.inlineErrorMessageCallback(b, c, d), !g) return;
          i();
        } else {
          var j = this.getParentContainer(b);
          e = j.find("." + d.errorMessageClass + ".help-block"), 0 === e.length && (e = a("<span></span>").addClass("help-block").addClass(d.errorMessageClass), e.appendTo(j)), h(e);
        }
      },
      setMessageInTopOfForm: function setMessageInTopOfForm(b, c, d, e) {
        var f = '<div class="{errorMessageClass} alert alert-danger"><strong>{errorTitle}</strong><ul>{fields}</ul></div>',
            g = !1;

        if ("function" != typeof d.submitErrorMessageCallback || (g = d.submitErrorMessageCallback(b, c, d))) {
          var h = {
            errorTitle: e.errorTitle,
            fields: "",
            errorMessageClass: d.errorMessageClass
          };
          a.each(c, function (a, b) {
            h.fields += "<li>" + b + "</li>";
          }), a.each(h, function (a, b) {
            f = f.replace("{" + a + "}", b);
          }), g ? g.html(f) : b.children().eq(0).before(a(f));
        }
      }
    };
    a.formUtils = a.extend(a.formUtils || {}, {
      dialogs: b
    });
  }(a), function (a, b, c) {
    "use strict";

    var d = 0;
    a.fn.validateOnBlur = function (b, c) {
      var d = this,
          e = this.find("*[data-validation]");
      return e.each(function () {
        var e = a(this);

        if (e.is("[type=radio]")) {
          var f = d.find('[type=radio][name="' + e.attr("name") + '"]');
          f.bind("blur.validation", function () {
            e.validateInputOnBlur(b, c, !0, "blur");
          }), c.validateCheckboxRadioOnClick && f.bind("click.validation", function () {
            e.validateInputOnBlur(b, c, !0, "click");
          });
        }
      }), e.bind("blur.validation", function () {
        a(this).validateInputOnBlur(b, c, !0, "blur");
      }), c.validateCheckboxRadioOnClick && this.find("input[type=checkbox][data-validation],input[type=radio][data-validation]").bind("click.validation", function () {
        a(this).validateInputOnBlur(b, c, !0, "click");
      }), this;
    }, a.fn.validateOnEvent = function (b, c) {
      var d = "FORM" === this[0].nodeName ? this.find("*[data-validation-event]") : this;
      return d.each(function () {
        var d = a(this),
            e = d.valAttr("event");
        e && d.unbind(e + ".validation").bind(e + ".validation", function (d) {
          9 !== (d || {}).keyCode && a(this).validateInputOnBlur(b, c, !0, e);
        });
      }), this;
    }, a.fn.showHelpOnFocus = function (b) {
      return b || (b = "data-validation-help"), this.find(".has-help-txt").valAttr("has-keyup-event", !1).removeClass("has-help-txt"), this.find("textarea,input").each(function () {
        var c = a(this),
            e = "jquery_form_help_" + ++d,
            f = c.attr(b);
        f && c.addClass("has-help-txt").unbind("focus.help").bind("focus.help", function () {
          var b = c.parent().find("." + e);
          0 === b.length && (b = a("<span />").addClass(e).addClass("help").addClass("help-block").text(f).hide(), c.after(b)), b.fadeIn();
        }).unbind("blur.help").bind("blur.help", function () {
          a(this).parent().find("." + e).fadeOut("slow");
        });
      }), this;
    }, a.fn.validate = function (b, c, d) {
      var e = a.extend({}, a.formUtils.LANG, d || {});
      this.each(function () {
        var d = a(this),
            f = d.closest("form").get(0).validationConfig || {};
        d.one("validation", function (a, c) {
          "function" == typeof b && b(c, this, a);
        }), d.validateInputOnBlur(e, a.extend({}, f, c || {}), !0);
      });
    }, a.fn.willPostponeValidation = function () {
      return (this.valAttr("suggestion-nr") || this.valAttr("postpone") || this.hasClass("hasDatepicker")) && !b.postponedValidation;
    }, a.fn.validateInputOnBlur = function (c, d, e, f) {
      if (a.formUtils.eventType = f, this.willPostponeValidation()) {
        var g = this,
            h = this.valAttr("postpone") || 200;
        return b.postponedValidation = function () {
          g.validateInputOnBlur(c, d, e, f), b.postponedValidation = !1;
        }, setTimeout(function () {
          b.postponedValidation && b.postponedValidation();
        }, h), this;
      }

      c = a.extend({}, a.formUtils.LANG, c || {}), a.formUtils.dialogs.removeInputStylingAndMessage(this, d);
      var i = this,
          j = i.closest("form"),
          k = a.formUtils.validateInput(i, c, d, j, f);
      return e && i.unbind("keyup.validation"), k.shouldChangeDisplay && (k.isValid ? a.formUtils.dialogs.applyInputSuccessStyling(i, d) : a.formUtils.dialogs.setInlineMessage(i, k.errorMsg, d)), !k.isValid && e && i.bind("keyup.validation", function (b) {
        9 !== b.keyCode && a(this).validateInputOnBlur(c, d, !1, "keyup");
      }), this;
    }, a.fn.valAttr = function (a, b) {
      return b === c ? this.attr("data-validation-" + a) : b === !1 || null === b ? this.removeAttr("data-validation-" + a) : (a = a.length > 0 ? "-" + a : "", this.attr("data-validation" + a, b));
    }, a.fn.isValid = function (b, c, d) {
      if (a.formUtils.isLoadingModules) {
        var e = this;
        return setTimeout(function () {
          e.isValid(b, c, d);
        }, 200), null;
      }

      c = a.extend({}, a.formUtils.defaultConfig(), c || {}), b = a.extend({}, a.formUtils.LANG, b || {}), d = d !== !1, a.formUtils.errorDisplayPreventedWhenHalted && (delete a.formUtils.errorDisplayPreventedWhenHalted, d = !1), a.formUtils.isValidatingEntireForm = !0, a.formUtils.haltValidation = !1;

      var f = function f(b, e) {
        a.inArray(b, h) < 0 && h.push(b), i.push(e), e.attr("current-error", b), d && a.formUtils.dialogs.applyInputErrorStyling(e, c);
      },
          g = [],
          h = [],
          i = [],
          j = this,
          k = function k(b, d) {
        return "submit" === d || "button" === d || "reset" === d ? !0 : a.inArray(b, c.ignore || []) > -1;
      };

      if (d && a.formUtils.dialogs.removeAllMessagesAndStyling(j, c), j.find("input,textarea,select").filter(':not([type="submit"],[type="button"])').each(function () {
        var d = a(this),
            e = d.attr("type"),
            h = "radio" === e || "checkbox" === e,
            i = d.attr("name");

        if (!k(i, e) && (!h || a.inArray(i, g) < 0)) {
          h && g.push(i);
          var l = a.formUtils.validateInput(d, b, c, j, "submit");
          l.isValid ? l.isValid && l.shouldChangeDisplay && (d.valAttr("current-error", !1), a.formUtils.dialogs.applyInputSuccessStyling(d, c)) : f(l.errorMsg, d);
        }
      }), "function" == typeof c.onValidate) {
        var l = c.onValidate(j);
        a.isArray(l) ? a.each(l, function (a, b) {
          f(b.message, b.element);
        }) : l && l.element && l.message && f(l.message, l.element);
      }

      return a.formUtils.isValidatingEntireForm = !1, !a.formUtils.haltValidation && i.length > 0 ? (d && ("top" === c.errorMessagePosition ? a.formUtils.dialogs.setMessageInTopOfForm(j, h, c, b) : a.each(i, function (b, d) {
        a.formUtils.dialogs.setInlineMessage(d, d.attr("current-error"), c);
      }), c.scrollToTopOnError && a.formUtils.$win.scrollTop(j.offset().top - 20)), !1) : (!d && a.formUtils.haltValidation && (a.formUtils.errorDisplayPreventedWhenHalted = !0), !a.formUtils.haltValidation);
    }, a.fn.restrictLength = function (b) {
      return new a.formUtils.lengthRestriction(this, b), this;
    }, a.fn.addSuggestions = function (b) {
      var c = !1;
      return this.find("input").each(function () {
        var d = a(this);
        c = a.split(d.attr("data-suggestions")), c.length > 0 && !d.hasClass("has-suggestions") && (a.formUtils.suggest(d, c, b), d.addClass("has-suggestions"));
      }), this;
    };
  }(a, window), function (a) {
    "use strict";

    a.formUtils = a.extend(a.formUtils || {}, {
      isLoadingModules: !1,
      loadedModules: {},
      loadModules: function loadModules(b, c, d) {
        if (a.formUtils.isLoadingModules) return void setTimeout(function () {
          a.formUtils.loadModules(b, c, d);
        }, 10);

        var e = !1,
            f = function f(b, c) {
          var f = a.split(b),
              g = f.length,
              h = function h() {
            g--, 0 === g && (a.formUtils.isLoadingModules = !1, d && e && "function" == typeof d && d());
          };

          g > 0 && (a.formUtils.isLoadingModules = !0);
          var i = "?_=" + new Date().getTime(),
              j = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0];
          a.each(f, function (b, d) {
            if (d = a.trim(d), 0 === d.length) h();else {
              var f = c + d + (".js" === d.slice(-3) ? "" : ".js"),
                  g = document.createElement("SCRIPT");
              f in a.formUtils.loadedModules ? h() : (a.formUtils.loadedModules[f] = 1, e = !0, g.type = "text/javascript", g.onload = h, g.src = f + (".dev.js" === f.slice(-7) ? i : ""), g.onerror = function () {
                a.formUtils.warn("Unable to load form validation module " + f);
              }, g.onreadystatechange = function () {
                "complete" !== this.readyState && "loaded" !== this.readyState || (h(), this.onload = null, this.onreadystatechange = null);
              }, j.appendChild(g));
            }
          });
        };

        if (c) f(b, c);else {
          var g = function g() {
            var c = !1;
            return a('script[src*="form-validator"]').each(function () {
              return c = this.src.substr(0, this.src.lastIndexOf("/")) + "/", "/" === c && (c = ""), !1;
            }), c !== !1 ? (f(b, c), !0) : !1;
          };

          g() || a(g);
        }
      }
    });
  }(a), function (a) {
    "use strict";

    a.split = function (b, c) {
      if ("function" != typeof c) {
        if (!b) return [];
        var d = [];
        return a.each(b.split(c ? c : /[,|\-\s]\s*/g), function (b, c) {
          c = a.trim(c), c.length && d.push(c);
        }), d;
      }

      b && a.each(b.split(/[,|\-\s]\s*/g), function (b, d) {
        return d = a.trim(d), d.length ? c(d, b) : void 0;
      });
    }, a.validate = function (b) {
      var c = a.extend(a.formUtils.defaultConfig(), {
        form: "form",
        validateOnEvent: !1,
        validateOnBlur: !0,
        validateCheckboxRadioOnClick: !0,
        showHelpOnFocus: !0,
        addSuggestions: !0,
        modules: "",
        onModulesLoaded: null,
        language: !1,
        onSuccess: !1,
        onError: !1,
        onElementValidate: !1
      });

      if (b = a.extend(c, b || {}), b.lang && "en" !== b.lang) {
        var d = "lang/" + b.lang + ".js";
        b.modules += b.modules.length ? "," + d : d;
      }

      a(b.form).each(function (c, d) {
        d.validationConfig = b;
        var e = a(d);
        e.trigger("formValidationSetup", [e, b]), e.find(".has-help-txt").unbind("focus.validation").unbind("blur.validation"), e.removeClass("has-validation-callback").unbind("submit.validation").unbind("reset.validation").find("input[data-validation],textarea[data-validation]").unbind("blur.validation"), e.bind("submit.validation", function (c) {
          var d = a(this),
              e = function e() {
            return c.stopImmediatePropagation(), !1;
          };

          if (a.formUtils.haltValidation) return e();
          if (a.formUtils.isLoadingModules) return setTimeout(function () {
            d.trigger("submit.validation");
          }, 200), e();
          var f = d.isValid(b.language, b);
          if (a.formUtils.haltValidation) return e();
          if (!f || "function" != typeof b.onSuccess) return f || "function" != typeof b.onError ? f ? !0 : e() : (b.onError(d), e());
          var g = b.onSuccess(d);
          return g === !1 ? e() : void 0;
        }).bind("reset.validation", function () {
          a.formUtils.dialogs.removeAllMessagesAndStyling(e, b);
        }).addClass("has-validation-callback"), b.showHelpOnFocus && e.showHelpOnFocus(), b.addSuggestions && e.addSuggestions(), b.validateOnBlur && (e.validateOnBlur(b.language, b), e.bind("html5ValidationAttrsFound", function () {
          e.validateOnBlur(b.language, b);
        })), b.validateOnEvent && e.validateOnEvent(b.language, b);
      }), "" !== b.modules && a.formUtils.loadModules(b.modules, !1, function () {
        "function" == typeof b.onModulesLoaded && b.onModulesLoaded();
        var c = "string" == typeof b.form ? a(b.form) : b.form;
        a.formUtils.$win.trigger("validatorsLoaded", [c, b]);
      });
    };
  }(a), function (a, b) {
    "use strict";

    var c = a(b);
    a.formUtils = a.extend(a.formUtils || {}, {
      $win: c,
      defaultConfig: function defaultConfig() {
        return {
          ignore: [],
          errorElementClass: "error",
          borderColorOnError: "#b94a48",
          errorMessageClass: "form-error",
          validationRuleAttribute: "data-validation",
          validationErrorMsgAttribute: "data-validation-error-msg",
          errorMessagePosition: "inline",
          errorMessageTemplate: {
            container: '<div class="{errorMessageClass} alert alert-danger">{messages}</div>',
            messages: "<strong>{errorTitle}</strong><ul>{fields}</ul>",
            field: "<li>{msg}</li>"
          },
          scrollToTopOnError: !0,
          dateFormat: "yyyy-mm-dd",
          addValidClassOnAll: !1,
          decimalSeparator: ".",
          inputParentClassOnError: "has-error",
          inputParentClassOnSuccess: "has-success",
          validateHiddenInputs: !1,
          inlineErrorMessageCallback: !1,
          submitErrorMessageCallback: !1
        };
      },
      validators: {},
      _events: {
        load: [],
        valid: [],
        invalid: []
      },
      haltValidation: !1,
      isValidatingEntireForm: !1,
      addValidator: function addValidator(a) {
        var b = 0 === a.name.indexOf("validate_") ? a.name : "validate_" + a.name;
        void 0 === a.validateOnKeyUp && (a.validateOnKeyUp = !0), this.validators[b] = a;
      },
      warn: function warn(a) {
        "console" in b ? "function" == typeof b.console.warn ? b.console.warn(a) : "function" == typeof b.console.log && b.console.log(a) : alert(a);
      },
      getValue: function getValue(a, b) {
        var c = b ? b.find(a) : a;

        if (c.length > 0) {
          var d = c.eq(0).attr("type");
          return "radio" === d || "checkbox" === d ? c.filter(":checked").val() : c.val();
        }

        return !1;
      },
      validateInput: function validateInput(b, c, d, e, f) {
        d = d || a.formUtils.defaultConfig(), c = c || a.formUtils.LANG;
        var g = this.getValue(b);
        b.valAttr("skipped", !1).one("beforeValidation", function () {
          (b.attr("disabled") || !b.is(":visible") && !d.validateHiddenInputs) && b.valAttr("skipped", 1);
        }).trigger("beforeValidation", [g, d, c]);
        var h = "true" === b.valAttr("optional"),
            i = !g && h,
            j = b.attr(d.validationRuleAttribute),
            k = !0,
            l = "",
            m = {
          isValid: !0,
          shouldChangeDisplay: !0,
          errorMsg: ""
        };
        if (!j || i || b.valAttr("skipped")) return m.shouldChangeDisplay = d.addValidClassOnAll, m;
        var n = b.valAttr("ignore");
        return n && a.each(n.split(""), function (a, b) {
          g = g.replace(new RegExp("\\" + b), "");
        }), a.split(j, function (h) {
          0 !== h.indexOf("validate_") && (h = "validate_" + h);
          var i = a.formUtils.validators[h];
          if (!i) throw new Error('Using undefined validator "' + h + '". Maybe you have forgotten to load the module that "' + h + '" belongs to?');
          return "validate_checkbox_group" === h && (b = e.find('[name="' + b.attr("name") + '"]:eq(0)')), ("keyup" !== f || i.validateOnKeyUp) && (k = i.validatorFunction(g, b, d, c, e)), k ? void 0 : (l = a.formUtils.dialogs.resolveErrorMessage(b, i, h, d, c), !1);
        }, " "), k === !1 ? (b.trigger("validation", !1), m.errorMsg = l, m.isValid = !1, m.shouldChangeDisplay = !0) : null === k ? m.shouldChangeDisplay = !1 : (b.trigger("validation", !0), m.shouldChangeDisplay = !0), "function" == typeof d.onElementValidate && null !== l && d.onElementValidate(m.isValid, b, e, l), b.trigger("afterValidation", [m, f]), m;
      },
      parseDate: function parseDate(b, c, d) {
        var e,
            f,
            g,
            h,
            i = c.replace(/[a-zA-Z]/gi, "").substring(0, 1),
            j = "^",
            k = c.split(i || null);

        if (a.each(k, function (a, b) {
          j += (a > 0 ? "\\" + i : "") + "(\\d{" + b.length + "})";
        }), j += "$", d) {
          var l = [];
          a.each(b.split(i), function (a, b) {
            1 === b.length && (b = "0" + b), l.push(b);
          }), b = l.join(i);
        }

        if (e = b.match(new RegExp(j)), null === e) return !1;

        var m = function m(b, c, d) {
          for (var e = 0; e < c.length; e++) {
            if (c[e].substring(0, 1) === b) return a.formUtils.parseDateInt(d[e + 1]);
          }

          return -1;
        };

        return g = m("m", k, e), f = m("d", k, e), h = m("y", k, e), 2 === g && f > 28 && (h % 4 !== 0 || h % 100 === 0 && h % 400 !== 0) || 2 === g && f > 29 && (h % 4 === 0 || h % 100 !== 0 && h % 400 === 0) || g > 12 || 0 === g ? !1 : this.isShortMonth(g) && f > 30 || !this.isShortMonth(g) && f > 31 || 0 === f ? !1 : [h, g, f];
      },
      parseDateInt: function parseDateInt(a) {
        return 0 === a.indexOf("0") && (a = a.replace("0", "")), parseInt(a, 10);
      },
      isShortMonth: function isShortMonth(a) {
        return a % 2 === 0 && 7 > a || a % 2 !== 0 && a > 7;
      },
      lengthRestriction: function lengthRestriction(b, c) {
        var d = parseInt(c.text(), 10),
            e = 0,
            f = function f() {
          var a = b.val().length;

          if (a > d) {
            var f = b.scrollTop();
            b.val(b.val().substring(0, d)), b.scrollTop(f);
          }

          e = d - a, 0 > e && (e = 0), c.text(e);
        };

        a(b).bind("keydown keyup keypress focus blur", f).bind("cut paste", function () {
          setTimeout(f, 100);
        }), a(document).bind("ready", f);
      },
      numericRangeCheck: function numericRangeCheck(b, c) {
        var d = a.split(c),
            e = parseInt(c.substr(3), 10);
        return 1 === d.length && -1 === c.indexOf("min") && -1 === c.indexOf("max") && (d = [c, c]), 2 === d.length && (b < parseInt(d[0], 10) || b > parseInt(d[1], 10)) ? ["out", d[0], d[1]] : 0 === c.indexOf("min") && e > b ? ["min", e] : 0 === c.indexOf("max") && b > e ? ["max", e] : ["ok"];
      },
      _numSuggestionElements: 0,
      _selectedSuggestion: null,
      _previousTypedVal: null,
      suggest: function suggest(b, d, e) {
        var f = {
          css: {
            maxHeight: "150px",
            background: "#FFF",
            lineHeight: "150%",
            textDecoration: "underline",
            overflowX: "hidden",
            overflowY: "auto",
            border: "#CCC solid 1px",
            borderTop: "none",
            cursor: "pointer"
          },
          activeSuggestionCSS: {
            background: "#E9E9E9"
          }
        },
            g = function g(a, b) {
          var c = b.offset();
          a.css({
            width: b.outerWidth(),
            left: c.left + "px",
            top: c.top + b.outerHeight() + "px"
          });
        };

        e && a.extend(f, e), f.css.position = "absolute", f.css["z-index"] = 9999, b.attr("autocomplete", "off"), 0 === this._numSuggestionElements && c.bind("resize", function () {
          a(".jquery-form-suggestions").each(function () {
            var b = a(this),
                c = b.attr("data-suggest-container");
            g(b, a(".suggestions-" + c).eq(0));
          });
        }), this._numSuggestionElements++;

        var h = function h(b) {
          var c = b.valAttr("suggestion-nr");
          a.formUtils._selectedSuggestion = null, a.formUtils._previousTypedVal = null, a(".jquery-form-suggestion-" + c).fadeOut("fast");
        };

        return b.data("suggestions", d).valAttr("suggestion-nr", this._numSuggestionElements).unbind("focus.suggest").bind("focus.suggest", function () {
          a(this).trigger("keyup"), a.formUtils._selectedSuggestion = null;
        }).unbind("keyup.suggest").bind("keyup.suggest", function () {
          var c = a(this),
              d = [],
              e = a.trim(c.val()).toLocaleLowerCase();

          if (e !== a.formUtils._previousTypedVal) {
            a.formUtils._previousTypedVal = e;
            var i = !1,
                j = c.valAttr("suggestion-nr"),
                k = a(".jquery-form-suggestion-" + j);

            if (k.scrollTop(0), "" !== e) {
              var l = e.length > 2;
              a.each(c.data("suggestions"), function (a, b) {
                var c = b.toLocaleLowerCase();
                return c === e ? (d.push("<strong>" + b + "</strong>"), i = !0, !1) : void ((0 === c.indexOf(e) || l && c.indexOf(e) > -1) && d.push(b.replace(new RegExp(e, "gi"), "<strong>$&</strong>")));
              });
            }

            i || 0 === d.length && k.length > 0 ? k.hide() : d.length > 0 && 0 === k.length ? (k = a("<div></div>").css(f.css).appendTo("body"), b.addClass("suggestions-" + j), k.attr("data-suggest-container", j).addClass("jquery-form-suggestions").addClass("jquery-form-suggestion-" + j)) : d.length > 0 && !k.is(":visible") && k.show(), d.length > 0 && e.length !== d[0].length && (g(k, c), k.html(""), a.each(d, function (b, d) {
              a("<div></div>").append(d).css({
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                padding: "5px"
              }).addClass("form-suggest-element").appendTo(k).click(function () {
                c.focus(), c.val(a(this).text()), c.trigger("change"), h(c);
              });
            }));
          }
        }).unbind("keydown.validation").bind("keydown.validation", function (b) {
          var c,
              d,
              e = b.keyCode ? b.keyCode : b.which,
              g = a(this);

          if (13 === e && null !== a.formUtils._selectedSuggestion) {
            if (c = g.valAttr("suggestion-nr"), d = a(".jquery-form-suggestion-" + c), d.length > 0) {
              var i = d.find("div").eq(a.formUtils._selectedSuggestion).text();
              g.val(i), g.trigger("change"), h(g), b.preventDefault();
            }
          } else {
            c = g.valAttr("suggestion-nr"), d = a(".jquery-form-suggestion-" + c);
            var j = d.children();

            if (j.length > 0 && a.inArray(e, [38, 40]) > -1) {
              38 === e ? (null === a.formUtils._selectedSuggestion ? a.formUtils._selectedSuggestion = j.length - 1 : a.formUtils._selectedSuggestion--, a.formUtils._selectedSuggestion < 0 && (a.formUtils._selectedSuggestion = j.length - 1)) : 40 === e && (null === a.formUtils._selectedSuggestion ? a.formUtils._selectedSuggestion = 0 : a.formUtils._selectedSuggestion++, a.formUtils._selectedSuggestion > j.length - 1 && (a.formUtils._selectedSuggestion = 0));
              var k = d.innerHeight(),
                  l = d.scrollTop(),
                  m = d.children().eq(0).outerHeight(),
                  n = m * a.formUtils._selectedSuggestion;
              return (l > n || n > l + k) && d.scrollTop(n), j.removeClass("active-suggestion").css("background", "none").eq(a.formUtils._selectedSuggestion).addClass("active-suggestion").css(f.activeSuggestionCSS), b.preventDefault(), !1;
            }
          }
        }).unbind("blur.suggest").bind("blur.suggest", function () {
          h(a(this));
        }), b;
      },
      LANG: {
        errorTitle: "Form submission failed!",
        requiredField: "This is a required field",
        requiredFields: "You have not answered all required fields",
        badTime: "You have not given a correct time",
        badEmail: "You have not given a correct e-mail address",
        badTelephone: "You have not given a correct phone number",
        badSecurityAnswer: "You have not given a correct answer to the security question",
        badDate: "You have not given a correct date",
        lengthBadStart: "The input value must be between ",
        lengthBadEnd: " characters",
        lengthTooLongStart: "The input value is longer than ",
        lengthTooShortStart: "The input value is shorter than ",
        notConfirmed: "Input values could not be confirmed",
        badDomain: "Incorrect domain value",
        badUrl: "The input value is not a correct URL",
        badCustomVal: "The input value is incorrect",
        andSpaces: " and spaces ",
        badInt: "The input value was not a correct number",
        badSecurityNumber: "Your social security number was incorrect",
        badUKVatAnswer: "Incorrect UK VAT Number",
        badUKNin: "Incorrect UK NIN",
        badUKUtr: "Incorrect UK UTR Number",
        badStrength: "The password isn't strong enough",
        badNumberOfSelectedOptionsStart: "You have to choose at least ",
        badNumberOfSelectedOptionsEnd: " answers",
        badAlphaNumeric: "The input value can only contain alphanumeric characters ",
        badAlphaNumericExtra: " and ",
        wrongFileSize: "The file you are trying to upload is too large (max %s)",
        wrongFileType: "Only files of type %s is allowed",
        groupCheckedRangeStart: "Please choose between ",
        groupCheckedTooFewStart: "Please choose at least ",
        groupCheckedTooManyStart: "Please choose a maximum of ",
        groupCheckedEnd: " item(s)",
        badCreditCard: "The credit card number is not correct",
        badCVV: "The CVV number was not correct",
        wrongFileDim: "Incorrect image dimensions,",
        imageTooTall: "the image can not be taller than",
        imageTooWide: "the image can not be wider than",
        imageTooSmall: "the image was too small",
        min: "min",
        max: "max",
        imageRatioNotAccepted: "Image ratio is not be accepted",
        badBrazilTelephoneAnswer: "The phone number entered is invalid",
        badBrazilCEPAnswer: "The CEP entered is invalid",
        badBrazilCPFAnswer: "The CPF entered is invalid",
        badPlPesel: "The PESEL entered is invalid",
        badPlNip: "The NIP entered is invalid",
        badPlRegon: "The REGON entered is invalid",
        badreCaptcha: "Please confirm that you are not a bot"
      }
    });
  }(a, window), function (a) {
    a.formUtils.addValidator({
      name: "email",
      validatorFunction: function validatorFunction(b) {
        var c = b.toLowerCase().split("@"),
            d = c[0],
            e = c[1];

        if (d && e) {
          if (0 === d.indexOf('"')) {
            var f = d.length;
            if (d = d.replace(/\"/g, ""), d.length !== f - 2) return !1;
          }

          return a.formUtils.validators.validate_domain.validatorFunction(c[1]) && 0 !== d.indexOf(".") && "." !== d.substring(d.length - 1, d.length) && -1 === d.indexOf("..") && !/[^\w\+\.\-\#\-\_\~\!\$\&\'\(\)\*\+\,\;\=\:]/.test(d);
        }

        return !1;
      },
      errorMessage: "",
      errorMessageKey: "badEmail"
    }), a.formUtils.addValidator({
      name: "domain",
      validatorFunction: function validatorFunction(a) {
        return a.length > 0 && a.length <= 253 && !/[^a-zA-Z0-9]/.test(a.slice(-2)) && !/[^a-zA-Z0-9]/.test(a.substr(0, 1)) && !/[^a-zA-Z0-9\.\-]/.test(a) && 1 === a.split("..").length && a.split(".").length > 1;
      },
      errorMessage: "",
      errorMessageKey: "badDomain"
    }), a.formUtils.addValidator({
      name: "required",
      validatorFunction: function validatorFunction(b, c, d, e, f) {
        switch (c.attr("type")) {
          case "checkbox":
            return c.is(":checked");

          case "radio":
            return f.find('input[name="' + c.attr("name") + '"]').filter(":checked").length > 0;

          default:
            return "" !== a.trim(b);
        }
      },
      errorMessage: "",
      errorMessageKey: function errorMessageKey(a) {
        return "top" === a.errorMessagePosition || "function" == typeof a.errorMessagePosition ? "requiredFields" : "requiredField";
      }
    }), a.formUtils.addValidator({
      name: "length",
      validatorFunction: function validatorFunction(b, c, d, e) {
        var f = c.valAttr("length"),
            g = c.attr("type");
        if (void 0 === f) return alert('Please add attribute "data-validation-length" to ' + c[0].nodeName + " named " + c.attr("name")), !0;
        var h,
            i = "file" === g && void 0 !== c.get(0).files ? c.get(0).files.length : b.length,
            j = a.formUtils.numericRangeCheck(i, f);

        switch (j[0]) {
          case "out":
            this.errorMessage = e.lengthBadStart + f + e.lengthBadEnd, h = !1;
            break;

          case "min":
            this.errorMessage = e.lengthTooShortStart + j[1] + e.lengthBadEnd, h = !1;
            break;

          case "max":
            this.errorMessage = e.lengthTooLongStart + j[1] + e.lengthBadEnd, h = !1;
            break;

          default:
            h = !0;
        }

        return h;
      },
      errorMessage: "",
      errorMessageKey: ""
    }), a.formUtils.addValidator({
      name: "url",
      validatorFunction: function validatorFunction(b) {
        var c = /^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

        if (c.test(b)) {
          var d = b.split("://")[1],
              e = d.indexOf("/");
          return e > -1 && (d = d.substr(0, e)), a.formUtils.validators.validate_domain.validatorFunction(d);
        }

        return !1;
      },
      errorMessage: "",
      errorMessageKey: "badUrl"
    }), a.formUtils.addValidator({
      name: "number",
      validatorFunction: function validatorFunction(a, b, c) {
        if ("" !== a) {
          var d,
              e,
              f = b.valAttr("allowing") || "",
              g = b.valAttr("decimal-separator") || c.decimalSeparator,
              h = !1,
              i = b.valAttr("step") || "",
              j = !1,
              k = b.attr("data-sanitize") || "",
              l = k.match(/(^|[\s])numberFormat([\s]|$)/i);

          if (l) {
            if (!window.numeral) throw new ReferenceError("The data-sanitize value numberFormat cannot be used without the numeral library. Please see Data Validation in http://www.formvalidator.net for more information.");
            a.length && (a = String(numeral().unformat(a)));
          }

          if (-1 === f.indexOf("number") && (f += ",number"), -1 === f.indexOf("negative") && 0 === a.indexOf("-")) return !1;

          if (f.indexOf("range") > -1 && (d = parseFloat(f.substring(f.indexOf("[") + 1, f.indexOf(";"))), e = parseFloat(f.substring(f.indexOf(";") + 1, f.indexOf("]"))), h = !0), "" !== i && (j = !0), "," === g) {
            if (a.indexOf(".") > -1) return !1;
            a = a.replace(",", ".");
          }

          if ("" === a.replace(/[0-9-]/g, "") && (!h || a >= d && e >= a) && (!j || a % i === 0)) return !0;
          if (f.indexOf("float") > -1 && null !== a.match(new RegExp("^([0-9-]+)\\.([0-9]+)$")) && (!h || a >= d && e >= a) && (!j || a % i === 0)) return !0;
        }

        return !1;
      },
      errorMessage: "",
      errorMessageKey: "badInt"
    }), a.formUtils.addValidator({
      name: "alphanumeric",
      validatorFunction: function validatorFunction(b, c, d, e) {
        var f = "^([a-zA-Z0-9",
            g = "]+)$",
            h = c.valAttr("allowing"),
            i = "";

        if (h) {
          i = f + h + g;
          var j = h.replace(/\\/g, "");
          j.indexOf(" ") > -1 && (j = j.replace(" ", ""), j += e.andSpaces || a.formUtils.LANG.andSpaces), this.errorMessage = e.badAlphaNumeric + e.badAlphaNumericExtra + j;
        } else i = f + g, this.errorMessage = e.badAlphaNumeric;

        return new RegExp(i).test(b);
      },
      errorMessage: "",
      errorMessageKey: ""
    }), a.formUtils.addValidator({
      name: "custom",
      validatorFunction: function validatorFunction(a, b) {
        var c = new RegExp(b.valAttr("regexp"));
        return c.test(a);
      },
      errorMessage: "",
      errorMessageKey: "badCustomVal"
    }), a.formUtils.addValidator({
      name: "date",
      validatorFunction: function validatorFunction(b, c, d) {
        var e = c.valAttr("format") || d.dateFormat || "yyyy-mm-dd",
            f = "false" === c.valAttr("require-leading-zero");
        return a.formUtils.parseDate(b, e, f) !== !1;
      },
      errorMessage: "",
      errorMessageKey: "badDate"
    }), a.formUtils.addValidator({
      name: "checkbox_group",
      validatorFunction: function validatorFunction(b, c, d, e, f) {
        var g = !0,
            h = c.attr("name"),
            i = a('input[type=checkbox][name^="' + h + '"]', f),
            j = i.filter(":checked").length,
            k = c.valAttr("qty");

        if (void 0 === k) {
          var l = c.get(0).nodeName;
          alert('Attribute "data-validation-qty" is missing from ' + l + " named " + c.attr("name"));
        }

        var m = a.formUtils.numericRangeCheck(j, k);

        switch (m[0]) {
          case "out":
            this.errorMessage = e.groupCheckedRangeStart + k + e.groupCheckedEnd, g = !1;
            break;

          case "min":
            this.errorMessage = e.groupCheckedTooFewStart + m[1] + e.groupCheckedEnd, g = !1;
            break;

          case "max":
            this.errorMessage = e.groupCheckedTooManyStart + m[1] + e.groupCheckedEnd, g = !1;
            break;

          default:
            g = !0;
        }

        if (!g) {
          var n = function n() {
            i.unbind("click", n), i.filter("*[data-validation]").validateInputOnBlur(e, d, !1, "blur");
          };

          i.bind("click", n);
        }

        return g;
      }
    });
  }(a);
});
/*! jquery-jeditable https://github.com/NicolasCARPi/jquery_jeditable#readme */

!function ($) {
  "use strict";

  $.fn.editableAriaShim = function () {
    return this.attr({
      role: "button",
      tabindex: 0
    }), this;
  }, $.fn.editable = function (target, options) {
    if ("disable" !== target) {
      if ("enable" !== target) {
        if ("destroy" !== target) {
          var settings = $.extend({}, $.fn.editable.defaults, {
            target: target
          }, options),
              plugin = $.editable.types[settings.type].plugin || function () {},
              submit = $.editable.types[settings.type].submit || function () {},
              buttons = $.editable.types[settings.type].buttons || $.editable.types.defaults.buttons,
              content = $.editable.types[settings.type].content || $.editable.types.defaults.content,
              element = $.editable.types[settings.type].element || $.editable.types.defaults.element,
              reset = $.editable.types[settings.type].reset || $.editable.types.defaults.reset,
              destroy = $.editable.types[settings.type].destroy || $.editable.types.defaults.destroy,
              callback = settings.callback || function () {},
              intercept = settings.intercept || function (s) {
            return s;
          },
              onedit = settings.onedit || function () {},
              onsubmit = settings.onsubmit || function () {},
              onreset = settings.onreset || function () {},
              onerror = settings.onerror || reset;

          settings.before;
          return settings.tooltip && $(this).attr("title", settings.tooltip), this.each(function () {
            var self = this;
            $(this).data("event.editable", settings.event), $.trim($(this).html()) || $(this).html(settings.placeholder), "destroy" !== target ? ($(this).bind(settings.event, function (e) {
              if (!0 !== $(this).data("disabled.editable") && 9 !== e.which && !self.editing && !1 !== onedit.apply(this, [settings, self, e])) {
                if (settings.before && jQuery.isFunction(settings.before)) settings.before(e);else if (settings.before && !jQuery.isFunction(settings.before)) throw "The 'before' option needs to be provided as a function!";
                e.preventDefault(), e.stopPropagation(), settings.tooltip && $(self).removeAttr("title"), $(this).html().toLowerCase().replace(/(;|"|\/)/g, "") === settings.placeholder.toLowerCase().replace(/(;|"|\/)/g, "") && $(this).html(""), self.editing = !0, self.revert = $(self).text(), $(self).html("");
                var form = $("<form />");
                settings.cssclass && ("inherit" === settings.cssclass ? form.attr("class", $(self).attr("class")) : form.attr("class", settings.cssclass)), settings.style && ("inherit" === settings.style ? (form.attr("style", $(self).attr("style")), form.css("display", $(self).css("display"))) : form.attr("style", settings.style)), settings.label && form.append("<label>" + settings.label + "</label>"), settings.formid && form.attr("id", settings.formid);
                var input_content,
                    t,
                    input = element.apply(form, [settings, self]);
                settings.inputcssclass && ("inherit" === settings.inputcssclass ? input.attr("class", $(self).attr("class")) : input.attr("class", settings.inputcssclass));
                var isSubmitting = !1;

                if (settings.loadurl) {
                  t = self.setTimeout(function () {
                    input.disabled = !0;
                  }, 100), $(self).html(settings.loadtext);
                  var loaddata = {};
                  loaddata[settings.id] = self.id, $.isFunction(settings.loaddata) ? $.extend(loaddata, settings.loaddata.apply(self, [self.revert, settings])) : $.extend(loaddata, settings.loaddata), $.ajax({
                    type: settings.loadtype,
                    url: settings.loadurl,
                    data: loaddata,
                    async: !1,
                    cache: !1,
                    success: function success(result) {
                      self.clearTimeout(t), input_content = result, input.disabled = !1;
                    }
                  });
                } else settings.data ? (input_content = settings.data, $.isFunction(settings.data) && (input_content = settings.data.apply(self, [self.revert, settings]))) : input_content = self.revert;

                if (content.apply(form, [input_content, settings, self]), input.attr("name", settings.name), "none" !== settings.width) {
                  var adj_width = settings.width - (input.outerWidth(!0) - settings.width);
                  input.width(adj_width);
                }

                buttons.apply(form, [settings, self]), settings.showfn && $.isFunction(settings.showfn) && form.hide(), $(self).html(""), $(self).append(form), settings.showfn && $.isFunction(settings.showfn) && settings.showfn(form), plugin.apply(form, [settings, self]), form.find(":input:visible:enabled:first").focus(), settings.select && input.select(), $(this).keydown(function (e) {
                  27 === e.which && (e.preventDefault(), reset.apply(form, [settings, self]));
                }), "cancel" === settings.onblur ? input.blur(function (e) {
                  t = self.setTimeout(function () {
                    reset.apply(form, [settings, self]);
                  }, 500);
                }) : "submit" === settings.onblur ? input.blur(function (e) {
                  t = self.setTimeout(function () {
                    form.submit();
                  }, 200);
                }) : $.isFunction(settings.onblur) && input.blur(function (e) {
                  !1 === settings.onblur.apply(self, [input.val(), settings, form]) && reset.apply(form, [settings, self]);
                }), form.submit(function (e) {
                  if (e.preventDefault(), e.stopPropagation(), isSubmitting) return !1;
                  if (isSubmitting = !0, t && self.clearTimeout(t), (isSubmitting = !1 !== onsubmit.apply(form, [settings, self])) && (isSubmitting = !1 !== submit.apply(form, [settings, self]))) if ($.isFunction(settings.target)) {
                    var responseHandler = function responseHandler(value, complete) {
                      isSubmitting = !1, !1 !== complete && ($(self).html(value), self.editing = !1, callback.apply(self, [self.innerHTML, settings]), $.trim($(self).html()) || $(self).html(settings.placeholder));
                    },
                        userTarget = settings.target.apply(self, [input.val(), settings, responseHandler]);

                    !1 !== userTarget && void 0 !== userTarget && responseHandler(userTarget, userTarget);
                  } else {
                    var submitdata = {};
                    submitdata[settings.name] = input.val(), submitdata[settings.id] = self.id, $.isFunction(settings.submitdata) ? $.extend(submitdata, settings.submitdata.apply(self, [self.revert, settings, submitdata])) : $.extend(submitdata, settings.submitdata), "PUT" === settings.method && (submitdata._method = "put"), $(self).html(settings.indicator);
                    var ajaxoptions = {
                      type: "POST",
                      complete: function complete(xhr, status) {
                        isSubmitting = !1;
                      },
                      data: submitdata,
                      dataType: "html",
                      url: settings.target,
                      success: function success(result, status) {
                        result = intercept.apply(self, [result, status]), "html" === ajaxoptions.dataType && $(self).html(result), self.editing = !1, callback.apply(self, [result, settings, submitdata]), $.trim($(self).html()) || $(self).html(settings.placeholder);
                      },
                      error: function error(xhr, status, _error) {
                        onerror.apply(form, [settings, self, xhr]);
                      }
                    };
                    $.extend(ajaxoptions, settings.ajaxoptions), $.ajax(ajaxoptions);
                  }
                  return $(self).attr("title", settings.tooltip), !1;
                });
              }
            }), self.reset = function (form) {
              self.editing && !1 !== onreset.apply(form, [settings, self]) && ($(self).text(self.revert), self.editing = !1, $.trim($(self).html()) || $(self).html(settings.placeholder), settings.tooltip && $(self).attr("title", settings.tooltip));
            }, self.destroy = function (form) {
              $(self).unbind($(self).data("event.editable")).removeData("disabled.editable").removeData("event.editable"), self.clearTimeouts(), self.editing && reset.apply(form, [settings, self]);
            }, self.clearTimeout = function (t) {
              var timeouts = $(self).data("timeouts");

              if (clearTimeout(t), timeouts) {
                var i = timeouts.indexOf(t);
                i > -1 ? (timeouts.splice(i, 1), timeouts.length <= 0 && $(self).removeData("timeouts")) : console.warn("jeditable clearTimeout could not find timeout " + t);
              }
            }, self.clearTimeouts = function () {
              var timeouts = $(self).data("timeouts");

              if (timeouts) {
                for (var i = 0, n = timeouts.length; i < n; ++i) {
                  clearTimeout(timeouts[i]);
                }

                timeouts.length = 0, $(self).removeData("timeouts");
              }
            }, self.setTimeout = function (callback, time) {
              var timeouts = $(self).data("timeouts"),
                  t = setTimeout(function () {
                callback(), self.clearTimeout(t);
              }, time);
              return timeouts || (timeouts = [], $(self).data("timeouts", timeouts)), timeouts.push(t), t;
            }) : destroy.apply($(this).find("form"), [settings, self]);
          });
        }

        $(this).unbind($(this).data("event.editable")).removeData("disabled.editable").removeData("event.editable");
      } else $(this).data("disabled.editable", !1);
    } else $(this).data("disabled.editable", !0);
  };

  var _supportInType = function _supportInType(type) {
    var i = document.createElement("input");
    return i.setAttribute("type", type), "text" !== i.type ? type : "text";
  };

  $.editable = {
    types: {
      defaults: {
        element: function element(settings, original) {
          var input = $('<input type="hidden"></input>');
          return $(this).append(input), input;
        },
        content: function content(string, settings, original) {
          $(this).find(":input:first").val(string);
        },
        reset: function reset(settings, original) {
          original.reset(this);
        },
        destroy: function destroy(settings, original) {
          original.destroy(this);
        },
        buttons: function buttons(settings, original) {
          var submit,
              cancel,
              form = this;
          (settings.submit && (settings.submit.match(/>$/) ? submit = $(settings.submit).click(function () {
            "submit" !== submit.attr("type") && form.submit();
          }) : ((submit = $('<button type="submit" />')).html(settings.submit), settings.submitcssclass && submit.addClass(settings.submitcssclass)), $(this).append(submit)), settings.cancel) && (settings.cancel.match(/>$/) ? cancel = $(settings.cancel) : ((cancel = $('<button type="cancel" />')).html(settings.cancel), settings.cancelcssclass && cancel.addClass(settings.cancelcssclass)), $(this).append(cancel), $(cancel).click(function (event) {
            return ($.isFunction($.editable.types[settings.type].reset) ? $.editable.types[settings.type].reset : $.editable.types.defaults.reset).apply(form, [settings, original]), !1;
          }));
        }
      },
      text: {
        element: function element(settings, original) {
          var input = $("<input />").attr({
            autocomplete: "off",
            list: settings.list,
            maxlength: settings.maxlength,
            pattern: settings.pattern,
            placeholder: settings.placeholder,
            tooltip: settings.tooltip,
            type: "text"
          });
          return "none" !== settings.width && input.css("width", settings.width), "none" !== settings.height && input.css("height", settings.height), settings.size && input.attr("size", settings.size), settings.maxlength && input.attr("maxlength", settings.maxlength), $(this).append(input), input;
        }
      },
      textarea: {
        element: function element(settings, original) {
          var textarea = $("<textarea></textarea>");
          return settings.rows ? textarea.attr("rows", settings.rows) : "none" !== settings.height && textarea.height(settings.height), settings.cols ? textarea.attr("cols", settings.cols) : "none" !== settings.width && textarea.width(settings.width), settings.maxlength && textarea.attr("maxlength", settings.maxlength), $(this).append(textarea), textarea;
        }
      },
      select: {
        element: function element(settings, original) {
          var select = $("<select />");
          return settings.multiple && select.attr("multiple", "multiple"), $(this).append(select), select;
        },
        content: function content(data, settings, original) {
          var json;
          json = String === data.constructor ? JSON.parse(data) : data;
          var key,
              option,
              tuples = [];
          if (Array.isArray(json) && json.every(Array.isArray)) tuples = json, json = {}, tuples.forEach(function (e) {
            json[e[0]] = e[1];
          });else for (key in json) {
            tuples.push([key, json[key]]);
          }
          settings.sortselectoptions && tuples.sort(function (a, b) {
            return (a = a[1]) < (b = b[1]) ? -1 : a > b ? 1 : 0;
          });

          for (var i = 0; i < tuples.length; i++) {
            key = tuples[i][0];
            var value = tuples[i][1];
            json.hasOwnProperty(key) && "selected" !== key && (option = $("<option />").val(key).append(value), json.selected !== key && key !== $.trim(original.revert) || $(option).prop("selected", "selected"), $(this).find("select").append(option));
          }

          if (!settings.submit) {
            var form = this;
            $(this).find("select").change(function () {
              form.submit();
            });
          }
        }
      },
      number: {
        element: function element(settings, original) {
          var input = $("<input />").attr({
            maxlength: settings.maxlength,
            placeholder: settings.placeholder,
            min: settings.min,
            max: settings.max,
            step: settings.step,
            tooltip: settings.tooltip,
            type: _supportInType("number")
          });
          return "none" !== settings.width && input.css("width", settings.width), $(this).append(input), input;
        }
      },
      email: {
        element: function element(settings, original) {
          var input = $("<input />").attr({
            maxlength: settings.maxlength,
            placeholder: settings.placeholder,
            tooltip: settings.tooltip,
            type: _supportInType("email")
          });
          return "none" !== settings.width && input.css("width", settings.width), $(this).append(input), input;
        }
      },
      url: {
        element: function element(settings, original) {
          var input = $("<input />").attr({
            maxlength: settings.maxlength,
            pattern: settings.pattern,
            placeholder: settings.placeholder,
            tooltip: settings.tooltip,
            type: _supportInType("url")
          });
          return "none" !== settings.width && input.css("width", settings.width), $(this).append(input), input;
        }
      }
    },
    addInputType: function addInputType(name, input) {
      $.editable.types[name] = input;
    }
  }, $.fn.editable.defaults = {
    name: "value",
    id: "id",
    type: "text",
    width: "auto",
    height: "auto",
    event: "click.editable keydown.editable",
    onblur: "cancel",
    tooltip: "Click to edit",
    loadtype: "GET",
    loadtext: "Loading...",
    placeholder: "Click to edit",
    sortselectoptions: !1,
    loaddata: {},
    submitdata: {},
    ajaxoptions: {}
  };
}(jQuery); // Ion.RangeSlider, 2.3.0, © Denis Ineshin, 2010 - 2018, IonDen.com, Build date: 2018-12-12 00:00:37

!function (i) {
  !jQuery && "function" == typeof define && define.amd ? define(["jquery"], function (t) {
    return i(t, document, window, navigator);
  }) : jQuery || "object" != (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? i(jQuery, document, window, navigator) : i(require("jquery"), document, window, navigator);
}(function (a, c, l, t, _) {
  "use strict";

  var i,
      s,
      o = 0,
      e = (i = t.userAgent, s = /msie\s\d+/i, 0 < i.search(s) && s.exec(i).toString().split(" ")[1] < 9 && (a("html").addClass("lt-ie9"), !0));
  Function.prototype.bind || (Function.prototype.bind = function (o) {
    var e = this,
        h = [].slice;
    if ("function" != typeof e) throw new TypeError();

    var r = h.call(arguments, 1),
        n = function n() {
      if (this instanceof n) {
        var t = function t() {};

        t.prototype = e.prototype;
        var i = new t(),
            s = e.apply(i, r.concat(h.call(arguments)));
        return Object(s) === s ? s : i;
      }

      return e.apply(o, r.concat(h.call(arguments)));
    };

    return n;
  }), Array.prototype.indexOf || (Array.prototype.indexOf = function (t, i) {
    var s;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var o = Object(this),
        e = o.length >>> 0;
    if (0 === e) return -1;
    var h = +i || 0;
    if (Math.abs(h) === 1 / 0 && (h = 0), e <= h) return -1;

    for (s = Math.max(0 <= h ? h : e - Math.abs(h), 0); s < e;) {
      if (s in o && o[s] === t) return s;
      s++;
    }

    return -1;
  });

  var h = function h(t, i, s) {
    this.VERSION = "2.3.0", this.input = t, this.plugin_count = s, this.current_plugin = 0, this.calc_count = 0, this.update_tm = 0, this.old_from = 0, this.old_to = 0, this.old_min_interval = null, this.raf_id = null, this.dragging = !1, this.force_redraw = !1, this.no_diapason = !1, this.has_tab_index = !0, this.is_key = !1, this.is_update = !1, this.is_start = !0, this.is_finish = !1, this.is_active = !1, this.is_resize = !1, this.is_click = !1, i = i || {}, this.$cache = {
      win: a(l),
      body: a(c.body),
      input: a(t),
      cont: null,
      rs: null,
      min: null,
      max: null,
      from: null,
      to: null,
      single: null,
      bar: null,
      line: null,
      s_single: null,
      s_from: null,
      s_to: null,
      shad_single: null,
      shad_from: null,
      shad_to: null,
      edge: null,
      grid: null,
      grid_labels: []
    }, this.coords = {
      x_gap: 0,
      x_pointer: 0,
      w_rs: 0,
      w_rs_old: 0,
      w_handle: 0,
      p_gap: 0,
      p_gap_left: 0,
      p_gap_right: 0,
      p_step: 0,
      p_pointer: 0,
      p_handle: 0,
      p_single_fake: 0,
      p_single_real: 0,
      p_from_fake: 0,
      p_from_real: 0,
      p_to_fake: 0,
      p_to_real: 0,
      p_bar_x: 0,
      p_bar_w: 0,
      grid_gap: 0,
      big_num: 0,
      big: [],
      big_w: [],
      big_p: [],
      big_x: []
    }, this.labels = {
      w_min: 0,
      w_max: 0,
      w_from: 0,
      w_to: 0,
      w_single: 0,
      p_min: 0,
      p_max: 0,
      p_from_fake: 0,
      p_from_left: 0,
      p_to_fake: 0,
      p_to_left: 0,
      p_single_fake: 0,
      p_single_left: 0
    };
    var o,
        e,
        h,
        r = this.$cache.input,
        n = r.prop("value");

    for (h in o = {
      skin: "flat",
      type: "single",
      min: 10,
      max: 100,
      from: null,
      to: null,
      step: 1,
      min_interval: 0,
      max_interval: 0,
      drag_interval: !1,
      values: [],
      p_values: [],
      from_fixed: !1,
      from_min: null,
      from_max: null,
      from_shadow: !1,
      to_fixed: !1,
      to_min: null,
      to_max: null,
      to_shadow: !1,
      prettify_enabled: !0,
      prettify_separator: " ",
      prettify: null,
      force_edges: !1,
      keyboard: !0,
      grid: !1,
      grid_margin: !0,
      grid_num: 4,
      grid_snap: !1,
      hide_min_max: !1,
      hide_from_to: !1,
      prefix: "",
      postfix: "",
      max_postfix: "",
      decorate_both: !0,
      values_separator: " — ",
      input_values_separator: ";",
      disable: !1,
      block: !1,
      extra_classes: "",
      scope: null,
      onStart: null,
      onChange: null,
      onFinish: null,
      onUpdate: null
    }, "INPUT" !== r[0].nodeName && console && console.warn && console.warn("Base element should be <input>!", r[0]), (e = {
      skin: r.data("skin"),
      type: r.data("type"),
      min: r.data("min"),
      max: r.data("max"),
      from: r.data("from"),
      to: r.data("to"),
      step: r.data("step"),
      min_interval: r.data("minInterval"),
      max_interval: r.data("maxInterval"),
      drag_interval: r.data("dragInterval"),
      values: r.data("values"),
      from_fixed: r.data("fromFixed"),
      from_min: r.data("fromMin"),
      from_max: r.data("fromMax"),
      from_shadow: r.data("fromShadow"),
      to_fixed: r.data("toFixed"),
      to_min: r.data("toMin"),
      to_max: r.data("toMax"),
      to_shadow: r.data("toShadow"),
      prettify_enabled: r.data("prettifyEnabled"),
      prettify_separator: r.data("prettifySeparator"),
      force_edges: r.data("forceEdges"),
      keyboard: r.data("keyboard"),
      grid: r.data("grid"),
      grid_margin: r.data("gridMargin"),
      grid_num: r.data("gridNum"),
      grid_snap: r.data("gridSnap"),
      hide_min_max: r.data("hideMinMax"),
      hide_from_to: r.data("hideFromTo"),
      prefix: r.data("prefix"),
      postfix: r.data("postfix"),
      max_postfix: r.data("maxPostfix"),
      decorate_both: r.data("decorateBoth"),
      values_separator: r.data("valuesSeparator"),
      input_values_separator: r.data("inputValuesSeparator"),
      disable: r.data("disable"),
      block: r.data("block"),
      extra_classes: r.data("extraClasses")
    }).values = e.values && e.values.split(","), e) {
      e.hasOwnProperty(h) && (e[h] !== _ && "" !== e[h] || delete e[h]);
    }

    n !== _ && "" !== n && ((n = n.split(e.input_values_separator || i.input_values_separator || ";"))[0] && n[0] == +n[0] && (n[0] = +n[0]), n[1] && n[1] == +n[1] && (n[1] = +n[1]), i && i.values && i.values.length ? (o.from = n[0] && i.values.indexOf(n[0]), o.to = n[1] && i.values.indexOf(n[1])) : (o.from = n[0] && +n[0], o.to = n[1] && +n[1])), a.extend(o, i), a.extend(o, e), this.options = o, this.update_check = {}, this.validate(), this.result = {
      input: this.$cache.input,
      slider: null,
      min: this.options.min,
      max: this.options.max,
      from: this.options.from,
      from_percent: 0,
      from_value: null,
      to: this.options.to,
      to_percent: 0,
      to_value: null
    }, this.init();
  };

  h.prototype = {
    init: function init(t) {
      this.no_diapason = !1, this.coords.p_step = this.convertToPercent(this.options.step, !0), this.target = "base", this.toggleInput(), this.append(), this.setMinMax(), t ? (this.force_redraw = !0, this.calc(!0), this.callOnUpdate()) : (this.force_redraw = !0, this.calc(!0), this.callOnStart()), this.updateScene();
    },
    append: function append() {
      var t = '<span class="irs irs--' + this.options.skin + " js-irs-" + this.plugin_count + " " + this.options.extra_classes + '"></span>';
      this.$cache.input.before(t), this.$cache.input.prop("readonly", !0), this.$cache.cont = this.$cache.input.prev(), this.result.slider = this.$cache.cont, this.$cache.cont.html('<span class="irs"><span class="irs-line" tabindex="0"></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span>'), this.$cache.rs = this.$cache.cont.find(".irs"), this.$cache.min = this.$cache.cont.find(".irs-min"), this.$cache.max = this.$cache.cont.find(".irs-max"), this.$cache.from = this.$cache.cont.find(".irs-from"), this.$cache.to = this.$cache.cont.find(".irs-to"), this.$cache.single = this.$cache.cont.find(".irs-single"), this.$cache.line = this.$cache.cont.find(".irs-line"), this.$cache.grid = this.$cache.cont.find(".irs-grid"), "single" === this.options.type ? (this.$cache.cont.append('<span class="irs-bar irs-bar--single"></span><span class="irs-shadow shadow-single"></span><span class="irs-handle single"><i></i><i></i><i></i></span>'), this.$cache.bar = this.$cache.cont.find(".irs-bar"), this.$cache.edge = this.$cache.cont.find(".irs-bar-edge"), this.$cache.s_single = this.$cache.cont.find(".single"), this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.shad_single = this.$cache.cont.find(".shadow-single")) : (this.$cache.cont.append('<span class="irs-bar"></span><span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-handle from"><i></i><i></i><i></i></span><span class="irs-handle to"><i></i><i></i><i></i></span>'), this.$cache.bar = this.$cache.cont.find(".irs-bar"), this.$cache.s_from = this.$cache.cont.find(".from"), this.$cache.s_to = this.$cache.cont.find(".to"), this.$cache.shad_from = this.$cache.cont.find(".shadow-from"), this.$cache.shad_to = this.$cache.cont.find(".shadow-to"), this.setTopHandler()), this.options.hide_from_to && (this.$cache.from[0].style.display = "none", this.$cache.to[0].style.display = "none", this.$cache.single[0].style.display = "none"), this.appendGrid(), this.options.disable ? (this.appendDisableMask(), this.$cache.input[0].disabled = !0) : (this.$cache.input[0].disabled = !1, this.removeDisableMask(), this.bindEvents()), this.options.disable || (this.options.block ? this.appendDisableMask() : this.removeDisableMask()), this.options.drag_interval && (this.$cache.bar[0].style.cursor = "ew-resize");
    },
    setTopHandler: function setTopHandler() {
      var t = this.options.min,
          i = this.options.max,
          s = this.options.from,
          o = this.options.to;
      t < s && o === i ? this.$cache.s_from.addClass("type_last") : o < i && this.$cache.s_to.addClass("type_last");
    },
    changeLevel: function changeLevel(t) {
      switch (t) {
        case "single":
          this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake), this.$cache.s_single.addClass("state_hover");
          break;

        case "from":
          this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake), this.$cache.s_from.addClass("state_hover"), this.$cache.s_from.addClass("type_last"), this.$cache.s_to.removeClass("type_last");
          break;

        case "to":
          this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake), this.$cache.s_to.addClass("state_hover"), this.$cache.s_to.addClass("type_last"), this.$cache.s_from.removeClass("type_last");
          break;

        case "both":
          this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake), this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer), this.$cache.s_to.removeClass("type_last"), this.$cache.s_from.removeClass("type_last");
      }
    },
    appendDisableMask: function appendDisableMask() {
      this.$cache.cont.append('<span class="irs-disable-mask"></span>'), this.$cache.cont.addClass("irs-disabled");
    },
    removeDisableMask: function removeDisableMask() {
      this.$cache.cont.remove(".irs-disable-mask"), this.$cache.cont.removeClass("irs-disabled");
    },
    remove: function remove() {
      this.$cache.cont.remove(), this.$cache.cont = null, this.$cache.line.off("keydown.irs_" + this.plugin_count), this.$cache.body.off("touchmove.irs_" + this.plugin_count), this.$cache.body.off("mousemove.irs_" + this.plugin_count), this.$cache.win.off("touchend.irs_" + this.plugin_count), this.$cache.win.off("mouseup.irs_" + this.plugin_count), e && (this.$cache.body.off("mouseup.irs_" + this.plugin_count), this.$cache.body.off("mouseleave.irs_" + this.plugin_count)), this.$cache.grid_labels = [], this.coords.big = [], this.coords.big_w = [], this.coords.big_p = [], this.coords.big_x = [], cancelAnimationFrame(this.raf_id);
    },
    bindEvents: function bindEvents() {
      this.no_diapason || (this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this)), this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this)), this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.line.on("focus.irs_" + this.plugin_count, this.pointerFocus.bind(this)), this.options.drag_interval && "double" === this.options.type ? (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"))) : (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))), "single" === this.options.type ? (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))), this.options.keyboard && this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard")), e && (this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this))));
    },
    pointerFocus: function pointerFocus(t) {
      var i, s;
      this.target || (i = (s = "single" === this.options.type ? this.$cache.single : this.$cache.from).offset().left, i += s.width() / 2 - 1, this.pointerClick("single", {
        preventDefault: function preventDefault() {},
        pageX: i
      }));
    },
    pointerMove: function pointerMove(t) {
      if (this.dragging) {
        var i = t.pageX || t.originalEvent.touches && t.originalEvent.touches[0].pageX;
        this.coords.x_pointer = i - this.coords.x_gap, this.calc();
      }
    },
    pointerUp: function pointerUp(t) {
      this.current_plugin === this.plugin_count && this.is_active && (this.is_active = !1, this.$cache.cont.find(".state_hover").removeClass("state_hover"), this.force_redraw = !0, e && a("*").prop("unselectable", !1), this.updateScene(), this.restoreOriginalMinInterval(), (a.contains(this.$cache.cont[0], t.target) || this.dragging) && this.callOnFinish(), this.dragging = !1);
    },
    pointerDown: function pointerDown(t, i) {
      i.preventDefault();
      var s = i.pageX || i.originalEvent.touches && i.originalEvent.touches[0].pageX;
      2 !== i.button && ("both" === t && this.setTempMinInterval(), t || (t = this.target || "from"), this.current_plugin = this.plugin_count, this.target = t, this.is_active = !0, this.dragging = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = s - this.coords.x_gap, this.calcPointerPercent(), this.changeLevel(t), e && a("*").prop("unselectable", !0), this.$cache.line.trigger("focus"), this.updateScene());
    },
    pointerClick: function pointerClick(t, i) {
      i.preventDefault();
      var s = i.pageX || i.originalEvent.touches && i.originalEvent.touches[0].pageX;
      2 !== i.button && (this.current_plugin = this.plugin_count, this.target = t, this.is_click = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = +(s - this.coords.x_gap).toFixed(), this.force_redraw = !0, this.calc(), this.$cache.line.trigger("focus"));
    },
    key: function key(t, i) {
      if (!(this.current_plugin !== this.plugin_count || i.altKey || i.ctrlKey || i.shiftKey || i.metaKey)) {
        switch (i.which) {
          case 83:
          case 65:
          case 40:
          case 37:
            i.preventDefault(), this.moveByKey(!1);
            break;

          case 87:
          case 68:
          case 38:
          case 39:
            i.preventDefault(), this.moveByKey(!0);
        }

        return !0;
      }
    },
    moveByKey: function moveByKey(t) {
      var i = this.coords.p_pointer,
          s = (this.options.max - this.options.min) / 100;
      s = this.options.step / s, t ? i += s : i -= s, this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * i), this.is_key = !0, this.calc();
    },
    setMinMax: function setMinMax() {
      if (this.options) {
        if (this.options.hide_min_max) return this.$cache.min[0].style.display = "none", void (this.$cache.max[0].style.display = "none");
        if (this.options.values.length) this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])), this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));else {
          var t = this._prettify(this.options.min),
              i = this._prettify(this.options.max);

          this.result.min_pretty = t, this.result.max_pretty = i, this.$cache.min.html(this.decorate(t, this.options.min)), this.$cache.max.html(this.decorate(i, this.options.max));
        }
        this.labels.w_min = this.$cache.min.outerWidth(!1), this.labels.w_max = this.$cache.max.outerWidth(!1);
      }
    },
    setTempMinInterval: function setTempMinInterval() {
      var t = this.result.to - this.result.from;
      null === this.old_min_interval && (this.old_min_interval = this.options.min_interval), this.options.min_interval = t;
    },
    restoreOriginalMinInterval: function restoreOriginalMinInterval() {
      null !== this.old_min_interval && (this.options.min_interval = this.old_min_interval, this.old_min_interval = null);
    },
    calc: function calc(t) {
      if (this.options && (this.calc_count++, (10 === this.calc_count || t) && (this.calc_count = 0, this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.calcHandlePercent()), this.coords.w_rs)) {
        this.calcPointerPercent();
        var i = this.getHandleX();

        switch ("both" === this.target && (this.coords.p_gap = 0, i = this.getHandleX()), "click" === this.target && (this.coords.p_gap = this.coords.p_handle / 2, i = this.getHandleX(), this.options.drag_interval ? this.target = "both_one" : this.target = this.chooseHandle(i)), this.target) {
          case "base":
            var s = (this.options.max - this.options.min) / 100,
                o = (this.result.from - this.options.min) / s,
                e = (this.result.to - this.options.min) / s;
            this.coords.p_single_real = this.toFixed(o), this.coords.p_from_real = this.toFixed(o), this.coords.p_to_real = this.toFixed(e), this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real), this.target = null;
            break;

          case "single":
            if (this.options.from_fixed) break;
            this.coords.p_single_real = this.convertToRealPercent(i), this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real), this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max), this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
            break;

          case "from":
            if (this.options.from_fixed) break;
            this.coords.p_from_real = this.convertToRealPercent(i), this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real), this.coords.p_from_real > this.coords.p_to_real && (this.coords.p_from_real = this.coords.p_to_real), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
            break;

          case "to":
            if (this.options.to_fixed) break;
            this.coords.p_to_real = this.convertToRealPercent(i), this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real), this.coords.p_to_real < this.coords.p_from_real && (this.coords.p_to_real = this.coords.p_from_real), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
            break;

          case "both":
            if (this.options.from_fixed || this.options.to_fixed) break;
            i = this.toFixed(i + .001 * this.coords.p_handle), this.coords.p_from_real = this.convertToRealPercent(i) - this.coords.p_gap_left, this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_real = this.convertToRealPercent(i) + this.coords.p_gap_right, this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
            break;

          case "both_one":
            if (this.options.from_fixed || this.options.to_fixed) break;
            var h = this.convertToRealPercent(i),
                r = this.result.from_percent,
                n = this.result.to_percent - r,
                a = n / 2,
                c = h - a,
                l = h + a;
            c < 0 && (l = (c = 0) + n), 100 < l && (c = (l = 100) - n), this.coords.p_from_real = this.calcWithStep(c), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_real = this.calcWithStep(l), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
        }

        "single" === this.options.type ? (this.coords.p_bar_x = this.coords.p_handle / 2, this.coords.p_bar_w = this.coords.p_single_fake, this.result.from_percent = this.coords.p_single_real, this.result.from = this.convertToValue(this.coords.p_single_real), this.result.from_pretty = this._prettify(this.result.from), this.options.values.length && (this.result.from_value = this.options.values[this.result.from])) : (this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + this.coords.p_handle / 2), this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake), this.result.from_percent = this.coords.p_from_real, this.result.from = this.convertToValue(this.coords.p_from_real), this.result.from_pretty = this._prettify(this.result.from), this.result.to_percent = this.coords.p_to_real, this.result.to = this.convertToValue(this.coords.p_to_real), this.result.to_pretty = this._prettify(this.result.to), this.options.values.length && (this.result.from_value = this.options.values[this.result.from], this.result.to_value = this.options.values[this.result.to])), this.calcMinMax(), this.calcLabels();
      }
    },
    calcPointerPercent: function calcPointerPercent() {
      this.coords.w_rs ? (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer) ? this.coords.x_pointer = 0 : this.coords.x_pointer > this.coords.w_rs && (this.coords.x_pointer = this.coords.w_rs), this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100)) : this.coords.p_pointer = 0;
    },
    convertToRealPercent: function convertToRealPercent(t) {
      return t / (100 - this.coords.p_handle) * 100;
    },
    convertToFakePercent: function convertToFakePercent(t) {
      return t / 100 * (100 - this.coords.p_handle);
    },
    getHandleX: function getHandleX() {
      var t = 100 - this.coords.p_handle,
          i = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
      return i < 0 ? i = 0 : t < i && (i = t), i;
    },
    calcHandlePercent: function calcHandlePercent() {
      "single" === this.options.type ? this.coords.w_handle = this.$cache.s_single.outerWidth(!1) : this.coords.w_handle = this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
    },
    chooseHandle: function chooseHandle(t) {
      return "single" === this.options.type ? "single" : this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2 <= t ? this.options.to_fixed ? "from" : "to" : this.options.from_fixed ? "to" : "from";
    },
    calcMinMax: function calcMinMax() {
      this.coords.w_rs && (this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100, this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100);
    },
    calcLabels: function calcLabels() {
      this.coords.w_rs && !this.options.hide_from_to && ("single" === this.options.type ? (this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = this.coords.p_single_fake + this.coords.p_handle / 2 - this.labels.p_single_fake / 2) : (this.labels.w_from = this.$cache.from.outerWidth(!1), this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100, this.labels.p_from_left = this.coords.p_from_fake + this.coords.p_handle / 2 - this.labels.p_from_fake / 2, this.labels.p_from_left = this.toFixed(this.labels.p_from_left), this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake), this.labels.w_to = this.$cache.to.outerWidth(!1), this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100, this.labels.p_to_left = this.coords.p_to_fake + this.coords.p_handle / 2 - this.labels.p_to_fake / 2, this.labels.p_to_left = this.toFixed(this.labels.p_to_left), this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake), this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2 - this.labels.p_single_fake / 2, this.labels.p_single_left = this.toFixed(this.labels.p_single_left)), this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake));
    },
    updateScene: function updateScene() {
      this.raf_id && (cancelAnimationFrame(this.raf_id), this.raf_id = null), clearTimeout(this.update_tm), this.update_tm = null, this.options && (this.drawHandles(), this.is_active ? this.raf_id = requestAnimationFrame(this.updateScene.bind(this)) : this.update_tm = setTimeout(this.updateScene.bind(this), 300));
    },
    drawHandles: function drawHandles() {
      this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_rs && (this.coords.w_rs !== this.coords.w_rs_old && (this.target = "base", this.is_resize = !0), (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) && (this.setMinMax(), this.calc(!0), this.drawLabels(), this.options.grid && (this.calcGridMargin(), this.calcGridLabels()), this.force_redraw = !0, this.coords.w_rs_old = this.coords.w_rs, this.drawShadow()), this.coords.w_rs && (this.dragging || this.force_redraw || this.is_key) && ((this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) && (this.drawLabels(), this.$cache.bar[0].style.left = this.coords.p_bar_x + "%", this.$cache.bar[0].style.width = this.coords.p_bar_w + "%", "single" === this.options.type ? (this.$cache.bar[0].style.left = 0, this.$cache.bar[0].style.width = this.coords.p_bar_w + this.coords.p_bar_x + "%", this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%") : (this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%", this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%", (this.old_from !== this.result.from || this.force_redraw) && (this.$cache.from[0].style.left = this.labels.p_from_left + "%"), (this.old_to !== this.result.to || this.force_redraw) && (this.$cache.to[0].style.left = this.labels.p_to_left + "%")), this.$cache.single[0].style.left = this.labels.p_single_left + "%", this.writeToInput(), this.old_from === this.result.from && this.old_to === this.result.to || this.is_start || (this.$cache.input.trigger("change"), this.$cache.input.trigger("input")), this.old_from = this.result.from, this.old_to = this.result.to, this.is_resize || this.is_update || this.is_start || this.is_finish || this.callOnChange(), (this.is_key || this.is_click) && (this.is_key = !1, this.is_click = !1, this.callOnFinish()), this.is_update = !1, this.is_resize = !1, this.is_finish = !1), this.is_start = !1, this.is_key = !1, this.is_click = !1, this.force_redraw = !1));
    },
    drawLabels: function drawLabels() {
      if (this.options) {
        var t,
            i,
            s,
            o,
            e,
            h = this.options.values.length,
            r = this.options.p_values;
        if (!this.options.hide_from_to) if ("single" === this.options.type) t = h ? this.decorate(r[this.result.from]) : (o = this._prettify(this.result.from), this.decorate(o, this.result.from)), this.$cache.single.html(t), this.calcLabels(), this.labels.p_single_left < this.labels.p_min + 1 ? this.$cache.min[0].style.visibility = "hidden" : this.$cache.min[0].style.visibility = "visible", this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1 ? this.$cache.max[0].style.visibility = "hidden" : this.$cache.max[0].style.visibility = "visible";else {
          s = h ? (this.options.decorate_both ? (t = this.decorate(r[this.result.from]), t += this.options.values_separator, t += this.decorate(r[this.result.to])) : t = this.decorate(r[this.result.from] + this.options.values_separator + r[this.result.to]), i = this.decorate(r[this.result.from]), this.decorate(r[this.result.to])) : (o = this._prettify(this.result.from), e = this._prettify(this.result.to), this.options.decorate_both ? (t = this.decorate(o, this.result.from), t += this.options.values_separator, t += this.decorate(e, this.result.to)) : t = this.decorate(o + this.options.values_separator + e, this.result.to), i = this.decorate(o, this.result.from), this.decorate(e, this.result.to)), this.$cache.single.html(t), this.$cache.from.html(i), this.$cache.to.html(s), this.calcLabels();
          var n = Math.min(this.labels.p_single_left, this.labels.p_from_left),
              a = this.labels.p_single_left + this.labels.p_single_fake,
              c = this.labels.p_to_left + this.labels.p_to_fake,
              l = Math.max(a, c);
          this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left ? (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", l = this.result.from === this.result.to ? ("from" === this.target ? this.$cache.from[0].style.visibility = "visible" : "to" === this.target ? this.$cache.to[0].style.visibility = "visible" : this.target || (this.$cache.from[0].style.visibility = "visible"), this.$cache.single[0].style.visibility = "hidden", c) : (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", Math.max(a, c))) : (this.$cache.from[0].style.visibility = "visible", this.$cache.to[0].style.visibility = "visible", this.$cache.single[0].style.visibility = "hidden"), n < this.labels.p_min + 1 ? this.$cache.min[0].style.visibility = "hidden" : this.$cache.min[0].style.visibility = "visible", l > 100 - this.labels.p_max - 1 ? this.$cache.max[0].style.visibility = "hidden" : this.$cache.max[0].style.visibility = "visible";
        }
      }
    },
    drawShadow: function drawShadow() {
      var t,
          i,
          s,
          o,
          e = this.options,
          h = this.$cache,
          r = "number" == typeof e.from_min && !isNaN(e.from_min),
          n = "number" == typeof e.from_max && !isNaN(e.from_max),
          a = "number" == typeof e.to_min && !isNaN(e.to_min),
          c = "number" == typeof e.to_max && !isNaN(e.to_max);
      "single" === e.type ? e.from_shadow && (r || n) ? (t = this.convertToPercent(r ? e.from_min : e.min), i = this.convertToPercent(n ? e.from_max : e.max) - t, t = this.toFixed(t - this.coords.p_handle / 100 * t), i = this.toFixed(i - this.coords.p_handle / 100 * i), t += this.coords.p_handle / 2, h.shad_single[0].style.display = "block", h.shad_single[0].style.left = t + "%", h.shad_single[0].style.width = i + "%") : h.shad_single[0].style.display = "none" : (e.from_shadow && (r || n) ? (t = this.convertToPercent(r ? e.from_min : e.min), i = this.convertToPercent(n ? e.from_max : e.max) - t, t = this.toFixed(t - this.coords.p_handle / 100 * t), i = this.toFixed(i - this.coords.p_handle / 100 * i), t += this.coords.p_handle / 2, h.shad_from[0].style.display = "block", h.shad_from[0].style.left = t + "%", h.shad_from[0].style.width = i + "%") : h.shad_from[0].style.display = "none", e.to_shadow && (a || c) ? (s = this.convertToPercent(a ? e.to_min : e.min), o = this.convertToPercent(c ? e.to_max : e.max) - s, s = this.toFixed(s - this.coords.p_handle / 100 * s), o = this.toFixed(o - this.coords.p_handle / 100 * o), s += this.coords.p_handle / 2, h.shad_to[0].style.display = "block", h.shad_to[0].style.left = s + "%", h.shad_to[0].style.width = o + "%") : h.shad_to[0].style.display = "none");
    },
    writeToInput: function writeToInput() {
      "single" === this.options.type ? (this.options.values.length ? this.$cache.input.prop("value", this.result.from_value) : this.$cache.input.prop("value", this.result.from), this.$cache.input.data("from", this.result.from)) : (this.options.values.length ? this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value) : this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to), this.$cache.input.data("from", this.result.from), this.$cache.input.data("to", this.result.to));
    },
    callOnStart: function callOnStart() {
      this.writeToInput(), this.options.onStart && "function" == typeof this.options.onStart && (this.options.scope ? this.options.onStart.call(this.options.scope, this.result) : this.options.onStart(this.result));
    },
    callOnChange: function callOnChange() {
      this.writeToInput(), this.options.onChange && "function" == typeof this.options.onChange && (this.options.scope ? this.options.onChange.call(this.options.scope, this.result) : this.options.onChange(this.result));
    },
    callOnFinish: function callOnFinish() {
      this.writeToInput(), this.options.onFinish && "function" == typeof this.options.onFinish && (this.options.scope ? this.options.onFinish.call(this.options.scope, this.result) : this.options.onFinish(this.result));
    },
    callOnUpdate: function callOnUpdate() {
      this.writeToInput(), this.options.onUpdate && "function" == typeof this.options.onUpdate && (this.options.scope ? this.options.onUpdate.call(this.options.scope, this.result) : this.options.onUpdate(this.result));
    },
    toggleInput: function toggleInput() {
      this.$cache.input.toggleClass("irs-hidden-input"), this.has_tab_index ? this.$cache.input.prop("tabindex", -1) : this.$cache.input.removeProp("tabindex"), this.has_tab_index = !this.has_tab_index;
    },
    convertToPercent: function convertToPercent(t, i) {
      var s,
          o = this.options.max - this.options.min,
          e = o / 100;
      return o ? (s = (i ? t : t - this.options.min) / e, this.toFixed(s)) : (this.no_diapason = !0, 0);
    },
    convertToValue: function convertToValue(t) {
      var i,
          s,
          o = this.options.min,
          e = this.options.max,
          h = o.toString().split(".")[1],
          r = e.toString().split(".")[1],
          n = 0,
          a = 0;
      if (0 === t) return this.options.min;
      if (100 === t) return this.options.max;
      h && (n = i = h.length), r && (n = s = r.length), i && s && (n = s <= i ? i : s), o < 0 && (o = +(o + (a = Math.abs(o))).toFixed(n), e = +(e + a).toFixed(n));
      var c,
          l = (e - o) / 100 * t + o,
          _ = this.options.step.toString().split(".")[1];
      return l = _ ? +l.toFixed(_.length) : (l /= this.options.step, +(l *= this.options.step).toFixed(0)), a && (l -= a), (c = _ ? +l.toFixed(_.length) : this.toFixed(l)) < this.options.min ? c = this.options.min : c > this.options.max && (c = this.options.max), c;
    },
    calcWithStep: function calcWithStep(t) {
      var i = Math.round(t / this.coords.p_step) * this.coords.p_step;
      return 100 < i && (i = 100), 100 === t && (i = 100), this.toFixed(i);
    },
    checkMinInterval: function checkMinInterval(t, i, s) {
      var o,
          e,
          h = this.options;
      return h.min_interval ? (o = this.convertToValue(t), e = this.convertToValue(i), "from" === s ? e - o < h.min_interval && (o = e - h.min_interval) : o - e < h.min_interval && (o = e + h.min_interval), this.convertToPercent(o)) : t;
    },
    checkMaxInterval: function checkMaxInterval(t, i, s) {
      var o,
          e,
          h = this.options;
      return h.max_interval ? (o = this.convertToValue(t), e = this.convertToValue(i), "from" === s ? e - o > h.max_interval && (o = e - h.max_interval) : o - e > h.max_interval && (o = e + h.max_interval), this.convertToPercent(o)) : t;
    },
    checkDiapason: function checkDiapason(t, i, s) {
      var o = this.convertToValue(t),
          e = this.options;
      return "number" != typeof i && (i = e.min), "number" != typeof s && (s = e.max), o < i && (o = i), s < o && (o = s), this.convertToPercent(o);
    },
    toFixed: function toFixed(t) {
      return +(t = t.toFixed(20));
    },
    _prettify: function _prettify(t) {
      return this.options.prettify_enabled ? this.options.prettify && "function" == typeof this.options.prettify ? this.options.prettify(t) : this.prettify(t) : t;
    },
    prettify: function prettify(t) {
      return t.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator);
    },
    checkEdges: function checkEdges(t, i) {
      return this.options.force_edges && (t < 0 ? t = 0 : 100 - i < t && (t = 100 - i)), this.toFixed(t);
    },
    validate: function validate() {
      var t,
          i,
          s = this.options,
          o = this.result,
          e = s.values,
          h = e.length;
      if ("string" == typeof s.min && (s.min = +s.min), "string" == typeof s.max && (s.max = +s.max), "string" == typeof s.from && (s.from = +s.from), "string" == typeof s.to && (s.to = +s.to), "string" == typeof s.step && (s.step = +s.step), "string" == typeof s.from_min && (s.from_min = +s.from_min), "string" == typeof s.from_max && (s.from_max = +s.from_max), "string" == typeof s.to_min && (s.to_min = +s.to_min), "string" == typeof s.to_max && (s.to_max = +s.to_max), "string" == typeof s.grid_num && (s.grid_num = +s.grid_num), s.max < s.min && (s.max = s.min), h) for (s.p_values = [], s.min = 0, s.max = h - 1, s.step = 1, s.grid_num = s.max, s.grid_snap = !0, i = 0; i < h; i++) {
        t = +e[i], t = isNaN(t) ? e[i] : (e[i] = t, this._prettify(t)), s.p_values.push(t);
      }
      ("number" != typeof s.from || isNaN(s.from)) && (s.from = s.min), ("number" != typeof s.to || isNaN(s.to)) && (s.to = s.max), "single" === s.type ? (s.from < s.min && (s.from = s.min), s.from > s.max && (s.from = s.max)) : (s.from < s.min && (s.from = s.min), s.from > s.max && (s.from = s.max), s.to < s.min && (s.to = s.min), s.to > s.max && (s.to = s.max), this.update_check.from && (this.update_check.from !== s.from && s.from > s.to && (s.from = s.to), this.update_check.to !== s.to && s.to < s.from && (s.to = s.from)), s.from > s.to && (s.from = s.to), s.to < s.from && (s.to = s.from)), ("number" != typeof s.step || isNaN(s.step) || !s.step || s.step < 0) && (s.step = 1), "number" == typeof s.from_min && s.from < s.from_min && (s.from = s.from_min), "number" == typeof s.from_max && s.from > s.from_max && (s.from = s.from_max), "number" == typeof s.to_min && s.to < s.to_min && (s.to = s.to_min), "number" == typeof s.to_max && s.from > s.to_max && (s.to = s.to_max), o && (o.min !== s.min && (o.min = s.min), o.max !== s.max && (o.max = s.max), (o.from < o.min || o.from > o.max) && (o.from = s.from), (o.to < o.min || o.to > o.max) && (o.to = s.to)), ("number" != typeof s.min_interval || isNaN(s.min_interval) || !s.min_interval || s.min_interval < 0) && (s.min_interval = 0), ("number" != typeof s.max_interval || isNaN(s.max_interval) || !s.max_interval || s.max_interval < 0) && (s.max_interval = 0), s.min_interval && s.min_interval > s.max - s.min && (s.min_interval = s.max - s.min), s.max_interval && s.max_interval > s.max - s.min && (s.max_interval = s.max - s.min);
    },
    decorate: function decorate(t, i) {
      var s = "",
          o = this.options;
      return o.prefix && (s += o.prefix), s += t, o.max_postfix && (o.values.length && t === o.p_values[o.max] ? (s += o.max_postfix, o.postfix && (s += " ")) : i === o.max && (s += o.max_postfix, o.postfix && (s += " "))), o.postfix && (s += o.postfix), s;
    },
    updateFrom: function updateFrom() {
      this.result.from = this.options.from, this.result.from_percent = this.convertToPercent(this.result.from), this.result.from_pretty = this._prettify(this.result.from), this.options.values && (this.result.from_value = this.options.values[this.result.from]);
    },
    updateTo: function updateTo() {
      this.result.to = this.options.to, this.result.to_percent = this.convertToPercent(this.result.to), this.result.to_pretty = this._prettify(this.result.to), this.options.values && (this.result.to_value = this.options.values[this.result.to]);
    },
    updateResult: function updateResult() {
      this.result.min = this.options.min, this.result.max = this.options.max, this.updateFrom(), this.updateTo();
    },
    appendGrid: function appendGrid() {
      if (this.options.grid) {
        var t,
            i,
            s,
            o,
            e,
            h,
            r = this.options,
            n = r.max - r.min,
            a = r.grid_num,
            c = 0,
            l = 4,
            _ = "";

        for (this.calcGridMargin(), r.grid_snap && (a = n / r.step), 50 < a && (a = 50), s = this.toFixed(100 / a), 4 < a && (l = 3), 7 < a && (l = 2), 14 < a && (l = 1), 28 < a && (l = 0), t = 0; t < a + 1; t++) {
          for (o = l, 100 < (c = this.toFixed(s * t)) && (c = 100), e = ((this.coords.big[t] = c) - s * (t - 1)) / (o + 1), i = 1; i <= o && 0 !== c; i++) {
            _ += '<span class="irs-grid-pol small" style="left: ' + this.toFixed(c - e * i) + '%"></span>';
          }

          _ += '<span class="irs-grid-pol" style="left: ' + c + '%"></span>', h = this.convertToValue(c), _ += '<span class="irs-grid-text js-grid-text-' + t + '" style="left: ' + c + '%">' + (h = r.values.length ? r.p_values[h] : this._prettify(h)) + "</span>";
        }

        this.coords.big_num = Math.ceil(a + 1), this.$cache.cont.addClass("irs-with-grid"), this.$cache.grid.html(_), this.cacheGridLabels();
      }
    },
    cacheGridLabels: function cacheGridLabels() {
      var t,
          i,
          s = this.coords.big_num;

      for (i = 0; i < s; i++) {
        t = this.$cache.grid.find(".js-grid-text-" + i), this.$cache.grid_labels.push(t);
      }

      this.calcGridLabels();
    },
    calcGridLabels: function calcGridLabels() {
      var t,
          i,
          s = [],
          o = [],
          e = this.coords.big_num;

      for (t = 0; t < e; t++) {
        this.coords.big_w[t] = this.$cache.grid_labels[t].outerWidth(!1), this.coords.big_p[t] = this.toFixed(this.coords.big_w[t] / this.coords.w_rs * 100), this.coords.big_x[t] = this.toFixed(this.coords.big_p[t] / 2), s[t] = this.toFixed(this.coords.big[t] - this.coords.big_x[t]), o[t] = this.toFixed(s[t] + this.coords.big_p[t]);
      }

      for (this.options.force_edges && (s[0] < -this.coords.grid_gap && (s[0] = -this.coords.grid_gap, o[0] = this.toFixed(s[0] + this.coords.big_p[0]), this.coords.big_x[0] = this.coords.grid_gap), o[e - 1] > 100 + this.coords.grid_gap && (o[e - 1] = 100 + this.coords.grid_gap, s[e - 1] = this.toFixed(o[e - 1] - this.coords.big_p[e - 1]), this.coords.big_x[e - 1] = this.toFixed(this.coords.big_p[e - 1] - this.coords.grid_gap))), this.calcGridCollision(2, s, o), this.calcGridCollision(4, s, o), t = 0; t < e; t++) {
        i = this.$cache.grid_labels[t][0], this.coords.big_x[t] !== Number.POSITIVE_INFINITY && (i.style.marginLeft = -this.coords.big_x[t] + "%");
      }
    },
    calcGridCollision: function calcGridCollision(t, i, s) {
      var o,
          e,
          h,
          r = this.coords.big_num;

      for (o = 0; o < r && !(r <= (e = o + t / 2)); o += t) {
        h = this.$cache.grid_labels[e][0], s[o] <= i[e] ? h.style.visibility = "visible" : h.style.visibility = "hidden";
      }
    },
    calcGridMargin: function calcGridMargin() {
      this.options.grid_margin && (this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_rs && ("single" === this.options.type ? this.coords.w_handle = this.$cache.s_single.outerWidth(!1) : this.coords.w_handle = this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100), this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - .1), this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%", this.$cache.grid[0].style.left = this.coords.grid_gap + "%"));
    },
    update: function update(t) {
      this.input && (this.is_update = !0, this.options.from = this.result.from, this.options.to = this.result.to, this.update_check.from = this.result.from, this.update_check.to = this.result.to, this.options = a.extend(this.options, t), this.validate(), this.updateResult(t), this.toggleInput(), this.remove(), this.init(!0));
    },
    reset: function reset() {
      this.input && (this.updateResult(), this.update());
    },
    destroy: function destroy() {
      this.input && (this.toggleInput(), this.$cache.input.prop("readonly", !1), a.data(this.input, "ionRangeSlider", null), this.remove(), this.input = null, this.options = null);
    }
  }, a.fn.ionRangeSlider = function (t) {
    return this.each(function () {
      a.data(this, "ionRangeSlider") || a.data(this, "ionRangeSlider", new h(this, t, o++));
    });
  }, function () {
    for (var h = 0, t = ["ms", "moz", "webkit", "o"], i = 0; i < t.length && !l.requestAnimationFrame; ++i) {
      l.requestAnimationFrame = l[t[i] + "RequestAnimationFrame"], l.cancelAnimationFrame = l[t[i] + "CancelAnimationFrame"] || l[t[i] + "CancelRequestAnimationFrame"];
    }

    l.requestAnimationFrame || (l.requestAnimationFrame = function (t, i) {
      var s = new Date().getTime(),
          o = Math.max(0, 16 - (s - h)),
          e = l.setTimeout(function () {
        t(s + o);
      }, o);
      return h = s + o, e;
    }), l.cancelAnimationFrame || (l.cancelAnimationFrame = function (t) {
      clearTimeout(t);
    });
  }();
});
/*! Select2 4.0.6-rc.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = function (b, c) {
    return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c;
  } : a(jQuery);
}(function (a) {
  var b = function () {
    if (a && a.fn && a.fn.select2 && a.fn.select2.amd) var b = a.fn.select2.amd;
    var b;
    return function () {
      if (!b || !b.requirejs) {
        b ? c = b : b = {};
        var a, c, d;
        !function (b) {
          function e(a, b) {
            return v.call(a, b);
          }

          function f(a, b) {
            var c,
                d,
                e,
                f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                n,
                o = b && b.split("/"),
                p = t.map,
                q = p && p["*"] || {};

            if (a) {
              for (a = a.split("/"), g = a.length - 1, t.nodeIdCompat && x.test(a[g]) && (a[g] = a[g].replace(x, "")), "." === a[0].charAt(0) && o && (n = o.slice(0, o.length - 1), a = n.concat(a)), k = 0; k < a.length; k++) {
                if ("." === (m = a[k])) a.splice(k, 1), k -= 1;else if (".." === m) {
                  if (0 === k || 1 === k && ".." === a[2] || ".." === a[k - 1]) continue;
                  k > 0 && (a.splice(k - 1, 2), k -= 2);
                }
              }

              a = a.join("/");
            }

            if ((o || q) && p) {
              for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
                if (d = c.slice(0, k).join("/"), o) for (l = o.length; l > 0; l -= 1) {
                  if ((e = p[o.slice(0, l).join("/")]) && (e = e[d])) {
                    f = e, h = k;
                    break;
                  }
                }
                if (f) break;
                !i && q && q[d] && (i = q[d], j = k);
              }

              !f && i && (f = i, h = j), f && (c.splice(0, h, f), a = c.join("/"));
            }

            return a;
          }

          function g(a, c) {
            return function () {
              var d = w.call(arguments, 0);
              return "string" != typeof d[0] && 1 === d.length && d.push(null), _o.apply(b, d.concat([a, c]));
            };
          }

          function h(a) {
            return function (b) {
              return f(b, a);
            };
          }

          function i(a) {
            return function (b) {
              r[a] = b;
            };
          }

          function j(a) {
            if (e(s, a)) {
              var c = s[a];
              delete s[a], u[a] = !0, n.apply(b, c);
            }

            if (!e(r, a) && !e(u, a)) throw new Error("No " + a);
            return r[a];
          }

          function k(a) {
            var b,
                c = a ? a.indexOf("!") : -1;
            return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a];
          }

          function l(a) {
            return a ? k(a) : [];
          }

          function m(a) {
            return function () {
              return t && t.config && t.config[a] || {};
            };
          }

          var n,
              _o,
              p,
              q,
              r = {},
              s = {},
              t = {},
              u = {},
              v = Object.prototype.hasOwnProperty,
              w = [].slice,
              x = /\.js$/;

          p = function p(a, b) {
            var c,
                d = k(a),
                e = d[0],
                g = b[1];
            return a = d[1], e && (e = f(e, g), c = j(e)), e ? a = c && c.normalize ? c.normalize(a, h(g)) : f(a, g) : (a = f(a, g), d = k(a), e = d[0], a = d[1], e && (c = j(e))), {
              f: e ? e + "!" + a : a,
              n: a,
              pr: e,
              p: c
            };
          }, q = {
            require: function require(a) {
              return g(a);
            },
            exports: function exports(a) {
              var b = r[a];
              return void 0 !== b ? b : r[a] = {};
            },
            module: function module(a) {
              return {
                id: a,
                uri: "",
                exports: r[a],
                config: m(a)
              };
            }
          }, n = function n(a, c, d, f) {
            var h,
                k,
                m,
                n,
                o,
                t,
                v,
                w = [],
                x = _typeof(d);

            if (f = f || a, t = l(f), "undefined" === x || "function" === x) {
              for (c = !c.length && d.length ? ["require", "exports", "module"] : c, o = 0; o < c.length; o += 1) {
                if (n = p(c[o], t), "require" === (k = n.f)) w[o] = q.require(a);else if ("exports" === k) w[o] = q.exports(a), v = !0;else if ("module" === k) h = w[o] = q.module(a);else if (e(r, k) || e(s, k) || e(u, k)) w[o] = j(k);else {
                  if (!n.p) throw new Error(a + " missing " + k);
                  n.p.load(n.n, g(f, !0), i(k), {}), w[o] = r[k];
                }
              }

              m = d ? d.apply(r[a], w) : void 0, a && (h && h.exports !== b && h.exports !== r[a] ? r[a] = h.exports : m === b && v || (r[a] = m));
            } else a && (r[a] = d);
          }, a = c = _o = function o(a, c, d, e, f) {
            if ("string" == typeof a) return q[a] ? q[a](c) : j(p(a, l(c)).f);

            if (!a.splice) {
              if (t = a, t.deps && _o(t.deps, t.callback), !c) return;
              c.splice ? (a = c, c = d, d = null) : a = b;
            }

            return c = c || function () {}, "function" == typeof d && (d = e, e = f), e ? n(b, a, c, d) : setTimeout(function () {
              n(b, a, c, d);
            }, 4), _o;
          }, _o.config = function (a) {
            return _o(a);
          }, a._defined = r, d = function d(a, b, c) {
            if ("string" != typeof a) throw new Error("See almond README: incorrect module build, no module name");
            b.splice || (c = b, b = []), e(r, a) || e(s, a) || (s[a] = [a, b, c]);
          }, d.amd = {
            jQuery: !0
          };
        }(), b.requirejs = a, b.require = c, b.define = d;
      }
    }(), b.define("almond", function () {}), b.define("jquery", [], function () {
      var b = a || $;
      return null == b && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), b;
    }), b.define("select2/utils", ["jquery"], function (a) {
      function b(a) {
        var b = a.prototype,
            c = [];

        for (var d in b) {
          "function" == typeof b[d] && "constructor" !== d && c.push(d);
        }

        return c;
      }

      var c = {};
      c.Extend = function (a, b) {
        function c() {
          this.constructor = a;
        }

        var d = {}.hasOwnProperty;

        for (var e in b) {
          d.call(b, e) && (a[e] = b[e]);
        }

        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, a;
      }, c.Decorate = function (a, c) {
        function d() {
          var b = Array.prototype.unshift,
              d = c.prototype.constructor.length,
              e = a.prototype.constructor;
          d > 0 && (b.call(arguments, a.prototype.constructor), e = c.prototype.constructor), e.apply(this, arguments);
        }

        function e() {
          this.constructor = d;
        }

        var f = b(c),
            g = b(a);
        c.displayName = a.displayName, d.prototype = new e();

        for (var h = 0; h < g.length; h++) {
          var i = g[h];
          d.prototype[i] = a.prototype[i];
        }

        for (var j = function j(a) {
          var b = function b() {};

          (a in d.prototype) && (b = d.prototype[a]);
          var e = c.prototype[a];
          return function () {
            return Array.prototype.unshift.call(arguments, b), e.apply(this, arguments);
          };
        }, k = 0; k < f.length; k++) {
          var l = f[k];
          d.prototype[l] = j(l);
        }

        return d;
      };

      var d = function d() {
        this.listeners = {};
      };

      d.prototype.on = function (a, b) {
        this.listeners = this.listeners || {}, a in this.listeners ? this.listeners[a].push(b) : this.listeners[a] = [b];
      }, d.prototype.trigger = function (a) {
        var b = Array.prototype.slice,
            c = b.call(arguments, 1);
        this.listeners = this.listeners || {}, null == c && (c = []), 0 === c.length && c.push({}), c[0]._type = a, a in this.listeners && this.invoke(this.listeners[a], b.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments);
      }, d.prototype.invoke = function (a, b) {
        for (var c = 0, d = a.length; c < d; c++) {
          a[c].apply(this, b);
        }
      }, c.Observable = d, c.generateChars = function (a) {
        for (var b = "", c = 0; c < a; c++) {
          b += Math.floor(36 * Math.random()).toString(36);
        }

        return b;
      }, c.bind = function (a, b) {
        return function () {
          a.apply(b, arguments);
        };
      }, c._convertData = function (a) {
        for (var b in a) {
          var c = b.split("-"),
              d = a;

          if (1 !== c.length) {
            for (var e = 0; e < c.length; e++) {
              var f = c[e];
              f = f.substring(0, 1).toLowerCase() + f.substring(1), f in d || (d[f] = {}), e == c.length - 1 && (d[f] = a[b]), d = d[f];
            }

            delete a[b];
          }
        }

        return a;
      }, c.hasScroll = function (b, c) {
        var d = a(c),
            e = c.style.overflowX,
            f = c.style.overflowY;
        return (e !== f || "hidden" !== f && "visible" !== f) && ("scroll" === e || "scroll" === f || d.innerHeight() < c.scrollHeight || d.innerWidth() < c.scrollWidth);
      }, c.escapeMarkup = function (a) {
        var b = {
          "\\": "&#92;",
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#47;"
        };
        return "string" != typeof a ? a : String(a).replace(/[&<>"'\/\\]/g, function (a) {
          return b[a];
        });
      }, c.appendMany = function (b, c) {
        if ("1.7" === a.fn.jquery.substr(0, 3)) {
          var d = a();
          a.map(c, function (a) {
            d = d.add(a);
          }), c = d;
        }

        b.append(c);
      }, c.__cache = {};
      var e = 0;
      return c.GetUniqueElementId = function (a) {
        var b = a.getAttribute("data-select2-id");
        return null == b && (a.id ? (b = a.id, a.setAttribute("data-select2-id", b)) : (a.setAttribute("data-select2-id", ++e), b = e.toString())), b;
      }, c.StoreData = function (a, b, d) {
        var e = c.GetUniqueElementId(a);
        c.__cache[e] || (c.__cache[e] = {}), c.__cache[e][b] = d;
      }, c.GetData = function (b, d) {
        var e = c.GetUniqueElementId(b);
        return d ? c.__cache[e] && null != c.__cache[e][d] ? c.__cache[e][d] : a(b).data(d) : c.__cache[e];
      }, c.RemoveData = function (a) {
        var b = c.GetUniqueElementId(a);
        null != c.__cache[b] && delete c.__cache[b];
      }, c;
    }), b.define("select2/results", ["jquery", "./utils"], function (a, b) {
      function c(a, b, d) {
        this.$element = a, this.data = d, this.options = b, c.__super__.constructor.call(this);
      }

      return b.Extend(c, b.Observable), c.prototype.render = function () {
        var b = a('<ul class="select2-results__options" role="tree"></ul>');
        return this.options.get("multiple") && b.attr("aria-multiselectable", "true"), this.$results = b, b;
      }, c.prototype.clear = function () {
        this.$results.empty();
      }, c.prototype.displayMessage = function (b) {
        var c = this.options.get("escapeMarkup");
        this.clear(), this.hideLoading();
        var d = a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
            e = this.options.get("translations").get(b.message);
        d.append(c(e(b.args))), d[0].className += " select2-results__message", this.$results.append(d);
      }, c.prototype.hideMessages = function () {
        this.$results.find(".select2-results__message").remove();
      }, c.prototype.append = function (a) {
        this.hideLoading();
        var b = [];
        if (null == a.results || 0 === a.results.length) return void (0 === this.$results.children().length && this.trigger("results:message", {
          message: "noResults"
        }));
        a.results = this.sort(a.results);

        for (var c = 0; c < a.results.length; c++) {
          var d = a.results[c],
              e = this.option(d);
          b.push(e);
        }

        this.$results.append(b);
      }, c.prototype.position = function (a, b) {
        b.find(".select2-results").append(a);
      }, c.prototype.sort = function (a) {
        return this.options.get("sorter")(a);
      }, c.prototype.highlightFirstItem = function () {
        var a = this.$results.find(".select2-results__option[aria-selected]"),
            b = a.filter("[aria-selected=true]");
        b.length > 0 ? b.first().trigger("mouseenter") : a.first().trigger("mouseenter"), this.ensureHighlightVisible();
      }, c.prototype.setClasses = function () {
        var c = this;
        this.data.current(function (d) {
          var e = a.map(d, function (a) {
            return a.id.toString();
          });
          c.$results.find(".select2-results__option[aria-selected]").each(function () {
            var c = a(this),
                d = b.GetData(this, "data"),
                f = "" + d.id;
            null != d.element && d.element.selected || null == d.element && a.inArray(f, e) > -1 ? c.attr("aria-selected", "true") : c.attr("aria-selected", "false");
          });
        });
      }, c.prototype.showLoading = function (a) {
        this.hideLoading();
        var b = this.options.get("translations").get("searching"),
            c = {
          disabled: !0,
          loading: !0,
          text: b(a)
        },
            d = this.option(c);
        d.className += " loading-results", this.$results.prepend(d);
      }, c.prototype.hideLoading = function () {
        this.$results.find(".loading-results").remove();
      }, c.prototype.option = function (c) {
        var d = document.createElement("li");
        d.className = "select2-results__option";
        var e = {
          role: "treeitem",
          "aria-selected": "false"
        };
        c.disabled && (delete e["aria-selected"], e["aria-disabled"] = "true"), null == c.id && delete e["aria-selected"], null != c._resultId && (d.id = c._resultId), c.title && (d.title = c.title), c.children && (e.role = "group", e["aria-label"] = c.text, delete e["aria-selected"]);

        for (var f in e) {
          var g = e[f];
          d.setAttribute(f, g);
        }

        if (c.children) {
          var h = a(d),
              i = document.createElement("strong");
          i.className = "select2-results__group";
          a(i);
          this.template(c, i);

          for (var j = [], k = 0; k < c.children.length; k++) {
            var l = c.children[k],
                m = this.option(l);
            j.push(m);
          }

          var n = a("<ul></ul>", {
            "class": "select2-results__options select2-results__options--nested"
          });
          n.append(j), h.append(i), h.append(n);
        } else this.template(c, d);

        return b.StoreData(d, "data", c), d;
      }, c.prototype.bind = function (c, d) {
        var e = this,
            f = c.id + "-results";
        this.$results.attr("id", f), c.on("results:all", function (a) {
          e.clear(), e.append(a.data), c.isOpen() && (e.setClasses(), e.highlightFirstItem());
        }), c.on("results:append", function (a) {
          e.append(a.data), c.isOpen() && e.setClasses();
        }), c.on("query", function (a) {
          e.hideMessages(), e.showLoading(a);
        }), c.on("select", function () {
          c.isOpen() && (e.setClasses(), e.highlightFirstItem());
        }), c.on("unselect", function () {
          c.isOpen() && (e.setClasses(), e.highlightFirstItem());
        }), c.on("open", function () {
          e.$results.attr("aria-expanded", "true"), e.$results.attr("aria-hidden", "false"), e.setClasses(), e.ensureHighlightVisible();
        }), c.on("close", function () {
          e.$results.attr("aria-expanded", "false"), e.$results.attr("aria-hidden", "true"), e.$results.removeAttr("aria-activedescendant");
        }), c.on("results:toggle", function () {
          var a = e.getHighlightedResults();
          0 !== a.length && a.trigger("mouseup");
        }), c.on("results:select", function () {
          var a = e.getHighlightedResults();

          if (0 !== a.length) {
            var c = b.GetData(a[0], "data");
            "true" == a.attr("aria-selected") ? e.trigger("close", {}) : e.trigger("select", {
              data: c
            });
          }
        }), c.on("results:previous", function () {
          var a = e.getHighlightedResults(),
              b = e.$results.find("[aria-selected]"),
              c = b.index(a);

          if (0 !== c) {
            var d = c - 1;
            0 === a.length && (d = 0);
            var f = b.eq(d);
            f.trigger("mouseenter");
            var g = e.$results.offset().top,
                h = f.offset().top,
                i = e.$results.scrollTop() + (h - g);
            0 === d ? e.$results.scrollTop(0) : h - g < 0 && e.$results.scrollTop(i);
          }
        }), c.on("results:next", function () {
          var a = e.getHighlightedResults(),
              b = e.$results.find("[aria-selected]"),
              c = b.index(a),
              d = c + 1;

          if (!(d >= b.length)) {
            var f = b.eq(d);
            f.trigger("mouseenter");
            var g = e.$results.offset().top + e.$results.outerHeight(!1),
                h = f.offset().top + f.outerHeight(!1),
                i = e.$results.scrollTop() + h - g;
            0 === d ? e.$results.scrollTop(0) : h > g && e.$results.scrollTop(i);
          }
        }), c.on("results:focus", function (a) {
          a.element.addClass("select2-results__option--highlighted");
        }), c.on("results:message", function (a) {
          e.displayMessage(a);
        }), a.fn.mousewheel && this.$results.on("mousewheel", function (a) {
          var b = e.$results.scrollTop(),
              c = e.$results.get(0).scrollHeight - b + a.deltaY,
              d = a.deltaY > 0 && b - a.deltaY <= 0,
              f = a.deltaY < 0 && c <= e.$results.height();
          d ? (e.$results.scrollTop(0), a.preventDefault(), a.stopPropagation()) : f && (e.$results.scrollTop(e.$results.get(0).scrollHeight - e.$results.height()), a.preventDefault(), a.stopPropagation());
        }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (c) {
          var d = a(this),
              f = b.GetData(this, "data");
          if ("true" === d.attr("aria-selected")) return void (e.options.get("multiple") ? e.trigger("unselect", {
            originalEvent: c,
            data: f
          }) : e.trigger("close", {}));
          e.trigger("select", {
            originalEvent: c,
            data: f
          });
        }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (c) {
          var d = b.GetData(this, "data");
          e.getHighlightedResults().removeClass("select2-results__option--highlighted"), e.trigger("results:focus", {
            data: d,
            element: a(this)
          });
        });
      }, c.prototype.getHighlightedResults = function () {
        return this.$results.find(".select2-results__option--highlighted");
      }, c.prototype.destroy = function () {
        this.$results.remove();
      }, c.prototype.ensureHighlightVisible = function () {
        var a = this.getHighlightedResults();

        if (0 !== a.length) {
          var b = this.$results.find("[aria-selected]"),
              c = b.index(a),
              d = this.$results.offset().top,
              e = a.offset().top,
              f = this.$results.scrollTop() + (e - d),
              g = e - d;
          f -= 2 * a.outerHeight(!1), c <= 2 ? this.$results.scrollTop(0) : (g > this.$results.outerHeight() || g < 0) && this.$results.scrollTop(f);
        }
      }, c.prototype.template = function (b, c) {
        var d = this.options.get("templateResult"),
            e = this.options.get("escapeMarkup"),
            f = d(b, c);
        null == f ? c.style.display = "none" : "string" == typeof f ? c.innerHTML = e(f) : a(c).append(f);
      }, c;
    }), b.define("select2/keys", [], function () {
      return {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
      };
    }), b.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (a, b, c) {
      function d(a, b) {
        this.$element = a, this.options = b, d.__super__.constructor.call(this);
      }

      return b.Extend(d, b.Observable), d.prototype.render = function () {
        var c = a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
        return this._tabindex = 0, null != b.GetData(this.$element[0], "old-tabindex") ? this._tabindex = b.GetData(this.$element[0], "old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), c.attr("title", this.$element.attr("title")), c.attr("tabindex", this._tabindex), this.$selection = c, c;
      }, d.prototype.bind = function (a, b) {
        var d = this,
            e = (a.id, a.id + "-results");
        this.container = a, this.$selection.on("focus", function (a) {
          d.trigger("focus", a);
        }), this.$selection.on("blur", function (a) {
          d._handleBlur(a);
        }), this.$selection.on("keydown", function (a) {
          d.trigger("keypress", a), a.which === c.SPACE && a.preventDefault();
        }), a.on("results:focus", function (a) {
          d.$selection.attr("aria-activedescendant", a.data._resultId);
        }), a.on("selection:update", function (a) {
          d.update(a.data);
        }), a.on("open", function () {
          d.$selection.attr("aria-expanded", "true"), d.$selection.attr("aria-owns", e), d._attachCloseHandler(a);
        }), a.on("close", function () {
          d.$selection.attr("aria-expanded", "false"), d.$selection.removeAttr("aria-activedescendant"), d.$selection.removeAttr("aria-owns"), d.$selection.focus(), d._detachCloseHandler(a);
        }), a.on("enable", function () {
          d.$selection.attr("tabindex", d._tabindex);
        }), a.on("disable", function () {
          d.$selection.attr("tabindex", "-1");
        });
      }, d.prototype._handleBlur = function (b) {
        var c = this;
        window.setTimeout(function () {
          document.activeElement == c.$selection[0] || a.contains(c.$selection[0], document.activeElement) || c.trigger("blur", b);
        }, 1);
      }, d.prototype._attachCloseHandler = function (c) {
        a(document.body).on("mousedown.select2." + c.id, function (c) {
          var d = a(c.target),
              e = d.closest(".select2");
          a(".select2.select2-container--open").each(function () {
            a(this), this != e[0] && b.GetData(this, "element").select2("close");
          });
        });
      }, d.prototype._detachCloseHandler = function (b) {
        a(document.body).off("mousedown.select2." + b.id);
      }, d.prototype.position = function (a, b) {
        b.find(".selection").append(a);
      }, d.prototype.destroy = function () {
        this._detachCloseHandler(this.container);
      }, d.prototype.update = function (a) {
        throw new Error("The `update` method must be defined in child classes.");
      }, d;
    }), b.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (a, b, c, d) {
      function e() {
        e.__super__.constructor.apply(this, arguments);
      }

      return c.Extend(e, b), e.prototype.render = function () {
        var a = e.__super__.render.call(this);

        return a.addClass("select2-selection--single"), a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), a;
      }, e.prototype.bind = function (a, b) {
        var c = this;

        e.__super__.bind.apply(this, arguments);

        var d = a.id + "-container";
        this.$selection.find(".select2-selection__rendered").attr("id", d).attr("role", "textbox").attr("aria-readonly", "true"), this.$selection.attr("aria-labelledby", d), this.$selection.on("mousedown", function (a) {
          1 === a.which && c.trigger("toggle", {
            originalEvent: a
          });
        }), this.$selection.on("focus", function (a) {}), this.$selection.on("blur", function (a) {}), a.on("focus", function (b) {
          a.isOpen() || c.$selection.focus();
        });
      }, e.prototype.clear = function () {
        var a = this.$selection.find(".select2-selection__rendered");
        a.empty(), a.removeAttr("title");
      }, e.prototype.display = function (a, b) {
        var c = this.options.get("templateSelection");
        return this.options.get("escapeMarkup")(c(a, b));
      }, e.prototype.selectionContainer = function () {
        return a("<span></span>");
      }, e.prototype.update = function (a) {
        if (0 === a.length) return void this.clear();
        var b = a[0],
            c = this.$selection.find(".select2-selection__rendered"),
            d = this.display(b, c);
        c.empty().append(d), c.attr("title", b.title || b.text);
      }, e;
    }), b.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (a, b, c) {
      function d(a, b) {
        d.__super__.constructor.apply(this, arguments);
      }

      return c.Extend(d, b), d.prototype.render = function () {
        var a = d.__super__.render.call(this);

        return a.addClass("select2-selection--multiple"), a.html('<ul class="select2-selection__rendered"></ul>'), a;
      }, d.prototype.bind = function (b, e) {
        var f = this;
        d.__super__.bind.apply(this, arguments), this.$selection.on("click", function (a) {
          f.trigger("toggle", {
            originalEvent: a
          });
        }), this.$selection.on("click", ".select2-selection__choice__remove", function (b) {
          if (!f.options.get("disabled")) {
            var d = a(this),
                e = d.parent(),
                g = c.GetData(e[0], "data");
            f.trigger("unselect", {
              originalEvent: b,
              data: g
            });
          }
        });
      }, d.prototype.clear = function () {
        var a = this.$selection.find(".select2-selection__rendered");
        a.empty(), a.removeAttr("title");
      }, d.prototype.display = function (a, b) {
        var c = this.options.get("templateSelection");
        return this.options.get("escapeMarkup")(c(a, b));
      }, d.prototype.selectionContainer = function () {
        return a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
      }, d.prototype.update = function (a) {
        if (this.clear(), 0 !== a.length) {
          for (var b = [], d = 0; d < a.length; d++) {
            var e = a[d],
                f = this.selectionContainer(),
                g = this.display(e, f);
            f.append(g), f.attr("title", e.title || e.text), c.StoreData(f[0], "data", e), b.push(f);
          }

          var h = this.$selection.find(".select2-selection__rendered");
          c.appendMany(h, b);
        }
      }, d;
    }), b.define("select2/selection/placeholder", ["../utils"], function (a) {
      function b(a, b, c) {
        this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c);
      }

      return b.prototype.normalizePlaceholder = function (a, b) {
        return "string" == typeof b && (b = {
          id: "",
          text: b
        }), b;
      }, b.prototype.createPlaceholder = function (a, b) {
        var c = this.selectionContainer();
        return c.html(this.display(b)), c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), c;
      }, b.prototype.update = function (a, b) {
        var c = 1 == b.length && b[0].id != this.placeholder.id;
        if (b.length > 1 || c) return a.call(this, b);
        this.clear();
        var d = this.createPlaceholder(this.placeholder);
        this.$selection.find(".select2-selection__rendered").append(d);
      }, b;
    }), b.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function (a, b, c) {
      function d() {}

      return d.prototype.bind = function (a, b, c) {
        var d = this;
        a.call(this, b, c), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function (a) {
          d._handleClear(a);
        }), b.on("keypress", function (a) {
          d._handleKeyboardClear(a, b);
        });
      }, d.prototype._handleClear = function (a, b) {
        if (!this.options.get("disabled")) {
          var d = this.$selection.find(".select2-selection__clear");

          if (0 !== d.length) {
            b.stopPropagation();
            var e = c.GetData(d[0], "data"),
                f = this.$element.val();
            this.$element.val(this.placeholder.id);
            var g = {
              data: e
            };
            if (this.trigger("clear", g), g.prevented) return void this.$element.val(f);

            for (var h = 0; h < e.length; h++) {
              if (g = {
                data: e[h]
              }, this.trigger("unselect", g), g.prevented) return void this.$element.val(f);
            }

            this.$element.trigger("change"), this.trigger("toggle", {});
          }
        }
      }, d.prototype._handleKeyboardClear = function (a, c, d) {
        d.isOpen() || c.which != b.DELETE && c.which != b.BACKSPACE || this._handleClear(c);
      }, d.prototype.update = function (b, d) {
        if (b.call(this, d), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === d.length)) {
          var e = a('<span class="select2-selection__clear">&times;</span>');
          c.StoreData(e[0], "data", d), this.$selection.find(".select2-selection__rendered").prepend(e);
        }
      }, d;
    }), b.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (a, b, c) {
      function d(a, b, c) {
        a.call(this, b, c);
      }

      return d.prototype.render = function (b) {
        var c = a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');
        this.$searchContainer = c, this.$search = c.find("input");
        var d = b.call(this);
        return this._transferTabIndex(), d;
      }, d.prototype.bind = function (a, d, e) {
        var f = this;
        a.call(this, d, e), d.on("open", function () {
          f.$search.trigger("focus");
        }), d.on("close", function () {
          f.$search.val(""), f.$search.removeAttr("aria-activedescendant"), f.$search.trigger("focus");
        }), d.on("enable", function () {
          f.$search.prop("disabled", !1), f._transferTabIndex();
        }), d.on("disable", function () {
          f.$search.prop("disabled", !0);
        }), d.on("focus", function (a) {
          f.$search.trigger("focus");
        }), d.on("results:focus", function (a) {
          f.$search.attr("aria-activedescendant", a.id);
        }), this.$selection.on("focusin", ".select2-search--inline", function (a) {
          f.trigger("focus", a);
        }), this.$selection.on("focusout", ".select2-search--inline", function (a) {
          f._handleBlur(a);
        }), this.$selection.on("keydown", ".select2-search--inline", function (a) {
          if (a.stopPropagation(), f.trigger("keypress", a), f._keyUpPrevented = a.isDefaultPrevented(), a.which === c.BACKSPACE && "" === f.$search.val()) {
            var d = f.$searchContainer.prev(".select2-selection__choice");

            if (d.length > 0) {
              var e = b.GetData(d[0], "data");
              f.searchRemoveChoice(e), a.preventDefault();
            }
          }
        });
        var g = document.documentMode,
            h = g && g <= 11;
        this.$selection.on("input.searchcheck", ".select2-search--inline", function (a) {
          if (h) return void f.$selection.off("input.search input.searchcheck");
          f.$selection.off("keyup.search");
        }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function (a) {
          if (h && "input" === a.type) return void f.$selection.off("input.search input.searchcheck");
          var b = a.which;
          b != c.SHIFT && b != c.CTRL && b != c.ALT && b != c.TAB && f.handleSearch(a);
        });
      }, d.prototype._transferTabIndex = function (a) {
        this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1");
      }, d.prototype.createPlaceholder = function (a, b) {
        this.$search.attr("placeholder", b.text);
      }, d.prototype.update = function (a, b) {
        var c = this.$search[0] == document.activeElement;
        this.$search.attr("placeholder", ""), a.call(this, b), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), c && this.$search.focus();
      }, d.prototype.handleSearch = function () {
        if (this.resizeSearch(), !this._keyUpPrevented) {
          var a = this.$search.val();
          this.trigger("query", {
            term: a
          });
        }

        this._keyUpPrevented = !1;
      }, d.prototype.searchRemoveChoice = function (a, b) {
        this.trigger("unselect", {
          data: b
        }), this.$search.val(b.text), this.handleSearch();
      }, d.prototype.resizeSearch = function () {
        this.$search.css("width", "25px");
        var a = "";
        if ("" !== this.$search.attr("placeholder")) a = this.$selection.find(".select2-selection__rendered").innerWidth();else {
          a = .75 * (this.$search.val().length + 1) + "em";
        }
        this.$search.css("width", a);
      }, d;
    }), b.define("select2/selection/eventRelay", ["jquery"], function (a) {
      function b() {}

      return b.prototype.bind = function (b, c, d) {
        var e = this,
            f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"],
            g = ["opening", "closing", "selecting", "unselecting", "clearing"];
        b.call(this, c, d), c.on("*", function (b, c) {
          if (-1 !== a.inArray(b, f)) {
            c = c || {};
            var d = a.Event("select2:" + b, {
              params: c
            });
            e.$element.trigger(d), -1 !== a.inArray(b, g) && (c.prevented = d.isDefaultPrevented());
          }
        });
      }, b;
    }), b.define("select2/translation", ["jquery", "require"], function (a, b) {
      function c(a) {
        this.dict = a || {};
      }

      return c.prototype.all = function () {
        return this.dict;
      }, c.prototype.get = function (a) {
        return this.dict[a];
      }, c.prototype.extend = function (b) {
        this.dict = a.extend({}, b.all(), this.dict);
      }, c._cache = {}, c.loadPath = function (a) {
        if (!(a in c._cache)) {
          var d = b(a);
          c._cache[a] = d;
        }

        return new c(c._cache[a]);
      }, c;
    }), b.define("select2/diacritics", [], function () {
      return {
        "â’¶": "A",
        "ï¼¡": "A",
        "Ã€": "A",
        "Ã": "A",
        "Ã‚": "A",
        "áº¦": "A",
        "áº¤": "A",
        "áºª": "A",
        "áº¨": "A",
        "Ãƒ": "A",
        "Ä€": "A",
        "Ä‚": "A",
        "áº°": "A",
        "áº®": "A",
        "áº´": "A",
        "áº²": "A",
        "È¦": "A",
        "Ç ": "A",
        "Ã„": "A",
        "Çž": "A",
        "áº¢": "A",
        "Ã…": "A",
        "Çº": "A",
        "Ç": "A",
        "È€": "A",
        "È‚": "A",
        "áº ": "A",
        "áº¬": "A",
        "áº¶": "A",
        "á¸€": "A",
        "Ä„": "A",
        "Èº": "A",
        "â±¯": "A",
        "êœ²": "AA",
        "Ã†": "AE",
        "Ç¼": "AE",
        "Ç¢": "AE",
        "êœ´": "AO",
        "êœ¶": "AU",
        "êœ¸": "AV",
        "êœº": "AV",
        "êœ¼": "AY",
        "â’·": "B",
        "ï¼¢": "B",
        "á¸‚": "B",
        "á¸„": "B",
        "á¸†": "B",
        "Éƒ": "B",
        "Æ‚": "B",
        "Æ": "B",
        "â’¸": "C",
        "ï¼£": "C",
        "Ä†": "C",
        "Äˆ": "C",
        "ÄŠ": "C",
        "ÄŒ": "C",
        "Ã‡": "C",
        "á¸ˆ": "C",
        "Æ‡": "C",
        "È»": "C",
        "êœ¾": "C",
        "â’¹": "D",
        "ï¼¤": "D",
        "á¸Š": "D",
        "ÄŽ": "D",
        "á¸Œ": "D",
        "á¸": "D",
        "á¸’": "D",
        "á¸Ž": "D",
        "Ä": "D",
        "Æ‹": "D",
        "ÆŠ": "D",
        "Æ‰": "D",
        "ê¹": "D",
        "Ç±": "DZ",
        "Ç„": "DZ",
        "Ç²": "Dz",
        "Ç…": "Dz",
        "â’º": "E",
        "ï¼¥": "E",
        "Ãˆ": "E",
        "Ã‰": "E",
        "ÃŠ": "E",
        "á»€": "E",
        "áº¾": "E",
        "á»„": "E",
        "á»‚": "E",
        "áº¼": "E",
        "Ä’": "E",
        "á¸”": "E",
        "á¸–": "E",
        "Ä”": "E",
        "Ä–": "E",
        "Ã‹": "E",
        "áºº": "E",
        "Äš": "E",
        "È„": "E",
        "È†": "E",
        "áº¸": "E",
        "á»†": "E",
        "È¨": "E",
        "á¸œ": "E",
        "Ä˜": "E",
        "á¸˜": "E",
        "á¸š": "E",
        "Æ": "E",
        "ÆŽ": "E",
        "â’»": "F",
        "ï¼¦": "F",
        "á¸ž": "F",
        "Æ‘": "F",
        "ê»": "F",
        "â’¼": "G",
        "ï¼§": "G",
        "Ç´": "G",
        "Äœ": "G",
        "á¸ ": "G",
        "Äž": "G",
        "Ä ": "G",
        "Ç¦": "G",
        "Ä¢": "G",
        "Ç¤": "G",
        "Æ“": "G",
        "êž ": "G",
        "ê½": "G",
        "ê¾": "G",
        "â’½": "H",
        "ï¼¨": "H",
        "Ä¤": "H",
        "á¸¢": "H",
        "á¸¦": "H",
        "Èž": "H",
        "á¸¤": "H",
        "á¸¨": "H",
        "á¸ª": "H",
        "Ä¦": "H",
        "â±§": "H",
        "â±µ": "H",
        "êž": "H",
        "â’¾": "I",
        "ï¼©": "I",
        "ÃŒ": "I",
        "Ã": "I",
        "ÃŽ": "I",
        "Ä¨": "I",
        "Äª": "I",
        "Ä¬": "I",
        "Ä°": "I",
        "Ã": "I",
        "á¸®": "I",
        "á»ˆ": "I",
        "Ç": "I",
        "Èˆ": "I",
        "ÈŠ": "I",
        "á»Š": "I",
        "Ä®": "I",
        "á¸¬": "I",
        "Æ—": "I",
        "â’¿": "J",
        "ï¼ª": "J",
        "Ä´": "J",
        "Éˆ": "J",
        "â“€": "K",
        "ï¼«": "K",
        "á¸°": "K",
        "Ç¨": "K",
        "á¸²": "K",
        "Ä¶": "K",
        "á¸´": "K",
        "Æ˜": "K",
        "â±©": "K",
        "ê€": "K",
        "ê‚": "K",
        "ê„": "K",
        "êž¢": "K",
        "â“": "L",
        "ï¼¬": "L",
        "Ä¿": "L",
        "Ä¹": "L",
        "Ä½": "L",
        "á¸¶": "L",
        "á¸¸": "L",
        "Ä»": "L",
        "á¸¼": "L",
        "á¸º": "L",
        "Å": "L",
        "È½": "L",
        "â±¢": "L",
        "â± ": "L",
        "êˆ": "L",
        "ê†": "L",
        "êž€": "L",
        "Ç‡": "LJ",
        "Çˆ": "Lj",
        "â“‚": "M",
        "ï¼­": "M",
        "á¸¾": "M",
        "á¹€": "M",
        "á¹‚": "M",
        "â±®": "M",
        "Æœ": "M",
        "â“ƒ": "N",
        "ï¼®": "N",
        "Ç¸": "N",
        "Åƒ": "N",
        "Ã‘": "N",
        "á¹„": "N",
        "Å‡": "N",
        "á¹†": "N",
        "Å…": "N",
        "á¹Š": "N",
        "á¹ˆ": "N",
        "È ": "N",
        "Æ": "N",
        "êž": "N",
        "êž¤": "N",
        "ÇŠ": "NJ",
        "Ç‹": "Nj",
        "â“„": "O",
        "ï¼¯": "O",
        "Ã’": "O",
        "Ã“": "O",
        "Ã”": "O",
        "á»’": "O",
        "á»": "O",
        "á»–": "O",
        "á»”": "O",
        "Ã•": "O",
        "á¹Œ": "O",
        "È¬": "O",
        "á¹Ž": "O",
        "ÅŒ": "O",
        "á¹": "O",
        "á¹’": "O",
        "ÅŽ": "O",
        "È®": "O",
        "È°": "O",
        "Ã–": "O",
        "Èª": "O",
        "á»Ž": "O",
        "Å": "O",
        "Ç‘": "O",
        "ÈŒ": "O",
        "ÈŽ": "O",
        "Æ ": "O",
        "á»œ": "O",
        "á»š": "O",
        "á» ": "O",
        "á»ž": "O",
        "á»¢": "O",
        "á»Œ": "O",
        "á»˜": "O",
        "Çª": "O",
        "Ç¬": "O",
        "Ã˜": "O",
        "Ç¾": "O",
        "Æ†": "O",
        "ÆŸ": "O",
        "êŠ": "O",
        "êŒ": "O",
        "Æ¢": "OI",
        "êŽ": "OO",
        "È¢": "OU",
        "â“…": "P",
        "ï¼°": "P",
        "á¹”": "P",
        "á¹–": "P",
        "Æ¤": "P",
        "â±£": "P",
        "ê": "P",
        "ê’": "P",
        "ê”": "P",
        "â“†": "Q",
        "ï¼±": "Q",
        "ê–": "Q",
        "ê˜": "Q",
        "ÉŠ": "Q",
        "â“‡": "R",
        "ï¼²": "R",
        "Å”": "R",
        "á¹˜": "R",
        "Å˜": "R",
        "È": "R",
        "È’": "R",
        "á¹š": "R",
        "á¹œ": "R",
        "Å–": "R",
        "á¹ž": "R",
        "ÉŒ": "R",
        "â±¤": "R",
        "êš": "R",
        "êž¦": "R",
        "êž‚": "R",
        "â“ˆ": "S",
        "ï¼³": "S",
        "áºž": "S",
        "Åš": "S",
        "á¹¤": "S",
        "Åœ": "S",
        "á¹ ": "S",
        "Å ": "S",
        "á¹¦": "S",
        "á¹¢": "S",
        "á¹¨": "S",
        "È˜": "S",
        "Åž": "S",
        "â±¾": "S",
        "êž¨": "S",
        "êž„": "S",
        "â“‰": "T",
        "ï¼´": "T",
        "á¹ª": "T",
        "Å¤": "T",
        "á¹¬": "T",
        "Èš": "T",
        "Å¢": "T",
        "á¹°": "T",
        "á¹®": "T",
        "Å¦": "T",
        "Æ¬": "T",
        "Æ®": "T",
        "È¾": "T",
        "êž†": "T",
        "êœ¨": "TZ",
        "â“Š": "U",
        "ï¼µ": "U",
        "Ã™": "U",
        "Ãš": "U",
        "Ã›": "U",
        "Å¨": "U",
        "á¹¸": "U",
        "Åª": "U",
        "á¹º": "U",
        "Å¬": "U",
        "Ãœ": "U",
        "Ç›": "U",
        "Ç—": "U",
        "Ç•": "U",
        "Ç™": "U",
        "á»¦": "U",
        "Å®": "U",
        "Å°": "U",
        "Ç“": "U",
        "È”": "U",
        "È–": "U",
        "Æ¯": "U",
        "á»ª": "U",
        "á»¨": "U",
        "á»®": "U",
        "á»¬": "U",
        "á»°": "U",
        "á»¤": "U",
        "á¹²": "U",
        "Å²": "U",
        "á¹¶": "U",
        "á¹´": "U",
        "É„": "U",
        "â“‹": "V",
        "ï¼¶": "V",
        "á¹¼": "V",
        "á¹¾": "V",
        "Æ²": "V",
        "êž": "V",
        "É…": "V",
        "ê ": "VY",
        "â“Œ": "W",
        "ï¼·": "W",
        "áº€": "W",
        "áº‚": "W",
        "Å´": "W",
        "áº†": "W",
        "áº„": "W",
        "áºˆ": "W",
        "â±²": "W",
        "â“": "X",
        "ï¼¸": "X",
        "áºŠ": "X",
        "áºŒ": "X",
        "â“Ž": "Y",
        "ï¼¹": "Y",
        "á»²": "Y",
        "Ã": "Y",
        "Å¶": "Y",
        "á»¸": "Y",
        "È²": "Y",
        "áºŽ": "Y",
        "Å¸": "Y",
        "á»¶": "Y",
        "á»´": "Y",
        "Æ³": "Y",
        "ÉŽ": "Y",
        "á»¾": "Y",
        "â“": "Z",
        "ï¼º": "Z",
        "Å¹": "Z",
        "áº": "Z",
        "Å»": "Z",
        "Å½": "Z",
        "áº’": "Z",
        "áº”": "Z",
        "Æµ": "Z",
        "È¤": "Z",
        "â±¿": "Z",
        "â±«": "Z",
        "ê¢": "Z",
        "â“": "a",
        "ï½": "a",
        "áºš": "a",
        "Ã ": "a",
        "Ã¡": "a",
        "Ã¢": "a",
        "áº§": "a",
        "áº¥": "a",
        "áº«": "a",
        "áº©": "a",
        "Ã£": "a",
        "Ä": "a",
        "Äƒ": "a",
        "áº±": "a",
        "áº¯": "a",
        "áºµ": "a",
        "áº³": "a",
        "È§": "a",
        "Ç¡": "a",
        "Ã¤": "a",
        "ÇŸ": "a",
        "áº£": "a",
        "Ã¥": "a",
        "Ç»": "a",
        "ÇŽ": "a",
        "È": "a",
        "Èƒ": "a",
        "áº¡": "a",
        "áº­": "a",
        "áº·": "a",
        "á¸": "a",
        "Ä…": "a",
        "â±¥": "a",
        "É": "a",
        "êœ³": "aa",
        "Ã¦": "ae",
        "Ç½": "ae",
        "Ç£": "ae",
        "êœµ": "ao",
        "êœ·": "au",
        "êœ¹": "av",
        "êœ»": "av",
        "êœ½": "ay",
        "â“‘": "b",
        "ï½‚": "b",
        "á¸ƒ": "b",
        "á¸…": "b",
        "á¸‡": "b",
        "Æ€": "b",
        "Æƒ": "b",
        "É“": "b",
        "â“’": "c",
        "ï½ƒ": "c",
        "Ä‡": "c",
        "Ä‰": "c",
        "Ä‹": "c",
        "Ä": "c",
        "Ã§": "c",
        "á¸‰": "c",
        "Æˆ": "c",
        "È¼": "c",
        "êœ¿": "c",
        "â†„": "c",
        "â““": "d",
        "ï½„": "d",
        "á¸‹": "d",
        "Ä": "d",
        "á¸": "d",
        "á¸‘": "d",
        "á¸“": "d",
        "á¸": "d",
        "Ä‘": "d",
        "ÆŒ": "d",
        "É–": "d",
        "É—": "d",
        "êº": "d",
        "Ç³": "dz",
        "Ç†": "dz",
        "â“”": "e",
        "ï½…": "e",
        "Ã¨": "e",
        "Ã©": "e",
        "Ãª": "e",
        "á»": "e",
        "áº¿": "e",
        "á»…": "e",
        "á»ƒ": "e",
        "áº½": "e",
        "Ä“": "e",
        "á¸•": "e",
        "á¸—": "e",
        "Ä•": "e",
        "Ä—": "e",
        "Ã«": "e",
        "áº»": "e",
        "Ä›": "e",
        "È…": "e",
        "È‡": "e",
        "áº¹": "e",
        "á»‡": "e",
        "È©": "e",
        "á¸": "e",
        "Ä™": "e",
        "á¸™": "e",
        "á¸›": "e",
        "É‡": "e",
        "É›": "e",
        "Ç": "e",
        "â“•": "f",
        "ï½†": "f",
        "á¸Ÿ": "f",
        "Æ’": "f",
        "ê¼": "f",
        "â“–": "g",
        "ï½‡": "g",
        "Çµ": "g",
        "Ä": "g",
        "á¸¡": "g",
        "ÄŸ": "g",
        "Ä¡": "g",
        "Ç§": "g",
        "Ä£": "g",
        "Ç¥": "g",
        "É ": "g",
        "êž¡": "g",
        "áµ¹": "g",
        "ê¿": "g",
        "â“—": "h",
        "ï½ˆ": "h",
        "Ä¥": "h",
        "á¸£": "h",
        "á¸§": "h",
        "ÈŸ": "h",
        "á¸¥": "h",
        "á¸©": "h",
        "á¸«": "h",
        "áº–": "h",
        "Ä§": "h",
        "â±¨": "h",
        "â±¶": "h",
        "É¥": "h",
        "Æ•": "hv",
        "â“˜": "i",
        "ï½‰": "i",
        "Ã¬": "i",
        "Ã­": "i",
        "Ã®": "i",
        "Ä©": "i",
        "Ä«": "i",
        "Ä­": "i",
        "Ã¯": "i",
        "á¸¯": "i",
        "á»‰": "i",
        "Ç": "i",
        "È‰": "i",
        "È‹": "i",
        "á»‹": "i",
        "Ä¯": "i",
        "á¸­": "i",
        "É¨": "i",
        "Ä±": "i",
        "â“™": "j",
        "ï½Š": "j",
        "Äµ": "j",
        "Ç°": "j",
        "É‰": "j",
        "â“š": "k",
        "ï½‹": "k",
        "á¸±": "k",
        "Ç©": "k",
        "á¸³": "k",
        "Ä·": "k",
        "á¸µ": "k",
        "Æ™": "k",
        "â±ª": "k",
        "ê": "k",
        "êƒ": "k",
        "ê…": "k",
        "êž£": "k",
        "â“›": "l",
        "ï½Œ": "l",
        "Å€": "l",
        "Äº": "l",
        "Ä¾": "l",
        "á¸·": "l",
        "á¸¹": "l",
        "Ä¼": "l",
        "á¸½": "l",
        "á¸»": "l",
        "Å¿": "l",
        "Å‚": "l",
        "Æš": "l",
        "É«": "l",
        "â±¡": "l",
        "ê‰": "l",
        "êž": "l",
        "ê‡": "l",
        "Ç‰": "lj",
        "â“œ": "m",
        "ï½": "m",
        "á¸¿": "m",
        "á¹": "m",
        "á¹ƒ": "m",
        "É±": "m",
        "É¯": "m",
        "â“": "n",
        "ï½Ž": "n",
        "Ç¹": "n",
        "Å„": "n",
        "Ã±": "n",
        "á¹…": "n",
        "Åˆ": "n",
        "á¹‡": "n",
        "Å†": "n",
        "á¹‹": "n",
        "á¹‰": "n",
        "Æž": "n",
        "É²": "n",
        "Å‰": "n",
        "êž‘": "n",
        "êž¥": "n",
        "ÇŒ": "nj",
        "â“ž": "o",
        "ï½": "o",
        "Ã²": "o",
        "Ã³": "o",
        "Ã´": "o",
        "á»“": "o",
        "á»‘": "o",
        "á»—": "o",
        "á»•": "o",
        "Ãµ": "o",
        "á¹": "o",
        "È­": "o",
        "á¹": "o",
        "Å": "o",
        "á¹‘": "o",
        "á¹“": "o",
        "Å": "o",
        "È¯": "o",
        "È±": "o",
        "Ã¶": "o",
        "È«": "o",
        "á»": "o",
        "Å‘": "o",
        "Ç’": "o",
        "È": "o",
        "È": "o",
        "Æ¡": "o",
        "á»": "o",
        "á»›": "o",
        "á»¡": "o",
        "á»Ÿ": "o",
        "á»£": "o",
        "á»": "o",
        "á»™": "o",
        "Ç«": "o",
        "Ç­": "o",
        "Ã¸": "o",
        "Ç¿": "o",
        "É”": "o",
        "ê‹": "o",
        "ê": "o",
        "Éµ": "o",
        "Æ£": "oi",
        "È£": "ou",
        "ê": "oo",
        "â“Ÿ": "p",
        "ï½": "p",
        "á¹•": "p",
        "á¹—": "p",
        "Æ¥": "p",
        "áµ½": "p",
        "ê‘": "p",
        "ê“": "p",
        "ê•": "p",
        "â“ ": "q",
        "ï½‘": "q",
        "É‹": "q",
        "ê—": "q",
        "ê™": "q",
        "â“¡": "r",
        "ï½’": "r",
        "Å•": "r",
        "á¹™": "r",
        "Å™": "r",
        "È‘": "r",
        "È“": "r",
        "á¹›": "r",
        "á¹": "r",
        "Å—": "r",
        "á¹Ÿ": "r",
        "É": "r",
        "É½": "r",
        "ê›": "r",
        "êž§": "r",
        "êžƒ": "r",
        "â“¢": "s",
        "ï½“": "s",
        "ÃŸ": "s",
        "Å›": "s",
        "á¹¥": "s",
        "Å": "s",
        "á¹¡": "s",
        "Å¡": "s",
        "á¹§": "s",
        "á¹£": "s",
        "á¹©": "s",
        "È™": "s",
        "ÅŸ": "s",
        "È¿": "s",
        "êž©": "s",
        "êž…": "s",
        "áº›": "s",
        "â“£": "t",
        "ï½”": "t",
        "á¹«": "t",
        "áº—": "t",
        "Å¥": "t",
        "á¹­": "t",
        "È›": "t",
        "Å£": "t",
        "á¹±": "t",
        "á¹¯": "t",
        "Å§": "t",
        "Æ­": "t",
        "Êˆ": "t",
        "â±¦": "t",
        "êž‡": "t",
        "êœ©": "tz",
        "â“¤": "u",
        "ï½•": "u",
        "Ã¹": "u",
        "Ãº": "u",
        "Ã»": "u",
        "Å©": "u",
        "á¹¹": "u",
        "Å«": "u",
        "á¹»": "u",
        "Å­": "u",
        "Ã¼": "u",
        "Çœ": "u",
        "Ç˜": "u",
        "Ç–": "u",
        "Çš": "u",
        "á»§": "u",
        "Å¯": "u",
        "Å±": "u",
        "Ç”": "u",
        "È•": "u",
        "È—": "u",
        "Æ°": "u",
        "á»«": "u",
        "á»©": "u",
        "á»¯": "u",
        "á»­": "u",
        "á»±": "u",
        "á»¥": "u",
        "á¹³": "u",
        "Å³": "u",
        "á¹·": "u",
        "á¹µ": "u",
        "Ê‰": "u",
        "â“¥": "v",
        "ï½–": "v",
        "á¹½": "v",
        "á¹¿": "v",
        "Ê‹": "v",
        "êŸ": "v",
        "ÊŒ": "v",
        "ê¡": "vy",
        "â“¦": "w",
        "ï½—": "w",
        "áº": "w",
        "áºƒ": "w",
        "Åµ": "w",
        "áº‡": "w",
        "áº…": "w",
        "áº˜": "w",
        "áº‰": "w",
        "â±³": "w",
        "â“§": "x",
        "ï½˜": "x",
        "áº‹": "x",
        "áº": "x",
        "â“¨": "y",
        "ï½™": "y",
        "á»³": "y",
        "Ã½": "y",
        "Å·": "y",
        "á»¹": "y",
        "È³": "y",
        "áº": "y",
        "Ã¿": "y",
        "á»·": "y",
        "áº™": "y",
        "á»µ": "y",
        "Æ´": "y",
        "É": "y",
        "á»¿": "y",
        "â“©": "z",
        "ï½š": "z",
        "Åº": "z",
        "áº‘": "z",
        "Å¼": "z",
        "Å¾": "z",
        "áº“": "z",
        "áº•": "z",
        "Æ¶": "z",
        "È¥": "z",
        "É€": "z",
        "â±¬": "z",
        "ê£": "z",
        "Î†": "Î‘",
        "Îˆ": "Î•",
        "Î‰": "Î—",
        "ÎŠ": "Î™",
        "Îª": "Î™",
        "ÎŒ": "ÎŸ",
        "ÎŽ": "Î¥",
        "Î«": "Î¥",
        "Î": "Î©",
        "Î¬": "Î±",
        "Î­": "Îµ",
        "Î®": "Î·",
        "Î¯": "Î¹",
        "ÏŠ": "Î¹",
        "Î": "Î¹",
        "ÏŒ": "Î¿",
        "Ï": "Ï…",
        "Ï‹": "Ï…",
        "Î°": "Ï…",
        "Ï‰": "Ï‰",
        "Ï‚": "Ïƒ"
      };
    }), b.define("select2/data/base", ["../utils"], function (a) {
      function b(a, c) {
        b.__super__.constructor.call(this);
      }

      return a.Extend(b, a.Observable), b.prototype.current = function (a) {
        throw new Error("The `current` method must be defined in child classes.");
      }, b.prototype.query = function (a, b) {
        throw new Error("The `query` method must be defined in child classes.");
      }, b.prototype.bind = function (a, b) {}, b.prototype.destroy = function () {}, b.prototype.generateResultId = function (b, c) {
        var d = b.id + "-result-";
        return d += a.generateChars(4), null != c.id ? d += "-" + c.id.toString() : d += "-" + a.generateChars(4), d;
      }, b;
    }), b.define("select2/data/select", ["./base", "../utils", "jquery"], function (a, b, c) {
      function d(a, b) {
        this.$element = a, this.options = b, d.__super__.constructor.call(this);
      }

      return b.Extend(d, a), d.prototype.current = function (a) {
        var b = [],
            d = this;
        this.$element.find(":selected").each(function () {
          var a = c(this),
              e = d.item(a);
          b.push(e);
        }), a(b);
      }, d.prototype.select = function (a) {
        var b = this;
        if (a.selected = !0, c(a.element).is("option")) return a.element.selected = !0, void this.$element.trigger("change");
        if (this.$element.prop("multiple")) this.current(function (d) {
          var e = [];
          a = [a], a.push.apply(a, d);

          for (var f = 0; f < a.length; f++) {
            var g = a[f].id;
            -1 === c.inArray(g, e) && e.push(g);
          }

          b.$element.val(e), b.$element.trigger("change");
        });else {
          var d = a.id;
          this.$element.val(d), this.$element.trigger("change");
        }
      }, d.prototype.unselect = function (a) {
        var b = this;

        if (this.$element.prop("multiple")) {
          if (a.selected = !1, c(a.element).is("option")) return a.element.selected = !1, void this.$element.trigger("change");
          this.current(function (d) {
            for (var e = [], f = 0; f < d.length; f++) {
              var g = d[f].id;
              g !== a.id && -1 === c.inArray(g, e) && e.push(g);
            }

            b.$element.val(e), b.$element.trigger("change");
          });
        }
      }, d.prototype.bind = function (a, b) {
        var c = this;
        this.container = a, a.on("select", function (a) {
          c.select(a.data);
        }), a.on("unselect", function (a) {
          c.unselect(a.data);
        });
      }, d.prototype.destroy = function () {
        this.$element.find("*").each(function () {
          b.RemoveData(this);
        });
      }, d.prototype.query = function (a, b) {
        var d = [],
            e = this;
        this.$element.children().each(function () {
          var b = c(this);

          if (b.is("option") || b.is("optgroup")) {
            var f = e.item(b),
                g = e.matches(a, f);
            null !== g && d.push(g);
          }
        }), b({
          results: d
        });
      }, d.prototype.addOptions = function (a) {
        b.appendMany(this.$element, a);
      }, d.prototype.option = function (a) {
        var d;
        a.children ? (d = document.createElement("optgroup"), d.label = a.text) : (d = document.createElement("option"), void 0 !== d.textContent ? d.textContent = a.text : d.innerText = a.text), void 0 !== a.id && (d.value = a.id), a.disabled && (d.disabled = !0), a.selected && (d.selected = !0), a.title && (d.title = a.title);

        var e = c(d),
            f = this._normalizeItem(a);

        return f.element = d, b.StoreData(d, "data", f), e;
      }, d.prototype.item = function (a) {
        var d = {};
        if (null != (d = b.GetData(a[0], "data"))) return d;
        if (a.is("option")) d = {
          id: a.val(),
          text: a.text(),
          disabled: a.prop("disabled"),
          selected: a.prop("selected"),
          title: a.prop("title")
        };else if (a.is("optgroup")) {
          d = {
            text: a.prop("label"),
            children: [],
            title: a.prop("title")
          };

          for (var e = a.children("option"), f = [], g = 0; g < e.length; g++) {
            var h = c(e[g]),
                i = this.item(h);
            f.push(i);
          }

          d.children = f;
        }
        return d = this._normalizeItem(d), d.element = a[0], b.StoreData(a[0], "data", d), d;
      }, d.prototype._normalizeItem = function (a) {
        a !== Object(a) && (a = {
          id: a,
          text: a
        }), a = c.extend({}, {
          text: ""
        }, a);
        var b = {
          selected: !1,
          disabled: !1
        };
        return null != a.id && (a.id = a.id.toString()), null != a.text && (a.text = a.text.toString()), null == a._resultId && a.id && null != this.container && (a._resultId = this.generateResultId(this.container, a)), c.extend({}, b, a);
      }, d.prototype.matches = function (a, b) {
        return this.options.get("matcher")(a, b);
      }, d;
    }), b.define("select2/data/array", ["./select", "../utils", "jquery"], function (a, b, c) {
      function d(a, b) {
        var c = b.get("data") || [];
        d.__super__.constructor.call(this, a, b), this.addOptions(this.convertToOptions(c));
      }

      return b.Extend(d, a), d.prototype.select = function (a) {
        var b = this.$element.find("option").filter(function (b, c) {
          return c.value == a.id.toString();
        });
        0 === b.length && (b = this.option(a), this.addOptions(b)), d.__super__.select.call(this, a);
      }, d.prototype.convertToOptions = function (a) {
        function d(a) {
          return function () {
            return c(this).val() == a.id;
          };
        }

        for (var e = this, f = this.$element.find("option"), g = f.map(function () {
          return e.item(c(this)).id;
        }).get(), h = [], i = 0; i < a.length; i++) {
          var j = this._normalizeItem(a[i]);

          if (c.inArray(j.id, g) >= 0) {
            var k = f.filter(d(j)),
                l = this.item(k),
                m = c.extend(!0, {}, j, l),
                n = this.option(m);
            k.replaceWith(n);
          } else {
            var o = this.option(j);

            if (j.children) {
              var p = this.convertToOptions(j.children);
              b.appendMany(o, p);
            }

            h.push(o);
          }
        }

        return h;
      }, d;
    }), b.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (a, b, c) {
      function d(a, b) {
        this.ajaxOptions = this._applyDefaults(b.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), d.__super__.constructor.call(this, a, b);
      }

      return b.Extend(d, a), d.prototype._applyDefaults = function (a) {
        var b = {
          data: function data(a) {
            return c.extend({}, a, {
              q: a.term
            });
          },
          transport: function transport(a, b, d) {
            var e = c.ajax(a);
            return e.then(b), e.fail(d), e;
          }
        };
        return c.extend({}, b, a, !0);
      }, d.prototype.processResults = function (a) {
        return a;
      }, d.prototype.query = function (a, b) {
        function d() {
          var d = f.transport(f, function (d) {
            var f = e.processResults(d, a);
            e.options.get("debug") && window.console && console.error && (f && f.results && c.isArray(f.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), b(f);
          }, function () {
            "status" in d && (0 === d.status || "0" === d.status) || e.trigger("results:message", {
              message: "errorLoading"
            });
          });
          e._request = d;
        }

        var e = this;
        null != this._request && (c.isFunction(this._request.abort) && this._request.abort(), this._request = null);
        var f = c.extend({
          type: "GET"
        }, this.ajaxOptions);
        "function" == typeof f.url && (f.url = f.url.call(this.$element, a)), "function" == typeof f.data && (f.data = f.data.call(this.$element, a)), this.ajaxOptions.delay && null != a.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(d, this.ajaxOptions.delay)) : d();
      }, d;
    }), b.define("select2/data/tags", ["jquery"], function (a) {
      function b(b, c, d) {
        var e = d.get("tags"),
            f = d.get("createTag");
        void 0 !== f && (this.createTag = f);
        var g = d.get("insertTag");
        if (void 0 !== g && (this.insertTag = g), b.call(this, c, d), a.isArray(e)) for (var h = 0; h < e.length; h++) {
          var i = e[h],
              j = this._normalizeItem(i),
              k = this.option(j);

          this.$element.append(k);
        }
      }

      return b.prototype.query = function (a, b, c) {
        function d(a, f) {
          for (var g = a.results, h = 0; h < g.length; h++) {
            var i = g[h],
                j = null != i.children && !d({
              results: i.children
            }, !0);
            if ((i.text || "").toUpperCase() === (b.term || "").toUpperCase() || j) return !f && (a.data = g, void c(a));
          }

          if (f) return !0;
          var k = e.createTag(b);

          if (null != k) {
            var l = e.option(k);
            l.attr("data-select2-tag", !0), e.addOptions([l]), e.insertTag(g, k);
          }

          a.results = g, c(a);
        }

        var e = this;
        if (this._removeOldTags(), null == b.term || null != b.page) return void a.call(this, b, c);
        a.call(this, b, d);
      }, b.prototype.createTag = function (b, c) {
        var d = a.trim(c.term);
        return "" === d ? null : {
          id: d,
          text: d
        };
      }, b.prototype.insertTag = function (a, b, c) {
        b.unshift(c);
      }, b.prototype._removeOldTags = function (b) {
        this._lastTag;
        this.$element.find("option[data-select2-tag]").each(function () {
          this.selected || a(this).remove();
        });
      }, b;
    }), b.define("select2/data/tokenizer", ["jquery"], function (a) {
      function b(a, b, c) {
        var d = c.get("tokenizer");
        void 0 !== d && (this.tokenizer = d), a.call(this, b, c);
      }

      return b.prototype.bind = function (a, b, c) {
        a.call(this, b, c), this.$search = b.dropdown.$search || b.selection.$search || c.find(".select2-search__field");
      }, b.prototype.query = function (b, c, d) {
        function e(b) {
          var c = g._normalizeItem(b);

          if (!g.$element.find("option").filter(function () {
            return a(this).val() === c.id;
          }).length) {
            var d = g.option(c);
            d.attr("data-select2-tag", !0), g._removeOldTags(), g.addOptions([d]);
          }

          f(c);
        }

        function f(a) {
          g.trigger("select", {
            data: a
          });
        }

        var g = this;
        c.term = c.term || "";
        var h = this.tokenizer(c, this.options, e);
        h.term !== c.term && (this.$search.length && (this.$search.val(h.term), this.$search.focus()), c.term = h.term), b.call(this, c, d);
      }, b.prototype.tokenizer = function (b, c, d, e) {
        for (var f = d.get("tokenSeparators") || [], g = c.term, h = 0, i = this.createTag || function (a) {
          return {
            id: a.term,
            text: a.term
          };
        }; h < g.length;) {
          var j = g[h];

          if (-1 !== a.inArray(j, f)) {
            var k = g.substr(0, h),
                l = a.extend({}, c, {
              term: k
            }),
                m = i(l);
            null != m ? (e(m), g = g.substr(h + 1) || "", h = 0) : h++;
          } else h++;
        }

        return {
          term: g
        };
      }, b;
    }), b.define("select2/data/minimumInputLength", [], function () {
      function a(a, b, c) {
        this.minimumInputLength = c.get("minimumInputLength"), a.call(this, b, c);
      }

      return a.prototype.query = function (a, b, c) {
        if (b.term = b.term || "", b.term.length < this.minimumInputLength) return void this.trigger("results:message", {
          message: "inputTooShort",
          args: {
            minimum: this.minimumInputLength,
            input: b.term,
            params: b
          }
        });
        a.call(this, b, c);
      }, a;
    }), b.define("select2/data/maximumInputLength", [], function () {
      function a(a, b, c) {
        this.maximumInputLength = c.get("maximumInputLength"), a.call(this, b, c);
      }

      return a.prototype.query = function (a, b, c) {
        if (b.term = b.term || "", this.maximumInputLength > 0 && b.term.length > this.maximumInputLength) return void this.trigger("results:message", {
          message: "inputTooLong",
          args: {
            maximum: this.maximumInputLength,
            input: b.term,
            params: b
          }
        });
        a.call(this, b, c);
      }, a;
    }), b.define("select2/data/maximumSelectionLength", [], function () {
      function a(a, b, c) {
        this.maximumSelectionLength = c.get("maximumSelectionLength"), a.call(this, b, c);
      }

      return a.prototype.query = function (a, b, c) {
        var d = this;
        this.current(function (e) {
          var f = null != e ? e.length : 0;
          if (d.maximumSelectionLength > 0 && f >= d.maximumSelectionLength) return void d.trigger("results:message", {
            message: "maximumSelected",
            args: {
              maximum: d.maximumSelectionLength
            }
          });
          a.call(d, b, c);
        });
      }, a;
    }), b.define("select2/dropdown", ["jquery", "./utils"], function (a, b) {
      function c(a, b) {
        this.$element = a, this.options = b, c.__super__.constructor.call(this);
      }

      return b.Extend(c, b.Observable), c.prototype.render = function () {
        var b = a('<span class="select2-dropdown"><span class="select2-results"></span></span>');
        return b.attr("dir", this.options.get("dir")), this.$dropdown = b, b;
      }, c.prototype.bind = function () {}, c.prototype.position = function (a, b) {}, c.prototype.destroy = function () {
        this.$dropdown.remove();
      }, c;
    }), b.define("select2/dropdown/search", ["jquery", "../utils"], function (a, b) {
      function c() {}

      return c.prototype.render = function (b) {
        var c = b.call(this),
            d = a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>');
        return this.$searchContainer = d, this.$search = d.find("input"), c.prepend(d), c;
      }, c.prototype.bind = function (b, c, d) {
        var e = this;
        b.call(this, c, d), this.$search.on("keydown", function (a) {
          e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented();
        }), this.$search.on("input", function (b) {
          a(this).off("keyup");
        }), this.$search.on("keyup input", function (a) {
          e.handleSearch(a);
        }), c.on("open", function () {
          e.$search.attr("tabindex", 0), e.$search.focus(), window.setTimeout(function () {
            e.$search.focus();
          }, 0);
        }), c.on("close", function () {
          e.$search.attr("tabindex", -1), e.$search.val(""), e.$search.blur();
        }), c.on("focus", function () {
          c.isOpen() || e.$search.focus();
        }), c.on("results:all", function (a) {
          if (null == a.query.term || "" === a.query.term) {
            e.showSearch(a) ? e.$searchContainer.removeClass("select2-search--hide") : e.$searchContainer.addClass("select2-search--hide");
          }
        });
      }, c.prototype.handleSearch = function (a) {
        if (!this._keyUpPrevented) {
          var b = this.$search.val();
          this.trigger("query", {
            term: b
          });
        }

        this._keyUpPrevented = !1;
      }, c.prototype.showSearch = function (a, b) {
        return !0;
      }, c;
    }), b.define("select2/dropdown/hidePlaceholder", [], function () {
      function a(a, b, c, d) {
        this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c, d);
      }

      return a.prototype.append = function (a, b) {
        b.results = this.removePlaceholder(b.results), a.call(this, b);
      }, a.prototype.normalizePlaceholder = function (a, b) {
        return "string" == typeof b && (b = {
          id: "",
          text: b
        }), b;
      }, a.prototype.removePlaceholder = function (a, b) {
        for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
          var e = b[d];
          this.placeholder.id === e.id && c.splice(d, 1);
        }

        return c;
      }, a;
    }), b.define("select2/dropdown/infiniteScroll", ["jquery"], function (a) {
      function b(a, b, c, d) {
        this.lastParams = {}, a.call(this, b, c, d), this.$loadingMore = this.createLoadingMore(), this.loading = !1;
      }

      return b.prototype.append = function (a, b) {
        this.$loadingMore.remove(), this.loading = !1, a.call(this, b), this.showLoadingMore(b) && this.$results.append(this.$loadingMore);
      }, b.prototype.bind = function (b, c, d) {
        var e = this;
        b.call(this, c, d), c.on("query", function (a) {
          e.lastParams = a, e.loading = !0;
        }), c.on("query:append", function (a) {
          e.lastParams = a, e.loading = !0;
        }), this.$results.on("scroll", function () {
          var b = a.contains(document.documentElement, e.$loadingMore[0]);

          if (!e.loading && b) {
            e.$results.offset().top + e.$results.outerHeight(!1) + 50 >= e.$loadingMore.offset().top + e.$loadingMore.outerHeight(!1) && e.loadMore();
          }
        });
      }, b.prototype.loadMore = function () {
        this.loading = !0;
        var b = a.extend({}, {
          page: 1
        }, this.lastParams);
        b.page++, this.trigger("query:append", b);
      }, b.prototype.showLoadingMore = function (a, b) {
        return b.pagination && b.pagination.more;
      }, b.prototype.createLoadingMore = function () {
        var b = a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
            c = this.options.get("translations").get("loadingMore");
        return b.html(c(this.lastParams)), b;
      }, b;
    }), b.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (a, b) {
      function c(b, c, d) {
        this.$dropdownParent = d.get("dropdownParent") || a(document.body), b.call(this, c, d);
      }

      return c.prototype.bind = function (a, b, c) {
        var d = this,
            e = !1;
        a.call(this, b, c), b.on("open", function () {
          d._showDropdown(), d._attachPositioningHandler(b), e || (e = !0, b.on("results:all", function () {
            d._positionDropdown(), d._resizeDropdown();
          }), b.on("results:append", function () {
            d._positionDropdown(), d._resizeDropdown();
          }));
        }), b.on("close", function () {
          d._hideDropdown(), d._detachPositioningHandler(b);
        }), this.$dropdownContainer.on("mousedown", function (a) {
          a.stopPropagation();
        });
      }, c.prototype.destroy = function (a) {
        a.call(this), this.$dropdownContainer.remove();
      }, c.prototype.position = function (a, b, c) {
        b.attr("class", c.attr("class")), b.removeClass("select2"), b.addClass("select2-container--open"), b.css({
          position: "absolute",
          top: -999999
        }), this.$container = c;
      }, c.prototype.render = function (b) {
        var c = a("<span></span>"),
            d = b.call(this);
        return c.append(d), this.$dropdownContainer = c, c;
      }, c.prototype._hideDropdown = function (a) {
        this.$dropdownContainer.detach();
      }, c.prototype._attachPositioningHandler = function (c, d) {
        var e = this,
            f = "scroll.select2." + d.id,
            g = "resize.select2." + d.id,
            h = "orientationchange.select2." + d.id,
            i = this.$container.parents().filter(b.hasScroll);
        i.each(function () {
          b.StoreData(this, "select2-scroll-position", {
            x: a(this).scrollLeft(),
            y: a(this).scrollTop()
          });
        }), i.on(f, function (c) {
          var d = b.GetData(this, "select2-scroll-position");
          a(this).scrollTop(d.y);
        }), a(window).on(f + " " + g + " " + h, function (a) {
          e._positionDropdown(), e._resizeDropdown();
        });
      }, c.prototype._detachPositioningHandler = function (c, d) {
        var e = "scroll.select2." + d.id,
            f = "resize.select2." + d.id,
            g = "orientationchange.select2." + d.id;
        this.$container.parents().filter(b.hasScroll).off(e), a(window).off(e + " " + f + " " + g);
      }, c.prototype._positionDropdown = function () {
        var b = a(window),
            c = this.$dropdown.hasClass("select2-dropdown--above"),
            d = this.$dropdown.hasClass("select2-dropdown--below"),
            e = null,
            f = this.$container.offset();
        f.bottom = f.top + this.$container.outerHeight(!1);
        var g = {
          height: this.$container.outerHeight(!1)
        };
        g.top = f.top, g.bottom = f.top + g.height;
        var h = {
          height: this.$dropdown.outerHeight(!1)
        },
            i = {
          top: b.scrollTop(),
          bottom: b.scrollTop() + b.height()
        },
            j = i.top < f.top - h.height,
            k = i.bottom > f.bottom + h.height,
            l = {
          left: f.left,
          top: g.bottom
        },
            m = this.$dropdownParent;
        "static" === m.css("position") && (m = m.offsetParent());
        var n = m.offset();
        l.top -= n.top, l.left -= n.left, c || d || (e = "below"), k || !j || c ? !j && k && c && (e = "below") : e = "above", ("above" == e || c && "below" !== e) && (l.top = g.top - n.top - h.height), null != e && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + e), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + e)), this.$dropdownContainer.css(l);
      }, c.prototype._resizeDropdown = function () {
        var a = {
          width: this.$container.outerWidth(!1) + "px"
        };
        this.options.get("dropdownAutoWidth") && (a.minWidth = a.width, a.position = "relative", a.width = "auto"), this.$dropdown.css(a);
      }, c.prototype._showDropdown = function (a) {
        this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown();
      }, c;
    }), b.define("select2/dropdown/minimumResultsForSearch", [], function () {
      function a(b) {
        for (var c = 0, d = 0; d < b.length; d++) {
          var e = b[d];
          e.children ? c += a(e.children) : c++;
        }

        return c;
      }

      function b(a, b, c, d) {
        this.minimumResultsForSearch = c.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), a.call(this, b, c, d);
      }

      return b.prototype.showSearch = function (b, c) {
        return !(a(c.data.results) < this.minimumResultsForSearch) && b.call(this, c);
      }, b;
    }), b.define("select2/dropdown/selectOnClose", ["../utils"], function (a) {
      function b() {}

      return b.prototype.bind = function (a, b, c) {
        var d = this;
        a.call(this, b, c), b.on("close", function (a) {
          d._handleSelectOnClose(a);
        });
      }, b.prototype._handleSelectOnClose = function (b, c) {
        if (c && null != c.originalSelect2Event) {
          var d = c.originalSelect2Event;
          if ("select" === d._type || "unselect" === d._type) return;
        }

        var e = this.getHighlightedResults();

        if (!(e.length < 1)) {
          var f = a.GetData(e[0], "data");
          null != f.element && f.element.selected || null == f.element && f.selected || this.trigger("select", {
            data: f
          });
        }
      }, b;
    }), b.define("select2/dropdown/closeOnSelect", [], function () {
      function a() {}

      return a.prototype.bind = function (a, b, c) {
        var d = this;
        a.call(this, b, c), b.on("select", function (a) {
          d._selectTriggered(a);
        }), b.on("unselect", function (a) {
          d._selectTriggered(a);
        });
      }, a.prototype._selectTriggered = function (a, b) {
        var c = b.originalEvent;
        c && c.ctrlKey || this.trigger("close", {
          originalEvent: c,
          originalSelect2Event: b
        });
      }, a;
    }), b.define("select2/i18n/en", [], function () {
      return {
        errorLoading: function errorLoading() {
          return "The results could not be loaded.";
        },
        inputTooLong: function inputTooLong(a) {
          var b = a.input.length - a.maximum,
              c = "Please delete " + b + " character";
          return 1 != b && (c += "s"), c;
        },
        inputTooShort: function inputTooShort(a) {
          return "Please enter " + (a.minimum - a.input.length) + " or more characters";
        },
        loadingMore: function loadingMore() {
          return "Loading more resultsâ€¦";
        },
        maximumSelected: function maximumSelected(a) {
          var b = "You can only select " + a.maximum + " item";
          return 1 != a.maximum && (b += "s"), b;
        },
        noResults: function noResults() {
          return "No results found";
        },
        searching: function searching() {
          return "Searchingâ€¦";
        }
      };
    }), b.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C) {
      function D() {
        this.reset();
      }

      return D.prototype.apply = function (l) {
        if (l = a.extend(!0, {}, this.defaults, l), null == l.dataAdapter) {
          if (null != l.ajax ? l.dataAdapter = o : null != l.data ? l.dataAdapter = n : l.dataAdapter = m, l.minimumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, r)), l.maximumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, s)), l.maximumSelectionLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, t)), l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)), null == l.tokenSeparators && null == l.tokenizer || (l.dataAdapter = j.Decorate(l.dataAdapter, q)), null != l.query) {
            var C = b(l.amdBase + "compat/query");
            l.dataAdapter = j.Decorate(l.dataAdapter, C);
          }

          if (null != l.initSelection) {
            var D = b(l.amdBase + "compat/initSelection");
            l.dataAdapter = j.Decorate(l.dataAdapter, D);
          }
        }

        if (null == l.resultsAdapter && (l.resultsAdapter = c, null != l.ajax && (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)), null != l.placeholder && (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)), l.selectOnClose && (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))), null == l.dropdownAdapter) {
          if (l.multiple) l.dropdownAdapter = u;else {
            var E = j.Decorate(u, v);
            l.dropdownAdapter = E;
          }

          if (0 !== l.minimumResultsForSearch && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)), l.closeOnSelect && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)), null != l.dropdownCssClass || null != l.dropdownCss || null != l.adaptDropdownCssClass) {
            var F = b(l.amdBase + "compat/dropdownCss");
            l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F);
          }

          l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y);
        }

        if (null == l.selectionAdapter) {
          if (l.multiple ? l.selectionAdapter = e : l.selectionAdapter = d, null != l.placeholder && (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)), l.allowClear && (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)), l.multiple && (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)), null != l.containerCssClass || null != l.containerCss || null != l.adaptContainerCssClass) {
            var G = b(l.amdBase + "compat/containerCss");
            l.selectionAdapter = j.Decorate(l.selectionAdapter, G);
          }

          l.selectionAdapter = j.Decorate(l.selectionAdapter, i);
        }

        if ("string" == typeof l.language) if (l.language.indexOf("-") > 0) {
          var H = l.language.split("-"),
              I = H[0];
          l.language = [l.language, I];
        } else l.language = [l.language];

        if (a.isArray(l.language)) {
          var J = new k();
          l.language.push("en");

          for (var K = l.language, L = 0; L < K.length; L++) {
            var M = K[L],
                N = {};

            try {
              N = k.loadPath(M);
            } catch (a) {
              try {
                M = this.defaults.amdLanguageBase + M, N = k.loadPath(M);
              } catch (a) {
                l.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.');
                continue;
              }
            }

            J.extend(N);
          }

          l.translations = J;
        } else {
          var O = k.loadPath(this.defaults.amdLanguageBase + "en"),
              P = new k(l.language);
          P.extend(O), l.translations = P;
        }

        return l;
      }, D.prototype.reset = function () {
        function b(a) {
          function b(a) {
            return l[a] || a;
          }

          return a.replace(/[^\u0000-\u007E]/g, b);
        }

        function c(d, e) {
          if ("" === a.trim(d.term)) return e;

          if (e.children && e.children.length > 0) {
            for (var f = a.extend(!0, {}, e), g = e.children.length - 1; g >= 0; g--) {
              null == c(d, e.children[g]) && f.children.splice(g, 1);
            }

            return f.children.length > 0 ? f : c(d, f);
          }

          var h = b(e.text).toUpperCase(),
              i = b(d.term).toUpperCase();
          return h.indexOf(i) > -1 ? e : null;
        }

        this.defaults = {
          amdBase: "./",
          amdLanguageBase: "./i18n/",
          closeOnSelect: !0,
          debug: !1,
          dropdownAutoWidth: !1,
          escapeMarkup: j.escapeMarkup,
          language: C,
          matcher: c,
          minimumInputLength: 0,
          maximumInputLength: 0,
          maximumSelectionLength: 0,
          minimumResultsForSearch: 0,
          selectOnClose: !1,
          sorter: function sorter(a) {
            return a;
          },
          templateResult: function templateResult(a) {
            return a.text;
          },
          templateSelection: function templateSelection(a) {
            return a.text;
          },
          theme: "default",
          width: "resolve"
        };
      }, D.prototype.set = function (b, c) {
        var d = a.camelCase(b),
            e = {};
        e[d] = c;

        var f = j._convertData(e);

        a.extend(!0, this.defaults, f);
      }, new D();
    }), b.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (a, b, c, d) {
      function e(b, e) {
        if (this.options = b, null != e && this.fromElement(e), this.options = c.apply(this.options), e && e.is("input")) {
          var f = a(this.get("amdBase") + "compat/inputData");
          this.options.dataAdapter = d.Decorate(this.options.dataAdapter, f);
        }
      }

      return e.prototype.fromElement = function (a) {
        var c = ["select2"];
        null == this.options.multiple && (this.options.multiple = a.prop("multiple")), null == this.options.disabled && (this.options.disabled = a.prop("disabled")), null == this.options.language && (a.prop("lang") ? this.options.language = a.prop("lang").toLowerCase() : a.closest("[lang]").prop("lang") && (this.options.language = a.closest("[lang]").prop("lang"))), null == this.options.dir && (a.prop("dir") ? this.options.dir = a.prop("dir") : a.closest("[dir]").prop("dir") ? this.options.dir = a.closest("[dir]").prop("dir") : this.options.dir = "ltr"), a.prop("disabled", this.options.disabled), a.prop("multiple", this.options.multiple), d.GetData(a[0], "select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), d.StoreData(a[0], "data", d.GetData(a[0], "select2Tags")), d.StoreData(a[0], "tags", !0)), d.GetData(a[0], "ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), a.attr("ajax--url", d.GetData(a[0], "ajaxUrl")), d.StoreData(a[0], "ajax-Url", d.GetData(a[0], "ajaxUrl")));
        var e = {};
        e = b.fn.jquery && "1." == b.fn.jquery.substr(0, 2) && a[0].dataset ? b.extend(!0, {}, a[0].dataset, d.GetData(a[0])) : d.GetData(a[0]);
        var f = b.extend(!0, {}, e);
        f = d._convertData(f);

        for (var g in f) {
          b.inArray(g, c) > -1 || (b.isPlainObject(this.options[g]) ? b.extend(this.options[g], f[g]) : this.options[g] = f[g]);
        }

        return this;
      }, e.prototype.get = function (a) {
        return this.options[a];
      }, e.prototype.set = function (a, b) {
        this.options[a] = b;
      }, e;
    }), b.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (a, b, c, d) {
      var e = function e(a, d) {
        null != c.GetData(a[0], "select2") && c.GetData(a[0], "select2").destroy(), this.$element = a, this.id = this._generateId(a), d = d || {}, this.options = new b(d, a), e.__super__.constructor.call(this);
        var f = a.attr("tabindex") || 0;
        c.StoreData(a[0], "old-tabindex", f), a.attr("tabindex", "-1");
        var g = this.options.get("dataAdapter");
        this.dataAdapter = new g(a, this.options);
        var h = this.render();

        this._placeContainer(h);

        var i = this.options.get("selectionAdapter");
        this.selection = new i(a, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, h);
        var j = this.options.get("dropdownAdapter");
        this.dropdown = new j(a, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, h);
        var k = this.options.get("resultsAdapter");
        this.results = new k(a, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
        var l = this;
        this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function (a) {
          l.trigger("selection:update", {
            data: a
          });
        }), a.addClass("select2-hidden-accessible"), a.attr("aria-hidden", "true"), this._syncAttributes(), c.StoreData(a[0], "select2", this);
      };

      return c.Extend(e, c.Observable), e.prototype._generateId = function (a) {
        var b = "";
        return b = null != a.attr("id") ? a.attr("id") : null != a.attr("name") ? a.attr("name") + "-" + c.generateChars(2) : c.generateChars(4), b = b.replace(/(:|\.|\[|\]|,)/g, ""), b = "select2-" + b;
      }, e.prototype._placeContainer = function (a) {
        a.insertAfter(this.$element);

        var b = this._resolveWidth(this.$element, this.options.get("width"));

        null != b && a.css("width", b);
      }, e.prototype._resolveWidth = function (a, b) {
        var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

        if ("resolve" == b) {
          var d = this._resolveWidth(a, "style");

          return null != d ? d : this._resolveWidth(a, "element");
        }

        if ("element" == b) {
          var e = a.outerWidth(!1);
          return e <= 0 ? "auto" : e + "px";
        }

        if ("style" == b) {
          var f = a.attr("style");
          if ("string" != typeof f) return null;

          for (var g = f.split(";"), h = 0, i = g.length; h < i; h += 1) {
            var j = g[h].replace(/\s/g, ""),
                k = j.match(c);
            if (null !== k && k.length >= 1) return k[1];
          }

          return null;
        }

        return b;
      }, e.prototype._bindAdapters = function () {
        this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container);
      }, e.prototype._registerDomEvents = function () {
        var b = this;
        this.$element.on("change.select2", function () {
          b.dataAdapter.current(function (a) {
            b.trigger("selection:update", {
              data: a
            });
          });
        }), this.$element.on("focus.select2", function (a) {
          b.trigger("focus", a);
        }), this._syncA = c.bind(this._syncAttributes, this), this._syncS = c.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
        var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        null != d ? (this._observer = new d(function (c) {
          a.each(c, b._syncA), a.each(c, b._syncS);
        }), this._observer.observe(this.$element[0], {
          attributes: !0,
          childList: !0,
          subtree: !1
        })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", b._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", b._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", b._syncS, !1));
      }, e.prototype._registerDataEvents = function () {
        var a = this;
        this.dataAdapter.on("*", function (b, c) {
          a.trigger(b, c);
        });
      }, e.prototype._registerSelectionEvents = function () {
        var b = this,
            c = ["toggle", "focus"];
        this.selection.on("toggle", function () {
          b.toggleDropdown();
        }), this.selection.on("focus", function (a) {
          b.focus(a);
        }), this.selection.on("*", function (d, e) {
          -1 === a.inArray(d, c) && b.trigger(d, e);
        });
      }, e.prototype._registerDropdownEvents = function () {
        var a = this;
        this.dropdown.on("*", function (b, c) {
          a.trigger(b, c);
        });
      }, e.prototype._registerResultsEvents = function () {
        var a = this;
        this.results.on("*", function (b, c) {
          a.trigger(b, c);
        });
      }, e.prototype._registerEvents = function () {
        var a = this;
        this.on("open", function () {
          a.$container.addClass("select2-container--open");
        }), this.on("close", function () {
          a.$container.removeClass("select2-container--open");
        }), this.on("enable", function () {
          a.$container.removeClass("select2-container--disabled");
        }), this.on("disable", function () {
          a.$container.addClass("select2-container--disabled");
        }), this.on("blur", function () {
          a.$container.removeClass("select2-container--focus");
        }), this.on("query", function (b) {
          a.isOpen() || a.trigger("open", {}), this.dataAdapter.query(b, function (c) {
            a.trigger("results:all", {
              data: c,
              query: b
            });
          });
        }), this.on("query:append", function (b) {
          this.dataAdapter.query(b, function (c) {
            a.trigger("results:append", {
              data: c,
              query: b
            });
          });
        }), this.on("keypress", function (b) {
          var c = b.which;
          a.isOpen() ? c === d.ESC || c === d.TAB || c === d.UP && b.altKey ? (a.close(), b.preventDefault()) : c === d.ENTER ? (a.trigger("results:select", {}), b.preventDefault()) : c === d.SPACE && b.ctrlKey ? (a.trigger("results:toggle", {}), b.preventDefault()) : c === d.UP ? (a.trigger("results:previous", {}), b.preventDefault()) : c === d.DOWN && (a.trigger("results:next", {}), b.preventDefault()) : (c === d.ENTER || c === d.SPACE || c === d.DOWN && b.altKey) && (a.open(), b.preventDefault());
        });
      }, e.prototype._syncAttributes = function () {
        this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {});
      }, e.prototype._syncSubtree = function (a, b) {
        var c = !1,
            d = this;

        if (!a || !a.target || "OPTION" === a.target.nodeName || "OPTGROUP" === a.target.nodeName) {
          if (b) {
            if (b.addedNodes && b.addedNodes.length > 0) for (var e = 0; e < b.addedNodes.length; e++) {
              var f = b.addedNodes[e];
              f.selected && (c = !0);
            } else b.removedNodes && b.removedNodes.length > 0 && (c = !0);
          } else c = !0;
          c && this.dataAdapter.current(function (a) {
            d.trigger("selection:update", {
              data: a
            });
          });
        }
      }, e.prototype.trigger = function (a, b) {
        var c = e.__super__.trigger,
            d = {
          open: "opening",
          close: "closing",
          select: "selecting",
          unselect: "unselecting",
          clear: "clearing"
        };

        if (void 0 === b && (b = {}), a in d) {
          var f = d[a],
              g = {
            prevented: !1,
            name: a,
            args: b
          };
          if (c.call(this, f, g), g.prevented) return void (b.prevented = !0);
        }

        c.call(this, a, b);
      }, e.prototype.toggleDropdown = function () {
        this.options.get("disabled") || (this.isOpen() ? this.close() : this.open());
      }, e.prototype.open = function () {
        this.isOpen() || this.trigger("query", {});
      }, e.prototype.close = function () {
        this.isOpen() && this.trigger("close", {});
      }, e.prototype.isOpen = function () {
        return this.$container.hasClass("select2-container--open");
      }, e.prototype.hasFocus = function () {
        return this.$container.hasClass("select2-container--focus");
      }, e.prototype.focus = function (a) {
        this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}));
      }, e.prototype.enable = function (a) {
        this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), null != a && 0 !== a.length || (a = [!0]);
        var b = !a[0];
        this.$element.prop("disabled", b);
      }, e.prototype.data = function () {
        this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
        var a = [];
        return this.dataAdapter.current(function (b) {
          a = b;
        }), a;
      }, e.prototype.val = function (b) {
        if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == b || 0 === b.length) return this.$element.val();
        var c = b[0];
        a.isArray(c) && (c = a.map(c, function (a) {
          return a.toString();
        })), this.$element.val(c).trigger("change");
      }, e.prototype.destroy = function () {
        this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", c.GetData(this.$element[0], "old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), c.RemoveData(this.$element[0]), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null;
      }, e.prototype.render = function () {
        var b = a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
        return b.attr("dir", this.options.get("dir")), this.$container = b, this.$container.addClass("select2-container--" + this.options.get("theme")), c.StoreData(b[0], "element", this.$element), b;
      }, e;
    }), b.define("jquery-mousewheel", ["jquery"], function (a) {
      return a;
    }), b.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function (a, b, c, d, e) {
      if (null == a.fn.select2) {
        var f = ["open", "close", "destroy"];

        a.fn.select2 = function (b) {
          if ("object" == _typeof(b = b || {})) return this.each(function () {
            var d = a.extend(!0, {}, b);
            new c(a(this), d);
          }), this;

          if ("string" == typeof b) {
            var d,
                g = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
              var a = e.GetData(this, "select2");
              null == a && window.console && console.error && console.error("The select2('" + b + "') method was called on an element that is not using Select2."), d = a[b].apply(a, g);
            }), a.inArray(b, f) > -1 ? this : d;
          }

          throw new Error("Invalid arguments for Select2: " + b);
        };
      }

      return null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c;
    }), {
      define: b.define,
      require: b.require
    };
  }(),
      c = b.require("jquery.select2");

  return a.fn.select2.amd = b, c;
});
$(document).ready(function () {
  toastr.options = {
    closeButton: true,
    progressBar: true,
    showMethod: 'slideDown',
    timeOut: 4000,
    extendedTimeOut: 4000,
    preventDuplicates: true
  };
  $('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green'
  });
});
