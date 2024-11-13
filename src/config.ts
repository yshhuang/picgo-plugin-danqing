import { PicGo } from "picgo";
import { PluginConfig } from "./models";

export function pluginConfig(ctx: PicGo) {
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
