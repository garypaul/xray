// JavaScript Document

/* 機能系 --------------------------------------------------------- */

/* addLoadEvent */

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
		} else {
			window.onload = function() {
			oldonload();
			func();
		}
	}
}

/* 次の要素ノード取得 getNextElement */
function getNextElement(node) {
	if(node.nodeType == 1) {
		return node;
	}
	if(node.nextSibling) {
		return getNextElement(node.nextSibling);
	}
	return null;
}

/* 前の要素ノード取得 getPreviousElement */
function getPreviousElement(node) {
	if(node.nodeType == 1) {
		return node;
	}
	if(node.previousSibling) {
		return getPreviousElement(node.previousSibling);
	}
	return null;
}

/* 後にノードを追加する */
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

/* 別ウィンドウを開く */
function openWin(target_url) {
	window.open(target_url);
}

/* 足りない桁数を0で埋めた数値文字列を作る */
function formatNum(keta, num) {
	var src = new String(num);
	var cnt = keta - src.length;
	if(cnt <= 0)  return src;
	while (cnt-- > 0) src = "0" + src;
	return src;
}

/* IEバージョンチェック */
msie = false;
ie55 = false;
ie6 = false;
ie7 = false;
function searchIEver() {
	if(navigator.appName == "Microsoft Internet Explorer") {
		msie = true;
		if(navigator.appVersion.indexOf("5.5") != -1) {
			ie55 = true;
		} else if(navigator.appVersion.indexOf("6.0") != -1) {
			ie6 = true;
		} else if(navigator.appVersion.indexOf("7.0") != -1) {
			ie7 = true;
		}
	}
}
searchIEver();

/* 患者情報生成 --------------------------------------------------------- */
function Series(modality, instanceUID, number, imageCount) {
	this.modality = modality;
	this.instanceUID = instanceUID;
	this.number = number;
	this.imageCount = imageCount;
}

function Study(date, time, description, instanceUID, id, accession, seriesList, count) {
	this.date = date;
	this.time = time;
	this.description = description;
	this.instanceUID = instanceUID;
	this.id = id;
	this.accession = accession;
	this.seriesList = seriesList;
	this.count = count;
}

function Patient(name, id, sex, birthdate, studyList, count) {
	this.name = name;
	this.id = id;
	this.sex = sex;
	this.birthdate = birthdate;
	this.studyList = studyList;
	this.count = count;
}

/* 装飾系 --------------------------------------------------------- */

/* カラー設定 */
normal_color = "#545454";//地の文
normal_color_light = "#8c8c8c";//地の文 少し薄いグレー
navi_link_color = "#3e6a91";//ナビゲーション　リンク
navi_current_color = "#0c284e";//ナビゲーション　カレント
navi_rollover_color = "#00b8d3";//ナビゲーション　ロールオーバー
contents_link_color = "#a05241";//コンテンツ　リンク

