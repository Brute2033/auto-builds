SELECT v.vehicle_id, link
FROM vehicles v
JOIN images i ON i.vehicle_id = v.vehicle_id
WHERE v.vehicle_id = $1;