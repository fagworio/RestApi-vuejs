<template>
    <div>
        <div id="beepsWraper">
            <beep v-for="(beep, index) in beeps" 
            :beep="beep" 
            :key="`beep-${index}`" 
            :showUserInfo="showUserInfo"></beep>
        </div>
        <div id="beepsLoading" class="text-center" v-show="beepsLoading">
            <i class="fa fa-spin fa-spinner"></i>
        </div>
    </div>
</template>



<script>
    import Beep from './Beep';

    export default {
        name: 'BeepList',
        components: {
            beep: Beep,
        },
        created: function () {
            this.beeps = [];
            this.getBeeps(1);

            window.addEventListener('scroll', this.handleScroll);
            
            this.$root.$on('newBeep', this.handleNewBeep);
        },
        destroyed: function () {
            window.removeEventListener('scroll', this.handleScroll);
        },
        props: {
            endpoint: { type: String, default: "/beeps" },
            showUserInfo: { type: Boolean, default: true }
        },
        data: function () {
            return {
                beeps: '',
                page: {},
                beepsLoading: false
            }
        },
        watch: {
            endpoint: function() {                
                this.beeps = [];
                this.getBeeps();
            }
        },
        methods: {
            getBeeps: function (page) {
                this.beepsLoading = true;
                this.$http.get(this.endpoint + '?page=' + page)
                        .then(function (res) {
                            this.beeps = this.beeps.concat(res.body.data);
                            this.page = {current: res.body.current_page, last: res.body.last_page};
                            this.beepsLoading = false;
                        })
                        .catch(function () {
                            this.beepsLoading = false;
                        })
            },
              handleScroll: function () {
                if (document.body.scrollHeight - window.innerHeight - window.pageYOffset == 0) {
                    if (this.page.current < this.page.last)
                        this.getBeeps(this.page.current+1);
                }
            },
             handleNewBeep: function (beep) {
                if (!this.$route.params.username || this.$route.params.username == beep.author.username)
                    this.beeps.unshift(beep);
            }
        }
    }
</script>

<style scoped>
    #beepsWraper {
        margin: 0 -20px;
    }

    #beepsLoading {
        padding: 40px;
    }

    #beepsLoading i {
        font-size: 40px;
    }
</style>