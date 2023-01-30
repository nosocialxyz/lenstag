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
    "handle": "",
    "picture": "",
    "unprocessed": 20, 
    "tags": [], 
    "aipicture": "" 
}
```
or

- update

```json
{
    "handle": "",
    "picture": "",
    "unprocessed": 20, 
    "tags": ["BTC", "price", "xxx"], // 3 tags
    "aipicture": "https://xxx" 
}
```
or

- finish

```json
{
    "handle": "",
    "picture": "",
    "unprocessed": 0, 
    "tags": ["BTC", "price"],
    "aipicture": "https://xxx" 
}
```

or

- not start / data does not meet calculation requirements

```json
{
    "handle": "",
    "picture": "",
    "unprocessed": 0, 
    "tags": [],
    "aipicture": "" 
}
```



