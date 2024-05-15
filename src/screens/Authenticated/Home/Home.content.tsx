import React, { useEffect, useState } from "react";
import * as S from "./styles";
import {
  VictoryAxis,
  VictoryBar,
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
} from "victory-native";
import type { SharedValue } from "react-native-reanimated";
import useWS from "@hooks/useWS";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
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

const HomeContent = () => {
  const [dataState, setData] = useState([]);

  // useWS({
  //   url: "wss://stream.binance.com:9443/ws/bnbbtc@kline_1m",
  //   onMessage: (msg) => {
  //     const data = JSON.parse(msg);
  //     console.log(data.k.x);

  //     if (!data.k.x) return;

  //     const parsed = {
  //       // ...data.k,
  //       x: new Date(data.k.T),
  //       open: Number(data.k.o),
  //       close: Number(data.k.c),
  //       high: Number(data.k.h),
  //       low: Number(data.k.l),
  //     };
  //     console.log(parsed);

  //     data.k && setData((prev) => [...prev, parsed]);
  //   },
  // });

  return (
    <S.Container>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
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
    </S.Container>
  );
};

export default HomeContent;
