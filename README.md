# Todo App



## Features

CRUD 


## Technologies Used

- Frontend: React.js with Vite

- Backend: Node.js with Express.js

- Database: PostgreSQL

- ORM : Prisma



# Getting Started

## Prequisites

- Node.js and npm/yarn installed

- PostgreSQL database setup

- Prisma Migrations

## Installation
- Clone the Repository:

```bash
git clone https://github.com/dowmar/todoapp-assignment
cd todoapp-assignment
```
- Install Dependencies:
  
```bash
# For frontend
cd todoapp-assignment
npm install 

# For backend
cd server
npm install
```

- Prisma migration:

```bash
npx prisma init
```
- Open the prisma/schema.prisma file and define the models according to your database structure:
```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Activity {
  id          Int      @id @default(autoincrement())
  personEmail String
  title       String
  createdAt   DateTime @default(now())
  tasks       Task[]
}

model Task {
  id         Int           @id @default(autoincrement())
  activityId Int
  title      String
  priority   TaskPriority
  isActive   Boolean        @default(false)
  createdAt  DateTime       @default(now())
  activity   Activity       @relation(fields: [activityId], references: [id], onDelete: Cascade)
}

enum TaskPriority {
  very_high
  high
  medium
  low
  very_low
}
```

- Set Up Environment Variables:
Create a .env file in the server directory with the following content:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

- Migrate The Database
```bash
npx prisma migrate dev --name init
```

- Generate Prisma Client
```bash
npx prisma generate
```

- Run the Application
```bash
# In the login-incit directory
npm run dev

# In the backend directory
npm start
node app.js
```


## Folder Structure
- Frontend (/): Contains all React.js frontend code.
- Backend (server/): Contains the Express.js API and database interaction logic.


## License

[MIT](https://choosealicense.com/licenses/mit/)
