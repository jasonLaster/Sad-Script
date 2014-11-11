### Sad Script

When `chrome.devtools.inspectedWindow.reload` is used to an inject a script 'sad_script.js' into the inspected window, the script content is not available unless a debugger statement is executed.

##### panel.js

```js
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
```

##### sad_script.js

```js
window.__sad = new function() {
  // debugger;
  console.log('sad script');
}
```

---

### Some screenshots

##### panel open with a single console message
![](http://f.cl.ly/items/3b220K0q013i272s3O2m/Image%202014-11-11%20at%2012.43.04%20PM.png)

---

##### sad_script.js in the sources panel
![](http://f.cl.ly/items/3a0Z0S0O36142S0v2634/Image%202014-11-11%20at%2012.50.53%20PM.png)

It's interesting that the source folder (extension url) and filename (sad_script.js) is fine.

---
##### sad_script.js in the sources panel with a debugger
![](http://f.cl.ly/items/0S3X0o133F461a1o1I0e/Image%202014-11-11%20at%2012.52.17%20PM.png)

In this case, the source is loaded after the debugger statement is executed.

After the source is loaded, links in the console will resolve to the appropriate spot in the sources panel.

