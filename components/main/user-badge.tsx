import { GlowFilter } from "@pixi/filter-glow";
import { memo, useCallback, useEffect, useState } from "react";
import { Circle, Class, Popup, ProgressBar, rate2class, RRect, UText } from "../util";

const UserBadge = memo(function UserBadge_(props: {
  callback: () => void,
  disable: boolean
}) {
  const [userInfo, setUserInfo] = useState({userId: '', rate: 0});
  useEffect(() => {
    // fetch('', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     requestType: 'user-info',
    //     data: []
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => setUserInfo(data.data));
    setUserInfo({userId: 'take44444', rate: 1679})
  }, []);
  return (
    <>
    <RRect x={170} y={65} w={450} h={155} col={0x111111} filters={
      [new GlowFilter({distance: 40, color: 0x111111, outerStrength: 1.5})]
    }/>
    <UText x={270} y={80} text={userInfo.userId} h={40} col={0xFFFFFF} />
    <UText x={270} y={130} h={35}
      text={rate2class(userInfo.rate)} col={0x00DDFF}
    />
    <ProgressBar x={420} y={180} w={300} h={7}
      percentage={userInfo.rate % 100}
    />
    <Class x={150} y={140} sz={110} rate={userInfo.rate}
      {...props}
    />
    </>
  )
});

export { UserBadge };