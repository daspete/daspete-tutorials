<template>
    <div class="site-error">
        <h1>{{ error.statusCode }}</h1>
        <p>{{ error.message }}</p>
        <a href="/">Goto home</a>
    </div>
</template>

<script>
export default {
    props: ['error']
}
</script>

