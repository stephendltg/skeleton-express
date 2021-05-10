<Block>

# ATTACHMENTS

<a :href="$withBase('/postman/EPYO-VISIOM ATTACHMENTS.postman_collection.json')" alt="logo" download>Postman</a>

</Block>

<Block>

## POST: Upload attachments

### /api/json/v1/attachments

::: tip Status
__201__
:::

<Example>

<input type="file" id="avatar" name="attachment" accept="image/png, image/jpeg" onchange="addFile(event)">

<div class="custom-block tip">
    <p id="console">Upload attachments</p>
</div>

<script>
window.addFile = function(){
    var formdata = new FormData();    
    formdata.append("attachment", event.target.files[0], "android-chrome-512x512.png");
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch('http://localhost:3000/api/json/v1/attachments', requestOptions)
    .then(response => document.getElementById('console').innerHTML = response.status )
}

window.addFile2 = function(){
    var formdata = new FormData();    
    formdata.append("attachment", event.target.files[0], "android-chrome-512x512.png");
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch('http://localhost:3000/api/json/v1/attachments/test', requestOptions)
    .then(response => document.getElementById('console2').innerHTML = response.status )
}
</script>

```html
<input type="file" id="avatar" name="attachment" accept="image/png, image/jpeg" onchange="addFile(event)">
```

```js
window.addFile = function(){
    var formdata = new FormData();    
    formdata.append("attachment", event.target.files[0], "android-chrome-512x512.png");
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch('http://localhost:3000/api/json/v1/attachments', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
```

</Example>

</Block>



<Block>

## GET: All attachments

### /api/json/v1/attachments

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
| groupby   | field (1)                          | default: post_date       |
| post_name | where post_name == string          | post_name=test           |
| post_status | where post_status == string      | post_status=publish      |
| author    | where author == autho Id           | author=1                 |
| title     | where title == string              | title=android            |
| post_mime_type  | where post_mime_type == string | post_mime_type=image/png  |

```tip example
ex: /api/json/v1/attachments?search=android&limit=5
```

**(1) fields available**: 'title', 'post_status', 'post_mime_type', 'post_date', 'post_modified', 'author', 'excerpt'


::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/attachments
```
</CURL>
</Example>

</Block>


<Block>

## POST: Upload attachments by category

### /api/json/v1/attachments/:category

| params                 | type       | description                          |
|----------------------- | ---------- | ------------------------------------ |
| category               | String     | Category name                        |

::: tip Status
__201__
:::

<Example>

<input type="file" id="avatar" name="attachment" accept="image/png, image/jpeg" onchange="addFile2(event)">

<div class="custom-block tip">
    <p id="console2">Upload attachments</p>
</div>


```html
<input type="file" id="avatar" name="attachment" accept="image/png, image/jpeg" onchange="addFile(event)">
```

```js
window.addFile = function(){
    var formdata = new FormData();    
    formdata.append("attachment", event.target.files[0], "android-chrome-512x512.png");
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch('http://localhost:3000/api/json/v1/attachments/test', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
```

</Example>

</Block>


<Block>

## GET: All attachments by category

### /api/json/v1/attachments/:category

| params                 | type       | description                          |
|----------------------- | ---------- | ------------------------------------ |
| category               | String     | Category name                        |

#### Filter by query params: idem Get All attachments


::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/attachments/test
```
</CURL>
</Example>

</Block>

<Block>

## GET: Attachment by Id

### /api/json/v1/attachments/:Id

| params                 | type       | description                          |
|----------------------- | ---------- | ------------------------------------ |
| Id                     | Integer    | Id attachment                        |

::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/attachments/1
```
</CURL>
</Example>

</Block>


<Block>

## POST: Update attachments

### /api/json/v1/attachments/:Id

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| Id                     | Integer                    | Id attachment                       |
| title                  | string                     | name attachment                     |
| meta                   | JSON Object                | meta data                           |
| excerpt                | string                     | Content of attachment               |

::: tip Status
if attachment update __200__ else __404__ or __400__
:::

**format**: Map

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/attachments/1 \
    --header 'Content-Type: application/json' \
    --data '{
        "meta": [
            ["artiste", "picasso"]
        ],
        "titles": "my_pictures",
        "excerpt": "my first pictures"
    }'

```
</CURL>
</Example>

</Block>


<Block>

## DELETE: Delete attachment

### /api/json/v1/attachments/:Id


| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| Id                     | integer                    | Id attachment                       |

::: tip Status
if options field exists __200__ else __404__
:::

<Example>
<CURL>
```bash
    curl -X DELETE http://localhost:3000/api/json/v1/attachments/1

```
</CURL>
</Example>

</Block>
