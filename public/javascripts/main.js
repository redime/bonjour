// jQuery
Modernizr.load([{
  // Load jQuery from Google CDN
  //load: '//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js',
  load: '/javascripts/libs/jquery.js',

  complete: function() {
    if (!window.jQuery) {
      Modernizr.load('/javascripts/libs/jquery.js');
    }
  }
}, {
  // Load the remaining scripts
  load: '/javascripts/rails.js'
}, {
  // Test for flexbox support
  test: Modernizr.flexbox,
  yep: '/javascripts/jquery.nav.js',
  nope: ['/javascripts/libs/flexie.js', '/javascripts/jquery.nav.js'],
  
  complete: function() {
    jQuery(function() {
      $('nav').navigator();
      $('body > *').show();
    });
  }
}]);
