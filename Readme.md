### Setting Up NodeJS and MySQL

- **Location Directory**

```code
     pwd
```

- **Creating a package JSON**

```code
    npm init -y
```

- **Setting Up MySQL (Database) and Dotenv (Protecteion)**

```code
     npm i express mysql dotenv ejs
```

- **Setting Up Nodemon (Auto Restart Server on changes)**

```code
     npm i --save nodemon
```

- **Setting Up Nodemon (Auto Restart Server on changes)**

```code
     npm start
```

- **Setting Up Token and Cookie**

```code
     npm i cookie-parser body-parser jsonwebtoken
```
- **Database Schema Codes**

```code
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  task_name VARCHAR(255) NOT NULL,
  task_description VARCHAR(255) NOT NULL,
  task_priority VARCHAR(20) NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
