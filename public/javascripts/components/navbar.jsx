import React from 'react';
import {authorize, getItems} from '../actions/trelloAppActions';
import {connect} from 'react-redux';

var NavBar = React.createClass({
  render(){
    return (
      <div>
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a href='#/' className='navbar-brand'>VideoViewer</a>
            </div>
            <div>
              <button className={this.props.authorized ? "btn navbar-btn" : "btn navbar-btn"} onClick={this.props.authorize}>{this.props.authorized ? "Deauthorize" : "Authorize"}</button>
              <button className='btn navbar-btn' onClick={this.props.getItems}>Get Items</button>
              <form className='navbar-form navbar-right'>
                <div>
                  <input type='text' className='form-control' placeholder='Search'/>
                </div>
              </form>
            </div>
          </div>
        </nav>
        <div className='row'>
          {this.props.children}
        </div>
      </div>
    )
  }
})

const mapStateToProps = function (state, ownProps) {
  return {
    authorized: state.authorized
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    authorize: (event) => {
      dispatch(authorize())
    },
    getItems: (event) => {
      dispatch(getItems());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
