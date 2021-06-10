DELETE FROM images
WHERE vehicle_id = $1;
DELETE FROM mods
WHERE vehicle_id = $1;
DELETE FROM vehicles
WHERE vehicle_id = $1;