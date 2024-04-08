<template>
  <base-avatar icon="mdi-translate"
               size="xs"
               :label="name"
  />
</template>

<script>
import BaseAvatar from "../../../base/Avatar";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "Avatar",
  components: {
    BaseAvatar
  },

  props: {
    languageId: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    languageId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadLanguageWithLanguageId: 'apps/admin/languages/loadLanguageWithLanguageId',
    }),

    async load () {
      return await (this.languageId) ? this.loadLanguageWithLanguageId(this.languageId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      languageWithLanguageId: 'apps/admin/languages/languageWithLanguageId',
    }),

    language () {
      return (this.languageId) ? this.languageWithLanguageId(this.languageId) : undefined;
    },

    name () {
      return (this.language) ? this.language.name : undefined;
    },

    loaded () {
      return (this.language) ? this.language.loaded : false;
    },

    loading () {
      return (this.language) ? this.language.loading : false;
    },
  },
}
</script>
