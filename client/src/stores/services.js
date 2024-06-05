import { onMounted } from 'vue'
import { defineStore } from 'pinia'
import ServicesAPI from '../api/ServicesAPI'
export const useServicesStore = defineStore('services', () =>{

    onMounted(async () =>{
        try {
            const { data } = await ServicesAPI.all()
            servicesVersion.value = data
        } catch (error) {
            console.log(error)
        }
    }) 
    return{
        services
    }
})