<script setup>
import { ref } from 'vue'

const EstaAbierto = ref(false)
</script>

<template class="template">

    <br>
    <center><button class="boton btn btn-success" @click="EstaAbierto = true">Modal</button></center>
    <div class="container">
           <teleport to="body">
           <Transition>
                <div class="modal" v-if="EstaAbierto">
                    <div>

                        <p>
                        <h2>Hola</h2>
                        <br>
                        <button type="button" class="btn btn-warning" @click="EstaAbierto = false">Cerrar</button>
                        </p>
                    </div>
                </div>
            </Transition>
        </teleport>
    </div>
    
</template>

<style>
    .modal{
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal > div{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        width: 500px;
        height: 500px;
        border-color: black;
    }

    .v-enter-active,
    .v-leave-active {
    transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
    opacity: 0;
    }
</style>