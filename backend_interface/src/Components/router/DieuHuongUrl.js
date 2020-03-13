import React, { Component } from 'react'
import {  BrowserRouter as Router,  Route} from "react-router-dom";
import FormAdd from './../MainContent/FormAdd';
import MainContent from '../MainContent/MainContent';
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();


export default class DieuHuongUrl extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component = {MainContent}/>
        <Route exact path="/admin" component = {MainContent}/>
        <Route exact path="/admin/products" component = {MainContent}/>
        <Route exact path="/admin/add" component = {FormAdd} />
        <Route exact={false} path="/admin/edit/:id" component = {FormAdd} history={customHistory}/>
      </div>
    )
  }
}