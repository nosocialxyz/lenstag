# API

## API template

Version：api/v0/

Return must have fields:
```json
{
    "code": 200,
    "message": "success"
    ... ...
    ... ...
}
```

## Trigger AI tags

Url: Post api/v0/lenstags/trigger

Request:
```json
{
    "handle" : "profile handle"
}
```

Return:
```json
{
    "status": "ongoing"
}
```

or

```json
{
    "status": "duplicated"
}
```

## Get AI tags

Url: Get api/v0/lenstags/tags

Request:
- handle : Profile handle

Return:

- ongoing

```json
{
    "unprocessed": 20, 
    "tags": [], 
    "picture": "" 
}
```
or

- update

```json
{
    "unprocessed": 20, 
    "tags": ["BTC", "price", "xxx"], // 3 tags
    "picture": "https://xxx" 
}
```
or

- finish

```json
{
    "unprocessed": 0, 
    "tags": ["BTC", "price"],
    "picture": "https://xxx" 
}
```

or

- not start / data does not meet calculation requirements

```json
{
    "unprocessed": 0, 
    "tags": [],
    "picture": "" 
}
```



