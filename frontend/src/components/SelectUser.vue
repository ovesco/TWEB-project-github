<template>
    <div>
        <div class="d-flex justify-content-center align-items-center"
             style="width:100%;height:100vh;">
            <div class="global-form text-center p-3">

                <fa-icon class="tacho" v-bind:class="{'search': searching}"
                         icon="tachometer-alt"></fa-icon>
                <h1 class="text-thin">Commit-o-meter</h1>
                <h3 class="text-normal text-muted">
                    Find out when people usually commit their code along the day!
                </h3>
                <form class="user-input p-3 m-3" @submit="formSubmit">
                    <div class="user-shadow"></div>
                    <input type="text" class="mb-3"
                           placeholder="Github username to check" v-model="username" />
                    <input class="btn" type="submit" value="Check this out!" />
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                searching: false,
                username: '',
            };
        },
        methods: {
            formSubmit() {
                const $this = this;
                $this.searching = true;
                this.$api.getUser(this.username).then(() => {
                    $this.searching = false;
                    $this.$router.push({ name: 'dashboard', params: { username: $this.username } });
                }).catch(() => {
                    $this.searching = false;
                });
            },
        },
    };
</script>

<style scoped lang="scss">

    @import "./../scss/variables";

    .tacho {

        font-size:4em;
        opacity:0.2;

        &.search {
            animation-name: tacho;
            animation-duration: 2s;
            animation-iteration-count: infinite;
        }
    }

    .global-form {

        max-width:400px;
        width:100%;
    }

    .user-input {

        background:white;
        border-radius:10px;
        box-shadow:0 10px 20px rgba(0,0,0,0.05);
        position:relative;

        .user-shadow {

            position:absolute;
            bottom:0;
            width:90%;
            left:5%;
            height:20px;
            background:blue;
            box-shadow:0 10px 20px rgba(0,0,0,0.1);
            z-index:-1;
        }

        input {

            width:100%;
            height:40px;

            &[type=text] {

                border:1px solid #8ec6fa;
                padding-left:0.5em;
                border-radius:2px;
            }
        }

        .btn {

            background: $bleu;
            color:white;
            border:none;
            cursor:pointer;
            transition:background .2s;
            border-radius:3px;

            &:hover {
                background: $turquoise;
            }
        }
    }

    @keyframes tacho {
        0% {opacity: 0.2}
        50% {opacity: 0.7}
        100% {opacity: 0.2}
    }
</style>
