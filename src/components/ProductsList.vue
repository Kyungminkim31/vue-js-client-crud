<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input 
          type="text" 
          class="form-control" 
          placeholder="검색하고 싶은 제목을 입력 하세요."
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName">
            검색
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>상품 조회</h4>
      <button class="m-1 btn btn-sm btn-primary"
        @click="addProduct()">
        상품 등록
      </button>
      <button class="m-1 btn btn-sm btn-danger"
        @click="removeAllProducts">
        전체 상품 삭제
      </button>
      <hr/>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(product, index) in products"
          :key="index"
          @click="setActiveProduct(product, index)">
          {{ product.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentProduct">
        <h4>상품</h4>
        <div>
          <label><strong>상품 제목:</strong></label> {{ currentProduct.name }}
        </div>
        <div>
          <label><strong>상품 내용:</strong></label> 
          {{ currentProduct.description}}
        </div>
        <div>
          <label><strong>상품 사용 여부: </strong></label> 
          {{ currentProduct.use_checked ? "사용" : "미사용" }}
        </div>

        <a class="badge badge-warning"
          :href="'/product/' + currentProduct.id">
          편집
        </a>
      </div>
      <div v-else>
        <br/>
        <p> 상품 목록 을 클릭 하시면 내용을 보실수 있습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "product-list",
  data() {
    return {
      products: [],
      currentProduct : null,
      currentIndex: -1,
      name: ""
    };  
  },
  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
        .then(response => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProduct = null;
      this.currentIndex = -1;
    },

    setActiveProduct(product, index){
      this.currentProduct = product;
      this.currentIndex = index;
    },
    removeAllProducts() {
      ProductDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    searchName(){
      ProductDataService.findByName(this.name)
        .then(response=>{
          this.products = response.data;
          console.log(response.data);
        })
        .catch(e=>{
          console.log(e);
        }); 
    },
    addProduct(){
      this.$router.push("/product/add");
    } 
  },   
  mounted() {
    this.retrieveProducts();
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
        
