import { Dispatch, memo, SetStateAction, useCallback, useRef } from "react";
import SocketIOClient from "../lib/socketio-client";
import { RuleSelector } from "./selector";

const RankMenu = memo(function RankMenu_(props: {
  io?: SocketIOClient
  logger?: Dispatch<SetStateAction<string>>
}) {
  const rules = useRef({teai: 0, basicTime: 3, byoyomi: 10});
  const basicTimeCallback = useCallback((i: number) => {
    rules.current.basicTime = [3, 10, 30][i];
  }, []);
  const byoyomiCallback = useCallback((i: number) => {
    rules.current.basicTime = [10, 30, 60][i];
  }, []);
  const submit = useCallback(() => {
    const requestType = 'matching-start';
    (props.logger!)(`<api> ${JSON.stringify({
      requestType : requestType,
      data: [
        {
          rule: {
            teai: 0,
            basicTime: rules.current.basicTime,
            byoyomi: rules.current.byoyomi
          },
          isRated: true
        }
      ]
    })}`);
    props.io!.emit('api', {
      requestType : 'matching-start'
    }, (response: any) => (props.logger!)(`[received]: <api> ${JSON.stringify(
      response
    )}`));
  }, []);
  return (
    <>
    <RuleSelector x={100} y={270} w={100} h={500} iH={50} choices={[
      {title: '3'},
      {title: '10'},
      {title: '30'}
    ]} callback={basicTimeCallback} />
    <RuleSelector x={400} y={270} w={100} h={500} iH={50} choices={[
      {title: '10'},
      {title: '30'},
      {title: '60'}
    ]} callback={byoyomiCallback} />
    </>
  )
});

export { RankMenu };