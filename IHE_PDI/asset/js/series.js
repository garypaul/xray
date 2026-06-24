// JavaScript Document

/* 共通スタイル */
function styleSeries() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	//id取得
	var page_title = document.getElementById("page_title");
	var wrapper_2deck = document.getElementById("wrapper_2deck");
	var navi = document.getElementById("navi");
	var contents = document.getElementById("contents");
	var header = document.getElementById("header");
	var btn_close_header = document.getElementById("btn_close_header");
	var display_img = document.getElementById("display_img");
	var pageno = document.getElementById("pageno");
	var buttons_img_ctrl = document.getElementById("buttons_img_ctrl");
	var explain_img_ctrl = document.getElementById("explain_img_ctrl");
	var area_btn_close = document.getElementById("area_btn_close");
	var area_thumbnail = document.getElementById("area_thumbnail");
	//page_title
	with(page_title.style) {
		background = "url(../../../asset/img/bg_page_title.jpg) left top no-repeat";
	}
	// wrapper_2deck	
	with(wrapper_2deck.style) {
		background = "url(../../../asset/img/bg_navi.gif) left top repeat-y";
	}
	// navi tableタグ
	var tables = navi.getElementsByTagName("table");
	with(tables[0].style) {
		margin = "20px 15px 0px";
		fontSize = "81.25%";
	}
	// navi thタグ
	var ths = navi.getElementsByTagName("th");
	for(var i = 0; i < ths.length; i++) {
		with(ths[i].style) {
			margin = "0px";
			padding = "0px 12px 18px 0px";
			borderRight = "1px solid #fff";
			fontWeight = "normal";
			textAlign = "left";
		}
	}
	// navi tdタグ
	var tds = navi.getElementsByTagName("td");
	for(var i = 0; i < tds.length; i++) {
		with(tds[i].style) {
			margin = "0px";
			padding = "0px 8px 18px 8px";
		}
	}
	// contents
	with(contents.style) {
		if(ie55 == true || ie6 == true) {
			textAlign = "center";
		}
	}
	// header
	with(header.style) {
		position = "relative";
	}
	//画像表示枠
	with(display_img.style) {
		margin = "0px 0px 15px";
		textAlign = "center";
	}
	//ページ番号
	with(pageno.style) {
		textAlign = "center";
	}
	//画像送りボタン
	with(buttons_img_ctrl.style) {
		margin = "0px 0px 16px";
		textAlign = "center";
	}
	var btns = buttons_img_ctrl.getElementsByTagName("input");
	for(var i = 0; i < btns.length; i++) {
		with(btns[i].style) {
			width = "80px";
		}
	}
	//説明文
	with(explain_img_ctrl.style) {
		width = "512px"
		margin = "0px auto 34px";
		if(ie55 == true || ie6 == true) {
			textAlign = "left";
		}
	}
	// 閉じるボタン ヘッダー
	with(btn_close_header.style) {
		position = "absolute";
		top = "16px";
		right = "22px";
		width = "17px";
		height = "16px";
		margin = "0px";
		padding = "0px";
		lineHeight = "16px";
	}
	var img_btn_close_header = btn_close_header.firstChild;
	with(img_btn_close_header) {
		style.verticalAlign = "top";
		if(ie55 == true) {
			style.cursor = "hand";//for ie5.5
		} else {
			style.cursor = "pointer";
		}
		onclick = function() {
			window.close();
			return false;
		}
		onmouseover = function() {
			this.src = "../../../asset/img/btn_close_header_over.gif";
		}
		onmouseout = function() {
			this.src = "../../../asset/img/btn_close_header.gif";
		}
	}
	
	// 閉じるボタン 下部
	with(area_btn_close) {
		//style.width = "512px";
		style.margin = "0px auto 0px";
		style.textAlign = "right";
	}
	var btn_close = area_btn_close.getElementsByTagName("img");
	with(btn_close[0]) {
		if(ie55 == true) {
			style.cursor = "hand";//for ie5.5
		} else {
			style.cursor = "pointer";
		}
		onclick = function() {
			window.close();
			return false;
		}
		onmouseover = function() {
			src = "../../../asset/img/btn_close_over.gif";
		}
		onmouseout = function() {
			src = "../../../asset/img/btn_close.gif";
		}
	}
}
addLoadEvent(styleSeries);

/* 画像切り替え */
function imgTransition(num) {
  // 元の画像を非表示
  var current_num = parseInt(pageno.firstChild.nodeValue.split(' / ')[0]),
      current_img = arr_img[current_num - 1];
  current_img.setAttribute('class', '');
  current_img.style.display = 'none';
  // 表示画像
  if (num == 0){
    imgcnt = 1;
    var _first_img = arr_img[0];
    _first_img.setAttribute('class', 'current');
    _first_img.style.display = '';
  } else {
    imgcnt = current_num + num;
    if (imgcnt <= 0){
      imgcnt = 1;
    }
    if (imgcnt >= imgmax) {
      imgcnt = imgmax;
    }
    var _new_img = arr_img[imgcnt - 1];
    _new_img.setAttribute('class', 'current');
    _new_img.style.display = '';
  }
  // 画像番号セット
  feedPageNum(imgcnt);
}

/* 画像番号切替 */
function feedPageNum(num) {
  var org_para = pageno.firstChild,
      para = document.createTextNode(num + ' / ' + imgmax);
  pageno.replaceChild(para, org_para);
}

/* 画像送りonclick設定 */
function buttonClick() {
	if(!document.getElementById) return false;
	var buttons_img_ctrl = document.getElementById("buttons_img_ctrl");
	var btns = buttons_img_ctrl.getElementsByTagName("input");
	for(var i =0; i < btns.length; i++) {
		btns[0].onclick = function() {
			//imgmove(0);
			imgTransition(0);
			return false;
		}
		btns[1].onclick = function() {
			//imgmove(-10);
			imgTransition(-10);
			return false;
		}
		btns[2].onclick = function() {
			//imgmove(-1);
			imgTransition(-1);
			return false;
		}
		btns[3].onclick = function() {
			//imgmove(1);
			imgTransition(1);
			return false;
		}
		btns[4].onclick = function() {
			//imgmove(10);
			imgTransition(10);
			return false;
		}
		btns[5].onclick = function() {
			//imgmove(imgmax);
			imgTransition(imgmax);
			return false;
		}
	}
}
addLoadEvent(buttonClick);
