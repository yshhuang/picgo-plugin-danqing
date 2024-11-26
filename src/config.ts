import { PicGo } from "picgo";
import { PluginConfig } from "./models";

export function pluginConfig(ctx: PicGo) {
    const config: PluginConfig = ctx.getConfig("picgo-plugin-danqing");
    return [
        {
            name: "format",
            alias: "图片格式",
            type: "list",
            message: "选择压缩格式",
            choices: [".webp", ".jpg", ".gif"],
            default: ".webp",
            required: true,
        },
        {
            name: "backup_dir",
            alias: "备份目录",
            type: "input",
            message: "备份图片存储目录",
            default: "~",
            required: true,
        },
        {
            name: "resize_geometry",
            alias: "缩放参数",
            type: "input",
            message: "缩放参数,详见https://imagemagick.org/script/command-line-processing.php#geometry",
            default: "1080>",
            required: true,
        },
    ];
}
