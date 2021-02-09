<template>
  <div>
    <div class="form-input-area">
      <div class="page-cap-title">
        用户列表
      </div>
      <div class="nav-common-search">
        <div class="search-line">
          <div class="search-union">
            <span class="words">展示状态:</span>
            <div class="input-text">
              <el-select
                v-model.trim="search.status"
                style="width: 160px"
                placeholder="全部"
              >
                <el-option value="" label="全部" />
                <el-option value="1" label="显示" />
                <el-option value="0" label="隐藏" />
              </el-select>
            </div>
          </div>
          <div class="search-union">
            <span class="words">用户名称:</span>
            <div class="input-text">
              <el-input
                v-model.trim="search.title"
                style="width: 160px"
                type="text"
                clearable
                placeholder="请输入名称"
                maxlength="50"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="search-union right">
            <el-button type="primary" @click="searchData">
              查询
            </el-button>
          </div>
          <div class="search-union right">
            <el-button v-permission="'00'" type="primary" @click="clickIcon">
              <i class="el-icon-plus" />
              添加
            </el-button>
          </div>
        </div>
      </div>
      <div class="common-table" style="width: 100%;">
        <el-table :data="tableData.data">
          <el-table-column prop="idx" label="序号" width="60" />
          <el-table-column prop="name" width="300" label="编号" />

          <el-table-column label="姓名">
            <template slot-scope="scope">
              <span>{{
                scope.row.channel.indexOf(2) !== -1 ? "支持" : "--"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式">
            <template slot-scope="scope">
              <span>{{
                scope.row.channel.indexOf(1) !== -1 ? "支持" : "--"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="经典语录">
            <template slot-scope="scope">
              <span>{{
                scope.row.channel.indexOf(0) !== -1 ? "支持" : "--"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="展示状态" width="100">
            <template slot-scope="scope">
              <a
                class="list-status"
                :class="{ disabled: scope.row.status !== '1' }"
                >{{ scope.row.status === "1" ? "显示" : "隐藏" }}</a
              >
            </template>
          </el-table-column>
          <el-table-column prop="order" label="展示顺序" />
          <el-table-column prop="operator" label="操作" width="100">
            <template slot-scope="scope">
              <a
                class="link-btn color normal"
                style="margin: 0 5px"
                @click="clickEdit(scope.row.id)"
                >查看</a
              >
              <a
                class="link-btn color red"
                style="margin: 0 5px"
                @click="clickDelete(scope.row.id)"
                >删除</a
              >
              <!--                        <a-->
              <!--                            v-if="scope.row.status !== '1'"-->
              <!--                            class="link-btn color orange"-->
              <!--                            style="margin: 0 5px"-->
              <!--                            @click="clickShow(scope.row.id)"-->
              <!--                        >显示</a>-->
            </template>
          </el-table-column>
        </el-table>
        <div class="my-pagination-wrap">
          <my-pagination
            :page-size="tableData.pageSize"
            :total="tableData.count"
            :current-page.sync="tableData.currentPage"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Mixins, Prop } from "vue-property-decorator";
import commonTable from "@/mixins/commonTable";

@Component({})
export default class extends Mixins(commonTable) {
  search: any = {
    title: "", // 图片名称
    status: "", // 状态
    positionId: ""
  };

  nameLabel = "";

  toolsData: any = [];
  mounted() {
    this.searchData();
  }

  searchData() {
    this.tableData.currentPage = 1;
    this.getDataList(this.search);
  }

  async getDataList(data: any) {
    // @ts-ignore
    this.$showLoading();
    setTimeout(() => {
      this.tableData.data = [];
      this.tableData.count = 0;
    });
    // @ts-ignore
    this.$closeLoading();
  }

  handleCurrentChange() {
    this.getDataList(this.search);
  }

  clickEdit(id: string) {
    // do something
  }

  clickDelete(id: string) {
    // do something
  }

  clickIcon() {
    // do something
  }
}
</script>

<style lang="scss" scoped></style>
