<template>
    <header class="sticky top-0 bg-white shadow-lg border-b-2 border-secondary">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-black py-6">
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <img src="../assets/images/CLBLogo.png" alt="The Connector" class="w-12 h-12">
                    <p class="text-2xl">The Connector</p>
                </div>
            </RouterLink>

            <div class="flex gap-3 flex-1 justify-end">
                <i class="fa-solid fa-circle-info text-xl hover:text-secondary duration-150 cursor-pointer"
                    @click="toggleModal"></i>
            </div>

            <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
                <div class="text-black">
                    <h1 class="text-2xl mb-1">About:</h1>
                    <p class="mb-4">
                        The Connector allows you to configure and add new handsets to the system. You can also send
                        messages with the handsets to UniVos.
                    </p>
                    <h2 class="text-2xl">How it works:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            Add a new handset in the top module by typing in the unique serial number and the name of
                            the
                            handset.
                        </li>
                        <li>
                            In the bottom module, you can send a message with the selected handset and location to
                            UniVos. You can also
                            view the handsets that are currently in the system.
                        </li>
                    </ol>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";

const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value;
};
</script>