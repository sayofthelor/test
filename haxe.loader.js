// a lot of code used from typescript-compile
import {hscript_Interp, hscript_Parser} from 'https://raw.githubusercontent.com/sayofthelor/test/master/hscript.js';
(function() {
    if (!window.console) {
        window.console = {
            log: function() {}
        };
    }
    hashCode = function(s) {
        var hsh = 0, chr, i;
        if(s.length == 0) {
            return hsh;
        }
        for(i = 0; i < s.length; i++) {
            chr = s.charCodeAt(i);
            hsh = (hsh << 5) - hsh + chr;
            hsh = hsh & hsh; //Convert to 32bit integer
        }
        return hsh;
    }
    load = function(url) {
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
    compile = function() {
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
        const parser = new hscript_Parser();
        parser.allowTypes = true;
        parser.allowMetadata = true;
        src.forEach((i) => {
            const interp = new hscript_Interp();
            interp.setVar("console", console);
            interp.setVar("document", document);
            interp.setVar("window", window);
            var expr = parser.parseString(i);
            interp.execute(expr);
        });
    }
    compile();
})();