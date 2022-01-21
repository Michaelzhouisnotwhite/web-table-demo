<template>
  <div>
    <my-table :data="goodslist">
      <template v-slot:header>
        <th>#</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>标签</th>
        <th>操作</th>
      </template>
      <template #body="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.goods_name }}</td>
        <td>￥{{ row.goods_price }}</td>
        <td>
          <input
            type="text"
            class="form-control form-control-sm ipt-tag"
            v-if="row.inputVisible"
            v-focus
            v-model.trim="row.inputValue"
            @blur="onInputConfirm(row)"
            @keyup.enter="onInputConfirm(row)"
            @keyup.esc="row.InputValue=''"
          />
          <!-- The blur event fires when an element has lost focus. -->
          <button
            @click="row.inputVisible = true"
            type="button"
            class="btn btn-primary btn-sm"
            v-else
          >
            +Tag
          </button>
          <span
            class="badge badge-warning ml-2"
            v-for="item in row.tags"
            :key="item"
          >
            {{ item }}
          </span>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click="onRemove(row.id)"
          >
            删除
          </button>
        </td>
      </template>
    </my-table>
  </div>
</template>
<script>
import MyTable from "./components/my-table/MyTable.vue";
export default {
  name: "App",
  components: {
    MyTable,
  },
  data() {
    return {
      goodslist: [],
    };
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get("/api/goods");
      if (res.status !== 0) {
        return console.log(res.message);
      }
      this.goodslist = res.data;
    },
    onRemove(id) {
      this.goodslist = this.goodslist.filter((x) => x.id !== id);
    },
    onInputConfirm(row) {
      const val = row.inputValue;
      row.inputValue = "";
      row.inputVisible = false;

      if (!val || row.tags.indexOf(val) != -1) return;
      row.tags.push(val);
    },
  },
  created() {
    this.getGoodsList();
  },
  directives: {
    focus(el) {
      el.focus();
    },
  },
};
</script>

<style lang="less" scoped>
</style>