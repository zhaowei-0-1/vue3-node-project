<template>
    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" :auto-upload="false" :on-change="handleChange">
        <!-- :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" -->
        <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />

        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
// import { defineEmits, defineProps } from 'vue'
import { Plus } from '@element-plus/icons-vue';
import { defineEmits, defineProps, computed } from 'vue';

const props = defineProps({
    avatar: String
})
const emit = defineEmits(["uploadChange"])
let file; // 存储选择的文件 

// 上传图片不显示
const uploadAvatar = computed(
    () =>
        props.avatar.includes("blob")
            ? props.avatar
            : 'http://localhost:3000/' + props.avatar
);

// 每次选择头像的回调(显示图片)
const handleChange = (file) => {
    emit("uploadChange", file.raw)
};
</script>

<style scoped lang="scss">
// 上传头像
:deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

:deep(.el-upload:hover) {
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