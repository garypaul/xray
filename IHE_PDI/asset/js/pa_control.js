// JavaScript Document
/* 構造生成 --------------------------------------------------------- */
/* ナビゲーション　患者名 */
function makeNaviPa() {
	if(!document.getElementById) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	var navi_patient_info = document.getElementById("navi_patient_info");
	for(var i = 0; i < patientList.length; i++) {
		//要素を生成
		var h2s = document.createElement("h2");
		var links_h2s = document.createElement("a");
		var txt_h2s = document.createTextNode(patientList[i].name+"様");
		//aタグのhref属性を生成
		var hrefs_links_h2s = new Array();
		hrefs_links_h2s[0] = "#table_pa";
		hrefs_links_h2s[1] = i;
		var url_links_h2s = hrefs_links_h2s.join("");
		links_h2s.setAttribute("href",url_links_h2s);
		//aタグのクラス名を設定
		links_h2s.className = "page_inside";
		//要素を結合
		links_h2s.appendChild(txt_h2s);
		h2s.appendChild(links_h2s);
		//ページに追加
		navi_patient_info.appendChild(h2s);
	}
}
addLoadEvent(makeNaviPa);

/* ナビゲーション 検査番号、シリーズ番号 */

function makeNaviSt() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	var navi_patient_info = document.getElementById("navi_patient_info");
	var h2s = navi_patient_info.getElementsByTagName("h2");
	//h2の後にdivタグ追加
	for(var i = 0; i < patientList.length; i++) {
		var navi_study_info = document.createElement("div");
		navi_study_info.className = "navi_study_info";
		insertAfter(navi_study_info, h2s[i]);
	}
	//h3タグを追加
	var navi_study_info = navi_patient_info.getElementsByTagName("div");
	for(var i =0; i < navi_study_info.length; i++) {
		for(var j = 0; j < patientList[i].count; j++) {
			//要素を生成
			var h3s = document.createElement("h3");
			var links_h3s = document.createElement("a");
			//テキストノード生成
			var study_num = formatNum(3, j+1);
			var array_study_name = new Array();
			array_study_name[0] = "検査";
			array_study_name[1] = study_num;
			var study_name = array_study_name.join("");
			var txt_h3s = document.createTextNode(study_name);
			//aタグの属性設定
			var hrefs_links_h3s = new Array();
			hrefs_links_h3s[0] = "#table_pa";
			hrefs_links_h3s[1] = i;
			hrefs_links_h3s[2] = "_st";
			hrefs_links_h3s[3] = j;
			var url_links_h3s = hrefs_links_h3s.join("");
			links_h3s.setAttribute("href", url_links_h3s);
			links_h3s.className = "page_inside";
			//要素を結合
			links_h3s.appendChild(txt_h3s);
			h3s.appendChild(links_h3s);
			//ページに追加
			navi_study_info[i].appendChild(h3s);
			//患者の番号を変数に代入
			var pa_num = hrefs_links_h3s[1] -0 +1;
			//検査の番号を変数に代入
			var st_num = hrefs_links_h3s[3] -0 +1;
			//ulタグを生成
			var uls = document.createElement("ul");
			//liタグを生成するループを開始
			for(var k = 0; k < patientList[i].studyList[j].count; k++) {
				//liタグを生成
				var lis = document.createElement("li");
				//aタグを生成
				var links_lis = document.createElement("a");
				//seriesURL()を呼び出し、urlを生成・セット
				var url_links_lis = seriesURL(pa_num, st_num, k+1);
				links_lis.setAttribute("href", url_links_lis);
				//classを設定
				links_lis.className = "target_blank";
				//テキストノードを追加
				var txt_lis = document.createTextNode("シリーズ"+[k+1]);
				//要素結合
				links_lis.appendChild(txt_lis);
				lis.appendChild(links_lis);
				uls.appendChild(lis);
			}
			//ページに追加
			insertAfter(uls, h3s);
			styleNaviLinks();//リンク部分にデザインをあてる
		}
	}
}
addLoadEvent(makeNaviSt);

