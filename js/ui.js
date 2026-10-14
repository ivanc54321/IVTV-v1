/* ==========================================================================
   IVTV UI RENDERER & INTERACTION CONTROLLER
   ========================================================================== */

class UIController {
  constructor() {
    this.currentHeroIndex = 0;
    this.activeFilter = 'all';
    this.activeEPGCategory = 'all';
    this.searchQuery = '';
    this.heroTimer = null;
    this.epgClockTimer = null;
    this.epgScrolled = false;

    // All UK Channels Directory State
    this.allChannelsCategory = 'all';
    this.allChannelsSort = 'lcn'; // 'lcn' | 'views' | 'name' | 'rating'
    this.allChannelsView = 'grid'; // 'grid' | 'carousel'
    this.allChannelsQuery = '';
  }

  init() {
    this.renderHero();
    this.renderTopRanked();
    this.renderProvidersBar();
    this.renderAllUKChannels();
    this.renderCategorySections();
    this.renderGenreTiles();
    this.renderEPG();
    this.setupEPGClock();
    this.setupHeroAutoSlide();
    this.setupEventListeners();
    this.setupAllChannelsEventListeners();

    // Auto-refresh cards every 60s so live program tickers and progress stay fresh
    setInterval(() => {
      this.renderTopRanked();
      this.renderAllUKChannels();
      this.renderCategorySections();
    }, 60000);
  }

  // ==========================================================================
  // HERO SHOWCASE SECTION
  // ==========================================================================

  renderHero() {
    const showcases = window.IVTV_DATA.heroShowcases;
    const current = showcases[this.currentHeroIndex];
    if (!current) return;

    // Update Backdrop Image
    const backdropImg = document.getElementById('hero-backdrop-img');
    if (backdropImg) {
      backdropImg.style.opacity = '0';
      setTimeout(() => {
        backdropImg.src = current.image;
        backdropImg.style.opacity = '1';
      }, 200);
    }

    // Update Hero Content
    const titleEl = document.getElementById('hero-title');
    const descEl = document.getElementById('hero-desc');
    const badgesEl = document.getElementById('hero-badges');
    const playBtn = document.getElementById('hero-play-btn');
    const favBtn = document.getElementById('hero-fav-btn');

    if (titleEl) titleEl.textContent = current.title;
    if (descEl) descEl.textContent = current.synopsis;

    if (badgesEl) {
      badgesEl.innerHTML = `
        <div class="rating-badge">★ ${current.rating}</div>
        <div class="meta-pill live"><span class="live-pulse-dot"></span> LIVE</div>
        <div class="meta-pill">${current.category}</div>
        ${current.badges.map(b => `<div class="meta-pill">${b}</div>`).join('')}
      `;
    }

    if (playBtn) {
      playBtn.onclick = () => {
        if (window.ivtvPlayer) {
          window.ivtvPlayer.openPlayer(current.channelId);
        }
      };
    }

    if (favBtn) {
      const isFav = window.ivtvStorage && window.ivtvStorage.isFavorite(current.channelId);
      favBtn.classList.toggle('favorited', isFav);
      favBtn.innerHTML = `<span>${isFav ? '★' : '☆'}</span> <span>${isFav ? 'In Watchlist' : 'Watchlist'}</span>`;
      favBtn.onclick = () => {
        const added = window.ivtvStorage.toggleFavorite(current.channelId);
        favBtn.classList.toggle('favorited', added);
        favBtn.innerHTML = `<span>${added ? '★' : '☆'}</span> <span>${added ? 'In Watchlist' : 'Watchlist'}</span>`;
        window.showToast(added ? 'Added to Watchlist' : 'Removed from Watchlist', added ? 'success' : 'info');
      };
    }

    // Render Hero Thumbnails Slider & Pagination Dots
    this.renderHeroThumbnails();
  }

  renderHeroThumbnails() {
    const showcases = window.IVTV_DATA.heroShowcases;
    const thumbsContainer = document.getElementById('hero-thumbnails');
    const paginationContainer = document.getElementById('hero-pagination');

    if (thumbsContainer) {
      thumbsContainer.innerHTML = showcases.map((s, idx) => `
        <div class="hero-thumb-card ${idx === this.currentHeroIndex ? 'active' : ''}" data-index="${idx}">
          <img class="hero-thumb-img" src="${s.image}" alt="${s.title}">
          <div class="hero-thumb-overlay">
            <span class="hero-thumb-title">${s.subtitle}</span>
          </div>
        </div>
      `).join('');

      thumbsContainer.querySelectorAll('.hero-thumb-card').forEach(card => {
        card.addEventListener('click', () => {
          this.setHeroSlide(parseInt(card.dataset.index, 10));
        });
      });
    }

    if (paginationContainer) {
      paginationContainer.innerHTML = showcases.map((_, idx) => `
        <div class="hero-dot-bar ${idx === this.currentHeroIndex ? 'active' : ''}" data-index="${idx}"></div>
      `).join('');

      paginationContainer.querySelectorAll('.hero-dot-bar').forEach(dot => {
        dot.addEventListener('click', () => {
          this.setHeroSlide(parseInt(dot.dataset.index, 10));
        });
      });
    }
  }

