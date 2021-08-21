# ALPINEJS

ref: (alpinejs)[https://alpinejs.dev/]
ref: (Alpine toolbox)[https://www.alpinetoolbox.com/]

---

# MATERIAL DESIGN

ref: (material.css)[https://materializecss.com/]

---

# CSS

ref: (knacss)[https://www.knacss.com/doc.html#intro]

---


# EJS

## TAGS

- <% Balise 'Scriptlet', pour le flux de contrôle, pas de sortie
- <%_ Balise Scriptlet 'Whitespace Slurping', supprime tous les espaces blancs avant elle
- <%= Affiche la valeur dans le modèle (HTML échappé)
- <%- Sort la valeur non échappée dans le modèle
- <%# Balise de commentaire, pas d'exécution, pas de sortie
- <%% Renvoie un littéral '<%'
- %> Balise de fin simple
- -%> Balise en mode rognage ('newline slurp'), rogne la nouvelle ligne suivante
- _%> Balise de fin 'Whitespace Slurping', supprime tous les espaces après elle


## INCLUDES

```
<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}); %>
  <% }); %>
</ul>
```

## LAYOUTS

```
<%- include('header'); -%>
<h1>
  Title
</h1>
<p>
  My page
</p>
<%- include('footer'); -%>
```
