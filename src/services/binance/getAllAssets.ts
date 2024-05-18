import axios from "axios";
import API from "@constants/API";
import IAsset from "@interfaces/IAsset";

const getAllAssets = async () => {
  return await axios
    .get<{ data: IAsset[] }>(
      `${API.HOST_BINANCE}bapi/asset/v2/public/asset/asset/get-all-asset`
    )
    .then((response) => response.data);
};

export default getAllAssets;
