<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="SN">
      <el-input v-model="formInline.SN" placeholder="请输入SN"></el-input>
    </el-form-item>
    <el-form-item label="MAC">
      <el-input v-model="formInline.mac" placeholder="请输入MAC"></el-input>
    </el-form-item>
    <el-form-item label="产品型号">
      <el-input v-model="formInline.serial" placeholder="产品型号"></el-input>
    </el-form-item>
    <el-form-item label="产品类型">
      <el-select v-model="formInline.type" placeholder="全部">
        <el-option label="全部" value></el-option>
        <el-option label="无线控制器" value="ac"></el-option>
        <el-option label="中低端交换机" value="ml_switch"></el-option>
        <el-option label="中低端路由器" value="ml_router"></el-option>
        <el-option label="高端交换机" value="h_switch"></el-option>
        <el-option label="高端路由器" value="h_router"></el-option>
        <el-option label="安全产品" value="securitypro"></el-option>
        <el-option label="无线产品" value="ap"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="测试站点">
      <el-select v-model="formInline.site" placeholder="全部">
        <el-option label="全部" value></el-option>
        <el-option label="SETMAC" value="SETMAC"></el-option>
        <el-option label="基本测试" value="基本测试"></el-option>
        <el-option label="基本测试1" value="基本测试1"></el-option>
        <el-option label="查看烤机记录" value="查看烤机记录"></el-option>
        <el-option label="查看烤机记录1" value="查看烤机记录1"></el-option>
        <el-option label="下装主程序" value="下装主程序"></el-option>
        <el-option label="总检" value="总检"></el-option>
        <el-option label="连通" value="连通"></el-option>
        <el-option label="OQC按单重检" value="OQC按单重检"></el-option>
        <el-option label="下装生测程序" value="下装生测程序"></el-option>
        <el-option label="吞吐测试" value="吞吐测试"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="测试结果">
      <el-select v-model="formInline.site" placeholder="全部">
        <el-option label="全部" value></el-option>
        <el-option label="通过" value="true"></el-option>
        <el-option label="失败" value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="测试站点">
      <el-date-picker
        v-model="formInline.dateRange"
        type="datetimerange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        SN: '',
        user: '',
        region: '',
        dateRange: [],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      const {
        SN, type, site, dateRange,
      } = this.$data.formInline;
      const [start, end] = dateRange;
      this.$parent.searchData({
        SN,
        Product_Type: type,
        Product_Station: site,
        StartTime: start && start.valueOf(),
        EndTime: end && end.valueOf(),
      });
    },
  },
};
</script>
