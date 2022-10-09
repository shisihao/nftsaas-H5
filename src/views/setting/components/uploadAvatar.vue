<template>
	<van-uploader v-show="show" :after-read="afterRead" :max-count="count" :max-size="maxSize" :before-read="beforeRead" @oversize="onOversize" />
</template>

<script setup>
import { showToast } from 'vant'
import { ref } from 'vue'
import axios from 'axios'
import { OssKey, getToken } from '@/utils/auth'
import OSS from 'ali-oss'
import store from '@/store/index'

const props = defineProps({
	show: {
		type: Boolean,
		default:false
	},
	refName: {
		type: String,
		default: `upload${String(+new Date()) + Math.random().toString(36).substring(2)}`
	},
	count: {
		type: String,
		default:'1'
	},
	maxSize: {
		type:Number,
		default: 2 * 1024 * 1024
	}
})

const emit = defineEmits(['handleBeforeUpload','handleSuccess'])

const afterRead = file => {
	const oss = JSON.parse(getToken(OssKey)) 
	const client = new OSS({
		region: 'oss-cn-hangzhou',
		accessKeyId: oss.AccessKeyId,
		accessKeySecret: oss.AccessKeySecret,
		stsToken: oss.SecurityToken,
		bucket: oss.BucketName
	})
	const filename = `${String(+new Date()) + Math.random().toString(36).substr(2)}.${file.file.name.split('.').pop()}`
	client
		.multipartUpload(filename, file.file, {
			progress: function(p, cpt, res) {
				// console.log('elProgress', p, cpt, res)
			}
		})
		.then(res => {
			if (res.res.statusCode === 200) {
				emit('handleSuccess',res)
			} else {
				showToast('上传失败')
			}
		})
		.catch(err=>{
			showToast('上传失败')
			store.dispatch('user/getOssKey')
		})
}
const onOversize = () => {
	showToast('文件大小不能超过 2M')
}

const beforeRead = file => {
	return new Promise((resolve, reject) => {
		emit(
			'handleBeforeUpload',
			file,
			res => {
				if (res) {
					resolve(file)
				} else {
					reject()
				}
			},
			props.refName
		)
	})
}

</script>

<style lang="scss" scoped></style>
