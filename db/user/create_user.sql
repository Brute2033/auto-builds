INSERT INTO auto_builds_users
(username, password)
VALUES
($1, $2)
RETURNING *;