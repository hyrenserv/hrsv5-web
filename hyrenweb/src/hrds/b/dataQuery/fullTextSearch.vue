<template>
    <div>
        全文检索 fullTextSearch
        <navigation-menu></navigation-menu>
    </div>
</template>
<script>
    import navigationMenu from "./navigationMenu";

    export default {
        name: "fullTextSearch",
        components: {
            "navigation-menu": navigationMenu,
        },

    }
</script>
