(function(){
  var CFG={apiKey:"AIzaSyBx4GVx6B7eb80uC_CgOQs95s5oc1SPcKw",authDomain:"x-rdp-eba97.firebaseapp.com",projectId:"x-rdp-eba97",storageBucket:"x-rdp-eba97.firebasestorage.app",messagingSenderId:"858606730269",appId:"1:858606730269:web:2ac2ae0162dc5143a6daf4"};
  var V='10.12.2',B='https://www.gstatic.com/firebasejs/'+V+'/';
  window.XRDP_STANDALONE=true;
  var ready=(async function(){
    var A=await import(B+'firebase-app.js'),AU=await import(B+'firebase-auth.js'),FS=await import(B+'firebase-firestore.js');
    var app=A.initializeApp(CFG),auth=AU.getAuth(app);
    try{await AU.setPersistence(auth,AU.browserLocalPersistence)}catch(e){}
    try{await AU.getRedirectResult(auth)}catch(e){console.warn(e)}
    var fs=FS.initializeFirestore(app,{ignoreUndefinedProperties:true});
    var user=await new Promise(function(res){var un=AU.onAuthStateChanged(auth,function(u){if(u){un();res(u)}else showLogin(AU,auth)})});
    hideLogin();window.__fbUser=user;window.__fbSignOut=function(){AU.signOut(auth).then(function(){location.reload()})};
    function wrap(s){return{id:s.id,exists:s.exists(),data:function(){return s.data()},metadata:{fromCache:s.metadata.fromCache,hasPendingWrites:s.metadata.hasPendingWrites}}}
    var db={doc:function(p){var r=FS.doc(fs,p);return{path:p,
      get:function(){return FS.getDoc(r).then(wrap)},
      set:function(d){return FS.setDoc(r,d)},
      delete:function(){return FS.deleteDoc(r)},
      onSnapshot:function(fn,err){return FS.onSnapshot(r,{includeMetadataChanges:true},function(s){fn(wrap(s))},err||function(e){console.warn(e)})}}}};
    var usr={id:function(){return Promise.resolve(user.uid)},email:user.email};
    var downloads={save:function(o){var blob=new Blob([typeof o.data==='string'?o.data:JSON.stringify(o.data)],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=o.filename||'x-rdp.json';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1000);return Promise.resolve()}};
    return{db:db,user:usr,downloads:downloads};
  })();
  window.claude={use:function(n){return ready.then(function(x){return x[n]||null})}};
  function el(){var d=document.getElementById('fbLogin');if(d)return d;d=document.createElement('div');d.id='fbLogin';
    d.innerHTML='<div class="fbbox"><svg width="54" height="54" viewBox="0 0 34 34" fill="none"><path d="M17 3 30 10v14L17 31 4 24V10z" fill="#fff" opacity=".08"/><path d="M17 3 30 10v14L17 31 4 24V10zM4 10l13 7 13-7M17 17v14" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg><h1>X-RDP</h1><p>Log in met je Google-account. Je gegevens staan beveiligd in je eigen opslag en worden gesynchroniseerd tussen al je toestellen.</p><button id="fbGo">Inloggen met Google</button><small id="fbErr"></small></div>';
    var st=document.createElement('style');st.textContent='#fbLogin{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#120a2e;color:#fff;font:16px/1.5 Outfit,system-ui,sans-serif}#fbLogin .fbbox{max-width:380px;padding:28px;text-align:center}#fbLogin h1{margin:8px 0}#fbLogin p{opacity:.8}#fbLogin button{margin-top:14px;padding:14px 22px;border-radius:12px;border:none;background:#ff2d85;color:#fff;font:600 16px inherit;cursor:pointer;width:100%}#fbLogin small{display:block;margin-top:10px;color:#ff8fb3}';
    document.head.appendChild(st);document.body.appendChild(d);return d}
  function showLogin(AU,auth){var go=function(){var d=el();d.style.display='grid';d.querySelector('#fbGo').onclick=function(){var p=new AU.GoogleAuthProvider();p.setCustomParameters({prompt:'select_account'});
      AU.signInWithPopup(auth,p).catch(function(e){if(e&&/popup/.test(e.code||''))AU.signInWithRedirect(auth,p);else document.getElementById('fbErr').textContent='Inloggen mislukt: '+(e&&e.code||e)})}};
    if(document.body)go();else document.addEventListener('DOMContentLoaded',go)}
  function hideLogin(){var d=document.getElementById('fbLogin');if(d)d.style.display='none'}
})();
