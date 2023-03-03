//<---------------- VIEW -------------->
const View = (() => {

    //element selector 
    const domSelecter = {
        mole1 :document.querySelector("#mole_1"),
        mole2 :document.querySelector("#mole_2"),
        mole3 :document.querySelector("#mole_3"),
        mole4 :document.querySelector("#mole_4"),
        mole5 :document.querySelector("#mole_5"),
        mole6 :document.querySelector("#mole_6"),
        mole7 :document.querySelector("#mole_7"),
        mole8 :document.querySelector("#mole_8"),
        mole9 :document.querySelector("#mole_9"),
        mole10 :document.querySelector("#mole_10"),
        mole11:document.querySelector("#mole_11"),
        mole12 :document.querySelector("#mole_12"),

    }

    // create image template
    const createTemp = (indexArr) => {
        for(let index of indexArr){ //item==>[id : display(none/block)]
            let imgId = "#mole_" + index;

            //check if the img should be visible or not
            if(imgId !== "block"){
                
                document.querySelector(imgId).style.display = "block";
            }

            
        }
    }

    return {
        domSelecter,
        createTemp
    }
    

})()



//<---------------- MODEL -------------->
const Model = ((view) => {

    const {createTemp} = view; 

    const task_container = document.querySelector("#board");

    class State {
        //initialize data
        constructor(){
            this._popIndex = [];
        }

        //get data
        get dataList(){
            return this._popIndex;
        }

        //update data and re-render the page based on newList(new data)
        set dataList(newIndexArr){
            this._popIndexArr = newIndexArr;
            createTemp(this._popIndexArr);
            
        }


    }

    return {
        State,
        createTemp,
    }


})(View)


//<---------------- CONTROLLER -------------->
const Controller = ((view, model) => {

    const {domSelecter, createTemp } = view;
    const {State} = model;
    const state = new State();
    let indexArr = state._popIndex;

    //initialize the game
    let num = 3;
    window.onload = function(){
        // console.log(num);
        
        const setTimer = () =>{
        return x = setInterval(()=>{
            console.log("次数："+num);

            if(num > 0){
                num --;
                let index = Math.ceil( Math.random() * 12);
                while(indexArr.includes(index)){
                    index = Math.ceil( Math.random() * 12);
                    
                }
                indexArr.push(index);
                
                console.log("随机数："+index);
                // let ele = "#mole_"+index;
                // let element = document.querySelector(ele);
                // element.addEventListener('click',(event)=>{

                //     state.dataList = indexArr;
                // })
                
                
                
                state.dataList = indexArr;

                

            }else{
            clearInterval(x);
            }     
        }, 1000)
    }

    // function delElByIndex(arr,index){
    //     for(var i=index,len=arr.length-1;i<len;i++)
    //     arr[i]=arr[i+1];
    //     arr.length = len;
    //     // console.log(arr);//=>[0, 1, 2, 4, 5] 

    // }

    //click to delete the image
    // function createButton(){
    //     console.log("aaaa");
    //    for(let i = 0; i < indexArr.length; i++){
        
    //     let element = domSelecter[indexArr[i]-1];
    //     element.addEventListener('click',(event)=>{
    //         delElByIndex(indexArr,i);
    //         state.dataList = indexArr;
    //     })

    // } 
    // }
    
    setTimer();
    // createButton();
    }


    
    

    


    const bootstrap = () => {
        state.dataList = [];
    }
    return {bootstrap}

})(View,Model)

Controller.bootstrap();