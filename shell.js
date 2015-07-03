var shellJs = {};

shellJs.init = function () {
  if(document && document.getElementById) {
    var display = document.getElementById('display');
    shellJs.width = display.width = window.innerWidth - 40;
    shellJs.height = display.height = window.innerHeight - 30;
    shellJs.halfWidth = shellJs.width * 0.5;
    shellJs.halfHeight = shellJs.height * 0.5;
    shellJs.txtOffset = 50;
    shellJs.lineHeight = 10;
    shellJs.ctx = display.getContext('2d');
    display.focus();
    shellJs.eventListener = display;
    shellJs.eventListener.addEventListener('keydown', shellJs.onKeyDown);
  } 

  shellJs.render();
};

shellJs.render = function() {
  shellJs.ctx.clearRect(0, 10, shellJs.width, 60);
  shellJs.ctx.beginPath();
  shellJs.ctx.strokeStyle = "#00FF00";
  shellJs.ctx.fillStyle = shellJs.ctx.strokeStyle;
  shellJs.ctx.fill();
  shellJs.appendLine(shellJs.cmdPrompt + shellJs.buffer + "_");
  shellJs.ctx.stroke();        
}

shellJs.onKeyDown = function(e) {
  var prop = true;

  //console.log(e.keyCode);

  if(e.keyCode === 13) {    // enter
    shellJs.prev.push(shellJs.buffer);
    shellJs.prevInx = shellJs.prev.length;
    shellJs.processCommand();
    shellJs.buffer = "";
  } else if( e.keyCode === 38 ) { // up
    shellJs.prevInx = shellJs.prevInx === 0 ? 0 : shellJs.prevInx - 1;
    shellJs.buffer = shellJs.prev[shellJs.prevInx];
  } else if( e.keyCode === 8) { // backspace
    shellJs.buffer = shellJs.buffer.substr(0, shellJs.buffer.length - 1);
    prop = false;
  } else {
    shellJs.buffer += String.fromCharCode(e.keyCode);
  }
  shellJs.render();

  if(!prop) {
    e.preventDefault();
    return false;
  }
}

shellJs.processCommand = function() {
  var x = 0,
    found = false,
    splat = shellJs.buffer.toLowerCase().split(' '),
    args = splat.length > 0 ? splat.slice(1, splat.length) : null;

  shellJs.clearScreen();
  if(splat.length > 0) {
    for(x = 0; x < shellJs.commands.length; x++) {
      if(splat[0] === shellJs.commands[x].command.toLowerCase() ) {
        shellJs.commands[x].fn.apply(this, args);
        return;
      }
    }
  }


  shellJs.ctx.fillText("Unknown command ... try typing HELP", 10, 100);
}

shellJs.appendLine = function(txt) {
  shellJs.ctx.fillText(txt, 10, shellJs.txtOffset);
};

shellJs.clearScreen = function() {
  shellJs.ctx.clearRect(0, 10, shellJs.width, shellJs.height);
}

shellJs.onHelpCommand = function() {
  //shellJs.ctx.fillText("HELP", 10, 100);
  var startY = 100,
    x,
    txt;

  for(x = 0; x < shellJs.commands.length; x++) {
    txt = shellJs.commands[x].command.toUpperCase() + " :  " + shellJs.commands[x].description;
    shellJs.ctx.fillText(txt, 10, startY + x * 10);
  }
}

shellJs.onClearCommand = function() {
  shellJs.clearScreen();
}


shellJs.onTimes = function(x, y) {
  shellJs.ctx.fillText(x * y, 50, 100);
}

shellJs.commands = [
  {command: "help", description: "find out commands", fn: shellJs.onHelpCommand},
  {command: "clear", description: "clear the screen", fn: shellJs.onClearCommand},
  {command: "times", description: "do something x times", fn: shellJs.onTimes},
];




shellJs.cmdPrompt = "> ";
shellJs.prevInx = 0;
shellJs.prev = [];
shellJs.buffer = "";
shellJs.init();