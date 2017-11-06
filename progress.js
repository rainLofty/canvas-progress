(function(){
    //x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色
    function DrowProcess(x,y,radius,process,backColor,proColor,fontColor){
        var canvas = document.getElementById('myCanvas');

        if (canvas.getContext) {
            var cts = canvas.getContext('2d');
        }else{
            return;
        }
        
        cts.beginPath();  
        // 坐标移动到圆心  
        cts.moveTo(x, y);  
        // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
        cts.arc(x, y, radius, 0, Math.PI * 2, false);  
        cts.closePath();  
        // 填充颜色  
        cts.fillStyle = backColor;  
        cts.fill();

        cts.beginPath();  
        // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
        cts.moveTo(x, y);  
        // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
        cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 -  Math.PI * 2 * process / 100, true);  
        cts.closePath();  
        cts.fillStyle = proColor;  
        cts.fill(); 
        
        //填充背景白色
        cts.beginPath();  
        cts.moveTo(x, y); 
        cts.arc(x, y, radius - (radius * 0.26), 0, Math.PI * 2, true);  
        cts.closePath();
        cts.fillStyle = 'rgba(255,255,255,1)';  
        cts.fill();   
          
        //在中间写字 
        cts.font = "bold 9pt Arial";  
        cts.fillStyle = fontColor;  
        cts.textAlign = 'center';  
        cts.textBaseline = 'middle';  
        cts.moveTo(x, y);  
        cts.fillText(process+"%", x, y);  
        
    }
    bfb = 0;
    function start(bgcolor,progresscolor,finallevel){
        DrowProcess(60,60,55,bfb,bgcolor,progresscolor,progresscolor);

        t = setTimeout(function(){
            start(bgcolor,progresscolor,finallevel);
        },5);
        if(bfb>=finallevel){
            clearTimeout(t);
            bfb=0;
            return;
        }
        bfb+=1;
    }
    window.start = start;
})();