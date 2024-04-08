<template>
  <v-card
    rounded
    height="100%"
    width="100%"
    elevation="4"
  >
    <v-card-title>
      <v-icon left>
        mdi-eye
      </v-icon>
      {{ $t('live-preview') }}
    </v-card-title>

    <v-card-subtitle>
      {{ $t('live-preview-subtitle') }}
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text style="height: calc(100% - 86px)" class="grey" >

      <v-container>
        <v-row>
          <v-col cols="12">

            <v-fade-transition mode="out-in">

<!--              <v-card rounded height="400" class="pa-1" key="builder-empty" v-if="! formBuilderFields.length">-->
<!--                <v-container class="fill-height d-flex flex-column justify-center" style="border: 2px grey dashed;">-->

<!--                  <v-card-text>-->
<!--                    <draggable-->
<!--                      :empty-insert-threshold="100"-->
<!--                      @change="changeFormBuilderFields"-->
<!--                      v-model="formBuilderFields"-->
<!--                      :group="{ name: 'fields', pull: true, put: true }"-->
<!--                    >-->
<!--                    </draggable>-->
<!--                  </v-card-text>-->


<!--                  <v-avatar color="primary">-->
<!--                    <v-icon dark>-->
<!--                      mdi-drag-variant-->
<!--                    </v-icon>-->
<!--                  </v-avatar>-->
<!--                  <v-card-title class="justify-center">Drag elements here</v-card-title>-->
<!--                  <v-card-subtitle>Grab an element from the left and drop it here</v-card-subtitle>-->


<!--                  <v-card-text>-->
<!--                    <draggable-->
<!--                      :empty-insert-threshold="100"-->
<!--                      @change="changeFormBuilderFields"-->
<!--                      v-model="formBuilderFields"-->
<!--                      :group="{ name: 'fields', pull: true, put: true }"-->
<!--                    >-->
<!--                    </draggable>-->
<!--                  </v-card-text>-->

