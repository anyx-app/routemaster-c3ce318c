# Schema Plan - RouteMaster

## Overview
RouteMaster requires a robust schema to handle user management, route planning, stop optimization, and vehicle/fleet management. This schema is designed to support multi-stop optimization and real-time data integration.

## Tables

### 1. profiles
Extends the default Supabase auth.users table.
- **id** (uuid, PK): References auth.users(id).
- **full_name** (text): User's display name.
- **company_name** (text): Organization name (optional).
- **role** (text): 'driver', 'dispatcher', 'admin'. Default: 'driver'.
- **avatar_url** (text): URL to profile image.
- **created_at** (timestamptz): Creation timestamp.
- **updated_at** (timestamptz): Last update timestamp.

### 2. vehicles
Represents the fleet used for deliveries.
- **id** (uuid, PK): Unique identifier.
- **owner_id** (uuid, FK): References profiles(id). The user who owns/manages this vehicle.
- **name** (text): Friendly name (e.g., "Van 1").
- **license_plate** (text): Registration number.
- **capacity_kg** (numeric): Max weight capacity.
- **fuel_type** (text): 'gas', 'diesel', 'electric'.
- **avg_fuel_consumption** (numeric): L/100km or equivalent.
- **created_at** (timestamptz).

### 3. routes
A planned sequence of stops for a specific day/vehicle.
- **id** (uuid, PK): Unique identifier.
- **user_id** (uuid, FK): References profiles(id). Creator of the route.
- **vehicle_id** (uuid, FK): References vehicles(id). Assigned vehicle.
- **name** (text): Route name (e.g., "Monday Downtown").
- **status** (text): 'draft', 'optimized', 'in_progress', 'completed'.
- **start_time** (timestamptz): Scheduled start.
- **end_time** (timestamptz): Estimated or actual end.
- **total_distance_meters** (integer): Calculated total distance.
- **total_duration_seconds** (integer): Calculated total duration.
- **created_at** (timestamptz).
- **updated_at** (timestamptz).

### 4. stops
Individual delivery or pickup locations within a route.
- **id** (uuid, PK): Unique identifier.
- **route_id** (uuid, FK): References routes(id).
- **sequence_order** (integer): The optimized order (0, 1, 2...).
- **address** (text): Full address string.
- **latitude** (double precision): Geo coordinate.
- **longitude** (double precision): Geo coordinate.
- **type** (text): 'pickup', 'delivery', 'break'.
- **status** (text): 'pending', 'completed', 'failed', 'skipped'.
- **arrival_time_window_start** (timestamptz): Earliest allowed arrival.
- **arrival_time_window_end** (timestamptz): Latest allowed arrival.
- **estimated_arrival_time** (timestamptz): Calculated by optimizer.
- **actual_arrival_time** (timestamptz): When the driver arrived.
- **notes** (text): Driver instructions.
- **created_at** (timestamptz).

### 5. traffic_logs (Optional / Future)
To store historical traffic data for analysis.
- **id** (uuid, PK).
- **route_id** (uuid, FK).
- **timestamp** (timestamptz).
- **congestion_level** (text).

## Relationships
- One **Profile** can own multiple **Vehicles** and create multiple **Routes**.
- One **Route** is assigned to one **Vehicle** (optional) and belongs to one **Profile**.
- One **Route** has multiple **Stops**.

## Security (RLS)
- **profiles**: Users can read/edit their own profile.
- **vehicles**: Users can CRUD vehicles they own.
- **routes**: Users can CRUD their own routes.
- **stops**: Users can CRUD stops linked to their routes.
