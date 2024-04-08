<template>
  <v-card width="300" v-show="show">

    <v-card-text class="pa-2">
      <v-list dense class="pa-0">
        <template v-if="hasResults">
          <v-list-item
            class="pro-editor-tags-list"
            v-for="(tag, index) in tags"
            :key="tag.id"
            :class="{ 'v-list-item--active primary--text': navigatedTagIndex === index }"
            @click="selectTag(tag)"
          >
            <v-list-item-content>
              <v-list-item-title>
                <strong>{{ tag.label.toUpperCase() }}</strong>
              </v-list-item-title>
              <v-list-item-subtitle>
              <span>
                {{ tagSymbolStart }}
              </span>
                <span>{{ tag.name }}</span>
                <span>
                {{ tagSymbolEnd }}
              </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template v-else>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-center">
                {{ $t(noFoundLabel) }}.
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

      </v-list>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: "TagsList",
  props: {
    show: {
      type: Boolean
    },
    tags: {
      type: Array,
    },
    tagSymbolStart: {
      type: String,
      default: '{{'
    },
    tagSymbolEnd: {
      type: String,
      default: '}}'
    },
    navigatedTagIndex: {
      type: Number
    },
    noFoundLabel: {
      type: String,
      default: 'No_tags_found'
    }
  },
  data(){
    return {
      showTooltip: false,
    }
  },
  computed: {
    hasResults() {
      return this.tags.length
    },
  },
  methods: {
    selectTag(tag){
      this.$emit('tag-selected', tag)
    }
  }
}
</script>

<style lang="scss">
.pro-editor-tags-list{
  &.v-list-item--highlighted{
    color: var(--v-primary-base) !important;
  }
}
</style>
