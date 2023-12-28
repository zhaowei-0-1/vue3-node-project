<template>
    <div>
        <el-card>
            <el-page-header content="产品列表" icon="" title="产品管理" />

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="产品名称" width="180" />
                <el-table-column prop="introduction" label="产品概述" width="180" />

                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button :icon="Edit" circle @click="handleEdit(scope.row)" />
                       
                        <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="你确定要删除吗"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button type="danger" :icon="Delete" circle />
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
    </div>
</template>

<script setup>

import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import formatTime from '@/util/formatTime'
import { Delete, Edit, Star, StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const tableData = ref([])
// 注册回调函数
onMounted(() => {
    getTableData()
});

const getTableData = async () => {
    const res = await axios.get("/adminapi/product/list");
    // console.log(res.data.data, "NEWS res.data ")
    tableData.value = res.data.data
};

// 删除
const handleDelete = async (item) => {
    // console.log(item)
    try {
        await axios.delete(`/adminapi/product/list/${item._id}`)
        getTableData()
    } catch (error) {
        // 打印错误信息 
        // console.error(error); 
    }
}

// 编辑
const router = useRouter();
const handleEdit = (item) => {
    console.log(item)
    // 跳转到 /productManage/editnews/:id
    router.push(`/productManage/editproduct/${item._id}`)

}
</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}

</style>