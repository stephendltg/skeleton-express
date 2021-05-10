(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{472:function(s,t,a){"use strict";a.r(t);var e=a(2),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("Block",[a("h1",{attrs:{id:"users"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#users"}},[s._v("#")]),s._v(" USERS")]),s._v(" "),a("p",[a("a",{attrs:{href:s.$withBase("/postman/EPYO-VISIOM TABLE USERS.postman_collection.json"),alt:"logo",download:""}},[s._v("Postman")])])]),s._v(" "),a("Block",[a("h2",{attrs:{id:"get-all-users"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-all-users"}},[s._v("#")]),s._v(" GET: All Users")]),s._v(" "),a("h3",{attrs:{id:"api-json-v1-users"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-users"}},[s._v("#")]),s._v(" /api/json/v1/users")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("Status")]),s._v(" "),a("p",[a("strong",[s._v("200")])])]),s._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -X GET http://localhost:3000/api/json/v1/users\n")])])])])],1)],1),s._v(" "),a("Block",[a("h2",{attrs:{id:"get-users-by-id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-users-by-id"}},[s._v("#")]),s._v(" GET: Users by Id")]),s._v(" "),a("h3",{attrs:{id:"api-json-v1-users-id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-users-id"}},[s._v("#")]),s._v(" /api/json/v1/users/:id")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("Status")]),s._v(" "),a("p",[s._v("if user exist "),a("strong",[s._v("200")]),s._v(" else "),a("strong",[s._v("404")])])]),s._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -X GET http://localhost:3000/api/json/v1/users/1\n")])])])])],1)],1),s._v(" "),a("Block",[a("h2",{attrs:{id:"post-create-user"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#post-create-user"}},[s._v("#")]),s._v(" POST: Create user")]),s._v(" "),a("h3",{attrs:{id:"api-json-v1-users-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-users-2"}},[s._v("#")]),s._v(" /api/json/v1/users")]),s._v(" "),a("table",[a("thead",[a("tr",[a("th",[s._v("params")]),s._v(" "),a("th",[s._v("type")]),s._v(" "),a("th",[s._v("description")])])]),s._v(" "),a("tbody",[a("tr",[a("td",[s._v("user_login")]),s._v(" "),a("td",[s._v("string")]),s._v(" "),a("td",[s._v("login unique in database")])]),s._v(" "),a("tr",[a("td",[s._v("user_pass")]),s._v(" "),a("td",[s._v("string")]),s._v(" "),a("td",[s._v("password")])]),s._v(" "),a("tr",[a("td",[s._v("user_email")]),s._v(" "),a("td",[s._v("string")]),s._v(" "),a("td",[s._v("email unique in database")])]),s._v(" "),a("tr",[a("td",[s._v("display_name")]),s._v(" "),a("td",[s._v("string")]),s._v(" "),a("td",[s._v("Username")])]),s._v(" "),a("tr",[a("td",[s._v("user_meta")]),s._v(" "),a("td",[s._v("Array - Map")]),s._v(" "),a("td",[s._v("List meta user")])]),s._v(" "),a("tr",[a("td",[s._v("user_activation_key")]),s._v(" "),a("td",[s._v("Integer")]),s._v(" "),a("td",[s._v("Level access")])])])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("Status")]),s._v(" "),a("p",[s._v("if user create "),a("strong",[s._v("201")]),s._v(" else "),a("strong",[s._v("404")]),s._v(" or "),a("strong",[s._v("400")])])]),s._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -X POST http://localhost:3000/api/json/v1/users "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n    --header "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Content-Type: application/json'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n    --data "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'{\n    "user_login": "David",\n    "user_pass": "David4",\n    "user_email": "test@epyo.eu"\n    }\'')]),s._v("\n\n")])])])])],1)],1),s._v(" "),a("Block",[a("h2",{attrs:{id:"post-update-user"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#post-update-user"}},[s._v("#")]),s._v(" POST: Update user")]),s._v(" "),a("h3",{attrs:{id:"api-json-v1-users-id-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-users-id-2"}},[s._v("#")]),s._v(" /api/json/v1/users/:id")]),s._v(" "),a("table",[a("thead",[a("tr",[a("th",[s._v("params")]),s._v(" "),a("th",[s._v("type")]),s._v(" "),a("th",[s._v("description")])])]),s._v(" "),a("tbody",[a("tr",[a("td",[s._v("user_login")]),s._v(" "),a("td",[s._v("string")]),s._v(" "),a("td",[s._v("login unique in database")])]),s._v(" "),a("tr",[a("td",[s._v("user_pass")]),s._v(" "),a("td",[s._v("string")]),s._v(" "),a("td",[s._v("password")])]),s._v(" "),a("tr",[a("td",[s._v("user_email")]),s._v(" "),a("td",[s._v("string")]),s._v(" "),a("td",[s._v("email unique in database")])]),s._v(" "),a("tr",[a("td",[s._v("display_name")]),s._v(" "),a("td",[s._v("string")]),s._v(" "),a("td",[s._v("Username")])]),s._v(" "),a("tr",[a("td",[s._v("user_meta")]),s._v(" "),a("td",[s._v("Array - Map")]),s._v(" "),a("td",[s._v("List meta user")])]),s._v(" "),a("tr",[a("td",[s._v("user_activation_key")]),s._v(" "),a("td",[s._v("Integer")]),s._v(" "),a("td",[s._v("Level access")])])])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("Status")]),s._v(" "),a("p",[s._v("if user update "),a("strong",[s._v("200")]),s._v(" else "),a("strong",[s._v("404")]),s._v(" or "),a("strong",[s._v("400")])])]),s._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -X POST http://localhost:3000/api/json/v1/users/1 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n    --header "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Content-Type: application/json'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n    --data "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'{\n    "user_login": "epyo",\n    "user_meta": [["facebook", 456]]\n    }\'')]),s._v("\n\n")])])])])],1)],1),s._v(" "),a("Block",[a("h2",{attrs:{id:"delete-delete-user"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#delete-delete-user"}},[s._v("#")]),s._v(" DELETE: Delete user")]),s._v(" "),a("h3",{attrs:{id:"api-json-v1-users-id-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-users-id-3"}},[s._v("#")]),s._v(" /api/json/v1/users/:id")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("Status")]),s._v(" "),a("p",[s._v("if user exist "),a("strong",[s._v("200")]),s._v(" else "),a("strong",[s._v("404")])])]),s._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -X DELETE http://localhost:3000/api/json/v1/users/2 \n\n")])])])])],1)],1)],1)}),[],!1,null,null,null);t.default=r.exports}}]);