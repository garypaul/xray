/* toc.js */

// 目次データのオブジェクト
// 目次データは連想配列で管理し、JavaScriptで生成する。
var toc_obj = [
    {
        id_num: "A010-000-000",
        filename: "./contents/A010-000-000_Strt.html",
        title: "はじめに",
        level2: []
    },
    {
        id_num: "B020-000-000",
        filename: "./contents/B020-000-000_StrtEnd.html",
        title: "起動／終了のしかた",
        level2: []
    },
    {
        id_num: "C030-000-000",
        filename: "",
        title: "診断画像の見かた",
        level2: [
            {
                id_num: "C030-010-000",
                filename: "./contents/C030-010-000_View1.html",
                title: "診断画像を開く"
            },
            {
                id_num: "C030-020-000",
                filename: "./contents/C030-020-000_View2.html",
                title: "画像をビューする"
            },
            {
                id_num: "C030-030-000",
                filename: "./contents/C030-030-000_ChgSr.html",
                title: "表示するシリーズを変更する"
            },
            {
                id_num: "C030-040-000",
                filename: "./contents/C030-040-000_ChgCl.html",
                title: "セルの構成を変更する"
            },
			{
				id_num: "C030-050-000",
				filename: "./contents/C030-050-000_CmpImg.html",
				title: "検査の異なる画像を比較する"
			}
        ]
    },
	{	
		id_num: "D040-000-000",
		filename: "",
		title: "基本的な機能を使う",
		level2: [
			{
				id_num: "D040-010-000",
				filename: "./contents/D040-010-000_SlImg.html",
				title: "操作する画像を選ぶ／複数の画像を同時に操作する（連動）"
			},
			{
				id_num: "D040-020-000",
				filename: "./contents/D040-020-000_AdjTne.html",
				title: "明るさ／コントラスト（WW/WL）を調整する"
			},
			{
				id_num: "D040-030-000",
				filename: "./contents/D040-030-000_MovImg.html",
				title: "画像を移動する"
			},
			{
				id_num: "D040-040-000",
				filename: "./contents/D040-040-000_ZmImg.html",
				title: "画像を拡大／縮小する"
			},
			{
				id_num: "D040-050-000",
				filename: "./contents/D040-050-000_SelROI.html",
				title: "領域を選択する"
			}
		]
	},
	{
		id_num: "E050-000-000",
		filename: "",
		title: "その他の機能",
		level2: [
			{
				id_num: "E050-010-000",
				filename: "./contents/E050-010-000_MrkImg.html",
				title: "特別な画像にしるしを付ける（キー画像）"
			},
			{
				id_num: "E050-020-000",
				filename: "./contents/E050-020-000_PlyCne.html",
				title: "画像をシネ表示する"
			}
		]
	},
	{
		id_num: "F060-000-000",
		filename: "",
		title: "画面各部の名称とはたらき",
		level2: [
			{
				id_num: "F060-010-000",
				filename: "./contents/F060-010-000_Vwer.html",
				title: "ビューワウィンドウ"
			},
			{
				id_num: "F060-020-000",
				filename: "./contents/F060-020-000_Tlbr.html",
				title: "ツールバー"
			},
			{
				id_num: "F060-030-000",
				filename: "./contents/F060-030-000_Info.html",
				title: "インフォメーションパレット"
			}
		]
	},
	{
		id_num: "G070-000-000",
		filename: "./contents/G070-000-000_Crdt.html",
		title: "その他",
		level2: []
	}
]


/* 目次のHTMLを作成 */
function loadToc() {
    var len = toc_obj.length;
    var html = '<ul>\n';
    for (var i = 0; i < len; i++) {
        html += '<li><a id="' + toc_obj[i].id_num + '"';
        if (toc_obj[i].filename === "") {
            html += '><span>&#9658;</span>&nbsp;';
        } else {
            html += ' href="#' + toc_obj[i].id_num + '">';
        }
        html += toc_obj[i].title;
        html += '</a>';
        if (toc_obj[i].level2.length !== 0) {
            var l2_len = toc_obj[i].level2.length;
            html += '<ul class="toc_level2 close_l2">';
            for (var j = 0; j < l2_len; j++) {
                html += '<li><a id="' + toc_obj[i].level2[j].id_num  + '"';
                html += ' href ="#';
                html += toc_obj[i].level2[j].id_num + '">';
                html += toc_obj[i].level2[j].title + '</a></li>\n'; 
            }
            html += '</ul>\n';
        }
        html += '</li>';
    }
    html += '</ul>';
    $('#area_toc_inner').append(html);
    // 以下、callback
    startUpLoad() // ロード時のコンテンツ読み込み、目次の設定（common.js）
    clickTocItem(); // 目次の項目クリックでコンテンツをロード、階層の開閉、カレント設定
}

$(function () {
    loadToc();
});

/* 目次項目クリック */
function clickTocItem() {
    $('a', '#area_toc').each(function () {
        $(this).click(function () {
            toggleTocL2($(this)); // 目次のtoggle
            return false;
        });
    });
}

/* 目次項目クリック時の処理（階層の判別・開閉、カレントのセット、コンテンツのロード） */
function toggleTocL2(elem) {
    var href_letter, item_num;
	href_letter = elem.attr('href');
    if (!href_letter) { // 対応コンテンツがない第1階層
        var parent = elem.parent().get(0); // 親要素取得
        $('.toc_level2', parent).toggleClass("close_l2"); // 第2階層の開閉
        // ヘッダー矢印切り替え
        var txt = $('span', elem).text();
        if (txt.match("▼")) {
            txt = txt.replace("▼", "►");
            //$('span', elem).css('font-size', '1em'); // サイズ変更用
        } else if (txt.match("►")) {
            txt = txt.replace("►", "▼");
            //$('span', elem).css('font-size', '0.8em'); // サイズ変更用
        }
        $('span', elem).text(txt);
    } else { // 対応コンテンツがある第1階層
		item_num = href_letter.split('#')[1];
        setCurrent(item_num); // カレントセット（common.js）
        switchCont(item_num); // コンテンツ切り替え(common.js)
        displayBtnBack(); // 戻るボタン表示（common.js）
        stackTocReferer(href_letter); // 戻るボタンのhref用の配列にファイル名を追加（common.js）
        scrollTop(); // ブラウザウィンドウの縦スクロール位置を上に戻す（common.js）
    }
}
