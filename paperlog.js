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
	return str.replace(/(\*)(.*?)(\*)/g, '<emph>' + '$2' + '</emph>' );
}

function em(str) {
	return str.replace(/\s---\s/g, "&mdash;");
}

function link(str) {
	return str.replace(/^\[(.*?)\]\((.*?)\)/, '<a href="$2">$1</a>');
}

function wrap(tag, str) {
	return "<" + tag + ">" + str + "</" + tag + ">";
}

const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

function build(data) {
	var split = data.split("\n");
	for (var line in split) {
		var l = split[line];
		ret = "";

		if (l.slice(0,2) == "# ") {
			ret = wrap("h1", l.slice(2, l.length));
		} 
		else if (l.slice(0,3) == "## ") {
			ret = wrap("h2", l.slice(3, l.length));
		} 
		else if (l.slice(0,4) == "### ") {
			ret = wrap("h3", l.slice(4, l.length));
		}
		else if (l.slice(0,2) == "--") {
			ret = "<hr />";
		} 
		else {
			ret = wrap('p', compose(link, emph, em)(l));
		}
		$("#start").append(ret);
	}
}
