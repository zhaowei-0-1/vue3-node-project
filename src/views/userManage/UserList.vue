<template>
  <div>
    <el-card>
      <el-page-header content="用户管理" icon="" title="用户列表" />

      <!-- :data="放后端返回的数据" -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />

        <el-table-column prop="avatar" label="头像" width="180">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar :size="40" :src="'http://localhost:3000/' + scope.row.avatar" />
            </div>

            <!-- <div v-else>
              <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />

            </div> -->
          </template>
        </el-table-column>

        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <!-- {{ scope.row.role === 1 ? '管理员' : '编辑' }} -->
            <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">管理员</el-tag>
            <el-tag v-else class="ml-2" type="success">编辑</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <!-- text @click="dialogFormVisible = true" -->
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>

            <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="你确定要删除吗"
              @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑对话题 -->
    <el-dialog v-model="dialogFormVisible" title="编辑用户">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="demo-ruleForm"
        status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" />
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" class="m-2" placeholder="请选择" style="width: 100%;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="个人简介" prop="introduction">
          <el-input type="textarea" v-model="userForm.introduction" />
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm()">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
const tableData = ref([])
// 注册回调函数
onMounted(() => {
  getTableData()
})

const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list");
  // console.log(res.data)
  tableData.value = res.data.data
}

// 对话框
const dialogFormVisible = ref(false)
const userFormRef = ref()
let userForm = reactive({
  username: "",
  password: "",
  role: 2,//1是管理员，2是编辑
  introduction: "",

})

// 性别选择
const options = [
  {
    label: "管理员",
    value: 1
  },
  {
    label: "编辑",
    value: 2
  }
];

const userFormRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择权限', trigger: 'blur' },
  ],

});

// 编辑回调
const handleEdit = async data => {
  // console.log(data)
  const res = await axios.get(`/adminapi/user/list/${data._id}`)
  // console.log(res.data.data, "res===")
  // userForm = res.data.data[0]
  Object.assign(userForm, res.data.data[0])
  dialogFormVisible.value = true

};
// 对话框提交确认按钮
const handleEditConfirm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(userForm, "usF---")
      // 更新后端
      await axios.put(`/adminapi/user/list/${userForm._id}`, userForm)
      // dialog隐藏
      dialogFormVisible.value = false
      // 重新获取table数据
      getTableData()
    }

  })
}
// 删除
const handleDelete = async (data) => {
  try {
    await axios.delete(`/adminapi/user/list/${data._id}`)
    getTableData()
  } catch (error) {
    // 打印错误信息 
    // console.error(error); 

  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>