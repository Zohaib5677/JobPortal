You should document the five tables:

users
companies
recruiters
applicants
admins

Recruiters
recruiters.user_id → users.id
Why?
Because a recruiter is a user, and this connects the recruiter's
profile to the account used for authentication.

recruiters.company_id → companies.id
Why?
Because a recruiter belongs to a company, and multiple recruiters
can belong to the same company.

# Account Database Model

## 1. users

The `users` table is the central authentication table. It stores information common to every account.

### Columns

| Column          | Type        | Rules                                  |
| --------------- | ----------- | -------------------------------------- |
| `id`            | uuid        | Primary key                            |
| `email`         | text        | Required and unique                    |
| `password_hash` | text        | Required                               |
| `role`          | text        | `recruiter`, `applicant`, or `admin`   |
| `status`        | text        | `active`, `unverified`, or `suspended` |
| `created_at`    | timestamptz | Defaults to current time               |

### Foreign Keys

`users` does not have a foreign key because it is the main authentication table that other tables reference.

---

## 2. companies

The `companies` table represents companies independently from recruiters.

### Columns

| Column       | Type        | Rules                    |
| ------------ | ----------- | ------------------------ |
| `id`         | uuid        | Primary key              |
| `name`       | text        | Required                 |
| `slug`       | text        | Required and unique      |
| `website`    | text        | Optional                 |
| `verified`   | boolean     | Defaults to `false`      |
| `suspended`  | boolean     | Defaults to `false`      |
| `created_at` | timestamptz | Defaults to current time |

### Foreign Keys

`companies` does not have a foreign key in this chapter because it is an independent entity. Recruiters reference the company they belong to.

---

## 3. recruiters

The `recruiters` table stores information specific to recruiter accounts.

### Columns

| Column         | Type        | Rules                                                   |
| -------------- | ----------- | ------------------------------------------------------- |
| `id`           | uuid        | Primary key                                             |
| `user_id`      | uuid        | Required and unique                                     |
| `company_id`   | uuid        | Required                                                |
| `company_role` | text        | `owner`, `hr_manager`, `recruiter`, or `hiring_manager` |
| `created_at`   | timestamptz | Defaults to current time                                |

### Foreign Keys

* `user_id → users.id`: A recruiter is a user, so this connects the recruiter profile to the user's authentication account.
* `company_id → companies.id`: A recruiter belongs to a company, so this connects the recruiter to their company.

`user_id` uses `ON DELETE CASCADE`, so deleting a user also deletes their recruiter profile.

---

## 4. applicants

The `applicants` table stores information specific to applicants.

### Columns

| Column       | Type        | Rules                    |
| ------------ | ----------- | ------------------------ |
| `id`         | uuid        | Primary key              |
| `user_id`    | uuid        | Required and unique      |
| `full_name`  | text        | Required                 |
| `headline`   | text        | Optional                 |
| `location`   | text        | Optional                 |
| `attributes` | jsonb       | Defaults to `{}`         |
| `created_at` | timestamptz | Defaults to current time |

### Foreign Keys

* `user_id → users.id`: An applicant is a user, so this connects the applicant's profile to their authentication account.

`user_id` uses `ON DELETE CASCADE`, so deleting a user also deletes their applicant profile.

---

## 5. admins

The `admins` table stores information specific to platform administrators.

### Columns

| Column       | Type        | Rules                    |
| ------------ | ----------- | ------------------------ |
| `id`         | uuid        | Primary key              |
| `user_id`    | uuid        | Required and unique      |
| `created_at` | timestamptz | Defaults to current time |

### Foreign Keys

* `user_id → users.id`: An admin is a user, so this connects the admin profile to the user's authentication account.

`user_id` uses `ON DELETE CASCADE`, so deleting a user also deletes their admin profile.

---

## Relationship Summary

```text
users
  │
  ├── 0..1 recruiters ──────── companies
  │
  ├── 0..1 applicants
  │
  └── 0..1 admins
```

The `users` table is the authentication anchor, while the profile tables contain role-specific information. Companies are separate entities because multiple recruiters can belong to the same company.
