<script setup>

var cartas = [
    {
        clase: "card text-bg-primary mb-3"
    },
    {
        clase: "card text-bg-dark mb-3"
    },
    {
        clase: "card text-bg-warning mb-3"      
    },
    {
        clase: "card text-bg-danger mb-3"      
    }
]

</script>

<template>
<div class="container">
    <div class="row">
        
        <template v-for="carta in cartas">
            <div class="col-md">
                <div :class="carta.clase" style="max-width: 18rem;">
                    <div class="card-header">Cartas</div>
                    <div class="card-body">
                        <p class="card-text">Esta es una clase: {{ carta.clase }}</p>
                    </div>
                </div>
            </div>
        </template>

    </div>
</div>

</template>

<style>
.card{
    top: 10px;  
    left: 10px; 
}
</style>