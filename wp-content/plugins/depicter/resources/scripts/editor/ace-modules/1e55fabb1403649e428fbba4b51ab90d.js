ace.define("ace/snippets",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/range_list","ace/keyboard/hash_handler","ace/tokenizer","ace/clipboard","ace/lib/dom","ace/editor"],(function(e,t,i){"use strict";var n=e("./lib/oop"),o=e("./lib/event_emitter").EventEmitter,r=e("./lib/lang"),s=e("./range").Range,a=e("./range_list").RangeList,c=e("./keyboard/hash_handler").HashHandler,l=e("./tokenizer").Tokenizer,h=e("./clipboard"),p={CURRENT_WORD:function(e){return e.session.getTextRange(e.session.getWordRange())},SELECTION:function(e,t,i){var n=e.session.getTextRange();return i?n.replace(/\n\r?([ \t]*\S)/g,"\n"+i+"$1"):n},CURRENT_LINE:function(e){return e.session.getLine(e.getCursorPosition().row)},PREV_LINE:function(e){return e.session.getLine(e.getCursorPosition().row-1)},LINE_INDEX:function(e){return e.getCursorPosition().row},LINE_NUMBER:function(e){return e.getCursorPosition().row+1},SOFT_TABS:function(e){return e.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(e){return e.session.getTabSize()},CLIPBOARD:function(e){return h.getText&&h.getText()},FILENAME:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0]},FILENAME_BASE:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(e){return this.FILEPATH(e).replace(/[^/\\]*$/,"")},FILEPATH:function(e){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(e){var t=e.session.$mode||{};return t.blockComment&&t.blockComment.start||""},BLOCK_COMMENT_END:function(e){var t=e.session.$mode||{};return t.blockComment&&t.blockComment.end||""},LINE_COMMENT:function(e){return(e.session.$mode||{}).lineCommentStart||""},CURRENT_YEAR:u.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:u.bind(null,{year:"2-digit"}),CURRENT_MONTH:u.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:u.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:u.bind(null,{month:"short"}),CURRENT_DATE:u.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:u.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:u.bind(null,{weekday:"short"}),CURRENT_HOUR:u.bind(null,{hour:"2-digit",hour12:!1}),CURRENT_MINUTE:u.bind(null,{minute:"2-digit"}),CURRENT_SECOND:u.bind(null,{second:"2-digit"})};function u(e){var t=(new Date).toLocaleString("en-us",e);return 1==t.length?"0"+t:t}p.SELECTED_TEXT=p.SELECTION;var d=function(){this.snippetMap={},this.snippetNameMap={}};(function(){n.implement(this,o),this.getTokenizer=function(){return d.$tokenizer||this.createTokenizer()},this.createTokenizer=function(){function e(e){return e=e.substr(1),/^\d+$/.test(e)?[{tabstopId:parseInt(e,10)}]:[{text:e}]}function t(e){return"(?:[^\\\\"+e+"]|\\\\.)"}var i={regex:"/("+t("/")+"+)/",onMatch:function(e,t,i){var n=i[0];return n.fmtString=!0,n.guard=e.slice(1,-1),n.flag="",""},next:"formatString"};return d.$tokenizer=new l({start:[{regex:/\\./,onMatch:function(e,t,i){var n=e[1];return("}"==n&&i.length||-1!="`$\\".indexOf(n))&&(e=n),[e]}},{regex:/}/,onMatch:function(e,t,i){return[i.length?i.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:e},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(t,i,n){var o=e(t.substr(1));return n.unshift(o[0]),o},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+t("\\|")+"*\\|",onMatch:function(e,t,i){var n=e.slice(1,-1).replace(/\\[,|\\]|,/g,(function(e){return 2==e.length?e[1]:"\0"})).split("\0").map((function(e){return{value:e}}));return i[0].choices=n,[n[0]]},next:"start"},i,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(e,t,i){return i.length&&i[0].expectElse?(i[0].expectElse=!1,i[0].ifEnd={elseEnd:i[0]},[i[0].ifEnd]):":"}},{regex:/\\./,onMatch:function(e,t,i){var n=e[1];return"}"==n&&i.length||-1!="`$\\".indexOf(n)?e=n:"n"==n?e="\n":"t"==n?e="\t":-1!="ulULE".indexOf(n)&&(e={changeCase:n,local:n>"a"}),[e]}},{regex:"/\\w*}",onMatch:function(e,t,i){var n=i.shift();return n&&(n.flag=e.slice(1,-1)),this.next=n&&n.tabstopId?"start":"",[n||e]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(e,t,i){return[{text:e.slice(1)}]}},{regex:/\${\w+/,onMatch:function(e,t,i){var n={text:e.slice(2)};return i.unshift(n),[n]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:!1},{regex:/}/,onMatch:function(e,t,i){var n=i.shift();return this.next=n&&n.tabstopId?"start":"",[n||e]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(e,t,i){return i[0].formatFunction=e.slice(2,-1),[i.shift()]},next:"formatString"},i,{regex:/:[\?\-+]?/,onMatch:function(e,t,i){"+"==e[1]&&(i[0].ifEnd=i[0]),"?"==e[1]&&(i[0].expectElse=!0)},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]})},this.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map((function(e){return e.value||e}))},this.getVariableValue=function(e,t,i){if(/^\d+$/.test(t))return(this.variables.__||{})[t]||"";if(/^[A-Z]\d+$/.test(t))return(this.variables[t[0]+"__"]||{})[t.substr(1)]||"";if(t=t.replace(/^TM_/,""),!this.variables.hasOwnProperty(t))return"";var n=this.variables[t];return"function"==typeof n&&(n=this.variables[t](e,t,i)),null==n?"":n},this.variables=p,this.tmStrFormat=function(e,t,i){if(!t.fmt)return e;var n=t.flag||"",o=t.guard;o=new RegExp(o,n.replace(/[^gim]/g,""));var r="string"==typeof t.fmt?this.tokenizeTmSnippet(t.fmt,"formatString"):t.fmt,s=this,a=e.replace(o,(function(){var e=s.variables.__;s.variables.__=[].slice.call(arguments);for(var t=s.resolveVariables(r,i),n="E",o=0;o<t.length;o++){var a=t[o];if("object"==typeof a)if(t[o]="",a.changeCase&&a.local){var c=t[o+1];c&&"string"==typeof c&&("u"==a.changeCase?t[o]=c[0].toUpperCase():t[o]=c[0].toLowerCase(),t[o+1]=c.substr(1))}else a.changeCase&&(n=a.changeCase);else"U"==n?t[o]=a.toUpperCase():"L"==n&&(t[o]=a.toLowerCase())}return s.variables.__=e,t.join("")}));return a},this.tmFormatFunction=function(e,t,i){return"upcase"==t.formatFunction?e.toUpperCase():"downcase"==t.formatFunction?e.toLowerCase():e},this.resolveVariables=function(e,t){for(var i=[],n="",o=!0,r=0;r<e.length;r++){var s=e[r];if("string"!=typeof s){if(s){if(o=!1,s.fmtString){var a=e.indexOf(s,r+1);-1==a&&(a=e.length),s.fmt=e.slice(r+1,a),r=a}if(s.text){var c=this.getVariableValue(t,s.text,n)+"";s.fmtString&&(c=this.tmStrFormat(c,s,t)),s.formatFunction&&(c=this.tmFormatFunction(c,s,t)),c&&!s.ifEnd?(i.push(c),l(s)):!c&&s.ifEnd&&l(s.ifEnd)}else s.elseEnd?l(s.elseEnd):(null!=s.tabstopId||null!=s.changeCase)&&i.push(s)}}else i.push(s),"\n"==s?(o=!0,n=""):o&&(n=/^\t*/.exec(s)[0],o=/\S/.test(s))}function l(t){var i=e.indexOf(t,r+1);-1!=i&&(r=i)}return i},this.insertSnippetForSelection=function(e,t){var i=e.getCursorPosition(),n=e.session.getLine(i.row),o=e.session.getTabString(),r=n.match(/^\s*/)[0];i.column<r.length&&(r=r.slice(0,i.column)),t=t.replace(/\r/g,"");var s=this.tokenizeTmSnippet(t);s=(s=this.resolveVariables(s,e)).map((function(e){return"\n"==e?e+r:"string"==typeof e?e.replace(/\t/g,o):e}));var a=[];s.forEach((function(e,t){if("object"==typeof e){var i=e.tabstopId,n=a[i];if(n||((n=a[i]=[]).index=i,n.value="",n.parents={}),-1===n.indexOf(e)){e.choices&&!n.choices&&(n.choices=e.choices),n.push(e);var o=s.indexOf(e,t+1);if(-1!==o){var r=s.slice(t+1,o);r.some((function(e){return"object"==typeof e}))&&!n.value?n.value=r:!r.length||n.value&&"string"==typeof n.value||(n.value=r.join(""))}}}})),a.forEach((function(e){e.length=0}));var c={};function l(e){for(var t=[],i=0;i<e.length;i++){var n=e[i];if("object"==typeof n){if(c[n.tabstopId])continue;n=t[e.lastIndexOf(n,i-1)]||{tabstopId:n.tabstopId}}t[i]=n}return t}for(var h=0;h<s.length;h++){var p=s[h];if("object"==typeof p){var u=p.tabstopId,d=a[u],g=s.indexOf(p,h+1);if(c[u])c[u]===p&&(delete c[u],Object.keys(c).forEach((function(e){d.parents[e]=!0})));else{c[u]=p;var m=d.value;"string"!=typeof m?m=l(m):p.fmt&&(m=this.tmStrFormat(m,p,e)),s.splice.apply(s,[h+1,Math.max(0,g-h)].concat(m,p)),-1===d.indexOf(p)&&d.push(p)}}}var b=0,v=0,x="";s.forEach((function(e){if("string"==typeof e){var t=e.split("\n");t.length>1?(v=t[t.length-1].length,b+=t.length-1):v+=e.length,x+=e}else e&&(e.start?e.end={row:b,column:v}:e.start={row:b,column:v})}));var T=e.getSelectionRange(),w=e.session.replace(T,x),y=new f(e),C=e.inVirtualSelectionMode&&e.selection.index;y.addTabstops(a,T.start,w,C)},this.insertSnippet=function(e,t){var i=this;if(e.inVirtualSelectionMode)return i.insertSnippetForSelection(e,t);e.forEachSelection((function(){i.insertSnippetForSelection(e,t)}),null,{keepOrder:!0}),e.tabstopManager&&e.tabstopManager.tabNext()},this.$getScope=function(e){var t=e.session.$mode.$id||"";if("html"===(t=t.split("/").pop())||"php"===t){"php"!==t||e.session.$mode.inlinePhp||(t="html");var i=e.getCursorPosition(),n=e.session.getState(i.row);"object"==typeof n&&(n=n[0]),n.substring&&("js-"==n.substring(0,3)?t="javascript":"css-"==n.substring(0,4)?t="css":"php-"==n.substring(0,4)&&(t="php"))}return t},this.getActiveScopes=function(e){var t=this.$getScope(e),i=[t],n=this.snippetMap;return n[t]&&n[t].includeScopes&&i.push.apply(i,n[t].includeScopes),i.push("_"),i},this.expandWithTab=function(e,t){var i=this,n=e.forEachSelection((function(){return i.expandSnippetForSelection(e,t)}),null,{keepOrder:!0});return n&&e.tabstopManager&&e.tabstopManager.tabNext(),n},this.expandSnippetForSelection=function(e,t){var i,n=e.getCursorPosition(),o=e.session.getLine(n.row),r=o.substring(0,n.column),s=o.substr(n.column),a=this.snippetMap;return this.getActiveScopes(e).some((function(e){var t=a[e];return t&&(i=this.findMatchingSnippet(t,r,s)),!!i}),this),!!i&&(t&&t.dryRun||(e.session.doc.removeInLine(n.row,n.column-i.replaceBefore.length,n.column+i.replaceAfter.length),this.variables.M__=i.matchBefore,this.variables.T__=i.matchAfter,this.insertSnippetForSelection(e,i.content),this.variables.M__=this.variables.T__=null),!0)},this.findMatchingSnippet=function(e,t,i){for(var n=e.length;n--;){var o=e[n];if((!o.startRe||o.startRe.test(t))&&((!o.endRe||o.endRe.test(i))&&(o.startRe||o.endRe)))return o.matchBefore=o.startRe?o.startRe.exec(t):[""],o.matchAfter=o.endRe?o.endRe.exec(i):[""],o.replaceBefore=o.triggerRe?o.triggerRe.exec(t)[0]:"",o.replaceAfter=o.endTriggerRe?o.endTriggerRe.exec(i)[0]:"",o}},this.snippetMap={},this.snippetNameMap={},this.register=function(e,t){var i=this.snippetMap,n=this.snippetNameMap,o=this;function s(e){return e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e)&&(e="(?:"+e+")"),e||""}function a(e,t,i){return e=s(e),t=s(t),i?(e=t+e)&&"$"!=e[e.length-1]&&(e+="$"):(e+=t)&&"^"!=e[0]&&(e="^"+e),new RegExp(e)}function c(e){e.scope||(e.scope=t||"_"),t=e.scope,i[t]||(i[t]=[],n[t]={});var s=n[t];if(e.name){var c=s[e.name];c&&o.unregister(c),s[e.name]=e}i[t].push(e),e.prefix&&(e.tabTrigger=e.prefix),!e.content&&e.body&&(e.content=Array.isArray(e.body)?e.body.join("\n"):e.body),e.tabTrigger&&!e.trigger&&(!e.guard&&/^\w/.test(e.tabTrigger)&&(e.guard="\\b"),e.trigger=r.escapeRegExp(e.tabTrigger)),(e.trigger||e.guard||e.endTrigger||e.endGuard)&&(e.startRe=a(e.trigger,e.guard,!0),e.triggerRe=new RegExp(e.trigger),e.endRe=a(e.endTrigger,e.endGuard,!0),e.endTriggerRe=new RegExp(e.endTrigger))}e||(e=[]),Array.isArray(e)?e.forEach(c):Object.keys(e).forEach((function(t){c(e[t])})),this._signal("registerSnippets",{scope:t})},this.unregister=function(e,t){var i=this.snippetMap,n=this.snippetNameMap;function o(e){var o=n[e.scope||t];if(o&&o[e.name]){delete o[e.name];var r=i[e.scope||t],s=r&&r.indexOf(e);s>=0&&r.splice(s,1)}}e.content?o(e):Array.isArray(e)&&e.forEach(o)},this.parseSnippetFile=function(e){e=e.replace(/\r/g,"");for(var t,i=[],n={},o=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;t=o.exec(e);){if(t[1])try{n=JSON.parse(t[1]),i.push(n)}catch(e){}if(t[4])n.content=t[4].replace(/^\t/gm,""),i.push(n),n={};else{var r=t[2],s=t[3];if("regex"==r){var a=/\/((?:[^\/\\]|\\.)*)|$/g;n.guard=a.exec(s)[1],n.trigger=a.exec(s)[1],n.endTrigger=a.exec(s)[1],n.endGuard=a.exec(s)[1]}else"snippet"==r?(n.tabTrigger=s.match(/^\S*/)[0],n.name||(n.name=s)):r&&(n[r]=s)}}return i},this.getSnippetByName=function(e,t){var i,n=this.snippetNameMap;return this.getActiveScopes(t).some((function(t){var o=n[t];return o&&(i=o[e]),!!i}),this),i}}).call(d.prototype);var f=function(e){if(e.tabstopManager)return e.tabstopManager;e.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=r.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(e)};(function(){this.attach=function(e){this.index=0,this.ranges=[],this.tabstops=[],this.$openTabstops=null,this.selectedTabstop=null,this.editor=e,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges=null,this.tabstops=null,this.selectedTabstop=null,this.editor.removeListener("change",this.$onChange),this.editor.removeListener("changeSelection",this.$onChangeSelection),this.editor.removeListener("changeSession",this.$onChangeSession),this.editor.commands.removeListener("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.editor=null},this.onChange=function(e){for(var t="r"==e.action[0],i=this.selectedTabstop||{},n=i.parents||{},o=(this.tabstops||[]).slice(),r=0;r<o.length;r++){var s=o[r],a=s==i||n[s.index];if(s.rangeList.$bias=a?0:1,"remove"==e.action&&s!==i){var c=s.parents&&s.parents[i.index],l=s.rangeList.pointIndex(e.start,c);l=l<0?-l-1:l+1;var h=s.rangeList.pointIndex(e.end,c);h=h<0?-h-1:h-1;for(var p=s.rangeList.ranges.slice(l,h),u=0;u<p.length;u++)this.removeRange(p[u])}s.rangeList.$onChange(e)}var d=this.editor.session;this.$inChange||!t||1!=d.getLength()||d.getValue()||this.detach()},this.updateLinkedFields=function(){var e=this.selectedTabstop;if(e&&e.hasLinkedRanges&&e.firstNonLinked){this.$inChange=!0;for(var i=this.editor.session,n=i.getTextRange(e.firstNonLinked),o=0;o<e.length;o++){var r=e[o];if(r.linked){var s=r.original,a=t.snippetManager.tmStrFormat(n,s,this.editor);i.replace(r,a)}}this.$inChange=!1}},this.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},this.onChangeSelection=function(){if(this.editor){for(var e=this.editor.selection.lead,t=this.editor.selection.anchor,i=this.editor.selection.isEmpty(),n=0;n<this.ranges.length;n++)if(!this.ranges[n].linked){var o=this.ranges[n].contains(e.row,e.column),r=i||this.ranges[n].contains(t.row,t.column);if(o&&r)return}this.detach()}},this.onChangeSession=function(){this.detach()},this.tabNext=function(e){var t=this.tabstops.length,i=this.index+(e||1);(i=Math.min(Math.max(i,1),t))==t&&(i=0),this.selectTabstop(i),0===i&&this.detach()},this.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t&&this.addTabstopMarkers(t),this.index=e,(t=this.tabstops[this.index])&&t.length){this.selectedTabstop=t;var i=t.firstNonLinked||t;if(t.choices&&(i.cursor=i.start),this.editor.inVirtualSelectionMode)this.editor.selection.fromOrientedRange(i);else{var n=this.editor.multiSelect;n.toSingleRange(i);for(var o=0;o<t.length;o++)t.hasLinkedRanges&&t[o].linked||n.addRange(t[o].clone(),!0)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler),this.selectedTabstop&&this.selectedTabstop.choices&&this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})}},this.addTabstops=function(e,t,i){var n=this.useLink||!this.editor.getOption("enableMultiselect");if(this.$openTabstops||(this.$openTabstops=[]),!e[0]){var o=s.fromPoints(i,i);m(o.start,t),m(o.end,t),e[0]=[o],e[0].index=0}var r=[this.index+1,0],c=this.ranges;e.forEach((function(e,i){for(var o=this.$openTabstops[i]||e,l=0;l<e.length;l++){var h=e[l],p=s.fromPoints(h.start,h.end||h.start);g(p.start,t),g(p.end,t),p.original=h,p.tabstop=o,c.push(p),o!=e?o.unshift(p):o[l]=p,h.fmtString||o.firstNonLinked&&n?(p.linked=!0,o.hasLinkedRanges=!0):o.firstNonLinked||(o.firstNonLinked=p)}o.firstNonLinked||(o.hasLinkedRanges=!1),o===e&&(r.push(o),this.$openTabstops[i]=o),this.addTabstopMarkers(o),o.rangeList=o.rangeList||new a,o.rangeList.$bias=0,o.rangeList.addList(o)}),this),r.length>2&&(this.tabstops.length&&r.push(r.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,r))},this.addTabstopMarkers=function(e){var t=this.editor.session;e.forEach((function(e){e.markerId||(e.markerId=t.addMarker(e,"ace_snippet-marker","text"))}))},this.removeTabstopMarkers=function(e){var t=this.editor.session;e.forEach((function(e){t.removeMarker(e.markerId),e.markerId=null}))},this.removeRange=function(e){var t=e.tabstop.indexOf(e);-1!=t&&e.tabstop.splice(t,1),-1!=(t=this.ranges.indexOf(e))&&this.ranges.splice(t,1),-1!=(t=e.tabstop.rangeList.ranges.indexOf(e))&&e.tabstop.splice(t,1),this.editor.session.removeMarker(e.markerId),e.tabstop.length||(-1!=(t=this.tabstops.indexOf(e.tabstop))&&this.tabstops.splice(t,1),this.tabstops.length||this.detach())},this.keyboardHandler=new c,this.keyboardHandler.bindKeys({Tab:function(e){t.snippetManager&&t.snippetManager.expandWithTab(e)||(e.tabstopManager.tabNext(1),e.renderer.scrollCursorIntoView())},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1),e.renderer.scrollCursorIntoView()},Esc:function(e){e.tabstopManager.detach()}})}).call(f.prototype);var g=function(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row},m=function(e,t){e.row==t.row&&(e.column-=t.column),e.row-=t.row};e("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}"),t.snippetManager=new d;var b=e("./editor").Editor;(function(){this.insertSnippet=function(e,i){return t.snippetManager.insertSnippet(this,e,i)},this.expandSnippet=function(e){return t.snippetManager.expandWithTab(this,e)}}).call(b.prototype)})),ace.define("ace/autocomplete/popup",["require","exports","module","ace/virtual_renderer","ace/editor","ace/range","ace/lib/event","ace/lib/lang","ace/lib/dom"],(function(e,t,i){"use strict";var n=e("../virtual_renderer").VirtualRenderer,o=e("../editor").Editor,r=e("../range").Range,s=e("../lib/event"),a=e("../lib/lang"),c=e("../lib/dom"),l=function(e){var t=new n(e);t.$maxLines=4;var i=new o(t);return i.setHighlightActiveLine(!1),i.setShowPrintMargin(!1),i.renderer.setShowGutter(!1),i.renderer.setHighlightGutterLine(!1),i.$mouseHandler.$focusTimeout=0,i.$highlightTagPending=!0,i};c.importCssString(".ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {    background-color: #CAD6FA;    z-index: 1;}.ace_dark.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {    background-color: #3a674e;}.ace_editor.ace_autocomplete .ace_line-hover {    border: 1px solid #abbffe;    margin-top: -1px;    background: rgba(233,233,253,0.4);    position: absolute;    z-index: 2;}.ace_dark.ace_editor.ace_autocomplete .ace_line-hover {    border: 1px solid rgba(109, 150, 13, 0.8);    background: rgba(58, 103, 78, 0.62);}.ace_completion-meta {    opacity: 0.5;    margin: 0.9em;}.ace_completion-message {    color: blue;}.ace_editor.ace_autocomplete .ace_completion-highlight{    color: #2d69c7;}.ace_dark.ace_editor.ace_autocomplete .ace_completion-highlight{    color: #93ca12;}.ace_editor.ace_autocomplete {    width: 300px;    z-index: 200000;    border: 1px lightgray solid;    position: fixed;    box-shadow: 2px 3px 5px rgba(0,0,0,.2);    line-height: 1.4;    background: #fefefe;    color: #111;}.ace_dark.ace_editor.ace_autocomplete {    border: 1px #484747 solid;    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.51);    line-height: 1.4;    background: #25282c;    color: #c1c1c1;}","autocompletion.css"),t.AcePopup=function(e){var t=c.createElement("div"),i=new l(t);e&&e.appendChild(t),t.style.display="none",i.renderer.content.style.cursor="default",i.renderer.setStyle("ace_autocomplete"),i.setOption("displayIndentGuides",!1),i.setOption("dragDelay",150);var n,o=function(){};i.focus=o,i.$isFocused=!0,i.renderer.$cursorLayer.restartTimer=o,i.renderer.$cursorLayer.element.style.opacity=0,i.renderer.$maxLines=8,i.renderer.$keepTextAreaAtCursor=!1,i.setHighlightActiveLine(!1),i.session.highlight(""),i.session.$searchHighlight.clazz="ace_highlight-marker",i.on("mousedown",(function(e){var t=e.getDocumentPosition();i.selection.moveToPosition(t),p.start.row=p.end.row=t.row,e.stop()}));var h=new r(-1,0,-1,1/0),p=new r(-1,0,-1,1/0);p.id=i.session.addMarker(p,"ace_active-line","fullLine"),i.setSelectOnHover=function(e){e?h.id&&(i.session.removeMarker(h.id),h.id=null):h.id=i.session.addMarker(h,"ace_line-hover","fullLine")},i.setSelectOnHover(!1),i.on("mousemove",(function(e){if(n){if(n.x!=e.x||n.y!=e.y){(n=e).scrollTop=i.renderer.scrollTop;var t=n.getDocumentPosition().row;h.start.row!=t&&(h.id||i.setRow(t),d(t))}}else n=e})),i.renderer.on("beforeRender",(function(){if(n&&-1!=h.start.row){n.$pos=null;var e=n.getDocumentPosition().row;h.id||i.setRow(e),d(e,!0)}})),i.renderer.on("afterRender",(function(){var e=i.getRow(),t=i.renderer.$textLayer,n=t.element.childNodes[e-t.config.firstRow];n!==t.selectedNode&&t.selectedNode&&c.removeCssClass(t.selectedNode,"ace_selected"),t.selectedNode=n,n&&c.addCssClass(n,"ace_selected")}));var u=function(){d(-1)},d=function(e,t){e!==h.start.row&&(h.start.row=h.end.row=e,t||i.session._emit("changeBackMarker"),i._emit("changeHoverMarker"))};i.getHoveredRow=function(){return h.start.row},s.addListener(i.container,"mouseout",u),i.on("hide",u),i.on("changeSelection",u),i.session.doc.getLength=function(){return i.data.length},i.session.doc.getLine=function(e){var t=i.data[e];return"string"==typeof t?t:t&&t.value||""};var f=i.session.bgTokenizer;return f.$tokenizeRow=function(e){var t=i.data[e],n=[];if(!t)return n;"string"==typeof t&&(t={value:t});var o=t.caption||t.value||t.name;function r(e,i){e&&n.push({type:(t.className||"")+(i||""),value:e})}for(var s=o.toLowerCase(),a=(i.filterText||"").toLowerCase(),c=0,l=0,h=0;h<=a.length;h++)if(h!=l&&(t.matchMask&1<<h||h==a.length)){var p=a.slice(l,h);l=h;var u=s.indexOf(p,c);if(-1==u)continue;r(o.slice(c,u),""),c=u+p.length,r(o.slice(u,c),"completion-highlight")}return r(o.slice(c,o.length),""),t.meta&&n.push({type:"completion-meta",value:t.meta}),t.message&&n.push({type:"completion-message",value:t.message}),n},f.$updateOnChange=o,f.start=o,i.session.$computeWidth=function(){return this.screenWidth=0},i.isOpen=!1,i.isTopdown=!1,i.autoSelect=!0,i.filterText="",i.data=[],i.setData=function(e,t){i.filterText=t||"",i.setValue(a.stringRepeat("\n",e.length),-1),i.data=e||[],i.setRow(0)},i.getData=function(e){return i.data[e]},i.getRow=function(){return p.start.row},i.setRow=function(e){e=Math.max(this.autoSelect?0:-1,Math.min(this.data.length,e)),p.start.row!=e&&(i.selection.clearSelection(),p.start.row=p.end.row=e||0,i.session._emit("changeBackMarker"),i.moveCursorTo(e||0,0),i.isOpen&&i._signal("select"))},i.on("changeSelection",(function(){i.isOpen&&i.setRow(i.selection.lead.row),i.renderer.scrollCursorIntoView()})),i.hide=function(){this.container.style.display="none",this._signal("hide"),i.isOpen=!1},i.show=function(e,t,o){var r=this.container,s=window.innerHeight,a=window.innerWidth,c=this.renderer,l=c.$maxLines*t*1.4,h=e.top+this.$borderSize;h>s/2&&!o&&h+t+l>s?(c.$maxPixelHeight=h-2*this.$borderSize,r.style.top="",r.style.bottom=s-h+"px",i.isTopdown=!1):(h+=t,c.$maxPixelHeight=s-h-.2*t,r.style.top=h+"px",r.style.bottom="",i.isTopdown=!0),r.style.display="";var p=e.left;p+r.offsetWidth>a&&(p=a-r.offsetWidth),r.style.left=p+"px",this._signal("show"),n=null,i.isOpen=!0},i.goTo=function(e){var t=this.getRow(),i=this.session.getLength()-1;switch(e){case"up":t=t<=0?i:t-1;break;case"down":t=t>=i?-1:t+1;break;case"start":t=0;break;case"end":t=i}this.setRow(t)},i.getTextLeftOffset=function(){return this.$borderSize+this.renderer.$padding+this.$imageSize},i.$imageSize=0,i.$borderSize=1,i},t.$singleLineEditor=l})),ace.define("ace/autocomplete/util",["require","exports","module"],(function(e,t,i){"use strict";t.parForEach=function(e,t,i){var n=0,o=e.length;0===o&&i();for(var r=0;r<o;r++)t(e[r],(function(e,t){++n===o&&i(e,t)}))};var n=/[a-zA-Z_0-9\$\-\u00A2-\u2000\u2070-\uFFFF]/;t.retrievePrecedingIdentifier=function(e,t,i){i=i||n;for(var o=[],r=t-1;r>=0&&i.test(e[r]);r--)o.push(e[r]);return o.reverse().join("")},t.retrieveFollowingIdentifier=function(e,t,i){i=i||n;for(var o=[],r=t;r<e.length&&i.test(e[r]);r++)o.push(e[r]);return o},t.getCompletionPrefix=function(e){var t,i=e.getCursorPosition(),n=e.session.getLine(i.row);return e.completers.forEach(function(e){e.identifierRegexps&&e.identifierRegexps.forEach(function(e){!t&&e&&(t=this.retrievePrecedingIdentifier(n,i.column,e))}.bind(this))}.bind(this)),t||this.retrievePrecedingIdentifier(n,i.column)}})),ace.define("ace/autocomplete",["require","exports","module","ace/keyboard/hash_handler","ace/autocomplete/popup","ace/autocomplete/util","ace/lib/lang","ace/lib/dom","ace/snippets","ace/config"],(function(e,t,i){"use strict";var n=e("./keyboard/hash_handler").HashHandler,o=e("./autocomplete/popup").AcePopup,r=e("./autocomplete/util"),s=e("./lib/lang"),a=e("./lib/dom"),c=e("./snippets").snippetManager,l=e("./config"),h=function(){this.autoInsert=!1,this.autoSelect=!0,this.exactMatch=!1,this.gatherCompletionsId=0,this.keyboardHandler=new n,this.keyboardHandler.bindKeys(this.commands),this.blurListener=this.blurListener.bind(this),this.changeListener=this.changeListener.bind(this),this.mousedownListener=this.mousedownListener.bind(this),this.mousewheelListener=this.mousewheelListener.bind(this),this.changeTimer=s.delayedCall(function(){this.updateCompletions(!0)}.bind(this)),this.tooltipTimer=s.delayedCall(this.updateDocTooltip.bind(this),50)};(function(){this.$init=function(){return this.popup=new o(document.body||document.documentElement),this.popup.on("click",function(e){this.insertMatch(),e.stop()}.bind(this)),this.popup.focus=this.editor.focus.bind(this.editor),this.popup.on("show",this.tooltipTimer.bind(null,null)),this.popup.on("select",this.tooltipTimer.bind(null,null)),this.popup.on("changeHoverMarker",this.tooltipTimer.bind(null,null)),this.popup},this.getPopup=function(){return this.popup||this.$init()},this.openPopup=function(e,t,i){this.popup||this.$init(),this.popup.autoSelect=this.autoSelect,this.popup.setData(this.completions.filtered,this.completions.filterText),e.keyBinding.addKeyboardHandler(this.keyboardHandler);var n=e.renderer;if(this.popup.setRow(this.autoSelect?0:-1),i)i&&!t&&this.detach();else{this.popup.setTheme(e.getTheme()),this.popup.setFontSize(e.getFontSize());var o=n.layerConfig.lineHeight,r=n.$cursorLayer.getPixelPosition(this.base,!0);r.left-=this.popup.getTextLeftOffset();var s=e.container.getBoundingClientRect();r.top+=s.top-n.layerConfig.offset,r.left+=s.left-e.renderer.scrollLeft,r.left+=n.gutterWidth,this.popup.show(r,o)}this.changeTimer.cancel()},this.detach=function(){this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.off("changeSelection",this.changeListener),this.editor.off("blur",this.blurListener),this.editor.off("mousedown",this.mousedownListener),this.editor.off("mousewheel",this.mousewheelListener),this.changeTimer.cancel(),this.hideDocTooltip(),this.gatherCompletionsId+=1,this.popup&&this.popup.isOpen&&this.popup.hide(),this.base&&this.base.detach(),this.activated=!1,this.completions=this.base=null},this.changeListener=function(e){var t=this.editor.selection.lead;(t.row!=this.base.row||t.column<this.base.column)&&this.detach(),this.activated?this.changeTimer.schedule():this.detach()},this.blurListener=function(e){var t=document.activeElement,i=this.editor.textInput.getElement(),n=e.relatedTarget&&this.tooltipNode&&this.tooltipNode.contains(e.relatedTarget),o=this.popup&&this.popup.container;t==i||t.parentNode==o||n||t==this.tooltipNode||e.relatedTarget==i||this.detach()},this.mousedownListener=function(e){this.detach()},this.mousewheelListener=function(e){this.detach()},this.goTo=function(e){this.popup.goTo(e)},this.insertMatch=function(e,t){if(e||(e=this.popup.getData(this.popup.getRow())),!e)return!1;var i=this.completions;if(this.editor.startOperation({command:{name:"insertMatch"}}),e.completer&&e.completer.insertMatch)e.completer.insertMatch(this.editor,e);else{if(i.filterText)for(var n,o=this.editor.selection.getAllRanges(),r=0;n=o[r];r++)n.start.column-=i.filterText.length,this.editor.session.remove(n);e.snippet?c.insertSnippet(this.editor,e.snippet):this.editor.execCommand("insertstring",e.value||e)}this.completions==i&&this.detach(),this.editor.endOperation()},this.commands={Up:function(e){e.completer.goTo("up")},Down:function(e){e.completer.goTo("down")},"Ctrl-Up|Ctrl-Home":function(e){e.completer.goTo("start")},"Ctrl-Down|Ctrl-End":function(e){e.completer.goTo("end")},Esc:function(e){e.completer.detach()},Return:function(e){return e.completer.insertMatch()},"Shift-Return":function(e){e.completer.insertMatch(null,{deleteSuffix:!0})},Tab:function(e){var t=e.completer.insertMatch();if(t||e.tabstopManager)return t;e.completer.goTo("down")},PageUp:function(e){e.completer.popup.gotoPageUp()},PageDown:function(e){e.completer.popup.gotoPageDown()}},this.gatherCompletions=function(e,t){var i=e.getSession(),n=e.getCursorPosition(),o=r.getCompletionPrefix(e);this.base=i.doc.createAnchor(n.row,n.column-o.length),this.base.$insertRight=!0;var s=[],a=e.completers.length;return e.completers.forEach((function(c,l){c.getCompletions(e,i,n,o,(function(i,n){!i&&n&&(s=s.concat(n)),t(null,{prefix:r.getCompletionPrefix(e),matches:s,finished:0==--a})}))})),!0},this.showPopup=function(e,t){this.editor&&this.detach(),this.activated=!0,this.editor=e,e.completer!=this&&(e.completer&&e.completer.detach(),e.completer=this),e.on("changeSelection",this.changeListener),e.on("blur",this.blurListener),e.on("mousedown",this.mousedownListener),e.on("mousewheel",this.mousewheelListener),this.updateCompletions(!1,t)},this.updateCompletions=function(e,t){if(e&&this.base&&this.completions){var i=this.editor.getCursorPosition(),n=this.editor.session.getTextRange({start:this.base,end:i});if(n==this.completions.filterText)return;return this.completions.setFilter(n),this.completions.filtered.length?1!=this.completions.filtered.length||this.completions.filtered[0].value!=n||this.completions.filtered[0].snippet?void this.openPopup(this.editor,n,e):this.detach():this.detach()}if(t&&t.matches){i=this.editor.getSelectionRange().start;return this.base=this.editor.session.doc.createAnchor(i.row,i.column),this.base.$insertRight=!0,this.completions=new p(t.matches),this.openPopup(this.editor,"",e)}var o=this.gatherCompletionsId;this.gatherCompletions(this.editor,function(t,i){var n=function(){if(i.finished)return this.detach()}.bind(this),r=i.prefix,s=i&&i.matches;if(!s||!s.length)return n();if(0===r.indexOf(i.prefix)&&o==this.gatherCompletionsId){this.completions=new p(s),this.exactMatch&&(this.completions.exactMatch=!0),this.completions.setFilter(r);var a=this.completions.filtered;return a.length&&(1!=a.length||a[0].value!=r||a[0].snippet)?this.autoInsert&&1==a.length&&i.finished?this.insertMatch(a[0]):void this.openPopup(this.editor,r,e):n()}}.bind(this))},this.cancelContextMenu=function(){this.editor.$mouseHandler.cancelContextMenu()},this.updateDocTooltip=function(){var e=this.popup,t=e.data,i=t&&(t[e.getHoveredRow()]||t[e.getRow()]),n=null;return i&&this.editor&&this.popup.isOpen?(this.editor.completers.some((function(e){return e.getDocTooltip&&(n=e.getDocTooltip(i)),n})),n||"string"==typeof i||(n=i),"string"==typeof n&&(n={docText:n}),n&&(n.docHTML||n.docText)?void this.showDocTooltip(n):this.hideDocTooltip()):this.hideDocTooltip()},this.showDocTooltip=function(e){this.tooltipNode||(this.tooltipNode=a.createElement("div"),this.tooltipNode.className="ace_tooltip ace_doc-tooltip",this.tooltipNode.style.margin=0,this.tooltipNode.style.pointerEvents="auto",this.tooltipNode.tabIndex=-1,this.tooltipNode.onblur=this.blurListener.bind(this),this.tooltipNode.onclick=this.onTooltipClick.bind(this));var t=this.tooltipNode;e.docHTML?t.innerHTML=e.docHTML:e.docText&&(t.textContent=e.docText),t.parentNode||document.body.appendChild(t);var i=this.popup,n=i.container.getBoundingClientRect();t.style.top=i.container.style.top,t.style.bottom=i.container.style.bottom,t.style.display="block",window.innerWidth-n.right<320?n.left<320?i.isTopdown?(t.style.top=n.bottom+"px",t.style.left=n.left+"px",t.style.right="",t.style.bottom=""):(t.style.top=i.container.offsetTop-t.offsetHeight+"px",t.style.left=n.left+"px",t.style.right="",t.style.bottom=""):(t.style.right=window.innerWidth-n.left+"px",t.style.left=""):(t.style.left=n.right+1+"px",t.style.right="")},this.hideDocTooltip=function(){if(this.tooltipTimer.cancel(),this.tooltipNode){var e=this.tooltipNode;this.editor.isFocused()||document.activeElement!=e||this.editor.focus(),this.tooltipNode=null,e.parentNode&&e.parentNode.removeChild(e)}},this.onTooltipClick=function(e){for(var t=e.target;t&&t!=this.tooltipNode;){if("A"==t.nodeName&&t.href){t.rel="noreferrer",t.target="_blank";break}t=t.parentNode}},this.destroy=function(){if(this.detach(),this.popup){this.popup.destroy();var e=this.popup.container;e&&e.parentNode&&e.parentNode.removeChild(e)}this.editor&&this.editor.completer==this&&this.editor.completer,this.popup=null}}).call(h.prototype),h.for=function(e){return e.completer||(l.get("sharedPopups")?(h.$shared||(h.$sharedInstance=new h),e.completer=h.$sharedInstance):(e.completer=new h,e.once("destroy",(function(e,t){t.completer.destroy()})))),e.completer},h.startCommand={name:"startAutocomplete",exec:function(e,t){var i=h.for(e);i.autoInsert=!1,i.autoSelect=!0,i.showPopup(e,t),i.cancelContextMenu()},bindKey:"Ctrl-Space|Ctrl-Shift-Space|Alt-Space"};var p=function(e,t){this.all=e,this.filtered=e,this.filterText=t||"",this.exactMatch=!1};(function(){this.setFilter=function(e){if(e.length>this.filterText&&0===e.lastIndexOf(this.filterText,0))var t=this.filtered;else t=this.all;this.filterText=e,t=(t=this.filterCompletions(t,this.filterText)).sort((function(e,t){return t.exactMatch-e.exactMatch||t.$score-e.$score||(e.caption||e.value).localeCompare(t.caption||t.value)}));var i=null;t=t.filter((function(e){var t=e.snippet||e.caption||e.value;return t!==i&&(i=t,!0)})),this.filtered=t},this.filterCompletions=function(e,t){var i=[],n=t.toUpperCase(),o=t.toLowerCase();e:for(var r,s=0;r=e[s];s++){var a=r.caption||r.value||r.snippet;if(a){var c,l,h=-1,p=0,u=0;if(this.exactMatch){if(t!==a.substr(0,t.length))continue e}else{var d=a.toLowerCase().indexOf(o);if(d>-1)u=d;else for(var f=0;f<t.length;f++){var g=a.indexOf(o[f],h+1),m=a.indexOf(n[f],h+1);if((c=g>=0&&(m<0||g<m)?g:m)<0)continue e;(l=c-h-1)>0&&(-1===h&&(u+=10),u+=l,p|=1<<f),h=c}}r.matchMask=p,r.exactMatch=u?0:1,r.$score=(r.score||0)-u,i.push(r)}}return i}}).call(p.prototype),t.Autocomplete=h,t.FilteredList=p})),ace.define("ace/autocomplete/text_completer",["require","exports","module","ace/range"],(function(e,t,i){var n=e("../range").Range,o=/[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;function r(e,t){var i=function(e,t){return e.getTextRange(n.fromPoints({row:0,column:0},t)).split(o).length-1}(e,t),r=e.getValue().split(o),s=Object.create(null),a=r[i];return r.forEach((function(e,t){if(e&&e!==a){var n=Math.abs(i-t),o=r.length-n;s[e]?s[e]=Math.max(o,s[e]):s[e]=o}})),s}t.getCompletions=function(e,t,i,n,o){var s=r(t,i);o(null,Object.keys(s).map((function(e){return{caption:e,value:e,score:s[e],meta:"local"}})))}})),ace.define("ace/ext/language_tools",["require","exports","module","ace/snippets","ace/autocomplete","ace/config","ace/lib/lang","ace/autocomplete/util","ace/autocomplete/text_completer","ace/editor","ace/config"],(function(e,t,i){"use strict";var n=e("../snippets").snippetManager,o=e("../autocomplete").Autocomplete,r=e("../config"),s=e("../lib/lang"),a=e("../autocomplete/util"),c=e("../autocomplete/text_completer"),l={getCompletions:function(e,t,i,n,o){if(t.$mode.completer)return t.$mode.completer.getCompletions(e,t,i,n,o);var r=e.session.getState(i.row);o(null,t.$mode.getCompletions(r,t,i,n))}},h={getCompletions:function(e,t,i,o,r){var s=[],a=t.getTokenAt(i.row,i.column);a&&a.type.match(/(tag-name|tag-open|tag-whitespace|attribute-name|attribute-value)\.xml$/)?s.push("html-tag"):s=n.getActiveScopes(e);var c=n.snippetMap,l=[];s.forEach((function(e){for(var t=c[e]||[],i=t.length;i--;){var n=t[i],o=n.name||n.tabTrigger;o&&l.push({caption:o,snippet:n.content,meta:n.tabTrigger&&!n.name?n.tabTrigger+"⇥ ":"snippet",type:"snippet"})}}),this),r(null,l)},getDocTooltip:function(e){"snippet"!=e.type||e.docHTML||(e.docHTML=["<b>",s.escapeHTML(e.caption),"</b>","<hr></hr>",s.escapeHTML(e.snippet)].join(""))}},p=[h,c,l];t.setCompleters=function(e){p.length=0,e&&p.push.apply(p,e)},t.addCompleter=function(e){p.push(e)},t.textCompleter=c,t.keyWordCompleter=l,t.snippetCompleter=h;var u={name:"expandSnippet",exec:function(e){return n.expandWithTab(e)},bindKey:"Tab"},d=function(e,t){f(t.session.$mode)},f=function(e){"string"==typeof e&&(e=r.$modes[e]),e&&(n.files||(n.files={}),g(e.$id,e.snippetFileId),e.modes&&e.modes.forEach(f))},g=function(e,t){t&&e&&!n.files[e]&&(n.files[e]={},r.loadModule(t,(function(t){t&&(n.files[e]=t,!t.snippets&&t.snippetText&&(t.snippets=n.parseSnippetFile(t.snippetText)),n.register(t.snippets||[],t.scope),t.includeScopes&&(n.snippetMap[t.scope].includeScopes=t.includeScopes,t.includeScopes.forEach((function(e){f("ace/mode/"+e)}))))})))},m=function(e){var t=e.editor,i=t.completer&&t.completer.activated;if("backspace"===e.command.name)i&&!a.getCompletionPrefix(t)&&t.completer.detach();else if("insertstring"===e.command.name){if(a.getCompletionPrefix(t)&&!i){var n=o.for(t);n.autoInsert=!1,n.showPopup(t)}}},b=e("../editor").Editor;e("../config").defineOptions(b.prototype,"editor",{enableBasicAutocompletion:{set:function(e){e?(this.completers||(this.completers=Array.isArray(e)?e:p),this.commands.addCommand(o.startCommand)):this.commands.removeCommand(o.startCommand)},value:!1},enableLiveAutocompletion:{set:function(e){e?(this.completers||(this.completers=Array.isArray(e)?e:p),this.commands.on("afterExec",m)):this.commands.removeListener("afterExec",m)},value:!1},enableSnippets:{set:function(e){e?(this.commands.addCommand(u),this.on("changeMode",d),d(0,this)):(this.commands.removeCommand(u),this.off("changeMode",d))},value:!1}})})),ace.require(["ace/ext/language_tools"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));