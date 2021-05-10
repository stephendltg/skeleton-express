<Block>

# USERS

<a :href="$withBase('/postman/EPYO-VISIOM TABLE USERS.postman_collection.json')" alt="logo" download>Postman</a>

</Block>



<Block>

## GET: All Users

### /api/json/v1/users

::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/users
```
</CURL>
</Example>

</Block>


<Block>

## GET: Users by Id

### /api/json/v1/users/:id

::: tip Status
if user exist __200__ else __404__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/users/1
```
</CURL>
</Example>

</Block>


<Block>

## POST: Create user

### /api/json/v1/users

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| user_login             | string                     | login unique in database            |
| user_pass              | string                     | password                            |
| user_email             | string                     | email unique in database            |
| display_name           | string                     | Username                            |
| user_meta              | Array - Map                | List meta user                      |
| user_activation_key    | Integer                    | Level access                        |


::: tip Status
if user create __201__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/users \
    --header 'Content-Type: application/json' \
    --data '{
    "user_login": "David",
    "user_pass": "David4",
    "user_email": "test@epyo.eu"
    }'

```
</CURL>
</Example>

</Block>



<Block>

## POST: Update user

### /api/json/v1/users/:id

| params                 | type                       | description                         |
|----------------------- | -------------------------- | ----------------------------------- |
| user_login             | string                     | login unique in database            |
| user_pass              | string                     | password                            |
| user_email             | string                     | email unique in database            |
| display_name           | string                     | Username                            |
| user_meta              | Array - Map                | List meta user                      |
| user_activation_key    | Integer                    | Level access                        |

::: tip Status
if user update __200__ else __404__ or __400__
:::

<Example>
<CURL>
```bash
    curl -X POST http://localhost:3000/api/json/v1/users/1 \
    --header 'Content-Type: application/json' \
    --data '{
    "user_login": "epyo",
    "user_meta": [["facebook", 456]]
    }'

```
</CURL>
</Example>

</Block>


<Block>

## DELETE: Delete user

### /api/json/v1/users/:id

::: tip Status
if user exist __200__ else __404__
:::

<Example>
<CURL>
```bash
    curl -X DELETE http://localhost:3000/api/json/v1/users/2 

```
</CURL>
</Example>

</Block>
