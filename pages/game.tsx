import { Text } from '@inlet/react-pixi';
import type { NextPage } from 'next'
import { TextStyle } from 'pixi.js';
import React from 'react';
import Layout from '../components/layout';

const MainMenu: NextPage = () => {
  return (
    <Layout title={'メインメニュー | Ne:shogi'}>
      <Text x={100} y={100}
        text={'これはメインメニューです！'}
        style={new TextStyle({
          fontFamily: 'Noto Sans Mono',
          fontSize: 100,
          fill : 0x0077FF
        })}
      />
    </Layout>
  )
}

export default MainMenu
