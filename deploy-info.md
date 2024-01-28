Some quick info about this **package.json:**

```JSON
...
 "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
...
```
In the scripts section of your package.json you get options what is being run when you execute npm run ... in your operating system.

So the 'dev' section corresponds to npm run dev for live editing and debug.
'build' to npm run build which creates a directory with production-ready files.
'preview' works after you got your build, and it deploys your production-ready files to localhost while starting a local server.

With vite, after npm build you get a Dist directory created.
All your Public and src files are copied here
Also the compiled Sources are put in the Assets directory.

After npm run build you can do npm run preview 
This yields a deploy-ready version on your localhost.

