// JavaScript Document

/* wrapper_2deckの高さ適用 */
function height2deck() {
	if(!document.getElementById) return false;
	var wrapper_2deck = document.getElementById("wrapper_2deck");
	var navi = document.getElementById("navi");
	var contents = document.getElementById("contents");
	//naviとcontentsの高さを比較
	var navi_height = navi.offsetHeight;
	var contents_height = contents.offsetHeight;
	searchIEver();//ieバージョンチェック
	//ie 5.5 - 7でなければ、以下を実行
	if(ie55 == false && ie6 == false && ie7 == false) {
		with(wrapper_2deck) {
			if(navi_height > contents_height) {
				style.height = navi_height + "px";
			} else {
				style.height = contents_height + "px";
			}
		}
	}
}
addLoadEvent(height2deck);