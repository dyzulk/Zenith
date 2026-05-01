-- Migration: Add password_hash to profiles
ALTER TABLE profiles ADD COLUMN password_hash TEXT;
