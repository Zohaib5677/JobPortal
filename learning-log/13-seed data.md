Seed data means sample data that you put into your database so you can test your application with realistic information.

1.
The DELETE statements must run from child tables to parent tables: applications, jobs, recruiters, applicants, admins, companies, then users. This is because foreign keys prevent a parent row from being deleted while child rows still reference it.

2. Passwords are hashed so the seed data behaves like real user data and works with the same authentication logic. Storing 'password123' directly would not violate the database's text type, but it would not be a valid bcrypt password hash, so bcrypt.compare() would fail. It would also teach an unsafe pattern of storing plain-text passwords.