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
        }
        

    }

    // update which images should be popped up(block), and else should be remove(none)
    const changeVisible = (indexArr) => {
        let moles =  domSelecter.moleArr;
        // console.log(typeof(Object.keys(moles)[0]) );
        let moleVules = Object.values(moles);
        // console.log(moleVules);
        for(let i = 0; i < moleVules.length; i++){
            if(indexArr.includes(i)){
                moleVules[i].style.display = "block";
            }else{
                moleVules[i].style.display = "none";
            }
        }
        // for(let index of indexArr){ //item==>[id : display(none/block)]
        //     let imgId = "#mole_" + index;

        //     //check if the img should be visible or not
        //     if(imgId !== "block"){          
        //         document.querySelector(imgId).style.display = "block";
        //     }

            
        // }
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
        updateScore(0);
        timer(0);
    }

    return {
        domSelecter,
        changeVisible,
        updateScore,
        timer,
        restart
    }
    

})()



//<---------------- MODEL -------------->
const Model = ((view) => {

    const {changeVisible, updateScore} = view; 

    // const task_container = document.querySelector("#board");

    class State {
        //initialize data
        constructor(){
            this._score = 0;
            this._popIndex = [];
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

        //update total score
        set updateScore(score){
            this._score = score;
            updateScore(this._score);
        }

    }

    return {
        State,
        changeVisible,
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
    let num = 3; //max mole number
    let timeLeft = 10;


    //set restart button
    domSelecter.resbtn.addEventListener('click', (event) => {
            reset();
            initMoles();
    })

    //restart function
    const reset = () => {
        indexArr = [];
        totalScore = 0;
        timeLeft = 30;
        num = 3;
        restart();
    }

    //set timer
    const countDown = () => {
        return x = setInterval( () => {
            if(timeLeft > 0){
                timer(timeLeft);
                timeLeft--;
            }else{
                removeAll();
                alert("Time is Over!");
                clearInterval(x);
               
            }
        }, 1000)
    }

    //remove all moles when time is up
    const removeAll = () => {
        for(let i of indexArr){
            let imgId = "#mole_" + i;
            document.querySelector(imgId).removeEventListener('click', () => {
                console.log("removed all moles");
            });
            
        }
        indexArr = [];
        state.dataList = indexArr;
        
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

    //create single mole after each hit
    const createMole = () => {
        let index = Math.floor( Math.random() * 11);
        while(indexArr.includes(index)){
            index = Math.floor( Math.random() * 11);
            
        }
        indexArr.push(index);
        // console.log("随机数："+index);
        state.dataList = indexArr; 
        createListener(index); 
    }


    //create eventListener function
    const createListener = (index) => {
        var imgId = "#mole_" + index;

        //create click event listener
        document.querySelector(imgId).addEventListener('click', remove, false);

        function remove() {
            totalScore++;
            // domSelecter.score.innerHTML = state._score;
            // console.log(state._score);
            //remove eventListener
            document.querySelector(imgId).removeEventListener('click', remove, false);
            console.log("removed")
            // document.querySelector(imgId).style.display = "none";
            for(let i = 0; i < indexArr.length; i++){
                if(indexArr[i] == index){
                    // console.log("删除第"+indexArr[i]);
                    
                    indexArr.splice(i,1);
                    // console.log("数组大小："+indexArr.length);
                }
            }
            //update new mole index
            state.dataList = indexArr; 
            //update total score
            state.updateScore = totalScore;
            setTimeout(()=>{
                createMole();
            }, 1000)
             
        }
        
        
    }

    //initialize the game
    window.onload = function(){
        initMoles();
    }

    const bootstrap = () => {
        state.dataList = [];
    }
    return {bootstrap}

})(View,Model)

Controller.bootstrap();