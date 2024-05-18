import React, { useEffect, useRef, useState } from "react";
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
import ISymbol from "@interfaces/ISymbol";
import IAsset from "@interfaces/IAsset";
import Header from "./components/Header";
import BottomSheet from "@components/BottomSheet";
import { Button } from "react-native";
import { IBottomSheetRef } from "@components/BottomSheet/BottomSheet";
import formattedOptions from "./helpers/formattedOptions";

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

  return (
    <S.Container>
      <Header
        symbolSelected={symbolSelected}
        assetSelected={assetSelected}
        onPress={() => {
          bottomSheetRef.current!.show();
        }}
      />

      {/* <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart> */}
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
