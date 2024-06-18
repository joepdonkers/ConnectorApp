<template>
    <div class="container py-3 my-8 bg-white rounded-xl shadow-lg">
        <p class="text-2xl text-primary font-bold">Add New Handset </p>
        <form @submit.prevent="addHandset">
            <div class="grid grid-cols-2 gap-4 mt-4">
                <label for="serialNumber" class="text-left mr-2">Unique SerialNumber:</label>
                <input id="serialNumber" class="bg-white border-gray-400 border rounded-md p-1" v-model="handset.serialNumber" required
                    pattern="[A-Za-z0-9]{5}" title="5 letter and number string">
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
                <label for="name" class="text-left mr-2">Name:</label>
                <input id="name" class="border-gray-400 border rounded-md p-1" v-model="handset.name" required>
            </div>
            <div class="grid grid-cols-4 gap-4 mt-4">
                <button type="submit" class="bg-secondary py-1 rounded-md text-white">Add Handset</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

let handset = ref({
    serialNumber: '',
    name: ''
});

const handsets = ref([]);
const toast = useToast();

const fetchHandsets = async () => {
    const response = await fetch('http://localhost:8082/api/handset');
    const data = await response.json();
    handsets.value = data;
};

const addHandset = async () => {
    try {
        // Fetch the latest handsets before adding a new one
        await fetchHandsets();

        // Check if the serial number is unique
        const isSerialNumberUnique = !handsets.value.some(existingHandset => existingHandset.serialNumber === handset.value.serialNumber);

        if (!isSerialNumberUnique) {
            console.error('Serial number is not unique');
            toast.error('Serial number is not unique');
            return;
        }

        handset.value.id = uuidv4();

        const response = await fetch('http://localhost:8082/api/handset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: handset.value.name,
                serialNumber: handset.value.serialNumber
            })
        });

        if (!response.ok) {
            console.error('Failed to add handset', response);
            toast.error('Failed to add handset');
        } else {
            console.log('Handset added successfully');
            toast.success('Handset added successfully');
            handset.value.serialNumber = '';
            handset.value.name = '';
        }
    } catch (error) {
        console.error('Error in addHandset:', error);
        toast.error('Error in addHandset');
    }
};

onMounted(fetchHandsets);
</script>
<style lang="scss" scoped></style>