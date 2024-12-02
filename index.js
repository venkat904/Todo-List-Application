  // Variable Declarations
  const mainTodoElem=document.querySelector(".Todo-list-element");
  const inputValue=document.getElementById("inputValue");

        // Retrieve Todos from LocalStorage
      const getTodoListFromLocal=()=>{
         return JSON.parse(localStorage.getItem("TodolistItem"));
       };

      // Save Todos to LocalStorage
      const addTodoListLocalStorage=(LocalTodoList)=>{
          return localStorage.setItem("TodolistItem",JSON.stringify(LocalTodoList));
      };

       // Initialize Local Todo List (from storage)
       let LocalTodoList=getTodoListFromLocal()||[];

        
      // Add a Dynamic Todo Element to the DOM
       const addTodoDynamicElement=(curEle)=>{
      const divElement=document.createElement('div');
      divElement.classList.add("main-todo-div");
      divElement.innerHTML=`<li>${curEle}</li> <button type="button" class="deletebtn">Delete</button>`;
      mainTodoElem.append(divElement);
       }

   // Add Todo to the List
       const addTodoList=(e)=>{
         e.preventDefault();
      const TodoListValue=inputValue.value.trim();

// Check if value is not empty and not already in the list
if (TodoListValue !== "" && !LocalTodoList.includes(TodoListValue)) {
  LocalTodoList.push(TodoListValue); // Add to the local list
  LocalTodoList = [...new Set(LocalTodoList)]; // Ensure unique values (extra safety)
  localStorage.setItem("TodolistItem", JSON.stringify(LocalTodoList)); // Save to localStorage

  addTodoDynamicElement(TodoListValue); // Add to the DOM
  inputValue.value = ""; // Clear input field
} else {
  // Optional: Add an alert or visual feedback
  alert("Todo cannot be empty or a duplicate!");

}
};
// Display All Todos on Page Load
  const showTodoList=()=>{
      console.log(LocalTodoList);

      LocalTodoList.forEach((curEle)=> {
        addTodoDynamicElement(curEle);
          
      });
  };


  // Call to Display Todos Initially
  showTodoList();
   
  // Remove a Todo from the List
  const removeTodoElem=(e)=>{
      const todoToRemove=e.target;
      let TodoListContent=todoToRemove.previousElementSibling.innerText;
      let parentElem=todoToRemove.parentElement;
      console.log(TodoListContent);

      LocalTodoList = LocalTodoList.filter((curTodo)=>{
          console.log(curTodo);
          return curTodo !== TodoListContent;
      });

      addTodoListLocalStorage(LocalTodoList);
       parentElem.remove();

      console.log(LocalTodoList);
  };
   // Event Listener for Removing a Todo
  mainTodoElem.addEventListener('click',(e)=>{
      e.preventDefault();
      console.log(e.target);
      if(e.target.classList.contains("deletebtn")){
      removeTodoElem(e);
      }
  });
  // Event Listener for Adding a New Todo
  document.querySelector(".btn").addEventListener('click',(e)=>{
      addTodoList(e);
      
  }); 