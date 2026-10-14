import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import re
import os
import sys

PORT = 5173

CHANNEL_SLUGS = {
    "sky-sports-f1-uk": "SkySportsF1",
    "sky-sports-premier-league-uk": "skysportspremierleague",
    "sky-sports-tennis-uk": "skysportstennisuk",
    "sky-sports-action-uk": "skysportsaction",
    "sky-sports-main-event-live-uk": "skysportsmainevent",
    "sky-sports-cricket-uk": "skysportscricketuk",
    "sky-sports-golf-uk": "skysportsgolfuk",
    "sky-sports-racing-uk": "SkySportsRacing",
    "sky-sports-news-uk": "skysportsnews",
    "sky-sports-mix-uk": "skysportsmixuk",
    "sky-sports-football-uk": "SkySportsFootballUK",
    "sky-sports-plus-uk": "skysportsplus",
    "sky-sports-laliga-uk": "ViaplayLaLigaUK",
    "trace-sports": "TraceSports",
    "rally-tv": "WRC",
    "sky-atlantic-uk": "SkyAtlantic",
    "sky-showcase": "SkyAtlantic", # fallback for inactive showcase
    "sky-comedy-uk": "SkyComedyUK",
    "sky-crime-uk": "SkyCrimeUK",
    "sky-history-uk": "SkyHistoryUK",
    "sky-arts-uk": "SkyArtsUK",
    "gold-uk": "GoldUK",
    "s4c-uk": "S4CUK",
    "itv1-uk": "ITV1",
    "itv2-uk": "ITV2",
    "itv3-uk": "ITV3",
    "itv4-uk": "ITV4",
    "bbc-one-uk": "BBConeUK",
    "bbc-two-uk": "BBCTwoUK",
    "bbc-three-uk": "BBCThreeUK",
    "sky-cinema-action-uk": "SkyCinemaActionUK",
    "sky-cinema-hits-uk": "SkyCinemaHitsUK",
    "sky-cinema-thriller-uk": "SkyCinemaThrillerUK",
    "sky-cinema-select-uk": "SkyCinemaSelectUK",
    "sky-cinema-drama-uk": "SkyCinemaDramaUK",
    "sky-cinema-greats-uk": "SkyCinemaGreatsUK",
    "sky-cinema-sci-fi-horror-uk": "SkyCinemaSciFiHorrorUK",
    "sky-cinema-family-uk": "SkyCinemaFamilyUK",
    "sky-cinema-premiere-uk": "SkyCinemaPremiereUK",
    "sky-cinema-comedy-uk": "SkyCinemaComedyUK",
    "film4-uk": "Film4",
    "sky-news": "SkyNews",
    "bbc-news-uk": "BBCNewsUK",
    "gb-news": "GBNEWS",
    "reuters": "Reuters"
}

# Preload embed fallbacks from all-uk-channels.json or sky-tv-channels.json
CHANNEL_EMBEDS = {}
try:
    for filename in ['all-uk-channels.json', 'sky-tv-channels.json']:
        channels_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)
        if os.path.exists(channels_file):
            with open(channels_file, 'r', encoding='utf-8') as f:
                _ch_data = json.load(f)
                for _ch in _ch_data.get('channels', []):
                    CHANNEL_EMBEDS[_ch['id']] = _ch.get('iframeUrl', '')
except Exception as e:
    print(f"[Init] Embed mappings warning: {e}")

# In-memory token cache to minimize upstream requests
STREAM_CACHE = {}

