import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { resolve } from "path";

// Load .env from root
dotenv.config({ path: resolve('../../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.NUXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY);

const QUALITIES = ['1080p', '720p', '480p', '360p'];

async function register() {
  try {
    // 1. Get Solo Leveling Episode 1
    const { data: anime } = await supabase.from('anime').select('id').eq('slug', 'solo-leveling').single();
    if (!anime) return console.error("Anime not found");

    const { data: ep } = await supabase.from('episodes').select('id').eq('anime_id', anime.id).eq('episode_number', 1).single();
    if (!ep) return console.error("Episode not found");

    console.log(`Registering qualities for Episode ${ep.id}...`);

    for (const q of QUALITIES) {
      const { error } = await supabase.from('video_sources').upsert({
        episode_id: ep.id,
        quality: q,
        format: 'mp4',
        r2_key: `anime/demo/episode/1/${q}.mp4`,
        is_primary: q === '1080p'
      }, { onConflict: 'episode_id,quality' });

      if (error) {
        console.error(`Error registering ${q}:`, error.message);
      } else {
        console.log(`Registered: ${q}`);
      }
    }

    console.log("All MP4 qualities registered successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

register();
