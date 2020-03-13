import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <aside className="menu_sidebar">
        <div className="partial-menu-left">
          <div className="aside-logo">
            <a href="/"><img src="/assets/images/logo232x58.png" width={150} alt="" /></a>
          </div>
          <div className="partial-menu--top">
            <div className="next-nav-menu-left">
              <div className="main-menuLeft--block">
                <div className="nav-left menu-main--block">
                  <ul className="nav-list-items">
                    <li className="next-nav-item">
                      <NavLink className="div-detect next-nav-link d-flex justify-content-between" to="/admin/products" activeClassName="active"><span className="text-menu-new">Sản phẩm</span></NavLink>
                    </li>
                    <li className="next-nav-item">
                      <NavLink className="div-detect next-nav-link d-flex justify-content-between" to="/admin/add"> <span className="text-menu-new">Tạo mới sản phẩm</span></NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    )
  }
}

export default withRouter(Sidebar);