def get_clean_stream(channel_id):
    fallback_url = CHANNEL_EMBEDS.get(channel_id, f"https://freeshot.live/embed/{CHANNEL_SLUGS.get(channel_id, 'SkySportsPremierLeague')}.php")
    
    if channel_id in ["sky-news", "skynews"]:
        return {
            "success": True,
            "type": "youtube",
            "streamUrl": "https://www.youtube-nocookie.com/embed/xDWQ3LkccY8?autoplay=1&modestbranding=1&rel=0",
            "fallbackEmbedUrl": "https://www.youtube-nocookie.com/embed/xDWQ3LkccY8?autoplay=1&modestbranding=1&rel=0",
            "channelId": channel_id
        }

    if channel_id in ["cnn-international", "cnn"]:
        return {
            "success": True,
            "type": "hls",
            "streamUrl": "/api/proxy/hls?url=https%3A%2F%2Fd3bp6dwmpbdajl.cloudfront.net%2Fv1%2Fmaster%2F3722c60a815c199d9c0ef36c5b73da68a62b09d1%2Fcc-ury0meh5m4nzm%2Findex.m3u8",
            "fallbackEmbedUrl": "http://www.freeintertv.com/view/id-200/1-1-0-1",
            "channelId": channel_id
        }

    if channel_id in ["bbc-one-uk", "bbc-one", "bbcone"]:
        return {
            "success": True,
            "type": "hls",
            "streamUrl": "/api/proxy/hls?url=" + urllib.parse.quote("https://vs-hls-pushb-uk-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_one_yorks/iptv_hd_abr_v1.m3u8", safe=""),
            "fallbackEmbedUrl": "https://freeshot.live/embed/BBConeUK.php",
            "channelId": channel_id
        }

    if channel_id in ["bbc-two-uk", "bbc-two", "bbctwo"]:
        return {
            "success": True,
            "type": "hls",
            "streamUrl": "/api/proxy/hls?url=" + urllib.parse.quote("https://vs-hls-push-uk-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_two_hd/iptv_hd_abr_v1.m3u8", safe=""),
            "fallbackEmbedUrl": "https://freeshot.live/embed/BBCTwoUK.php",
            "channelId": channel_id
        }

    if channel_id in ["bbc-three-uk", "bbc-three", "bbcthree"]:
        return {
            "success": True,
            "type": "hls",
            "streamUrl": "/api/proxy/hls?url=" + urllib.parse.quote("https://vs-hls-pushb-uk-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_three_hd/iptv_hd_abr_v1.m3u8", safe=""),
            "fallbackEmbedUrl": "https://freeshot.live/embed/BBCThreeUK.php",
            "channelId": channel_id
        }

    if channel_id in ["bbc-news-uk", "bbc-news"]:
        return {
            "success": True,
            "type": "hls",
            "streamUrl": "/api/proxy/hls?url=https%3A%2F%2Fvs-hls-push-ww-live.akamaized.net%2Fx%3D4%2Fi%3Durn%3Abbc%3Apips%3Aservice%3Abbc_news_channel_hd%2Ft%3D3840%2Fv%3Dpv14%2Fb%3D5070016%2Fmain.m3u8",
            "fallbackEmbedUrl": "https://freeshot.live/embed/BBCNewsUK.php",
            "channelId": channel_id
        }

    if channel_id in ["s4c-uk", "s4c"]:
        return {
            "success": True,
            "type": "hls",
            "streamUrl": "/api/proxy/hls?url=" + urllib.parse.quote("https://live-uk.s4c-cdn.co.uk/out/v1/a0134f1fd5a2461b9422b574566d4442/live_uk.m3u8", safe=""),
            "fallbackEmbedUrl": "https://freeshot.live/embed/S4CUK.php",
            "channelId": channel_id
        }

    if channel_id in ["gb-news", "gbnews"]:
        return {
            "success": True,
            "type": "hls",
            "streamUrl": "/api/proxy/hls?url=" + urllib.parse.quote("https://live-gbnews.simplestreamcdn.com/live5/gbnews/bitrate1.isml/manifest.m3u8", safe=""),
            "fallbackEmbedUrl": "https://freeshot.live/embed/GBNews.php",
            "channelId": channel_id
        }

    if channel_id in ["bloomberg-us", "bloomberg"]:
        return {
            "success": True,
            "type": "hls",
            "streamUrl": "/api/proxy/hls?url=https%3A%2F%2Fbloomberg.com%2Fmedia-manifest%2Fstreams%2Fus.m3u8",
            "fallbackEmbedUrl": "http://www.freeintertv.com/view/id-2991/1-1-0-1",
            "channelId": channel_id
        }

    if channel_id in ["russia-today", "rt", "rt-news"]:
        return {
            "success": True,
            "type": "hls",
            "streamUrl": "/api/proxy/hls?url=https%3A%2F%2Fwisewatchoott.wiseplayout.com%2FRT%2Fmaster.m3u8",
            "fallbackEmbedUrl": "http://www.freeintertv.com/view/id-1511/1-1-0-1",
            "channelId": channel_id
        }

    if channel_id in ["al-jazeera", "al-jazeera-english"]:
        return {
            "success": True,
            "type": "youtube",
            "streamUrl": "https://www.youtube-nocookie.com/embed/gCNeDWCI0vo?autoplay=1&modestbranding=1&rel=0",
            "fallbackEmbedUrl": "https://www.youtube-nocookie.com/embed/gCNeDWCI0vo?autoplay=1&modestbranding=1&rel=0",
            "channelId": channel_id
        }

    slug = CHANNEL_SLUGS.get(channel_id, "SkySportsPremierLeague")
    
    url = f"https://wideiptv.top/player/{slug}"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://freeshot.live/'
    })
    
    try:
        html = urllib.request.urlopen(req, timeout=6).read().decode('utf-8', errors='ignore')
        m = re.search(r'streamUrl:\s*"([^"]+)"', html)
        if m:
            clean_url = m.group(1).replace(r'\/', '/')
            token_match = re.search(r'currentToken:\s*"([^"]+)"', html)
            token = token_match.group(1) if token_match else ""
            
            return {
                "success": True,
                "type": "hls",
                "streamUrl": clean_url,
                "fallbackEmbedUrl": fallback_url,
                "channelSlug": slug,
                "currentToken": token,
                "channelId": channel_id
            }
        else:
            return {
                "success": True,
                "type": "embed",
                "streamUrl": "",
                "fallbackEmbedUrl": fallback_url,
                "channelSlug": slug,
                "currentToken": "",
                "channelId": channel_id
            }
    except Exception as e:
        return {
            "success": True,
            "type": "embed",
            "streamUrl": "",
            "fallbackEmbedUrl": fallback_url,
            "channelSlug": slug,
            "currentToken": "",
            "channelId": channel_id,
            "error": str(e)
        }

