<template>
  <div>
    <v-data-table :headers="headersI18n" :items="list" :items-per-page="5" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{$t("accounts")}}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="openDialog(true)" class="mb-2" color="primary" dark>{{$t("add")}}</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.amount="{ item }">${{ item.amount }}</template>
      <template v-slot:item.options="{ item }">
        <v-btn @click="openDeposit(item,true)" icon small>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn @click="openWithdrawal(item,true)" icon small>
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog persistent v-model="dialogNew" width="500">
      <v-card>
        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field :label="$t('name')" :rules="rules.empty" required v-model="account.name"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field :label="$t('amount')" :rules="rules.empty" min="1" required type="number" v-model="account.amount"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="openDialog(false)" color="primary" text>{{$t("cancel")}}</v-btn>
          <v-btn :disabled="!valid" @click="AddNewAccount" color="primary" text>{{$t("accept")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="dialogWithdrawal" width="500">
      <v-card>
        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field :label="$t('amountWithdrawal')" :rules="rules.empty" min="1" required type="number" v-model="account.amount"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="openWithdrawal(null,false)" color="primary" text>{{$t("cancel")}}</v-btn>
          <v-btn :disabled="!valid" @click="WithdrawalAccount" color="primary" text>{{$t("accept")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="dialogDeposit" width="500">
      <v-card>
        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field :label="$t('amountDeposit')" :rules="rules.empty" min="1" required type="number" v-model="account.amount"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="openDeposit(null,false)" color="primary" text>{{$t("cancel")}}</v-btn>
          <v-btn :disabled="!valid" @click="DepositAccount" color="primary" text>{{$t("accept")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar :color="snackbar.color" v-model="snackbar.model">{{ $t(snackbar.text) }}</v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogWithdrawal: false,
      dialogDeposit: false,
      snackbar: {
        model: false,
        text: '',
        color: 'success',
      },
      valid: null,
      rules: {
        empty: [(v) => !!v || this.$t('empty')],
      },
      account: {
        amount: 1,
        name: '',
      },
      dialogNew: false,
      
      list: [],
    };
  },
  created() {
    this.getAccounst();
  },
  computed:{
      headersI18n(){
          return[
        {
          text: this.$t('name'),
          align: 'start',
          value: 'name',
        },
        { text: this.$t('amount'), value: 'amount' },
        { text: this.$t('options'), value: 'options' },
      ]
      }
  },
  methods: {
    async DepositAccount() {
      try {
        const res = await this.$store.dispatch('ApiPut', {
          url: 'Accounts/DepositAccount/',
          item: this.account,
        });

        if (res) {
          this.snackbar = {
            model: true,
            text: 'successAccount',
            color: 'success',
          };
          this.openDeposit(false);
          this.getAccounst();
        } else {
          this.snackbar = {
            model: true,
            text: 'failAccount',
            color: 'error',
          };
        }
      } catch (error) {
        this.snackbar = {
          model: true,
          text: 'error',
        };
      }
    },
    async WithdrawalAccount() {
         try {
        const res = await this.$store.dispatch('ApiPut', {
          url: 'Accounts/WithdrawalAccount/',
          item: this.account,
        });

        if (res) {
          this.snackbar = {
            model: true,
            text: 'successAccount',
            color: 'success',
          };
          this.openWithdrawal(false);
          this.getAccounst();
        } else {
          this.snackbar = {
            model: true,
            text: 'failAccount',
            color: 'error',
          };
        }
      } catch (error) {
        this.snackbar = {
          model: true,
          text: 'error',
        };
      }
    },
    async AddNewAccount() {
      try {
        const res = await this.$store.dispatch('ApiPost', {
          url: 'Accounts/AddNewAccount/',
          item: {
            name: this.account.name,
            amount: this.account.amount,
            idUser: this.$store.state.userActual.id,
          },
        });

        if (res) {
          this.snackbar = {
            model: true,
            text: 'successAccount',
            color: 'success',
          };
          this.openDialog(false);
          this.getAccounst();
        } else {
          this.snackbar = {
            model: true,
            text: 'failAccount',
            color: 'error',
          };
        }
      } catch (error) {
        this.snackbar = {
          model: true,
          text: 'error',
        };
      }
    },
    async getAccounst() {
      try {
        const res = await this.$store.dispatch('ApiGet', { url: 'Accounts/GetAccounts/' + this.$store.state.userActual.id });
        this.list = res;
      } catch (error) {}
    },
    openWithdrawal(item, option) {
      if (!option) {
        this.account = {
          amount: 1,
          name: '',
        };
      }
      if (item != null) {
        this.account = {
          amount: 1,
          idAccount: item.id,
        };
      }
      this.dialogWithdrawal = option;
    },
    openDeposit(item, option) {
      if (!option) {
        this.account = {
          amount: 1,
          name: '',
        };
      }
      if (item != null) {
        this.account = {
          amount: 1,
          idAccount: item.id,
        };
      }
      this.dialogDeposit = option;
    },
    openDialog(option) {
      if (!option) {
        this.account = {
          amount: 1,
          name: '',
        };
      }
      this.dialogNew = option;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>