  setHeroSlide(index) {
    this.currentHeroIndex = index;
    this.renderHero();
    this.resetHeroTimer();
  }

  nextHeroSlide() {
    const total = window.IVTV_DATA.heroShowcases.length;
    this.currentHeroIndex = (this.currentHeroIndex + 1) % total;
    this.renderHero();
  }

  prevHeroSlide() {
    const total = window.IVTV_DATA.heroShowcases.length;
    this.currentHeroIndex = (this.currentHeroIndex - 1 + total) % total;
    this.renderHero();
  }

  setupHeroAutoSlide() {
    this.resetHeroTimer();
  }

  resetHeroTimer() {
    if (this.heroTimer) clearInterval(this.heroTimer);
    this.heroTimer = setInterval(() => {
      this.nextHeroSlide();
    }, 7500);
  }

  // Helper for category and channel icon
  getChannelIcon(ch) {
    const name = ch.name;
    if (name.includes('F1') || name.includes('Racing')) return '🏎️';
    if (name.includes('Premier League') || name.includes('Football') || name.includes('LaLiga')) return '⚽';
    if (name.includes('Tennis')) return '🎾';
    if (name.includes('Golf')) return '⛳';
    if (name.includes('Cricket')) return '🏏';
    if (name.includes('Action')) return '💥';
    if (name.includes('Horror') || name.includes('Sci-Fi')) return '🛸';
    if (name.includes('Comedy')) return '🎭';
    if (name.includes('Crime')) return '🔍';
    if (name.includes('Drama') || name.includes('Atlantic')) return '🎬';
    if (name.includes('News')) return '📡';
    if (name.includes('Arts')) return '🎨';
    if (name.includes('History')) return '🏛️';
    if (ch.category === 'Sports') return '🏆';
    if (ch.category === 'Cinema') return '🍿';
    return '📺';
  }

  // ==========================================================================
  // CHANNEL CARD BUILDER WITH ACCURATE LIVE BROADCAST METADATA
  // ==========================================================================