/* EXPIMAGE.HTM url生成 */
function seriesURL(pa_num, st_num, se_num) {
	var hrefs_letters = new Array();
	hrefs_letters[0] = "./PA";
	hrefs_letters[1] = formatNum(6, pa_num);
	hrefs_letters[2] = "/ST";
	hrefs_letters[3] = formatNum(6, st_num);
	hrefs_letters[4] = "/SE";
	hrefs_letters[5] = formatNum(6, se_num);
	hrefs_letters[6] = "/EXPIMAGE.HTM";
	var url_links  = hrefs_letters.join("");
	return url_links;
}

/* contents 患者情報一覧 */
function makeTablePa() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	var table_patient_info = document.getElementById("table_patient_info");
	//tableタグを生成
	var tables = document.createElement("table");
	//captionタグを生成
	var captions = document.createElement("caption");
	var links_captions = document.createElement("a");
	links_captions.setAttribute("name", "table_patient_info");
	var txt_captions = document.createTextNode("患者情報一覧");
	links_captions.appendChild(txt_captions);
	captions.appendChild(links_captions);
	tables.appendChild(captions);
	//theadタグを生成
	var theads = document.createElement("thead");
	tables.appendChild(theads);
	//----- thタグを生成 -----
	var trs_head = document.createElement("tr");
	//ヘッダー項目を配列化
	var headers_table_pa = new Array();
	headers_table_pa[0] = "No.";
	headers_table_pa[1] = "患者ID";
	headers_table_pa[2] = "患者名";
	headers_table_pa[3] = "生年月日";
	headers_table_pa[4] = "性別";
	//thタグを作るループ
	for(var i = 0; i < 5; i++) {
		var ths = document.createElement("th");
		var txt = document.createTextNode(headers_table_pa[i]);
		ths.appendChild(txt)
		trs_head.appendChild(ths);
	}
	theads.appendChild(trs_head);
	//データ部分を生成
	var tbodys = document.createElement("tbody");
	for(var i =0; i <patientList.length; i++) {
		var trs_data = document.createElement("tr");
		//患者情報データを配列化
		var data_table_pa = new Array();
		data_table_pa[0] = i+1;
		data_table_pa[1] = patientList[i].id;
		data_table_pa[2] = patientList[i].name;
		data_table_pa[3] = patientList[i].birthdate;
		data_table_pa[4] = patientList[i].sex;
		//tdタグを作るループ
		for(var j =0; j < 5; j++) {
			var tds = document.createElement("td");
			var txt = document.createTextNode(data_table_pa[j]);
			tds.appendChild(txt);
			trs_data.appendChild(tds);
		}
		tbodys.appendChild(trs_data);
	}
	tables.appendChild(tbodys);
	table_patient_info.appendChild(tables)
}
addLoadEvent(makeTablePa);

