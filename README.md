# ABC Cinemas Frontend

A modern, responsive Vue.js frontend application for the ABC Cinemas booking system. This single-page application provides a complete cinema booking experience with user authentication, movie browsing, seat selection, and booking management.

## 🎬 Features

- **User Authentication**: Secure registration and login system with role-based access
- **Movie Catalog**: Browse 40+ movies with detailed information, genres, and ratings
- **Ticket Booking**: Complete booking workflow with date/time selection and seat mapping
- **Seat Selection**: Interactive seat selection with real-time availability
- **Multi-Branch Support**: Book tickets across 5 cinema locations (UTM, Muar, Yong Peng, Kota Tinggi, Cameron Highlands)
- **User Dashboard**: Profile management and booking history
- **Reviews & Ratings**: Rate movies and read customer reviews
- **Admin Panel**: Complete admin interface for managing users, movies, and bookings
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Real-time Updates**: Dynamic content updates without page refreshes

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pudd11ng/abcinemas-vue
   cd abcinemas-vue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run serve
   ```

4. **Access the application**
   - Check the terminal to identify the link 
   - Open your browser and visit the link
   - The application will automatically reload when you make changes

### Building for Production

```bash
# Build optimized production files
npm run build

# Lint and fix code issues
npm run lint
```

## 🔧 Configuration

### Backend API Configuration

The application is configured to connect to the backend API at:
```
http://localhost:8088/api
```

All API endpoints are properly configured with the `/api` prefix and use the correct request formats as documented in the [Backend API Documentation](https://github.com/Pudd11ng/drivesense-backend).


## 🔗 API Integration

### Backend Integration

This frontend is designed to work with the ABC Cinemas Backend API:
- **Repository**: [https://github.com/Pudd11ng/drivesense-backend](https://github.com/Pudd11ng/drivesense-backend)
- **Documentation**: See backend repository for complete API documentation

### API Endpoints Used

- **Movies**: `/api/movies` - Movie catalog and details
- **Users**: `/api/users` - Authentication and profile management
- **Bookings**: `/api/bookings` - Ticket booking and history
- **Showtimes**: `/api/booking-showtimes` - Movie scheduling
- **Reviews**: `/api/reviews` - Customer reviews and ratings