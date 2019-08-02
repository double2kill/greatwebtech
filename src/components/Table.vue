<template>
  <div class="container">
    <div class="left-box">
      <searchForm />
      <el-table
        border
        :data="tableData"
        height="500"
        width="100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        @row-dblclick="handleClick"
      >
        <el-table-column prop="slot" label="槽位"></el-table-column>
        <el-table-column prop="test_site" label="测试站点"></el-table-column>
        <el-table-column prop="test_requirement" label="测试需求"></el-table-column>
        <el-table-column prop="product_model" label="产品型号"></el-table-column>
        <el-table-column prop="serial_number" label="序列号"></el-table-column>
        <el-table-column prop="mac" label="MAC地址"></el-table-column>
        <el-table-column prop="test_time" label="测试时间"></el-table-column>
        <el-table-column prop="test_host" label="测试主机"></el-table-column>
        <el-table-column prop="ate" label="ATE版本"></el-table-column>
        <el-table-column prop="hardware_version" label="硬件版本"></el-table-column>
        <el-table-column prop="software_version" label="软件版本 "></el-table-column>
        <el-table-column prop="software_serial" label="软件序号"></el-table-column>
        <el-table-column prop="boot_version" label="BOOT版本"></el-table-column>
        <el-table-column prop="result" label="测试结果"></el-table-column>
      </el-table>
    </div>
    <el-card class="box-card" v-loading="contentLoading">
      <h2>{{log.title}}</h2>
      <p class='content'>{{log.content}}</p>
    </el-card>
  </div>
</template>

<script>
import SearchForm from './SearchForm.vue';
import axios from 'axios';
import { SEARCH_ORIGIN } from '@/constants/url';

export default {
  created() {
    this.searchData();
  },
  data() {
    const data = [];
    return {
      tableData: data.map(item => ({
        slot: item[0],
        test_site: item[1],
        test_requirement: item[2],
        product_model: item[3],
        serial_number: item[4],
        mac: item[5],
        test_host: item[6],
        ate: item[7],
        hardware_version: item[8],
        software_version: item[9],
        software_serial: item[10],
        boot_version: item[12],
        result: item[13],
      })),
      loading: false,
      contentLoading: false,
      log: {
        title: '日志',
      },
    };
  },
  methods: {
    async searchData(params) {
      const newParams = params || {};

      Object.entries(newParams).forEach(([key, value]) => {
        if (!value) {
          delete newParams[key];
        }
      });

      if (this.loading) {
        this.$message('正在查询中');
        return;
      }

      this.loading = true;

      try {
        const res = await axios.get(`${SEARCH_ORIGIN}searchdata`, {
          params: {
            searchMode: 'ProductInfo',
            Offset: 0,
            Limit: 50,
            ...newParams,
          },
        });
        const data = res.data.map(item => ({
          slot: item[0],
          test_site: item[1],
          test_requirement: item[2],
          product_model: item[3],
          serial_number: item[4],
          mac: item[5],
          test_time: item[6],
          test_host: item[7],
          ate: item[8],
          hardware_version: item[9],
          software_version: item[10],
          software_serial: item[11],
          boot_version: item[12],
          result: item[13],
        }));
        this.tableData = data;
      } catch (error) {
        this.$message.error('数据出错了~');
      }
      this.loading = false;
    },
    async handleClick(row) {
      const {
        slot, test_host, test_time, SN,
      } = row;

      if (this.contentLoading) {
        return;
      }

      this.contentLoading = true;

      try {
        const res = await axios.get(`${SEARCH_ORIGIN}searchdata`, {
          params: {
            searchMode: 'Log',
            SN,
            PC_Name: test_host,
            Record_Time: new Date(test_time).valueOf(),
          },
        });

        const [[log]] = res.data;
        this.contentLoading = false;

        this.log.content = log;
      } catch (error) {
        this.contentLoading = false;
        this.$message.error('数据出错了~');
      }
    },
  },
  components: {
    SearchForm,
  },
};
</script>
<style scoped>
.container {
  display: flex;
}
.left-box {
  width: 60%;
}
.box-card {
  width: 30%;
  margin-left: 5%;
}
.content {
  white-space: pre-line;
}
</style>
