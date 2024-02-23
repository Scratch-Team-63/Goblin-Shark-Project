const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  entry: "./client/src/index.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "client", "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env" , "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/public/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'client/dist'),
      publicPath: '/'
    },
    hot: true,
    proxy: [{
      context: ['/'], // context can be a string or an array of strings to specify multiple paths
      target: 'http://localhost:3000'
    }],
  }
};



module.exports = config;
