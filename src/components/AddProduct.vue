<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <h4> 상품 등록 </h4>
        <hr/>
        <label for="name"> 상품명 </label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="product.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="description"> 상품상세 </label>
        <input
          class="form-control"
          id="description"
          required
          v-model="product.description"
          name="description"
        />
      </div>
      <div class="text-right">
        <button @click="saveProduct" class="btn btn-primary mr-1">등록</button>
        <button @click="goBack" class="btn btn-link">돌아가기</button>
      </div>
    </div>
    <div v-else class="mx-auto">
      <div class="text-center">
        <p> 성공적으로 등록 하였습니다. </p>
        <button class="btn btn-primary mr-1" @click="newProduct">추가등록</button>
        <button @click="goBack" class="btn btn-link">돌아가기</button>
      </div>
      <div class="align-center text-center mt-3">
        <transition name="fade">
          <div :class="[isSuccess ?  successClass : errorClass ]" v-if="show"> {{ message }} </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "add-product",
  data() {
    return {
      product: {
        id: null,
        name: "",
        description: "",
        use_checked: false
      },
      submitted: false,
      message: '',
      isSuccess: false,
      show: false,
      successClass: 'alert alert-success',
      errorClass: 'alert alert-danger',
    };
  },
  methods: {
    saveProduct(){
      var data = {
        name: this.product.name,
        description: this.product.description
      };

      ProductDataService.create(data)
        .then(response => {
          this.product.id = response.data.id;
          console.log(response.data);
          this.message = "데이터 가 등록되었습니다."
          this.submitted = true;
          this.isSuccess = true;
          this.show = true
          setTimeout(()=>{this.show = false}, 2000);
        })
        .catch( e => {
          console.log(e);
          this.message = e;
          this.isSuccess = false;
          this.show = true
          setTimeout(()=>{this.show = false}, 2000);
        });
    },
    newProduct(){
      this.submitted = false;
      this.tutorial = {};
    },
    goBack(){
      this.$router.push("/products/");
    }
  }
};
</script>

<style>
.submit-form{
  max-width: 300px;
  margin: auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
