import {REQUEST} from '../util/request'
// let prefix =
//     process.env.NODE_ENV === 'development'
//         ? '/yami/index.php/api'
//         // ? 'https://lolita.chocloud.cn/yami/index.php/api'
//         : window.location.origin + '/yami/index.php/api'
let prefix = window.location.origin + '/lolita_api_v2/index.php/api';
const _Request = (json: any) => {
    if (!json.config) {
        json.config = {
            headers: {
                accept: 'application/json'
            }
        }
    }
    return REQUEST(json)
}
export const API = {
    // 套餐详情
    skjfklj: (option) => {
        return _Request({
            method: option.method || 'get',
            url: prefix + `/lottery/login`,
            cancel: option.cancel
        })
    },
    do_login: (data) => {
        return _Request({
            method: 'post',
            url: prefix + `/lottery/login`,
            data
        })
    },
}