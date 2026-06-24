// JavaScript Document

/* 初期設定 */
document.cookie = 1;
var imgcnt = 1;
var imagfilename = new Array();
imagfilename[0] = '00000001.JPG'
imagfilename[1] = '00000002.JPG'
imagfilename[2] = '00000003.JPG'
imagfilename[3] = '00000004.JPG'
imagfilename[4] = '00000005.JPG'
imagfilename[5] = '00000006.JPG'
imagfilename[6] = '00000007.JPG'
imagfilename[7] = '00000008.JPG'
imagfilename[8] = '00000009.JPG'
imagfilename[9] = '00000010.JPG'
imagfilename[10] = '00000011.JPG'
imagfilename[11] = '00000012.JPG'
imagfilename[12] = '00000013.JPG'
imagfilename[13] = '00000014.JPG'
imagfilename[14] = '00000015.JPG'
imagfilename[15] = '00000016.JPG'
imagfilename[16] = '00000017.JPG'
imagfilename[17] = '00000018.JPG'
imagfilename[18] = '00000019.JPG'
imagfilename[19] = '00000020.JPG'
imagfilename[20] = '00000021.JPG'
imagfilename[21] = '00000022.JPG'
imagfilename[22] = '00000023.JPG'
imagfilename[23] = '00000024.JPG'

var imgmax = imagfilename.length,
    arr_img,
    display_img = document.getElementById('display_img'),
    pageno = document.getElementById('pageno');

function prepareImgView() {
	// 画像レンダリング
	for (var i = 0; i < imgmax; i++) {
		var _elem_img = document.createElement("img");
		_elem_img.src = imagfilename[i];
		_elem_img.setAttribute('id', 'img' + (i + 1));
		_elem_img.setAttribute('width', '512');
		_elem_img.setAttribute('height', '512');
		_elem_img.setAttribute('alt', '診断画像');
		_elem_img.style.verticalAlign = "bottom";
		if ( i === 0) {
			_elem_img.setAttribute('class', 'current');
		} else {
			_elem_img.style.display = "none";
		}
		display_img.appendChild(_elem_img);
	}
	arr_img = display_img.getElementsByTagName('img');
	// 画像番号セット
	feedPageNum(1);
}
addLoadEvent(prepareImgView);
