module.exports = {
  init: ({ keystone }) => {
    const register = keystone.List.prototype.register

    keystone.List.prototype.register = function () {
      const List = this
      const isSingleton = List.options.singleton

      // Only do this if the `singleton` option is set:
      if (isSingleton) {
        // Get the list name, and a human-readable name
        const listName = List.key
        const prettyName = listName
          .split('')
          .map(letter =>
            (letter.toUpperCase() === letter)
              ? ' ' + letter
              : letter
          )
          .join('')
          .trim()

        // Automatically name the item
        List.add({
          singleton__name: {
            type: String,
            required: true,
            default: prettyName,
            hidden: true
          }
        })

        // Map `singleton__name` to KeystoneJS name
        List.options.map = List.options.map || {}
        List.options.map.name = List.options.map.name || 'singleton__name'

        // Disallow creation and removal
        List.options.nocreate = true
        List.options.nodelete = true

        // Keep label singular by default
        List.options.label = List.options.label || prettyName

        // Register the singleton
        register.apply(this)

        // Attempt to create item, if none already exist
        const Model = keystone.list(listName).model

        Model.count()
          .lean()
          .exec()
          .then(count => {
            if (count === 0) {
              console.info(`SINGLETON: Creating '${listName}'...`)
              return Model.create({})
            } else {
              return Promise.resolve(undefined)
            }
          })
          .catch(reason => {
            console.error(`SINGLETON: Could not create '${listName}'.`)
          })
      } else {
        // Register the list
        register.apply(this)
      }
    }
  }
}
