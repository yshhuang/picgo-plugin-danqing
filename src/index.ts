import { PicGo } from "picgo"
import { PluginConfig } from "./models";
import ImageMagick from 'magickwand.js';
import { fileURLToPath } from 'url';
import * as path from 'path';

const { Magick, MagickCore } = require('magickwand.js/native');

async function compress(input_img: string, output_img: string) {
  // Read a new image (synchronously)
  let im = new Magick.Image(input_img);
  console.log(`${input_img}: ${im.size()}`)
}

async function handle(ctx: PicGo) {
  const config: PluginConfig = ctx.getConfig("picgo-plugin-danqing");
  ctx.log.info("plugin config is: " + JSON.stringify(config));
  ctx.log.info("input is" + ctx.input);
  await compress(ctx.input[0], config.backup_dir)
}

function pluginConfig(ctx: PicGo) {

  return [
    //   {
    //   name: 'compress',
    //   type: 'list',
    //   message: '选择压缩库',
    //   choices: Object.keys(CompressType),
    //   default: config.compress || CompressType.tinypng,
    //   required: true,
    // },
    {
      name: "backup_dir",
      type: "input",
      message: "备份图片存储目录",
      default: null,
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
