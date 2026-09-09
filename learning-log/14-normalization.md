Normalization means:

Store each piece of information in one appropriate place instead of repeating it.
Example: Suppose BrightBuild changes its name to BrightBuild Technologies.With a normalized database, you change it once:

Denormalization means hmain aik hi data mukhtlif jagha pr store krna prta ha

If you need to filter, sort, group, or enforce a value → use a real column.
If you mainly store and display the value, and its structure can vary → use JSONB.

1. A normalized screening_answers table makes it easy to query individual answers across applications and add indexes or constraints to them. JSONB makes it easier to store and retrieve all answers for one application together and allows flexible answer sets without another table.

2. Divergence between applicants and profile_snapshot is correct when an applicant updates their profile after applying; the application should preserve the old profile from the time of submission. It becomes a real bug if the snapshot is not created correctly or is later overwritten when the applicant changes their current profile, because then the application no longer represents the historical state at submission.