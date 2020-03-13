import React, { Component } from 'react'
import ProductItem from './ProductItem';
import { connect } from 'react-redux';
import callApi from './../../ConnectAxios/apiCaller'
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state={
      id: '',
      products: []
    }
  }

  UNSAFE_componentWillMount() {
    callApi('api/products','GET',null).then(res =>{
      this.setState({
        products:res.data
      })
    })
  }
  
  handleDel = (deleteId) => {
    // callApi(`api/delete`, 'DELETE', null).then(res =>{
    //   console.log(res);
    // });
    
    callApi(`api/delete/${deleteId}`,'DELETE', null)
    .then(res => {
      // console.log(deleteId);      
      this.setState(prevState => ({
          products: prevState.products.filter(elm => elm.id !== deleteId)
        }))
      })
    
  }

  // In dữ liệu trong api sau khi nhận được ra
  getDulieu = () => {
    if(this.state.products !== null){
      return this.state.products.map((value,key) => (
        <ProductItem key={key}
        id={value.id}
        product_name={value.product_name}
        description={value.description}
        quantity={value.quantity}
        product_image={value.product_image}
        product_link={value.product_link}
        vendor={value.vendor}
        type_product={value.type_product}
        variant={value.variant}
        collection={value.collection}
        productEdit={value}
        handleDelete = {this.handleDel}
        />
      ))      
    }
  }

  render() {
    return (
      <div className="padding-container">
        <div className="table-list-product-list">
          <div className="ui-table-listing-container">
            <table className="ui-table">
              <thead>
                <tr>
                  <th className="table-header--name-pic-incl cursor-pointer"><span>Tên sản phẩm</span></th>
                  <th className="table-header--inventory"><span id="cspot-products-khadung">Khả dụng</span></th>
                  <th className="table-header--status"><span>Loại</span></th>
                  <th className="table-header--name"><span>Nơi xuất xứ</span></th>
                  <th className="table-header--edit"><span>Chỉnh sửa sản phẩm</span></th>
                </tr>
              </thead>
              <tbody>
                {this.getDulieu()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeEditState: () => {
      dispatch({
        type: "change_isEdit"
      })
    },
    getProductproducts: (products) => {
      dispatch({type: "RECEIVE_products",products})
    }
  }
}

export default connect(mapDispatchToProps)(ProductList);