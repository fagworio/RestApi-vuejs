<template>
    <div class="form-group">
    <h3 class="text-center">Login</h3>
    <input v-model="user.username" type="text" class="form-control m-b-15" placeholder="Username">
    <input v-model="user.password" type="password" class="form-control" placeholder="Password">
    <hr>
    
    <button @click="login" class="btn btn-lg btn-primary btn-block m-b-15">Sign in</button>
    <p class="text-center">
        Don`t have account? <router-link to="/auth/register">Sign up!</router-link>
    </p>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "login",
        data: function() {
            return {
                user: {
                    username: "",
                    password: "" 
                }
            }
        },
        methods: {
            login: function() {
                this.$http.post('/auth', this.user)
                .then(function(res){
                    this.$auth.setToken(res.body.token, Date.now() + 14400000);
                    this.$router.push("/newsfeed");
                })
            }
        }
    }
</script>

<style>
    
</style>