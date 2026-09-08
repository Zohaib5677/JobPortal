# Chapter 10 — Model Applications

## Applications table

The `applications` table represents an applicant applying for a specific job. One application belongs to exactly one job and one applicant.

```sql
CREATE TABLE applications (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id           uuid NOT NULL REFERENCES jobs(id),
  applicant_id     uuid NOT NULL REFERENCES applicants(id),
  stage            text NOT NULL DEFAULT 'applied'
                   CHECK (stage IN (
                     'applied',
                     'screening',
                     'interview',
                     'assessment',
                     'offer',
                     'hired',
                     'rejected'
                   )),
  screening_answers jsonb NOT NULL DEFAULT '{}',
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),

  UNIQUE (job_id, applicant_id)
);
```

## Foreign keys

* `job_id → jobs.id`: An application is for one specific job, so this connects the application to the job being applied for.
* `applicant_id → applicants.id`: This identifies which applicant submitted the application.

## Why `UNIQUE (job_id, applicant_id)`?

An applicant should only be able to apply **once to the same job**.

For example:

```text
Applicant A → Backend Developer ✅
Applicant A → Backend Developer again ❌
Applicant A → Frontend Developer ✅
```

The combination of `job_id` and `applicant_id` must therefore be unique.

The applicant can apply to different jobs, but cannot create duplicate applications for the same job.

## Screening answers

Screening answers are stored as JSONB because they are always loaded together with the application and do not need to be queried independently.

The answer object uses the question UUID as the key. The question itself is defined in the job's `screening_questions` JSONB.

Example:

```json
{
  "q1-uuid": "3 years",
  "q2-uuid": true,
  "q3-uuid": 5
}
```



## Application pipeline stages

The seven stages are ordered as follows:

```text
applied
   ↓
screening
   ↓
interview
   ↓
assessment
   ↓
offer
   ↓
hired
```

`rejected` is the rejection outcome and can occur when an applicant is no longer being considered.

The seven stage values are:

1. `applied` — applicant has submitted the application.
2. `screening` — application is being reviewed/screened.
3. `interview` — applicant has reached the interview stage.
4. `assessment` — applicant is completing an assessment.
5. `offer` — company is preparing or has made an offer.
6. `hired` — applicant was successfully hired.
7. `rejected` — applicant is no longer being considered.

The `CHECK` constraint ensures that only these seven values can be stored in the `stage` column.
