# Book Store REST API

## How to set up

As a first step, clone the project:

```shell
git clone git@github.com:gissilali/book-store-api.git
```

Next, navigate into the directory and install npm packages

```shell
cd book-store-api && npm install
```

Next, to generate a jwt secret, you will need this for auth with passport-jwt

```
node generate-jwt-token
```

Next, paste ``DATABASE_URL="file:./dev.db"`` to the .env file this needed by prisma to be able to connect to your database

To create the database run, this will create all tables needed to run the application
```
npx prisma migrate dev --name init
```

Finally, run ``npm run dev`` to start the application in development mode

To test run ``npm run test``

### Assumption
- The test database should be different from the production database

# API Documentation

## End-point: Register User
### Method: POST
>```
>{{base_url}}/authors
>```
### Body (**raw**)

```json
{
    "name": "Kevin Vader",
    "email": "kevin@vader.com",
    "password": "password",
    "pseudonym": "darthy_bwoy"
}
```

### Response: 201
```json
{
    "id": 1,
    "name": "Kevin Vader",
    "email": "kevin@vader.com",
    "pseudonym": "darthy_bwoy"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login
### Method: POST
>```
>{{base_url}}/auth/login
>```
### Body (**raw**)

```json
{
  "email": "kevin@vader.com",
    "password": "password"
}
```

### Response: 200
```json
{
    "user": {
        "id": 1,
        "name": "Kevin Vader",
        "pseudonym": "darthy_bwoy",
        "email": "kevin@vader.com"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4MDcxODMzLCJleHAiOjE2ODgxNTgyMzN9.JUeWC5XjiC-y1dgmjBj0an4Ba8FJnizWaeFpwvp6NMs"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Book
### Method: POST
>```
>{{base_url}}/books
>```
### Body (**raw**)

```json
{
    "title": "Darth's Guide to the Force Pt. 2",
    "description": "It's the Oxford Dictionary",
    "coverImage": "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
    "price": 5.00
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4MDU0NzYzLCJleHAiOjE2ODgxNDExNjN9.BiRg5t9rF-WlAv8QzhYZhomMGSnbws9_Qxe0KaWL7Ds|string|


### Response: 201
```json
{
    "id": 1,
    "title": "Darth's Guide to the Force Pt. 2",
    "description": "It's the Oxford Dictionary",
    "authorId": 1,
    "price": "5",
    "coverImage": "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
    "publishedOn": null,
    "author": {
        "name": "Kevin Vader",
        "pseudonym": "darthy_bwoy",
        "id": 1
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Book
### Method: PATCH
>```
>{{base_url}}/books/1/publish
>```
### Body (**raw**)

```json
{
    "title": "To Kill a Mocking Bird",
    "description": "mocking birds mock people",
    "coverImage": "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
    "price": 10.00
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3OTkyMTM0LCJleHAiOjE2ODgwNzg1MzR9.kZhs-iDLwiTlbSQebH5gLP3hT9y-btF4iaMuQ6UDI8I|string|


### Response: 200
```json
{
    "id": 1,
    "title": "Darth's Guide to the Force Pt. 2",
    "description": "It's the Oxford Dictionary",
    "publishedOn": "2023-06-29T20:51:15.839Z",
    "coverImage": "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
    "price": "5",
    "authorId": 1,
    "deletedOn": null
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Books
### Method: GET
>```
>{{base_url}}/books?title=Fledg&authorId=1&minPrice=20
>```
### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|title|Fledg|
|authorId|1|
|minPrice|20|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4MDcxODMzLCJleHAiOjE2ODgxNTgyMzN9.JUeWC5XjiC-y1dgmjBj0an4Ba8FJnizWaeFpwvp6NMs|string|


### Response: 200
```json
[
    {
        "id": 1,
        "title": "Darth's Guide to the Force Pt. 2",
        "description": "It's the Oxford Dictionary",
        "publishedOn": "2023-06-29T20:51:15.839Z",
        "coverImage": "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
        "price": "5",
        "authorId": 1,
        "deletedOn": null,
        "author": {
            "name": "Kevin Vader",
            "pseudonym": "darthy_bwoy",
            "id": 1
        }
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Book
### Method: DELETE
>```
>{{base_url}}/books/1
>```
### Response: 204
```json
null
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Book
### Method: GET
>```
>{{base_url}}/books/1
>```
### Response: 200
```json
{
    "id": 2,
    "title": "Darth's Guide to the Force Pt. 2",
    "description": "It's the Oxford Dictionary",
    "publishedOn": null,
    "coverImage": "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
    "price": "5",
    "authorId": 1,
    "deletedOn": null,
    "author": {
        "name": "Kevin Vader",
        "pseudonym": "darthy_bwoy",
        "id": 1
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Publish Book By ID
### Method: PATCH
>```
>{{base_url}}/books/2/publish
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4MDU0NzYzLCJleHAiOjE2ODgxNDExNjN9.BiRg5t9rF-WlAv8QzhYZhomMGSnbws9_Qxe0KaWL7Ds|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Unpublish Book  By ID
### Method: PATCH
>```
>{{base_url}}/books/2/unpublish
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4MDU0NzYzLCJleHAiOjE2ODgxNDExNjN9.BiRg5t9rF-WlAv8QzhYZhomMGSnbws9_Qxe0KaWL7Ds|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)

