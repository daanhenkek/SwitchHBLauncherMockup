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


var debugControls = _interopRequireWildcard(__webpack_require__(1));

var renderer = _interopRequireWildcard(__webpack_require__(2));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

window.addEventListener('load', function () {
  var screenSize = '720';
  document.querySelector("#resizeButton").addEventListener('click', function () {
    var container = document.querySelector('#appContainer');
    var canvas = document.querySelector('#canvas');

    if (screenSize === '720') {
      container.classList.remove('mode-720p');
      container.classList.add('mode-1080p');
      canvas.width = 1920;
      canvas.height = 1080;
      screenSize = '1080';
    } else {
      container.classList.remove('mode-1080p');
      container.classList.add('mode-720p');
      canvas.width = 1280;
      canvas.height = 720;
      screenSize = '720';
    }

    window.renderer.recalculate();
  });
  document.querySelector('#hourButton').addEventListener('click', function () {
    window.renderer.clock.hour12 = !window.renderer.clock.hour12;
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _WaterBoi = _interopRequireDefault(__webpack_require__(3));

var _Clock = __webpack_require__(4);

var _titleDB = __webpack_require__(5);

var _CurrentTitleDescription = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Renderer =
/*#__PURE__*/
function () {
  function Renderer(canvas) {
    _classCallCheck(this, Renderer);

    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.waveBoi = new _WaterBoi.default(this);
    this.currentTitleDescription = new _CurrentTitleDescription.CurrentTitleDescription(this);
    this.clock = new _Clock.Clock(this);
    requestAnimationFrame(this.tick.bind(this));
  }

  _createClass(Renderer, [{
    key: "clearScreen",
    value: function clearScreen() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "perw",
    value: function perw(amnt) {
      return this.canvas.width / 100 * amnt;
    }
  }, {
    key: "perh",
    value: function perh(amnt) {
      return this.canvas.height / 100 * amnt;
    }
  }, {
    key: "tick",
    value: function tick() {
      requestAnimationFrame(this.tick.bind(this));
      this.update();
      this.draw();
    }
  }, {
    key: "update",
    value: function update() {
      this.clock.update();
    }
  }, {
    key: "draw",
    value: function draw() {
      this.clearScreen();
      this.context.fillStyle = '#2d3742';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.waveBoi.draw();
      this.currentTitleDescription.draw();
      this.clock.draw();
    }
  }, {
    key: "recalculate",
    value: function recalculate() {
      this.waveBoi.recalculate();
      this.currentTitleDescription.recalculate();
      this.clock.recalculate();
    }
  }, {
    key: "truncateString",
    value: function truncateString(string, endThing, font, maxLengthInPixels) {
      this.context.font = font;
      var hasTruncated = false;

      while (this.context.measureText(string).width + this.context.measureText(endThing).width > maxLengthInPixels) {
        string = string.substring(0, string.length - 1);
        hasTruncated = true;
      }

      if (hasTruncated) string += endThing;
      return string;
    }
  }, {
    key: "splitString",
    value: function splitString(string, font, maxLengthInPixels) {
      var lines = [];
      var words = string.split(' ');
      var line = '';

      for (var i = 0; i < words.length; i++) {
        var testLine = line + words[i] + ' ';

        if (this.context.measureText(testLine).width > maxLengthInPixels && i > 0) {
          lines.push(line);
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }

      lines.push(line);
      return lines;
    }
  }]);

  return Renderer;
}();

window.addEventListener('load', function () {
  window.titleDB = (0, _titleDB.getTitleDB)();
  setInterval(function () {
    window.renderer.currentTitleDescription.currentTitle++;
  }, 2000);
  window.renderer = new Renderer(document.querySelector('#canvas'));
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WaterBoi =
/*#__PURE__*/
function () {
  function WaterBoi(renderer) {
    _classCallCheck(this, WaterBoi);

    this.renderer = renderer;
    this.x = undefined;
    this.y = undefined;
    this.width = undefined;
    this.height = undefined;
    this.level = undefined;
    this.waves = [new Wave("#7A77EF", this), new Wave("#77B5EF", this), new Wave("#77EFCA", this), new Wave("#758ED1", this), new Wave("#77D8EF", this)];
    this.recalculate();
  }

  _createClass(WaterBoi, [{
    key: "recalculate",
    value: function recalculate() {
      this.width = this.renderer.canvas.width;
      this.height = this.renderer.canvas.height / 2.6;
      this.x = 0;
      this.y = this.renderer.canvas.height - this.height;
      this.level = this.height / 2;
      this.resolution = this.width / 2;

      for (var i = 0; i < this.waves.length; i++) {
        this.waves[i].recalculate();
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      for (var i = 0; i < this.waves.length; i++) {
        this.waves[i].draw();
      }
    }
  }]);

  return WaterBoi;
}();

exports.default = WaterBoi;

var Wave =
/*#__PURE__*/
function () {
  function Wave(fillStyle, manager) {
    _classCallCheck(this, Wave);

    this.manager = manager;
    this.fillStyle = fillStyle;
    this.i = 0;
  }

  _createClass(Wave, [{
    key: "recalculate",
    value: function recalculate() {
      this.offset = this.manager.y / 15 * Math.random();
    }
  }, {
    key: "draw",
    value: function draw() {
      var context = this.manager.renderer.context;
      context.beginPath();
      context.moveTo(0, this.manager.y + this.manager.level);
      var y;

      for (var i = 0; i < this.manager.width; i++) {
        y = Math.sin(i * 0.007 + this.i + this.offset * 15) * this.manager.height / 15 + this.manager.height / 40 - this.offset; //Half assed attempt at cooler waves
        //y = Math.sin(i + this.i * 0.001) * Math.cos(1.5 * i) * this.manager.height / 15 + this.manager.height / 40 - this.offset;;

        context.lineTo(i, this.manager.y + y);
      }

      this.i += this.offset / 1000;
      context.lineTo(this.manager.width, this.manager.y + this.manager.height);
      context.lineTo(0, this.manager.y + this.manager.height);
      context.save();
      context.globalAlpha = 0.25;
      context.fillStyle = this.fillStyle;
      context.closePath();
      context.fill();
      context.restore();
    }
  }]);

  return Wave;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Clock =
/*#__PURE__*/
function () {
  function Clock(renderer) {
    _classCallCheck(this, Clock);

    this.renderer = renderer;
    this.time = new Date();
    this.hour12 = false;
    this.recalculate();
  }

  _createClass(Clock, [{
    key: "update",
    value: function update() {
      this.time = new Date();
      this.hours = this.time.getHours();
      this.minutes = this.time.getMinutes();
      if (this.hour12) this.hours %= 12;else {
        if (this.hours < 10) this.hours = "0" + this.hours.toString();
      }
      if (this.minutes < 10) this.minutes = "0" + this.minutes.toString();
    }
  }, {
    key: "draw",
    value: function draw() {
      var text = this.hours + ":" + this.minutes;
      this.renderer.context.fillStyle = 'white';
      this.renderer.context.font = this.renderer.perw(2.5) + 'px interUI';
      this.renderer.context.textBaseline = 'top';
      this.renderer.context.fillText(text, this.x, this.y, this.width);
    }
  }, {
    key: "recalculate",
    value: function recalculate() {
      this.x = this.renderer.perw(85);
      this.y = this.renderer.perh(5);
      this.width = this.renderer.perw(15);
      this.height = this.renderer.perh(8);
    }
  }]);

  return Clock;
}();

exports.Clock = Clock;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTitleDB = getTitleDB;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TitleDB =
/*#__PURE__*/
function () {
  function TitleDB() {
    _classCallCheck(this, TitleDB);

    this.titles = [];
  }

  _createClass(TitleDB, [{
    key: "addTitle",
    value: function addTitle(title) {
      this.titles.push(title);
    }
  }, {
    key: "getTitle",
    value: function getTitle(index) {
      index %= this.titles.length;
      return this.titles[index];
    }
  }]);

  return TitleDB;
}();

var Title = function Title(name, size, author, version, description, icon) {
  _classCallCheck(this, Title);

  this.name = name;
  this.size = size;
  this.version = version;
  this.author = author;
  this.description = description;
  this.icon = icon;
};

function getTitleDB() {
  var db = new TitleDB();
  var img = new Image();
  img.src = 'gfx/icon.png';
  db.addTitle(new Title("The Homebrew Launcher", "24 MB", "Ayy lmao", "19.02.2018", "A HTML5 mockup of a cool looking Homebrew Launncher layout. This description automatically cuts off and shit and it's really cool :D", img));
  db.addTitle(new Title("Title #2", "64 MB", "hax wen", "1.2.3", "This is a dummy title that's only used to test the UI of this application!", img));
  db.addTitle(new Title("Title #3", "17 MB", "yes", "1.9", "This is a dummy title that's only used to test the UI of this application!", img));
  db.addTitle(new Title("Title #4", "32 MB", "ey ey", "0.1", "This is a dummy title that's only used to test the UI of this application!", img));
  db.addTitle(new Title("Title #5", "36 MB", "mr", "19.02.2018", "This is a dummy title that's only used to test the UI of this application!", img));
  return db;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurrentTitleDescription = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CurrentTitleDescription =
/*#__PURE__*/
function () {
  function CurrentTitleDescription(renderer) {
    _classCallCheck(this, CurrentTitleDescription);

    this.renderer = renderer;
    this.currentTitle = 0;
    this.recalculate();
  }

  _createClass(CurrentTitleDescription, [{
    key: "getCurrentTitle",
    value: function getCurrentTitle() {
      return window.titleDB.getTitle(this.currentTitle);
    }
  }, {
    key: "recalculate",
    value: function recalculate() {
      this.offsetXText = this.renderer.perw(10);
      this.offsetYText = this.renderer.perh(20);
    }
  }, {
    key: "draw",
    value: function draw() {
      var title = this.getCurrentTitle();
      this.renderer.context.fillStyle = 'white';
      this.renderer.context.font = this.renderer.perw(3) + 'px interUI';
      this.renderer.context.textBaseline = 'top';
      this.renderer.context.fillText(this.renderer.truncateString(title.name, "...", this.renderer.context.font, this.renderer.perw(40)), this.offsetXText, this.offsetYText);
      this.renderer.context.fillStyle = 'white';
      this.renderer.context.font = this.renderer.perw(1.5) + 'px interUI';
      this.renderer.context.textBaseline = 'top';
      var lines = this.renderer.splitString(title.description, this.renderer.context.font, this.renderer.perw(40));

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var yOffset = i;

        if (i >= 3) {
          line = line.substr(0, line.length - 1);
          line += '...';
          i = lines.length;
        }

        this.renderer.context.fillText(line, this.offsetXText, this.offsetYText + this.renderer.perh(8) + this.renderer.perh(3) * yOffset);
      }

      this.renderer.context.fillText(this.renderer.truncateString("Author:     " + title.author, "...", this.renderer.context.font, this.renderer.perw(40)), this.offsetXText, this.offsetYText + this.renderer.perh(8) + this.renderer.perh(3) * 6);
      this.renderer.context.fillText(this.renderer.truncateString("Version:   " + title.version, "...", this.renderer.context.font, this.renderer.perw(40)), this.offsetXText, this.offsetYText + this.renderer.perh(8) + this.renderer.perh(3) * 7);
      this.renderer.context.fillText(this.renderer.truncateString("Size:         " + title.size, "...", this.renderer.context.font, this.renderer.perw(40)), this.offsetXText, this.offsetYText + this.renderer.perh(8) + this.renderer.perh(3) * 8);
      this.renderer.context.drawImage(title.icon, this.renderer.perw(65), this.offsetYText);
    }
  }]);

  return CurrentTitleDescription;
}();

exports.CurrentTitleDescription = CurrentTitleDescription;

/***/ })
/******/ ]);