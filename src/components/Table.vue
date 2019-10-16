<template>
  <div class="container">
    <div class="left-box">
      <el-collapse v-model="activeNames" style="margin-bottom: 15px">
        <el-collapse-item title="搜索" name="1">
          <searchForm />
        </el-collapse-item>
      </el-collapse>
      <el-table
        border
        :data="tableData"
        height="500"
        width="100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        @row-dblclick="handleClick"
        v-el-table-infinite-scroll="load"
      >
        <el-table-column prop="slot" label="槽位"></el-table-column>
        <el-table-column prop="test_site" label="测试站点" width="120"></el-table-column>
        <el-table-column prop="test_requirement" label="测试需求" width="120"></el-table-column>
        <el-table-column prop="product_model" label="产品型号" width="160"></el-table-column>
        <el-table-column prop="serial_number" label="序列号" width="160"></el-table-column>
        <el-table-column prop="mac" label="MAC地址" width="160"></el-table-column>
        <el-table-column prop="test_time" label="测试时间" width="180"></el-table-column>
        <el-table-column prop="result" label="测试结果"></el-table-column>
      </el-table>
    </div>
    <el-card class="box-card" v-loading="log.loading">
      <div slot="header">
        <span>{{ log.title }}</span>
        <el-dropdown
          style="float: right; padding: 3px 0"
          placement="bottom"
          @command="handleCommand"
        >
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              command="download"
              icon="el-icon-download"
              :disabled="log.content === ''"
            >下载</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-input readonly type="textarea" :rows="27" placeholder="双击某一行查看日志" v-model="log.content"></el-input>
    </el-card>
  </div>
</template>

<script>
import SearchForm from "./SearchForm.vue";
import axios from "axios";
import { SEARCH_ORIGIN } from "@/constants/url";
import downloadData from "@/utils/downloadData";
import elTableInfiniteScroll from 'el-table-infinite-scroll';

export default {
  created() {
    this.searchData();
  },
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
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
        result: item[13]
      })),
      loading: false,
      log: {
        loading: false,
        title: "日志",
        content: ""
      },
      selectedRow: undefined,
      activeNames: []
    };
  },
  methods: {
    load() {
      console.log("TODO: load more")
    },
    handleCommand(command) {
      switch (command) {
        case "download":
          if (this.selectedRow) {
            const log = this.log.content;
            const {
              test_time,
              serial_number,
              product_model,
              test_site,
              mac,
              result,
              test_requirement
            } = this.selectedRow;
            debugger;
            const isWin =
              navigator.platform === "Win32" ||
              navigator.platform === "Windows";
            const blobLog = isWin ? log.replace(/\n/g, "\r\n") : log;
            const name = `${product_model}_${test_site}_${test_requirement}_${serial_number}_${mac}_${result}_${test_time}`;
            const suffix = "txt";
            downloadData(blobLog, `${name}.${suffix}`);
          }
          break;

        default:
          break;
      }
    },
    async searchData(params) {
      const newParams = params || {};

      Object.entries(newParams).forEach(([key, value]) => {
        if (!value) {
          delete newParams[key];
        }
      });

      if (this.loading) {
        this.$message("正在查询中");
        return;
      }

      this.loading = true;

      try {
        const res = await axios.get(`${SEARCH_ORIGIN}searchdata`, {
          params: {
            searchMode: "ProductInfo",
            Offset: 0,
            Limit: 50,
            ...newParams
          }
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
          result: item[13]
        }));
        this.tableData = data;
      } catch (error) {
        this.$message.error("数据出错了~");
      }
      this.loading = false;
    },
    async handleClick(row) {
      const { slot, test_host, test_time, serial_number } = row;

      if (this.log.loading) {
        return;
      }

      this.log.loading = true;

      try {
        const res = await axios.get(`${SEARCH_ORIGIN}searchdata`, {
          params: {
            searchMode: "Log",
            SN: serial_number,
            PC_Name: test_host,
            Record_Time: new Date(test_time).valueOf(),
            Slot: slot
          }
        });
        const [[log]] = res.data;
        this.log.loading = false;

        this.log.content = log.replace(/\r/g, "\n");
        this.selectedRow = row;
      } catch (error) {
        this.log.loading = false;
        this.$message.error("数据出错了~");
      }
    }
  },
  components: {
    SearchForm
  }
};
</script>
<style scoped>
.container {
  display: flex;
}
.container .el-textarea {
  margin-top: 10px;
}
.left-box {
  margin-left: 1%;
  width: 66%;
}
.box-card {
  width: 30%;
  margin-left: 2%;
  overflow-y: auto;
}
</style>
