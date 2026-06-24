// JavaScript Document

/* 画像スクロール */
function scrollImg() {
  var mwe = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll',
      _scrl = function (_dir) {
	for (var i = 0; i < imgmax; i++) {
	  var _this = arr_img[i],
	      _classname = _this.getAttribute("class");
          if (_classname === "current") {
	    _dir === "asc" ? _next_img = _this.nextSibling : _next_img = _this.previousSibling;
	    if (_next_img !== null) {
	      var _next_nodename = _next_img.nodeName;
	      if (_next_nodename === 'IMG') {
                // 画像切替
	        _this.setAttribute('class', '');
	        _next_img.setAttribute('class', 'current');
	        _next_img.style.display = '';
	        _this.style.display = 'none';
	        // 画像番号切替
	        var _imgno = _next_img.getAttribute('id').split('img')[1];
	        feedPageNum(_imgno);
		return false;
	      }
	    }
	  }
	}
      },
      _onWheel = function (e) {
        if (!e) e = window.event;     // for Legacy IE
        var _delta = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.wheelDelta);
        if (_delta < 0) {
            e.preventDefault();
            // 下にスクロールした場合の処理
	    _scrl("asc");
	} else if (_delta > 0) {
            e.preventDefault();
            // 上にスクロールした場合の処理
	    _scrl("desc");
        }
      };
  try {
    display_img.addEventListener(mwe, _onWheel, false);
  } catch (e) {
    // for legacy IE
    display_img.attachEvent('onmousewheel', _onWheel);
  }
}
addLoadEvent(scrollImg);
