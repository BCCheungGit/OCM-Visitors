# OCM-Visitors
OCM Visitors is a simple web application that allows you to track visitors to OCM church. This project was originally built using Supabase, a Firebase alternative that is open-source and self-hosted, however now it is built using Prisma and Postgres. 

An Owncloud API is used to store images of the visitors. It was built from scratch using Typescript since only a Python API wrapper currently exists. In the future I may make a more complete wrapper for the API in Typescript.


## Deployment
The project is currently deployed on vercel: 
[Here](https://ocm-visitors-supabase.vercel.app/)

## Usage
Users can enter in a phone number to sign up/sign in, which will allow them to authenticate with Twilio Verify OTP. Then they can take a picture of themselves using the camera on their device. The image is then uploaded to the Owncloud server and a public share link is generated which is stored in the database. The image can be printed as an ID badge and used to scan in with a QR code scanner.

## Final Product Plan
- Active Users: about 60 per week -> about 3120 per year
- Active Devices: 1-2 Laptops/Tablets
- Active Sessions: 1-2 per device
- Data Storage: 3-4 GB per year
- Data Transfer: 3-4 GB per year
- Data Retention: 1 Week (Temporary)

## Tech Stack
- Prisma
- Postgres 
- Twilio
- Next.js/React
- ShadCN UI


## Todo
- [x] Create Prisma schema
- [x] Create Next.js frontend  
- [x] Create Twilio Integration
- [x] Complete sign up process
- [x] Light/Dark mode
- [x] Implement language toggling with react-i18next (en, 中文) 
    - [x] Landing page
    - [x] Admin dashboard
    - [x] Navbar
    - [x] Sign in / Sign up pages
- [x] Owncloud api support
    - [x] Create a new folder
    - [x] Upload images to folder
    - [x] Get images from folder
    - [x] Public share link
    - [x] Change to support OwnCloud rather than PostgresDB for images
- [x] Create a QR code for the image
- [x] fix twilio verification error
- [x] default US country code for phone number input (show flag)
- [ ] expand admin dashbaord to allow admins to manually create a QR code with print function with picture  (no phone number, email optional)
## Future Features
- [ ] Expand to use the full database and allow general members to also use the app to sign in
