$(document).ready(function() {
    $.ajax({
            url : "paperlog.md",
            dataType: "text",
            success : function (data) {
                buildPage(data);
            }
    }); 
});

const wrap = (tag) => (opts) => (str) => {return "<" + tag + " " + opts + " >" + str + "</" + tag + ">"};
const link = (str) => {return str.replace( /\[(.*?)\]\((.*?)\)/	, '<a href="$2">$1</a>'		 )};
const emph = (str) => {return str.replace( /(\*)(.*?)(\*)/g		, '<emph>' + '$2' + '</emph>')};
const mdsh = (str) => {return str.replace( /\s?---\s?/g			, '&mdash;'					 )};

var divCount = 0;

function h(str) {
	var level = str.split("").filter( (c) => c == '#' ).length;
	var opts = "";
	var ret = wrap("h" + level)("")(str.substring(level + 1, str.length));
	// if (level == 1) {
	// 	if (divcount == 0)
	// 		ret = '<div class="section"'ret;
	// }
	return ret;
}

const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

var hrCount = 0;

function buildPage(data) {
	var split = data.split("\n");
	for (var line in split) {
		var l = split[line];
		ret = "";
		if (l.charAt(0) == "#") {
			ret = h(l);
		}
		else if (l.slice(0,2) == "--") {
			if (hrCount == 0) {
				ret = "<div><hr />";	
			}
			else {
				ret = "</div><div><hr />"
			}
			hrCount += 1;
		} 
		else {
			ret = compose(link, emph, mdsh, wrap('p')(""))(l);
		}
		$("#start").append(ret);
	}
	$("#start").append("</div>");
}
