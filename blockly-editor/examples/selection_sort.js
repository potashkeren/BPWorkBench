var Count, arr, list, LIST_LENGTH, i, j, item, CELL_PREFIX, CELL_SUFFIX, x, index, temp, index1, index2, k, l;

/**
 * Describe this function...
 */
function addCell(l) {
  bp.registerBThread((CELL_PREFIX+(l+CELL_SUFFIX)), function(){
    //Auto-generated code for dynamic event detection:
    bp.log.info("EVENT_DETECTED: "+'select('+(l+')'));
    bsync({waitFor: bp.Event(('select('+(l+')')))});
    swap(l, list.lastIndexOf(Math.min.apply(null, list.slice(l, list.length))));
    bsync({request: bp.Event(('['+((list.join(','))+']')))});

  });
}

function mathRandomInt(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}

/**
 * create a list with random elements
 */
function randomize_list() {
  arr = [];
  var i_end = LIST_LENGTH - 1;
  var i_inc = 1;
  if (0 > i_end) {
    i_inc = -i_inc;
  }
  for (i = 0; i_inc >= 0 ? i <= i_end : i >= i_end; i += i_inc) {
    arr[i] = mathRandomInt(1, 100);
  }
  return arr;
}

/**
 * Describe this function...
 */
function swap(index1, index2) {
  temp = list[index1];
  list[index1] = list[index2];
  list[index2] = temp;
}


LIST_LENGTH = 10;
list = randomize_list();
CELL_PREFIX = 'list[';
CELL_SUFFIX = ']';

var j_end = LIST_LENGTH - 1;
var j_inc = 1;
if (0 > j_end) {
  j_inc = -j_inc;
}
for (j = 0; j_inc >= 0 ? j <= j_end : j >= j_end; j += j_inc) {
  addCell(j);
}

bp.registerBThread('Selector', function(){
  var k_end = LIST_LENGTH - 1;
  var k_inc = 1;
  if (0 > k_end) {
    k_inc = -k_inc;
  }
  for (k = 0; k_inc >= 0 ? k <= k_end : k >= k_end; k += k_inc) {
    bsync({request: bp.Event(('select('+(k+')')))});
    bsync({waitFor: (bp.EventSet("es181", function(e) {
      return true;
    }))});
  }
  bsync({request: bp.Event((('Sorted list: '+'[')+((list.join(','))+']')))});

});
