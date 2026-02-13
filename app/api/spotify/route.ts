import { getNowPlaying } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const response = await getNowPlaying();

        console.log("Spotify API Status:", response.status); // Debug

        if (response.status === 204 || response.status > 400) {
            console.log("Spotify API Error or No Content"); // Debug
            return NextResponse.json({ isPlaying: false });
        }

        const song = await response.json();
        console.log("Spotify Fetched Song:", song.item ? song.item.name : "No Item"); // Debug

        if (song.item === null) {
            return NextResponse.json({ isPlaying: false });
        }

        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(', ');
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;
        const previewUrl = song.item.preview_url;

        return NextResponse.json({
            isPlaying,
            title,
            artist,
            album,
            albumImageUrl,
            songUrl,
            previewUrl,
        });
    } catch (error) {
        console.error("Error fetching Spotify data:", error);
        return NextResponse.json({ isPlaying: false });
    }
}
