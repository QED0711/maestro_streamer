(this.webpackJsonpmaestro_video=this.webpackJsonpmaestro_video||[]).push([[0],{10:function(e){e.exports=JSON.parse('{"server_host":"52.207.166.31","server_port":"4000"}')},100:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(46),s=n.n(r),i=(n(58),n(59),n(60),n(9)),c=n(1),l=n(47),u=n.n(l),d={sessionAuthorization:!0,ring:!1,userID:null,connectedUsers:[],localStreamID:null,streams:[],streamsData:{}},m=n(11),v=n(18),f={appendStream:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.setStateMaster((function(n){var a=Object(v.a)(n.streams);return a.map((function(e){return e.id})).includes(e.id)||a.push(e),"local"===t?{streams:a,localStreamID:e.id}:{streams:a}}))},appendStreamData:function(e,t){this.setStateMaster((function(n){var a=Object(m.a)({},n.streamsData);return a[e]=t,{streamsData:a}}))},removeStream:function(e){this.setStateMaster((function(t){var n=Object(v.a)(t.streams);return{streams:n=n.filter((function(t){return e!==t.id}))}}))},appendUser:function(e){this.setStateMaster((function(t){var n=Object(v.a)(t.connectedUsers);return n.push(e),{connectedUsers:n}}))},toggleRing:function(){this.setStateMaster((function(e){return{ring:!e.ring}}))}},p={getRing:function(){return this.state.ring},getUserID:function(){return this.state.userID},getConnectedUsers:function(){return this.state.connectedUsers}},E=new u.a(d);E.addCustomSetters(f),E.addMethods(p);var g=E.context,h=E.createProvider(),D=(n(62),n(48)),O=function(e){var t,n,a=new URLSearchParams(e),o={},r=Object(D.a)(a.keys());try{for(r.s();!(n=r.n()).done;){var s=n.value;"false"===(t=a.getAll(s).length>1?a.getAll(s):a.get(s))&&(t=!1),"true"===t&&(t=!0),o[s]=t}}catch(i){r.e(i)}finally{r.f()}return o},S=function(){var e,t=Object(a.useContext)(g),n=t.state,r=t.setters,s=O(window.location.search);return Object(a.useEffect)((function(){!function(){var e;n.streams.forEach((function(t){(e=document.getElementById("video-".concat(t.id))).paused&&(e.muted=t.id===n.localStreamID,e.controls="controls",e.srcObject=t,e.addEventListener("loadedmetadata",(function(){e.play()})),e.addEventListener("mousedown",(function(e){e.preventDefault(),e.altKey&&r.removeStream(t.id)})))}))}()}),[n.streams]),o.a.createElement("div",{id:"media-panel"},(e=n.streams,console.log("RENDERING VIDEOS"),e.map((function(e){var t,a;return o.a.createElement("div",{className:"video-container",key:e.id,id:e.id},o.a.createElement("h3",{className:"video-header user-name"},n.localStreamID===e.id?s.name:(null===(t=n.streamsData[e.id])||void 0===t?void 0:t.name)||"--"),o.a.createElement("h4",{className:"video-header user-location"},n.localStreamID===e.id?s.location:(null===(a=n.streamsData[e.id])||void 0===a?void 0:a.location)||"--"),o.a.createElement("video",{id:"video-".concat(e.id)}))}))))},I=function(e){var t=Object(a.useContext)(g).state;Object(c.g)().sessionID;return t.sessionAuthorization?o.a.createElement("div",{id:"session-window"},o.a.createElement(S,null)):o.a.createElement(c.a,{to:"/"})},_=n(50),b=n.n(_),w=n(51),R=n.n(w),j=n(10),C=Object({NODE_ENV:"production",PUBLIC_URL:"/maestro_streamer",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER_HOST||j.server_host||window.location.hostname,N=Object({NODE_ENV:"production",PUBLIC_URL:"/maestro_streamer",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER_PORT||j.server_port,T="https://".concat(C,":").concat(N,"/"),U=R()(T),P={autoGainControl:!1,echoCancellation:!1,noiseSuppression:!1,sampleSize:8},L=function(){var e=Object(a.useContext)(g),t=(e.state,e.setters),n=e.methods,r=Object(c.g)(),s=r.sessionID,i=(r.name,r.location,O(window.location.search));return console.log(i),Object(a.useEffect)((function(){var e=new b.a(void 0,{path:"/peerjs",host:j.server_host,port:j.server_port,secure:!0});e.on("open",(function(n){t.setUserID(n),console.log({id:n,peer:e}),console.log("PEER OPENING"),U.emit("join-session",{sessionID:s,userID:n,part:"PART STAND-IN"})})),navigator.mediaDevices.getUserMedia({video:!1!==i.video,audio:Object(m.a)(Object(m.a)({},P),i)}).then((function(a){t.appendStream(a,"local");var o=function(e){U.emit("user-leaving",{streamID:a.id})};window.addEventListener("unload",o),window.addEventListener("beforeunload",o),e.on("call",(function(e){e.answer(a),e.on("stream",(function(e){U.emit("request-user-data",{streamID:e.id}),t.appendStream(e)}))})),U.on("user-connected",(function(o){var r=o.userID;o.part;if(!n.getConnectedUsers().includes(r)){t.appendUser(r);var s=e.call(r,a);console.log({call:s,stream:a}),s.on("stream",(function(e){t.appendStream(e)})),s.on("close",(function(){console.log("REMOVING")}))}})),U.on("data-requested",(function(e){e.streamID===a.id&&U.emit("data-response",Object(m.a)({streamID:a.id},i))}))})),U.on("user-data-response",(function(e){console.log({data:e}),t.appendStreamData(e.streamID,e)})),U.on("user-disconnected",(function(e){})),U.on("remove-stale-user",(function(e){console.log("WILL REMOVE STALE USER"),console.log(e),t.removeStream(e.streamID)}))}),[]),o.a.createElement(o.a.Fragment,null)},A=n(16),x=n.n(A),y=n(52),M=function(){var e=Object(a.useContext)(g),t=e.state,n=e.setters,r=e.methods,s=Object(c.g)().sessionID,i=function(){var e=Object(y.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.toggleRing();case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){if(t.ring)var e=setInterval((function(){var t=r.getUserID(),n=r.getRing();t&&(n?U.emit("ring",{sessionID:s,userID:t}):clearInterval(e))}),1e3)}),[t.ring]),o.a.createElement("div",{id:"config-panel"},o.a.createElement("button",{onClick:i},t.ring?"Stop Ringing":"Ring"))};var k=function(){return o.a.createElement(i.a,{basename:"/maestro_streamer/"},o.a.createElement("div",{className:"App"},o.a.createElement(c.d,null,o.a.createElement(c.b,{exact:!0,path:"/"},"LOGIN FORM",o.a.createElement(i.b,{to:"/session/123"},"LINK")),o.a.createElement(c.b,{exact:!0,path:"/session/:sessionID"},o.a.createElement(L,null),o.a.createElement(M,null),o.a.createElement(I,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(h,null,o.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},53:function(e,t,n){e.exports=n(100)},58:function(e,t,n){},59:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},60:function(e,t,n){},62:function(e,t,n){},67:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=67},97:function(e,t){}},[[53,1,2]]]);
//# sourceMappingURL=main.f40cd62b.chunk.js.map