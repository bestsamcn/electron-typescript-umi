import { ResponseBody } from '@/utils/request';
import {  login } from '@/services';
import $$ from '@/utils';
import { ipcRenderer } from 'electron';
let toastTimer:any = null;

export interface GlobalModelState {
    token: string,
    msg: string,
    isLogin:boolean,
    isLoading:boolean,
    
}

export default {
    state: {
        token:'',
	    isLogin:false,
	    isLoading:false,
	    msg:'',

    },
    subscriptions: {
        init({ dispatch, history }:any) {
            dispatch({ type: 'setMobile', params: {} });
            dispatch({ type: 'checkUpdate' });
        },
    },
    effects: {

    	* checkUpdate({}, {put, call, select}:any){
    		let { isUpdateAvailable } = yield select((state:any)=>state.global);

    		ipcRenderer.on('updateAvailable', (msg:any)=>{
    			console.log(msg, 'updateAvailable')
    			window.g_app._store.dispatch({type:"global/setState", payload:{isUpdateAvailable:true}});
    		});

    		ipcRenderer.on('updateNotAvailable', (msg:any)=>{
    			// console.log(msg, 'updateNotAvailable')
    			window.g_app._store.dispatch({type:"global/setState", payload:{isUpdateAvailable:false}});
    			window.g_app._store.dispatch({type:"global/setToast", params:{msg:'已是最新应用版本'}});
    		});

    		ipcRenderer.on('downloadProgress', (msg:any)=>{
    			console.log(msg, 'downloadProgress')
    			!isUpdateAvailable && window.g_app._store.dispatch({type:"global/setState", payload:{isUpdateAvailable:true}});
    			window.g_app._store.dispatch({type:"global/setToast", params:{msg:'更新中...'}});

    		});

    		ipcRenderer.on('onError', (msg:any)=>{
    			console.log(msg, 'onError')
    			window.g_app._store.dispatch({type:"global/setToast", params:{msg:'更新异常'}});
    			window.g_app._store.dispatch({type:"global/setState", payload:{updateError:true}});
    		});

    		ipcRenderer.on('updateDownloaded', (msg:any)=>{
    			console.log(msg, 'updateDownloaded')
    			window.g_app._store.dispatch({type:"global/setToast", params:{msg:'更新完成，即将重启'}});
    			window.g_app._store.dispatch({type:"global/setState", payload:{isUpdateAvailable:false}});
    		});
    	},

    	//loading状态
    	* setLoading({ params:{isLoading} }:{params:any}, { put, call }:any) {
            yield put({type:'setState', payload:{isLoading}});
        },

        //提示状态
    	* setToast({ params:{msg} }:{params:{msg:any}}, { put, call }:any) {
            clearTimeout(toastTimer!);
            toastTimer = setTimeout(()=>{
            	window.g_app._store.dispatch({type:'global/setState', payload:{msg:''}});
            }, 2000);
            yield put({type:'setState', payload:{msg}});
        },
    },
    reducers: {
        setState(state: GlobalModelState, { payload }:any): GlobalModelState {
            return { ...state, ...payload };
        },
    },
};