/* contents 検査情報以下 */
function makeTableSt() {
	if(!document.getElementById) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	var table_study_info = document.getElementById("table_study_info");
	for(var i = 0; i < patientList.length; i++) {
		//患者ごとのdivを生成
		var wrapper_tables_pa = document.createElement("div");
		wrapper_tables_pa.className = "wrapper_tables_pa";
		table_study_info.appendChild(wrapper_tables_pa);
		//検査一覧のテーブルを生成
		var table_st = document.createElement("table");
		//検査一覧のキャプションを生成
		var caption_st = document.createElement("caption");
		var links_caption_st = document.createElement("a");
		var id_table_st = "table_pa" + i;
		links_caption_st.setAttribute("name", id_table_st);
		links_caption_st.setAttribute("id", id_table_st);
		var txt_caption_st = document.createTextNode(patientList[i].name + "様の検査一覧");
		links_caption_st.appendChild(txt_caption_st);
		caption_st.appendChild(links_caption_st);
		table_st.appendChild(caption_st);
		//検査一覧テーブルのヘッダーを生成
		var thead_table_st = document.createElement("thead");
		var trs_head = document.createElement("tr");
		var headers_table_st = new Array();
		headers_table_st[0] = "No.";
		headers_table_st[1] = "検査日";
		headers_table_st[2] = "検査時刻";
		headers_table_st[3] = "検査ID";
		headers_table_st[4] = "受付番号";
		//headers_table_st[5] = "検査記述";
		for(var j = 0; j < 5; j++) {
			var ths = document.createElement("th");
			var txt = document.createTextNode(headers_table_st[j]);
			ths.appendChild(txt);
			trs_head.appendChild(ths)
		}
		thead_table_st.appendChild(trs_head); 
		table_st.appendChild(thead_table_st);
		//検査一覧テーブルのデータを生成
		var tbody_table_st = document.createElement("tbody");
		for(var j = 0; j < patientList[i].count; j++) {
			var trs_data = document.createElement("tr");
			var data_table_st = new Array();
			data_table_st[0] = j+1;
			data_table_st[1] = patientList[i].studyList[j].date;
			data_table_st[2] = patientList[i].studyList[j].time;
			data_table_st[3] = patientList[i].studyList[j].id;
			data_table_st[4] = patientList[i].studyList[j].accession;
			//data_table_st[5] = patientList[i].studyList[j].description;
			for(var k = 0; k < 5; k++) {
				var tds = document.createElement("td");
				var txt = document.createTextNode(data_table_st[k]);
				tds.appendChild(txt);
				trs_data.appendChild(tds);
			}
			tbody_table_st.appendChild(trs_data);
		}
		table_st.appendChild(tbody_table_st);
		wrapper_tables_pa.appendChild(table_st);
		//シリーズのtableを囲うdivを生成
		var wrapper_tables_series = document.createElement("div");
		//クラスを設定
		wrapper_tables_series.className = "wrapper_tables_series";
		wrapper_tables_pa.appendChild(wrapper_tables_series);
		//シリーズ一覧のテーブルを生成
		for(var j = 0; j < patientList[i].count; j++) {
			var table_se = document.createElement("table");
			//シリーズ一覧のキャプションを生成
			var caption_se = document.createElement("caption");
			var links_caption_se = document.createElement("a");
			var id_table_se = "table_pa" + i + "_st" + j;
			links_caption_se.setAttribute("name", id_table_se);
			links_caption_se.setAttribute("id", id_table_se);
			var txt_caption_se = document.createTextNode(patientList[i].name + "様の検査" + [j+1] + "のシリーズ一覧");
			links_caption_se.appendChild(txt_caption_se);
			caption_se.appendChild(links_caption_se);
			table_se.appendChild(caption_se);
			//シリーズ一覧テーブルのヘッダーを生成
			var thead_table_se = document.createElement("thead");
			var trs_head = document.createElement("tr");
			var headers_table_se = new Array();
			headers_table_se[0] = "No.";
			headers_table_se[1] = "";
			headers_table_se[2] = "シリーズ番号";
			headers_table_se[3] = "モダリティ";
			headers_table_se[4] = "画像枚数";
			for(var k = 0; k < 5; k++) {
				var ths = document.createElement("th");
				var txt = document.createTextNode(headers_table_se[k]);
				ths.appendChild(txt);
				trs_head.appendChild(ths);
			}
			thead_table_se.appendChild(trs_head); 
			table_se.appendChild(thead_table_se);
			//シリーズ一覧テーブルのデータを生成
			var tbody_table_se = document.createElement("tbody");
			for(var k = 0; k < patientList[i].studyList[j].count; k++) {
				var trs_se_data = document.createElement("tr");
				//シリーズのデータを取得し、変数に代入
				var image_count = patientList[i].studyList[j].seriesList[k].imageCount;	
				var data_se_num = patientList[i].studyList[j].seriesList[k].number;
				var data_se_modality = patientList[i].studyList[j].seriesList[k].modality;
				//サムネイル用imgタグのパス生成
				var num = Math.ceil(image_count / 2);
				var src_letters = new Array();
				src_letters[0] = "./PA";
				src_letters[1] = formatNum(6, i+1);
				src_letters[2] = "/ST";
				src_letters[3] = formatNum(6, j+1);
				src_letters[4] = "/SE";
				src_letters[5] = formatNum(6, k+1);
				src_letters[6] = "/";
				src_letters[7] = formatNum(8, num);
				src_letters[8] = ".JPG";
				var src_links  = src_letters.join("");
				
				//シリーズデータの配列を生成
				var data_table_se = new Array();
				data_table_se[0] = k+1;
				data_table_se[1] = "";
				data_table_se[2] = data_se_num;
				data_table_se[3] = data_se_modality;
				data_table_se[4] = image_count;
				//alert(data_table_se[0]);
				for(var l = 0; l < 5; l++) {
					var tds = document.createElement("td");
					if(l == 1) {
						var txt = document.createElement("a");
						var url = seriesURL(i+1, j+1, k+1);
						with(txt) {
							setAttribute("href", url);
							className = "target_blank";
						}
						var thumbnail = document.createElement("img");
						with(thumbnail) {
							setAttribute("src", src_links);
							style.width = "100px";
							style.height = "100px";
							setAttribute("alt", "サムネイル");
						}
						txt.appendChild(thumbnail);
					} else {
						txt = document.createTextNode(data_table_se[l]);
					}
					tds.appendChild(txt);
					trs_se_data.appendChild(tds);
				}
				tbody_table_se.appendChild(trs_se_data);
			}
			table_se.appendChild(tbody_table_se);
			wrapper_tables_series.appendChild(table_se);
		}
		
	}
}
addLoadEvent(makeTableSt);

