// Persistent Storage Manager for CYBER THEME X (Room & DataStore Web-Equivalent)

const STORAGE_KEYS = {
  APPLIED_THEME_ID: 'ctx_applied_theme_id',
  CUSTOM_THEMES: 'ctx_custom_themes',
  FAVORITES: 'ctx_favorites',
  ACTIVE_HOME_SCREEN_ID: 'ctx_active_home_screen_id',
  CUSTOM_WIDGETS: 'ctx_custom_widgets',
  INSTALLED_WIDGET_IDS: 'ctx_installed_widget_ids',
  CONTROL_CENTER_CONFIG: 'ctx_control_center_config',
  STATUS_BAR_CONFIG: 'ctx_status_bar_config',
  ICON_PACK_CONFIG: 'ctx_icon_pack_config',
  APP_ICON_OVERRIDES: 'ctx_app_icon_overrides',
  USER_SETTINGS: 'ctx_user_settings',
};

export const StorageManager = {
  getAppliedThemeId(fallback: string): string {
    try {
      return localStorage.getItem(STORAGE_KEYS.APPLIED_THEME_ID) || fallback;
    } catch {
      return fallback;
    }
  },

  setAppliedThemeId(id: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLIED_THEME_ID, id);
    } catch (e) {
      console.warn('Storage save error', e);
    }
  },

  getCustomThemes<T>(fallback: T[]): T[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEMES);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  },

  saveCustomThemes<T>(themes: T[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_THEMES, JSON.stringify(themes));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  },

  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleFavorite(id: string): string[] {
    try {
      const favs = this.getFavorites();
      const updated = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  getInstalledWidgetIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INSTALLED_WIDGET_IDS);
      return data ? JSON.parse(data) : ['w-clock-cyber', 'w-battery-gauge'];
    } catch {
      return ['w-clock-cyber', 'w-battery-gauge'];
    }
  },

  setInstalledWidgetIds(ids: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INSTALLED_WIDGET_IDS, JSON.stringify(ids));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  },

  getCustomWidgets<T>(fallback: T[]): T[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_WIDGETS);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  },

  saveCustomWidgets<T>(widgets: T[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_WIDGETS, JSON.stringify(widgets));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  },

  exportFullBackup(): string {
    try {
      const backup: Record<string, unknown> = {};
      Object.entries(STORAGE_KEYS).forEach(([key, val]) => {
        const item = localStorage.getItem(val);
        if (item) {
          try {
            backup[key] = JSON.parse(item);
          } catch {
            backup[key] = item;
          }
        }
      });
      backup['exportTimestamp'] = Date.now();
      backup['device'] = 'Vivo T2x 5G';
      return JSON.stringify(backup, null, 2);
    } catch {
      return '{}';
    }
  },

  importFullBackup(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      Object.entries(STORAGE_KEYS).forEach(([key, val]) => {
        if (data[key] !== undefined) {
          localStorage.setItem(val, typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key]));
        }
      });
      return true;
    } catch {
      return false;
    }
  },

  clearAll(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    } catch (e) {
      console.warn('Storage clear error', e);
    }
  }
};
