EventHorizon API - Foundation

Secure RESTful backend for managing local tech meetups. Gatekeeper service handling authentication with email verification.

Features
MongoDB + Mongoose
Joi validation (password: min 8 chars, at least 1 letter + 1 number)
Bcrypt password hashing (12 rounds)
JWT authentication
Token-based email verification (NOT OTP) - token hashed with SHA256 in DB, 1h expiry
Protected route with verified-only access

Endpoints
Method	Endpoint	                      Auth	Description
POST	  /api/auth/register	              No	Register, sends verification link
GET	    /api/auth/verify-email?token=xyz	No	Verify email
POST	  /api/auth/login	                  No	Login, returns JWT (blocked if not verified)
GET	    /api/user/profile	                Yes (Bearer JWT)	Protected demo route

Setup Locally

1. Clone
git clone <your-repo> && cd eventhorizon-api
npm install
2. Env
cp .env.example .env
# fill MONGO_URI, JWT_SECRET, EMAIL_*, FRONTEND_URL
For Gmail: create App Password -> use in EMAIL_PASS. Or use Ethereal for testing.
3. Run
npm run dev
Server: http://localhost:7000

Verification Flow

1. User POST /api/auth/register {name,email,password}
2. Server generates rawToken + hashedToken (sha256). Stores hashedToken + expires.
3. Email sent with link: FRONTEND_URL/verify-email?token=rawToken
4. Frontend calls backend GET /api/auth/verify-email?token=rawToken -> backend hashes query token and matches DB, marks isVerified=true.

Security: Even if DB leaks, attacker cannot verify because only hash stored. Token expires in 1h.

Why 403 for unverified?

Unverified users cannot login or access protected routes per requirement.

Postman
Import postman_collection.json included.

Tech Stack
Node.js, Express 4, Mongoose 8, Joi 17, bcryptjs, jsonwebtoken, nodemailer# EventHorizon_Project_assignment
