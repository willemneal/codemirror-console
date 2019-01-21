"use strict";
var EvalContext = require("context-eval");
var CodeMirror = require("codemirror");
require("codemirror/mode/javascript/javascript");
function MirrorConsole() {
    this.editor = this.createEditor();
    this.buffers = {};
}
MirrorConsole.prototype.createEditor = function() {
    this.textareaHolder = document.createElement("div");
    this.textarea = document.createElement("textarea");
    this.textareaHolder.appendChild(this.textarea);
    return CodeMirror.fromTextArea(this.textarea);
};

MirrorConsole.prototype.addBuffer = function(text, mode) {
  this.buffers[mode] = CodeMirror.Doc(text, mode);
}
MirrorConsole.prototype.swapDoc = function (mode){
  return this.editor.swapDoc(this.buffers[mode]);
}

MirrorConsole.prototype.setText = function(value) {
    this.editor.setValue(value);
};
MirrorConsole.prototype.getText = function(value) {
    return this.editor.getValue();
};
MirrorConsole.prototype.swapWithElement = function(element) {
    this.originalElemenet = element;
    element.parentNode.replaceChild(this.textareaHolder, element);
    this.editor.refresh();
};
MirrorConsole.prototype.destroy = function(element) {
    if (this.originalElemenet == null) {
        throw new Error("Haven't `originalElement` : You have to call #swapWithElement before call this");
    }
    this.textareaHolder.parentNode.replaceChild(this.originalElemenet, this.textareaHolder);
    this.originalElemenet = null;
    this.textarea = null;
    this.textareaHolder = null;
    this.editor = null;
    if (this.evalContext) {
        this.evalContext.destroy();
    }
    Object.freeze(this);
};
MirrorConsole.prototype.runInContext = function(context, callback, _eval) {
    if (this.evalContext) {
        this.evalContext.destroy();
    }
    // var __eval;
    // if(!_eval){
    //   __eval = this.evalContext.evaluate
    // }else{
    //   __eval = (code) => _eval(context, code);
    // }
    console.log(this);
    var jsCode = _eval(context);
    this.evalContext = new EvalContext(context, this.textareaHolder);
    var res;
    try {
        res = this.evalContext.evaluate(jsCode);
        callback(null, res);
    } catch (error) {
        callback(error, res);
    }
};
module.exports = MirrorConsole;
