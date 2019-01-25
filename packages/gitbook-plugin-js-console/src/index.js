// LICENSE : MIT
// "use strict";
import { attachToElement, setUserContext, setPreEval } from "codemirror-console-ui/components/mirror-console-component.js";
let binaryen = require('binaryen');
let assemblyscript = require("assemblyscript");
let loader = require('ascloader');
let asc = require("asc");

function getSection(text, section) {
  let lines = text.split('\n');
  return lines.filter((element)=>element.startsWith(' ('+section));
}

function getFuncSection(text){
  let lines = text.split('\n');
  let funcs = getSection(text, 'func');
  let indexs = funcs.map((func) => lines.findIndex((element)=> element === func))
  let res = [];
  for (let i in indexs){
    var end;
    if (i < indexs.length - 1){
      end = indexs[i+1]
    }else{
      end = lines.length -1
    }
    res.push((lines.slice(indexs[i], end)))
  }
  return res;
}
// import {loader} from "assemblyscript/lib/loader";
// import regeneratorRuntime from "regenerator-runtime";
(function() {
    require("./style.css");
    var matchSelector = ".gitbook-plugin-js-console";
    function evalAsc(source) {
      let mod = asc.compileString(source)
      if (!mod.text) return mod.stderr.toString();
      console.log(mod.text);
      return mod;
    }

    let userContext =
    {
      asc,
      loader,
      evalAsc,
      getSection
    }

    setUserContext(userContext);

    function preEval(context){
      console.log(context);
      var mod;
      try {
        mod = evalAsc(context.mirror.buffers['lang-ts'].getValue());
        if (typeof mod === 'string'){
          mod = {text: mod}
        }
        context.mod = mod;
      } catch(e) { return e}
      return context.mirror.buffers['lang-js'].getValue();
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
        let codeBlocks = []
        // var codes = codeBlock.getElementsByTagName("code");
        // if (!codes || codes.length === 0) {
        //     return;
        // }
        let codes = codeBlock.getElementsByTagName("code");
        for (let i=0; i< codes.length; i++){
          codeBlocks.push(codes[i]);
        }
        let next = codeBlock;
        while (true){
          next = next.nextElementSibling;
          if (!next){
            break;
          }
          let codes = next.getElementsByTagName("code");
          if (!codes|| codes.length === 0){
            break;
          }
          next.hidden = true;
          for (let i=0; i< codes.length; i++){
            codeBlocks.push(codes[i]);
          }
        }
        attachToElement(codeBlock, codeBlocks, options);
    }
})();
