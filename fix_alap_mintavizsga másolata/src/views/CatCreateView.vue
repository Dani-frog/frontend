<script setup lang="ts">
import axiosClient from '@/libs/axios';
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const {push} =useRouter()

const cat = ref({
    name: '',
    type: '',
    chip: '',
    color: ''
})

const postCat = async () => {
    const response = await axiosClient.post("/api/v1/pets", cat.value)
    return response.data
}


const {mutate} = useMutation({
    mutationFn: postCat,
    onSuccess() {
        push({
            name: 'cats'
        })
    },
})
</script>
<template>
    <v-container>
        <v-card>
            <v-card-title>
                Macska létrehozása
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="cat.name" label="Név"></v-text-field>
                <v-text-field v-model="cat.type" label="Típus"></v-text-field>
                <v-text-field v-model="cat.chip" label="Chip"></v-text-field>
                <v-text-field v-model="cat.color" label="Szín"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="mutate">Létrehozás</v-btn>
                <v-btn @click="push({name: 'cats'})">Vissza</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>