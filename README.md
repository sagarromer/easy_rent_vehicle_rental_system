# easy_rent_vehicle_rental_system
![easy_rent_vehicle_rental_system](/public/images/home_page.png)

## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:sagarromer/easy_rent_vehicle_rental_system.git
$ cd easy_rent_vehicle_rental_system
```

### 2. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb://localhost/amazona  
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb+srv://your-db-connection

### 3. Run Project

```
$ npm install
$ npm start
```

### 5. Seed Users and Vehicles

- Run this on chrome: http://localhost:5000/api/users/seed
- It returns admin email and password
- Run this on chrome: http://localhost:5000/api/products/seed
- It creates 6 sample vehicles

### 6. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin


