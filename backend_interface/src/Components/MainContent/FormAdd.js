import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import callApi from './../../ConnectAxios/apiCaller'

class FormAdd extends Component {

  constructor(props) {
    super(props); 
    //name của input
    this.state={
      id:'',
      txtName:'',
      txtPrice:'',
      txtDescription:'',
      txtQuantity:'',
      txtImage:'',
      txtVendor:'',
      txtType:'',
      txtVariant:'',
      txtCollection:'',
      txtComparePrice:'',
      products: [],
      data: null
    }
 
  }
  componentDidMount() {
    const { match } = this.props;
    if(this.props.match && this.props.match.params.id){
      var id_m = match.params.id;
      callApi(`api/edit/${id_m}`,'GET',null).then(res =>{
//       //   // console.log(products);
        var products = res.data[0];
        this.setState({
          id:products.id,
          txtName:products.product_name,
          txtPrice:products.product_price,
          txtDescription:products.description,
          txtQuantity:products.quantity,  
          txtImage:products.product_image,
          txtVendor:products.vendor,
          txtType:products.type_product,
          txtVariant:products.variant,
          txtCollection:products.collection,
          txtComparePrice:products.comparison_price
        })
      })
    }
  
}
  
  printTitle = () => {
    if(this.props.isEdit){
      return <h3>Cập nhật</h3>
    } else {
      return <h3>Thêm mới Sản phẩm</h3>
    }
  }

