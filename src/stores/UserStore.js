import {defineStore} from 'pinia'

export const useUserStore = defineStore('User', {
    //state
    state(){
        return {
            user: null
        }
    
    },
    //actions
    actions: {
        setUser(user){
            this.user = user
        },
    },

    //getters
    getters: {
        getUser(){
            return this.user
        }
    }
})