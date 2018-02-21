/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogoWidget = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LogoWidget =
/*#__PURE__*/
function () {
  function LogoWidget() {
    _classCallCheck(this, LogoWidget);

    this.image = new Image();
    this.image.src = 'gfx/logo_wip.png';
  }

  _createClass(LogoWidget, [{
    key: "draw",
    value: function draw(canvas, context) {
      var middle_x = canvas.width / 2;
      var middle_y = canvas.height / 2.5;
      var width, height;
      var imageAspect = this.image.width / this.image.height;
      var canvasAspect = canvas.width / canvas.height;

      if (imageAspect < canvasAspect) {
        height = canvas.height;
        width = this.image.width * (height / this.image.height);
      } else {
        width = canvas.width;
        height = this.image.height * (width / this.image.width);
      }

      width *= 0.7;
      height *= 0.7;
      context.fillStyle = 'blue';
      context.drawImage(this.image, middle_x - width / 2, middle_y - height / 2, width, height);
    }
  }]);

  return LogoWidget;
}();

exports.LogoWidget = LogoWidget;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = void 0;

var _lib = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scene =
/*#__PURE__*/
function () {
  function Scene(waterHeight) {
    _classCallCheck(this, Scene);

    this.doUpdate = false;
    this.doInput = false;
    this.waterHeight = waterHeight;
  }

  _createClass(Scene, [{
    key: "startUpdating",
    value: function startUpdating() {
      this.doUpdate = true;
    }
  }, {
    key: "stopUpdating",
    value: function stopUpdating() {
      this.doUpdate = false;
    }
  }, {
    key: "transitionTo",
    value: function transitionTo(menu, callback) {
      var _this = this;

      var length = 3000;
      menu.foregroundCanvas.style.display = 'block';
      (0, _lib.animate)('easeLinear', length / 10, 0, 1, function (value) {
        menu.foregroundCanvas.style.opacity = value;
      });
      (0, _lib.animate)("easeOutElastic", length, menu.waterWidget.baseHeight, menu.waterWidget.canvas.height / 100 * this.waterHeight, function (value) {
        menu.waterWidget.baseHeight = value;
      }, function () {
        _this.startUpdating();

        _this.doInput = true;
        if (callback) callback();
      });
    }
  }, {
    key: "handleInput",
    value: function handleInput(key) {
      console.log(key);
    }
  }, {
    key: "transitionFrom",
    value: function transitionFrom(menu, callback) {
      var _this2 = this;

      var length = 1500;
      this.doInput = false;
      (0, _lib.animate)('easeLinear', length / 10, 1, 0, function (value) {
        menu.foregroundCanvas.style.opacity = value;
      }, function () {
        menu.foregroundCanvas.style.display = 'none';
      });
      (0, _lib.animate)("easeInOutElastic", length, menu.waterWidget.baseHeight, menu.waterWidget.canvas.height, function (value) {
        menu.waterWidget.baseHeight = value;
      }, function () {
        _this2.stopUpdating();

        if (callback) callback();
      });
    }
  }]);

  return Scene;
}();

exports.Scene = Scene;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Water = __webpack_require__(3);

var _TitleScene = __webpack_require__(4);

var _CreditsScene = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu =
/*#__PURE__*/
function () {
  function Menu() {
    _classCallCheck(this, Menu);

    this.container = document.querySelector('#appContainer');
    this.foregroundCanvas = document.querySelector('#foregroundCanvas');
    this.foregroundContext = this.foregroundCanvas.getContext('2d');
    this.backgroundCanvas = document.querySelector('#backgroundCanvas');
    this.backgroundContext = this.backgroundCanvas.getContext('2d');
    this.waterWidget = new _Water.WaterWidget();
    this.scenes = [new _TitleScene.TitleScene(), new _CreditsScene.CreditsScene()];
    this.currentScene = 0;
    this.setResolution(1280, 720);
    this.waterWidget.baseHeight = this.waterWidget.canvas.height;
    this.scenes[this.currentScene].transitionTo(this);
  }

  _createClass(Menu, [{
    key: "setResolution",
    value: function setResolution(width, height) {
      this.width = width;
      this.height = height;
      this.foregroundCanvas.width = width;
      this.foregroundCanvas.height = height;
      this.backgroundCanvas.width = width;
      this.backgroundCanvas.height = height;
      this.waterWidget.setResolution(width, height);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.scenes[this.currentScene].drawBackground(this.backgroundCanvas, this.backgroundContext);
      this.waterWidget.draw();
      this.scenes[this.currentScene].drawForeground(this.foregroundCanvas, this.foregroundContext);
    }
  }, {
    key: "switchScenes",
    value: function switchScenes(to) {
      var _this = this;

      var previousScene = this.scenes[this.currentScene];
      var newScene = this.scenes[to];
      previousScene.transitionFrom(this, function () {
        _this.currentScene = to;
        newScene.transitionTo(_this, function () {});
      });
    }
  }, {
    key: "handleInput",
    value: function handleInput(key) {
      this.scenes[this.currentScene].handleInput(key);
    }
  }]);

  return Menu;
}();

