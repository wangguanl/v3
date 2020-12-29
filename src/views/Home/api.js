import axios from "@/basics/request.js";
export const FetchPostConfDocCommonselectList = (sendData) => axios.post("/jbk/ConfDocCommon/selectList", sendData)