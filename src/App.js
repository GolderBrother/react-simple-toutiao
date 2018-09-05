import React, { Component } from 'react';
import HeaderBar from 'components/HeaderBar'
import FooterBar from 'components/FooterBar'
class App extends Component{
  state = {
    firstChildDom:null
  }
  componentDidMount(){
    // 获取子节点
    let { firstChild:firstChildDom } = this.refs.container;
    if(firstChildDom){
      this.setState({
        firstChildDom
      })
    } 
  }
  render(){
    const mainStyle = {
      width:'100%',
      height:'calc(100% - 1rem)'
    }
    const { firstChildDom } = this.state;
    const { location:{pathname} } = this.props;
    // 如果当前在 我的 页面，就隐藏头部搜索栏,其他的不隐藏
    firstChildDom && (firstChildDom.style.display = pathname === "/account" ? "none" : "flex");
    return (
      <div id="container" ref="container">
        <HeaderBar/>
        <main style={mainStyle}>{this.props.children}</main>
        <FooterBar />
      </div>
    )
  }
}
 

export default App;

