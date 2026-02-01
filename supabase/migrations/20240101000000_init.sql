-- Migration: 20240101000000_init.sql
-- Description: Initial schema setup for RouteMaster
-- Schema: proj_f3c11d83

-- 1. Set Search Path (CRITICAL)
SET search_path TO proj_f3c11d83;

-- 2. Enable Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Create Tables

-- PROFILES (User Data)
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Links to auth.users.id implicitly (no FK allowed)
    full_name TEXT,
    company_name TEXT,
    role TEXT DEFAULT 'driver', -- 'driver', 'dispatcher', 'admin'
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- VEHICLES
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL, -- Logical link to profiles.user_id or profiles.id? Usually user_id for RLS.
    name TEXT NOT NULL,
    license_plate TEXT,
    capacity_kg NUMERIC,
    fuel_type TEXT, -- 'gas', 'diesel', 'electric'
    avg_fuel_consumption NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vehicles_owner_id ON vehicles(owner_id);

-- ROUTES
CREATE TABLE routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Creator (links to auth.users.id via JWT)
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'draft', -- 'draft', 'optimized', 'in_progress', 'completed'
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    total_distance_meters INTEGER DEFAULT 0,
    total_duration_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_routes_user_id ON routes(user_id);
CREATE INDEX idx_routes_vehicle_id ON routes(vehicle_id);

-- STOPS
CREATE TABLE stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
    sequence_order INTEGER DEFAULT 0,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    type TEXT DEFAULT 'delivery', -- 'pickup', 'delivery', 'break'
    status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'skipped'
    arrival_time_window_start TIMESTAMPTZ,
    arrival_time_window_end TIMESTAMPTZ,
    estimated_arrival_time TIMESTAMPTZ,
    actual_arrival_time TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stops_route_id ON stops(route_id);

-- 4. Enable RLS

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stops ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Profiles: Users can view/edit their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Vehicles: Users can CRUD vehicles they own
CREATE POLICY "Users can manage own vehicles" ON vehicles
    FOR ALL USING (owner_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Routes: Users can CRUD their own routes
CREATE POLICY "Users can manage own routes" ON routes
    FOR ALL USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Stops: Users can CRUD stops linked to their routes
-- (Using a join or subquery logic is common, but simple way is checking route ownership)
-- Note: RLS on related tables often requires specific policies or redundant user_id columns for performance.
-- For simplicity/performance in this init, we will trust the route relation OR add user_id to stops.
-- A better approach for stops without adding user_id:
CREATE POLICY "Users can manage stops of own routes" ON stops
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM routes
            WHERE routes.id = stops.route_id
            AND routes.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );

