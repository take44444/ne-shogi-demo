import { Container } from "@inlet/react-pixi";
import { GlowFilter } from "@pixi/filter-glow";
import { memo, useCallback, useMemo, useState } from "react";
import { RRect, UText } from "../util";

const PageButtons = memo(function PageButtons_(props: {
  x: number,
  y: number,
  w: number,
  h: number,
  iH: number,
  links: {title: string, url: string}[],
  disable: boolean
}) {
  // const [pointed, setPointed] = useState(0);
  const interval = (props.h - props.iH*props.links.length)
    / (props.links.length-1);
  // const callbacks = useMemo(() => {
  //   const ret = [];
  //   for (let i=0; i < props.links.length; i++) {
  //     ret.push(()=>{setPointed(i)});
  //   }
  //   return ret;
  // }, [props.links]);
  return (
    <>
    {[...Array(props.links.length)].map((_, i) => (
      <PageButton key={i} 
        x={props.x} y={props.y+(interval+props.iH)*i}
        w={props.w} h={props.iH}
        title={props.links[i].title} url={props.links[i].url}
        disable={props.disable}
      />
    ))}
    {/* <UText text={'>'} col={0x0A0A0A}
      x={props.x-props.iH*0.8}
      y={props.y+(interval+props.iH)*pointed+props.iH*0.1}
      h={props.iH*0.8}
    /> */}
    </>
  );
});

const PageButton = memo(function PageButton_(props: {
  x: number,
  y: number,
  h: number,
  w: number,
  title: string,
  url: string,
  disable: boolean
}) {
  const [col, setCol] = useState(0x888888);
  const pointerOver = useCallback(() => {
    // props.onPoint();
    setCol(0x002233);
  }, []);
  const pointerOut = useCallback(() => {
    setCol(0x888888);
  }, []);
  const pointerTap = useCallback(() => {
    if (props.url) location.href = props.url;
  }, []);

  return (
    <Container interactive={!props.disable} buttonMode={!props.disable}
      pointerover={pointerOver}
      pointerout={pointerOut}
      pointertap={pointerTap}
      filters={[
        new GlowFilter({distance: 35, color: 0x888888, outerStrength: 1.5})
      ]}
    >
      <RRect w={props.w} col={col} x={props.x} y={props.y} h={props.h} />
      <UText text={props.title} col={0xE8E8FF}
        x={props.x+props.h*0.42} y={props.y+props.h*0.35} h={props.h*0.3}
      />
    </Container>
  );
});

export { PageButtons };