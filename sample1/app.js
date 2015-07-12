var app = {};


app.init = function() {
  if(document && document.getElementById) {
    app.display = document.getElementById('display');
    app.eventListener = app.display;
    app.display.focus();
    app.ctx = app.display.getContext('2d');
    app.width = app.display.width = window.innerWidth - 40;
    app.height = app.display.height = window.innerHeight - 30;
    app.ctx.clearRect(0, 10, app.width, 60);
    app.ctx.strokeStyle = "#FFFF33";

    app.ctx.fillStyle = app.ctx.strokeStyle;
    app.ctx.fill();
    //app.ctx.arc(150, 150, 300, 0, 2 * Math.PI, false);
    app.ctx.stroke();
    app.eventListener.addEventListener('keydown', app.onKeyDown);
    app.circles = [];

	}
}

app.onKeyDown = function(e) {
  app.eventListener.removeEventListener("keydown", app.onKeyDown);
  shellJs.init(app.display, app.onCommandExit, app.commands);
}



app.onCommandExit = function() {
  app.eventListener.addEventListener('keydown', app.onKeyDown);
  app.drawCircles();
}


app.addCircle = function(x, y, radius) {
  app.circles.push([x,y,radius]);
  app.drawCircles();
}

app.removeCircles = function() {
  if(app.circles.length > 0) {
    app.circles.splice(0, 1);
  }
}

app.drawCircles = function() {
  var x,
    cP;

  app.ctx.clearRect(0, 0, app.width, 600);
  for(x = 0; x < app.circles.length; x++) {
    cP = app.circles[x];
    app.ctx.arc(cP[0], cP[1], cP[2], 0, 2 * Math.PI, false);
  }
  app.ctx.stroke();
}

app.commands = [
  {command: "circle", description: "draw circle", fn: app.addCircle},
  {command: "remc", description: "remove all existing circles", fn: app.removeCircles}
]

app.init();