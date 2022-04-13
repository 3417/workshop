import { build, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [vue()],
    base: './',  // 
    // base:resolve(__dirname,'./dist/'),  // 
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: false
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
      alias: {
        '@': resolve(__dirname, './src'),
        '@as': resolve(__dirname, './src/assets'),
        '@cp': resolve(__dirname, './src/components'),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/assets/style/common.scss";`
        }
      },
      postcss:{
        plugins:[
          {
            postcssPlugin:'internal:charst-removal',
            AtRule:{
              charset:(atRule)=>{
                if(atRule.name === 'charset'){
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    build: {
      outDir: 'dist'
    }
  })
}
