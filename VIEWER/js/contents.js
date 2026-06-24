/* contents.js （本体と設定ツール共通） */
/* コンテンツのhtmlで読み込む */

/* キャプション説明文表示 ------------------------- */
/* スコープを区切る */
function getCaptionElems(c) {
    var obj = {
        sec: c.parents('.area_section_pageparts'),
        area_txt: c.parents('.area_section_pageparts').children('.area_txt'),
        paras: c.parents('.area_section_pageparts').children('.area_txt').children('.area_para'), // children()は直下の子要素のみ取得
        area_img: c.parents('.area_section_pageparts').children('.area_image')
    }
    return obj;
}

/* カレントセット */
function captionCurSet(a, ids) {
    var area_img = a.parents('.area_image');
    $('a', area_img).each(function () {
        var href_letters = $(this).attr('href').split("#para_")[1];
        if (ids == href_letters) {
            $(this).addClass("current");
        } else {
            $(this).removeClass("current");
        }
    });
}

/* キャプションクリック */
function captionClick() {
    $('a', '.area_image').each(function () {
        var cur_area_image = $(this);
        var cap_ids;
        $(this).click(function () {
            // 親、兄弟要素取得
            var elems = getCaptionElems($(this));
            cap_ids = $(this).attr('id').split("cap_")[1];
            // カレントセット
            captionCurSet($(this), cap_ids);
            // para表示切替
            elems.paras.each(function () {
                var para_ids = $(this).attr('id').split("para_")[1];
                if (cap_ids === para_ids) {
                    $(this).removeClass("area_para_display_none");
                } else {
                    $(this).addClass("area_para_display_none");
                }
            });
            // 「すべて表示」ボタン表示
            $('.area_btn_show_allparas', elems.area_txt[0]).removeClass("not_allparas");
            return false;
        });
    });
}

$(function () {
    captionClick();
});

/* すべて表示 */
function showAllParas() {
    $('.btn_show_allparas').each(function () {
        $(this).click(function () {
            // 親、兄弟要素取得
            var elems = getCaptionElems($(this));
            // 各説明文をすべて表示
            elems.paras.each(function(){
                //$(this).css("display", "block");
                $(this).removeClass("area_para_display_none");
            });
            // 「すべて表示」ボタンを非表示にする
            var parent_elem = $(this).parents('.area_btn_show_allparas');
            parent_elem.addClass("not_allparas");
            // キャプションのカレントをはずす
            $('a', elems.area_img[0]).removeClass("current");
            return false;
        });
    });
}
$(function () {
    showAllParas();
});

/* コンテンツ内のリンクから別のコンテンツをロード ------------------------- */
function loadOtherCont() {
    $('.link_to_other_cont').each(function () {
        $(this).click(function () {
            var href_letters, items, items_len, item;
			item = $(this).attr("href");
            setCurrent(item); // 目次のカレントセット（common.js）
            openToc(item); // 目次を開く（common.js）
            switchCont(item); // コンテンツを切り替え（common.js）
            closeExCurrentToc(item); // カレント目次以外をの第2レベルを閉じる（common.js）
            displayBtnBack(); // 戻るボタン表示（common.js）
            stackTocReferer(item); // 戻るボタンのhref用の配列に識別番号を追加（common.js）
            scrollTop(); // ブラウザウィンドウの縦スクロール位置を上に戻す（common.js）
            return false;
        });
    });
}
$(function () {
    loadOtherCont();
});
