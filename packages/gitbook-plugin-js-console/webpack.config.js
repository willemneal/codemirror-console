const path = require("path");
module.exports = {
    entry: ["./src/index.js"],
    devtool: process.env.WEBPACK_DEVTOOL || "source-map",
    output: {
        path: path.join(__dirname, "assets"),
        filename: "console-ui.js"
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                use: ["raw-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },
    node: {
  //   // "buffer": false,
      "fs": "empty",
  //   // "global": true,
  //   // "os": false,
  //   // "process": "mock",
  //   // "crypto": false
  },
  resolve: {
    alias: {
      // binaryen: path.resolve(__dirname, 'node_modules/assemblyscript/binaryen'),
      asc: path.resolve(__dirname, 'node_modules/assemblyscript/dist/asc.js'),
      assemblyscript: path.resolve(__dirname, 'node_modules/assemblyscript/index.js'),
      ascloader: path.resolve(__dirname, 'node_modules/assemblyscript/lib/loader')
    }
  }
  // externals: {
  //   assemblyscript: 'assemblyscript',
  //   asc: "asc"
  // }

};
