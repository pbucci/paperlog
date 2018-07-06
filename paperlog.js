$(document).ready(function() {
    $.ajax({
            url : "paperlog.md",
            dataType: "text",
            success : function (data) {
                build(data);
            }
    }); 
});


function emph(str) {
	var re = /(\*)(.*?)(\*)/; // so-called immutable, unlike var re = new RegExp('...');
	while (re.test(str)) {
		return str.replace(re, '<emph>' + '$2' + '</emph>' );
	}
	return str;
}

function em(str) {

}


function build(data) {
	var split = data.split("\n");
	for (var line in split) {
		var l = split[line];
		ret = ""; 
		if (l.slice(0,2) == "# ") {
			ret = "<h1>" + l.slice(2, l.length) + "</h1>";
		} 
		else if (l.slice(0,3) == "## ") {
			ret = "<h2>" + l.slice(3, l.length) + "</h2>";
		} 
		else if (l.slice(0,4) == "### ") {
			ret = "<h3>" + l.slice(4, l.length) + "</h3>";
		}
		else if (l.slice(0,2) == "--") {
			ret = "<hr />";
		} 
		else if (l.slice(0,1) == "[") {
			var st = l.indexOf("[") + 1;
			var et = l.indexOf("]");
			var sl = l.indexOf("(") + 1;
			var el = l.indexOf(")");
			ret = '<a href="' + l.slice(sl, el) + '" >' + l.slice(st, et).replace("https://", "").replace("http://", "") + '</a>';	
		} 
		else {
			// while (l.indexOf("*") > -1) {
			// 	var si = l.indexOf("*");
			// 	var ei = l.indexOf("*", si + 1);
			// 	l = l.substr(0, si) + "<emph>" + l.substr(si + 1, ei) + "</emph>" + l.substr(ei + 1, l.length);
			// }
			l = emph(l);
			l = l.replace("---", "–");
			ret = "<p>" + l + "</p>";
		}
		$("#start").append(ret);
	}
}
