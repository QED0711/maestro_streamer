(this.webpackJsonpmaestro_video=this.webpackJsonpmaestro_video||[]).push([[0],{101:function(e,t){},104:function(e,t,a){},105:function(e,t,a){},109:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(29),c=a.n(o),i=(a(62),a(63),a(64),a(10)),s=a(1),l=a(51),u=a.n(l),m={audioContext:null,masterGain:null,authority:null,knownAuthorities:{},sessionAuthorization:!0,ring:!1,userID:null,connectedUsers:[],localStreamID:null,streams:[],streamsData:{},videosPerRow:4,hiddenVideos:{},showIDs:!1,chat:[]},d=a(11),h=a(6),f=a(8),v={appendStream:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;console.log(e.id),this.setStateMaster((function(a){var n=Object(f.a)(a.streams);return n.map((function(e){return e.id})).includes(e.id)||n.push(e),"local"===t?{streams:n,localStreamID:e.id}:{streams:n}}))},appendStreamData:function(e,t){this.setStateMaster((function(a){var n=Object(h.a)({},a.streamsData);return n[e]=t,{streamsData:n}}))},appendKnownAuthority:function(e,t){this.setStateMaster((function(a){var n=Object(h.a)({},a.knownAuthorities);return n[e]=t,{knownAuthorities:n}}))},appendChatMessage:function(e){this.setStateMaster((function(t){var a=Object(f.a)(t.chat);return a.push(e),{chat:a}}))},removeStream:function(e){this.setStateMaster((function(t){var a=Object(f.a)(t.streams);return{streams:a=a.filter((function(t){return e!==t.id}))}}))},appendUser:function(e){this.setStateMaster((function(t){var a=Object(f.a)(t.connectedUsers);return a.push(e),{connectedUsers:a}}))},toggleRing:function(){this.setStateMaster((function(e){return{ring:!e.ring}}))},appendHiddenVideo:function(e,t){this.setStateMaster((function(a){var n=Object(h.a)({},a.hiddenVideos);return e in n||(n[e]=t),{hiddenVideos:n}}))},showHiddenVideo:function(e){this.setStateMaster((function(t){var a=Object(h.a)({},t.hiddenVideos);return delete a[e],{hiddenVideos:a}}))},setStreamOrder:function(e){this.setStateMaster((function(t){var a,n=[],r=Object(d.a)(e);try{var o=function(){var e=a.value;n.push(t.streams.find((function(t){return t.id===e[1]})))};for(r.s();!(a=r.n()).done;)o()}catch(c){r.e(c)}finally{r.f()}return console.log({streams:n}),{streams:n}}))}},g={getAuthority:function(){return this.state.authority},getKnownAuthorites:function(){return this.state.knownAuthorities},getRing:function(){return this.state.ring},getUserID:function(){return this.state.userID},getConnectedUsers:function(){return this.state.connectedUsers}},E=new u.a(m);E.addCustomSetters(v),E.addMethods(g);var p=E.context,b=E.createProvider(),y=a(3),O=a(30),S=a.n(O),C=(a(66),function(e){var t,a,n=new URLSearchParams(e),r={},o=Object(d.a)(n.keys());try{for(o.s();!(a=o.n()).done;){var c=a.value;t=n.getAll(c).length>1?n.getAll(c):n.get(c),(["0","0.0."].includes(t)||parseFloat(t))&&(t=parseFloat(t)),"false"===t&&(t=!1),"true"===t&&(t=!0),r[c]=t}}catch(i){o.e(i)}finally{o.f()}return r}),w=function(){var e=Object(n.useContext)(p),t=e.state,a=e.setters,o=C(window.location.search),c=Object(n.useState)(!0),i=Object(y.a)(c,2),s=i[0],l=i[1],u=Object(n.useState)(1),m=Object(y.a)(u,2),d=m[0],h=m[1];return Object(n.useEffect)((function(){if(function(){var e,n,r,o,c;t.streams.forEach((function(i){if(e=document.getElementById("video-".concat(i.id)),n=document.getElementById("gain-".concat(i.id)),c=document.getElementById("mute-btn-".concat(i.id)),e.paused&&!c.onclick){try{r=t.audioContext.createMediaStreamSource(i),o=t.audioContext.createGain()}catch(s){return void console.log(s)}r.connect(o),o.connect(t.masterGain),i.id===t.localStreamID&&(o.gain.value=0,n.disabled=!0,c.className="mute-btn mute-btn-muted"),n.onchange=function(e){o.gain.value=parseFloat(e.target.value)},c.onclick=function(e){if(n.disabled=!n.disabled,n.disabled)o.gain.value=0,c.className="mute-btn mute-btn-muted";else{var t=document.getElementById("gain-".concat(i.id)).value;o.gain.value=t,c.className="mute-btn mute-btn-unmuted"}},e.srcObject=i,e.muted=!0,e.controls="controls",e.addEventListener("loadedmetadata",(function(){e.play()})),e.addEventListener("mousedown",(function(e){e.preventDefault(),e.altKey&&a.removeStream(i.id)}))}}))}(),s&&t.masterGain){var e=document.getElementById("master-gain-meter"),n=S.a.createMeterNode(t.masterGain,t.audioContext);S.a.createMeter(e,n),l(!1)}}),[t.streams]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"media-panel"},t.streams.map((function(e){var n,c,i;return r.a.createElement("div",{className:"video-container video-container-hidden-".concat(e.id in t.hiddenVideos),id:e.id,key:e.id,style:{maxWidth:"calc(".concat(Math.round(1/t.videosPerRow*100),"% - 1rem)"),maxHeight:t.streams.length%t.videosPerRow===0?"calc(".concat(100/(t.streams.length/t.videosPerRow),"vh - 1rem)"):"calc(".concat(100/(Math.floor(t.streams.length/t.videosPerRow)+1),"vh) - 1rem")}},r.a.createElement("h3",{id:"name-".concat(e.id),className:"video-header user-name",onClick:(i=e.id,function(e){var t=document.getElementById("name-".concat(i)).innerText;a.appendHiddenVideo(i,t)})},t.localStreamID===e.id?o.name:(null===(n=t.streamsData[e.id])||void 0===n?void 0:n.name)||"--"),r.a.createElement("h4",{className:"video-header user-location"},t.localStreamID===e.id?o.location:(null===(c=t.streamsData[e.id])||void 0===c?void 0:c.location)||"--"),r.a.createElement("video",{id:"video-".concat(e.id)}),r.a.createElement("div",{className:"controls-container"},t.showIDs&&r.a.createElement("em",null,r.a.createElement("sub",{className:"sub-id"},e.id)),r.a.createElement("input",{id:"gain-".concat(e.id),className:"stream-gain",type:"range",min:"0",max:"1",step:"0.01"}),r.a.createElement("button",{id:"mute-btn-".concat(e.id),className:"mute-btn mute-btn-unmuted"})))}))),r.a.createElement("div",{className:"master-gain-container"},r.a.createElement("label",{htmlFor:"master-gain"},"Master Gain: ",d),r.a.createElement("br",null),r.a.createElement("input",{id:"master-gain",type:"range",min:"0",max:"1",step:"0.01",onChange:function(e){t.masterGain.gain.value=parseFloat(e.target.value),h(e.target.value)}}),r.a.createElement("div",{id:"master-gain-meter"})))},j=function(e){var t=Object(n.useContext)(p).state;Object(s.g)().sessionID;return t.sessionAuthorization?r.a.createElement("div",{id:"session-window"},r.a.createElement(w,null)):r.a.createElement(s.a,{to:"/"})},k=a(53),D=a.n(k),N=a(54),I=a.n(N),x=a(15),_=Object({NODE_ENV:"production",PUBLIC_URL:"/maestro_streamer",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER_HOST||x.server_host||window.location.hostname,R=Object({NODE_ENV:"production",PUBLIC_URL:"/maestro_streamer",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER_PORT||x.server_port,A=Object({NODE_ENV:"production",PUBLIC_URL:"/maestro_streamer",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER_PROTOCOL||x.server_protocol||"https",M=("".concat(A,"://").concat(_,":").concat(R,"/"),I()("https://maestrostreamer.com")),T={autoGainControl:!1,echoCancellation:!1,noiseSuppression:!1,sampleSize:16,channelCount:1},V=function(){var e=Object(n.useContext)(p),t=(e.state,e.setters),a=e.methods,o=Object(s.g)().sessionID;return Object(n.useEffect)((function(){var e=C(window.location.search);t.setAuthority(e.authority||"basic"),console.log(e),e.showIDs&&t.setShowIDs(!0);var n=new D.a(void 0,{path:"/peerjs",host:x.server_host});n.on("open",(function(e){t.setUserID(e),M.emit("join-session",{sessionID:o,userID:e})})),navigator.mediaDevices.getUserMedia({video:!1!==e.video&&Object(h.a)({},e),audio:!1!==e.audio&&Object(h.a)(Object(h.a)({},T),e)}).then((function(r){t.appendStream(r,"local");var o=function(e){M.emit("user-leaving",{streamID:r.id})};window.addEventListener("unload",o),window.addEventListener("beforeunload",o),n.on("call",(function(e){"admin"===a.getAuthority()||"admin"===e.metadata.authority?e.answer(r):e.answer(null),e.on("stream",(function(e){M.emit("request-user-data",{streamID:e.id}),t.appendStream(e)}))})),M.on("user-connected",(function(e){var o=e.userID,c=e.authority;if(console.log("RING: ".concat(c,",").concat(o)),console.log("CONNECTED USERS",a.getConnectedUsers()),!a.getConnectedUsers().includes(o)&&(["admin","monitor"].includes(c)||"admin"===a.getAuthority())){t.appendKnownAuthority(o,c);var i=n.call(o,r,{metadata:{authority:a.getAuthority()}});t.appendUser(o),i.on("stream",(function(e){t.appendStream(e)}))}})),M.on("data-requested",(function(t){t.streamID===r.id&&M.emit("data-response",Object(h.a)({streamID:r.id},e))}))})).catch((function(e){n.on("call",(function(e){e.answer(null),e.on("stream",(function(e){M.emit("request-user-data",{streamID:e.id}),t.appendStream(e)}))})),M.on("user-connected",(function(e){var r=e.userID,o=e.authority;if(console.log("RING: ".concat(o,",").concat(r)),console.log("CONNECTED USERS",a.getConnectedUsers()),!a.getConnectedUsers().includes(r)&&(["admin","monitor"].includes(o)||"admin"===a.getAuthority())){t.appendKnownAuthority(r,o);var c=n.call(r,null,{metadata:{authority:a.getAuthority()}});t.appendUser(r),c&&c.on("stream",(function(e){t.appendStream(e)}))}}))})),M.on("user-data-response",(function(e){t.appendStreamData(e.streamID,e)})),M.on("user-disconnected",(function(e){})),M.on("remove-stale-user",(function(e){console.log("WILL REMOVE STALE USER"),console.log(e),t.removeStream(e.streamID)})),M.on("message-received",(function(a){var n=a.name,r=a.message;t.appendChatMessage({name:n,message:r,self:n===e.name,time:Date.now()})}))}),[]),r.a.createElement(r.a.Fragment,null)},U=a(20),P=a.n(U),F=a(55),H=function(){var e=Object(n.useContext)(p),t=e.state,a=e.setters,o=e.methods,c=Object(s.g)().sessionID,i=function(){var e=Object(F.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.toggleRing();case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){if(t.ring)var e=setInterval((function(){var t=o.getUserID(),a=o.getRing(),n=o.getAuthority();t&&(a?M.emit("ring",{sessionID:c,userID:t,authority:n}):clearInterval(e))}),1e3)}),[t.ring]),r.a.createElement("div",{id:"config-panel"},r.a.createElement("button",{onClick:i},t.ring?"Stop Ringing":"Ring"))},L=(a(104),function(){var e=Object(n.useContext)(p),t=e.state,a=e.setters,o=Object(n.useState)(!0),c=Object(y.a)(o,2),i=c[0],l=c[1],u=C(window.location.search),m=Object(s.g)().sessionID,d=Object(n.useRef)(null),f=(Object(n.useRef)(null),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return"hours"===t&&e>12&&(e-=12),e>=10?e:"0".concat(e)});return Object(n.useEffect)((function(){var e=d.current;i&&(e.scrollTop=e.scrollHeight)}),[t.chat,i]),r.a.createElement("div",{id:"chat-box"},r.a.createElement("div",{id:"chat-box-display",ref:d,onScroll:function(e){var t=e.target.scrollTop+e.target.clientHeight;e.target.scrollHeight-100<=t?l(!0):l(!1)}},t.chat.map((function(e){var t=new Date(e.time),a="".concat(f(t.getHours(),"hours"),":").concat(f(t.getMinutes()),":").concat(f(t.getSeconds()));return r.a.createElement("div",{className:"chat-message-container from-self-".concat(e.self),key:e.time},r.a.createElement("div",{className:"chat-message-header"},r.a.createElement("div",{className:"chat-message-sender"},e.name),r.a.createElement("div",{className:"chat-message-time"},a)),r.a.createElement("div",{className:"chat-message-content"},e.message))}))),r.a.createElement("div",{id:"chat-box-entry-field"},r.a.createElement("textarea",{onKeyDown:function(e){13!==e.keyCode||e.shiftKey||(e.preventDefault(),function(e){console.log("SUBMITTING");var t=e.value;if(e.value="",/\w{1,}/.test(t)){var n={name:u.name||"anonymous",message:t};M.emit("chat-message",n),a.appendChatMessage(Object(h.a)(Object(h.a)({},n),{},{self:!0,time:Date.now()}))}}(e.target))},placeholder:"Your message here..."})),!/\/chat\//.test(window.location.href)&&r.a.createElement("a",{href:"".concat("/maestro_streamer","/chat/").concat(m,"?name=").concat(u.name||"anonymous"),target:"_blank"},"Open Chat in new Window"))}),G=(a(105),a(106),function(){var e,t=Object(n.useContext)(p),a=t.state,o=t.setters;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{id:"reorder-panel",onSubmit:function(e){e.preventDefault();var t,a=Object(f.a)(document.getElementsByClassName("order-number")),n=[],r=Object(d.a)(a);try{for(r.s();!(t=r.n()).done;){var c=t.value;n.push([parseInt(c.value),c.dataset.id])}}catch(i){r.e(i)}finally{r.f()}n=n.sort((function(e,t){return e[0]-t[0]})),o.setStreamOrder(n)}},r.a.createElement("h3",null,"Reorder Videos"),(e=a.streams).map((function(t,a){var n;try{n=document.getElementById("name-".concat(t.id)).innerText}catch(o){n=""}return n=n.length?n:"--",r.a.createElement("div",{key:t.id,className:"stream-order-box"},r.a.createElement("label",null,n," "),r.a.createElement("input",{className:"order-number",type:"number",defaultValue:a+1,"data-id":t.id,min:"1",max:e.length}))})),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Reorder"})),r.a.createElement("hr",null))}),K=function(){var e=Object(n.useContext)(p),t=e.state,a=e.setters;return r.a.createElement("div",{id:"video-row-settings"},r.a.createElement("h3",null,"Videos per Row"),r.a.createElement("input",{type:"number",min:"1",max:"99",step:"1",value:t.videosPerRow,onChange:function(e){var t=parseInt(e.target.value);a.setVideosPerRow(t)}}))},z=function(){var e=Object(n.useContext)(p),t=e.state,a=e.setters,o=(Object(s.g)().sessionID,Object(n.useState)(null)),c=Object(y.a)(o,2),i=c[0],l=c[1],u=Object(n.useState)(!1),m=Object(y.a)(u,2),h=m[0],v=m[1],g=Object(n.useState)(""),E=Object(y.a)(g,2),b=E[0],O=E[1],S=function(e){return function(t){a.showHiddenVideo(e)}},w=function(e){e.target.nextSibling.checked=!0};return Object(n.useEffect)((function(){var e=C(window.location.search);l(e)}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"media-settings-panel",onChange:function(e){v(!0),O(function(){var e,t,a,n,r=Object(f.a)(document.getElementsByClassName("media-setting")),o={},c=Object(d.a)(r);try{for(c.s();!(n=c.n()).done;){var i=n.value;e=i.dataset.key,a=i.dataset.override,t="checkbox"===i.type?i.checked:i.value,void 0===a?o[e]=t:t||delete o[e]}}catch(g){c.e(g)}finally{c.f()}for(var s="",l=0,u=Object.entries(o);l<u.length;l++){var m=Object(y.a)(u[l],2),h=m[0],v=m[1];s+="".concat(h,"=").concat(v,"&")}return s}())}},i&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"media-settings-section"},r.a.createElement("label",{htmlFor:"user-name"},"Name "),r.a.createElement("input",{id:"user-name",className:"media-setting","data-key":"name",defaultValue:i.name||""}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"user-location"},"Location "),r.a.createElement("input",{id:"user-location",className:"media-setting","data-key":"location",defaultValue:i.location||""}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"user-location"},"Authority "),r.a.createElement("select",{"data-key":"authority",className:"media-setting",defaultValue:i.authority||"basic"},r.a.createElement("option",{value:"admin"},"Admin"),r.a.createElement("option",{value:"monitor"},"Monitor"),r.a.createElement("option",{value:"basic"},"Performer"))),r.a.createElement("div",{className:"media-settings-section"},r.a.createElement("label",{htmlFor:"audio-include"},"Include Audio "),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-key":"audio",defaultChecked:!1!==i.audio}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"audio-gain"},"Auto Gain Control "),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-key":"autoGainControl",defaultChecked:i.autoGainControl||!1}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"audio-echo"},"Echo Cancellation "),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-key":"echoCancellation",defaultChecked:i.echoCancellation||!1}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"audio-noise"},"Noise Suppression "),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-key":"noiseSuppression",defaultChecked:i.noiseSuppression||!1}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"audio-channels"},"Channel Count "),r.a.createElement("select",{"data-key":"channelCount",className:"media-setting",defaultValue:i.channelCount||"1",onChange:w},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2")),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"channelCount","data-key":"channelCount",defaultChecked:!!i.channelCount}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"audio-samples"},"Sample Size "),r.a.createElement("select",{"data-key":"sampleSize",className:"media-setting",defaultValue:i.sampleSize||"16",onChange:w},r.a.createElement("option",{value:"8"},"8"),r.a.createElement("option",{value:"16"},"16"),r.a.createElement("option",{value:"24"},"24"),r.a.createElement("option",{value:"32"},"32")),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"sampleSize","data-key":"sampleSize",defaultChecked:!!i.sampleSize})),r.a.createElement("div",{className:"media-settings-section"},r.a.createElement("label",{htmlFor:"video-include"},"Include Video "),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-key":"video",defaultChecked:!1!==i.video}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"video-width"},"Width "),r.a.createElement("input",{type:"number",className:"media-setting","data-key":"width",step:"1",min:"10",max:"9999",defaultValue:i.width||"852",onChange:w}),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"width","data-key":"width",defaultChecked:!!i.width}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"video-height"},"Height "),r.a.createElement("input",{type:"number",className:"media-setting","data-key":"height",step:"1",min:"10",max:"9999",defaultValue:i.height||"480",onChange:w}),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"height","data-key":"height",defaultChecked:!!i.height}),r.a.createElement("br",null),r.a.createElement("label",null,"Frame Rate "),r.a.createElement("input",{type:"number",className:"media-setting","data-key":"frameRate",step:"1",min:"1",max:"99",defaultValue:i.frameRate||"30",onChange:w}),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"frameRate","data-key":"frameRate",defaultChecked:!!i.frameRate}),r.a.createElement("br",null),r.a.createElement("label",null,"Resize Mode "),r.a.createElement("select",{"data-key":"resizeMode",className:"media-setting",defaultValue:i.resizeMode||"crop-and-scale",onChange:w},r.a.createElement("option",{value:"none"},"None"),r.a.createElement("option",{value:"crop-and-scale"},"crop and scale")),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"resizeMode","data-key":"resizeMode",defaultChecked:!!i.resizeMode})))),h&&r.a.createElement("a",{href:"".concat(window.location.href.split("?")[0],"?").concat(b)},"Apply"),r.a.createElement("hr",null),!!Object.keys(t.hiddenVideos).length&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("h4",null,"Hidden Streams"),function(e){for(var t=[],a=0,n=Object.entries(e);a<n.length;a++){var o=Object(y.a)(n[a],2),c=o[0],i=o[1];t.push(r.a.createElement("button",{key:c,onClick:S(c)},"Show ",i))}return t}(t.hiddenVideos)),r.a.createElement("hr",null)),r.a.createElement(K,null),r.a.createElement(G,null))},B=a(56),W=a.n(B),q=a(57),J=a.n(q),Y=function(){var e=Object(n.useState)(!1),t=Object(y.a)(e,2),a=t[0],o=t[1];return r.a.createElement("div",{id:"media-settings-container"},r.a.createElement("div",{onClick:function(e){o(!a)},style:{cursor:"pointer",display:"inline-block"}},a?r.a.createElement("img",{src:J.a}):r.a.createElement("img",{src:W.a})),a&&r.a.createElement(z,null),r.a.createElement("br",null),r.a.createElement("a",{href:window.location.href},"Reload"))},$=function(){var e=Object(n.useContext)(p).setters,t=Object(s.g)().sessionID,a=C(window.location.search);return Object(n.useEffect)((function(){M.emit("join-session",{sessionID:t}),M.on("message-received",(function(t){var n=t.name,r=t.message;e.appendChatMessage({name:n,message:r,self:n===a.name,time:Date.now()})}))}),[]),r.a.createElement(r.a.Fragment,null)};var Q=function(){var e=Object(n.useContext)(p).setters;return Object(n.useEffect)((function(){var t=new AudioContext,a=t.createGain();a.gain.value=1,a.connect(t.destination),e.setAudioContext(t),e.setMasterGain(a)}),[]),r.a.createElement(i.a,{basename:"/maestro_streamer/"},r.a.createElement("div",{className:"App"},r.a.createElement(s.d,null,r.a.createElement(s.b,{exact:!0,path:"/"},"Maestro Streamer"),r.a.createElement(s.b,{exact:!0,path:"/session/:sessionID"},r.a.createElement(V,null),r.a.createElement(j,null),r.a.createElement(H,null),r.a.createElement(Y,null),r.a.createElement(L,null)),r.a.createElement(s.b,{exact:!0,path:"/chat/:sessionID"},r.a.createElement($,null),r.a.createElement(L,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(b,null,r.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},15:function(e){e.exports=JSON.parse('{"server_protocol":"https","server_host_l":"192.168.1.217","server_host_r":"52.207.166.31","server_host":"maestrostreamer.com","server_port":"4000"}')},56:function(e,t,a){e.exports=a.p+"static/media/menu.55f68494.svg"},57:function(e,t,a){e.exports=a.p+"static/media/close.98fdc312.svg"},58:function(e,t,a){e.exports=a(109)},62:function(e,t,a){},63:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},64:function(e,t,a){},66:function(e,t,a){},71:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=71}},[[58,1,2]]]);
//# sourceMappingURL=main.cc6008ab.chunk.js.map