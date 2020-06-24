<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>강좌</h4>
    <form>
      <div class="form-group">
        <label for="title"> 제목 </label> <span> </span>
        <input type="text" class="form-contro;" id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description"> 내용 </label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.description"
        />
      </div>
      <div class="form-group">
        <label><strong>상태 : </strong></label>
          {{ currentTutorial.published ? "공개" : "폐강" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="!currentTutorial.published"
      @click="updatePublished(true)"
    >
      공개
    </button>

    <button class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      폐강
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteTutorial"
    >
      삭제
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTutorial"
    >
      수정
    </button>
    <p> {{ message }} </p>
  </div>

  <div v-else>
    <br/>
    <p> 강좌 리스트를 클릭해 주세요.</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "Tutorial",
  data(){
    return {
      currentTutorial: null,
    };
  },  
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data;
          console.log(response.data);
        }) 
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then(response=>{
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch(e=>{
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(
        this.currentTutorial.id, 
        this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.message = 'the tutorial was updated successfully!';
        })
        .catch( e=> {
          console.log(e);
        });
    },

    deleteTutorial(){
      TutorialDataService.delete(this.currentTutorial.id)
        .then(response=>{
          console.log(response.data);
          this.$router.push({name:"tutorials"});
        })
        .catch( e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message ='';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form{
  .max-width: 300px;
  margin: auto;
}
</style>

    
