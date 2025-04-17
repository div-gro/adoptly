
# 🐾 Adoptly - Pet Adoption Platform

Adoptly is a user-friendly pet adoption platform where users can register, log in, post pets for adoption, and explore adoptable pets. It is built using **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- ✅ User Registration & Login  
- 🐶 Upload pets for adoption (with images)  
- 📋 View all adoptable pets  
- 📄 Individual pet details page  
- 🔒 MongoDB-based data handling  
- 🖼️ File upload support using Multer  

## 🛠️ Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB** (Atlas or Local)  
- **Multer** (Image Uploads)  
- **bcrypt** (Password Encryption)  

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/div-gro/adoptly.git
cd adoptly
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Update MongoDB URI

Edit the file `js/db.js`:

```js
const uri = "your_mongodb_connection_string_here"; // Replace with your MongoDB URI
```

✅ **For local MongoDB setup**:

```js
const uri = "mongodb://localhost:27017/adoptly";
```

### 4. Start the Server

```bash
cd js
node server.js
```

> The backend server will run at:  
> 🌐 <http://localhost:3000>

---

## 🧪 API Endpoints

| Endpoint     | Method | Description                          |
|--------------|--------|--------------------------------------|
| `/register`  | POST   | Register a new user                  |
| `/login`     | POST   | Log in an existing user              |
| `/rehome`    | POST   | Post a pet for adoption (with image)|
| `/pets`      | GET    | Fetch all adoptable pets            |
| `/pets/:id`  | GET    | Fetch details of a specific pet     |

---

## 🌐 Live Pages

> ⚠️ Some pages may require the local server to be running.

- 🔗 [Home](https://div-gro.github.io/adoptly/index.html)  
- 🔗 [About](https://div-gro.github.io/adoptly/about.html)  
- 🔗 [Adopt](https://div-gro.github.io/adoptly/adopt.html)  
- 🔗 [Care Guide](https://div-gro.github.io/adoptly/care-guide.html)  
- 🔗 [Contact](https://div-gro.github.io/adoptly/contact.html)  
- 🔗 [FAQ](https://div-gro.github.io/adoptly/faq.html)  
- 🔗 [Login](https://div-gro.github.io/adoptly/login.html)  
- 🔗 [Signup](https://div-gro.github.io/adoptly/signup.html)  
- 🔗 [Rehome](https://div-gro.github.io/adoptly/rehome.html)  
- 🔗 [Pet Info](https://div-gro.github.io/adoptly/pet-info.html)  
- 🔗 [Privacy Policy](https://div-gro.github.io/adoptly/privacy-policy.html)  
- 🔗 [Terms of Service](https://div-gro.github.io/adoptly/terms-of-service.html)  
- 🔗 [Voluntary Registration](https://div-gro.github.io/adoptly/voluntary-registration.html)

---

## 📁 Folder Structure

```
adoptly/
├── assets/uploads         # Uploaded pet images
├── js/
│   ├── db.js              # MongoDB connection logic
│   └── server.js          # Express server logic
├── index.html             # Main landing page
├── signup.html
├── login.html
├── rehome.html
├── adopt.html
├── pet-info.html
├── about.html
├── contact.html
├── care-guide.html
├── faq.html
├── privacy-policy.html
├── terms-of-service.html
├── voluntary-registration.html
└── ...
```

## 📝 Notes

- Ensure MongoDB (Atlas or local) is running and accessible.  
- Uploaded pet images are saved in the `assets/uploads` directory.  
- Run the backend server before testing page functionalities like login, register, or adopt.
