var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var compuetedStyle = getComputedStyle(document.getElementById('paint'));
canvas.width = parseInt(compuetedStyle.getPropertyValue('width'));
canvas.height = parseInt(compuetedStyle.getPropertyValue('height'));

var mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

context.lineWidth = isMobile ? 40 : 12;
context.lineJoin = 'round';
context.lineCap = 'round';
context.strokeStyle = '#0000FF';

canvas.addEventListener('mousedown', function(e) {
  context.moveTo(mouse.x, mouse.y);
  context.beginPath();
  canvas.addEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function() {
  context.lineTo(mouse.x, mouse.y);
  context.stroke();
};

canvas.addEventListener('touchstart', function (e) {
  var touch = e.touches[0];
  canvas.dispatchEvent(new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  }));
}, false);
canvas.addEventListener('touchend', function (e) {
  canvas.dispatchEvent(new MouseEvent('mouseup', {}));
}, false);
canvas.addEventListener('touchmove', function (e) {
  var touch = e.touches[0];
  canvas.dispatchEvent(new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  }));
}, false);

$('#clear').click(function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  $('#number').html('');
});