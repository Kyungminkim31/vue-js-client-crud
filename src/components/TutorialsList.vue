<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input 
          type="text" 
          class="form-control" 
          placeholder="검색하고 싶은 제목을 입력 하세요."
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle">
            검색
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>강좌 조회</h4>
      <div class="d-flex flex-row-reverse">
        <button class="m-1 btn btn-sm btn-danger"
          @click="removeAllTutorials">
          전체글 삭제
        </button>
        <button class="m-1 btn btn-sm btn-danger"
          @click="addTutorial()">
          강좌 등록
        </button>
      </div>
      <hr/>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)">
          {{ tutorial.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>강좌</h4>
        <div>
          <label><strong>강좌 제목:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>강좌 내용:</strong></label> 
          {{ currentTutorial.description}}
        </div>
        <div>
          <label><strong>강좌 상태:</strong></label> 
          {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/tutorials/' + currentTutorial.id">
          편집
        </a>
      </div>
      <div v-else>
        <br/>
        <p> 강좌 목록 을 클릭 하시면 내용을 보실수 있습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: ""
    };  
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index){
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    searchTitle(){
      TutorialDataService.findByTitle(this.title)
        .then(response=>{
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e=>{
          console.log(e);
        }); 
    },
    addTutorial(){
      this.$router.push("/tutorial/add");
    }   
  },
  mounted() {
    this.retrieveTutorials();
  }
};  
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
        