/* toggle --------------------------------------------------------- */

/* ナビゲーションカレント設定関数 */
function setCurrent(letter) {
	var navi = document.getElementById("navi");
	var navi_links = navi.getElementsByTagName("a");
	for (var i = 0; i < navi_links.length; i++) {
		if(navi_links[i].className.indexOf("page_inside") == -1) continue;
		var link_letter = navi_links[i].getAttribute("href");
		if(link_letter == letter) {
			with(navi_links[i]) {
				style.color = navi_current_color;
				className = "current page_inside";
			}
		} else {
			with(navi_links[i]) {
				style.color = navi_link_color;
				className = "normal page_inside";
			}
		}
	}
}

/* 患者情報toggle */

function toggleTitlePaInfo() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var title_patient_info = document.getElementById("title_patient_info");
	var navi_patient_info = document.getElementById("navi_patient_info");
	var table_study_info = document.getElementById("table_study_info");
	//ロード時に非表示にしておく
	table_study_info.style.display ="none";
	var link_title_patient_info = title_patient_info.getElementsByTagName("a")[0];
	//ロード時のカレント設定
	with(link_title_patient_info) {
		style.color = navi_current_color;
		className = "current page_inside";
	}
	//クリック時の動作
	link_title_patient_info.onclick = function() {
		//検査情報以下のナビゲーションが表示されている場合は非表示にする
		var navi_study_info = navi_patient_info.getElementsByTagName("div");
		for(var i = 0; i < navi_study_info.length; i++) {
			navi_study_info[i].style.display = "none";
		}
		//検査情報以下のtableを非表示にし、患者情報のtableを表示させる
		table_study_info.style.display ="none";
		document.getElementById("table_patient_info").style.display = "block";
		//カレント表示設定
		var current_letter = link_title_patient_info.getAttribute("href");
		setCurrent(current_letter);
		height2deck();//wrapper_2deck高さ再設定
		setArrow();
		return false;
	}
}
addLoadEvent(toggleTitlePaInfo);

/* 患者名toggle */
//h2タグの次にくる各divタグにidを付与するファンクション
function setIDnaviStudies() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName)  return false;
	var navi_patient_info = document.getElementById("navi_patient_info");
	var navi_study_info = navi_patient_info.getElementsByTagName("div");
	for (var i = 0; i < navi_study_info.length; i++) {
		navi_study_info[i].setAttribute("id", "navi_study_info_pa"+[i]);
	}
}
addLoadEvent(setIDnaviStudies);

//患者ごとのtableを囲う各divタグにidを付与するファンクション
function setIDtableStudies() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var table_study_info = document.getElementById("table_study_info");
	var divs = table_study_info.getElementsByTagName("div");
	for(var i = 0; i < divs.length; i++) {
		//divタグのクラス名で階層を絞る（マッチングしたdivタグのみを扱う）
		if(divs[i].className.indexOf("wrapper_tables_pa") == -1) continue;
		divs[i].setAttribute("id", "wrapper_tables_pa"+[i]);
	}
}

