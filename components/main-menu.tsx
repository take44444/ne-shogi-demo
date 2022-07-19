import { Container } from '@inlet/react-pixi';
import { memo, useCallback, useMemo, useState  } from 'react';
import { PageButtons } from './main/page-buttons';
import { RuleMenu } from './main/rule-menu';
import { SettingMenu } from './main/setting-menu';
import { UserBadge } from './main/user-badge';
import { UserInfoDetail } from './main/user-info-detail';
import { Popup } from './util';

const MainMenu = memo(function MainMenu_() {
  const [popupped, setPopupped] = useState(false);
  const [settingButton, settingPopup] = SettingMenu({
    setPopupped: setPopupped,
    disable: popupped
  });
  const [ruleButton, rulePopup] = RuleMenu({
    setPopupped: setPopupped,
    disable: popupped
  });
  const [userInfoDetailPopupped, setUserInfoDetailPopupped] = useState(false);
  const openUserInfoDetail = useCallback(() => {
    setPopupped(true);
    setUserInfoDetailPopupped(true);
  }, []);
  const closeUserInfoDetail = useCallback(() => {
    setPopupped(false);
    setUserInfoDetailPopupped(false);
  }, []);
  return (
    <>
    {ruleButton}
    {settingButton}
    <PageButtons x={1100} y={420} w={500} h={300} iH={120} links={[
      {title: 'ランクマッチ', url: ''},
      {title: 'カジュアルマッチ', url: ''}
    ]} disable={popupped} />
    <UserBadge callback={openUserInfoDetail} disable={popupped}/>
    <Popup w={1800} h={800}
      show={userInfoDetailPopupped} callback={closeUserInfoDetail}
    >
      <UserInfoDetail />
    </Popup>
    {rulePopup}
    {settingPopup}
    </>
  );
});

export { MainMenu };