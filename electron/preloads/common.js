const {
  /** @type {import("electron").IpcRenderer} */
  ipcRenderer,
  /** @type {import("electron").ContextBridge} */
  contextBridge,
} = require("electron");

const callbacks = {
  storeConfig: [],
};
ipcRenderer.on("store:syncConfig", (event, config) => {
  for (const callback of callbacks.storeConfig) {
    callback(config);
  }
});


/** Open TaskBook Tower */
contextBridge.exposeInMainWorld("openTower", () => {
  return ipcRenderer.invoke("common:openWindow","data");
});
contextBridge.exposeInMainWorld("conteentR", {ping:()=>ipcRenderer.invoke('ping')});

/** Open Blitzit Tower */

