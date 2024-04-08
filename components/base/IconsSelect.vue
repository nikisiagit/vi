<!--
Base - Icon Select

A component that enables the selection of an icon.
-->
<template>
  <v-menu v-model="menu" offset-y>
    <template #activator="{ on, attrs }">
      <v-text-field v-model="input"
                    clearable
                    ref="elInputIcon"
                    :label="iconLabel"
                    :hint="iconHint"
                    persistent-hint
                    placeholder="Search icon (e.g. user, account, badge)"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="onClear">
      </v-text-field>
    </template>

    <v-list v-show="filteredIcons.length > 0">
      <v-list-item-group v-model="iconSelected">
        <v-virtual-scroll :items="filteredIcons" :item-height="56" :bench="6" :height="Math.min(filteredIcons.length * 56, 336)">
          <template #default="{ item }">
            <v-list-item :key="item.name" :value="item.name" @click="selectIcon(item)">
              <v-list-item-icon>
                <v-icon color="primary" class="mr-2">mdi-{{ item.name }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-list-item-group>
    </v-list>

  </v-menu>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import icons from '@/data/icons.json'
import { distance } from '@/utils/helpers'

export default {
  name: "IconListItem",
  props: {
    icon: {
      type:  String,
    }
  },

  data: () => ({
    menu: false,
    input: undefined,
    iconSelected: undefined,
    // icon: undefined,
  }),

  created () {
    this.input = this.icon;
  },

  watch: {
    icon: {
      handler(){
        this.input = this.icon;
      }
    },
  },

  computed: {
    ...mapGetters({
      //
    }),

    iconDistance () {
      return icons.map(icon => ({
        icon,
        distance: Math.max(
          distance(this.search, icon.name),
          ...icon.aliases.map(v => distance(this.search, v))
        ),
      }))
    },

    filteredIcons () {
      // if (!icons.length || !this.search) return []
      if (! this.search) return icons

      const items = this.iconDistance
        .filter(v => v.distance > 0.7)
        .sort((a, b) => {
          return b.distance - a.distance
        })
      return items.map(v => v.icon)
    },

    /**
     * @return {VueI18n.TranslateResult}
     */
    iconLabel () {
      return this.$i18n.t('icon-label');
    },

    /**
     * @return {VueI18n.TranslateResult}
     */
    iconHint () {
      return this.$i18n.t('icon-hint');
    },
  },

  methods: {
    ...mapActions({
      //
    }),

    selectIcon (item) {
      this.search = item.name
      this.iconSelected = item.name
      this.menu = false

      // this.input = `mdi-${item.name}`
      this.$emit('change-icon', `mdi-${item.name}`)
    },

    onClear (change) {
      this.$emit('change-icon', undefined)
      // this.$emit('change-icon', `mdi-${item.name}`)
    }
  },
}
</script>
