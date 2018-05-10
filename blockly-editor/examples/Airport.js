bp.registerBThread('Landing strip', function(){
  while (true) {
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Tower: airplane approaching');
    bsync({waitFor: bp.Event('Tower: airplane approaching')});
    bsync({request: bp.Event('Landing strip: clear for landing')});
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Tower: airplane landed');
    bsync({waitFor: bp.Event('Tower: airplane landed')});
    bsync({request: bp.Event('Landing strip: under maintenance '),
    block: bp.Event('Tower: clear for landing')});
    bsync({request: bp.Event('Landing strip: maintenance done')});
  }

});

bp.registerBThread('Fuel supply', function(){
  while (true) {
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Tower: airplane landed');
    bsync({waitFor: bp.Event('Tower: airplane landed')});
    bsync({request: bp.Event('Fuel supply: refueling airplane '),
    block: bp.Event('Boarding crew: boarding')});
    bsync({request: bp.Event('Fuel supply: airplane fully fueled')});
  }

});

bp.registerBThread('Tower', function(){
  while (true) {
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Airplane: approaching');
    bsync({waitFor: bp.Event('Airplane: approaching')});
    bsync({request: bp.Event('Tower: airplane approaching')});
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Landing strip: clear for landing');
    bsync({waitFor: bp.Event('Landing strip: clear for landing')});
    bsync({request: bp.Event('Tower: clear for landing')});
    bsync({request: bp.Event('Tower: airplane landed')});
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Fuel supply: airplane fully fueled');
    bsync({waitFor: bp.Event('Fuel supply: airplane fully fueled')});
    bsync({request: bp.Event('Tower: clear for boarding')});
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Boarding crew: boarding complete');
    bsync({waitFor: bp.Event('Boarding crew: boarding complete')});
    bsync({request: bp.Event('Tower: clear to take off')});
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Runway: clear');
    bsync({waitFor: bp.Event('Runway: clear')});
  }

});

bp.registerBThread('Boarding crew', function(){
  while (true) {
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Tower: clear for boarding');
    bsync({waitFor: bp.Event('Tower: clear for boarding')});
    bsync({request: bp.Event('Boarding crew: boarding'),
    block: bp.Event('Tower: clear to take off')});
    bsync({request: bp.Event('Boarding crew: boarding complete')});
  }

});

bp.registerBThread('Runway', function(){
  while (true) {
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'Tower: clear to take off');
    bsync({waitFor: bp.Event('Tower: clear to take off')});
    bsync({request: bp.Event('Runway: airplane taking off'),
    block: bp.Event('Landing strip: clear for landing')});
    bsync({request: bp.Event('Runway: clear')});
  }

});
