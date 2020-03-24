/**
 * --------------------------------------------------------------------------
 *  common.js
 * --------------------------------------------------------------------------
 */

var front = front || {};

front.common = front.common || {};

front.common = (function () {

  var init = function() {
    this.a();
    this.inputFile();
  };

  var a = function () {
    $('a[href="#"]').on('click', function (e) {
      e.preventDefault();
    });
  }

  var inputFile = function () {
    $('.custom-file-input').on('change', function() {
      let fileName = $(this).val().split('\\').pop();
      $(this).siblings('.custom-file-label').addClass('selected').html(fileName).css({'color':'#333','border-color':'#333'});
    });
  }

  return {
    a : a,
    inputFile : inputFile,
    init : init
  }
})();
$(function () {
  front.common.init();
});
