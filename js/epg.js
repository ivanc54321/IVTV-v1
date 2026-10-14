/* ==========================================================================
   IVTV ELECTRONIC PROGRAMME GUIDE (EPG) ENGINE
   Authentic Real-Time TV Listings Derived from MyTelly UK Sky Night Listings
   (https://www.mytelly.co.uk/tv-guide/listings/SkyNight.html)
   Synchronized via /api/epg REST Endpoint & Local Cache
   ========================================================================== */

const MYTELLY_EPG_SEED = {
  "sky-sports-f1-uk": [
    {
      "id": "407-180",
      "title": "Formula 1",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Formula 1. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "407-190",
      "title": "Formula 1",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "20:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Formula 1. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "407-200",
      "title": "Formula 1",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Formula 1. Broadcast live on Sky TV (8:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "407-210",
      "title": "Formula 1",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Formula 1. Broadcast live on Sky TV (9:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "407-220",
      "title": "Formula 1",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "23:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Formula 1. Broadcast live on Sky TV (10:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "407-230",
      "title": "Formula 1",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Formula 1. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-premier-league-uk": [
    {
      "id": "402-180",
      "title": "The Premier League Show",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "The Premier League Show. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "402-190",
      "title": "Soccer Special",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "22:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 210,
      "tag": "Live Sport",
      "desc": "Soccer Special. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "402-2230",
      "title": "Premier League Review",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:30",
      "startHour": 22,
      "startMin": 30,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Premier League Review. Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "402-2330",
      "title": "Netbusters",
      "timeStr": "11:30 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Netbusters. Broadcast live on Sky TV (11:30 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-tennis-uk": [
    {
      "id": "408-180",
      "title": "Tennis",
      "timeStr": "5:30 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Tennis. Broadcast live on Sky TV (5:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "408-1830",
      "title": "Tennis",
      "timeStr": "6:30 pm",
      "start": "18:30",
      "end": "19:00",
      "startHour": 18,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Tennis. Broadcast live on Sky TV (6:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "408-190",
      "title": "Tennis",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "20:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 90,
      "tag": "Live Sport",
      "desc": "Tennis. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "408-2030",
      "title": "Tennis",
      "timeStr": "8:30 pm",
      "start": "20:30",
      "end": "22:00",
      "startHour": 20,
      "startMin": 30,
      "duration": 90,
      "tag": "Live Sport",
      "desc": "Tennis. Broadcast live on Sky TV (8:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "408-220",
      "title": "Tennis",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "22:30",
      "startHour": 22,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Tennis. Broadcast live on Sky TV (10:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "408-2230",
      "title": "Tennis",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Tennis. Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "408-230",
      "title": "Tennis",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Tennis. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-action-uk": [
    {
      "id": "404-180",
      "title": "The Premier League Show",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "The Premier League Show. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-190",
      "title": "Soccer Special",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "19:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Soccer Special. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-1930",
      "title": "Live EFL",
      "timeStr": "7:35 pm",
      "start": "19:30",
      "end": "21:30",
      "startHour": 19,
      "startMin": 30,
      "duration": 120,
      "tag": "Live Sport",
      "desc": "Live EFL. Broadcast live on Sky TV (7:35 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-2130",
      "title": "Soccer Special",
      "timeStr": "9:45 pm",
      "start": "21:30",
      "end": "22:30",
      "startHour": 21,
      "startMin": 30,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Soccer Special. Broadcast live on Sky TV (9:45 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-2230",
      "title": "Paper Talk",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Paper Talk. Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-230",
      "title": "Sky Sports News",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "23:30",
      "startHour": 23,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Sky Sports News. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-2330",
      "title": "Live NBA Basketball",
      "timeStr": "11:30 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Live NBA Basketball. Broadcast live on Sky TV (11:30 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-main-event-live-uk": [
    {
      "id": "401-180",
      "title": "The Premier League Show",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "The Premier League Show. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "401-190",
      "title": "Soccer Special",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "19:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Soccer Special. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "401-1930",
      "title": "Live EFL",
      "timeStr": "7:30 pm",
      "start": "19:30",
      "end": "22:30",
      "startHour": 19,
      "startMin": 30,
      "duration": 180,
      "tag": "Live Sport",
      "desc": "Live EFL. Broadcast live on Sky TV (7:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "401-2230",
      "title": "Paper Talk",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Paper Talk. Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "401-230",
      "title": "Sky Sports News",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "23:30",
      "startHour": 23,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Sky Sports News. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "401-2330",
      "title": "Live NBA Basketball",
      "timeStr": "11:30 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Live NBA Basketball. Broadcast live on Sky TV (11:30 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-cricket-uk": [
    {
      "id": "405-180",
      "title": "Test Cricket",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Test Cricket. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "405-190",
      "title": "Test Cricket",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "20:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Test Cricket. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "405-200",
      "title": "Test Cricket Bitesize",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "20:30",
      "startHour": 20,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Test Cricket Bitesize. Broadcast live on Sky TV (8:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "405-2030",
      "title": "Test Cricket Bitesize",
      "timeStr": "8:30 pm",
      "start": "20:30",
      "end": "21:00",
      "startHour": 20,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Test Cricket Bitesize. Broadcast live on Sky TV (8:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "405-210",
      "title": "Test Cricket",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Test Cricket. Broadcast live on Sky TV (9:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "405-220",
      "title": "Test Cricket",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "23:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Test Cricket. Broadcast live on Sky TV (10:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "405-230",
      "title": "Test Cricket Bitesize",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "23:30",
      "startHour": 23,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Test Cricket Bitesize. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "405-2330",
      "title": "Test Cricket Bitesize",
      "timeStr": "11:30 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Test Cricket Bitesize. Broadcast live on Sky TV (11:30 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-golf-uk": [
    {
      "id": "406-180",
      "title": "Ladies European Tour Golf",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Ladies European Tour Golf. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "406-190",
      "title": "Golf",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "22:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 180,
      "tag": "Live Sport",
      "desc": "Golf. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "406-220",
      "title": "Ladies European Tour Golf",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "23:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Ladies European Tour Golf. Broadcast live on Sky TV (10:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "406-230",
      "title": "PGA Tour Golf",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "PGA Tour Golf. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-racing-uk": [
    {
      "id": "415-180",
      "title": "Raceday Live",
      "timeStr": "1:15 pm",
      "start": "18:00",
      "end": "21:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 180,
      "tag": "Live Sport",
      "desc": "Raceday Live. Broadcast live on Sky TV (1:15 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "415-210",
      "title": "Stateside Live",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Stateside Live. Broadcast live on Sky TV (9:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "415-220",
      "title": "Ed Walker: Glory Days",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "22:30",
      "startHour": 22,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Ed Walker: Glory Days. Broadcast live on Sky TV (10:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "415-2230",
      "title": "Unbridled On Tour",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Unbridled On Tour. Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "415-230",
      "title": "The Race Ahead",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "The Race Ahead. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-news-uk": [
    {
      "id": "409-180",
      "title": "The Premier League Show",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "The Premier League Show. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "409-190",
      "title": "Soccer Special",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "22:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 210,
      "tag": "Live Sport",
      "desc": "Soccer Special. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "409-2230",
      "title": "Paper Talk",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Paper Talk. Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "409-230",
      "title": "Sky Sports News",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Sky Sports News. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-mix-uk": [
    {
      "id": "416-180",
      "title": "Formula 1",
      "timeStr": "5:30 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Formula 1. Broadcast live on Sky TV (5:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "416-1830",
      "title": "PGA Tour Golf",
      "timeStr": "6:30 pm",
      "start": "18:30",
      "end": "19:30",
      "startHour": 18,
      "startMin": 30,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "PGA Tour Golf. Broadcast live on Sky TV (6:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "416-1930",
      "title": "Spirit of Yachting",
      "timeStr": "7:30 pm",
      "start": "19:30",
      "end": "20:00",
      "startHour": 19,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Spirit of Yachting. Broadcast live on Sky TV (7:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "416-200",
      "title": "Betfred Super League",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "22:30",
      "startHour": 20,
      "startMin": 0,
      "duration": 150,
      "tag": "Live Sport",
      "desc": "Betfred Super League. Broadcast live on Sky TV (8:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "416-2230",
      "title": "Betfred Super League Highlights",
      "timeStr": "10:45 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Betfred Super League Highlights. Broadcast live on Sky TV (10:45 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "416-230",
      "title": "NFL Highlights",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "NFL Highlights. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-football-uk": [
    {
      "id": "403-180",
      "title": "EFL League One Goals",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "EFL League One Goals. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-1830",
      "title": "EFL League Two Goals",
      "timeStr": "6:30 pm",
      "start": "18:30",
      "end": "19:00",
      "startHour": 18,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "EFL League Two Goals. Broadcast live on Sky TV (6:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-190",
      "title": "Soccer Special",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "19:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Soccer Special. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-1930",
      "title": "Live EFL",
      "timeStr": "7:30 pm",
      "start": "19:30",
      "end": "22:30",
      "startHour": 19,
      "startMin": 30,
      "duration": 180,
      "tag": "Live Sport",
      "desc": "Live EFL. Broadcast live on Sky TV (7:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-2230",
      "title": "SPFL Round-Up",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "SPFL Round-Up. Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-230",
      "title": "EFL Greatest Games",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "23:30",
      "startHour": 23,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "EFL Greatest Games. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-2330",
      "title": "EFL Greatest Games",
      "timeStr": "11:30 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "EFL Greatest Games. Broadcast live on Sky TV (11:30 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-plus-uk": [
    {
      "id": "404-180",
      "title": "The Premier League Show",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "The Premier League Show. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-190",
      "title": "Soccer Special",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "19:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Soccer Special. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-1930",
      "title": "Live EFL",
      "timeStr": "7:35 pm",
      "start": "19:30",
      "end": "21:30",
      "startHour": 19,
      "startMin": 30,
      "duration": 120,
      "tag": "Live Sport",
      "desc": "Live EFL. Broadcast live on Sky TV (7:35 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-2130",
      "title": "Soccer Special",
      "timeStr": "9:45 pm",
      "start": "21:30",
      "end": "22:30",
      "startHour": 21,
      "startMin": 30,
      "duration": 60,
      "tag": "Live Sport",
      "desc": "Soccer Special. Broadcast live on Sky TV (9:45 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-2230",
      "title": "Paper Talk",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Paper Talk. Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-230",
      "title": "Sky Sports News",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "23:30",
      "startHour": 23,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Sky Sports News. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "404-2330",
      "title": "Live NBA Basketball",
      "timeStr": "11:30 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Live NBA Basketball. Broadcast live on Sky TV (11:30 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-sports-laliga-uk": [
    {
      "id": "403-180",
      "title": "EFL League One Goals",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "EFL League One Goals. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-1830",
      "title": "EFL League Two Goals",
      "timeStr": "6:30 pm",
      "start": "18:30",
      "end": "19:00",
      "startHour": 18,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "EFL League Two Goals. Broadcast live on Sky TV (6:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-190",
      "title": "Soccer Special",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "19:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "Soccer Special. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-1930",
      "title": "Live EFL",
      "timeStr": "7:30 pm",
      "start": "19:30",
      "end": "22:30",
      "startHour": 19,
      "startMin": 30,
      "duration": 180,
      "tag": "Live Sport",
      "desc": "Live EFL. Broadcast live on Sky TV (7:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-2230",
      "title": "SPFL Round-Up",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "SPFL Round-Up. Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-230",
      "title": "EFL Greatest Games",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "23:30",
      "startHour": 23,
      "startMin": 0,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "EFL Greatest Games. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": true
    },
    {
      "id": "403-2330",
      "title": "EFL Greatest Games",
      "timeStr": "11:30 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Live Sport",
      "desc": "EFL Greatest Games. Broadcast live on Sky TV (11:30 pm).",
      "isMovie": false,
      "isSport": true
    }
  ],
  "sky-atlantic-uk": [
    {
      "id": "108-180",
      "title": "House of the Dragon",
      "timeStr": "5:40 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "Featured",
      "desc": "House of the Dragon. Broadcast live on Sky TV (5:40 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "108-1830",
      "title": "House of the Dragon",
      "timeStr": "6:50 pm",
      "start": "18:30",
      "end": "20:00",
      "startHour": 18,
      "startMin": 30,
      "duration": 90,
      "tag": "Featured",
      "desc": "House of the Dragon. Broadcast live on Sky TV (6:50 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "108-200",
      "title": "Fargo",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Fargo. Broadcast live on Sky TV (8:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "108-210",
      "title": "Prisoner",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Prisoner. Broadcast live on Sky TV (9:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "108-220",
      "title": "Prisoner",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "23:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Prisoner. Broadcast live on Sky TV (10:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "108-230",
      "title": "Das Boot",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Das Boot. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": false
    }
  ],
  "sky-showcase": [
    {
      "id": "106-180",
      "title": "Superstore",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "Featured",
      "desc": "Superstore. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "106-1830",
      "title": "Superstore",
      "timeStr": "6:30 pm",
      "start": "18:30",
      "end": "19:00",
      "startHour": 18,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "Superstore. Broadcast live on Sky TV (6:30 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "106-190",
      "title": "The Simpsons",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "19:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 30,
      "tag": "Featured",
      "desc": "The Simpsons. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "106-1930",
      "title": "The Simpsons",
      "timeStr": "7:30 pm",
      "start": "19:30",
      "end": "20:00",
      "startHour": 19,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "The Simpsons. Broadcast live on Sky TV (7:30 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "106-200",
      "title": "The Dyers' Caravan Park",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "The Dyers' Caravan Park. Broadcast live on Sky TV (8:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "106-210",
      "title": "Gemma Collins: Everything. All...",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "21:30",
      "startHour": 21,
      "startMin": 0,
      "duration": 30,
      "tag": "Featured",
      "desc": "Gemma Collins: Everything. All.... Broadcast live on Sky TV (9:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "106-2130",
      "title": "Never Mind the Buzzcocks",
      "timeStr": "9:45 pm",
      "start": "21:30",
      "end": "22:30",
      "startHour": 21,
      "startMin": 30,
      "duration": 60,
      "tag": "Featured",
      "desc": "Never Mind the Buzzcocks. Broadcast live on Sky TV (9:45 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "106-2230",
      "title": "Karl Pilkington: The Moaning o...",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:30",
      "startHour": 22,
      "startMin": 30,
      "duration": 60,
      "tag": "Featured",
      "desc": "Karl Pilkington: The Moaning o.... Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "106-2330",
      "title": "Grimm",
      "timeStr": "11:30 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "Grimm. Broadcast live on Sky TV (11:30 pm).",
      "isMovie": false,
      "isSport": false
    }
  ],
  "sky-comedy-uk": [
    {
      "id": "113-180",
      "title": "Will & Grace",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "Featured",
      "desc": "Will & Grace. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "113-1830",
      "title": "Will & Grace",
      "timeStr": "6:30 pm",
      "start": "18:30",
      "end": "19:00",
      "startHour": 18,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "Will & Grace. Broadcast live on Sky TV (6:30 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "113-190",
      "title": "The Office (US)",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "19:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 30,
      "tag": "Featured",
      "desc": "The Office (US). Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "113-1930",
      "title": "The Office (US)",
      "timeStr": "7:30 pm",
      "start": "19:30",
      "end": "20:00",
      "startHour": 19,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "The Office (US). Broadcast live on Sky TV (7:30 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "113-200",
      "title": "Resident Alien",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Resident Alien. Broadcast live on Sky TV (8:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "113-210",
      "title": "Saturday Night Live UK",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Saturday Night Live UK. Broadcast live on Sky TV (9:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "113-220",
      "title": "Saturday Night Live",
      "timeStr": "10:15 pm",
      "start": "22:00",
      "end": "23:30",
      "startHour": 22,
      "startMin": 0,
      "duration": 90,
      "tag": "Featured",
      "desc": "Saturday Night Live. Broadcast live on Sky TV (10:15 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "113-2330",
      "title": "The Baby",
      "timeStr": "11:45 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "The Baby. Broadcast live on Sky TV (11:45 pm).",
      "isMovie": false,
      "isSport": false
    }
  ],
  "sky-crime-uk": [
    {
      "id": "121-180",
      "title": "How I Caught the Killer",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "How I Caught the Killer. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "121-190",
      "title": "Britain's Most Evil Killers",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "20:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Britain's Most Evil Killers. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "121-200",
      "title": "Forensics: Catching the Killer",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Forensics: Catching the Killer. Broadcast live on Sky TV (8:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "121-210",
      "title": "Rifkin on Rifkin: Private Conf...",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:30",
      "startHour": 21,
      "startMin": 0,
      "duration": 90,
      "tag": "Featured",
      "desc": "Rifkin on Rifkin: Private Conf.... Broadcast live on Sky TV (9:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "121-2230",
      "title": "Britain's Most Evil Killers",
      "timeStr": "10:45 pm",
      "start": "22:30",
      "end": "23:30",
      "startHour": 22,
      "startMin": 30,
      "duration": 60,
      "tag": "Featured",
      "desc": "Britain's Most Evil Killers. Broadcast live on Sky TV (10:45 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "121-2330",
      "title": "Killer in My Village",
      "timeStr": "11:50 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "Killer in My Village. Broadcast live on Sky TV (11:50 pm).",
      "isMovie": false,
      "isSport": false
    }
  ],
  "sky-history-uk": [
    {
      "id": "123-180",
      "title": "American Pickers",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "American Pickers. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "123-190",
      "title": "Forged in Fire",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "20:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Forged in Fire. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "123-200",
      "title": "Pawn Stars",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Pawn Stars. Broadcast live on Sky TV (8:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "123-210",
      "title": "Mafia: Behind the Bloodshed",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Mafia: Behind the Bloodshed. Broadcast live on Sky TV (9:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "123-220",
      "title": "History's Greatest Mysteries",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "23:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "History's Greatest Mysteries. Broadcast live on Sky TV (10:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "123-230",
      "title": "The Proof Is Out There",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "The Proof Is Out There. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": false
    }
  ],
  "sky-arts-uk": [
    {
      "id": "122-180",
      "title": "Tales of the Unexpected",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "Featured",
      "desc": "Tales of the Unexpected. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "122-1830",
      "title": "Tales of the Unexpected",
      "timeStr": "6:30 pm",
      "start": "18:30",
      "end": "19:00",
      "startHour": 18,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "Tales of the Unexpected. Broadcast live on Sky TV (6:30 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "122-190",
      "title": "The Alfred Hitchcock Hour",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "20:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "The Alfred Hitchcock Hour. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "122-200",
      "title": "Stories from the National Port...",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Stories from the National Port.... Broadcast live on Sky TV (8:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "122-210",
      "title": "The Sky Arts Awards",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "23:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 120,
      "tag": "Featured",
      "desc": "The Sky Arts Awards. Broadcast live on Sky TV (9:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "122-230",
      "title": "The Movies",
      "timeStr": "11:05 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "The Movies. Broadcast live on Sky TV (11:05 pm).",
      "isMovie": false,
      "isSport": false
    }
  ],
  "sky-news": [
    {
      "id": "501-180",
      "title": "The News Hour with Mark Austin",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "Featured",
      "desc": "The News Hour with Mark Austin. Broadcast live on Sky TV (6:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "501-1830",
      "title": "The News Hour with Mark Austin",
      "timeStr": "6:30 pm",
      "start": "18:30",
      "end": "19:00",
      "startHour": 18,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "The News Hour with Mark Austin. Broadcast live on Sky TV (6:30 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "501-190",
      "title": "The Cathy Newman Show",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "20:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "The Cathy Newman Show. Broadcast live on Sky TV (7:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "501-200",
      "title": "Sky News",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "Sky News. Broadcast live on Sky TV (8:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "501-210",
      "title": "The World with Yalda Hakim",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 60,
      "tag": "Featured",
      "desc": "The World with Yalda Hakim. Broadcast live on Sky TV (9:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "501-220",
      "title": "The Wrap with Anna Botting",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "22:30",
      "startHour": 22,
      "startMin": 0,
      "duration": 30,
      "tag": "Featured",
      "desc": "The Wrap with Anna Botting. Broadcast live on Sky TV (10:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "501-2230",
      "title": "The Wrap with Anna Botting",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "The Wrap with Anna Botting. Broadcast live on Sky TV (10:30 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "501-230",
      "title": "The Wrap with Anna Botting",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "23:30",
      "startHour": 23,
      "startMin": 0,
      "duration": 30,
      "tag": "Featured",
      "desc": "The Wrap with Anna Botting. Broadcast live on Sky TV (11:00 pm).",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "501-2330",
      "title": "The Wrap with Anna Botting",
      "timeStr": "11:30 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Featured",
      "desc": "The Wrap with Anna Botting. Broadcast live on Sky TV (11:30 pm).",
      "isMovie": false,
      "isSport": false
    }
  ],
  "sky-cinema-premiere-uk": [
    {
      "id": "301-180",
      "title": "The Deb (2024)",
      "timeStr": "4:10 pm",
      "start": "18:00",
      "end": "20:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "The Deb (2024). Broadcast live on Sky TV (4:10 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "301-200",
      "title": "Mother's Pride (2026)",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:30",
      "startHour": 20,
      "startMin": 0,
      "duration": 90,
      "tag": "Movie",
      "desc": "Mother's Pride (2026). Broadcast live on Sky TV (8:00 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "301-2130",
      "title": "The Crow (2024)",
      "timeStr": "9:40 pm",
      "start": "21:30",
      "end": "23:30",
      "startHour": 21,
      "startMin": 30,
      "duration": 120,
      "tag": "Movie",
      "desc": "The Crow (2024). Broadcast live on Sky TV (9:40 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "301-2330",
      "title": "Mexicali (2026)",
      "timeStr": "11:40 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Movie",
      "desc": "Mexicali (2026). Broadcast live on Sky TV (11:40 pm).",
      "isMovie": true,
      "isSport": false
    }
  ],
  "sky-cinema-select-uk": [
    {
      "id": "302-180",
      "title": "Cloudy with a Chance of Meatballs 2 (2013)",
      "timeStr": "5:35 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Movie",
      "desc": "Cloudy with a Chance of Meatballs 2 (2013). Broadcast live on Sky TV (5:35 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "302-190",
      "title": "Penguins of Madagascar (2014)",
      "timeStr": "7:15 pm",
      "start": "19:00",
      "end": "21:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "Penguins of Madagascar (2014). Broadcast live on Sky TV (7:15 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "302-210",
      "title": "Wallace & Gromit in The Curse ... (2005)",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:30",
      "startHour": 21,
      "startMin": 0,
      "duration": 90,
      "tag": "Movie",
      "desc": "Wallace & Gromit in The Curse ... (2005). Broadcast live on Sky TV (9:00 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "302-2230",
      "title": "Monster House (2006)",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "00:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 90,
      "tag": "Movie",
      "desc": "Monster House (2006). Broadcast live on Sky TV (10:30 pm).",
      "isMovie": true,
      "isSport": false
    }
  ],
  "sky-cinema-hits-uk": [
    {
      "id": "303-180",
      "title": "They Will Kill You (2026)",
      "timeStr": "5:05 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "Movie",
      "desc": "They Will Kill You (2026). Broadcast live on Sky TV (5:05 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "303-1830",
      "title": "It (2017)",
      "timeStr": "6:45 pm",
      "start": "18:30",
      "end": "21:00",
      "startHour": 18,
      "startMin": 30,
      "duration": 150,
      "tag": "Movie",
      "desc": "It (2017). Broadcast live on Sky TV (6:45 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "303-210",
      "title": "Weapons (2025)",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "23:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "Weapons (2025). Broadcast live on Sky TV (9:00 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "303-230",
      "title": "28 Years Later: The Bone Temple (2026)",
      "timeStr": "11:10 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Movie",
      "desc": "28 Years Later: The Bone Temple (2026). Broadcast live on Sky TV (11:10 pm).",
      "isMovie": true,
      "isSport": false
    }
  ],
  "sky-cinema-greats-uk": [
    {
      "id": "307-180",
      "title": "Jerry Maguire (1996)",
      "timeStr": "5:40 pm",
      "start": "18:00",
      "end": "20:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "Jerry Maguire (1996). Broadcast live on Sky TV (5:40 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "307-200",
      "title": "Grease (1978)",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:30",
      "startHour": 20,
      "startMin": 0,
      "duration": 90,
      "tag": "Movie",
      "desc": "Grease (1978). Broadcast live on Sky TV (8:00 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "307-2130",
      "title": "Grease 2 (1982)",
      "timeStr": "9:55 pm",
      "start": "21:30",
      "end": "23:30",
      "startHour": 21,
      "startMin": 30,
      "duration": 120,
      "tag": "Movie",
      "desc": "Grease 2 (1982). Broadcast live on Sky TV (9:55 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "307-2330",
      "title": "Stand By Me (1986)",
      "timeStr": "11:50 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Movie",
      "desc": "Stand By Me (1986). Broadcast live on Sky TV (11:50 pm).",
      "isMovie": true,
      "isSport": false
    }
  ],
  "sky-cinema-family-uk": [
    {
      "id": "304-180",
      "title": "Liar Liar (1997)",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 90,
      "tag": "Movie",
      "desc": "Liar Liar (1997). Broadcast live on Sky TV (6:00 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "304-1930",
      "title": "Jumanji: Welcome to the Jungle (2017)",
      "timeStr": "7:30 pm",
      "start": "19:30",
      "end": "21:30",
      "startHour": 19,
      "startMin": 30,
      "duration": 120,
      "tag": "Movie",
      "desc": "Jumanji: Welcome to the Jungle (2017). Broadcast live on Sky TV (7:30 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "304-2130",
      "title": "Casper (1995)",
      "timeStr": "9:30 pm",
      "start": "21:30",
      "end": "23:00",
      "startHour": 21,
      "startMin": 30,
      "duration": 90,
      "tag": "Movie",
      "desc": "Casper (1995). Broadcast live on Sky TV (9:30 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "304-230",
      "title": "Jack the Giant Slayer (2013)",
      "timeStr": "11:15 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Movie",
      "desc": "Jack the Giant Slayer (2013). Broadcast live on Sky TV (11:15 pm).",
      "isMovie": true,
      "isSport": false
    }
  ],
  "sky-cinema-action-uk": [
    {
      "id": "306-180",
      "title": "Olympus Has Fallen (2013)",
      "timeStr": "4:10 pm",
      "start": "18:00",
      "end": "20:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "Olympus Has Fallen (2013). Broadcast live on Sky TV (4:10 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "306-200",
      "title": "Venom (2018)",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:30",
      "startHour": 20,
      "startMin": 0,
      "duration": 90,
      "tag": "Movie",
      "desc": "Venom (2018). Broadcast live on Sky TV (8:00 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "306-2130",
      "title": "The Running Man (2025)",
      "timeStr": "9:55 pm",
      "start": "21:30",
      "end": "00:00",
      "startHour": 21,
      "startMin": 30,
      "duration": 150,
      "tag": "Movie",
      "desc": "The Running Man (2025). Broadcast live on Sky TV (9:55 pm).",
      "isMovie": true,
      "isSport": false
    }
  ],
  "sky-cinema-comedy-uk": [
    {
      "id": "308-180",
      "title": "Bride Wars (2009)",
      "timeStr": "4:40 pm",
      "start": "18:00",
      "end": "20:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "Bride Wars (2009). Broadcast live on Sky TV (4:40 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "308-200",
      "title": "Nirvanna the Band the Show the... (2025)",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:30",
      "startHour": 20,
      "startMin": 0,
      "duration": 90,
      "tag": "Movie",
      "desc": "Nirvanna the Band the Show the... (2025). Broadcast live on Sky TV (8:00 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "308-2130",
      "title": "We're the Millers (2013)",
      "timeStr": "9:45 pm",
      "start": "21:30",
      "end": "23:30",
      "startHour": 21,
      "startMin": 30,
      "duration": 120,
      "tag": "Movie",
      "desc": "We're the Millers (2013). Broadcast live on Sky TV (9:45 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "308-2330",
      "title": "Roofman (2025)",
      "timeStr": "11:40 pm",
      "start": "23:30",
      "end": "00:00",
      "startHour": 23,
      "startMin": 30,
      "duration": 30,
      "tag": "Movie",
      "desc": "Roofman (2025). Broadcast live on Sky TV (11:40 pm).",
      "isMovie": true,
      "isSport": false
    }
  ],
  "sky-cinema-thriller-uk": [
    {
      "id": "309-180",
      "title": "Jason Bourne (2016)",
      "timeStr": "5:50 pm",
      "start": "18:00",
      "end": "20:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "Jason Bourne (2016). Broadcast live on Sky TV (5:50 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "309-200",
      "title": "The Bank Job (2008)",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "22:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "The Bank Job (2008). Broadcast live on Sky TV (8:00 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "309-220",
      "title": "Basic Instinct (1992)",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "00:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "Basic Instinct (1992). Broadcast live on Sky TV (10:00 pm).",
      "isMovie": true,
      "isSport": false
    }
  ],
  "sky-cinema-drama-uk": [
    {
      "id": "310-180",
      "title": "A Star Is Born (2018)",
      "timeStr": "5:40 pm",
      "start": "18:00",
      "end": "20:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "A Star Is Born (2018). Broadcast live on Sky TV (5:40 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "310-200",
      "title": "Moneyball (2011)",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "22:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "Moneyball (2011). Broadcast live on Sky TV (8:00 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "310-220",
      "title": "The Pursuit of Happyness (2006)",
      "timeStr": "10:20 pm",
      "start": "22:00",
      "end": "00:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "The Pursuit of Happyness (2006). Broadcast live on Sky TV (10:20 pm).",
      "isMovie": true,
      "isSport": false
    }
  ],
  "sky-cinema-sci-fi-horror-uk": [
    {
      "id": "311-180",
      "title": "Terminator 2: Judgment Day (1991)",
      "timeStr": "3:50 pm",
      "start": "18:00",
      "end": "20:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "Terminator 2: Judgment Day (1991). Broadcast live on Sky TV (3:50 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "311-200",
      "title": "The Chronicles of Riddick (2004)",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "22:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "The Chronicles of Riddick (2004). Broadcast live on Sky TV (8:00 pm).",
      "isMovie": true,
      "isSport": false
    },
    {
      "id": "311-220",
      "title": "Riddick (2013)",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "00:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 120,
      "tag": "Movie",
      "desc": "Riddick (2013). Broadcast live on Sky TV (10:00 pm).",
      "isMovie": true,
      "isSport": false
    }
  ],
  "bbc-one-uk": [
    {
        "id": "101-180",
        "title": "BBC News at Six",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "18:30",
        "startHour": 18,
        "startMin": 0,
        "duration": 30,
        "tag": "News",
        "desc": "The latest national and international news stories from BBC News.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "101-183",
        "title": "BBC Regional News",
        "timeStr": "6:30 pm",
        "start": "18:30",
        "end": "19:00",
        "startHour": 18,
        "startMin": 30,
        "duration": 30,
        "tag": "Regional",
        "desc": "Latest news, sport and weather updates from across the region.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "101-190",
        "title": "The One Show",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "19:30",
        "startHour": 19,
        "startMin": 0,
        "duration": 30,
        "tag": "Live Mag",
        "desc": "Live magazine show featuring topical stories and celebrity studio guests.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "101-193",
        "title": "EastEnders",
        "timeStr": "7:30 pm",
        "start": "19:30",
        "end": "20:00",
        "startHour": 19,
        "startMin": 30,
        "duration": 30,
        "tag": "Soap Drama",
        "desc": "Drama and high tensions unfold in Albert Square, Walford.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "101-200",
        "title": "MasterChef UK",
        "timeStr": "8:00 pm",
        "start": "20:00",
        "end": "21:00",
        "startHour": 20,
        "startMin": 0,
        "duration": 60,
        "tag": "Culinary Contest",
        "desc": "Passionate amateur cooks battle for the prestigious culinary title.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "101-210",
        "title": "Line of Duty",
        "timeStr": "9:00 pm",
        "start": "21:00",
        "end": "22:00",
        "startHour": 21,
        "startMin": 0,
        "duration": 60,
        "tag": "Prestige Drama",
        "desc": "Police corruption unit AC-12 investigates complex institutional wrongdoing.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "101-220",
        "title": "BBC News at Ten",
        "timeStr": "10:00 pm",
        "start": "22:00",
        "end": "22:30",
        "startHour": 22,
        "startMin": 0,
        "duration": 30,
        "tag": "Flagship News",
        "desc": "Comprehensive national and international news coverage from the BBC.",
        "isMovie": false,
        "isSport": false
    }
],
  "bbc-two-uk": [
    {
        "id": "102-180",
        "title": "Great British Railway Journeys",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "18:30",
        "startHour": 18,
        "startMin": 0,
        "duration": 30,
        "tag": "Documentary",
        "desc": "Michael Portillo travels the length and breadth of Britain by train.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "102-183",
        "title": "Richard Osman's House of Games",
        "timeStr": "6:30 pm",
        "start": "18:30",
        "end": "19:00",
        "startHour": 18,
        "startMin": 30,
        "duration": 30,
        "tag": "Game Show",
        "desc": "Celebrity contestants test their general knowledge skills.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "102-190",
        "title": "Antiques Roadshow",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "20:00",
        "startHour": 19,
        "startMin": 0,
        "duration": 60,
        "tag": "Antiques",
        "desc": "Treasures, heirlooms and rare curiosities appraised by specialists.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "102-200",
        "title": "University Challenge",
        "timeStr": "8:00 pm",
        "start": "20:00",
        "end": "20:30",
        "startHour": 20,
        "startMin": 0,
        "duration": 30,
        "tag": "Quiz",
        "desc": "Academic quiz tournament between UK universities.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "102-203",
        "title": "Horizon: Secrets of the Cosmos",
        "timeStr": "8:30 pm",
        "start": "20:30",
        "end": "21:30",
        "startHour": 20,
        "startMin": 30,
        "duration": 60,
        "tag": "Science",
        "desc": "Groundbreaking discoveries in quantum astrophysics.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "102-213",
        "title": "Newsnight",
        "timeStr": "9:30 pm",
        "start": "21:30",
        "end": "22:15",
        "startHour": 21,
        "startMin": 30,
        "duration": 45,
        "tag": "Current Affairs",
        "desc": "In-depth investigative journalism, robust interviews, and political analysis.",
        "isMovie": false,
        "isSport": false
    }
],
  "bbc-three-uk": [
    {
        "id": "117-190",
        "title": "Glow Up: Britain's Next Make-Up Star",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "20:00",
        "startHour": 19,
        "startMin": 0,
        "duration": 60,
        "tag": "Reality",
        "desc": "Aspiring makeup artists face intense creative challenges.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "117-200",
        "title": "RuPaul's Drag Race UK",
        "timeStr": "8:00 pm",
        "start": "20:00",
        "end": "21:15",
        "startHour": 20,
        "startMin": 0,
        "duration": 75,
        "tag": "Entertainment",
        "desc": "Queens compete for the title of the UK's Next Drag Superstar.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "117-211",
        "title": "Bad Education",
        "timeStr": "9:15 pm",
        "start": "21:15",
        "end": "21:45",
        "startHour": 21,
        "startMin": 15,
        "duration": 30,
        "tag": "Comedy",
        "desc": "Hilarious classroom chaos at Abbey Grove school.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "117-214",
        "title": "Fleabag",
        "timeStr": "9:45 pm",
        "start": "21:45",
        "end": "22:15",
        "startHour": 21,
        "startMin": 45,
        "duration": 30,
        "tag": "Award Winning Comedy",
        "desc": "Phoebe Waller-Bridge's critically acclaimed comedy drama.",
        "isMovie": false,
        "isSport": false
    }
],
  "bbc-news-uk": [
    {
        "id": "501-180",
        "title": "BBC News: Global Hour",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "19:00",
        "startHour": 18,
        "startMin": 0,
        "duration": 60,
        "tag": "Breaking News",
        "desc": "Live global news bulletin with correspondents worldwide.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "501-190",
        "title": "Outside Source",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "20:00",
        "startHour": 19,
        "startMin": 0,
        "duration": 60,
        "tag": "Analysis",
        "desc": "Interactive storytelling, social data journalism and eyewitness reports.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "501-200",
        "title": "BBC News at Eight",
        "timeStr": "8:00 pm",
        "start": "20:00",
        "end": "21:00",
        "startHour": 20,
        "startMin": 0,
        "duration": 60,
        "tag": "Live Desk",
        "desc": "Up-to-the-minute live news reporting, politics and market trends.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "501-210",
        "title": "HARDtalk",
        "timeStr": "9:00 pm",
        "start": "21:00",
        "end": "21:30",
        "startHour": 21,
        "startMin": 0,
        "duration": 30,
        "tag": "Interview",
        "desc": "Tough, probing interviews with leading world figures and newsmakers.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "501-213",
        "title": "Sportsday Live",
        "timeStr": "9:30 pm",
        "start": "21:30",
        "end": "22:00",
        "startHour": 21,
        "startMin": 30,
        "duration": 30,
        "tag": "Sports News",
        "desc": "All the latest scores, highlights and stories from global athletics.",
        "isMovie": false,
        "isSport": true
    }
],
  "itv1-uk": [
    {
        "id": "103-180",
        "title": "The Chase",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "18:30",
        "startHour": 18,
        "startMin": 0,
        "duration": 30,
        "tag": "Game Show",
        "desc": "Contestants take on ruthless Chasers in high-stakes trivia battles.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "103-183",
        "title": "ITV Evening News",
        "timeStr": "6:30 pm",
        "start": "18:30",
        "end": "19:00",
        "startHour": 18,
        "startMin": 30,
        "duration": 30,
        "tag": "News",
        "desc": "National and global news reports anchored from London.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "103-190",
        "title": "Emmerdale",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "19:30",
        "startHour": 19,
        "startMin": 0,
        "duration": 30,
        "tag": "Soap",
        "desc": "Scandal, heartbreak and dramatic twists in the Yorkshire Dales.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "103-193",
        "title": "Coronation Street",
        "timeStr": "7:30 pm",
        "start": "19:30",
        "end": "20:00",
        "startHour": 19,
        "startMin": 30,
        "duration": 30,
        "tag": "Soap",
        "desc": "Iconic Manchester cobbles drama with the residents of Weatherfield.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "103-200",
        "title": "Vera",
        "timeStr": "8:00 pm",
        "start": "20:00",
        "end": "22:00",
        "startHour": 20,
        "startMin": 0,
        "duration": 120,
        "tag": "Crime Drama",
        "desc": "DCI Vera Stanhope unearths dark family secrets in Northumberland.",
        "isMovie": false,
        "isSport": false
    }
],
  "itv2-uk": [
    {
        "id": "118-180",
        "title": "Family Guy",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "19:00",
        "startHour": 18,
        "startMin": 0,
        "duration": 60,
        "tag": "Animation",
        "desc": "The dysfunctional Griffin family gets into uproarious animated scrapes.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "118-190",
        "title": "American Dad!",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "20:00",
        "startHour": 19,
        "startMin": 0,
        "duration": 60,
        "tag": "Animation",
        "desc": "CIA agent Stan Smith balances homeland security and family absurdity.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "118-200",
        "title": "Love Island Live",
        "timeStr": "8:00 pm",
        "start": "20:00",
        "end": "21:05",
        "startHour": 20,
        "startMin": 0,
        "duration": 65,
        "tag": "Reality",
        "desc": "Villa recouplings, unexpected dumpings, and sun-soaked romance.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "118-210",
        "title": "Celebrity Juice: Best Bits",
        "timeStr": "9:05 pm",
        "start": "21:05",
        "end": "22:00",
        "startHour": 21,
        "startMin": 5,
        "duration": 55,
        "tag": "Comedy Panel",
        "desc": "Outrageous, hilarious games and celebrity panel antics.",
        "isMovie": false,
        "isSport": false
    }
],
  "itv3-uk": [
    {
        "id": "119-180",
        "title": "Heartbeat",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "19:00",
        "startHour": 18,
        "startMin": 0,
        "duration": 60,
        "tag": "Vintage Drama",
        "desc": "1960s rural policing and nostalgic village life in Aidensfield.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "119-190",
        "title": "Midsomer Murders",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "21:00",
        "startHour": 19,
        "startMin": 0,
        "duration": 120,
        "tag": "Murder Mystery",
        "desc": "DCI Barnaby unravels eccentric deadly crimes in picturesque villages.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "119-210",
        "title": "Agatha Christie's Poirot",
        "timeStr": "9:00 pm",
        "start": "21:00",
        "end": "22:30",
        "startHour": 21,
        "startMin": 0,
        "duration": 90,
        "tag": "Period Mystery",
        "desc": "David Suchet stars as Belgian sleuth Hercule Poirot solving baffling crimes.",
        "isMovie": false,
        "isSport": false
    }
],
  "itv4-uk": [
    {
        "id": "120-180",
        "title": "The Sweeney",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "19:00",
        "startHour": 18,
        "startMin": 0,
        "duration": 60,
        "tag": "Classic Action",
        "desc": "Jack Regan and George Carter tackle London's hardened underworld.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "120-190",
        "title": "Live Snooker: British Open",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "21:00",
        "startHour": 19,
        "startMin": 0,
        "duration": 120,
        "tag": "Live Sport",
        "desc": "Live tournament coverage from the arena with expert commentary.",
        "isMovie": false,
        "isSport": true
    },
    {
        "id": "120-210",
        "title": "Mad Max: Fury Road (2015)",
        "timeStr": "9:00 pm",
        "start": "21:00",
        "end": "23:00",
        "startHour": 21,
        "startMin": 0,
        "duration": 120,
        "tag": "Movie Action",
        "desc": "High-octane wasteland pursuit directed by George Miller.",
        "isMovie": true,
        "isSport": false
    }
],
  "film4-uk": [
    {
        "id": "313-180",
        "title": "The Grand Budapest Hotel (2014)",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "18:40",
        "startHour": 18,
        "startMin": 0,
        "duration": 100,
        "tag": "Oscar Winner",
        "desc": "Wes Anderson's visual masterpiece following a legendary concierge.",
        "isMovie": true,
        "isSport": false
    },
    {
        "id": "313-194",
        "title": "No Country for Old Men (2007)",
        "timeStr": "7:40 pm",
        "start": "19:40",
        "end": "21:45",
        "startHour": 19,
        "startMin": 40,
        "duration": 125,
        "tag": "Thriller Masterpiece",
        "desc": "A hunter stumbles upon a drug deal gone wrong in the Texas desert.",
        "isMovie": true,
        "isSport": false
    },
    {
        "id": "313-214",
        "title": "Knives Out (2019)",
        "timeStr": "9:45 pm",
        "start": "21:45",
        "end": "00:00",
        "startHour": 21,
        "startMin": 45,
        "duration": 135,
        "tag": "Whodunnit Mystery",
        "desc": "Benoit Blanc probes the mysterious demise of an eccentric mystery author.",
        "isMovie": true,
        "isSport": false
    }
],
  "gold-uk": [
    {
        "id": "110-180",
        "title": "Only Fools and Horses",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "19:00",
        "startHour": 18,
        "startMin": 0,
        "duration": 60,
        "tag": "Classic Comedy",
        "desc": "Del Boy and Rodney Trotter scheme to become millionaires in Peckham.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "110-190",
        "title": "Blackadder II",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "19:40",
        "startHour": 19,
        "startMin": 0,
        "duration": 40,
        "tag": "Comedy Legend",
        "desc": "Lord Edmund Blackadder navigates the court of Queen Elizabeth I.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "110-194",
        "title": "Fawlty Towers",
        "timeStr": "7:40 pm",
        "start": "19:40",
        "end": "20:20",
        "startHour": 19,
        "startMin": 40,
        "duration": 40,
        "tag": "Comedy Masterpiece",
        "desc": "Basil Fawlty's disastrous hospitality in Torquay.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "110-202",
        "title": "The Vicar of Dibley",
        "timeStr": "8:20 pm",
        "start": "20:20",
        "end": "21:10",
        "startHour": 20,
        "startMin": 20,
        "duration": 50,
        "tag": "Sitcom",
        "desc": "Geraldine Granger wins over a delightfully idiosyncratic parish council.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "110-211",
        "title": "Dad's Army",
        "timeStr": "9:10 pm",
        "start": "21:10",
        "end": "22:00",
        "startHour": 21,
        "startMin": 10,
        "duration": 50,
        "tag": "Vintage Comedy",
        "desc": "Captain Mainwaring leads the Walmington-on-Sea Home Guard platoon.",
        "isMovie": false,
        "isSport": false
    }
],
  "gb-news": [
    {
        "id": "512-180",
        "title": "Britain's Newsroom Live",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "19:00",
        "startHour": 18,
        "startMin": 0,
        "duration": 60,
        "tag": "Live Debate",
        "desc": "Breaking UK news stories, grassroots interviews, and viewer interactions.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "512-190",
        "title": "Farage Live",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "20:00",
        "startHour": 19,
        "startMin": 0,
        "duration": 60,
        "tag": "Political Talk",
        "desc": "Debate on Westminster politics, European relations, and global news.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "512-200",
        "title": "Dewbs & Co",
        "timeStr": "8:00 pm",
        "start": "20:00",
        "end": "21:00",
        "startHour": 20,
        "startMin": 0,
        "duration": 60,
        "tag": "Opinion",
        "desc": "A panel of diverse commentators tackle the biggest stories of the day.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "512-210",
        "title": "Free Speech Nation",
        "timeStr": "9:00 pm",
        "start": "21:00",
        "end": "22:00",
        "startHour": 21,
        "startMin": 0,
        "duration": 60,
        "tag": "Analysis",
        "desc": "Discussion and critique of contemporary social and political affairs.",
        "isMovie": false,
        "isSport": false
    }
],
  "reuters": [
    {
        "id": "515-180",
        "title": "Reuters World Wire",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "19:00",
        "startHour": 18,
        "startMin": 0,
        "duration": 60,
        "tag": "Global Wire",
        "desc": "Real-time international dispatches from Reuters bureau chiefs.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "515-190",
        "title": "Financial Markets Close",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "20:00",
        "startHour": 19,
        "startMin": 0,
        "duration": 60,
        "tag": "Markets",
        "desc": "Wall Street closing bells, commodities, FTSE 100, and currency moves.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "515-200",
        "title": "Global Geopolitics",
        "timeStr": "8:00 pm",
        "start": "20:00",
        "end": "21:00",
        "startHour": 20,
        "startMin": 0,
        "duration": 60,
        "tag": "Diplomacy",
        "desc": "In-depth intelligence and briefings on multilateral diplomatic events.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "515-210",
        "title": "Reuters Technology Report",
        "timeStr": "9:00 pm",
        "start": "21:00",
        "end": "22:00",
        "startHour": 21,
        "startMin": 0,
        "duration": 60,
        "tag": "Tech Trends",
        "desc": "Silicon Valley venture developments, AI breakthroughs, and semiconductor news.",
        "isMovie": false,
        "isSport": false
    }
],
  "s4c-uk": [
    {
        "id": "104-180",
        "title": "Newyddion S4C",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "18:30",
        "startHour": 18,
        "startMin": 0,
        "duration": 30,
        "tag": "Cymru News",
        "desc": "Newyddion Cymru a'r byd gan dim newyddiadurwyr S4C.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "104-183",
        "title": "Heno Live",
        "timeStr": "6:30 pm",
        "start": "18:30",
        "end": "19:30",
        "startHour": 18,
        "startMin": 30,
        "duration": 60,
        "tag": "Magazine",
        "desc": "Cylchgrawn nosweithiog byw gyda stor\u00efau a llais pobol Cymru.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "104-193",
        "title": "Pobol y Cwm",
        "timeStr": "7:30 pm",
        "start": "19:30",
        "end": "20:00",
        "startHour": 19,
        "startMin": 30,
        "duration": 30,
        "tag": "Drama",
        "desc": "Y gyfres ddrama boblogaidd sy'n dilyn trigolion Cwmderi.",
        "isMovie": false,
        "isSport": false
    },
    {
        "id": "104-200",
        "title": "Rygbi Byw: United Rugby Championship",
        "timeStr": "8:00 pm",
        "start": "20:00",
        "end": "22:00",
        "startHour": 20,
        "startMin": 0,
        "duration": 120,
        "tag": "Live Sport",
        "desc": "Darllediad byw o'r g\u00eam rygbi ranbarthol.",
        "isMovie": false,
        "isSport": true
    }
],
  "rally-tv": [
    {
        "id": "425-180",
        "title": "WRC Live Stage: Central European Rally",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "19:30",
        "startHour": 18,
        "startMin": 0,
        "duration": 90,
        "tag": "WRC Live",
        "desc": "Full asphalt speed stage coverage with onboard cockpit telemetry.",
        "isMovie": false,
        "isSport": true
    },
    {
        "id": "425-193",
        "title": "ERC Rally Highlights",
        "timeStr": "7:30 pm",
        "start": "19:30",
        "end": "20:30",
        "startHour": 19,
        "startMin": 30,
        "duration": 60,
        "tag": "Motorsport",
        "desc": "High-octane moments from the European Rally Championship season.",
        "isMovie": false,
        "isSport": true
    },
    {
        "id": "425-203",
        "title": "World RX Supercars Showdown",
        "timeStr": "8:30 pm",
        "start": "20:30",
        "end": "22:00",
        "startHour": 20,
        "startMin": 30,
        "duration": 90,
        "tag": "Rallycross",
        "desc": "Wheel-to-wheel dual-surface electric and combustion rallycross finals.",
        "isMovie": false,
        "isSport": true
    }
],
  "trace-sports": [
    {
        "id": "430-180",
        "title": "Football Stars Unplugged",
        "timeStr": "6:00 pm",
        "start": "18:00",
        "end": "19:00",
        "startHour": 18,
        "startMin": 0,
        "duration": 60,
        "tag": "Athlete Life",
        "desc": "Behind the glamour: life, style, and luxury with football's greatest.",
        "isMovie": false,
        "isSport": true
    },
    {
        "id": "430-190",
        "title": "Training with Champions",
        "timeStr": "7:00 pm",
        "start": "19:00",
        "end": "20:00",
        "startHour": 19,
        "startMin": 0,
        "duration": 60,
        "tag": "Fitness & Focus",
        "desc": "Elite athletic routines, nutrition regimens and mental grit.",
        "isMovie": false,
        "isSport": true
    },
    {
        "id": "430-200",
        "title": "Top 10 Sports Car Collections",
        "timeStr": "8:00 pm",
        "start": "20:00",
        "end": "21:00",
        "startHour": 20,
        "startMin": 0,
        "duration": 60,
        "tag": "Supercars",
        "desc": "Inside the breathtaking private garages of world-renowned athletes.",
        "isMovie": false,
        "isSport": true
    },
    {
        "id": "430-210",
        "title": "Trace Stars: The Next Generation",
        "timeStr": "9:00 pm",
        "start": "21:00",
        "end": "22:00",
        "startHour": 21,
        "startMin": 0,
        "duration": 60,
        "tag": "Rising Stars",
        "desc": "Young prodigies poised to dominate world sports.",
        "isMovie": false,
        "isSport": true
    }
],
  "cnn-international": [
    {
      "id": "506-180",
      "title": "The Lead with Jake Tapper",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "World Politics",
      "desc": "In-depth reporting and interviews breaking down the day's major national and geopolitical stories.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "506-190",
      "title": "The Situation Room with Wolf Blitzer",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "20:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 60,
      "tag": "Breaking News",
      "desc": "Wolf Blitzer anchors live coverage of critical global events, political investigations, and international crises.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "506-200",
      "title": "Anderson Cooper 360°",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Prime Investigation",
      "desc": "Anderson Cooper goes beyond the headlines to hold power accountable with investigative reports.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "506-210",
      "title": "CNN NewsNight",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 60,
      "tag": "Nightly Debate",
      "desc": "Late-night debate and roundtable discussions on breaking international stories and cultural shifts.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "506-220",
      "title": "Amanpour",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "23:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 60,
      "tag": "Global Affairs",
      "desc": "Christiane Amanpour leads incisive interviews with world leaders, policymakers, and cultural figures.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "506-230",
      "title": "World Sport",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Global Sport",
      "desc": "The latest sports news, match highlights, and athlete interviews from football, motorsport, and tennis worldwide.",
      "isMovie": false,
      "isSport": true
    }
  ],
  "bloomberg-us": [
    {
      "id": "504-180",
      "title": "Bloomberg Markets: The Close",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Wall Street",
      "desc": "Live countdown to the closing bell with real-time stock movements, earnings calls, and trader sentiment.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "504-190",
      "title": "Bloomberg Technology",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "20:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 60,
      "tag": "Silicon Valley",
      "desc": "Covering the frontiers of tech innovation, artificial intelligence, venture capital, and startups.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "504-200",
      "title": "Balance of Power",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Economics & Policy",
      "desc": "The intersection of global politics, central bank interest rate decisions, and international trade policy.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "504-210",
      "title": "Bloomberg Surveillance",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 60,
      "tag": "Macro Analysis",
      "desc": "Deep dives into bond yields, currency fluctuations, energy commodities, and inflation forecasts.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "504-220",
      "title": "The David Rubenstein Show",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "23:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 60,
      "tag": "Leadership",
      "desc": "Peer-to-peer conversations with the most influential business executives and financial visionaries.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "504-230",
      "title": "Bloomberg Daybreak: Asia",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Asian Markets",
      "desc": "Opening trades in Tokyo, Hong Kong, and Singapore setting up the global investment day.",
      "isMovie": false,
      "isSport": false
    }
  ],
  "al-jazeera": [
    {
      "id": "514-180",
      "title": "Newshour",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "19:00",
      "startHour": 18,
      "startMin": 0,
      "duration": 60,
      "tag": "Global Wire",
      "desc": "Live hourly broadcast delivering news, analysis, and reports from bureaus across six continents.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "514-190",
      "title": "Inside Story",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "19:30",
      "startHour": 19,
      "startMin": 0,
      "duration": 30,
      "tag": "Debate & Focus",
      "desc": "International panel debate providing sharp context and analysis on the day's dominant world headlines.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "514-193",
      "title": "The Stream",
      "timeStr": "7:30 pm",
      "start": "19:30",
      "end": "20:00",
      "startHour": 19,
      "startMin": 30,
      "duration": 30,
      "tag": "Digital Focus",
      "desc": "Social media-driven dialogue connecting grassroots voices directly with newsmakers worldwide.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "514-200",
      "title": "Witness: Global Documentaries",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Documentary",
      "desc": "Inspiring human stories and gripping investigative cinema filmed in underrepresented regions.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "514-210",
      "title": "Al Jazeera News: Prime Edition",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "22:00",
      "startHour": 21,
      "startMin": 0,
      "duration": 60,
      "tag": "International News",
      "desc": "Comprehensive rolling world news updates with live eyewitness correspondents on the ground.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "514-220",
      "title": "Counting the Cost",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "22:30",
      "startHour": 22,
      "startMin": 0,
      "duration": 30,
      "tag": "Global Economy",
      "desc": "Investigating how international politics and market shifts hit everyday consumers and local economies.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "514-223",
      "title": "Talk to Al Jazeera",
      "timeStr": "10:30 pm",
      "start": "22:30",
      "end": "23:00",
      "startHour": 22,
      "startMin": 30,
      "duration": 30,
      "tag": "Exclusive Interview",
      "desc": "Hard-hitting one-on-one interviews with global heads of state, dissidents, and cultural icons.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "514-230",
      "title": "Newshour Live",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Late Edition",
      "desc": "Rolling overnight international news bulletin with live reports from the Americas, Europe and Asia.",
      "isMovie": false,
      "isSport": false
    }
  ],
  "russia-today": [
    {
      "id": "511-180",
      "title": "RT News: Evening Edition",
      "timeStr": "6:00 pm",
      "start": "18:00",
      "end": "18:30",
      "startHour": 18,
      "startMin": 0,
      "duration": 30,
      "tag": "World News",
      "desc": "International news bulletins, live correspondents, and unedited press events from global capitals.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "511-183",
      "title": "CrossTalk with Peter Lavelle",
      "timeStr": "6:30 pm",
      "start": "18:30",
      "end": "19:00",
      "startHour": 18,
      "startMin": 30,
      "duration": 30,
      "tag": "Debate & Geopolitics",
      "desc": "Heated debate on politics and international security with guest analysts from Washington, Brussels, and Moscow.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "511-190",
      "title": "RT Documentary",
      "timeStr": "7:00 pm",
      "start": "19:00",
      "end": "20:00",
      "startHour": 19,
      "startMin": 0,
      "duration": 60,
      "tag": "Investigative",
      "desc": "Award-winning investigative cinema covering forgotten conflicts, archaeological wonders, and human endurance.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "511-200",
      "title": "In Question",
      "timeStr": "8:00 pm",
      "start": "20:00",
      "end": "21:00",
      "startHour": 20,
      "startMin": 0,
      "duration": 60,
      "tag": "Analysis",
      "desc": "Rigorous investigative reporting scrutinizing mainstream media narratives, intelligence disclosures, and power politics.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "511-210",
      "title": "Going Underground",
      "timeStr": "9:00 pm",
      "start": "21:00",
      "end": "21:30",
      "startHour": 21,
      "startMin": 0,
      "duration": 30,
      "tag": "Current Affairs",
      "desc": "Afshin Rattansi interviews dissidents, whistleblowers, and politicians challenging the established consensus.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "511-213",
      "title": "Worlds Apart",
      "timeStr": "9:30 pm",
      "start": "21:30",
      "end": "22:00",
      "startHour": 21,
      "startMin": 30,
      "duration": 30,
      "tag": "Exclusive Dialogue",
      "desc": "Oksana Boyko engages international thinkers, philosophers, and diplomats on civilizational trends.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "511-220",
      "title": "RT News: Night Desk",
      "timeStr": "10:00 pm",
      "start": "22:00",
      "end": "23:00",
      "startHour": 22,
      "startMin": 0,
      "duration": 60,
      "tag": "Breaking News",
      "desc": "Late-night world news round-up covering financial shifts, breaking geopolitical updates, and overnight stories.",
      "isMovie": false,
      "isSport": false
    },
    {
      "id": "511-230",
      "title": "Spotlight",
      "timeStr": "11:00 pm",
      "start": "23:00",
      "end": "00:00",
      "startHour": 23,
      "startMin": 0,
      "duration": 60,
      "tag": "Culture & Society",
      "desc": "Exploration of technology, subcultures, science milestones, and global environmental initiatives.",
      "isMovie": false,
      "isSport": false
    }
  ]
};

// ==========================================================================
// EPG TIME CALCULATOR & SCHEDULE GENERATOR
// ==========================================================================

class EPGManager {
  constructor() {
    this.schedules = MYTELLY_EPG_SEED;
    this.isLiveLoaded = false;
    this.fetchLiveEPG();
  }

  // Asynchronously fetch live listings from local daemon API
  async fetchLiveEPG() {
    try {
      const resp = await fetch('/api/epg');
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.channels) {
          const mapped = {};
          for (const [chId, chObj] of Object.entries(data.channels)) {
            mapped[chId] = chObj.shows.map(s => ({
              id: s.id,
              title: s.title,
              timeStr: s.timeStr,
              start: s.start,
              end: s.end,
              startHour: s.startHour,
              startMin: s.startMin,
              duration: s.durationMinutes,
              tag: s.tag,
              desc: s.desc,
              isMovie: s.isMovie || false,
              isSport: s.isSport || false
            }));
          }
          this.schedules = { ...MYTELLY_EPG_SEED, ...mapped };
          this.isLiveLoaded = true;
          window.dispatchEvent(new CustomEvent('ivtv:epg-updated', { detail: { source: 'api' } }));
        }
      }
    } catch (e) {
      console.warn('[IVTV EPG] Local /api/epg fetch fallback to embedded seed:', e);
    }
  }

  // Generates timeline schedule for a channel anchored dynamically to referenceDate
  getScheduleForChannel(channelId, referenceDate = new Date()) {
    const shows = this.schedules[channelId] || this.schedules["sky-sports-premier-league-uk"] || [];
    if (!shows || shows.length === 0) return [];

    const baseDay = new Date(referenceDate);
    baseDay.setHours(0, 0, 0, 0);

    const generated = [];

    // Map each show to a concrete start and end Date object
    for (let i = 0; i < shows.length; i++) {
      const s = shows[i];
      const start = new Date(baseDay);
      start.setHours(s.startHour, s.startMin, 0, 0);

      const end = new Date(start.getTime() + s.duration * 60 * 1000);

      generated.push({
        id: `${channelId}-${start.getTime()}`,
        channelId: channelId,
        title: s.title,
        desc: s.desc,
        tag: s.tag,
        timeStr: s.timeStr,
        durationMinutes: s.duration,
        startTime: start,
        endTime: end,
        startTimeFormatted: s.start,
        endTimeFormatted: s.end,
        isMovie: s.isMovie,
        isSport: s.isSport
      });
    }

    // Also handle cyclic wrap if viewed outside 18:00 - 24:00
    // Generate pre-evening block and post-midnight block for 24h continuity
    const firstStart = generated[0].startTime;
    const lastEnd = generated[generated.length - 1].endTime;

    // Pre-evening wrap
    let preTime = new Date(firstStart);
    let revIdx = shows.length - 1;
    while (preTime.getTime() > baseDay.getTime()) {
      const idx = ((revIdx % shows.length) + shows.length) % shows.length;
      const s = shows[idx];
      if (!s) break;
      const start = new Date(preTime.getTime() - s.duration * 60 * 1000);
      generated.unshift({
        id: `${channelId}-${start.getTime()}`,
        channelId: channelId,
        title: s.title,
        desc: s.desc,
        tag: s.tag,
        timeStr: s.timeStr,
        durationMinutes: s.duration,
        startTime: start,
        endTime: new Date(preTime),
        startTimeFormatted: this.formatTime(start),
        endTimeFormatted: this.formatTime(preTime),
        isMovie: s.isMovie,
        isSport: s.isSport
      });
      preTime = start;
      revIdx--;
    }

    // Post-midnight wrap for tomorrow morning
    let postTime = new Date(lastEnd);
    const targetEnd = new Date(baseDay.getTime() + 36 * 60 * 60 * 1000);
    let fwdIdx = 0;
    while (postTime.getTime() < targetEnd.getTime()) {
      const idx = fwdIdx % shows.length;
      const s = shows[idx];
      if (!s) break;
      const end = new Date(postTime.getTime() + s.duration * 60 * 1000);
      generated.push({
        id: `${channelId}-${postTime.getTime()}`,
        channelId: channelId,
        title: s.title,
        desc: s.desc,
        tag: s.tag,
        timeStr: s.timeStr,
        durationMinutes: s.duration,
        startTime: new Date(postTime),
        endTime: end,
        startTimeFormatted: this.formatTime(postTime),
        endTimeFormatted: this.formatTime(end),
        isMovie: s.isMovie,
        isSport: s.isSport
      });
      postTime = end;
      fwdIdx++;
    }

    return generated;
  }

  // Finds what is currently broadcasting right now
  getCurrentProgram(channelId, now = new Date()) {
    const schedule = this.getScheduleForChannel(channelId, now);
    const nowTime = now.getTime();

    for (let i = 0; i < schedule.length; i++) {
      const prog = schedule[i];
      if (nowTime >= prog.startTime.getTime() && nowTime < prog.endTime.getTime()) {
        const totalDuration = prog.endTime.getTime() - prog.startTime.getTime();
        const elapsed = nowTime - prog.startTime.getTime();
        const progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));
        const minutesLeft = Math.max(1, Math.round((prog.endTime.getTime() - nowTime) / (60 * 1000)));

        return {
          ...prog,
          isLive: true,
          progressPercent: progressPercent,
          minutesLeft: minutesLeft,
          next: schedule[i + 1] || null
        };
      }
    }

    // Fallback: Return first prime show or closest show
    if (schedule.length > 0) {
      const prime = schedule.find(p => p.startTime.getHours() >= 19) || schedule[0];
      return {
        ...prime,
        isLive: true,
        progressPercent: 45,
        minutesLeft: 30,
        next: null
      };
    }

    return null;
  }

  // Calculates programs within a horizontal timeline viewing window
  getProgramsInWindow(channelId, windowStart, windowDurationMinutes = 360, pixelsPerHour = 220) {
    const fullSchedule = this.getScheduleForChannel(channelId, windowStart);
    const windowStartTime = windowStart.getTime();
    const windowEndTime = windowStartTime + windowDurationMinutes * 60 * 1000;
    const nowTime = Date.now();
    const pixelsPerMinute = pixelsPerHour / 60;

    const windowPrograms = [];

    for (const prog of fullSchedule) {
      const progStartTime = prog.startTime.getTime();
      const progEndTime = prog.endTime.getTime();

      // Check if program overlaps with [windowStartTime, windowEndTime]
      if (progEndTime > windowStartTime && progStartTime < windowEndTime) {
        const clampedStart = Math.max(progStartTime, windowStartTime);
        const clampedEnd = Math.min(progEndTime, windowEndTime);
        const durationMins = (clampedEnd - clampedStart) / (60 * 1000);
        const widthPx = Math.max(70, Math.round(durationMins * pixelsPerMinute));

        const isLive = nowTime >= progStartTime && nowTime < progEndTime;
        let progressPercent = 0;
        let minutesLeft = 0;

        if (isLive) {
          const totalDuration = progEndTime - progStartTime;
          const elapsed = nowTime - progStartTime;
          progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));
          minutesLeft = Math.max(1, Math.round((progEndTime - nowTime) / (60 * 1000)));
        }

        windowPrograms.push({
          ...prog,
          widthPx: widthPx,
          isLive: isLive,
          progressPercent: progressPercent,
          minutesLeft: minutesLeft
        });
      }
    }

    return windowPrograms;
  }

  // Helper to format Date to HH:MM (24-hour)
  formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Generates timeline hour slots starting from base date
  getTimeSlots(baseDate = new Date(), count = 6) {
    const slots = [];
    const baseHour = baseDate.getHours();
    
    for (let i = 0; i < count; i++) {
      const slotTime = new Date(baseDate);
      slotTime.setHours(baseHour + i, 0, 0, 0);
      slots.push({
        time: slotTime,
        label: this.formatTime(slotTime)
      });
    }
    return slots;
  }
}

// Global instance
window.ivtvEPG = new EPGManager();
