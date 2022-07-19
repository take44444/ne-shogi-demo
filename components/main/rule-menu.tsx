import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Button, Popup, UText } from "../util";

const RuleMenu = (props: {
  setPopupped: Dispatch<SetStateAction<boolean>>
  disable: boolean
}): [JSX.Element, JSX.Element] => {
  const [selfPopupped, setSelfPopupped] = useState(false);
  const openRule = useCallback(() => {
    props.setPopupped(true);
    setSelfPopupped(true);
  }, []);
  const closeRule = useCallback(() => {
    props.setPopupped(false);
    setSelfPopupped(false);
  }, []);
  return [
    <Button x={1700} y={100} sz={50} disable={props.disable}
      callback={openRule}
    />,
    <Popup w={1500} h={900}
      show={selfPopupped} callback={closeRule}
    >
      <UText anchor={0.5} x={960} y={540} h={50}
        text={'ルールです'} col={0xFFFFFF}
      />
    </Popup>
  ];
};

export { RuleMenu };