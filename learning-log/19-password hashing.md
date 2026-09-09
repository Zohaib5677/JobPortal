| Algorithm | Speed             | Good for passwords? | Why?                                  |
| --------- | ----------------- | ------------------- | ------------------------------------- |
| MD5       | Extremely fast    | ❌ No                | Attackers can try billions of guesses |
| SHA-256   | Extremely fast    | ❌ No                | Still designed to be fast             |
| bcrypt    | Deliberately slow | ✅ Yes               | Makes every password guess expensive  |

1.
No, verifyPassword will not break. bcrypt.compare() reads the cost (12) from the old hash and verifies it correctly, even though new passwords use cost 13.
Example: Old user → cost 12 hash → login works; new user → cost 13 hash → login works.
2.
Two hashPassword() calls at the same time are not a problem; each password is hashed independently with its own salt.
The real problem would be duplicate data, e.g. two users registering with the same email. Check this with a unique email constraint in the database, not by relying only on simultaneous request checks.