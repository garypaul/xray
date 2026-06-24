/* common.js */

/* 戻るボタンにセットするファイル名を格納 ------------------------- */
var toc_referer_arr = [];

/* カレント設定 ------------------------- */

/* URIのコンテンツ識別番号取得 */
function extractItemNum() {
	var url = location.href;
	var pathArray;
	pathArray = url.split("=");
	var lastNum = pathArray.length -1;
	var itennum;
	if (lastNum === 0) { // 識別子がない場合
	    itemnum = "A010-000-000" // 最初のコンテンツを返す
	} else {
	    itemnum = pathArray[lastNum];
	}
	return itemnum;
}


/* クラスcurrentセット */
function setCurrent(id_num) {
    var item = id_num; // 識別子
	$('a', '#area_toc').each(function () {
        var href_letter = $(this).attr("href");
        if (!href_letter) return true;
        if (href_letter.indexOf(item) !== -1) {
       		$(this).addClass('current');
		} else {
        	$(this).removeClass('current');
		}
    });
}

/* 高さ調整 ------------------------- */
var wh; // ブラウザウィンドウの高さを代入する変数
function adjustH() {
    if (self.innerHeight) { // for Except IE
        wh = self.innerHeight;
    } else if (document.body) { // for IE
        wh = document.body.offsetHeight;
    }
    $('#area_toc').height(wh);
    // $('#area_contents').height(wh); // それぞれコンテンツが溢れたら、スクロールバーを表示する（overflow:autoが指定してある）
}

/* 目次以外からコンテンツがロードされたときに目次を開く */
function openToc(item) {
    // 第1レベルのa要素を取得して目次を開く
    var item_arr = item.split("-");
    if (item_arr[1] !== 000) { // 第1レベルではないなら
        item_arr[1] = "000";
        var anchor_l1_item = item_arr.join("-"); // 第1レベルのid属性値を生成
        var anchor_l1 = $('#' + anchor_l1_item, '#area_toc');
    }
    if (!anchor_l1.attr("href")) { // hrefがないなら（第2レベルを持つなら）
        var ul_l2 = anchor_l1.siblings('.toc_level2'); // aの次のulを取得
        ul_l2.removeClass("close_l2"); // display: noneのクラスをはずす
        // ヘッダー矢印切り替え
        var txt = $('span', anchor_l1).text();
        if (txt.match("►")) {
            txt = txt.replace("►", "▼");
            //$('span', elem).css('font-size', '1em'); // サイズ変更用
        }
        $('span', anchor_l1).text(txt);
    }
}
/* 目次以外からコンテンツがロードされたときにカレント以外の目次を閉じる */
function closeExCurrentToc(item) {
    var letters_l1 = item.slice(1, 5); // 第1レベルの文字列を抜き出す
    $('a', '#area_toc').each(function () {
        if (!$(this).attr("href")) { // hrefがないなら第2レベルがある
            var ids = $(this).attr("id");
            if (ids.indexOf(letters_l1) === -1) { // 第1レベルの文字列がletters_l1と一致しないなら、第2レベルにカレントはない
                var toc_l2 = $(this).siblings('.toc_level2');
                toc_l2.addClass("close_l2"); // 第2レベルのulを閉じる
                // ヘッダー矢印切り替え
                var txt = $('span', $(this)).text();
                if (txt.match("▼")) {
                    txt = txt.replace("▼", "►");
                    //$('span', elem).css('font-size', '1em'); // サイズ変更用
                }
                $('span', $(this)).text(txt);
            }
        }
    });
}

/* コンテンツ切り替え ------------------------- */

function switchCont(area_id) {
    $('.wrapper_individual_entry').each(function () {
    	var idv = $(this).attr('id');
    	if (area_id.match(idv)) {
    		$(this).removeClass('dsp_none');
    	} else {
    		$(this).addClass('dsp_none');
    	}
    });
    adjustH(); // 目次とコンテンツ部分の高さをウィンドウサイズから指定
	document.documentElement.scrollTop = 0; // ブラウザのスクロールバーを1番上に移動
	//（別のhtmlがロードされても、index.htmlのスクロール位置は変わらないため、スクロールバーが1番上にない上体では、新しいコンテンツが途中から見える状態になる。）
}

