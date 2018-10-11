<template>
    <div id="app">
        <div class="container pt-5 pb-5">

            <h1 class="text-thin m-0">Information about {{ username }}</h1>
            <h2 class="text-thin text-muted m-0">
                Here is all we could find about this guy
                - <router-link to="/">Check another dude</router-link>
            </h2>

            <div class="row mb-5 mt-5">
                <div class="col-lg-4">
                    <user-info class="mb-4"
                               :username="username"
                               :fullName="fullName"
                               :gravatar="gravatar"
                               :image="image"
                               :location="location"
                               :email="email"
                               :hireable="hireable"
                               :followers="followers"
                               :company="company"
                               :following="following"
                               :created="created"
                    ></user-info>

                    <div class="row">
                        <div class="col" @click="goToPage">
                            <big-button color="lightblue"
                                        title="Github page"
                                        icon="external-link-alt"
                            ></big-button>
                        </div>
                        <div class="col" @click="randomGif">
                            <big-button v-if="!gif" color="#68E8D0"
                                        title="Show me a random gif"
                                        icon="external-link-alt"></big-button>
                            <div  v-if="gif" class="gif">
                                <img :src="gif" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg">
                    <languages class="mt-4 mt-md-0" :username="username"></languages>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <timeline :username="username"></timeline>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Timeline from './Timeline';
    import UserInfo from './UserInfo';
    import BigButton from './BigButton';
    import Languages from './Languages';

    export default {

        data() {
            return {
                gif: '',
                username: '',
                fullName: '',
                hireable: false,
                gravatar: '',
                url: '',
                image: '',
                company: '',
                location: '',
                email: '',
                bio: '',
                created: null,
                followers: 0,
                following: 0,
            };
        },
        components: {
            timeline: Timeline,
            userInfo: UserInfo,
            bigButton: BigButton,
            languages: Languages,
        },
        name: 'App',

        mounted() {
            const $this = this;
            this.$api.getUser(this.$route.params.username).then((result) => {
                $this.username = result.login;
                $this.fullName = result.name;
                $this.gravatar = result.gravatar_id;
                $this.image = result.avatar_url;
                $this.url = result.html_url;
                $this.company = result.company;
                $this.location = result.location;
                $this.hireable = result.hireable;
                $this.bio = result.bio;
                $this.created = new Date(result.created_at);
                $this.followers = result.followers;
                $this.following = result.following;
            });
        },

        methods: {
            goToPage() {
                window.open(this.url, '_blank');
            },
            randomGif() {
                const $this = this;
                this.$api.randomGif().then((res) => {
                    $this.gif = res.data.image_original_url;
                });
            },
        },
    };

</script>

<style lang="scss">
    .gif {

        width:100%;
        padding-top:100%;
        border-radius:3px;
        overflow:hidden;
        cursor:pointer;
        position:relative;

        img {

            position:absolute;
            top:0;
            left:0;
            min-width:100%;
            height:100%;
        }
    }
</style>
