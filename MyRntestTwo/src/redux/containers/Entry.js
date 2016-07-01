'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Interface from '../../components/android/Entry';
import * as statementActions from '../actions/koubeiStatement';
import * as cityActions from '../actions/city';
import * as filterActions from '../actions/filterStores';

const Actions=Object.assign({},statementActions,cityActions,filterActions);

class AppContainer extends Component{
    render(){
        return <Interface {...this.props} />;
    }
}

function mapStateToProps(state){
    const {statement,city,filter}=state;
    return {
        statement,
        city,
        filter
    };
}

function mapActionsToProps(dispatch){
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps,mapActionsToProps)(AppContainer);