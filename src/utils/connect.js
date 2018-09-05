import actions from 'src/actions' 
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
// React-Redux 提供connect方法，用于从 UI 组件生成容器组件
// connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。
// 前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
export default connect(
    state => ({state}),
    dispatch => bindActionCreators(actions,dispatch)
)
