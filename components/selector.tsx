import { Container } from "@inlet/react-pixi";
import { GlowFilter } from "@pixi/filter-glow";
import { Filter } from "pixi.js";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { RRect, UText } from "./util";

const RuleSelector = memo(function RuleSelector_(props: {
  x: number,
  y: number,
  h: number,
  w: number,
  iH: number,
  choices: {title: string}[],
  callback: (i: number) => void
}) {
  const [selected, setSelected] = useState(0);
  const interval = (props.h - props.iH*props.choices.length)
    / (props.choices.length-1);
  const filters = useMemo(() => [
    new GlowFilter({distance: 35, color: 0x888888, outerStrength: 1.5})
  ], []);
  const callbacks = useMemo(() => {
    const ret = [];
    for (let i=0; i<props.choices.length; i++) {
      ret.push(()=>{
        setSelected(i);
        props.callback(i);
      });
    }
    return ret;
  }, [props.choices]);
  return (
    <>
    {[...Array(props.choices.length)].map((_, i) => (
      <RuleButton key={i} title={props.choices[i].title}
        x={props.x} y={props.y+(interval+props.iH)*i}
        w={props.w} h={props.iH} selected={selected===i}
        filters={filters} onSelect={callbacks[i]}
      />
    ))}
    </>
  );
});

const RuleButton = memo(function MenuButton_(props: {
  x: number,
  y: number,
  h: number,
  w: number,
  title: string,
  filters: Filter[],
  selected: boolean,
  onSelect: () => void
}) {
  const [col, setCol] = useState(0x888888);
  const pointerTap = useCallback(() => {
    props.onSelect();
  }, []);
  useEffect(() => {
    if (props.selected) {
      setCol(0x002233);
    } else {
      setCol(0x888888);
    }
  }, [props.selected]);
  return (
    <Container interactive={true} buttonMode={true}
      pointertap={pointerTap}
      filters={props.filters}
    >
      <RRect w={props.w} col={col} x={props.x} y={props.y} h={props.h} />
      <UText text={props.title} col={0xE8E8FF}
        x={props.x+props.h*0.42} y={props.y+props.h*0.2} h={props.h*0.6}
      />
    </Container>
  );
});

export { RuleSelector };