<Block>

# OPTIONS

<a :href="$withBase('/postman/EPYO-VISIOM TABLE OPTIONS.postman_collection.json')" alt="logo" download>Postman</a>

</Block>



<Block>

## GET: All options list

### /api/json/v1/options

::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/options
```
</CURL>
</Example>

</Block>


<Block>

## GET: Options field

### /api/json/v1/options/:name

| params                 | type       | description                          |
|----------------------- | ---------- | ------------------------------------ |
| name                   | string     | option field name [a-z0-9\/_-]       |

::: tip Status
if options field exist __200__ else __404__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/options/lang
```
</CURL>
</Example>

</Block>

<Block>

## GET: Settings

### /api/json/v1/options/settings

::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/options/settings
```
</CURL>
</Example>

</Block>


<Block>

## POST: Update settings

### /api/json/v1/options/settings

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| name                   | string                     | option field name [a-z0-9\/_-]      |
| value                  | string/integer/boolean     | option value                        |

::: tip Status
if settings update __200__ else __404__ or __400__
:::

**format**: Map

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/options/settings \
    --header 'Content-Type: application/json' \
    --data '[
        ["lang", "fr"]
    ]'

```
</CURL>
</Example>

</Block>



<Block>

## POST: Create option field

### /api/json/v1/options

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| name                   | string                     | option field name [a-z0-9\/_-]      |
| value                  | string/integer/boolean     | option value                        |

::: tip Status
if user update __201__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/options \
    --header 'Content-Type: application/json' \
    --data '{
    "name": "myfirstoption",
    "value": "Hello world"
    }'

```
</CURL>
</Example>

</Block>


<Block>

## POST: Update options field

### /api/json/v1/options/:name

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| name                   | string                     | option field name [a-z0-9\/_-]      |
| value                  | string/integer/boolean     | option value                        |

::: tip Status
if options field update __200__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/options/myfirstoption \
    --header 'Content-Type: application/json' \
    --data '{
    "value": "Hello you!"
    }'

```
</CURL>
</Example>

</Block>



<Block>

## DELETE: Options field

### /api/json/v1/options/:name


| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| name                   | string                     | option field name [a-z0-9\/_-]      |

::: tip Status
if options field exists __200__ else __404__
:::

<Example>
<CURL>
```bash
    curl -X DELETE http://localhost:3000/api/json/v1/options/myfirstoption

```
</CURL>
</Example>

</Block>
