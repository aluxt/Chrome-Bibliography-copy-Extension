// content.js
// Author: M. Alexander Turner
// Author URI: http://www.maturnerpoetry.com/
// Author Github URI: https://github.com/aluxt
// Project Repository URI: NONE
// Description: Easily create well-formated bibliographic entries and lift HTML from web pages.

var title = "untitled";
var author = "Anonymous";
var text = "";
var last_save = "";

function getSelectionHtml() {
  var html = "";
  if (typeof window.getSelection != "undefined") {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var container = document.createElement("div");
      for (var i = 0, len = sel.rangeCount; i < len; ++i) {
        container.appendChild(sel.getRangeAt(i).cloneContents());
      }
      html = container.innerHTML;
    }
  } else if (typeof document.selection != "undefined") {
    if (document.selection.type == "Text") {
      html = document.selection.createRange().htmlText;
    }
  }
  return html;
}

function keyFunctions(name) {
  if (name == ",") {
    title = window.getSelection().getRangeAt(0);
  }
  if (name == ".") {
    author = window.getSelection().getRangeAt(0);
  }
  if (name == "/") {
    text = window.getSelectionHtml(); // gets the HTML not just the text
    navigator.clipboard.writeText(text);
  }
  if (name == "Enter") {
    to_clipboard = "data:text/html;charset=UTF-8,<p><u>"+title + "</u><br>by " + author + "</p>\r\n" + text;
    navigator.clipboard.writeText(to_clipboard);
  }
}

document.addEventListener('keyup', (event) => {
  var name = event.key;
  if (event.ctrlKey) {
    keyFunctions(name);
  }
}, false);