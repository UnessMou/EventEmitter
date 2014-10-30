EventEmitter
============

EventEmitter v0.1


##Desc
    
    
    methods:
    
        on('event', callback([arg1], [arg2], [...]))
        once('event', callback([arg1], [arg2], [...]))        // run once
        times('event', num, callback([arg1], [arg2], [...]))  // run 'num' times
        emit('event', [arg1], [arg2], [...])
        off([event])                                   // delete one if (event) or all events if (!event)
        getEvents()                                    // return tree of events
        
        
  

##Example
    
    
    
    var EventEmitter = require('./EventEmitter.js');
    
    var em = new EventEmitter();
    var fn = console.log.bind(console);
    
    em.on('hello', fn);
    
    em.on('hello2', function (arg) {
        console.log(arg);
    });
    
    em.emit('hello', 'Hello', 'World');

    em.off('hello');
    
    em.times('hello', 2, function (arg1, arg2) {
    console.log(arg1 + ' & ' + arg2);
    });

    em.once('hello2', function (arg1, arg2) {
        console.log(arg1 + ' ' + arg2);
    });
