SELECT v.vehicle_id, year, make, model, trim, username as author_username, date_created, link
FROM vehicles v
JOIN auto_builds_users abu ON abu.user_id = v.user_id
LEFT JOIN images i ON v.vehicle_id = i.vehicle_id
WHERE lower(make) LIKE $1 OR lower(model) LIKE $1 AND v.user_id != $2
ORDER BY date_created DESC;