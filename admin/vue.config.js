const path = require("path");
const webpack = require("webpack");
const chalk = require("chalk");
const isProdEnv = process.env.NODE_ENV === "production";
const isDevEnv = process.env.NODE_ENV === "development";
const runEnv = process.env.VUE_APP_API_ENV; // api环境
const runPort = process.env.VUE_APP_SEVER_PORT; // 运行端口
const apiProxyPath =
  runEnv === '0'
    ? process.env.VUE_APP_DEV_PROXY_0
    : runEnv === '1'
    ? process.env.VUE_APP_DEV_PROXY_1
    : process.env.VUE_APP_DEV_PROXY_2; // API代理到端口
if (isDevEnv) {
  console.log(
    chalk.green(
      `正在【开发模式】下启动 ,当前API接口环境：【${
        ["正式环境", "测试环境", "本地环境", "未知环境"][runEnv]
      }】`
    )
  );
  console.log(`API代理到：${apiProxyPath}`);
} else if (isProdEnv) {
  console.log(chalk.green("正在【生产模式】下编译"));
}

module.exports = {
  lintOnSave: true,
  // 输出文件目录
  outputDir: "dist", // 默认dist
  productionSourceMap: false,
  chainWebpack: config => {
    if (isProdEnv) {
      config.optimization.minimize(true); // 最小化代码
      config.optimization.splitChunks({
        // 切割代码
        chunks: "all"
      });
    }
    if (process.env.NODE_ENV === "production") {
      if (process.env.npm_config_report) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          .end();
        config.plugins.delete("prefetch");
      }
    }
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
      .set("@root", path.resolve(__dirname, "./../"))
      .set("@assets", path.resolve("src/assets"))
      .set("@components", path.resolve("src/components"));
  },
  css: {
    extract: isProdEnv,
    sourceMap: !isProdEnv,
    loaderOptions: {
      sass: {
        prependData:
          '@import "@/assets/styles/variables.scss";@import "@/assets/styles/helper.scss";'
      }
    }
  },
  configureWebpack: {
    devtool: false,
    // 第三方插件的配置 【引用】
    externals: {
      $: "jquery"
    },
    optimization: {
      minimizer: []
    }
  },
  devServer: {
    // 代理到端口
    port: runPort,
    proxy: {
      "/api/": {
        pathRewrite: {
          "^/api": ""
        },
        ws: false,
        target: apiProxyPath,
        changeOrigin: true
      }
    }
  }
};
