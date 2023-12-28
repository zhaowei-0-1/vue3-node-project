// 日期、时间封装
import moment from 'moment'
moment.locale("zh-cn");
const formatTime = {
    getTime: (date) => {
        return moment().format('YYYY/MM/DD');
    }
}

export default formatTime