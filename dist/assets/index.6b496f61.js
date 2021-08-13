var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,l=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,o=(e,t)=>{for(var a in t||(t={}))s.call(t,a)&&l(e,a,t[a]);if(r)for(var a of r(t))n.call(t,a)&&l(e,a,t[a]);return e},i=(e,r)=>t(e,a(r));import{g as c,r as d,u as m,a as u,b as g,R as p,F as h,S as E,B as f,c as x,C,H as b,I as y,d as w,T as v,L as k,e as $,i as S,f as I,M as D,h as U,j as R,k as M,l as O,m as L,n as T,o as _,p as P,q as F,s as A,t as N,v as z,w as B,x as W,y as q,z as j,A as H,D as Q,E as G,G as Z,J as Y,K as J,N as K,O as V,P as X,Q as ee,U as te,V as ae,W as re,X as se,Y as ne,Z as le,_ as oe,$ as ie,a0 as ce,a1 as de,a2 as me,a3 as ue,a4 as ge,a5 as pe,a6 as he,a7 as Ee,a8 as fe,a9 as xe,aa as Ce,ab as be,ac as ye,ad as we,ae as ve,af as ke,ag as $e,ah as Se,ai as Ie,aj as De,ak as Ue,al as Re,am as Me,an as Oe,ao as Le,ap as Te,aq as _e,ar as Pe}from"./vendor.9b34474d.js";const Fe=c`
  fragment UserDetails on User {
    id
    username
  }
`,Ae=c`
  fragment MessageDetails on Message {
    id
    text
    time
    forwarded
    chatId
    user {
      ...UserDetails
    }
    reply {
      id
      text
      user {
        ...UserDetails
      }
    }
  }
  ${Fe}
`,Ne=c`
  fragment ChatDetails on Chat {
    id
    name
    admin {
      ...UserDetails
    }
    users {
      ...UserDetails
    }
    message {
      ...MessageDetails
    }
  }
  ${Fe}
  ${Ae}
`,ze=c`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`,Be=c`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      ...UserDetails
    }
  }
  ${Fe}
`,We=c`
  mutation updateUser($username: String!, $password: String!) {
    updateUser(username: $username, password: $password) {
      ...UserDetails
    }
  }
  ${Fe}
`,qe=c`
  mutation deleteUser {
    deleteUser {
      ...UserDetails
    }
  }
  ${Fe}
`,je=c`
  mutation createChat($userIds: [ID!]!) {
    createChat(userIds: $userIds) {
      ...ChatDetails
      messages {
        ...MessageDetails
      }
    }
  }
  ${Ne}
  ${Ae}
`,He=c`
  mutation leaveChat($chatId: ID!) {
    leaveChat(chatId: $chatId) {
      ...ChatDetails
    }
  }
  ${Ne}
`,Qe=c`
  mutation renameChat($chatId: ID!, $name: String!) {
    renameChat(chatId: $chatId, name: $name) {
      ...ChatDetails
    }
  }
  ${Ne}
`,Ge=c`
  mutation changeAdmin($chatId: ID!, $userId: ID!) {
    changeAdmin(chatId: $chatId, userId: $userId) {
      ...ChatDetails
    }
  }
  ${Ne}
`,Ze=c`
  mutation addUsers($chatId: ID!, $userIds: [ID!]!) {
    addUsers(chatId: $chatId, userIds: $userIds) {
      ...ChatDetails
    }
  }
  ${Ne}
`,Ye=c`
  mutation removeUsers($chatId: ID!, $userIds: [ID!]!) {
    removeUsers(chatId: $chatId, userIds: $userIds) {
      ...ChatDetails
    }
  }
  ${Ne}
`,Je=c`
  mutation deleteChat($chatId: ID!) {
    deleteChat(chatId: $chatId) {
      ...ChatDetails
    }
  }
  ${Ne}
`,Ke=c`
  mutation createMessage(
    $text: String!
    $forwarded: Boolean
    $chatId: ID!
    $notification: Boolean
    $messageId: ID
  ) {
    createMessage(
      text: $text
      forwarded: $forwarded
      chatId: $chatId
      notification: $notification
      messageId: $messageId
    ) {
      ...MessageDetails
    }
  }
  ${Ae}
`,Ve=c`
  mutation updateMessage($messageId: ID!, $text: String!) {
    updateMessage(messageId: $messageId, text: $text) {
      ...MessageDetails
    }
  }
  ${Ae}
`,Xe=c`
  mutation deleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId) {
      ...MessageDetails
    }
  }
  ${Ae}
`;function et(e){const[t,a]=d.exports.useState(""),[r,s]=d.exports.useState(""),[n,l]=d.exports.useState(""),[o,i]=d.exports.useState(""),c=m(),[S]=u("(max-width: 750px)"),[I,{loading:D}]=g(ze,{onCompleted(t){localStorage.setItem("token",t.login),e.refetch(),c({title:o,status:"success",duration:3e3,isClosable:!0})}}),[U,{loading:R}]=g(Be,{onCompleted(e){i(`User ${e.createUser.username} created successfully`),I({variables:{username:t,password:r}})},onError(e){c({title:e.message,status:"error",duration:3e3,isClosable:!0})}});return p.createElement(h,{direction:"column",height:"lg"},p.createElement(E,{flex:"1"}),p.createElement(h,{flex:"10"},p.createElement(E,{flex:S?"2":"5"}),p.createElement(f,{flex:"3"},p.createElement("form",{onSubmit:function(e){e.preventDefault(),r===n?U({variables:{username:t,password:r}}):c({title:"Passwords do not match",status:"error",duration:3e3,isClosable:!0})}},p.createElement(x,{spacing:4},p.createElement(C,null,p.createElement(b,null,"Register")),p.createElement(y,{type:"text",placeholder:"Username",value:t,onChange:e=>a(e.target.value)}),p.createElement(y,{type:"password",placeholder:"Password",value:r,onChange:e=>s(e.target.value)}),p.createElement(y,{type:"password",placeholder:"Confirm Password",value:n,onChange:e=>l(e.target.value)}),p.createElement(w,{type:"submit",colorScheme:"teal",isLoading:R||D,loadingText:"Loading..."},"Register"),p.createElement(C,null,p.createElement(v,{fontSize:"sm"},"Have an account? Login"," ",p.createElement(k,{color:"teal",as:$,to:"/"},"here")))))),p.createElement(E,{flex:S?"2":"5"})))}function tt(e){const[t,a]=d.exports.useState(""),[r,s]=d.exports.useState(""),n=m(),[l]=u("(max-width: 750px)"),[o,i]=g(ze,{onCompleted(a){localStorage.setItem("token",a.login),e.refetch(),n({title:`Logged in as ${t}`,status:"success",duration:3e3,isClosable:!0})},onError(e){n({title:e.message,status:"error",duration:3e3,isClosable:!0})}});return p.createElement(h,{direction:"column",height:"lg"},p.createElement(E,{flex:"1"}),p.createElement(h,{flex:"10"},p.createElement(E,{flex:l?"2":"5"}),p.createElement(f,{flex:"3"},p.createElement("form",{onSubmit:function(e){e.preventDefault(),o({variables:{username:t,password:r}})}},p.createElement(x,{spacing:4},p.createElement(C,null,p.createElement(b,null,"Login")),p.createElement(y,{type:"text",placeholder:"Username",value:t,onChange:e=>a(e.target.value)}),p.createElement(y,{type:"password",placeholder:"Password",value:r,onChange:e=>s(e.target.value)}),p.createElement(w,{type:"submit",colorScheme:"teal",isLoading:i.loading,loadingText:"Loading..."},"Login"),p.createElement(C,null,p.createElement(v,{fontSize:"sm"},"Don't have an account? Register"," ",p.createElement(k,{color:"teal",as:$,to:"/register"},"here")))))),p.createElement(E,{flex:l?"2":"5"})))}const at=S({autoConnect:!1});function rt(e){return e.toLocaleString("en-US",{timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,hour:"numeric",minute:"numeric",hour12:!0})}function st(e,t,a){const r=I();d.exports.useEffect((()=>{!at.hasListeners(e)&&a&&at.on(e,(e=>{!function(e){return void 0!==e.text}(e)?!function(e){return void 0!==e.message&&void 0===e.messages}(e)?!function(e){return void 0!==e.messages}(e)?t(r.cache,e):t(r.cache,i(o({},e),{message:i(o({},e.message),{time:rt(new Date(e.message.time))}),messages:e.messages.map((e=>i(o({},e),{time:rt(new Date(e.time))})))})):t(r.cache,i(o({},e),{message:e.message?i(o({},e.message),{time:rt(new Date(e.message.time))}):null})):t(r.cache,i(o({},e),{time:rt(new Date(e.time))}))}))}),[e,a,r.cache,t])}const nt=c`
  query findUser {
    findUser {
      ...UserDetails
    }
  }
  ${Fe}
`,lt=c`
  query findUsers {
    findUsers {
      ...UserDetails
    }
  }
  ${Fe}
`,ot=c`
  query findChats {
    findChats {
      ...ChatDetails
      messages {
        ...MessageDetails
      }
    }
  }
  ${Ne}
  ${Ae}
`;function it(){return(e,t)=>{const{findChats:a}=e.readQuery({query:ot});a.find((e=>e.id===t.id))||e.writeQuery({query:ot,data:{findChats:[...a,t]}})}}function ct(){return(e,t)=>{const{findChats:a}=e.readQuery({query:ot});a.find((e=>e.id===t.id))&&(e.evict({id:`Chat:${t.id}`}),e.writeQuery({query:ot,data:{findChats:a.filter((e=>e.id!==t.id))}}),e.gc())}}function dt(e){return(t,a)=>{const r=t.readFragment({id:`Chat:${a.chatId}`,fragment:c`
        fragment CreateMessageRead on Chat {
          ...ChatDetails
          messages {
            ...MessageDetails
          }
        }
        ${Ne}
      `,fragmentName:"CreateMessageRead"});r.messages.find((e=>e.id===a.id))||t.writeFragment({id:`Chat:${r.id}`,fragment:c`
          fragment CreateMessageWrite on Chat {
            message {
              ...MessageDetails
            }
            messages {
              ...MessageDetails
            }
          }
          ${Ae}
        `,data:{message:a,messages:[a,...r.messages]},fragmentName:"CreateMessageWrite"}),e&&e.current&&(e.current.scrollTop=e.current.scrollHeight-e.current.clientHeight)}}function mt(){return(e,t)=>{const a=e.readFragment({id:`Chat:${t.chatId}`,fragment:c`
        fragment DeleteMessageRead on Chat {
          ...ChatDetails
          messages {
            ...MessageDetails
          }
        }
        ${Ne}
      `,fragmentName:"DeleteMessageRead"});a.messages.find((e=>e.id===t.id))&&(a.message.id===t.id&&e.writeFragment({id:`Chat:${a.id}`,fragment:c`
            fragment DeleteMessageWrite_ on Chat {
              message {
                ...MessageDetails
              }
            }
            ${Ae}
          `,data:{message:a.messages[1]},fragmentName:"DeleteMessageWrite_"}),e.evict({id:`Message${t.id}`}),e.writeFragment({id:`Chat:${a.id}`,fragment:c`
          fragment DeleteMessageWrite on Chat {
            messages {
              ...MessageDetails
            }
          }
          ${Ae}
        `,data:{messages:a.messages.filter((e=>e.id!==t.id))},fragmentName:"DeleteMessageWrite"}),e.gc())}}function ut(e){const[t,a]=d.exports.useState(e.user.username),[r,s]=d.exports.useState(""),[n,l]=d.exports.useState(""),o=m(),[i,{loading:c}]=g(We,{onCompleted(){e.onClose(),o({title:"Account updated successfully",status:"success",duration:3e3,isClosable:!0})},onError(t){"Not logged in"===t.message?(e.logout(),o({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0})):o({title:t.message,status:"error",duration:3e3,isClosable:!0})}}),[u,{loading:h}]=g(qe,{onCompleted(){e.logout(),o({title:"Account deleted successfully",status:"success",duration:3e3,isClosable:!0})},onError(t){"Not logged in"===t.message&&(e.logout(),o({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0}))}});return p.createElement(D,{isOpen:e.isOpen,onClose:e.onClose},p.createElement(U,null),p.createElement(R,null,p.createElement(M,{color:"teal"},"Profile"),p.createElement(O,null),p.createElement(L,null,p.createElement("form",{onSubmit:function(e){e.preventDefault(),r===n?i({variables:{username:t,password:r}}):o({title:"Passwords do not match",status:"error",duration:3e3,isClosable:!0})}},p.createElement(x,null,p.createElement(y,{type:"text",placeholder:"Username",value:t,onChange:e=>a(e.target.value)}),p.createElement(y,{type:"password",placeholder:"Password",value:r,onChange:e=>s(e.target.value)}),p.createElement(y,{type:"password",placeholder:"Confirm Password",value:n,onChange:e=>l(e.target.value)}),p.createElement(x,{direction:"row"},p.createElement(w,{type:"submit",colorScheme:"teal",isLoading:c,loadingText:"Loading..."},"Update Account"),p.createElement(w,{type:"button",colorScheme:"teal",onClick:e.logout},"Logout"),p.createElement(w,{type:"button",colorScheme:"red",isLoading:h,loadingText:"Loading...",onClick:()=>u()},"Delete Account"))))),p.createElement(f,{height:"20px"})))}function gt(e){const[t,a]=d.exports.useState(""),[r,s]=d.exports.useState(e.users),n=d.exports.useCallback(((e,t)=>e.id>t.id?1:e.id<t.id?-1:0),[]);d.exports.useEffect((()=>{const t=[...e.users].sort(n),a=[...e._users,...r].sort(n);let l=!0;if(t.length!==a.length)l=!1;else for(let e=0;e<t.length;e++)t[e].username!==a[e].username&&(l=!1);if(!l){for(const t of e.users){const n=a.find((e=>e.id===t.id));n?n.username!==t.username&&(e._users.find((e=>e.id===n.id))?e._setUsers(e._users.map((e=>e.id===n.id?t:e))):s(r.map((e=>e.id===n.id?t:e)))):s(r.concat(t))}if(a.length>e.users.length)for(const t of a)e.users.find((e=>e.id===t.id))||(e._users.find((e=>e.id===t.id))?e._setUsers(e._users.filter((e=>e.id!==t.id))):s(r.filter((e=>e.id!==t.id))))}}),[e,r,n]);const l=(e._users.length>5?200:40*e._users.length)+"px",c=(r.length>5?200:40*r.length)+"px";function m(e,t){let a;return a=0===t&&e.length>1?{borderTopLeftRadius:"5px",borderTopRadius:"5px",border:"1px solid #E2E8F0"}:0===t&&1===e.length?{borderRadius:"5px",border:"1px solid #E2E8F0"}:t===e.length-1?{borderBottomLeftRadius:"5px",borderBottomRightRadius:"5px",borderLeft:"1px solid #E2E8F0",borderRight:"1px solid #E2E8F0",borderBottom:"1px solid #E2E8F0"}:{borderLeft:"1px solid #E2E8F0",borderRight:"1px solid #E2E8F0",borderBottom:"1px solid #E2E8F0"},a}return p.createElement(D,{isOpen:e.isOpen,onClose:e.onClose},p.createElement(U,null),p.createElement(R,null,p.createElement(M,{color:"teal"},e.action),p.createElement(O,null),p.createElement(L,null,p.createElement("form",{onSubmit:function(t){t.preventDefault(),e.executeMutation()}},p.createElement(x,{spacing:3},p.createElement(y,{type:"text",placeholder:"Search Users",value:t,onChange:e=>a(e.target.value)}),e._users.length>0&&p.createElement(T,{height:l,overflow:"scroll"},e._users.map(((t,a)=>{const n=m(e._users,a);return p.createElement(_,o({key:t.id,display:"flex",paddingTop:"7px",paddingLeft:"15px",paddingBottom:"7px"},n),p.createElement(v,{flex:"1"},t.username),p.createElement(P,{size:"sm",marginRight:"10px",onClick:()=>{return a=t,e._setUsers(e._users.filter((e=>e.id!==a.id))),void s(r.concat(a));var a}}))}))),r.length>0&&p.createElement(T,{height:c,overflow:"scroll"},r.filter((e=>e.username.toLowerCase().includes(t))).map(((t,a)=>{const n=m(r,a);return p.createElement(_,i(o({key:t.id,paddingTop:"7px",paddingLeft:"15px",paddingBottom:"7px"},n),{_hover:{backgroundColor:"gray.100"},onClick:()=>{return a=t,e._setUsers(e._users.concat(a)),void s(r.filter((e=>e.id!==a.id)));var a}}),p.createElement(v,null,t.username))}))),p.createElement(w,{type:"submit",colorScheme:"teal",isLoading:e.loading,loadingText:"Loading..."},e.action)))),p.createElement(F,null)))}function pt(e){const[t,a]=d.exports.useState([]),r=it(),s=m(),[n,{loading:l}]=g(je,{update(t,a){a.data&&(r(t,a.data.createChat),e.setChat(a.data.createChat),e.onClose(),s({title:"Chat created",status:"success",duration:3e3,isClosable:!0}))},onError(a){if("Not logged in"===a.message)e.logout(),s({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0});else if("Chat already exists"===a.message){const a=e.chats.find((a=>{const r=[a.admin.id,...a.users.map((e=>e.id))].sort(),s=[e.user.id,...t.map((e=>e.id))].sort();if(r.length!==s.length)return!1;for(let e=0;e<r.length;e++)if(r[e]!==s[e])return!1;return!0}));e.onClose(),e.setChat(a)}else s({title:a.message,status:"error",duration:3e3,isClosable:!0})}});return p.createElement(gt,{users:e.users,_users:t,action:"Create Chat",isOpen:e.isOpen,loading:l,onClose:e.onClose,_setUsers:a,executeMutation:function(){n({variables:{userIds:t.map((e=>e.id))}})}})}function ht(e){return p.createElement(D,{isOpen:e.isOpen,onClose:e.onClose},p.createElement(U,null),p.createElement(R,null,p.createElement(M,{color:"teal"},"Group Info"),p.createElement(O,null),p.createElement(L,null,p.createElement(A,{variant:"simple"},p.createElement(N,null,p.createElement(z,null,p.createElement(B,null,"Role"),p.createElement(B,null,"Username"))),p.createElement(W,null,p.createElement(z,null,p.createElement(q,null,"Admin"),p.createElement(q,null,e.chat.admin.username))),p.createElement(W,null,e.chat.users.map((e=>p.createElement(z,{key:e.id},p.createElement(q,null,"User"),p.createElement(q,null,e.username))))))),p.createElement(F,null)))}function Et(e){const[t,a]=d.exports.useState(""),r=m(),[s,{loading:n}]=g(Qe,{update(t,a){if(a.data){const{id:t,name:r}=a.data.renameChat;e.createMessage({variables:{text:`${e.user.username} renamed this chat to ${r}`,chatId:t,notification:!0,socketId:at.id}}),e.onClose()}},onError(t){"Not logged in"===t.message?(e.logout(),r({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0})):r({title:t.message,status:"error",duration:3e3,isClosable:!0})}});return p.createElement(D,{isOpen:e.isOpen,onClose:e.onClose},p.createElement(U,null),p.createElement(R,null,p.createElement(M,{color:"teal"},"Rename Chat"),p.createElement(O,null),p.createElement(L,null,p.createElement("form",{style:{display:"flex"},onSubmit:function(a){a.preventDefault(),s({variables:{chatId:e.chat.id,name:t}})}},p.createElement(y,{flex:"1",type:"text",value:t,placeholder:e.chat.name,onChange:e=>a(e.target.value)}),p.createElement(w,{type:"submit",colorScheme:"teal",isLoading:n||e.loading,loadingText:"Loading..."},"Rename Chat"))),p.createElement(F,null)))}function ft(e){const[t,a]=d.exports.useState(e.chat.users[0].id),r=m(),[s,{loading:n}]=g(Ge,{update(t,a){if(a.data){const{id:t,admin:r}=a.data.changeAdmin,s=`${e.user.username} changed the admin to ${r.username}`;e.createMessage({variables:{text:s,chatId:t,notification:!0,socketId:at.id}}),e.onClose()}},onError(t){"Not logged in"===t.message&&(e.logout(),r({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0}))}});return p.createElement(D,{isOpen:e.isOpen,onClose:e.onClose},p.createElement(U,null),p.createElement(R,null,p.createElement(M,{color:"teal"},"Change Admin"),p.createElement(O,null),p.createElement(L,null,p.createElement("form",{style:{display:"flex"},onSubmit:function(a){a.preventDefault(),s({variables:{chatId:e.chat.id,userId:t}})}},p.createElement(j,{flex:"1",value:t,onChange:e=>a(e.target.value)},e.chat.users.map((e=>p.createElement("option",{key:e.id,value:e.id},e.username)))),p.createElement(w,{type:"submit",colorScheme:"teal",isLoading:n||e.loading,loadingText:"Loading..."},"Change Admin"))),p.createElement(F,null)))}function xt(e){const[t,a]=d.exports.useState([]),r=m(),[s,{loading:n}]=g(Ze,{update(a,r){if(r.data){const{id:a,users:s}=r.data.addUsers,n=bt("added",s.filter((e=>t.map((e=>e.id)).includes(e.id))),e.user);e.createMessage({variables:{text:n,chatId:a,notification:!0,socketId:at.id}}),e.onClose()}},onError(t){"Not logged in"===t.message?(e.logout(),r({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0})):r({title:t.message,status:"error",duration:3e3,isClosable:!0})}});return p.createElement(gt,{users:e.users,_users:t,action:"Add Users",isOpen:e.isOpen,loading:n||e.loading,onClose:e.onClose,_setUsers:a,executeMutation:function(){s({variables:{chatId:e.chat.id,userIds:t.map((e=>e.id))}})}})}function Ct(e){const[t,a]=d.exports.useState([]),r=ct(),s=m(),[n,{loading:l}]=g(Ye,{update(t,a){if(a.data){const{id:s,users:n}=a.data.removeUsers;if(n.length){const t=bt("removed",e.chat.users.filter((e=>!n.map((e=>e.id)).includes(e.id))),e.user);e.createMessage({variables:{text:t,chatId:s,notification:!0,socketId:at.id}}),e.onClose()}else r(t,a.data.removeUsers),e.onClose()}},onError(t){"Not logged in"===t.message?(e.logout(),s({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0})):s({title:t.message,status:"error",duration:3e3,isClosable:!0})}});return p.createElement(gt,{users:e.chat.users,_users:t,action:"Remove Users",isOpen:e.isOpen,loading:l||e.loading,onClose:e.onClose,_setUsers:a,executeMutation:function(){n({variables:{chatId:e.chat.id,userIds:t.map((e=>e.id))}})}})}function bt(e,t,a){let r;switch(t.length){case 1:r=`${a.username} ${e} ${t[0].username}`;break;case 2:r=`${a.username} ${e} ${t[0].username} and ${t[1].username}`;break;default:r=`${a.username} ${e} `;for(let e=0;e<t.length;e++)e===t.length-1?r+=`and ${t[e].username}`:r+=`${t[e].username}, `}return r}function yt(e){const[t,a]=d.exports.useState([]),r=(e,t)=>{const{findUsers:a}=e.readQuery({query:lt});e.writeQuery({query:lt,data:{findUsers:[...a,t]}})},s=(e,t)=>{e.writeFragment({id:`User:${t.id}`,fragment:c`
        fragment UpdateUserWrite on User {
          username
        }
      `,data:{username:t.username}})},n=(l=e.user,u=e.logout,(e,t)=>{if(l.id===t.id)u();else{const{findUsers:a}=e.readQuery({query:lt});e.evict({id:`User:${t.id}`}),e.writeQuery({query:lt,data:{findUsers:a.filter((e=>e.id!==t.id))}}),e.gc()}});var l,u;const h=ct(),E=dt(),f=m(),{isOpen:x,onOpen:C,onClose:b}=H(),{isOpen:y,onOpen:w,onClose:v}=H(),{isOpen:k,onOpen:$,onClose:S}=H(),{isOpen:I,onOpen:D,onClose:U}=H(),{isOpen:R,onOpen:M,onClose:O}=H(),{isOpen:L,onOpen:T,onClose:_}=H(),{isOpen:P,onOpen:F,onClose:A}=H(),{loading:N,data:z}=Q(lt,{onError(t){"Not logged in"===t.message&&(e.logout(),f({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0}))}}),[B,{loading:W}]=g(Ke,{update(e,t){t.data&&E(e,t.data.createMessage)},onError(t){"Not logged in"===t.message&&(e.logout(),f({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0}))}}),[q]=g(He,{update(t,a){if(a.data){const{id:r,users:s}=a.data.leaveChat,n=`${e.user.username} left the chat`;h(t,a.data.leaveChat),s.length&&B({variables:{text:n,chatId:r,notification:!0,socketId:at.id}})}},onError(t){"Not logged in"===t.message&&(e.logout(),f({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0}))}}),[j]=g(Je,{update(e,t){t.data&&h(e,t.data.deleteChat)},onError(t){"Not logged in"===t.message&&(e.logout(),f({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0}))}});st("USER_CREATED",r,z),st("USER_UPDATED",s,z),st("USER_DELETED",n,z),d.exports.useEffect((()=>{z&&a(z.findUsers)}),[z]);const de={user:e.user,chat:e.chat,loading:W,createMessage:B,logout:e.logout};return p.createElement(G,{isLoaded:!N},z&&p.createElement(Z,null,p.createElement(Y,{backgroundColor:"teal",as:J,icon:p.createElement(K,{as:V,color:"white",transform:"scale(1.2)"}),borderRadius:"full",_hover:{bg:"teal.500"},_active:{bg:"teal.500"},_expanded:{bg:"teal.500"}}),p.createElement(X,null,p.createElement(ee,{icon:p.createElement(K,{as:te}),onClick:C},"Profile"),p.createElement(ee,{icon:p.createElement(K,{as:ae}),onClick:w},"Create Chat"),e.chat&&p.createElement(p.Fragment,null,p.createElement(ee,{icon:p.createElement(K,{as:re,transform:"scale(1.5)"}),onClick:$},"Group Info"),p.createElement(ee,{icon:p.createElement(K,{as:se}),onClick:function(){q({variables:{chatId:e.chat.id}})}},"Leave Chat"),e.user.id===e.chat.admin.id&&p.createElement(p.Fragment,null,e.chat.users.length>1&&p.createElement(p.Fragment,null,p.createElement(ee,{icon:p.createElement(K,{as:ne}),onClick:D},"Rename Chat")),p.createElement(ee,{icon:p.createElement(K,{as:le}),onClick:M},"Change Admin"),t.filter((e=>!de.chat.users.find((t=>t.id===e.id)))).length>0&&p.createElement(ee,{icon:p.createElement(K,{as:oe}),onClick:T},"Add Users"),e.chat.users.length>1&&p.createElement(ee,{icon:p.createElement(K,{as:ie}),onClick:F},"Remove Users"),p.createElement(ee,{icon:p.createElement(K,{as:ce}),onClick:function(){j({variables:{chatId:e.chat.id}})}},"Delete Chat"))),x&&p.createElement(ut,{user:e.user,isOpen:x,onClose:b,logout:e.logout}),y&&p.createElement(pt,{user:e.user,users:t,chats:e.chats,isOpen:y,onClose:v,setChat:e.setChat,logout:e.logout}),k&&p.createElement(ht,{chat:e.chat,isOpen:k,onClose:S}),I&&p.createElement(Et,i(o({},de),{isOpen:I,onClose:U})),R&&p.createElement(ft,i(o({},de),{isOpen:R,onClose:O})),L&&p.createElement(xt,i(o({},de),{users:t.filter((e=>!de.chat.users.find((t=>t.id===e.id)))),isOpen:L,onClose:_})),P&&p.createElement(Ct,i(o({},de),{isOpen:P,onClose:A})))))}function wt(e){const[t,a]=d.exports.useState(e.chats[0].id),r=m(),s=dt(),[n,{loading:l}]=g(Ke,{update(a,r){r.data&&(s(a,r.data.createMessage),e.onClose(),e.setMessage(null),e.setChat(e.chats.find((e=>e.id===t))))},onError(t){"Not logged in"===t.message&&(e.logout(),r({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0}))}});return p.createElement(D,{isOpen:e.isOpen,onClose:e.onClose},p.createElement(U,null),p.createElement(R,null,p.createElement(M,{color:"teal"},"Forward Message"),p.createElement(O,null),p.createElement(L,null,p.createElement("form",{style:{display:"flex"},onSubmit:function(a){a.preventDefault(),n({variables:{text:e.message.text,chatId:t,forwarded:!0}})}},p.createElement(j,{flex:"1",value:t,onChange:e=>a(e.target.value)},e.chats.map((e=>p.createElement("option",{key:e.id,value:e.id},e.name)))),p.createElement(w,{type:"submit",colorScheme:"teal",isLoading:l,loadingText:"Loading..."},"Forward Message"))),p.createElement(F,null)))}function vt(e){const[t,a]=d.exports.useState(""),r=m(),[s,{loading:n}]=g(Ve,{onCompleted(){e.onClose(),e.setMessage(null)},onError(t){"Not logged in"===t.message?(e.logout(),r({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0})):r({title:t.message,status:"error",duration:3e3,isClosable:!0})}});return p.createElement(D,{isOpen:e.isOpen,onClose:e.onClose},p.createElement(U,null),p.createElement(R,null,p.createElement(M,{color:"teal"},"Update Message"),p.createElement(O,null),p.createElement(L,null,p.createElement("form",{style:{display:"flex"},onSubmit:function(a){a.preventDefault(),s({variables:{messageId:e.message.id,text:t}})}},p.createElement(y,{flex:"1",type:"text",value:t,placeholder:e.message.text,onChange:e=>a(e.target.value)}),p.createElement(w,{type:"submit",colorScheme:"teal",isLoading:n,loadingText:"Loading..."},"Update Message"))),p.createElement(F,null)))}function kt(e){const{isOpen:t,onOpen:a,onClose:r}=H(),{isOpen:s,onOpen:n,onClose:l}=H(),c=mt(),d=m(),[u]=g(Xe,{update(e,t){t.data&&c(e,t.data.deleteMessage)},onError(t){"Not logged in"===t.message&&(e.logout(),d({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0}))}}),h={message:e.message,setMessage:e.setMessage,logout:e.logout};return p.createElement(de,{spacing:5,marginRight:"5px"},p.createElement(me,{backgroundColor:"white",color:"black",label:"reply to message","aria-label":"reply"},p.createElement(J,{color:"white",icon:p.createElement(K,{as:ue,transform:"scale(1.5)"}),variant:"ghost","aria-label":"reply",_hover:{backgroundColor:"teal.500"},onClick:function(){e.setReply(e.message),e.inputRef.current&&e.inputRef.current.focus(),e.setMessage(null)}})),e.chats.length>1&&p.createElement(me,{backgroundColor:"white",color:"black",label:"forward message","aria-label":"forward"},p.createElement(J,{color:"white",icon:p.createElement(K,{as:ge,transform:"scale(1.5)"}),variant:"ghost","aria-label":"forward",_hover:{backgroundColor:"teal.500"},onClick:a})),e.message.user.id===e.user.id&&p.createElement(p.Fragment,null,!e.message.forwarded&&p.createElement(me,{backgroundColor:"white",color:"black",label:"update message","aria-label":"update"},p.createElement(J,{color:"white",icon:p.createElement(K,{as:pe,transform:"scale(1.4)"}),variant:"ghost","aria-label":"update",_hover:{backgroundColor:"teal.500"},onClick:n})),p.createElement(me,{backgroundColor:"white",color:"black",label:"delete message","aria-label":"delete"},p.createElement(J,{color:"white",icon:p.createElement(K,{as:he,transform:"scale(1.4)"}),variant:"ghost","aria-label":"delete",_hover:{backgroundColor:"teal.500"},onClick:function(){u({variables:{messageId:e.message.id}}),e.setMessage(null)}}))),s&&p.createElement(vt,i(o({},h),{isOpen:s,onClose:l})),t&&p.createElement(wt,i(o({},h),{chats:e.chats.filter((t=>t.id!==e.chat.id)),isOpen:t,onClose:r,setChat:e.setChat})))}function $t(e){return p.createElement(T,{flex:"1",overflow:"scroll"},e.chats.map((t=>{const a=t.message;return p.createElement(_,{key:t.id,padding:"7%",borderBottom:"1px solid #CBD5E0",backgroundColor:e.chat.id===t.id?"gray.100":"white",_hover:{backgroundColor:"gray.100"},onClick:()=>{return a=t,e.setChat(a),void(e.onClose&&e.onClose());var a}},p.createElement(h,{alignItems:"center"},p.createElement(b,{flex:"1",color:"teal",fontSize:"lg"},t.name),p.createElement(v,{marginLeft:"2px"},a.time)),p.createElement(v,{marginTop:"2px",maxWidth:.2*e.width+"px",color:"gray.500",isTruncated:!0},a.text))})))}function St(e){const[t,a]=d.exports.useState(""),r=dt(e.listRef),s=m(),[n]=g(Ke,{optimisticResponse:{createMessage:{id:"TEMPORARY_MESSAGE_ID",text:t,time:(new Date).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:!0}),forwarded:!1,chatId:e.chat.id,user:i(o({},e.user),{__typename:"User"}),reply:e.reply?{id:e.reply.id,text:e.reply.text,user:i(o({},e.reply.user),{__typename:"User"})}:null,__typename:"Message"}},update(t,a){a.data&&(r(t,a.data.createMessage),e.setReply(null))},onError(t){"Not logged in"===t.message?(e.logout(),s({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0})):s({title:t.message,status:"error",duration:3e3,isClosable:!0})}});return p.createElement(p.Fragment,null,p.createElement(f,{flex:"1"}),p.createElement(T,{display:"flex",flexDirection:"column-reverse",overflow:"scroll",ref:e.listRef},e.chat.messages.map(((t,a)=>{if(!t.user)return p.createElement(_,{key:t.id,width:"fit-content",maxWidth:"20vw",color:"gray.700",backgroundColor:"blue.100",marginTop:a===e.chat.messages.length-1?"10px":"0px",marginBottom:0===a?"10px":"5px",marginLeft:"auto",marginRight:"auto",padding:"5px 15px",borderRadius:"3xl",textAlign:"center"},p.createElement(v,{fontSize:"sm"},t.text));const r={width:"fit-content",maxWidth:"40vw",color:"black",backgroundColor:t.user.id===e.user.id?"teal.100":"gray.100",marginBottom:0===a?"10px":"5px",marginRight:t.user.id===e.user.id?"10px":"auto",marginLeft:t.user.id===e.user.id?"auto":"10px",padding:"5px 10px",borderRadius:"2xl",boxShadow:e.message&&e.message.id===t.id?"inner":"base",onClick:()=>e.setMessage(t)};return t.forwarded?p.createElement(_,i(o({},r),{key:t.id}),e.chat.users.length>1&&t.user.id!==e.user.id&&p.createElement(v,{marginBottom:"-2px",fontSize:"sm",fontWeight:"bold"},t.user.username),p.createElement(h,{marginBottom:"-2px",alignItems:"center"},p.createElement(K,{marginRight:"5px",color:"gray.500",as:ge}),p.createElement(v,{color:"gray.500",fontSize:"xs",fontStyle:"italic"},"forwarded")),p.createElement(v,{fontSize:"sm"},t.text),p.createElement(h,null,p.createElement(f,{flex:"1"}),p.createElement(v,{fontSize:"xx-small",color:"gray"},t.time))):t.reply?p.createElement(_,i(o({},r),{key:t.id}),e.chat.users.length>1&&t.user.id!==e.user.id&&p.createElement(v,{marginBottom:"-5px",fontSize:"sm",fontWeight:"bold"},t.user.username),p.createElement(f,{marginTop:e.chat.users.length>1&&t.user.id!==e.user.id?"8px":"5px",marginBottom:"3px",backgroundColor:t.user.id===e.user.id?"teal.50":"gray.50",padding:"5px 10px",borderLeft:"6px solid teal",borderRadius:"md"},p.createElement(v,{marginBottom:"-5px",fontSize:"sm",fontWeight:"bold"},t.reply.user.username),p.createElement(v,{fontSize:"sm"},t.reply.text)),p.createElement(v,{fontSize:"sm"},t.text),p.createElement(h,null,p.createElement(f,{flex:"1"}),p.createElement(v,{fontSize:"xx-small",color:"gray"},t.time))):p.createElement(_,i(o({},r),{key:t.id}),e.chat.users.length>1&&t.user.id!==e.user.id&&p.createElement(v,{marginBottom:"-5px",fontSize:"sm",fontWeight:"bold"},t.user.username),p.createElement(v,{fontSize:"sm"},t.text),p.createElement(h,null,p.createElement(f,{flex:"1"}),p.createElement(v,{fontSize:"xx-small",color:"gray"},t.time)))}))),p.createElement("form",{style:{display:"flex",flexDirection:"column"},onSubmit:function(r){if(r.preventDefault(),t.length>150)s({title:"Text must be less than 150 characters",status:"error",duration:3e3,isClosable:!0});else{let r;r=e.reply?{text:t,chatId:e.chat.id,messageId:e.reply.id}:{text:t,chatId:e.chat.id},n({variables:r}),a("")}}},e.reply&&p.createElement(h,{backgroundColor:"gray.100",padding:"10px 10px 0px 10px",justifyContent:"center",alignItems:"center"},p.createElement(f,{flex:"1",backgroundColor:"gray.50",padding:"5px 10px",borderLeft:"6px solid teal",borderRadius:"md"},p.createElement(v,{marginBottom:"-5px",fontSize:"sm",fontWeight:"bold"},e.reply.user.username),p.createElement(v,{fontSize:"sm"},e.reply.text)),p.createElement(J,{type:"button",marginLeft:"10px",icon:p.createElement(K,{as:Ee,transform:"scale(1.3)"}),"aria-label":"cancel",onClick:()=>e.setReply(null)})),p.createElement(f,{backgroundColor:"gray.100",padding:"10px"},p.createElement(h,null,p.createElement(y,{backgroundColor:"white",type:"text",placeholder:"Send Message",value:t,onChange:e=>a(e.target.value),ref:e.inputRef}),p.createElement(J,{type:"submit",marginLeft:"10px",colorScheme:"teal","aria-label":"send",icon:p.createElement(K,{as:fe})})))))}function It(e){const[t,a]=d.exports.useState(window.innerHeight),[r,s]=d.exports.useState(window.innerWidth),[n,l]=d.exports.useState(null),[g,E]=d.exports.useState([]),[x,C]=d.exports.useState(null),[y,w]=d.exports.useState(null),k=d.exports.useRef(null),$=d.exports.useRef(null),S=d.exports.useRef(null),I=it(),D=(e,t)=>{e.writeFragment({id:`Chat:${t.id}`,fragment:c`
        fragment UpdateChatWrite on Chat {
          name
          admin {
            ...UserDetails
          }
          users {
            ...UserDetails
          }
        }
        ${Fe}
      `,data:{name:t.name,admin:t.admin,users:t.users},fragmentName:"UpdateChatWrite"})},R=ct(),T=dt(S),_=(e,t)=>{e.writeFragment({id:`Message:${t.id}`,fragment:c`
        fragment UpdateMessageWrite on Message {
          text
        }
      `,data:{text:t.text}})},P=mt(),A=m(),[N]=u("(max-width: 650px)"),{isOpen:z,onOpen:B,onClose:W}=H(),{loading:q,data:j}=Q(ot,{onError(t){"Not logged in"===t.message&&(e.logout(),A({title:"Token expired. Please log back in",status:"error",duration:3e3,isClosable:!0}))}});st("CHAT_CREATED",I,j),st("CHAT_UPDATED",D,j),st("CHAT_DELETED",R,j),st("MESSAGE_CREATED",T,j),st("MESSAGE_UPDATED",_,j),st("MESSAGE_DELETED",P,j);const Z=d.exports.useCallback((()=>{a(window.innerHeight),s(window.innerWidth)}),[]);return d.exports.useEffect((()=>(window.addEventListener("resize",Z),()=>window.removeEventListener("resize",Z))),[Z]),d.exports.useEffect((()=>{j&&(j.findChats.length?E(j.findChats.map((t=>{if(!t.name){const a=[t.admin,...t.users].filter((t=>t.id!==e.user.id));return 1===a.length?i(o({},t),{name:`${a[0].username}`}):2===a.length?i(o({},t),{name:`${a[0].username} and ${a[1].username}`}):i(o({},t),{name:`${a[0].username} and ${a.length-1} others`})}return t}))):E([]))}),[j,e.user]),d.exports.useEffect((()=>{l((e=>{const t=e&&g.find((t=>t.id===e.id));return t||(g.length?g[0]:null)}))}),[g]),N?p.createElement(h,{height:`${t}px`,flexDirection:"column"},p.createElement(h,{flex:"1",backgroundColor:"teal",alignItems:"center"},j&&p.createElement(G,{display:"flex",flex:"1",alignItems:"center",isLoaded:!q},n&&x?p.createElement(p.Fragment,null,p.createElement(f,{flex:"1"},p.createElement(J,{marginLeft:"10px",icon:p.createElement(K,{as:xe,transform:"scale(1.5)"}),"aria-label":"back",color:"white",variant:"ghost",_hover:{backgroundColor:"teal.500"},onClick:()=>C(null)})),p.createElement(kt,{user:e.user,chat:n,chats:g,message:x,inputRef:$,setChat:l,setMessage:C,setReply:w,logout:e.logout})):p.createElement(p.Fragment,null,p.createElement(J,{margin:"0px 10px",icon:p.createElement(K,{as:Ce,transform:"scale(1.3)"}),"aria-label":"chats",color:"white",variant:"ghost",_hover:{backgroundColor:"teal.500"},onClick:B,ref:k}),p.createElement(b,{flex:"1",fontSize:"25px",color:"white"},"WebText")),p.createElement(yt,{user:e.user,chat:n,chats:g,setChat:l,logout:e.logout}),z&&p.createElement(be,{isOpen:z,placement:"left",onClose:W,finalFocusRef:k},p.createElement(U,null),p.createElement(ye,null,p.createElement(M,null,"Chats"),p.createElement(O,null),p.createElement(L,null,n?p.createElement($t,{width:r,chat:n,chats:g,setChat:l,onClose:W}):p.createElement(v,{margin:"20px"},"No chats found")),p.createElement(F,null))))),p.createElement(h,{flex:"12",overflow:"auto"},p.createElement(G,{flex:"1",display:"flex",flexDirection:"column",isLoaded:!q},j&&n&&p.createElement(St,{user:e.user,chat:n,message:x,reply:y,inputRef:$,listRef:S,setMessage:C,setReply:w,logout:e.logout}),j&&!g.length&&p.createElement(h,{flex:"1",justifyContent:"center",alignItems:"center"},p.createElement(v,null,"No chats found"))))):p.createElement(f,{height:`${t}px`,width:`${r}px`,display:"flex",justifyContent:"center",alignItems:"center"},p.createElement(we,{height:.85*t+"px",width:.85*r+"px",templateRows:"repeat(20, 1fr)",templateColumns:"repeat(20, 1fr)",boxShadow:"2xl",borderRadius:"md"},p.createElement(ve,{rowStart:1,rowEnd:3,colStart:1,colEnd:6,backgroundColor:"teal",borderTopLeftRadius:"md",display:"flex",alignItems:"center"},p.createElement(b,{marginLeft:"20px",fontSize:"25px",color:"white"},"WebText")),p.createElement(ve,{rowStart:1,rowEnd:3,colStart:6,colEnd:21,backgroundColor:"teal",borderTopRightRadius:"md",display:"flex",alignItems:"center"},p.createElement(f,{flex:"1"},x&&p.createElement(J,{marginLeft:"5px",icon:p.createElement(K,{as:xe,transform:"scale(1.5)"}),"aria-label":"back",color:"white",variant:"ghost",_hover:{backgroundColor:"teal"},onClick:()=>C(null)})),p.createElement(G,{marginRight:"5px",display:"flex",alignItems:"center",isLoaded:!q},j&&p.createElement(p.Fragment,null,n&&x&&p.createElement(kt,{user:e.user,chat:n,chats:g,message:x,inputRef:$,setChat:l,setMessage:C,setReply:w,logout:e.logout}),p.createElement(yt,{user:e.user,chat:n,chats:g,setChat:l,logout:e.logout})))),p.createElement(ve,{rowStart:3,rowEnd:21,colStart:1,colEnd:6,backgroundColor:"white",borderBottomLeftRadius:"md",borderRight:"1px solid #CBD5E0",display:"flex"},p.createElement(G,{flex:"1",display:"flex",isLoaded:!q},j&&p.createElement(p.Fragment,null,n?p.createElement($t,{width:r,chat:n,chats:g,setChat:l}):p.createElement(v,{margin:"20px"},"No chats found")))),p.createElement(ve,{rowStart:3,rowEnd:21,colStart:6,colEnd:21,backgroundColor:"white",borderBottomRightRadius:"md",display:"flex"},p.createElement(G,{flex:"1",display:"flex",flexDirection:"column",isLoaded:!q},j&&n&&p.createElement(St,{user:e.user,chat:n,message:x,reply:y,inputRef:$,listRef:S,setMessage:C,setReply:w,logout:e.logout})))))}function Dt(){const{loading:e,data:t,refetch:a}=Q(nt,{fetchPolicy:"cache-and-network",notifyOnNetworkStatusChange:!0}),r=I();return d.exports.useEffect((()=>{t&&!t.findUser&&localStorage.clear(),t&&t.findUser&&!at.connected&&(at.connect(),at.emit("AUTHORIZATION",`Bearer ${localStorage.getItem("token")}`))}),[t]),e||!t?null:t.findUser?p.createElement(p.Fragment,null,p.createElement(ke,null,p.createElement($e,{path:"/",exact:!0},p.createElement(It,{user:t.findUser,logout:function(){localStorage.clear(),at.disconnect(),r.clearStore(),a()}})),p.createElement($e,null,p.createElement(Se,{to:"/"})))):p.createElement(ke,null,p.createElement($e,{path:"/register"},p.createElement(et,{refetch:a})),p.createElement($e,{path:"/",exact:!0},p.createElement(tt,{refetch:a})),p.createElement($e,null,p.createElement(Se,{to:"/"})))}const Ut=new Me({link:Ue([new Ie(((e,t)=>(e.setContext((e=>({headers:i(o({},e.headers),{authorization:`Bearer ${localStorage.getItem("token")}`,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone})}))),t(e)))),new De]),cache:new Re({typePolicies:{Query:{fields:{findUsers:{merge:(e,t)=>t},findChats:{merge:(e,t)=>t}}},Chat:{fields:{admin:{merge:(e,t)=>t},users:{merge:(e,t)=>t},messages:{merge:(e,t)=>t}}}}})}),Rt=Oe({styles:{global:{"body::-webkit-scrollbar":{display:"none"},body:{msOverflowStyle:"none",scrollbarWidth:"none"},"ul::-webkit-scrollbar":{display:"none"},ul:{msOverflowStyle:"none",scrollbarWidth:"none"}}}});Le.render(p.createElement(Te,{theme:Rt},p.createElement(_e,{client:Ut},p.createElement(Pe,null,p.createElement(Dt,null)))),document.getElementById("root"));
