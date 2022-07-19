import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Button, Popup, UText } from "../util";

const SettingMenu = (props: {
  setPopupped: Dispatch<SetStateAction<boolean>>
  disable: boolean
}): [JSX.Element, JSX.Element] => {
  const [selfPopupped, setSelfPopupped] = useState(false);
  const openSettings = useCallback(() => {
    props.setPopupped(true);
    setSelfPopupped(true);
  }, []);
  const closeSettings = useCallback(() => {
    props.setPopupped(false);
    setSelfPopupped(false);
  }, []);
  return [
    <Button x={1820} y={100} sz={50} disable={props.disable}
      callback={openSettings}
    />,
    <Popup w={1000} h={700}
      show={selfPopupped} callback={closeSettings}
    >
      <UText anchor={0.5} x={960} y={540} h={50}
        text={'設定画面です'} col={0xFFFFFF}
      />
    </Popup>
  ];
};

export { SettingMenu };