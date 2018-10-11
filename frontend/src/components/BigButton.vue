<template>
    <div>
        <a class="button" v-bind:style="{backgroundColor: color}">
            <div class="content p-3">
                <span class="icon">
                    <fa-icon class="text-white" :icon="icon"></fa-icon>
                </span>
                <h3 class="text-white">{{ title }}</h3>
            </div>

            <div class="button-shadow"></div>
        </a>
    </div>
</template>

<script>

    export default {
        props: ['color', 'icon', 'title'],
    };

</script>

<style lang="scss">

    .button {

        display:block;
        position:relative;
        width:100%;
        top:0;
        padding-top:100%;
        color:white;
        border-radius:3px;
        transition:box-shadow .2s;
        cursor:pointer;
        box-shadow:0 5px 10px rgba(0,0,0,0.05);

        .content {

            position:absolute;
            top:0;
            overflow:hidden;

            .icon {

                font-size:2em;
                display:block;
                margin-bottom:0.5em;
            }
        }

        .button-shadow {

            width:calc(100%);
            position:absolute;
            bottom:0;
            z-index:-1;
            height:2em;
            box-shadow:0 15px 20px rgba(0,0,0,0.05);
            background:black;
            border-radius:100px;
        }
    }

</style>
