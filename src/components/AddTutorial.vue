<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <h4> 강좌 등록 </h4>
        <hr/>
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description"> Description </label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">등록</button>
    </div>

    <div v-else>
      <h4> 성공적으로 등록 하였습니다. </h4>
      <button class="btn btn-success" @click="newTutorial">추가로 등록하기</button>
      <button @click="goBack" class="btn btn-success">목록으로 돌아가기</button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false,
      message: '',
      show: true,
      successClass: 'alert alert-success',
      errorClass: 'alert alert-danger',
      isSuccess: true,
    };
  },
  methods: {
    saveTutorial(){
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description
      };

      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.isSuccess = true;
          this.message = response.data.message;
          this.show = true
          setTimeout(()=>{this.show = false}, 2000);
        })
        .catch( e => {
          console.log(e);
          this.isSuccess = false;
          this.message = e;
          this.show = true
          setTimeout(()=>{this.show = false}, 2000);
        });
    },
    newTutorial(){
      this.submitted = false;
      this.tutorial = {};
    },
    goBack(){
      this.$router.push("/tutorials/");
    }
  }
};
</script>

<style>
.submit-form{
  max-width: 300px;
  margin: auto;
}
</style>
