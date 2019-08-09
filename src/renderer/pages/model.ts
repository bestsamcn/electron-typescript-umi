import { ResponseBody } from '@/utils/request';
import { login } from '@/services';
import $$ from '@/utils';


export default {
	namespace:'home',
    state: {
        someList:[],
	    pageIndex:1,
	    pageSize:5,
	    isMore:true,
	  
    },
    subscriptions: {
        init({ dispatch, history }:any) {
 
        },
    },
    effects: {


        //排名列表
        * getSomeList({ params }:{params:any}, { put, call, select }:any) { 
            yield put({type:'setState', payload:{someList:[]}})
        },
    },
    reducers: {
        setState(state: any, { payload }:any){
            return { ...state, ...payload };
        }
    }
}