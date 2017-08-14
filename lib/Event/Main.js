var EventEmitter  = require('events').EventEmitter
var event         = new EventEmitter()

const _ActionA = require('./Action/A.js')
const _ActionB = require('./Action/B.js')
const _ActionC = require('./Action/C.js')

event.on('ListenerA', (param1,param2) => {
  console.log("ActionA est appelé")
  _ActionA(param)
    .then( res => {
      event.emit('ListenerB', param1, param2)
    })
})

event.on('ListenerB', (param1,param2) => {
  console.log("ActionB est appelé")
  _ActionB(param)
    .then( res => {
      event.emit('ListenerC', param1, param2)
    })
})

event.on('ListenerC', (param1,param2) => {
  console.log("ActionC est appelé")
  _ActionC(param)
    .then( res => {
      console.log(res)
    })
})
