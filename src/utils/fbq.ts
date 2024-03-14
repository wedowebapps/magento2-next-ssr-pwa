"use client";

interface WindowWithFBQ extends Window {
  fbq: Function;
}

declare const window: WindowWithFBQ;

export function intPageView(pathName: string) {
  if (
    process.env.ENABLE_FACEBOOK_TRACKING == "true" &&
    typeof window.fbq !== "undefined"
  ) {
    if (window && window.fbq) {
      window.fbq("track", "PageView");
    }
  }
}
