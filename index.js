let db = {
  tareas: [],
  id: 0,
};
import { Tarea } from "./tarea.js";

document.addEventListener("DOMContentLoaded", () => {
  const dbGuardado = JSON.parse(localStorage.getItem("lista"));
  if (dbGuardado) {
    db = dbGuardado;
  }
});
function addTarea() {
  const textoTarea = input.value.trim();
  if (textoTarea != "" && !db.tareas.map((x) => x.texto).includes(textoTarea)) {
    db.id++;

    db.tareas.push(new Tarea(db.id, textoTarea, false));

    pintarTareas();
  }
  input.value = "";
  input.focus();
  for (const tarea of db.tareas) {
    const btnDel = document.getElementById(`delete-btn-${tarea.id}`);
    const btnCheck = document.getElementById(`check-btn-${tarea.id}`);
    const span = document.getElementById(`tarea-${tarea.id}`);
    const div = document.getElementById(`div-${tarea.id}`);
    const li = document.getElementById(`li-${tarea.id}`);
    btnCheck.addEventListener("click", () => {
      if (tarea.hecha != true) {
        tarea.hecha = true;
        span.className = "tarea-hecha";
      } else {
        tarea.hecha = false;
        span.className = `tarea-${tarea.id}`;
      }
    });
    btnDel.addEventListener("click", () => {
      db.tareas = db.tareas.filter((obj) => obj.id != tarea.id);
      li.removeChild(div);
    });
  }
  guardarCambios();
}

const principal = document.querySelector("#lista-de-tareas");
const header=document.createElement("div")
header.className="header"
const input = document.createElement("input");
const btnAdd = document.createElement("button");
const ul = document.createElement("ul");
principal.appendChild(header);
header.appendChild(input)
header.appendChild(btnAdd);
principal.appendChild(ul);
ul.className = "lista";
btnAdd.innerHTML = "Añadir Tarea";

function pintarTareas() {
  ul.innerHTML = "";
  for (const tarea of db.tareas) {
    ul.innerHTML += `<li id="li-${tarea.id}"><div id="div-${tarea.id}">
    <button class="btn" id="check-btn-${tarea.id}">✔️ </button>
    <button  class="btn" id="delete-btn-${tarea.id}">🗑️</button>
    <span id="tarea-${tarea.id}">${tarea.texto}</span></div></li>`;
  }
}

btnAdd.addEventListener("click", () => {
  addTarea();
});

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTarea();
  }
});

function guardarCambios() {
  localStorage.setItem("lista", JSON.stringify(db));
}
