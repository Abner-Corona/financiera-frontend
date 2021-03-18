<template>
  <div>
    <v-app-bar app color="primary" dark>
        <v-select :items="langlist" :label="$t('languages')" @change="changeLang" hide-details   v-model="lang"></v-select>
    
      <v-spacer />
      <v-select :items="users.list" :label="$t('user')" @change="changeUser" hide-details item-text="name" return-object v-model="users.actual"></v-select>
    </v-app-bar>
  
    <v-main>
      <router-view v-if="flagChange" />
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langlist:[
        {text: this.$t("spanish"),value:"es"},
        {text: this.$t("english"),value:"en"}
      ],
      lang:"es",
      group: null,
      users: {
        list: [],
        actual: {},
      },
      flagChange:true,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    changeLang(){
      this.$i18n.locale = this.lang;
      this.$vuetify.lang.current = this.lang;
    },
    async changeUser() {
      this.flagChange=false;
      this.$store.commit('setUserActual', this.users.actual);
      if (this.users.actual.idUserType == 1) {
      if( this.$router.currentRoute.name !="Records")  this.$router.push({ name: 'Records' });
      } else {
       if(this.$router.currentRoute.name !="Accounts") this.$router.push({ name: 'Accounts' });
      }

      setTimeout(()=>{this.flagChange=true;},0)
    },
    async getUsers() {
      try {
        const res = await this.$store.dispatch('ApiGet', { url: 'Users/GetUsers' });
        if (res.length != 0) {
          this.users.list = res;
          if (this.$store.state.userActual == null) {
            this.users.actual = res[0];
            this.$store.commit('setUserActual', this.users.actual);
          } else {
            this.users.actual = this.$store.state.userActual;
          }
          this.changeUser();
        } else {
          this.$router.push({ name: 'NoUsers' });
        }
      } catch (error) {
        //  this.$router.push({ name: 'NoUsers' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>