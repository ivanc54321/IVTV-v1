/* ==========================================================================
   IVTV AD-FREE CINEMA THEATER PLAYER CONTROLLER
   Pure HTML5 Video + HLS.js with Crystal-Clear Audio Controls
   ========================================================================== */

class PlayerController {
  constructor() {
    this.modal = null;
    this.modalContainer = null;
    this.screenArea = null;
    this.video = null;
    this.youtubeIframe = null;
    this.loader = null;
    this.unmuteBadge = null;
    this.errorOverlay = null;
    this.engineBtn = null;
    this.engineIcon = null;
    this.engineLabel = null;
    this.volumeBtn = null;
    this.volumeSlider = null;
    this.volIcon = null;
    this.currentChannel = null;
    this.hls = null;
    this.isOpen = false;
    this.refreshTimer = null;
    this.watchdogTimer = null;
    this.engineMode = 'direct'; // 'direct' | 'mirror' | 'youtube'
    this.fallbackEmbedUrl = '';
    this.fatalErrorCount = 0;
  }

  init() {
    this.modal = document.getElementById('theater-modal');
    this.modalContainer = document.getElementById('theater-modal-container');
    this.screenArea = document.getElementById('theater-screen-area');
    this.video = document.getElementById('theater-video');
    this.youtubeIframe = document.getElementById('theater-youtube-iframe');
    this.loader = document.getElementById('theater-loader');
    this.unmuteBadge = document.getElementById('theater-unmute-badge');
    this.errorOverlay = document.getElementById('theater-error-overlay');
    this.engineBtn = document.getElementById('theater-engine-btn');
    this.engineIcon = document.getElementById('theater-engine-icon');
    this.engineLabel = document.getElementById('theater-engine-label');
    this.volumeBtn = document.getElementById('theater-volume-btn');
    this.volumeSlider = document.getElementById('theater-volume-slider');
    this.volIcon = document.getElementById('theater-vol-icon');

    // Close button
    const closeBtn = document.getElementById('theater-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closePlayer());
    }

    // Modal background click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closePlayer();
        }
      });
    }

    // Double-click screen area to toggle fullscreen
    if (this.screenArea) {
      this.screenArea.addEventListener('dblclick', (e) => {
        if (e.target.closest('button') || e.target.closest('input')) return;
        this.toggleFullscreen();
      });
    }

    // Fullscreen change events to update button state & CSS classes
    document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
    document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());

    // Unmute badge click
    if (this.unmuteBadge) {
      this.unmuteBadge.addEventListener('click', () => this.unmute());
    }

    // Video events for smooth playback tracking
    if (this.video) {
      this.video.addEventListener('click', () => {
        if (this.video.muted) {
          this.unmute();
        }
      });

      this.video.addEventListener('volumechange', () => {
        this.updateVolumeUI();
      });

      this.video.addEventListener('playing', () => {
        if (this.loader) this.loader.classList.add('hidden');
        if (this.errorOverlay) this.errorOverlay.classList.add('hidden');
        if (this.watchdogTimer) {
          clearTimeout(this.watchdogTimer);
          this.watchdogTimer = null;
        }
      });

      this.video.addEventListener('timeupdate', () => {
        if (this.video.currentTime > 0 && this.loader && !this.loader.classList.contains('hidden')) {
          this.loader.classList.add('hidden');
        }
      });

      // Video stalled or waiting: nudge forward into live buffer window
      this.video.addEventListener('waiting', () => {
        if (this.hls && this.video.buffered && this.video.buffered.length > 0) {
          const bufStart = this.video.buffered.start(0);
          if (this.video.currentTime < bufStart) {
            console.log(`[IVTV Player] Stalled behind buffer, nudging to live start: ${bufStart + 0.1}`);
            this.video.currentTime = bufStart + 0.1;
          }
        }
      });
    }

    // Stream Engine Toggle Button
    if (this.engineBtn) {
      this.engineBtn.addEventListener('click', () => this.toggleEngine());
    }

    // Error Overlay Buttons
    const errSwitchBtn = document.getElementById('theater-error-switch-btn');
    if (errSwitchBtn) {
      errSwitchBtn.addEventListener('click', () => this.switchToEmbedMirror());
    }

    const errRetryBtn = document.getElementById('theater-error-retry-btn');
    if (errRetryBtn) {
      errRetryBtn.addEventListener('click', () => {
        if (this.errorOverlay) this.errorOverlay.classList.add('hidden');
        this.reloadStream();
      });
    }

    // Dedicated Mute/Unmute button
    if (this.volumeBtn) {
      this.volumeBtn.addEventListener('click', () => this.toggleMute());
    }

    // Dedicated Volume Slider
    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (this.video) {
          this.video.volume = val;
          if (val > 0 && this.video.muted) {
            this.video.muted = false;
          }
          this.updateVolumeUI();
        }
      });
    }

    // Reload stream button
    const reloadBtn = document.getElementById('theater-reload-btn');
    if (reloadBtn) {
      reloadBtn.addEventListener('click', () => this.reloadStream());
    }

    // Fullscreen button
    const fsBtn = document.getElementById('theater-fs-btn');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    // Popout external button
    const popoutBtn = document.getElementById('theater-popout-btn');
    if (popoutBtn) {
      popoutBtn.addEventListener('click', () => this.openInNewWindow());
    }

    // Favorite toggle button inside player
    const favBtn = document.getElementById('theater-fav-btn');
    if (favBtn) {
      favBtn.addEventListener('click', () => this.togglePlayerFavorite());
    }

    // Cinema Wide Mode Toggle Button
    const wideBtn = document.getElementById('theater-cinema-mode-btn');
    if (wideBtn) {
      wideBtn.addEventListener('click', () => this.toggleCinemaWide());
    }

    // Channel Surf Drawer Toggle Button
    const surfToggleBtn = document.getElementById('theater-surf-toggle-btn');
    if (surfToggleBtn) {
      surfToggleBtn.addEventListener('click', () => this.toggleSurfDrawer());
    }

    // Channel Surf Drawer Close Button
    const surfCloseBtn = document.getElementById('theater-surf-close-btn');
    if (surfCloseBtn) {
      surfCloseBtn.addEventListener('click', () => this.toggleSurfDrawer(false));
    }

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closePlayer();
      }
      if ((e.key === 'f' || e.key === 'F') && this.isOpen && document.activeElement.tagName !== 'INPUT') {
        this.toggleFullscreen();
      }
      if ((e.key === 'm' || e.key === 'M') && this.isOpen && document.activeElement.tagName !== 'INPUT') {
        this.toggleMute();
      }
      if ((e.key === 'w' || e.key === 'W') && this.isOpen && document.activeElement.tagName !== 'INPUT') {
        this.toggleCinemaWide();
      }
      if ((e.key === 'c' || e.key === 'C') && this.isOpen && document.activeElement.tagName !== 'INPUT') {
        this.toggleSurfDrawer();
      }
      if ((e.key === 'e' || e.key === 'E') && this.isOpen && document.activeElement.tagName !== 'INPUT') {
        this.toggleEngine();
      }
    });

    // Listen to favorite change events
    window.addEventListener('ivtv:favorites-changed', () => {
      if (this.currentChannel) {
        this.updatePlayerFavState();
      }
    });
  }

  toggleCinemaWide() {
    if (!this.modal) return;
    const isWide = this.modal.classList.toggle('cinema-wide');
    const icon = document.getElementById('theater-wide-icon');
    const label = document.getElementById('theater-wide-label');
    if (icon) icon.textContent = isWide ? '⤡' : '⤢';
    if (label) label.textContent = isWide ? 'Standard' : 'Cinema Wide';
    window.showToast(isWide ? 'Cinema Wide Max Screen Enabled' : 'Standard View Enabled', 'info');
  }

  toggleSurfDrawer(forceState) {
    const drawer = document.getElementById('theater-surf-drawer');
    const toggleBtn = document.getElementById('theater-surf-toggle-btn');
    if (!drawer) return;

    if (forceState !== undefined) {
      if (forceState) {
        drawer.classList.remove('collapsed');
      } else {
        drawer.classList.add('collapsed');
      }
    } else {
      drawer.classList.toggle('collapsed');
    }

    const isVisible = !drawer.classList.contains('collapsed');
    if (toggleBtn) toggleBtn.classList.toggle('active', isVisible);
  }

  openPlayer(channelId) {
    const channel = window.IVTV_DATA.channels.find(c => c.id === channelId);
    if (!channel) return;

    this.currentChannel = channel;
    this.isOpen = true;
    this.engineMode = 'direct'; // Default to pristine direct stream

    // Synchronous User Gesture: prime sound to active
    if (this.video) {
      this.video.muted = false;
      this.video.volume = 1.0;
    }

    // Track recently watched
    if (window.ivtvStorage) {
      window.ivtvStorage.addToRecent(channel.id);
    }

    // Update Player UI details
    const chNumStr = channel.chNumber ? ` • CH ${channel.chNumber}` : '';
    const logoSrc = channel.logo || channel.logoUrl || '';
    const logoTag = logoSrc ? `<img src="${logoSrc}" class="theater-channel-logo" alt="${channel.name}">` : '';
    document.getElementById('theater-channel-title').innerHTML = `${logoTag}<span>${channel.name}${chNumStr}</span>`;
    document.getElementById('theater-channel-category').textContent = channel.category;
    document.getElementById('theater-channel-views').textContent = `${channel.views} viewers`;
    this.updatePlayerFavState();
    this.updatePlayerEPGTicker(channel.id);

    // Dismiss any open EPG details modal or TV Guide modal
    if (window.UIControllerInstance) {
      window.UIControllerInstance.hideProgramDetails();
      window.UIControllerInstance.closeTVGuide();
    }

    // Show modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Start playing ad-free stream
    this.playChannel(channel.id);

    // Populate in-player channel switcher
    this.renderInPlayerSurfList(channel.category, channel.id);
  }

  updatePlayerEPGTicker(channelId) {
    const tickerTitle = document.getElementById('theater-ticker-title');
    const tickerProgress = document.getElementById('theater-ticker-progress');
    const tickerTime = document.getElementById('theater-ticker-time');
    const tickerNext = document.getElementById('theater-ticker-next');

    if (!window.ivtvEPG) return;
    const current = window.ivtvEPG.getCurrentProgram(channelId);
    if (!current) return;

    if (tickerTitle) tickerTitle.textContent = current.title;
    if (tickerProgress) tickerProgress.style.width = `${current.progressPercent || 0}%`;
    if (tickerTime) {
      tickerTime.textContent = `${current.startTimeFormatted} - ${current.endTimeFormatted} (${current.minutesLeft}m left)`;
    }
    if (tickerNext) {
      if (current.next) {
        tickerNext.textContent = `${current.next.title} (${current.next.startTimeFormatted})`;
      } else {
        tickerNext.textContent = 'Stay tuned for upcoming broadcast';
      }
    }
  }

  async playChannel(channelId) {
    if (this.loader) {
      this.loader.classList.remove('hidden');
    }
    if (this.errorOverlay) {
      this.errorOverlay.classList.add('hidden');
    }
    this.hideUnmuteBadge();
    this.fatalErrorCount = 0;

    // Destroy existing Hls instance
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }



    // If user explicitly chose Mirror Player engine
    if (this.engineMode === 'mirror') {
      this.loadEmbedMirror(channelId);
      return;
    }

    // Direct HD Native Video + Hls.js Mode
    this.setEngineUI('direct', 'Direct HD');
    if (this.youtubeIframe) {
      this.youtubeIframe.src = '';
      this.youtubeIframe.style.display = 'none';
    }
    if (this.video) {
      this.video.style.display = 'block';
      this.video.currentTime = 0;
    }

    // Set 6-second Watchdog: If no video frames arrive, show recovery overlay
    this.watchdogTimer = setTimeout(() => {
      if (this.isOpen && this.engineMode === 'direct') {
        const isPlaying = this.video && !this.video.paused && this.video.currentTime > 0;
        if (!isPlaying) {
          console.warn('[IVTV Player] Watchdog timeout: stream buffering or blocked by ISP.');
          if (this.errorOverlay) this.errorOverlay.classList.remove('hidden');
          if (this.loader) this.loader.classList.add('hidden');
        }
      }
    }, 6000);

    try {
      // Query clean stream URL from local server API
      const res = await fetch(`/api/stream?channel=${channelId}`);
      const data = await res.json();

      if (data && data.success && data.type === 'youtube' && data.streamUrl) {
        this.setEngineUI('youtube', 'YouTube HD');
        if (this.video) {
          this.video.pause();
          this.video.style.display = 'none';
        }
        if (this.youtubeIframe) {
          this.youtubeIframe.style.display = 'block';
          this.youtubeIframe.removeAttribute('sandbox');
          this.youtubeIframe.src = data.streamUrl;
        }
        setTimeout(() => {
          if (this.loader) this.loader.classList.add('hidden');
        }, 800);
        return;
      }

      if (data && data.success && (data.type === 'hls' || data.type === 'hls-proxy') && data.streamUrl) {
        this.fallbackEmbedUrl = data.fallbackEmbedUrl || '';
        this.initHlsStream(data.streamUrl, data.channelSlug, data.currentToken, data.fallbackEmbedUrl);
      } else if (data && data.fallbackEmbedUrl) {
        console.log('[IVTV Player] Direct HLS unavailable, auto-switching to Mirror Player.');
        this.loadEmbedMirror(channelId, data.fallbackEmbedUrl);
      } else {
        throw new Error((data && data.error) || 'Stream lookup failed');
      }
    } catch (err) {
      console.warn('[IVTV Player] API lookup error, falling back to mirror:', err);
      this.loadEmbedMirror(channelId);
    }
  }

  initHlsStream(streamUrl, slug, token, fallbackEmbedUrl) {
    if (!this.video) return;

    const resolvedUrl = (typeof streamUrl === 'string' && streamUrl.startsWith('/'))
      ? (window.location.origin + streamUrl)
      : streamUrl;

    if (window.Hls && Hls.isSupported()) {
      this.hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
        maxBufferLength: 20,
        maxMaxBufferLength: 40,
        maxBufferSize: 60 * 1000 * 1000,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 8,
        liveDurationInfinity: true,
        maxBufferHole: 0.5,
        highBufferWatchdogPeriod: 2,
        nudgeOffset: 0.1,
        nudgeMaxRetry: 5,
        enableSoftwareAES: true
      });

      this.hls.loadSource(resolvedUrl);
      this.hls.attachMedia(this.video);

      // Buffer alignment helper: seeks past dead zero timestamp to active live buffer
      const syncLiveEdge = () => {
        if (!this.video || !this.video.buffered) return;
        if (this.video.buffered.length > 0) {
          const bufStart = this.video.buffered.start(0);
          const bufEnd = this.video.buffered.end(this.video.buffered.length - 1);
          if (this.video.currentTime < bufStart || (this.video.currentTime === 0 && bufStart > 0.5)) {
            const target = (this.hls && this.hls.liveSyncPosition) ? this.hls.liveSyncPosition : bufStart + 0.1;
            console.log(`[IVTV Player] Live edge sync: jumping from ${this.video.currentTime} to ${target}`);
            try {
              this.video.currentTime = target;
            } catch (e) {
              console.warn('[IVTV Player] Seek error:', e);
            }
          }
        }
      };

      const startPlayback = () => {
        if (!this.video) return;
        syncLiveEdge();

        // Attempt unmuted play first
        this.video.muted = false;
        this.video.volume = 1.0;

        const playPromise = this.video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Unmuted play granted by browser!
            this.hideUnmuteBadge();
            this.updateVolumeUI();
            if (this.loader) this.loader.classList.add('hidden');
            if (this.errorOverlay) this.errorOverlay.classList.add('hidden');
            if (this.watchdogTimer) {
              clearTimeout(this.watchdogTimer);
              this.watchdogTimer = null;
            }
          }).catch((err) => {
            console.log('[IVTV Player] Unmuted autoplay restricted, engaging muted play with sound badge:', err.name);
            // Browser autoplay policy required muted start -> Mute and play immediately!
            this.video.muted = true;
            this.video.play().then(() => {
              this.showUnmuteBadge();
              this.updateVolumeUI();
              if (this.loader) this.loader.classList.add('hidden');
              if (this.errorOverlay) this.errorOverlay.classList.add('hidden');
              if (this.watchdogTimer) {
                clearTimeout(this.watchdogTimer);
                this.watchdogTimer = null;
              }
            }).catch(e => console.warn('[IVTV Player] Muted play attempt notice:', e));
          });
        }
      };

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        startPlayback();
      });

      this.hls.on(Hls.Events.BUFFER_APPENDED, () => {
        syncLiveEdge();
        if (this.video && this.video.paused) {
          startPlayback();
        }
      });

      this.hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          this.fatalErrorCount++;
          console.warn(`[IVTV Player] Fatal HLS error #${this.fatalErrorCount} (${data.type}/${data.details})`);
          
          if (this.fatalErrorCount >= 3) {
            console.warn('[IVTV Player] Multiple fatal errors, auto-switching to Mirror Player.');
            this.loadEmbedMirror(this.currentChannel.id, fallbackEmbedUrl);
            return;
          }

          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              if (!resolvedUrl.includes('/api/proxy/hls')) {
                console.log('[IVTV Player] Direct HLS network error, retrying via Universal HLS Proxy...');
                const proxyUrl = `/api/proxy/hls?url=${encodeURIComponent(resolvedUrl)}`;
                this.initHlsStream(proxyUrl, slug, token, fallbackEmbedUrl);
                return;
              }
              setTimeout(() => {
                if (this.hls) this.hls.startLoad();
              }, 1200);
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              this.hls.recoverMediaError();
              break;
            default:
              this.reloadStream();
              break;
          }
        }
      });

      // Token auto-refresh every 4 minutes to maintain continuous 24/7 playback
      if (slug && token) {
        this.scheduleTokenRefresh(slug, token);
      }
    } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Apple Safari HLS playback
      this.video.src = streamUrl;
      this.video.muted = false;
      this.video.volume = 1.0;
      this.video.play().catch(() => {
        this.video.muted = true;
        this.video.play();
        this.showUnmuteBadge();
      });
      this.video.addEventListener('loadeddata', () => {
        if (this.loader) this.loader.classList.add('hidden');
      }, { once: true });
    }
  }

  loadEmbedMirror(channelId, customUrl) {
    this.engineMode = 'mirror';
    this.setEngineUI('mirror', 'Mirror Player');

    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    if (this.video) {
      this.video.pause();
      this.video.src = '';
      this.video.style.display = 'none';
    }
    this.hideUnmuteBadge();
    if (this.errorOverlay) {
      this.errorOverlay.classList.add('hidden');
    }
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }

    const ch = (window.IVTV_DATA && window.IVTV_DATA.channels.find(c => c.id === channelId)) || this.currentChannel;
    let embedUrl = customUrl || this.fallbackEmbedUrl || (ch && ch.iframeUrl) || `https://freeshot.live/embed/${channelId}.php`;

    // Strictly route external mirrors through the ad-sanitizing reverse proxy
    if (embedUrl && !embedUrl.includes('youtube') && !embedUrl.startsWith('/api/proxy/embed')) {
      embedUrl = `/api/proxy/embed?url=${encodeURIComponent(embedUrl)}`;
    }

    if (this.youtubeIframe) {
      this.youtubeIframe.style.display = 'block';
      this.youtubeIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-presentation');
      this.youtubeIframe.src = embedUrl;
    }

    setTimeout(() => {
      if (this.loader) this.loader.classList.add('hidden');
    }, 1200);

    window.showToast('Switched to Mirror Player ⚡', 'info');
  }

  switchToEmbedMirror() {
    if (!this.currentChannel) return;
    this.loadEmbedMirror(this.currentChannel.id);
  }

  toggleEngine() {
    if (!this.currentChannel) return;
    if (this.currentChannel.id === 'sky-news') return;

    if (this.engineMode === 'direct') {
      this.loadEmbedMirror(this.currentChannel.id);
    } else {
      this.engineMode = 'direct';
      this.playChannel(this.currentChannel.id);
      window.showToast('Switched to Direct HD Engine 🚀', 'info');
    }
  }

  setEngineUI(mode, label) {
    if (this.engineLabel) this.engineLabel.textContent = label;
    if (this.engineIcon) this.engineIcon.textContent = mode === 'direct' ? '⚡' : (mode === 'youtube' ? '▶' : '🪞');
    if (this.engineBtn) {
      this.engineBtn.classList.toggle('active', mode === 'mirror');
      this.engineBtn.style.display = (mode === 'youtube') ? 'none' : 'flex';
    }
  }

  unmute() {
    if (!this.video) return;
    this.video.muted = false;
    this.video.volume = 1.0;
    this.video.play().catch(() => {});
    this.hideUnmuteBadge();
    this.updateVolumeUI();
    window.showToast('Sound Enabled 🔊', 'success');
  }

  toggleMute() {
    if (!this.video) return;
    this.video.muted = !this.video.muted;
    if (!this.video.muted && this.video.volume === 0) {
      this.video.volume = 1.0;
    }
    this.updateVolumeUI();
  }

  updateVolumeUI() {
    if (!this.video) return;

    const isMuted = this.video.muted || this.video.volume === 0;

    if (this.volIcon) {
      if (isMuted) {
        this.volIcon.textContent = '🔇';
      } else if (this.video.volume > 0.5) {
        this.volIcon.textContent = '🔊';
      } else {
        this.volIcon.textContent = '🔉';
      }
    }

    if (this.volumeSlider) {
      this.volumeSlider.value = isMuted ? 0 : this.video.volume;
    }

    if (isMuted) {
      this.showUnmuteBadge();
    } else {
      this.hideUnmuteBadge();
    }
  }

  showUnmuteBadge() {
    if (this.unmuteBadge) {
      this.unmuteBadge.classList.remove('hidden');
    }
  }

  hideUnmuteBadge() {
    if (this.unmuteBadge) {
      this.unmuteBadge.classList.add('hidden');
    }
  }

  scheduleTokenRefresh(slug, token) {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);

    // Refresh every 240 seconds
    this.refreshTimer = setTimeout(async () => {
      try {
        const res = await fetch('/api/refresh_token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ channel: slug, current_token: token })
        });
        const data = await res.json();
        if (data && data.success && data.token && this.hls && this.currentChannel) {
          const newStreamUrl = `/api/stream?channel=${this.currentChannel.id}`;
          const newRes = await fetch(newStreamUrl);
          const newData = await newRes.json();
          if (newData && newData.streamUrl) {
            this.hls.loadSource(newData.streamUrl);
            this.scheduleTokenRefresh(slug, data.token);
          }
        }
      } catch (e) {
        console.warn('Token auto-refresh notice', e);
      }
    }, 240000);
  }

  closePlayer() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';

    // Stop and cleanup streams
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
    if (this.video) {
      this.video.pause();
      this.video.src = '';
    }
    if (this.youtubeIframe) {
      this.youtubeIframe.src = '';
    }
    this.hideUnmuteBadge();
    if (this.errorOverlay) {
      this.errorOverlay.classList.add('hidden');
    }
    this.currentChannel = null;
  }

  reloadStream() {
    if (!this.currentChannel) return;
    this.playChannel(this.currentChannel.id);
    window.showToast(`Reloading ${this.currentChannel.name}...`, 'info');
  }

  toggleFullscreen() {
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    if (isFs) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      const target = this.modalContainer || document.getElementById('theater-modal-container') || this.screenArea;
      if (!target) return;
      const req = target.requestFullscreen || target.webkitRequestFullscreen || target.mozRequestFullScreen || target.msRequestFullscreen;
      if (req) {
        req.call(target).catch(err => {
          console.warn('Container fullscreen fallback to video', err);
          if (this.video && this.video.requestFullscreen) {
            this.video.requestFullscreen().catch(() => {});
          }
        });
      } else if (this.video && this.video.requestFullscreen) {
        this.video.requestFullscreen().catch(() => {});
      }
    }
  }

  handleFullscreenChange() {
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    if (this.modalContainer) {
      this.modalContainer.classList.toggle('is-fullscreen', isFs);
    }
    const fsBtn = document.getElementById('theater-fs-btn');
    if (fsBtn) {
      const text = fsBtn.querySelector('span');
      const svg = fsBtn.querySelector('svg');
      if (text) text.textContent = isFs ? 'Exit Full' : 'Fullscreen';
      if (svg) {
        svg.innerHTML = isFs
          ? '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>'
          : '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>';
      }
    }
  }

  openInNewWindow() {
    if (!this.currentChannel) return;
    window.open(`/api/stream?channel=${this.currentChannel.id}`, '_blank');
    window.showToast('Opened stream in pop-out window', 'info');
  }

  togglePlayerFavorite() {
    if (!this.currentChannel || !window.ivtvStorage) return;
    const added = window.ivtvStorage.toggleFavorite(this.currentChannel.id);
    this.updatePlayerFavState();
    window.showToast(
      added ? `Added ${this.currentChannel.name} to Favorites` : `Removed ${this.currentChannel.name} from Favorites`,
      added ? 'success' : 'info'
    );
  }

  updatePlayerFavState() {
    const favBtn = document.getElementById('theater-fav-btn');
    if (!favBtn || !this.currentChannel) return;
    const isFav = window.ivtvStorage && window.ivtvStorage.isFavorite(this.currentChannel.id);
    favBtn.classList.toggle('active', isFav);
    favBtn.innerHTML = `
      <span>${isFav ? '★' : '☆'}</span>
      <span>${isFav ? 'Favorited' : 'Favorite'}</span>
    `;
  }

  renderInPlayerSurfList(currentCategory, currentChannelId) {
    const surfTrack = document.getElementById('theater-surf-list');
    if (!surfTrack) return;

    // Filter relevant channels (same category first, then others)
    const sorted = [...window.IVTV_DATA.channels].sort((a, b) => {
      if (a.category === currentCategory && b.category !== currentCategory) return -1;
      if (b.category === currentCategory && a.category !== currentCategory) return 1;
      return b.viewsNum - a.viewsNum;
    });

    surfTrack.innerHTML = sorted.map(ch => {
      const logoSrc = ch.logo || ch.logoUrl || '';
      const fallbackLogo = ch.logoUrl || '';
      const logoHtml = logoSrc 
        ? `<img src="${logoSrc}" class="surf-channel-logo" alt="${ch.name}" loading="lazy" onerror="if(this.dataset.fb!=='1'&&'${fallbackLogo}'){this.dataset.fb='1';this.src='${fallbackLogo}';}else{this.style.display='none';}">`
        : '';

      return `
        <div class="surf-channel-item ${ch.id === currentChannelId ? 'active' : ''}" data-channel-id="${ch.id}">
          ${logoHtml}
          <div class="surf-channel-info">
            <span class="surf-channel-name">
              ${ch.name}
              ${ch.chNumber ? `<span style="font-size: 0.68rem; color: var(--accent-emerald); font-weight: 800; margin-left: 0.25rem; background: rgba(0,240,118,0.12); padding: 0.05rem 0.25rem; border-radius: 3px;">${ch.chNumber}</span>` : ''}
            </span>
            <span class="surf-channel-category">${ch.category} • ${ch.views}</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click handlers
    surfTrack.querySelectorAll('.surf-channel-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.channelId;
        if (id && id !== this.currentChannel.id) {
          this.openPlayer(id);
        }
      });
    });
  }
}

// Global player controller
window.ivtvPlayer = new PlayerController();
