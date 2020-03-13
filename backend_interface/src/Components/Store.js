// var express = require('express');
// var router = express.Router();

var redux = require('redux');

var noteInitialState = {
  isEdit : false,
  editItem: null,
  isAdd: false,
  alertShow: false,
  AlertContent: '',
  AlertType: '',
  data:null,
  products: []
}


var allReducer = (state=noteInitialState, action) => {
  switch (action.type) {
    case "change_isEdit":
      return {...state,isEdit:!state.isEdit}
    // case "ADD_DATA":
    //   callApi('api/add','POST', action.getItem)
    //   .then(res => {
    //     console.log(res);
    //     // history.goBack();
    //   })
    //   console.log('them du lieu thanh cong tham so truyen vao la' + JSON.stringify(action.getItem));
    //   return {...state, editItem:{}}
    //   break
    case "GET_EDIT_DATA": // GET_EDIT_DATA là để hiển thị data cần sửa ra form
      return {...state,editItem:action.editOject}
    // case "EDIT_DATA": //EDIT_DATA là dữ liệu editItem sau khi sửa, mục đích gom dữ liệu lại để ghi đè lên GET_EDIT_DATA
    // //update dữ liệu vào Sql
    // const updateId = action.getItem.id
    // console.log(updateId);
    
    //     callApi(`api/edit/${updateId}`,'PUT', action.getItem)
    //     .then(res => {
    //       console.log(res);
    //       // history.goBack();
    //     })
    //   return {...state, editItem:action.editOject}
    case "ALERT_ON":
      return {...state,alertShow:true,AlertContent:action.alertContent,AlertType:action.alertType}
    case "ALERT_OFF":
      return {...state,alertShow:false}
    default:
      return state;
  }  
}

var store1 = redux.createStore(allReducer);

store1.subscribe(function(){
  console.log(JSON.stringify(store1.getState()));
})

export default store1;