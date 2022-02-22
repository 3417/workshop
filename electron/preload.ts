window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})


const {contextBridge,ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld('electron',{
  send:(name,url)=>{
    if(name === 'maxBox'){
      ipcRenderer.send("window-max")
    }else if(name ==='minBox'){
      ipcRenderer.send("window-min")
    }else if(name ==='close'){
      ipcRenderer.send("window-close")
    }else if(name === 'downloadImg'){
      console.log(url);
      ipcRenderer.send("window-download",url)
    }
  }  
})
