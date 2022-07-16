import { memo, useState } from 'react';
import { Rect, UText } from './util'

const StatusLine = memo(function StatusLine_(props: {
  x: number,
  y: number,
  h: number,
  w: number,
  log: string,
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
      x={props.x+props.w*0.1} y={props.y} w={props.w*0.1} h={props.h}
    />
    <UText text={'接続数: 1'} col={0xE0E0FF}
      x={props.x+props.w*0.1+props.h*0.48} y={props.y+props.h*0.1}
      h={props.h*0.8}
    />
    <Rect col={0x111111}
      x={props.x+props.w*0.2} y={props.y} w={props.w*0.74} h={props.h}
    />
    <UText text={props.log} col={0xE0E0FF}
      x={props.x+props.w*0.94-props.h*0.48*(props.log.length+1)}
      y={props.y+props.h*0.1} h={props.h*0.8}
    />
    <Rect col={0xAAFF00}
      x={props.x+props.w*0.94} y={props.y} w={props.w*0.06} h={props.h}
    />
    <UText text={rtt} col={0x000000}
      x={props.x+props.w-props.h*0.48*(rtt.length+1)} y={props.y+props.h*0.1}
      h={props.h*0.8}
    />
    </>
  )
});

export { StatusLine };