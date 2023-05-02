const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  //   console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("dropped");
}

/* Modal */

const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

/* create todo  */
const todo_submit = document.getElementById("todo_submit");

todo_submit.addEventListener("click", createTodo);

function createTodo() {
  const todo_div = document.createElement("div");
  const todo_p = document.createElement("p");
  const todo_h = document.createElement("h3");
  const input_val = document.getElementById("todo_input").value;
  const input_val2 = document.getElementById("descn_input").value;
  const txt = document.createTextNode(input_val);
  const txt2 = document.createTextNode(input_val2);


  todo_div.appendChild(todo_h);
  todo_h.appendChild(txt);
  todo_div.appendChild(todo_p);
  todo_p.appendChild(txt2);
  todo_div.classList.add("todo");
  todo_h.classList.add("t_head");
  todo_p.classList.add("descp");
  todo_div.setAttribute("draggable", "true");

  /* create span */
  const span = document.createElement("span");
  const span_txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(span_txt);

  const time_span = document.createElement("span");
  let currentDate = new Date();
  var am_pm = currentDate.getHours() >= 12 ? "PM" : "AM";
  var minutes = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
  let time = currentDate.getDate() + "/"+ currentDate.getUTCMonth() + "/"+currentDate.getFullYear() + "  "+ (currentDate.getHours()% 12 || 12) + ":" + minutes+am_pm;
  const time_span_txt = document.createTextNode(time);
  time_span.classList.add("time");
  time_span.appendChild(time_span_txt);

  todo_div.appendChild(span);
  todo_div.appendChild(time_span);

  open_status.appendChild(todo_div);


  span.addEventListener("click", () => {
    span.parentElement.style.display = "none";
  });
  //   console.log(todo_div);

  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  document.getElementById("todo_input").value = "";
  document.getElementById("descn_input").value = "";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");
}


const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});


