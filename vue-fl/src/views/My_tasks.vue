<template>
  <div class="home">
    <Tasks :tasks="tasks" :mess="mess" @reload="loadTasks"></Tasks>
  </div>
</template>

<script>
import Tasks from "@/components/Tasks/Tasks.vue";
export default {
  name: "my_tasks",
  props: {
    mess: ""
  },
  components: {
    Tasks
  },
  data() {
    return {
      tasks: []
    };
  },
  created() {
    this.loadTasks();
  },
  methods: {
    loadTasks() {
      $.ajax({
        url: this.$store.getters.get_url_server + "api/v1/my/tasks/",
        type: "GET",
        success: response => {
          this.tasks = response;
          console.log("Все задания успешно загружены");
        }
      });
    }
  }
};
</script>
