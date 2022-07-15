import { useTick } from '@inlet/react-pixi';
import { memo } from 'react';
import { Rect, UText } from './util'

const StatusLine = memo(function StatusLine_(props: {
  x: number,
  y: number,
  h: number,
  w: number,
  rtt: number
}) {
  const rtt = 'ping: ' + `${('   ' + (props.rtt)).slice(-3)}`;
  return (
    <>
    <Rect col={0x00BBFF}
      x={props.x} y={props.y} w={props.w*0.1} h={props.h}
    />
    <UText text={'STATUS'} col={0x000000}
      x={props.x+(props.w*0.1-props.h*0.48*6)/2} y={props.y+props.h*0.1}
      h={props.h*0.8}
    />
    <Rect col={0x222222}
      x={props.x+props.w*0.1} y={props.y} w={props.w*0.45} h={props.h}
    />
    <UText text={'接続数: 1'} col={0xE0E0FF}
      x={props.x+props.w*0.1+props.h*0.48} y={props.y+props.h*0.1}
      h={props.h*0.8}
    />
    <Rect col={0x111111}
      x={props.x+props.w*0.55} y={props.y} w={props.w*0.3} h={props.h}
    />
    <UText text={'This is demo.'} col={0xE0E0FF}
      x={props.x+props.w*0.85-props.h*0.48*14} y={props.y+props.h*0.1}
      h={props.h*0.8}
    />
    <Rect col={0xAAFF00}
      x={props.x+props.w*0.85} y={props.y} w={props.w*0.15} h={props.h}
    />
    <UText text={rtt} col={0x000000}
      x={props.x+props.w-props.h*0.48*(rtt.length+1)} y={props.y+props.h*0.1}
      h={props.h*0.8}
    />
    </>
  )
});

export { StatusLine };