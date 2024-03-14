class NamespacedCookie {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  _makeKey(key: string) {
    return `${this.key}__${key}`;
  }

  getItem(name: string) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${this._makeKey(name)}=`));

    if (!cookieValue) {
      return undefined;
    }

    return cookieValue.split("=")[1];
  }

  setItem(name: string, value: string, ttl?: number) {
    let expires = "";

    if (ttl) {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + ttl * 1000);
      expires = `; expires=${expirationDate.toUTCString()}`;
    }

    document.cookie = `${this._makeKey(name)}=${value}${expires}; path=/`;
  }

  removeItem(name: string) {
    document.cookie = `${this._makeKey(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

class CookiePersistence {
  static KEY = "WEDOCOMMERCE_COOKIE_PERSISTENCE";
  cookie: NamespacedCookie;

  constructor() {
    this.cookie = new NamespacedCookie(CookiePersistence.KEY);
  }

  getRawItem(name: string) {
    return this.cookie.getItem(name);
  }

  getItem(name: string) {
    const now = Date.now();
    const item = this.cookie.getItem(name);

    if (!item) {
      return undefined;
    }

    const { value, ttl, timeStored } = JSON.parse(item);

    if (ttl && now - timeStored > ttl * 1000) {
      this.cookie.removeItem(name);
      return undefined;
    }

    return JSON.parse(value);
  }

  setItem<T>(name: string, value: T, ttl?: number) {
    const timeStored = Date.now();
    this.cookie.setItem(
      name,
      JSON.stringify({
        value: JSON.stringify(value),
        timeStored,
        ttl,
      }),
      ttl,
    );
  }

  removeItem(name: string) {
    this.cookie.removeItem(name);
  }
}

export default CookiePersistence;
