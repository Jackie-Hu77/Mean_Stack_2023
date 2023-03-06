//<---------------- VIEW -------------->
const View = (() => {

    //element selector 
    const domSelecter = {
        resbtn : document.querySelector("#restart"), 
        timer : document.querySelector("#time_left"),
        score : document.querySelector("#score"),
        moleArr : {
            mole0 : document.querySelector("#mole_0"),
            mole1 : document.querySelector("#mole_1"),
            mole2 : document.querySelector("#mole_2"),
            mole3 : document.querySelector("#mole_3"),
            mole4 : document.querySelector("#mole_4"),
            mole5 : document.querySelector("#mole_5"),
            mole6 : document.querySelector("#mole_6"),
            mole7 : document.querySelector("#mole_7"),
            mole8 : document.querySelector("#mole_8"),
            mole9 : document.querySelector("#mole_9"),
            mole10 : document.querySelector("#mole_10"),
            mole11 : document.querySelector("#mole_11"),
        },
        snakeArr : {
            snake0 : document.querySelector("#snake_0"),
            snake1 : document.querySelector("#snake_1"),
            snake2 : document.querySelector("#snake_2"),
            snake3 : document.querySelector("#snake_3"),
            snake4 : document.querySelector("#snake_4"),
            snake5 : document.querySelector("#snake_5"),
            snake6 : document.querySelector("#snake_6"),
            snake7 : document.querySelector("#snake_7"),
            snake8 : document.querySelector("#snake_8"),
            snake9 : document.querySelector("#snake_9"),
            snake10 : document.querySelector("#snake_10"),
            snake11 : document.querySelector("#snake_11"),
        }
        

    }

    // update which moles images should be popped up(block), and else should be remove(none)
    const changeVisible = (indexArr) => {
        let moles =  domSelecter.moleArr;
        // console.log(typeof(Object.keys(moles)[0]) );
        let moleValues = Object.values(moles);
        // console.log(moleVules);
        for(let i = 0; i < moleValues.length; i++){
            if(indexArr.includes(i)){
                moleValues[i].style.display = "block";
            }else{
                moleValues[i].style.display = "none";
            }
        }

    }

    //update snake image pop up or remove
    const changeSnakeVisible = (snakeIndex) => {

        // console.log("调用changeSnakevisible()");
        let snakes = domSelecter.snakeArr;
        let snakeValues = Object.values(snakes);
        for(let i = 0; i < snakeValues.length; i++){
            console.log("发现snake位置" + snakeIndex);
            if(i == snakeIndex){
                
                snakeValues[i].style.display = "block";
            }else{
                snakeValues[i].style.display = "none";
            }

        }
    }

    //when click on a snake, it will show all snakes
    const showAllSnakes = () =>{
        disappearAllMoles();
        let snakes = domSelecter.snakeArr;
        let snakeValues = Object.values(snakes);
        for(let i = 0; i < snakeValues.length; i++){
            snakeValues[i].style.display = "block";

        }
    }

    //when explode effect triggered, all moles should be disappear
    const disappearAllMoles = () => {
        let moles =  domSelecter.moleArr;
        // console.log(typeof(Object.keys(moles)[0]) );
        let moleValues = Object.values(moles);
        // console.log(moleVules);
        for(let i = 0; i < moleValues.length; i++){
            moleValues[i].style.display = "none";
        }
    }

    // update the total score
    const updateScore = (score) => {
        domSelecter.score.innerHTML = score;
    }

    //countdown timer
    const timer = (timeLeft) => {
        domSelecter.timer.innerHTML = timeLeft;
    }


    //restart the game
    const restart = () => {
        changeVisible([]);
        changeSnakeVisible(-1);
        updateScore(0);
        timer(30);
    }

    return {
        domSelecter,
        changeVisible,
        changeSnakeVisible,
        showAllSnakes,
        updateScore,
        timer,
        restart
    }
    

})()



//<---------------- MODEL -------------->
const Model = ((view) => {

    const {changeVisible, updateScore, changeSnakeVisible, showAllSnakes} = view; 

    class State {
        //initialize data
        constructor(){
            this._score = 0;
            this._snakeIndex ;
            this._popIndex = [];
            this._showAllSnakes = false;
        }

        //get data
        get dataList(){
            return this._popIndex;
        }

        //update visibility based on the new moles index
        set dataList(newIndexArr){
    
            this._popIndexArr = newIndexArr;
            changeVisible(this._popIndexArr);
            
        }

        //update visibility based on new snake index
        set snakeShow(newSnakeIndex) {
            this._snakeIndex = newSnakeIndex;
            changeSnakeVisible(this._snakeIndex);
        }

        //change all snakes to visible
        set snakeAllShaw(explode) {
            this._showAllSnakes = explode;
            showAllSnakes();
        }

        //update total score
        set updateScore(score){
            this._score = score;
            updateScore(this._score);
        }

    }

    return {
        State,
        changeVisible,
        changeSnakeVisible,
        showAllSnakes,
        updateScore
    }


})(View)


