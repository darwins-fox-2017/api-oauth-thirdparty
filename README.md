##**Sehati API**
#### REST API with OAuth by 3rd Party

##**REST API with OAuth**
#### List of passport-local routes:

**Route**    | **HTTP**       | **Description**
-------------|----------------|------------------------
/login       | GET            | Print: Login page
/login/local | GET            | Print: Login
/login/local | POST           | req.body (username & password)
/login/exit  | GET            | Print: Logout

#### List of passport-facebook routes:

**Route**                | **HTTP**      | **Description**
-------------------------|---------------|------------------------
/login/facebook			     | GET           | Print: Login page on FB
/login/facebook/callback | GET           | Print: Callback
/login/facebook			     | POST          | Print: Page on FB
/login/facebook/exit     | GET           | Print: Logout

#### List of passport-twitter routes:

**Route**                | **HTTP**      | **Description**
-------------------------|---------------|------------------------
/login/twitter			     | GET           | Print: Login page on Twitter
/login/twitter/callback  | GET           | Print: Callback
/login/twitter			     | POST          | Print: Page on Twitter
/login/twitter/exit      | GET           | Print: Logout

#### List of passport-google routes:

**Route**                | **HTTP**      | **Description**
-------------------------|---------------|------------------------
/login/google 			     | GET           | Print: Login page on Google
/login/google/callback   | GET           | Print: Callback
/login/google 			     | POST          | Print: Page on Google
/login/google/exit       | GET           | Print: Logout


### **USAGE**
#### With only npm:

> npm init <br>
> npm install express <br>
> npm install nodemon <br>
> npm run dev <br>
> npm install jsonwebtoken <br>
> npm install password-hash <br>
> npm install --save dotenv <br>
> npm install mongoose <br>
> npm install passport passport-local <br>
> npm install passport-facebook <br>
> npm install passport-twitter <br>
> npm install express-session <br>
> npm install passport-google-oauth20

#### Mongoose (db):

> sudo service mongod start <br>
> connection @robomongo <br>
> mongo <br>
> use user <br>
> create file connection: db.js

##### **IMPORTANT**
Using passport local:
//Must first position in app.use
app.use(passport.initialize());

Correct Structure:
> 1. passport.session <br>
> 2. cookieParser <br>
> 3. session <br>
> 4. app.router

##### Special for CRUD using Token in headers (postman):
P.s. Token will get when sign in as Admin

Access the website via http://localhost:3000 or API via http://localhost:3000/login <br>
Debugger encode & decode via https://jwt.io/
