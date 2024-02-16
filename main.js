//check누르면 밑줄가기
//remove누르면 삭제하기
//위에 탭버튼마다 필터하기

let inputArea = document.getElementById("input-area"); //입력값 불러오기
let addButton = document.getElementById("add-button"); // 버튼값 불러오기
let tabs = document.querySelectorAll(".menu-area div") 
let underline = document.getElementById("underLine");
console.log(underline)

let mode = "all"
let list =[]
let filterList =[]

inputArea.addEventListener("keypress",function(event){
    enterkey(event)
})

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",(e)=>menuIndicator(e))
}


// tab메뉴를 눌렀을때 필터하는 동작
for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function (event){
        filter(event)
    })
}

let taskList = []; //taskList 배열 선언
console.log(inputArea);
console.log(addButton);

// 추가 버튼을 눌렀을 때
addButton.addEventListener("click", addTask);

// 할일을 추가하는 함수
function addTask() {
    if(inputArea.value=="")
    {
        alert("Please enter the task");
        return;
    }
  let taskItem = {
    id: makeRandomId(), //id값은 유일
    content: inputArea.value,
    isComplete: false, //끝냈는지 확인
  }; //객체로 만들기

  taskList.push(taskItem); //taskList taskItem추가

  inputArea.value=""  // 추가하면 글 지워주기
  render();
}

// 내용을 출력하는 함수
function render() {
  let resultHTML = "";
  if(mode==="all"){
    list = taskList
  }
  else if(mode==="notdone" || mode==="done"){
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === false) {
      resultHTML += `
      <div class="task-area p-2">
      <div class="task-left">
      <div class="icon-center ps-3">
        <button onclick="taskComplete('${list[i].id}')" class="buttonCss"><i class="fa-regular fa-square fa-xl"></i></button> 
      </div>
      <div class="task-text ps-3">
        ${list[i].content}
      </div>
  </div>
      <div class="icon-center pe-5">
        <button onclick="taskDelete('${list[i].id}')" class="buttonCss"><i class="fa-solid fa-trash-can fa-xl"></i></button>
      </div>
    </div>`;
    } else {
      resultHTML += `
      <div class="task-area p-2">
      <div class="task-left">
      <div class="icon-center ps-3">
        <button onclick="taskComplete('${list[i].id}')" class="buttonCss"><i class="fa-regular fa-square-check fa-xl"></i></button> 
      </div>
      <div class="task-done task-text ps-3">
        ${list[i].content}
      </div>
  </div>
      <div class="icon-center pe-5">
        <button onclick="taskDelete('${list[i].id}')" class="buttonCss"><i class="fa-solid fa-trash-can fa-xl"></i></button>
      </div>
    </div>`;
    }
  }

  document.getElementById("task-input").innerHTML = resultHTML;
}

//완료했는지 확인하는 함수
function taskComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}
//삭제하는 함수
function taskDelete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(taskList[i], 1);
      break;
    }
  }
  filter();
}


//필터
function filter(e){
    if(e){
    mode = e.target.id;
    }
    filterList =[]
    if(mode === "all"){
        render();
    }
    else if(mode === "notdone"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===false){
                filterList.push(taskList[i])
            }
        }
        render()
    }
    else if(mode === "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
    console.log(filterList)
}

//엔터를 눌렀을 때 데이터 추가하기
function enterkey() {
	if (window.event.keyCode == 13) {
    	addTask()
    }
}

//underline을 그려라!
function menuIndicator(e){
    underline.style.left = e.target.offsetLeft + "px"
    underline.style.width = e.target.offsetWidth + "px"
    underline.style.top = e.target.offsetTop + e.target.offsetHeight + "px"
}

//랜덤ID값을 생성하는 함수
function makeRandomId() {
  return Math.random().toString(36).substr(2, 16);
}