# EPG Scraper & Cache Manager
EPG_CACHE = None
EPG_CACHE_TIME = 0

CHANNEL_MAPPING = {
    "sky-sports-f1-uk": "407",
    "sky-sports-premier-league-uk": "402",
    "sky-sports-tennis-uk": "408",
    "sky-sports-action-uk": "404",
    "sky-sports-main-event-live-uk": "401",
    "sky-sports-cricket-uk": "405",
    "sky-sports-golf-uk": "406",
    "sky-sports-racing-uk": "415",
    "sky-sports-news-uk": "409",
    "sky-sports-mix-uk": "416",
    "sky-sports-football-uk": "403",
    "sky-sports-plus-uk": "404",
    "sky-sports-laliga-uk": "403",
    "sky-atlantic-uk": "108",
    "sky-showcase": "106",
    "sky-comedy-uk": "113",
    "sky-crime-uk": "121",
    "sky-history-uk": "123",
    "sky-arts-uk": "122",
    "sky-news": "501",
    "sky-cinema-premiere-uk": "301",
    "sky-cinema-select-uk": "302",
    "sky-cinema-hits-uk": "303",
    "sky-cinema-greats-uk": "307",
    "sky-cinema-family-uk": "304",
    "sky-cinema-action-uk": "306",
    "sky-cinema-comedy-uk": "308",
    "sky-cinema-thriller-uk": "309",
    "sky-cinema-drama-uk": "310",
    "sky-cinema-sci-fi-horror-uk": "311"
}

