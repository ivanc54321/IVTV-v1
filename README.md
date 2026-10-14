# IVTV — Cinematic UK & Sky Channel IPTV Web Player

An ultra-modern, dark-glass live streaming web application inspired by the **CinemaOS** dark aesthetic. Aggregates and streams **45 live UK & Sky TV channels** in high definition with official broadcast logos, theater playback, live status indicators, giant outlined rankings, real-time EPG TV Guide, and instant in-player channel-surfing.

---

## 🌟 Key Features

1. **Dark-Glass Cinema Aesthetics & Official Channel Logos**:
   - Deep obsidian canvas (`#060908`) with emerald radial glows and frosted glass surfaces (`backdrop-filter: blur(20px)`).
   - High-fidelity **official channel logos** on every channel card, in the Top 10 rankings, in the EPG TV Guide, and inside the theater player.
   - Dual-mode asset pipeline: zero-latency local logos (`assets/logos/*.png`) with remote CDN fallback.
   - Floating glassmorphic navbar with live HD badge, category filters (Sports, Cinema, Entertainment, News), and instant search.

2. **All UK Channels Directory Section**:
   - Comprehensive directory showcasing **all 49 verified UK & Sky channels** in one dedicated homepage section.
   - Interactive subcategory filter tabs (**All**, **Sports**, **Cinema**, **Entertainment**, **News**) with live channel count badges.
   - Dual layout mode: responsive **Multi-Row CSS Grid** or smooth horizontal **Carousel Track**.
   - Flexible sorting: **Channel Number (LCN)**, **Most Viewed 🔥**, **Name (A–Z)**, and **Top Rated ★**.
   - Instant in-section quick filter search for rapid channel discovery.

3. **Top 10 Channels with Giant Outlined Numerals**:
   - Signature hollow stroke numbers (`1`, `2`, `3`...) sitting beside top-ranked channels sorted dynamically by viewership.
   - Interactive hover cards with glowing neon borders, live pulse dots, view counts, and 1-click play triggers.

4. **Cinema Theater Stream Player**:
   - 16:9 responsive theater modal with smooth zoom transitions and loading spinners.
   - Displays active channel logo, channel number (LCN), and real-time broadcast ticker.
   - Fullscreen mode, pop-out external player, stream reload button, and favorite toggle.
   - **In-Player Quick Channel Surf Drawer**: Switch between live channels without closing playback mode!
   - Built-in VPN / ISP streaming advisory helper.

5. **49 Verified UK & Sky Channels**:
   - **Live Sports Arena (14 Channels)**: Sky Sports F1, Premier League, Main Event, Tennis, Football, Cricket, Golf, Action, Racing, News, Mix, Plus, LaLiga, Rally TV, Trace Sports.
   - **Sky Cinema & Movies (11 Channels)**: Premiere, Select, Hits, Greats, Family, Action, Comedy, Thriller, Drama, Sci-Fi Horror, Film4.
   - **UK Entertainment & Series (15 Channels)**: BBC One, BBC Two, BBC Three, ITV1, ITV2, ITV3, ITV4, Sky Atlantic, Sky Showcase, Sky Comedy, Sky Crime, Sky Arts, Sky History, Gold, S4C.
   - **News & Current Affairs (9 Channels)**: Sky News, BBC News UK, Bloomberg Television, CNN International, Russia Today (RT), GB News, Al Jazeera English, Reuters Live.

5. **Live TV Guide (EPG)**:
   - Full schedule timeline grid with red vertical real-time "NOW" marker.
   - Sticky channel column featuring official logos and channel numbers.
   - Detailed program modals with synopses, remaining runtime, and direct tune-in buttons.

6. **Real-Time Search & Watchlist**:
   - Instant search across channel names, LCN numbers (e.g. `101`, `402`), genres, and categories (press `/` to focus).
   - Persistent LocalStorage favorites and recently watched history.

---

## 🚀 How to Run

1. Open a terminal in the project directory:
   ```bash
   cd c:\Users\ivanc\Downloads\IVTV
   ```
2. Start any local web server:
   - **Python**: `python -m http.server 5173`
   - **Node / npx**: `npx serve -l 5173`
3. Open your browser at `http://localhost:5173` (or simply open `index.html` directly in any modern browser).
