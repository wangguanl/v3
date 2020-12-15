import axios from '@/basics/request.js'
/* 保存 */
export const fetchAddEditTable = (sendData) => axios.post('/jbk/bzkTabRenyuanjbxx/save', sendData)
/* 表格列表 */
export const fetchGetTableList = (sendData) => axios.post('/jbk/bzkTabRenyuanjbxx/likeList', sendData)
/* 表格详情 */
export const fetchGetTableInfo = (sendData) => axios.post('/jbk/bzkTabRenyuanjbxx/getDetail', sendData)
/* 表格删除 */
export const fetchDeleteTable = (sendData) => axios.post('/jbk/bzkTabRenyuanjbxx/delete', sendData)
/* 表格历史 */
export const fetchGetTableHistory = (sendData) => axios.post('/jbk/bzklsrenyuanjbxx/getTime', sendData)