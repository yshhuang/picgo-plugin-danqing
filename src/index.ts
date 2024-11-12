import { PicGo } from "picgo"
import { PluginConfig } from "./models";
// import ImageMagick from 'magickwand.js';
// import { fileURLToPath } from 'url';
import * as path from 'path';
// const path = require('path');

const { Magick, MagickCore } = require('magickwand.js/native');

async function compress(ctx: PicGo) {
  // Read a new image (synchronously)
  const config: PluginConfig = ctx.getConfig("picgo-plugin-danqing");
  const input_img = ctx.input[0];
  const backup_dir = config.backup_dir;
  let im = new Magick.Image(input_img);
  console.log(`${input_img}: ${im.size()}`);
  im.resize("1080");
  const img_name = im.signature() + config.format;
  const out_img = path.join(backup_dir, img_name);
  console.log(`output img is ${out_img}`);
  im.write(out_img)
}

async function handle(ctx: PicGo) {
  const config: PluginConfig = ctx.getConfig("picgo-plugin-danqing");
  ctx.log.info("plugin config is: " + JSON.stringify(config));
  ctx.log.info("input is" + ctx.input);
  await compress(ctx)
}

function pluginConfig(ctx: PicGo) {
  const config: PluginConfig = ctx.getConfig("picgo-plugin-danqing");
  return [
    {
      name: 'format',
      type: 'list',
      message: '选择压缩格式',
      choices: ['.webp', '.jpg', '.gif'],
      default: '.webp',
      required: true,
    },
    {
      name: "backup_dir",
      type: "input",
      message: "备份图片存储目录",
      default: "~",
      required: true,
    },
  ];
}

export = (ctx: PicGo) => {
  const register = (): void => {
    ctx.helper.beforeTransformPlugins.register("danqing", { handle });
  }
  return {
    register,
    config: pluginConfig
  }
}
