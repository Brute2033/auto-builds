SELECT v.vehicle_id, year, make, model, trim, description, type
FROM vehicles v
JOIN mods m ON m.vehicle_id = v.vehicle_id;