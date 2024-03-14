"use client";
import { FC } from "react";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { intPageView } from "@/utils/fbq";

export interface TrackingScriptProps {}

export const TrackingScript: FC<TrackingScriptProps> = () => {
  const pathname = usePathname();

  useEffect(() => {
    intPageView(pathname!);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {process.env.ENABLE_FACEBOOK_TRACKING && (
        <Script id="fb-tracking" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${process.env.FBPIXEL_TRACK_ID});
            `}
        </Script>
      )}
    </>
  );
};
