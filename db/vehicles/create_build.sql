INSERT INTO vehicles
(user_id, year, make, model, trim, date_created)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING *;