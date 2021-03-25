import axios from "@/basics/request.js";
export const FetchPostDictionaries = (sendData) => axios.post("/dictionaries", sendData)
export const FetchPostTableData = (sendData) => axios.post("/tables", sendData)
