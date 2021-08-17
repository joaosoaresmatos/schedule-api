# Schedule api

## Pull and run a MySQL Image on docker

```bash
docker run --name schedule-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql

docker run --name schedule-mysql -v C:\Users\joaos\Documents\schedule-mysql:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```

## Install and configure sequelize

```bash
npm install --save sequelize sequelize-cli
```

```bash
npx sequelize init
```

```bash
npx sequelize migration:create --name=create-base
```

```bash
npm install mysql2
```

```bash
npx sequelize db:migrate
```

```bash
npx sequelize db:migrate:undo:all
```

## Util Commands

Ctrl + R  to search on terminal
