<template>
  <div v-if="currentProduct" class="edit-form">
    <h4>상품</h4>
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
    <div class="float-right">
      <button type="submit" class="btn btn-primary mr-2"
        @click="updateProduct" >
        수정
      </button>
      <button class="btn btn-primary mr-2"
        v-confirm="{ok:deleteProduct, cancel: doNothing, message: '삭제하시겠습니까?'}">
        삭제
      </button>
    </div>
    <p> {{ message }} </p>
  </div>

  <div v-else>
    <br/>
    <p> 강좌 리스트를 클릭해 주세요.</p>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "Product",
  data(){
    return {
      currentProduct: null,
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
    updateUseChecked(status) {
      var data = {
        id: this.currentProduct.id,
        name: this.currentProduct.name,
        description: this.currentProduct.description,
        use_checked: status
      };
      this.message ='';
      ProductDataService.update(this.currentProduct.id, data)
      .then(response=>{
        this.currentProduct.use_checked = status;
        console.log(response.data);
      })
      .catch(e=>{
        console.log(e);
      });
    },
    updateProduct() {
      ProductDataService.update( this.currentProduct.id, this.currentProduct)
      .then(response => {
        console.log(response.data);
        this.message = '상품 정보가 수정이 되었습니다.';
      })
      .catch( e=> {
        console.log(e);
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
    doNothing(){
      console.log("Do nothing!");
    }
  },
  mounted() {
    this.message ='';
    this.getProduct(this.$route.params.id);
  }
};
</script>

<style>
.edit-form{
  .max-width: 300px;
  margin: auto;
}
</style>
