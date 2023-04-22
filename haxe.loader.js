// a lot of code used from typescript-compile
import 'https://cdn.jsdelivr.net/gh/sayofthelor/test/hscript.min.js';
(function() {
    if (!window.console) {
        window.console = {
            log: function() {}
        };
    }
    
    const load = function(url) {
        var xhr;
        if(window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        } else {
            return "";
        }
        xhr.open('GET', url, false);
        if(xhr.overrideMimeType) {
            xhr.overrideMimeType('text/plain');
        }
        xhr.send(null);
        if(xhr.status == 200) {
            return xhr.responseText;
        }
        return "";
    }
    const compile = function() {
        var script = document.getElementsByTagName('script');
        var src= [];
        for (let i = 0; i < script.length; i++) {
            if (script[i].type=="text/haxe") {
                if (script[i].src) {
                    src.push(load(script[i].src));
                }
                else {
                    src.push(script[i].innerHTML);
                }
            }
        }
        if(src.length == 0) {
            return;
        }
        const parser = new hscript.Parser();
        parser.allowTypes = true;
        parser.allowMetadata = true;
        src.forEach((i) => {
            const interp = new hscript.Interp();
            interp.setVar("console", console);
            interp.setVar("document", document);
            interp.setVar("window", window);
            var expr = parser.parseString(i);
            interp.execute(expr);
        });
    }
    compile();
})();