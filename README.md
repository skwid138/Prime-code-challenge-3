# Code Challenge - Week 4 (SQL Databases)

## Database Setup

Create table in your "rho" database (or whatever database you like to use).

```SQL
CREATE TABLE treats (
	id SERIAL PRIMARY KEY,
	name varchar(255),
	description text,
	pic varchar(255)
);
```

## Overview

Your front-end developer has created all of the client-side code
necessary to view, add, update, and delete treats from the treats
database. In fact, said developer even stubbed out most of your
server-side code, as well!

Unfortunately, they have no idea how to create the required routes
and SQL queries to get data from the database onto the page:

* `GET /treats` returns a list of potential treats (e.g. cupcakes, goldfish, etc) and their image URLs
* `GET /treats?q=donut` should return only treats that match the query parameter
* `POST /treats` expects a treat description and link to a url image
* `PUT /treats/:id` updates the treat description
* `DELETE /treats/:id` deletes a treat
