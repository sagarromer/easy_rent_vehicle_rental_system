# easy_rent_vehicle_rental_system
![easy_rent_vehicle_rental_system](/public/images/home_page.PNG)
![easy_rent_vehicle_rental_system](/public/images/login.PNG)
![easy_rent_vehicle_rental_system](/public/images/update_profile.png)
![easy_rent_vehicle_rental_system](/public/images/vehicle_details.PNG)
![easy_rent_vehicle_rental_system](/public/images/my_bookings.PNG)
![easy_rent_vehicle_rental_system](/public/images/update_profile.PNG)
![easy_rent_vehicle_rental_system](/public/images/admin_users.png)
![easy_rent_vehicle_rental_system](/public/images/admin_reviews.png)

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
- 
#Project details

## System Summary
- This application presents a data management system for a vehicle rental company. This enables the 
administrator to keep track of all the customers information. This system increases customer 
retention and simplify vehicle and customers management in efficient way. The car rental
management system has a very user-friendly interface. Thus, the users will feel very easy
to work on it. By using this system admin can manage their rental, bookings, customer issues
and vehicle issues etc. The car rental information can be added to the system, or existing
information can be edited or deleted by the administrator. The transaction reports of the car
rental system can be retrieved by the administrator, when its required. Thus, there is no delay in
the availability of any car information, when ever needed the car rental information can be
captured very quickly and easily.
- My car rental management system is a web-based system for an organization that rents out cars. 
This system empowers the organization to make their services accessible to the public through the 
web and furthermore keep records about their services.

##Statement of the Problem
-The manual car rental system provides services only during office hours. So, customers have
limited time to make any transactions or reservation of the cars. The problem with some of the 
current system is that some small companies already have a car rental system which is not a web based 
application. This is a limitation that gives them capability to store customer’s details, but at the same 
time they cannot make their services more available to the public through the internet, 
they rather make use of posters to advertise their services to the public. They also make use of 
phone call reservations which is also limited to few features as compare to a web base system. For 
example, a customer might make a phone call reservation for a particular car, but when he/she 
comes to pick the car, he/she might turn not to like the car, this could be because the customer 
could not see a sample picture of the car he/she wants to rent. Below are some problems with 
running car rental company manually,
* To rent a car, a prospective renter must first go to the nearest office to register as a client,
what of if the customer doesn’t have enough time to do that?
* Cars that provide difficulties to rent out are normally advertised in local or national
newspaper. It involves a lot of paper work and consumes time.
* The process of managing customer’s data is slow if the company is using manual system
and there might be thousands of clients.
* It is very hard to keep record of all rental cars and so on

##Aim and Objectives
From the above-mentioned problems, the aim is to develop a computer-based information system 
that will help to address the ongoing issues from the manual information system and help to 
facilitate some tasks that seems to be difficult for both the car rental company’s staff and those 
who are renting the cars (customers). The main objective is to design and implement a car rental 
management system for an organization. Specific objectives are:
* To develop a simple and secure system that protects client information and confidential 
information of the organization
* To design a user-friendly system that enables client check for availability of vehicle and 
book or reserve a vehicle online.
* To design a system that enables clients pay their car rent online
* To develop a system that stores bookings and reservations information as well as payment 
history to help the organization keep track of transactions.
* To implement geofencing and remote car deactivation upon expiration of rental period.