CHANNEL_NAMES = {
    "sky-sports-f1-uk": ("Sky Sports F1", 406, "Motorsport"),
    "sky-sports-premier-league-uk": ("Sky Sports Premier League", 402, "Football"),
    "sky-sports-tennis-uk": ("Sky Sports Tennis", 407, "Tennis"),
    "sky-sports-action-uk": ("Sky Sports Action", 408, "Action Sports"),
    "sky-sports-main-event-live-uk": ("Sky Sports Main Event", 401, "Top Events"),
    "sky-sports-cricket-uk": ("Sky Sports Cricket", 404, "Cricket"),
    "sky-sports-golf-uk": ("Sky Sports Golf", 405, "Golf"),
    "sky-sports-racing-uk": ("Sky Sports Racing", 415, "Horse Racing"),
    "sky-sports-news-uk": ("Sky Sports News", 409, "Sports News"),
    "sky-sports-mix-uk": ("Sky Sports Mix", 416, "Multi-Sport"),
    "sky-sports-football-uk": ("Sky Sports Football", 403, "Football"),
    "sky-sports-plus-uk": ("Sky Sports Plus", 412, "Live Events"),
    "sky-sports-laliga-uk": ("Sky Sports LaLiga", 410, "Football"),
    "sky-atlantic-uk": ("Sky Atlantic UK", 108, "HBO & Prestige"),
    "sky-showcase": ("Sky Showcase", 106, "Entertainment"),
    "sky-comedy-uk": ("Sky Comedy UK", 113, "Comedy"),
    "sky-crime-uk": ("Sky Crime UK", 121, "True Crime"),
    "sky-history-uk": ("Sky History UK", 123, "Documentaries"),
    "sky-arts-uk": ("Sky Arts UK", 130, "Culture & Arts"),
    "sky-news": ("Sky News", 501, "24/7 News"),
    "sky-cinema-premiere-uk": ("Sky Cinema Premiere", 301, "New Releases"),
    "sky-cinema-select-uk": ("Sky Cinema Select", 302, "Specials"),
    "sky-cinema-hits-uk": ("Sky Cinema Hits", 303, "Blockbusters"),
    "sky-cinema-greats-uk": ("Sky Cinema Greats", 304, "All-Time Classics"),
    "sky-cinema-family-uk": ("Sky Cinema Family", 305, "Kids & Family"),
    "sky-cinema-action-uk": ("Sky Cinema Action", 306, "Action & Thrills"),
    "sky-cinema-comedy-uk": ("Sky Cinema Comedy", 307, "Comedy Movies"),
    "sky-cinema-thriller-uk": ("Sky Cinema Thriller", 308, "Suspense"),
    "sky-cinema-drama-uk": ("Sky Cinema Drama", 309, "Acclaimed Drama"),
    "sky-cinema-sci-fi-horror-uk": ("Sky Cinema Sci-Fi Horror", 310, "Sci-Fi & Cult")
}

