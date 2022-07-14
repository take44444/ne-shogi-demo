import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import { Stage } from "@inlet/react-pixi";
import { ReactNode } from "react";

const Layout = (props: { title: string, children: ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const stageProps = {
    width: 1920,
    height: 1080,
    raf: false,
    renderOnComponentChange: true,
    options: {
      autoDensity: true,
      // resolution: resolution || 1,
      // antialias: resolution <= 1,
      backgroundColor: 0xFFFFFF,
    },
  };
  useEffect(() => {
    import('webfontloader').then(module => {
      module.load({
        google: { families: ['Noto Sans Mono'] },
        active: () => setLoaded(true),
        inactive: () => alert('font loading failed')
      });}
    );
  }, []);
  return (
    <div id={"root"}>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Ne:Shogi" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {loaded &&
        <Stage {...stageProps}>
          {props.children}
        </Stage>
      }
    </div>
  );
};

export default Layout;