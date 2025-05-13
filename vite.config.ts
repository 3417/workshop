import { build, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import components from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { VarletImportResolver } from "@varlet/import-resolver";
// https://vitejs.dev/config/
const AutoImportPlugins = autoImport({
  resolvers: [VarletImportResolver({ autoImport: true })],
  include: [
    /\.[tj]sx?$/,
    /\.vue$/,
    /\.vue\?vue/,
    /\.md$/,
  ],// global imports to register
  imports: [
    // 插件预设支持导入的api
    'vue',
    'vue-router',
    'pinia'
    // 自定义导入的api
  ],
  dts:"src/auto-import.d.ts" //生成auto-import.d.ts 全局声明
})
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      vue(),
      components({
        resolvers: [VarletImportResolver()],
      }),
      AutoImportPlugins
    ],
    base: "./", //
    // base:resolve(__dirname,'./dist/'),  //
    server: {
      host: "0.0.0.0",
      port: 9669,
      open: false,
    },
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
      alias: {
        "@": resolve(__dirname, "./src"),
        "@as": resolve(__dirname, "./src/assets"),
        "@cp": resolve(__dirname, "./src/components"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@as/style/common.scss";`
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charst-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    // optimizeDeps: {
    //   esbuildOptions: {
    //     target: 'es2020'
    //   }
    // },
    build: {
      outDir: "dist",
      // target:'es2020'
    },
  });
};