//<---------------- CONTROLLER -------------->
const Controller = ((view, model) => {

    const {domSelecter, timer, restart} = view;
    const {State} = model;
    const state = new State();

    var indexArr = state._popIndex; //current moles index
    var totalScore = state._score; //current score
    var num = 3; //max mole number
    var timeLeft = 30; //game duration
    var leftIndexArr = []; //record left moles index
    var newSnakeIndex = -1; //record snake index
    var timeSlot = 2300; //pop up time
    var restartSwitch = false; //when restart the game, but the time is not over
    var timerSwitch = false; // when time is up, no more update
    var explodeSwitch = false; //when click on a snake, explode effect trigger



    //set restart button
    domSelecter.resbtn.addEventListener('click', (event) => {
            //restart game when the game is processing(not over)
            if(timeLeft > 0){
                restartSwitch = true;
            }
        
            reset();
            initMoles();
            initSnake();

    })

    //restart function
    const reset = () => {
        leftIndexArr = leftIndexArr.concat(indexArr);
        // console.log("restart left index: "+leftIndexArr);
        // console.log(leftIndexArr.length);
        indexArr = [];
        totalScore = 0;
        timeLeft = 30;
        num = 3;
        explodeSwitch = false;
        restartSwitch = false;
        timerSwitch = false;
        restart();

    }

    //set timer
    const countDown = () => {

        return y = setInterval( () => {
            //game is processing
            if( timeLeft >= 0 ){
                //restart or explode NOT triggered
                if(restartSwitch == false && explodeSwitch == false){
                    timer(timeLeft);
                    timeLeft--; 
                }
                //either restart or explode is triggered, then stop time
                else{
                    restartSwitch = false;
                    explodeSwitch = false;
                    clearInterval(y);
                    
                }
            }
            //time is up
            else{
                timerSwitch = true;

                setTimeout(()=>{
                    alert("Time is Over! Your total Score is: " + totalScore);
                }, 500)
                clearInterval(y);
               
            }
        }, 1000)
    }

    //initialize 3 moles function
    const initMoles = () =>{
        countDown();
        return x = setInterval(()=>{
            // console.log("次数："+num);
            if(num > 0){
                num --;  
                createMole();

            }else{

            clearInterval(x);

            }     
        }, 1000)
    }

    const initSnake = () => {
        setTimeout(()=>{
            
            createSnake();

        },2500);
        
    }

    const createSnake = () => {
        newSnakeIndex = Math.floor( Math.random() * 11);
        while(indexArr.includes(newSnakeIndex)){
            newSnakeIndex = Math.floor( Math.random() * 11);
            
        }
        state.snakeShow = newSnakeIndex;
        
        createSnakeListener(newSnakeIndex);


    }

    const createSnakeListener = (newSnakeIndex) => {
        console.log(newSnakeIndex);
        var imgId = "#snake_" + newSnakeIndex;
        //create click event listener
        document.querySelector(imgId).addEventListener('click', explode, false);
        let currSnakeIndex = newSnakeIndex;

        setTimeout(()=>{

            if(currSnakeIndex == newSnakeIndex && explodeSwitch == false && timerSwitch == false){
                updateSnake(); 
            }  

        }, 2500);

        function explode() {
            //remove eventListener
            document.querySelector(imgId).removeEventListener('click', explode, false);

            //turn on the explode switch
            explodeSwitch = true;
            //trigger explode view
            state.snakeAllShaw = explodeSwitch;
            //update moles index left
            leftIndexArr = leftIndexArr.concat(indexArr);
             
        }

        const updateSnake = () =>{
             //make snake disappear
            currSnakeIndex = newSnakeIndex;
            //update new mole view
            state.snakeShow = currSnakeIndex; 
            //create new mole
            setTimeout(()=>{
                if(restartSwitch == false && timerSwitch ==false){
                    createSnake();
                }
                
            }, timeSlot)
        }      
    }

    //create single mole after each hit
    const createMole = () => {
        let index = Math.floor( Math.random() * 11);
        //make sure mole cannot pop up on other moles and snake index
        while(indexArr.includes(index) && index !== newSnakeIndex){
            index = Math.floor( Math.random() * 11);
            
        }
        indexArr.push(index);
        // console.log("随机数："+index);
        //set the visiblity to "block", update view
        state.dataList = indexArr; 

        //avoid repeat eventlistener
        if(!leftIndexArr.includes(index)){
                createListener(index); 
            
        }else{
            for(let i = 0; i < leftIndexArr.length; i++){
                if(leftIndexArr[i] == index){
                    leftIndexArr.splice(i,1);
                }
            }
        }
        
    }

    //create eventListener function
    const createListener = (index) => {

        var imgId = "#mole_" + index;
        //create click event listener
        document.querySelector(imgId).addEventListener('click', remove, false);

        setTimeout(()=>{
            if(indexArr.includes(index) && explodeSwitch == false && timerSwitch == false){
                leftIndexArr.push(index);
                updateMoleArr(); 
            }
            

        }, 2500);

        function remove() {
            //remove eventListener
            document.querySelector(imgId).removeEventListener('click', remove, false);
            // console.log("removed"+index);

                totalScore++;
                //update total score
                state.updateScore = totalScore;
                updateMoleArr();
  
             
        }

        const updateMoleArr = () =>{
             //update indexArr
             for(let i = 0; i < indexArr.length; i++){
                if(indexArr[i] == index){
                    indexArr.splice(i,1);
                }
            }
            //update new mole view
            state.dataList = indexArr; 
            //create new mole
            setTimeout(()=>{
                if(restartSwitch == false && explodeSwitch == false){
                    createMole();
                }
                
            }, timeSlot)
        }
     
    }


    //initialize the game
    window.onload = function(){
        initMoles();
        initSnake();
    }

    const bootstrap = () => {
        state.dataList = [];
    }
    return {bootstrap}

})(View,Model)

Controller.bootstrap();