<template>
  <div>
    <v-data-table :headers="headersI18n" :items="list" :items-per-page="5" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{$t("records")}}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
      </template>
      <template v-slot:item.amount="{ item }">
        <v-chip color="success" dark v-if="item.operation=='deposit'">+ ${{ item.amount }}</v-chip>
        <v-chip color="error" dark v-else>- ${{ item.amount }}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  computed:{
      headersI18n(){
          return [
        {
          text: this.$t('user'),
          align: 'start',
          value: 'user',
        },
        { text: this.$t('account'), value: 'account' },
        { text: this.$t('date'), value: 'date' },
        { text: this.$t('amount'), value: 'amount' },
      ]
      }
  },
  created() {
    this.getReords();
  },
  methods: {
    async getReords() {
      try {
        const res = await this.$store.dispatch('ApiGet', { url: 'Records/GetRecords/' });
     
        this.list = res;
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
</style>