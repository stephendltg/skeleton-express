<Block>

# SESSIONS

<a :href="$withBase('/postman/EPYO-VISIOM TABLE SESSION.postman_collection.json')" alt="logo" download>Postman</a>

::: warning

**Description:**
Store in cache session unique by connection and user.
Retain: 24h
:::

</Block>



<Block>

## POST: Create cache session

### /api/json/v1/session

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| name                   | string                     | option field name [a-z0-9\/_-]      |
| value                  | string/integer/boolean     | option value                        |

::: tip Status
if session cache create __201__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/session \
    --header 'Content-Type: application/json' \
    --data '{
    "name": "lang",
    "value": "es"
    }'
```
</CURL>
</Example>

</Block>


<Block>

## GET: Cache session

### /api/json/v1/session

::: tip Status
if session cache exist __200__ else __404__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/session
```
</CURL>
</Example>

</Block>


<Block>

## DELETE: Cache session

### /api/json/v1/session

::: tip Status
if session cache exist __200__ else __404__
:::

<Example>
<CURL>
```bash
    curl -X DELETE http://localhost:3000/api/json/v1/session
```
</CURL>
</Example>

</Block>
