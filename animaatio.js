 window.onload = function() {
      window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

      function drawRectangle(myCircle, context) {
        context.beginPath();
        context.arc(myCircle.x, myCircle.y, myCircle.radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#8ED6FF';
        context.fill();
        context.lineWidth = myCircle.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
      }
      
       function drawXaxis(context, skaala) {
        context.beginPath();
        context.moveTo(-(skaala/2), 0);
        context.lineTo((skaala/2), 0);
        context.strokeStyle = 'black';
        context.lineWidth = 0.1;
        context.stroke();
      }
      
      function drawYaxis(context, skaala) {
        context.beginPath();
        context.moveTo(0, -(skaala/2));
        context.lineTo(0,(skaala/2));
        context.strokeStyle = 'black';
        context.lineWidth = 0.1;
        context.stroke();
      }
      
      function drawEquation(context, skaala, funktioNum){
        context.beginPath();
        context.moveTo(-(skaala/2), funktio(-(skaala/2), funktioNum));
        for( var x=-(skaala/2); x<=(skaala/2); x+=0.1 ){
            context.lineTo(x, funktio(x, funktioNum));
        }
        context.strokeStyle = 'black';
        context.lineWidth = 0.1;
        context.stroke();
      }
      
      function funktio(x, num){
          if (num==0){
            return Math.sin(x);
          }
          if (num==1){
            return x*x;
          }
          if (num==2){
            return x;
          }
      }
      
      
      function animate(myCircle, canvas, context, startTime, runAnimation, uusiKoko, funktioNum) {
        if(runAnimation.value) {// update
        var time = (new Date()).getTime() - startTime;
        var amplitude = 10;
        
        if(funktioNum == 1){
            amplitude=3;
        }

        // in ms
        var period = 10000;
        var centerX = canvas.width / 2 - myCircle.radius;
        var nextX = amplitude * Math.sin(time * 2 * Math.PI / period);
        myCircle.x = nextX;
        
        //xy=(nextX/8);
        
        var nextY = funktio(nextX, funktioNum);
        myCircle.y = nextY;
        
        yArvo=myCircle.y;
        xArvo=myCircle.x;
        
        yArvo=yArvo.toFixed(1);
        xArvo=xArvo.toFixed(1);
        var messageY = 'Funktion arvo f(x): '+yArvo;
        var messageX = 'x-koordinaatti: '+xArvo;
        // clear
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        context.font = '13pt Calibri';
        context.fillStyle = 'black';
        context.fillText(messageY, 10, 100);
        context.fillText(messageX, 10, 150);
        context.fillText("y", 260, 10);
        context.fillText("x", 490, 280);
        context.restore();
        
        // draw
        drawRectangle(myCircle, context);
        drawXaxis(context, uusiKoko);
        drawYaxis(context, uusiKoko);
        drawEquation(context, uusiKoko, funktioNum);

        // request new frame
        requestAnimFrame(function() {
          animate(myCircle, canvas, context, startTime, runAnimation, uusiKoko, funktioNum);
        });
        }
      }
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      context.translate(canvas.width / 2, canvas.height / 2);
      var skaala = 20;
      context.scale(skaala,-skaala);
      
      var uusiKoko = 500/skaala;
      
      var myCircle = {
        x: 0,
        y: 0,
        radius: 0.5,
        borderWidth: 0.1
      };
      
      var runAnimation = {
        value: false
      };
      var funktioNum=0;
      
      document.getElementById('start').addEventListener('click', function() {
          var divRadio = document.getElementById("radiot");
          var radiot = divRadio.getElementsByTagName("input");
          
          for(var i=0 ; i < radiot.length ; i++){
              if(radiot[i].checked)
                  funktioNum = parseInt(radiot[i].value);
          }
          
          runAnimation.value = true;
          var startTime = (new Date()).getTime();
          animate(myCircle, canvas, context, startTime, runAnimation, uusiKoko, funktioNum);
      });
      
      document.getElementById('stop').addEventListener('click', function() {
          runAnimation.value = false;
          var startTime = (new Date()).getTime();
          animate(myCircle, canvas, context, startTime, runAnimation, uusiKoko, funktioNum);
      });
      drawRectangle(myCircle, context);
      drawXaxis(context, uusiKoko);
      drawYaxis(context, uusiKoko);
      
      drawEquation(context, uusiKoko, funktioNum);
      // wait one second before starting animation
    
 }