import React from 'react';
import { Link } from 'umi';
import styles from './style.less';
import { connect } from 'dva';


@connect(({global}:any)=>({...global}))
class Footer extends React.Component<{className?:string, isUpdateAvailable?:boolean}, any>{
    render(){
    	const { isUpdateAvailable } = this.props;
        return (
            <div className={ !isUpdateAvailable ? `${styles.footer} margin-top-20` : `${styles.footer} margin-top-20 ${styles['margin-bottom']}`}>
                Footer                
            </div>
        )
    }
}
export default Footer;
