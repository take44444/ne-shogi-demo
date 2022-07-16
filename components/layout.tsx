import Head from 'next/head'
import React, { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import { Stage } from "@inlet/react-pixi";
import { ReactNode } from "react";
import { StatusLine } from './statusline';
import socketio_client from '../lib/socketio-client';
import { Rect, UText } from './util';

const Layout = (props: { title: string, children: ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const [logger, setLogger] = useState('-');
  const [rtt, setRtt] = useState(999);
  const io = useMemo(() => new socketio_client().connect(
    'dummy-url',
    {
      transports: ['websocket'],
      forceNew: true,
      reconnection: true
    }
  ), []);
  const children = useMemo(() => Children.map(props.children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { io: io, logger: setLogger });
    }
  }), [io]);
  const stageProps = {
    width: 1920,
    height: 1080,
    raf: false,
    renderOnComponentChange: true,
    options: {
      autoDensity: true,
      // resolution: resolution || 1,
      // antialias: resolution <= 1,
      backgroundColor: 0xE8E8FF,
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
          <Rect x={42} y={16} w={45} h={45} col={0x000000} />
          <UText x={100} y={20} h={42}
            text={'Ne:shogi'} col={0x000000} />
          {children}
          <StatusLine x={0} y={1060} w={1920} h={20} rtt={rtt} log={logger} />
        </Stage>
      }
    </div>
  );
};

export default Layout;