/* 本体から起動時に実行（目次の開閉・カレントセット・コンテンツロード） ------------------------- */
function startUpLoad() {
    var item = extractItemNum(); // 識別子
    var href_letter; // ファイル名
    var cur_item; // カレントのa要素
    // カレントのa要素のhrefを取得
    $('a', '#area_toc').each(function () {
        href_letter = $(this).attr("href");
        if (!href_letter) return true; // href属性がないものが除外
        if (href_letter.indexOf(item) !== -1) {
            cur_item = $(this);
            toc_referer_arr.push(cur_item.attr("href")); // 戻るボタン用のファイル名格納配列（グローバル変数）にhrefの値を追加
            return false; // ループ終了
        }
    });
    // 目次を開く
    openToc(item);
    // 該当コンテンツのロードとカレントのセット
    setCurrent(item); // カレントセット
    switchCont(item); // コンテンツ切り替え
}


/* 「目次」ボタンクリック ------------------------- */
function toggleToc() {
    $("#btn_toc").click(function () {
        $('#cell_toc').toggleClass("close_toc");
        // ヘッダー矢印切り替え
        var txt = $('span', $(this)).text();
        if (txt.match("◄")) {
            txt = txt.replace("◄", "►");
            //$('span', $(this)).css('font-size', '1em'); // サイズ変更用
        } else if (txt.match("►")) {
            txt = txt.replace("►", "◄");
            //$('span', $(this)).css('font-size', '0.8em'); // サイズ変更用
        }
        $('span', $(this)).text(txt);
        return false;
    });
}

$(function () {
    toggleToc();
});
/* 「戻る」ボタン ------------------------- */
/* 戻るボタン用の配列にリンク先のファイル名を追加し、配列の最初の要素を削除 */
function stackTocReferer(links) {
    toc_referer_arr.push(links); // 戻るボタンのhref用の配列（グローバル変数）にファイル名を追加
    var len = toc_referer_arr.length;
    if (len >= 20) { // 履歴は20まで
        toc_referer_arr.shift(); // 戻るボタンのhref用の配列から最初の要素を削除
    }
}
/* 表示またはhrefの差し替え */
function displayBtnBack() {
    $('#btn_back').removeClass("hide_btn"); // 戻るボタンを表示
    var len = toc_referer_arr.length;
    if (len !== 0) {
        $('a', '#btn_back').attr("href", toc_referer_arr[len-1]); // 戻るボタンのhrefに配列の最後の要素をセット
    }
}
/* 戻るボタンクリック時の値セット */
function ctrlHistly() {
    toc_referer_arr.pop(); // 最後の要素を削除（進むボタンはないので）
    var len = toc_referer_arr.length;
    if (len > 1) {
        $('a', $('#btn_back')).attr("href", toc_referer_arr[len - 2]); // 戻るボタンのhrefに配列の最後の要素をセット
    } else {
        $('#btn_back').addClass('hide_btn'); // 履歴が残り1になったらボタンを隠す
    }
}
/* クリック */
function clickBtnBack() {
    $('#btn_back').click(function () {
        var filename, item;
        filename = $('a', $(this)).attr("href");
		item = filename.split('#')[1];
		setCurrent(item); // 目次のカレントセット（common.js）
        openToc(item); // 目次を開く（common.js）
        closeExCurrentToc(item); // カレント目次以外をの第2レベルを閉じる（common.js）
        switchCont(item); // コンテンツ切り替え
        ctrlHistly(); // 戻るボタンのhrefと表示を制御
        return false;
    });
}
$(function() {
    clickBtnBack();
});

/* ブラウザウィンドウのリサイズ ------------------------- */
$(window).resize(function () {
    adjustH(); // 目次とコンテンツ部分の高さをウィンドウサイズから指定
});

/* ブラウザウィンドウの縦スクロール位置を上に戻す ------------------------- */
var scrollTop = function() {
	window.scrollTo(0, 0);
}


/* 「閉じる」ボタンクリック ------------------------- */
/* 「閉じる」ボタンをつけない
function closeWin() {
    window.close();
}
$(function () {
    //closeWin();
    $('#btn_close').click(function () {
        closeWin();
    });
});*/
