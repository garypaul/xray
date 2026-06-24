// JavaScript Document

/* style設定 --------------------------------------------------------- */
function styleIndex() {
	if(!document.getElementById) return false;
	//id取得
	var page_title = document.getElementById("page_title");
	var wrapper_2deck = document.getElementById("wrapper_2deck");
	var navi = document.getElementById("navi");
	var navi_index = document.getElementById("navi_index");
	var area_institution_info = document.getElementById("area_institution_info");
	var contents = document.getElementById("contents");
	var caution = document.getElementById("caution");
	//page_title
	with(page_title.style) {
		background = "url(./IHE_PDI/asset/img/bg_page_title.jpg) left top no-repeat";
	}
	//navi
	with(navi.style) {
		fontSize = "100%"
	}
	//navi_index
	with(navi_index.style) {
		margin = "0px";
		padding = "20px 0px 0px 25px";
		borderBottom = "2px solid #ffffff";
	}
	//navi_index内　子ul要素
	var uls_navi_index = navi_index.getElementsByTagName("ul");
	for(var i = 0; i < uls_navi_index.length; i++) {
		with(uls_navi_index[i].style) {
			margin = "0px";
			padding = "15px 0px 0px 15px";
		}
	}
	//navi_index内li要素
	var list_navi = navi.getElementsByTagName("li");
	for(var i = 0; i < list_navi.length; i++) {
		with(list_navi[i].style) {
			listStyle = "none";
			listStyleImage = "none";
			marginBottom = "15px"
		}
	}
		//第1レベルのリストの別指定
		for(var i = 0; i < list_navi.length; i++) {
			if(list_navi[i].className.indexOf("navi_level1") == -1) continue;
			with(list_navi[i].style) {
				listStyleImage = "url(./IHE_PDI/asset/img/linehead_navi_index.gif)";
			}
		}
	// area_insitution_info
	with(area_institution_info.style) {
		padding = "15px";
	}
	//area_insitution_info　施設名タイトルh2タグ
	var h2_inst_info = area_institution_info.getElementsByTagName("h2");
	for(var i =0; i < h2_inst_info.length; i++) {
		if(!h2_inst_info) continue;//設定ファイルで設定可能なので、タグがない場合にエラー回避
		with(h2_inst_info[i].style) {
			fontSize = "100%";
		}
	}
	//area_insitution_info　施設情報addressタグ
	var address_inst_info = area_institution_info.getElementsByTagName("address");
	for(var i = 0; i < address_inst_info.length; i++) {
		if(!address_inst_info) continue; //設定ファイルで設定可能なので、タグがない場合にエラー回避
		with(address_inst_info[i].style) {
			fontSize = "82.15%";
			fontStyle = "normal";
		}
	}
	//area_insitution_info　施設情報spanタグ フォントサイズを小さくする
	var small_font = area_institution_info.getElementsByTagName("span");
	for(var i = 0; i < small_font.length; i++) {
		if(!small_font) continue; //設定ファイルで設定可能なので、タグがない場合にエラー回避
		with(small_font[i].style) {
			fontSize = "0.8em";
		}
	}
	//wrapper_2deck
	with(wrapper_2deck.style) {
		background = "url(./IHE_PDI/asset/img/bg_navi.gif) left top repeat-y";
	}
	//クラスarea_entry
	var area_entry = contents.getElementsByTagName("div");
	for(var i = 0; i < area_entry.length; i++) {
		if(area_entry[i].className.indexOf("area_entry") == -1) continue;
		with(area_entry[i].style) {
			padding = "20px 10px";
		}
	}
	//contents h3タグ
	var h3s_contents = contents.getElementsByTagName("h3");
	for(var i = 0; i < h3s_contents.length; i++) {
		with(h3s_contents[i].style) {
			margin = "0px 0px 40px";
			fontSize = "1.2em";
			fontWeight = "normal";
		}
	}
	//caution
	with(caution.style) {
		margin = "30px 0px";
		padding = "8px";
		border = "2px solid #9a9a9a";
	}
	//contents h4タグ
	var h4s_contents = contents.getElementsByTagName("h4");
	for(var i = 0; i < h4s_contents.length; i++) {
		with(h4s_contents[i].style) {
			margin ="0 0 8px";
			fontSize = "1.1em";
			fontWeight = "normal";
			lineHeight = "30px";
		}
		//caution h4タグ内imgタグ
		var elem_img_h4s = h4s_contents[i].getElementsByTagName("img");
		for(var j = 0; j < elem_img_h4s.length; j++) {
			with(elem_img_h4s[j].style) {
				margin = "0px 10px 0px 0px";
				verticalAlign = "middle";
			}
		}
	}
	//caution pタグ
	var ps_caution = caution.getElementsByTagName("p");
	for(var i = 0; i < ps_caution.length; i++) {
		with(ps_caution[i].style) {
			margin = "0px 0px 8px 40px";
		}
	}
	/* contents tableタグのスタイル */
	var tables = contents.getElementsByTagName("table");
	for(var i =0; i < tables.length; i++) {
		with(tables[i].style) {
			if(ie55 == true || ie6 == true) {
				fontSize = "81.25%";//フォントサイズが継承されないのを回避
			}
		}
	}
	//動作環境
	var pc_rqd = document.getElementById("pc_rqd");
	var ths = pc_rqd.getElementsByTagName("th");
	for(var i = 0; i < ths.length; i++) {
		with(ths[i].style) {
			padding = "2px 10px 2px 2px";
			fontWeight = "normal";
			textAlign = "left";
		}
	}
}
addLoadEvent(styleIndex);

/* 表示初期設定 --------------------------------------------------------- */
function defaultDisplay() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	//右段初期表示
	var contents = document.getElementById("contents");
	var divs = contents.getElementsByTagName("div");
	for( var i = 0; i < divs.length; i++) {
		with(divs[i]) {
			style.display = "none";
		}
	}
	var about = document.getElementById("about");
	about.style.display = "block";
	var caution = document.getElementById("caution");
	caution.style.display = "block";
	//カレント初期表示
	var navi_about = document.getElementById("navi_about");
	with(navi_about) {
		style.color = navi_current_color;
		className = "current page_inside";
	}
}
addLoadEvent(defaultDisplay);