(function(root, doc) {

  /**
   * clientside adblock detection
   * works in Chrome/Firefox
   *
   * author: dhigginbotham
   * license: MIT
   */

  var priv = {};

  priv.containerId = 'sponsored-ad';

  priv.buildElement = function(id, fn) {
    if (typeof doc.body == 'undefined') return fn('cannot test page', null);
    var elem = doc.createElement('div');
    elem.id = id || priv.containerId;
    elem.style.position = 'absolute';
    elem.style.left = '-999px';
    elem.appendChild(doc.createTextNode('&nbsp;'));
    doc.body.appendChild(elem);
    fn(null, elem);
  };

  priv.init = function(id) {
    priv.buildElement(id, function(err, elem) {
      var blocked = (elem.clientHeight == 0);
      try {	
    	  if (console && console.log) console.log(blocked);
      } catch (err) {
        if (console && console.log) {
          console.log('error with detection suite');
        }
      }
      if (typeof doc.body != 'undefined') doc.body.removeChild(elem);
    });
  };

  var adblock = function (id) {
    setTimeout(priv.init(id), 175);
  };

  if (typeof module != 'undefined' && module.exports) {
    module.exports = adblock;
  } else {
    root.adblock = adblock;
  }

}(window, document));