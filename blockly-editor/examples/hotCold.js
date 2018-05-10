bp.registerBThread('hot', function(){
  for (var count = 0; count < 5; count++) {
    bsync({request: bp.Event('hot')});
  }

});

bp.registerBThread('cold', function(){
  for (var count2 = 0; count2 < 5; count2++) {
    bsync({request: bp.Event('cold')});
  }

});

bp.registerBThread('interleave', function(){
  while (true) {
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'cold');
    bsync({waitFor: bp.Event('cold'),
    block: bp.Event('hot')});
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'hot');
    bsync({waitFor: bp.Event('hot'),
    block: bp.Event('cold')});
  }

});
