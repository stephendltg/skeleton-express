<Block>

# POSTS

</Block>


<Block>

## GET: All Post type post

### /api/json/v1/post

#### Filter by query params

| params    | type                               | example                  |
| ------    | -----                              |------                    |
| search    | string                             | android                  |
| from      | date format: yyyy-mm-d HH:MM:ss    | 2020-06-10               |
| to        | date format: yyyy-mm-d HH:MM:ss    | 2030-06-10 15:36:12      |
| limit     | integer                            | default: 100             |
| offset    | integer                            | default: 0               |
| orderby   | field (1)                          | default: post_modified   |
| order     | asc or desc                        | default: desc            |
| post_name | where post_name == string          | post_name=test           |
| post_status | where post_status == string      | post_status=publish      |
| author    | where author == autho Id           | author=1                 |
| title     | where title == string              | title=android            |

```tip example
ex: /api/json/v1/post?search=my
```

**(1) fields available**: 'id', 'title', 'post_status', 'post_mime_type', 'post_date', 'post_modified', 'author', 'excerpt', 'terms_id', 'terms', 'count'


::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/post
```
</CURL>
</Example>

</Block>



<Block>

## GET: Post type id

### /api/json/v1/post/:id

**(1) fields available**: 'id', 'title', 'post_status', 'post_mime_type', 'post_date', 'post_modified', 'author', 'excerpt', 'terms_id', 'terms', 'count'


::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/post/0
```
</CURL>
</Example>

</Block>

<Block>

## POST: Create post

### /api/json/v1/terms

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| title                  | string                     | name of terms                       |
| post_name              | string                     | name of post                        |
| author                 | Author ID                  | Id of author                        |
| excerpt                | string                     | Description                         |
| meta                   | Array - Map                | List meta                           |
| terms                  | Array                      | List terms                          |


::: tip Status
if post create __201__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/post
    --data '{
    "title": "my posts",
    "excerpt": "my first terms",
    "meta": [["twitter", "#epyo"]],
    "terms": [0,10]
    }'
```
</CURL>
</Example>

</Block>

<Block>

## POST: Update post by id

### /api/json/v1/post/:id

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| title                  | string                     | name of terms                       |
| post_name              | string                     | name of post                        |
| author                 | Author ID                  | Id of author                        |
| excerpt                | string                     | Description                         |
| meta                   | Array - Map                | List meta                           |
| terms                  | Array                      | List terms                          |


::: tip Status
if post update __200__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/post/0
    --data '{
    "title": "my post again",
    "terms: [0,11]
    }'
```
</CURL>
</Example>

</Block>


<Block>

## DELETE: Delete post by id

### /api/json/v1/post/:id


::: tip Status
if term exist __200__ else __404__
:::

<Example>
<CURL>
```bash
    curl -X DELETE http://localhost:3000/api/json/v1/post/0
```
</CURL>
</Example>

</Block>


<Block>

## POST: Create post by new type

### /api/json/v1/psot/:type

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| title                  | string                     | name of terms                       |
| post_name              | string                     | name of post                        |
| author                 | Author ID                  | Id of author                        |
| excerpt                | string                     | Description                         |
| meta                   | Array - Map                | List meta                           |
| terms                  | Array                      | List terms                          |


::: tip Status
if post create __201__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/post/newtype
    --data '{
    "title": "my term of cellule",
    "excerpt": "my second terms",
    "meta": [["hashtag", "#epyo"]]
    }'
```
</CURL>
</Example>

</Block>

<Block>

## GET: All post by new type

### /api/json/v1/post/:type

#### Filter by query params

| params    | type                               | example                  |
| ------    | -----                              |------                    |
| search    | string                             | android                  |
| from      | date format: yyyy-mm-d HH:MM:ss    | 2020-06-10               |
| to        | date format: yyyy-mm-d HH:MM:ss    | 2030-06-10 15:36:12      |
| limit     | integer                            | default: 100             |
| offset    | integer                            | default: 0               |
| orderby   | field (1)                          | default: post_modified   |
| order     | asc or desc                        | default: desc            |
| post_name | where post_name == string          | post_name=test           |
| post_status | where post_status == string      | post_status=publish      |
| author    | where author == autho Id           | author=1                 |
| title     | where title == string              | title=android            |

```tip example
ex: /api/json/v1/post/newtype
```

**(1) fields available**: 'id', 'title', 'post_status', 'post_mime_type', 'post_date', 'post_modified', 'author', 'excerpt', 'terms_id', 'terms', 'count'


::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/post/newtype
```
</CURL>
</Example>

</Block>