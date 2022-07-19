import { Container } from '@inlet/react-pixi';
import { memo, useCallback, useState  } from 'react';
import { PageButtons } from './main/page-buttons';
import { UserBadge } from './main/user-badge';
import { UserInfoDetail } from './main/user-info-detail';
import { Button, Popup, Rect, UText } from './util';

const MainMenu = memo(function MainMenu_() {
  const [popupped, setPopupped] = useState(false);
  const [userInfoDetailPopupped, setUserInfoDetailPopupped] = useState(false);
  const openUserInfoDetailPopupCallback = useCallback(() => {
    setPopupped(true);
    setUserInfoDetailPopupped(true);
  }, []);
  const closeUserInfoDetailPopupCallback = useCallback(() => {
    setPopupped(false);
    setUserInfoDetailPopupped(false);
  }, []);
  const [settingPopupped, setSettingPopupped] = useState(false);
  const openSettingPopupCallback = useCallback(() => {
    setPopupped(true);
    setSettingPopupped(true);
  }, []);
  const closeSettingPopupCallback = useCallback(() => {
    setPopupped(false);
    setSettingPopupped(false);
  }, []);
  const [rulePopupped, setRulePopupped] = useState(false);
  const openRulePopupCallback = useCallback(() => {
    setPopupped(true);
    setRulePopupped(true);
  }, []);
  const closeRulePopupCallback = useCallback(() => {
    setPopupped(false);
    setRulePopupped(false);
  }, []);
  return (
    <>
    <PageButtons x={1100} y={420} w={500} h={300} iH={120} links={[
      {title: 'ランクマッチ', url: ''},
      {title: 'カジュアルマッチ', url: ''}
    ]} disable={popupped} />
    <UserBadge callback={openUserInfoDetailPopupCallback} disable={popupped}/>
    <Button key={'settings-b'} x={1820} y={100} sz={50} disable={popupped}
      callback={openSettingPopupCallback}
    />
    <Button key={'rule-b'} x={1700} y={100} sz={50} disable={popupped}
      callback={openRulePopupCallback}
    />
    {/* <Container alpha={0.5} visible={popupped}>
      <Rect x={0} y={0} w={1920} h={1080} col={0x000000} />
    </Container> */}
    <Popup key={'user-info-detail-p'} w={1800} h={800}
      show={userInfoDetailPopupped} callback={closeUserInfoDetailPopupCallback}
    >
      <UserInfoDetail />
    </Popup>
    <Popup key={'settings-p'} w={1000} h={700}
      show={settingPopupped} callback={closeSettingPopupCallback}
    >
      <UText anchor={0.5} x={960} y={540} h={50}
        text={'設定画面です'} col={0xFFFFFF}
      />
    </Popup>
    <Popup key={'rule-p'} w={1500} h={900}
      show={rulePopupped} callback={closeRulePopupCallback}
    >
      <UText anchor={0.5} x={960} y={540} h={50}
        text={'ルールです'} col={0xFFFFFF}
      />
    </Popup>
    </>
  );
});

export { MainMenu };