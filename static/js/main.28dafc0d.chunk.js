(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),react_redux__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3),_RVector__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(14),_RMatrix__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(15),parsedData={},ParserComponent=function ParserComponent(state){return state.parsers.parsers.map(function(parser){var name=parser.name,func=parser.func,outputType=parser.output,textInput=state.textInput,text=textInput.text;if(text){var _eval=eval(func)(text,parsedData),data=_eval.data,warning=_eval.warning,output;switch(parsedData[name]=data,outputType){case"vector":output=data.length>0?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,warning,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RVector__WEBPACK_IMPORTED_MODULE_2__.a,{array:data,name:name})):"No results";break;case"matrix":output=data[0]?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b",null,warning),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RMatrix__WEBPACK_IMPORTED_MODULE_3__.a,{matrix:data,name:name})):"No results";break;default:output=react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,JSON.stringify(data))}return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{key:name,style:{borderBottom:"1px dashed gray",marginBottom:"1rem",paddingBottom:"1rem"}},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span",{style:{fontFamily:"Courier"}},"filter name:\xa0",name)),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button",{className:"btn btn-outline-secondary",type:"button","data-toggle":"collapse","data-target":"#"+name+"collapse","aria-expanded":"false","aria-controls":name+"collapse"},"show parser code"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{className:"collapse",id:name+"collapse"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code",null,func))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6",{className:"mt-1"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span",{style:{fontFamily:"Courier"}},"output")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code",null,output))}return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code",null,name)," waiting for data.")})},mapStateToProps=function(e){return{textInput:e.textInput,parsers:e.parsers}},Parser=Object(react_redux__WEBPACK_IMPORTED_MODULE_1__.b)(mapStateToProps)(ParserComponent);__webpack_exports__.a=Parser},14:function(e,t,a){"use strict";var n=a(0),r=a.n(n),_=function(e){var t=e.array,a=e.name;return r.a.createElement("code",null,a,"\xa0<- c(",t.map(function(e,a){return"".concat(JSON.stringify(e.value)).concat(t[a+1]?",":"")}),");")};_.defaultProps=function(){return{name:"No name!!!",array:[]}},t.a=_},15:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){var t=e.matrix,a=e.name,n=t[0].length,_=[];t.map(function(e){return _=_.concat(e)});var i="".concat(a," <- matrix(c(").concat(_,"), ncol=").concat(n,")");return r.a.createElement("div",null,i)}},16:function(e,t,a){e.exports=a(27)},27:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),_=a(9),i=a.n(_),c=a(3),s=a(2),u=a(12),o=a.n(u),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{text:""},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_TEXT_INPUT":var a=t.text;return Object.assign({},e,{text:a});default:return e}},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{parsers:[{name:"metadata",output:"vector",func:"\n        (textInput) => {\n          const regex = /Answer.([0-9])=(.+)/g;\n          const output = [];\n          do {\n            const data = regex.exec(textInput);\n            if (data) {\n              output.push({\n                question: data[1], \n                value: data[2],\n              });\n            }\n          } while (regex.lastIndex);\n          return { data: output };\n        }\n      "},{name:"data",output:"matrix",func:'\n        (textInput, { metadata }) => {\n          const regex = /[0-9]+, ([a-z])\\n[0-9]+, ([a-z])\\n[0-9]+, ([a-z])/g;\n          let warning = null;\n          const interactions = [];\n          do {\n            const data = regex.exec(textInput);\n            if (data) {\n              interactions.push({\n                fish1: data[1], \n                action: data[2],\n                fish2: data[3],\n              });\n            }\n          } while (regex.lastIndex);\n\n          const getFishKeys = () => {\n            const fish = [];\n            interactions.map(i => {\n              // if fishX isn\'t in array, push name to array\n              if(fish.indexOf(i.fish1) === -1) fish.push(i.fish1)\n              if(fish.indexOf(i.fish2) === -1) fish.push(i.fish2)\n            });\n            // return alphanetically sorted array of fish\n            return fish.sort();\n          }\n\n          const fish = getFishKeys();\n          // check to see that fish count match matrix dimensions\n          // if a fish doesn\'t interact with any other fish, the matrix may be too small\n          if (metadata[4]) {\n            if (parseInt(metadata[4].value) != fish.length) warning = "Warning: The parser did not find a number of fish equal to the number recorded in the metadata. Metadata reported " + metadata[4].value + " fish while the parser found " + fish.length + " fish."\n          }\n\n          const interactionMatrix = fish.map(thisFish => {\n            return fish.map(otherFish => {\n               let totalInteractionsInitiatedByThisFish = 0;\n               interactions.map(i => {\n                 if (i.fish1 === thisFish && i.fish2 === otherFish) {\n                   totalInteractionsInitiatedByThisFish += 1;\n                 }\n               })\n               return totalInteractionsInitiatedByThisFish;\n            })\n          })\n\n          return({ data: interactionMatrix, warning });\n        }\n      '}]};return(arguments.length>1?arguments[1]:void 0).type,e},E=Object(s.c)({textInput:l,parsers:d}),m=Object(s.d)(E,Object(s.a)(o.a)),p=(a(25),Object(c.b)(function(e){return{textInput:e.textInput}},function(e){return{updateTextInput:function(t){return e({type:"UPDATE_TEXT_INPUT",text:t.target.value})}}})(function(e){var t=e.textInput,a=e.updateTextInput;return r.a.createElement("div",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("textarea",{autoFocus:!0,value:t.text,onChange:a,rows:"5",placeholder:"Paste data here",className:"form-control"})))})),f=a(13),h=function(){return r.a.createElement(c.a,{store:m},r.a.createElement("div",{className:"container mt-2 mb-2"},r.a.createElement("h1",{style:{fontSize:"1.5rem",textAlign:"center"}},"fish data parser"),r.a.createElement("h6",null,"Input"),r.a.createElement(p,null),r.a.createElement("h6",null,"Output"),r.a.createElement("div",{className:"card container pt-2 pb-2"},r.a.createElement(f.a,null)),r.a.createElement("small",{className:"float-right text-right"},"Made in the mLab at Reed College in 2018.",r.a.createElement("br",null),"Questions? Email\xa0",r.a.createElement("a",{href:"mailto:fungj@reed.edu?subject=Fish data parser"},"fungj@reed.edu"),".")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[16,2,1]]]);
//# sourceMappingURL=main.28dafc0d.chunk.js.map