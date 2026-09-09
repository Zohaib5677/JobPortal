Why password max 72?
bcrypt has a 72-byte limit. So registration rejects passwords longer than 72 characters to avoid bcrypt silently cutting them.