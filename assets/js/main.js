const listaTareas = new Map()
const seleccionadas = new Set()

listaTareas.set("A", { descripcion: "Organizar el equipo"})
listaTareas.set("B", { descripcion: "Finalizar proceso"})
listaTareas.set("C", { descripcion: "Crear informe para mañana"})
listaTareas.set("D", { descripcion: "Hablar con los demás"})


// console.log(listaTareas);

// console.log("*****************************************************");
for (const tarea of listaTareas) {
    //Ejemplo de destructuring de arreglos
    const [key, item] = tarea

    $("#contenedor-tareas").append(`
        <li class="list-group-item d-flex justify-content-between">
            <label class="form-check-label stretched-link" for="check-tarea-${key}">${item.descripcion}</label>
            <input class="form-check-input me-1 checkbox-tarea" type="checkbox" data-key="${key}" id="check-tarea-${key}">
        </li>
    `)
    // console.log(key, item);
}

$(document).ready(function() {
    $(document).on("click",".checkbox-tarea", function() {
        // En JQuery el operador this me devuelve el elemento que disparó el evento (Click)
        // El método data obtiene el valor del atributo data-key
        const key = $(this).data("key")
        const seleccionado = $(this).prop('checked')

        if(seleccionado) {
            seleccionadas.add(key)
        } else {
            seleccionadas.delete(key)
        }

        mostrarFinalizadas()
    })




    function mostrarFinalizadas() {
        // Consultamos cuantas tareas están finalizadas
        if(seleccionadas.size > 0) {
            //Si hay al menos 1 tarea finalizada muestra la lista de tareas finalizadas
            $("#contenedor-tareas-finalizadas").parent().parent().removeClass("d-none")

        } else {
            //Si no tenemos tareas finalizadas  oculta la lista de tareas finalizadas
            $("#contenedor-tareas-finalizadas").parent().parent().addClass("d-none")
        }

        $("#contenedor-tareas-finalizadas").html(`
            <li class="list-group-item list-group-item-secondary">Tareas finalizadas</li>
        `)
        for (const key of seleccionadas) {
            $("#contenedor-tareas-finalizadas").append(`
            <li class="list-group-item d-flex justify-content-between">
                ${listaTareas.get(key).descripcion}
            </li>
            `)
        }
    }
})