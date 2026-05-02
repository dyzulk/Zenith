-- Migration: Add URL column to video_sources and make r2_key optional
ALTER TABLE video_sources ADD COLUMN url TEXT;
-- SQLite does not support ALTER TABLE DROP NOT NULL easily, 
-- but we can just use the url column if r2_key is empty or dummy.
