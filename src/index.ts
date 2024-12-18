import { PicGo } from "picgo"
import { PluginConfig } from "./models";
import { pluginConfig } from "./config";

import * as path from "path";
import fs from "fs";
import { timeuuid } from "./uuids";


import { Magick, MagickCore } from "magickwand.js/native";

async function compress(ctx: PicGo) {
  // Read a new image (synchronously)
  const config: PluginConfig = ctx.getConfig("picgo-plugin-danqing");
  const input_img = ctx.input[0];
  const backup_dir = config.backup_dir;
  const resize_geometry = config.resize_geometry;
  let im = new Magick.Image(input_img);
  im.resize(resize_geometry);
  im.magick("WEBP");
  const uuid = timeuuid();
  const img_name = uuid + config.format;
  const date = new Date();
  const out_dir = path.join(backup_dir, year(date), month(date));
  fs.mkdirSync(out_dir, { recursive: true })
  const out_img = path.join(out_dir, img_name);
  console.log(`output img is ${out_img}`);
  im.write(out_img);
  ctx.input = [out_img];
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
    ctx.helper.beforeTransformPlugins.register("danqing", { handle });
  }
  return {
    register,
    config: pluginConfig
  }
}
