<template>
  <div>
    <h2>欢迎使用线上查询系统！</h2>
    <SearchForm />
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column prop="slot" label="槽位" width="180"> </el-table-column>
      <el-table-column prop="test_site" label="测试站点" width="180">
      </el-table-column>
      <el-table-column prop="test_requirement" label="测试需求">
      </el-table-column>
      <el-table-column prop="product_model" label="产品型号"> </el-table-column>
      <el-table-column prop="serial_number" label="序列号"> </el-table-column>
      <el-table-column prop="mac" label="MAC地址"> </el-table-column>
      <el-table-column prop="test_time" label="测试时间"> </el-table-column>
      <el-table-column prop="test_host" label="测试主机"> </el-table-column>
      <el-table-column prop="ate" label="ATE版本"> </el-table-column>
      <el-table-column prop="hardware_version" label="硬件版本">
      </el-table-column>
      <el-table-column prop="software_version" label="软件版本 ">
      </el-table-column>
      <el-table-column prop="software_serial" label="软件序号">
      </el-table-column>
      <el-table-column prop="boot_version" label="BOOT版本"> </el-table-column>
      <el-table-column prop="result" label="测试结果"> </el-table-column>
    </el-table>
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
            Offset: 10,
            Limit: 10,
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
  },
  components: {
    SearchForm,
  },
};
</script>
