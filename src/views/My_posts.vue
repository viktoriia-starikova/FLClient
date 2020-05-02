<template>
  <div class="home">
    <Posts :posts="posts" :mess="mess" @reload="loadPosts"></Posts>
  </div>
</template>

<script>
import Posts from "@/components/Posts/Posts.vue";
export default {
  name: "home",
  props: {
    mess: ""
  },
  components: {
    Posts
  },
  data() {
    return {
      posts: ""
    };
  },
  created() {
    this.loadPosts();
  },
  methods: {
    loadPosts() {
      $.ajax({
        url: this.$store.getters.get_url_server + "api/v1/my",
        type: "GET",
        success: response => {
          this.posts = response;
          console.log("Все посты успешно загружены");
        }
      });
    }
  }
};
</script>
