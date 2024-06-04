<template>
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3"><i class='bx bx-notepad maz-gradient-txt' ></i> {{ title }}</div>
    </div>
</template>
<script setup >
const props = defineProps({
    title: String
})
</script>
<style >
.breadcrumb-title {
    border-right: 0px;
    font-size: 48px;
}

.maz-gradient-txt {
	background: -webkit-linear-gradient(#117AD1, #9A3AB1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}


</style>