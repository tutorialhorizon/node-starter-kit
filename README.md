node-starter-kit
=====

Simple nodejs server
---

**Global dependencies**
```sh
sudo npm install -g grunt-cli
sudo npm install -g node-inspector
```

**Local dependencies**
```sh
npm install
```

**Start your server**
```js
npm run start
```

**Start your server in debug mode with node inspector**
```js
npm run debug
```

**Create a pre-commit git hook that runs jshint before every commit**
```sh
grunt githook
```

Open `localhost:3000/home` in the browser.