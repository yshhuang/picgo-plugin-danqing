import { PicGo } from 'picgo'
import { PluginConfig } from './models';

function handle(ctx: PicGo) {
  const config: PluginConfig = ctx.getConfig("picgo-plugin-danqing");
  ctx.log.info('plugin config is: ' + JSON.stringify(config));
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
      name: 'backup_dir',
      type: 'input',
      message: '备份图片存储目录',
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
