// JavaScript Document

var patientList = new Array();

(function init(){
	(function(){
		var studyList = new Array();
		(function(){
			var seriesList = new Array();
			seriesList.push(new Series('MR', '1.2.392.200036.9116.4.2.7250.34023.4001', '4000', 13));
			seriesList.push(new Series('MR', '1.2.392.200036.9116.4.2.7250.34023.5001', '5000', 13));
			seriesList.push(new Series('MR', '1.2.392.200036.9116.4.2.7250.34023.6001', '6000', 13));
			seriesList.push(new Series('MR', '1.2.392.200036.9116.4.2.7250.34023.9001', '8000', 24));
			seriesList.push(new Series('MR', '1.2.392.200036.9116.4.2.7250.34023.8001', '9000', 24));
			studyList.push(new Study('2025/08/14', '10:25:37', '', '1.2.392.200036.9184.1.5601296.140003.250814.1.25.1', '34023', '2508142000000001', seriesList, 5));
		})();
		patientList.push(new Patient('イズモト タカオ', '00140003', '男', '1944/01/26', studyList, 1));
	})();
})();
