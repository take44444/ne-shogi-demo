import type { NextPage } from 'next'
import React from 'react';
import Layout from '../components/layout';
import { RankMenu } from '../components/rank-menu';

const RankMenuPage: NextPage = () => {
  return (
    <Layout title={'ランクメニュー | Ne:shogi'}>
      <RankMenu />
    </Layout>
  );
};

export default RankMenuPage