addLoadEvent(setIDtableStudies);

//クリック時の動作を定義するファンクション
function showStudies(id,current) {
	//ここから、ナビゲーションの表示制御
	var navi_patient_info = document.getElementById("navi_patient_info");
	//divタグを配列化
	var divs = navi_patient_info.getElementsByTagName("div");
	for(var i = 0; i < divs.length; i++) {
		//divタグのクラス名で階層を絞る（マッチングしたdivタグのみを扱う）
		if(divs[i].className.indexOf("navi_study_info") == -1) continue;
		//prepareStudiesファンクションから受け取ったidの値と、divタグのid属性から抜き出した文字列を比較
		if(divs[i].getAttribute("id").split("navi_study_info_pa")[1] == id && divs[i].style.display == "none") {
			divs[i].style.display = "block";
		} else if(divs[i].getAttribute("id").split("navi_study_info_pa")[1] == id && divs[i].style.display == "block") {
			divs[i].style.display = "none";
			//上記2つの条件分岐でdivタグの開閉を制御
		} else {
			//配列のループなので、prepareStudiesファンクションから受け取ったidの値と一致しないdivタグはここで閉じられる
			divs[i].style.display = "none";
		}
	}
	//シリーズのulタグを非表示にする。
	var uls = navi_patient_info.getElementsByTagName("ul");
	for(var i = 0; i < uls.length; i++) {
		uls[i].style.display = "none";
	}
	//ナビゲーションのカレント設定
	setCurrent(current);
	//ここから、右段の表示制御
	//患者一覧のtableを非表示にし、個別患者のtable全体をまとめたdivを表示させる
	document.getElementById("table_patient_info").style.display = "none";
	document.getElementById("table_study_info").style.display = "block";
	//各患者の検査情報以下を囲うdivタグを取得
	var table_study_info = document.getElementById("table_study_info");
	//table_study_info以下のすべてのdivタグを取得
	var divs_tables_study = table_study_info.getElementsByTagName("div");
	for(var i = 0; i < divs_tables_study.length; i++) {
		//divタグのクラス名で階層を絞る（マッチングしたdivタグのみを扱う）
		if(divs_tables_study[i].className.indexOf("wrapper_tables_pa") == -1) continue;
		//表示条件の分岐（引数idの値を2倍しないと、divのidとマッチングしないことに注意）
		if(divs_tables_study[i].getAttribute("id").split("wrapper_tables_pa")[1] == id*2 && divs_tables_study[i].style.display == "none") {
			divs_tables_study[i].style.display = "block";
		} else if(divs_tables_study[i].getAttribute("id").split("wrapper_tables_pa")[1] == id*2 && divs_tables_study[i].style.display == "block") {
			divs_tables_study[i].style.display = "block";
			//上記2つの条件分岐でdivタグの開閉を制御
		} else {
			//配列のループなので、prepareStudiesファンクションから受け取ったidの値と一致しないdivタグはここで閉じられる
			divs_tables_study[i].style.display = "none";
		}
	}
	//シリーズを囲うdivタグ（子要素div）を非表示にする
	for(var i = 0; i < divs_tables_study.length; i++) {
		//第1階層のdivタグを処理から外すようにクラス名で絞る
		if(divs_tables_study[i].className.indexOf("wrapper_tables_pa") != -1) continue;
		divs_tables_study[i].style.display = "none";
	}
}

