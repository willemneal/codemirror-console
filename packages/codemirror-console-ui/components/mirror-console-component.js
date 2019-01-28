"use strict";
var MirrorConsole = require("codemirror-console");
var merge = require("lodash.merge");
var util = require("util");
// https://github.com/kchapelier/in-browser-language
var browserLanguage = require("in-browser-language");
var userLang = browserLanguage.pick(["en", "ja", "es"], "en");
var localize = require("./localize");
var localization = require("./localization");
var newElement = require("./new-element");
require("./mirror-console-compoenent.css");
require("codemirror/lib/codemirror.css");
// context
var userContext = {};
var preEval =  (context) => "console.log('preEval');\n"+ context.mirror.getValue();

function intendMirrorConsole(element, codeBlocks) {
    var mirror = new MirrorConsole();
    var codeMirror = mirror.editor;
    var extraKeys = {
        "Cmd-Enter": function() {
            runCode();
        },
        "Ctrl-Enter": function() {
            runCode();
        }
    };
    codeMirror.setOption("lineNumbers", true);
    codeMirror.setOption("extraKeys", extraKeys);
    mirror.addBuffer(codeBlocks[0].textContent, codeBlocks[0].className);
    mirror.addBuffer(codeBlocks[1].textContent, codeBlocks[1].className);
    mirror.swapDoc("lang-ts");
    mirror.textareaHolder.className = "mirror-console-wrapper";
    var html = require("./mirror-console-component.hbs");
    var node = newElement(html, localize(localization, userLang));
    var logArea = node.querySelector(".mirror-console-log");

    function printConsole(args, className) {
        var div = document.createElement("pre");
        div.className = className;
        var outputs = args.map(function(arg) {
            if (String(arg) === "[object Object]" || Array.isArray(arg)) {
                return util.inspect(arg);
            }
            return String(arg);
        });
        div.appendChild(document.createTextNode(outputs[0].split("\n").join('\n')));
        logArea.appendChild(div);
    }

    var consoleMock = {
        log: function() {
            printConsole(Array.prototype.slice.call(arguments), "mirror-console-log-row mirror-console-log-normal");
            console.log.apply(console, arguments);
        },
        info: function() {
            printConsole(Array.prototype.slice.call(arguments), "mirror-console-log-row mirror-console-log-info");
            console.info.apply(console, arguments);
        },
        warn: function() {
            printConsole(Array.prototype.slice.call(arguments), "mirror-console-log-row mirror-console-log-warn");
            console.warn.apply(console, arguments);
        },
        error: function() {
            printConsole(Array.prototype.slice.call(arguments), "mirror-console-log-row mirror-console-log-error");
            console.error.apply(console, arguments);
        }
    };

    var runCode = function() {
        var context = { console: consoleMock,
                        mirror
                      };
        var runContext = merge(context, userContext);
        mirror.runInContext(runContext, function(error, result) {
            if (error) {
                consoleMock.error(error);
                return;
            }
            if (result !== undefined) {
                printConsole([result], "mirror-console-log-row mirror-console-log-return");
            }
        }, preEval);
    };

    mirror.swapWithElement(element);
    mirror.textareaHolder.appendChild(node);
    // execute js in context
    runCode();

    node.querySelector(".mirror-console-run").addEventListener("click", function runJS() {
        runCode();
    });
    node.querySelector(".mirror-console-clear").addEventListener("click", function clearLog() {
        var range = document.createRange();
        range.selectNodeContents(node.querySelector(".mirror-console-log"));
        range.deleteContents();
    });
    node.querySelector(".mirror-console-exit").addEventListener("click", function exitConsole() {
        codeBlocks[0].textContent = mirror.buffer[codeBlocks[0].className].getValue();
        mirror.destroy();
        attachToElement(element, codeBlocks[0]);
    });

    return mirror;
}

var DefaultOptions = {
    state: "closed",
    scrollIntoView: true
};

/**
 *
 * @param {Element}element
 * @param {string} defaultsText
 * @param {{ state: "closed" | "open", scrollIntoView: boolean }} [options]
 */
function attachToElement(element, codeBlocks, options) {
    options = options || {};
    var state = options.state || DefaultOptions.state;
    var scrollIntoView = options.scrollIntoView !== undefined ? options.scrollIntoView : DefaultOptions.scrollIntoView;
    var parentNode = element.parentNode;
    var html = require("./mirror-console-inject-button.hbs");
    var divNode = newElement(html, localize(localization, userLang));
    divNode.className = "mirror-console-attach-button-wrapper";

    function enterEditAndRun() {
        var mirror = intendMirrorConsole(element, codeBlocks);
        if (scrollIntoView) {
            mirror.textareaHolder.scrollIntoView(true);
        }
        parentNode.removeChild(divNode);
    }

    divNode.querySelector(".mirror-console-run").addEventListener("click", enterEditAndRun);
    if (element.nextSibling === null) {
        parentNode.appendChild(divNode);
    } else {
        parentNode.insertBefore(divNode, element.nextSibling);
    }
    if (state === "open") {
        enterEditAndRun();
    }
}

function setUserContext(context) {
    userContext = context;
}

function setPreEval(func) {
    preEval = func;
}

export { attachToElement, setUserContext, setPreEval };