  handleInputChange  = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })    
  }

  
  handleInsertSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    console.log(this.state); // xem thử state điền vào

    var {history} = this.props;
    // gán name của form cho state
    var {id,txtName,txtPrice,txtDescription,txtQuantity,txtImage,txtVendor,txtType,txtVariant,txtCollection,txtComparePrice} = this.state;
    
    if(id) {
      console.log('update');
        const editObject = {
        id : id,
        product_name: txtName,
        product_price: txtPrice,
        description: txtDescription,
        quantity: txtQuantity,
        product_image: txtImage,
        vendor:txtVendor,
        type_product:txtType,
        variant: txtVariant,
        collection: txtCollection,
        comparison_price: txtComparePrice
      };
      const updateId = editObject.id
      callApi(`api/edit/${updateId}`,'PUT', editObject)
      .then(res => {
        // console.log(res);
        history.goBack();
      })
      // this.props.editDataStore(editObject);
      // this.props.changeEditState(); // Tắt form đi
      this.props.alertOn("Đã sửa thành công","success");
    }  else {
      var item ={};
      item.product_name = txtName;
      item.product_price = txtPrice;
      item.description = txtDescription;
      item.quantity = txtQuantity;
      item.product_image = txtImage;
      item.vendor = txtVendor;
      item.type_product = txtType;
      item.variant = txtVariant;
      item.collection = txtCollection;
      item.comparison_price = txtComparePrice;
        callApi('api/add','POST', item
        ).then(res => {
          history.goBack();
          // console.log(res);
        })
    //   this.props.addDataStore(item);
      this.props.changeEditState(); // Tắt form đi
    //   this.props.alertOn("Đã thêm mới thành công","warning");
    // }
    
    
  }
}

  render() {
    return (
      <div>
        <main id="_main_content_" className="ui-main">
          <div className="wrapper-block">
            <div className="max-width-center">
              <div className="ui---header-nav-tab ui-header-menu--collapse z-index-1">
                <ul>
                  <li><a className="d-block active" href="/"><span className="tab-new-info ml-2">Thông tin sản phẩm</span></a></li>
                </ul>
              </div>
            </div>
            <form onSubmit={this.handleInsertSubmit} method="post">
              <div className="ui-title-bar-container  max-width-center">
                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-6">
                        <div className="ui-toolbar-product-info">
                          <div className="ui-product-head">Thông tin sản phẩm</div>
                          <div className="ui-product-body">Chỉnh sửa thông tin sản phẩm</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <Link to="/admin/products" className="btn btn-warning">Trở lại</Link>
                    <button className="btn btn-primary fix-height--button ml-4" type="submit"><span>Lưu</span></button>
                  </div>
                </div>
              </div>
              <div className="padding-container pb-0">
                <div className="row">
                  <div className="col-lg-9 col-12">
                    <div className="wrapper-content mb-5">
                      <div className="ui-information">
                        <div className="ui-information-head"><span className="ui-information-title">Thông tin chung</span></div>
                        <div className="ui-information-body">
                          <div className="form-group">
                            <label className="label-input-group">Tên sản phẩm</label>
                            <input 
                              type="text" 
                              name="txtName" 
                              id="product_name" className="form-control" placeholder="Nhập tên sản phẩm" 
                              defaultValue ={this.state.txtName}
                              onChange={(event) => this.handleInputChange (event)}
                            />
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-12">
                                <label className="label-input-group">Giá bán</label>
                                <input 
                                  type="text" 
                                  name="txtPrice" 
                                  id="product_price" className="form-control"placeholder="0 ₫" 
                                  defaultValue ={this.state.txtPrice}
                                  onChange={(event) => this.handleInputChange (event)}/>
                              </div>
                              <div className="col-sm-6 col-12">
                                <label className="label-input-group">Giá so sánh</label>
                                <input 
                                  type="text" 
                                  name="txtComparePrice" 
                                  id="comparison_price" className="form-control" placeholder="0 ₫" 
                                  defaultValue ={this.state.txtComparePrice}
                                  onChange={(event) => this.handleInputChange (event)} />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="label-input-group">Tồn kho</label>
                            <input 
                              type="text" 
                              name="txtQuantity" 
                              id="quantity" className="form-control" placeholder="Nhập Tồn kho" 
                              defaultValue={this.state.txtQuantity} 
                              onChange={(event) => this.handleInputChange (event)} />
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-12">
                                <label className="label-input-group">Nơi xuất xứ</label>
                                <input 
                                  type="text" 
                                  name="txtVendor" id="vendor" 
                                  className="form-control" 
                                  placeholder="Đà lạt" 
                                  defaultValue={this.state.txtVendor} 
                                  onChange={(event) => this.handleInputChange (event)} />
                              </div>
                              <div className="col-sm-6 col-12">
                                <label className="label-input-group">Loại sản phẩm</label>
                                <input 
                                  type="text" 
                                  name="txtType" 
                                  id="type_product" className="form-control" 
                                  placeholder="dưa leo" 
                                  defaultValue={this.state.txtType} 
                                  onChange={(event) => this.handleInputChange (event)} />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <textarea className="form-control" id="description"
                              name="txtDescription" 
                              rows={3} placeholder="Mô tả sản phẩm"  
                              defaultValue={this.state.txtDescription} 
                              onChange={(event) => this.handleInputChange (event)} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="wrapper-content mb-5">
                      <div className="ui-information">
                        <div className="ui-information-head"><span className="ui-information-title">Hình ảnh sản phẩm</span></div>
                      </div>
                      <div className="ui-product-photo productInfoNew-uploadImage">
                        <div className="form-group">
                          <div className="row">
                            <div className="col text-left">
                              <div className="display-none" />
                              <div><button className="btn btn-link ml-3"><span>Thêm bằng URL</span></button></div>
                            </div>
                          </div>
                          <div className="p-4">
                            <input 
                              type="text" 
                              className="form-control" id="product_image"
                              name="txtImage" 
                              defaultValue={this.state.txtImage} 
                              onChange={(event) => this.handleInputChange(event)} /></div>
                          <ul className="p-4 product-photo-box">
                            <li className="ui-product-photo-item">
                              <div className="ui-product-photo-box">
                                <img src={this.state.txtImage} className="ui-product-photo-item__image" alt="" width="200"/>
                              </div>
                            </li>
                          </ul>
                        </div>
                        {/* <ul class="ui-product-photo-grid clearfix">
                  <li class="ui-product-photo-item">
                    <div class="ui-product-photo-box">
                      <img class="ui-product-photo-item__image" src="https://product.hstatic.net/1000324420/product/upload_247e10d109a54ac9ad10d23d0736d0b4_1024x1024.jpg" width="290">
                    </div>
                  </li>
                  <li class="d-none"><input type="file" class="form-control-file" name="" id="" placeholder="" aria-describedby="fileHelpId"></li>
                  <li class="ui-product-photo-item d-block"><div class="file-upload position-relative"><div class="file-upload-drop" aria-disabled="false"><div class="fileupload-text text-center"><svg class="svg-next-icon svg-next-icon-size-30" width="30" height="30"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 490.667 490.667" fill="#6C798F"><path d="M448,128h-67.627l-39.04-42.667H192v64h-64v64H64v213.333c0,23.467,19.2,42.667,42.667,42.667H448c23.467,0,42.667-19.2,42.667-42.667v-256C490.667,147.2,471.467,128,448,128z M277.333,405.333c-58.88,0-106.667-47.787-106.667-106.667S218.453,192,277.333,192S384,239.787,384,298.667S336.213,405.333,277.333,405.333z"></path><polygon points="64,192 106.667,192 106.667,128 170.667,128 170.667,85.333 106.667,85.333 106.667,21.333 64,21.333 64,85.333 0,85.333 0,128 64,128 			"></polygon><path d="M277.333,230.4c-37.76,0-68.267,30.507-68.267,68.267h0c0,37.76,30.507,68.267,68.267,68.267c37.76,0,68.267-30.507,68.267-68.267S315.093,230.4,277.333,230.4z"></path></svg></svg><p class="mb-0 mt-2 text-secondary">Thêm hình ảnh</p></div><input accept="image/*" type="file" multiple="" autocomplete="off" style="display: none;"></div></div></li>
                </ul> */}
                      </div>
                    </div>
                    <div className="wrapper-content mb-5">
                      <div className="ui-information">
                        <div className="ui-information-head">
                          <div className="row align-items-center">
                            <div className="col"><span className="ui-information-title">Chỉnh sửa thuộc tính</span></div>
                            {/* <div class="col text-right"><button class="btn btn-primary ml-3" disabled=""><span>Lưu thay đổi</span></button></div> */}
                          </div>
                        </div>
                        <div className="ui-information-body">
                          <div className="form-group px-0 pb-0 col-3">
                            <input type="text" className="form-control" 
                              name="txtVariant" id="variant" 
                              placeholder="variant"  
                              defaultValue={this.state.txtVariant} 
                              onChange={(event) => this.handleInputChange(event)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-12">
                    <div className="wrapper-content mb-5">
                      <div className="ui-information">
                        <div className="ui-information-head">
                          <div className="row align-items-center">
                            <div className="col">
                              <span className="ui-information-title">Nhóm Sản Phẩm</span>
                            </div>
                          </div>
                          <div className="ui-information-body">
                            <div className="form-group px-0 pb-0">
                              <input type="text" className="form-control" 
                                name="txtCollection" id="collection"  
                                defaultValue={this.state.txtCollection} 
                                onChange={(event) => this.handleInputChange(event)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isEdit: state.isEdit,
    editItem: state.editItem,
    products: state.products
  }
}

//Truyền EDIT_DATA vào để gom dữ liệu -> đẩy EDIT_DATA lên store
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addDataStore: (getItem) => {
      dispatch({type: "ADD_DATA",getItem})
    },
    editDataStore: (getItem) => {
      dispatch({type: "EDIT_DATA",getItem})
    },
    changeEditState: () => {
      dispatch({type: "change_isEdit"})
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


export default connect(mapStateToProps,mapDispatchToProps)(FormAdd);