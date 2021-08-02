<Block>

# TERMS

</Block>


<Block>

## GET: All terms type post

### /api/json/v1/terms

#### Filter by query params

| params    | type                               | example                  |
| ------    | -----                              |------                    |
| search    | string                             | no-ca                    |
| limit     | integer                            | default: 100             |
| offset    | integer                            | default: 0               |
| orderby   | field (1)                          | default: name            |
| order     | asc or desc                        | default: desc            |
| name      | where name == string               | name=no-category         |
| slug      | where slug == string               | title=no-category        |

```tip example
ex: /api/json/v1/terms?search=no
```

**(1) fields available**: 'id', 'name', 'slug', 'description', 'type', 'term_meta', 'count'


::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/terms
```
</CURL>
</Example>

</Block>



<Block>

## GET: Terms type id

### /api/json/v1/terms/:id

**(1) fields available**: 'id', 'name', 'slug', 'description', 'type', 'term_meta', 'count'


::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/terms/0
```
</CURL>
</Example>

</Block>

<Block>

## POST: Create terms

### /api/json/v1/terms

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| name                   | string                     | name of terms                       |
| description            | string                     | Description                         |
| term_meta              | Array - Map                | List meta term                      |


::: tip Status
if term create __201__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/terms
    --data '{
    "name": "my term",
    "description": "my first terms",
    "term_meta": [["twitter", "#epyo"]]
    }'
```
</CURL>
</Example>

</Block>

<Block>

## POST: Update terms by id

### /api/json/v1/terms/:id

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| name                   | string                     | name of terms                       |
| description            | string                     | Description                         |
| term_meta              | Array - Map                | List meta term                      |


::: tip Status
if term update __200__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/terms/0
    --data '{
    "name": "my term",
    "description": "my first terms"
    }'
```
</CURL>
</Example>

</Block>


<Block>

## DELETE: Delete terms by id

### /api/json/v1/terms/:id


::: tip Status
if term exist __200__ else __404__
:::

<Example>
<CURL>
```bash
    curl -X DELETE http://localhost:3000/api/json/v1/terms/0
```
</CURL>
</Example>

</Block>


<Block>

## POST: Create terms by new type

### /api/json/v1/terms/:type

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| name                   | string                     | name of terms                       |
| description            | string                     | Description                         |
| term_meta              | Array - Map                | List meta term                      |


::: tip Status
if term create __201__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/terms/cellule
    --data '{
    "name": "my term of cellule",
    "description": "my second terms",
    "term_meta": [["hashtag", "#epyo"]]
    }'
```
</CURL>
</Example>

</Block>

<Block>

## GET: All terms by new type

### /api/json/v1/terms/:type

#### Filter by query params

| params    | type                               | example                  |
| ------    | -----                              |------                    |
| search    | string                             | no-ca                    |
| limit     | integer                            | default: 100             |
| offset    | integer                            | default: 0               |
| orderby   | field (1)                          | default: name            |
| order     | asc or desc                        | default: desc            |
| name      | where name == string               | name=no-category         |
| slug      | where slug == string               | title=no-category        |

```tip example
ex: /api/json/v1/terms/cellule
```

**(1) fields available**: 'id', 'name', 'slug', 'description', 'type', 'term_meta', 'count'


::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/terms/cellule
```
</CURL>
</Example>

</Block>