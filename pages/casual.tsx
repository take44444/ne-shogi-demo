import type { NextPage } from 'next'
import React from 'react';
import Layout from '../components/layout';
import { CasualMenu } from '../components/casual-menu';

const CasualMenuPage: NextPage = () => {
  return (
    <Layout title={'カジュアルメニュー | Ne:shogi'}>
      <CasualMenu />
    </Layout>
  );
};

export default CasualMenuPage
