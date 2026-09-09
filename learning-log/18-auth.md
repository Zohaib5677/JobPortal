Attacker ideally:
❌ Admin data access nahi kar sakta
❌ Dusri companies ke jobs/applications nahi dekh sakta
❌ Applicant accounts access nahi kar sakta
Isko blast radius limitation kehte hain.

Authentication identifies the user; authorization limits what that user can access.

             AUTH SECURITY
                  │
       ┌──────────┴──────────┐
       ↓                     ↓
 Authentication        Authorization
       │                     │
   Who are you?       What can you access?
       │                     │
   JWT / password      role + resource checks
       │                     │
       └──────────┬──────────┘
                  ↓
           Limit the damage
                  ↓
        Even if account is
             compromised