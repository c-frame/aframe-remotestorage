AFRAME.registerComponent('store',{
  init: function(){
    this.lastOuterHTML = this.el.innerHTML
    this.el.sceneEl.addEventListener('remoteStorage.connected', () => this.load() )
    this.el.sceneEl.setAttribute("visible", true)
    // observe HTML changes in <a-scene>
    setInterval( () => this.observeDOM(), 1500 )
  },

  observeDOM: function(){
    this.el.sceneEl.flushToDOM(true)
    if( this.el.innerHTML != this.lastOuterHTML ){
      this.save()
    }
    this.lastOuterHTML = this.el.innerHTML
  },

  getRemoteStorage: function(){
    if( this.client || !document.querySelector('[remotestorage]') ) return // nothing to do
    this.folder        = document.querySelector('[remotestorage]').components.remotestorage.data.folder
    this.remoteStorage = document.querySelector('[remotestorage]').components.remotestorage?.remoteStorage
    this.client        = this.remoteStorage.scope(`/${this.folder}/`);
  },

  load: function(){
    this.getRemoteStorage()
    if( !this.client ) return console.warn('store: load() remotestorage not connected (yet)')
    console.log("loading scene from remote storage")
    this.client.getFile('scene.html')
    .then( (res) => {
      if( res.data == 'undefined' || !res.data ) throw 'empty'
      this.el.innerHTML = this.lastOuterHTML = res.data 
    })
    .catch( this.save.bind(this) ) // naive save current scene when not found 
  },

  save: function(mutationsList,observer){
    this.getRemoteStorage()
    if( !this.client ) return console.warn('store: load() remotestorage not connected (yet)')
    let content = this.el.innerHTML
    this.client.storeFile('text/plain', 'scene.html', content)
    .then( () => console.log("scene has been saved") );
  }

})
