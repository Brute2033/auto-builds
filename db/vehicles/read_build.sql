SELECT year, make, model, trim, username AS author
FROM vehicles v
JOIN auto_builds_users abu ON abu.user_id = v.user_id
WHERE v.vehicle_id = $1;