import { Container } from "@inlet/react-pixi";
import { GlowFilter } from "@pixi/filter-glow";
import { memo, useCallback, useEffect, useState } from "react";
import { Circle, Class, ProgressBar, rate2class, RRect, Tabs, UText } from "../util";

type KifuMetaInfo = {
  id: string,
  date: string,
  enemy: string,
  moves: number,
  result: boolean
};

const UserInfoDetail = memo(function UserInfoDetail_() {
  const [userInfoDetail, setUserInfoDetail] = useState<{
    userId: string,
    rates: [number, number, number],
    savedKifuList: KifuMetaInfo[],
    recentKifuList: KifuMetaInfo[]
  }>(
    {
      userId: '',
      rates: [0, 0, 0],
      savedKifuList: [],
      recentKifuList: []
    }
  );
  useEffect(() => {
    // fetch('', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     requestType: 'user-info-detail',
    //     data: []
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => setUserInfo(data.data));
    setUserInfoDetail(
      {
        userId: 'take44444',
        rates: [1679, 640, 1590],
        savedKifuList: [
          {
            id: '',
            date: '2022/06/22',
            enemy: '1omega1',
            moves: 103,
            result: true
          },
          {
            id: '',
            date: '2022/07/09',
            enemy: 'Ken',
            moves: 80,
            result: false
          }
          ,
          {
            id: '',
            date: '2022/07/11',
            enemy: 'Altema',
            moves: 120,
            result: false
          }
        ],
        recentKifuList: [
          {
            id: '',
            date: '2022/06/22',
            enemy: '1omega1',
            moves: 103,
            result: true
          },
          {
            id: '',
            date: '2022/07/11',
            enemy: 'Altema',
            moves: 120,
            result: false
          }
        ]
      }
    )
  }, []);
  return (
    <>
    <UText x={170} y={200} text={userInfoDetail.userId} h={50} col={0x000000} />
    {userInfoDetail.rates.map((rate, i) => (
      <Container key={i}>
      <UText x={370} y={350 + 200*i} h={35}
        text={`${rate}`} col={0x00DDFF}
      />
      <ProgressBar x={520} y={400 + 200*i} w={300} h={7}
        percentage={rate % 100}
      />
      <Class x={250} y={380 + 200*i} sz={80} rate={rate}
        callback={() => {}} disable={true}
      />
      </Container>
    ))}
    <Tabs x={900} y={200} titles={['最近の対局', 'お気に入り']}>
      <RRect key={'r'} x={850} y={270} w={800} h={600} col={0xDDDDDD} />
      <RRect key={'b'} x={850} y={270} w={800} h={600} col={0xFFFFFF} />
    </Tabs>
    {/* <KifuMetaInfoList key={'r'} />
      <KifuMetaInfoList key={'b'} /> */}
    </>
  )
});

export { UserInfoDetail };