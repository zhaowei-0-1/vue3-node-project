<template>
    <div>
        <el-page-header content="编辑产品" @back="handleBack()" title="产品管理" />

        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="80px"
            class="demo-ruleForm" status-icon>
            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>

            <el-form-item label="产品概述" prop="introduction">
                <el-input type="textarea" v-model="productForm.introduction" />
            </el-form-item>

            <el-form-item label="产品详情" prop="detail">
                <el-input type="textarea" v-model="productForm.detail" />
            </el-form-item>

            <el-form-item label="产品图片" prop="cover">
                <Upload :avatar="productForm.cover" @uploadChange="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">编辑产品</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload';
import { useRouter,useRoute } from 'vue-router';
import axios from 'axios';

const productFormRef = ref()
const productForm = reactive({
    title: "",
    introduction: "",
    detail: "",
    cover: "",
    file: null
});

const productFormRules = reactive({
    title: [
        { required: true, message: '请输入产品名称', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入产品简要描述', trigger: 'blur' },
    ],
    detail: [
        { required: true, message: '请输入产品详细描述', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传产品图片', trigger: 'blur' },
    ],
});

// 每次选择头像的回调(显示图片)
const handleChange = file => {
    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
};

const router = useRouter();
const route = useRoute();

// 提交
const submitForm = () => {
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            console.log(productForm, "productForm---")
            // 后台通信
            await upload("/adminapi/product/list", productForm)
            router.push(`/productManage/productlist`)
        }
    })
}

// 返回页面
const handleBack = () => {
    router.back()
}

// 取当前页面数据
onMounted( () => {
    getData()
})

const getData=async ()=>{
    // console.log(route.params.id)
    const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
    //  console.log(res.data.data[0])
    // // 回显数据
    Object.assign(productForm, res.data.data[0])

}
</script>

<style scoped lang="scss">
.demo-ruleForm {
    margin-top: 40px;
}
</style>