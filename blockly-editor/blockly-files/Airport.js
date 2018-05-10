bp.registerBThread('Landing strip', function(){
  bsync({request: bp.Event('Landing strip: clear for landing')});
  while (true) {
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Tower: airplane landed');
    bsync({waitFor: bp.Event('Tower: airplane landed')});
    bsync({request: bp.Event('Landing strip: in maintenance '),
    block: bp.Event('Tower: clear for landing')});
    bsync({request: bp.Event('Landing strip: clear for landing')});
  }

});

bp.registerBThread('Fuel supply', function(){
  while (true) {
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Tower: airplane landed');
    bsync({waitFor: bp.Event('Tower: airplane landed')});
    bsync({request: bp.Event('Fuel supply: refueling airplane '),
    block: bp.Event('Boarding crew: boarding')});
    bsync({request: bp.Event('Landing strip: clear for landing')});
  }

});
