// mendapatkan semua elemen yang dibutuhkan
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const dateElement = document.getElementById("date");

// show todays date 
const options = {weekday : 'long', month: 'short', day:'numeric'};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("id-ID", options);

inputBox.onkeyup = ()=> {
    let userData = inputBox.value; //mendapatkan masukan/inputan dari user
    if(userData.trim() != 0) { // jika nilai user tidak hanya spasi
        addBtn.classList.add("active"); // aktifkan tombol tambah 
    } else {
        addBtn.classList.remove("active"); // menonaktifkan tombol tambah
    }

}

showTasks(); //Memanggil function showtask

// jika user mengklik tombol tambah 
addBtn.onclick = ()=> {
    let userData = inputBox.value; //mendapatkan masukan/inputan dari user
    let getLocalStorage = localStorage.getItem("New Todo"); // mendapatkan penyimpanan lokal
    if(getLocalStorage == null) { // jika penyimpanan lokal nol
        listArr = []; // membuat array kosong 
    } else {
        listArr = JSON.parse(getLocalStorage); // mengubah string json menjadi objek js
    }
    listArr.push(userData); // mendorong atau menambahkan data user
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // mengubah objek js menjadi string json
    showTasks(); //memanggil function showTask
    addBtn.classList.remove("active"); // menonaktifkan tombol tambah
} 

// fungsi untuk menambahkan daftar tugas di dalam ul 
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); //mendapatkan penyimpanan lokal
    if(getLocalStorage == null) { // jika penyimpanan lokal nol
        listArr = []; // membuat array kosong 
    } else {
        listArr = JSON.parse(getLocalStorage); // mengubah string json menjadi objek js
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; // passing the length value in pendingNumb
    if(listArr.length > 0 ) { // if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the clearall button
    }else {
        deleteAllBtn.classList.remove("active"); //unactive the clearall button
    }

    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick ="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; // adding new li tag inside ul tag 
    inputBox.value = ""; // setelah inputan ditambahkan biarkan kolom input kosong
}

// function untuk hapus list
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); // menghapus atau menghapus li terindeks tertentu

    // setelah menghapus li, lallu perbarui penyimpanan lokal
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // mengubah objek js menjadi string json
    showTasks(); //memanggil function showTask
}


// fungsi untuk menghapus semua penyimpanan 
deleteAllBtn.onclick = ()=> {
    listArr = []; // array kosong

    // after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));  // mengubah objek js menjadi string json
    showTasks(); // memanggil function showTask
}