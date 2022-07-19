import { Container } from '@inlet/react-pixi';
import { Graphics, Text } from '@inlet/react-pixi';
import { GlowFilter } from '@pixi/filter-glow';
import '@pixi/graphics-extras';
import { Filter, TextStyle, Graphics as PixiGraphics } from 'pixi.js';
import { Children, memo, ReactElement, ReactNode, useCallback, useMemo, useRef, useState } from 'react';

type Props = {
  anchor?: number,
  x: number,
  y: number,
  w?: number,
  h: number,
  text?: string,
  col: number,
  filters?: Filter[],
  interactive?: boolean,
  buttonMode?: boolean,
  pointertap?: () => void
};

const UText = memo(function UText_(props: Props) {
  return (
    <Text {...props}
      style={new TextStyle({
        fontFamily: 'Noto Sans Mono',
        fontSize: props.h,
        fill : props.col
      })}
    />
  )
});

const RRect = memo(function RRect_(props: Props) {
  const draw = useCallback((g: PixiGraphics) => {
    g.clear();
    g.beginFill(props.col);
    g.drawRoundedRect(props.x, props.y, props.w ?? 0, props.h, props.h*0.125);
    g.endFill();
    // g.interactive = props.interactive ?? false;
    // g.buttonMode = props.buttonMode ?? false;
    // if (props.pointertap) g.on('pointertap', props.pointertap);
    if (props.filters) g.filters = props.filters;
  }, [props]);

  return <Graphics draw={draw} />;
});

const Rect = memo(function Rect_(props: Props) {
  const draw = useCallback((g: PixiGraphics) => {
    g.clear();
    g.beginFill(props.col);
    g.drawRect(props.x, props.y, props.w ?? 0, props.h);
    g.endFill();
    // g.interactive = props.interactive ?? false;
    // g.buttonMode = props.buttonMode ?? false;
    // if (props.pointertap) g.on('pointertap', props.pointertap);
    if (props.filters) g.filters = props.filters;
  }, [props]);

  return <Graphics draw={draw} />;
});

const Hexagon = memo(function Hexagon_(props: {
  x: number,
  y: number,
  radius: number,
  col: number,
  filters?: Filter[]
}) {
  const draw = useCallback((g: PixiGraphics) => {
    g.clear();
    g.beginFill(props.col);
    (g.drawRegularPolygon!)(props.x, props.y, props.radius, 6, Math.PI/2);
    g.endFill();
    // g.interactive = props.interactive ?? false;
    // g.buttonMode = props.buttonMode ?? false;
    // if (props.pointertap) g.on('pointertap', props.pointertap);
    if (props.filters) g.filters = props.filters;
  }, [props]);

  return <Graphics draw={draw} />;
});

const Circle = memo(function Circle_(props: {
  x: number,
  y: number,
  sz: number,
  col: number,
  interactive?: boolean,
  buttonMode?: boolean,
  pointertap?: () => void,
  filters?: Filter[]
}) {
  const draw = useCallback((g: PixiGraphics) => {
    g.clear();
    g.beginFill(props.col);
    g.drawCircle(props.x, props.y, props.sz);
    g.endFill();
    g.interactive = props.interactive ?? false;
    g.buttonMode = props.buttonMode ?? false;
    if (props.pointertap) g.on('pointertap', props.pointertap);
    if (props.filters) g.filters = props.filters;
  }, [props]);

  return <Graphics draw={draw} />;
});

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

const Button = memo(function Button_(props: {
  x: number,
  y: number,
  sz: number,
  callback: () => void,
  disable: boolean
}) {
  return (
    <Circle x={props.x} y={props.y} sz={props.sz} col={0x111111}
      interactive={!props.disable} buttonMode={!props.disable}
      pointertap={props.callback} filters={
        [new GlowFilter({distance: 10, color: 0x111111, outerStrength: 1.5})]
      }
    />
  );
});

const Popup = memo(function Popup_(props: {
  w: number,
  h: number,
  show: boolean,
  callback: () => void,
  children: ReactNode
}) {
  return (
    <Container visible={props.show}>
      <RRect x={960-props.w/2} y={540-props.h/2} w={props.w} h={props.h}
        col={0x222222} filters={
          [new GlowFilter({distance: 40, color: 0x111111, outerStrength: 1.5})]
        }
      />
      <RRect x={970-props.w/2} y={550-props.h/2} w={props.w-20} h={props.h-20}
        col={0x888888}
      />
      <Circle x={960+props.w/2-90} y={540-props.h/2+70} sz={30} col={0xDD3322}
        interactive={true} buttonMode={true} pointertap={props.callback}
        filters={
          [new GlowFilter({distance: 5, color: 0xDD3322, outerStrength: 1.5})]
        }
      />
      {props.children}
    </Container>
  );
});

const Tabs = memo(function Tabs_(props: {
  x: number,
  y: number,
  titles: string[],
  children: ReactNode
}) {
  const [selected, setSelected] = useState(0);
  const selectors = useMemo(() => (
    props.titles.map((t, i) => (
      <Container key={i} interactive={true} buttonMode={true}
        pointertap={() => setSelected(i)}
      >
        <RRect x={props.x + 270 * i} y={props.y} w={250} h={100}
          col={0x444444}
        />
        <UText x={props.x + 24 + 270 * i} y={props.y + 25} h={40}
          text={props.titles[i]} col={0x000000}
        />
      </Container>
    ))
  ), []);
  const selectedTitle = useMemo(() => selectors[selected], [selected]);
  return (
    <>
    {selectors}
    {Children.map(props.children, (child, i) => (
      i === selected ? child : null
    ))}
    {selectedTitle}
    </>
  );
});

const rate2class = (rate: number): string => {
  rate = Math.floor(rate / 100);
  if (rate < 15) {
    return `${(15 - rate)}級`;
  }
  if (rate < 24) {
    return `${['初', '二', '三', '四', '五', '六', '七', '八', '九'][rate - 15]}段`;
  }
  return '神';
};

export { UText, Rect, RRect, Hexagon, Circle, ProgressBar, Button, Popup, Tabs, rate2class };