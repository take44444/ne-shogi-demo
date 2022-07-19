import React, { useEffect, useState } from 'react';
import { Stage } from "@inlet/react-pixi";
import { ReactNode } from "react";

const Layout = (props: { children: ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const stageProps = {
    width: 1920,
    height: 1080,
    raf: false,
    renderOnComponentChange: true,
    options: {
      autoDensity: true,
      // resolution: resolution || 1,
      // antialias: resolution <= 1,
      backgroundColor: 0xE8E8FF,
    },
  };
  useEffect(() => {
    import('webfontloader').then(module => {
      module.load({
        google: { families: ['Noto Sans Mono'] },
        active: () => setLoaded(true),
        inactive: () => alert('font loading failed')
      });}
    );
  }, []);
  return (
    <div id={"root"}>
      {loaded &&
        <Stage {...stageProps}>
          {props.children}
        </Stage>
      }
    </div>
  );
};

export default Layout;