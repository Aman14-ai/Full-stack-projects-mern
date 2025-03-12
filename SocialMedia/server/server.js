import path from 'path';
import express from 'express';
import { MongoClient } from 'mongodb';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.client.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import template from '../templates.js';

// Create Express app
const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// ✅ Enable Webpack HMR only in development
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Serve static files from `dist`
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// Serve HTML template
app.get('/', (req, res) => {
  res.status(200).send(template());
});

// Start the server
let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(`🚀 Server started on http://localhost:${port}`);
});

// ✅ Updated MongoDB Connection Code
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';

async function connectDB() {
  try {
    const client = await MongoClient.connect(url);
    console.log("Connected successfully to MongoDB server");
    client.close();
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Call the function to connect
connectDB();
