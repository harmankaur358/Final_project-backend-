## Weather forecast API
# Project Overview

This Weather API is a backend service which is designed to manage weather and locations information effciently. This service allows to:

Forecast:
Create, update, get all, get by ID, delete
Get forecast by location

Alerts:
Create, delete, update
Get alerts by location

Locations:
get, get all, update, delete

Users:
getting user details, set custom claims


This service helps to manage the weather their respective information in an efficient manner.

# Installation Instructions

Here are the step by step instructions to setup this project:

1:Clone the repository on your local machine:
git clone <link of the repository>

2:Install all the dependencies:
npm install, morgan

3: Set up the environment variables to protect sensitive information:
Create a .env file at the root of your project and define the required variables. Example:

NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID="your_id"
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL="your_client_email"
SWAGGER_SERVER_URL="swagger_server_url"

Don't forget to add .env to .gitignore.

4:Start the server:
 npm start

5:Access the endpoints when the server starts:

Forecasts: http://localhost:3000/api/v1/forecasts

Locations: http://localhost:3000/api/v1/locations

Alerts: http://localhost:3000/api/v1/alerts

Users: http://localhost:3000/api/v1/users

# API Request Examples
Example 1: GET alerts by id
curl --location 'http://localhost:3000/api/v1/alerts/2' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1YTZjMGMyYjgwMDc
xN2EzNGQ1Y2JiYmYzOWI4NGI2NzYxMjgyNjUiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoidXNlciIsImlzcyI6Imh
0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9hc3NpZ25tZW50NC1hN2UxN
SIsImF1ZCI6ImFzc2lnbm1lbnQ0LWE3ZTE1IiwiYXV0aF90aW1lIjoxNzYzOTU3
NDIzLCJ1c2VyX2lkIjoiaUk0OVhGUjVLeU10N21wNVlUVUFCTmlMZ0dsMiIsInN1Y
iI6ImlJNDlYRlI1S3lNdDdtcDVZVFVBQk5pTGdHbDIiLCJpYXQiOjE3NjM5NTc0MjMsImV
4cCI6MTc2Mzk2MTAyMywiZW1haWwiOiJ1c2VyM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZm
llZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidXNlcjNAZ2
1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.RbJt3vQSCdoNUg
HAcWIfO9uBFmPIoctxZ7-F5vCIjfhyRP2ybMHvN-umRk2LJdgZSIujS-gU0zsL18LsPTKgo9JieI
tZ4MfNE6PGwhjisBPasMCmwiWlPoKfIUB2woq9dRSv7TTgwpF3MDfBmTPlTZwToA9tzAKE7oAPQkRTP
S_VovJN4TzFi9z_X18iLiTwjcEGd7HKkXNGRRm7n45iMQVP96j40oe7t0ExVZZFVLB7bzxaiT1N_sg
ui6KQmT4F5QTDOihDAZK3VxHMsjbnzpxemIjcpajxcUqao3UeJt5mfiK1PGNx6UPOjWSQDk9cgmI-sr9pry445BBXNC8tBg'

Example 2: GET locations
curl --location 'http://localhost:3000/api/v1/locations/' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1
YTZjMGMyYjgwMDcxN2EzNGQ1Y2JiYmYzOWI4NGI2NzYxMjgyNjUiLCJ0eXAiOiJKV
1QifQ.eyJyb2xlIjoidXNlciIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlL
mNvbS9hc3NpZ25tZW50NC1hN2UxNSIsImF1ZCI6ImFzc2lnbm1lbnQ0LWE3ZTE1IiwiYXV0
aF90aW1lIjoxNzYzOTU3NDIzLCJ1c2VyX2lkIjoiaUk0OVhGUjVLeU10N21wNVlUVUFCTmlMZ
0dsMiIsInN1YiI6ImlJNDlYRlI1S3lNdDdtcDVZVFVBQk5pTGdHbDIiLCJpYXQiOjE3NjM5NTc
0MjMsImV4cCI6MTc2Mzk2MTAyMywiZW1haWwiOiJ1c2VyM0BnbWFpbC5jb20iLCJlbWFpbF9
2ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidXNl
cjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.RbJt3vQSCd
oNUgHAcWIfO9uBFmPIoctxZ7-F5vCIjfhyRP2ybMHvN-umRk2LJdgZSIujS-gU0zsL18LsPTKgo
9JieItZ4MfNE6PGwhjisBPasMCmwiWlPoKfIUB2woq9dRSv7TTgwpF3MDfBmTPlTZwToA9tzA
KE7oAPQkRTPS_VovJN4TzFi9z_X18iLiTwjcEGd7HKkXNGRRm7n45iMQVP96j40oe7t0ExVZZF
VLB7bzxaiT1N_sgui6KQmT4F5QTDOihDAZK3VxHMsjbnzpxemIjcpajxcUqao3UeJt5mfiK1PGNx6
UPOjWSQDk9cgmI-sr9pry445BBXNC8tBg'

Example 3: POST forecasts
curl --location 'http://localhost:3000/api/v1/forecasts/' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1YTZjMG
MyYjgwMDcxN2EzNGQ1Y2JiYmYzOWI4NGI2NzYxMjgyNjUiLCJ0eXAiOiJKV1QifQ.eyJyb
2xlIjoibWFuYWdlciIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9
hc3NpZ25tZW50NC1hN2UxNSIsImF1ZCI6ImFzc2lnbm1lbnQ0LWE3ZTE1IiwiYXV0aF90a
W1lIjoxNzYzOTU3NzU0LCJ1c2VyX2lkIjoiVlg1ZXFKREt1UFRXVHp5Z0h0T2pZUUdzY212
MSIsInN1YiI6IlZYNWVxSkRLdVBUV1R6eWdIdE9qWVFHc2NtdjEiLCJpYXQiOjE3NjM5NTc3
NTQsImV4cCI6MTc2Mzk2MTM1NCwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJlbWFpbF92
ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidXNl
cjJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.WXG9nBAQS
P-xCh89MWg0Jd0IzDaJ-tALKQyk9wGInwQ2DHaGiya0ShLvdBMM4Az3CrA9LA7_NrbQot6LiO
pTHK-NfjHPlm43rLe3FLw6Kbmf_xmDGL-rjehA0zd9ihji7WlPKwI35tInnw-0K_N2HbyGCdksx
GEco-YJyyGRZZwD_yi3fGE9_KaCGlBUx8fB32pS_QYTesRWDrKbm-RFt9Wr-2NTU0GufwOAQeZ7L
LEhlcVLCtPADidOC16H4wRhUdUiqeIO-uHnODGBjKbbUQ9Sc5mqqs29t_uAUFHArmz08RXoN9re-
ueA0u1LCbDhWFDe6Mazh86IyIAK2dwaFA' \
--header 'Content-Type: application/json' \
--data '{"id": "7",
"locationId": "5","temperature": "-3","humidity": "18",
"windSpeed": "21",
"date": "2025-11-19"
}'

# Link to Public Documentation

You can access all the detailed information about all endpoints at:
   https://github.com/harmankaur358/Final_project-backend-.git

# Local Documentation Access

1:Start your server using:
npm start

2:Open the browser and visit:
http://localhost:3000/api-docs/

You will be successfully able to access all endpoints of weather, as well as the schemas.