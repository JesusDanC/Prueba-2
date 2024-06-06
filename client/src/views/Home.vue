<script setup>
  import { useRouter, useRoute, RouterLink, RouterView } from 'vue-router'
  import { ref } from 'vue'

  const opciones = ref([
      {
        nombre: "Home",
        ruta: "/Home",
        clase: "nav-link"
      },
      {
        nombre: "Table",
        ruta: "/Table",
        clase: "nav-link"
      },
      {
        nombre: "Form",
        ruta: "/Form",
        clase: "nav-link"
      },
      {
        nombre: "Modal",
        ruta: "/Modal",
        clase: "nav-link"
      },
      {
        nombre: "Usuarios",
        ruta: "/Usuarios",
        clase: "nav-link"
      }
    ]
  )

  const activar = (posicion) => {
    for (let i = 0; i < opciones.value.length; i++) {
      opciones.value[i].clase = "nav-link"
    }
    opciones.value[posicion].clase = "nav-link disabled"
  }

  const router = useRouter();
  const route = useRoute()
  const currentRoute = route

  const ruta = () => {
    for (let i = 0; i < opciones.value.length; i++) {
      if (currentRoute.path === opciones.value[i].ruta) {
        activar(i);
      }else{
        var Home = 0;
        activar(Home);
        router.push('/Home')
      }
    }
  }
  
  window.onload = ruta;
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><RouterLink class="rainbow" to="/Home" @click="activar(0)">Tarea 6</RouterLink></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <template v-for="(opcion, index) in opciones">  
            <li class="nav-item">
              <a aria-current="page"><RouterLink :class="opcion.clase" :to="{path: opcion.ruta}" @click="activar(index)">
                {{ opcion.nombre }}</RouterLink></a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>

#shadowBox {
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.2);
  border: 3px solid;
}

.rainbow {
  text-decoration: none;
  text-align: center;
  animation: colorRotate 6s linear 0s infinite;
}

@keyframes colorRotate {
  from {
    color: #a34cde;
  }
  10% {
    color: #3d0cc3bb;
  }
  35%{
    color: #0c61c3bb;
  }
  50% {
    color: #3396f9db;
  }
  65%{
    color: #00fff7bb;
  }
  75% {
    color: #109f96;
  }
  100% {
    color:  #a34cde;
  }
}
</style>
