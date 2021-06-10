INSERT INTO images
(vehicle_id, link)
VALUES
($1, $2)
RETURNING *;