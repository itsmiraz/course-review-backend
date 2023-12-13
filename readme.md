This a express app with varius features based on the requirements
This Besically for course review app.

## Getting Started

To get you started you can simply clone the repository:

```
git clone https://github.com/itsmiraz/level2-assingment-2.git
```

and install the dependencies

```
npm install
```

### Prerequisites

You need git to clone the repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

A number of node.js tools is necessary to initialize and test the project. You must have node.js and its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json and include express, mongodb and mongoose.

## API Routes

### 1. GET /api/courses

- **Description:** Get a list of all courses.
-

### 2. POST /api/course

- **Description:** Create Course.
- **Request Body:**
  ```json
  {
    "title": "Sample Course",
    "instructor": "Jane Doe",
    "categoryId": "123456789012345678901234",
    "price": 49.99,
    "tags": [
      {
        "name": "Programming",
        "isDeleted": false
      },
      {
        "name": "Web Development",
        "isDeleted": false
      }
    ],
    "startDate": "2023-01-15",
    "endDate": "2023-03-14",
    "language": "English",
    "provider": "Tech Academy",
    "details": {
      "level": "Intermediate",
      "description": "Detailed description of the course"
    }
  }
  ```

### Run the Application

The project is preconfigured with a simple development web server. The simplest way to start this server is:

```
npm run build
```

```
npm run start:prod
```

## For Testing with Postman

#### Base URL

```
https://course-review-backend-two.vercel.app/api
```
