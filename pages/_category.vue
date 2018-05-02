<template>
    <div class="page">
        <topmenu :pages="$store.getters['mainchildren']"></topmenu>
        <spotlight></spotlight>
        <category :childs="$store.getters['children']"></category>
        <pagefooter></pagefooter>
    </div>
</template>