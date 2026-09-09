Validation = first line of defense and user-friendly errors.
Database constraints = final safety net and data integrity.

2.]
The database cannot provide the same user-friendly validation that the application can. A validation layer can check things such as field types, email format, string length, and business-related input rules before any database work happens. However, validation cannot protect against race conditions, direct database access, or application bugs that bypass the validation layer. Database constraints such as NOT NULL, CHECK, UNIQUE, and foreign keys provide the final guarantee that invalid data cannot be stored. Therefore, both validation and database constraints are necessary.