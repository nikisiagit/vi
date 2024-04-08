<template>
  <v-form ref="form" v-model="valid" lazy-validation class="pa-5">
    <div class="form-group">
      <v-text-field class="form-control"
                    v-model="linkedin"
                    :rules="urlRules"
                    label="LinkedIn"></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field class="form-control"
                    v-model="twitter"
                    :rules="urlRules"
                    label="Twitter"></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field class="form-control"
                    v-model="facebook"
                    :rules="urlRules"
                    label="Facebook"></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field class="form-control"
                    v-model="web"
                    :rules="urlRules"
                    label="Web"></v-text-field>
    </div>
    <v-btn large block class="form-button" :disabled="!valid" color="primary" @click="updateSocialLinks">Update</v-btn>
  </v-form>
</template>


<script>
import * as url from "url";
import {mapActions, mapGetters} from "vuex";

export default {
  data: () => ({
    valid: true,
    linkedin: '',
    twitter: '',
    facebook: '',
    web: '',
    urlRules: [
      v => v === '' || /^https?:\/\/[\w.-]+/.test(v) || 'URL must be valid',
    ],
  }),

  created(){
    this.linkedin = this.findByName(this.socialLinks,'linkedin')
    this.twitter = this.findByName(this.socialLinks,'twitter')
    this.facebook = this.findByName(this.socialLinks,'facebook')
    this.web = this.findByName(this.socialLinks,'web')
  },

  methods: {
    ...mapActions({
      updateMe: 'me/updateMe',
    }),

    findByName(arr,name) {
      return arr?.length > 0 && arr?.find((item) => item.name == name)?.url || "";
    },

    async updateSocialLinks () {
      const valid = this.$refs.form.validate()
      if (!valid) return
      const socialLinks = [
        { name: "linkedin", url: this.linkedin },
        { name: "twitter", url: this.twitter },
        { name: "facebook", url: this.facebook },
        { name: "web", url: this.web }
      ];
      const filteredSocialLinks = socialLinks?.filter(link => link.url.trim() !== "");
      const update = {
        socialLinks: filteredSocialLinks
      };
        await this.updateMe(update);
        this.$emit('close');
      },
    },

  computed: {
    ...mapGetters({
      me: 'me/me',
    }),
    url() {
      return url
    },
    socialLinks() {
      return (this.me) ? this.me.socialLinks : undefined;
    },
  },
}
</script>

<style>
.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.form-control {
  flex: 1;
}

.form-button {
  width: 50px;
}
</style>
