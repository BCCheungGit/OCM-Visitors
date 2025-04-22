# OCM-Visitors
OCM Visitors is a simple web application that allows you to track visitors to OCM church. This project was originally built using Supabase, a Firebase alternative that is open-source and self-hosted, however now it is built using Prisma and Postgres. 

An Owncloud API is used to store images of the visitors. It was built from scratch using Typescript since only a Python API wrapper currently exists. In the future I may make a more complete wrapper for the API in Typescript.

## Features
- Add new visitors
- View all visitors
- Search for visitors
- Update visitor details

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
## Future Features
- [ ] Expand to use the full database and allow general members to also use the app to sign in