def parse_mytelly_listings(html_content):
    try:
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(html_content, 'html.parser')
    except Exception:
        return None

    channels_by_num = {}
    for row in soup.find_all('div', class_='schedule-row'):
        ch_cell = row.find('div', class_='channel-cell')
        if not ch_cell:
            continue
        name_div = ch_cell.find('div', class_='channel-name')
        num_div = ch_cell.find('div', class_='channel-number') or ch_cell.find(class_=re.compile(r'num|callsign', re.I))
        ch_name = name_div.get_text(strip=True) if name_div else ''
        ch_num = num_div.get_text(strip=True) if num_div else ''
        
        timeline = row.find('div', class_='timeline')
        if not timeline:
            continue
            
        shows = []
        for card in timeline.find_all('div', class_='program-card'):
            classes = card.get('class', [])
            tvshow = card.find('div', class_='tvshow')
            title_span = tvshow.find('span', class_='show-title') if tvshow else None
            meta_span = tvshow.find('span', class_='show-meta') if tvshow else None
            link = tvshow.find('a') if tvshow else None
            
            title = title_span.get_text(strip=True) if title_span else (link.get('title', '') if link else 'Live Broadcast')
            time_str = meta_span.get_text(strip=True) if meta_span else ''
            
            slot_match = None
            for c in classes:
                m = re.match(r'slt-(\d{2})(\d{2})-(\d+)', c)
                if m:
                    slot_match = m
                    break
                    
            if slot_match:
                start_hour = int(slot_match.group(1))
                start_min = int(slot_match.group(2))
                slots_count = int(slot_match.group(3))
            else:
                start_hour = 18
                start_min = 0
                slots_count = 1
                
            duration_mins = slots_count * 30
            total_start_mins = start_hour * 60 + start_min
            total_end_mins = total_start_mins + duration_mins
            end_hour = (total_end_mins // 60) % 24
            end_min = total_end_mins % 60
            
            start_str = f"{start_hour:02d}:{start_min:02d}"
            end_str = f"{end_hour:02d}:{end_min:02d}"
            
            is_movie = 'is-movie' in classes
            is_sport = 'is-sport' in classes
            tag = "Movie" if is_movie else ("Live Sport" if is_sport else "Featured")
            desc = f"{title}. Live on Sky TV ({time_str})."
            
            shows.append({
                "id": f"{ch_num}-{start_hour}{start_min}",
                "title": title,
                "timeStr": time_str,
                "start": start_str,
                "end": end_str,
                "startHour": start_hour,
                "startMin": start_min,
                "durationMinutes": duration_mins,
                "tag": tag,
                "desc": desc,
                "isMovie": is_movie,
                "isSport": is_sport
            })
            
        channels_by_num[ch_num] = {
            "name": ch_name,
            "number": ch_num,
            "shows": shows
        }

    output_channels = {}
    for ch_id, mytelly_num in CHANNEL_MAPPING.items():
        meta = CHANNEL_NAMES[ch_id]
        mytelly_data = channels_by_num.get(mytelly_num)
        
        if mytelly_data and mytelly_data['shows']:
            shows = mytelly_data['shows']
            source_name = mytelly_data['name']
        else:
            shows = [
                {"id": f"{ch_id}-1800", "title": f"{meta[0]} Live", "timeStr": "6:00 pm", "start": "18:00", "end": "20:00", "startHour": 18, "startMin": 0, "durationMinutes": 120, "tag": "Live", "desc": f"Live coverage on {meta[0]}."},
                {"id": f"{ch_id}-2000", "title": f"{meta[0]} Primetime", "timeStr": "8:00 pm", "start": "20:00", "end": "22:00", "startHour": 20, "startMin": 0, "durationMinutes": 120, "tag": "Primetime", "desc": f"Evening showcase on {meta[0]}."},
                {"id": f"{ch_id}-2200", "title": f"{meta[0]} Late Edition", "timeStr": "10:00 pm", "start": "22:00", "end": "24:00", "startHour": 22, "startMin": 0, "durationMinutes": 120, "tag": "Late", "desc": f"Night broadcast on {meta[0]}."}
            ]
            source_name = meta[0]
            
        output_channels[ch_id] = {
            "id": ch_id,
            "name": meta[0],
            "chNumber": meta[1],
            "genre": meta[2],
            "sourceChNumber": mytelly_num,
            "sourceName": source_name,
            "shows": shows
        }
        
    import time
    return {
        "status": "success",
        "timestamp": int(time.time()),
        "source": "https://www.mytelly.co.uk/tv-guide/listings/SkyNight.html",
        "channels": output_channels
    }

def get_epg_data():
    global EPG_CACHE, EPG_CACHE_TIME
    import time
    now = time.time()
    
    # 1. Return in-memory cache if < 30 minutes old
    if EPG_CACHE and (now - EPG_CACHE_TIME < 1800):
        return EPG_CACHE
        
    cache_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mytelly_epg_cache.json")
    
    # 2. Check disk cache if < 30 minutes old
    if os.path.exists(cache_path):
        try:
            mtime = os.path.getmtime(cache_path)
            if (now - mtime < 1800):
                with open(cache_path, 'r', encoding='utf-8') as f:
                    EPG_CACHE = json.load(f)
                    EPG_CACHE_TIME = mtime
                    return EPG_CACHE
        except Exception:
            pass

    # 3. Fetch live from MyTelly
    try:
        req = urllib.request.Request(
            'https://www.mytelly.co.uk/tv-guide/listings/SkyNight.html',
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-GB,en;q=0.9'
            }
        )
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            data = parse_mytelly_listings(html)
            if data and len(data.get('channels', {})) > 0:
                EPG_CACHE = data
                EPG_CACHE_TIME = now
                with open(cache_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2)
                return EPG_CACHE
    except Exception as e:
        print(f"[EPG] Remote fetch warning: {e}")
        
    # 4. Fallback to existing disk file
    if os.path.exists(cache_path):
        try:
            with open(cache_path, 'r', encoding='utf-8') as f:
                EPG_CACHE = json.load(f)
                EPG_CACHE_TIME = now
                return EPG_CACHE
        except Exception:
            pass
            
    return {"status": "error", "message": "EPG data unavailable"}

