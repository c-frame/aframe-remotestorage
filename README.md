# remoteStorage

An open protocol for per-user storage on the Web

> Webfinger + OAuth + CORS + REST

Read more [on the protocol](https://remotestorage.io/) and [its apps](https://remotestorage.io/apps.html#apps)

![](raw/branch/master/README.mp4)

## Installation

```
    <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
    <script src="build/aframe-remotestorage.js"></script> 
    <style type="text/css">
      #remotestorage-widget {
        z-index: 21000000;
        position: fixed;
        top: 0;
        right: 0;
      }
    </style>
  </head>
  <body>
    <a-scene remotestorage="dropbox: apikey; googledrive: apikey; logging: true; folder: myapp">

       ... see index.html for usage ...

    </a-scene>
  </body>
</html>


```

> See [index.html](index.html) as an example, which demonstrates a [store.js](store.js) component which uses the [aframe-remotestorage](build/aframe-remotestorage.js) AFRAME component.
