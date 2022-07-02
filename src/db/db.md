# sql list
## users

### users table
```sql
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id varchar(255) UNIQUE NOT NULL,
  team_id INT NOT NULL
);
```

### users insert
```sql
INSERT INTO users (user_id, team_id)
VALUES  (user_id, team_id);
```

## channel

### channel table
```sql
CREATE TABLE channels (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  team_id INT UNIQUE NOT NULL,
  channel_id varchar(255) UNIQUE NOT NULL
);
```

### channel insert

```sql
INSERT INTO channels (team_id, channel_id)
VALUES  (team_id, channel_id);
```
