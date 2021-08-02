(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{473:function(t,s,a){"use strict";a.r(s);var e=a(2),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("Block",[a("h1",{attrs:{id:"terms"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#terms"}},[t._v("#")]),t._v(" TERMS")])]),t._v(" "),a("Block",[a("h2",{attrs:{id:"get-all-terms-type-post"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-all-terms-type-post"}},[t._v("#")]),t._v(" GET: All terms type post")]),t._v(" "),a("h3",{attrs:{id:"api-json-v1-terms"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-terms"}},[t._v("#")]),t._v(" /api/json/v1/terms")]),t._v(" "),a("h4",{attrs:{id:"filter-by-query-params"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#filter-by-query-params"}},[t._v("#")]),t._v(" Filter by query params")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("params")]),t._v(" "),a("th",[t._v("type")]),t._v(" "),a("th",[t._v("example")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("search")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v("no-ca")])]),t._v(" "),a("tr",[a("td",[t._v("limit")]),t._v(" "),a("td",[t._v("integer")]),t._v(" "),a("td",[t._v("default: 100")])]),t._v(" "),a("tr",[a("td",[t._v("offset")]),t._v(" "),a("td",[t._v("integer")]),t._v(" "),a("td",[t._v("default: 0")])]),t._v(" "),a("tr",[a("td",[t._v("orderby")]),t._v(" "),a("td",[t._v("field (1)")]),t._v(" "),a("td",[t._v("default: name")])]),t._v(" "),a("tr",[a("td",[t._v("order")]),t._v(" "),a("td",[t._v("asc or desc")]),t._v(" "),a("td",[t._v("default: desc")])]),t._v(" "),a("tr",[a("td",[t._v("name")]),t._v(" "),a("td",[t._v("where name == string")]),t._v(" "),a("td",[t._v("name=no-category")])]),t._v(" "),a("tr",[a("td",[t._v("slug")]),t._v(" "),a("td",[t._v("where slug == string")]),t._v(" "),a("td",[t._v("title=no-category")])])])]),t._v(" "),a("div",{staticClass:"language-tip example extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("ex: /api/json/v1/terms?search=no\n")])])]),a("p",[a("strong",[t._v("(1) fields available")]),t._v(": 'id', 'name', 'slug', 'description', 'type', 'term_meta', 'count'")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Status")]),t._v(" "),a("p",[a("strong",[t._v("200")])])]),t._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X GET http://localhost:3000/api/json/v1/terms\n")])])])])],1)],1),t._v(" "),a("Block",[a("h2",{attrs:{id:"get-terms-type-id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-terms-type-id"}},[t._v("#")]),t._v(" GET: Terms type id")]),t._v(" "),a("h3",{attrs:{id:"api-json-v1-terms-id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-terms-id"}},[t._v("#")]),t._v(" /api/json/v1/terms/:id")]),t._v(" "),a("p",[a("strong",[t._v("(1) fields available")]),t._v(": 'id', 'name', 'slug', 'description', 'type', 'term_meta', 'count'")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Status")]),t._v(" "),a("p",[a("strong",[t._v("200")])])]),t._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X GET http://localhost:3000/api/json/v1/terms/0\n")])])])])],1)],1),t._v(" "),a("Block",[a("h2",{attrs:{id:"post-create-terms"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#post-create-terms"}},[t._v("#")]),t._v(" POST: Create terms")]),t._v(" "),a("h3",{attrs:{id:"api-json-v1-terms-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-terms-2"}},[t._v("#")]),t._v(" /api/json/v1/terms")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("params")]),t._v(" "),a("th",[t._v("type")]),t._v(" "),a("th",[t._v("description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("name")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v("name of terms")])]),t._v(" "),a("tr",[a("td",[t._v("description")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v("Description")])]),t._v(" "),a("tr",[a("td",[t._v("term_meta")]),t._v(" "),a("td",[t._v("Array - Map")]),t._v(" "),a("td",[t._v("List meta term")])])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Status")]),t._v(" "),a("p",[t._v("if term create "),a("strong",[t._v("201")]),t._v(" else "),a("strong",[t._v("404")]),t._v(" or "),a("strong",[t._v("400")])])]),t._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X POST http://localhost:3000/api/json/v1/terms\n    --data "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n    "name": "my term",\n    "description": "my first terms",\n    "term_meta": [["twitter", "#epyo"]]\n    }\'')]),t._v("\n")])])])])],1)],1),t._v(" "),a("Block",[a("h2",{attrs:{id:"post-update-terms-by-id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#post-update-terms-by-id"}},[t._v("#")]),t._v(" POST: Update terms by id")]),t._v(" "),a("h3",{attrs:{id:"api-json-v1-terms-id-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-terms-id-2"}},[t._v("#")]),t._v(" /api/json/v1/terms/:id")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("params")]),t._v(" "),a("th",[t._v("type")]),t._v(" "),a("th",[t._v("description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("name")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v("name of terms")])]),t._v(" "),a("tr",[a("td",[t._v("description")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v("Description")])]),t._v(" "),a("tr",[a("td",[t._v("term_meta")]),t._v(" "),a("td",[t._v("Array - Map")]),t._v(" "),a("td",[t._v("List meta term")])])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Status")]),t._v(" "),a("p",[t._v("if term update "),a("strong",[t._v("200")]),t._v(" else "),a("strong",[t._v("404")]),t._v(" or "),a("strong",[t._v("400")])])]),t._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X POST http://localhost:3000/api/json/v1/terms/0\n    --data "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n    "name": "my term",\n    "description": "my first terms"\n    }\'')]),t._v("\n")])])])])],1)],1),t._v(" "),a("Block",[a("h2",{attrs:{id:"delete-delete-terms-by-id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#delete-delete-terms-by-id"}},[t._v("#")]),t._v(" DELETE: Delete terms by id")]),t._v(" "),a("h3",{attrs:{id:"api-json-v1-terms-id-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-terms-id-3"}},[t._v("#")]),t._v(" /api/json/v1/terms/:id")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Status")]),t._v(" "),a("p",[t._v("if term exist "),a("strong",[t._v("200")]),t._v(" else "),a("strong",[t._v("404")])])]),t._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X DELETE http://localhost:3000/api/json/v1/terms/0\n")])])])])],1)],1),t._v(" "),a("Block",[a("h2",{attrs:{id:"post-create-terms-by-new-type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#post-create-terms-by-new-type"}},[t._v("#")]),t._v(" POST: Create terms by new type")]),t._v(" "),a("h3",{attrs:{id:"api-json-v1-terms-type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-terms-type"}},[t._v("#")]),t._v(" /api/json/v1/terms/:type")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("params")]),t._v(" "),a("th",[t._v("type")]),t._v(" "),a("th",[t._v("description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("name")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v("name of terms")])]),t._v(" "),a("tr",[a("td",[t._v("description")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v("Description")])]),t._v(" "),a("tr",[a("td",[t._v("term_meta")]),t._v(" "),a("td",[t._v("Array - Map")]),t._v(" "),a("td",[t._v("List meta term")])])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Status")]),t._v(" "),a("p",[t._v("if term create "),a("strong",[t._v("201")]),t._v(" else "),a("strong",[t._v("404")]),t._v(" or "),a("strong",[t._v("400")])])]),t._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X POST http://localhost:3000/api/json/v1/terms/cellule\n    --data "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{\n    "name": "my term of cellule",\n    "description": "my second terms",\n    "term_meta": [["hashtag", "#epyo"]]\n    }\'')]),t._v("\n")])])])])],1)],1),t._v(" "),a("Block",[a("h2",{attrs:{id:"get-all-terms-by-new-type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-all-terms-by-new-type"}},[t._v("#")]),t._v(" GET: All terms by new type")]),t._v(" "),a("h3",{attrs:{id:"api-json-v1-terms-type-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-json-v1-terms-type-2"}},[t._v("#")]),t._v(" /api/json/v1/terms/:type")]),t._v(" "),a("h4",{attrs:{id:"filter-by-query-params-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#filter-by-query-params-2"}},[t._v("#")]),t._v(" Filter by query params")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("params")]),t._v(" "),a("th",[t._v("type")]),t._v(" "),a("th",[t._v("example")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("search")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v("no-ca")])]),t._v(" "),a("tr",[a("td",[t._v("limit")]),t._v(" "),a("td",[t._v("integer")]),t._v(" "),a("td",[t._v("default: 100")])]),t._v(" "),a("tr",[a("td",[t._v("offset")]),t._v(" "),a("td",[t._v("integer")]),t._v(" "),a("td",[t._v("default: 0")])]),t._v(" "),a("tr",[a("td",[t._v("orderby")]),t._v(" "),a("td",[t._v("field (1)")]),t._v(" "),a("td",[t._v("default: name")])]),t._v(" "),a("tr",[a("td",[t._v("order")]),t._v(" "),a("td",[t._v("asc or desc")]),t._v(" "),a("td",[t._v("default: desc")])]),t._v(" "),a("tr",[a("td",[t._v("name")]),t._v(" "),a("td",[t._v("where name == string")]),t._v(" "),a("td",[t._v("name=no-category")])]),t._v(" "),a("tr",[a("td",[t._v("slug")]),t._v(" "),a("td",[t._v("where slug == string")]),t._v(" "),a("td",[t._v("title=no-category")])])])]),t._v(" "),a("div",{staticClass:"language-tip example extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("ex: /api/json/v1/terms/cellule\n")])])]),a("p",[a("strong",[t._v("(1) fields available")]),t._v(": 'id', 'name', 'slug', 'description', 'type', 'term_meta', 'count'")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Status")]),t._v(" "),a("p",[a("strong",[t._v("200")])])]),t._v(" "),a("Example",[a("CURL",[a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -X GET http://localhost:3000/api/json/v1/terms/cellule\n")])])])])],1)],1)],1)}),[],!1,null,null,null);s.default=r.exports}}]);