//クリック時にマッチングする情報を抽出するファンクション
function prepareStudies() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var navi_patient_info = document.getElementById("navi_patient_info");
	var h2s = navi_patient_info.getElementsByTagName("h2");
	for(var i = 0; i < h2s.length; i++) {
		//h2タグの中のaタグを取得
		var links = h2s[i].childNodes;
		//aタグのhref属性から、divタグのid属性とマッチングさせる文字列（数値）を抜き出す
		var sectionId = links[0].getAttribute("href").split("#table_pa")[1];
		//ナビゲーションのカレント表示のマッチング用に、aタグのhref属性をすべて抜き出す
		var link_letter = links[0].getAttribute("href");
		//次要素のdivタグを取得する
		var elem_navi_study_info = document.getElementById("navi_study_info_pa"+sectionId);
		//右段はdivタグが2階層（子要素は1）になっているので、インデックスの数値を2倍したidとする
		var elem_tables_pa = document.getElementById("wrapper_tables_pa"+sectionId*2);
		//ロード時に非表示にしておく
		elem_navi_study_info.style.display = "none";
		elem_tables_pa.style.display = "none";
		//showStudiesファンクションにsectionIdの値を渡すために、カスタムプロパティを生成
		links[0].destination = sectionId;
		links[0].current_link = link_letter;
		links[0].onclick = function() {
			showStudies(this.destination,this.current_link);
			height2deck();//wrapper_2deck高さ再設定
			setArrow(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareStudies);


/* 検査toggle */
//h3タグの次にくる各ulタグにidを付与するファンクション
function setIDnaviSeries() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName)  return false;
	var navi_patient_info = document.getElementById("navi_patient_info");
	//患者のdivごとに、ulタグをカウントする
	var divs_navi_study_info = navi_patient_info.getElementsByTagName("div");
	for(var i = 0; i < divs_navi_study_info.length; i++) {
		var navi_series_info = divs_navi_study_info[i].getElementsByTagName("ul");
		for (var j = 0; j < navi_series_info.length; j++) {
			var id_navi_study_info_pa = navi_series_info[j].parentNode.getAttribute("id").split("navi_study_info_pa")[1];
			navi_series_info[j].setAttribute("id", "navi_series_info_pa"+id_navi_study_info_pa+"_st"+[j]);
		}
	}
}
addLoadEvent(setIDnaviSeries);

//検査ごとのtableを囲う各divタグにidを付与するファンクション

function setIDtableSeries() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var table_study_info = document.getElementById("table_study_info");
	var divs = table_study_info.getElementsByTagName("div");
	for(var i = 0; i < divs.length; i++) {
		if(divs[i].className.indexOf("wrapper_tables_series") == -1) continue;
		divs[i].setAttribute("id", "wrapper_tables_series_"+[i-1]);
	}
}
addLoadEvent(setIDtableSeries);

//シリーズのtableタグを非表示にしておく
function noneTablesSeries() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var table_study_info = document.getElementById("table_study_info");
	var divs_tables_series = table_study_info.getElementsByTagName("div");
	for(var i = 0; i < divs_tables_series.length; i++) {
		//第1階層のdivタグを処理から外すようにクラス名で絞る
		if(divs_tables_series[i].className.indexOf("wrapper_tables_pa") == 0) continue;
		//シリーズのtableタグを取得
		var tables_series = divs_tables_series[i].getElementsByTagName("table");
		for(var j = 0; j < tables_series.length; j++) {
			//シリーズのtableタグを非表示にしておく
			tables_series[j].style.display = "none";
		}
	}
}
addLoadEvent(noneTablesSeries);

