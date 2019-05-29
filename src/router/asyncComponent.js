// 通过 import() 方法加载组件， 在通过高阶组件处理 import 返回的 Promise 结果。
import React from 'react';
import NProgress from 'nprogress'

/**
 * 动态异步加载组件，增加加载条 NProgress
 */

export default loadComponent => (
  class AsyncComponent extends React.Component {
    state = {
      Component: null
    }
    async componentDidMount() {
      if (this.state.Component !== null) return;
      NProgress.start();
      try {
        const { default: Component } = await loadComponent();
        this.setState({
          Component
        })
      } catch (error) {
        console.error(`Can't load component in <AsyncComponent />`);
        throw error;
      }
      NProgress.done();
    }
    render() {
      const { Component } = this.state;
      return (Component) ? <Component {...this.props} /> : null;
    }
  }
)
