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

      <button @click="saveProduct" class="btn btn-success">등록</button>
    </div>

    <div v-else>
      <h4> 성공적으로 등록 하였습니다. </h4>
      <button class="btn btn-success" @click="newProduct">추가로 등록하기</button>
      <button @click="goBack" class="btn btn-success">목록으로 돌아가기</button>
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
      submitted: false
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
          this.submitted = true;
        })
        .catch( e => {
          console.log(e);
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
</style>
