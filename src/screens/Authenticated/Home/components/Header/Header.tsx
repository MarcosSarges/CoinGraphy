import React, { useState } from "react";
import * as S from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IAsset from "@interfaces/IAsset";
import useWS from "@hooks/useWS";
import ISymbol from "@interfaces/ISymbol";

interface IHeaderProps {
  assetSelected: IAsset | null;
  symbolSelected: ISymbol | null;
  onPress: () => void;
}

const Header: React.FC<IHeaderProps> = ({
  onPress,
  assetSelected,
  symbolSelected,
}) => {
  const avatar =
    "https://gravatar.com/avatar/620b4e4027f96e80bfb9e3ad27e756ae?s=200&d=robohash&r=x";

  const { top } = useSafeAreaInsets();

  const [price, setPrice] = useState({
    lastPrice: 0,
    currentPrice: 0,
  });

  console.log({ symbolSelected });

  useWS({
    url: "",
    onMessage(message, event) {
      console.log(message, event);
    },
  });

  return (
    <S.Container spaceTop={top}>
      <S.CoinContainer onPress={onPress}>
        <S.CoinIcon source={{ uri: assetSelected?.logoUrl }} />
        <S.Title>
          {assetSelected?.assetName} - {symbolSelected?.baseAsset}
        </S.Title>
      </S.CoinContainer>
      <S.Avatar
        source={{
          uri: avatar,
        }}
      />
    </S.Container>
  );
};

export default Header;
