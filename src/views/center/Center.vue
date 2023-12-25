<template>
    <!-- <div>center</div> -->
    <div>
        <el-page-header content="个人中心" icon="" title="vue3后台管理系统" />
    </div>
    <!-- 24栅格 1：2 gutter属性来指定列之间的间距 -->
    <el-row :gutter="20" class="el-row">
        <el-col :span="8">
            <el-card class="box-card">
                <el-avatar :size="70" :src="avatarUrl" />
                <h3>{{ store.state.userInfo.username }}</h3>
                <h5>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑' }}</h5>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>个人信息</span>
                    </div>
                </template>
                <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px"
                    class="demo-ruleForm" status-icon>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" />
                    </el-form-item>

                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="userForm.gender" class="m-2" placeholder="Select" style="width: 100%;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="个人简介" prop="introduction">
                        <el-input type="textarea" v-model="userForm.introduction" />
                    </el-form-item>
                    <el-form-item label="头像" prop="avatar">
                        <Upload :avatar="userForm.avatar" @uploadChange="handleChange" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref, reactive } from 'vue';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload';
import { ElMessage } from 'element-plus';

const store = useStore();
const avatarUrl = computed(
    () => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar :
        `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)
// 上传图片不显示
const uploadAvatar = computed(() => {
    userForm.avatar.includes("blob") ? userForm.avatar :
        'http://localhost:3000' + userForm.avatar
})
const { username, gender, introduction, avatar } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file: null

})
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
});

// 性别选择
const options = [
    {
        label: "保密",
        value: 0
    },
    {
        label: "男",
        value: 1
    },
    {
        label: "女",
        value: 2
    },
];
// 每次选择头像的回调(显示图片)
const handleChange = file => {
    // console.log(file.raw, 'file');
    // console.log(URL.createObjectURL(file), 'fileURL');
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
};

// 更新提交
const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log("submit", userForm)
            const res = await upload("/adminapi/user/upload", userForm)
            if (res.ActionType === "OK") {
                store.commit("changeUserInfo", res.data);
                ElMessage.success("更新成功")
            }
        }
    })
}

</script>

<style scoped lang="scss">
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
}

// 上传头像
:deep(.avatar-uploader .el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
    border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
}
</style>