def proxy_hls_stream(handler, target_url, referer_override=None):
    if not target_url:
        handler.send_response(400)
        handler.send_header('Content-Type', 'text/plain')
        handler.end_headers()
        handler.wfile.write(b"Missing target url")
        return

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': '*/*'
    }
    if referer_override:
        headers['Referer'] = referer_override

    try:
        req = urllib.request.Request(target_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as upstream:
            content = upstream.read()
            content_type = upstream.headers.get('Content-Type', 'application/octet-stream')
            
            is_m3u8 = (
                target_url.endswith('.m3u8') or
                'mpegurl' in content_type.lower() or
                content.startswith(b'#EXTM3U')
            )
            
            if is_m3u8:
                text = content.decode('utf-8', errors='ignore')
                lines = text.splitlines()
                rewritten = []
                for line in lines:
                    stripped = line.strip()
                    if not stripped:
                        rewritten.append(line)
                    elif stripped.startswith('#'):
                        if 'URI="' in line:
                            def replace_uri(match):
                                uri = match.group(1)
                                full_uri = urllib.parse.urljoin(target_url, uri)
                                proxy_uri = f"/api/proxy/hls?url={urllib.parse.quote(full_uri, safe='')}"
                                if referer_override:
                                    proxy_uri += f"&ref={urllib.parse.quote(referer_override, safe='')}"
                                return f'URI="{proxy_uri}"'
                            line = re.sub(r'URI="([^"]+)"', replace_uri, line)
                        rewritten.append(line)
                    else:
                        full_line_url = urllib.parse.urljoin(target_url, stripped)
                        proxy_line = f"/api/proxy/hls?url={urllib.parse.quote(full_line_url, safe='')}"
                        if referer_override:
                            proxy_line += f"&ref={urllib.parse.quote(referer_override, safe='')}"
                        rewritten.append(proxy_line)
                
                body = ('\n'.join(rewritten)).encode('utf-8')
                handler.send_response(200)
                handler.send_header('Content-Type', 'application/vnd.apple.mpegurl')
                handler.send_header('Access-Control-Allow-Origin', '*')
                handler.send_header('Cache-Control', 'no-cache, no-store')
                handler.end_headers()
                handler.wfile.write(body)
            else:
                handler.send_response(200)
                handler.send_header('Content-Type', content_type)
                handler.send_header('Access-Control-Allow-Origin', '*')
                handler.send_header('Cache-Control', 'public, max-age=3600')
                handler.end_headers()
                handler.wfile.write(content)
    except Exception as e:
        handler.send_response(502)
        handler.send_header('Content-Type', 'application/json')
        handler.send_header('Access-Control-Allow-Origin', '*')
        handler.end_headers()
        handler.wfile.write(json.dumps({"error": f"Upstream proxy error: {str(e)}"}).encode('utf-8'))

def proxy_embed(handler, target_url):
    if not target_url:
        handler.send_response(400)
        handler.end_headers()
        return

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
    try:
        req = urllib.request.Request(target_url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as upstream:
            html = upstream.read().decode('utf-8', errors='ignore')

            # Strip external ad iframes, popunder banners, and ad network trackers
            html = re.sub(r'<iframe[^>]+(?:ad|banner|UK300|syndication|click|pop)[^>]*>.*?</iframe>', '', html, flags=re.IGNORECASE | re.DOTALL)
            html = re.sub(r'<iframe[^>]+src=["\'][^"\']*(?:ad|banner|UK300|popcash|adsterra|popads|propeller)[^"\']*["\'][^>]*>.*?</iframe>', '', html, flags=re.IGNORECASE | re.DOTALL)
            html = re.sub(r'<script[^>]+src=["\'][^"\']*(?:popcash|adsterra|popads|propeller|syndication|monetag|alwingulla)[^"\']*["\'][^>]*>.*?</script>', '', html, flags=re.IGNORECASE | re.DOTALL)

            injected = f"""
            <base href="{target_url}">
            <style>
              body, html {{ margin:0 !important; padding:0 !important; width:100% !important; height:100% !important; overflow:hidden !important; background:#000 !important; }}
              #header, #footer, .footer, .header, .ad, .ads, .advertisement, [id*="ad_"], [class*="banner"], [id*="banner"], [class*="ad-"], div[style*="z-index: 999999"], div[style*="z-index:999999"] {{ display: none !important; opacity: 0 !important; pointer-events: none !important; width: 0 !important; height: 0 !important; }}
              video, #player, #player-wrapper, .clappr-player, [data-player] {{ width: 100vw !important; height: 100vh !important; max-width: 100vw !important; max-height: 100vh !important; }}
            </style>
            <script>
              window.open = function() {{ return null; }};
              window.alert = function() {{}};
              window.confirm = function() {{ return false; }};
              window.prompt = function() {{ return null; }};
              window.onbeforeunload = null;
              try {{ Object.defineProperty(window, 'top', {{ get: () => window.self }}); }} catch(e){{}}
              // Continuously purge ad elements
              setInterval(function() {{
                try {{
                  var ads = document.querySelectorAll('iframe[src*="ad"], iframe[src*="UK300"], div[class*="ad-overlay"]');
                  for (var i = 0; i < ads.length; i++) {{
                    ads[i].remove();
                  }}
                }} catch(e) {{}}
              }}, 1000);
            </script>
            """
            modified_html = html.replace('<head>', f'<head>{injected}', 1) if '<head>' in html else (injected + html)
            handler.send_response(200)
            handler.send_header('Content-Type', 'text/html; charset=utf-8')
            handler.send_header('Access-Control-Allow-Origin', '*')
            handler.end_headers()
            handler.wfile.write(modified_html.encode('utf-8'))
    except Exception as e:
        handler.send_response(502)
        handler.send_header('Content-Type', 'text/html; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(f"<h3>Proxy Error: {e}</h3>".encode('utf-8'))

class IVTVRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # Universal HLS/CORS Reverse Proxy: /api/proxy/hls?url=...&ref=...
        if parsed.path == '/api/proxy/hls':
            params = urllib.parse.parse_qs(parsed.query)
            target_url = params.get('url', [''])[0]
            referer = params.get('ref', [None])[0]
            proxy_hls_stream(self, target_url, referer)
            return

        # Clean Webview Proxy Embed: /api/proxy/embed?url=...
        if parsed.path == '/api/proxy/embed':
            params = urllib.parse.parse_qs(parsed.query)
            target_url = params.get('url', [''])[0]
            proxy_embed(self, target_url)
            return

        # API Stream Endpoint: /api/stream?channel=sky-sports-premier-league-uk
        if parsed.path == '/api/stream':
            params = urllib.parse.parse_qs(parsed.query)
            channel_id = params.get('channel', [''])[0]
            
            result = get_clean_stream(channel_id)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))
            return

        # API EPG Listings Endpoint: /api/epg
        if parsed.path == '/api/epg':
            data = get_epg_data()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Cache-Control', 'public, max-age=600')
            self.end_headers()
            self.wfile.write(json.dumps(data).encode('utf-8'))
            return
            
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # API Token Refresh Endpoint
        if parsed.path == '/api/refresh_token':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            
            try:
                req = urllib.request.Request(
                    'https://wideiptv.top/api/refresh_token.php',
                    data=body,
                    headers={
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0',
                        'Referer': 'https://wideiptv.top/'
                    }
                )
                res = urllib.request.urlopen(req, timeout=5)
                resp_data = res.read()
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(resp_data)
                return
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
                return
                
        self.send_response(404)
        self.end_headers()

if __name__ == '__main__':
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), IVTVRequestHandler) as httpd:
        print(f"IVTV Clean Ad-Free Server running at http://localhost:{PORT}")
        sys.stdout.flush()
        httpd.serve_forever()
