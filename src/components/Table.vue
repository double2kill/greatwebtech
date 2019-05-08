<template>
  <div>
    <h2>欢迎使用线上查询系统！</h2>
    <SearchForm />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="slot" label="槽位" width="180"> </el-table-column>
      <el-table-column prop="test_site" label="测试站点" width="180">
      </el-table-column>
      <el-table-column prop="test_requirement" label="测试需求">
      </el-table-column>
      <el-table-column prop="product_model" label="产品型号"> </el-table-column>
      <el-table-column prop="serial_number" label="序列号"> </el-table-column>
      <el-table-column prop="mac" label="MAC地址"> </el-table-column>
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

export default {
  data() {
    const data = [
      [
        'Slot M1',
        '下装主程序',
        '以管理板为主',
        'RG-IS2712G',
        'G1MR13G00005B',
        '58696CC7DE0A',
        '2018-01-29 13:42:06.0',
        'BFEBFBFF000506E3',
        '1.00',
        '1.05',
        'RGOS 10.4(3b16)T16 Release(176668)',
        '',
        '10.4(3b16)T16 Release(176668)',
        'PASS',
      ],
      [
        'Slot M1',
        '总检',
        '以管理板为主',
        'RG-IS2712G',
        'G1MR13G00005B',
        '58696CC7DE0A',
        '2018-01-29 18:52:13.0',
        'BFEBFBFF000506E3',
        '1.10',
        '1.05',
        'RGOS 10.4(3b16)T16 Release(176668)',
        '',
        '10.4(3b16)T16 Release(176668)',
        'PASS',
      ],
    ];
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
    };
  },
  components: {
    SearchForm,
  },
};
</script>
