song="";
pulsoEx=0;
pulsoEy=0;
pulsoDx=0;
pulsoDy=0;
numPulsoE=0;
num_removeDec=0;
volume=0;
scorePulsoE=0;
scorePulsoD=0;
function preload(){
    song= loadSound("music.mp3");
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide()
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("PoseNet foi inicializado");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scorePulsoE=results[0].pose.keypoints[9].score;
        scorePulsoD=results[0].pose.keypoints[10].score;
        console.log(scorePulsoE);
        pulsoEx=results[0].pose.leftWrist.x;
        pulsoEy=results[0].pose.leftWrist.y;
        pulsoDy= results[0].pose.rightWrist.y;
        pulsoDx= results[0].pose.rightWrist.x;
        console.log(pulsoEx, pulsoEy, pulsoDx, pulsoDy);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
   
    fill("red");
    stroke("red");
    if(scorePulsoD > 0.2){
    circle(pulsoDx, pulsoDy, 20)
    if(pulsoDy > 0 && pulsoDy <= 100){
        document.getElementById("speed").innerHTML="Velocidade = 0.5x";
        song.rate(0.5);
    }
    else if(pulsoDy > 100 && pulsoDy <= 200){
        document.getElementById("speed").innerHTML="Velocidade = 1x";
        song.rate(1);
    }
    else if(pulsoDy > 200 && pulsoDy <= 300){
        document.getElementById("speed").innerHTML="Velocidade = 1.5x";
        song.rate(1.5);
    }
    else if(pulsoDy > 300 && pulsoDy <= 400){
        document.getElementById("speed").innerHTML="Velocidade = 2x";
        song.rate(2);
    }
    else if(pulsoDy > 400 && pulsoDy <= 500){
        document.getElementById("speed").innerHTML="Velocidade = 2.5x";
        song.rate(2.5);
    }
}
    if(scorePulsoE>0.2){
    circle(pulsoEx, pulsoEy, 20)
    numPulsoE= Number(pulsoEy);
    num_removeDec= floor(numPulsoE);
    volume= num_removeDec/500;
    document.getElementById("volume").innerHTML="Volume:"+volume;
    song.setVolume(volume);
    }
}
function play(){
    song.play();//para tocar o som.
    song.setVolume(volume);
}