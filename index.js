AFRAME.registerComponent('remotestorage',{
  schema:{
    dropbox:        {type:"string", "default":""},
    googledrive:    {type:"string", "default":""},
    leaveOpen:      {type:"bool", "default":false},
    autoCloseAfter: {type:"number", "default":1500},
    skipInitial:    {type:"bool", "default":false},
    logging:        {type:"bool", "default":false},
    modalBackdrop:  {type:"string", "default":"onlySmallScreens"}, // or "false" or "true"
    folder:         {type:"string"}
  },
  init: function(){
    let apis = {}
    remoteStorage = this.remoteStorage = new RemoteStorage({logging: this.data.logging })
    if( this.data.dropbox     ) apis.dropbox     = this.data.dropbox
    if( this.data.googledrive ) apis.googledrive = this.data.googledrive
    if( Object.keys(apis).length ) remoteStorage.setApiKeys(apis)

    remoteStorage.on('connected',       (e) => this.el.sceneEl.emit('remoteStorage.connected',e) )    
    remoteStorage.on('network-offline', (e) => this.el.sceneEl.emit('remoteStorage.network-offline',e) )
    remoteStorage.on('network-online',  (e) => this.el.sceneEl.emit('remoteStorage.network-online',e) )    
    remoteStorage.on('error',           (e) => this.el.sceneEl.emit('remoteStorage.error',e) )    
    remoteStorage.on('ready',           (e) => this.el.sceneEl.emit('remoteStorage.ready',e) )    

    remoteStorage.access.claim( this.data.folder, 'rw');    // our data dir
    remoteStorage.caching.enable( `/${this.data.folder}/` ) // local-first, remotestorage-second

    let opts = {...this.data}
    if( opts.modalBackdrop == "false" ) opts.modalBackdrop = false
    if( opts.modalBackdrop == "true"  ) opts.modalBackdrop = true
    widget = this.widget = new Widget(remoteStorage, opts)
    widget.attach();
  }
})
