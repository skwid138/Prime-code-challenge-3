# Checkpoint/Code Challenge 3 (Express/SQL)

## Overview

Your front-end developer has created all of the client-side code
necessary to view, add, update, and delete treats from the treats
database. In fact, said developer even stubbed out most of your
server-side code, as well!

A server-side developer has started creating the routes needed
to make this application work. They have implemented

* `GET /treats` returns a list of potential treats (e.g. cupcakes, goldfish, etc) and their image URLs

## Database Setup

Create table in your "omega" database (or whatever database you want to use).

```SQL
CREATE TABLE treats (
	id SERIAL PRIMARY KEY,
	name varchar(255),
	description text,
	pic varchar(255)
);
```
Insert some starter data:

```SQL
INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');
```

## TODO

### Baseline
Before we can launch, we at least need to be able to add new treats.

- [ ] `POST /treats` expects a treat name, description and link to a url image

### Special Sauce
Our client will be ecstatic if we can also deliver the ability to update and
delete, but consider these "nice-to-haves".

- [ ] `PUT /treats/:id` updates the treat description
- [ ] `DELETE /treats/:id` deletes a treat

### Eye of the Tiger
**If you're feeling fancy and have some time to spare**, try this one

- [ ] `GET /treats?q=donut` should return only treats that match the query parameter