window.addEventListener('load', function () {
  window.menu = new Menu();

  function tick() {
    requestAnimationFrame(tick);
    window.menu.draw();
  }

  requestAnimationFrame(tick);
  document.addEventListener('keypress', function (event) {
    var key;
    var keyCode = event.charCode | event.key.charCodeAt(0);

    switch (keyCode) {
      case 69:
        key = 'start';
        break;

      case 97:
        key = 'a';
        break;

      case 98:
        key = 'b';
        break;

      default:
        console.log(keyCode);
        break;
    }

    console.log(key);
    if (key !== undefined) window.menu.handleInput(key);
  });
  var waveHeightSlider = document.querySelector('#waveHeight');
  waveHeightSlider.addEventListener('click', function () {
    window.menu.waterWidget.baseHeight = waveHeightSlider.value;
  });
  var up = false;
  document.querySelector('#waveAnimation').addEventListener('click', function () {
    if (up) window.menu.scenes[window.menu.currentScene].transitionTo(window.menu);else window.menu.waterWidget.animateToTop();
    up = !up;
  });
}); // window.onerror = function (message) {
//     alert(message);
// };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaterWidget = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WaterWidget =
/*#__PURE__*/
function () {
  function WaterWidget() {
    _classCallCheck(this, WaterWidget);

    this.canvas = document.querySelector('#waterCanvas');
    this.context = this.canvas.getContext('2d');
    this.waves = [new Wave("#516EAD", "#516EAD", 0, -17, 160), new Wave("#6783C9", "#6783C9", 8, 13.5, 156), new Wave("#429A9F", "#429A9F", 14, -12.5, 152), new Wave("#67ffff", "#5cb0e2", 24, 11, 148)];
    this.timer = 0;
    this.amplitude = 8;
    this.animationQueue = [];
    this.isAnimating = false;
  }

  _createClass(WaterWidget, [{
    key: "setResolution",
    value: function setResolution(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.baseHeight = this.canvas.height;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.waves.forEach(function (wave) {
        wave.draw(_this.canvas, _this.context, _this.timer, _this.amplitude, _this.baseHeight);
      });
      this.timer += 0.025;
    }
  }]);

  return WaterWidget;
}();

exports.WaterWidget = WaterWidget;

var Wave =
/*#__PURE__*/
function () {
  function Wave(color1, color2, phase, speed, baseHeight) {
    _classCallCheck(this, Wave);

    this.color1 = color1;
    this.color2 = color2;
    this.phase = phase;
    this.speed = speed;
    this.waveHeight = baseHeight;
  }

  _createClass(Wave, [{
    key: "draw",
    value: function draw(canvas, context, timer, amplitude, baseHeight) {
      var height = canvas.height - this.waveHeight - baseHeight;
      context.beginPath();
      context.moveTo(0, canvas.height);

      for (var x = 0; x <= canvas.width; x++) {
        var wave_y = Math.sin(x * this.speed / canvas.width + timer + this.phase) * amplitude + height;
        context.lineTo(x, wave_y);
      }

      context.lineTo(canvas.width, canvas.height);
      context.lineTo(0, canvas.height);
      context.fillStyle = colorToGradient(this.color1, this.color2, context, canvas);
      context.fill();
      context.closePath();
    }
  }]);

  return Wave;
}();

