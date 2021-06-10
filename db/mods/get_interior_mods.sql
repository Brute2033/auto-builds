SELECT v.vehicle_id, m.mod_id, year, make, model, trim, description, type
FROM vehicles v
JOIN mods m ON m.vehicle_id = v.vehicle_id
WHERE type = 'Interior'
AND v.vehicle_id = $1;