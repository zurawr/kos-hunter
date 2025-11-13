# Dashboard Routes Configuration

## Overview
This document explains the routing structure for different user roles in the application.

## Routes by User Role

### For Society Users (Regular Users)
- **Path**: `/dashboard`
- **Access**: Only for users with `role = 'society'`
- **Features**:
  - View available boarding houses (kos)
  - Search and filter kos listings
  - Contact owners
  - View kos details
  - Map view of available kos locations

### For Owner Users (Admin)
- **Path**: `/admin-dashboard`
- **Access**: Only for users with `role = 'owner'`
- **Features**:
  - Welcome message with user name
  - Statistics cards:
    - Total Society (25)
    - Total Reviews (19)
    - Total Payment (10)
  - Payment tracking table with columns:
    - Username (with avatar)
    - Email
    - Price
    - Gender
    - Status Payment (Done/Haven't paid yet)
  - Payment Reminder button
  - Last update date display

### Owner Management Pages
- **Boarding House Management**: `/boarding-house`
  - View all owned boarding houses
  - Add new boarding houses
  - Edit boarding house details
  - Delete boarding houses
  - View detailed information per boarding house

- **Profile Settings**: `/profile_owner`
  - Edit owner profile
  - Change password
  - Manage account settings

## Route Protection

### AuthContext
The `AuthContext` handles authentication and automatic redirection:
- After successful login:
  - Owner users → redirected to `/admin-dashboard`
  - Society users → redirected to `/dashboard`
- Unauthenticated users → redirected to `/login`

### Protected Routes
All dashboard routes are protected and check:
1. User authentication status
2. User role (owner vs society)
3. Redirect to appropriate dashboard if wrong role

## Navigation Structure

### Sidebar for Owners (SidebarOwner Component)
Located at: `components/sidebar-owner.tsx`

Menu items:
1. Dashboard → `/admin-dashboard`
2. Boarding House → `/boarding-house`
3. Settings → `/profile_owner`

### Navbar for Society Users
Located at: `components/Navbar.tsx`

Features:
- Province/City dropdown filters
- Menu links: Rent, Sewa, Help Center
- User profile icon

## UI/UX Design Implementation

### Admin Dashboard (`/admin-dashboard`)
Implements the provided Figma design with:
- Gradient teal cards for statistics
- Clean table layout for payments
- Status badges (green for "Done", red for "Haven't paid yet")
- User avatars in payment table
- Calendar icon with last update date
- Professional color scheme matching the design

### User Dashboard (`/dashboard`)
Features:
- Full-width map background
- 3-column grid of kos cards
- Card hover effects
- Facility icons and information
- Direct contact owner button
- "More Details" link to individual kos pages

## Migration from Old Routes

### Deprecated Routes
- `/boarding-house-dashboard` → Now split into:
  - `/admin-dashboard` (statistics and overview)
  - `/boarding-house` (boarding house management)

### Update Checklist
- [x] Created `/admin-dashboard` route
- [x] Updated `AuthContext` to redirect owners to `/admin-dashboard`
- [x] Updated `sidebar-owner.tsx` Dashboard link to `/admin-dashboard`
- [x] Added role-based protection to `/dashboard` (society only)
- [x] Added role-based protection to `/admin-dashboard` (owner only)
- [x] Implemented UI/UX design 100% matching Figma

## Testing

### Test Scenarios
1. **Owner Login**:
   - Login with owner credentials
   - Should redirect to `/admin-dashboard`
   - Verify all statistics display correctly
   - Check payment table renders properly

2. **Society Login**:
   - Login with society credentials
   - Should redirect to `/dashboard`
   - Verify kos listings display
   - Check search and filter functionality

3. **Route Protection**:
   - Try accessing `/admin-dashboard` as society user → should redirect to `/dashboard`
   - Try accessing `/dashboard` as owner user → should redirect to `/admin-dashboard`
   - Try accessing any dashboard without login → should redirect to `/login`

## Future Enhancements
- Connect admin dashboard statistics to real API data
- Add real-time payment status updates
- Implement payment reminder email functionality
- Add export functionality for payment reports
- Integrate analytics and charts for better insights
