import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


class ProductItem extends Component {  
  chuyendoiUrl = (str) => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();     
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
  }
  



  // onClickAction = () => {
  //   this.props.changeEditState();
  //   this.props.getEditData(this.props.productEdit);
  // }

  handleDelete = (deleteId) => {
    if(confirm('Bạn có chắc chắn muốn xóa ?')){ //eslint-disable-line
      this.props.handleDelete(deleteId)
    }
    
    
    // this.setState(prevState => ({
    //   products: prevState.products.filter(elm => elm.id !== newsId )
    // }));
    // this.props.getDeleteData(this.props.productEdit.id);
    // this.props.alertOn("Xóa thành công ghi chú  '"+ this.props.productEdit.id + "'","danger"); 
  }

  render() {
    return (
      <tr id={this.props.product_id}>
        <td className="product-list-td-second">
          <div className="d-flex">
            <div className="table-cell--image m-0">
              <img className="box-image" src={this.props.product_image} alt=""/>
            </div>
            <div className="ml-3 align-self-center title-name">
              <div className="table-break-word text-primary ">
                <a href="/form-edit">{this.props.product_name}</a>
              </div>
            </div>
          </div>
        </td>
        <td className="text-center">{this.props.quantity}</td>
        <td className="text-normal">{this.props.type_product}</td>
        <td className="text-normal">{this.props.vendor}</td>
        <td>
          <div className="btn-group">
            <Link className="btn btn-warning"
            to={`/admin/edit/${this.props.id}`}>
            Sửa
            </Link>
            {/* <button className="btn btn-warning" onClick={() => this.onClickAction()}>Sửa</button> */}
            <button className="btn btn-danger" onClick={() => this.handleDelete(this.props.id)}>Xóa</button>
          </div>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    editItem: state.editItem
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeEditState: () => {
      dispatch({
        type: "change_isEdit"
      })
    },
    getEditData: (editOject) => {
      dispatch({
        type: "GET_EDIT_DATA",editOject
      })
    },
    alertOn: (alertContent,alertType) => {
      dispatch({
        type: "ALERT_ON",alertContent,alertType
      })
    },
    alertOff: () => {
      dispatch({
        type: "ALERT_OFF"
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductItem);