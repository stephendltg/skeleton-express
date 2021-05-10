<Block>

# AUTH

</Block>



<Block>

## LOGIN

### /api/json/v1/auth

::: tip Status
if user connected __200__ else __401__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/auth \
    --header 'Authorization: Basic ZXB5bzplcHlv'
```
</CURL>
</Example>

</Block>


<Block>

## CHECK TOKEN

### /api/json/v1/auth/token

::: tip Status
if token check __200__ else __404__ or __401__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/auth/token \
    --header 'Authorization: Bearer $2b$10$ItS6VvwdrGEUWz1sgeRi.esJyRtkRsfLSJqGDNirmzLuZFYqDNhDm'
```
</CURL>
</Example>

</Block>


<Block>

## LOGOUT

### /api/json/v1/auth/logout

::: tip Status
__200__
:::

<Example>
<CURL>
```bash
    curl -X GET http://localhost:3000/api/json/v1/auth/logout
```
</CURL>
</Example>

</Block>
