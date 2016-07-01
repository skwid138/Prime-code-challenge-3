# Code Challenge - Week 4 (SQL Databases)

Provide students with HTML, JavaScript and a database. JavaScript will include AJAX calls to a CRUD-capable server (students will create server code).

* `GET /treats` returns a list of potential treats (e.g. cupcakes, goldfish, etc) and their image URLs
* `GET /treats?q=donut` should return only treats that match the query parameter
* `POST /treats` expects a treat description and link to a url image
* `PUT /treats/:id` updates the treat description
* `DELETE /treats/:id` deletes a treat
