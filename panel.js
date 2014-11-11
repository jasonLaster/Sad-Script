fetchScript();

function fetchScript() {
  var baseUrl = chrome.extension.getURL("");
  var scriptUrl = baseUrl + "sad_script.js";
  $.ajax({
    type: 'get',
    url: scriptUrl,
    cache: false
  }).always(function(data) {
    var script = "//@ sourceURL="+scriptUrl+"\n\n" + data;
    chrome.devtools.inspectedWindow.reload({
        ignoreCache: true,
        injectedScript: script
    });
  })
}
