(function(){"use strict";var t={2523:function(t,e,n){var a=n(5130),o=n(6768);const r={class:"main-background"};function s(t,e,n,a,s,i){const c=(0,o.g2)("Navbar"),u=(0,o.g2)("router-view"),l=(0,o.g2)("Footer");return(0,o.uX)(),(0,o.CE)("div",r,[(0,o.bF)(c),(0,o.bF)(u),(0,o.bF)(l)])}var i=n(4232);const c=t=>((0,o.Qi)("data-v-aa5a809c"),t=t(),(0,o.jt)(),t),u=c((()=>(0,o.Lk)("img",{src:"/img/logo.png",alt:"Logo",id:"logo"},null,-1))),l={key:0,class:"username"},d={class:"user-div"},f=["src"],h={class:"dropdown-toggle dropdown",id:"profile-dropdown","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},p={class:"dropdown-menu","aria-labelledby":"profile-dropdown"},m=c((()=>(0,o.Lk)("div",{class:"user-div"},[(0,o.Lk)("i",{class:"bi bi-person-circle"}),(0,o.Lk)("p",null,"Login")],-1)));function g(t,e,n,a,r,s){const c=(0,o.g2)("router-link");return(0,o.uX)(),(0,o.CE)("nav",null,[(0,o.bF)(c,{to:"/",id:"logo-url"},{default:(0,o.k6)((()=>[u])),_:1}),r.us.user?((0,o.uX)(),(0,o.CE)("div",l,[(0,o.Lk)("div",d,[(0,o.Lk)("img",{src:r.us.user.img,class:"user-img"},null,8,f),(0,o.Lk)("p",h,(0,i.v_)(r.us.user.username),1),(0,o.Lk)("div",p,[(0,o.bF)(c,{to:"/user",class:"dropdown-item"},{default:(0,o.k6)((()=>[(0,o.eW)("Meu Perfil")])),_:1}),"Admin"===r.us.user.role?((0,o.uX)(),(0,o.Wv)(c,{key:0,to:"/addItem",class:"dropdown-item"},{default:(0,o.k6)((()=>[(0,o.eW)("Adcionar Item")])),_:1})):(0,o.Q3)("",!0),(0,o.Lk)("p",{class:"dropdown-item",onClick:e[0]||(e[0]=(...t)=>s.logout&&s.logout(...t))},"Logout")])])])):((0,o.uX)(),(0,o.Wv)(c,{key:1,to:"/login",class:"login-text"},{default:(0,o.k6)((()=>[m])),_:1}))])}n(4114);var v=n(8602),b={name:"Navbar",data(){return{us:(0,v.k)()}},methods:{logout(){this.us.setUser(null),localStorage.removeItem("user"),this.$router.push("/")}}},k=n(1241);const y=(0,k.A)(b,[["render",g],["__scopeId","data-v-aa5a809c"]]);var C=y;const L=t=>((0,o.Qi)("data-v-91eae786"),t=t(),(0,o.jt)(),t),w=L((()=>(0,o.Lk)("p",null,"Achadex©2024",-1))),E=[w];function _(t,e,n,a,r,s){return(0,o.uX)(),(0,o.CE)("footer",null,E)}var j={name:"Footer"};const x=(0,k.A)(j,[["render",_],["__scopeId","data-v-91eae786"]]);var A=x,I=(n(5707),{components:{Navbar:C,Footer:A},name:"App",data(){return{user:(0,v.k)()}},mounted(){localStorage.getItem("user")&&this.user.setUser(JSON.parse(localStorage.getItem("user")))}});const S=(0,k.A)(I,[["render",s]]);var T=S,F=n(1387);const O=t=>((0,o.Qi)("data-v-5c87d7b8"),t=t(),(0,o.jt)(),t),X={class:"home-nav"},N=O((()=>(0,o.Lk)("h1",{class:"text-center"},"Itens encontrados",-1))),P={class:"retangulo"},Q={class:"data-filter"},U=["onClick"],B={class:"card-columns"},D=["src","alt"],G={class:"card-body"},M={class:"card-title"},W={class:"card-text"},q={class:"card-footer"},H={class:"text-muted"},K={key:0,class:"m-0"},$={key:1,class:"m-0"},z={key:2,class:"m-0"},J=["onClick"],R=O((()=>(0,o.Lk)("i",{class:"bi bi-trash"},null,-1))),Y=[R],V=["onClick"];function Z(t,e,n,r,s,c){return(0,o.uX)(),(0,o.CE)("div",null,[(0,o.Lk)("div",X,[N,(0,o.Lk)("div",P,[(0,o.Lk)("div",Q,[(0,o.Lk)("div",null,[(0,o.Lk)("button",{class:"btn btn-small btn-primary data-filter-item todos clicked",onClick:e[0]||(e[0]=t=>c.checkFilter(0,"todos"))},"Todos")]),(0,o.Lk)("div",null,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.filters,((t,e)=>((0,o.uX)(),(0,o.CE)("button",{key:e,onClick:n=>c.checkFilter(e+1,t),class:"btn btn-small btn-primary data-filter-item"},(0,i.v_)(t),9,U)))),128))])]),(0,o.Lk)("div",B,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.cards,((t,e)=>(0,o.bo)(((0,o.uX)(),(0,o.CE)("div",{class:"card",key:t.id},[(0,o.Lk)("img",{class:"card-img-top",src:t.img,alt:t.alt},null,8,D),(0,o.Lk)("div",G,[(0,o.Lk)("h5",M,(0,i.v_)(t.title),1),(0,o.Lk)("p",W,(0,i.v_)(t.text),1)]),(0,o.Lk)("div",q,[(0,o.Lk)("small",H,(0,i.v_)(t.date),1),t.resgatado?((0,o.uX)(),(0,o.CE)("p",K,"Resgatado")):(0,o.Q3)("",!0),!t.resgatado&&t.solicitado?((0,o.uX)(),(0,o.CE)("p",$,"Solicitado")):(0,o.Q3)("",!0),s.us.user||t.resgatado||t.solicitado?(0,o.Q3)("",!0):((0,o.uX)(),(0,o.CE)("p",z,"Disponível")),s.us.user&&"Admin"===s.us.user.role&&!t.solicitado?((0,o.uX)(),(0,o.CE)("button",{key:3,class:"btn btn-danger",onClick:e=>c.deleteItem(t.id)},Y,8,J)):(0,o.Q3)("",!0),t.resgatado||t.solicitado?(0,o.Q3)("",!0):(0,o.bo)(((0,o.uX)(),(0,o.CE)("button",{key:4,onClick:n=>c.solicitarItem(e,t.id),class:"btn btn-primary"},"Solicitar",8,V)),[[a.aG,s.us.user]])])])),[[a.aG,t.show&&!t.resgatado]]))),128))])])])])}var tt={name:"Home",data(){return{cards:[],filters:[],us:(0,v.k)()}},methods:{deleteItem(t){fetch(`http://localhost:1337/api/items/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.us.user.jwt}}).then((async t=>{const e=await t.json();console.log(e),this.cards=[],this.getItems()}))},solicitarItem(t,e){const n={data:{title:this.cards[t].title,img:this.cards[t].img,text:this.cards[t].text,date:this.cards[t].original_date,solicitado:this.us.user.username,tipo:this.cards[t].tipo,resgatado:null}};fetch(`http://localhost:1337/api/items/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.us.user.jwt},body:JSON.stringify(n)}).then((async t=>{const e=await t.json();console.log(e),this.cards=[],this.getItems()}))},async getItems(){fetch("http://localhost:1337/api/items?populate=*",{method:"GET",headers:{"Content-Type":"application/json"}}).then((async t=>{if(200===t.status){const e=await t.json();console.log(e.data);for(let t=0;t<e.data.length;t++){const n={id:e.data[t].id,img:e.data[t].attributes.img,title:e.data[t].attributes.title,text:e.data[t].attributes.text,solicitado:e.data[t].attributes.solicitado,resgatado:e.data[t].attributes.resgatado,date:new Date(e.data[t].attributes.date).toLocaleDateString(),original_date:e.data[t].attributes.date,tipo:e.data[t].attributes.tipo,alt:"Item Encontrado",show:!0,category:e.data[t].attributes.category};this.cards.push(n)}}}));this.filters=[];fetch("http://localhost:1337/api/categories",{method:"GET",headers:{"Content-Type":"application/json"}}).then((async t=>{if(200===t.status){const e=await t.json();console.log(e.data);for(let t=0;t<e.data.length;t++){const n=e.data[t].attributes.nome;this.filters.push(n)}}}))},checkFilter(t,e){e=e.toLowerCase();const n=document.querySelectorAll(".data-filter-item");if(n.forEach((t=>{t.classList.remove("clicked")})),n[t].classList.add("clicked"),"todos"!==e)for(let a=0;a<this.cards.length;a++)this.cards[a].tipo!==e?this.cards[a].show=!1:this.cards[a].show=!0;else for(let a=0;a<this.cards.length;a++)this.cards[a].show=!0}},mounted(){this.getItems()}};const et=(0,k.A)(tt,[["render",Z],["__scopeId","data-v-5c87d7b8"]]);var nt=et;const at=[{path:"/",name:"Home",component:nt},{path:"/user",name:"User",component:()=>n.e(594).then(n.bind(n,2689))},{path:"/login",name:"Login",component:()=>n.e(594).then(n.bind(n,7331))},{path:"/addItem",name:"AddItem",component:()=>n.e(594).then(n.bind(n,3665))},{path:"/cadastro",name:"Cadastro",component:()=>n.e(594).then(n.bind(n,2725))}],ot=(0,F.aE)({history:(0,F.LA)("/achadex-vue/dist/"),routes:at});var rt=ot,st=n(3367);(0,a.Ef)(T).use((0,st.Ey)()).use(rt).mount("#app")},8602:function(t,e,n){n.d(e,{k:function(){return o}});var a=n(3367);const o=(0,a.nY)("User",{state(){return{user:null}},actions:{setUser(t){this.user=t}},getters:{getUser(){return this.user}}})}},e={};function n(a){var o=e[a];if(void 0!==o)return o.exports;var r=e[a]={exports:{}};return t[a].call(r.exports,r,r.exports,n),r.exports}n.m=t,function(){var t=[];n.O=function(e,a,o,r){if(!a){var s=1/0;for(l=0;l<t.length;l++){a=t[l][0],o=t[l][1],r=t[l][2];for(var i=!0,c=0;c<a.length;c++)(!1&r||s>=r)&&Object.keys(n.O).every((function(t){return n.O[t](a[c])}))?a.splice(c--,1):(i=!1,r<s&&(s=r));if(i){t.splice(l--,1);var u=o();void 0!==u&&(e=u)}}return e}r=r||0;for(var l=t.length;l>0&&t[l-1][2]>r;l--)t[l]=t[l-1];t[l]=[a,o,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,a){return n.f[a](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/about.fc403092.js"}}(),function(){n.miniCssF=function(t){return"css/about.0ac60af5.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="achadex-vue:";n.l=function(a,o,r,s){if(t[a])t[a].push(o);else{var i,c;if(void 0!==r)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var d=u[l];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==e+r){i=d;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",e+r),i.src=a),t[a]=[o];var f=function(e,n){i.onerror=i.onload=null,clearTimeout(h);var o=t[a];if(delete t[a],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(t){return t(n)})),e)return e(n)},h=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p="/achadex-vue/dist/"}(),function(){if("undefined"!==typeof document){var t=function(t,e,a,o,r){var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",n.nc&&(s.nonce=n.nc);var i=function(n){if(s.onerror=s.onload=null,"load"===n.type)o();else{var a=n&&n.type,i=n&&n.target&&n.target.href||e,c=new Error("Loading CSS chunk "+t+" failed.\n("+a+": "+i+")");c.name="ChunkLoadError",c.code="CSS_CHUNK_LOAD_FAILED",c.type=a,c.request=i,s.parentNode&&s.parentNode.removeChild(s),r(c)}};return s.onerror=s.onload=i,s.href=e,a?a.parentNode.insertBefore(s,a.nextSibling):document.head.appendChild(s),s},e=function(t,e){for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var o=n[a],r=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(r===t||r===e))return o}var s=document.getElementsByTagName("style");for(a=0;a<s.length;a++){o=s[a],r=o.getAttribute("data-href");if(r===t||r===e)return o}},a=function(a){return new Promise((function(o,r){var s=n.miniCssF(a),i=n.p+s;if(e(s,i))return o();t(a,i,null,o,r)}))},o={524:0};n.f.miniCss=function(t,e){var n={594:1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=a(t).then((function(){o[t]=0}),(function(e){throw delete o[t],e})))}}}(),function(){var t={524:0};n.f.j=function(e,a){var o=n.o(t,e)?t[e]:void 0;if(0!==o)if(o)a.push(o[2]);else{var r=new Promise((function(n,a){o=t[e]=[n,a]}));a.push(o[2]=r);var s=n.p+n.u(e),i=new Error,c=function(a){if(n.o(t,e)&&(o=t[e],0!==o&&(t[e]=void 0),o)){var r=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.src;i.message="Loading chunk "+e+" failed.\n("+r+": "+s+")",i.name="ChunkLoadError",i.type=r,i.request=s,o[1](i)}};n.l(s,c,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,a){var o,r,s=a[0],i=a[1],c=a[2],u=0;if(s.some((function(e){return 0!==t[e]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(c)var l=c(n)}for(e&&e(a);u<s.length;u++)r=s[u],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(l)},a=self["webpackChunkachadex_vue"]=self["webpackChunkachadex_vue"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=n.O(void 0,[504],(function(){return n(2523)}));a=n.O(a)})();
//# sourceMappingURL=app.5315c7f3.js.map