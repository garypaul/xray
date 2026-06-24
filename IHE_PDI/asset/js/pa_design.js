// JavaScript Document

/* 装飾 --------------------------------------------------------- */

/* style設定 */
function stylePatient() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	//id取得
	var page_title = document.getElementById("page_title");
	var wrapper_2deck = document.getElementById("wrapper_2deck");
	var navi = document.getElementById("navi");
	var title_patient_info = document.getElementById("title_patient_info");
	var navi_patient_info = document.getElementById("navi_patient_info");
	var link_index_top = document.getElementById("link_index_top");
	var contents = document.getElementById("contents");
	var table_patient_info = document.getElementById("table_patient_info");
	var table_study_info = document.getElementById("table_study_info");
	//page_title
	with(page_title.style) {
		background = "url(./asset/img/bg_page_title.jpg) left top no-repeat";
	}
	//wrapper_2deck
	with(wrapper_2deck.style) {
		background = "url(./asset/img/bg_navi.gif) left top repeat-y";
	}
	//title_patient_info h1タグ 
	with(title_patient_info.style) {
		margin = "20px 0px 25px 15px";
		fontSize = "1.1em";
		fontWeight = "normal";
	}
	//navi_patient_info
	with(navi_patient_info.style) {
		margin = "0px 0px 56px";
		padding = "0px 0px 0px 15px";
	}
	/* navi h2タグのスタイル */
	var h2s_navi = navi.getElementsByTagName("h2");
	for(var i = 0; i < h2s_navi.length; i++) {
		with(h2s_navi[i].style) {
			fontSize = "1em";
			fontWeight = "normal";
		}
		var links_h2s_navi = h2s_navi[i].getElementsByTagName("a");
		with(links_h2s_navi[0].style) {
			padding = "0px 0px 0px 16px";
			background = "url(./asset/img/marker_arrow_close.gif) left 4px no-repeat";
		}
	}
	/* navi h3タグのスタイル */
	var h3s_navi = navi.getElementsByTagName("h3");
	for(var i = 0; i < h3s_navi.length; i++) {
		with(h3s_navi[i].style) {
			margin = "0px 0px 12px";
			fontSize = "1em";
			fontWeight = "normal";
		}
		var links_h3s_navi = h3s_navi[i].getElementsByTagName("a");
		with(links_h3s_navi[0].style) {
			margin = "0px 0px 0px 30px";
			padding = "0px 0px 0px 16px";
			background = "url(./asset/img/marker_arrow_close.gif) left 4px no-repeat";
		}
	}
	/* navi ulタグのスタイル */
	var uls_navi = navi.getElementsByTagName("ul");
	for(var i = 0; i < uls_navi.length; i++) {
		with(uls_navi[i].style) {
			listStyle = "none";
			margin = "0px 0px 16px 45px";
			padding = "0px";
		}
	}
	
	/* navi INDEX.HTMへのリンク */
	with(link_index_top.style) {
		margin = "0px 0px 30px 15px";
	}
	var links = link_index_top.firstChild;
	with(links.style) {
		padding = "0px 0px 0px 16px";
		if(ie55 == true || ie6 == true) {
			background = "url(./asset/img/linehead_link_navi.gif) left 3px no-repeat";
		} else {
			background = "url(./asset/img/linehead_link_navi.gif) left 5px no-repeat";
		}
		if(msie == true) {
			zoom = "1";
		}
	}
	links.onmouseover = function() {
		if(ie55 == true || ie6 == true) {
			links.style.background = "url(./asset/img/linehead_link_navi_over.gif) left 3px no-repeat";
		} else {
			links.style.background = "url(./asset/img/linehead_link_navi_over.gif) left 5px no-repeat";
		}
		links.style.color = navi_rollover_color;
	}
	links.onmouseout = function() {
		if(ie55 == true || ie6 == true) {
			links.style.background = "url(./asset/img/linehead_link_navi.gif) left 3px no-repeat";
		} else {
			links.style.background = "url(./asset/img/linehead_link_navi.gif) left 5px no-repeat";
		}
		links.style.color = navi_link_color;
	}
	/* contents table_patient_info */
	with(table_patient_info.style) {
		padding = "20px 10px";
	}
	/* contents table_study_info */
	with(table_study_info.style) {
		padding = "20px 10px";
	}
	/* contents tableタグのスタイル */
	var tables = contents.getElementsByTagName("table");
	for(var i =0; i < tables.length; i++) {
		with(tables[i].style) {
			width = "100%";
			margin = "0px 0px 36px";
			if(ie55 == true || ie6 == true) {
				fontSize = "93.75%";//フォントサイズが継承されないのを回避。サイズは15px相当。
			}
		}
	}
	/* contents captionタグのスタイル */
	var captions = contents.getElementsByTagName("caption");
	for(var i = 0; i < captions.length; i++) {
		with(captions[i].style) {
			padding = "0px 0px 0px 3px";
			textAlign = "left";
		}
	}

	/* trタグのスタイル */
	var trs = contents.getElementsByTagName("tr");
	var odd = true;
	for(var i = 0; i < trs.length; i++) {
		if(odd == true) {
			trs[i].style.background = "#f0f0f0";
			odd = false;
		} else {
			odd = true;
		}
	}
	/* thタグのスタイル */
	var ths = contents.getElementsByTagName("th");
	for (var i=0; i<ths.length; i++) {
		with(ths[i].style) {
			background = "#424242";
			color = "#fff"
			fontWeight = "normal";
			if(i == 0 || i == 1) {
				borderLeft = "none";
			}
			if(ie7 == true) {
				textAlign = "center";
			}
		}
	}
	/* tdタグのスタイル */
	var tds = contents.getElementsByTagName("td");
	for(var i = 0; i < tds.length; i++) {
		with(tds[i].style) {
			textAlign = "center";
		}
	}
	/* 患者情報一覧のテーブル */
	var trs_table_pa = table_patient_info.getElementsByTagName("tr");
	for(var i = 0; i < trs_table_pa.length; i++) {
		var trs_child = trs_table_pa[i].childNodes;
		with(trs_child[2].style) {
			paddingLeft = "5px";
			textAlign = "left";
		}
	}
	//ヘッダーのみセンター寄せ
	var ths_table_pa = table_patient_info.getElementsByTagName("th");
	ths_table_pa[2].style.textAlign = "center";
	/* シリーズのtable */
	var divs_table_se = table_study_info.getElementsByTagName("div");
	for(var i = 0; i < divs_table_se.length; i++) {
		if(divs_table_se[i].className.indexOf("wrapper_tables_series") == -1) continue;
		var table_se = divs_table_se[i].getElementsByTagName("table");
		for(var j = 0; j < table_se.length; j++) {
			with(table_se[j].style) {
				borderCollapse = "collapse";
			}
		}
		var trs_table_se = divs_table_se[i].getElementsByTagName("tr");
		for(var j = 0; j < trs_table_se.length; j++) {
			var trs_child = trs_table_se[j].childNodes;
			for(var k = 0; k < trs_child.length; k++) {
				with(trs_child[k].style) {
					borderLeft = "2px solid #fff";
					if(k == 0 || k == 1) {
						borderLeft = "none";
					}
				}
			}
		}
	}
	/* thumbnailのスタイル */
	var thumbnail = table_study_info.getElementsByTagName("img");
	for(var i = 0; i < thumbnail.length; i++) {
		with(thumbnail[i].style) {
			border = "none";
			verticalAlign = "bottom";
		}
	}
	
}
addLoadEvent(stylePatient);

