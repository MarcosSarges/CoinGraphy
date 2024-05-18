import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-native";

import {
  VictoryAxis,
  VictoryBar,
  VictoryCandlestick,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from "victory-native";
import type { SharedValue } from "react-native-reanimated";
import useWS, { WsStatus } from "@hooks/useWS";
import ISymbol from "@interfaces/ISymbol";
import IAsset from "@interfaces/IAsset";
import Header from "./components/Header";
import { BottomSheet, IBottomSheetRef } from "@components";

import * as S from "./styles";

import formattedOptions from "./helpers/formattedOptions";

const data = [
  { time: 1, price: 13000 },
  { time: 2, price: 16500 },
  { time: 3, price: 14250 },
  { time: 4, price: 19000 },
];

const data2 = [
  // { x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0 },
  // { x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5 },
  // { x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10 },
  // { x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7 },
  // { x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5 },
];
// {
//   "e": "kline",         // Event type
//   "E": 1672515782136,   // Event time
//   "s": "BNBBTC",        // Symbol
//   "k": {
//     "t": 1672515780000, // Kline start time
//     "T": 1672515839999, // Kline close time
//     "s": "BNBBTC",      // Symbol
//     "i": "1m",          // Interval
//     "f": 100,           // First trade ID
//     "L": 200,           // Last trade ID
//     "o": "0.0010",      // Open price
//     "c": "0.0020",      // Close price
//     "h": "0.0025",      // High price
//     "l": "0.0015",      // Low price
//     "v": "1000",        // Base asset volume
//     "n": 100,           // Number of trades
//     "x": false,         // Is this kline closed?
//     "q": "1.0000",      // Quote asset volume
//     "V": "500",         // Taker buy base asset volume
//     "Q": "0.500",       // Taker buy quote asset volume
//     "B": "123456"       // Ignore
//   }
// }

interface IHomeProp {
  listSymbols: ISymbol[];
  listAssets: IAsset[];
  symbolSelected: ISymbol | null;
  assetSelected: IAsset | null;
  onSelectSymbol: (symbol: ISymbol) => void;
}

const HomeContent: React.FC<IHomeProp> = ({
  listAssets,
  listSymbols,
  symbolSelected,
  assetSelected,
  onSelectSymbol,
}) => {
  const bottomSheetRef = useRef<null | IBottomSheetRef>(null);
  const [dataState, setDataState] = useState([]);
  // {"e":"index","E":1716061778045,"s":"BTCUSDT","p":"66864.94255319"} {"data": "{\"e\":\"index\",\"E\":1716061778045,\"s\":\"BTCUSDT\",\"p\":\"66864.94255319\"}", "isTrusted": false}
  const { sendJsonMessage, sendMessage, status } = useWS({
    url: `wss://nbstream.binance.com/eoptions/ws`,
    onMessage(message, event) {
      console.log(message);
      const parsed = JSON.parse(message);
      console.log(parsed);

      if (!parsed?.e) {
        if (!parsed.result) {
          return;
        }
      }
      const time = new Date(parsed.E);
      const formatted = {
        time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
        price: parseFloat(parsed.p).toFixed(2),
      };
      setDataState((prev) => {
        const old = [...prev].slice(
          prev.length - 5 < 0 ? 0 : prev.length - 5,
          prev.length
        );
        return [...old, formatted];
      });
    },
    onOpen() {
      console.log("open");
    },
    onClose() {
      console.log("closing");
    },
    onError(msg, ev) {
      console.log("error");
      console.log(msg, ev);
    },
  });

  useEffect(() => {
    if (symbolSelected && status === WsStatus.OPEN) {
      // sendMessage(
      //   JSON.stringify({
      //     method: "LIST_SUBSCRIPTIONS",
      //     id: 19939393993930,
      //   })
      // );
      sendMessage(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${symbolSelected.symbol}@index`],
          id: 19939393993930,
        })
      );
    }
  }, [symbolSelected, status]);
  // wss://ws-api.binance.com:443/ws-api/v3
  return (
    <S.Container>
      <Header
        symbolSelected={symbolSelected}
        assetSelected={assetSelected}
        onPress={() => {
          bottomSheetRef.current!.show();
        }}
      />

      <VictoryChart
        animate
        style={{ parent: { paddingLeft: 16, paddingRight: 16 } }}
      >
        <VictoryLine data={dataState} x="time" y="price" />
      </VictoryChart>
      {/* <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 25 }}
        scale={{ x: "time" }}
      >
        <VictoryAxis
          tickFormat={(t) => {
            console.log(t);
            return `${t.getDate()}/${t.getMonth()}/${t.getYear()}`;
          }}
        />
        <VictoryAxis dependentAxis />
        <VictoryCandlestick
          animate={{ duration: 250, easing: "linear" }}
          // labels={({ datum }) => `x: ${datum.x.getDate()}`}
          labelOrientation={{ low: "left", high: "right" }}
          candleColors={{ positive: "#13cf3f", negative: "#c43a31" }}
          // domain={{
          //   x: [
          //     dataState[dataState.length - 4]?.x || 0,
          //     dataState[dataState.length - 1]?.x || 0,
          //   ],
          //   y: [
          //     dataState[dataState.length - 1]?.low || 0,
          //     dataState[dataState.length - 1]?.high || 1,
          //   ],
          // }}
          data={dataState}
        />
      </VictoryChart> */}
      <Button title="teste" onPress={() => bottomSheetRef.current!.show()} />
      <BottomSheet
        ref={bottomSheetRef}
        title="Selecione um ativo"
        onSelect={onSelectSymbol}
        options={formattedOptions(listSymbols, listAssets)}
        enableFilter
      />
    </S.Container>
  );
};

export default HomeContent;
