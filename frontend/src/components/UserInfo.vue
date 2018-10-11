<template>
    <div>
        <div class="card p-4">
            <div class="d-flex">
                <div class="d-flex align-items-center">
                    <img v-if="gravatar" :src="gravatar" class="avatar" />
                    <img v-else-if="image" :src="image" class="avatar" />
                    <img v-else src="./../assets/wallah.jpg" class="avatar" />
                    <div class="ml-3">
                        <h4 class="m-0 text-bold">{{ fullName }}</h4>
                        <h5 class="m-0 text-muted text-normal">{{ username }}</h5>
                    </div>
                </div>
            </div>
            <div class="list mt-4">
                <div v-if="location" class="item d-flex pb-3 pt-3 align-items-center">
                    <div class="icon text-muted">
                        <fa-icon icon="map-marker-alt"></fa-icon>
                    </div>
                    <span class="text">{{ location }}</span>
                </div>

                <div v-if="email" class="item d-flex pb-3 pt-3 align-items-center">
                    <div class="icon text-muted">
                        <fa-icon icon="envelope"></fa-icon>
                    </div>
                    <span class="text">{{ email }}</span>
                </div>

                <div v-if="company" class="item d-flex pb-3 pt-3 align-items-center">
                    <div class="icon text-muted">
                        <fa-icon icon="building"></fa-icon>
                    </div>
                    <span class="text">{{ company }}</span>
                </div>

                <div class="item d-flex pb-3 pt-3 align-items-center">
                    <div class="icon text-muted">
                        <fa-icon icon="briefcase"></fa-icon>
                    </div>
                    <span class="text">
                        {{ hireable ? 'Available for job!' : 'Not looking for jobs' }}
                    </span>
                </div>
            </div>
            <div class="d-flex justify-content-between text-center pt-4 pb-1 pl-2 pr-2">
                <div>
                    <h5 class="m-0 text-muted text-normal">Followers</h5>
                    <h3 class="m-0 text-normal">{{ followers }}</h3>
                </div>

                <div>
                    <h5 class="m-0 text-muted text-normal">Following</h5>
                    <h3 class="m-0 text-normal">{{ following }}</h3>
                </div>

                <div>
                    <h5 class="m-0 text-muted text-normal">Created</h5>
                    <h3 class="m-0 text-normal" v-if="created">
                        {{ created.toLocaleDateString() }}
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['gravatar', 'image', 'fullName',
            'username', 'location', 'email', 'hireable', 'company',
            'followers', 'following', 'created'],
    };
</script>

<style lang="scss">

    .card {

        background:white;
        border-radius:10px;
        border:1px solid #eee;
        box-shadow: 0 1px 3px rgba(0,0,0,0.03);

        .avatar {

            border-radius:100%;
            height:3em;
            width:3em;
        }

        .list {

            .item {

                border-bottom:1px solid #eee;

                .icon {

                    width:2.5em;
                }

                .text {

                    font-size:0.8rem;
                }
            }
        }
    }

</style>
