// JavaScript Document

/* ナビゲーション制御 --------------------------------------------------------- */
function showContents(letter) {
	//右段の表示切り替え
	var contents = document.getElementById("contents");
	var divs = contents.getElementsByTagName("div");
	for(var i = 0; i < divs.length; i++) {
		if(divs[i].className.indexOf("area_entry") == -1) continue;
		var entry_id = divs[i].getAttribute("id");
		if(entry_id == letter) {
			divs[i].style.display = "block";
		} else {
			divs[i].style.display = "none";
		}
	}
	//左段カレント設定
	var navi = document.getElementById("navi");
	var navi_links = navi.getElementsByTagName("a");
	for(var i = 0; i < navi_links.length; i++) {
		if(navi_links[i].className.indexOf("page_inside") == -1) continue;
		var link_letter = navi_links[i].getAttribute("href").split("#")[1];
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

function prepareShowContents() {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var links = document.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++) {
		if(links[i].className.indexOf("page_inside") == -1) continue;//hrefがないとエラーになるので、classをつける
		var link_letter = links[i].getAttribute("href").split("#")[1];
		links[i].destination = link_letter;
		links[i].onclick = function() {
			showContents(this.destination);
			return false;
		}
	}
	
}
addLoadEvent(prepareShowContents);