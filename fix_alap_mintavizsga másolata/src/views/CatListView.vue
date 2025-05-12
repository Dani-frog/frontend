<script lang="ts" setup>
import axiosClient from '@/libs/axios';
import queryClient from '@/libs/vueQuery';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const {push} =useRouter()

const dialog = ref(false)

const editedItem = ref();


const getCats = async (): Promise<{id: number, 
  color: string, 
  chip: string, 
  type:string,
  name: string,
  created_at: string,
  updated_at: string,
  identifier: string
}[]> =>{
  const response = await axiosClient.get("/api/v1/pets")

  return response.data
}

const {data} = useQuery({
  queryKey: ["cats"],
   queryFn: getCats
})


const editCat = async () => {
    const response = await axiosClient.put("/api/v1/pets/" + editedItem.value.id, editedItem.value)
    return response.data
}


const {mutate} = useMutation({
    mutationFn: editCat,
    onSuccess() {
        dialog.value = false
        queryClient.refetchQueries({
          queryKey: ["cats"]
        })
    },
})

</script>
<template>
    <v-container>
        <v-card>
            <v-card-title>
                Macskák
            </v-card-title>
            <v-card-text>
                <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Műveletek
        </th>
        <th class="text-left">
          Azonosító
        </th>
        <th class="text-left">
          Név
        </th>
        <th class="text-left">
          Chip szám
        </th>
        <th class="text-left">
          Típus
        </th>
        <th class="text-left">
          Szín
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data"
        :key="item.id"
      >
        <td>
          <v-btn @click="() =>{
            dialog = true
            editedItem = JSON.parse(JSON.stringify(item))//wtf is ts
          }">Módosítás</v-btn>
          <v-btn @click="push({
            name: 'cat-delete',
            params: {
              id: item.id
            }
          })">Törlés</v-btn>
        </td>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.chip }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.color }}</td>
      </tr>
    </tbody>
  </v-table>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="push({
                name: 'cat-create'
              })">Létrehozás</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Edit Profile"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card>
        <v-card-title>
          Macska módosítása
        </v-card-title>
        <v-card-text>
          
          <v-text-field v-model="editedItem.name" label="Név"></v-text-field>
                <v-text-field v-model="editedItem.type" label="Típus"></v-text-field>
                <v-text-field v-model="editedItem.chip" label="Chip"></v-text-field>
                <v-text-field v-model="editedItem.color" label="Szín"></v-text-field>
        </v-card-text>
        <v-card-actions>

          <v-btn
            @click="dialog = false"
          >Bezárás</v-btn>

          <v-btn
            @click="mutate"
          >Módosítás</v-btn>  
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
</template>