INSERT INTO mods
(vehicle_id, description, type)
VALUES
($1, $2, $3)
RETURNING *;