function colorToGradient(color1, color2, context, canvas) {
  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.5, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TitleScene = void 0;

var _Logo = __webpack_require__(0);

var _Scene2 = __webpack_require__(1);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TitleScene =
/*#__PURE__*/
function (_Scene) {
  _inherits(TitleScene, _Scene);

  function TitleScene() {
    var _this;

    _classCallCheck(this, TitleScene);

    _this = _possibleConstructorReturn(this, (TitleScene.__proto__ || Object.getPrototypeOf(TitleScene)).call(this, -9));
    _this.logo = new _Logo.LogoWidget();
    return _this;
  }

  _createClass(TitleScene, [{
    key: "drawForeground",
    value: function drawForeground(canvas, context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, {
    key: "drawBackground",
    value: function drawBackground(canvas, context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.logo.draw(canvas, context);
    }
  }, {
    key: "handleInput",
    value: function handleInput(key) {
      if (!this.doInput) return;

      switch (key) {
        case "a":
        case "start":
          window.menu.switchScenes(1);
          break;
      }
    }
  }]);

  return TitleScene;
}(_Scene2.Scene);

exports.TitleScene = TitleScene;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animate = animate;
exports.easeInBounce = easeInBounce;
exports.easeOutBounce = easeOutBounce;
exports.easeInOutBounce = easeInOutBounce;
exports.easeLinear = easeLinear;
exports.easeLinearHelper = easeLinearHelper;
exports.easeInElastic = easeInElastic;
exports.easeOutElastic = easeOutElastic;
exports.easeInOutElastic = easeInOutElastic;

function animate(type, duration, from, to, callback, callbackDone) {
  var startTime = Date.now();
  var easeFunction;

  switch (type) {
    case "easeInBounce":
      easeFunction = easeInBounce;
      break;

    case "easeOutBounce":
      easeFunction = easeOutBounce;
      break;

    case "easeInOutBounce":
      easeFunction = easeInOutBounce;
      break;

    case "easeInElastic":
      easeFunction = easeInElastic;
      break;

    case "easeOutElastic":
      easeFunction = easeOutElastic;
      break;

    case "easeInOutElastic":
      easeFunction = easeInOutElastic;
      break;

    case "easeLinear":
      easeFunction = easeLinear;
      break;

    default:
      return;
  }

  function step() {
    var nowTime = Date.now(); //console.log(from, to, duration, nowTime, startTime, nowTime - startTime);

    if (nowTime - startTime >= duration) {
      clearInterval(interval);
      if (callbackDone) callbackDone();
    }

    var n = easeLinearHelper(from, to, easeFunction((nowTime - startTime) / duration)); //console.log(n);

    callback(n);
  }

  var interval = setInterval(step, 1000 / 60);
}

function easeInBounce(n) {
  return 1 - easeOutBounce(1 - n);
}

function easeOutBounce(n) {
  if (n < 1 / 2.75) {
    return 7.5625 * n * n;
  } else if (n < 2 / 2.75) {
    return 7.5625 * (n -= 1.5 / 2.75) * n + 0.75;
  } else if (n < 2.5 / 2.75) {
    return 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375;
  } else {
    return 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  }
}

function easeInOutBounce(n) {
  if (n < .5) return easeInBounce(n * 2) * .5;
  return easeOutBounce(n * 2 - 1) * .5 + .5;
}

function easeLinear(n) {
  return n;
}

function easeLinearHelper(from, to, n) {
  //console.log(n);
  return (1 - n) * from + n * to;
}

function easeInElastic(n) {
  var s,
      a = 0.1,
      p = 0.8;
  if (n === 0) return 0;
  if (n === 1) return 1;

  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else s = p * Math.asin(1 / a) / (2 * Math.PI);

  return -(a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
}

;

function easeOutElastic(n) {
  var s,
      a = 0.1,
      p = 0.8;
  if (n === 0) return 0;
  if (n === 1) return 1;

  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else s = p * Math.asin(1 / a) / (2 * Math.PI);

  return a * Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
}

;

function easeInOutElastic(n) {
  var s,
      a = 0.1,
      p = 0.8;
  if (n === 0) return 0;
  if (n === 1) return 1;

  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else s = p * Math.asin(1 / a) / (2 * Math.PI);

  if ((n *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
  return a * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p) * 0.5 + 1;
}

;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreditsScene = void 0;

var _Logo = __webpack_require__(0);

var _Scene2 = __webpack_require__(1);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreditsScene =
/*#__PURE__*/
function (_Scene) {
  _inherits(CreditsScene, _Scene);

  function CreditsScene() {
    var _this;

    _classCallCheck(this, CreditsScene);

    _this = _possibleConstructorReturn(this, (CreditsScene.__proto__ || Object.getPrototypeOf(CreditsScene)).call(this, 10));
    _this.logo = new _Logo.LogoWidget();
    return _this;
  }

  _createClass(CreditsScene, [{
    key: "drawForeground",
    value: function drawForeground(canvas, context) {
      context.clearRect(0, 0, canvas.width, canvas.height); // context.fillStyle = 'red';
      // context.fillRect(500, 100, 200, 400);
    }
  }, {
    key: "drawBackground",
    value: function drawBackground(canvas, context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'blue';
      context.fillRect(5, 10, 1100, 700); //this.logo.draw(canvas, context);
    }
  }, {
    key: "handleInput",
    value: function handleInput(key) {
      if (!this.doInput) return;

      switch (key) {
        case "b":
          window.menu.switchScenes(0);
          break;
      }
    }
  }]);

  return CreditsScene;
}(_Scene2.Scene);

exports.CreditsScene = CreditsScene;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map