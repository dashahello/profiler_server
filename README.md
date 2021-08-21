# profiler_server

profiler_server is CRUD server application

## To create this application I was using

- Express
- Mongoose
- MongoDB
- Multer (Multer is used for handling multipart/form-data (for uploading files))
- Sharp (In this application Sharp is used for cropping images and converting them to JPG)

## Usage

## Routes

### Get all profiles

#### Request

`GET /profiles`

`curl -i -H 'Accept: application/json' http://localhost:5000/profiles`

#### Response (example)

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 504
ETag: W/"1f8-SJTO3jU5pKc3XcYkZXuEnh9+JVA"
Date: Sat, 21 Aug 2021 18:42:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"_id":"6121486be0d9ec81f3e54543","name":"Michael","surname":"Scott","email":"michael.scott@michael.scott","photo":"01bc8254-2d09-437d-b878-2c5b561086dc.jpg","__v":0},{"_id":"612148a3e0d9ec81f3e54545","name":"Dwight","surname":" Schrute","email":"dwight.schrute@dwight.schrute","photo":"ddd45b6e-39ea-46ab-83f5-80f31b0043bc.jpg","__v":0},{"_id":"612148e4e0d9ec81f3e54547","name":"Pam Beesly","surname":"Beesly","email":"pam.beesly@pam.beesly","photo":"749c79e2-5f96-4e22-92c3-baac2e1685fe.jpg","__v":0}]
```

### Get profile by id

#### Request

`GET /profiles/id`

`curl -i -H 'Accept: application/json' http://localhost:5000/profiles/6121486be0d9ec81f3e54543`

#### Response (example)

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 166
ETag: W/"a6-1p4abpT/L304XTRVcx7ylNJzqws"
Date: Sat, 21 Aug 2021 18:55:21 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"_id":"6121486be0d9ec81f3e54543","name":"Michael","surname":"Scott","email":"michael.scott@michael.scott","photo":"52jc8254-2d09-000d-b878-2c513b10123c.jpg","__v":0}
```

### Create new profile

#### Request

`POST /profiles`

`curl -i -H 'Accept: application/json' -d 'profiles?name=Jim&surname=Halpert&email=jim.halpert@jim.halpert&photo=photo.png' http://localhost:5000/profiles`

For creating a new profile you need to add a file with proper type (JPEG, JPG, PNG, WEBP)

#### Response (example)

```
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 166
ETag: W/"a6-1p4abpT/L304XTRVcx7ylNJbzmj"
Date: Sat, 21 Aug 2021 18:55:21 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"_id":"6121486be0d9ec81f3e54543","name":"Jim","surname":"Halpert","email":"jim.halpert@jim.halpert","photo":"82bc8476-2d09-437d-b878-12gd47b789o5.jpg","__v":0}
```

### Update profile

#### Request

`PATCH /profiles/id`

`curl -i -H 'Accept: application/json' -X PATCH -d 'name=Michael&surname=Scott&email=changed.email@email.com&photo=52jc8254-2d09-000d-b878-2c513b10123c.jpg' http://localhost:5000/profiles/6121486be0d9ec81f3e54543`

For updating a profile photo you need to add a file with proper type (JPEG, JPG, PNG, WEBP)

#### Response (example)

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 162
ETag: W/"a2-/127HrjaDYVxfkWXZgD56pyFUIE"
Date: Sat, 21 Aug 2021 19:37:15 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"_id":"6121486be0d9ec81f3e54543","name":"Michael","surname":"Scott","email":"changed.email@email.com","photo":"52jc8254-2d09-000d-b878-2c513b10123c.jpg","__v":0}
```

### Delete profile

#### Request

`DELETE /profiles/id`

`curl -i -H 'Accept: application/json' -X DELETE http://localhost:5000/profiles/612148e4e0d9ec81f3e54547`

#### Response (example)

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 75
ETag: W/"4b-UbuhecDvoTeTupsNHqHu+HBtdU4"
Date: Sat, 21 Aug 2021 19:43:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Post with _id 612148e4e0d9ec81f3e54547 was successfully deleted"}
```

## Requirements

profiler_server requires the following to run:

- Node.js (version 14.16.1 was used for developing)
- npm (normally comes with Node.js)
- MongoDB connection URL