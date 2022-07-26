(function (window) {
  // 使用构造函数方法 声明一个Modal对象
  var Modal = function (ele) {
    this.$el = ele;
    this.init();
  }
  // 在Modal的原型上实现close，open，init方法，实现方法的复用
  Modal.prototype.close = function () {
    // this.$el.style.display='none';
    this.$el.setAttribute('class', 'mc-modal');
    var self = this;
    setTimeout(function () {
      self.options.confirm = new Function();
      self.options.cancel = new Function();
    });
  }
  Modal.prototype.open = function (config) {
    // dialog--close dialog--open
    var defaultConfig = {
      message: '请充值后再进行游戏',
      confirmShow: true,
      confirmTxt: '是',
      cancelShow: true,
      cancelTxt: '否',
      className: 'dialog--open'
    }
    var finalConfig = Object.assign({}, defaultConfig, config);
    // 重置按钮状态
    this.$el.querySelector('.btn-ok').style.display = 'inline-block';
    this.$el.querySelector('.btn-close').style.display = 'inline-block';
    // 弹框的内容
    this.$el.className += ' ' + finalConfig.className;
    // this.$el.style.display='block';
    this.$el.querySelector('.modal-content').innerHTML = finalConfig.message;
    // 弹框的按钮
    if (!finalConfig.confirmShow) {
      this.$el.querySelector('.btn-ok').style.display = 'none';
    } else {
      this.$el.querySelector('.btn-ok').innerHTML = finalConfig.confirmTxt;
    }
    if (!finalConfig.cancelShow) {
      this.$el.querySelector('.btn-close').style.display = 'none';
    } else {
      this.$el.querySelector('.btn-close').innerHTML = finalConfig.cancelTxt;
    }
  }
  Modal.prototype.options = {
    confirm: function () {
    },
    cancel: function () {
    }
  }
  Modal.prototype.init = function () {
    var self = this;
    // 绑定关闭按钮点击事件处理函数，检索所有 带 .close类名 的按钮
    if (this.$el.addEventListener) {
      this.$el.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target;
        var classNames = target.className.split(' ');
        if (classNames.indexOf('close') !== -1) {
          self.options.cancel();
          self.close();
        }
        if (classNames.indexOf('btn-ok') !== -1) {
          self.options.confirm();
          self.close();
        }
      }, false);
    } else if (this.$el.attachEvent) {
      this.$el.attachEvent('onclick', function (e) {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
        var target = e.target || e.srcElement;
        var classNames = target.className.split(' ');
        if (classNames.indexOf('close') !== -1) {
          self.close();
          self.options.cancel();
        }
        if (classNames.indexOf('btn-ok') !== -1) {
          self.options.confirm();
          self.close();
        }
      });
    }
  }
  window.Modal = Modal;
})(window);
var modal = new Modal(document.getElementById('mc-modal'));
// 应用实例
// function openModal () {
//     modal.open({
//         message:'请充值后再进行游戏',
//         confirmShow:true,
//         confirmTxt:'确认',
//         cancelShow:true,
//         cancelTxt:'取消'
//     });
// }
//    modal.options.confirm=function(){
//     //    window.open('http://google.com')
//    }
//    modal.options.cancel=function(){
//     // window.open('http://www.baidu.com');
// }
