<script setup lang="ts">
import axiosClient from '@/libs/axios';
import { useMutation } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';

const {push} =useRouter()
const {params}= useRoute()

const deleteCat = async () => {
    const response = await axiosClient.delete("/api/v1/pets/" + params.id)
    return response.data
}


const {mutate} = useMutation({
    mutationFn: deleteCat,
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
                Macska törlés
            </v-card-title>
            <v-card-text>
                Biztosan törölni szeretné?
            </v-card-text>
            <v-card-actions>
                <v-btn @click="mutate">Igen</v-btn>
                <v-btn @click="push({name: 'cats'})">Nem</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>