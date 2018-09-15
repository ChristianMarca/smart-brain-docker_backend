BEGIN TRANSACTION;

INSERT into users (name, email, entries,joined) values ('test','test@email.com',2,'2018-09-13 21:10:57.759 UTC');
INSERT into login (hash, email) values ('$2b$10$ArwRrUmp5zoVdm9BI/sYwugIrMc0WVny6TMtFce5.50aMbh2U9OZ6','test@email.com');

COMMIT;