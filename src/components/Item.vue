<template>
  <div class="item">
    <div class="pic">
      <img src="../assets/img/food.jpg">
    </div>
    <h1>{{ title }}</h1>
    <input class="search" type="text" v-model="newItem" v-on:keyup.enter="addItem"/>
    <ul class="food-list">
      <li class="food-item" v-for="(item, index) in foodList" :key="index">
        <span :class="{toggle: item.toggle}" @click="toggle(item)">
          {{item.name}}
        </span>
        <span @click="deleteItem(item.name)">x</span>
      </li>
      <li>{{newItem}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data () {
    return {
      title: '说说你想吃什么？',
      newItem: '',
      foodList: [] // 存放foodlist
    }
  },
  mounted: function () {
    this.getFoodListAll()
  },
  methods: {
    addItem: function () {
      let obj = {
        name: this.newItem,
        toggle: false
      }
      this.foodList.push(obj)
      this.newItem = ''
      let _this = this
      _this.$http.post(_this.host + '/foodList/create', obj)
        .then(response => {
          console.log(response.data)
          if (response.data.success) {
            this.$notify({
              title: '添加成功',
              type: 'success'
            })
          }
        })
        .catch(failResponse => {
          this.$notify.error({
            title: '添加出错啦'
          })
        })
    },
    deleteItem: function (name) {
      let _this = this
      _this.$http.delete(_this.host + '/foodList/delete', {
        params: {name: name}})
        .then(response => {
          console.log(response.data)
          if (response.data.success) {
            this.$notify({
              title: '删除成功',
              type: 'success'
            })
            _this.getFoodListAll()
          }
        })
        .catch(failResponse => {
          this.$notify.error({
            title: '删除出错啦'
          })
        })
    },
    // 修改信息
    toggle: function (item) {
      let _this = this
      _this.$http.post(_this.host + '/foodList/update', item)
        .then(response => {
          console.log(response.data)
          if (response.data.success) {
            item.toggle = !item.toggle
            this.$notify({
              title: '修改成功',
              type: 'success'
            })
          }
        })
        .catch(failResponse => {
          this.$notify.error({
            title: '修改出错啦'
          })
        })
    },
    // 获取foodList
    getFoodListAll: function () {
      let _this = this
      _this.$http.get(_this.host + '/foodList')
        .then(response => {
          console.log(response.data)
          this.foodList = response.data.data
        })
        .catch(failResponse => {
          this.$notify.error({
            title: '获取出错啦'
          })
        })
    }
  }
}
</script>

<style scoped>
.item {
  padding-top: 10vh;
  width: 100%;
  min-height:90vh;
  bottom: 0;
  background-color: #bfd3a0;
}
h1 {
  font-weight: 600;
}
ul {
  list-style-type: none;
  padding: 0;
  width: 20%;
  margin: auto;
}
li {
  font-weight: 600;
  font-size: 20px;
  margin:10px;
}
.toggle {
  text-decoration: line-through
}
.pic {
  width: 40vw;
  margin: auto;
}
.pic img {
  width: 100%;
}
.search {
  width: 20vw;
  height: 3.5vh;
  border-radius: 10px;
  margin: 10px 0;
  outline: none;
  border: none;
  text-indent: 12px;
}
.food-item{
  display: flex;
  justify-content: space-between;
}
.food-item>span:first-child{
  flex-grow: 1;
  text-align: left;
  cursor: pointer;
}
.food-item>span:last-child{
  font-size: small;
  cursor: pointer;
}
</style>
