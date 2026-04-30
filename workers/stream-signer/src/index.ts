import { AwsClient } from 'aws4fetch';
import * as jose from 'jose';

export interface Env {
  MEDIA_BUCKET: R2Bucket;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_ENDPOINT: string;
  R2_PUBLIC_DOMAIN: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.slice(1); // Remove leading slash

    if (!path) {
      return new Response('Missing object path', { status: 400 });
    }

    // 1. Verify Authorization Header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Note: In a real app, you'd want to fetch the Supabase JWT secret 
      // or use their public key to verify the token. 
      // For now, we validate by calling the Supabase auth/v1/user endpoint.
      const userRes = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: env.SUPABASE_ANON_KEY,
        },
      });

      if (!userRes.ok) {
        return new Response('Invalid token', { status: 401 });
      }

      // 2. Generate Presigned URL for R2
      const r2 = new AwsClient({
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
        service: 's3',
        region: 'auto',
      });

      const signedRequest = await r2.sign(
        new Request(`${env.R2_ENDPOINT}/${path}`, { method: 'GET' }),
        { aws: { signQuery: true }, expiresIn: 3600 }
      );

      // Construct public URL using the custom domain from environment
      const publicUrl = new URL(signedRequest.url);
      publicUrl.host = env.R2_PUBLIC_DOMAIN;
      publicUrl.protocol = 'https:';

      return new Response(JSON.stringify({ 
        url: publicUrl.toString(),
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        quality: url.searchParams.get('quality') || '720p'
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Enable CORS for the API
        },
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