/* 共通スタイル */
function styleCommon() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	//idの取得
	var container = document.getElementById("container");
	var header = document.getElementById("header");
	var page_title = document.getElementById("page_title");
	var wrapper_2deck = document.getElementById("wrapper_2deck");
	var navi = document.getElementById("navi");
	var contents = document.getElementById("contents");
	var footer = document.getElementById("footer");
	//ieバージョンチェック
	//searchIEver();
	//bodyタグ
	var elem_body = document.getElementsByTagName("body");
	with(elem_body[0].style) {
		if(ie55 == true || ie6 == true) {// ie5.5とie6はメイリオだと可読性が落ちる
			fontFamily = "Arial,Helvetica,sans-serif, 'MS　Pゴシック','MS P Gothic'";
		} else {
			fontFamily = "'メイリオ','Meiryo',Osaka,'ヒラギノ角ゴ Pro W3','MS　Pゴシック','MS P Gothic',Arial,Helvetica,sans-serif";
		}
	}
	//imgタグ初期化
	var elem_img = document.getElementsByTagName("img");
	for(var i = 0; i < elem_img.length; i++) {
		with(elem_img[i].style) {
			verticalAlign = "bottom";
		}
	}
	//container
	with(container.style) {
		width = "874px";
		margin = "0 auto";
		if(ie55 == true || ie6 == true || ie7 == true) {
			textAlign = "left";
		}
	}
	//header
	with(header.style) {
		background = "#014075";
	}
	//page tilte
	with(page_title.style) {
		height = "48px";
		padding = "0px 0px 0px 8px"; 
		color = "#ffffff";
		fontSize = "22px";
		fontWeight = "normal";
		lineHeight = "48px";
	}
	//navi	
	with(navi.style) {
		cssFloat = "left";
		styleFloat = "left";// for IE
		width = "240px";
		color = normal_color;
		fontSize = "100%";
	}
	//contents
	with(contents.style) {
		cssFloat = "right";
		styleFloat = "right" //for IE
		color = normal_color;
		fontSize = "81.25%";
	}
	if(ie55 == true) {
		contents.style.width = "580px";
	} else if (ie6 == true) {
		contents.style.width = "610px";
	} else {
		contents.style.width = "630px";
	}
	//contents pタグ
	var ps_contents = contents.getElementsByTagName("p");
	for(var i = 0; i < ps_contents.length; i++) {
		with(ps_contents[i].style) {
			margin = "0px 0px 8px";
			lineHeight = "1.5";
		}
	}
	//contents liタグ
	var lis_contents = contents.getElementsByTagName("li");
	for(var i = 0; i < lis_contents.length; i++) {
		with(lis_contents[i].style) {
			margin = "0px 0px 8px";
			lineHeight = "1.5";
		}
	}
	//contents ddタグ
	var dds_contents = contents.getElementsByTagName("dd");
	for(var i = 0; i < dds_contents.length; i++) {
		with(dds_contents[i].style) {
			margin = "0px 0px 8px";
			color = normal_color;
			lineHeight = "1.5";
		}
	}
	//footer
	with(footer.style) {
		clear = "both";
		borderTop = "2px solid #6c6c6c";
		color = normal_color;
		fontSize = "76%";
		textAlign = "center";
	}
	//footer内addressタグ
	var elem_address = footer.getElementsByTagName("address");
	with(elem_address[0].style) {
		padding = "15px 0px 0px";
		fontStyle = "normal";
	}
	/* wrapper_2deck */
	with(wrapper_2deck.style) {
		margin = "0px 0px 20px";
		if(ie55 == true || ie6 == true || ie7 == true) {
			zoom = "1";
		}
	}
}
addLoadEvent(styleCommon);

/* ナビゲーション リンク スタイル設定 */
function styleNaviLinks() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var navi = document.getElementById("navi");
	var navi_links = navi.getElementsByTagName("a");
	for(var i = 0; i < navi_links.length; i++) {
		with(navi_links[i].style) {
			color = navi_link_color;
			textDecoration = "none";
		}
		var org_color = navi_links[i].style.color;
		navi_links[i].onmouseover = function() {
			this.style.color = navi_rollover_color;
		}
		if(navi_links[i].className.indexOf("page_inside") != -1) {
			navi_links[i].onmouseout = function() {
				if(this.className.indexOf("current") != -1) {
					this.style.color = navi_current_color;
				} else {
					this.style.color = navi_link_color;
				}
			}	
		} else {
			navi_links[i].onmouseout = function() {
				this.style.color = navi_link_color;
			}
		}
	}
}
addLoadEvent(styleNaviLinks);

/* コンテンツ リンク スタイル設定 */
function styleContentsLinks() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var contents = document.getElementById("contents");
	var contents_links = contents.getElementsByTagName("a");
	for(var i = 0; i < contents_links.length; i++) {
		var hrefs = contents_links[i].getAttribute("href");
		if(hrefs == null || hrefs == "") continue;//hrefの有無を調べ、なければ以下の処理を続行。ieは""を返す
		with(contents_links[i].style) {
			color = contents_link_color;
			textDecoration = "none";
		}
		contents_links[i].onmouseover = function() {
			with(this) {
				style.textDecoration = "underline";
			}
		}
		contents_links[i].onmouseout = function() {
			with(this) {
				style.textDecoration = "none";
			}
		}
	}
}
addLoadEvent(styleContentsLinks);