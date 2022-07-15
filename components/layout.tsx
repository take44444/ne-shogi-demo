import Head from 'next/head'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Stage } from "@inlet/react-pixi";
import { ReactNode } from "react";
import { StatusLine } from './statusline';
import socketio_client from '../lib/socketio-client';

const Layout = (props: { title: string, children: ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const [rtt, setRtt] = useState(999);
  const io = useMemo(() => new socketio_client().connect(
    'dummy-url',
    {
      transports: ['websocket'],
      forceNew: true,
      reconnection: true
    }
  ), []);
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
    io.on('pong', (timestamp: number) => {
      setRtt(new Date().getTime() - timestamp
        + 9 + Math.floor(Math.random() * 20)
      );
    });
    setInterval(() => {
      io.emit('ping', new Date().getTime());
    }, 300);
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
          <StatusLine x={0} y={1060} w={1920} h={20} rtt={rtt} />
        </Stage>
      }
    </div>
  );
};

export default Layout;