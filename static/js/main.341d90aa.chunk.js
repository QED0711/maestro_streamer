(this.webpackJsonpmaestro_video=this.webpackJsonpmaestro_video||[]).push([[0],{101:function(e,t){},104:function(e,t,a){},105:function(e,t,a){},109:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(29),i=a.n(o),c=(a(62),a(63),a(64),a(12)),s=a(1),l=a(51),u=a.n(l),d={audioContext:null,masterGain:null,authority:null,knownAuthorities:{},sessionAuthorization:!0,ring:!1,userID:null,connectedUsers:[],localStreamID:null,streams:[],streamsData:{},hiddenVideos:{},showIDs:!1,chat:[]},m=a(6),h=a(10),f={appendStream:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;console.log(e.id),this.setStateMaster((function(a){var n=Object(h.a)(a.streams);return n.map((function(e){return e.id})).includes(e.id)||n.push(e),"local"===t?{streams:n,localStreamID:e.id}:{streams:n}}))},appendStreamData:function(e,t){this.setStateMaster((function(a){var n=Object(m.a)({},a.streamsData);return n[e]=t,{streamsData:n}}))},appendKnownAuthority:function(e,t){this.setStateMaster((function(a){var n=Object(m.a)({},a.knownAuthorities);return n[e]=t,{knownAuthorities:n}}))},appendChatMessage:function(e){this.setStateMaster((function(t){var a=Object(h.a)(t.chat);return a.push(e),{chat:a}}))},removeStream:function(e){this.setStateMaster((function(t){var a=Object(h.a)(t.streams);return{streams:a=a.filter((function(t){return e!==t.id}))}}))},appendUser:function(e){this.setStateMaster((function(t){var a=Object(h.a)(t.connectedUsers);return a.push(e),{connectedUsers:a}}))},toggleRing:function(){this.setStateMaster((function(e){return{ring:!e.ring}}))},appendHiddenVideo:function(e,t){this.setStateMaster((function(a){var n=Object(m.a)({},a.hiddenVideos);return e in n||(n[e]=t),{hiddenVideos:n}}))},showHiddenVideo:function(e){this.setStateMaster((function(t){var a=Object(m.a)({},t.hiddenVideos);return delete a[e],{hiddenVideos:a}}))}},v={getAuthority:function(){return this.state.authority},getKnownAuthorites:function(){return this.state.knownAuthorities},getRing:function(){return this.state.ring},getUserID:function(){return this.state.userID},getConnectedUsers:function(){return this.state.connectedUsers}},p=new u.a(d);p.addCustomSetters(f),p.addMethods(v);var E=p.context,g=p.createProvider(),b=a(3),O=a(30),y=a.n(O),S=(a(66),a(20)),C=function(e){var t,a,n=new URLSearchParams(e),r={},o=Object(S.a)(n.keys());try{for(o.s();!(a=o.n()).done;){var i=a.value;t=n.getAll(i).length>1?n.getAll(i):n.get(i),(["0","0.0."].includes(t)||parseFloat(t))&&(t=parseFloat(t)),"false"===t&&(t=!1),"true"===t&&(t=!0),r[i]=t}}catch(c){o.e(c)}finally{o.f()}return r},k=function(){var e=Object(n.useContext)(E),t=e.state,a=e.setters,o=C(window.location.search),i=Object(n.useState)(!0),c=Object(b.a)(i,2),s=c[0],l=c[1],u=Object(n.useState)(1),d=Object(b.a)(u,2),m=d[0],h=d[1];return Object(n.useEffect)((function(){if(function(){var e,n,r,o,i;t.streams.forEach((function(c){if(e=document.getElementById("video-".concat(c.id)),n=document.getElementById("gain-".concat(c.id)),i=document.getElementById("mute-btn-".concat(c.id)),e.paused&&!i.onclick){try{r=t.audioContext.createMediaStreamSource(c),o=t.audioContext.createGain()}catch(s){return void console.log(s)}r.connect(o),o.connect(t.masterGain),c.id===t.localStreamID&&(o.gain.value=0,n.disabled=!0,i.innerText="Unmute"),n.onchange=function(e){o.gain.value=parseFloat(e.target.value)},i.onclick=function(e){if(n.disabled=!n.disabled,n.disabled)o.gain.value=0,this.innerText="Unmute";else{var t=document.getElementById("gain-".concat(c.id)).value;o.gain.value=t,this.innerText="Mute"}},e.srcObject=c,e.muted=!0,e.controls="controls",e.addEventListener("loadedmetadata",(function(){e.play()})),e.addEventListener("mousedown",(function(e){e.preventDefault(),e.altKey&&a.removeStream(c.id)}))}}))}(),s&&t.masterGain){var e=document.getElementById("master-gain-meter"),n=y.a.createMeterNode(t.masterGain,t.audioContext);y.a.createMeter(e,n),l(!1)}}),[t.streams]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"master-gain-container"},r.a.createElement("label",{htmlFor:"master-gain"},"Master Gain: ",m),r.a.createElement("br",null),r.a.createElement("input",{id:"master-gain",type:"range",min:"0",max:"1",step:"0.01",onChange:function(e){t.masterGain.gain.value=parseFloat(e.target.value),h(e.target.value)}}),r.a.createElement("div",{id:"master-gain-meter"})),r.a.createElement("div",{id:"media-panel"},t.streams.map((function(e){var n,i,c;return r.a.createElement("div",{className:"video-container video-container-hidden-".concat(e.id in t.hiddenVideos),key:e.id,id:e.id},r.a.createElement("h3",{id:"name-".concat(e.id),className:"video-header user-name",onClick:(c=e.id,function(e){var t=document.getElementById("name-".concat(c)).innerText;a.appendHiddenVideo(c,t)})},t.localStreamID===e.id?o.name:(null===(n=t.streamsData[e.id])||void 0===n?void 0:n.name)||"--"),r.a.createElement("h4",{className:"video-header user-location"},t.localStreamID===e.id?o.location:(null===(i=t.streamsData[e.id])||void 0===i?void 0:i.location)||"--"),r.a.createElement("video",{id:"video-".concat(e.id)}),t.showIDs&&r.a.createElement("em",null,r.a.createElement("sub",{className:"sub-id"},e.id)),r.a.createElement("input",{id:"gain-".concat(e.id),className:"stream-gain",type:"range",min:"0",max:"1",step:"0.01"}),r.a.createElement("button",{id:"mute-btn-".concat(e.id)},"Mute"))}))))},w=function(e){var t=Object(n.useContext)(E).state;Object(s.g)().sessionID;return t.sessionAuthorization?r.a.createElement("div",{id:"session-window"},r.a.createElement(k,null)):r.a.createElement(s.a,{to:"/"})},j=a(53),D=a.n(j),N=a(54),_=a.n(N),x=a(14),I=Object({NODE_ENV:"production",PUBLIC_URL:"/maestro_streamer",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER_HOST||x.server_host||window.location.hostname,R=Object({NODE_ENV:"production",PUBLIC_URL:"/maestro_streamer",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER_PORT||x.server_port,A=Object({NODE_ENV:"production",PUBLIC_URL:"/maestro_streamer",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER_PROTOCOL||x.server_protocol||"https",T=("".concat(A,"://").concat(I,":").concat(R,"/"),_()("https://maestrostreamer.com")),M={autoGainControl:!1,echoCancellation:!1,noiseSuppression:!1,sampleSize:16,channelCount:1},V=function(){var e=Object(n.useContext)(E),t=(e.state,e.setters),a=e.methods,o=Object(s.g)().sessionID;return Object(n.useEffect)((function(){var e=C(window.location.search);t.setAuthority(e.authority||"basic"),console.log(e),e.showIDs&&t.setShowIDs(!0);var n=new D.a(void 0,{path:"/peerjs",host:x.server_host});n.on("open",(function(e){t.setUserID(e),T.emit("join-session",{sessionID:o,userID:e,part:"PART STAND-IN"})})),navigator.mediaDevices.getUserMedia({video:!1!==e.video&&Object(m.a)({},e),audio:!1!==e.audio&&Object(m.a)(Object(m.a)({},M),e)}).then((function(r){t.appendStream(r,"local");var o=function(e){T.emit("user-leaving",{streamID:r.id})};window.addEventListener("unload",o),window.addEventListener("beforeunload",o),n.on("call",(function(e){"admin"===a.getAuthority()||"admin"===e.metadata.authority?e.answer(r):e.answer(null),e.on("stream",(function(e){T.emit("request-user-data",{streamID:e.id}),t.appendStream(e)}))})),T.on("user-connected",(function(e){var o=e.userID,i=e.authority;if(console.log("RING: ".concat(i,",").concat(o)),console.log("CONNECTED USERS",a.getConnectedUsers()),!a.getConnectedUsers().includes(o)&&(["admin","monitor"].includes(i)||"admin"===a.getAuthority())){t.appendKnownAuthority(o,i);var c=n.call(o,r,{metadata:{authority:a.getAuthority()}});t.appendUser(o),c.on("stream",(function(e){t.appendStream(e)}))}})),T.on("data-requested",(function(t){t.streamID===r.id&&T.emit("data-response",Object(m.a)({streamID:r.id},e))}))})),T.on("user-data-response",(function(e){t.appendStreamData(e.streamID,e)})),T.on("user-disconnected",(function(e){})),T.on("remove-stale-user",(function(e){console.log("WILL REMOVE STALE USER"),console.log(e),t.removeStream(e.streamID)})),T.on("message-received",(function(e){var a=e.name,n=e.message;t.appendChatMessage({name:a,message:n,self:!1,time:Date.now()})}))}),[]),r.a.createElement(r.a.Fragment,null)},U=a(19),F=a.n(U),P=a(55),L=function(){var e=Object(n.useContext)(E),t=e.state,a=e.setters,o=e.methods,i=Object(s.g)().sessionID,c=function(){var e=Object(P.a)(F.a.mark((function e(t){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.toggleRing();case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){if(t.ring)var e=setInterval((function(){var t=o.getUserID(),a=o.getRing(),n=o.getAuthority();t&&(a?T.emit("ring",{sessionID:i,userID:t,authority:n}):clearInterval(e))}),1e3)}),[t.ring]),r.a.createElement("div",{id:"config-panel"},r.a.createElement("button",{onClick:c},t.ring?"Stop Ringing":"Ring"))},H=(a(104),function(){var e=Object(n.useContext)(E),t=e.state,a=e.setters,o=Object(n.useState)(!0),i=Object(b.a)(o,2),c=i[0],s=i[1],l=C(window.location.search),u=Object(n.useRef)(null),d=Object(n.useRef)(null),h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return"hours"===t&&e>12&&(e-=12),e>=10?e:"0".concat(e)};return Object(n.useEffect)((function(){var e=u.current;c&&(e.scrollTop=e.scrollHeight)}),[t.chat,c]),r.a.createElement("div",{id:"chat-box"},r.a.createElement("div",{id:"chat-box-display",ref:u,onScroll:function(e){var t=e.target.scrollTop+e.target.clientHeight;e.target.scrollHeight-100<=t?s(!0):s(!1)}},t.chat.map((function(e){var t=new Date(e.time),a="".concat(h(t.getHours(),"hours"),":").concat(h(t.getMinutes()),":").concat(h(t.getSeconds()));return r.a.createElement("div",{className:"chat-message-container from-self-".concat(e.self),key:e.time},r.a.createElement("div",{className:"chat-message-header"},r.a.createElement("div",{className:"chat-message-sender"},e.name),r.a.createElement("div",{className:"chat-message-time"},a)),r.a.createElement("div",{className:"chat-message-content"},e.message))}))),r.a.createElement("form",{id:"chat-box-form",onSubmit:function(e){console.log("SUBMITTING"),e.preventDefault();var t=e.target.firstChild,n=t.value;if(t.value="",/\w{1,}/.test(n)){var r={name:l.name||"anonymous",message:n};T.emit("chat-message",r),a.appendChatMessage(Object(m.a)(Object(m.a)({},r),{},{self:!0,time:Date.now()}))}},ref:d},r.a.createElement("textarea",{onKeyDown:function(e){13!==e.keyCode||e.shiftKey||(e.preventDefault(),d.current.dispatchEvent(new Event("submit")))}})))}),z=(a(105),a(106),function(){var e=Object(n.useContext)(E),t=e.state,a=e.setters,o=(Object(s.g)().sessionID,Object(n.useState)(null)),i=Object(b.a)(o,2),c=i[0],l=i[1],u=Object(n.useState)(!1),d=Object(b.a)(u,2),m=d[0],f=d[1],v=Object(n.useState)(""),p=Object(b.a)(v,2),g=p[0],O=p[1],y=function(e){return function(t){a.showHiddenVideo(e)}},k=function(e){e.target.nextSibling.checked=!0};return Object(n.useEffect)((function(){var e=C(window.location.search);l(e)}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"media-settings-panel",onChange:function(e){f(!0),O(function(){var e,t,a,n,r=Object(h.a)(document.getElementsByClassName("media-setting")),o={},i=Object(S.a)(r);try{for(i.s();!(n=i.n()).done;){var c=n.value;e=c.dataset.key,a=c.dataset.override,t="checkbox"===c.type?c.checked:c.value,void 0===a?o[e]=t:t||delete o[e]}}catch(v){i.e(v)}finally{i.f()}for(var s="",l=0,u=Object.entries(o);l<u.length;l++){var d=Object(b.a)(u[l],2),m=d[0],f=d[1];s+="".concat(m,"=").concat(f,"&")}return s}())}},c&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"media-settings-section"},r.a.createElement("label",{htmlFor:"user-name"},"Name "),r.a.createElement("input",{id:"user-name",className:"media-setting","data-key":"name",defaultValue:c.name||""}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"user-location"},"Location "),r.a.createElement("input",{id:"user-location",className:"media-setting","data-key":"location",defaultValue:c.location||""}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"user-location"},"Authority "),r.a.createElement("select",{"data-key":"authority",className:"media-setting",defaultValue:c.authority||"basic"},r.a.createElement("option",{value:"admin"},"Admin"),r.a.createElement("option",{value:"monitor"},"Monitor"),r.a.createElement("option",{value:"basic"},"Performer"))),r.a.createElement("div",{className:"media-settings-section"},r.a.createElement("label",{htmlFor:"audio-include"},"Include Audio "),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-key":"audio",defaultChecked:!1!==c.audio}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"audio-gain"},"Auto Gain Control "),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-key":"autoGainControl",defaultChecked:c.autoGainControl||!1}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"audio-echo"},"Echo Cancellation "),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-key":"echoCancellation",defaultChecked:c.echoCancellation||!1}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"audio-noise"},"Noise Suppression "),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-key":"noiseSuppression",defaultChecked:c.noiseSuppression||!1}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"audio-channels"},"Channel Count "),r.a.createElement("select",{"data-key":"channelCount",className:"media-setting",defaultValue:c.channelCount||"1",onChange:k},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2")),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"channelCount","data-key":"channelCount",defaultChecked:!!c.channelCount}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"audio-samples"},"Sample Size "),r.a.createElement("select",{"data-key":"sampleSize",className:"media-setting",defaultValue:c.sampleSize||"16",onChange:k},r.a.createElement("option",{value:"8"},"8"),r.a.createElement("option",{value:"16"},"16"),r.a.createElement("option",{value:"24"},"24"),r.a.createElement("option",{value:"32"},"32")),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"sampleSize","data-key":"sampleSize",defaultChecked:!!c.sampleSize})),r.a.createElement("div",{className:"media-settings-section"},r.a.createElement("label",{htmlFor:"video-include"},"Include Video "),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-key":"video",defaultChecked:!1!==c.video}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"video-width"},"Width "),r.a.createElement("input",{type:"number",className:"media-setting","data-key":"width",step:"1",min:"10",max:"9999",defaultValue:c.width||"852",onChange:k}),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"width","data-key":"width",defaultChecked:!!c.width}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"video-height"},"Height "),r.a.createElement("input",{type:"number",className:"media-setting","data-key":"height",step:"1",min:"10",max:"9999",defaultValue:c.height||"480",onChange:k}),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"height","data-key":"height",defaultChecked:!!c.height}),r.a.createElement("br",null),r.a.createElement("label",null,"Frame Rate "),r.a.createElement("input",{type:"number",className:"media-setting","data-key":"frameRate",step:"1",min:"1",max:"99",defaultValue:c.frameRate||"30",onChange:k}),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"frameRate","data-key":"frameRate",defaultChecked:!!c.frameRate}),r.a.createElement("br",null),r.a.createElement("label",null,"Resize Mode "),r.a.createElement("select",{"data-key":"resizeMode",className:"media-setting",defaultValue:c.resizeMode||"crop-and-scale",onChange:k},r.a.createElement("option",{value:"none"},"None"),r.a.createElement("option",{value:"crop-and-scale"},"crop and scale")),r.a.createElement("input",{type:"checkbox",className:"media-setting","data-override":"resizeMode","data-key":"resizeMode",defaultChecked:!!c.resizeMode})),r.a.createElement("div",null,function(e){for(var t=[],a=0,n=Object.entries(e);a<n.length;a++){var o=Object(b.a)(n[a],2),i=o[0],c=o[1];t.push(r.a.createElement("button",{key:i,onClick:y(i)},"Show ",c))}return t}(t.hiddenVideos)))),m&&r.a.createElement("a",{href:"".concat(window.location.href.split("?")[0],"?").concat(g)},"Apply"))}),G=a(56),K=a.n(G),B=a(57),W=a.n(B),J=function(){var e=Object(n.useState)(!1),t=Object(b.a)(e,2),a=t[0],o=t[1];return r.a.createElement("div",{style:{textAlign:"left"}},r.a.createElement("div",{onClick:function(e){o(!a)},style:{cursor:"pointer",display:"inline-block"}},a?r.a.createElement("img",{src:W.a}):r.a.createElement("img",{src:K.a})),a&&r.a.createElement(z,null),r.a.createElement("br",null),r.a.createElement("a",{href:window.location.href},"Reload"))};var q=function(){var e=Object(n.useContext)(E).setters;return Object(n.useEffect)((function(){var t=new AudioContext,a=t.createGain();a.gain.value=1,a.connect(t.destination),e.setAudioContext(t),e.setMasterGain(a)}),[]),r.a.createElement(c.a,{basename:"/maestro_streamer/"},r.a.createElement("div",{className:"App"},r.a.createElement(s.d,null,r.a.createElement(s.b,{exact:!0,path:"/"},"Maestro Streamer"),r.a.createElement(s.b,{exact:!0,path:"/session/:sessionID"},r.a.createElement(V,null),r.a.createElement(J,null),r.a.createElement(L,null),r.a.createElement(w,null),r.a.createElement(H,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(g,null,r.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},14:function(e){e.exports=JSON.parse('{"server_protocol":"https","server_host_l":"192.168.1.217","server_host_r":"52.207.166.31","server_host":"maestrostreamer.com","server_port":"4000"}')},56:function(e,t,a){e.exports=a.p+"static/media/menu.55f68494.svg"},57:function(e,t,a){e.exports=a.p+"static/media/close.98fdc312.svg"},58:function(e,t,a){e.exports=a(109)},62:function(e,t,a){},63:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},64:function(e,t,a){},66:function(e,t,a){},71:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=71}},[[58,1,2]]]);
//# sourceMappingURL=main.341d90aa.chunk.js.map