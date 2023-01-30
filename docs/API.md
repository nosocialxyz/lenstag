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
    "aiPicture": "" 
}
```
or

- update

```json
{
    "handle": "",
    "picture": "",
    "unprocessed": 20, 
    "tags": ["BTC", "price", "xxx"],
    "aiPicture": "https://xxx" 
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
    "aiPicture": "https://xxx" 
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
    "aiPicture": "" 
}
```



