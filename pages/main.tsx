import type { NextPage } from 'next'
import React from 'react';
import Layout from '../components/layout';
import { MainMenu } from '../components/main-menu';

const MainMenuPage: NextPage = () => {
  return (
    <Layout title={'メインメニュー | Ne:shogi'}>
      <MainMenu />
    </Layout>
  );
};

export default MainMenuPage
