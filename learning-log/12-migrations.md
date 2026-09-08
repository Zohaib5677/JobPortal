migration simple schema bnane k lye hota ha,
migration->> ye ha k ye instruction deta ha database ko k kya banana ha
Schema -> actual structure ha

1.
applications has a foreign key pointing to jobs, so jobs cannot be dropped while applications still exists. Therefore, down migrations run in reverse order of up migrations.
2.
For the new salary_range column:
this is UP, up simple means Add
pgm.sql(`
  ALTER TABLE jobs
  ADD COLUMN salary_range jsonb;
`);
this is Down. Down simple means  delete 
pgm.sql(`
  ALTER TABLE jobs
  DROP COLUMN salary_range;
`);