//クリック時の動作を定義するファンクション
function showSeries(id,current) {
	//ここから、ナビゲーションの表示制御
	var navi_patient_info = document.getElementById("navi_patient_info");
	//患者のdivごとに、ulタグをカウントする
	var divs_navi_study_info = navi_patient_info.getElementsByTagName("div");
	for(var i = 0; i < divs_navi_study_info.length; i++) {
		var navi_series_info = divs_navi_study_info[i].getElementsByTagName("ul");
		for (var j = 0; j < navi_series_info.length; j++) {
			var id_navi_series_info = navi_series_info[j].getAttribute("id").split("navi_series_info_")[1];
			if(id_navi_series_info == id && navi_series_info[j].style.display == "none") {
				navi_series_info[j].style.display = "block";
			} else if(id_navi_series_info == id && navi_series_info[j].style.display == "block") {
				navi_series_info[j].style.display = "none";
			} else {
				navi_series_info[j].style.display = "none";
			}
		}
	}
	//ナビゲーションのカレント設定
	setCurrent(current);
	//ここから、右段の表示制御
	//各患者の検査情報以下を囲うdivタグを取得
	var table_study_info = document.getElementById("table_study_info");
	//table_study_info以下のすべてのdivタグを取得
	var divs_tables_series = table_study_info.getElementsByTagName("div");
	for(var i = 0; i < divs_tables_series.length; i++) {
		//第1階層のdivタグを処理から外すようにクラス名で絞る
		if(divs_tables_series[i].className.indexOf("wrapper_tables_pa") != -1) continue;
		//シリーズの各テーブルを囲うdivタグを表示させる
		divs_tables_series[i].style.display = "block";
		//シリーズのtableタグのcaptionタグを取得（aタグのidを取得するため）
		var tables_series_caption = divs_tables_series[i].getElementsByTagName("caption");
		for(var j = 0; j < tables_series_caption.length; j++) {
			//captionタグの子要素aタグを抽出
			var anchor_tables_series = tables_series_caption[j].childNodes;
			//aタグのid属性を抽出し、引数idと比較する文字列を抜き出す
			var id_tables_series = anchor_tables_series[0].getAttribute("id").split("table_")[1];
			//aタグの親となるtableタグを取得
			var tables_series = anchor_tables_series[0].parentNode.parentNode;
			//if(navigator.appName.indexOf("Microsoft") >= 0) {
			if(msie == true) {
				if(id_tables_series == id && tables_series.style.display == "none") {
					tables_series.style.display = "block";
				} else if(id_tables_series == id && tables_series.style.display == "block") {
					tables_series.style.display = "block";
				} else {
					tables_series.style.display = "none";
				}
			} else {
				if(id_tables_series == id && tables_series.style.display == "none") {
					tables_series.style.display = "table";
				} else if(id_tables_series == id && tables_series.style.display == "table") {
					tables_series.style.display = "table";
				} else {
					tables_series.style.display = "none";
				}
			}
		}
	}
}

//クリック時にマッチングする情報を抽出するファンクション
function prepareSeries() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var navi_patient_info = document.getElementById("navi_patient_info");
	var h3s = navi_patient_info.getElementsByTagName("h3");
	for(var i = 0; i < h3s.length; i++) {
		//h3タグの中のaタグを取得
		var links =h3s[i].childNodes;
		//aタグのhref属性から、divタグのid属性とマッチングさせる文字列（数値）を抜き出す
		var sectionId = links[0].getAttribute("href").split("#table_")[1];
		//ナビゲーションのカレント表示のマッチング用に、aタグのhref属性をすべて抜き出す
		var link_letter = links[0].getAttribute("href");
		//次要素のulタグを取得する
		var elem_navi_series_info = document.getElementById("navi_series_info_"+sectionId);
		//右段のシリーズごとのtableを囲うdivタグを取得する。
		var elem_wrapper_tables_series = document.getElementById("wrapper_tables_series_"+[i*2]);
		//ロード時に非表示にしておく
		elem_navi_series_info.style.display = "none";
		links[0].destination = sectionId;
		links[0].current = link_letter;
		links[0].onclick = function() {
			showSeries(this.destination,this.current);
			setArrow(this.destination);
			height2deck();//wrapper_2deck高さ再設定
			return false;
		}
	}
}
addLoadEvent(prepareSeries);

/* シリーズクリック時に別ウィンドウ（画像閲覧）を開く
（xhtml1.0 strictでは、aタグのtarget属性は廃止）*/
function openImageView() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	//var navi_patient_info = document.getElementById("navi_patient_info");
	//var links_series = navi_patient_info.getElementsByTagName("a");
	var wrapper_2deck = document.getElementById("wrapper_2deck");
	var links_series = wrapper_2deck.getElementsByTagName("a");
	for(var i = 0; i < links_series.length; i++) {
		if(links_series[i].className.indexOf("target_blank") == -1) continue;
		var target_url = links_series[i].getAttribute("href");
		links_series[i].destination = target_url;
		links_series[i].onclick = function() {
			openWin(this.destination);
			return false;
		}
	}
}
addLoadEvent(openImageView);