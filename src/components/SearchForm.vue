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
      <el-option label="全部" value=""></el-option>
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
      <el-option label="全部" value=""></el-option>
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
      },
    };
  },
  methods: {
    onSubmit() {
      const { SN, type, site } = this.$data.formInline;
      this.$parent.searchData({
        SN,
        Product_Type: type,
        Product_Station: site,
      });
    },
  },
};
</script>
