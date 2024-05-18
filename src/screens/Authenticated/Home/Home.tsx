import React, { useEffect, useState } from "react";
import HomeContent from "./Home.content";
import listAllSymbols from "@services/binance/listAllSymbols";
import ISymbol from "@interfaces/ISymbol";
import getAllAssets from "@services/binance/getAllAssets";
import IAsset from "@interfaces/IAsset";
import BottomSheet from "@components/BottomSheet";

const Home = () => {
  const [trackSymbolSelected, setTrackSymbolSelected] =
    useState<ISymbol | null>(null);
  const [assetSelected, setAssetSelected] = useState<IAsset | null>(null);
  const [listAssets, setListAssets] = useState<IAsset[]>([]);
  const [listSymbols, setListSymbols] = useState<ISymbol[]>([]);

  useEffect(() => {
    listAllSymbols()
      .then((responseSym) => {
        setListSymbols(responseSym.symbols);
        getAllAssets().then((responseAsset) => {
          const sortedList = responseAsset.data.sort(
            (a, b) => Number(a.id) - Number(b.id)
          );
          setListAssets(sortedList);
          setAssetSelected(sortedList?.[0] ?? null);
          const symbol =
            responseSym.symbols.find(
              (sym) => sym?.baseAsset === sortedList?.[0]?.assetCode
            ) || null;
          setTrackSymbolSelected(symbol);
        });
      })
      .catch(console.log);
  }, []);

  return (
    <>
      <HomeContent
        listSymbols={listSymbols}
        listAssets={listAssets}
        symbolSelected={trackSymbolSelected}
        assetSelected={assetSelected}
        onSelectSymbol={(symbol) => {
          setTrackSymbolSelected(symbol);
          setAssetSelected(
            listAssets.find((el) => symbol.baseAsset.includes(el.assetCode)) ??
              null
          );
        }}
      />
    </>
  );
};

export default Home;
