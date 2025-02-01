# Fans-n-Company Rest API

A blogging API backend that allows fans to read a company's published articles and comments between staff members.

## Features

- **Authentication:** Create an account, log in, and log out of websites.
- **Authorization:** Only logged-in staff have access to members-only routes.
- **CRUD:** All routes have complete Create, Read, Update, and Delete support.
- **Secured forms:** Forms' data are thoroughly sanitized and validated.

## Users and privileges

- **Fan:** Unauthenticated user (No privileges)
- **Staff:** Employed member (Read, compose, and personal content management privileges)
- **Admin:** An administrator (All privileges)

| Privilege                               | Fan | Staff | Admin |
| --------------------------------------- | --- | ----- | ----- |
| Create an account                       | No  | Yes   | Yes   |
| Create posts                            | No  | Yes   | Yes   |
| Access all posts (drafts and published) | No  | No    | Yes   |
| Update personal posts                   | No  | Yes   | Yes   |
| Update any post                         | No  | No    | Yes   |
| Delete personal posts                   | No  | Yes   | Yes   |
| Delete any post                         | No  | No    | Yes   |
| Delete accounts                         | No  | No    | Yes   |

## API Routes

### User

- `GET /users` Fetch all users' data.
- `GET /users/:id` Fetch a single user's data.
- `POST /users` Create a new user account.
- `PUT /users/:id` Update a single user's data.
- `DELETE /users/:id` Delete a single user's data.

### Post

- `GET /posts` Fetch all posts.
- `GET /posts/authors/:authorId` Fetch all posts by a single author.
- `GET /posts/:id` Fetch a single post.
- `POST /posts/authors/:authorId` Create a new post for a single author.
- `PUT /posts/:id` Update a single post.
- `DELETE /posts/:id` Delete a single post.

### Comment

- `GET /posts/:postId/comments` Fetch all comments in a single post.
- `POST /posts/:postId/comments/authors/:authorId` Create a new comment for a single author in a single post.
- `PUT /posts/:postId/comments/:id` Update a single comment in a single post.
- `DELETE /posts/:postId/comments/:id` Delete a single comment in a single post.

### Authentication

- `POST /auths` Create a new authentication token.

## Technologies used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Passport.js (local strategy)
- JSON Web Token
- Express Validator

## Usage

1. Clone the project

```bash
git clone https://github.com/oluwatobiss/api-powered-blog-backend.git
```

2. Navigate into the project repo

```bash
cd api-powered-blog-backend
```

3. Install dependencies

```bash
npm install
```

4. Create an environment variable file

```bash
touch .env
```

5. Define the project's environment variables

```
PORT=3000
ADMIN_CODE="example-pass"
JWT_SECRET="example_jwt_secret"
DATABASE_URL="postgresql://username:user_password@localhost:5432/api_powered_blog_backend"
```

6. Migrate the project's schema to your database

```bash
npx prisma migrate dev
```

7. Start the server

```bash
npm run start
```

## Related Repos

- [FansInSync](https://github.com/oluwatobiss/api-powered-blog-website)
- [StaffBlog](https://github.com/oluwatobiss/api-powered-blog-editor)
