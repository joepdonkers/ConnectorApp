<template>
    <div class="container py-3 my-8 bg-white rounded-xl shadow-lg">
        <p class="text-2xl text-primary font-bold">Send Message </p>
        <form @submit.prevent="sendMessage">
            <div class="grid grid-cols-2 gap-4 mt-4">
                <label for="Handset" class="text-left mr-2">Choose HandSet:</label>
                <select id="Handset" class="bg-white border-gray-400 border rounded-md p-1" v-model="selectedHandset">
                    <option v-for="handset in handsets" :key="handset.id" :value="handset.id">
                        {{ handset.name }}
                    </option>
                </select>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
                <label for="location" class="text-left mr-2">Location:</label>
                <input id="location" class="border-gray-400 border rounded-md p-1" v-model="location" required>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
                <label for="message" class="text-left mr-2">Message:</label>
                <input id="message" class="border-gray-400 border rounded-md p-1" v-model="message" required>
            </div>
            <div class="grid grid-cols-4 gap-4 mt-4">
                <button type="submit" class="bg-secondary py-1 rounded-md text-white">Send Message</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

let location = ref('');
let message = ref('');
const handsets = ref([]);
const selectedHandset = ref(null);
const toast = useToast();

const fetchHandsets = async () => {
    const response = await fetch('http://localhost:8082/api/handset');
    const data = await response.json();
    handsets.value = data;
};

const sendMessage = async () => {
    const selectedHandsetName = handsets.value.find(handset => handset.id === selectedHandset.value)?.name || '';
    const selectedHandsetSerialNumber = handsets.value.find(handset => handset.id === selectedHandset.value)?.serialNumber || '';

    const requestBody = {
        Message: `${message.value},${location.value},${selectedHandsetName}`
    };

    console.log('Sending message:', requestBody);

    const response = await fetch('http://localhost:8080/api/HandSet/Submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });
    const responseText = await response.text();
    if (!response.ok) {
        toast.error(`Failed to send message: ${responseText}`);
        console.error('Failed to send message', response);
    } else {
        toast.success(responseText);
        console.log('Message being processed by the server. Response:', responseText);
        message.value = '';
        location.value = '';
    }
};

onMounted(fetchHandsets);
</script>

<style lang="scss" scoped></style>