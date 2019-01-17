// LICENSE : MIT
// "use strict";
import { attachToElement, setUserContext, setPreEval } from "codemirror-console-ui/components/mirror-console-component.js";
let binaryen = require('binaryen');
let assemblyscript = require("assemblyscript");
let loader = require('ascloader');
let asc = require("asc");

// import {loader} from "assemblyscript/lib/loader";
// import regeneratorRuntime from "regenerator-runtime";
(function() {
    require("./style.css");
    var matchSelector = ".gitbook-plugin-js-console";
    debugger;
    function evalAsc(source){
      debugger;
      let mod = asc.compileString(source)
      if (!mod.text) return mod.stderr.toString();
      console.log(mod.text);
      let instance = loader.instantiateBuffer(mod.binary);
      console.log(instance.getY()==84);
      return mod.text;
    }

    let userContext =
    {
      asc,
      loader,
      evalAsc,
      testFun: () => 4232
    }

    setUserContext(userContext);

    function preEval(code){
      console.log(code);
      var res;
      try {
        res = evalAsc(code);
      } catch(e) { return e}
      return res.replace(/\n/ig, '\n');
    }

    setPreEval(preEval);

    function findComments(element) {
        var arr = [];
        for (var i = 0; i < element.childNodes.length; i++) {
            var node = element.childNodes[i];
            if (node.nodeType === 8) {
                arr.push(node);
            } else {
                arr.push.apply(arr, findComments(node));
            }
        }
        return arr;
    }

    function filterClosedJSConsole(element) {
        var text = element.textContent;
        var trimmedText = text.trim();
        return trimmedText === "js-console" || trimmedText === "js-console:closed";
    }

    function filterOpenJSConsole(element) {
        var text = element.textContent;
        return text.trim() === "js-console:open";
    }

    function updateCodeBlocs() {

        var insertPoints = document.querySelectorAll(matchSelector);
        var commentNodes = findComments(document);
        var getCommentNextPreNode = function(prevNode, nextNode, nextNextNode) {
            if (prevNode && prevNode.nodeName === "PRE") {
                return prevNode;
            }
            if (nextNode && nextNode.nodeName === "PRE") {
                return nextNode;
            } else if (nextNextNode && nextNextNode.nodeName === "PRE") {
                // some plugin fallback
                // for https://github.com/azu/gitbook-plugin-include-codeblock
                return nextNextNode;
            }
            return null;
        };
        // .gitbook-plugin-js-console
        (function() {
            for (var i = 0; i < insertPoints.length; i++) {
                var button = insertPoints[i];
                var isOpen = button.classList.contains("open");
                var targetNode = button.parentNode;
                var prevNode = targetNode.previousElementSibling;
                var nextNode = targetNode.nextElementSibling;
                var nextNextNode = nextNode && nextNode.nextElementSibling;
                var replaceNode = getCommentNextPreNode(prevNode, nextNode, nextNextNode);
                if (replaceNode) {
                    if (isOpen) {
                        replaceCodeWithConsole(replaceNode, {
                            state: "open",
                            scrollIntoView: false
                        });
                    } else {
                        replaceCodeWithConsole(replaceNode, {
                            state: "closed",
                            scrollIntoView: false
                        });
                    }
                }
            }
        })();
        // <!-- js-console -->
        (function() {
            var closedConsoleCommentNodes = commentNodes.filter(filterClosedJSConsole);
            for (var i = 0; i < closedConsoleCommentNodes.length; i++) {
                var targetNode = closedConsoleCommentNodes[i];
                var prevNode = targetNode.previousElementSibling;
                var nextNode = targetNode.nextElementSibling;
                var nextNextNode = nextNode && nextNode.nextElementSibling;
                var replaceNode = getCommentNextPreNode(prevNode, nextNode, nextNextNode);
                if (replaceNode) {
                    replaceCodeWithConsole(replaceNode, {
                        state: "closed",
                        scrollIntoView: false
                    });
                }
            }
        })();
        // <!-- js-console:open -->
        (function() {
            var openConsoleCommentNodes = commentNodes.filter(filterOpenJSConsole);
            for (var i = 0; i < openConsoleCommentNodes.length; i++) {
                var targetNode = openConsoleCommentNodes[i];
                var prevNode = targetNode.previousElementSibling;
                var nextNode = targetNode.nextElementSibling;
                var nextNextNode = nextNode && nextNode.nextElementSibling;
                var replaceNode = getCommentNextPreNode(prevNode, nextNode, nextNextNode);
                if (replaceNode) {
                    replaceCodeWithConsole(replaceNode, {
                        state: "open",
                        scrollIntoView: false
                    });
                }
            }
        })();
    }

    window.gitbook.events.bind("page.change", function() {
        updateCodeBlocs();
    });

    function replaceCodeWithConsole(codeBlock, options) {
        var codes = codeBlock.getElementsByTagName("code");
        if (!codes || codes.length === 0) {
            return;
        }
        var code = codes[0];
        attachToElement(codeBlock, code.textContent, options);
    }
})();
