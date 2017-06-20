function QueueWorker(name,file){
  this.name            = name
  this.file            = file
  this.status          = console.draft()
  this.working         = false
}

QueueWorker.prototype.GetFile = function() { return this.file }
QueueWorker.prototype.GetName = function() { return this.name }
QueueWorker.prototype.GetWorking = function() { return this.working }
QueueWorker.prototype.SetWorking = function(b) {
  var self     = this
  self.working = b
  if (b == true) { self.status(printjaune(`[ ${self.name} ]`)) }
  if (b == false) { self.status(printvert(`[ ${self.name} ]`)) }
}
QueueWorker.prototype.SetStatus = function(message) {
  var self = this
  self.status(printmauve(message))
}
QueueWorker.prototype.Finish    = function() {
  var self      = this
  self.working  = false
  self.status(printrouge(`[ ${self.name} ]`))
}
QueueWorker.prototype.Affichage = function() {
  var self = this
  self.status(printvert(`[ ${self.name} ]`))
}

module.exports = QueueWorker
