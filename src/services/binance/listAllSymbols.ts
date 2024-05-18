import http from "@config/http";
import APIBinance from "@constants/APIBinance";
import ISymbol from "@interfaces/ISymbol";

const listAllSymbols = async () => {
  return http
    .get<{
      symbols: ISymbol[];
    }>(`${APIBinance.API_V3}${APIBinance.EXCHANGE_INFO}`)
    .then((response) => response.data);
};

export default listAllSymbols;
