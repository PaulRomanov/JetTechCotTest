(function (window) {
  'use strict';

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }

  var winsize = {
    width: window.innerWidth, height: window.innerHeight
  }, bubbles = {
    canvas: null,
    ctx: null,
    mousex: winsize.width - 30,
    mousey: winsize.height - 30,
    cntr: 0,
    circleArr: new Array(),
    requestTd: undefined,
    init: function () {
      this.canvas = document.getElementById('bubbles');
      if (!this.canvas) {
        return;
      }
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = document.getElementById('index_by').offsetWidth;
      this.canvas.height = document.getElementById('index_by').offsetHeight;
      var self = this;
      this.debounceResize = debounce(function () {
        winsize = {
          width: window.innerWidth, height: window.innerHeight
        };
        if (document.getElementById('index_by')) {
          self.canvas.height = document.getElementById('index_by').offsetWidth;
          self.canvas.width = document.getElementById('index_by').offsetHeight;
        }
      }, 10);
      window.addEventListener('resize', this.debounceResize);
    },
    loop: function () {
      this.requestId = requestAnimationFrame(bubbles.loop.bind(this));
      this.update();
      this.render();
    },
    update: function () {
      if (this.cntr++ % 1 == 0) {
        this.createCircle();
      }
      for (var circle in this.circleArr) {
        circle = this.circleArr[circle];
        var max = 2, min = -2;
        if (this.mousex <= winsize.width / 2 - winsize.width * 0.1) {
          min = -4;
        } else if (this.mousex >= winsize.width / 2 + winsize.width * 0.1) {
          max = 4;
        }
        circle.x += Math.floor(Math.random() * (max - min + 1)) + min;
        circle.y -= Math.random() * 15;
      }
      while (this.circleArr.length > 2 && (this.circleArr[0].x + this.circleArr[0].s > winsize.width || this.circleArr[0].x + this.circleArr[0].s < 0 || this.circleArr[0].y + this.circleArr[0].s > winsize.height || this.circleArr[0].y + this.circleArr[0].s < 0)) {
        this.circleArr.shift();
      }
    },
    render: function () {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var circle in this.circleArr) {
          var current = this.circleArr[circle];
          this.drawCircle(current.x, current.y, current.s);
        }
      }
    },
    createCircle: function () {
      var temp = this.circleArr[this.circleArr.length - 1];
      this.circleArr[this.circleArr.length] = {
        x: this.mousex, y: this.mousey, s: Math.random() * winsize.height / 50
      };
    },
    drawCircle: function (x, y, radius) {
      if (this.ctx) {
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        this.ctx.fill();
      }
    },
    start: function () {
      if (!this.requestId) {
        document.onmousemove = this.getMouseCoordinates.bind(this);
        this.loop();
      }
    },
    stop: function () {
      if (this.requestId) {
        window.canclelAnimationFrame(this.requestId);
        this.requestId = undefined;
        document.onmousemove = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    },
    getMouseCoordinates: function (ev) {
      var ev = ev || window.event;
      this.mousex = ev.pageX;
      this.mousey = ev.pageY;
    }
  };
  setTimeout(function () {
    bubbles.init();
    bubbles.start();
  },1000)
})(window);
