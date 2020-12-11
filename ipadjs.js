function SelectText(element) {
  var doc = document,
    text = doc.getElementById(element),
    range, selection;
  if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(text);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

StarWars = (function() {

  /* 
   * Constructor
   */
  function StarWars(args) {
    // Context wrapper
    this.el = $(args.el);

    // Audio to play the opening crawl
    this.audio = this.el.find('audio').get(0);

    // Start the animation
    this.start = this.el.find('.start');

    // The animation wrapper
    this.animation = this.el.find('.animation');

    // Remove animation and shows the start screen
    this.reset();

    // Start the animation on click
    this.start.bind('click', $.proxy(function() {
      this.startAnimation();
    }, this));

    // Reset the animation and shows the start screen
    $(this.audio).bind('ended', $.proxy(function() {
      this.audio.currentTime = 0;
      $(".bg").addClass("goTobottom");
      this.reset();
    }, this));
  }

  /*
   * Resets the animation and shows the start screen.
   */
  StarWars.prototype.reset = function() {
    //this.start.show();
    this.cloned = this.animation.clone(true);
    this.animation.remove();
    this.animation = this.cloned;
  };

  StarWars.prototype.startAnimation = function() {
    this.start.hide();
    this.audio.play();
    this.el.append(this.animation);
  };

  return StarWars;
})();

var obj = new StarWars({
  el: '.starwars'
});

window.onload = function() {
  obj.startAnimation();
};

$(document).ready(function() {
  $("#genLink").click(function() {
    var senderName = $("#sender").val();
    var receiverName = $("#receiver").val();
    $("#textGen").html("Share this link");
    $("#linkGen").html("http://abrahamk.in/xmas/?w=" + btoa(receiverName + "," + senderName));
    SelectText('linkGen');
  });
})