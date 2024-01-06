# Comfy Sloth - MERN Stack E-commerce App

Comfy Sloth is a full-stack e-commerce application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The application consists of two main components: the front-end app and the back-end server.

## Project Structure
The project is organized into two main folders:

* app: React application built with Vite.
* server: Node.js Express server implementing a REST API with MongoDB for data storage.

## Setup Instructions
Follow these steps to clone, set up, and run the Comfy Sloth application:

1. #### Clone the Repository:


```
git clone https://github.com/manu0231/ComfyStore.git
cd ComfyStore
```
2. #### Install Dependencies:

```
cd app
npm install


cd ../server
npm install
```
3. #### Set Up Environment Variables:

* Create a `.env` file in the server folder.
* Add the following environment variables:
    *  `STRIPE_PUBLIC_KEY`: Your Stripe public key.
    * `STRIPE_SECRET_KEY`: Your Stripe secret key.
    * `MONGO_URI`: Your MongoDB connection URI.
    * `JWT_SECRET_KEY`: Your JWT secret key for authentication.

4. #### Run the Front-end:

```
cd app
npm run vite
```

5. #### Run Cypress Tests:

```
cd app
npx cypress open
```
6. #### Build the Front-end:

```
cd app
npm run build
```
7. #### Run the Server:
```
cd server
npm start
```

##   Deployment 
The application is deployed on the following platforms:

* Frontend Deployment: [Comfy Sloth Frontend](https://comfyslothupgrad.netlify.app) 

* Backend Deployment: [Comfy Sloth Backend](https://storeserver-production-bc7e.up.railway.app)

## Notes
* Ensure you have a Stripe account and obtain the necessary public and secret keys.
* Provide the required MongoDB connection URI.
* Secure your application with a JWT secret key.
* Front-end can be built using `npm run build` in the app folder.
* The server can be started with `npm start` in the server folder.

Feel free to explore and enjoy the Comfy Sloth application!




![Screenshot 2024-01-06 at 14-03-53 Comfy Sloth](https://github.com/manu0231/ComfySloth/assets/53123585/d7ad8610-15d5-463e-a0ce-f17f12fa293a)




