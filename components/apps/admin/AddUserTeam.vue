<template>
  <v-card flat >

    <v-card-title v-if="$slots['title']">
      <slot name="title"></slot>
    </v-card-title>

    <v-card-subtitle v-if="$slots['subtitle']">
      <slot name="subtitle"></slot>
    </v-card-subtitle>

    <v-card-text class="ma-0 pa-0">
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-text-field v-model="name"
                            :label="nameLabel"
                            :hint="nameLabelHint"
                            :rules="nameRules"

                            persistent-hint
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field v-model="email"
                            :label="emailLabel"
                            :hint="emailLabelHint"
                            :rules="emailRules"

                            persistent-hint
                            required
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                v-model="roleContext"
                :items="roles"
                item-text="name"
                item-value="roleContext"
                :label="roleLabel"
                :hint="roleHint"
                required
                persistent-hint
                :rules="roleRules"
              />
            </v-col>
          </v-row>


        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn class="ml-auto"
             plain
             @click="reset">
        {{ $t('Clean') }}
      </v-btn>
      <v-btn color="primary"
             @click="submit">
        {{ $t('Add') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddUserTeam",
  props: {
    userData: {
      type: Object
    },
    editable: {
      type: Boolean
    }
  },
  data: () => ({
    valid: true,

    roles: [
      {
        name: 'Administrator',
        roleContext: 'administrator'
      },
      {
        name: 'Organiser',
        roleContext: 'organiser'
      },
      {
        name: 'Content Creator',
        roleContext: 'content-creator'
      },
    ],

    name: '',
    email: '',
    roleContext: '',

    emailRules: [
      v => !!v || 'Email is required',
      v => /^.+@.+\..+$/.test(v) || 'Email must be valid'
      // @todo add additional rules
    ],

    nameRules: [
      v => !!v || 'Name is required',
    ],
  }),
  // watch: {
  //   userData: {
  //     immediate: true,
  //     deep: true,
  //     handler(value){
  //       if (value) {
  //         this.name = value.name
  //         this.email = value.email
  //         this.roleContext = value.roleContext
  //       }
  //     }
  //   }
  // },
  computed: {
    emailLabel () {
      return this.$i18n.t('Email');
    },
    emailLabelHint () {
      return this.$i18n.t('Email_Hint');
    },
    nameLabel () {
      return this.$i18n.t('Name');
    },
    nameLabelHint () {
      return this.$i18n.t('Name_Hint');
    },
    roleLabel () {
      return this.$i18n.t('Role_Label');
    },
    roleHint () {
      return this.$i18n.t('Role_Hint');
    },
    roleRules() {
      //TODO: Handle i18n.
      return [
        v => !!v || 'Role_Is_Required'
      ]
    },
  },
  methods: {
    reset () {
      this.valid = true;
      this.$refs.form.reset();
      this.email = '';
      this.name = '';
      this.roleContext = '';


    },

    async submit () {
      if (! this.$refs.form.validate()) {
        return;
      }

      this.$emit('user-added', {
        name: this.name,
        email: this.email,
        roleContext: this.roleContext
      });

      this.reset();
    },
  },
  destroyed() {
    this.valid = true
  }
}
</script>
