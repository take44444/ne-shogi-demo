import type { NextPage } from 'next'
import Head from 'next/head';
import React from 'react';
import { MainMenu } from '../components/main-menu';

const MainMenuPage: NextPage = () => {
  return (
    <>
    <Head>
      <title>{'メインメニュー | Ne:shogi'}</title>
      <meta name="description" content="Ne:Shogi" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <MainMenu />
    </>
  );
};

export default MainMenuPage
