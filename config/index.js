module.exports = {
    base:{
        assetsPath:'static'
    },
    dev:{
        env:'development',
        publicPath:'/',
        host:'localhost',
        port:'3000',
        assetsPath:'static',
        devtool:'cheap-module-eval-source-map',
        // 代理配置
        proxyTable:{}
    },
    build:{
        env:'production',
        publicPath:'/',
        assetsPath:'static',
        productionSourceMap:true,
        devtool:'#source-map',
        productionGzip:false,
        productionGzipExtensions:['js','css']
    }
}