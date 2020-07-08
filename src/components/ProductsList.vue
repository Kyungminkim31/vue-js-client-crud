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
      <div> <!-- div for buttons -->
        <button class="m-1 btn btn-sm btn-link"
          @click="addProduct()">
          상품 등록
        </button>
        <button class="m-1 btn btn-sm btn-link"
          @click="removeAllProducts">
          전체 상품 삭제
        </button>
      </div>
      <div class="mt-1">
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
    </div>
    <div class="col-md-6">
      <div v-if="currentProduct">
        <div>  
          <h5>상세 상품 정보</h5>
          <div>
            <label><strong>이름:</strong></label> 
            {{ currentProduct.name }}
          </div>
          <div>
            <label><strong>내용:</strong></label> 
            {{ currentProduct.description}}
          </div>
          <div>
            <label><strong>사용 여부: </strong></label> 
            {{ currentProduct.use_checked ? "사용" : "미사용" }}
          </div>
          <div>
            <a class="btn btn-light"
              :href="'/product/' + currentProduct.id">
              편집
            </a>
          </div>
        </div>
      </div> <!-- div for v-if -->
      <div v-else>
        <div>
          <p class="mx-auto align-middle"> 상품을 선택하세요.</p>
        </div>
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
  computed: {
    currentUser(){
      return this.$store.state.auth.user;
    }
  },   
  mounted() {
    if(!this.currentUser){
      this.$router.push('login');
    } else {
      this.retrieveProducts();
    }
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
        
