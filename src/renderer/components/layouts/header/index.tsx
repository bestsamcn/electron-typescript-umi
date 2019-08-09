import React from 'react';
import { NavLink, withRouter } from 'umi';
import { connect } from 'dva';

import style from './style.less';
interface IProps{
	isLogin:boolean,
	dipatch:Function,
	iShowMenu:boolean
}

@(withRouter as any)
@connect(({global}:any)=>({...global}))
class Header extends React.Component<any> {
    setToggleMenu(){
        this.props.dispatch({type:'global/setToggleMenu', params:{}});
    }

    isActive(match:any, location:any){
    	if(!match) return false;
    	return match.url == location.pathname;
    }
    render(){
        let { isLogin, iShowMenu } = this.props;
        return (
            <div className={style.header}>
                Header
            </div>
        )
    }
}

export default Header;






