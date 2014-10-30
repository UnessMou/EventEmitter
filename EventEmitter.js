/*!
 * EventEmitter v 0.1
 *
 * https://github.com/hij1nx/EventEmitter2
 *
 * MOUMOU Youness
 */

module.exports = EventEmitter;

function EventEmitter () {
  if (!(this instanceof EventEmitter)) return new EventEmitter();
  EventEmitter.init.call(this);
}

EventEmitter.init = function () {
  this.callbacks = {};
};


EventEmitter.prototype.on = function (event, fn) {
  return this._addEvent(event, fn, 0);
};

EventEmitter.prototype.once = function (event, fn) {
  return this._addEvent(event, fn, 1);
};

EventEmitter.prototype.times = function (event, num, fn) {
  return this._addEvent(event, fn, num);
};

EventEmitter.prototype.off = function (event) {
  if (event) {			// if (event) delete event 
    delete this.callbacks[event];
    return this;
  }

  else 		// else delete all avents 
  for (var e in this.callbacks) delete this.callbacks[e];

  return this;
};

EventEmitter.prototype.emit = function (event) {

  if (!this.callbacks[event])
    console.log('Event "' + event + '" dont exists');

  else 
  {	 
  var args = Array.prototype.slice.call(arguments, 1);

  // execute event
  this.callbacks[event].fn.apply(this, args);

  // remove event if once or decrement if > 1
  if (this.callbacks[event].num == 1) delete this.callbacks[event];
  else	if(this.callbacks[event].num > 1) this.callbacks[event].num--;

	}  

  return this;

};

EventEmitter.prototype.getAllEvents = function () {
  return Object.keys(this.callbacks);
};

EventEmitter.prototype._addEvent = function (event, fn, nume) {
  if (typeof fn !== 'function')
    throw TypeError('fn should be a function');

  if (!this.callbacks[event])
    this.callbacks[event] = {
      num: nume,
      fn: function () {
        return fn.apply(this, arguments);
      },
      time: new Date()
    };

  return this;
};
