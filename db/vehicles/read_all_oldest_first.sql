SELECT v.vehicle_id, year, make, model, trim, username as author_username, date_created, link
FROM vehicles v
JOIN auto_builds_users abu ON abu.user_id = v.user_id
LEFT JOIN images i ON v.vehicle_id = i.vehicle_id
ORDER BY date_created asc;