'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Interface from '../../components/android/Entry';
import * as statementActions from '../actions/koubeiStatement';
import * as cityActions from '../actions/city';

const Actions=Object.assign({},statementActions,cityActions);

class AppContainer extends Component{
    render(){
        return <Interface {...this.props} />;
    }
}

function mapStateToProps(state){
    const {statement,city}=state;
    return {
        statement,
        city
    };
}

function mapActionsToProps(dispatch){
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps,mapActionsToProps)(AppContainer);