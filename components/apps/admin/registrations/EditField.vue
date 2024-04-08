<template>
  <v-card
    rounded
    height="100%"
    width="100%"
    elevation="4"
  >

    <v-card-title>
      <v-icon left>
        mdi-square-edit-outline
      </v-icon>
      {{ $t('edit-field') }}

      <v-spacer></v-spacer>

      <v-btn icon @click="$emit('close')">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle>{{ $t('edit-field-subtitle') }}</v-card-subtitle>

    <v-divider></v-divider>

    <!--                <div class="pa-2">-->
    <!--                  <v-btn block>-->
    <!--                    back-->
    <!--                  </v-btn>-->
    <!--                </div>-->


    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="name"
              @change="v => onChange('name', v)"
              :label="$t('field-name')"
              :hint="$t('field-name-hint')"
              persistent-hint
              clearable
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="label"
              @change="v => onChange('label', v)"
              :label="$t('field-label')"
              :hint="$t('field-label-hint')"
              persistent-hint
              clearable
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="hint"
              @change="v => onChange('hint', v)"
              :label="$t('field-hint')"
              :hint="$t('field-hint')"
              persistent-hint
              clearable
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="12">
            <v-checkbox
              v-model="required"
              @change="v => onChange('required', v)"
              :label="$t('field-required')"
              :hint="$t('field-required-hint')"
              persistent-hint
              clearable
            />

          </v-col>
        </v-row>

      </v-container>
    </v-form>


  </v-card>
</template>


<script>
export default {
  data(){
    return {
      label: '',
      name: '',
      hint: '',
      required: false

    }

  },
  methods: {
    onChange(attribute, value){
      this.$emit('change', {
        attribute,
        value
      })

    }
  }

}
</script>
