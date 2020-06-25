<template>
  <div v-if="currentProduct" class="edit-form">
    <h4>상품 상세 정보</h4>
    <form>
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label"> 상품명 </label>
        <div class="col-sm-10">
        <input type="text" class="form-control" id="name"
          v-model="currentProduct.name" />
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-sm-2 col-form-label"> 내용 </label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="description"
            v-model="currentProduct.description"
          />
        </div>
      </div>
      <!-- 라디오 버튼 처리 -->
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-form-label col-sm-2 pt-0">상태</legend>
          <div class="col-sm-10">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radioUseChecked" id="radioUseChecked1" v-model="currentProduct.use_checked" v-bind:value="true"> 
              <label class="form-check-label" for="radioUseChecked1">
                사용
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radioUseChecked" id="radioUseChecked2" v-model="currentProduct.use_checked" v-bind:value="false"> 
              <label class="form-check-label" for="radioUseChecked2">
                미사용
              </label>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
    <div class="text-right">
      <button type="submit" class="btn btn-link mr-2"
        @click="updateProduct" >
        수정
      </button>
      <button class="btn btn-link mr-2"
        @click="deleteProduct">
        삭제
      </button>
    </div>
    <div class="align-center text-center mt-3">
      <transition name="fade">
        <div :class="[isSuccess ?  successClass : errorClass ]" v-if="show"> {{ message }} </div>
      </transition>
    </div>
  </div>
  <div v-else>
    <br/>
    <p> 상품 데이터가 존재 하지 않습니다. </p>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "Product",
  data(){
    return {
      currentProduct: null,
      message: '',
      show: true,
      successClass: 'alert alert-success',
      errorClass: 'alert alert-danger',
      isSuccess: true,
    };
  },  
  methods: {
    getProduct(id) {
      ProductDataService.get(id)
        .then(response => {
          this.currentProduct = response.data;
          console.log(response.data);
        }) 
        .catch(e => {
          console.log(e);
        });
    },
    updateProduct() {
      ProductDataService.update( this.currentProduct.id, this.currentProduct)
      .then(response => {
        console.log(response.data);
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
    deleteProduct(){
      ProductDataService.delete(this.currentProduct.id)
      .then(response=>{
        console.log(response.data);
        this.$router.push({name:"products"});
      })
      .catch( e => {
        console.log(e);
      });
    },
    showMessage(inputMsg){
      this.message = inputMsg;
    },
  },
  mounted() {
    this.message = '';
    this.getProduct(this.$route.params.id);
  }
};
</script>

<style>
.edit-form{
  .max-width: 300px;
  margin: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
