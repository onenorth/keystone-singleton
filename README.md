# KeystoneJS | Singleton Plugin
> A plugin that allows the creation of "singleton" KeystoneJS lists.

### Installation

```
npm install --save-dev git://github.com/onenorth/keystone-singleton.git#1.0.1
```

### Description

This plugin prevents users from creating multiple items, and guarantees that an item is created automatically.

So if you want to make "Homepage Settings", we gotchu <3


### Example Usage


__`HomepageSettings.js`__

```js
const keystone = require('keystone')

// 1. Include the `singleton` option
const List = keystone.List('HomepageSettings', {
  singleton: true
})

// 2. Add in your fields.
List.add( /* ... */ )

// 3. Register your list.
List.register()
```


__`keystone.js`__

```js
const keystone = require('keystone')
const singleton = require('keystone-singleton')

// 1. Initialize KeystoneJS
keystone.init( /* ... */ )

// 2. Initialize this plugin
singleton.init({ keystone })

// 3. Include your Models
keystone.import('models')

// 4. Start KeystoneJS
keystone.start()
```

Your KeystoneJS list will automatically be created on startup.
