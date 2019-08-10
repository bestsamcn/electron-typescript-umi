/**
 * title: 首页
 * routerName: home
 */
import React from 'react';
import Base from '@/components/Base';
import { Footer } from '@/components/layouts';

import $$ from '../utils';
import { connect } from 'dva';
import { router } from 'umi';
import style from './style.less';



interface IProps{
    isMore:boolean,
    isMobile:boolean,
    dispatch:Function,
    global:any
}

@connect(({home, global}:any)=>({...home, global}))
export default class Home extends Base<IProps, {}> {
	scrollBarRef:any;

    componentDidMount(){
        // super.componentDidMount();
   
    }
    onaClick(){
        console.log('clicks')
    }
    render(){
    	let { isMore } = this.props;
    	let { isMobile } = this.props.global;
        return (
            <div className={style["home"]}>
                 <a onClick={this.onaClick.bind(this)}>SomeList</a>
                <Footer />
            </div>
        )
    }
}

