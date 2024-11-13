import { PicGo } from 'picgo'
import { PluginConfig } from './models';
import { pluginConfig } from './config';
// import ImageMagick from 'magickwand.js';
// import { fileURLToPath } from 'url';
import * as path from 'path';
// const path = require('path');
const fsExtra = require('fs-extra');


const { Magick, MagickCore } = require('magickwand.js/native');

async function compress(ctx: PicGo) {
  // Read a new image (synchronously)
  const config: PluginConfig = ctx.getConfig('picgo-plugin-danqing');
  const input_img = ctx.input[0];
  const backup_dir = config.backup_dir;
  const resize_geometry = config.resize_geometry;
  let im = new Magick.Image(input_img);
  im.resize(resize_geometry);
  const img_name = im.signature() + config.format;
  const date = new Date();
  const out_dir = path.join(backup_dir, year(date), month(date));
  if (!fsExtra.existsSync(out_dir)) {
    fsExtra.mkdirSync(out_dir);
  }
  const out_img = path.join(out_dir, img_name);
  console.log(`output img is ${out_img}`);
  im.write(out_img)
}

function year(date: Date): string {
  return `${date.getFullYear()}`
}

function month(date: Date): string {
  return date.getMonth() < 9
    ? `0${date.getMonth() + 1}`
    : `${date.getMonth() + 1}`
}

async function handle(ctx: PicGo) {
  await compress(ctx)
}



export = (ctx: PicGo) => {
  const register = (): void => {
    ctx.helper.beforeTransformPlugins.register('danqing', { handle });
  }
  return {
    register,
    config: pluginConfig
  }
}
