<template>
    <div id="sidebar" class="text-center">
        <div v-if="loggedIn">
            <h4 class="text-center">@{{user.username}}</h4>
            <hr>
            <div class="row">
                
                <div class="col-sm-6">
                    <router-link :to="'/profile/' + user.username" class="btn btn-block btn-outline-primary">
                    <i class="fa fa-user"></i> Profile</router-link>
                </div>
                <div class="col-sm-6">
                    <router-link :to="'/newsfeed'" class="btn btn-block btn-outline-primary">
                    <i class="fa fa-newspaper"></i> Feed</router-link>
                </div>
                <div class="beepNowWrap m-t-20 m-b-20">
                        <textarea rows="10" 
                        placeholder="Start write your bep here!" 
                        class="form-control" maxlength="320" v-model="newBeep">
                        </textarea>
                        <p class="text-muted">
                        {{320 - newBeep.length}} character{{320 - newBeep.length == 1 ? '' : 's'}}
                            remaining
                        </p>
                        <p class="text-center no-margin">
                            <button @click="beep" class="btn btn-primary">Beep Now</button>
                        </p>
                        <hr>
                        <div class="row">
                        <div class="col-sm-6">
                                <p class="text-center no-margin">
                                    <router-link :to="'/settings'">
                                        <i class="fa fa-cog"></i> Settings</router-link>
                                </p>
                            </div>
                        
                        <div class="col-sm-6">
                            <p class="text-center no-margin">
                                <a href="#" @click.prevent="logout">
                                    <i class="fa fa-power-off"></i> Logout</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!loggedIn">
            <h1 class="text-center">Welcome!</h1>
            <p>Beep is a micro blogging social network, come join and have fun</p>
            <p class="text-center">
                 <router-link :to="'/auth/register'" class="btn btn-primary btn-block">Register</router-link>
                 <router-link :to="'/auth/login'" class="btn btn-outline-primary btn-block">Login</router-link>
            </p>
        </div>
    </div>
    
</template>

<script>
export default {
        name: 'sidebar',
        created: function () {
        },
        data: function () {
            return {
                newBeep: "",
                loggedIn: this.$auth.loggedIn()
            }
        },
        computed: {
            user: function() {
                return this.$store.state.currentUser;
            }
        },
        methods: {
            beep: function() {
                this.$http.post('/beeps', { text: this.newBeep })
                    .then(function(res){
                        this.$root.$emit('newBeep', res.data);
                        this.newBeep = "";
                        alertify.success("Beep published!");
                    })
            },
            logout: function () {
                this.$auth.destroyToken();
                this.user = {};
                this.$router.push('/auth/login');
            }
        }
    }
</script>

<style scoped>
    #sidebar {
        background: #fff;
        padding: 20px 20px 0 20px;
        border-radius: 6px;
    }

    .beepNowWrap {
        padding-bottom: 20px;
        width: 100%;
        background: #f0f0f0;
    }

    .beepNowWrap textarea {
        background: transparent;
        border: transparent;
        box-shadow: none;
        resize: vertical;
    }
    input.placeholder {
    text-align: center;
}

</style>