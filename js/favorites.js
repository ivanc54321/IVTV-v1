/* ==========================================================================
   IVTV FAVORITES & STORAGE MANAGER
   ========================================================================== */

const IVTV_STORAGE_KEYS = {
  FAVORITES: 'ivtv_favorites_v1',
  RECENT: 'ivtv_recent_v1',
  LAST_CHANNEL: 'ivtv_last_channel_v1'
};

class FavoritesManager {
  constructor() {
    this.favorites = this.loadFavorites();
    this.recent = this.loadRecent();
  }

  loadFavorites() {
    try {
      const data = localStorage.getItem(IVTV_STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : ['sky-sports-premier-league-uk', 'sky-sports-f1-uk', 'sky-atlantic-uk'];
    } catch (e) {
      console.warn('LocalStorage error', e);
      return ['sky-sports-premier-league-uk', 'sky-sports-f1-uk'];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem(IVTV_STORAGE_KEYS.FAVORITES, JSON.stringify(this.favorites));
      window.dispatchEvent(new CustomEvent('ivtv:favorites-changed', { detail: { favorites: this.favorites } }));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }

  isFavorite(channelId) {
    return this.favorites.includes(channelId);
  }

  toggleFavorite(channelId) {
    const index = this.favorites.indexOf(channelId);
    let added = false;
    if (index > -1) {
      this.favorites.splice(index, 1);
      added = false;
    } else {
      this.favorites.push(channelId);
      added = true;
    }
    this.saveFavorites();
    return added;
  }

  getFavorites() {
    return [...this.favorites];
  }

  loadRecent() {
    try {
      const data = localStorage.getItem(IVTV_STORAGE_KEYS.RECENT);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  addToRecent(channelId) {
    try {
      this.recent = this.recent.filter(id => id !== channelId);
      this.recent.unshift(channelId);
      if (this.recent.length > 12) {
        this.recent = this.recent.slice(0, 12);
      }
      localStorage.setItem(IVTV_STORAGE_KEYS.RECENT, JSON.stringify(this.recent));
      localStorage.setItem(IVTV_STORAGE_KEYS.LAST_CHANNEL, channelId);
      window.dispatchEvent(new CustomEvent('ivtv:recent-changed', { detail: { recent: this.recent } }));
    } catch (e) {
      console.warn('LocalStorage recent save error', e);
    }
  }

  getRecent() {
    return [...this.recent];
  }
}

// Toast Notification Helper
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span style="font-size: 1.1rem;">${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Create Global Instance
window.ivtvStorage = new FavoritesManager();
window.showToast = showToast;
