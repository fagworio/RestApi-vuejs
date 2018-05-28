<template>
<div class="form-group">
    
    <h3 class="text-center">Register</h3>
    <input v-model="user.username" type="text" class="form-control m-b-15" placeholder="Username">
    <input v-model="user.email" type="email" class="form-control m-b-15" placeholder="Email address">
    <input v-model="user.password" type="password" class="form-control" placeholder="Password">
    
    <hr>
    
    <button @click="register" class="btn btn-lg btn-primary btn-block m-b-15">Register</button>
    <p class="text-center">
        Already have an account? <router-link to="/auth/login">Login!</router-link>
    </p>
    <router-view></router-view>
    
</div>
    
</template>

<script>
    export default {
        name: "register",
        data: function() {
            return {
                user: {
                    email: "",
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            register: function() {
                this.$http.post("/users", this.user)
                .then(function(res){
                    alertify.success("Success! You can now login using your password and email");
                    this.$router.push('/auth/login');
                })
            }
        }
    }
</script>

<style>
    
</style>