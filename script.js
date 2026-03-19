
// we are calling the html elements
const student_Name = document.getElementById("student_Name");
const  student_Id = document.getElementById("student_Id");
const  student_Email = document.getElementById("student_Email");
const student_Number = document.getElementById("student_Contact");
const  submit_Btn = document.getElementById("submit_btn");
const student_Form = document.getElementById("main_form");
const table_Container = document.getElementsByClassName("table_container")[0];
const student_Table = document.getElementById("student_table");
const reset_Btn = document.getElementById("reset_btn");

document.addEventListener("DOMContentLoaded",()=>{
 
    showStudent();
})



// delete popups
let delete_popup = document.getElementById("delete_popup");
let confirmDelete_btn = document.getElementById("conformDelete");
let cancelDelete_btn = document.getElementById("cancelDelete");

// error popups

let error_popup = document.getElementById("error_popup");
let error_message = document.getElementById("error_message");
let closeError_btn = document.getElementById("closeError");


let delete_index = -1 // to check which index we are deleting.

let student_Data = JSON.parse(localStorage.getItem("studentData"))||[]; // to store student data.

let edit_Index = -1; // data varibles.

// let saved_Student = localStorage.getItem("student_Data");// getting the data of student from the local storage

// if(saved_Student!==null){
//     student_Data = JSON.parse(saved_Student);
// }





// Extracting the values from input value

student_Form.addEventListener("submit",(e)=>{
     e.preventDefault();
    if(student_Name.value.trim() ===""){
       showError("Please provide a name");
        return
    }
    let name = student_Name.value.trim();
    let id = student_Id.value.trim();
    let email = student_Email.value.trim();
    let number = student_Number.value.trim();
    // for checking the duplicate id;
    for(let i =0;i<student_Data.length;i++){
        if (student_Data[i].name===name && i!==edit_Index){
            showError("Please provide a different Name or Unique name")
            return;
        }
        if(student_Data[i].id===id && i!==edit_Index){
            showError("Please enter the different Id Number");
            return;
        }
          // for checking the duplicate email.
         if(student_Data[i].email === email&& i!==edit_Index){
            showError("Please provide a different Email");
            return;
        }
            // for checking the duplicate number.
          if(student_Data[i].number === number&& i!==edit_Index){
            showError("Please provide a different Number");
            return;
        }
    }
   
    

    let data ={
        "name" :name,
        "id":id,
        "email":email,
        "number":number
    };
 
//  
    if(edit_Index===-1){
        student_Data.push(data);
    }else{
        student_Data[edit_Index] = data;
        edit_Index = -1;
    }

    savedStudent();
    showStudent();
    student_Form.reset();

})
// save data to the local storage.
function savedStudent(){
    localStorage.setItem("studentData", JSON.stringify(student_Data));

}

function showStudent(){ // to show the data on the dom
    student_Table.innerHTML= "";
   
    for(let i =0;i<student_Data.length;i++){
        let row = "<tr>"+
        "<td>"+ student_Data[i].name +"</td>"+
        "<td>"+ student_Data[i].id +"</td>"+
        "<td>"+ student_Data[i].email +"</td>"+
        "<td>"+ student_Data[i].number +"</td>"+
        "<td>"+
        "<button class = 'edit_data_btn' onclick= 'editStudent("+i+")'>Update</button>"+
        "<button class = 'delete_data_btn' onclick= 'deleteStudent("+i+")'>Delete</button>"+
        "</td>"+
        "</tr>"
        student_Table.innerHTML+= row;
                   
    }
    updateScrollBar();
}

// for editing the student data.
function editStudent(index){
    let student = student_Data[index];

    let input_name = student_Name;
    let input_id = student_Id;
    let input_email = student_Email;
    let input_number = student_Number;

    input_name.value = student.name;
    input_id.value = student.id;
    input_email.value = student.email;
    input_number.value = student.number;

    edit_Index = index;

}

function deleteStudent(index){
    delete_index = index;
    delete_popup.style.display = "flex";
    
}

// event listner to the conform delete btn in popup;
confirmDelete_btn.addEventListener("click",(e)=>{
    student_Data.splice(delete_index,1);
    student_Form.reset();
    edit_Index = -1;
    savedStudent();
    showStudent();
    delete_popup.style.display = "none";
});
// event listner on the cancel btn in popup;
cancelDelete_btn.addEventListener("click",()=>{
    delete_popup.style.display = "none";

});
// 
reset_Btn.addEventListener("click",(e)=>{
     student_Form.reset();
})
// function to show 
function showError(mess){
    error_message.textContent = mess;
    error_popup.style.display = "flex";

};
// event listner on the error popup
closeError_btn.addEventListener("click",()=>{
    error_popup.style.display = "none";
});






function updateScrollBar(){
    if(student_Data.length>4){
        table_Container.style.maxHeight = "400px";
        table_Container.style.overflowY = "auto";

    }else{
        table_Container.style.maxHeight = "none";
        table_Container.style.overflowY = "visible";
    }

}