/* 行頭矢印の開閉 */
function setArrow(id) {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var navi = document.getElementById("navi");
	var links = navi.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++) {
		var hrefs = links[i].getAttribute("href").split("#table_pa")[1];
		var parent_node = links[i].parentNode;
		var parent_name = parent_node.nodeName;
		if(parent_name == "H1") {
			var h2s = navi.getElementsByTagName("h2");
			for(var j = 0; j < h2s.length; j++) {
				var links_h2s = h2s[j].firstChild;
				links_h2s.style.background = "url(./asset/img/marker_arrow_close.gif) left 4px no-repeat";
			}
		}
		if(parent_name == "H2") {
			var granpa_node = parent_node.parentNode;
			var next_elem = granpa_node.getElementsByTagName("div");
			for(var j = 0; j < next_elem.length; j++) {
				if(next_elem[j].className.indexOf("navi_study_info") == -1) continue;
				if(id == hrefs && next_elem[id].style.display == "block") {
					links[i].style.background = "url(./asset/img/marker_arrow_open.gif) left 4px no-repeat";
				} else {
					links[i].style.background = "url(./asset/img/marker_arrow_close.gif) left 4px no-repeat";
				}
			}
		} else if(parent_name == "H3") {
			var next_elem = parent_node.nextSibling;//ulタグを取得
			var uls_id = next_elem.getAttribute("id").split("navi_series_info_")[1];
			//直前のh2タグのaタグを取得
			var links_parent = next_elem.parentNode.previousSibling.firstChild;
			if(id == uls_id && next_elem.style.display == "block") {
				links[i].style.background = "url(./asset/img/marker_arrow_open.gif) left 4px no-repeat";
				//h2タグのaタグの矢印制御
				links_parent.style.background = "url(./asset/img/marker_arrow_open.gif) left 4px no-repeat";
			} else if(id == uls_id && next_elem.style.display == "none")  {
				links[i].style.background = "url(./asset/img/marker_arrow_close.gif) left 4px no-repeat";
				//h2タグのaタグの矢印制御
				links_parent.style.background = "url(./asset/img/marker_arrow_open.gif) left 4px no-repeat";
			} else {
				links[i].style.background = "url(./asset/img/marker_arrow_close.gif) left 4px no-repeat";
			}
		}
	}
}