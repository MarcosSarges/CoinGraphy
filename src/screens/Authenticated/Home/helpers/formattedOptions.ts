import { IOption } from "@components/BottomSheet";
import IAsset from "@interfaces/IAsset";
import ISymbol from "@interfaces/ISymbol";

const formattedOptions = (
  listSymbols: ISymbol[],
  listAssets: IAsset[]
): IOption[] => {
  const options = listSymbols
    .map((symbol) => {
      const assetBase = listAssets.find((el) =>
        symbol.baseAsset.includes(el.assetCode)
      );
      const assetQuete = listAssets.find((el) =>
        symbol.quoteAsset.includes(el.assetCode)
      );
      if (!assetBase || !assetQuete) return null;
      return {
        title: symbol.symbol,
        label: `${assetBase.assetName} / ${assetQuete.assetName}`,
        value: symbol as any,
        icon: assetBase.logoUrl || assetBase.fullLogoUrl,
      };
    })
    .filter((el) => el !== null) as IOption[];

  return options;
};
export default formattedOptions;