  buildChannelCardInner(ch, isFav, rank = null) {
    const icon = this.getChannelIcon(ch);
    const prog = window.ivtvEPG ? window.ivtvEPG.getCurrentProgram(ch.id) : null;
    const progTitle = prog ? prog.title : 'Live Television Broadcast';
    const progTime = prog ? `${prog.startTimeFormatted} - ${prog.endTimeFormatted}` : '24/7 Live HD';
    const progLeft = prog ? `${prog.minutesLeft}m left` : 'Live';
    const progPercent = prog ? (prog.progressPercent || 35) : 35;
    const chNum = ch.chNumber ? `CH ${ch.chNumber}` : '';
    const logoSrc = ch.logo || (ch.logoUrl || '');
    const fallbackLogoSrc = ch.logoUrl || '';

    const liveBadge = rank
      ? `<span class="card-live-chip most-viewed-pill"><span class="live-pulse-dot" style="width:5px;height:5px;"></span> #${rank} MOST VIEWED</span>`
      : `<span class="card-live-chip"><span class="live-pulse-dot" style="width:5px;height:5px;"></span> LIVE</span>`;

    const viewsBadge = rank
      ? `<span class="card-views-count highlight-views">🔥 ${ch.views} viewers</span>`
      : `<span class="card-views-count">👁 ${ch.views}</span>`;

    return `
      <div class="card-media">
        <div class="card-media-bg card-media-logo-wrap" style="background: ${ch.gradient};">
          <div class="card-logo-ambient-glow" style="background: ${ch.gradient};"></div>
          <img class="card-channel-logo-img" 
               src="${logoSrc}" 
               alt="${ch.name} Logo" 
               loading="lazy"
               onerror="if (this.dataset.fb !== '1' && '${fallbackLogoSrc}') { this.dataset.fb = '1'; this.src = '${fallbackLogoSrc}'; } else { this.style.display='none'; this.nextElementSibling.style.display='flex'; }">
          <div class="card-logo-fallback-badge" style="display: none;">
            <span style="font-size: 1.6rem; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));">${icon}</span>
            <span style="text-shadow: 0 2px 8px rgba(0,0,0,0.7);">${ch.name}</span>
          </div>
        </div>
        <div class="card-media-overlay">
          <div class="card-play-icon">
            <svg width="18" height="18" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
        <div class="card-top-badges">
          ${liveBadge}
          ${chNum ? `<span class="card-ch-pill">${chNum}</span>` : ''}
          <button class="card-fav-btn ${isFav ? 'active' : ''}" title="Favorite" onclick="event.stopPropagation(); window.UIControllerInstance.handleFavClick('${ch.id}', this)">
            ★
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-header-line">
          <span class="card-title">${ch.name}</span>
          ${chNum ? `<span class="card-ch-num-badge">${chNum}</span>` : ''}
        </div>

        <!-- Real-Time Broadcast Programme Details -->
        <div class="card-live-now-block">
          <div class="card-now-playing-title" title="${progTitle}">
            <span class="card-now-pulse-dot"></span>
            <span class="card-now-text">${progTitle}</span>
          </div>
          <div class="card-prog-meta-row">
            <span class="card-prog-time">${progTime}</span>
            <span class="card-prog-remaining">${progLeft}</span>
          </div>
          <div class="card-prog-progress-wrap">
            <div class="card-prog-progress-fill" style="width: ${progPercent}%;"></div>
          </div>
        </div>

        <div class="card-subinfo">
          <span class="card-category-tag">${ch.genre || ch.category}</span>
          ${viewsBadge}
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // TOP RANKED CHANNELS WITH GIANT OUTLINED NUMERALS (1, 2, 3...)
  // ==========================================================================

  renderTopRanked() {
    const track = document.getElementById('ranked-channels-track');
    if (!track) return;

    // Sort channels strictly by real-time view count descending (most viewed)
    const sorted = [...window.IVTV_DATA.channels]
      .sort((a, b) => (b.viewsNum || 0) - (a.viewsNum || 0))
      .slice(0, 10);

    track.innerHTML = sorted.map((ch, index) => {
      const isFav = window.ivtvStorage && window.ivtvStorage.isFavorite(ch.id);
      const rank = index + 1;
      return `
        <div class="ranked-card-wrapper" data-channel-id="${ch.id}">
          <div class="giant-rank-numeral rank-${rank}">${rank}</div>
          <div class="ranked-channel-card" onclick="window.ivtvPlayer.openPlayer('${ch.id}')">
            ${this.buildChannelCardInner(ch, isFav, rank)}
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // STREAMING PROVIDERS / NETWORK PILLS BAR
  // ==========================================================================

  renderProvidersBar() {
    const bar = document.getElementById('providers-bar');
    if (!bar) return;

    bar.innerHTML = window.IVTV_DATA.networks.map(net => {
      const iconContent = net.icon 
        ? `<img src="${net.icon}" class="provider-logo-img" alt="${net.name}" onerror="this.outerHTML='${net.name.charAt(0)}'">` 
        : net.name.charAt(0);

      return `
        <button class="provider-badge-btn ${this.activeFilter === net.id ? 'active' : ''}" data-filter="${net.id}">
          <div class="provider-logo-circle ${net.badgeClass || ''}">${iconContent}</div>
          <span>${net.name}</span>
        </button>
      `;
    }).join('');

    bar.querySelectorAll('.provider-badge-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeFilter = btn.dataset.filter;
        this.renderProvidersBar();
        this.applyFilter();
      });
    });
  }

  // ==========================================================================
  // ALL UK CHANNELS COMPLETE DIRECTORY CONTROLLER
  // ==========================================================================

  renderAllUKChannels() {
    const grid = document.getElementById('all-channels-grid');
    const track = document.getElementById('all-channels-track');
    const carouselWrapper = document.getElementById('all-channels-carousel-wrapper');
    const emptyState = document.getElementById('all-channels-empty');
    const statusText = document.getElementById('all-channels-status-text');
    const counterBadge = document.getElementById('all-uk-channels-counter');

    if (!grid) return;

    let channels = [...window.IVTV_DATA.channels];

    // Filter by Category
    if (this.allChannelsCategory && this.allChannelsCategory !== 'all') {
      channels = channels.filter(ch => ch.category === this.allChannelsCategory);
    }

    // Filter by In-Section Search Query
    if (this.allChannelsQuery) {
      const q = this.allChannelsQuery.toLowerCase().trim();
      channels = channels.filter(ch => {
        return ch.name.toLowerCase().includes(q) ||
               (ch.chNumber && ch.chNumber.toString().includes(q)) ||
               (ch.genre && ch.genre.toLowerCase().includes(q)) ||
               (ch.category && ch.category.toLowerCase().includes(q)) ||
               (Array.isArray(ch.tags) && ch.tags.some(t => t.toLowerCase().includes(q)));
      });
    }

    // Sort Channels
    if (this.allChannelsSort === 'lcn') {
      channels.sort((a, b) => (a.chNumber || 999) - (b.chNumber || 999));
    } else if (this.allChannelsSort === 'views') {
      channels.sort((a, b) => (b.viewsNum || 0) - (a.viewsNum || 0));
    } else if (this.allChannelsSort === 'name') {
      channels.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.allChannelsSort === 'rating') {
      channels.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    // Update Counts & Badges
    const totalCount = window.IVTV_DATA.channels.length;
    if (counterBadge) {
      counterBadge.textContent = `${totalCount} Live Channels`;
    }
    if (statusText) {
      statusText.textContent = `Showing ${channels.length} of ${totalCount} UK Channels`;
    }

    // Update Pill Count Badges
    const sportsCount = window.IVTV_DATA.channels.filter(c => c.category === 'Sports').length;
    const cinemaCount = window.IVTV_DATA.channels.filter(c => c.category === 'Cinema').length;
    const entCount = window.IVTV_DATA.channels.filter(c => c.category === 'Entertainment').length;
    const newsCount = window.IVTV_DATA.channels.filter(c => c.category === 'News').length;

    const countAll = document.getElementById('count-pill-all');
    const countSports = document.getElementById('count-pill-sports');
    const countCinema = document.getElementById('count-pill-cinema');
    const countEnt = document.getElementById('count-pill-entertainment');
    const countNews = document.getElementById('count-pill-news');

    if (countAll) countAll.textContent = totalCount;
    if (countSports) countSports.textContent = sportsCount;
    if (countCinema) countCinema.textContent = cinemaCount;
    if (countEnt) countEnt.textContent = entCount;
    if (countNews) countNews.textContent = newsCount;

    // Handle Empty State
    if (channels.length === 0) {
      if (grid) grid.style.display = 'none';
      if (carouselWrapper) carouselWrapper.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Render Cards HTML
    const cardsHtml = channels.map(ch => {
      const isFav = window.ivtvStorage && window.ivtvStorage.isFavorite(ch.id);
      return `
        <div class="channel-card" data-channel-id="${ch.id}" onclick="window.ivtvPlayer.openPlayer('${ch.id}')">
          ${this.buildChannelCardInner(ch, isFav)}
        </div>
      `;
    }).join('');

    // Update Layout Mode (Grid vs Carousel)
    if (this.allChannelsView === 'carousel') {
      if (grid) grid.style.display = 'none';
      if (carouselWrapper) {
        carouselWrapper.style.display = 'block';
        if (track) track.innerHTML = cardsHtml;
      }
    } else {
      if (carouselWrapper) carouselWrapper.style.display = 'none';
      if (grid) {
        grid.style.display = 'grid';
        grid.innerHTML = cardsHtml;
      }
    }
  }

  setupAllChannelsEventListeners() {
    // View Toggle Buttons (Grid vs Carousel)
    const btnGrid = document.getElementById('view-toggle-grid');
    const btnCarousel = document.getElementById('view-toggle-carousel');

    if (btnGrid) {
      btnGrid.addEventListener('click', () => {
        btnGrid.classList.add('active');
        btnCarousel?.classList.remove('active');
        this.allChannelsView = 'grid';
        this.renderAllUKChannels();
      });
    }

    if (btnCarousel) {
      btnCarousel.addEventListener('click', () => {
        btnCarousel.classList.add('active');
        btnGrid?.classList.remove('active');
        this.allChannelsView = 'carousel';
        this.renderAllUKChannels();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('all-channels-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.allChannelsSort = e.target.value;
        this.renderAllUKChannels();
      });
    }

    // Subfilter Category Pills
    const filterPills = document.querySelectorAll('#all-channels-filter-pills .filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.allChannelsCategory = pill.dataset.category;
        this.renderAllUKChannels();
      });
    });

    // In-Section Quick Search Input
    const quickInput = document.getElementById('all-channels-quick-input');
    const quickClear = document.getElementById('all-channels-quick-clear');

    if (quickInput) {
      quickInput.addEventListener('input', (e) => {
        this.allChannelsQuery = e.target.value;
        if (quickClear) {
          quickClear.style.display = this.allChannelsQuery ? 'flex' : 'none';
        }
        this.renderAllUKChannels();
      });
    }

    if (quickClear) {
      quickClear.addEventListener('click', () => {
        if (quickInput) quickInput.value = '';
        this.allChannelsQuery = '';
        quickClear.style.display = 'none';
        this.renderAllUKChannels();
      });
    }
  }

  resetAllChannelsFilters() {
    this.allChannelsCategory = 'all';
    this.allChannelsQuery = '';
    const quickInput = document.getElementById('all-channels-quick-input');
    const quickClear = document.getElementById('all-channels-quick-clear');
    if (quickInput) quickInput.value = '';
    if (quickClear) quickClear.style.display = 'none';

    document.querySelectorAll('#all-channels-filter-pills .filter-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.category === 'all');
    });

    this.renderAllUKChannels();
  }

  // ==========================================================================
  // CATEGORY CAROUSEL ROWS
  // ==========================================================================

  renderCategorySections() {
    this.renderRow('entertainment-track', ch => ch.category === 'Entertainment');
    this.renderRow('cinema-track', ch => ch.category === 'Cinema');
    this.renderRow('news-track', ch => ch.category === 'News');
    this.renderRow('sports-track', ch => ch.category === 'Sports');
    this.renderFavoritesRow();
  }

  renderRow(containerId, filterFn) {
    const track = document.getElementById(containerId);
    if (!track) return;

    const channels = window.IVTV_DATA.channels.filter(filterFn);

    track.innerHTML = channels.map(ch => {
      const isFav = window.ivtvStorage && window.ivtvStorage.isFavorite(ch.id);
      return `
        <div class="channel-card" data-channel-id="${ch.id}" onclick="window.ivtvPlayer.openPlayer('${ch.id}')">
          ${this.buildChannelCardInner(ch, isFav)}
        </div>
      `;
    }).join('');
  }

  renderFavoritesRow() {
    const container = document.getElementById('favorites-section');
    const track = document.getElementById('favorites-track');
    if (!container || !track) return;

    const favIds = window.ivtvStorage ? window.ivtvStorage.getFavorites() : [];
    const favChannels = window.IVTV_DATA.channels.filter(c => favIds.includes(c.id));

    if (favChannels.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'block';
    track.innerHTML = favChannels.map(ch => `
      <div class="channel-card" data-channel-id="${ch.id}" onclick="window.ivtvPlayer.openPlayer('${ch.id}')">
        ${this.buildChannelCardInner(ch, true)}
      </div>
    `).join('');
  }

  // ==========================================================================
  // BROWSE BY GENRE TILES
  // ==========================================================================

  renderGenreTiles() {
    const grid = document.getElementById('genre-grid');
    if (!grid) return;

    grid.innerHTML = window.IVTV_DATA.genres.map(g => `
      <div class="genre-tile" onclick="window.UIControllerInstance.filterByGenre('${g.category}')">
        <div class="genre-tile-backdrop" style="background: ${g.gradient};"></div>
        <div class="genre-tile-gradient"></div>
        <div class="genre-tile-title">${g.icon} ${g.name}</div>
      </div>
    `).join('');
  }

  filterByGenre(category) {
    this.activeFilter = category;
    this.renderProvidersBar();
    this.applyFilter();
    window.showToast(`Showing ${category} channels`, 'info');
    
    // Smooth scroll to relevant section
    const target = document.getElementById(`${category.toLowerCase()}-section`) || document.getElementById('top-ranked-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ==========================================================================
  // SEARCH & FILTERING LOGIC
  // ==========================================================================

  handleSearch(query) {
    this.searchQuery = query.toLowerCase().trim();
    const searchSection = document.getElementById('search-results-section');
    const searchGrid = document.getElementById('search-results-grid');
    const mainSections = document.getElementById('main-content-flow');

    if (!this.searchQuery) {
      if (searchSection) searchSection.classList.remove('active');
      if (mainSections) mainSections.style.display = 'block';
      return;
    }

    if (mainSections) mainSections.style.display = 'none';
    if (searchSection) searchSection.classList.add('active');

    const matches = window.IVTV_DATA.channels.filter(ch => {
      const q = this.searchQuery;
      return ch.name.toLowerCase().includes(q) ||
             (ch.chNumber && ch.chNumber.toString().includes(q)) ||
             ch.category.toLowerCase().includes(q) ||
             (ch.genre && ch.genre.toLowerCase().includes(q)) ||
             (Array.isArray(ch.tags) && ch.tags.some(t => t.toLowerCase().includes(q)));
    });

    const titleEl = document.getElementById('search-results-title');
    if (titleEl) {
      titleEl.textContent = `Search results for "${query}" (${matches.length})`;
    }

    if (searchGrid) {
      if (matches.length === 0) {
        searchGrid.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-state-icon">🔍</div>
            <div class="empty-state-title">No channels found</div>
            <div class="empty-state-desc">Try searching for "BBC", "ITV", "Premier League", "F1", or channel numbers like "101"</div>
          </div>
        `;
      } else {
        searchGrid.innerHTML = matches.map(ch => {
          const isFav = window.ivtvStorage && window.ivtvStorage.isFavorite(ch.id);
          return `
            <div class="channel-card" style="flex: auto;" data-channel-id="${ch.id}" onclick="window.ivtvPlayer.openPlayer('${ch.id}')">
              ${this.buildChannelCardInner(ch, isFav)}
            </div>
          `;
        }).join('');
      }
    }
  }

  applyFilter() {
    const filter = this.activeFilter;
    const allSection = document.getElementById('all-uk-channels-section');
    const sportsSection = document.getElementById('sports-section');
    const cinemaSection = document.getElementById('cinema-section');
    const entertainmentSection = document.getElementById('entertainment-section');
    const newsSection = document.getElementById('news-section');

    const showAll = () => {
      if (allSection) allSection.style.display = 'block';
      if (sportsSection) sportsSection.style.display = 'block';
      if (cinemaSection) cinemaSection.style.display = 'block';
      if (entertainmentSection) entertainmentSection.style.display = 'block';
      if (newsSection) newsSection.style.display = 'block';
    };

    if (filter === 'all') {
      showAll();
    } else if (filter === 'sky-sports' || filter === 'Sports') {
      if (allSection) allSection.style.display = 'block';
      if (sportsSection) sportsSection.style.display = 'block';
      if (cinemaSection) cinemaSection.style.display = 'none';
      if (entertainmentSection) entertainmentSection.style.display = 'none';
      if (newsSection) newsSection.style.display = 'none';
      sportsSection.scrollIntoView({ behavior: 'smooth' });
    } else if (filter === 'sky-cinema' || filter === 'film4' || filter === 'Cinema') {
      if (allSection) allSection.style.display = 'block';
      if (sportsSection) sportsSection.style.display = 'none';
      if (cinemaSection) cinemaSection.style.display = 'block';
      if (entertainmentSection) entertainmentSection.style.display = 'none';
      if (newsSection) newsSection.style.display = 'none';
      cinemaSection.scrollIntoView({ behavior: 'smooth' });
    } else if (filter === 'news-network' || filter === 'News' || filter === 'sky-news') {
      if (allSection) allSection.style.display = 'block';
      if (sportsSection) sportsSection.style.display = 'none';
      if (cinemaSection) cinemaSection.style.display = 'none';
      if (entertainmentSection) entertainmentSection.style.display = 'none';
      if (newsSection) newsSection.style.display = 'block';
      newsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Entertainment (BBC, ITV, Sky Atlantic, Sky Showcase, etc.)
      if (allSection) allSection.style.display = 'block';
      if (sportsSection) sportsSection.style.display = 'none';
      if (cinemaSection) cinemaSection.style.display = 'none';
      if (entertainmentSection) entertainmentSection.style.display = 'block';
      if (newsSection) newsSection.style.display = 'none';
      entertainmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleFavClick(channelId, btn) {
    const added = window.ivtvStorage.toggleFavorite(channelId);
    btn.classList.toggle('active', added);
    this.renderFavoritesRow();
    this.renderAllUKChannels();
    window.showToast(added ? 'Added to Favorites' : 'Removed from Favorites', added ? 'success' : 'info');
  }

  // ==========================================================================
  // LIVE TV GUIDE (EPG) RENDERING & TIMELINE CONTROLLER
  // ==========================================================================

  renderEPG() {
    const gridLayout = document.getElementById('epg-grid-layout');
    if (!gridLayout || !window.ivtvEPG) return;

    const now = new Date();
    // Anchor to 18:00 if currently in evening (18-24), otherwise start at current hour
    const windowStart = new Date(now);
    if (now.getHours() >= 18) {
      windowStart.setHours(18, 0, 0, 0);
    } else {
      windowStart.setMinutes(0, 0, 0);
    }

    const windowHours = 6;
    const windowDurationMinutes = windowHours * 60;
    const pixelsPerHour = 220;
    const totalTimelineWidth = windowHours * pixelsPerHour;

    // Time slots
    const slots = window.ivtvEPG.getTimeSlots(windowStart, windowHours);

    // Channels to show
    let channels = window.IVTV_DATA.channels;
    if (this.activeEPGCategory && this.activeEPGCategory !== 'all') {
      channels = channels.filter(c => c.category === this.activeEPGCategory);
    }

    // Calculate NOW line offset (240px channel column + minute progress)
    const nowMinutes = (now.getTime() - windowStart.getTime()) / (60 * 1000);
    const nowLeftPx = 240 + Math.round(nowMinutes * (pixelsPerHour / 60));

    let html = `
      <!-- Time Header Row -->
      <div class="epg-time-header-row">
        <div class="epg-channel-header-spacer">CHANNELS (${channels.length})</div>
        <div class="epg-time-slots-container">
          ${slots.map(s => `
            <div class="epg-time-slot" style="flex: 0 0 ${pixelsPerHour}px; width: ${pixelsPerHour}px;">
              <span>🕒</span>
              <span>${s.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Red Vertical NOW Marker Line -->
      <div class="epg-now-marker-line" id="epg-now-marker" style="left: ${nowLeftPx}px;"></div>
    `;

    html += channels.map(ch => {
      const icon = this.getChannelIcon(ch);
      const programs = window.ivtvEPG.getProgramsInWindow(ch.id, windowStart, windowDurationMinutes, pixelsPerHour);
      const logoSrc = ch.logo || (ch.logoUrl || '');
      const fallbackLogo = ch.logoUrl || '';
      const logoHtml = logoSrc 
        ? `<img src="${logoSrc}" class="epg-channel-logo-img" alt="${ch.name}" loading="lazy" onerror="if(this.dataset.fb!=='1'&&'${fallbackLogo}'){this.dataset.fb='1';this.src='${fallbackLogo}';}else{this.outerHTML='<span class=\\'epg-channel-icon\\'>${icon}</span>';}">`
        : `<span class="epg-channel-icon">${icon}</span>`;

      return `
        <div class="epg-channel-row" data-channel-id="${ch.id}">
          <div class="epg-channel-col">
            <div class="epg-channel-meta">
              ${logoHtml}
              <div class="epg-channel-name-group">
                <span class="epg-channel-name" title="${ch.name}">${ch.name}</span>
                <span class="epg-channel-cat">${ch.category}${ch.chNumber ? ` • CH ${ch.chNumber}` : ''}</span>
              </div>
            </div>
            <button class="epg-channel-play-btn" title="Watch ${ch.name} Live" onclick="window.ivtvPlayer.openPlayer('${ch.id}')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </button>
          </div>

          <div class="epg-programs-track">
            ${programs.map(prog => `
              <div class="epg-program-block ${prog.isLive ? 'is-live' : ''}" 
                   style="width: ${prog.widthPx}px; --progress: ${prog.progressPercent}%;"
                   data-channel-id="${ch.id}"
                   onclick="window.UIControllerInstance.handleProgramClick('${ch.id}', '${prog.id}')">
                <div class="epg-program-header">
                  <span class="epg-program-time">${prog.startTimeFormatted} - ${prog.endTimeFormatted}</span>
                  ${prog.isLive ? '<span class="epg-program-badge live-tag">LIVE</span>' : (prog.tag ? `<span class="epg-program-badge">${prog.tag}</span>` : '')}
                </div>
                <div class="epg-program-title">${prog.title}</div>
                <div class="epg-program-desc">${prog.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    gridLayout.innerHTML = html;
    gridLayout.style.minWidth = `${240 + totalTimelineWidth}px`;

    // Horizontal scroll gently on initial load to place the NOW marker in comfortable view
    if (!this.epgScrolled) {
      this.epgScrolled = true;
      const scrollWindow = document.getElementById('epg-scroll-window');
      if (scrollWindow && nowMinutes > 20) {
        setTimeout(() => {
          scrollWindow.scrollTo({ left: Math.max(0, nowLeftPx - 240 - 100), behavior: 'smooth' });
        }, 150);
      }
    }
  }

  handleProgramClick(channelId, progId) {
    const channel = window.IVTV_DATA.channels.find(c => c.id === channelId);
    if (!channel || !window.ivtvEPG) return;

    const schedule = window.ivtvEPG.getScheduleForChannel(channelId);
    const prog = schedule.find(p => p.id === progId) || window.ivtvEPG.getCurrentProgram(channelId);
    if (!prog) return;

    const modal = document.getElementById('epg-details-modal');
    if (!modal) return;

    const tagEl = document.getElementById('epg-modal-tag');
    const titleEl = document.getElementById('epg-modal-title');
    const chEl = document.getElementById('epg-modal-channel');
    const timeEl = document.getElementById('epg-modal-time');
    const descEl = document.getElementById('epg-modal-desc');
    const watchBtn = document.getElementById('epg-modal-watch-btn');
    const actionText = document.getElementById('epg-modal-action-text');

    const now = Date.now();
    const isLive = now >= prog.startTime.getTime() && now < prog.endTime.getTime();

    if (tagEl) {
      tagEl.textContent = isLive ? 'NOW LIVE' : (prog.tag || 'UPCOMING');
      tagEl.className = `epg-program-badge ${isLive ? 'live-tag' : ''}`;
    }
    if (titleEl) titleEl.textContent = prog.title;
    if (chEl) chEl.textContent = channel.name;
    if (timeEl) timeEl.textContent = `${prog.startTimeFormatted} - ${prog.endTimeFormatted} (${prog.durationMinutes} mins)`;
    if (descEl) descEl.textContent = prog.desc;
    if (actionText) actionText.textContent = isLive ? 'Watch Live Now' : 'Tune in to Channel';

    if (watchBtn) {
      watchBtn.onclick = () => {
        this.hideProgramDetails();
        this.closeTVGuide();
        window.ivtvPlayer.openPlayer(channelId);
      };
    }

    modal.classList.add('active');
  }

  hideProgramDetails() {
    const modal = document.getElementById('epg-details-modal');
    if (modal) modal.classList.remove('active');
  }

  // ==========================================================================
  // DEDICATED TV GUIDE MODAL CONTROLLERS
  // ==========================================================================

  openTVGuide() {
    const modal = document.getElementById('tv-guide-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.renderEPG();
      setTimeout(() => {
        const marker = document.getElementById('epg-now-marker');
        const scrollWin = document.getElementById('epg-scroll-window');
        if (marker && scrollWin) {
          const markerLeft = parseInt(marker.style.left, 10) || 240;
          scrollWin.scrollTo({ left: Math.max(0, markerLeft - 360), behavior: 'smooth' });
        }
      }, 120);
    }
  }

  closeTVGuide() {
    const modal = document.getElementById('tv-guide-modal');
    if (modal) {
      modal.classList.remove('active');
      if (!window.ivtvPlayer || !window.ivtvPlayer.isOpen) {
        document.body.style.overflow = '';
      }
    }
  }

  toggleTVGuide() {
    const modal = document.getElementById('tv-guide-modal');
    if (modal && modal.classList.contains('active')) {
      this.closeTVGuide();
    } else {
      this.openTVGuide();
    }
  }

  setupEPGClock() {
    const update = () => {
      const now = new Date();
      const clockDigits = document.getElementById('epg-clock-digits');
      if (clockDigits) {
        const h = now.getHours().toString().padStart(2, '0');
        const m = now.getMinutes().toString().padStart(2, '0');
        const s = now.getSeconds().toString().padStart(2, '0');
        clockDigits.textContent = `${h}:${m}:${s}`;
      }

      // Update position of red NOW marker line
      const marker = document.getElementById('epg-now-marker');
      if (marker) {
        const windowStart = new Date(now);
        if (now.getHours() >= 18) {
          windowStart.setHours(18, 0, 0, 0);
        } else {
          windowStart.setMinutes(0, 0, 0);
        }
        const nowMinutes = (now.getTime() - windowStart.getTime()) / (60 * 1000);
        const nowLeftPx = 240 + Math.round(nowMinutes * (220 / 60));
        marker.style.left = `${nowLeftPx}px`;
      }
    };

    update();
    if (this.epgClockTimer) clearInterval(this.epgClockTimer);
    this.epgClockTimer = setInterval(update, 1000);
  }

  // ==========================================================================
  // EVENT LISTENERS & HORIZONTAL SCROLL BUTTONS
  // ==========================================================================

  setupEventListeners() {
    // Remote Live EPG Sync Listener
    window.addEventListener('ivtv:epg-updated', () => {
      this.renderTopRanked();
      this.renderAllUKChannels();
      this.renderCategorySections();
      if (this.searchQuery) {
        this.handleSearch(this.searchQuery);
      }
      const modal = document.getElementById('tv-guide-modal');
      if (modal && modal.classList.contains('active')) {
        this.renderEPG();
      }
    });

    // Hero Nav Buttons
    const heroPrev = document.getElementById('hero-prev-btn');
    const heroNext = document.getElementById('hero-next-btn');
    if (heroPrev) heroPrev.onclick = () => this.prevHeroSlide();
    if (heroNext) heroNext.onclick = () => this.nextHeroSlide();

    // Nav Category Pills
    document.querySelectorAll('.nav-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.nav;
        if (filter === 'guide') {
          this.openTVGuide();
          return;
        }
        if (filter === 'favorites') {
          const favSection = document.getElementById('favorites-section');
          if (favSection) {
            favSection.style.display = 'block';
            favSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (filter === 'all') {
          this.activeFilter = 'all';
          this.applyFilter();
          const allSection = document.getElementById('all-uk-channels-section');
          if (allSection) {
            allSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          this.activeFilter = filter;
          this.applyFilter();
        }
      });
    });

    // Dedicated TV Guide Modal Close Trigger
    const guideCloseBtn = document.getElementById('tv-guide-modal-close-btn');
    const guideModal = document.getElementById('tv-guide-modal');
    if (guideCloseBtn) guideCloseBtn.addEventListener('click', () => this.closeTVGuide());
    if (guideModal) {
      guideModal.addEventListener('click', (e) => {
        if (e.target === guideModal) this.closeTVGuide();
      });
    }

    // Keyboard shortcuts for TV Guide
    window.addEventListener('keydown', (e) => {
      if ((e.key === 'g' || e.key === 'G') && document.activeElement.tagName !== 'INPUT' && (!window.ivtvPlayer || !window.ivtvPlayer.isOpen)) {
        this.toggleTVGuide();
      }
      if (e.key === 'Escape' && guideModal && guideModal.classList.contains('active')) {
        this.closeTVGuide();
      }
    });

    // EPG Category Filters
    document.querySelectorAll('.epg-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.epg-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeEPGCategory = btn.dataset.category;
        this.renderEPG();
      });
    });

    // EPG Details Modal Close Handlers
    const modalClose = document.getElementById('epg-modal-close-btn');
    const modalDismiss = document.getElementById('epg-modal-dismiss-btn');
    const modalOverlay = document.getElementById('epg-details-modal');
    if (modalClose) modalClose.addEventListener('click', () => this.hideProgramDetails());
    if (modalDismiss) modalDismiss.addEventListener('click', () => this.hideProgramDetails());
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) this.hideProgramDetails();
      });
    }

    // Search Input
    const searchInput = document.getElementById('nav-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    // Carousel Scroll Nav Buttons
    document.querySelectorAll('.carousel-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const track = document.getElementById(targetId);
        if (track) {
          const scrollAmount = track.clientWidth * 0.75;
          track.scrollBy({
            left: btn.classList.contains('prev') ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
          });
        }
      });
    });

    // Listen to storage changes
    window.addEventListener('ivtv:favorites-changed', () => {
      this.renderFavoritesRow();
      this.renderTopRanked();
      this.renderAllUKChannels();
    });
  }
}

// Global UI controller instance
window.UIControllerInstance = new UIController();
