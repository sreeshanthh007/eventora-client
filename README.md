# 🎨 Eventora Client – Event Booking & Vendor Service Platform (Frontend)

Eventora Client is the **frontend application** for the Eventora ecosystem, built using **React + TypeScript** with a clean, modular structure. It delivers a smooth experience for **Clients**, **Vendors**, and **Admins** to manage events, bookings, services, profiles, and real-time features.

---

## ✨ Features

## 🔹 Client Side (Users)

* 🎉 Browse **events** and **vendor services**
* 🎫 Book **event tickets**
* 🕒 Book **services based on availability slots**
* 🔐 Authentication (JWT login/signup)
* 🔁 Forgot password + OTP verification
* 👤 Manage profile & bookings
* 🔔 Real-time updates (Socket.io)
* 📷 View QR Ticket
* 📥 Report an issue to admin/vendor

---

## 🔹 Vendor Side

* 🛠️ Manage **events** & **services**
* 📅 Set availability and slot timings
* 📄 View bookings for services & events
* 📲 Scan & verify QR tickets
* 📊 Vendor dashboard with booking insights
* 👤 Manage profile

---

## 🔹 Admin Side

* 👨‍💼 Manage **users, vendors, events, services**
* ✔️ Approve or reject vendor applications (real-time)
* 🏷️ Manage categories
* 💰 Admin dashboard with system earnings
* 🔍 View booked services and event analytics

---

# 🏗️ Tech Stack

* **React** + **TypeScript**
* **Redux Toolkit** 
* **React Router**
* **Tailwind CSS**
* **Axios** 
* **Socket.io Client** 
* **React Hook & Formik + Yup** 

---

# 📁 Project Structure (Actual)

```
src/
├─ api/           # axios instances, API endpoint definitions
├─ assets/        # images, fonts, icons, static assets
├─ components/    # reusable UI components (buttons, cards, modals)
├─ contexts/      # React context providers (auth, theme, socket)
├─ hooks/         # custom hooks (useAuth, useFetch, useSocket)
├─ lib/           # small libraries/helpers shared across app
├─ protected/     # protected route wrappers & auth-guard components
├─ routes/        # route definitions and page-level route components
├─ services/      # client-side services (api wrappers, storage, auth)
├─ types/         # TypeScript types & interfaces
├─ utils/         # utility functions and helpers
└─ main.tsx       # app entrypoint
```


---

# 🔗 API Integration

The frontend communicates with the Eventora backend via:

* REST APIs (Axios)
* Socket.io for live updates (bookings, check-ins, vendor approval)

Auth flow uses **HTTP-only cookies**.

---


# 🖼️ UI & Styling

* Fully responsive using **Tailwind CSS**
* Reusable components and layouts
* Dark mode support (if implemented)

---