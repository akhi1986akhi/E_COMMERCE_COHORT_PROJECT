# E-Commerce Backend Models

This package provides a comprehensive set of **Mongoose models** for building a full-featured e-commerce application.  
The models follow **MongoDB best practices** with proper indexing, validation, and relationships.

---

## 📌 Models Overview

### 1. User Model (`User.js`)
Handles user authentication, profiles, and preferences.

**Key Features:**
- Secure password hashing
- Role-based access control (customer, admin, vendor)
- Email verification system
- Password reset functionality
- Address management
- User preferences & notification settings

---

### 2. Address Model (`Address.js`)
Manages user addresses for shipping and billing.

**Key Features:**
- Multiple address types (home, work, other)
- Geolocation support
- Default address management
- Address validation

---

### 3. Category Model (`Category.js`)
Organizes products into hierarchical categories.

**Key Features:**
- Parent-child category relationships
- SEO-friendly slug generation
- Ancestor tracking for efficient querying
- Product count virtuals
- SEO metadata support

---

### 4. Product Model (`Product.js`)
Core product catalog management.

**Key Features:**
- Product variants and attributes
- Inventory management with stock tracking
- Digital product support with download management
- SEO optimization fields
- Rating and review aggregation
- Sales tracking
- Image gallery with primary image support

---

### 5. Review Model (`Review.js`)
Handles product reviews and ratings.

**Key Features:**
- Verified purchase tracking
- Review moderation system
- Helpful vote tracking
- Admin response capability
- Automatic rating aggregation

---

### 6. Cart Model (`Cart.js`)
Manages shopping cart functionality.

**Key Features:**
- User-specific carts
- Coupon & discount application
- Automatic total calculation
- Variant support
- TTL for cart expiration

---

### 7. Order Model (`Order.js`)
Comprehensive order management system.

**Key Features:**
- Order status tracking
- Payment status management
- Automated order numbering
- Inventory management integration
- Digital product delivery
- Refund processing
- Order history tracking

---

### 8. Coupon Model (`Coupon.js`)
Discount and promotion system.

**Key Features:**
- Multiple discount types (percentage, fixed, free shipping)
- Usage limits & tracking
- Product/category restrictions
- Validity period management
- Usage validation

---

### 9. Shipping Method Model (`ShippingMethod.js`)
Shipping configuration and management.

**Key Features:**
- Multiple shipping types (flat rate, free, local pickup, calculated)
- Country & zone-based pricing
- Weight & dimension limits
- Handling fee support
- Estimated delivery ranges

---

### 10. Wishlist Model (`Wishlist.js`)
User wishlist functionality.

**Key Features:**
- Private & public wishlists
- Shareable wishlists with tokens
- Product notes

---

### 11. Brand Model (`Brand.js`)
Brand management for products.

**Key Features:**
- Brand organization
- SEO-friendly slugs
- Logo management
- Website integration

---

## 🚀 Getting Started
1. Install dependencies:
   ```bash
   npm install mongoose

## 🛠 Tech Stack

- MongoDB (NoSQL Database)
- Mongoose (ODM for MongoDB)
- Node.js / Express.js (Backend framework)

## 📖 License

- This project is licensed under the MIT License.