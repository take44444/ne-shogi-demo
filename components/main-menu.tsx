import { Container } from '@inlet/react-pixi';
import { GlowFilter } from '@pixi/filter-glow';
import { Filter } from 'pixi.js';
import { Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import SocketIOClient from '../lib/socketio-client';
import { Circle, Hexagon, Rect, RRect, UText } from './util';

const ProgressBar = memo(function ProgressBar_(props: {
  x: number,
  y: number,
  w: number,
  h: number
  percentage: number
}) {
  return (
    <>
    <Rect x={props.x - props.w/2} y={props.y}
      h={props.h} w={props.w*props.percentage/100} col={0xAAFF00}
    />
    <Rect x={props.x + props.w*(props.percentage-50)/100} y={props.y}
      h={props.h} w={props.w*(100-props.percentage)/100} col={0x444444}
    />
    </>
  )
});

const RankBadge = memo(function RankBadge_(props: {
  rank: number
}) {
  const p = props.rank%100;
  return (
    <>
    <Hexagon x={500} y={500} radius={300} col={0x00DDFF} filters={
      [new GlowFilter({distance: 40, color: 0x00DDFF, outerStrength: 1.5})]
    }/>
    <Hexagon x={500} y={500} radius={290} col={0x181818} />
    <UText anchor={0.5} x={500} y={320} text={'プラチナ'} h={30}
      col={0x00DDFF} filters={
        [new GlowFilter({distance: 10, color: 0x00DDFF, outerStrength: 1.5})]
      }
    />
    <UText anchor={0.5} x={500} y={500} text={'2'} h={300} col={0xFFFFFF} />
    <UText anchor={0.5} x={400+p*2} y={645} text={`${props.rank}`} h={25} col={0xFFFFFF} />
    <UText anchor={0.5} x={400} y={690} text={`${props.rank-p}`} h={20} col={0xFFFFFF} />
    <UText anchor={0.5} x={600} y={690} text={`${props.rank-p+100}`} h={20} col={0xFFFFFF} />
    <ProgressBar x={500} y={665} w={200} h={7} percentage={p} />
    </>
  )
});

const PlayerBadge = memo(function PlayerBadge_(props: {
  userName: string,
  rank: number
}) {
  const p = props.rank%100;
  return (
    <>
    <RRect x={150} y={875} w={350} h={115} col={0x111111} filters={
      [new GlowFilter({distance: 40, color: 0x111111, outerStrength: 1.5})]
    }/>
    <Circle x={150} y={920} sz={90} col={0x111111} filters={
      [new GlowFilter({distance: 40, color: 0x111111, outerStrength: 1.5})]
    }/>
    <Circle x={150} y={920} sz={80} col={0xFFFFFF} />
    <UText x={250} y={890} text={`${props.userName}`} h={30} col={0xFFFFFF} />
    <UText x={250} y={930} text={'プラチナ2'} h={20} col={0x00DDFF} />
    <ProgressBar x={350} y={960} w={200} h={7} percentage={p} />
    </>
  )
});

const MenuButtons = memo(function MenuButtons_(props: {
  x: number,
  y: number,
  w: number,
  h: number,
  iH: number,
  links: {title: string, url: string}[]
}) {
  const [pointed, setPointed] = useState(0);
  const interval = (props.h - props.iH*props.links.length)
    / (props.links.length-1);
  const filters = useMemo(() => [
    new GlowFilter({distance: 35, color: 0x888888, outerStrength: 1.5})
  ], []);
  const callbacks = useMemo(() => {
    const ret = [];
    for (let i=0; i < props.links.length; i++) {
      ret.push(()=>{setPointed(i)});
    }
    return ret;
  }, [props.links]);
  return (
    <>
    {[...Array(props.links.length)].map((_, i) => (
      <MenuButton key={i} 
        x={props.x} y={props.y+(interval+props.iH)*i}
        w={props.w} h={props.iH}
        filters={filters} onPoint={callbacks[i]}
        title={props.links[i].title} url={props.links[i].url}
      />
    ))}
    <UText text={'>'} col={0x0A0A0A}
      x={props.x-props.iH*0.8}
      y={props.y+(interval+props.iH)*pointed+props.iH*0.1}
      h={props.iH*0.8}
    />
    </>
  );
});

const MenuButton = memo(function MenuButton_(props: {
  x: number,
  y: number,
  h: number,
  w: number,
  title: string,
  url: string,
  filters: Filter[],
  onPoint: () => void
}) {
  const [col, setCol] = useState(0x888888);
  const pointerOver = useCallback(() => {
    props.onPoint();
    setCol(0x002233);
  }, []);
  const pointerOut = useCallback(() => {
    setCol(0x888888);
  }, []);
  const pointerTap = useCallback(() => {
    return;
  }, []);

  return (
    <Container interactive={true} buttonMode={true}
      pointerover={pointerOver}
      pointerout={pointerOut}
      pointertap={pointerTap}
      filters={props.filters}
    >
      <RRect w={props.w} col={col} x={props.x} y={props.y} h={props.h} />
      <UText text={props.title} col={0xE8E8FF}
        x={props.x+props.h*0.42} y={props.y+props.h*0.35} h={props.h*0.3}
      />
    </Container>
  );
});

const MainMenu = memo(function MainMenu_(props: {
  io?: SocketIOClient
  logger?: Dispatch<SetStateAction<string>>
}) {
  const [followingList, setFollowingList] = useState([]);
  useEffect(() => {
    const requestType = 'user-info-detail';
    (props.logger!)(`<api> ${JSON.stringify({
      requestType : requestType
    })}`);
    props.io!.emit('api', {
      requestType : 'user-info-detail'
    }, (response: any) => (props.logger!)(`[received]: <api> ${JSON.stringify({
      requestType : requestType
    })}`));
  }, []);
  return (
    <>
    <RankBadge rank={1970} />
    <PlayerBadge userName={'take44444'} rank={1970} />
    <MenuButtons x={1090} y={270} w={500} h={500} iH={120} links={[
      {title: 'ランクマッチ', url: ''},
      {title: 'カジュアルマッチ', url: ''},
      {title: 'カスタムマッチ', url: ''}
    ]} />
    </>
    // <Text x={200} y={500} text={`${JSON.stringify(props.io?.clientEvents)}`}
    //   style={new TextStyle({
    //     fontFamily: 'Noto Sans Mono',
    //     fontSize: 70,
    //     fill : 0x000000
    //   })}
    //   interactive={true} buttonMode={true}
    //   pointertap={() => {
    //     (props.logger!)(`<- <api> ${JSON.stringify({
    //       requestType : 'user-info-detail'
    //     })}`);
    //     props.io!.emit('api', {
    //       requestType : 'user-info-detail'
    //     }, (response: any) => (props.logger!)(`-> <api> ${JSON.stringify(
    //       response
    //     )}`))
    //   }}
    // />
  )
});

export { MainMenu };