<!--                </v-container>-->
<!--              </v-card>-->

              <v-card min-height="400" key="builder" >
                <v-card-text>

                  <v-form
                    ref="form"
                    lazy-validation
                  >


                    <v-hover v-slot="{ hover }">
                      <v-list>
                        <draggable
                          :empty-insert-threshold="100"
                          @change="changeFormBuilderFields"
                          v-model="formBuilderFields"
                          :group="{ name: 'fields', pull: true, put: true }"
                        >
                          <transition-group
                            type="transition"
                            name="flip-list"
                          >
                            <v-list-item
                              v-for="(item, index) in formBuilderFields"
                              :key="index"
                              link
                              :class="{ 'v-list-item--active': index === editingIndex }"
                            >
                              <v-list-item-content>
                                <v-list-item-title >


                                  <template v-if="item.type === 'text' || item.type === 'password' || item.type === 'number' || item.type === 'email' || item.type === 'phone' ">
                                    <v-text-field
                                      :type="item.type"
                                      :label="`${item.required ? '* ' + item.label: item.label}`"
                                      :hint="item.hint"
                                      persistent-hint
                                      :required="item.required"
                                    >

                                      <template v-slot:append-outer>
                                        <v-slide-x-transition>
                                          <v-btn icon v-show="hover" @click="editField(index)">
                                            <v-icon>mdi-pencil</v-icon>
                                          </v-btn>
                                        </v-slide-x-transition>

                                        <v-slide-x-transition>
                                          <v-btn icon v-show="hover" @click="removeField(index)">
                                            <v-icon>mdi-delete</v-icon>
                                          </v-btn>
                                        </v-slide-x-transition>

                                      </template>


                                    </v-text-field>
                                  </template>

                                  <template v-if="item.type === 'textarea'">
                                    <v-textarea
                                      :label="`${item.required ? '* ' + item.label: item.label}`"
                                      :hint="item.hint"
                                      persistent-hint
                                      :required="item.required"

                                      auto-grow
                                      rows="4"
                                      row-height="15"
                                    >

                                      <template v-slot:append-outer>
                                        <v-slide-x-transition>
                                          <v-btn icon v-show="hover" @click="editField(index)">
                                            <v-icon>mdi-pencil</v-icon>
                                          </v-btn>
                                        </v-slide-x-transition>

                                        <v-slide-x-transition>
                                          <v-btn icon v-show="hover" @click="removeField(index)">
                                            <v-icon>mdi-delete</v-icon>
                                          </v-btn>
                                        </v-slide-x-transition>

                                      </template>


                                    </v-textarea>
                                  </template>

                                  <template v-if="item.type === 'select'">

                                    <v-select
                                      class="pl-2"
                                      :label="`${item.required ? '* ' + item.label: item.label}`"
                                      :hint="item.hint"
                                      persistent-hint
                                      :required="item.required"
                                    >

                                      <template v-slot:append-outer>
                                        <v-slide-x-transition>
                                          <v-btn icon v-show="hover" @click="editField(index)">
                                            <v-icon>mdi-pencil</v-icon>
                                          </v-btn>
                                        </v-slide-x-transition>

                                        <v-slide-x-transition>
                                          <v-btn icon v-show="hover" @click="removeField(index)">
                                            <v-icon>mdi-delete</v-icon>
                                          </v-btn>
                                        </v-slide-x-transition>

                                      </template>


                                    </v-select>
                                  </template>


                                  <template v-if="item.type === 'checkbox'">
                                    <v-checkbox
                                      class="pl-2"
                                      :label="`${item.required ? '* ' + item.label: item.label}`"
                                      :hint="item.hint"
                                      persistent-hint
                                      :required="item.required"
                                    >

                                      <template v-slot:append>
                                        <v-slide-x-transition>
                                          <v-btn icon v-show="hover" @click="editField(index)">
                                            <v-icon>mdi-pencil</v-icon>
                                          </v-btn>
                                        </v-slide-x-transition>

                                        <v-slide-x-transition>
                                          <v-btn icon v-show="hover" @click="removeField(index)">
                                            <v-icon>mdi-delete</v-icon>
                                          </v-btn>
                                        </v-slide-x-transition>

                                      </template>


                                    </v-checkbox>
                                  </template>


                                  <template v-if="item.type === 'toggle'">
                                    <v-row>
                                      <v-col cols="10">
                                        <v-switch
                                          class="pl-2"
                                          :label="`${item.required ? '* ' + item.label: item.label}`"
                                          :hint="item.hint"
                                          persistent-hint
                                          :required="item.required"
                                        >
                                        </v-switch>
                                      </v-col>
                                      <v-col align-self="center" cols="2">
                                        <template >
                                          <v-slide-x-transition>
                                            <v-btn icon v-show="hover" @click="editField(index)">
                                              <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                          </v-slide-x-transition>

                                          <v-slide-x-transition>
                                            <v-btn icon v-show="hover" @click="removeField(index)">
                                              <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                          </v-slide-x-transition>

                                        </template>
                                      </v-col>
                                    </v-row>



                                  </template>

                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </transition-group>

                        </draggable>
                      </v-list>
                    </v-hover>


                    <v-hover v-slot="{ hover }">
                      <v-list v-if="false">


                        <v-list-item
                          link
                          class="v-list-item--active"
                        >

                          <v-list-item-content>
                            <v-list-item-title>
                              <v-text-field
                                label="Name"
                                required
                              >

                                <template v-slot:append-outer>
                                  <v-slide-x-transition>
                                    <v-btn icon v-show="hover || true">
                                      <v-icon>mdi-square-edit-outline</v-icon>
                                      <!--                                            <v-icon>mdi-pencil</v-icon>-->
                                    </v-btn>
                                  </v-slide-x-transition>

                                  <v-slide-x-transition>
                                    <v-btn icon v-show="hover || true">
                                      <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                  </v-slide-x-transition>

                                </template>

                              </v-text-field>

                            </v-list-item-title>
                          </v-list-item-content>


                        </v-list-item>

                        <v-list-item
                          link
                        >

                          <v-list-item-content>
                            <v-list-item-title>
                              <v-text-field
                                label="E-mail"
                                required
                              >

                                <template v-slot:append-outer>
                                  <v-slide-x-transition>
                                    <v-btn icon v-show="hover">
                                      <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                  </v-slide-x-transition>

                                  <v-slide-x-transition>
                                    <v-btn icon v-show="hover">
                                      <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                  </v-slide-x-transition>

                                </template>

                              </v-text-field>

                            </v-list-item-title>
                          </v-list-item-content>


                        </v-list-item>

                        <v-list-item
                          link
                        >

                          <v-list-item-content>
                            <v-list-item-title>
                              <v-checkbox
                                label="Do you agree?"
                                required
                              >

                                <template v-slot:append>
                                  <v-slide-x-transition>
                                    <v-btn icon v-show="hover">
                                      <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                  </v-slide-x-transition>

                                  <v-slide-x-transition>
                                    <v-btn icon v-show="hover">
                                      <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                  </v-slide-x-transition>

                                </template>

                              </v-checkbox>

                            </v-list-item-title>
                          </v-list-item-content>


                        </v-list-item>
                      </v-list>
                    </v-hover>



                  </v-form>

                </v-card-text>
              </v-card>
            </v-fade-transition>


          </v-col>
        </v-row>
      </v-container>

    </v-card-text>
  </v-card>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LivePreview",

  data: () => ({
    formBuilderFields: [],

    isEditing: false,
    editingIndex: undefined,
  }),

  computed: {
    ...mapGetters({

    }),
  },

  methods: {
    ...mapActions({

    }),

    editField(index){
      this.isEditing = true
      this.editingIndex = index

      this.$emit('edit', {
        isEditing: this.isEditing,
        editingIndex: this.editingIndex

      })
    },

    removeField(index){
      this.formBuilderFields.splice(index, 1)

    },

    changeFormBuilderFields({ added }){

      // this.formBuilderFields = this.formBuilderFields.map(function (element, index) {
      //   if (index === added.newIndex) {
      //     return {
      //       ...element,
      //       schema: 'monkey',
      //       type: 'text'
      //     }
      //   }
      //
      //   return element
      // })

    },

    log(evt) {
      console.log(evt);
    },
  },
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
