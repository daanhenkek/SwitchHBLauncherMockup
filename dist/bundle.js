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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Water = __webpack_require__(1);

var _TitleScene = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu =
/*#__PURE__*/
function () {
  function Menu() {
    _classCallCheck(this, Menu);

    this.container = document.querySelector('#appContainer');
    this.sceneCanvas = document.querySelector('#sceneCanvas');
    this.sceneContext = this.sceneCanvas.getContext('2d');
    this.waterWidget = new _Water.WaterWidget();
    this.scenes = [new _TitleScene.TitleScene()];
    this.currentScene = 0;
    this.setResolution(1280, 720);
  }

  _createClass(Menu, [{
    key: "setResolution",
    value: function setResolution(width, height) {
      this.width = width;
      this.height = height;
      this.sceneCanvas.width = width;
      this.sceneCanvas.height = height;
      this.waterWidget.setResolution(width, height);
      this.scenes[this.currentScene].transitionTo(this);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.waterWidget.draw();
      this.scenes[this.currentScene].draw(this.sceneCanvas, this.sceneContext);
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
/* 1 */
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
    key: "animateTo",
    value: function animateTo(height, time) {
      var self = this;
      if (time === undefined) time = 3000;
      this.animationQueue.push(anime({
        targets: this,
        baseHeight: height,
        duration: time,
        delay: 300,
        elasticity: 200,
        autoplay: false,
        complete: function complete() {
          console.log(height);
          self.baseHeight = height;
          console.log("DONE");

          if (self.animationQueue.length > 0) {
            var animation = self.animationQueue.shift();
            animation.play();
            console.log(animation.baseHeight);
          } else {
            self.isAnimating = false;
          }
        }
      }));
    }
  }, {
    key: "animateToTop",
    value: function animateToTop() {
      this.animateTo(this.canvas.height, 2000);
    }
  }, {
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

      if (this.isAnimating === false && this.animationQueue.length > 0) {
        console.log("PLAYING");
        var anim = this.animationQueue.shift();
        anim.play();
        console.log(anim.baseHeight);
        this.isAnimating = true;
      }

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TitleScene = void 0;

var _Logo = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TitleScene =
/*#__PURE__*/
function () {
  function TitleScene() {
    _classCallCheck(this, TitleScene);

    this.logo = new _Logo.LogoWidget();
  }

  _createClass(TitleScene, [{
    key: "transitionTo",
    value: function transitionTo(menu) {
      console.log();
      menu.waterWidget.animateTo(menu.waterWidget.canvas.height / 15);
    }
  }, {
    key: "draw",
    value: function draw(canvas, context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.logo.draw(canvas, context);
    }
  }]);

  return TitleScene;
}();

exports.TitleScene = TitleScene;

/***/ }),
/* 3 */
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

/***/ })
/******/ ]);